import {parse} from 'parse5'

export const URL_CATALOGO = 'https://sites.google.com/view/mariaamorecatalogo/cat%C3%A1logo'

const TIPOS = /^(T[\s-]?Shirts?|Conjuntos?|Trijuntos?|Vestidos?|Blusas?|Saias?|Camisas?|Blazers?|Sobretudos?|Chemises?|Bodies|Body|Jardineiras?|Salopetes?|Tubinhos?|Casaquinhos?|Coletes?|Calças?|Shorts?|Macacões|Macacão|Croppeds?|Batas?|Bodys?)\b\s*/iu
const CATEGORIAS = new Map([
    ['vestido', 'Vestidos'], ['vestidos', 'Vestidos'], ['blusa', 'Blusas'], ['blusas', 'Blusas'],
    ['saia', 'Saias'], ['saias', 'Saias'], ['conjunto', 'Conjuntos'], ['conjuntos', 'Conjuntos'],
    ['camisa', 'Camisas'], ['camisas', 'Camisas'], ['blazer', 'Blazers'], ['blazers', 'Blazers'],
])
const TAMANHO = /^(?:PP|P|M|G|GG|GGG|EXG|XG|XGG|G[1-5]|GG[1-5]|U|TU|ÚNICO|UNICO|[2-6]\d)$/u
const REFERENCIA = /\b(?:c[oó]d(?:igo)?|ref(?:er[eê]ncia)?)[\s.:#-]*([A-Za-z]?\d{3,}[A-Za-z]?)/giu
const DINHEIRO = /R\s*\$\s*(\d{1,3}(?:\.\d{3})*|\d+),(\d{2})(?!\d)/giu

function atributo(node, name) {
    return node?.attrs?.find(attr => attr.name === name)?.value ?? null
}

function classe(node, name) {
    return (atributo(node, 'class') || '').split(/\s+/u).includes(name)
}

function filhos(node) {
    return node?.childNodes || []
}

function texto(node) {
    if(node.nodeName === '#text') return node.value
    if(['script', 'style', 'template', 'noscript'].includes(node.tagName)) return ''
    if(node.tagName === 'br') return '\n'
    return filhos(node).map(texto).join('')
}

function limpar(value) {
    return value.normalize('NFC').replace(/[\s\u00a0]+/gu, ' ').trim()
}

function normalizar(value) {
    return limpar(value).normalize('NFD').replace(/[\u0300-\u036f]/gu, '').toLowerCase()
}

function descendentes(node, predicado) {
    const encontrados = []
    function visitar(atual) {
        if(predicado(atual)) encontrados.push(atual)
        filhos(atual).forEach(visitar)
    }
    visitar(node)
    return encontrados
}

function ancestralId(node) {
    for(let atual = node; atual; atual = atual.parentNode){
        if(atributo(atual, 'id')) return atributo(atual, 'id')
    }
    return null
}

function temPreco(linha) {
    return /R\s*\$/iu.test(linha)
}

function nomeProduto(linha, {cabecalho = false} = {}) {
    const tipo = linha.match(TIPOS)
    if(!tipo) return null
    const nome = limpar(linha.replace(/\([^)]*\)/gu, '').replace(/R\s*\$[\s\S]*$/iu, '').replace(REFERENCIA, '').replace(/\d+(?:\.\d{3})*,\d{2}[\s\S]*$/u, ''))
    const sufixo = limpar(nome.slice(tipo[0].trimEnd().length))
    if(!cabecalho && /^(?:com\b|sem\b|[cs]\s*\/|mangas?\b|gola\b|tecido\b|compos[êe](?:\s|$)|peplum\b|tubinho\b|midi\b|acompanha\b|detalhes?\b|long[oa]\b|forrad[oa]\b|al[çc]as?\b)/iu.test(sufixo)) return null
    return {nome, tipo: tipo[1], temNome: sufixo.length > 0, categoria: CATEGORIAS.get(normalizar(tipo[1])) || 'Outros'}
}

