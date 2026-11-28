import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import {execFileSync} from 'node:child_process'
import {parseCatalogo} from './fonte.mjs'
import {SOURCE_URL, normalize, digest, readProducts, productId, regularPrice, latestBatches, applyBatches, validateProducts, writeProducts, assertRuntimeUnchanged} from './model.mjs'
import {imageURL, persistentImageURL, requestBytes, inspectImage, newImagePath, validateImageFiles} from './imagens.mjs'
import {createAnchor, locateFrontier, locateKnownFrontier, materialSignature, explicitType} from './fronteira.mjs'
import {readVerifiedCatalog} from './diagnostico.mjs'

const compact = value => normalize(value).replace(/[^a-z0-9]/g, '')
function distance(a, b) {
    let row = Array.from({length: b.length + 1}, (_, i) => i)
    for(let i = 1; i <= a.length; i++){
        const next = [i]
        for(let j = 1; j <= b.length; j++) next.push(Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + Number(a[i - 1] !== b[j - 1])))
        row = next
    }
    return row[b.length]
}
const sameName = (a, b) => compact(a) === compact(b)
const safeImageURL = value => { try {return imageURL(value)} catch {return null} }

export function guardSource(parsed, history) {
    assert.ok(parsed.errors.length === 0, 'Estrutura da fonte exige revisão: ' + parsed.errors.map(e => e.code).join(', '))
    const baseline = history.source.validation
    assert.ok(baseline?.recognizedProducts > 0, 'Falta estabelecer a linha de base da fonte na migração inicial.')
    if(baseline.structuralFormat) assert.equal(parsed.stats.structuralFormat, baseline.structuralFormat, 'Formato da fonte mudou.')
    const loss = Math.max(...latestBatches(history).map(b => b.productIds.length))
    assert.ok(parsed.items.length >= baseline.recognizedProducts - loss, 'Queda suspeita na quantidade reconhecida; revisão necessária.')
    assert.ok(parsed.stats.productsWithoutImages <= baseline.productsWithoutImages, 'Imagens ausentes além da linha de base; revisão necessária.')
    assert.equal(parsed.stats.orphanPriceLines, 0, 'Parsing parcial de preços.')
    assert.equal(parsed.stats.candidateCount, parsed.items.length, 'Parsing parcial de produtos.')
    assert.ok(parsed.stats.productTextBlocks > 0 && parsed.stats.imageCount > 0 && parsed.stats.sectionCount > 0, 'Estrutura da fonte mudou.')
}

export function groupSource(items) {
    const groups = new Map()
    for(const item of items){
        const key = item.codigoFornecedor ? 'code:' + item.codigoFornecedor : 'image:' + JSON.stringify([safeImageURL(item.imageUrl), compact(item.nome), item.categoria])
        if(!groups.has(key)) groups.set(key, [])
        groups.get(key).push(item)
    }
    return [...groups.values()]
}

export function knownProduct(group, products, history) {
    const item = group[0], code = item.codigoFornecedor
    if(code){
        const matches = products.filter(p => p.codigoFornecedor === code)
        if(matches.length === 1 && group.every(i => i.categoria === matches[0].categoria && (sameName(i.nome, matches[0].nome) || distance(compact(i.nome), compact(matches[0].nome)) <= 2))) return matches[0]
        if(matches.length) return {review: 'Código existente com identificação conflitante.'}
    }
    const urls = new Set(group.map(i => safeImageURL(i.imageUrl)).filter(Boolean))
    const records = history.products.filter(r => r.evidence.imageUrls.some(url => urls.has(safeImageURL(url))))
    const matches = products.filter(p => records.some(r => r.id === productId(p, products)) && p.categoria === item.categoria && sameName(p.nome, item.nome))
    if(matches.length === 1) return matches[0]
    if(matches.length > 1) return {review: 'Imagem e nome correspondem a mais de um cadastro.'}
    return null
}

export function potentialDuplicates(item, products) {
    return products.filter(p => p.categoria === item.categoria && (
        sameName(p.nome, item.nome) || distance(compact(p.nome), compact(item.nome)) <= 2
    ) && !(item.codigoFornecedor && p.codigoFornecedor && item.codigoFornecedor !== p.codigoFornecedor))
}

function evidence(group, metadata) {
    return {codigoFornecedor: group[0].codigoFornecedor, sourceKeys: [...new Set(group.map(i => i.sourceKey))], imageUrls: [...new Set(group.map(i => persistentImageURL(i.imageUrl)).filter(Boolean))], imageSha256: metadata.sha256}
}

