import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const pasta = path.dirname(fileURLToPath(import.meta.url));
const destino = path.join(pasta, 'v2-filtro-tamanho');
fs.mkdirSync(destino, {recursive:true});

async function testarFiltro({avaliar, cdp, esperar, captura, relatorio}) {
    const preferencias = await avaliar('JSON.stringify([localStorage.getItem("evelinFavoritos"),localStorage.getItem("evelinSacola")])');
    const mudar = tamanho => avaliar(`campoTamanho.value=${JSON.stringify(tamanho)};campoTamanho.dispatchEvent(new Event('change'))`);
    const nomes = () => avaliar('[...document.querySelectorAll("#produtos-catalogo h3")].map(e=>e.textContent)');
    const esperados = (tamanho,categoria='',busca='') => avaliar(`produtos.filter(p=>(!${JSON.stringify(categoria)}||p.categoria===${JSON.stringify(categoria)})&&(${JSON.stringify(tamanho)}==='consultar'?p.tamanhos===null:!${JSON.stringify(tamanho)}||p.tamanhos?.includes(${JSON.stringify(tamanho)}))&&normalizarTexto(p.nome+' '+p.categoria).split(/\\s+/).some(palavra=>palavra.startsWith(${JSON.stringify(busca)}))).map(p=>p.nome)`);
    const conferir = async lista => {
        assert.deepEqual(await nomes(),lista.slice(0,24));
        assert.equal(await avaliar('document.querySelector("#quantidade-produtos").textContent'),lista.length+' '+(lista.length===1?'produto encontrado':'produtos encontrados'));
        assert.equal(await avaliar('document.querySelector("#quantidade-exibida").textContent'),Math.min(24,lista.length)+' '+(Math.min(24,lista.length)===1?'produto exibido':'produtos exibidos'));
        assert.equal(await avaliar('document.querySelector("#ver-mais-produtos").hidden'),lista.length<=24);
    };
    const opcoes = await avaliar('[...campoTamanho.options].map(o=>({valor:o.value,texto:o.textContent}))');
    assert.deepEqual(opcoes.map(o=>o.valor),['','PP','P','M','G','GG','EXG','48','50','52','54','consultar']);
    assert.equal(opcoes[0].texto,'Todos os tamanhos');
    assert.equal(opcoes.at(-1).texto,'Consultar tamanho');
    assert.deepEqual(await avaliar('tamanhosDisponiveis.slice().sort()'),await avaliar('[...new Set(produtos.flatMap(p=>p.tamanhos||[]))].sort()'));
    await avaliar('mostrarTodos()');
    for(const tamanho of opcoes.map(o=>o.valor)) {
        await mudar(tamanho);await conferir(await esperados(tamanho));
    }
    assert.equal(await avaliar('selecionarProdutos(undefined,"",false,"consultar").length'),0);
    assert.ok(await avaliar(`(()=>{const executar=new Function('produtos','normalizarTexto','return ('+selecionarProdutos.toString()+')(undefined,"",false,"consultar")');const fixture={...produtos[0],tamanhos:null};const encontrados=executar([fixture,produtos[1]],normalizarTexto);return encontrados.length===1&&encontrados[0]===fixture})()`));
    for(const categoria of ['Vestidos','Blusas','Saias','Conjuntos','Camisas','Blazers','Outros']) {
        await avaliar(`mostrarTodos();clicar(${JSON.stringify(categoria)})`);
        await mudar('M');await conferir(await esperados('M',categoria));
    }
    await avaliar('mostrarTodos()');await mudar('M');
    await avaliar('campoBusca.value="MAR";campoBusca.dispatchEvent(new Event("input"))');
    await conferir(await esperados('M','','mar'));
    await avaliar('clicar("Vestidos")');
    await conferir(await esperados('M','Vestidos','mar'));
    assert.equal(await avaliar('tamanhoAtual'),'M');
    for(const ordem of ['az','za']){
        await avaliar(`campoOrdem.value=${JSON.stringify(ordem)};campoOrdem.dispatchEvent(new Event('change'))`);
        const lista=await esperados('M','Vestidos','mar');lista.sort((a,b)=>a.localeCompare(b,'pt-BR'));if(ordem==='za')lista.reverse();
        await conferir(lista);
    }
    await avaliar('mostrarTodos()');await mudar('P');
    const listaP=await esperados('P');assert.ok(listaP.length>24);await conferir(listaP);
    await avaliar('globalThis.cardAntesTamanho=document.querySelector("#produtos-catalogo .produto");document.querySelector("#ver-mais-produtos").click()');
    assert.deepEqual(await nomes(),listaP.slice(0,48));
    assert.ok(await avaliar('cardAntesTamanho===document.querySelector("#produtos-catalogo .produto")'));
    await mudar('GG');await conferir(await esperados('GG'));
    assert.equal(await avaliar('limiteVisivel'),24);
    for(const ordem of ['az','za']){
        await avaliar(`campoOrdem.value=${JSON.stringify(ordem)};campoOrdem.dispatchEvent(new Event('change'))`);
        const lista=await esperados('GG');lista.sort((a,b)=>a.localeCompare(b,'pt-BR'));if(ordem==='za')lista.reverse();await conferir(lista);
        await avaliar('document.querySelector("#ver-mais-produtos").click()');assert.deepEqual(await nomes(),lista.slice(0,48));
    }
    await avaliar('document.querySelector("#limpar-filtros").click()');
    assert.ok(await avaliar('tamanhoAtual===""&&campoTamanho.value===""&&categoriaAtual===undefined&&textoBuscaAtual===""&&ordemAtual==="original"'));
    await conferir(await esperados(''));
    await mudar('M');
    const catalogoAntes=await nomes();
    await avaliar('document.querySelector("#abrir-favoritos").click()');
    assert.equal(await avaliar('document.querySelectorAll("#conteudo-escolhas .produto").length'),await avaliar('favoritos.size'));
    await avaliar('document.querySelector("#fechar-escolhas").click();abrirCatalogo(false)');
    assert.equal(await avaliar('tamanhoAtual'),'M');assert.deepEqual(await nomes(),catalogoAntes);
    assert.equal(await avaliar('JSON.stringify([localStorage.getItem("evelinFavoritos"),localStorage.getItem("evelinSacola")])'),preferencias);
    assert.equal(await avaliar('document.querySelectorAll("#produtos-novidades .produto").length'),9);
    assert.ok(await avaliar('document.querySelector("label[for=filtro-tamanho]")!==null'));
    for(const [largura,altura]of [[1440,1000],[768,1024],[390,844]]){
        await cdp('Emulation.setDeviceMetricsOverride',{width:largura,height:altura,deviceScaleFactor:1,mobile:largura===390});
        await avaliar('mostrarTodos();campoTamanho.value="M";campoTamanho.dispatchEvent(new Event("change"));campoTamanho.focus()');
        await esperar(80);
        const medidas=await avaliar(`(()=>{const r=campoTamanho.getBoundingClientRect();return {viewport:innerWidth,larguraDocumento:document.documentElement.scrollWidth,larguraFiltro:r.width,alturaFiltro:r.height,label:campoTamanho.labels.length,foco:getComputedStyle(campoTamanho).outlineStyle}})()`);
        assert.ok(medidas.larguraDocumento<=medidas.viewport);assert.ok(medidas.larguraFiltro>=100&&medidas.alturaFiltro>=40);assert.equal(medidas.label,1);assert.notEqual(medidas.foco,'none');
        await captura('tamanho-'+largura,'#catalogo');
    }
    relatorio.filtroTamanho={opcoes:opcoes.map(o=>o.texto),combinacoes:true,paginacao:true,consultarAtual:0,favoritosPreservados:true,storagePreservado:true};
    relatorio.testes.push('Tamanho: todas as opções reais e Consultar; combinações com categoria/busca/A–Z/Z–A; 24/48, reset, limpar, contador e estado vazio.');
    relatorio.testes.push('Filtro não altera a home, favoritos, sacola ou localStorage; tamanho null testado em fixture isolada; select rotulado com foco visível em 1440/768/390.');
}