function inicioProduto(linhas, index) {
    const linha = linhas[index].texto
    // Um título composto como "Salopete com blusa Luiza" é explícito quando abre
    // o módulo e é seguido pela grade/preço; descrições internas não abrem peças.
    const metadados = value => temPreco(value) || /^(?:\(|c[oó]d\s*:|ref\s*:|tamanhos?\s*:|dispon[ií]vel\s+n[oa])/iu.test(value)
    const cabecalho = metadados(linha) || metadados(linhas[index + 1]?.texto || '')
        || index === 0 && linhas.slice(1, 3).some(proxima => temPreco(proxima.texto))
    return nomeProduto(linha, {cabecalho})
}

function extrairCodigo(linhas, revisar) {
    const codigos = [...new Set(linhas.flatMap(linha => [...linha.matchAll(REFERENCIA)].map(match => match[1])))]
    if(codigos.length > 1){revisar('FIELD_CONFLICTING_REFERENCE'); return null}
    return codigos[0] ?? null
}

function extrairPreco(linhas, revisar) {
    const candidatos = linhas.flatMap(linha => [...linha.matchAll(DINHEIRO)].map(match => Number(match[1].replaceAll('.', '')) * 100 + Number(match[2])))
    const precos = [...new Set(candidatos)]
    if(precos.length > 1){revisar('FIELD_CONFLICTING_PRICE'); return null}
    if(linhas.some(linha => temPreco(linha) && [...linha.matchAll(DINHEIRO)].length === 0)) revisar('FIELD_UNREADABLE_PRICE')
    if(precos[0] !== undefined && (!Number.isSafeInteger(precos[0]) || precos[0] <= 0)){
        revisar('FIELD_INVALID_PRICE')
        return null
    }
    return precos[0] ?? null
}

function grade(value) {
    const partes = limpar(value).toUpperCase().replace(/(?<=\d)I(?=\d)/gu, '|').split(/[,;|]/u).map(limpar).filter(Boolean)
    if(!partes.length || partes.some(parte => !TAMANHO.test(parte))) return null
    return [...new Set(partes)]
}

function extrairTamanhos(linhas, revisar) {
    const candidatos = []
    for(const linha of linhas){
        for(const parenteses of linha.matchAll(/\(([^()]*)\)/gu)){
            if(!/(?:\b(?:PP|P|M|G|GG|EXG|XG|G[1-5]|UNICO|ÚNICO)\b|\d)/iu.test(parenteses[1])) continue
            const valores = grade(parenteses[1])
            if(!valores){revisar('FIELD_AMBIGUOUS_SIZES'); return null}
            candidatos.push(valores)
        }
        const explicito = linha.match(/^(?:tamanhos?\s*:|dispon[ií]vel\s+n[oa]s?\s+)(.+)$/iu)
        if(explicito){
            const valores = grade(explicito[1].replace(/R\s*\$[\s\S]*$/iu, ''))
            if(!valores){revisar('FIELD_AMBIGUOUS_SIZES'); return null}
            candidatos.push(valores)
        }
    }
    if(!candidatos.length) return null
    const primeira = JSON.stringify([...candidatos[0]].sort())
    if(candidatos.some(valores => JSON.stringify([...valores].sort()) !== primeira)){
        revisar('FIELD_CONFLICTING_SIZES')
        return null
    }
    return candidatos[0]
}

function extrairCores(linhas, revisar) {
    const cores = linhas.flatMap(linha => {
        const match = linha.match(/^cores?\s*:\s*(.+)$/iu)
        if(match && /R\s*\$|\d+,\d{2}/iu.test(match[1])){revisar('FIELD_AMBIGUOUS_COLORS'); return []}
        return match ? match[1].split(/[,;|]/u).map(limpar).filter(Boolean) : []
    })
    return cores.length ? [...new Set(cores)] : null
}

function extrairDescricao(linhas) {
    const partes = linhas.slice(1).filter(linha => {
        if(!linha || linha === '.' || temPreco(linha) || /\d+(?:\.\d{3})*,\d{2}/u.test(linha) || REFERENCIA.test(linha)){
            REFERENCIA.lastIndex = 0
            return false
        }
        REFERENCIA.lastIndex = 0
        if(/^cores?\s*:/iu.test(linha) || /^tamanhos?\s*:/iu.test(linha) || /^dispon[ií]vel\s+n[oa]/iu.test(linha)) return false
        if(/^\([^)]*\)/u.test(linha)) return false
        return true
    })
    return partes.length ? partes.map(parte => parte.replace(/[.;]\s*$/u, '')).join('. ') : null
}

function urlImagem(node, base) {
    const raw = atributo(node, 'src') || atributo(node, 'data-src')
    if(!raw) return null
    try {
        const url = new URL(raw, base)
        const autorizado = url.hostname === 'sites.google.com' && url.pathname.startsWith('/sitesv-images-rt/')
            || url.hostname.endsWith('.googleusercontent.com') || url.hostname === 'googleusercontent.com'
            || url.hostname === 'lh3.google.com'
        return url.protocol === 'https:' && autorizado && !url.username && !url.password ? url.href : null
    } catch { return null }
}

