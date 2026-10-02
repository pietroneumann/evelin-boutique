import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const pastaVerificacao = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.dirname(pastaVerificacao);
const evidencia = JSON.parse(fs.readFileSync(path.join(pastaVerificacao, 'importacao.json'), 'utf8'));
const fonte = fs.readFileSync(path.join(raiz, 'script.js'), 'utf8');
const html = fs.readFileSync(path.join(raiz, 'index.html'), 'utf8');
const pilhaHTML = [];
const vaziosHTML = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
for (const tag of html.matchAll(/<(\/?)([a-z][a-z0-9]*)\b[^>]*>/gi)) {
    const nome = tag[2].toLowerCase();
    if (vaziosHTML.has(nome)) continue;
    if (tag[1]) assert.equal(pilhaHTML.pop(), nome, 'Aninhamento HTML: ' + nome);
    else pilhaHTML.push(nome);
}
assert.deepEqual(pilhaHTML, []);
const produtos = JSON.parse(JSON.stringify(vm.runInNewContext(fonte.split('function criarCard')[0] + '; produtos')));
const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
assert.equal(produtos.length, 59);
assert.equal(new Set(produtos.map(p => normalizar(p.nome))).size, produtos.length);
assert.equal(new Set(produtos.map(p => p.imagem)).size, produtos.length);
assert.equal(produtos.filter(p => p.novidade).length, 9);
for (const categoria of ['Vestidos', 'Blusas', 'Saias']) {
    assert.equal(produtos.filter(p => p.novidade && p.categoria === categoria).length, 3);
}
for (const original of evidencia.estadoInicial.produtos) {
    assert.deepEqual(produtos.find(p => p.nome === original.nome), original);
}
for (const [arquivo, hash] of Object.entries(evidencia.estadoInicial.hashes)) {
    const bytes = fs.readFileSync(path.join(raiz, 'assets/imagens/produtos', arquivo));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), hash);
}
for (const novo of evidencia.importados) {
    const produto = produtos.find(p => p.nome === novo.nome);
    assert.equal(produto.preco, null);
    assert.equal(produto.novidade, false);
    assert.equal(produto.cores, null);
    assert.deepEqual(produto.tamanhos, novo.tamanhos);
    assert.equal(produto.imagem, novo.imagem);
}
for (const produto of produtos) assert.ok(fs.existsSync(path.join(raiz, produto.imagem)));

