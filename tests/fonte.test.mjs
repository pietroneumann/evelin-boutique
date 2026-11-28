import test from 'node:test'
import assert from 'node:assert/strict'
import {parseCatalogo, URL_CATALOGO} from '../scripts/catalogo/fonte.mjs'

const imagem = 'https://sites.google.com/sitesv-images-rt/imagem-autorizada-de-teste=w1280'
const p = text => `<p>${text}</p>`
const foto = (url = imagem) => `<div class="tyJCtd"><img src="${url}" role="img"></div>`
const coluna = (id, linhas, {image = imagem, withImage = true} = {}) => `<div class="coluna">${withImage ? foto(image) : ''}<div id="${id}" class="tyJCtd">${linhas.map(p).join('')}</div></div>`
const pagina = (...colunas) => `<!doctype html><html><body><main><section id="secao-teste">${colunas.join('')}</section></main></body></html>`
const ler = (linhas, options) => parseCatalogo(pagina(coluna('modulo-teste', linhas, options)))

test('HTML truncado com produtos aparentemente válidos exige revisão', () => {
    const html = pagina(coluna('modulo-teste', ['Vestido Exemplo', '(P) R$ 100,00']))
    assert.ok(parseCatalogo(html.replace('</body></html>', '')).errors.some(e => e.code === 'PARSE_INCOMPLETE_DOCUMENT'))
})

test('concatena spans sem criar espaços dentro do nome ou do valor', () => {
    const result = ler(['Vestido <span>Au</span><span>rora</span>', '(PP, P, M) R$ <span>1</span><span>00,01</span>', 'Com zíper', 'Tecido de teste confirmado'])
    assert.equal(result.items.length, 1)
    assert.equal(result.items[0].nome, 'Vestido Aurora')
    assert.equal(result.items[0].supplierPriceCents, 10001)
    assert.deepEqual(result.items[0].tamanhos, ['PP', 'P', 'M'])
    assert.equal(result.items[0].sourcePage, URL_CATALOGO)
    assert.equal(result.items[0].sourceKey, 'modulo-teste:produto:1')
    assert.equal(result.items[0].descricao, 'Com zíper. Tecido de teste confirmado')
    assert.deepEqual(result.errors, [])
})

test('associa duas peças de uma mesma foto sem misturar grades e descrições', () => {
    const result = ler(['Blusa Aurora', '(P, M) R$ 100,00', 'Com botão', 'Saia Boreal', '(G, GG) R$ 200,00', 'Com zíper'])
    assert.deepEqual(result.items.map(x => x.nome), ['Blusa Aurora', 'Saia Boreal'])
    assert.deepEqual(result.items.map(x => x.tamanhos), [['P', 'M'], ['G', 'GG']])
    assert.deepEqual(result.items.map(x => x.descricao), ['Com botão', 'Com zíper'])
    assert.ok(result.items.every(x => x.sharedImage && x.imageUrl === imagem))
    assert.deepEqual(result.items.map(x => x.sourceOrder), [0, 1])
    assert.equal(new Set(result.items.map(x => x.sourceKey)).size, 2)
})

test('não reduz ocorrências repetidas de um mesmo nome a um produto', () => {
    const result = parseCatalogo(pagina(
        coluna('foto-a', ['Vestido Aurora', '(P, M) R$ 100,00']),
        coluna('foto-b', ['Vestido Aurora', '(G, GG) R$ 100,00'], {image: imagem.replace('teste', 'variante')}),
    ))
    assert.equal(result.items.length, 2)
    assert.ok(result.items.every(x => !x.sharedImage))
    assert.notEqual(result.items[0].sourceKey, result.items[1].sourceKey)
})

test('descrições de peças e componentes de conjunto não viram produtos inventados', () => {
    const result = ler(['Conjunto Aurora', '(P, M) R$ 100,00', 'Blusa', 'Com botões', 'Blusa manga curta', 'Saia', 'Saia com zíper', 'Saia midi gode com zíper', 'Blusa peplum com botões não funcionais', 'Tecido de teste'])
    assert.equal(result.items.length, 1)
    assert.equal(result.items[0].nome, 'Conjunto Aurora')
    assert.ok(result.items[0].descricao.includes('Saia com zíper'))
})

test('tipo explícito fora das categorias principais preserva o nome em Outros', () => {
    const result = ler(['Trijunto Aurora', '(P, M) R$ 100,00', 'Blusa manga longa', 'Colete com botões', 'Saia com zíper'])
    assert.equal(result.items.length, 1)
    assert.equal(result.items[0].categoria, 'Outros')
    assert.equal(result.items[0].nome, 'Trijunto Aurora')
})

test('título composto explícito no início do módulo não é descartado como descrição', () => {
    const result = ler(['Salopete com blusa Aurora', '(P, M) R$ 100,00', 'Blusa gola laço', 'Tecido confirmado'])
    assert.equal(result.items.length, 1)
    assert.equal(result.items[0].nome, 'Salopete com blusa Aurora')
})

test('código explícito continua string e conserva zeros à esquerda', () => {
    const result = ler(['Blusa Aurora', 'Cód: 00123 (P,M,G) R$ 100,00'])
    assert.equal(result.items[0].codigoFornecedor, '00123')
    assert.deepEqual(result.items[0].tamanhos, ['P', 'M', 'G'])
})

test('campos ausentes são null e cores não são deduzidas de foto ou descrição', () => {
    const result = ler(['Blusa Aurora', 'Tecido de teste'])
    const item = result.items[0]
    assert.equal(item.codigoFornecedor, null)
    assert.equal(item.supplierPriceCents, null)
    assert.equal(item.tamanhos, null)
    assert.equal(item.cores, null)
    assert.equal(result.errors.length, 0)
})

