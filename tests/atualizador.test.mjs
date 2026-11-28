import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import {SOURCE_URL, digest, readProducts, writeProducts, productId, productSlug, regularPrice, applyBatches, noveltyIds, promotionalCents, validateProducts, assertRuntimeUnchanged} from '../scripts/catalogo/model.mjs'
import {addBatch, guardSource, knownProduct, potentialDuplicates, planUpdate, executeUpdate, assertStableReadings, occurrenceIdentity} from '../scripts/catalogo/atualizador.mjs'
import {imageURL, inspectImage, requestBytes, newImagePath} from '../scripts/catalogo/imagens.mjs'
import {createAnchor} from '../scripts/catalogo/fronteira.mjs'

const product = (name, code = null) => ({nome:name, categoria:'Vestidos', codigoFornecedor:code, preco:null, precoRegular:190, precoBlackFriday:null, tamanhos:['P'], cores:null, novidade:true, blackFriday:false, disponivel:true, entregaRapida:false, imagem:'assets/imagens/produtos/' + name.toLowerCase().replace(/ /g,'-') + '.png'})
function state() {
    const products = [product('Vestido A', '001'), product('Vestido B', '002')]
    const ids = products.map(p => productId(p, products))
    return {products, history:{schemaVersion:1, source:{url:SOURCE_URL, validation:{recognizedProducts:2, productsWithoutImages:0},frontier:createAnchor([{...products[1],productId:ids[1]}],{batchId:'B'})}, baseline:{productCount:2, fastDeliveryIds:[], maxObservedImportSize:2}, batches:ids.map((id,i)=>({id:String.fromCharCode(65+i),label:String.fromCharCode(65+i),legacy:false,productIds:[id]})), products:ids.map((id,i)=>({id,nome:products[i].nome,batchIds:[String.fromCharCode(65+i)],evidence:{imageUrls:[],sourceKeys:[],imageSha256:'hash-'+i},blackFridayEligible:true}))}}
}
const sourceItem = (overrides={}) => ({nome:'Vestido Inédito', codigoFornecedor:'003', categoria:'Vestidos', tamanhos:['P'], cores:null, descricao:null, sourceKey:'fonte-3', imageUrl:'https://lh3.googleusercontent.com/new=s800', supplierPriceCents:10000, sourceOrder:0, sharedImage:false, reviewReasons:[], ...overrides})
const parsed = (candidates,historical=[]) => {const items=[...candidates,sourceItem({nome:'Vestido B',codigoFornecedor:'002'}),...historical].map((item,sourceOrder)=>({...item,sourceOrder}));return {items, errors:[], stats:{productsWithoutImages:0,orphanPriceLines:0,candidateCount:items.length,productTextBlocks:items.length,imageCount:items.length,sectionCount:1}}}
const addition = name => ({product:product('Vestido '+name,'00'+name), evidence:{imageUrls:[],sourceKeys:[],imageSha256:name}})