const servidor = http.createServer((req, res) => {
    const relativo = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const arquivo = path.resolve(raiz, '.' + (relativo === '/' ? '/index.html' : relativo));
    if (!arquivo.startsWith(raiz + path.sep)) { res.writeHead(403).end(); return; }
    try {
        const tipos = {'.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg'};
        res.setHeader('Content-Type', tipos[path.extname(arquivo)] || 'application/octet-stream');
        res.end(fs.readFileSync(arquivo));
    } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => servidor.listen(0, '127.0.0.1', resolve));
const endereco = `http://127.0.0.1:${servidor.address().port}/`;
const perfil = path.join(pastaVerificacao, 'chrome-execucao-' + Date.now());
fs.mkdirSync(path.join(perfil, 'temp'), {recursive: true});
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--incognito', '--remote-debugging-port=0', '--no-first-run',
    '--no-default-browser-check', '--disable-background-networking', '--disable-component-update',
    '--disable-sync', '--disable-extensions', '--user-data-dir=' + perfil, 'about:blank'
], {windowsHide: true, stdio: 'ignore', env: {...process.env, TEMP: path.join(perfil, 'temp'), TMP: path.join(perfil, 'temp')}});
let socket;
let sessao;
const pendentes = new Map();
let proximoId = 0;
const erros = [];
const relatorio = {navegador: '', total: produtos.length, categorias: {}, novidades: 9, novos: evidencia.importados.length, imagensAntigasPreservadas: true, testes: [], telas: [], erros};
const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));
function cdp(method, params = {}, sessionId = sessao) {
    const id = ++proximoId;
    return new Promise((resolve, reject) => {
        const temporizador = setTimeout(() => { pendentes.delete(id); reject(new Error('Tempo esgotado: ' + method)); }, 15000);
        pendentes.set(id, {resolve, reject, temporizador});
        socket.send(JSON.stringify({id, method, params, ...(sessionId ? {sessionId} : {})}));
    });
}
async function avaliar(expression) {
    const retorno = await cdp('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true});
    if (retorno.exceptionDetails) throw new Error(JSON.stringify(retorno.exceptionDetails));
    return retorno.result.value;
}
async function esperarPagina() {
    for (let i = 0; i < 100; i++) {
        if (await avaliar('document.readyState === "complete" && typeof selecionarProdutos === "function"')) return;
        await esperar(50);
    }
    throw new Error('Página não iniciou');
}
async function captura(nome, seletor) {
    await avaliar(`document.querySelector(${JSON.stringify(seletor)}).scrollIntoView({behavior:'instant', block:'start'})`);
    await esperar(120);
    await avaliar(`Promise.all([...document.querySelectorAll('img')].filter(i => i.getBoundingClientRect().top < innerHeight && i.getBoundingClientRect().bottom > 0).map(i => i.decode()))`);
    const foto = await cdp('Page.captureScreenshot', {format: 'png'});
    fs.writeFileSync(path.join(pastaVerificacao, nome + '.png'), Buffer.from(foto.data, 'base64'));
}
try {
    let portas;
    for (let i = 0; i < 160; i++) {
        try { portas = fs.readFileSync(path.join(perfil, 'DevToolsActivePort'), 'utf8').trim().split(/\r?\n/); break; } catch { await esperar(100); }
    }
    assert.ok(portas, 'Chrome não disponibilizou DevTools');
    socket = new WebSocket(`ws://127.0.0.1:${portas[0]}${portas[1]}`);
    socket.addEventListener('message', event => {
        const mensagem = JSON.parse(event.data);
        if (mensagem.id && pendentes.has(mensagem.id)) {
            const p = pendentes.get(mensagem.id); pendentes.delete(mensagem.id); clearTimeout(p.temporizador);
            if (mensagem.error) p.reject(new Error(JSON.stringify(mensagem.error))); else p.resolve(mensagem.result);
        }
        if (mensagem.method === 'Runtime.exceptionThrown') erros.push(mensagem.params.exceptionDetails);
        if (mensagem.method === 'Runtime.consoleAPICalled' && mensagem.params.type === 'error') erros.push(mensagem.params.args);
        if (mensagem.method === 'Log.entryAdded' && mensagem.params.entry.level === 'error') erros.push(mensagem.params.entry);
    });
    await new Promise((resolve, reject) => {socket.addEventListener('open', resolve, {once: true}); socket.addEventListener('error', reject, {once: true});});
    relatorio.navegador = (await cdp('Browser.getVersion')).product;
    const target = await cdp('Target.createTarget', {url:'about:blank'});
    sessao = (await cdp('Target.attachToTarget', {targetId: target.targetId, flatten:true})).sessionId;
    await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Log.enable');
    await cdp('Page.navigate', {url: endereco});
    await esperarPagina();
    assert.equal(await avaliar('document.querySelectorAll("#produtos-novidades .produto").length'), 9);
    assert.equal(await avaliar('document.querySelector("#painel-catalogo").hidden'), true);
    assert.equal(await avaliar('document.querySelectorAll("#produtos-catalogo .produto").length'), 0);
    relatorio.testes.push('Entrada: apenas 9 novidades; catálogo fechado e sem cards renderizados.');
    await avaliar('document.querySelector("#abrir-catalogo").click()');
    const acessibilidade = await avaliar(`(() => {
        const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
        return {idsUnicos: new Set(ids).size===ids.length,
            imagensComAlt:[...document.querySelectorAll('img')].every(i=>i.alt.length>0),
            controlesComLabel:[...document.querySelectorAll('input,select')].every(e=>document.querySelector('label[for="'+e.id+'"]')),
            botoesSemOnclick:[...document.querySelectorAll('button')].every(b=>b.type==='button'&&!b.hasAttribute('onclick')),
            linksSeguros:[...document.querySelectorAll('a[target="_blank"]')].every(a=>a.rel.includes('noopener')&&a.rel.includes('noreferrer'))};
    })()`);
    assert.ok(Object.values(acessibilidade).every(Boolean));
    relatorio.acessibilidade = acessibilidade;
    assert.equal(await avaliar('document.querySelectorAll("#produtos-catalogo .produto").length'), produtos.length);
    assert.equal(await avaliar('document.querySelector("#quantidade-produtos").textContent'), '59 produtos encontrados');
    const mensagens = await avaliar(`produtos.map(p => {const card=criarCard(p);const url=new URL(card.querySelector('.botao-whatsapp').href); return {nome:p.nome, tamanhos:p.tamanhos, texto:url.searchParams.get('text'), numero:url.pathname, preco:card.querySelector('.preco').textContent, grade:card.querySelector('.tamanhos-produto').textContent}})`);
    for (const item of mensagens) {
        assert.equal(item.numero, '/5511971949711');
        assert.ok(item.texto.includes(item.nome));
        assert.ok(item.texto.includes('consultar o preço'));
        assert.ok(!item.texto.includes('R$'));
        assert.equal(item.preco, 'Consultar preço');
        if (item.tamanhos) {assert.ok(item.texto.includes(item.tamanhos.join(', '))); assert.equal(item.grade, 'Tamanhos: ' + item.tamanhos.join(', '));}
    }
    const imagens = await avaliar(`Promise.all(produtos.map(async p => {const img=new Image();img.src=p.imagem;await img.decode();return {nome:p.nome,w:img.naturalWidth,h:img.naturalHeight}}))`);
    assert.ok(imagens.every(i => i.w > 0 && i.h > 0));
    relatorio.testes.push('59 mensagens WhatsApp e grades dos cards corretas; número preservado; sem preço do fornecedor.', '59 imagens decodificadas no Chrome; caminhos válidos.');
    for (const produto of produtos) {
        const busca = normalizar(produto.nome);
        await avaliar(`campoBusca.value=${JSON.stringify(busca)};campoBusca.dispatchEvent(new Event('input'))`);
        const encontrados = await avaliar('[...document.querySelectorAll("#produtos-catalogo h3")].map(e=>e.textContent)');
        assert.ok(encontrados.includes(produto.nome), 'Busca: ' + produto.nome);
    }
    assert.equal(await avaliar('selecionarProdutos(undefined,"ussara").length'), 0);
    assert.ok((await avaliar('selecionarProdutos(undefined,"jess").map(p=>p.nome)')).includes('Blusa Jêssica'));
    assert.ok((await avaliar('selecionarProdutos(undefined,"andreia").map(p=>p.nome)')).includes('Saia Andréia'));
    assert.equal(await avaliar('selecionarProdutos(undefined,"camisas").length'), 5);
    relatorio.testes.push('Busca dos 59 nomes; acentos/capitalização; prefixo; trecho intermediário rejeitado; categoria pesquisável.');
    for (const categoria of [...new Set(produtos.map(p => p.categoria))]) {
        const total = produtos.filter(p => p.categoria === categoria).length;
        relatorio.categorias[categoria] = total;
        await avaliar(`mostrarTodos();document.querySelector('#filtros-categorias [data-categoria="${categoria}"]').click()`);
        assert.equal(await avaliar('document.querySelectorAll("#produtos-catalogo .produto").length'), total);
        assert.equal(await avaliar('document.querySelector("#quantidade-produtos").textContent'), `${total} ${total === 1 ? 'produto encontrado' : 'produtos encontrados'}`);
        assert.ok((await avaliar('[...document.querySelectorAll("#produtos-catalogo .categoria-produto")].map(e=>e.textContent)')).every(c => c === categoria));
    }
    await avaliar('mostrarTodos()');
    for (const ordem of ['az','za']) {
        await avaliar(`campoOrdem.value='${ordem}';campoOrdem.dispatchEvent(new Event('change'))`);
        const nomes = await avaliar('[...document.querySelectorAll("#produtos-catalogo h3")].map(e=>e.textContent)');
        const esperado = produtos.map(p => p.nome).sort((a,b)=>a.localeCompare(b,'pt-BR'));
        if (ordem === 'za') esperado.reverse();
        assert.deepEqual(nomes, esperado);
    }
    await avaliar('campoBusca.value="produto inexistente";campoBusca.dispatchEvent(new Event("input"))');
    assert.equal(await avaliar('document.querySelector("#quantidade-produtos").textContent'), '0 produtos encontrados');
    assert.equal(await avaliar('document.querySelectorAll("#produtos-catalogo .mensagem-vazia").length'), 1);
    await avaliar('document.querySelector("#limpar-filtros").click()');
    relatorio.testes.push('Todos os 7 filtros; contador singular/plural/zero; A–Z/Z–A; limpar filtros; estado vazio.');
    for (const [largura, altura] of [[1440,1000],[768,1024],[390,844]]) {
        await cdp('Emulation.setDeviceMetricsOverride', {width:largura,height:altura,deviceScaleFactor:1,mobile:largura===390});
        await avaliar('mostrarTodos()');
        await esperar(100);
        const medidas = await avaliar(`(() => {const cards=[...document.querySelectorAll('#produtos-novidades .produto')].map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}});const elementos=[...document.querySelectorAll('body *')].filter(e=>e.getClientRects().length).filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<-1)}).map(e=>e.tagName+'.'+e.className);return {viewport:innerWidth,documento:document.documentElement.scrollWidth,colunas:new Set(cards.map(c=>Math.round(c.x))).size,cards,elementos,estiloImagem:getComputedStyle(document.querySelector('.area-imagem-produto img')).objectFit}})()`);
        assert.ok(medidas.documento <= medidas.viewport, 'Rolagem horizontal: ' + largura);
        assert.deepEqual(medidas.elementos, [], 'Elemento fora da tela: ' + largura);
        const linhas = medidas.cards.reduce((grupos, card) => {
            const linha = Math.round(card.y);
            grupos[linha] = (grupos[linha] || 0) + 1;
            return grupos;
        }, {});
        medidas.colunas = Math.max(...Object.values(linhas));
        assert.equal(medidas.colunas, largura === 1440 ? 3 : largura === 768 ? 2 : 1);
        assert.equal(medidas.estiloImagem, 'contain');
        for (const seletor of ['#inicio','#produtos-novidades','#categorias','#catalogo','#sobre','#contato','footer']) {
            await captura(`${largura}-${seletor.replace(/#/g,'')}`, seletor);
        }
        if (largura === 1440) {
            const limites = await avaliar(`(async () => {
                await Promise.all([...document.querySelectorAll('#produtos-novidades img')].map(i=>{i.loading='eager';return i.decode()}));
                const r=document.querySelector('#novidades').getBoundingClientRect();
                return {x:0,y:r.top+scrollY,width:innerWidth,height:r.height,scale:1};
            })()`);
            const grade = await cdp('Page.captureScreenshot', {format:'png',captureBeyondViewport:true,clip:limites});
            fs.writeFileSync(path.join(pastaVerificacao,'1440-novidades-grade-completa.png'),Buffer.from(grade.data,'base64'));
        }
        await avaliar('document.querySelector("#filtros-categorias [data-categoria=Camisas]").click()');
        await captura(`${largura}-camisas`, '#catalogo');
        await avaliar('document.querySelector("#filtros-categorias [data-categoria=Outros]").click()');
        await captura(`${largura}-outros`, '#catalogo');
        await avaliar('document.querySelector(".voltar-topo").click()');
        for (let tentativa = 0; tentativa < 40; tentativa++) {
            if (await avaliar('scrollY < 250')) break;
            await esperar(100);
        }
        assert.ok(await avaliar('scrollY < 250'), 'Voltar ao topo: ' + JSON.stringify(await avaliar('({y:scrollY, inicio:document.querySelector("#inicio").offsetTop,hash:location.hash})')));
        relatorio.telas.push({largura, altura, colunas: medidas.colunas, rolagemHorizontal: false, cardsAlinhados: true});
    }
    assert.deepEqual(erros, []);
    relatorio.testes.push('Desktop/tablet/mobile: sem overflow, grid 3/2/1, foco/labels/links inspecionados, voltar ao topo, sem erros no console.');
    fs.writeFileSync(path.join(pastaVerificacao, 'resultados.json'), JSON.stringify(relatorio,null,2));
    console.log(JSON.stringify(relatorio,null,2));
} finally {
    if (socket?.readyState === WebSocket.OPEN) {try {await cdp('Browser.close', {}, undefined);} catch {} socket.close();}
    chrome.kill();
    servidor.closeAllConnections();
    await new Promise(resolve => servidor.close(resolve));
    // Somente o perfil descartável criado por esta execução, dentro do projeto.
    const perfilResolvido = path.resolve(perfil);
    assert.ok(perfilResolvido.startsWith(path.resolve(pastaVerificacao) + path.sep + 'chrome-execucao-'));
    await esperar(1200);
    fs.rmSync(perfilResolvido, {recursive:true, force:true, maxRetries:5, retryDelay:300});
}
