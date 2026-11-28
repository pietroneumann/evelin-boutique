import test from 'node:test'
import assert from 'node:assert/strict'
import {planManualBootstrap} from '../scripts/catalogo/bootstrap-manual.mjs'
import {SOURCE_URL, digest, productId, productSlug, applyBatches, latestBatches, promotionalCents, validateProducts} from '../scripts/catalogo/model.mjs'
import {createAnchor, materialSignature, locateFrontier} from '../scripts/catalogo/fronteira.mjs'
import {planUpdate} from '../scripts/catalogo/atualizador.mjs'

// Nomes e estrutura reproduzem a decisão humana; todos os valores da fixture são sintéticos.
const names = ['Vestido Roberta','Vestido Isabel','Vestido Yasmim','Vestido Mariah','Vestido Tina','Vestido Fernanda','Vestido Amanda','Conjunto Pamela','Conjunto Mikaelly','Conjunto Dafne','Camisa Maisa','Saia Rafaela']
const category = name => name.startsWith('Conjunto') ? 'Conjuntos' : name.startsWith('Camisa') ? 'Camisas' : name.startsWith('Saia') ? 'Saias' : name.startsWith('Blusa') ? 'Blusas' : 'Vestidos'
const slug = name => name.toLowerCase().replace(/ /g,'-')
const product = (name, filename, overrides={}) => ({nome:name,categoria:category(name),codigoFornecedor:null,preco:null,precoRegular:190,precoBlackFriday:null,tamanhos:['P','M'],cores:null,novidade:false,blackFriday:true,disponivel:true,entregaRapida:false,descricao:'Descrição sintética da fixture',imagem:'assets/imagens/produtos/'+filename,...overrides})

function fixture() {
    const initial = [
        product('Vestido Roberta','roberta-historico.png',{tamanhos:['GG']}),
        product('Camisa Maisa','maisa-historica.png',{entregaRapida:true}),
        product('Blusa Anterior','blusa-anterior.png'),
        product('Vestido Âncora','vestido-ancora.png'),
    ]
    const ids = initial.map(p=>productId(p,initial))
    const anchorItem = {nome:'Vestido Âncora',categoria:'Vestidos',codigoFornecedor:null,tamanhos:['P','M'],cores:null,descricao:'Descrição sintética da fixture',sourceKey:'historico-magnific',imageUrl:'https://lh3.googleusercontent.com/ancora=w800',supplierPriceCents:10000,sharedImage:false,reviewReasons:[]}
    const history = {
        schemaVersion:1,
        source:{url:SOURCE_URL,validation:{recognizedProducts:15,productsWithoutImages:0,structuralFormat:'google-sites-tyJCtd-v1'},observations:[],frontier:createAnchor([{...initial[3],...anchorItem,productId:ids[3],sourceKeys:[anchorItem.sourceKey],imageSha256:digest('ancora')}],{batchId:'magnific'})},
        baseline:{productCount:initial.length,fastDeliveryIds:[ids[1]],maxObservedImportSize:201},
        batches:[
            {id:'legado',label:'Legado sintético',legacy:true,productIds:ids.slice(0,2)},
            {id:'lumina',label:'Lumina',legacy:false,productIds:[ids[2]]},
            {id:'magnific',label:'Magnific',legacy:false,productIds:[ids[3]]},
        ],
        products:initial.map((p,index)=>({id:ids[index],nome:p.nome,firstDetectedAt:null,batchIds:[index<2?'legado':index===2?'lumina':'magnific'],evidence:{codigoFornecedor:null,sourceKeys:[],imageUrls:[],imageSha256:digest('historico-'+index)},blackFridayEligible:true})),
    }
    const products = applyBatches(initial,history)
    const items=[], members=[]
    for(const [index,name] of names.entries()){
        const amount = /Conjunto (Pamela|Mikaelly)$/.test(name) ? 2 : 1
        const sourceKeys=[],sourceImageFingerprints=[]
        for(let photo=0;photo<amount;photo++){
            const sourceKey='prefixo-'+index+'-foto-'+photo
            const imageUrl='https://sites.google.com/sitesv-images-rt/'+slug(name)+'-'+photo+'=w1280'
            const sha256=digest(index>=10?'imagem-compartilhada-maisa-rafaela':name+'-foto-'+photo)
            sourceKeys.push(sourceKey)
            sourceImageFingerprints.push({sha256,sourceKeys:[sourceKey],imageUrls:[imageUrl]})
            items.push({nome:name,categoria:category(name),codigoFornecedor:null,tamanhos:['P','M'],cores:null,descricao:'Descrição sintética da fixture',supplierPriceCents:10000,imageUrl,sourceKey,sharedImage:index>=10,reviewReasons:[]})
        }
        members.push({nome:name,sourceKeys,existingId:index===10?ids[1]:null,classification:index===10?'reutilizado':index===0?'homonimo-novo':'novo',...(index===10?{reuseReason:'Mesma peça confirmada por características, grade, preço e contexto; foto diferente.'}:{image:{filename:'assets/imagens/produtos/'+slug(name)+'-bootstrap.png',sha256:digest('imagem-final-'+index)}}),sourceImageFingerprints})
    }
    items.push(anchorItem)
    items.forEach((item,sourceOrder)=>item.sourceOrder=sourceOrder)
    const parsed={items,errors:[],stats:{recognizedProducts:items.length,productsWithoutImages:0,orphanPriceLines:0,candidateCount:items.length,productTextBlocks:items.length,imageCount:items.length,sectionCount:1,structuralFormat:'google-sites-tyJCtd-v1'}}
    return {products,history,parsed,members,batchId:'lote-2026-11-28',acceptedAt:new Date('2026-11-28T15:00:00.000Z'),expectedSourceSignature:materialSignature(parsed)}
}