test('A/B -> B/C -> C/D e sexta sem mudanças não cria lote ou altera objetos', () => {
    let {products,history}=state()
    assert.equal(noveltyIds(history).size,2)
    let result=addBatch(products,history,[addition('C')],new Date('2026-11-27T12:00:00Z'))
    assert.deepEqual(result.products.map(p=>p.novidade),[false,true,true])
    assert.equal(promotionalCents(result.products[0]),16150)
    result=addBatch(result.products,result.history,[addition('D')],new Date('2026-12-04T12:00:00Z'))
    assert.deepEqual(result.products.map(p=>p.novidade),[false,false,true,true])
    const noChange=addBatch(result.products,result.history,[],new Date())
    assert.equal(noChange.batch,null);assert.equal(noChange.products,result.products);assert.equal(noChange.history,result.history)
})
test('arredondamento usa centavos e mantém exatamente 1,90 e 15%',()=>{
    assert.equal(regularPrice(10000),190);assert.equal(regularPrice(21990),417.81);assert.equal(regularPrice(null),null)
    assert.equal(promotionalCents({...product('Exemplo'),novidade:false,blackFriday:true}),16150)
    assert.equal(promotionalCents(product('Exemplo')),null)
})
test('reescrita AST preserva comentários, runtime, IDs e slugs dos homônimos',()=>{
    const one=product('Vestido Igual'),two={...product('Vestido Igual','2'),imagem:'assets/imagens/produtos/variante.png'}
    const source='// antes\nlet produtos = [\n'+JSON.stringify(one)+', // preservar\n]\nconst WHATSAPP_NUMBER = \'5511927322981\'\n// runtime intacto\n'
    const output=writeProducts(source,[{...one,novidade:false},two]);assertRuntimeUnchanged(source,output)
    assert.deepEqual(readProducts(output),[{...one,novidade:false},two]);assert.ok(output.includes('// preservar'))
    assert.equal(productSlug(one,[one]),productSlug(one,[one,two]));assert.equal(productId(one,[one]),productId(one,[one,two]))
})
test('AST não executa expressão arbitrária dentro do array',()=>{
    assert.throws(()=>readProducts('let produtos=[{nome:process.exit()}]'))
})
test('guarda da fonte rejeita login, parsing parcial, ausência em massa e queda de contagem',()=>{
    const {history}=state()
    assert.throws(()=>guardSource({...parsed([]),errors:[{code:'LOGIN'}]},history))
    assert.throws(()=>guardSource({...parsed([]),items:[]},history))
    assert.throws(()=>guardSource({...parsed([sourceItem()]),stats:{...parsed([sourceItem()]).stats,productsWithoutImages:1}},history))
    assert.throws(()=>guardSource({...parsed([sourceItem()]),stats:{...parsed([sourceItem()]).stats,orphanPriceLines:1}},history))
})
test('nome sozinho não vincula e diferença de acento/pequena grafia bloqueia possível duplicata',()=>{
    const {products,history}=state()
    assert.equal(knownProduct([sourceItem({nome:products[0].nome,codigoFornecedor:null})],products,history),null)
    assert.equal(potentialDuplicates(sourceItem({nome:'Vestido Á',codigoFornecedor:null}),products).length,2)
    assert.equal(knownProduct([sourceItem({nome:products[0].nome,codigoFornecedor:'001'})],products,history),products[0])
})
test('URL histórica e nome confirmam cadastro sem usar somente DOM id',()=>{
    const {products,history}=state();history.products[0].evidence.imageUrls=['https://lh3.googleusercontent.com/produto=w1200']
    assert.equal(knownProduct([sourceItem({nome:'Vestido A',codigoFornecedor:null,imageUrl:'https://lh3.googleusercontent.com/produto=w800'})],products,history),products[0])
    assert.equal(knownProduct([sourceItem({nome:'Outro',codigoFornecedor:null,sourceKey:'fonte-3'})],products,history),null)
})
test('ambiguidade no prefixo aborta o lote inteiro em vez de importar parte dele',async()=>{
    const {products,history}=state()
    await assert.rejects(()=>planUpdate({products,history,parsed:parsed([sourceItem({sharedImage:true})]),loadImage:()=>assert.fail('Não baixar compartilhada')}),/nenhum lote será publicado parcialmente/)
})
test('novo produto seguro recebe preço público, compra, sem entrega rápida e sem custo em estado',async()=>{
    const {products,history}=state();const bytes=await sharp({create:{width:300,height:500,channels:3,background:'#123456'}}).png().toBuffer()
    const metadata=await inspectImage(bytes)
    const result=await planUpdate({products,history,parsed:parsed([sourceItem()]),loadImage:async()=>({bytes,metadata}),now:new Date('2026-11-27T12:00:00Z')})
    assert.equal(result.additions.length,1);const p=result.products.at(-1)
    assert.equal(p.precoRegular,190);assert.equal(p.disponivel,true);assert.equal(p.entregaRapida,false);assert.equal(p.blackFriday,false)
    assert.ok(!/supplierPrice|precoBase|10000/.test(JSON.stringify(result.history)))
    validateProducts(result.products,result.history,products)
})
test('colisão de código não altera IDs salvos nem publica homônimo sem confirmação',async()=>{
    const {products,history}=state()
    await assert.rejects(()=>planUpdate({products,history,parsed:parsed([sourceItem({codigoFornecedor:'001'})]),loadImage:()=>assert.fail('Código conflitante')}),/bloco anterior/)
})
test('origens/redirecionamentos fora Google e conteúdo de erro não viram imagens',async()=>{
    assert.throws(()=>imageURL('http://localhost/x'))
    assert.throws(()=>imageURL('https://evil.example/x'))
    await assert.rejects(()=>requestBytes('https://lh3.googleusercontent.com/x',{fetchImpl:async()=>new Response('<html>login</html>',{headers:{'content-type':'text/html'}})}))
    await assert.rejects(()=>requestBytes('https://lh3.googleusercontent.com/x',{fetchImpl:async()=>new Response(null,{status:302,headers:{location:'https://127.0.0.1/a'}})}))
    await assert.rejects(()=>inspectImage(Buffer.from('imagem inválida')))
})
test('formato real determina extensão e nome seguro inclui identidade para homônimos',async()=>{
    const bytes=await sharp({create:{width:300,height:500,channels:3,background:'white'}}).png().toBuffer(),meta=await inspectImage(bytes)
    const a=newImagePath(sourceItem({nome:'Vestido Jéssica'}),meta),b=newImagePath(sourceItem({nome:'Vestido Jéssica',codigoFornecedor:'004'}),meta)
    assert.match(a,/vestido-jessica-[a-f0-9]+\.png$/);assert.notEqual(a,b)
})

