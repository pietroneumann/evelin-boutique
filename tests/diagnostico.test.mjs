import test from 'node:test'
import assert from 'node:assert/strict'
import {reconcileRendered,readVerifiedCatalog} from '../scripts/catalogo/diagnostico.mjs'
const item=(key,nome='Vestido Aurora')=>({sourceKey:key,nome,categoria:'Vestidos',codigoFornecedor:null,tamanhos:['P'],cores:null,descricao:'Tecido confirmado',supplierPriceCents:10000,imageUrl:'https://lh3.googleusercontent.com/foto=w1280',sharedImage:false,reviewReasons:[],sourceOrder:0})
const parsed=items=>({items,errors:[],stats:{candidateCount:items.length,recognizedProducts:items.length,structuralFormat:'google-sites-tyJCtd-v1'}})
const node=(key,order,visible=true)=>({sourceKey:key,visible,visualOrder:order,reason:visible?null:'hidden-ancestor',alternatives:1,dimensions:{width:100,height:30},top:order*50,left:0})
const rendered=(items,nodes)=>({items,nodes,parseErrors:[],metadata:{url:'https://sites.google.com/view/mariaamorecatalogo/cat%C3%A1logo'},screenshots:[]})
test('HTTP e Chrome iguais mantêm produtos e ordem visual',()=>{
    const items=[item('a'),item('b','Vestido Boreal')],result=reconcileRendered(parsed(items),rendered(items,[node('a',0),node('b',1)]))
    assert.equal(result.comparison.materialDifferences,0);assert.equal(result.parsed.items.length,2)
})
test('somente ocultação comprovada exclui versão alternativa',()=>{
    const items=[item('desktop'),item('mobile')],result=reconcileRendered(parsed(items),rendered(items,[node('desktop',0),node('mobile',null,false)]))
    assert.equal(result.parsed.items.length,1);assert.equal(result.comparison.hiddenCount,1)
    assert.equal(result.comparison.domOrderChanged,false)
    assert.throws(()=>reconcileRendered(parsed(items),rendered(items,[node('desktop',0),{...node('mobile',null,false),reason:'source-node-not-found',alternatives:0}])),/não pode ser tratado/)
})
test('clone oculto com mesmo id não duplica produto nem métrica',()=>{
    const first=item('a'),result=reconcileRendered(parsed([first,{...first}]),rendered([first,{...first}],[{...node('a',0),alternatives:2,hiddenAlternatives:1}]))
    assert.equal(result.parsed.items.length,1);assert.equal(result.comparison.hiddenDuplicates,1)
})
test('duas variantes visíveis ou variantes materialmente diferentes são ambíguas',()=>{
    const a=item('a')
    assert.throws(()=>reconcileRendered(parsed([a]),rendered([a],[{...node('a',0),ambiguousVisible:true}])),/Mais de uma variante/)
    assert.throws(()=>reconcileRendered(parsed([a]),rendered([{...a,tamanhos:['GG']}],[node('a',0)])),/dados materiais diferentes/)
})
test('duas fotos realmente visíveis do mesmo nome não são deduplicadas',()=>{
    const items=[item('foto1'),{...item('foto2'),imageUrl:'https://lh3.googleusercontent.com/outra-foto'}]
    const result=reconcileRendered(parsed(items),rendered(items,[node('foto1',0),node('foto2',1)]))
    assert.equal(result.parsed.items.length,2);assert.equal(result.comparison.hiddenDuplicates,0)
})
test('ordem DOM diferente pode ser reconciliada somente pela geometria exibida',()=>{
    const items=[item('a'),item('b','Vestido Boreal')]
    const result=reconcileRendered(parsed(items),rendered(items,[node('a',1),node('b',0)]))
    assert.deepEqual(result.parsed.items.map(i=>i.sourceKey),['b','a']);assert.equal(result.comparison.domOrderChanged,true)
})
test('diferença no conjunto HTTP/Chrome não é ignorada',()=>{
    assert.throws(()=>reconcileRendered(parsed([item('a')]),rendered([item('b')],[node('b',0)])),/conjuntos de produtos diferentes/)
})
const html=name=>`<!doctype html><html><body><section id="sec"><div class="coluna"><div class="tyJCtd"><img src="https://lh3.googleusercontent.com/foto"></div><div class="tyJCtd" id="produto"><p>Vestido ${name}</p><p>(P) R$ 100,00</p></div></div></section></body></html>`
const renderer=async({parsedItems})=>rendered(parsedItems,parsedItems.map((i,index)=>node(i.sourceKey,index)))
test('duas consultas HTTP e renderizações independentes concordantes passam',async()=>{
    let calls=0,views=0
    const result=await readVerifiedCatalog({root:process.cwd(),fetchImpl:async()=>{calls++;return new Response(html('Aurora'),{headers:{'content-type':'text/html'}})},renderSource:async options=>{views++;return renderer(options)}})
    assert.equal(calls,2);assert.equal(views,2);assert.equal(result.first.items.length,1)
})
test('edição da fonte entre ciclos HTTP/Chrome falha com segurança',async()=>{
    let calls=0
    await assert.rejects(()=>readVerifiedCatalog({root:process.cwd(),fetchImpl:async()=>new Response(html(++calls===1?'Aurora':'Alterado'),{headers:{'content-type':'text/html'}}),renderSource:renderer}),/Fonte instável/)
})
