import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pasta = path.join(raiz,'verificacao/expansao-completa');
const analise = JSON.parse(fs.readFileSync(path.join(pasta,'analise.json'),'utf8'));
const fontes = JSON.parse(fs.readFileSync(path.join(pasta,'imagens-baixadas.json'),'utf8'));
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

// Retângulos avaliados nos painéis: somente recorte, nunca escala ou retoque.
const ajustes = {
    'Blusa Kelly':[.06,.02,.88,.52],
    'Saia Kelly':[.18,.35,.66,.60],
    'Blusa Bruna':[.05,0,.90,.65],
    'Blusa Melissa':[.05,0,.90,.61],
    'Blusa Lavinia':[.03,0,.94,.77],
    'Saia Marjorie':[.08,.32,.85,.65],
    'Saia Gabriele':[.08,.30,.86,.67],
    'Saia Nathalia':[0,0,1,1],
    'Saia Nataly':[0,0,1,1],
    'Vestido Anne':[0,0,.92,1],
    'Blusa Elisa':[0,0,1,1],
    'Blusa Marléia':[0,0,1,1],
    'Blusa Sol':[0,0,1,1],
    'Blusa Isa':[0,0,1,1],
    'Blusa Otília':[0,0,1,1],
    'Blusa Ludmila':[0,0,1,1],
    'Blusa Nayane':[0,0,1,1],
    'Blusa Lucy':[0,0,1,1],
    'Blusa Paula':[0,0,1,1],
    'T-Shirt Sara':[0,0,1,1]
};
const revisados = new Set(JSON.parse(fs.readFileSync(path.join(pasta,'revisao-visual.json'),'utf8')).aprovados);
const plano = [];
for(const produto of analise.seguros) {
    if(!revisados.has(produto.indice)) throw new Error('Imagem ainda sem revisão visual: '+produto.indice);
    const fonte = fontes.find(f=>f.indice===produto.indice);
    if(!fonte) throw new Error('Download ausente: '+produto.nome);
    let recorte = ajustes[produto.nome];
    if(!recorte && ['Blusas','Camisas'].includes(produto.categoria)) recorte = [.04,0,.92,.64];
    if(!recorte && produto.tipo === 'T-Shirt') recorte = [.04,0,.92,.64];
    if(!recorte && produto.categoria === 'Saias' && produto.compartilhada) recorte = [.06,.30,.88,.68];
    const cortar = recorte && recorte.some((v,i)=>v!==[0,0,1,1][i]);
    const imagem = 'assets/imagens/produtos/'+slug(produto.nome)+(cortar?'.png':path.extname(fonte.arquivo));
    if(fs.existsSync(path.join(raiz,imagem))) throw new Error('Arquivo existente, não sobrescrever: '+imagem);
    plano.push({...produto,imagem,original:fonte.arquivo,recorte:cortar?recorte:null});
}
fs.writeFileSync(path.join(pasta,'plano-imagens.json'),JSON.stringify(plano,null,2));
console.log(plano.length+' produtos preparados, '+plano.filter(p=>p.recorte).length+' recortes');