test('slugs são únicos inclusive entre homônimo numerado e nome com número literal',()=>{
    const {products,history}=state()
    const first=product('Vestido Aurora','001'),second={...product('Vestido Aurora','002'),imagem:'assets/imagens/produtos/aurora-variante.png'}
    const third=product('Vestido Aurora 2','003'),all=[first,second,third]
    assert.equal(productSlug(second,all),productSlug(third,all))
    const h=structuredClone(history);h.products=all.map(p=>({id:productId(p,all),nome:p.nome,batchIds:['B'],evidence:{imageSha256:'hash'},blackFridayEligible:true}));h.batches=[{id:'B',legacy:false,productIds:h.products.map(p=>p.id)}]
    assert.throws(()=>validateProducts(all,h,products),/deep links/)
})
test('ambiguidade do nome não é descartada como mera falta de preço',async()=>{
    const {products,history}=state()
    await assert.rejects(()=>planUpdate({products,history,parsed:parsed([sourceItem({reviewReasons:['FIELD_AMBIGUOUS_NAME_PRICE']})]),loadImage:()=>assert.fail('Nome ambíguo não pode baixar')}),/bloco anterior/)
})
test('falha no download aborta em vez de informar ausência de novidades',async()=>{
    const {products,history}=state()
    await assert.rejects(()=>planUpdate({products,history,parsed:parsed([sourceItem()]),loadImage:async()=>{throw new Error('HTTP 503')}}),/abortada/)
})
test('mudança de assinatura da URL Google não muda o filename determinístico',()=>{
    const a=sourceItem(),b={...a,imageUrl:'https://sites.google.com/sitesv-images-rt/outra-assinatura=w1280'}
    const meta={sha256:'identidade-dos-bytes',extension:'jpg'}
    assert.equal(newImagePath(a,meta),newImagePath(b,meta))
})

async function fixture(){
    const parent=path.resolve('verificacao/testes-atualizador');await fs.mkdir(parent,{recursive:true})
    const root=await fs.mkdtemp(path.join(parent,'exec-'))
    await fs.mkdir(path.join(root,'assets/imagens/produtos'),{recursive:true});await fs.mkdir(path.join(root,'data'))
    const {products,history}=state()
    for(let i=0;i<products.length;i++){
        const bytes=await sharp({create:{width:300,height:500,channels:3,background:i?'blue':'red'}}).png().toBuffer()
        await fs.writeFile(path.join(root,products[i].imagem),bytes);history.products[i].evidence.imageSha256=digest(bytes)
    }
    const source='let produtos = '+JSON.stringify(products,null,2)+'\nconst WHATSAPP_NUMBER = \'5511927322981\'\n'
    await fs.writeFile(path.join(root,'script.js'),source);await fs.writeFile(path.join(root,'data/catalog-history.json'),JSON.stringify(history))
    const bytes=await sharp({create:{width:300,height:500,channels:3,background:'green'}}).png().toBuffer()
    const html='<!doctype html><html><body><section id="section"><div class="coluna"><div class="tyJCtd"><img src="https://lh3.googleusercontent.com/teste=w1280"></div><div class="tyJCtd" id="novo"><p>Vestido Inédito</p><p>Cód: 003</p><p>(P) R$ 100,00</p></div></div><div class="coluna"><div class="tyJCtd"><img src="https://lh3.googleusercontent.com/ancora=w1280"></div><div class="tyJCtd" id="ancora"><p>Vestido B</p><p>Cód: 002</p><p>(P) R$ 100,00</p></div></div></section></body></html>'
    const fetchImpl=async()=>new Response(bytes,{headers:{'content-type':'image/png'}})
    return {root,source,history,html,fetchImpl}
}
test('dry-run completo não escreve dados/imagens; modo normal valida antes e é idempotente',async()=>{
    const f=await fixture(),historyText=await fs.readFile(path.join(f.root,'data/catalog-history.json'),'utf8')
    const report=await executeUpdate({...f,dryRun:true})
    assert.equal(report.novos,1);assert.equal(report.total,3)
    assert.equal(await fs.readFile(path.join(f.root,'script.js'),'utf8'),f.source)
    assert.equal(await fs.readFile(path.join(f.root,'data/catalog-history.json'),'utf8'),historyText)
    assert.equal((await fs.readdir(path.join(f.root,'assets/imagens/produtos'))).length,2)
    const normal=await executeUpdate(f);assert.equal(normal.novos,1)
    const before=await fs.readFile(path.join(f.root,'script.js'),'utf8')
    const again=await executeUpdate(f);assert.equal(again.novos,0);assert.equal(again.lote,null)
    assert.equal(await fs.readFile(path.join(f.root,'script.js'),'utf8'),before)
})
test('edição externa durante a consulta é preservada, sem rollback em cima do usuário',async()=>{
    const f=await fixture(),sentinel=f.source+'// edição externa\n'
    await assert.rejects(()=>executeUpdate({...f,onReport:async()=>fs.writeFile(path.join(f.root,'script.js'),sentinel)}),/mudou durante/)
    assert.equal(await fs.readFile(path.join(f.root,'script.js'),'utf8'),sentinel)
    assert.equal((await fs.readdir(path.join(f.root,'assets/imagens/produtos'))).length,2)
})
test('arquivo existente nunca é sobrescrito; falha deixa dados anteriores intactos',async()=>{
    const f=await fixture(),report=await executeUpdate({...f,dryRun:true})
    const collision=path.join(f.root,report.imagens[0]);await fs.writeFile(collision,'arquivo preexistente')
    await assert.rejects(()=>executeUpdate(f),/EEXIST/)
    assert.equal(await fs.readFile(collision,'utf8'),'arquivo preexistente')
    assert.equal(await fs.readFile(path.join(f.root,'script.js'),'utf8'),f.source)
})

