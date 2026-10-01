let produtos = [
    {
        nome: 'Vestido Clarissa',
        preco: null,
        categoria: 'Vestidos',
        imagem: 'assets/imagens/vestido-clarissa.jpeg',
    },
    {
        nome: 'Blusa Jussara',
        preco: null,
        categoria: 'Blusas',
        imagem: 'assets/imagens/blusa-jussara.png',
    },
    {
        nome: 'Saia Paula',
        preco: null,
        categoria: 'Saias',
        imagem: 'assets/imagens/saia-paula.png',
    },
]

function criarCard(produto){

    let card = document.createElement('div')
    card.className = 'produto'

    let nome = document.createElement('h3')
    nome.textContent = produto.nome

    let imagem = document.createElement('img')
    imagem.src = produto.imagem
    imagem.alt = produto.nome

    let preco = document.createElement('p')
    preco.className = 'preco'

    if(produto.preco === null){
        preco.textContent = 'Consultar preço'
    } else {
        preco.textContent = `R$ ${formatarPreco(produto.preco)}`
    }

    let categoriaP = document.createElement('p')
    categoriaP.className = 'categoria-produto'
    categoriaP.textContent = produto.categoria

    let whatsapp = document.createElement('a')
    whatsapp.target = '_blank'
    whatsapp.rel = 'noopener noreferrer'
    whatsapp.className = 'botao-whatsapp'
    whatsapp.textContent = 'Pedir pelo Whatsapp'

    let mensagem = criarMensagem(produto)
    let mensagemCodificada = encodeURIComponent(mensagem)

    whatsapp.href =
        `https://wa.me/5511971949711?text=${mensagemCodificada}`

    card.appendChild(imagem)
    card.appendChild(nome)
    card.appendChild(categoriaP)
    card.appendChild(preco)
    card.appendChild(whatsapp)

    return card
}

function formatarPreco(preco){
    return preco.toFixed(2).replace('.', ',')
}

function criarMensagem(produto){

    let mensagem

    if(produto.preco === null){
        mensagem =
            `Olá! Tenho interesse no ${produto.nome} e gostaria de consultar o preço`
    } else {
        mensagem =
            `Olá! Tenho interesse no ${produto.nome}, no valor de R$ ${formatarPreco(produto.preco)}`
    }

    return mensagem
}

function mostrarProdutos(categoria, textoBusca){

    let areaProdutos = document.querySelector('div.produtos')
    areaProdutos.innerHTML = ''

    let quantidadeMostrada = 0
    for(let pos in produtos){

        if(
            categoria !== undefined &&
            produtos[pos].categoria !== categoria
        ){
            continue
        }

       let palavrasNome = produtos[pos].nome.toLowerCase().split(' ')

        let encontrou = false

        for(let palavra of palavrasNome){

            if(palavra.startsWith(textoBusca)){
                encontrou = true
                break
            }
        }

        if(
            textoBusca !== undefined &&
            encontrou === false
        ){
            continue
        }
            
        

        let card = criarCard(produtos[pos])

        areaProdutos.appendChild(card)
        quantidadeMostrada++   
    }

    let quantidadeProdutos = document.querySelector('#quantidade-produtos')

        if(quantidadeMostrada === 1){
        quantidadeProdutos.textContent = '1 produto encontrado'
        } else {
        quantidadeProdutos.textContent =
            `${quantidadeMostrada} produtos encontrados`
        }

    
        if(quantidadeMostrada === 0){

            let mensagem = document.createElement('p')

            mensagem.className = 'mensagem-vazia'
            mensagem.textContent = 'Nenhum produto encontrado.'

            areaProdutos.appendChild(mensagem)
    } 
}

let categoriaAtual = undefined
let textoBuscaAtual = ''

let campoBusca = document.querySelector('#busca')

campoBusca.addEventListener('input', function(){

    textoBuscaAtual = campoBusca.value.toLowerCase().trim()

    mostrarProdutos(categoriaAtual, textoBuscaAtual)
})

mostrarProdutos()

function mostrarTodos(){

    categoriaAtual = undefined
    textoBuscaAtual = ''

    campoBusca.value = ''

    let categorias = document.querySelectorAll('.categoria')

    for(let item of categorias){
        item.classList.remove('ativa')
    }
    

    mostrarProdutos(categoriaAtual, textoBuscaAtual)

    document.querySelector('#novidades').scrollIntoView({
    behavior: 'smooth'
})

    
}

function clicar(categoria, elemento){

    categoriaAtual = categoria

    let categorias = document.querySelectorAll('.categoria')

    for(let item of categorias){
        item.classList.remove('ativa')
    }   

    elemento.classList.add('ativa')

    mostrarProdutos(categoriaAtual, textoBuscaAtual)
    
    document.querySelector('#novidades').scrollIntoView({
        behavior: 'smooth'
    })
}