import fs from 'node:fs/promises'
import path from 'node:path'
import {createHash} from 'node:crypto'
import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {readProducts, productId} from './model.mjs'

const repository = 'pietroneumann/evelin-boutique'
const domain = 'evelinboutiquedelivery.com.br'
const root = fileURLToPath(new URL('../../', import.meta.url))
const historyPath = 'data/catalog-history.json'
const permittedOldChanges = new Set(['novidade', 'blackFriday', 'precoBlackFriday'])
const imagePattern = /^assets\/imagens\/produtos\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|jpeg|png|webp|avif|gif)$/

function requireCondition(condition, message) {
    if(!condition) throw new Error(message)
}

function list(text) {
    return text.split('\0').filter(Boolean)
}

function git(args, {authenticated = false, optional = false} = {}) {
    const env = {...process.env, GIT_TERMINAL_PROMPT: '0', GIT_TRACE: '0', GIT_TRACE_CURL: '0', GIT_CURL_VERBOSE: '0'}
    if(authenticated){
        const credential = Buffer.from('x-access-token:' + process.env.GITHUB_TOKEN).toString('base64')
        // Credencial somente no ambiente deste processo; nunca nos argumentos ou no Git local.
        env.GIT_CONFIG_COUNT = '1'
        env.GIT_CONFIG_KEY_0 = 'http.https://github.com/.extraheader'
        env.GIT_CONFIG_VALUE_0 = 'AUTHORIZATION: basic ' + credential
    }
    const result = spawnSync('git', args, {cwd: root, env, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024})
    if(result.status !== 0 && !optional) throw new Error(`Git ${args[0]} falhou; confira acesso ao repositório e concorrência em main. Nenhum envio usa force.`)
    return {ok: result.status === 0, text: result.stdout || ''}
}

function assertActionsContext() {
    requireCondition(process.env.GITHUB_ACTIONS === 'true', 'Publicação permitida somente dentro do GitHub Actions.')
    requireCondition(process.env.GITHUB_REPOSITORY === repository && process.env.GITHUB_REF === 'refs/heads/main', 'Repositório ou branch fora do destino autorizado.')
    requireCondition(['schedule', 'workflow_dispatch'].includes(process.env.GITHUB_EVENT_NAME), 'Evento não autorizado para publicar o catálogo.')
    requireCondition(Boolean(process.env.GITHUB_TOKEN), 'GITHUB_TOKEN não fornecido ao passo de publicação.')
    requireCondition(git(['branch', '--show-current']).text.trim() === 'main', 'A branch ativa deve ser main.')
    const remote = git(['remote', 'get-url', 'origin']).text.trim()
    requireCondition([`https://github.com/${repository}`, `https://github.com/${repository}.git`].includes(remote), 'origin não corresponde ao repositório autorizado.')
}

async function api(endpoint, method = 'GET') {
    let response
    try {
        response = await fetch(`https://api.github.com/repos/${repository}${endpoint}`, {
            method,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2026-03-10',
                'User-Agent': 'Evelin-catalogo-semanal'
            },
            signal: AbortSignal.timeout(30000),
            redirect: 'error'
        })
    } catch {
        throw new Error(`Falha de conexão ao consultar GitHub ${endpoint}.`)
    }
    requireCondition(response.status === (method === 'POST' ? 201 : 200), `GitHub ${endpoint} respondeu HTTP ${response.status}; confira as permissões da automação.`)
    try { return await response.json() } catch { throw new Error('Resposta inválida da API do GitHub.') }
}

export function assertPagesConfiguration(pages, repo) {
    requireCondition(repo.default_branch === 'main', 'A branch padrão mudou; revisão necessária antes da publicação automática.')
    requireCondition(pages.build_type === 'legacy' && pages.source?.branch === 'main' && pages.source?.path === '/', 'A origem de publicação do Pages mudou; a automação não altera essa configuração.')
    requireCondition(pages.cname === domain && pages.https_enforced === true, 'Domínio ou HTTPS do Pages precisam de revisão; a automação não os altera.')
}

async function checkPages() {
    const [pages, repo] = await Promise.all([api('/pages'), api('')])
    assertPagesConfiguration(pages, repo)
}