const plan = input => planManualBootstrap(input)
const byName = (products,name) => products.filter(p=>p.nome===name)

test('bootstrap humano reúne 14 ocorrências em 12 modelos e cria somente 11 registros',()=>{
    const input=fixture(),result=plan(input)
    assert.equal(input.parsed.items.length-1,14)
    assert.equal(result.products.length,input.products.length+11)
    assert.equal(result.batch.productIds.length,12)
    assert.equal(result.batch.acceptedManually,true)
    assert.equal(result.batch.id,'lote-2026-11-28')
    assert.equal(byName(result.products,'Conjunto Pamela').length,1)
    assert.equal(byName(result.products,'Conjunto Mikaelly').length,1)
    assert.equal(new Set(result.products.map(p=>productId(p,result.products))).size,result.products.length)
    assert.equal(new Set(result.products.map(p=>productSlug(p,result.products))).size,result.products.length)
    validateProducts(result.products,result.history,input.products)
})

test('homônimo confirmado ganha ID e deep link próprios sem alterar o cadastro antigo',()=>{
    const input=fixture(),old=input.products[0],result=plan(input)
    const current=result.products[0],newer=byName(result.products,'Vestido Roberta')[1]
    assert.equal(productId(current,result.products),productId(old,input.products))
    assert.equal(productSlug(current,result.products),productSlug(old,input.products))
    assert.notEqual(productId(current,result.products),productId(newer,result.products))
    assert.equal(productSlug(newer,result.products),'vestido-roberta-2')
    assert.equal(current.imagem,old.imagem)
    assert.deepEqual(current.tamanhos,['GG'])
    assert.deepEqual(newer.tamanhos,['P','M'])
})

test('produto reutilizado mantém imagem, ID, deep link, entrega rápida e demais dados públicos',()=>{
    const input=fixture(),result=plan(input),old=input.products[1],current=result.products[1]
    assert.equal(byName(result.products,'Camisa Maisa').length,1)
    for(const key of Object.keys(old).filter(k=>!['novidade','blackFriday','precoBlackFriday'].includes(k)))assert.deepEqual(current[key],old[key],key)
    assert.equal(productId(current,result.products),productId(old,input.products))
    assert.equal(productSlug(current,result.products),productSlug(old,input.products))
    assert.equal(current.entregaRapida,true)
    assert.equal(current.novidade,true)
})

