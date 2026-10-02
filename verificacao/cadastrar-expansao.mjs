import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pasta = path.join(raiz,'verificacao/expansao-completa');
const plano = JSON.parse(fs.readFileSync(path.join(pasta,'plano-imagens.json'),'utf8'));
const inicial = JSON.parse(fs.readFileSync(path.join(pasta,'estado-inicial.json'),'utf8'));
const analise = JSON.parse(fs.readFileSync(path.join(pasta,'analise.json'),'utf8'));
const arquivo = path.join(raiz,'script.js');
let fonte = fs.readFileSync(arquivo,'utf8');
const anteriores = JSON.parse(JSON.stringify(vm.runInNewContext(fonte.split('function criarCard')[0]+';produtos')));
for(const produto of inicial.produtos) assert.deepEqual(anteriores.find(p=>p.nome===produto.nome),produto);
const normalizar = s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const selecionados = process.argv.includes('--primeiro') ? plano.slice(0,1) : plano;
const novos = selecionados.filter(p=>!anteriores.some(a=>normalizar(a.nome)===normalizar(p.nome)));
const fimArray = fonte.indexOf(']\n',fonte.indexOf('/* OUTROS */'));
assert.ok(fimArray>0);
for(const categoria of [...new Set(novos.map(p=>p.categoria))].reverse()) {
    const items = novos.filter(p=>p.categoria===categoria);
    const objetos = items.map(p=>{
        assert.ok(fs.existsSync(path.join(raiz,p.imagem)));
        return {nome:p.nome,categoria:p.categoria,preco:null,tamanhos:p.tamanhos,cores:p.cores,novidade:false,imagem:p.imagem};
    });
    const trecho = '\n'+objetos.map(p=>'    {\n'+Object.entries(p).map(([k,v])=>'        '+k+': '+JSON.stringify(v)+',').join('\n')+'\n    },\n').join('\n');
    const dados = JSON.parse(JSON.stringify(vm.runInNewContext(fonte.split('function criarCard')[0]+';produtos')));
    const categorias = [...new Set(dados.map(p=>p.categoria))];
    const proxima = categorias[categorias.indexOf(categoria)+1];
    let ponto;
    if(proxima) {
        const primeiraProxima = fonte.indexOf("categoria: '"+proxima+"'");
        const comentario = fonte.lastIndexOf('/*',primeiraProxima);
        ponto = comentario>=0 ? fonte.lastIndexOf('\n',comentario) : fonte.lastIndexOf('\n    {',primeiraProxima);
    } else ponto = fonte.indexOf(']\n',fonte.indexOf('/* OUTROS */'));
    assert.ok(ponto>0);
    fonte = fonte.slice(0,ponto)+trecho+fonte.slice(ponto);
}
const finais = JSON.parse(JSON.stringify(vm.runInNewContext(fonte.split('function criarCard')[0]+';produtos')));
assert.equal(new Set(finais.map(p=>normalizar(p.nome))).size,finais.length);
assert.equal(finais.length,anteriores.length+novos.length);
for(const produto of inicial.produtos) assert.deepEqual(finais.find(p=>p.nome===produto.nome),produto);
assert.equal(finais.filter(p=>p.novidade).length,9);
fs.writeFileSync(arquivo,fonte);
const importados = plano.filter(p=>finais.some(f=>f.nome===p.nome));
fs.writeFileSync(path.join(pasta,'importacao.json'),JSON.stringify({fonte:analise.fonte,consultadoEm:analise.consultadoEm,
    estadoInicial:inicial,totalFinal:finais.length,importados,ambiguos:analise.ambiguos},null,2));
console.log(JSON.stringify({adicionados:novos.length,total:finais.length,categorias:finais.reduce((a,p)=>(a[p.categoria]=(a[p.categoria]||0)+1,a),{})}));