function remoteHead() {
    const response = git(['ls-remote', '--exit-code', 'origin', 'refs/heads/main'], {authenticated: true}).text.trim()
    const match = /^([0-9a-f]{40})\s+refs\/heads\/main$/.exec(response)
    requireCondition(match, 'Não foi possível confirmar origin/main.')
    return match[1]
}

async function summary(text) {
    if(process.env.GITHUB_STEP_SUMMARY) await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, text + '\n', 'utf8')
}

function slug(product, all) {
    const base = value => value.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const value = base(product), index = all.filter(other => base(other) === value).indexOf(product)
    return index > 0 ? value + '-' + (index + 1) : value
}

export function publicationPlan({beforeSource, afterSource, history, changedPaths, trackedPaths}) {
    const before = readProducts(beforeSource), after = readProducts(afterSource)
    const idsBefore = before.map(p => productId(p, before)), idsAfter = after.map(p => productId(p, after))
    requireCondition(new Set(idsAfter).size === after.length && after.length > before.length, 'O commit automático exige produtos novos sem colisão de identidade.')
    const records = new Map(history.products?.map(p => [p.id, p]))
    requireCondition(history.schemaVersion === 1 && records.size === after.length, 'Histórico não corresponde ao catálogo preparado.')
    requireCondition(idsAfter.every(id => records.has(id)), 'Produto sem registro no histórico.')
    const current = new Map(after.map((p, index) => [idsAfter[index], p]))
    const previous = new Set(idsBefore)
    for(const [index, old] of before.entries()){
        const product = current.get(idsBefore[index])
        requireCondition(product, 'Produto antigo removido ou com identidade alterada.')
        const protectedFields = object => Object.fromEntries(Object.entries(object).filter(([key]) => !permittedOldChanges.has(key)))
        requireCondition(JSON.stringify(protectedFields(old)) === JSON.stringify(protectedFields(product)), 'Um campo protegido de produto antigo foi alterado.')
        requireCondition(slug(old, before) === slug(product, after), 'Deep link existente foi alterado.')
    }
    const literal = /let produtos\s*=\s*\[[\s\S]*?^\]/m
    const outsideProducts = value => value.replace(literal, '__PRODUTOS__').replace(/\r\n/g, '\n')
    requireCondition(outsideProducts(beforeSource) === outsideProducts(afterSource), 'Código fora do array produtos foi alterado.')
    requireCondition(!/\b(?:precoBase|precoFornecedor|supplierPrice|custoFornecedor)\b/.test(afterSource), 'Dado interno de preço encontrado no código público.')
    const newProducts = after.filter(p => !previous.has(productId(p, after)))
    const newImages = newProducts.map(p => p.imagem)
    const existingImages = new Set(before.map(p => p.imagem))
    requireCondition(new Set(newImages).size === newImages.length, 'Produtos novos compartilham uma imagem final sem revisão.')
    for(const product of newProducts){
        requireCondition(product.disponivel === true && product.entregaRapida === false && product.novidade === true && product.blackFriday === false, 'Estado inválido em produto novo.')
        requireCondition(imagePattern.test(product.imagem) && !product.imagem.includes('-original.') && !existingImages.has(product.imagem) && !trackedPaths.includes(product.imagem), 'Imagem nova possui caminho inseguro ou sobrescreve arquivo existente.')
    }
    const allowed = ['script.js', historyPath, ...newImages].sort()
    const changed = [...new Set(changedPaths)].sort()
    requireCondition(JSON.stringify(changed) === JSON.stringify(allowed), 'A atualização contém arquivos fora da lista autorizada ou está incompleta.')
    return {files: allowed, newProducts, imageRecords: newProducts.map(p => ({path: p.imagem, sha256: records.get(productId(p, after))?.evidence?.imageSha256}))}
}

async function preflight() {
    assertActionsContext()
    requireCondition(git(['status', '--porcelain']).text.trim() === '', 'A execução deve começar com árvore de trabalho limpa.')
    const base = git(['rev-parse', 'HEAD']).text.trim()
    requireCondition(base === remoteHead(), 'main mudou; reinicie a execução sem rebase ou force.')
    await checkPages()
    if(process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `base_sha=${base}\n`, 'utf8')
    await summary('### Publicação preparada\nBranch main e configuração existente do GitHub Pages conferidas. Nenhuma configuração, credencial ou arquivo público foi alterado nesta conferência.')
}