function chaveImagem(url) {
    return url?.replace(/=(?:w|h|s)\d+(?:-[a-z0-9-]+)?$/iu, '') ?? null
}

function localizarImagem(bloco, blocosProdutos, url) {
    // Não atravessa outras colunas para "emprestar" uma foto quando uma peça está sem imagem.
    for(let node = bloco; node && node.tagName !== 'body'; node = node.parentNode){
        const imagens = descendentes(node, atual => atual.tagName === 'img')
        if(imagens.length){
            const blocos = blocosProdutos.filter(outro => descendenteDe(outro, node))
            if(blocos.length > 1) return {imageUrl: null, motivo: 'FIELD_AMBIGUOUS_IMAGE_ASSOCIATION'}
            const urls = [...new Set(imagens.map(img => urlImagem(img, url)).filter(Boolean))]
            if(urls.length !== 1) return {imageUrl: null, motivo: 'FIELD_AMBIGUOUS_IMAGE_ASSOCIATION'}
            return {imageUrl: urls[0], motivo: null}
        }
        if(node.tagName === 'section') break
    }
    return {imageUrl: null, motivo: 'FIELD_MISSING_IMAGE'}
}

function descendenteDe(node, pai) {
    for(let atual = node; atual; atual = atual.parentNode) if(atual === pai) return true
    return false
}

