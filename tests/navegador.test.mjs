import test from 'node:test'
import assert from 'node:assert/strict'
import {orderVisualNodes,renderCatalogo} from '../scripts/catalogo/navegador.mjs'
const node=(sourceKey,columnTop,columnLeft,top,domOrder,visible=true)=>({sourceKey,columnTop,columnLeft,top,domOrder,visible})

test('ordem visual usa a coluna e linha da foto, não o tamanho desigual da legenda',()=>{
    const original=[node('direita',100,500,420,0),node('esquerda',100,20,600,1),node('linha2',800,20,1200,2)]
    const frozen=JSON.stringify(original),result=orderVisualNodes(original)
    assert.deepEqual(result.map(n=>n.sourceKey),['esquerda','direita','linha2'])
    assert.equal(JSON.stringify(original),frozen)
})
test('duas peças da mesma coluna preservam a ordem vertical interna',()=>{
    const result=orderVisualNodes([node('saia',100,20,800,1),node('blusa',100,20,550,0),node('vizinha',100,500,600,2)])
    assert.deepEqual(result.map(n=>n.sourceKey),['blusa','saia','vizinha'])
})
test('itens offscreen continuam visíveis; variantes ocultas não recebem posição visual',()=>{
    const result=orderVisualNodes([node('mobile-oculto',0,0,0,0,false),node('visivel-fora-da-tela',30000,20,30500,1)])
    assert.equal(result[0].sourceKey,'visivel-fora-da-tela');assert.equal(result[0].visualOrder,0)
    assert.equal(result[1].visible,false);assert.equal(result[1].visualOrder,null)
})
test('navegador recusa URL fora da fonte oficial antes de iniciar Chrome',async()=>{
    await assert.rejects(()=>renderCatalogo({root:process.cwd(),url:'https://example.com/'}),/fonte oficial/)
})
