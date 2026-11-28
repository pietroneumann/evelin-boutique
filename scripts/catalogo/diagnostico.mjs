import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import {SOURCE_URL, digest, normalize, readProducts, validateProducts} from './model.mjs'
import {parseCatalogo} from './fonte.mjs'
import {imageURL, requestBytes, inspectImage} from './imagens.mjs'
import {locateFrontier, materialSignature, explicitType} from './fronteira.mjs'
import {renderCatalogo} from './navegador.mjs'

const material = item => materialSignature({items:[{...item,sourceKey:null}],errors:[]})
const groupByKey = items => {
    const map=new Map()
    for(const item of items){if(!map.has(item.sourceKey))map.set(item.sourceKey,[]);map.get(item.sourceKey).push(item)}
    return map
}
function sameDocumentDuplicates(items){
    return items.every(item=>material(item)===material(items[0])&&imageURL(item.imageUrl)===imageURL(items[0].imageUrl))
}

/** Só a visibilidade comprovada no navegador pode excluir uma variante do HTML. */
export function reconcileRendered(http, rendered) {
    assert.equal(http.errors.length,0,'Leitura HTTP parcial.')
    assert.equal((rendered.parseErrors||[]).length,0,'DOM renderizado parcial.')
    const original=groupByKey(http.items),dom=groupByKey(rendered.items)
    assert.deepEqual([...original.keys()].sort(),[...dom.keys()].sort(),'HTTP e Chrome apresentam conjuntos de produtos diferentes.')
    const nodes=new Map()
    for(const node of rendered.nodes){
        assert.ok(!nodes.has(node.sourceKey),'Identificador de visibilidade duplicado.')
        nodes.set(node.sourceKey,node)
    }
    const kept=[],omitted=[]
    let hiddenDuplicates=0
    for(const [key,items] of original){
        const actual=dom.get(key),node=nodes.get(key)
        assert.ok(node,'Falta verificar a visibilidade de um produto.')
        assert.ok(!node.ambiguousVisible,'Mais de uma variante visível sem identidade comprovada.')
        assert.ok(sameDocumentDuplicates(items)&&sameDocumentDuplicates(actual),'Variantes DOM não são duplicatas comprovadas.')
        assert.equal(material(items[0]),material(actual[0]),'HTTP e Chrome apresentam dados materiais diferentes.')
        if(node.visible===false){
            assert.ok(node.reason!=='source-node-not-found'&&node.alternatives>0,'Nó não localizado não pode ser tratado como conteúdo oculto.')
            omitted.push({sourceKey:key,nome:items[0].nome,motivo:node.reason||'dimensões nulas'})
            continue
        }
        assert.ok(Number.isFinite(node.visualOrder),'Ordem visual ausente.')
        hiddenDuplicates+=Math.max(Math.max(items.length,actual.length)-1,node.hiddenAlternatives||0)
        kept.push({http:items[0],dom:actual[0],node})
    }
    kept.sort((a,b)=>a.node.visualOrder-b.node.visualOrder)
    const update=items=>({items,errors:[],stats:{...http.stats,candidateCount:items.length,recognizedProducts:items.length,productsWithoutImages:items.filter(i=>!i.imageUrl).length}})
    const visibleImage=entry=>entry.node.imageURLs?.length===1?entry.node.imageURLs[0]:entry.dom.imageUrl
    const first=update(kept.map((entry,sourceOrder)=>({...entry.http,imageUrl:visibleImage(entry),sourceOrder})))
    const browser=update(kept.map((entry,sourceOrder)=>({...entry.dom,imageUrl:visibleImage(entry),sourceOrder})))
    assert.equal(materialSignature(first),materialSignature(browser),'HTTP e Chrome divergem na ordem visual reconciliada.')
    const visibleKeys=new Set(kept.map(entry=>entry.http.sourceKey))
    const rawOrder=[...new Set(http.items.filter(item=>visibleKeys.has(item.sourceKey)).map(item=>item.sourceKey))]
    const visualOrder=kept.map(entry=>entry.http.sourceKey)
    return {parsed:first,browser,nodes:kept.map(entry=>entry.node),comparison:{httpCount:http.items.length,chromeCount:rendered.items.length,visibleCount:kept.length,hiddenCount:omitted.length,hiddenDuplicates,omitted,domOrderChanged:JSON.stringify(rawOrder)!==JSON.stringify(visualOrder),materialDifferences:0}}
}