export function addBatch(products, history, additions, now, members = []) {
    if(!additions.length) return {products, history, batch: null}
    const nextHistory = structuredClone(history), nextProducts = [...products, ...additions.map(a => a.product)]
    const additionIds = additions.map(a => productId(a.product, nextProducts))
    const ids = [...new Set([...members.map(p => productId(p, nextProducts)), ...additionIds])]
    const batch = {id: 'catalogo-' + digest(JSON.stringify([...ids].sort())).slice(0, 16), label: 'Atualização ' + new Intl.DateTimeFormat('sv-SE', {timeZone: 'America/Sao_Paulo'}).format(now), detectedAt: now.toISOString(), legacy: false, productIds: ids}
    assert.ok(!nextHistory.batches.some(b => b.id === batch.id), 'Lote já existente.')
    nextHistory.batches.push(batch)
    for(const [index, addition] of additions.entries()) nextHistory.products.push({id: additionIds[index], nome: addition.product.nome, firstDetectedAt: now.toISOString(), batchIds: [batch.id], evidence: addition.evidence, blackFridayEligible: true})
    for(const member of members){
        const record = nextHistory.products.find(r => r.id === productId(member, nextProducts))
        if(!record.batchIds.includes(batch.id)) record.batchIds.push(batch.id)
    }
    return {products: applyBatches(nextProducts, nextHistory), history: nextHistory, batch}
}

