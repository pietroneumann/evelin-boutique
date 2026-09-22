let produtos = [
    {
        nome: 'Vestido floral',
        preco: 89.90 ,
        categoria: 'Vestidos',
        imagem: 'assets/imagens/Vestido-teste1.jpeg',
        whatsapp: 'Pedir pelo Whatsapp'
    
    },
    {
        nome: 'Pijama Suede',
        preco: 59.90 ,
        categoria: 'Pijamas',
        imagem: 'assets/imagens/Vestido-teste2.jpeg',
        whatsapp: 'Pedir pelo Whatsapp'
    },
    {
        nome: 'Camisa Plus Size',
        preco: 79.90 , 
        categoria: 'Plus Size',
        imagem: 'assets/imagens/Vestido-teste3.jpeg',
        whatsapp: 'Pedir pelo Whatsapp'
    },
    
]

function mostrarProdutos(categoria){
    
let areaProdutos = document.querySelector('div.produtos')
areaProdutos.innerHTML = ''

for(let pos in produtos){

    let card = document.createElement('div')
    card.className = 'produto'

   let nome = document.createElement('h3')
   nome.textContent = produtos[pos].nome

   let imagem = document.createElement('img')
   imagem.src = produtos[pos].imagem

   let preco =  document.createElement('p')
   preco.textContent = `R$ ${produtos[pos].preco.toFixed(2).replace('.' , ',')}`

   let categoriaP = document.createElement('p')
   categoriaP.textContent = produtos[pos].categoria

   let whatsapp = document.createElement('a') 
   whatsapp.className = 'botao-whatsapp'

   let mensagem = `Olá! Tenho interesse no ${produtos[pos].nome}, no valor de R$ ${produtos[pos].preco.toFixed(2).replace('.' , ',')}`
   let mensagemCodificada = encodeURIComponent(mensagem)

   whatsapp.textContent = produtos[pos].whatsapp
   whatsapp.href = `https://wa.me/5511971949711?text=${mensagemCodificada}`

   

   

   card.appendChild(imagem)

   card.appendChild(nome)

   card.appendChild(categoriaP)

   card.appendChild(preco)

   card.appendChild(whatsapp)

    if(categoria === undefined || produtos[pos].categoria === categoria){
            areaProdutos.appendChild(card)
    }
}

}

mostrarProdutos()

function clicar(categoria){
    mostrarProdutos(categoria)
}