/** Duas consultas independentes; a ordem canônica vem do DOM realmente visível. */
export async function readVerifiedCatalog({root,fetchImpl=fetch,renderSource=renderCatalogo,capture=false}) {
    const cycles=[]
    for(let i=0;i<2;i++){
        let response,rendered
        try{response=await requestBytes(SOURCE_URL,{kind:'html',fetchImpl})}
        catch(error){throw new Error(`Leitura HTTP ${i+1} não concluída: ${error.message}`)}
        const http=parseCatalogo(response.bytes.toString('utf8'))
        assert.equal(http.errors.length,0,'Fonte parcial ou estruturalmente diferente.')
        try{rendered=await renderSource({root,url:SOURCE_URL,width:1440,parsedItems:http.items,capture:capture&&i===0})}
        catch(error){throw new Error(`Renderização Chrome ${i+1} não concluída: ${error.message}`)}
        assert.equal(rendered.metadata.url,SOURCE_URL,'Chrome saiu da fonte oficial.')
        const reconciled=reconcileRendered(http,rendered)
        cycles.push({http,rendered,...reconciled})
    }
    assert.equal(materialSignature(cycles[0].parsed),materialSignature(cycles[1].parsed),'Fonte instável durante a execução.')
    return {first:cycles[0].parsed,second:cycles[1].parsed,cycles}
}

function frontierDiagnosis(parsed,anchor) {
    try{return {accepted:true,...locateFrontier(parsed,anchor)}}
    catch(error){return {accepted:false,message:error.message,...error.details,bestAttempt:error.details?.bestAttempt||null}}
}

function scopeSnapshot(root,products) {
    const files=['script.js','data/catalog-history.json',...products.map(p=>p.imagem)]
    return Promise.all(files.map(async file=>[file,digest(await fs.readFile(path.join(root,file)))])).then(Object.fromEntries)
}

