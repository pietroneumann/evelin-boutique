import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const pasta = path.dirname(fileURLToPath(import.meta.url));
const destino = path.join(pasta, 'v2-final');
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


async function testarFinal({avaliar,cdp,esperar,captura,relatorio,endereco,esperarPagina}){
    await avaliar('localStorage.clear()');
    await cdp('Page.navigate',{url:endereco});await esperarPagina();
    assert.equal(await avaliar('document.querySelector("#recentes").hidden'),true);
    assert.equal(await avaliar('document.querySelectorAll(".produto").length'),9);
    assert.equal(await avaliar('new Set(produtos.map(slugProduto)).size'),260);
    await avaliar('mostrarTodos();document.querySelector("#produtos-catalogo .abrir-detalhe").focus();document.querySelector("#produtos-catalogo .abrir-detalhe").click()');
    assert.ok(await avaliar('dialogoDetalhe.open&&document.activeElement.id==="fechar-detalhe"'));
    assert.equal(await avaliar('recentes.length'),1);
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await esperar(50);
    assert.ok(await avaliar('!dialogoDetalhe.open&&document.activeElement.matches(".abrir-detalhe")'));
    await avaliar('produtos.slice(0,12).forEach(p=>registrarRecente(identificarProduto(p)));registrarRecente(identificarProduto(produtos[7]))');
    assert.ok(await avaliar('recentes.length===8&&new Set(recentes).size===8&&recentes[0]===identificarProduto(produtos[7])'));
    await avaliar('globalThis.linkRecentes=document.querySelectorAll("#produtos-recentes .botao-whatsapp")[2];globalThis.idWhatsapp=linkRecentes.closest(".produto").dataset.produto;globalThis.linkConectado=false;linkRecentes.addEventListener("click",e=>e.preventDefault(),{once:true});document.addEventListener("click",()=>{linkConectado=linkRecentes.isConnected},{once:true});linkRecentes.click()');
    await esperar(50);
    assert.ok(await avaliar('linkConectado&&recentes[0]===idWhatsapp'));
    const ids=await avaliar('recentes');
    await cdp('Page.reload');await esperarPagina();assert.deepEqual(await avaliar('recentes'),ids);
    await avaliar('document.querySelector("#produtos-recentes .favoritar-produto").click()');
    assert.equal(await avaliar('favoritos.size'),1);
    await avaliar('const card=document.querySelector("#produtos-recentes .produto");card.querySelector(".tamanho-sacola").selectedIndex=1;card.querySelector(".tamanho-sacola").dispatchEvent(new Event("change",{bubbles:true}));card.querySelector(".adicionar-sacola").click()');
    assert.equal(await avaliar('sacola.length'),1);
    // Native share and clipboard are stubbed only in the test browser, never in production.
    await avaliar('globalThis.compartilhamentos=[];Object.defineProperty(navigator,"share",{configurable:true,value:async dados=>compartilhamentos.push(dados)})');
    await avaliar('compartilharProduto(recentes[0])');
    const dados=await avaliar('compartilhamentos[0]');assert.ok(dados.text.includes('Evelin Boutique'));assert.ok(dados.url.includes('?produto='));assert.ok(!JSON.stringify(dados).includes('codigo:'));assert.ok(!JSON.stringify(dados).includes('R$'));
    await avaliar('globalThis.copias=[];Object.defineProperty(navigator,"share",{configurable:true,value:undefined});Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async texto=>copias.push(texto)}})');
    await avaliar('compartilharProduto(recentes[0])');assert.equal(await avaliar('copias.length'),1);
    await avaliar('Object.defineProperty(navigator,"share",{configurable:true,value:async()=>{throw Object.assign(new Error(),{name:"AbortError"})}});compartilharProduto(recentes[0])');assert.equal(await avaliar('copias.length'),1);
    await avaliar('globalThis.copiaManual="";Object.defineProperty(navigator,"share",{configurable:true,value:undefined});Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async()=>{throw new Error("Bloqueado")}}});window.prompt=(titulo,texto)=>{copiaManual=texto}');
    await avaliar('compartilharProduto(recentes[0])');assert.ok(await avaliar('copiaManual.includes("?produto=")'));
    await cdp('Page.navigate',{url:dados.url});await esperarPagina();
    assert.ok(await avaliar('dialogoDetalhe.open&&textoBuscaAtual===document.querySelector("#titulo-detalhe").textContent'));
    assert.ok(await avaliar('document.querySelectorAll("#produtos-catalogo .produto").length<24'));
    await avaliar('document.querySelector("#fechar-detalhe").click()');await esperar(50);
    await cdp('Page.navigate',{url:endereco+'?produto=nao-existe'});await esperarPagina();assert.ok(await avaliar('!dialogoDetalhe.open&&painelCatalogo.hidden'));
    await avaliar('localStorage.setItem("evelinRecentes",JSON.stringify(["invalido",null,identificarProduto(produtos[0]),identificarProduto(produtos[0])]));');
    await cdp('Page.reload');await esperarPagina();assert.equal(await avaliar('recentes.length'),1);
    await avaliar('localStorage.setItem("evelinRecentes","{errado")');await cdp('Page.reload');await esperarPagina();assert.equal(await avaliar('recentes.length'),0);
    await avaliar('produtos.slice(0,9).forEach(p=>registrarRecente(identificarProduto(p)));');
    assert.ok(await avaliar('recentes.length===8&&document.querySelectorAll("#produtos-recentes .produto").length===8&&[...document.querySelectorAll("#produtos-recentes img")].every(i=>i.loading==="lazy")'));
    for(const [width,height]of [[1440,1000],[768,1024],[390,844]]){
        await cdp('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width===390});
        await avaliar('mostrarTodos()');await esperar(80);
        assert.ok(await avaliar('document.documentElement.scrollWidth<=innerWidth'));
        await captura('final-'+width+'-inicio','#inicio');
        await captura('final-'+width+'-catalogo','#catalogo');
        await captura('final-'+width+'-recentes','#recentes');
        await avaliar('document.querySelector("#produtos-recentes .abrir-detalhe").focus();document.querySelector("#produtos-recentes .abrir-detalhe").click()');
        assert.ok(await avaliar('dialogoDetalhe.open&&dialogoDetalhe.getBoundingClientRect().height<innerHeight'));
        assert.ok(await avaliar('[...dialogoDetalhe.querySelectorAll("img")].every(i=>getComputedStyle(i).objectFit==="contain")'));
        for(let i=0;i<12;i++){await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});assert.ok(await avaliar('dialogoDetalhe.contains(document.activeElement)'));}
        await captura('final-'+width+'-detalhe','#dialogo-produto');
        await avaliar('document.querySelector("#fechar-detalhe").click()');await esperar(50);
        assert.ok(await avaliar('document.activeElement.matches(".abrir-detalhe")'));
    }
    await avaliar('globalThis.escritaOriginal=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new Error("Bloqueado")};registrarRecente(identificarProduto(produtos[20]));Storage.prototype.setItem=escritaOriginal');
    assert.ok(await avaliar('recentes[0]===identificarProduto(produtos[20])&&document.querySelector("#status-preferencias").textContent.includes("sessão")'));
    await avaliar('favoritos.add(identificarProduto(produtos[0]));atualizarContadoresEscolhas();document.querySelector("#abrir-favoritos").click();document.querySelector("#conteudo-escolhas .abrir-detalhe").click()');
    assert.ok(await avaliar('dialogoEscolhas.open&&dialogoDetalhe.open'));
    await avaliar('document.querySelector("#conteudo-detalhe .favoritar-produto").click();document.querySelector("#fechar-detalhe").click()');await esperar(50);
    assert.ok(await avaliar('dialogoEscolhas.contains(document.activeElement)'));
    await avaliar('document.querySelector("#fechar-escolhas").click()');await esperar(50);
    await avaliar('localStorage.setItem("evelinRecentes",JSON.stringify([identificarProduto(produtos[3])]));window.dispatchEvent(new StorageEvent("storage",{key:"evelinRecentes"}))');
    assert.ok(await avaliar('recentes.length===1&&recentes[0]===identificarProduto(produtos[3])'));
    assert.equal(await avaliar('document.querySelectorAll("#dialogo-produto").length'),1);
    assert.equal(await avaliar('document.querySelectorAll("#dialogo-escolhas").length'),1);
    relatorio.v2Final={recentes:{limite:8,ordem:true,persistencia:true,semDuplicatas:true,armazenamentoInvalido:true,armazenamentoBloqueado:true},compartilhar:{apiNativaSimulada:true,clipboardSimulado:true,cancelamento:true,copiaManual:true,linkDireto:true},detalhe:{escape:true,foco:true,teclado:true,responsivo:true},dadosPreservados:true};
    relatorio.testes.push('V2 final: recentes 8/ordem/persistência/validação; share nativo/cópia simulados, cancelamento e fallback manual; deep link válido/inválido; modal Escape/foco/Tab e 3 resoluções.');
}

