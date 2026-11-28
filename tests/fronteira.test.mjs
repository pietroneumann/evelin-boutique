import test from 'node:test'
import assert from 'node:assert/strict'
import {createAnchor, locateFrontier, locateKnownFrontier, materialSignature, explicitType} from '../scripts/catalogo/fronteira.mjs'

const source = (nome, overrides = {}) => ({
    nome, categoria:nome.startsWith('Saia') ? 'Saias' : nome.startsWith('Blusa') ? 'Blusas' : 'Vestidos',
    codigoFornecedor:null, supplierPriceCents:10000, tamanhos:['P', 'M'], cores:null,
    descricao:'Descrição de teste confirmada', imageUrl:'https://sites.google.com/sitesv-images-rt/assinatura=w1280',
    sourceKey:'bloco:' + nome, sharedImage:false, reviewReasons:[], ...overrides,
})
const original = [source('Vestido Celene'), source('Vestido Cleo'), source('Saia Angela')]
const build = (items = original) => createAnchor(items.map((p, index) => ({
    ...p, productId:'produto-' + index, precoRegular:190,
    aliases:index === 0 ? ['Vestido Celine'] : [], sourceKeys:[], imageUrls:[],
})), {batchId:'magnific'})
const parsed = items => ({items, errors:[], stats:{structuralFormat:'google-sites-tyJCtd-v1'}})
const historical = source('Vestido Histórico', {supplierPriceCents:23456})