/** Diagnóstico não importa o atualizador, não cria lotes e não escreve em assets/dados. */
export async function diagnoseCatalog({root,fetchImpl=fetch,renderSource=renderCatalogo,artifactDir,verifyMobile=true}) {
    const history=JSON.parse(await fs.readFile(path.join(root,'data/catalog-history.json'),'utf8'))
    const products=readProducts(await fs.readFile(path.join(root,'script.js'),'utf8'))
    const counts=validateProducts(products,history)
    const before=await scopeSnapshot(root,products)
    const target=path.resolve(artifactDir||path.join(root,'verificacao/diagnostico-tolerante-2026-11-27/resultado'))
    assert.ok(target.startsWith(path.resolve(root,'verificacao')+path.sep),'Relatório deve ficar na pasta ignorada de verificação.')
    let report
    try{
        const readings=await readVerifiedCatalog({root,fetchImpl,renderSource,capture:true})
        const firstBoundary=frontierDiagnosis(readings.first,history.source.frontier),lastBoundary=frontierDiagnosis(readings.second,history.source.frontier)
        const boundaryMaterial=value=>JSON.stringify({accepted:value.accepted,start:value.startIndex??value.bestAttempt?.startIndex,end:value.endIndex??value.bestAttempt?.endIndex,matches:value.anchorMatches??value.bestAttempt?.anchorMatches})
        assert.equal(boundaryMaterial(firstBoundary),boundaryMaterial(lastBoundary),'Fonte instável durante a execução: fronteiras divergentes.')
        let mobile=null
        if(verifyMobile){
            const view=await renderSource({root,url:SOURCE_URL,width:390,parsedItems:readings.cycles[1].http.items,capture:true})
            const normalized=reconcileRendered(readings.cycles[1].http,view)
            const signatures=p=>p.items.map(material).sort()
            assert.deepEqual(signatures(normalized.parsed),signatures(readings.second),'Desktop e celular apresentam conjuntos diferentes.')
            mobile={...normalized.comparison,screenshots:view.screenshots,metadata:view.metadata}
        }
        const hypothesis=lastBoundary.accepted?lastBoundary:lastBoundary.bestAttempt
        const start=hypothesis?.startIndex
        const prefix=Number.isInteger(start)?readings.second.items.slice(0,start):[]
        const sourceNames=new Map()
        for(const item of prefix)sourceNames.set(normalize(item.nome),(sourceNames.get(normalize(item.nome))||0)+1)
        const images=new Map(),candidates=[]
        for(const [index,item] of prefix.entries()){
            const url=item.imageUrl
            if(!images.has(url)){
                try{const response=await requestBytes(url,{fetchImpl});images.set(url,{status:200,...await inspectImage(response.bytes)})}
                catch(error){images.set(url,{status:null,error:error.message})}
            }
            const image=images.get(url),node=readings.cycles[1].nodes[index]
            const reasons=[]
            if(sourceNames.get(normalize(item.nome))>1)reasons.push('Mais de uma foto visível do mesmo nome; identidade de SKU não confirmada.')
            if(item.sharedImage)reasons.push('Imagem compartilhada entre peças; cadastro exige tratamento manual.')
            reasons.push(...(item.reviewReasons||[]))
            if(!item.tamanhos||!item.supplierPriceCents)reasons.push('Grade ou preço da fonte não confirmado.')
            if(!lastBoundary.accepted)reasons.push('Fronteira ainda não aprovada; ocorrência não é confirmação de lançamento.')
            const status=!image.sha256||!explicitType(item.nome)?'inválido':reasons.length?'ambíguo':'confirmado'
            candidates.push({posicao:index+1,nomeBruto:node?.text??item.nome,nomeNormalizado:normalize(item.nome),nome:item.nome,tipo:explicitType(item.nome),categoria:item.categoria,tamanhos:item.tamanhos,precoFonteCentavos:item.supplierPriceCents,descricao:item.descricao,codigoFornecedor:item.codigoFornecedor,imageUrl:item.imageUrl,imageFingerprint:image.sha256??null,imageMetadata:image,sourceKey:item.sourceKey,visivel:node?.visible===true,origemConfirmada:node?.visible===true&&Boolean(image.sha256)&&Boolean(explicitType(item.nome)),lancamentoConfirmado:false,coordenadas:node?{top:node.top,left:node.left,width:node.dimensions.width,height:node.dimensions.height}:null,status,motivos:reasons})
        }
        report={modo:'diagnostico-sem-cadastro',counts,frontier:lastBoundary,leituras:{quantidade:2,estaveis:true,httpChrome:readings.cycles.map(c=>c.comparison)},mobile,prefixoHipotetico:!lastBoundary.accepted,ocorrenciasAnteriores:prefix.length,nomesDistintos:sourceNames.size,visiveis:candidates.filter(c=>c.visivel).length,ocultosNoPrefixo:0,candidates,novoLoteDefinitivo:false,seguroAtivar:false,conclusao:lastBoundary.accepted?'Fronteira reconhecida; candidatos permanecem apenas em diagnóstico para revisão.':'Ocorrências reais anteriores à hipótese de âncora, mas quórum/ordem insuficientes; não é seguro ativar.',screenshots:[...readings.cycles.flatMap(c=>c.rendered.screenshots),...(mobile?.screenshots||[])]}
    } catch(error){
        report={modo:'diagnostico-sem-cadastro',counts,seguroAtivar:false,erro:error.message,details:error.details||null}
    }
    assert.deepEqual(await scopeSnapshot(root,products),before,'O diagnóstico alterou arquivos do catálogo.')
    report.arquivosPreservados=Object.keys(before).length
    await fs.mkdir(target,{recursive:true})
    const reportPath=path.join(target,'relatorio.json')
    await fs.writeFile(reportPath,JSON.stringify(report,null,2)+'\n')
    if(report.candidates){
        const text=report.candidates.map(c=>`${c.posicao}. ${c.nome} | ${c.tipo} | ${c.status} | ${c.sourceKey}`).join('\n')
        await fs.writeFile(path.join(target,'ordem-visual.txt'),text+'\n')
    }
    return {report,reportPath}
}