export async function planUpdate({products, history, parsed, now = new Date(), loadImage}) {
    guardSource(parsed, history)
    const latest = latestBatches(history).at(-1)
    assert.ok(history.source.frontier?.batchId === latest?.id, 'Falha segura: fronteira do catálogo não identificada. A assinatura não pertence ao último lote conhecido.')
    assert.deepEqual(new Set(history.source.frontier.entries.map(e => e.productId)), new Set(latest.productIds), 'Falha segura: fronteira do catálogo não identificada. A assinatura não cobre os membros do lote.')
    const frontier = locateKnownFrontier(parsed, history.source)
    const groups = groupSource(frontier.candidates), reviews = [], additions = [], pending = new Map(), known = []
    const historicalAmbiguities = groupSource(parsed.items.slice(frontier.startIndex)).filter(group => group.some(i => i.sharedImage || i.reviewReasons?.length)).length
    assert.ok(frontier.candidates.every((item, index) => item.sourceOrder === index), 'Falha segura: bloco anterior à fronteira não é contíguo.')
    assert.ok(frontier.candidates.length <= history.baseline.maxObservedImportSize, 'Falha segura: prefixo excede o maior lote confirmado.')
    const downloaded = new Map()
    const load = async item => {
        const key = safeImageURL(item.imageUrl)
        assert.ok(key, 'Imagem sem origem autorizada.')
        if(!downloaded.has(key)) downloaded.set(key, loadImage(item.imageUrl))
        return downloaded.get(key)
    }
    const review = (group, reason) => reviews.push({nome: group[0].nome, codigo: group[0].codigoFornecedor, sourceKeys: group.map(i => i.sourceKey), motivo: reason, estado: 'revisão necessária'})
    for(const group of groups){
        const item = group[0], existing = knownProduct(group, products, history)
        const previouslyObserved = (history.source.observations || []).some(o => o.sourceKey === item.sourceKey && o.identityHash === occurrenceIdentity(item))
        if(previouslyObserved){review(group, 'Bloco já observado no catálogo conhecido foi reposicionado; revisão necessária.'); continue}
        if(!explicitType(item.nome)){review(group, 'Tipo do produto não sustentado explicitamente pelo bloco.'); continue}
        if(existing && !existing.review){ known.push({product: existing, group}); continue }
        if(existing?.review){review(group, existing.review); continue}
        const conflicts = ['nome', 'categoria', 'tamanhos', 'cores', 'supplierPriceCents'].filter(field => new Set(group.map(i => JSON.stringify(i[field]))).size > 1)
        if(conflicts.length){review(group, 'Ocorrências com dados divergentes: ' + conflicts.filter(f => f !== 'supplierPriceCents').concat(conflicts.includes('supplierPriceCents') ? ['valor não confirmado'] : []).join(', ')); continue}
        const sameNames = groups.filter(other => other !== group && sameName(other[0].nome, item.nome) && other[0].categoria === item.categoria && !(item.codigoFornecedor && other[0].codigoFornecedor && item.codigoFornecedor !== other[0].codigoFornecedor))
        if(sameNames.length){review(group, 'Mais de uma foto/cadastro sem referência suficiente para confirmar a identidade.'); continue}
        if(groups.length === 1 && !item.codigoFornecedor){review(group, 'Bloco isolado sem referência oficial; não é possível confirmar lançamento.'); continue}
        if(item.sharedImage){review(group, 'Imagem compartilhada exige recorte e conferência manual.'); continue}
        const priceOnly = new Set(['FIELD_UNREADABLE_PRICE', 'FIELD_CONFLICTING_PRICE', 'FIELD_INVALID_PRICE'])
        const reasons = group.flatMap(i => i.reviewReasons || []).filter(reason => !priceOnly.has(reason))
        if(reasons.length){review(group, [...new Set(reasons)].join(', ')); continue}
        const candidates = potentialDuplicates(item, products)
        const recordedSource = history.products.some(r => sameName(r.nome, item.nome) && r.evidence.sourceKeys.some(key => group.some(i => i.sourceKey === key)))
        if(candidates.length && !recordedSource){
            review(group, 'Possível duplicata/homônimo sem referência ou imagem histórica confirmada: ' + candidates.map(p => p.nome).join('; ')); continue
        }
        let image
        try { image = await load(item) } catch(error){throw new Error('Download/validação de imagem de ' + item.nome + ' falhou; atualização abortada: ' + error.message)}
        const {metadata, bytes} = image
        const hashMatches = history.products.filter(r => r.evidence.imageSha256 === metadata.sha256 || r.evidence.imageSha256Alternatives?.includes(metadata.sha256))
        if(hashMatches.length){
            const matches = products.filter(p => hashMatches.some(r => r.id === productId(p, products)) && sameName(p.nome, item.nome) && p.categoria === item.categoria)
            if(matches.length === 1){ known.push({product: matches[0], group}); continue }
            review(group, 'Imagem idêntica a cadastro existente com identificação diferente ou ambígua.'); continue
        }
        if(candidates.length){review(group, 'Possível duplicata/homônimo: ' + candidates.map(p => p.nome).join('; ')); continue}
        if(!item.codigoFornecedor && (!item.sourceKey || !item.imageUrl || !item.nome || !item.categoria)){
            review(group, 'Identidade insuficiente.'); continue
        }
        if(metadata.width > metadata.height * 1.25 || metadata.width < 240 || metadata.height < 320){review(group, 'Imagem pequena ou horizontal demais para o card; conferir manualmente.'); continue}
        const filename = newImagePath(item, metadata)
        if(pending.has(filename) || products.some(p => p.imagem === filename)){review(group, 'Conflito de nome de arquivo.'); continue}
        if(additions.some(a => a.evidence.imageSha256 === metadata.sha256)){
            review(group, 'Mesma imagem atribuída a novos produtos diferentes.'); continue
        }
        const minOrder = Math.min(0, ...products.filter(p => p.novidade).map(p => p.ordemCatalogo || 0))
        const product = {disponivel: true, entregaRapida: false, nome: item.nome, codigoFornecedor: item.codigoFornecedor, categoria: item.categoria, preco: null, precoRegular: regularPrice(item.supplierPriceCents), precoBlackFriday: null, tamanhos: item.tamanhos, cores: item.cores, novidade: true, blackFriday: false, ordemCatalogo: minOrder - parsed.items.length + item.sourceOrder, descricao: item.descricao, imagem: filename}
        additions.push({product, evidence: evidence(group, metadata), group})
        pending.set(filename, {bytes, metadata})
    }
    const max = history.baseline.maxObservedImportSize
    assert.ok(Number.isInteger(max) && max > 0, 'Limite de crescimento histórico não estabelecido.')
    assert.ok(additions.length <= max, 'Quantidade de novos produtos excede a maior importação confirmada; revisão necessária.')
    if(reviews.length || frontier.candidates.length > 0 && !additions.length){
        const error = new Error('Falha segura: bloco anterior à fronteira exige revisão; nenhum lote será publicado parcialmente.')
        error.details = {fronteiraIdentificada:true,fronteira:frontier.startIndex,candidatosAntesFronteira:frontier.candidates.length,candidatosNovosConfirmados:additions.length,candidatosNovosAmbiguos:reviews.length || groups.length,ambiguidadesHistoricas:historicalAmbiguities,revisoes:reviews}
        throw error
    }
    const result = addBatch(products, history, additions, now, known.map(match => match.product))
    if(result.batch){
        for(const match of known){
            const record = result.history.products.find(r => r.id === productId(match.product, products))
            record.evidence.imageUrls = [...new Set([...record.evidence.imageUrls, ...match.group.map(i => i.imageUrl)].map(persistentImageURL).filter(Boolean))]
            record.evidence.sourceKeys = [...new Set([...record.evidence.sourceKeys, ...match.group.map(i => i.sourceKey)])]
        }
        result.history.source.validation = {...history.source.validation, recognizedProducts: parsed.items.length, productsWithoutImages: parsed.stats.productsWithoutImages}
        const mappings = [...known.map(match => ({...match})), ...additions.map(a => ({product:a.product, group:a.group}))]
        const ordered = []
        for(const mapping of mappings.sort((a,b)=>a.group[0].sourceOrder-b.group[0].sourceOrder)){
            const id=productId(mapping.product,result.products), last=ordered.at(-1)
            if(last && productId(last.product,result.products)===id) last.group=[...last.group,...mapping.group]
            else {
                assert.ok(!ordered.some(m=>productId(m.product,result.products)===id),'Falha segura: produto reaparece fora de ordem no prefixo.')
                ordered.push(mapping)
            }
        }
        const previousAnchors = [history.source.frontier, ...(history.source.fallbackFrontiers || [])].filter(Boolean)
        result.history.source.fallbackFrontiers = previousAnchors.filter((anchor,index) => previousAnchors.findIndex(other => other.sequenceHash === anchor.sequenceHash) === index)
        result.history.source.frontier = createAnchor(ordered.map(({product,group}) => {
            const record = result.history.products.find(r => r.id === productId(product, result.products)), item=group[0]
            return {...product,...record.evidence,nome:item.nome,aliases:[product.nome],productId:record.id,precoRegular:regularPrice(item.supplierPriceCents),descricao:item.descricao,tamanhos:item.tamanhos,codigoFornecedor:item.codigoFornecedor}
        }), {batchId:result.batch.id})
        const newFrontier = locateFrontier(parsed, result.history.source.frontier)
        assert.ok(newFrontier.startIndex === 0 && newFrontier.endIndex === frontier.startIndex, 'Falha segura: a nova assinatura não cobre todo o bloco de lançamento.')
        result.history.source.observations = parsed.items.map(item => ({sourceKey:item.sourceKey,identityHash:occurrenceIdentity(item)}))
    }
    return {...result, additions, pending, reviews, frontier, historicalAmbiguities, knownCount: known.length, sourceCount: parsed.items.length}
}