test('Caso A: Magnific no topo resulta em zero candidatos', () => {
    const result = locateFrontier(parsed([...original, historical]), build())
    assert.equal(result.startIndex, 0); assert.equal(result.endIndex, 3)
    assert.deepEqual(result.candidates, [])
})
test('Caso B: somente o bloco antes de Magnific é candidato', () => {
    const novo = source('Vestido Novo A')
    const result = locateFrontier(parsed([novo, ...original, historical]), build())
    assert.equal(result.startIndex, 1); assert.deepEqual(result.candidates, [novo])
})
test('Caso C: dois candidatos contíguos pertencem ao mesmo prefixo', () => {
    const novos = [source('Vestido Novo A'), source('Blusa Nova B')]
    const result = locateFrontier(parsed([...novos, ...original, historical]), build())
    assert.deepEqual(result.candidates, novos); assert.equal(result.startIndex, 2)
})
test('Caso D: preço, tamanho, foto e texto histórico alterados continuam fora do prefixo', () => {
    const changed = {...historical, supplierPriceCents:99999, tamanhos:['GG'], descricao:'Texto alterado', imageUrl:'https://lh3.googleusercontent.com/outra-foto'}
    assert.deepEqual(locateFrontier(parsed([...original, changed]), build()).candidates, [])
})
test('Caso E: homônimo antigo abaixo da fronteira não vira lançamento', () => {
    const oldHomonym = source('Vestido Cleo', {supplierPriceCents:11111, descricao:'Outro modelo'})
    assert.deepEqual(locateFrontier(parsed([...original, oldHomonym]), build()).candidates, [])
})
test('Caso F: âncora ausente falha sem tratar a página inteira como novidade', () => {
    assert.throws(() => locateFrontier(parsed([historical]), build()), /^Error: Falha segura: fronteira do catálogo não identificada\./)
})
test('Caso G: sequência parcial ou documento truncado abortam', () => {
    assert.throws(() => locateFrontier(parsed(original.slice(0, 2)), build()), /Falha segura/)
    assert.throws(() => locateFrontier({...parsed(original), errors:[{code:'PARSE_INCOMPLETE_DOCUMENT'}]}, build()), /Falha segura/)
})
test('Caso H: espaços, caixa, acentos e alias confirmado Celine/Celene são reconhecidos', () => {
    const actual = [source('  VESTÍDO   Cel i ne  '), source('Vestido  Cléo'), source('Saia Ângela')]
    assert.equal(locateFrontier(parsed(actual), build()).startIndex, 0)
})
test('Caso I: Saia Yasmim histórica jamais produz Vestido Yasmim', () => {
    const saia = source('Saia Yasmim')
    const input = parsed([...original, saia]), before = JSON.stringify(input)
    assert.deepEqual(locateFrontier(input, build()).candidates, [])
    assert.equal(JSON.stringify(input), before); assert.equal(explicitType(saia.nome), 'saia')
})
test('Caso J: Blusa Amanda histórica jamais produz Vestido Amanda', () => {
    const blusa = source('Blusa Amanda')
    const input = parsed([...original, blusa]), before = JSON.stringify(input)
    assert.deepEqual(locateFrontier(input, build()).candidates, [])
    assert.equal(JSON.stringify(input), before); assert.equal(explicitType(blusa.nome), 'blusa')
})
test('mesmo nome e metadados não autorizam trocar o tipo explícito da âncora', () => {
    assert.throws(() => locateFrontier(parsed([source('Saia Celene'), ...original.slice(1)]), build()), /Falha segura/)
    assert.throws(() => createAnchor([{...original[0], productId:'a', aliases:['Saia Celine']}], {batchId:'a'}), /tipo/)
})
test('nome sozinho e campos desconhecidos não constituem fingerprint suficiente', () => {
    const withoutEvidence = original.map(p => ({...p, supplierPriceCents:null, tamanhos:null, descricao:null}))
    assert.throws(() => locateFrontier(parsed(withoutEvidence), build()), /Falha segura/)
})
test('metadado alterado na âncora pode ser corroborado por outros dois campos', () => {
    const changedPrice = original.map(p => ({...p, supplierPriceCents:20000}))
    assert.equal(locateFrontier(parsed(changedPrice), build()).startIndex, 0)
})
test('código oficial confirmado preserva zeros e corrobora metadados alterados', () => {
    const old = source('Vestido Celene', {codigoFornecedor:'00123'})
    const anchor = createAnchor([{...old, productId:'codigo:00123', precoRegular:190}], {batchId:'a'})
    const changed = {...old, supplierPriceCents:null, tamanhos:null, descricao:null}
    assert.equal(locateFrontier(parsed([changed]), anchor).startIndex, 0)
    assert.throws(() => locateFrontier(parsed([{...changed, codigoFornecedor:'00124'}]), anchor), /Falha segura/)
})
test('não pula produto desconhecido no meio de uma âncora', () => {
    assert.throws(() => locateFrontier(parsed([original[0], source('Blusa Desconhecida'), ...original.slice(1)]), build()), /Falha segura/)
})
test('fotos adjacentes repetidas confirmadas não criam duas fronteiras', () => {
    const actual = [original[0], {...original[0], sourceKey:'outra-foto'}, ...original.slice(1)]
    const result = locateFrontier(parsed(actual), build())
    assert.equal(result.startIndex, 0); assert.equal(result.endIndex, 4)
    assert.deepEqual(result.anchorMatches[0].indices, [0, 1])
})
test('duas sequências completas são ambíguas e abortam', () => {
    assert.throws(() => locateFrontier(parsed([...original, historical, ...original]), build()), /Mais de uma sequência/)
})
test('histórico não contém HTML, custo bruto nem assinatura efêmera de imagem', () => {
    const anchor = build()
    const text = JSON.stringify(anchor)
    assert.ok(!/supplierPriceCents|precoBase|10000|sitesv-images-rt|<html/i.test(text))
    assert.equal(anchor.first, 'produto-0'); assert.equal(anchor.last, 'produto-2')
    assert.equal(anchor.entries[0].precoRegular, 190)
    assert.ok(anchor.entries.every(entry => entry.imageUrls.length === 0))
})
test('assinatura material ignora renovação de URLs assinadas e tamanhos solicitados', () => {
    const a = parsed(original), b = parsed(original.map(p => ({...p, imageUrl:'https://sites.google.com/sitesv-images-rt/nova-assinatura=w640'})))
    assert.equal(materialSignature(a), materialSignature(b))
    assert.notEqual(materialSignature(a), materialSignature(parsed([...original, historical])))
    assert.notEqual(materialSignature(a), materialSignature(parsed(original.map(p => ({...p, tamanhos:['GG']})))))
})
test('assinatura corrompida falha de forma segura', () => {
    const anchor = build(); anchor.entries[0].tipo = 'saia'
    assert.throws(() => locateFrontier(parsed(original), anchor), /Assinatura/)
})

