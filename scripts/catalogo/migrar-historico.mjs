// Migração única e auditável do catálogo já existente. Nunca substitui um histórico criado.
import fs from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {persistentImageURL} from './imagens.mjs'

const raizPadrao = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const CATALOG_SOURCE = 'https://sites.google.com/view/mariaamorecatalogo/cat%C3%A1logo'

// Arquivos dos cadastros confirmados antes da automação, não correspondências por nome.
const arquivosLumina = [
    'vestido-rute.jpg', 'blusa-betania.png', 'saia-betania.png', 'vestido-louise.jpg',
    'vestido-helena.jpg', 'body-tamires.png', 'saia-sonia.png', 'vestido-valentina.jpg',
    'vestido-cassandra.jpg', 'conjunto-cibele.jpg', 'conjunto-telma.jpg',
]
const arquivosMagnific = [
    'vestido-celene.jpg', 'vestido-cleo-magnific.jpg', 'vestido-giovana.jpg',
    'vestido-evelin.jpg', 'vestido-geisa.jpg', 'vestido-simone.jpg',
    'vestido-clara-magnific.jpg', 'vestido-paula.jpg', 'vestido-clarita.jpg',
    'blusa-betania.png', 'saia-lucia.png', 'camisa-sara.png',
    'saia-joana-magnific.png', 'camisa-lorena.png', 'saia-angela.png',
]

export function lerProdutosDaFonte(fonte) {
    const literal = fonte.match(/let produtos = (\[[\s\S]*?^\])/m)
    assert.ok(literal, 'Array de produtos não reconhecido; migração abortada.')
    return JSON.parse(JSON.stringify(vm.runInNewContext(literal[1], Object.create(null), {timeout: 1000})))
}

export function identidadesAtuais(produtos) {
    const contagem = new Map()
    produtos.forEach(p => {
        if(p.codigoFornecedor) contagem.set(p.codigoFornecedor, (contagem.get(p.codigoFornecedor) || 0) + 1)
    })
    return produtos.map(p => p.codigoFornecedor && contagem.get(p.codigoFornecedor) === 1
        ? 'codigo:' + p.codigoFornecedor
        : 'produto:' + JSON.stringify([p.categoria, p.nome, p.imagem]))
}

