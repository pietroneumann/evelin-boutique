import assert from 'node:assert/strict'
import {digest, normalize, regularPrice} from './model.mjs'

const FAILURE = 'Falha segura: fronteira do catálogo não identificada.'
const TYPES = /^(T[\s-]?Shirts?|Conjuntos?|Trijuntos?|Vestidos?|Blusas?|Saias?|Camisas?|Blazers?|Sobretudos?|Chemises?|Bodies|Body|Jardineiras?|Salopetes?|Tubinhos?|Casaquinhos?|Coletes?|Cal[çc]as?|Shorts?|Macac[õo]es|Macac[ãa]o|Croppeds?|Batas?|Bodys?)\b/iu
const typeAliases = new Map([
    ['vestidos', 'vestido'], ['blusas', 'blusa'], ['saias', 'saia'], ['camisas', 'camisa'],
    ['conjuntos', 'conjunto'], ['trijuntos', 'trijunto'], ['blazers', 'blazer'],
    ['bodies', 'body'], ['bodys', 'body'], ['tshirts', 'tshirt'], ['macacoes', 'macacao'],
])
const normalizedName = value => normalize(value).replace(/\s+/gu, '')
const code = value => typeof value === 'string' && value.trim() ? value.trim().toUpperCase() : null
const names = values => [...new Set(values.map(normalizedName))]
const description = value => typeof value === 'string' && value.trim() ? digest(normalize(value)) : null
const grade = value => Array.isArray(value) && value.length && value.every(v => typeof v === 'string' && v.trim())
    ? [...new Set(value.map(v => normalize(v)))].sort() : null
const same = (a, b) => a !== null && b !== null && JSON.stringify(a) === JSON.stringify(b)

function fail(reason) { throw new Error(FAILURE + (reason ? ' ' + reason : '')) }

export function explicitType(name) {
    const match = typeof name === 'string' && normalize(name).match(TYPES)
    if(!match) return null
    const type = normalize(match[1]).replace(/[\s-]/gu, '')
    return typeAliases.get(type) || type
}