const magnificNames = ['Vestido Celene','Vestido Cleo','Vestido Giovana','Vestido Evelin','Vestido Geisa','Vestido Simône','Vestido Clara','Vestido Paula','Vestido Clarita','Blusa Betania','Saia Lúcia','Camisa Sara','Saia Joana','Camisa Lorena','Saia Angela']
const magnific = () => magnificNames.map((nome,index)=>source(nome,{categoria:nome.startsWith('Camisa')?'Camisas':nome.startsWith('Blusa')?'Blusas':nome.startsWith('Saia')?'Saias':'Vestidos',sourceKey:'magnific-'+index}))

test('quórum: âncora completa de quinze identifica o início e apresenta score',()=>{
    const items=magnific(),result=locateFrontier(parsed(items),build(items))
    assert.equal(result.matchedCount,15);assert.equal(result.foundCount,15);assert.equal(result.startIndex,0)
    assert.equal(result.confidence,'alta');assert.ok(result.score>=95);assert.equal(result.density,1)
    assert.deepEqual(result.missingIds,[]);assert.equal(result.quorum.minimumMatches,12)
})

for(const missing of [[4],[4,7],[4,7,11]]){
    test(`quórum: ${missing.length} ausência(s) dentro da Magnific não invalida(m) o novo lote`,()=>{
        const items=magnific(),current=items.filter((_,i)=>!missing.includes(i)),prefix=[source('Vestido Lançamento')]
        const result=locateFrontier(parsed([...prefix,...current,historical]),build(items))
        assert.equal(result.startIndex,1);assert.equal(result.matchedCount,15-missing.length)
        assert.deepEqual(result.missingIds,missing.map(i=>'produto-'+i))
        assert.deepEqual(result.candidates,prefix);assert.ok(result.score>=80)
        assert.equal(result.endIndex,1+current.length)
    })
}

test('quórum: quatro ausências de quinze ficam abaixo do mínimo e abortam',()=>{
    const items=magnific(),current=items.filter((_,i)=>![4,7,10,13].includes(i))
    assert.throws(()=>locateFrontier(parsed(current),build(items)),error=>{
        assert.match(error.message,/Quórum ou proximidade/)
        assert.equal(error.details.quorum.minimumMatches,12)
        assert.equal(error.details.bestAttempt.matchedCount,11)
        return true
    })
})

test('primeiro item ausente: início em Cleo é inferido quando o predecessor é inequivocamente outro produto',()=>{
    const items=magnific(),prefix=[source('Vestido Lançamento')]
    const result=locateFrontier(parsed([...prefix,...items.slice(1),historical]),build(items))
    assert.equal(result.startIndex,1);assert.equal(result.firstAnchorIndex,1)
    assert.equal(result.matchedCount,14);assert.deepEqual(result.missingIds,['produto-0'])
    assert.deepEqual(result.candidates,prefix)
})

test('primeiro item apenas alterado: nome plausível sem evidência impede transformá-lo em lançamento',()=>{
    const items=magnific(),changed={...items[0],supplierPriceCents:null,tamanhos:null,descricao:null}
    assert.throws(()=>locateFrontier(parsed([changed,...items.slice(1),historical]),build(items)),/início exato/)
})

test('primeiro item com grafia duvidosa é ambíguo, não um match nem um candidato automático',()=>{
    const items=magnific(),changed={...items[0],nome:'Vestido Celena',supplierPriceCents:null,tamanhos:null,descricao:null}
    assert.throws(()=>locateFrontier(parsed([changed,...items.slice(1),historical]),build(items)),/início exato/)
})

