import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';

const pasta = path.dirname(fileURLToPath(import.meta.url));
const destino = path.join(pasta, 'v2-organizacao');
const cssAnterior = execFileSync('git', ['show', 'HEAD:style.css'], {encoding:'utf8', cwd:path.dirname(pasta)});

async function testarOrganizacao({avaliar,cdp,esperar,captura,relatorio,cssAnterior}){
    await avaliar('mostrarTodos();clearTimeout(avisarPreferencia.temporizador);document.querySelector("#status-preferencias").textContent="";document.querySelector("#status-painel-escolhas").textContent="";armazenamentoDisponivel=true');
    const seletores=['#inicio','.hero-conteudo h2','.hero-texto','#novidades h2','#produtos-novidades .produto','#produtos-novidades .area-imagem-produto','#produtos-novidades h3','#produtos-novidades .etiqueta-novo','#produtos-novidades .adicionar-sacola','#produtos-novidades .botao-whatsapp','#catalogo h2','#busca','#ordenacao','#filtro-tamanho','.filtros-categorias button','.catalogo-resultados','#quantidade-produtos','.categorias','.categoria','.categoria-overlay','#categorias h2','#ver-catalogo','#sobre','#sobre h2','.diferencial','#contato','#contato h2','.contato-card','footer','.footer-conteudo','.voltar-topo'];
    const propriedades=['display','width','height','fontSize','fontFamily','fontWeight','lineHeight','color','backgroundColor','padding','margin','borderWidth','borderRadius','gap','gridTemplateColumns','objectFit'];
    const ler=()=>avaliar('('+function(seletores,propriedades){return Object.fromEntries(seletores.map(seletor=>{const e=document.querySelector(seletor);if(!e)return [seletor,null];const c=getComputedStyle(e);return [seletor,Object.fromEntries(propriedades.map(p=>[p,c[p]]))]}))}.toString()+')('+JSON.stringify(seletores)+','+JSON.stringify(propriedades)+')');
    const comparar=[];
    for(const [width,height]of [[1440,1000],[768,1024],[390,844]]){
        await cdp('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width===390});
        await avaliar('document.querySelector("header").hidden=true');
        const depois=await ler();
        await avaliar('globalThis.estiloBase=document.createElement("style");estiloBase.textContent='+JSON.stringify(cssAnterior)+';document.head.appendChild(estiloBase);document.querySelector("link[rel=stylesheet]").disabled=true');
        const antes=await ler();
        await avaliar('document.querySelector("link[rel=stylesheet]").disabled=false;estiloBase.remove();document.querySelector("header").hidden=false');
        const diferencas=seletores.filter(s=>JSON.stringify(antes[s])!==JSON.stringify(depois[s])).map(s=>({seletor:s,antes:antes[s],depois:depois[s]}));
        assert.deepEqual(diferencas,[],'Mudança de estilos fora do header: '+width);
        comparar.push({largura:width,seletores:seletores.length,propriedades:propriedades.length,semDiferencas:true});
        await avaliar('globalThis.preferenciasTeste={favoritos,sacola};favoritos=new Set(produtos.slice(0,3).map(identificarProduto));sacola=[{id:identificarProduto(produtos[0]),tamanho:produtos[0].tamanhos[0],quantidade:12}];atualizarContadoresEscolhas()');
        assert.equal(await avaliar('document.querySelector("#contador-favoritos").textContent'),'3');
        assert.equal(await avaliar('document.querySelector("#contador-sacola").textContent'),'12');
        assert.ok(await avaliar('document.querySelector("#abrir-favoritos").getAttribute("aria-label").includes("3 peças salvas")'));
        assert.ok(await avaliar('document.querySelectorAll(".acoes-cliente svg[aria-hidden=true]").length===2'));
        assert.ok(await avaliar('[...document.querySelectorAll(".acoes-cliente button")].every(b=>{const r=b.getBoundingClientRect();return r.height>=44&&r.width>=120&&r.right<=innerWidth&&r.left>=0})'));
        await avaliar('document.querySelector("#abrir-favoritos").focus()');
        assert.ok(await avaliar('getComputedStyle(document.activeElement).outlineStyle!=="none"'));
        await captura('organizacao-'+width+'-header','#inicio');
        await avaliar('document.querySelector("#abrir-favoritos").click()');assert.ok(await avaliar('dialogoEscolhas.open&&painelEscolhas==="favoritos"'));
        await captura('organizacao-'+width+'-favoritos','#dialogo-escolhas');
        await avaliar('document.querySelector("#fechar-escolhas").click()');await esperar(50);
        assert.equal(await avaliar('document.activeElement.id'),'abrir-favoritos');
        await avaliar('document.querySelector("#abrir-sacola").focus();document.querySelector("#abrir-sacola").click()');assert.ok(await avaliar('dialogoEscolhas.open&&painelEscolhas==="sacola"'));
        await captura('organizacao-'+width+'-sacola','#dialogo-escolhas');
        await avaliar('document.querySelector("#fechar-escolhas").click()');await esperar(50);
        assert.equal(await avaliar('document.activeElement.id'),'abrir-sacola');
        await avaliar('favoritos=new Set(produtos.slice(0,125).map(identificarProduto));sacola[0].quantidade=1234567;atualizarContadoresEscolhas()');
        assert.ok(await avaliar('document.querySelector("#contador-favoritos").textContent==="125"&&document.querySelector("#contador-sacola").textContent==="1234567"&&document.documentElement.scrollWidth<=innerWidth'));
        assert.ok(await avaliar('[...document.querySelectorAll(".contador-escolhas")].every(b=>{const r=b.getBoundingClientRect(),p=b.parentElement.getBoundingClientRect();return r.left>=p.left&&r.right<=p.right&&b.scrollWidth<=b.clientWidth})'));
        await avaliar('favoritos=preferenciasTeste.favoritos;sacola=preferenciasTeste.sacola;atualizarContadoresEscolhas()');
    }
    const contrastes=await avaliar('('+function(){function lum(hex){const v=hex.match(/\d+/g).slice(0,3).map(Number).map(c=>{c/=255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4});return v[0]*.2126+v[1]*.7152+v[2]*.0722}return [document.querySelector('.acoes-cliente button'),document.querySelector('.contador-escolhas')].map(e=>{const s=getComputedStyle(e),a=lum(s.color),b=lum(s.backgroundColor);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)})}.toString()+')()');
    assert.ok(contrastes.every(r=>r>=4.5));
    relatorio.organizacao={comparacaoEstilos:comparar,badges:true,iconesPreservados:true,contadoresGrandes:true,foco:true,contrastes};
    relatorio.novosNestaRodada=0;
    relatorio.testes.push('Organização: estilos fora do header comparados ao HEAD em 3 resoluções; SVGs, badges 3/12 e 125/1234567, rótulos acessíveis, foco, painéis e contraste >=4.5.');
}