function recuperarEvidenciasGit(raiz, produtos, records) {
    const commit = 'c6ba0dbedefa8019a71eb6523a0200c7012556ee'
    const commitCodigos = 'db9ff553a5eaaac0d237efa2ea63de018cee1237'
    const git = referencia => execFileSync('git', ['show', referencia], {cwd: raiz, maxBuffer: 30 * 1024 * 1024})
    const ler = (referencia, arquivo) => JSON.parse(git(referencia + ':' + arquivo).toString('utf8'))
    const importacao = ler(commit, 'verificacao/expansao-completa/importacao.json')
    const plano = ler(commit, 'verificacao/expansao-completa/plano-imagens.json')
    const catalogo = ler(commit, 'verificacao/expansao-completa/catalogo-atual.json')
    const codigos = ler(commitCodigos, 'verificacao/v2-codigos-fornecedor.json')
    assert.equal(importacao.estadoInicial.produtos.length, 59)
    assert.equal(importacao.importados.length, 201)
    assert.equal(importacao.totalFinal, 260)
    assert.deepEqual(plano.map(p => [p.imagem, p.imagemFonte]), importacao.importados.map(p => [p.imagem, p.imagemFonte]), 'Manifestos históricos discordam.')
    const urls = new Map(records.map(r => [r.id, new Set()]))
    const imagensConferidas = new Set()
    const vincular = (indice, url) => {
        const produto = produtos[indice], record = records[indice]
        const endereco = new URL(url)
        assert.ok(endereco.protocol === 'https:' && endereco.hostname === 'sites.google.com' && endereco.pathname.startsWith('/sitesv-images-rt/'), 'Origem histórica de imagem não autorizada.')
        if(!imagensConferidas.has(produto.imagem)){
            const bytes = git(commit + ':' + produto.imagem)
            assert.equal(createHash('sha256').update(bytes).digest('hex'), record.evidence.imageSha256, 'A imagem final mudou desde o vínculo confirmado: ' + produto.imagem)
            imagensConferidas.add(produto.imagem)
        }
        urls.get(record.id).add(endereco.href)
    }
    for(const item of importacao.importados){
        const encontrados = produtos.flatMap((p, i) => p.imagem === item.imagem ? [i] : [])
        assert.equal(encontrados.length, 1, 'Imagem do manifesto sem cadastro unívoco: ' + item.imagem)
        const indice = encontrados[0]
        if(item.codigo && produtos[indice].codigoFornecedor){
            assert.equal(item.codigo, produtos[indice].codigoFornecedor, 'Conflito com referência histórica confirmada.')
        }
        vincular(indice, item.imagemFonte)
    }
    // Há referências anteriores aos 201 novos. Só usamos código único confirmado,
    // a indicação do bloco no relatório e o mesmo código escrito naquele bloco.
    for(const item of codigos.produtos){
        if(!item.codigoFornecedor) continue
        const encontrados = produtos.flatMap((p, i) => p.codigoFornecedor === item.codigoFornecedor ? [i] : [])
        if(encontrados.length !== 1) continue
        for(const fonte of item.fontes){
            if(fonte.arquivo !== 'verificacao/expansao-completa/analise.json' || fonte.codigo !== item.codigoFornecedor) continue
            const bloco = catalogo.blocos.find(b => b.indice === fonte.bloco)
            const referencias = [...(bloco?.textos.join(' ').matchAll(/C[oó]d\s*:\s*(\d{3,})/gi) || [])].map(m => m[1])
            assert.ok(referencias.includes(item.codigoFornecedor), 'Referência histórica não confirmada no bloco indicado.')
            vincular(encontrados[0], bloco.imagem)
        }
    }
    return {
        urls,
        maxObservedImportSize: importacao.importados.length,
        growthEvidence: {commit, previousCount: 59, importedCount: 201, finalCount: 260},
    }
}

export async function criarHistoricoInicial(raiz = raizPadrao) {
    const produtos = lerProdutosDaFonte(await fs.readFile(path.join(raiz, 'script.js'), 'utf8'))
    assert.equal(produtos.length, 398, 'A migração foi preparada somente para a base confirmada de 398 produtos.')
    const ids = identidadesAtuais(produtos)
    assert.equal(new Set(ids).size, 398, 'Há identidades em colisão; revisão necessária.')

    const selecionar = arquivos => arquivos.map(arquivo => {
        const encontrados = produtos.map((produto, indice) => ({produto, id: ids[indice]}))
            .filter(({produto}) => produto.imagem === 'assets/imagens/produtos/' + arquivo)
        assert.equal(encontrados.length, 1, 'Cadastro da coleção não é unívoco: ' + arquivo)
        return encontrados[0].id
    })
    const lumina = selecionar(arquivosLumina)
    const magnific = selecionar(arquivosMagnific)
    const recentes = new Set([...lumina, ...magnific])
    assert.equal(recentes.size, 25, 'As coleções confirmadas devem compartilhar somente Blusa Betania.')
    const legado = ids.filter(id => !recentes.has(id))
    const fastDeliveryIds = produtos.flatMap((p, i) => p.entregaRapida === true ? [ids[i]] : [])
    assert.equal(fastDeliveryIds.length, 15, 'A lista confirmada de Entrega rápida precisa de revisão.')
    assert.ok(produtos.every(p => p.disponivel === true), 'A migração não pode alterar permissão de compra.')

    const batches = [
        {id: 'legado', label: 'Histórico legado', detectedAt: null, legacy: true, productIds: legado},
        {id: 'lumina', label: 'Lumina', detectedAt: null, legacy: false, productIds: lumina},
        {id: 'magnific', label: 'Magnific', detectedAt: null, legacy: false, productIds: magnific},
    ]
    const records = []
    for(let indice = 0; indice < produtos.length; indice++){
        const produto = produtos[indice], id = ids[indice]
        const absoluto = path.resolve(raiz, produto.imagem)
        const relativo = path.relative(path.resolve(raiz, 'assets/imagens/produtos'), absoluto)
        assert.ok(relativo && !relativo.startsWith('..') && !path.isAbsolute(relativo), 'Imagem fora da pasta de produtos.')
        const bytes = await fs.readFile(absoluto)
        assert.ok(bytes.length, 'Imagem vazia: ' + produto.imagem)
        records.push({
            id,
            nome: produto.nome,
            firstDetectedAt: null,
            batchIds: batches.filter(batch => batch.productIds.includes(id)).map(batch => batch.id),
            evidence: {
                codigoFornecedor: produto.codigoFornecedor ?? null,
                sourceKeys: [],
                imageUrls: [],
                imageSha256: createHash('sha256').update(bytes).digest('hex'),
            },
            // As únicas exclusões atuais são de Lumina/Magnific; o lote controla a exclusão.
            blackFridayEligible: true,
        })
    }
    const recuperadas = recuperarEvidenciasGit(raiz, produtos, records)
    records.forEach(record => { record.evidence.imageUrls = [...recuperadas.urls.get(record.id)].map(persistentImageURL).filter(Boolean) })
    return {
        schemaVersion: 1,
        // Linha de base observada durante esta migração; não é recalibrada semanalmente.
        source: {url: CATALOG_SOURCE, observations: [], validation: {recognizedProducts: 496, productsWithoutImages: 0, structuralFormat: 'google-sites-tyJCtd-v1', observedAt: null}},
        batches,
        products: records,
        baseline: {
            productCount: produtos.length,
            categories: [...new Set(produtos.map(p => p.categoria))],
            fastDeliveryIds,
            latestBatchIds: ['lumina', 'magnific'],
            maxObservedImportSize: recuperadas.maxObservedImportSize,
            growthEvidence: recuperadas.growthEvidence,
        },
    }
}