test('último item ausente: histórico seguinte permanece fora do prefixo',()=>{
    const items=magnific(),result=locateFrontier(parsed([...items.slice(0,-1),historical]),build(items))
    assert.equal(result.startIndex,0);assert.equal(result.endIndex,14)
    assert.equal(result.matchedCount,14);assert.deepEqual(result.missingIds,['produto-14'])
    assert.deepEqual(result.candidates,[])
})

test('preço e tamanhos alterados simultaneamente são auxiliares quando a imagem confirmada permanece',()=>{
    const items=magnific(),entries=items.map((item,index)=>({...item,productId:'produto-'+index,precoRegular:190,imageSha256:'hash-imagem-'+index}))
    const anchor=createAnchor(entries,{batchId:'magnific'})
    const changed=items.map((item,index)=>({...item,supplierPriceCents:12345,tamanhos:['GG'],imageSha256:'hash-imagem-'+index}))
    const result=locateFrontier(parsed(changed),anchor)
    assert.equal(result.matchedCount,15);assert.ok(result.anchorMatches.every(m=>m.evidence.strong.includes('imagem-sha256')))
})

test('nomes conhecidos espalhados por centenas de itens não satisfazem proximidade',()=>{
    const items=magnific(),scattered=[]
    for(const item of items){scattered.push(item);for(let j=0;j<24;j++)scattered.push(source('Vestido Histórico Distinto '+scattered.length))}
    assert.throws(()=>locateFrontier(parsed(scattered),build(items)),/Quórum ou proximidade/)
})

test('poucos itens desconhecidos dentro da janela não expandem o prefixo de lançamentos',()=>{
    const items=magnific(),current=[...items.slice(0,6),source('Vestido Alteração Local'),...items.slice(6)]
    const result=locateFrontier(parsed(current),build(items))
    assert.equal(result.matchedCount,15);assert.equal(result.startIndex,0)
    assert.equal(result.endIndex,16);assert.ok(result.density>=.8);assert.deepEqual(result.candidates,[])
})

test('interferência extensa dentro da janela perde densidade mesmo com nomes suficientes',()=>{
    const items=magnific(),current=[]
    for(const [i,item] of items.entries()){current.push(item);if(i<8)current.push(source('Vestido Intermediário '+i))}
    assert.throws(()=>locateFrontier(parsed(current),build(items)),/Quórum ou proximidade/)
})

test('muitos nomes presentes mas apenas onze ordenados não obtêm o quórum de doze',()=>{
    const items=magnific(),current=[items[0],items[1],items[2],items[3],items[8],items[5],items[6],items[7],items[13],items[14],items[9],items[10],items[11],items[12]]
    assert.throws(()=>locateFrontier(parsed(current),build(items)),error=>{
        assert.equal(error.details.bestAttempt.matchedCount,11)
        return true
    })
})

test('duas coleções separadas com quórum parcial também são ambíguas',()=>{
    const items=magnific(),partial=items.filter((_,i)=>i!==4)
    assert.throws(()=>locateFrontier(parsed([...partial,historical,...partial]),build(items)),/Mais de uma sequência/)
})

test('duplicatas adjacentes não aumentam artificialmente a cobertura',()=>{
    const items=magnific(),tooFew=items.slice(0,10).flatMap(item=>[item,{...item}])
    assert.throws(()=>locateFrontier(parsed(tooFew),build(items)),/Quórum ou proximidade/)
})

test('um único nome forte entre quinze jamais reconhece a coleção',()=>{
    const items=magnific(),current=[items[0],...Array.from({length:14},(_,i)=>source('Vestido Outra Coleção '+i))]
    assert.throws(()=>locateFrontier(parsed(current),build(items)),/Quórum ou proximidade/)
})

test('marcação explícita de invisibilidade impede contabilizar uma âncora fantasma',()=>{
    const items=magnific(),current=items.map(item=>({...item,visible:false}))
    assert.throws(()=>locateFrontier(parsed(current),build(items)),/Quórum ou proximidade/)
})