// Reutilizar a regressão da V2, acrescentando somente os casos desta rodada.
let fonte = fs.readFileSync(path.join(pasta, 'testar-v2-final.mjs'), 'utf8');
fonte = fonte.replace('const pasta = path.dirname(fileURLToPath(import.meta.url));', 'const pasta = ' + JSON.stringify(pasta) + ';');
fonte = fonte.replace("const destino = path.join(pasta, 'v2-final');", "const destino = path.join(pasta, 'v2-organizacao');");
fonte = fonte.replace('const arquivoEscolhas=', () => testarOrganizacao.toString() + '\nconst cssAnterior = ' + JSON.stringify(cssAnterior) + ';\nconst arquivoEscolhas=');
fonte = fonte.replace("fonte=fonte.replaceAll('fs.writeFileSync(', 'gravarEvidencia(');", () => "fonte=fonte.replace('    assert.deepEqual(erros, []);',()=> '    await ('+testarOrganizacao.toString()+')({avaliar,cdp,esperar,captura,relatorio,cssAnterior:'+JSON.stringify(cssAnterior)+'});\\n    assert.deepEqual(erros, []);');\nfonte=fonte.replaceAll('fs.writeFileSync(', 'gravarEvidencia(');");
fonte = fonte.replace('(nome.startsWith("tamanho-")||nome.startsWith("final-"))', 'nome.startsWith("organizacao-")');
try {
    await import('data:text/javascript;base64,' + Buffer.from(fonte).toString('base64'));
} catch (erro) {
    console.error(String(erro.stack || erro).replace(/data:text\/javascript;base64,[A-Za-z0-9+/=]+/g, 'teste-composto'));
    process.exitCode = 1;
}