test('histórico registra as duas fotos de Pamela e Mikaelly como evidência de um único modelo',()=>{
    const input=fixture(),result=plan(input),text=JSON.stringify(result.history)
    for(const name of ['Conjunto Pamela','Conjunto Mikaelly']){
        const member=input.members.find(m=>m.nome===name)
        for(const fingerprint of member.sourceImageFingerprints)assert.ok(text.includes(fingerprint.sha256))
        for(const sourceKey of member.sourceKeys)assert.ok(text.includes(sourceKey))
        const p=byName(result.products,name)[0],id=productId(p,result.products)
        assert.equal(result.batch.productIds.filter(value=>value===id).length,1)
    }
})

test('imagem compartilhada de Maisa e Rafaela não mistura categorias nem identidades',()=>{
    const input=fixture(),result=plan(input)
    assert.equal(input.members[10].sourceImageFingerprints[0].sha256,input.members[11].sourceImageFingerprints[0].sha256)
    const camisa=byName(result.products,'Camisa Maisa')[0],saia=byName(result.products,'Saia Rafaela')[0]
    assert.equal(camisa.categoria,'Camisas');assert.equal(saia.categoria,'Saias')
    assert.notEqual(productId(camisa,result.products),productId(saia,result.products))
    assert.notEqual(camisa.imagem,saia.imagem)
})

test('rotação mantém apenas Magnific e lote manual como novidades e devolve Lumina à elegibilidade normal',()=>{
    const input=fixture(),result=plan(input)
    assert.deepEqual(latestBatches(result.history).map(b=>b.id),['magnific','lote-2026-11-28'])
    assert.equal(result.products[2].novidade,false)
    assert.equal(result.products[2].blackFriday,true)
    assert.equal(promotionalCents(result.products[2]),16150)
    assert.equal(result.products[3].novidade,true)
    assert.equal(result.products[3].blackFriday,false)
    assert.equal(result.products.filter(p=>p.novidade).length,13)
    assert.ok(result.products.filter(p=>p.novidade).every(p=>p.blackFriday===false))
    assert.ok(result.products.every(p=>p.disponivel===true))
    assert.equal(result.products.filter(p=>p.entregaRapida).length,1)
})

test('nova âncora cobre todo o prefixo, preserva Magnific como fallback e detecta zero novos',()=>{
    const input=fixture(),oldAnchor=structuredClone(input.history.source.frontier),result=plan(input)
    assert.equal(result.history.source.frontier.batchId,result.batch.id)
    assert.equal(result.history.source.frontier.entries.length,12)
    assert.deepEqual(result.history.source.fallbackFrontiers[0],oldAnchor)
    const boundary=locateFrontier(input.parsed,result.history.source.frontier)
    assert.equal(boundary.startIndex,0)
    assert.equal(boundary.endIndex,14)
    assert.deepEqual(boundary.candidates,[])
})

test('preço público usa cálculo em centavos e custo não entra nos dados públicos ou no histórico',()=>{
    const input=fixture();input.parsed.items[0].supplierPriceCents=12345
    input.expectedSourceSignature=materialSignature(input.parsed)
    const result=plan(input),newer=byName(result.products,'Vestido Roberta')[1]
    assert.equal(newer.precoRegular,234.56)
    assert.equal(newer.preco,null)
    assert.equal(newer.precoBlackFriday,null)
    assert.equal(newer.entregaRapida,false)
    assert.ok(!/"(?:precoBase|supplierPriceCents|precoFornecedor|custo)"/i.test(JSON.stringify(result.history)))
    assert.ok(!/"(?:precoBase|supplierPriceCents|precoFornecedor|custo)"/i.test(JSON.stringify(result.products)))
})

test('bootstrap preserva os argumentos e não altera o estado antigo em memória',()=>{
    const input=fixture(),before=JSON.stringify(input)
    plan(input)
    assert.equal(JSON.stringify(input),before)
})

test('assinatura material diferente da fonte aceita impede bootstrap',()=>{
    const input=fixture();input.parsed.items[0].tamanhos=['EXG']
    assert.throws(()=>plan(input))
})

