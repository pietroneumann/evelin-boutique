import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {executeUpdate} from './catalogo/atualizador.mjs'
import {diagnoseCatalog} from './catalogo/diagnostico.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const escape = value => String(value).replace(/[<>\[\]`*_|\\]/g, char => '\\' + char).replace(/[\r\n]/g, ' ')

async function summary(report) {
    if(!process.env.GITHUB_STEP_SUMMARY) return
    const lines = ['## Atualização do catálogo', '', report.mensagem || 'Validações concluídas.', '',
        `- Data: ${escape(report.data || new Date().toISOString())}`,
        `- Quantidade anterior: ${report.anterior}; novos: ${report.novos || 0}; final: ${report.total}.`,
        `- Novidades: ${report.novidades}; Black Friday: ${report.blackFriday}; Entrega rápida: ${report.entregaRapida}.`,
        `- Preços confirmados: ${report.precosConfirmados}; Consultar preço: ${report.consultarPreco}.`,
        `- Lote criado: ${escape(report.lote || 'Nenhum')}.`,
        `- Dois lotes recentes: ${(report.lotesNovidades || []).map(b => escape(b.nome)).join('; ')}.`,
        `- Fronteira identificada: ${report.fronteiraIdentificada === true ? 'sim' : 'não'}.`,
        `- Ambiguidades históricas ignoradas para detecção de lançamento: ${report.ambiguidadesHistoricas ?? 'não calculadas sem fronteira segura'}.`,
        `- Candidatos antes da fronteira: ${report.candidatosAntesFronteira ?? 'indeterminado'}.`,
        `- Candidatos novos confirmados: ${report.candidatosNovosConfirmados || 0}; ambíguos: ${report.candidatosNovosAmbiguos ?? 'indeterminado'}.`,
        `- Commit: ${report.changed && !report.dryRun ? 'aguardando a etapa de publicação' : 'nenhum; nenhuma mudança enviada'}.`,
        '', '### Produtos novos', ...(report.nomes?.length ? report.nomes.map(n => '- ' + escape(n)) : ['Nenhum.']),
        '', '### Imagens finais', ...(report.imagens?.length ? report.imagens.map(n => '- ' + escape(n)) : ['Nenhuma.']),
        '', '### Validações', ...(report.testes || []).map(n => '- ' + escape(n)),
        '', '### Revisão necessária', ...(report.revisoes?.length ? ['Há candidatos não importados. A ausência de adições não significa ausência de pendências.', ...report.revisoes.map(r => '- ' + escape(r.nome) + ': ' + escape(r.motivo))] : ['Nenhuma.']), '']
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, lines.join('\n'))
}

async function main() {
    const flags = process.argv.slice(2)
    if(flags.some(f => !['--dry-run', '--validate-only', '--diagnostico-fronteira'].includes(f)) || flags.length > 1) throw new Error('Use --dry-run, --validate-only, --diagnostico-fronteira ou nenhum argumento.')
    if(flags.includes('--diagnostico-fronteira')){
        const {report,reportPath}=await diagnoseCatalog({root})
        const output={modo:report.modo,...report.counts,fronteiraAceita:report.frontier?.accepted??false,confianca:report.frontier?.confidence??report.frontier?.bestAttempt?.confidence??null,ocorrenciasAnteriores:report.ocorrenciasAnteriores??null,nomesDistintos:report.nomesDistintos??null,visiveis:report.visiveis??null,ocultosNoPrefixo:report.ocultosNoPrefixo??null,leiturasEstaveis:report.leituras?.estaveis??false,novoLoteDefinitivo:false,seguroAtivar:false,relatorio:path.relative(root,reportPath),erro:report.erro||null,conclusao:report.conclusao||null}
        if(process.env.GITHUB_OUTPUT)await fs.appendFile(process.env.GITHUB_OUTPUT,'changed=false\n')
        if(process.env.GITHUB_STEP_SUMMARY)await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,'\n## Diagnóstico sem cadastro\n\nNenhum lote ou produto é cadastrado por este modo. O relatório detalhado permanece apenas na pasta local ignorada.\n')
        console.log(JSON.stringify(output,null,2))
        process.exitCode=report.erro||!report.frontier?.accepted?1:0
        return
    }
    const report = await executeUpdate({root, dryRun: flags.includes('--dry-run'), validateOnly: flags.includes('--validate-only')})
    await summary(report)
    if(process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `changed=${report.changed && !report.dryRun}\n`)
    console.log(JSON.stringify(report, null, 2))
}

main().catch(async error => {
    if(error.report){
        await summary(error.report)
        console.log(JSON.stringify(error.report, null, 2))
    }
    if(process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, 'changed=false\n')
    if(process.env.GITHUB_STEP_SUMMARY) await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, '\n## Atualização interrompida\n\nRevisão necessária: ' + escape(error.message) + '\nNenhum commit/push foi autorizado pelo atualizador.\n')
    console.error('Atualização interrompida: ' + error.message)
    process.exitCode = 1
})