export function validarMigracao(historico, esperado) {
    assert.equal(historico.schemaVersion, 1)
    assert.equal(historico.source.url, CATALOG_SOURCE)
    assert.deepEqual(historico.baseline, esperado.baseline)
    assert.deepEqual(historico.batches, esperado.batches)
    assert.deepEqual(historico.products, esperado.products)
    assert.ok(!/precoBase|supplierPrice|precoFornecedor|custo/i.test(JSON.stringify(historico)), 'Histórico contém campo indevido.')
    return {
        produtos: historico.products.length,
        legado: historico.batches[0].productIds.length,
        lumina: historico.batches[1].productIds.length,
        magnific: historico.batches[2].productIds.length,
        novidadesDosDoisLotes: new Set(historico.batches.slice(-2).flatMap(b => b.productIds)).size,
        entregaRapida: historico.baseline.fastDeliveryIds.length,
        datasAntigasDesconhecidas: true,
        produtosComImagemFonteConfirmada: historico.products.filter(p => p.evidence.imageUrls.length > 0).length,
        vinculosDeImagem: historico.products.reduce((soma, p) => soma + p.evidence.imageUrls.length, 0),
    }
}

async function main() {
    const argumentos = process.argv.slice(2)
    assert.ok(argumentos.every(a => ['--write', '--check'].includes(a)), 'Use --write ou --check.')
    assert.ok(!(argumentos.includes('--write') && argumentos.includes('--check')), 'Escolha somente um modo.')
    const esperado = await criarHistoricoInicial()
    const destino = path.join(raizPadrao, 'data/catalog-history.json')
    if(argumentos.includes('--write')){
        await fs.mkdir(path.dirname(destino), {recursive: true})
        // wx impede apagar observações, lotes ou vínculos de identidade já registrados.
        await fs.writeFile(destino, JSON.stringify(esperado, null, 2) + '\n', {encoding: 'utf8', flag: 'wx'})
    }
    const atual = argumentos.includes('--check')
        ? JSON.parse(await fs.readFile(destino, 'utf8'))
        : esperado
    console.log(JSON.stringify(validarMigracao(atual, esperado), null, 2))
}

if(process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)){
    main().catch(erro => { console.error('Migração não concluída: ' + erro.message); process.exitCode = 1 })
}
