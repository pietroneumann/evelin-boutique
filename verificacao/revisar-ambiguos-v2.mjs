import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const pasta=path.dirname(fileURLToPath(import.meta.url));
const raiz=path.dirname(pasta);
const destino=path.join(pasta,'v2-final');
const fonte=JSON.parse(fs.readFileSync(path.join(pasta,'expansao-completa/analise.json'),'utf8'));
const produtos=vm.runInNewContext(fs.readFileSync(path.join(raiz,'script.js'),'utf8').split('function criarCard')[0]+';produtos');
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ');
const nomesPorCodigo=new Map();
for(const grupo of ['existentes','seguros','ambiguos'])for(const caso of fonte[grupo]){
    const ocorrencias=Array.isArray(caso.ocorrencias)&&typeof caso.ocorrencias[0]==='object'?caso.ocorrencias:[caso];
    for(const o of ocorrencias)if(o.codigo){if(!nomesPorCodigo.has(o.codigo))nomesPorCodigo.set(o.codigo,new Set());nomesPorCodigo.get(o.codigo).add(norm(o.nome));}
}
const registros=fonte.ambiguos.map(caso=>{
    const codigos=[...new Set(caso.ocorrencias.map(o=>o.codigo).filter(Boolean))];
    const semCodigo=caso.ocorrencias.some(o=>!o.codigo);
    const relacionados=produtos.filter(p=>norm(p.nome)===norm(caso.nome)||p.codigoFornecedor&&codigos.includes(p.codigoFornecedor));
    const conflitos=caso.motivos.some(m=>/códigos diferentes|modelos diferentes|tecido|Nome misturado/i.test(m));
    const referenciaUnica=codigos.length===1&&!semCodigo&&nomesPorCodigo.get(codigos[0])?.size===1;
    let grupo='B',conclusao='Identidade não demonstrada sem dúvida relevante; manter revisão humana e não unir grades.';
    if(referenciaUnica&&!conflitos){
        if(relacionados.length===1&&relacionados[0].codigoFornecedor===codigos[0]&&norm(relacionados[0].nome)===norm(caso.nome)){
            grupo='C';conclusao='Referência e nome coincidem com produto cadastrado; descartar como novo sem alterar sua grade.';
        }else if(relacionados.length===0&&!caso.motivos.some(m=>/Grafia próxima|complemento Plus/i.test(m))){
            grupo='A';conclusao='Identidade/referência consistente nos registros locais. A grade ou sua disponibilidade permanece pendente; não importar.';
        }
    }
    if(caso.nome==='Saia Rosane'&&referenciaUnica&&codigos[0]==='00436'&&produtos.some(p=>p.nome==='Saia Rosane Plus Size'&&p.codigoFornecedor==='00840')){
        grupo='A';conclusao='Referência 00436 distingue da Saia Rosane Plus Size 00840. Não importar nesta etapa.';
    }
    return {nome:caso.nome,grupo,codigos,semCodigo,produtosRelacionados:relacionados.map(p=>({nome:p.nome,codigoFornecedor:p.codigoFornecedor})),motivos:caso.motivos,conclusao,blocos:caso.ocorrencias.map(o=>o.indice),grades:caso.ocorrencias.map(o=>o.tamanhos)};
});
const resumo=Object.fromEntries(['A','B','C'].map(g=>[g,registros.filter(r=>r.grupo===g).length]));
fs.writeFileSync(path.join(destino,'ambiguos.json'),JSON.stringify({fonte:'verificacao/expansao-completa/analise.json',dataFonte:fonte.consultadoEm,metodo:'Revisão conservadora local. A resolve identidade, não grade/disponibilidade atual. Referência única deve estar em todas as ocorrências e não estar associada a outro nome nos registros. Nenhum dado de produto foi alterado.',resumo,registros},null,2));
let md='# Revisão dos 104 candidatos\n\nFonte: inventário local de '+fonte.consultadoEm+'. Não houve nova consulta ao fornecedor; disponibilidade e grades atuais não são afirmadas. Nenhum candidato importado.\n\nA: '+resumo.A+' identidades resolvidas; B: '+resumo.B+' ainda ambíguos; C: '+resumo.C+' descartados. A não significa dados suficientes para importar: grades conflitantes continuam pendentes. Não descartar só por grafia.\n';
for(const g of ['A','B','C']){
    md+='\n## '+g+' — '+({A:'Resolvidos quanto à identidade',B:'Ainda ambíguos',C:'Descartados como novos'}[g])+'\n\n';
    const lista=registros.filter(r=>r.grupo===g);
    if(!lista.length)md+='Nenhum caso demonstrado com segurança.\n';
    else md+='| Nome | Códigos | Blocos | Motivo / conclusão |\n| --- | --- | --- | --- |\n'+lista.map(r=>'| '+r.nome+' | '+(r.codigos.join(', ')||'null')+' | '+r.blocos.join(', ')+' | '+r.motivos.join('; ')+'. '+r.conclusao+' |').join('\n')+'\n';
}
fs.writeFileSync(path.join(destino,'ambiguos.md'),md);
console.log(resumo);