test('dezenas de retratos repetidos não escondem uma janela bruta excessiva',()=>{
    const items=magnific(),current=[...Array.from({length:50},()=>({...items[0]})),...items.slice(1)]
    assert.throws(()=>locateFrontier(parsed(current),build(items)),error=>{
        assert.equal(error.details.bestAttempt.validated,false)
        assert.equal(error.details.bestAttempt.confidence,'insuficiente')
        assert.ok(error.details.bestAttempt.rawSpan>error.details.quorum.maximumRawWindow)
        return true
    })
})

test('uma foto alternativa por item ainda é um bloco compacto',()=>{
    const items=magnific(),current=items.flatMap(item=>[item,{...item,sourceKey:item.sourceKey+'-foto-2'}])
    const result=locateFrontier(parsed(current),build(items))
    assert.equal(result.matchedCount,15);assert.equal(result.rawSpan,30);assert.equal(result.validated,true)
})

const acceptedNames=['Vestido Roberta','Vestido Isabel','Vestido Yasmim','Vestido Mariah','Vestido Tina','Vestido Fernanda','Vestido Amanda','Conjunto Pamela','Conjunto Mikaelly','Conjunto Dafne','Camisa Maisa','Saia Rafaela']
const acceptedItems=()=>acceptedNames.map((nome,index)=>source(nome,{
    categoria:nome.startsWith('Conjunto')?'Conjuntos':nome.startsWith('Camisa')?'Camisas':nome.startsWith('Saia')?'Saias':'Vestidos',
    sourceKey:'atual-'+index,imageSha256:index>=10?'foto-compartilhada':'foto-'+index,
}))
const acceptedAnchor=items=>createAnchor(items.map((item,index)=>({
    ...item,productId:'atual-produto-'+index,precoRegular:190,
    sourceKeys:[item.sourceKey,...([7,8].includes(index)?[item.sourceKey+'-alternativa']:[])],
    imageSha256Alternatives:[7,8].includes(index)?['foto-alternativa-'+index]:[],
})),{batchId:'lote-2026-11-28'})
const knownSource=items=>({frontier:acceptedAnchor(items),fallbackFrontiers:[build(magnific())]})
const alternativePhotos=items=>items.flatMap((item,index)=>[7,8].includes(index)
    ? [item,{...item,sourceKey:item.sourceKey+'-alternativa',imageSha256:'foto-alternativa-'+index}]
    : [item])

test('nova âncora: doze modelos com quatorze fotos resultam em zero produtos candidatos',()=>{
    const items=acceptedItems(),result=locateKnownFrontier(parsed([...alternativePhotos(items),...magnific(),historical]),knownSource(items))
    assert.equal(result.startIndex,0);assert.equal(result.endIndex,14);assert.equal(result.matchedCount,12)
    assert.deepEqual(result.candidates,[]);assert.equal(result.score,100)
    assert.equal(result.anchorUsed,'lote-2026-11-28');assert.equal(result.fallbackUsed,false)
})

test('nova coleção futura: somente o prefixo antes do lote aceito é candidato',()=>{
    const items=acceptedItems(),future=[source('Vestido Próxima Coleção'),source('Blusa Próxima Coleção')]
    const result=locateKnownFrontier(parsed([...future,...alternativePhotos(items),...magnific(),historical]),knownSource(items))
    assert.equal(result.startIndex,2);assert.deepEqual(result.candidates,future)
    assert.equal(result.endIndex,16);assert.equal(result.fallbackUsed,false)
})

for(const absent of [[4],[4,6]]){
    test(`nova âncora tolera ${absent.length} ausência(s) sem importar a coleção conhecida`,()=>{
        const items=acceptedItems(),actual=items.filter((_,i)=>!absent.includes(i))
        const result=locateKnownFrontier(parsed([...actual,...magnific()]),knownSource(items))
        assert.equal(result.startIndex,0);assert.equal(result.matchedCount,12-absent.length)
        assert.equal(result.quorum.minimumMatches,10);assert.equal(result.fallbackUsed,false)
        assert.deepEqual(result.candidates,[])
    })
}