// Só URLs públicas estáveis podem corroborar a identidade. URLs sitesv assinadas
// são descartadas: suas credenciais efêmeras mudam entre duas leituras iguais.
function stableImageURL(value) {
    if(!value) return null
    try {
        const url = new URL(value)
        if(url.protocol !== 'https:' || url.username || url.password || url.port) return null
        if(!/^(?:[a-z0-9-]+\.)?googleusercontent\.com$/u.test(url.hostname)
            && !['sites.google.com', 'lh3.google.com', 'drive.google.com'].includes(url.hostname)) return null
        if(/\/(?:sitesv-images-rt|sitesv)\//u.test(url.pathname)) return null
        url.hash = ''
        url.pathname = url.pathname.replace(/=(?:w|h|s)\d+(?:-[a-z0-9-]+)?$/iu, '')
        for(const key of ['w', 'h', 'sz']) url.searchParams.delete(key)
        return url.href
    } catch { return null }
}

function anchorCore(anchor) {
    return {schemaVersion:anchor.schemaVersion, batchId:anchor.batchId, entries:anchor.entries}
}

/** Cria somente a assinatura pública de uma sequência confirmada pelo operador. */
export function createAnchor(entries, {batchId}) {
    assert.ok(typeof batchId === 'string' && batchId.trim(), 'Lote da âncora ausente.')
    assert.ok(Array.isArray(entries) && entries.length > 0, 'Sequência da âncora vazia.')
    const result = entries.map((entry, ordinal) => {
        const tipo = explicitType(entry.nome)
        assert.ok(tipo && typeof entry.productId === 'string' && entry.productId, 'Identidade/tipo explícito ausente na âncora.')
        const aliases = [entry.nome, ...(entry.aliases || [])]
        assert.ok(aliases.every(alias => explicitType(alias) === tipo), 'Alias tenta alterar o tipo do produto.')
        const precoRegular = Number.isFinite(entry.precoRegular) && entry.precoRegular > 0 ? entry.precoRegular : null
        const alternatives = [...new Set((entry.imageSha256Alternatives || []).filter(hash => typeof hash === 'string' && hash && hash !== entry.imageSha256))]
        return {
            productId:entry.productId,
            ordinal,
            normalizedNames:names(aliases),
            tipo,
            categoria:entry.categoria,
            precoRegular,
            tamanhos:grade(entry.tamanhos),
            descriptionDigest:entry.descriptionDigest || description(entry.descricao),
            codigoFornecedor:code(entry.codigoFornecedor),
            imageSha256:typeof entry.imageSha256 === 'string' ? entry.imageSha256 : null,
            ...(alternatives.length ? {imageSha256Alternatives:alternatives} : {}),
            imageUrls:[...new Set((entry.imageUrls || []).map(stableImageURL).filter(Boolean))],
            sourceKeys:[...new Set((entry.sourceKeys || []).filter(key => typeof key === 'string' && key))],
        }
    })
    assert.equal(new Set(result.map(entry => entry.productId)).size, result.length, 'Produto repetido na sequência da âncora.')
    const anchor = {schemaVersion:1, batchId, entries:result}
    return {...anchor, sequenceHash:digest(JSON.stringify(anchorCore(anchor))), first:result[0].productId, last:result.at(-1).productId}
}

function validateAnchor(anchor) {
    if(!anchor || anchor.schemaVersion !== 1 || !Array.isArray(anchor.entries) || !anchor.entries.length) fail('Assinatura do lote conhecido ausente.')
    if(anchor.sequenceHash !== digest(JSON.stringify(anchorCore(anchor)))) fail('Assinatura do lote conhecido inválida.')
    if(new Set(anchor.entries.map(entry => entry.productId)).size !== anchor.entries.length) fail('Identidades repetidas na âncora.')
}

function matchingEvidence(item, entry) {
    if(item.visible === false || item.visibility?.visible === false) return null
    if(explicitType(item.nome) !== entry.tipo || item.categoria !== entry.categoria) return null
    if(!entry.normalizedNames.includes(normalizedName(item.nome))) return null
    const actualCode = code(item.codigoFornecedor)
    if(actualCode && entry.codigoFornecedor && actualCode !== entry.codigoFornecedor) return null
    const strong = []
    if(actualCode && actualCode === entry.codigoFornecedor) strong.push('referencia')
    if(item.sourceKey && entry.sourceKeys.includes(item.sourceKey)) strong.push('bloco-oficial')
    if(item.imageSha256 && [entry.imageSha256, ...(entry.imageSha256Alternatives || [])].includes(item.imageSha256)) strong.push('imagem-sha256')
    const url = stableImageURL(item.imageUrl)
    if(url && entry.imageUrls.includes(url)) strong.push('imagem-url-estavel')
    const corroborating = []
    if(same(regularPrice(item.supplierPriceCents), entry.precoRegular)) corroborating.push('preco-publico')
    if(same(grade(item.tamanhos), entry.tamanhos)) corroborating.push('tamanhos')
    if(same(description(item.descricao), entry.descriptionDigest)) corroborating.push('descricao')
    return strong.length || corroborating.length >= 2 ? {strong, corroborating} : null
}

function policy(size) {
    // Os casos de aceitação cobrem 0–3 remoções na âncora confirmada de 15 itens.
    // O limite de 80% deriva desse orçamento (12/15); não serve para aceitar
    // âncoras curtas por um nome isolado. Para até 4 itens, a sequência é completa.
    const minimumMatches = size <= 4 ? size : Math.ceil(size * .8)
    const maximumMissing = size - minimumMatches
    return {anchorSize:size, minimumMatches, maximumMissing, minimumCoverage:minimumMatches / size,
        minimumDensity:size <= 4 ? 1 : .8, maximumWindow:size + maximumMissing,
        maximumRawWindow:size * 2 + maximumMissing}
}

function entryLabel(entry) {
    if(entry.nome) return entry.nome
    if(entry.productId.startsWith('produto:')){
        try {return JSON.parse(entry.productId.slice(8))[1]} catch {}
    }
    return entry.normalizedNames[0]
}

function evidenceQuality(evidence) {
    return evidence.strong.length ? 1 : evidence.corroborating.length >= 3 ? .9 : .8
}

function makeTokens(items, anchor) {
    const tokens = []
    for(const [index, item] of items.entries()){
        const matches = new Map(anchor.entries.flatMap((entry, ordinal) => {
            const evidence = matchingEvidence(item, entry)
            return evidence ? [[ordinal, evidence]] : []
        }))
        const last = tokens.at(-1)
        // Retratos adjacentes só são coalescidos quando ambos corroboram a mesma
        // identidade da âncora. Itens sem evidência ou com mais de uma identidade
        // possível não são ocultados para melhorar artificialmente a densidade.
        if(last && matches.size === 1 && last.matches.size === 1 && matches.keys().next().value === last.matches.keys().next().value){
            last.indices.push(index)
        } else tokens.push({indices:[index], matches})
    }
    return tokens
}

function betterPath(a, b) {
    if(!b) return true
    if(a.length !== b.length) return a.length > b.length
    const quality = path => path.reduce((sum, match) => sum + evidenceQuality(match.evidence), 0)
    if(quality(a) !== quality(b)) return quality(a) > quality(b)
    return a.at(-1).tokenIndex < b.at(-1).tokenIndex
}

function pathsStartingAt(tokens, start, anchor, rules) {
    const paths = []
    const states = []
    const limit = Math.min(tokens.length, start + rules.maximumWindow)
    for(let tokenIndex = start; tokenIndex < limit; tokenIndex++){
        for(const [anchorIndex, evidence] of tokens[tokenIndex].matches){
            let best = null
            if(tokenIndex === start && anchorIndex <= rules.maximumMissing) best = [{tokenIndex,anchorIndex,evidence}]
            for(const previous of states){
                const last = previous.at(-1)
                if(last.tokenIndex >= tokenIndex || last.anchorIndex >= anchorIndex) continue
                const candidate = [...previous, {tokenIndex,anchorIndex,evidence}]
                if(betterPath(candidate,best)) best = candidate
            }
            if(best){states.push(best);paths.push(best)}
        }
    }
    return paths
}

function describePath(path, tokens, anchor, rules) {
    const first=path[0], last=path.at(-1)
    const span=last.tokenIndex-first.tokenIndex+1
    const coverage=path.length/anchor.entries.length, density=path.length/span
    const observed = new Set()
    for(let i=first.tokenIndex;i<=last.tokenIndex;i++) for(const ordinal of tokens[i].matches.keys()) observed.add(ordinal)
    const matched = new Set(path.map(match=>match.anchorIndex))
    const missing = anchor.entries.filter((_,i)=>!observed.has(i))
    const omitted = anchor.entries.filter((_,i)=>!matched.has(i))
    const quality=path.reduce((sum,match)=>sum+evidenceQuality(match.evidence),0)/path.length
    // Score operacional, não probabilidade estatística: o elo mais fraco entre
    // cobertura e proximidade domina 80%; a corroboração individual fornece 20%.
    const score=Math.round((.8*Math.min(coverage,density)+.2*quality)*1000)/10
    const rawSpan=tokens[last.tokenIndex].indices.at(-1)+1-tokens[first.tokenIndex].indices[0]
    const validated=path.length>=rules.minimumMatches && density>=rules.minimumDensity && rawSpan<=rules.maximumRawWindow
    return {
        startIndex:tokens[first.tokenIndex].indices[0],endIndex:tokens[last.tokenIndex].indices.at(-1)+1,
        startToken:first.tokenIndex,endToken:last.tokenIndex+1,firstAnchorIndex:first.anchorIndex,
        matchedCount:path.length,foundCount:observed.size,observedCount:observed.size,
        missingIds:missing.map(entry=>entry.productId),missingNames:missing.map(entryLabel),
        omittedIds:omitted.map(entry=>entry.productId),omittedNames:omitted.map(entryLabel),
        coverage,density,orderRatio:path.length/observed.size,span,rawSpan,score,validated,confidence:validated?'alta':'insuficiente',quorum:rules,
        anchorMatches:path.map(match=>({productId:anchor.entries[match.anchorIndex].productId,indices:tokens[match.tokenIndex].indices,evidence:match.evidence})),
    }
}

function editDistance(a,b) {
    if(Math.abs(a.length-b.length)>2) return 3
    let row=Array.from({length:b.length+1},(_,i)=>i)
    for(let i=1;i<=a.length;i++){
        const next=[i]
        for(let j=1;j<=b.length;j++) next.push(Math.min(next[j-1]+1,row[j]+1,row[j-1]+Number(a[i-1]!==b[j-1])))
        row=next
    }
    return row[b.length]
}

function plausibleIdentity(item,entry) {
    const actualCode=code(item.codigoFornecedor)
    if(actualCode && entry.codigoFornecedor && actualCode===entry.codigoFornecedor) return true
    if(item.imageSha256 && [entry.imageSha256, ...(entry.imageSha256Alternatives || [])].includes(item.imageSha256)) return true
    if(item.sourceKey && entry.sourceKeys.includes(item.sourceKey)) return true
    const url=stableImageURL(item.imageUrl)
    if(url && entry.imageUrls.includes(url)) return true
    if(explicitType(item.nome)!==entry.tipo) return false
    const name=normalizedName(item.nome)
    // A distância é usada somente para REJEITAR uma fronteira duvidosa, nunca
    // para aprovar um match nem para transformar um produto em outro.
    return entry.normalizedNames.some(known=>known===name || editDistance(known,name)<=2)
}

/** Hipóteses para diagnóstico; este retorno sozinho nunca autoriza a fronteira. */
export function analyzeFrontier(parsed, anchor) {
    validateAnchor(anchor)
    if(!parsed || !Array.isArray(parsed.items) || parsed.errors?.length) fail('Fonte incompleta ou com quebra estrutural.')
    const rules=policy(anchor.entries.length),tokens=makeTokens(parsed.items,anchor)
    const accepted=[];let bestAttempt=null
    for(let start=0;start<tokens.length;start++){
        if(![...tokens[start].matches.keys()].some(index=>index<=rules.maximumMissing)) continue
        for(const path of pathsStartingAt(tokens,start,anchor,rules)){
            const result=describePath(path,tokens,anchor,rules)
            if(!bestAttempt || result.matchedCount>bestAttempt.matchedCount || result.matchedCount===bestAttempt.matchedCount && result.density>bestAttempt.density) bestAttempt=result
            if(result.validated) accepted.push(result)
        }
    }
    return {mode:'diagnostic',boundaryValidated:false,quorum:rules,bestAttempt,accepted}
}

function failWithAnalysis(reason, analysis) {
    const error=new Error(FAILURE+' '+reason)
    const bestAttempt=analysis.bestAttempt?.validated
        ? {...analysis.bestAttempt,quorumValidated:true,validated:false,confidence:'fronteira-ambigua'}
        : analysis.bestAttempt
    error.details={quorum:analysis.quorum,bestAttempt}
    throw error
}

/** Reconhece uma subsequência majoritária, ordenada e compacta do lote conhecido. */
export function locateFrontier(parsed, anchor) {
    const analysis=analyzeFrontier(parsed,anchor),accepted=analysis.accepted
    if(!accepted.length) failWithAnalysis('Quórum ou proximidade insuficiente na sequência conhecida.',analysis)
    // Cabeças secundárias dentro do mesmo bloco (ex.: começar em Cleo quando
    // Celine está presente) não são coleções diferentes. Blocos disjuntos são.
    const ordered=accepted.sort((a,b)=>a.startIndex-b.startIndex || b.endIndex-a.endIndex)
    const blocks=[]
    for(const candidate of ordered){
        let block=blocks.at(-1)
        if(!block || candidate.startToken>=block.endToken){block={endToken:candidate.endToken,candidates:[]};blocks.push(block)}
        block.endToken=Math.max(block.endToken,candidate.endToken);block.candidates.push(candidate)
    }
    if(blocks.length!==1) failWithAnalysis('Mais de uma sequência com quórum corresponde à âncora.',analysis)
    const candidates=blocks[0].candidates.sort((a,b)=>b.matchedCount-a.matchedCount || b.density-a.density || a.firstAnchorIndex-b.firstAnchorIndex || a.startIndex-b.startIndex)
    const match=candidates[0]
    if(candidates.some(other=>other.startIndex!==match.startIndex && other.firstAnchorIndex===match.firstAnchorIndex)) failWithAnalysis('O início exato do bloco conhecido é ambíguo.',analysis)
    if(match.firstAnchorIndex>0 && match.startIndex>0){
        const previous=parsed.items[match.startIndex-1]
        if(anchor.entries.slice(0,match.firstAnchorIndex).some(entry=>plausibleIdentity(previous,entry))) failWithAnalysis('O primeiro item pode ter sido alterado; início exato do bloco não confirmado.',analysis)
    }
    return {...match,candidates:parsed.items.slice(0,match.startIndex),anchorBatchId:anchor.batchId,sequenceHash:anchor.sequenceHash}
}

/** A secundária confirma o contexto; nunca torna o lote principal um lançamento. */
export function locateKnownFrontier(parsed, source) {
    const primary = source?.frontier
    validateAnchor(primary)
    const fallbacks = source.fallbackFrontiers || []
    assert.ok(Array.isArray(fallbacks), FAILURE + ' Lista de âncoras secundárias inválida.')
    for(const anchor of fallbacks) validateAnchor(anchor)
    let primaryError
    try {
        return {...locateFrontier(parsed,primary),anchorUsed:primary.batchId,fallbackUsed:false}
    } catch(error) { primaryError=error }
    if(!fallbacks.length) throw primaryError
    // Uma âncora com quórum mas início ambíguo não é resgatada por outro lote.
    const analysis = analyzeFrontier(parsed,primary)
    if(analysis.accepted.length) throw primaryError
    const attempts = [{batchId:primary.batchId,accepted:false,message:primaryError.message}]
    const reject = reason => {
        const error=new Error(FAILURE+' '+reason)
        error.details={...primaryError.details,anchorAttempts:attempts}
        throw error
    }
    for(const anchor of fallbacks){
        let secondary
        try { secondary=locateFrontier(parsed,anchor) }
        catch(error){attempts.push({batchId:anchor.batchId,accepted:false,message:error.message});continue}
        attempts.push({batchId:anchor.batchId,accepted:true,startIndex:secondary.startIndex,score:secondary.score})
        const prefix=parsed.items.slice(0,secondary.startIndex)
        if(!prefix.length){
            return {...secondary,anchorUsed:anchor.batchId,fallbackUsed:true,primaryAnchorBatchId:primary.batchId,primaryAbsent:true,primaryQuorumValidated:false,anchorAttempts:attempts}
        }
        const tokens=makeTokens(prefix,primary)
        const heads=tokens.flatMap((token,index)=>token.matches.size===1 && token.matches.get(0)?.strong.length ? [index] : [])
        if(heads.length!==1) reject('Âncora secundária reconhecida, mas a cabeça exata do lote principal não foi confirmada.')
        const head=heads[0],block=tokens.slice(head),startIndex=block[0].indices[0]
        const minimum=Math.max(3,Math.ceil(primary.entries.length/2))
        if(block.length<minimum || block.length>primary.entries.length) reject('Âncora secundária reconhecida, mas faltam identidades suficientes do lote principal.')
        let previous=-1
        for(const token of block){
            if(token.matches.size!==1) reject('Há item não identificado entre a cabeça principal e a âncora secundária.')
            const ordinal=token.matches.keys().next().value
            if(ordinal<=previous) reject('O bloco principal parcial não preserva a ordem relativa.')
            previous=ordinal
        }
        if(secondary.startIndex-startIndex>policy(primary.entries.length).maximumRawWindow) reject('O bloco principal parcial está disperso.')
        if(prefix.slice(0,startIndex).some(item=>primary.entries.some(entry=>plausibleIdentity(item,entry)))) reject('Um candidato anterior pode pertencer ao lote principal; fronteira ambígua.')
        const primaryMatches=block.map(token=>{
            const [ordinal,evidence]=token.matches.entries().next().value
            return {productId:primary.entries[ordinal].productId,indices:token.indices,evidence}
        })
        return {
            ...secondary,startIndex,endIndex:secondary.startIndex,candidates:parsed.items.slice(0,startIndex),
            anchorBatchId:primary.batchId,sequenceHash:primary.sequenceHash,anchorUsed:anchor.batchId,
            fallbackUsed:true,confidence:'alta-com-fallback',primaryAnchorBatchId:primary.batchId,
            primaryQuorumValidated:false,primaryFoundCount:block.length,primaryScore:analysis.bestAttempt?.score??null,
            primaryMatches,secondaryStartIndex:secondary.startIndex,anchorAttempts:attempts,
        }
    }
    reject('Nem a âncora principal nem uma secundária segura foram reconhecidas.')
}

/** Compara conteúdo material sem persistir preço do fornecedor ou URLs assinadas. */
export function materialSignature(parsed) {
    assert.ok(parsed && Array.isArray(parsed.items), 'Leitura da fonte inválida.')
    const material = parsed.items.map(item => ({
        tipo:explicitType(item.nome), nome:normalizedName(item.nome), categoria:item.categoria,
        codigoFornecedor:code(item.codigoFornecedor), precoRegular:regularPrice(item.supplierPriceCents),
        tamanhos:grade(item.tamanhos), cores:grade(item.cores), descriptionDigest:description(item.descricao),
        sourceKey:item.sourceKey || null, sharedImage:item.sharedImage === true,
        reviewReasons:[...(item.reviewReasons || [])].sort(),
    }))
    return digest(JSON.stringify({material, errors:parsed.errors || [], structuralFormat:parsed.stats?.structuralFormat || null}))
}
