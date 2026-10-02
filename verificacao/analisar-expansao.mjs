import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const pasta = path.join(path.dirname(fileURLToPath(import.meta.url)), 'expansao-completa');
const catalogo = JSON.parse(fs.readFileSync(path.join(pasta, 'catalogo-atual.json'), 'utf8'));
const inicial = JSON.parse(fs.readFileSync(path.join(pasta, 'estado-inicial.json'), 'utf8'));
const normalizar = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
const tipo = /^(Vestido|Blusa|Saia|Conjunto|Camisa|Blazer|Body|Chemise|T-Shirt|Sobretudo|Jardineira|Salopete|Tubinho|Trijunto|Casaquinho)\s+((?:com [Bb]lusa )?[A-ZÀ-Ý].*)$/u;
const ocorrencias = [];
for (const bloco of catalogo.blocos) {
    const titulos = [];
    bloco.textos.forEach((texto, i) => {
        if (tipo.test(texto) && (i === 0 || /\([^)]*\)|Disponível/.test(bloco.textos.slice(i, i + 3).join(' ')))) titulos.push(i);
    });
    for (let t = 0; t < titulos.length; t++) {
        const inicio = titulos[t];
        const linhas = bloco.textos.slice(inicio, titulos[t + 1] ?? bloco.textos.length);
        const nome = linhas[0].split(/\s*\(|\s+R\$|\s+C[oó]d:/)[0].trim().replace(/\s+Manga curta$/, '');
        const texto = linhas.join(' | ');
        const grade = texto.match(/\(([^)]+)\)/)?.[1];
        const tamanhos = grade && /^(?:PP|P|M|G|GG|EXG|\d{2})(?:[\s,|I.]+(?:PP|P|M|G|GG|EXG|\d{2}))*[\s,]*$/.test(grade.trim())
            ? [...new Set(grade.trim().split(/[\s,|I.]+/).filter(Boolean))] : null;
        const codigo = texto.match(/C[oó]d\s*:\s*(\d{3,})/i)?.[1] ?? null;
        const precoFornecedor = texto.match(/(?:R\$\s*:?)?\s*(\d{2,3},\d{2})/)?.[1] ?? null;
        const tipoProduto = nome.match(tipo)?.[1];
        const categorias = {Vestido:'Vestidos', Blusa:'Blusas', Saia:'Saias', Conjunto:'Conjuntos', Camisa:'Camisas', Blazer:'Blazers'};
        const cores = texto.match(/\bna cor\s+([^,|]+)/i)?.[1]?.trim();
        ocorrencias.push({nome, codigo, categoria:categorias[tipoProduto] || 'Outros', tamanhos, cores:cores ? [cores] : null,
            precoFornecedor, indice:bloco.indice, imagemFonte:bloco.imagem, compartilhada:titulos.length > 1,
            textos:linhas, tipo:tipoProduto, pecas: titulos.length});
    }
}
const grupos = new Map();
for (const o of ocorrencias) {
    const chave = normalizar(o.nome);
    if (!grupos.has(chave)) grupos.set(chave, []);
    grupos.get(chave).push(o);
}
function distancia(a, b) {
    let linha = [...Array(b.length + 1).keys()];
    for (let i = 1; i <= a.length; i++) {
        const proxima = [i];
        for (let j = 1; j <= b.length; j++) proxima[j] = Math.min(proxima[j-1]+1, linha[j]+1, linha[j-1]+(a[i-1]===b[j-1]?0:1));
        linha = proxima;
    }
    return linha[b.length];
}
const existentes = [], ambiguos = [], seguros = [];
for (const [chave, grupo] of grupos) {
    const primeiro = grupo[0];
    const existente = inicial.produtos.find(p => normalizar(p.nome) === chave);
    if (existente) { existentes.push({nome:primeiro.nome, ocorrencias:grupo}); continue; }
    const motivos = [];
    const baseSemPlus = chave.replace(/\s+plus(?: size)?$/, '');
    if (inicial.produtos.some(p => normalizar(p.nome).replace(/\s+plus(?: size)?$/, '') === baseSemPlus)) motivos.push('Nome corresponde a produto atual com diferença apenas do complemento Plus/Plus Size');
    if (grupo.some(o => !o.tamanhos)) motivos.push('Grade ausente, incompleta ou ilegível');
    if (new Set(grupo.map(o => JSON.stringify(o.tamanhos))).size > 1) motivos.push('Grades conflitantes no mesmo nome');
    if (new Set(grupo.map(o => o.codigo).filter(Boolean)).size > 1) motivos.push('Mesmo nome com códigos diferentes');
    if (new Set(grupo.map(o => o.precoFornecedor).filter(Boolean)).size > 1) motivos.push('Mesmo nome com preços ou modelos diferentes');
    const tecidos = grupo.map(o => o.textos.filter(s => /^Tecido/i.test(s)).map(normalizar).join(' / ')).filter(Boolean);
    if (new Set(tecidos).size > 1) motivos.push('Descrições de tecido diferentes');
    const parecido = [...grupos.keys(), ...inicial.produtos.map(p => normalizar(p.nome))].find(outro => {
        if (outro === chave || outro.split(' ')[0] !== chave.split(' ')[0]) return false;
        const a = chave.slice(chave.indexOf(' ') + 1), b = outro.slice(outro.indexOf(' ') + 1);
        if (Math.min(a.length,b.length) < 4) return false;
        const codigoOutro = grupos.get(outro)?.find(o=>o.codigo)?.codigo;
        if (primeiro.codigo && codigoOutro && primeiro.codigo !== codigoOutro) return false;
        return distancia(a,b) <= 1 || [a,b].sort().join('/') === 'regiane/rejane';
    });
    if (parecido) motivos.push('Grafia próxima de ' + parecido + '; identidade requer confirmação');
    if (/\b(?:Manga|Sem|Com|Plus Sem)\b/.test(primeiro.nome)) motivos.push('Nome misturado à descrição');
    if (motivos.length) ambiguos.push({nome:primeiro.nome, motivos, ocorrencias:grupo});
    else {
        const preferido = [...grupo].sort((a,b) => a.pecas - b.pecas)[0];
        seguros.push({...preferido, codigo:grupo.find(o=>o.codigo)?.codigo ?? null, ocorrencias:grupo.map(o=>o.indice)});
    }
}
const resultado = {fonte:catalogo.fonte, consultadoEm:catalogo.consultadoEm, totalOcorrencias:ocorrencias.length,
    totalNomes:grupos.size, existentes, seguros, ambiguos};
fs.writeFileSync(path.join(pasta,'analise.json'),JSON.stringify(resultado,null,2));
console.log(JSON.stringify({ocorrencias:ocorrencias.length,nomes:grupos.size,existentes:existentes.length,seguros:seguros.length,ambiguos:ambiguos.length}));
console.log(seguros.map(p=>`${p.indice}: ${p.nome} | ${p.codigo} | ${p.tamanhos.join(',')} | ${p.compartilhada?'compartilhada':'exclusiva'}`).join('\n'));