export function occurrenceIdentity(item) {
    return digest(JSON.stringify([explicitType(item.nome), compact(item.nome), item.codigoFornecedor || null]))
}

export function assertStableReadings(first, second) {
    assert.equal(materialSignature(first), materialSignature(second), 'Fonte instável durante a execução.')
}

export async function executeUpdate({root, dryRun = false, validateOnly = false, html, secondHtml, fetchImpl = fetch, renderSource, now = new Date(), onReport = () => {}}) {
    const sourcePath = path.join(root, 'script.js'), historyPath = path.join(root, 'data/catalog-history.json')
    const source = await fs.readFile(sourcePath, 'utf8'), historyText = await fs.readFile(historyPath, 'utf8')
    const products = readProducts(source), history = JSON.parse(historyText)
    const initial = validateProducts(products, history)
    assertRuntimeUnchanged(source, source)
    execFileSync(process.execPath, ['--check', sourcePath], {cwd: root})
    await validateImageFiles(root, products, history)
    if(validateOnly) return {changed: false, validacao: true, anterior: products.length, ...initial}
    let parsed, second, result
    try {
        if(html===undefined&&renderSource!==false){
            const verified=await readVerifiedCatalog({root,fetchImpl,renderSource})
            parsed=verified.first;second=verified.second
        } else {
            // Fixtures injetadas em testes não precisam iniciar um navegador real.
            const htmlText = html ?? (await requestBytes(SOURCE_URL, {kind: 'html', fetchImpl})).bytes.toString('utf8')
            parsed = parseCatalogo(htmlText)
            const nextHTML = secondHtml ?? html ?? (await requestBytes(SOURCE_URL, {kind: 'html', fetchImpl})).bytes.toString('utf8')
            second = parseCatalogo(nextHTML)
        }
        assertStableReadings(parsed, second)
        result = await planUpdate({products, history, parsed, now, loadImage: async url => {
            const {bytes} = await requestBytes(url, {fetchImpl})
            return {bytes, metadata: await inspectImage(bytes)}
        }})
        // Só as imagens do prefixo aceito precisam ser reconferidas entre as duas leituras.
        for(const addition of result.additions){
            const item = second.items[addition.group[0].sourceOrder]
            const response = await requestBytes(item.imageUrl, {fetchImpl})
            const metadata = await inspectImage(response.bytes)
            assert.equal(metadata.sha256, addition.evidence.imageSha256, 'Fonte instável durante a execução: imagem de lançamento mudou.')
        }
    } catch(error){
        error.report = {changed:false,dryRun,data:now.toISOString(),anterior:products.length,novos:0,lote:null,...initial,fronteiraIdentificada:false,candidatosAntesFronteira:null,candidatosNovosConfirmados:0,candidatosNovosAmbiguos:null,ocorrenciasFonte:parsed?.items.length ?? null,leiturasFonte:Number(Boolean(parsed))+Number(Boolean(second)),lotesNovidades:latestBatches(history).map(b=>({id:b.id,nome:b.label})),...error.details,mensagem:error.message}
        throw error
    }
    const counts = validateProducts(result.products, result.history, products)
    const updatedSource = writeProducts(source, result.products)
    assertRuntimeUnchanged(source, updatedSource)
    await validateImageFiles(root, result.products, result.history, result.pending)
    const report = {changed: result.additions.length > 0, dryRun, data: now.toISOString(), anterior: products.length, novos: result.additions.length, ...counts, nomes: result.additions.map(a => a.product.nome), lote: result.batch?.id ?? null, lotesNovidades: latestBatches(result.history).map(b => ({id: b.id, nome: b.label})), imagens: [...result.pending.keys()], revisoes: result.reviews, ocorrenciasFonte: result.sourceCount, gruposJaConhecidos: result.knownCount, testes: ['Sintaxe JavaScript', 'Estrutura/IDs/códigos', 'Integridade de todas as imagens', 'Dois lotes/Black Friday', 'Entrega rápida e compra', 'Preservação de dados antigos, runtime e deep links'], mensagem: result.additions.length ? 'Atualização validada.' : 'Nenhum produto novo encontrado.'}
    Object.assign(report,{fronteiraIdentificada:true,fronteira:result.frontier.startIndex,ancoraUtilizada:result.frontier.anchorUsed,fallbackUtilizado:result.frontier.fallbackUsed,scoreFronteira:result.frontier.score,confiancaFronteira:result.frontier.confidence,novosLotes:result.batch?1:0,commitNecessario:result.additions.length>0,ambiguidadesHistoricas:result.historicalAmbiguities,candidatosAntesFronteira:result.frontier.candidates.length,candidatosNovosConfirmados:result.additions.length,candidatosNovosAmbiguos:result.reviews.length,leiturasFonte:2})
    await onReport(report)
    if(dryRun || !result.additions.length) return report
    assert.equal(await fs.readFile(sourcePath, 'utf8'), source, 'script.js mudou durante a consulta; nada será sobrescrito.')
    assert.equal(await fs.readFile(historyPath, 'utf8'), historyText, 'Histórico mudou durante a consulta; nada será sobrescrito.')
    // Todos os bytes e dados foram validados em memória. Somente arquivos novos usam wx.
    const created = []
    let dataTouched = false
    try {
        for(const [filename, image] of result.pending){
            const destination = path.join(root, filename)
            await fs.writeFile(destination, image.bytes, {flag: 'wx'})
            created.push(destination)
        }
        assert.equal(await fs.readFile(sourcePath, 'utf8'), source, 'script.js foi editado durante a preparação das imagens.')
        assert.equal(await fs.readFile(historyPath, 'utf8'), historyText, 'Histórico foi editado durante a preparação das imagens.')
        dataTouched = true
        await fs.writeFile(sourcePath, updatedSource)
        await fs.writeFile(historyPath, JSON.stringify(result.history, null, 2) + '\n')
        execFileSync(process.execPath, ['--check', sourcePath], {cwd: root})
        execFileSync('git', ['diff', '--check'], {cwd: root})
    } catch(error){
        if(dataTouched){
            await fs.writeFile(sourcePath, source)
            await fs.writeFile(historyPath, historyText)
        }
        for(const filename of created) await fs.unlink(filename) // Somente arquivos desta transação, nunca imagens antigas.
        throw error
    }
    return report
}