test('cores só são extraídas quando rotuladas explicitamente', () => {
    const result = ler(['Blusa Aurora', '(P) R$ 100,00', 'Cores: azul marinho, bege', 'A foto mostra vermelho'])
    assert.deepEqual(result.items[0].cores, ['azul marinho', 'bege'])
})

test('grade numérica explicitamente delimitada é preservada', () => {
    const result = ler(['Saia Aurora', 'Cód: 00123 (48I50I52I54) R$ 100,00'])
    assert.deepEqual(result.items[0].tamanhos, ['48', '50', '52', '54'])
})

test('grade ambígua ou com informação desconhecida fica null para revisão', () => {
    for(const linha of ['(GG 48,52,54) R$ 100,00', '(P,M,modelo especial) R$ 100,00']){
        const item = ler(['Saia Aurora', linha]).items[0]
        assert.equal(item.tamanhos, null)
        assert.ok(item.reviewReasons.includes('FIELD_AMBIGUOUS_SIZES'))
    }
})

test('grades conflitantes não são unidas silenciosamente', () => {
    const item = ler(['Blusa Aurora', '(P,M) R$ 100,00', '(G,GG)']).items[0]
    assert.equal(item.tamanhos, null)
    assert.ok(item.reviewReasons.includes('FIELD_CONFLICTING_SIZES'))
})

test('preço malformado ou contraditório é null, sem número inventado', () => {
    const malformed = ler(['Blusa Aurora', '(P,M) R$ 100,0']).items[0]
    assert.equal(malformed.supplierPriceCents, null)
    assert.ok(malformed.reviewReasons.includes('FIELD_UNREADABLE_PRICE'))
    const conflict = ler(['Blusa Aurora', '(P,M) R$ 100,00', 'R$ 200,00']).items[0]
    assert.equal(conflict.supplierPriceCents, null)
    assert.ok(conflict.reviewReasons.includes('FIELD_CONFLICTING_PRICE'))
})

test('preço na linha do nome não entra na identidade textual do produto', () => {
    const result = ler(['Vestido Aurora 100,00', '(P,M) R$'])
    assert.equal(result.items[0].nome, 'Vestido Aurora')
    assert.ok(result.items[0].reviewReasons.includes('FIELD_AMBIGUOUS_NAME_PRICE'))
    assert.ok(!JSON.stringify(result.errors).includes('100,00'))
})

test('valores monetários não escapam para descrição, cores ou nome', () => {
    const result = ler(['Vestido Aurora 100,00 modelo especial', '(P,M)', '100,00', 'Cores: bege R$ 100,00', 'Tecido confirmado'])
    const item = result.items[0]
    assert.equal(item.nome, 'Vestido Aurora')
    assert.equal(item.cores, null)
    assert.equal(item.descricao, 'Tecido confirmado')
    const {supplierPriceCents, ...publicavel} = item
    assert.ok(!JSON.stringify(publicavel).includes('100,00'))
    assert.ok(item.reviewReasons.includes('FIELD_AMBIGUOUS_COLORS'))
})

test('espaçamento ambíguo no nome pede revisão sem correção silenciosa', () => {
    const item = ler(['Vestido A urora', '(P,M) R$ 100,00']).items[0]
    assert.equal(item.nome, 'Vestido A urora')
    assert.ok(item.reviewReasons.includes('FIELD_AMBIGUOUS_NAME_SPACING'))
})

test('não empresta foto de outra coluna para produto sem imagem', () => {
    const result = parseCatalogo(pagina(
        coluna('primeira', ['Blusa Aurora', '(P) R$ 100,00']),
        coluna('segunda', ['Saia Boreal', '(M) R$ 100,00'], {withImage: false}),
    ))
    assert.equal(result.items[1].imageUrl, null)
    assert.ok(result.items[1].reviewReasons.includes('FIELD_AMBIGUOUS_IMAGE_ASSOCIATION'))
})

test('imagem externa ou URL insegura não é aceita para download', () => {
    for(const url of ['https://example.invalid/image.jpg', 'http://sites.google.com/sitesv-images-rt/x', 'javascript:alert(1)']){
        const item = ler(['Blusa Aurora', '(P) R$ 100,00'], {image: url}).items[0]
        assert.equal(item.imageUrl, null)
        assert.ok(item.reviewReasons.length > 0)
    }
})

test('alteração da estrutura, página vazia ou login falha de forma segura', () => {
    for(const html of ['', '<html><body>Faça login</body></html>', '<section><p>Blusa Aurora</p><p>(P) R$ 100,00</p><img src="' + imagem + '"></section>']){
        const result = parseCatalogo(html)
        assert.ok(result.errors.some(x => x.code.startsWith('PARSE_')))
        assert.equal(result.items.length, 0)
    }
})

test('linha de preço sem produto reconhecido denuncia parsing parcial', () => {
    const result = ler(['Tipo desconhecido Aurora', '(P,M) R$ 100,00'])
    assert.equal(result.stats.orphanPriceLines, 1)
    assert.ok(result.errors.some(x => x.code === 'PARSE_ORPHAN_PRICE_LINE'))
})

test('tipo novo dentro de módulo já reconhecido também bloqueia parsing parcial', () => {
    const result = ler(['Vestido Aurora', '(P,M) R$ 100,00', 'Jaqueta Boreal', '(P,M) R$ 200,00'])
    assert.ok(result.errors.some(x => x.code === 'PARSE_UNRECOGNIZED_PRODUCT_TITLE'))
})

test('parser não avalia scripts nem injeta conteúdo de scripts nos produtos', () => {
    const result = ler(['Blusa Aurora<script>throw new Error("não executar")</script>', '(P) R$ 100,00'])
    assert.equal(result.items[0].nome, 'Blusa Aurora')
    assert.deepEqual(result.errors, [])
})