/** Interpreta a fonte em memória. Não faz downloads, escrita, inferência visual ou avaliação de código. */
export function parseCatalogo(html, {url = URL_CATALOGO} = {}) {
    const items = [], errors = []
    const erro = (code, message, sourceKey = null) => errors.push({code, message, sourceKey})
    const stats = {recognizedProducts: 0, imageCount: 0, candidateCount: 0, productTextBlocks: 0, priceLines: 0, orphanPriceLines: 0, sectionCount: 0, structuralFormat: 'google-sites-tyJCtd-v1'}
    if(typeof html !== 'string' || !html.trim()){
        erro('PARSE_EMPTY_HTML', 'A fonte não contém HTML utilizável.')
        return {items, stats, errors}
    }
    if(!/<\/body>\s*<\/html>\s*$/iu.test(html)) erro('PARSE_INCOMPLETE_DOCUMENT', 'Documento incompleto ou formato de fechamento alterado; revisão necessária.')
    const dom = parse(html)
    const body = descendentes(dom, node => node.tagName === 'body')[0]
    if(!body){erro('PARSE_MISSING_BODY', 'Estrutura de página ausente.'); return {items, stats, errors}}
    const paragrafos = descendentes(body, node => node.tagName === 'p')
    const linhasGlobais = paragrafos.map(p => ({node: p, texto: limpar(texto(p))})).filter(linha => linha.texto)
    stats.sectionCount = descendentes(body, node => node.tagName === 'section').length
    stats.imageCount = descendentes(body, node => node.tagName === 'img' && urlImagem(node, url)).length
    stats.priceLines = linhasGlobais.filter(linha => temPreco(linha.texto)).length
    const blocos = descendentes(body, node => classe(node, 'tyJCtd') && descendentes(node, atual => atual.tagName === 'p').length > 0
        && !filhos(node).some(filho => descendentes(filho, atual => classe(atual, 'tyJCtd')).length > 0))
    const dadosBlocos = blocos.map(bloco => ({bloco, linhas: descendentes(bloco, node => node.tagName === 'p').map(p => ({node: p, texto: limpar(texto(p))})).filter(linha => linha.texto)}))
    const candidatos = dadosBlocos.filter(dado => dado.linhas.some((linha, index) => inicioProduto(dado.linhas, index)?.temNome))
    stats.productTextBlocks = candidatos.length
    const paragrafosCobertos = new Set()
    const titulosReconhecidos = new Set()

    for(const {bloco, linhas} of dadosBlocos){
        const comecos = linhas.flatMap((linha, index) => inicioProduto(linhas, index)?.temNome ? [index] : [])
        if(!comecos.length){
            if(linhas.some(linha => temPreco(linha.texto))) continue
            const semNome = linhas.some(linha => nomeProduto(linha.texto) && !nomeProduto(linha.texto).temNome)
            if(semNome) erro('PARSE_MISSING_PRODUCT_NAME', 'Encontrado tipo de roupa sem identificação de produto.', ancestralId(bloco))
            continue
        }
        const imagem = localizarImagem(bloco, candidatos.map(dado => dado.bloco), url)
        const id = ancestralId(bloco)
        if(!id) erro('PARSE_MISSING_SOURCE_ID', 'Bloco de produto sem identificador estável da fonte.')
        for(let pos = 0; pos < comecos.length; pos++){
            stats.candidateCount++
            const inicio = comecos[pos], fim = comecos[pos + 1] ?? linhas.length
            const segmento = linhas.slice(inicio, fim)
            titulosReconhecidos.add(segmento[0].node)
            segmento.forEach(linha => paragrafosCobertos.add(linha.node))
            const valores = segmento.map(linha => linha.texto)
            const nome = nomeProduto(valores[0], {cabecalho: true})
            const reviewReasons = []
            const revisar = codigo => {if(!reviewReasons.includes(codigo)) reviewReasons.push(codigo)}
            if(imagem.motivo) revisar(imagem.motivo)
            if(!id) revisar('FIELD_MISSING_STABLE_SOURCE_ID')
            if(!temPreco(valores[0]) && /\d+(?:\.\d{3})*,\d{2}/u.test(valores[0])) revisar('FIELD_AMBIGUOUS_NAME_PRICE')
            if(/(?:^|\s)\p{L}\s+\p{L}{2,}(?:\s|$)/u.test(nome.nome.slice(nome.tipo.length).trim())) revisar('FIELD_AMBIGUOUS_NAME_SPACING')
            if(/\b(?:mangas?\s+(?:curta|longa)|sem\s+z[ií]per|com\s+z[ií]per|tecido\s+)/iu.test(nome.nome)) revisar('FIELD_NAME_CONTAINS_DESCRIPTION')
            const codigoFornecedor = extrairCodigo(valores, revisar)
            const tamanhos = extrairTamanhos(valores, revisar)
            const supplierPriceCents = extrairPreco(valores, revisar)
            const item = {
                nome: nome.nome, codigoFornecedor, categoria: nome.categoria,
                tamanhos, cores: extrairCores(valores, revisar), descricao: extrairDescricao(valores),
                sourcePage: url, imageUrl: imagem.imageUrl,
                sourceKey: `${id || 'sem-identificador'}:produto:${pos + 1}`,
                sharedImage: false, sourceOrder: items.length, supplierPriceCents, reviewReasons,
            }
            items.push(item)
        }
    }

    const porImagem = new Map()
    for(const item of items){
        if(!item.imageUrl) continue
        const key = chaveImagem(item.imageUrl)
        if(!porImagem.has(key)) porImagem.set(key, new Set())
        porImagem.get(key).add(normalizar(item.nome))
    }
    for(const item of items){
        if(item.imageUrl) item.sharedImage = porImagem.get(chaveImagem(item.imageUrl)).size > 1
    }
    for(const linha of linhasGlobais){
        if(temPreco(linha.texto) && !paragrafosCobertos.has(linha.node)){
            stats.orphanPriceLines++
            erro('PARSE_ORPHAN_PRICE_LINE', 'Linha de preço não associada com segurança a um produto reconhecido.', ancestralId(linha.node))
        }
        if(nomeProduto(linha.texto)?.temNome && !paragrafosCobertos.has(linha.node)) erro('PARSE_UNCOVERED_PRODUCT', 'Produto fora da estrutura reconhecida; publicação automática bloqueada.', ancestralId(linha.node))
    }
    for(const {linhas} of dadosBlocos){
        for(let i = 1; i < linhas.length; i++){
            const anterior = linhas[i - 1]
            if(!temPreco(linhas[i].texto) || titulosReconhecidos.has(anterior.node)) continue
            const pareceTitulo = /^\p{Lu}[\p{L}\p{M}-]+(?:\s+\p{Lu}[\p{L}\p{M}'-]+){1,4}$/u.test(anterior.texto)
            const metadado = /^(?:Maria Amore|Tecido\b|Com\b|Sem\b|Manga\b|Gola\b|Dispon[ií]vel\b)/iu.test(anterior.texto)
            if(pareceTitulo && !metadado) erro('PARSE_UNRECOGNIZED_PRODUCT_TITLE', 'Possível título de produto de tipo desconhecido; revisão da fonte necessária.', ancestralId(anterior.node))
        }
    }
    stats.recognizedProducts = items.length
    stats.sharedImageProducts = items.filter(item => item.sharedImage).length
    stats.productsWithoutImages = items.filter(item => !item.imageUrl).length
    stats.productsNeedingReview = items.filter(item => item.reviewReasons.length).length
    if(!items.length) erro('PARSE_NO_PRODUCTS', 'Nenhum produto reconhecido; fonte vazia, bloqueada ou com estrutura diferente.')
    return {items, stats, errors}
}
