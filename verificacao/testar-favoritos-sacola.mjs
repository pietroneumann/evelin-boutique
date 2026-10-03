import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const pasta = path.dirname(fileURLToPath(import.meta.url));
const destino = path.join(pasta, 'v2-escolhas');
fs.mkdirSync(destino, {recursive:true});

async function testarEscolhas({avaliar, cdp, esperar, captura, relatorio}) {
    const recarregar = async () => {
        await cdp('Page.reload'); await esperar(300);
        for(let i=0;i<80;i++) {
            if(await avaliar('document.readyState === "complete" && typeof favoritos !== "undefined"')) return;
            await esperar(50);
        }
        throw new Error('Recarga não iniciou');
    };
    const clicar = seletor => avaliar(`document.querySelector(${JSON.stringify(seletor)}).click()`);
    const escapar = async () => {
        await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
        await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
        await esperar(80);
    };
    await avaliar('localStorage.clear()'); await recarregar();
    await avaliar(`globalThis.cardEscolhas = nome => [...document.querySelectorAll('#produtos-novidades .produto')].find(c=>c.querySelector('h3').textContent===nome)`);
    await avaliar('document.querySelector("#abrir-favoritos").focus()');
    await clicar('#abrir-favoritos');
    assert.ok(await avaliar('document.querySelector("#conteudo-escolhas .mensagem-vazia").textContent.includes("ainda não")'));
    await escapar();
    assert.ok(await avaliar('!dialogoEscolhas.open && document.activeElement.id==="abrir-favoritos"'));
    await avaliar('cardEscolhas("Vestido Mariana").querySelector(".favoritar-produto").click(); cardEscolhas("Vestido Gleide").querySelector(".favoritar-produto").click()');
    assert.equal(await avaliar('favoritos.size'),2);
    assert.equal(await avaliar('sacola.length'),0);
    assert.equal(await avaliar('document.querySelector("#abrir-favoritos").textContent'),'Favoritos (2)');
    await avaliar('mostrarTodos()');
    assert.ok(await avaliar(`[...document.querySelectorAll('[data-acao="favorito"]')].filter(b=>b.dataset.produto===identificarProduto(produtos.find(p=>p.nome==='Vestido Mariana'))).every(b=>b.getAttribute('aria-pressed')==='true')`));
    await clicar('#abrir-favoritos');
    assert.equal(await avaliar('document.querySelectorAll("#conteudo-escolhas .produto").length'),2);
    await avaliar(`globalThis.marianaFavorita=[...document.querySelectorAll('#conteudo-escolhas .produto')].find(c=>c.querySelector('h3').textContent==='Vestido Mariana');marianaFavorita.querySelector('.adicionar-sacola').click()`);
    assert.equal(await avaliar('sacola.length'),0);
    await avaliar(`marianaFavorita.querySelector('select').value='M';marianaFavorita.querySelector('.adicionar-sacola').click();marianaFavorita.querySelector('.adicionar-sacola').click();marianaFavorita.querySelector('select').value='G';marianaFavorita.querySelector('.adicionar-sacola').click();const gleide=[...document.querySelectorAll('#conteudo-escolhas .produto')].find(c=>c.querySelector('h3').textContent==='Vestido Gleide');gleide.querySelector('select').value='P';gleide.querySelector('.adicionar-sacola').click()`);
    assert.deepEqual(await avaliar('sacola.map(i=>i.quantidade)'),[2,1,1]);
    assert.equal(await avaliar('document.querySelector("#abrir-sacola").textContent'),'Sacola (4)');
    await clicar('#fechar-escolhas'); await clicar('#abrir-sacola');
    assert.ok(await avaliar('!document.querySelector("#conteudo-escolhas .preco")'));
    let texto=await avaliar('new URL(document.querySelector("#whatsapp-sacola").href).searchParams.get("text")');
    assert.ok(texto.includes('2x Vestido Mariana — tamanho M')&&texto.includes('1x Vestido Mariana — tamanho G'));
    assert.ok(!texto.includes('R$')&&!texto.includes('01367'));
    assert.equal(await avaliar('new URL(document.querySelector("#whatsapp-sacola").href).pathname'),'/5511971949711');
    await clicar('[data-acao=aumentar]'); assert.equal(await avaliar('sacola[0].quantidade'),3);
    await clicar('[data-acao=diminuir]');await clicar('[data-acao=diminuir]');await clicar('[data-acao=diminuir]');
    assert.equal(await avaliar('sacola[0].quantidade'),1);
    assert.ok(await avaliar('document.querySelector("[data-acao=diminuir]").disabled'));
    await clicar('[data-acao=remover-item][data-item="1"]');
    assert.equal(await avaliar('sacola.length'),2);
    const salvo=await avaliar('JSON.stringify({favoritos:[...favoritos],sacola})');
    await recarregar();
    assert.equal(await avaliar('JSON.stringify({favoritos:[...favoritos],sacola})'),salvo);
    await clicar('#abrir-favoritos');await clicar('#conteudo-escolhas [data-acao=favorito]');
    assert.equal(await avaliar('favoritos.size'),1);assert.equal(await avaliar('sacola.length'),2);
    await clicar('#conteudo-escolhas [data-acao=favorito]');
    assert.equal(await avaliar('favoritos.size'),0);
    assert.ok(await avaliar('document.querySelector("#conteudo-escolhas .mensagem-vazia")!==null'));
    await clicar('#fechar-escolhas');
    await avaliar('mostrarTodos();document.querySelector("#ver-mais-produtos").click();globalThis.cardDepois=document.querySelectorAll("#produtos-catalogo .produto")[30];cardDepois.querySelector("[data-acao=favorito]").click();cardDepois.querySelector("select").value=cardDepois.querySelector("select").options[1].value;cardDepois.querySelector(".adicionar-sacola").click()');
    assert.equal(await avaliar('favoritos.size'),1);assert.equal(await avaliar('sacola.length'),3);
    relatorio.testes.push('Favoritos com/sem código: adicionar/remover, sincronização, contador, vazio e persistência; sacola independente; cards da paginação atendidos.');
    await avaliar(`localStorage.setItem('evelinFavoritos','invalid-json');localStorage.setItem('evelinSacola','{}')`);
    await recarregar();assert.equal(await avaliar('favoritos.size+sacola.length'),0);
    await avaliar(`const id=identificarProduto(produtos.find(p=>p.nome==='Vestido Mariana'));localStorage.setItem('evelinFavoritos',JSON.stringify([id,id,null,{},'inexistente']));localStorage.setItem('evelinSacola',JSON.stringify([{id,tamanho:'M',quantidade:1},{id,tamanho:'M',quantidade:2},{id,tamanho:'XX',quantidade:1},{id,tamanho:'M',quantidade:-1},{id,tamanho:'M',quantidade:'2'},{id:'inexistente',tamanho:'P',quantidade:1},null]))`);
    await recarregar();assert.equal(await avaliar('favoritos.size'),1);assert.deepEqual(await avaliar('sacola.map(i=>i.quantidade)'),[3]);
    await avaliar('localStorage.clear();window.dispatchEvent(new StorageEvent("storage",{key:null}))');
    assert.equal(await avaliar('favoritos.size+sacola.length'),0);
    await avaliar(`globalThis.salvarOriginal=Storage.prototype.setItem;Storage.prototype.setItem=()=>{throw new Error('Bloqueado no teste')};document.querySelector('#produtos-novidades [data-acao=favorito]').click();Storage.prototype.setItem=salvarOriginal`);
    assert.equal(await avaliar('favoritos.size'),1);
    assert.ok(await avaliar('document.querySelector("#status-preferencias").textContent.includes("nesta sessão")'));
    await recarregar();assert.equal(await avaliar('favoritos.size'),0);
    // Fixture isolada; não altera nenhum dos objetos no array.
    await avaliar(`globalThis.fixtureProduto={...produtos.find(p=>p.nome==='Vestido Mariana'),codigoFornecedor:null,tamanhos:null};globalThis.fixtureId=identificarProduto(fixtureProduto);produtosPorId.set(fixtureId,fixtureProduto);globalThis.fixtureCard=criarCard(fixtureProduto);document.body.appendChild(fixtureCard);fixtureCard.querySelector('.adicionar-sacola').click()`);
    assert.equal(await avaliar('sacola[0].tamanho'),null);
    assert.ok(await avaliar('fixtureCard.querySelector("select").disabled && fixtureCard.querySelector("select").textContent==="Consultar tamanho"'));
    assert.ok((await avaliar('criarMensagemSacola()')).includes('tamanho a consultar'));
    await avaliar('fixtureCard.remove();produtosPorId.delete(fixtureId);sacola=[];salvarPreferencia("evelinSacola",sacola);atualizarContadoresEscolhas()');
    await clicar('#abrir-sacola');assert.ok(await avaliar('document.querySelector("#whatsapp-sacola").hidden'));await clicar('#fechar-escolhas');
    await avaliar('mostrarTodos();globalThis.cardMariana=document.querySelectorAll("#produtos-catalogo .produto")[3];cardMariana.querySelector("select").value="M";cardMariana.querySelector(".adicionar-sacola").click()');
    await clicar('#abrir-sacola');
    texto=await avaliar('new URL(document.querySelector("#whatsapp-sacola").href).searchParams.get("text")');
    assert.equal(texto.split('1x ').length-1,1);
    await clicar('[data-acao=remover-item]');assert.equal(await avaliar('sacola.length'),0);await clicar('#fechar-escolhas');
    relatorio.testes.push('Sacola: seleção obrigatória, agrupamento por produto/tamanho, tamanhos diferentes, quantidade mínima 1, remover, contador e persistência; WhatsApp único com/sem tamanho; storage inválido/bloqueado e evento entre abas.');
    await avaliar(`for(const [nome,tamanho,quantidade]of [['Vestido Mariana','M',1],['Blusa Katy','G',1],['Saia Ema','P',2]]){const produto=produtos.find(p=>p.nome===nome);sacola.push({id:identificarProduto(produto),tamanho,quantidade});favoritos.add(identificarProduto(produto));}salvarPreferencia('evelinSacola',sacola);salvarPreferencia('evelinFavoritos',[...favoritos]);atualizarContadoresEscolhas()`);
    for(const [largura,altura]of [[1440,1000],[768,1024],[390,844]]){
        await cdp('Emulation.setDeviceMetricsOverride',{width:largura,height:altura,deviceScaleFactor:1,mobile:largura===390});
        for(const painel of ['favoritos','sacola']){
            await avaliar(`document.querySelector('#abrir-${painel}').focus();document.querySelector('#abrir-${painel}').click()`);
            await esperar(80);
            assert.ok(await avaliar(`(()=>{const r=dialogoEscolhas.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight&&dialogoEscolhas.scrollWidth<=dialogoEscolhas.clientWidth&&document.documentElement.scrollWidth<=innerWidth})()`));
            for(let i=0;i<8;i++)await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
            assert.ok(await avaliar('dialogoEscolhas.contains(document.activeElement)'));
            assert.ok(await avaliar('getComputedStyle(document.activeElement).outlineStyle!=="none"'));
            assert.ok(await avaliar('(()=>{const r=document.querySelector("#fechar-escolhas").getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight})()'));
            await avaliar('document.querySelector(".corpo-escolhas").scrollTop=0');
            await captura('escolhas-'+largura+'-'+painel,'#dialogo-escolhas');
            if(largura===390 && painel==='sacola'){
                await avaliar('document.querySelector("#whatsapp-sacola").scrollIntoView({behavior:"instant",block:"end"})');
                await captura('escolhas-390-sacola-final','#dialogo-escolhas');
            }
            await escapar();assert.ok(await avaliar(`!dialogoEscolhas.open && document.activeElement.id==='abrir-${painel}'`));
        }
    }
    relatorio.testes.push('Painéis 1440/768/390: sem overflow, foco visível/contido, fechamento sempre visível, Escape e foco restaurado; sete capturas.');
    relatorio.escolhas={favoritos:true,sacola:true,persistencia:true,storageValidado:true,whatsapp:true,teclado:true};
}

let fonte=fs.readFileSync(path.join(pasta,'testar-site.mjs'),'utf8');
fonte=fonte.replace('const pastaVerificacao = path.dirname(fileURLToPath(import.meta.url));','const pastaVerificacao = '+JSON.stringify(pasta)+';');
fonte=fonte.replace("await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Log.enable');","await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Log.enable'); await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});");
fonte=fonte.replace('    assert.deepEqual(erros, []);',()=> '    await ('+testarEscolhas.toString()+')({avaliar,cdp,esperar,captura,relatorio});\n    assert.deepEqual(erros, []);');
fonte=fonte.replaceAll('fs.writeFileSync(', 'gravarEvidencia(');
fonte+='\nfunction gravarEvidencia(arquivo, dados) { const nome=path.basename(arquivo); if(nome.startsWith("escolhas-")||nome==="resultados.json") fs.writeFileSync(path.join('+JSON.stringify(destino)+',nome),dados); }';
try {
    await import('data:text/javascript;base64,'+Buffer.from(fonte).toString('base64'));
} catch(erro) {
    console.error(String(erro.stack || erro).replace(/data:text\/javascript;base64,[A-Za-z0-9+/=]+/g, 'teste-composto'));
    process.exitCode = 1;
}
