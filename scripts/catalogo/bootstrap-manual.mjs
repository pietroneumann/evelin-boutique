import assert from 'node:assert/strict'
import {SOURCE_URL, normalize, digest, productId, regularPrice, applyBatches, validateProducts} from './model.mjs'
import {createAnchor, locateFrontier, materialSignature, explicitType} from './fronteira.mjs'
import {persistentImageURL} from './imagens.mjs'
import {occurrenceIdentity} from './atualizador.mjs'

const nameKey = value => normalize(value).replace(/\s+/gu, '')
const isHash = value => typeof value === 'string' && /^[a-f0-9]{64}$/u.test(value)
const unique = values => [...new Set(values)]

/** Planeja somente uma aceitação humana explícita; não é chamado pelo workflow. */
export function planManualBootstrap({products, history, parsed, members, batchId, acceptedAt, expectedSourceSignature}) {
    assert.ok(acceptedAt instanceof Date && Number.isFinite(acceptedAt.getTime()), 'Data de aceitação inválida.')
    assert.ok(typeof batchId === 'string' && /^lote-\d{4}-\d{2}-\d{2}$/u.test(batchId), 'Identificador técnico do lote inválido.')
    assert.equal(history.source.url, SOURCE_URL)
    assert.ok(!history.batches.some(batch => batch.id === batchId), 'Lote manual já registrado.')
    assert.equal(parsed.errors.length, 0, 'Fonte parcial; bootstrap proibido.')
    assert.ok(isHash(expectedSourceSignature), 'Falta assinatura da fonte revisada.')
    assert.equal(materialSignature(parsed), expectedSourceSignature, 'Fonte mudou materialmente desde a aprovação.')
    assert.ok(Array.isArray(members) && members.length > 0, 'Lote manual vazio.')
    assert.equal(new Set(members.map(member => nameKey(member.nome))).size, members.length, 'Modelo repetido no lote aceito.')
    const approvedKeys = members.flatMap(member => member.sourceKeys)
    assert.equal(new Set(approvedKeys).size, approvedKeys.length, 'Ocorrência repetida na aprovação.')
    assert.deepEqual(parsed.items.slice(0, approvedKeys.length).map(item => item.sourceKey), approvedKeys, 'O bloco aprovado não é o prefixo contíguo atual.')
    const nextHistory = structuredClone(history)
    const nextProducts = [...products]
    const mappings = [], created = [], reused = []
    const records = new Map(history.products.map(record => [record.id, record]))
    const minimumOrder = Math.min(0, ...products.map(product => product.ordemCatalogo || 0))
    for(const [ordinal, member] of members.entries()) {
        assert.ok(['novo', 'homonimo-novo', 'reutilizado'].includes(member.classification), 'Classificação manual ausente.')
        assert.ok(member.sourceKeys.length > 0)
        const group = member.sourceKeys.map(sourceKey => {
            const matches = parsed.items.filter(item => item.sourceKey === sourceKey)
            assert.equal(matches.length, 1, 'Ocorrência aprovada ausente ou ambígua.')
            return matches[0]
        })
        const first = group[0]
        assert.ok(explicitType(first.nome), 'Tipo explícito ausente.')
        assert.equal(nameKey(member.nome), nameKey(first.nome), 'Nome aprovado não corresponde à fonte.')
        for(const item of group) {
            assert.equal(nameKey(item.nome), nameKey(first.nome), 'Fotos não pertencem ao mesmo nome confirmado.')
            assert.equal(item.categoria, first.categoria, 'Fotos com categorias diferentes.')
            for(const field of ['codigoFornecedor', 'tamanhos', 'cores', 'supplierPriceCents', 'descricao'])
                assert.deepEqual(item[field], first[field], 'Fotos com dados divergentes: ' + field)
            assert.ok((item.reviewReasons || []).length === 0, 'Dado da fonte exige revisão adicional.')
        }
        assert.ok(Array.isArray(member.sourceImageFingerprints) && member.sourceImageFingerprints.length > 0, 'Faltam fingerprints das imagens confirmadas.')
        for(const fingerprint of member.sourceImageFingerprints) {
            assert.ok(isHash(fingerprint.sha256), 'Fingerprint inválido.')
            assert.ok(fingerprint.sourceKeys.length > 0 && fingerprint.sourceKeys.every(key => member.sourceKeys.includes(key)), 'Fingerprint sem vínculo com a ocorrência aprovada.')
        }
        assert.deepEqual(new Set(member.sourceImageFingerprints.flatMap(f => f.sourceKeys)), new Set(member.sourceKeys), 'Nem todas as fotos têm fingerprint.')
        let product
        if(member.existingId) {
            assert.equal(member.classification, 'reutilizado')
            assert.ok(typeof member.reuseReason === 'string' && member.reuseReason.trim(), 'Reutilização exige justificativa da identidade.')
            const matches = products.filter(p => productId(p, products) === member.existingId)
            assert.equal(matches.length, 1, 'Produto reutilizado não é unívoco.')
            product = matches[0]
            assert.ok(records.has(member.existingId))
            assert.equal(nameKey(product.nome), nameKey(first.nome), 'Reutilização tenta alterar o nome.')
            assert.equal(product.categoria, first.categoria, 'Reutilização tenta alterar o tipo.')
            reused.push(member.existingId)
        } else {
            assert.notEqual(member.classification, 'reutilizado')
            assert.ok(member.image && isHash(member.image.sha256), 'Imagem final nova não validada.')
            assert.match(member.image.filename, /^assets\/imagens\/produtos\/[a-z0-9][a-z0-9.-]*\.(?:jpg|jpeg|png|webp)$/u)
            assert.ok(!nextProducts.some(p => p.imagem === member.image.filename), 'Imagem final colide com cadastro existente.')
            product = {disponivel:true, entregaRapida:false, nome:first.nome, codigoFornecedor:first.codigoFornecedor, categoria:first.categoria,
                preco:null, precoRegular:regularPrice(first.supplierPriceCents), precoBlackFriday:null,
                tamanhos:first.tamanhos, cores:first.cores, novidade:true, blackFriday:false,
                ordemCatalogo:minimumOrder-members.length+ordinal, descricao:first.descricao, imagem:member.image.filename}
            nextProducts.push(product)
            const id = productId(product, nextProducts)
            assert.ok(!nextHistory.products.some(record => record.id === id), 'Nova identidade colide com produto histórico.')
            created.push(id)
            nextHistory.products.push({id,nome:product.nome,firstDetectedAt:acceptedAt.toISOString(),batchIds:[batchId],
                evidence:{codigoFornecedor:product.codigoFornecedor,sourceKeys:[],imageUrls:[],imageSha256:member.image.sha256},blackFridayEligible:true})
        }
        mappings.push({member,group,product,ordinal})
    }
    const ids = mappings.map(mapping => productId(mapping.product, nextProducts))
    assert.equal(new Set(ids).size, members.length, 'Dois modelos foram associados ao mesmo cadastro.')
    const batch = {id:batchId,label:'Lote ' + batchId.slice(5),detectedAt:acceptedAt.toISOString(),acceptedAt:acceptedAt.toISOString(),
        acceptedManually:true,legacy:false,productIds:ids,createdProductIds:created,reusedProductIds:reused,members:[]}
    for(const mapping of mappings) {
        const {product,group,member,ordinal} = mapping
        const id = ids[ordinal]
        const record = nextHistory.products.find(record => record.id === id)
        if(!record.batchIds.includes(batchId)) record.batchIds.push(batchId)
        record.evidence.sourceKeys = unique([...record.evidence.sourceKeys, ...group.map(item => item.sourceKey)])
        record.evidence.imageUrls = unique([...record.evidence.imageUrls, ...group.map(item => item.imageUrl)].map(persistentImageURL).filter(Boolean))
        const fingerprints = member.sourceImageFingerprints.map(f => ({sha256:f.sha256,sourceKeys:[...f.sourceKeys],imageUrls:unique((f.imageUrls || []).map(persistentImageURL).filter(Boolean))}))
        record.evidence.imageSha256Alternatives = unique([...(record.evidence.imageSha256Alternatives || []), ...fingerprints.map(f => f.sha256)]).filter(hash => hash !== record.evidence.imageSha256)
        record.evidence.sourceImageFingerprints = [...(record.evidence.sourceImageFingerprints || []), ...fingerprints]
        batch.members.push({ordinal,productId:id,nome:product.nome,classification:member.classification,
            ...(member.reuseReason ? {reuseReason:member.reuseReason} : {}),sourceKeys:group.map(item => item.sourceKey),sourceImageFingerprints:fingerprints})
    }
    nextHistory.batches.push(batch)
    const fallback = [history.source.frontier, ...(history.source.fallbackFrontiers || [])].filter(Boolean)
    nextHistory.source.fallbackFrontiers = fallback.filter((anchor,index) => fallback.findIndex(other => other.sequenceHash === anchor.sequenceHash) === index)
    nextHistory.source.frontier = createAnchor(mappings.map(({product,group}) => {
        const record = nextHistory.products.find(record => record.id === productId(product,nextProducts))
        return {...product,...record.evidence,nome:group[0].nome,aliases:[product.nome],productId:record.id,
            precoRegular:regularPrice(group[0].supplierPriceCents),descricao:group[0].descricao,tamanhos:group[0].tamanhos}
    }), {batchId})
    nextHistory.source.observations = parsed.items.map(item => ({sourceKey:item.sourceKey,identityHash:occurrenceIdentity(item)}))
    nextHistory.source.validation = {...history.source.validation,recognizedProducts:parsed.items.length,productsWithoutImages:parsed.stats.productsWithoutImages}
    const frontier = locateFrontier(parsed,nextHistory.source.frontier)
    assert.equal(frontier.startIndex,0,'Nova âncora não começa no topo.')
    assert.equal(frontier.endIndex,approvedKeys.length,'Nova âncora não cobre as fotos do lote inteiro.')
    const updated = applyBatches(nextProducts,nextHistory)
    const counts = validateProducts(updated,nextHistory,products)
    assert.ok(!/"(?:precoBase|supplierPriceCents|precoFornecedor|custo)"/iu.test(JSON.stringify(nextHistory)), 'Custo do fornecedor não pode entrar no histórico.')
    return {products:updated,history:nextHistory,batch,created,reused,frontier,counts,approvalDigest:digest(JSON.stringify({batchId,ids,acceptedAt:acceptedAt.toISOString()}))}
}