const arquivoEscolhas=fs.readFileSync(path.join(pasta,'testar-favoritos-sacola.mjs'),'utf8');
const inicioEscolhas=arquivoEscolhas.indexOf('async function testarEscolhas(');
const fimEscolhas=arquivoEscolhas.indexOf('\nlet fonte=',inicioEscolhas);
const casosEscolhas=arquivoEscolhas.slice(inicioEscolhas,fimEscolhas);
let fonte=fs.readFileSync(path.join(pasta,'testar-site.mjs'),'utf8');
fonte=fonte.replace('const pastaVerificacao = path.dirname(fileURLToPath(import.meta.url));','const pastaVerificacao = '+JSON.stringify(pasta)+';');
fonte=fonte.replace("await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Log.enable');","await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Log.enable'); await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});");
fonte=fonte.replace('    assert.deepEqual(erros, []);',()=> '    await ('+casosEscolhas+')({avaliar,cdp,esperar,captura,relatorio});\n    await ('+testarFiltro.toString()+')({avaliar,cdp,esperar,captura,relatorio});\n    assert.deepEqual(erros, []);');
fonte=fonte.replace('    assert.deepEqual(erros, []);',()=> '    await ('+testarFinal.toString()+')({avaliar,cdp,esperar,captura,relatorio,endereco,esperarPagina});\n    assert.deepEqual(erros, []);');
fonte=fonte.replace("const retorno = await cdp('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true});", "const retorno = await cdp('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true}).catch(erro=>{throw new Error(erro.message+'; expressão: '+expression)});");
// As capturas aguardam apenas imagens na área visível, inclusive na faixa horizontal.
fonte=fonte.replace(".filter(i => i.getBoundingClientRect().top < innerHeight && i.getBoundingClientRect().bottom > 0).map(i => i.decode())", ".filter(i => {const r=i.getBoundingClientRect();return r.width>0&&r.height>0&&r.top<innerHeight&&r.bottom>0&&r.left<innerWidth&&r.right>0}).map(i => {i.loading='eager';return i.decode()})");
fonte=fonte.replaceAll('fs.writeFileSync(', 'gravarEvidencia(');
fonte+='\nfunction gravarEvidencia(arquivo,dados){const nome=path.basename(arquivo);if((nome.startsWith("tamanho-")||nome.startsWith("final-"))||nome==="resultados.json")fs.writeFileSync(path.join('+JSON.stringify(destino)+',nome),dados);}';
try {
    await import('data:text/javascript;base64,'+Buffer.from(fonte).toString('base64'));
} catch(erro) {
    console.error(String(erro.stack||erro).replace(/data:text\/javascript;base64,[A-Za-z0-9+/=]+/g,'teste-composto'));
    process.exitCode=1;
}