import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import assert from 'node:assert/strict'
import {digest, SOURCE_URL, normalize} from './model.mjs'

export function imageURL(value) {
    if(!value) return null
    const url = new URL(value)
    assert.equal(url.protocol, 'https:')
    assert.ok(/^[a-z0-9-]+\.googleusercontent\.com$/.test(url.hostname) || ['sites.google.com', 'drive.google.com'].includes(url.hostname), 'Origem de imagem não autorizada: ' + url.hostname)
    assert.ok(!url.username && !url.password && !url.port)
    url.hash = ''
    // O tamanho solicitado não faz parte da identidade da foto Google.
    url.pathname = url.pathname.replace(/=(?:w\d+|s\d+)(?:[-\w]*)$/, '')
    for(const key of ['w', 'h', 'sz']) url.searchParams.delete(key)
    return url.href
}

// URLs de download podem conter assinaturas efêmeras; elas não são evidência pública persistente.
export function persistentImageURL(value) {
    if(!value) return null
    try {
        const url = new URL(imageURL(value))
        if(/\/(?:sitesv-images-rt|sitesv)\//iu.test(decodeURIComponent(url.pathname))) return null
        if([...url.searchParams.keys()].some(key => /token|signature|credential|secret|password|authorization|resourcekey|policy|expires|googleaccessid|^(?:sig|auth|authuser|key|api[_-]?key|access[_-]?key|x-amz-.+|x-goog-.+)$/iu.test(key))) return null
        return url.href
    } catch { return null }
}

export async function requestBytes(value, {kind = 'image', fetchImpl = fetch} = {}) {
    let url = value
    for(let redirects = 0; redirects < 4; redirects++){
        if(kind === 'html') assert.equal(url, SOURCE_URL, 'Página fora da fonte oficial.')
        else imageURL(url)
        const response = await fetchImpl(url, {redirect: 'manual', signal: AbortSignal.timeout(45000), headers: {'User-Agent': 'EvelinCatalogo/1.0', 'Referer': SOURCE_URL, 'Accept': kind === 'html' ? 'text/html' : 'image/*'}})
        if(response.status >= 300 && response.status < 400){
            assert.equal(kind, 'image', 'Catálogo redirecionou para outra página.')
            url = new URL(response.headers.get('location'), url).href
            continue
        }
        assert.ok(response.ok, 'Fonte retornou HTTP ' + response.status)
        const contentType = response.headers.get('content-type') || ''
        assert.ok(kind === 'html' ? /text\/html/.test(contentType) : /^image\//.test(contentType), 'Resposta não é ' + kind)
        const limit = kind === 'html' ? 8 * 1024 * 1024 : 20 * 1024 * 1024
        assert.ok(Number(response.headers.get('content-length') || 0) <= limit, 'Resposta excede o limite de bytes.')
        const chunks = []; let size = 0
        for await(const chunk of response.body){ size += chunk.length; assert.ok(size <= limit, 'Resposta excede o limite de bytes.'); chunks.push(chunk) }
        assert.ok(size > 0, 'Arquivo vazio.')
        return {bytes: Buffer.concat(chunks), contentType, url}
    }
    throw new Error('Redirecionamentos em excesso.')
}

export async function inspectImage(bytes) {
    const image = sharp(bytes, {failOn: 'warning', limitInputPixels: 40000000})
    const metadata = await image.metadata()
    assert.ok(['jpeg', 'png', 'webp'].includes(metadata.format), 'Formato não suportado com segurança.')
    assert.equal(metadata.pages || 1, 1, 'Imagem animada exige revisão.')
    assert.ok(metadata.width > 0 && metadata.height > 0)
    await image.stats() // Decodifica também o conteúdo, não apenas o cabeçalho.
    const rotated = [5, 6, 7, 8].includes(metadata.orientation)
    return {format: metadata.format, extension: metadata.format === 'jpeg' ? 'jpg' : metadata.format, width: rotated ? metadata.height : metadata.width, height: rotated ? metadata.width : metadata.height, sha256: digest(bytes)}
}

export function newImagePath(item, metadata) {
    const slug = normalize(item.nome).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    assert.ok(slug)
    const suffix = digest(JSON.stringify([item.codigoFornecedor, metadata.sha256, item.nome, item.categoria])).slice(0, 12)
    return `assets/imagens/produtos/${slug}-${suffix}.${metadata.extension}`
}

export async function validateImageFiles(root, products, history, pending = new Map()) {
    const records = new Map(history.products.map(p => [p.id, p]))
    const {productId} = await import('./model.mjs')
    const decoded = new Map()
    for(const p of products){
        const filename = path.resolve(root, p.imagem)
        assert.ok(filename.startsWith(path.resolve(root, 'assets/imagens/produtos') + path.sep), 'Imagem fora da pasta autorizada.')
        const bytes = pending.get(p.imagem)?.bytes || await fs.readFile(filename)
        const hash = digest(bytes)
        assert.equal(hash, records.get(productId(p, products)).evidence.imageSha256, 'Imagem alterada: ' + p.imagem)
        if(!decoded.has(hash)) decoded.set(hash, await inspectImage(bytes))
    }
    return decoded.size
}