test('nova âncora sem primeiro produto mantém limite seguro diante de um lançamento distinto',()=>{
    const items=acceptedItems(),future=source('Vestido Próxima Coleção')
    const result=locateKnownFrontier(parsed([future,...items.slice(1),...magnific()]),knownSource(items))
    assert.equal(result.startIndex,1);assert.equal(result.firstAnchorIndex,1)
    assert.deepEqual(result.candidates,[future])
})

test('nova âncora aceita mudança de preço confirmada por identidades fortes',()=>{
    const items=acceptedItems(),actual=items.map(item=>({...item,supplierPriceCents:45678}))
    const result=locateKnownFrontier(parsed([...actual,...magnific()]),knownSource(items))
    assert.equal(result.matchedCount,12);assert.equal(result.fallbackUsed,false)
})

test('nova âncora aceita mudança de tamanho e preço sem transformar metadados em identidade absoluta',()=>{
    const items=acceptedItems(),actual=items.map(item=>({...item,supplierPriceCents:45678,tamanhos:['EXG']}))
    assert.equal(locateKnownFrontier(parsed([...actual,...magnific()]),knownSource(items)).matchedCount,12)
})

test('nova âncora não depende da assinatura efêmera da URL de imagem',()=>{
    const items=acceptedItems(),actual=items.map((item,index)=>({...item,imageUrl:'https://sites.google.com/sitesv-images-rt/token-renovado-'+index+'=w640'}))
    const result=locateKnownFrontier(parsed([...actual,...magnific()]),knownSource(items))
    assert.equal(result.matchedCount,12);assert.deepEqual(result.candidates,[])
})

for(const index of [7,8]){
    test(`somente a foto alternativa de ${acceptedNames[index]} continua sendo o mesmo modelo`,()=>{
        const items=acceptedItems(),actual=items.map((item,i)=>i===index
            ? {...item,sourceKey:'identificador-renovado',supplierPriceCents:null,tamanhos:null,descricao:null,imageSha256:'foto-alternativa-'+index}
            : item)
        const result=locateKnownFrontier(parsed([...actual,...magnific()]),knownSource(items))
        assert.equal(result.matchedCount,12)
        assert.ok(result.anchorMatches[index].evidence.strong.includes('imagem-sha256'))
        assert.deepEqual(result.candidates,[])
    })
}

test('Maisa e Rafaela com uma imagem compartilhada continuam duas identidades tipadas',()=>{
    const items=acceptedItems(),result=locateKnownFrontier(parsed(items),knownSource(items))
    assert.equal(items[10].imageSha256,items[11].imageSha256)
    assert.equal(result.matchedCount,12)
    assert.notEqual(result.anchorMatches[10].productId,result.anchorMatches[11].productId)
    assert.deepEqual(result.anchorMatches[10].indices,[10]);assert.deepEqual(result.anchorMatches[11].indices,[11])
})

test('hash compartilhado sozinho não converte uma peça em outra identidade',()=>{
    const items=acceptedItems(),actual=items.map((item,index)=>index===10?{...item,nome:'Camisa Modelo Distinto'}:item)
    const result=locateKnownFrontier(parsed(actual),knownSource(items))
    assert.equal(result.matchedCount,11)
    assert.ok(!result.anchorMatches.some(match=>match.productId==='atual-produto-10'))
})

test('fallback Magnific sustenta cabeça forte de bloco parcial sem oferecer o lote conhecido como novo',()=>{
    const items=acceptedItems(),future=source('Vestido Próxima Coleção'),partial=items.slice(0,7)
    const result=locateKnownFrontier(parsed([future,...partial,...magnific(),historical]),knownSource(items))
    assert.equal(result.fallbackUsed,true);assert.equal(result.anchorUsed,'magnific')
    assert.equal(result.anchorBatchId,'lote-2026-11-28');assert.equal(result.startIndex,1)
    assert.equal(result.endIndex,8);assert.equal(result.secondaryStartIndex,8)
    assert.equal(result.primaryQuorumValidated,false);assert.equal(result.primaryFoundCount,7)
    assert.deepEqual(result.candidates,[future])
    assert.equal(result.confidence,'alta-com-fallback')
})

