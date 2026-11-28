import fs from 'node:fs/promises'
import path from 'node:path'
import {spawn} from 'node:child_process'
import assert from 'node:assert/strict'
import {SOURCE_URL} from './model.mjs'
import {parseCatalogo} from './fonte.mjs'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const compact = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'')

export function orderVisualNodes(nodes) {
    const sorted = nodes.filter(n=>n.visible!==false).map(node=>({...node})).sort((a,b) => a.columnTop-b.columnTop || a.columnLeft-b.columnLeft || a.top-b.top || a.domOrder-b.domOrder)
    let row = -1, previous = -Infinity
    for(const node of sorted){
        if(node.columnTop-previous > 8){row++;previous=node.columnTop}
        node.visualRow=row
    }
    return [...sorted.sort((a,b)=>a.visualRow-b.visualRow || a.columnLeft-b.columnLeft || a.top-b.top || a.domOrder-b.domOrder).map((node,index)=>({...node,visualOrder:index})),...nodes.filter(n=>n.visible===false).map(node=>({...node,visualOrder:null}))]
}

class CDP {
    constructor(socket) {
        this.socket=socket;this.sequence=0;this.pending=new Map();this.listeners=new Map()
        socket.addEventListener('message',event=>{
            const data=JSON.parse(String(event.data))
            if(data.id){const p=this.pending.get(data.id);if(!p)return;this.pending.delete(data.id);clearTimeout(p.timer);data.error?p.reject(new Error(data.error.message)):p.resolve(data.result)}
            else for(const fn of this.listeners.get(data.method)||[])fn(data.params)
        })
    }
    static async connect(url){
        const socket=new WebSocket(url)
        await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})})
        return new CDP(socket)
    }
    on(name,fn){if(!this.listeners.has(name))this.listeners.set(name,[]);this.listeners.get(name).push(fn)}
    call(method,params={},timeout=60000){return new Promise((resolve,reject)=>{const id=++this.sequence;const timer=setTimeout(()=>{this.pending.delete(id);reject(new Error('Chrome: tempo excedido em '+method))},timeout);this.pending.set(id,{resolve,reject,timer});this.socket.send(JSON.stringify({id,method,params}))})}
    async evaluate(fn,...args){const r=await this.call('Runtime.evaluate',{expression:'('+fn.toString()+')(...'+JSON.stringify(args)+')',awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result?.value}
}

async function waitFor(fn,timeout=60000){
    const end=Date.now()+timeout
    while(Date.now()<end){try{const result=await fn();if(result)return result}catch{}await delay(100)}
    throw new Error('Chrome não apresentou a estrutura esperada da fonte.')
}

/** Avalia somente a fonte oficial. Evidências e perfil ficam na pasta local ignorada. */
export async function renderCatalogo({root,url=SOURCE_URL,width=1440,height=1100,html,parsedItems,capture=true}={}) {
    assert.equal(url,SOURCE_URL,'O navegador só consulta a fonte oficial.')
    assert.ok(root && path.isAbsolute(root),'Raiz absoluta do projeto necessária.')
    const base=path.join(root,'verificacao','diagnostico-tolerante-2026-11-27')
    await fs.mkdir(base,{recursive:true})
    const dir=await fs.mkdtemp(path.join(base,'chrome-'+width+'-'))
    const temp=path.join(dir,'temp'),profile=path.join(dir,'perfil')
    await fs.mkdir(temp,{recursive:true})
    const chromePath=process.env.CHROME_PATH||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'/usr/bin/google-chrome')
    await fs.access(chromePath).catch(()=>{throw new Error('Chrome não localizado; configure CHROME_PATH para verificar a fonte antes de publicar.')})
    const chrome=spawn(chromePath,['--headless=new','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check','--disable-extensions','--disable-gpu','--disable-background-networking','about:blank'],{cwd:root,windowsHide:true,stdio:['ignore','ignore','pipe'],env:{...process.env,TEMP:temp,TMP:temp}})
    let stderr='',cdp
    chrome.on('error',e=>{stderr+=e.message});chrome.stderr.on('data',b=>{stderr=(stderr+String(b)).slice(-8000)})
    const errors=[],requests=new Map(),screenshots=[]
    try {
        const info=await waitFor(()=>fs.readFile(path.join(profile,'DevToolsActivePort'),'utf8').catch(()=>null))
        const targets=await (await fetch('http://127.0.0.1:'+Number(info.split(/\r?\n/)[0])+'/json/list')).json()
        const target=targets.find(t=>t.type==='page');assert.ok(target)
        cdp=await CDP.connect(target.webSocketDebuggerUrl)
        cdp.on('Runtime.exceptionThrown',e=>errors.push({type:'javascript',message:e.exceptionDetails.exception?.description||e.exceptionDetails.text}))
        cdp.on('Network.requestWillBeSent',e=>requests.set(e.requestId,e.request.url))
        cdp.on('Network.loadingFailed',e=>{if(!e.canceled)errors.push({type:'network',url:requests.get(e.requestId),message:e.errorText})})
        await Promise.all([cdp.call('Page.enable'),cdp.call('Runtime.enable'),cdp.call('Network.enable')])
        await cdp.call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<=768})
        await cdp.call('Page.addScriptToEvaluateOnNewDocument',{source:"window.open=()=>null;document.addEventListener('click',e=>{if(e.target.closest('a'))e.preventDefault()},true);"})
        if(html){
            await cdp.call('Page.setDocumentContent',{frameId:(await cdp.call('Page.getFrameTree')).frameTree.frame.id,html})
        } else await cdp.call('Page.navigate',{url})
        await waitFor(()=>cdp.evaluate(()=>document.readyState!=='loading'&&document.querySelectorAll('.tyJCtd').length>0))
        await cdp.evaluate(async()=>{await Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))])})
        await delay(1000)
        const currentHTML=await cdp.evaluate(()=>document.documentElement.outerHTML)
        const parsed=parseCatalogo(currentHTML)
        assert.ok(parsed.items.length>0,'Nenhum produto no DOM renderizado.')
        const items=parsedItems||parsed.items
        const nodes=await cdp.evaluate(items=>{
            const compact=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'')
            const clean=s=>String(s||'').replace(/\([^)]*\)/g,'').replace(/R\s*\$[\s\S]*$/i,'').replace(/\b(?:c[oó]d(?:igo)?|ref(?:er[eê]ncia)?)[\s.:#-]*[A-Za-z]?\d{3,}[A-Za-z]?/gi,'').replace(/\d+(?:\.\d{3})*,\d{2}[\s\S]*$/g,'')
            const roots=new Map()
            for(const item of items){const id=item.sourceKey.split(':produto:')[0];if(!roots.has(id))roots.set(id,[...document.querySelectorAll('[id]')].filter(n=>n.id===id))}
            return items.map((item,domOrder)=>{
                const rootId=item.sourceKey.split(':produto:')[0], candidates=[]
                for(const block of roots.get(rootId)||[]){
                    const exact=[...block.querySelectorAll('p')].filter(p=>compact(clean(p.textContent))===compact(item.nome))
                    for(const p of exact){
                        const rect=p.getBoundingClientRect(),blockRect=block.getBoundingClientRect(),ancestors=[]
                        let visible=rect.width>0&&rect.height>0,reason=null
                        for(let node=p;node;node=node.parentElement){
                            const style=getComputedStyle(node)
                            if(node.hidden||node.getAttribute('aria-hidden')==='true'||style.display==='none'||style.visibility==='hidden'||style.visibility==='collapse'||Number(style.opacity)===0||style.contentVisibility==='hidden'){
                                visible=false;reason=reason||'hidden-ancestor';ancestors.push({tag:node.tagName,id:node.id,display:style.display,visibility:style.visibility,opacity:style.opacity,hidden:node.hidden,ariaHidden:node.getAttribute('aria-hidden')})
                            }
                        }
                        let column=block
                        for(let node=block;node&&node.tagName!=='BODY';node=node.parentElement){
                            if(node.querySelector('img')){column=node;break}
                            if(node.tagName==='SECTION')break
                        }
                        const col=column.getBoundingClientRect(),style=getComputedStyle(p),section=p.closest('section')
                        candidates.push({sourceKey:item.sourceKey,visible,reason,display:style.display,visibility:style.visibility,dimensions:{width:rect.width,height:rect.height},top:rect.top+scrollY,left:rect.left+scrollX,columnTop:col.top+scrollY,columnLeft:col.left+scrollX,columnWidth:col.width,columnHeight:col.height,sectionId:section?.id||null,rootId,domOrder,text:p.textContent,ancestors,imageURLs:[...column.querySelectorAll('img')].map(i=>i.currentSrc||i.src),blockDimensions:{width:blockRect.width,height:blockRect.height}})
                    }
                }
                const shown=candidates.filter(n=>n.visible)
                if(shown.length===1)return {...shown[0],alternatives:candidates.length,hiddenAlternatives:candidates.length-1}
                if(shown.length>1)return {...shown[0],ambiguousVisible:true,alternatives:candidates.length,visibleAlternatives:shown.length}
                return candidates[0]?{...candidates[0],alternatives:candidates.length}:{sourceKey:item.sourceKey,visible:false,reason:'source-node-not-found',domOrder,top:0,left:0,columnTop:0,columnLeft:0,dimensions:{width:0,height:0},alternatives:0}
            })
        },items)
        const ordered=orderVisualNodes(nodes)
        const screenshot=async(name,top)=>{
            await cdp.evaluate(y=>scrollTo({top:Math.max(0,y),behavior:'instant'}),top)
            await delay(500)
            await cdp.evaluate(async()=>{await Promise.race([Promise.all([...document.images].filter(i=>{const r=i.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,5000))])})
            const result=await cdp.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false})
            const filename=path.join(dir,name+'.png');await fs.writeFile(filename,Buffer.from(result.data,'base64'));screenshots.push(path.relative(root,filename))
        }
        if(capture){
            await screenshot(width+'-inicio',0)
            const visible=ordered.filter(n=>n.visible)
            const first=visible[0]?.columnTop||0
            const celine=visible.find(n=>/vestidocel[ei]ne/.test(compact(n.text)))
            const frames=celine?Math.max(1,Math.min(40,Math.ceil((celine.columnTop-first)/(height-150)))):4
            for(let index=0;index<frames;index++)await screenshot(width+'-prefixo-'+(index+1),first+index*(height-150))
            if(celine)await screenshot(width+'-inicio-magnific',celine.columnTop-60)
        }
        return {html:currentHTML,items:parsed.items,parseErrors:parsed.errors,nodes:ordered,screenshots,metadata:{url:await cdp.evaluate(()=>location.href),title:await cdp.evaluate(()=>document.title),width,height,visibleCount:ordered.filter(n=>n.visible).length,hiddenCount:ordered.filter(n=>!n.visible&&n.reason!=='source-node-not-found').length,unresolvedCount:ordered.filter(n=>n.reason==='source-node-not-found').length,ambiguousCount:ordered.filter(n=>n.ambiguousVisible).length,errors,evidenceDir:path.relative(root,dir)}}
    } finally {
        if(cdp){await cdp.call('Browser.close',{},3000).catch(()=>{});cdp.socket.close()}
        if(chrome.exitCode===null){await Promise.race([new Promise(resolve=>chrome.once('exit',resolve)),delay(2500)]);if(chrome.exitCode===null)chrome.kill()}
    }
}