async function publish() {
    assertActionsContext()
    requireCondition(process.env.CATALOG_PUBLISH_ALLOWED === 'true', 'Falta a autorização explícita do passo de publicação.')
    const base = process.env.CATALOG_BASE_SHA
    requireCondition(/^[0-9a-f]{40}$/.test(base || '') && git(['rev-parse', 'HEAD']).text.trim() === base && remoteHead() === base, 'O estado de main mudou durante a atualização; nada será enviado.')
    requireCondition(git(['diff', '--cached', '--name-only']).text.trim() === '', 'Stage inesperado antes da publicação.')
    await checkPages()
    const beforeSource = git(['show', 'HEAD:script.js']).text
    const afterSource = await fs.readFile(path.join(root, 'script.js'), 'utf8')
    const history = JSON.parse(await fs.readFile(path.join(root, historyPath), 'utf8'))
    const changedPaths = [...list(git(['diff', '--name-only', '--no-renames', '-z']).text), ...list(git(['ls-files', '--others', '--exclude-standard', '-z']).text)]
    const trackedPaths = list(git(['ls-files', '-z']).text)
    const plan = publicationPlan({beforeSource, afterSource, history, changedPaths, trackedPaths})
    const canonicalRoot = await fs.realpath(root)
    for(const relative of plan.files){
        const file = path.join(root, relative), stat = await fs.lstat(file)
        requireCondition(stat.isFile() && !stat.isSymbolicLink() && stat.size > 0 && path.relative(canonicalRoot, await fs.realpath(file)).split(path.sep).join('/') === relative, 'Arquivo preparado ausente, vazio ou fora do projeto.')
    }
    for(const image of plan.imageRecords){
        const file = path.join(root, image.path)
        requireCondition(createHash('sha256').update(await fs.readFile(file)).digest('hex') === image.sha256, 'A integridade da imagem preparada não confere com o histórico.')
    }
    git(['diff', '--check'])
    git(['add', '--', ...plan.files])
    const staged = list(git(['diff', '--cached', '--name-only', '-z']).text).sort()
    requireCondition(JSON.stringify(staged) === JSON.stringify(plan.files), 'Stage fora do plano validado.')
    git(['diff', '--cached', '--check'])
    requireCondition(remoteHead() === base, 'main mudou antes do commit; execução interrompida sem envio.')
    git(['config', '--local', 'user.name', 'github-actions[bot]'])
    git(['config', '--local', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com'])
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(new Date()).map(p => [p.type, p.value]))
    const date = `${parts.year}-${parts.month}-${parts.day}`
    git(['commit', '-m', `chore: atualiza catálogo semanal ${date}`])
    const commit = git(['rev-parse', 'HEAD']).text.trim()
    requireCondition(remoteHead() === base, 'main mudou após o commit local; ele não será enviado. Reinicie sem force.')
    const push = git(['push', 'origin', 'HEAD:refs/heads/main'], {authenticated: true, optional: true})
    requireCondition(push.ok || remoteHead() === commit, 'Push não confirmado; confira origin/main. Não houve force nem reescrita do histórico.')
    await summary(`### Commit enviado\nCommit: \`${commit}\` em origin/main. Arquivos: ${plan.files.length}. Produtos novos: ${plan.newProducts.length}.`)
    try {
        await api('/pages/builds', 'POST')
        await summary('Build solicitado ao GitHub Pages já configurado, sem alterar domínio, DNS, HTTPS, CNAME ou origem da publicação. O resultado do deploy pode ser acompanhado no workflow existente de Pages.')
    } catch(error) {
        await summary(`### Publicação do Pages precisa de revisão\nO commit \`${commit}\` já foi enviado com dados validados, mas o GitHub não confirmou a solicitação de build. Não foi feito rollback ou outro commit. Confira a permissão pages:write e solicite novamente o build existente.`)
        throw error
    }
    if(process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `commit=${commit}\n`, 'utf8')
}

async function main() {
    requireCondition(process.argv.length === 3 && ['--preflight', '--publish'].includes(process.argv[2]), 'Use --preflight ou --publish; nenhum comando publica fora do GitHub Actions.')
    if(process.argv[2] === '--preflight') await preflight()
    else await publish()
}

if(process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)){
    main().catch(async error => {
        console.error(error.message)
        await summary('### Falha na preparação/publicação\n' + error.message).catch(() => {})
        process.exitCode = 1
    })
}