test('membro omitido ou início não contíguo exige nova revisão humana',()=>{
    const missing=fixture();missing.members.splice(3,1)
    assert.throws(()=>plan(missing))
    const partial=fixture();partial.members[7].sourceKeys.pop()
    assert.throws(()=>plan(partial))
})

test('duas fotos de um nome com grades divergentes não são reunidas silenciosamente',()=>{
    const input=fixture(),photos=input.parsed.items.filter(i=>i.nome==='Conjunto Pamela')
    photos[1].tamanhos=['EXG'];input.expectedSourceSignature=materialSignature(input.parsed)
    assert.throws(()=>plan(input))
})

test('lote já registrado não é criado novamente por uma segunda decisão idêntica',()=>{
    const input=fixture(),result=plan(input)
    assert.throws(()=>plan({...input,products:result.products,history:result.history}))
})

test('reutilização não aceita ID inexistente nem confusão entre camisa e saia',()=>{
    const missing=fixture();missing.members[10].existingId='codigo:inexistente'
    assert.throws(()=>plan(missing))
    const wrongType=fixture();wrongType.members[11].existingId=wrongType.members[10].existingId;wrongType.members[11].classification='reutilizado'
    wrongType.members[11].reuseReason='Mesmo hash compartilhado não basta.'
    assert.throws(()=>plan(wrongType))
})

test('imagem nova exige caminho seguro e fingerprint confirmado',()=>{
    const unsafe=fixture();unsafe.members[0].image.filename='../fora-do-projeto.png'
    assert.throws(()=>plan(unsafe))
    const unknown=fixture();unknown.members[0].image.sha256='desconhecido'
    assert.throws(()=>plan(unknown))
})

test('mudança apenas da assinatura temporária da URL não cria produtos adicionais',()=>{
    const input=fixture()
    for(const item of input.parsed.items)item.imageUrl='https://sites.google.com/sitesv-images-rt/assinatura-renovada-'+item.sourceOrder+'=w1280'
    assert.equal(materialSignature(input.parsed),input.expectedSourceSignature)
    const result=plan(input)
    assert.equal(result.products.length,input.products.length+11)
    assert.equal(locateFrontier(input.parsed,result.history.source.frontier).startIndex,0)
})

test('próxima coleção importa somente o bloco inserido antes do lote manual',async()=>{
    const input=fixture(),bootstrapped=plan(input)
    const future=['Blusa Próxima','Saia Próxima'].map((nome,index)=>({
        nome,categoria:category(nome),codigoFornecedor:'FUT00'+index,tamanhos:['P','M'],cores:null,
        descricao:'Coleção futura sintética de teste',supplierPriceCents:10000,
        sourceKey:'futuro-'+index,imageUrl:'https://lh3.googleusercontent.com/futuro-'+index+'=w800',
        sharedImage:false,reviewReasons:[],
    }))
    const items=[...future,...input.parsed.items].map((item,sourceOrder)=>({...item,sourceOrder}))
    const parsed={...input.parsed,items,stats:{...input.parsed.stats,candidateCount:items.length,recognizedProducts:items.length,productTextBlocks:items.length,imageCount:items.length}}
    const result=await planUpdate({products:bootstrapped.products,history:bootstrapped.history,parsed,now:new Date('2026-12-04T12:00:00.000Z'),loadImage:async url=>({bytes:Buffer.from('bytes sintéticos apenas para o planejador'),metadata:{sha256:digest(url),width:400,height:800,extension:'png',format:'png'}})})
    assert.deepEqual(result.additions.map(a=>a.product.nome),future.map(p=>p.nome))
    assert.equal(result.products.length,bootstrapped.products.length+2)
    assert.equal(result.frontier.startIndex,2)
    assert.equal(result.frontier.candidates.length,2)
    assert.ok(result.additions.every(a=>!names.includes(a.product.nome)))
    assert.deepEqual(latestBatches(result.history).map(b=>b.id),['lote-2026-11-28',result.batch.id])
})