test('fallback Magnific no topo e nova âncora ausente resultam em zero candidatos',()=>{
    const items=acceptedItems(),result=locateKnownFrontier(parsed([...magnific(),historical]),knownSource(items))
    assert.equal(result.fallbackUsed,true);assert.equal(result.primaryAbsent,true)
    assert.equal(result.startIndex,0);assert.deepEqual(result.candidates,[])
})

test('fallback não deduz remoção completa da principal para cadastrar um prefixo desconhecido',()=>{
    const items=acceptedItems(),input=parsed([source('Vestido Próxima Coleção'),...magnific()])
    assert.throws(()=>locateKnownFrontier(input,knownSource(items)),/cabeça exata/)
})

test('fallback aborta se a cabeça principal estiver ausente abaixo do quórum',()=>{
    const items=acceptedItems(),input=parsed([source('Vestido Próxima Coleção'),...items.slice(1,8),...magnific()])
    assert.throws(()=>locateKnownFrontier(input,knownSource(items)),/cabeça exata/)
})

test('fallback aborta se um produto desconhecido estiver misturado ao bloco principal parcial',()=>{
    const items=acceptedItems(),partial=[...items.slice(0,3),source('Vestido Não Identificado'),...items.slice(3,7)]
    assert.throws(()=>locateKnownFrontier(parsed([...partial,...magnific()]),knownSource(items)),/item não identificado/)
})

test('fallback aborta com bloco parcial reordenado mesmo diante de Magnific válida',()=>{
    const items=acceptedItems(),partial=[items[0],items[2],items[1],...items.slice(3,7)]
    assert.throws(()=>locateKnownFrontier(parsed([...partial,...magnific()]),knownSource(items)),/ordem relativa/)
})

test('fallback não aceita somente a cabeça e poucas identidades da nova âncora',()=>{
    const items=acceptedItems(),partial=items.slice(0,5)
    assert.throws(()=>locateKnownFrontier(parsed([...partial,...magnific()]),knownSource(items)),/faltam identidades/)
})

test('fallback não transforma possível primeiro produto alterado em lançamento',()=>{
    const items=acceptedItems(),suspicious={...items[1],sourceKey:'mudou',supplierPriceCents:null,tamanhos:null,descricao:null,imageSha256:null}
    assert.throws(()=>locateKnownFrontier(parsed([suspicious,...items.slice(0,7),...magnific()]),knownSource(items)),/candidato anterior/)
})

test('nenhuma âncora reconhecível falha com segurança e registra as tentativas',()=>{
    const items=acceptedItems()
    assert.throws(()=>locateKnownFrontier(parsed([historical]),knownSource(items)),error=>{
        assert.match(error.message,/Nem a âncora principal nem uma secundária/)
        assert.equal(error.details.anchorAttempts.length,2)
        return true
    })
})

test('fallback nunca encobre assinatura principal corrompida',()=>{
    const items=acceptedItems(),known=knownSource(items)
    known.frontier.entries[0].tipo='saia'
    assert.throws(()=>locateKnownFrontier(parsed(magnific()),known),/Assinatura/)
})

test('fallback não resolve duas fronteiras primárias com quórum conflitante',()=>{
    const items=acceptedItems(),input=parsed([...items,historical,...items,...magnific()])
    assert.throws(()=>locateKnownFrontier(input,knownSource(items)),/Mais de uma sequência/)
})

test('fingerprints alternativos são opcionais e não modificam a assinatura de âncoras antigas',()=>{
    const items=acceptedItems(),entries=items.map((item,index)=>({...item,productId:'id-'+index,precoRegular:190}))
    const old=createAnchor(entries,{batchId:'antiga'}),empty=createAnchor(entries.map(item=>({...item,imageSha256Alternatives:[]})),{batchId:'antiga'})
    assert.deepEqual(old,empty)
    assert.ok(old.entries.every(entry=>!Object.hasOwn(entry,'imageSha256Alternatives')))
})
