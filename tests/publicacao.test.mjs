import test from 'node:test'
import assert from 'node:assert/strict'
import {assertPagesConfiguration, publicationPlan} from '../scripts/catalogo/publicar.mjs'
import {productId} from '../scripts/catalogo/model.mjs'
import {imageURL, persistentImageURL, requestBytes} from '../scripts/catalogo/imagens.mjs'

const product = (name, file, code = null) => ({
    nome: name, codigoFornecedor: code, categoria: 'Vestidos', preco: null,
    precoRegular: null, precoBlackFriday: null, tamanhos: ['P'], cores: null,
    novidade: true, blackFriday: false, disponivel: true, entregaRapida: false,
    imagem: 'assets/imagens/produtos/' + file
})
const source = products => 'let produtos = ' + JSON.stringify(products, null, 4) + '\n\nfunction funcionamento() { return true }\n'

function fixture() {
    const before = [product('Vestido Teste', 'vestido-teste.jpg', '0001')]
    const after = [...structuredClone(before), product('Vestido Teste', 'vestido-teste-novo.jpg')]
    const history = {schemaVersion: 1, products: after.map(p => ({id: productId(p, after), evidence: {imageSha256: 'a'.repeat(64)}}))}
    const options = {
        beforeSource: source(before), afterSource: source(after), history,
        changedPaths: ['script.js', 'data/catalog-history.json', after[1].imagem],
        trackedPaths: ['script.js', 'data/catalog-history.json', before[0].imagem]
    }
    return {before, after, options}
}

test('Pages aceita somente origem e identidade já autorizadas', () => {
    const pages = {build_type: 'legacy', source: {branch: 'main', path: '/'}, cname: 'evelinboutiquedelivery.com.br', https_enforced: true}
    assert.doesNotThrow(() => assertPagesConfiguration(pages, {default_branch: 'main'}))
    for(const changed of [{...pages, build_type: 'workflow'}, {...pages, source: {branch: 'gh-pages', path: '/'}}, {...pages, cname: 'outro.example'}, {...pages, https_enforced: false}]){
        assert.throws(() => assertPagesConfiguration(changed, {default_branch: 'main'}))
    }
    assert.throws(() => assertPagesConfiguration(pages, {default_branch: 'outra'}))
})

test('Publicação permite homônimo distinto, imagem nova e arquivos exatos', () => {
    const {options} = fixture(), plan = publicationPlan(options)
    assert.deepEqual(plan.files, options.changedPaths.toSorted())
    assert.equal(plan.newProducts.length, 1)
    assert.equal(plan.imageRecords[0].sha256, 'a'.repeat(64))
})

test('Publicação rejeita alteração fora dos arquivos planejados', () => {
    for(const extra of ['README.md', 'index.html', 'verificacao/relatorio.json', '.github/workflows/injetado.yml']){
        const {options} = fixture()
        assert.throws(() => publicationPlan({...options, changedPaths: [...options.changedPaths, extra]}), /fora da lista/)
    }
    const {options} = fixture()
    assert.throws(() => publicationPlan({...options, changedPaths: options.changedPaths.slice(0, 2)}), /incompleta/)
})

test('Publicação não altera campos antigos nem código do aplicativo', () => {
    for(const [field, value] of [['precoRegular', 7], ['tamanhos', ['G']], ['entregaRapida', true], ['imagem', 'assets/imagens/produtos/outro.jpg'], ['nome', 'Nome diferente']]){
        const {after, options} = fixture()
        after[0][field] = value
        assert.throws(() => publicationPlan({...options, afterSource: source(after)}))
    }
    const {options} = fixture()
    assert.throws(() => publicationPlan({...options, afterSource: options.afterSource.replace('return true', 'return false')}), /fora do array/)
})

test('Publicação bloqueia remoção, colisão de referência e mudança de deep link', () => {
    const {before, after, options} = fixture()
    assert.throws(() => publicationPlan({...options, afterSource: source(before)}), /exige produtos novos/)
    after[1].codigoFornecedor = '0001'
    assert.throws(() => publicationPlan({...options, afterSource: source(after)}))
    const second = fixture()
    assert.throws(() => publicationPlan({...second.options, afterSource: source(second.after.toReversed())}), /Deep link/)
})

test('Publicação bloqueia imagem existente, nome inseguro e original de processamento', () => {
    const {options, after} = fixture()
    assert.throws(() => publicationPlan({...options, trackedPaths: [...options.trackedPaths, after[1].imagem]}), /sobrescreve/)
    for(const file of ['Vestido.jpg', '../fora.jpg', 'vestido original.jpg', 'vestido-original.jpg']){
        const item = fixture()
        item.after[1].imagem = 'assets/imagens/produtos/' + file
        item.options.history.products[1].id = productId(item.after[1], item.after)
        item.options.changedPaths[2] = item.after[1].imagem
        assert.throws(() => publicationPlan({...item.options, afterSource: source(item.after)}), /caminho inseguro/)
    }
})

test('Publicação exige produto novo comprável, sem Entrega rápida e fora da promoção', () => {
    for(const [field, value] of [['entregaRapida', true], ['disponivel', false], ['novidade', false], ['blackFriday', true]]){
        const {after, options} = fixture()
        after[1][field] = value
        assert.throws(() => publicationPlan({...options, afterSource: source(after)}), /Estado inválido/)
    }
})

test('Publicação exige histórico correspondente ao catálogo', () => {
    const {options} = fixture()
    options.history.products.pop()
    assert.throws(() => publicationPlan(options), /Histórico não corresponde/)
})

test('Histórico público preserva URL estável e descarta assinaturas ou credenciais', () => {
    assert.equal(persistentImageURL('https://lh3.googleusercontent.com/imagem-publica=w1280'), 'https://lh3.googleusercontent.com/imagem-publica')
    for(const url of [
        'https://sites.google.com/sitesv-images-rt/assinatura-sintetica=w1280',
        'https://sites.google.com/sitesv/imagem-sintetica',
        'https://lh3.googleusercontent.com/imagem?token=valor-sintetico',
        'https://lh3.googleusercontent.com/imagem?X-Goog-Signature=valor-sintetico',
        'https://lh3.googleusercontent.com/imagem?X-Amz-Credential=valor-sintetico',
        'https://usuario:senha@lh3.googleusercontent.com/imagem',
        'http://lh3.googleusercontent.com/imagem',
        'https://127.0.0.1/imagem',
    ]) assert.equal(persistentImageURL(url), null)
})

test('URL assinada continua permitida para download em memória sem persistir no histórico', async () => {
    const url = 'https://sites.google.com/sitesv-images-rt/assinatura-sintetica=w1280'
    assert.ok(imageURL(url))
    assert.equal(persistentImageURL(url), null)
    let requested
    const result = await requestBytes(url, {fetchImpl:async current => {requested=current;return new Response(new Uint8Array([1,2,3]), {headers:{'content-type':'image/jpeg'}})}})
    assert.equal(requested, url)
    assert.deepEqual([...result.bytes], [1,2,3])
    assert.equal(result.url, url)
})