const arquivoEscolhas=fs.readFileSync(path.join(pasta,'testar-favoritos-sacola.mjs'),'utf8');
const inicioEscolhas=arquivoEscolhas.indexOf('async function testarEscolhas(');
const fimEscolhas=arquivoEscolhas.indexOf('\nlet fonte=',inicioEscolhas);
const casosEscolhas=arquivoEscolhas.slice(inicioEscolhas,fimEscolhas);
let fonte=fs.readFileSync(path.join(pasta,'testar-site.mjs'),'utf8');
fonte=fonte.replace('const pastaVerificacao = path.dirname(fileURLToPath(import.meta.url));','const pastaVerificacao = '+JSON.stringify(pasta)+';');
fonte=fonte.replace("await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Log.enable');","await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Log.enable'); await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});");
fonte=fonte.replace('    assert.deepEqual(erros, []);',()=> '    await ('+casosEscolhas+')({avaliar,cdp,esperar,captura,relatorio});\n    await ('+testarFiltro.toString()+')({avaliar,cdp,esperar,captura,relatorio});\n    assert.deepEqual(erros, []);');
fonte=fonte.replaceAll('fs.writeFileSync(', 'gravarEvidencia(');
fonte+='\nfunction gravarEvidencia(arquivo,dados){const nome=path.basename(arquivo);if(nome.startsWith("tamanho-")||nome==="resultados.json")fs.writeFileSync(path.join('+JSON.stringify(destino)+',nome),dados);}';
try {
    await import('data:text/javascript;base64,'+Buffer.from(fonte).toString('base64'));
} catch(erro) {
    console.error(String(erro.stack||erro).replace(/data:text\/javascript;base64,[A-Za-z0-9+/=]+/g,'teste-composto'));
    process.exitCode=1;
}