test('histórico com Saia Yasmim e Blusa Amanda abaixo da âncora produz zero lançamentos',async()=>{
    const {products,history}=state()
    const page=parsed([],[sourceItem({nome:'Saia Yasmim',categoria:'Saias',codigoFornecedor:null,sharedImage:true}),sourceItem({nome:'Blusa Amanda',categoria:'Blusas',codigoFornecedor:null,reviewReasons:['FIELD_CONFLICTING_PRICE']})])
    const before=JSON.stringify(page)
    const result=await planUpdate({products,history,parsed:page,loadImage:()=>assert.fail('Histórico não deve baixar imagem')})
    assert.equal(result.additions.length,0);assert.equal(result.batch,null);assert.equal(result.reviews.length,0)
    assert.equal(result.historicalAmbiguities,2);assert.equal(result.frontier.candidates.length,0)
    assert.equal(JSON.stringify(page),before);assert.equal(result.history,history)
})
test('duas novidades antes da âncora criam um lote e substituem a assinatura para a próxima execução',async()=>{
    const {products,history}=state()
    const one=sourceItem({imageUrl:'https://lh3.googleusercontent.com/a'}),two=sourceItem({nome:'Vestido Aurora',codigoFornecedor:'004',imageUrl:'https://lh3.googleusercontent.com/b'})
    const result=await planUpdate({products,history,parsed:parsed([one,two]),loadImage:async url=>({bytes:Buffer.from(url),metadata:{width:300,height:500,extension:'png',sha256:digest(url)}})})
    assert.equal(result.additions.length,2);assert.equal(result.history.batches.length,3)
    assert.equal(result.history.source.frontier.batchId,result.batch.id)
    assert.equal(result.history.source.frontier.entries.length,2)
    assert.equal(result.products.filter(p=>p.novidade).length,3)
    validateProducts(result.products,result.history,products)
})
test('um item ambíguo bloqueia também os itens seguros do mesmo prefixo',async()=>{
    const {products,history}=state()
    const one=sourceItem(),two=sourceItem({nome:'Vestido Aurora',codigoFornecedor:'004',sharedImage:true})
    await assert.rejects(()=>planUpdate({products,history,parsed:parsed([one,two]),loadImage:async()=>({bytes:Buffer.from('x'),metadata:{width:300,height:500,extension:'png',sha256:'safe-image'}})}),error=>{
        assert.match(error.message,/nenhum lote será publicado parcialmente/)
        assert.equal(error.details.candidatosNovosConfirmados,1);assert.equal(error.details.candidatosNovosAmbiguos,1)
        return true
    })
    assert.equal(history.batches.length,2)
})
test('assinatura antiga ou sequência nova que não cobre o prefixo são rejeitadas',async()=>{
    const {products,history}=state(),wrong=structuredClone(history)
    wrong.source.frontier.batchId='A'
    await assert.rejects(()=>planUpdate({products,history:wrong,parsed:parsed([]),loadImage:()=>{}}),/último lote/)
    history.baseline.maxObservedImportSize=3
    const one=sourceItem({imageUrl:'https://lh3.googleusercontent.com/a'}),two=sourceItem({nome:'Vestido Aurora',codigoFornecedor:'004',imageUrl:'https://lh3.googleusercontent.com/b'})
    await assert.rejects(()=>planUpdate({products,history,parsed:parsed([one,two,one]),loadImage:async url=>({bytes:Buffer.from(url),metadata:{width:300,height:500,extension:'png',sha256:digest(url)}})}),/não cobre todo/)
})
test('duas leituras toleram assinatura Google renovada mas rejeitam mudança material',()=>{
    const first=parsed([sourceItem()]),second=structuredClone(first)
    second.items[0].imageUrl='https://sites.google.com/sitesv-images-rt/nova-assinatura=w1280'
    assert.doesNotThrow(()=>assertStableReadings(first,second))
    second.items[0].tamanhos=['GG']
    assert.throws(()=>assertStableReadings(first,second),/Fonte instável/)
})
test('fonte instável não escreve produto, imagem ou lote no modo normal',async()=>{
    const f=await fixture(),historyText=await fs.readFile(path.join(f.root,'data/catalog-history.json'),'utf8')
    await assert.rejects(()=>executeUpdate({...f,secondHtml:f.html.replace('Vestido Inédito','Vestido Alterado')}),/Fonte instável/)
    assert.equal(await fs.readFile(path.join(f.root,'script.js'),'utf8'),f.source)
    assert.equal(await fs.readFile(path.join(f.root,'data/catalog-history.json'),'utf8'),historyText)
    assert.equal((await fs.readdir(path.join(f.root,'assets/imagens/produtos'))).length,2)
})
test('sem fronteira segura o modo normal preserva todos os dados',async()=>{
    const f=await fixture(),html=f.html.replace('Vestido B','Vestido Desconhecido')
    await assert.rejects(()=>executeUpdate({...f,html}),/fronteira do catálogo não identificada/)
    assert.equal(await fs.readFile(path.join(f.root,'script.js'),'utf8'),f.source)
    assert.equal((await fs.readdir(path.join(f.root,'assets/imagens/produtos'))).length,2)
})
test('modo normal faz duas requisições da página e reconfirma a imagem antes de gravar',async()=>{
    const f=await fixture();let pages=0,images=0
    const bytes=await sharp({create:{width:300,height:500,channels:3,background:'green'}}).png().toBuffer()
    const result=await executeUpdate({root:f.root,renderSource:false,fetchImpl:async url=>{
        if(url===SOURCE_URL){pages++;return new Response(f.html,{headers:{'content-type':'text/html'}})}
        images++;return new Response(bytes,{headers:{'content-type':'image/png'}})
    }})
    assert.equal(pages,2);assert.equal(images,2);assert.equal(result.leiturasFonte,2)
    assert.equal(result.novos,1)
})
test('imagem de lançamento alterada entre leituras aborta antes de gravar',async()=>{
    const f=await fixture();let images=0
    const first=await sharp({create:{width:300,height:500,channels:3,background:'green'}}).png().toBuffer()
    const second=await sharp({create:{width:300,height:500,channels:3,background:'yellow'}}).png().toBuffer()
    await assert.rejects(()=>executeUpdate({...f,fetchImpl:async()=>new Response(++images===1?first:second,{headers:{'content-type':'image/png'}})}),/Fonte instável/)
    assert.equal(await fs.readFile(path.join(f.root,'script.js'),'utf8'),f.source)
    assert.equal((await fs.readdir(path.join(f.root,'assets/imagens/produtos'))).length,2)
})
test('bloco antigo observado e movido para antes da âncora não vira lançamento',async()=>{
    const {products,history}=state(),old=sourceItem()
    history.source.observations=[{sourceKey:old.sourceKey,identityHash:occurrenceIdentity(old)}]
    const changed={...old,tamanhos:['GG'],supplierPriceCents:99999,descricao:'Descrição alterada'}
    await assert.rejects(()=>planUpdate({products,history,parsed:parsed([changed]),loadImage:()=>assert.fail('Não baixar histórico reposicionado')}),error=>{
        assert.match(error.details.revisoes[0].motivo,/reposicionado/);return true
    })
})
