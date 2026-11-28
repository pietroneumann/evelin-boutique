import {parse} from 'acorn'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'

export const SOURCE_URL = 'https://sites.google.com/view/mariaamorecatalogo/cat%C3%A1logo'
export const CATEGORIES = ['Vestidos', 'Blusas', 'Saias', 'Conjuntos', 'Camisas', 'Blazers', 'Outros']
export const normalize = text => String(text ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
export const digest = text => createHash('sha256').update(text).digest('hex')

function literal(node) {
    if(node.type === 'Literal') return node.value
    if(node.type === 'UnaryExpression' && node.operator === '-' && node.argument.type === 'Literal') return -node.argument.value
    if(node.type === 'ArrayExpression') return node.elements.map(literal)
    assert.equal(node.type, 'ObjectExpression', 'Dados devem conter apenas literais.')
    return Object.fromEntries(node.properties.map(p => {
        assert.equal(p.type, 'Property'); assert.ok(!p.computed && p.kind === 'init')
        return [p.key.name ?? p.key.value, literal(p.value)]
    }))
}

export function readSite(source) {
    const ast = parse(source, {ecmaVersion: 'latest', sourceType: 'script'})
    const declaration = ast.body.flatMap(n => n.type === 'VariableDeclaration' ? n.declarations : []).find(d => d.id.name === 'produtos')
    assert.equal(declaration?.init.type, 'ArrayExpression', 'Array produtos não encontrado.')
    return {products: literal(declaration.init), array: declaration.init, source}
}
export const readProducts = source => readSite(source).products

export function productId(p, all) {
    return p.codigoFornecedor && all.filter(other => other.codigoFornecedor === p.codigoFornecedor).length === 1
        ? 'codigo:' + p.codigoFornecedor
        : 'produto:' + JSON.stringify([p.categoria, p.nome, p.imagem])
}

export function productSlug(p, all) {
    const base = normalize(p.nome).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const matches = all.filter(other => normalize(other.nome).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === base)
    const index = matches.indexOf(p)
    return index > 0 ? base + '-' + (index + 1) : base
}

// Preserva todo o JavaScript e a formatação dos objetos antigos. Somente valores alterados são substituídos.
export function writeProducts(source, next) {
    const site = readSite(source), edits = []
    assert.ok(next.length >= site.products.length)
    for(let index = 0; index < site.products.length; index++){
        const node = site.array.elements[index], before = site.products[index], after = next[index]
        for(const key of Object.keys(before)){
            assert.ok(Object.hasOwn(after, key), 'Campo antigo removido: ' + key)
            if(JSON.stringify(before[key]) === JSON.stringify(after[key])) continue
            const property = node.properties.find(p => (p.key.name ?? p.key.value) === key)
            edits.push({start: property.value.start, end: property.value.end, text: JSON.stringify(after[key])})
        }
        const added = Object.keys(after).filter(key => !Object.hasOwn(before, key))
        if(added.length){
            const last = node.properties.at(-1)
            const comma = source.slice(last.end, node.end - 1).match(/^\s*,/)
            const position = last.end + (comma?.[0].length || 0)
            edits.push({start: position, end: position, text: (comma ? '' : ',') + added.map(key => '\n        ' + JSON.stringify(key) + ': ' + JSON.stringify(after[key])).join(',') + ','})
        }
    }
    if(next.length > site.products.length){
        const last = site.array.elements.at(-1)
        const comma = source.slice(last.end, site.array.end - 1).match(/^\s*,/)
        const position = last.end + (comma?.[0].length || 0)
        const text = next.slice(site.products.length).map(p => JSON.stringify(p, null, 4).split('\n').map(line => '    ' + line).join('\n')).join(',\n\n')
        edits.push({start: position, end: position, text: (comma ? '' : ',') + '\n\n' + text + ','})
    }
    let result = source
    for(const edit of edits.sort((a, b) => b.start - a.start)) result = result.slice(0, edit.start) + edit.text + result.slice(edit.end)
    assert.deepEqual(readProducts(result), next)
    return result
}

export function latestBatches(history) { return history.batches.filter(b => !b.legacy).slice(-2) }
export function noveltyIds(history) { return new Set(latestBatches(history).flatMap(b => b.productIds)) }
export function promotionalCents(p) {
    if(!Number.isFinite(p.precoRegular) || p.precoRegular <= 0 || p.blackFriday === false || p.novidade === true) return null
    const regular = Math.round(p.precoRegular * 100), promo = Math.round(regular * 85 / 100)
    return promo > 0 && promo < regular ? promo : null
}
export function regularPrice(supplierCents) {
    return Number.isSafeInteger(supplierCents) && supplierCents > 0 ? Math.round(supplierCents * 190 / 100) / 100 : null
}

export function applyBatches(products, history) {
    const novel = noveltyIds(history), records = new Map(history.products.map(p => [p.id, p]))
    return products.map(p => {
        const novidade = novel.has(productId(p, products)), record = records.get(productId(p, products))
        assert.ok(record, 'Produto sem histórico.')
        const blackFriday = !novidade && record.blackFridayEligible
        const result = {...p, novidade}
        // Mantém campos ausentes dos antigos quando o comportamento público já é equivalente.
        if(Object.hasOwn(p, 'blackFriday') || !blackFriday) result.blackFriday = blackFriday
        const cents = promotionalCents(result)
        if(Object.hasOwn(p, 'precoBlackFriday') && (p.blackFriday !== false) !== blackFriday) result.precoBlackFriday = cents === null ? null : cents / 100
        return result
    })
}

export function validateProducts(products, history, before = products) {
    assert.equal(history.schemaVersion, 1)
    assert.equal(history.source.url, SOURCE_URL)
    assert.ok(!/"(?:precoBase|supplierPriceCents|precoFornecedor|custo)"/i.test(JSON.stringify(history)), 'Histórico contém custo interno.')
    assert.ok(products.length >= before.length && products.length >= history.baseline.productCount)
    const ids = products.map(p => productId(p, products))
    assert.equal(new Set(ids).size, products.length, 'Identidades duplicadas.')
    assert.equal(new Set(products.map(p => productSlug(p, products))).size, products.length, 'Colisão de deep links.')
    assert.equal(new Set(products.map(p => p.imagem)).size, products.length, 'Caminho de imagem reutilizado.')
    const records = new Map(history.products.map(p => [p.id, p]))
    assert.equal(records.size, history.products.length)
    assert.equal(records.size, products.length)
    const batches = new Set(history.batches.map(b => b.id))
    assert.equal(batches.size, history.batches.length)
    const codesBefore = new Map()
    before.forEach(p => {if(p.codigoFornecedor) codesBefore.set(p.codigoFornecedor, (codesBefore.get(p.codigoFornecedor) || 0) + 1)})
    const codes = new Map()
    const novel = noveltyIds(history)
    for(const [index, p] of products.entries()){
        for(const field of ['nome', 'categoria', 'preco', 'tamanhos', 'cores', 'imagem', 'codigoFornecedor', 'novidade', 'disponivel', 'entregaRapida']) assert.ok(Object.hasOwn(p, field), 'Campo ausente: ' + field)
        assert.ok(typeof p.nome === 'string' && p.nome.trim() && !/[\x00-\x1f]/.test(p.nome))
        assert.ok(CATEGORIES.includes(p.categoria))
        assert.equal(p.preco, null)
        assert.ok(p.precoRegular === null || Number.isFinite(p.precoRegular) && p.precoRegular > 0)
        assert.ok(p.codigoFornecedor === null || typeof p.codigoFornecedor === 'string' && p.codigoFornecedor.trim())
        if(p.codigoFornecedor) codes.set(p.codigoFornecedor, (codes.get(p.codigoFornecedor) || 0) + 1)
        for(const field of ['tamanhos', 'cores']) assert.ok(p[field] === null || Array.isArray(p[field]) && p[field].length > 0 && p[field].every(v => typeof v === 'string' && v.trim() && v.length < 80) && new Set(p[field]).size === p[field].length, 'Campo inválido: ' + field)
        assert.equal(p.disponivel, true, 'Compra bloqueada.')
        assert.equal(typeof p.entregaRapida, 'boolean')
        assert.equal(p.novidade, novel.has(ids[index]), 'Novidade fora dos dois lotes.')
        if(p.novidade) assert.equal(p.blackFriday, false)
        if(index >= before.length && p.novidade) assert.equal(p.precoBlackFriday, null)
        assert.ok(/^assets\/imagens\/produtos\/[a-z0-9][a-z0-9.-]*\.(?:png|jpe?g|webp)$/.test(p.imagem), 'Caminho inválido.')
        assert.ok(records.has(ids[index]))
        const record = records.get(ids[index])
        assert.ok(record.batchIds.length > 0 && record.batchIds.every(id => batches.has(id)))
        for(const id of record.batchIds) assert.ok(history.batches.find(b => b.id === id).productIds.includes(ids[index]))
    }
    for(const batch of history.batches){
        assert.equal(new Set(batch.productIds).size, batch.productIds.length)
        for(const id of batch.productIds) assert.ok(records.get(id)?.batchIds.includes(batch.id))
    }
    for(const [code, count] of codes) assert.ok(count <= Math.max(1, codesBefore.get(code) || 0), 'Colisão de código.')
    assert.deepEqual(products.filter(p => p.entregaRapida).map(p => productId(p, products)).sort(), [...history.baseline.fastDeliveryIds].sort(), 'Entrega rápida alterada.')
    for(let i = 0; i < before.length; i++){
        const previous = before[i], current = products[i]
        for(const key of Object.keys(previous).filter(k => !['novidade', 'blackFriday', 'precoBlackFriday'].includes(k))) assert.deepEqual(current[key], previous[key], 'Dado antigo alterado: ' + key)
        assert.equal(productId(current, products), productId(previous, before), 'ID antigo alterado.')
        assert.equal(productSlug(current, products), productSlug(previous, before), 'Deep link antigo alterado.')
    }
    return {total: products.length, novidades: products.filter(p => p.novidade).length, blackFriday: products.filter(p => promotionalCents(p) !== null).length, entregaRapida: products.filter(p => p.entregaRapida).length, precosConfirmados: products.filter(p => p.precoRegular !== null).length, consultarPreco: products.filter(p => p.precoRegular === null).length}
}

export function assertRuntimeUnchanged(before, after) {
    const old = readSite(before), next = readSite(after)
    assert.equal(before.slice(0, old.array.start), after.slice(0, next.array.start))
    assert.equal(before.slice(old.array.end), after.slice(next.array.end), 'Código da loja foi alterado.')
    assert.ok(!/\bprecoBase\b|C:[\\/]Users[\\/]/i.test(after), 'Dado interno exposto.')
    assert.equal(after.match(/const WHATSAPP_NUMBER = '([^']+)'/)[1], before.match(/const WHATSAPP_NUMBER = '([^']+)'/)[1])
}
