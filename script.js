/* 01. Dados dos produtos — informações confirmadas */

let produtos = [

    /* =========================
       VESTIDOS
    ========================= */

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Clarissa',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-clarissa.jpeg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Mariel',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: 341.81,
        precoBlackFriday: 290.54,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-mariel.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Gleide',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-gleide.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Mariana',
        codigoFornecedor: "01367",
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-mariana.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Karol',
        codigoFornecedor: "01416",
        categoria: 'Vestidos',
        preco: null,
        precoRegular: 341.81,
        precoBlackFriday: 290.54,
        tamanhos: ['P', 'M', 'G'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-karol.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Ana',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P', 'M'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-ana.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Camily',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-camily.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Stella',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['PP', 'P', 'M', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-stella.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Priscila',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: 410.21,
        precoBlackFriday: 348.68,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-priscila.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Sindy',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: 398.81,
        precoBlackFriday: 338.99,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-sindy.jpg',
    },


    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Clara',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-clara.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Grace',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-grace.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Lais',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P', 'M'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-lais.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Julieta',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-julieta.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Vestido Dinah',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-dinah.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Tamara",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 408.31,
        precoBlackFriday: 347.06,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-tamara.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Janete",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-janete.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Cecy",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-cecy.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Malu",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-malu.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Carla",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-carla.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Lenita",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 341.81,
        precoBlackFriday: 290.54,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-lenita.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Thaila",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-thaila.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Jennifer",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jennifer.jpg",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Vestido Carolina",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        descricao: "C/ zíper C/ botões não funcionais Tecido sedinha estampada",
        imagem: "assets/imagens/produtos/vestido-carolina.jpg",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Vestido Suzete",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 474.81,
        precoBlackFriday: 403.59,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        descricao: "Botões não funcionais / com zíper Tecido crepe c/ elastano",
        imagem: "assets/imagens/produtos/vestido-suzete.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Emília",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-emilia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Laila",
        codigoFornecedor: "01404",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-laila.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Analise",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-analise.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Gildete",
        codigoFornecedor: "01391",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-gildete.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Nicole",
        codigoFornecedor: "01419",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ["M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-nicole.jpg",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Vestido Tamires",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 341.81,
        precoBlackFriday: 290.54,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        descricao: "C/ zíper C/ botões não funcionais Tecido malha Jacar",
        imagem: "assets/imagens/produtos/vestido-tamires.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Aquila",
        codigoFornecedor: "01046",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-aquila.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Jade",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jade.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Gislaine",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-gislaine.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Solange",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 455.81,
        precoBlackFriday: 387.44,
        tamanhos: ["P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-solange.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Úrsula",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["50"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-ursula.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Maitê",
        codigoFornecedor: "01049",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 455.81,
        precoBlackFriday: 387.44,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-maite.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Anne",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 436.81,
        precoBlackFriday: 371.29,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-anne.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Lorena",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 398.81,
        precoBlackFriday: 338.99,
        tamanhos: ["PP"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-lorena.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Jordana",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jordana.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Sandra",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 436.81,
        precoBlackFriday: 371.29,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-sandra.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Joana",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ["G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-joana.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Juliana",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-juliana.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Marion",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-marion.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Jaqueline",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jaqueline.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Ayla",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 474.81,
        precoBlackFriday: 403.59,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-ayla.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Zuleica",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-zuleica.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Olga",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 455.81,
        precoBlackFriday: 387.44,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-olga.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Alexa",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-alexa.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Composé Rafaela",
        codigoFornecedor: "01183",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-compose-rafaela.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Adele",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-adele.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Leonora",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-leonora.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Salete",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 512.81,
        precoBlackFriday: 435.89,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-salete.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Roberta",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-roberta.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Julia",
        codigoFornecedor: "01057",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-julia.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Rebeca",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-rebeca.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Hortência",
        codigoFornecedor: "01224",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","GG","EXG","48","50"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-hortencia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Lavinia",
        codigoFornecedor: "01113",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 455.81,
        precoBlackFriday: 387.44,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-lavinia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Estela",
        codigoFornecedor: "01221",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-estela.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Dandara",
        codigoFornecedor: "01168",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-dandara.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Tânia",
        codigoFornecedor: "01102",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-tania.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Paloma",
        codigoFornecedor: "01174",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-paloma.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Jessica",
        codigoFornecedor: "01254",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jessica.png",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Vestido Leia",
        codigoFornecedor: "01035",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-leia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Celina",
        codigoFornecedor: "01201",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-celina.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Liliane",
        codigoFornecedor: "01285",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-liliane.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Cacilda",
        codigoFornecedor: "01162",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","48","50"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-cacilda.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Telma",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 398.81,
        precoBlackFriday: 338.99,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-telma.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Pamela",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 455.81,
        precoBlackFriday: 387.44,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-pamela.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Gisele",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-gisele.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Aurora",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: 436.81,
        precoBlackFriday: 371.29,
        tamanhos: ["P","M","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-aurora.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Sônia",
        codigoFornecedor: "01351",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-sonia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Letícia",
        codigoFornecedor: "01207",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-leticia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Emily",
        codigoFornecedor: "01289",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-emily.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Vivien",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-vivien.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Sofia",
        codigoFornecedor: "01415",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ["P","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-sofia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Vestido Isadora",
        codigoFornecedor: "01336",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 360.81,
        precoBlackFriday: 306.69,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        descricao: "Botões funcionais Tecido Jeans",
        imagem: "assets/imagens/produtos/vestido-isadora.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Flora",
        codigoFornecedor: "01424",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-flora.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Guta",
        codigoFornecedor: "01425",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-guta.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Eliana",
        codigoFornecedor: "01364",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-eliana.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Isaura",
        codigoFornecedor: "01257",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-isaura.jpg",
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Simône",
        "codigoFornecedor": "01350",
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 360.81,
        "precoBlackFriday": 306.69,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "imagem": "assets/imagens/produtos/vestido-simone.jpg",
        "blackFriday": false,
        "ordemCatalogo": 5,
        "descricao": "Com zíper. Tecido Crepe de Pêssego"
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Raquel",
        codigoFornecedor: "01342",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-raquel.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Vera",
        codigoFornecedor: "01343",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-vera.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Suzana",
        codigoFornecedor: "01361",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 322.81,
        precoBlackFriday: 274.39,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-suzana.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Mayumi",
        codigoFornecedor: "01365",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-mayumi.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Thaís",
        codigoFornecedor: "01360",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 360.81,
        precoBlackFriday: 306.69,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-thais.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Edite",
        codigoFornecedor: "00479",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-edite.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Joyce",
        codigoFornecedor: "01345",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-joyce.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Geane",
        codigoFornecedor: "01092",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-geane.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Sol",
        codigoFornecedor: "01281",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-sol.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Thereza",
        codigoFornecedor: "01271",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-thereza.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Elis",
        codigoFornecedor: "00954",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-elis.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Kyara",
        codigoFornecedor: "01100",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-kyara.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Elizabeth",
        codigoFornecedor: "01231",
        categoria: "Vestidos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-elizabeth.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Silmara",
        codigoFornecedor: "00187",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-silmara.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Vestido Fernanda",
        codigoFornecedor: "00964",
        categoria: "Vestidos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-fernanda.jpg",
    },

    /* =========================
       BLUSAS
    ========================= */

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Jussara',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-jussara.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Soraya',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: 161.31,
        precoBlackFriday: 137.11,
        tamanhos: ['48', '50', '52', '54'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-soraya.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Jêssica',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P', 'M'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-jessica.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Katy',
        codigoFornecedor: "01397",
        categoria: 'Blusas',
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ['G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-katy.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Adele',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-adele.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Sofia',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: 144.21,
        precoBlackFriday: 122.58,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-sofia.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Charlote',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-charlote.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Emanuelly',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: 222.11,
        precoBlackFriday: 188.79,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-emanuelly.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Helena',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: 189.98,
        precoBlackFriday: 161.48,
        tamanhos: ['48', '50', '52', '54'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-helena.png',
    },


    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Debora',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-debora.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Agatha',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: 227.81,
        precoBlackFriday: 193.64,
        tamanhos: ['P', 'M', 'G', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-agatha.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Andreza',
        codigoFornecedor: "01101",
        categoria: 'Blusas',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-andreza.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Vera',
        codigoFornecedor: "00598",
        categoria: 'Blusas',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-vera.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blusa Valentina',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-valentina.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Kelly",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-kelly.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Tânia",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: 142.31,
        precoBlackFriday: 120.96,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-tania.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Patrícia",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-patricia.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Marta",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-marta.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Guta",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-guta.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Bruna",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-bruna.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Melissa",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: 208.81,
        precoBlackFriday: 177.49,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-melissa.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Lenita",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: 246.81,
        precoBlackFriday: 209.79,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lenita.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Lavinia",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lavinia.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Fabiola",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: 208.81,
        precoBlackFriday: 177.49,
        tamanhos: ["G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-fabiola.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Catarina",
        codigoFornecedor: "01362",
        categoria: "Blusas",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-catarina.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Yara",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: 208.81,
        precoBlackFriday: 177.49,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-yara.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Valesca",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-valesca.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Lais",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lais.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Mari",
        codigoFornecedor: "01294",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-mari.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Andréia",
        codigoFornecedor: "01375",
        categoria: "Blusas",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-andreia.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Lucilene",
        codigoFornecedor: "01252",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lucilene.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Clara",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-clara.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Solange",
        codigoFornecedor: "01272",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-solange.png",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Blusa Bella",
        codigoFornecedor: "00424",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-bella.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Fabiana",
        codigoFornecedor: "00699",
        categoria: "Blusas",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-fabiana.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Alanis",
        codigoFornecedor: "01233",
        categoria: "Blusas",
        preco: null,
        precoRegular: 142.31,
        precoBlackFriday: 120.96,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-alanis.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Iolanda Plus Size",
        codigoFornecedor: "01047",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["48","50","52","54"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-iolanda-plus-size.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Rosana",
        codigoFornecedor: "01028",
        categoria: "Blusas",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["48","50","52","54"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-rosana.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Jane",
        codigoFornecedor: "01376",
        categoria: "Blusas",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-jane.png",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Blusa Elisa",
        codigoFornecedor: "01277",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","G"],
        cores: null,
        novidade: false,
        descricao: "Com Detalhe e Amarração na Gola Tecido Crepe",
        imagem: "assets/imagens/produtos/blusa-elisa.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Cibele",
        codigoFornecedor: "01316",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-cibele.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Cristiane",
        codigoFornecedor: "01192",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-cristiane.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Paola",
        codigoFornecedor: "00873",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-paola.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Ingrid",
        codigoFornecedor: "01213",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-ingrid.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Priscila",
        codigoFornecedor: "01279",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-priscila.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Edna",
        codigoFornecedor: "01261",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-edna.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Pamela",
        codigoFornecedor: "01297",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-pamela.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Leona",
        codigoFornecedor: "01292",
        categoria: "Blusas",
        preco: null,
        precoRegular: 142.31,
        precoBlackFriday: 120.96,
        tamanhos: ["M","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-leona.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Carolina",
        codigoFornecedor: "01232",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-carolina.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Thalita",
        codigoFornecedor: "00729",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-thalita.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Rafaela",
        codigoFornecedor: "00994",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-rafaela.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Daniele",
        codigoFornecedor: "00913",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-daniele.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Jasmim",
        codigoFornecedor: "00909",
        categoria: "Blusas",
        preco: null,
        precoRegular: 132.81,
        precoBlackFriday: 112.89,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-jasmim.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Camily",
        codigoFornecedor: "00866",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-camily.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Marê",
        codigoFornecedor: "00707",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-mare.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Betina",
        codigoFornecedor: "00675",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-betina.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Marléia",
        codigoFornecedor: "01399",
        categoria: "Blusas",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-marleia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Sol",
        codigoFornecedor: "01157",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-sol.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Isa",
        codigoFornecedor: "01118",
        categoria: "Blusas",
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-isa.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Otília",
        codigoFornecedor: "00046",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-otilia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Ludmila",
        codigoFornecedor: "00959",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-ludmila.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Nayane",
        codigoFornecedor: "00388",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-nayane.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Lucy",
        codigoFornecedor: "00028",
        categoria: "Blusas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lucy.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Blusa Paula",
        codigoFornecedor: "01369",
        categoria: "Blusas",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-paula.jpg",
    },

    /* =========================
       SAIAS
    ========================= */

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Paula',
        codigoFornecedor: "00697",
        categoria: 'Saias',
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-paula.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Telma',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['48', '50', '52', '54'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-telma.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Andréia',
        codigoFornecedor: "01234",
        categoria: 'Saias',
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-andreia.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Ema',
        codigoFornecedor: "01188",
        categoria: 'Saias',
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ['PP', 'P', 'M', 'G'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-ema.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Bela',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-bela.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Melissa',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['PP', 'P'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-melissa.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Samara',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-samara.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Graciela',
        codigoFornecedor: "01301",
        categoria: 'Saias',
        preco: null,
        precoRegular: 208.81,
        precoBlackFriday: 177.49,
        tamanhos: ['M', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-graciela.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Rosane Plus Size',
        codigoFornecedor: "00840",
        categoria: 'Saias',
        preco: null,
        precoRegular: 155.61,
        precoBlackFriday: 132.27,
        tamanhos: ['48', '50', '52', '54'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-rosane-plus-size.png',
    },
    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Karen',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['G', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-karen.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Luciana',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ['P', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-luciana.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Yamares',
        codigoFornecedor: "01155",
        categoria: 'Saias',
        preco: null,
        precoRegular: 227.81,
        precoBlackFriday: 193.64,
        tamanhos: ['GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-yamares.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Zelda',
        codigoFornecedor: "00483",
        categoria: 'Saias',
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-zelda.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Saia Amanda',
        codigoFornecedor: "01052",
        categoria: 'Saias',
        preco: null,
        precoRegular: 180.31,
        precoBlackFriday: 153.26,
        tamanhos: ['G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-amanda.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Kelly",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-kelly.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Sueli",
        codigoFornecedor: "01180",
        categoria: "Saias",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-sueli.png",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Saia Alessandra",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 303.81,
        precoBlackFriday: 258.24,
        tamanhos: ["PP"],
        cores: null,
        novidade: false,
        descricao: "Com zíper Tecido renda",
        imagem: "assets/imagens/produtos/saia-alessandra.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Katy",
        codigoFornecedor: "01396",
        categoria: "Saias",
        preco: null,
        precoRegular: 180.31,
        precoBlackFriday: 153.26,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-katy.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Jéssica",
        codigoFornecedor: "00990",
        categoria: "Saias",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["PP","P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-jessica.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Marjorie",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 322.81,
        precoBlackFriday: 274.39,
        tamanhos: ["P","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-marjorie.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Larissa",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 227.81,
        precoBlackFriday: 193.64,
        tamanhos: ["P","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-larissa.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Ester",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-ester.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Nataly",
        codigoFornecedor: "00168",
        categoria: "Saias",
        preco: null,
        precoRegular: 138.51,
        precoBlackFriday: 117.73,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-nataly.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Yasmim",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 303.81,
        precoBlackFriday: 258.24,
        tamanhos: ["P","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-yasmim.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Gabriele",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 227.81,
        precoBlackFriday: 193.64,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-gabriele.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Tamires",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-tamires.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Nancy",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-nancy.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Nathalia",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 208.81,
        precoBlackFriday: 177.49,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-nathalia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Thalia",
        codigoFornecedor: "01454",
        categoria: "Saias",
        preco: null,
        precoRegular: 227.81,
        precoBlackFriday: 193.64,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-thalia.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Claudia",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 227.81,
        precoBlackFriday: 193.64,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-claudia.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Cibele",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-cibele.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Eliete",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-eliete.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Camila",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-camila.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Pamela",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-pamela.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Clara",
        codigoFornecedor: "00754",
        categoria: "Saias",
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-clara.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Perla",
        codigoFornecedor: "01082",
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-perla.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Vilma",
        codigoFornecedor: "00696",
        categoria: "Saias",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-vilma.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Eliz",
        codigoFornecedor: "01378",
        categoria: "Saias",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["P","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-eliz.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Valentina",
        codigoFornecedor: "01348",
        categoria: "Saias",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-valentina.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Celeste",
        codigoFornecedor: "01339",
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-celeste.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Breda",
        codigoFornecedor: "01136",
        categoria: "Saias",
        preco: null,
        precoRegular: 208.81,
        precoBlackFriday: 177.49,
        tamanhos: ["P","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-breda.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Ruth",
        codigoFornecedor: "01230",
        categoria: "Saias",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["P","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-ruth.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Gildete",
        codigoFornecedor: "00450",
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-gildete.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Ayla",
        codigoFornecedor: "00797",
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-ayla.png",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Saia Patrícia",
        codigoFornecedor: "00872",
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-patricia.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Jamily",
        codigoFornecedor: "00926",
        categoria: "Saias",
        preco: null,
        precoRegular: 170.81,
        precoBlackFriday: 145.19,
        tamanhos: ["P","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-jamily.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Marieta",
        codigoFornecedor: "01112",
        categoria: "Saias",
        preco: null,
        precoRegular: 246.81,
        precoBlackFriday: 209.79,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-marieta.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Meire",
        codigoFornecedor: "00137",
        categoria: "Saias",
        preco: null,
        precoRegular: 138.51,
        precoBlackFriday: 117.73,
        tamanhos: ["P","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-meire.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Jussara",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-jussara.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Reder",
        codigoFornecedor: "01310",
        categoria: "Saias",
        preco: null,
        precoRegular: 151.81,
        precoBlackFriday: 129.04,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-reder.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Saia Carla",
        codigoFornecedor: "00154",
        categoria: "Saias",
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-carla.jpg",
    },

    /* CONJUNTOS */

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Conjunto Talita',
        codigoFornecedor: null,
        categoria: 'Conjuntos',
        preco: null,
        precoRegular: 398.81,
        precoBlackFriday: 338.99,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-talita.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Conjunto Yara',
        codigoFornecedor: "01409",
        categoria: 'Conjuntos',
        preco: null,
        precoRegular: 284.81,
        precoBlackFriday: 242.09,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-yara.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Conjunto Eny',
        codigoFornecedor: null,
        categoria: 'Conjuntos',
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-eny.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Conjunto Marina',
        codigoFornecedor: null,
        categoria: 'Conjuntos',
        preco: null,
        precoRegular: 284.81,
        precoBlackFriday: 242.09,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-marina.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Conjunto Cecilia',
        codigoFornecedor: null,
        categoria: 'Conjuntos',
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ['G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-cecilia.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Tamy",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 315.21,
        precoBlackFriday: 267.93,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-tamy.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Mayara",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-mayara.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Dandara",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 455.81,
        precoBlackFriday: 387.44,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-dandara.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Katharina",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 471.01,
        precoBlackFriday: 400.36,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-katharina.jpg",
    },

    {
        disponivel: true,
        entregaRapida: true,
        nome: "Conjunto Olivia",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 493.81,
        precoBlackFriday: 419.74,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        descricao: "Botões funcionais / Detalhes de tweed /com zíper Tecido Malha Paris",
        imagem: "assets/imagens/produtos/conjunto-olivia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Ludmila",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 398.81,
        precoBlackFriday: 338.99,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-ludmila.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Magnolia",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 474.81,
        precoBlackFriday: 403.59,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-magnolia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Dione",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 512.81,
        precoBlackFriday: 435.89,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-dione.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Pamela",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 512.81,
        precoBlackFriday: 435.89,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-pamela.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Lena",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 474.81,
        precoBlackFriday: 403.59,
        tamanhos: ["G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-lena.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Tiffany",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 474.81,
        precoBlackFriday: 403.59,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-tiffany.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Emma",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 569.81,
        precoBlackFriday: 484.34,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-emma.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Shirley",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-shirley.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Laura",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 550.81,
        precoBlackFriday: 468.19,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-laura.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Alanes",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 512.81,
        precoBlackFriday: 435.89,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-alanes.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Charlotte",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 379.81,
        precoBlackFriday: 322.84,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-charlotte.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Clara",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 417.81,
        precoBlackFriday: 355.14,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-clara.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Jeh",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 512.81,
        precoBlackFriday: 435.89,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-jeh.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Rafaela",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 512.81,
        precoBlackFriday: 435.89,
        tamanhos: ["G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-rafaela.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Edite",
        codigoFornecedor: "01144",
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 360.81,
        precoBlackFriday: 306.69,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-edite.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Ariane",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-ariane.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Evilyn",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-evilyn.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Nataly",
        codigoFornecedor: "01267",
        categoria: "Conjuntos",
        preco: null,
        precoRegular: 436.81,
        precoBlackFriday: 371.29,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-nataly.png",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Lidia",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-lidia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Mariah",
        codigoFornecedor: "01392",
        categoria: "Conjuntos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-mariah.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Isabela",
        codigoFornecedor: "01401",
        categoria: "Conjuntos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-isabela.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Conjunto Larissa",
        codigoFornecedor: "01295",
        categoria: "Conjuntos",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-larissa.jpg",
    },

    /* CAMISAS */

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Camisa Maisa',
        codigoFornecedor: null,
        categoria: 'Camisas',
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-maisa.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Camisa Eugenia',
        codigoFornecedor: null,
        categoria: 'Camisas',
        preco: null,
        precoRegular: 265.81,
        precoBlackFriday: 225.94,
        tamanhos: ['P', 'M', 'G', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-eugenia.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Camisa Beatriz',
        codigoFornecedor: null,
        categoria: 'Camisas',
        preco: null,
        precoRegular: 227.81,
        precoBlackFriday: 193.64,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-beatriz.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Camisa Jaqueline',
        codigoFornecedor: "01400",
        categoria: 'Camisas',
        preco: null,
        precoRegular: 189.81,
        precoBlackFriday: 161.34,
        tamanhos: ['M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-jaqueline.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Camisa Relga',
        codigoFornecedor: null,
        categoria: 'Camisas',
        preco: null,
        precoRegular: 227.81,
        precoBlackFriday: 193.64,
        tamanhos: ['GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-relga.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Camisa Ludmila",
        codigoFornecedor: "01146",
        categoria: "Camisas",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/camisa-ludmila.png",
    },

    /* BLAZERS */

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Blazer Helena',
        codigoFornecedor: null,
        categoria: 'Blazers',
        preco: null,
        precoRegular: 303.81,
        precoBlackFriday: 258.24,
        tamanhos: ['50'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blazer-helena.png',
    },

    /* OUTROS */

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Chemise Beth',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        precoRegular: 436.81,
        precoBlackFriday: 371.29,
        tamanhos: ['P', 'M', 'G'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/chemise-beth.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Salopete com blusa Luiza',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        precoRegular: 436.81,
        precoBlackFriday: 371.29,
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/salopete-com-blusa-luiza.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Sobretudo Tamires',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        precoRegular: 664.81,
        precoBlackFriday: 565.09,
        tamanhos: ['P', 'M', 'G'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/sobretudo-tamires.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Sobretudo Michelle',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        precoRegular: 626.81,
        precoBlackFriday: 532.79,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/sobretudo-michelle.jpg',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: 'Casaquinho Iolanda',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        precoRegular: 322.81,
        precoBlackFriday: 274.39,
        tamanhos: ['P', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/casaquinho-iolanda.png',
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Jardineira com Blusa Olivia",
        codigoFornecedor: "01186",
        categoria: "Outros",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/jardineira-com-blusa-olivia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Trijunto Julia",
        codigoFornecedor: null,
        categoria: "Outros",
        preco: null,
        precoRegular: 626.81,
        precoBlackFriday: 532.79,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/trijunto-julia.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "Tubinho Laura",
        codigoFornecedor: "01209",
        categoria: "Outros",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/tubinho-laura.jpg",
    },

    {
        disponivel: true,
        entregaRapida: false,
        nome: "T-Shirt Sara",
        codigoFornecedor: "00612",
        categoria: "Outros",
        preco: null,
        precoRegular: null,
        precoBlackFriday: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/t-shirt-sara.jpg",
    },

    /* Atualização atual do catálogo — preços internos confirmados na fonte */

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Rute",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 474.81,
        "precoBlackFriday": 403.59,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 0,
        "imagem": "assets/imagens/produtos/vestido-rute.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Blusa Betania",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 9,
        "imagem": "assets/imagens/produtos/blusa-betania.png",
        "descricao": "Com 1 botão atrás funcional. Tecido crepe pele de pêssego"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Saia Betania",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 303.81,
        "precoBlackFriday": 258.24,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 2,
        "imagem": "assets/imagens/produtos/saia-betania.png"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Louise",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 3,
        "imagem": "assets/imagens/produtos/vestido-louise.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Helena",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 4,
        "imagem": "assets/imagens/produtos/vestido-helena.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Body Tamires",
        "codigoFornecedor": null,
        "categoria": "Outros",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "P",
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 5,
        "imagem": "assets/imagens/produtos/body-tamires.png"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Saia Sonia",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 284.81,
        "precoBlackFriday": 242.09,
        "tamanhos": [
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 6,
        "imagem": "assets/imagens/produtos/saia-sonia.png"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Valentina",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 7,
        "imagem": "assets/imagens/produtos/vestido-valentina.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Cassandra",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 8,
        "imagem": "assets/imagens/produtos/vestido-cassandra.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Conjunto Cibele",
        "codigoFornecedor": null,
        "categoria": "Conjuntos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 9,
        "imagem": "assets/imagens/produtos/conjunto-cibele.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Conjunto Telma",
        "codigoFornecedor": null,
        "categoria": "Conjuntos",
        "preco": null,
        "precoRegular": 303.81,
        "precoBlackFriday": 258.24,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "blackFriday": false,
        "ordemCatalogo": 10,
        "imagem": "assets/imagens/produtos/conjunto-telma.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Mayara",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 11,
        "imagem": "assets/imagens/produtos/saia-mayara.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Marlene",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 12,
        "imagem": "assets/imagens/produtos/vestido-marlene.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Cintia",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 13,
        "imagem": "assets/imagens/produtos/vestido-cintia.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Mel",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 360.81,
        "precoBlackFriday": 306.69,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 14,
        "imagem": "assets/imagens/produtos/vestido-mel.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Dara",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 15,
        "imagem": "assets/imagens/produtos/vestido-dara.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Camilly",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 16,
        "imagem": "assets/imagens/produtos/vestido-camilly.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Conjunto Carlota",
        "codigoFornecedor": null,
        "categoria": "Conjuntos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 17,
        "imagem": "assets/imagens/produtos/conjunto-carlota.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Laisa",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 18,
        "imagem": "assets/imagens/produtos/blusa-laisa.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Sara",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 227.81,
        "precoBlackFriday": 193.64,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 19,
        "imagem": "assets/imagens/produtos/saia-sara.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Zaila",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 322.81,
        "precoBlackFriday": 274.39,
        "tamanhos": [
            "P",
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 20,
        "imagem": "assets/imagens/produtos/vestido-zaila.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Flor",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 21,
        "imagem": "assets/imagens/produtos/blusa-flor.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Flor",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 208.81,
        "precoBlackFriday": 177.49,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 22,
        "imagem": "assets/imagens/produtos/saia-flor.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Ligia",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 23,
        "imagem": "assets/imagens/produtos/vestido-ligia.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Serena",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 24,
        "imagem": "assets/imagens/produtos/saia-serena.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Conjunto Petra",
        "codigoFornecedor": null,
        "categoria": "Conjuntos",
        "preco": null,
        "precoRegular": 322.81,
        "precoBlackFriday": 274.39,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 25,
        "imagem": "assets/imagens/produtos/conjunto-petra.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Dayane",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 26,
        "imagem": "assets/imagens/produtos/vestido-dayane.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Liz",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 372.21,
        "precoBlackFriday": 316.38,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 27,
        "imagem": "assets/imagens/produtos/vestido-liz.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Matilde",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 28,
        "imagem": "assets/imagens/produtos/vestido-matilde.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Nubia",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "P",
            "M",
            "G",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 29,
        "imagem": "assets/imagens/produtos/blusa-nubia.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Raica",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 30,
        "imagem": "assets/imagens/produtos/vestido-raica.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Camisa Dolores",
        "codigoFornecedor": null,
        "categoria": "Camisas",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 31,
        "imagem": "assets/imagens/produtos/camisa-dolores.png"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Saia Angela",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 246.81,
        "precoBlackFriday": 209.79,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": true,
        "ordemCatalogo": 14,
        "imagem": "assets/imagens/produtos/saia-angela.png",
        "blackFriday": false,
        "descricao": "Com zíper. Com cinto. Tecido alfaiataria"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Iris",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 410.21,
        "precoBlackFriday": 348.68,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 33,
        "imagem": "assets/imagens/produtos/vestido-iris.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Iza",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 455.81,
        "precoBlackFriday": 387.44,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 34,
        "imagem": "assets/imagens/produtos/vestido-iza.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Catarina",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 360.81,
        "precoBlackFriday": 306.69,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 35,
        "imagem": "assets/imagens/produtos/vestido-catarina.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Zenilda",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 36,
        "imagem": "assets/imagens/produtos/vestido-zenilda.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": true,
        "nome": "Vestido Nathalia",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 284.81,
        "precoBlackFriday": 242.09,
        "tamanhos": [
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 37,
        descricao: "C/ zíper Tecido crepe c/ elastano",
        "imagem": "assets/imagens/produtos/vestido-nathalia.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Janaina",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 38,
        "imagem": "assets/imagens/produtos/blusa-janaina.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Poliana",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 39,
        "imagem": "assets/imagens/produtos/saia-poliana.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Perola",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 40,
        "imagem": "assets/imagens/produtos/vestido-perola.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Virgínia",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 341.81,
        "precoBlackFriday": 290.54,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 41,
        "imagem": "assets/imagens/produtos/vestido-virginia.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Rosángela",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 493.81,
        "precoBlackFriday": 419.74,
        "tamanhos": [
            "P",
            "M",
            "G",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 42,
        "imagem": "assets/imagens/produtos/vestido-rosangela.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Lana",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 43,
        "imagem": "assets/imagens/produtos/vestido-lana.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Brenda",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 341.81,
        "precoBlackFriday": 290.54,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 44,
        "imagem": "assets/imagens/produtos/vestido-brenda.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Luiza",
        "codigoFornecedor": "01420",
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 132.81,
        "precoBlackFriday": 112.89,
        "tamanhos": [
            "M",
            "GG",
            "48",
            "52",
            "54"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 45,
        "imagem": "assets/imagens/produtos/blusa-luiza.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Livia",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "P"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 46,
        "imagem": "assets/imagens/produtos/vestido-livia.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Melissa",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 410.21,
        "precoBlackFriday": 348.68,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 47,
        "imagem": "assets/imagens/produtos/vestido-melissa.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Cristal",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 360.81,
        "precoBlackFriday": 306.69,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 48,
        "imagem": "assets/imagens/produtos/vestido-cristal.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Adriana",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 49,
        "imagem": "assets/imagens/produtos/vestido-adriana.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Milena",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 50,
        "imagem": "assets/imagens/produtos/vestido-milena.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Jamily",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 51,
        "imagem": "assets/imagens/produtos/vestido-jamily.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Conjunto Alika",
        "codigoFornecedor": null,
        "categoria": "Conjuntos",
        "preco": null,
        "precoRegular": 303.81,
        "precoBlackFriday": 258.24,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 52,
        "imagem": "assets/imagens/produtos/conjunto-alika.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Isla",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 360.81,
        "precoBlackFriday": 306.69,
        "tamanhos": [
            "P",
            "M"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 53,
        "imagem": "assets/imagens/produtos/vestido-isla.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Sabrina",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 54,
        "imagem": "assets/imagens/produtos/blusa-sabrina.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Zaia",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "P",
            "M",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 55,
        "imagem": "assets/imagens/produtos/vestido-zaia.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "T-Shirt Personalizada",
        "codigoFornecedor": "00982",
        "categoria": "Outros",
        "preco": null,
        "precoRegular": 94.81,
        "precoBlackFriday": 80.59,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 56,
        "imagem": "assets/imagens/produtos/t-shirt-personalizada.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Joana",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 208.81,
        "precoBlackFriday": 177.49,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 57,
        "imagem": "assets/imagens/produtos/saia-joana.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Samantha",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 436.81,
        "precoBlackFriday": 371.29,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 58,
        "imagem": "assets/imagens/produtos/vestido-samantha.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Ellen",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 360.81,
        "precoBlackFriday": 306.69,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 59,
        "imagem": "assets/imagens/produtos/vestido-ellen.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Alice",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "PP",
            "P"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 60,
        "imagem": "assets/imagens/produtos/vestido-alice.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Marina",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "M",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 61,
        "imagem": "assets/imagens/produtos/vestido-marina.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Lucy",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 303.81,
        "precoBlackFriday": 258.24,
        "tamanhos": [
            "P",
            "M",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 62,
        "imagem": "assets/imagens/produtos/vestido-lucy.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Raissa",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 341.81,
        "precoBlackFriday": 290.54,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 63,
        "imagem": "assets/imagens/produtos/vestido-raissa.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Ana Clara",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 281.01,
        "precoBlackFriday": 238.86,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 64,
        "imagem": "assets/imagens/produtos/vestido-ana-clara.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Elise",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": 338.99,
        "tamanhos": [
            "P",
            "M"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 65,
        "imagem": "assets/imagens/produtos/vestido-elise.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Rose",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 66,
        "imagem": "assets/imagens/produtos/saia-rose.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Marly",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 227.81,
        "precoBlackFriday": 193.64,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 67,
        "imagem": "assets/imagens/produtos/saia-marly.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Livia",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 68,
        "imagem": "assets/imagens/produtos/blusa-livia.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Melinda",
        "codigoFornecedor": "01064",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 69,
        "imagem": "assets/imagens/produtos/saia-melinda.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Lucila",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 436.81,
        "precoBlackFriday": 371.29,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 70,
        "imagem": "assets/imagens/produtos/vestido-lucila.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Saia Lúcia",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 284.81,
        "precoBlackFriday": 242.09,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "ordemCatalogo": 10,
        "imagem": "assets/imagens/produtos/saia-lucia.png",
        "blackFriday": false,
        "descricao": "Com zíper. Com botão funcional. Com bolsos. Tecido alfaiataria marrant"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Mariah",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 72,
        "imagem": "assets/imagens/produtos/vestido-mariah.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Cleo",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 73,
        "imagem": "assets/imagens/produtos/vestido-cleo.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Camila",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 303.81,
        "precoBlackFriday": 258.24,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 74,
        "imagem": "assets/imagens/produtos/vestido-camila.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Elen",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 75,
        "imagem": "assets/imagens/produtos/vestido-elen.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Késia",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 76,
        "imagem": "assets/imagens/produtos/vestido-kesia.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Vania",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 77,
        "imagem": "assets/imagens/produtos/saia-vania.png"
    },

    {
        "disponivel": true,
        "entregaRapida": true,
        "nome": "Vestido Luana",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 78,
        descricao: "Botões funcionais Tecido tweed de malha crepe pele de pêssego nas mangas e na gola",
        "imagem": "assets/imagens/produtos/vestido-luana.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Alice",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 79,
        "imagem": "assets/imagens/produtos/blusa-alice.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Body Leticia",
        "codigoFornecedor": null,
        "categoria": "Outros",
        "preco": null,
        "precoRegular": 208.81,
        "precoBlackFriday": 177.49,
        "tamanhos": [
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 80,
        "imagem": "assets/imagens/produtos/body-leticia.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Conjunto Dara",
        "codigoFornecedor": null,
        "categoria": "Conjuntos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "P",
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 81,
        "imagem": "assets/imagens/produtos/conjunto-dara.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Eliete",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": 322.84,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 82,
        "imagem": "assets/imagens/produtos/vestido-eliete.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Júlia",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 227.81,
        "precoBlackFriday": 193.64,
        "tamanhos": [
            "PP",
            "P",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 83,
        "imagem": "assets/imagens/produtos/saia-julia.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": true,
        "nome": "Conjunto Marisa",
        "codigoFornecedor": null,
        "categoria": "Conjuntos",
        "preco": null,
        "precoRegular": 474.81,
        "precoBlackFriday": 403.59,
        "tamanhos": [
            "PP",
            "P"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 84,
        descricao: "Casaco com botões funcionais / detalhes em fita de veludo / laço removível Saia com zíper Tecido tweed de malha",
        "imagem": "assets/imagens/produtos/conjunto-marisa.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Camisa Cléo",
        "codigoFornecedor": null,
        "categoria": "Camisas",
        "preco": null,
        "precoRegular": 246.81,
        "precoBlackFriday": 209.79,
        "tamanhos": [
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 85,
        "imagem": "assets/imagens/produtos/camisa-cleo.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Amanda",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 86,
        "imagem": "assets/imagens/produtos/blusa-amanda.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Fiorella",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 227.81,
        "precoBlackFriday": 193.64,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 87,
        "imagem": "assets/imagens/produtos/blusa-fiorella.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blazer Joyce",
        "codigoFornecedor": null,
        "categoria": "Blazers",
        "preco": null,
        "precoRegular": 303.81,
        "precoBlackFriday": 258.24,
        "tamanhos": [
            "P",
            "M",
            "G",
            "50"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 88,
        "imagem": "assets/imagens/produtos/blazer-joyce.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Conjunto Raquel",
        "codigoFornecedor": null,
        "categoria": "Conjuntos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": 355.14,
        "tamanhos": [
            "P"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 89,
        "imagem": "assets/imagens/produtos/conjunto-raquel.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Clarice",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "P",
            "M",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 90,
        "imagem": "assets/imagens/produtos/blusa-clarice.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Sabrina",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 246.81,
        "precoBlackFriday": 209.79,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 91,
        "imagem": "assets/imagens/produtos/saia-sabrina.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Camisa Aline",
        "codigoFornecedor": null,
        "categoria": "Camisas",
        "preco": null,
        "precoRegular": 227.81,
        "precoBlackFriday": 193.64,
        "tamanhos": [
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 92,
        "imagem": "assets/imagens/produtos/camisa-aline.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Marieta",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 303.81,
        "precoBlackFriday": 258.24,
        "tamanhos": [
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 93,
        "imagem": "assets/imagens/produtos/vestido-marieta.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Angela",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 227.81,
        "precoBlackFriday": 193.64,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 94,
        "imagem": "assets/imagens/produtos/blusa-angela.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Camisa Marly",
        "codigoFornecedor": null,
        "categoria": "Camisas",
        "preco": null,
        "precoRegular": 246.81,
        "precoBlackFriday": 209.79,
        "tamanhos": [
            "P"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 95,
        "imagem": "assets/imagens/produtos/camisa-marly.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Renata",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 246.81,
        "precoBlackFriday": 209.79,
        "tamanhos": [
            "P",
            "M",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 96,
        "imagem": "assets/imagens/produtos/saia-renata.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Regina",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "52",
            "54"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 97,
        "imagem": "assets/imagens/produtos/blusa-regina.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Thaís",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 98,
        "imagem": "assets/imagens/produtos/blusa-thais.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Daniela",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 99,
        "imagem": "assets/imagens/produtos/blusa-daniela.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Olivia",
        "codigoFornecedor": "01220",
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 161.31,
        "precoBlackFriday": 137.11,
        "tamanhos": [
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 100,
        "imagem": "assets/imagens/produtos/blusa-olivia.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Olivia",
        "codigoFornecedor": "01012",
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "50"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 101,
        "imagem": "assets/imagens/produtos/blusa-olivia-01012.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Ana",
        "codigoFornecedor": "00577",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "G",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 102,
        "imagem": "assets/imagens/produtos/saia-ana.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Bianca",
        "codigoFornecedor": null,
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "48",
            "50",
            "52",
            "54"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 103,
        "imagem": "assets/imagens/produtos/blusa-bianca.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Karol (Plus)",
        "codigoFornecedor": "00507",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 104.31,
        "precoBlackFriday": 88.66,
        "tamanhos": [
            "50",
            "52",
            "54"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 104,
        "imagem": "assets/imagens/produtos/saia-karol-plus.png"
    },

    {
        "disponivel": true,
        "entregaRapida": true,
        "nome": "Vestido Rejane",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 455.81,
        "precoBlackFriday": 387.44,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 105,
        descricao: "Detalhes em gripir / lastex nas costas Tecido chiffon bordado",
        "imagem": "assets/imagens/produtos/vestido-rejane.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Eliz",
        "codigoFornecedor": "01273",
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "P",
            "M",
            "G"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 106,
        "imagem": "assets/imagens/produtos/blusa-eliz.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Stela",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 227.81,
        "precoBlackFriday": 193.64,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 107,
        "imagem": "assets/imagens/produtos/saia-stela.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Bianca",
        "codigoFornecedor": "01260",
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 108,
        "imagem": "assets/imagens/produtos/vestido-bianca.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": true,
        "nome": "Vestido Débora",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 436.81,
        "precoBlackFriday": 371.29,
        "tamanhos": [
            "P",
            "M",
            "G",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 109,
        descricao: "com zíper / botões não funcionais Tecido tricoline",
        "imagem": "assets/imagens/produtos/vestido-debora.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Rosane",
        "codigoFornecedor": "00436",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 110,
        "imagem": "assets/imagens/produtos/saia-rosane.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Karol",
        "codigoFornecedor": "01253",
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "48",
            "50",
            "52",
            "54"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 111,
        "imagem": "assets/imagens/produtos/blusa-karol.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Ludmila",
        "codigoFornecedor": "01117",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 227.81,
        "precoBlackFriday": 193.64,
        "tamanhos": [
            "P",
            "M",
            "G",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 112,
        "imagem": "assets/imagens/produtos/saia-ludmila.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Jane",
        "codigoFornecedor": "01374",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 113,
        "imagem": "assets/imagens/produtos/saia-jane.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Janaína",
        "codigoFornecedor": "00646",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 87.21,
        "precoBlackFriday": 74.13,
        "tamanhos": [
            "P",
            "M",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 114,
        "imagem": "assets/imagens/produtos/saia-janaina.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Janaina",
        "codigoFornecedor": "00493",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 130.91,
        "precoBlackFriday": 111.27,
        "tamanhos": [
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 115,
        "imagem": "assets/imagens/produtos/saia-janaina.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Marisa",
        "codigoFornecedor": "01346",
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 116,
        "imagem": "assets/imagens/produtos/blusa-marisa.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Damares",
        "codigoFornecedor": "01128",
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "P",
            "M",
            "G",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 117,
        "imagem": "assets/imagens/produtos/vestido-damares.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Elizete",
        "codigoFornecedor": "01263",
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "P",
            "M",
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 118,
        "imagem": "assets/imagens/produtos/vestido-elizete.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Luna",
        "codigoFornecedor": "01111",
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 207.1,
        "precoBlackFriday": 176.04,
        "tamanhos": [
            "P",
            "M"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 119,
        "imagem": "assets/imagens/produtos/blusa-luna.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Vestido Rafaela",
        "codigoFornecedor": "00432",
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "GG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 120,
        "imagem": "assets/imagens/produtos/vestido-rafaela.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Kátia",
        "codigoFornecedor": "01073",
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "P",
            "M"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 121,
        "imagem": "assets/imagens/produtos/blusa-katia.png"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Blusa Mel",
        "codigoFornecedor": "00019",
        "categoria": "Blusas",
        "preco": null,
        "precoRegular": 151.81,
        "precoBlackFriday": 129.04,
        "tamanhos": [
            "M"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 122,
        "imagem": "assets/imagens/produtos/blusa-mel.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Marê",
        "codigoFornecedor": "00988",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "PP"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 123,
        "imagem": "assets/imagens/produtos/saia-mare.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Vanda",
        "codigoFornecedor": "00957",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 189.81,
        "precoBlackFriday": 161.34,
        "tamanhos": [
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 124,
        "imagem": "assets/imagens/produtos/saia-vanda.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Rebeca",
        "codigoFornecedor": "01287",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 246.81,
        "precoBlackFriday": 209.79,
        "tamanhos": [
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 125,
        "imagem": "assets/imagens/produtos/saia-rebeca.jpg"
    },

    {
        disponivel: true,
        entregaRapida: false,
        "nome": "Saia Cecília",
        "codigoFornecedor": "00385",
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": 145.19,
        "tamanhos": [
            "EXG"
        ],
        "cores": null,
        "novidade": false,
        "ordemCatalogo": 126,
        "imagem": "assets/imagens/produtos/saia-cecilia.jpg"
    },
    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Celene",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 0,
        "descricao": "Com zíper. Tecido alfaiataria marrant",
        "imagem": "assets/imagens/produtos/vestido-celene.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Cleo",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 379.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 1,
        "descricao": "Sem zíper. Com lastex na cintura atrás. Tecido chiffon estampado",
        "imagem": "assets/imagens/produtos/vestido-cleo-magnific.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Giovana",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 341.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 2,
        "descricao": "Com zíper. Tecido crepe pele de pêssego",
        "imagem": "assets/imagens/produtos/vestido-giovana.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Evelin",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 417.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 3,
        "descricao": "Com zíper. Tecido alfaiataria",
        "imagem": "assets/imagens/produtos/vestido-evelin.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Geisa",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 4,
        "descricao": "Com zíper. Tecido chiffon estampado",
        "imagem": "assets/imagens/produtos/vestido-geisa.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Clara",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 398.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 6,
        "descricao": "Com zíper. Com detalhes em gripir. Tecido sedinha estampada",
        "imagem": "assets/imagens/produtos/vestido-clara-magnific.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Paula",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 455.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 7,
        "descricao": "Sem zíper. Com faixa. Com gola laço. Tecido chiffon trabalhado",
        "imagem": "assets/imagens/produtos/vestido-paula.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Vestido Clarita",
        "codigoFornecedor": null,
        "categoria": "Vestidos",
        "preco": null,
        "precoRegular": 474.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 8,
        "descricao": "Com detalhes em gripir. Com zíper. Tecido lese de algodão",
        "imagem": "assets/imagens/produtos/vestido-clarita.jpg"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Camisa Sara",
        "codigoFornecedor": null,
        "categoria": "Camisas",
        "preco": null,
        "precoRegular": 170.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 11,
        "descricao": "Com detalhes. Com botões funcionais. Tecido viscose maquinetada",
        "imagem": "assets/imagens/produtos/camisa-sara.png"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Saia Joana",
        "codigoFornecedor": null,
        "categoria": "Saias",
        "preco": null,
        "precoRegular": 265.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 12,
        "descricao": "Com lastex na cintura atrás. Sem zíper. Com detalhes em gripir. Tecido alfaiataria",
        "imagem": "assets/imagens/produtos/saia-joana-magnific.png"
    },

    {
        "disponivel": true,
        "entregaRapida": false,
        "nome": "Camisa Lorena",
        "codigoFornecedor": null,
        "categoria": "Camisas",
        "preco": null,
        "precoRegular": 265.81,
        "precoBlackFriday": null,
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "EXG"
        ],
        "cores": null,
        "novidade": true,
        "blackFriday": false,
        "ordemCatalogo": 13,
        "descricao": "Com botões funcionais. Manga longa. Tecido renda",
        "imagem": "assets/imagens/produtos/camisa-lorena.png"
    },
]

/* 02. Configuração, índices e referências do DOM */

const WHATSAPP_NUMBER = '5511927322981'
const produtosPorLote = 24
const limiteRecentes = 8
const campanhaBlackFriday = {ativa: true, desconto: 15}
const categoriasDisponiveis = [...new Set(produtos.map(produto => produto.categoria))]
const tamanhosDisponiveis = [...new Set(produtos.flatMap(produto => produto.tamanhos || []))].sort(ordenarTamanhos)
const contagemCodigos = new Map()
produtos.forEach(produto => {
    if(produto.codigoFornecedor) contagemCodigos.set(produto.codigoFornecedor, (contagemCodigos.get(produto.codigoFornecedor) || 0) + 1)
})
const produtosPorId = new Map(produtos.map(produto => [identificarProduto(produto), produto]))
const campoBusca = document.querySelector('#busca')
const campoOrdem = document.querySelector('#ordenacao')
const campoTamanho = document.querySelector('#filtro-tamanho')
const campoEntrega = document.querySelector('#filtro-disponibilidade')
const campoPreco = document.querySelector('#filtro-preco')
const painelCatalogo = document.querySelector('#painel-catalogo')
const botaoAbrirCatalogo = document.querySelector('#abrir-catalogo')
const dialogoEscolhas = document.querySelector('#dialogo-escolhas')
const dialogoDetalhe = document.querySelector('#dialogo-produto')

/* 03. Estado da aplicação */

let categoriaAtual
let textoBuscaAtual = ''
let tamanhoAtual = ''
let ordemAtual = 'original'
let somenteNovidadesAtual = false
let somenteBlackFridayAtual = false
let entregaAtual = ''
let faixaPrecoAtual = ''
let limiteVisivel = produtosPorLote
let sequenciaControles = 0
let armazenamentoDisponivel = true
let favoritos = validarFavoritos(lerPreferencia('evelinFavoritos'))
let sacola = validarSacola(lerPreferencia('evelinSacola'))
let recentes = validarRecentes(lerPreferencia('evelinRecentes'))
let painelEscolhas = ''
let focoAnterior
let focoDetalhe

/* 04. Utilidades, identidade e armazenamento local */

function identificarProduto(produto) {
    if(produto.codigoFornecedor && contagemCodigos.get(produto.codigoFornecedor) === 1) return 'codigo:' + produto.codigoFornecedor
    return 'produto:' + JSON.stringify([produto.categoria, produto.nome, produto.imagem])
}

function normalizarTexto(texto) {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
}

function ordenarTamanhos(a, b) {
    // Esta lista define só a precedência; as opções vêm exclusivamente dos produtos.
    const grade = ['PP', 'P', 'M', 'G', 'GG', 'EXG']
    const grupo = tamanho => grade.includes(tamanho) ? 0 : /^\d+$/.test(tamanho) ? 1 : 2
    const diferenca = grupo(a) - grupo(b)
    if(diferenca) return diferenca
    if(grupo(a) === 0) return grade.indexOf(a) - grade.indexOf(b)
    if(grupo(a) === 1) return Number(a) - Number(b) || a.localeCompare(b, 'pt-BR')
    return a.localeCompare(b, 'pt-BR', {numeric: true})
}

function formatarPreco(preco) {

    return preco
        .toFixed(2)
        .replace('.', ',')
}

function estaDisponivel(produto) {
    // A permissão de compra é independente do benefício de entrega.
    return produto?.disponivel === true
}

function temEntregaRapida(produto) {
    return produto?.entregaRapida === true
}

function obterPrecos(produto) {
    if(!Number.isFinite(produto.precoRegular) || produto.precoRegular <= 0) return null
    const regular = Math.round(produto.precoRegular * 100)
    // As duas coleções mais recentes ficam fora da campanha, mesmo com preço confirmado.
    const oferta = Math.round(regular * (100 - campanhaBlackFriday.desconto) / 100)
    const promocional = campanhaBlackFriday.ativa && produto.blackFriday !== false && produto.novidade !== true && oferta > 0 && oferta < regular ? oferta : null
    return {regular, promocional, atual: promocional ?? regular}
}

function participaDaBlackFriday(produto) {
    // Coleções recentes excluídas da campanha exibem somente o preço regular.
    return obterPrecos(produto)?.promocional != null
}

function moeda(centavos) {
    return (centavos / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

function criarPreco(produto) {
    const area = document.createElement('div')
    area.className = 'preco'
    const valores = obterPrecos(produto)
    if(!valores){
        area.textContent = 'Consultar preço'
    } else if(valores.promocional !== null){
        const regular = document.createElement('del')
        regular.className = 'preco-regular'
        regular.setAttribute('aria-label', 'Preço regular: ' + moeda(valores.regular))
        regular.textContent = moeda(valores.regular)
        const promocional = document.createElement('strong')
        promocional.className = 'preco-promocional'
        promocional.setAttribute('aria-label', 'Preço Black Friday: ' + moeda(valores.promocional))
        promocional.textContent = moeda(valores.promocional)
        const desconto = document.createElement('span')
        desconto.className = 'desconto-black-friday'
        desconto.textContent = campanhaBlackFriday.desconto + '% OFF'
        area.append(regular, promocional, desconto)
    } else {
        area.textContent = moeda(valores.regular)
    }
    return area
}

function resumirSacola(itens = sacola) {
    let total = 0
    let consultar = 0
    let indisponiveis = 0
    itens.forEach(item => {
        const produto = produtosPorId.get(item.id)
        if(!produto || !estaDisponivel(produto)){ indisponiveis += item.quantidade; return }
        const valores = obterPrecos(produto)
        if(valores) total += valores.atual * item.quantidade
        else consultar += item.quantidade
    })
    return {total, consultar, indisponiveis}
}

function tamanhoValido(produto, tamanho) {
    return produto.tamanhos === null ? tamanho === null : typeof tamanho === 'string' && produto.tamanhos.includes(tamanho)
}

function lerPreferencia(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave) || '[]')
        return Array.isArray(dados) ? dados : []
    } catch {
        // JSON inválido ou armazenamento bloqueado não impede o catálogo de funcionar.
        return []
    }
}

function salvarPreferencia(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados))
        armazenamentoDisponivel = true
    } catch {
        armazenamentoDisponivel = false
        avisarPreferencia('Não foi possível salvar no navegador. Suas escolhas serão mantidas nesta sessão.')
    }
}

function avisarPreferencia(texto) {
    const status = document.querySelector('#status-preferencias')
    const statusPainel = document.querySelector(dialogoDetalhe.open ? '#status-detalhe' : '#status-painel-escolhas')
    status.textContent = texto
    statusPainel.textContent = texto
    clearTimeout(avisarPreferencia.temporizador)
    avisarPreferencia.temporizador = setTimeout(() => { status.textContent = ''; statusPainel.textContent = '' }, 6000)
}

/* 05. Cards e renderização de produtos */

function criarCard(produto, emDetalhe = false) {

    let card = document.createElement('article')
    card.className = 'produto'
    card.dataset.produto = identificarProduto(produto)

    const disponivel = estaDisponivel(produto)
    card.classList.toggle('produto-indisponivel', !disponivel)
    card.classList.toggle('produto-entrega-rapida', temEntregaRapida(produto))
    const etiquetas = document.createElement('div')
    etiquetas.className = 'etiquetas-produto'
    const estados = []
    if(temEntregaRapida(produto)) estados.push(['etiqueta-entrega-rapida', 'ENTREGA RÁPIDA'])
    if(produto.novidade === true) estados.push(['etiqueta-novo', 'NOVO'])
    if(participaDaBlackFriday(produto)) estados.push(['etiqueta-black-friday', 'BLACK FRIDAY'])
    estados.forEach(([classe, texto]) => {
        const etiqueta = document.createElement('span')
        etiqueta.className = classe
        etiqueta.textContent = texto
        etiquetas.appendChild(etiqueta)
    })
    card.appendChild(etiquetas)

    let areaImagem = document.createElement('div')
    areaImagem.className = 'area-imagem-produto'

    let imagem = document.createElement('img')
    imagem.src = produto.imagem
    imagem.alt = produto.nome
    imagem.loading = 'lazy'
    imagem.decoding = 'async'

    areaImagem.appendChild(imagem)

    let nome = document.createElement('h3')
    nome.textContent = produto.nome

    let categoriaP = document.createElement('p')
    categoriaP.className = 'categoria-produto'
    categoriaP.textContent = produto.categoria

    let tamanhos = document.createElement('p')
    tamanhos.className = 'tamanhos-produto'

    if(produto.tamanhos === null){

        tamanhos.textContent =
            'Tamanhos: consultar'

    } else {

        tamanhos.textContent =
            `Tamanhos: ${produto.tamanhos.join(', ')}`
    }

    const preco = criarPreco(produto)

    let whatsapp = document.createElement('a')

    whatsapp.target = '_blank'
    whatsapp.rel = 'noopener noreferrer'

    whatsapp.className = 'botao-whatsapp'

    whatsapp.textContent =
        'Pedir pelo WhatsApp'

    let mensagem =
        criarMensagem(produto)

    let mensagemCodificada =
        encodeURIComponent(mensagem)

    whatsapp.href =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`
    if(!disponivel){
        whatsapp.removeAttribute('href')
        whatsapp.setAttribute('aria-disabled', 'true')
        whatsapp.textContent = 'Pedido bloqueado'
    }

    const abrirDetalhe = document.createElement('button')
    abrirDetalhe.type = 'button'
    abrirDetalhe.className = 'abrir-detalhe'
    abrirDetalhe.dataset.acao = 'detalhe'
    abrirDetalhe.dataset.produto = card.dataset.produto
    abrirDetalhe.setAttribute('aria-label', 'Ver detalhes de ' + produto.nome)
    abrirDetalhe.appendChild(areaImagem)
    card.appendChild(abrirDetalhe)

    const titulo = document.createElement('div')
    titulo.className = 'titulo-produto'
    const favorito = document.createElement('button')
    favorito.type = 'button'
    favorito.className = 'favoritar-produto'
    favorito.dataset.acao = 'favorito'
    favorito.dataset.produto = card.dataset.produto
    atualizarBotaoFavorito(favorito, produto)
    titulo.append(nome, favorito)
    card.appendChild(titulo)

    card.appendChild(categoriaP)

    card.appendChild(tamanhos)

    if(emDetalhe && typeof produto.descricao === 'string' && produto.descricao.trim()){
        const descricao = document.createElement('p')
        descricao.className = 'descricao-produto'
        descricao.textContent = produto.descricao
        card.appendChild(descricao)
    }

    card.appendChild(preco)

    const escolha = document.createElement('div')
    escolha.className = 'escolha-tamanho'
    const label = document.createElement('label')
    const seletor = document.createElement('select')
    seletor.id = 'tamanho-produto-' + (++sequenciaControles)
    label.htmlFor = seletor.id
    label.textContent = 'Tamanho para a sacola'
    seletor.className = 'tamanho-sacola'
    const consulta = produto.tamanhos === null
    seletor.add(new Option(consulta ? 'Consultar tamanho' : 'Escolha o tamanho', ''))
    seletor.disabled = consulta || !disponivel
    seletor.required = !consulta
    if(!consulta) produto.tamanhos.forEach(tamanho => seletor.add(new Option(tamanho, tamanho)))
    const adicionar = document.createElement('button')
    adicionar.type = 'button'
    adicionar.className = 'adicionar-sacola'
    adicionar.disabled = !disponivel
    adicionar.dataset.acao = 'adicionar-sacola'
    adicionar.textContent = 'Adicionar à sacola'
    adicionar.setAttribute('aria-label', 'Adicionar ' + produto.nome + ' à sacola')
    escolha.append(label, seletor, adicionar)
    card.appendChild(escolha)

    const acoes = document.createElement('div')
    acoes.className = 'acoes-secundarias'
    const compartilhar = document.createElement('button')
    compartilhar.type = 'button'
    compartilhar.dataset.acao = 'compartilhar'
    compartilhar.dataset.produto = card.dataset.produto
    compartilhar.textContent = 'Compartilhar'
    compartilhar.setAttribute('aria-label', 'Compartilhar ' + produto.nome)
    acoes.appendChild(whatsapp)
    acoes.appendChild(compartilhar)
    card.appendChild(acoes)

    return card
}

function renderizarProdutos(area, lista) {
    area.replaceChildren()
    if(lista.length === 0){
        const mensagem = document.createElement('p')
        mensagem.className = 'mensagem-vazia'
        mensagem.textContent = 'Nenhum produto encontrado. Tente outro nome ou categoria.'
        area.appendChild(mensagem)
        return
    }
    const fragmento = document.createDocumentFragment()
    lista.forEach(produto => fragmento.appendChild(criarCard(produto)))
    area.appendChild(fragmento)
}

/* 06. Catálogo, busca, categorias, filtros e ordenação */

function selecionarProdutos(categoria, textoBusca = '', somenteNovidades = false, tamanho = '', somenteBlackFriday = false, entrega = '', faixaPreco = '') {
    const termos = normalizarTexto(textoBusca).split(/\s+/).filter(Boolean)
    return produtos.filter(produto => {
        if(somenteNovidades && produto.novidade !== true) return false
        if(somenteBlackFriday && !participaDaBlackFriday(produto)) return false
        if(categoria && produto.categoria !== categoria) return false
        if(entrega === 'entrega-rapida' && !temEntregaRapida(produto)) return false
        if(entrega === 'sem-entrega-rapida' && temEntregaRapida(produto)) return false
        const preco = obterPrecos(produto)?.atual ?? null
        if(faixaPreco === 'consultar' && preco !== null) return false
        if(faixaPreco && faixaPreco !== 'consultar'){
            if(preco === null) return false
            if(faixaPreco === 'ate-200' && preco > 20000) return false
            if(faixaPreco === '200-400' && (preco <= 20000 || preco > 40000)) return false
            if(faixaPreco === 'acima-400' && preco <= 40000) return false
        }
        if(tamanho === 'consultar'){
            if(produto.tamanhos !== null) return false
        } else if(tamanho && !produto.tamanhos?.includes(tamanho)) return false
        const palavras = normalizarTexto(produto.nome + ' ' + produto.categoria).split(/\s+/)
        return termos.every(termo => palavras.some(palavra => palavra.startsWith(termo)))
    })
}

function ordenarProdutos(lista, ordem = ordemAtual) {
    if(ordem === 'original') return lista
    return [...lista].sort((a, b) => {
        if(ordem === 'preco-menor' || ordem === 'preco-maior'){
            const pa = obterPrecos(a)?.atual ?? null, pb = obterPrecos(b)?.atual ?? null
            // Consultar preço sempre vem depois das peças com preço, nas duas ordens.
            if(pa === null || pb === null) return pa === pb ? a.nome.localeCompare(b.nome, 'pt-BR') : pa === null ? 1 : -1
            return (ordem === 'preco-menor' ? pa - pb : pb - pa) || a.nome.localeCompare(b.nome, 'pt-BR')
        }
        return (ordem === 'za' ? -1 : 1) * a.nome.localeCompare(b.nome, 'pt-BR')
    })
}

function atualizarFiltrosCatalogo() {
    const entregaRapida = produtos.filter(temEntregaRapida).length
    campoEntrega.options[0].textContent = `Todos os produtos (${produtos.length})`
    campoEntrega.options[1].textContent = `Entrega rápida (${entregaRapida})`
    campoEntrega.options[2].textContent = `Outros produtos (${produtos.length - entregaRapida})`
    const semCategoria = selecionarProdutos(undefined, textoBuscaAtual, somenteNovidadesAtual, tamanhoAtual, somenteBlackFridayAtual, entregaAtual, faixaPrecoAtual)
    document.querySelectorAll('#filtros-categorias button').forEach(botao => {
        const categoria = botao.dataset.categoria
        const total = semCategoria.filter(p => !categoria || p.categoria === categoria).length
        botao.textContent = `${categoria || 'Todas'} (${total})`
    })
    const area = document.querySelector('#filtros-ativos')
    area.replaceChildren()
    const filtros = [
        ['categoria', categoriaAtual], ['busca', textoBuscaAtual && 'Busca: ' + textoBuscaAtual],
        ['tamanho', tamanhoAtual && 'Tamanho: ' + (tamanhoAtual === 'consultar' ? 'Consultar' : tamanhoAtual)],
        ['entrega', entregaAtual && (entregaAtual === 'entrega-rapida' ? 'Entrega rápida' : 'Outros produtos')],
        ['preco', faixaPrecoAtual && campoPreco.selectedOptions[0].textContent],
        ['novidades', somenteNovidadesAtual && 'Novidades'], ['black-friday', somenteBlackFridayAtual && 'Black Friday']
    ]
    filtros.filter(([,rotulo]) => rotulo).forEach(([tipo, rotulo]) => {
        const botao = document.createElement('button')
        botao.type = 'button'
        botao.dataset.removerFiltro = tipo
        botao.textContent = rotulo + ' ×'
        botao.setAttribute('aria-label', 'Remover filtro: ' + rotulo)
        area.appendChild(botao)
    })
    area.hidden = area.childElementCount === 0
    const base = selecionarProdutos(categoriaAtual, textoBuscaAtual, false, tamanhoAtual, false, entregaAtual, faixaPrecoAtual)
    document.querySelector('#contagem-novidades').textContent = `Novidades (${base.filter(p => p.novidade && (!somenteBlackFridayAtual || participaDaBlackFriday(p))).length})`
    document.querySelector('#contagem-black-friday').textContent = `Black Friday · 15% OFF (${base.filter(p => participaDaBlackFriday(p) && (!somenteNovidadesAtual || p.novidade)).length})`
}

function atualizarQuantidade(quantidade) {
    document.querySelector('#quantidade-produtos').textContent =
        quantidade === 1 ? '1 produto encontrado' : `${quantidade} produtos encontrados`
}

function mostrarProdutos(reiniciar = true) {
    if(reiniciar) limiteVisivel = produtosPorLote
    const lista = ordenarProdutos(selecionarProdutos(categoriaAtual, textoBuscaAtual, somenteNovidadesAtual, tamanhoAtual, somenteBlackFridayAtual, entregaAtual, faixaPrecoAtual))
    const area = document.querySelector('#produtos-catalogo')
    const exibidos = lista.slice(0, limiteVisivel)
    if(reiniciar){
        renderizarProdutos(area, exibidos)
    } else {
        const inicio = area.querySelectorAll('.produto').length
        const fragmento = document.createDocumentFragment()
        exibidos.slice(inicio).forEach(produto => fragmento.appendChild(criarCard(produto)))
        area.appendChild(fragmento)
    }
    atualizarQuantidade(lista.length)
    atualizarFiltrosCatalogo()
    document.querySelector('#quantidade-exibida').textContent =
        `${exibidos.length} ${exibidos.length === 1 ? 'produto exibido' : 'produtos exibidos'}`
    document.querySelector('#ver-mais-produtos').hidden = exibidos.length >= lista.length
    document.querySelectorAll('[data-categoria]').forEach(botao => {
        const ativo = (botao.dataset.categoria || undefined) === categoriaAtual
        botao.classList.toggle('ativa', ativo)
        botao.setAttribute('aria-pressed', String(ativo))
    })
}

function abrirCatalogo(rolar = true) {
    painelCatalogo.hidden = false
    botaoAbrirCatalogo.hidden = true
    botaoAbrirCatalogo.setAttribute('aria-expanded', 'true')
    mostrarProdutos()
    if(rolar) document.querySelector('#catalogo').scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    })
}

function mostrarTodos() {
    categoriaAtual = undefined
    textoBuscaAtual = ''
    tamanhoAtual = ''
    ordemAtual = 'original'
    somenteNovidadesAtual = false
    somenteBlackFridayAtual = false
    entregaAtual = ''
    faixaPrecoAtual = ''
    campoEntrega.value = ''
    campoPreco.value = ''
    document.querySelector('#filtro-novidades').checked = false
    document.querySelector('#filtro-black-friday').checked = false
    campoBusca.value = ''
    campoTamanho.value = ''
    campoOrdem.value = 'original'
    abrirCatalogo()
}

function clicar(categoria) {
    categoriaAtual = categoria
    abrirCatalogo()
}

function criarBotaoFiltro(categoria, titulo) {
    const botao = document.createElement('button')
    botao.type = 'button'
    botao.dataset.categoria = categoria || ''
    botao.textContent = titulo
    botao.setAttribute('aria-pressed', String(!categoria))
    botao.addEventListener('click', () => clicar(categoria))
    return botao
}

function criarCategorias() {
    const filtros = document.querySelector('#filtros-categorias')
    filtros.appendChild(criarBotaoFiltro(undefined, 'Todas'))
    const area = document.querySelector('.categorias')
    const capasAtuais = {
        Vestidos: 'assets/imagens/produtos/vestido-mariana.jpg',
        Blusas: 'assets/imagens/produtos/blusa-jessica.png',
        Saias: 'assets/imagens/produtos/saia-andreia.png'
    }
    categoriasDisponiveis.forEach(categoria => {
        const colecao = selecionarProdutos(categoria)
        filtros.appendChild(criarBotaoFiltro(categoria, categoria))
        const botao = criarBotaoFiltro(categoria, '')
        botao.className = 'categoria'
        botao.style.backgroundImage = `url("${capasAtuais[categoria] || colecao[0].imagem}")`
        const overlay = document.createElement('span')
        overlay.className = 'categoria-overlay'
        const titulo = document.createElement('span')
        titulo.className = 'categoria-titulo'
        titulo.textContent = categoria
        const quantidade = document.createElement('span')
        quantidade.textContent = `${colecao.length} ${colecao.length === 1 ? 'peça' : 'peças'} · Ver coleção`
        overlay.append(titulo, quantidade)
        botao.appendChild(overlay)
        area.appendChild(botao)
    })
}

/* 07. Favoritos e contadores das escolhas */

function validarFavoritos(dados) {
    return new Set(dados.filter(id => typeof id === 'string' && produtosPorId.has(id)))
}

function atualizarBotaoFavorito(botao, produto) {
    const marcado = favoritos.has(identificarProduto(produto))
    botao.textContent = marcado ? '♥' : '♡'
    botao.setAttribute('aria-pressed', String(marcado))
    botao.setAttribute('aria-label', (marcado ? 'Remover ' : 'Adicionar ') + produto.nome + (marcado ? ' dos favoritos' : ' aos favoritos'))
}

function atualizarContadoresEscolhas() {
    const quantidadeSacola = sacola.reduce((total, item) => total + item.quantidade, 0)
    document.querySelector('#contador-favoritos').textContent = favoritos.size
    document.querySelector('#contador-sacola').textContent = quantidadeSacola
    document.querySelector('#abrir-favoritos').setAttribute('aria-label', 'Abrir favoritos: ' + favoritos.size + (favoritos.size === 1 ? ' peça salva' : ' peças salvas'))
    document.querySelector('#abrir-sacola').setAttribute('aria-label', 'Abrir sacola de orçamento: ' + quantidadeSacola + (quantidadeSacola === 1 ? ' peça' : ' peças'))
    document.querySelectorAll('[data-acao="favorito"]').forEach(botao => {
        const produto = produtosPorId.get(botao.dataset.produto)
        if(produto) atualizarBotaoFavorito(botao, produto)
    })
}

/* 08. Sacola e painel compartilhado das escolhas */

function validarSacola(dados) {
    const validos = []
    dados.forEach(item => {
        if(!item || typeof item !== 'object' || Array.isArray(item)) return
        const produto = produtosPorId.get(item.id)
        if(!produto || !tamanhoValido(produto, item.tamanho) || !Number.isSafeInteger(item.quantidade) || item.quantidade < 1) return
        const anterior = validos.find(entrada => entrada.id === item.id && entrada.tamanho === item.tamanho)
        if(anterior){
            const total = anterior.quantidade + item.quantidade
            if(Number.isSafeInteger(total)) anterior.quantidade = total
        } else validos.push({id: item.id, tamanho: item.tamanho, quantidade: item.quantidade})
    })
    return validos
}

function botaoItem(texto, acao, indice, label) {
    const botao = document.createElement('button')
    botao.type = 'button'
    botao.textContent = texto
    botao.dataset.acao = acao
    botao.dataset.item = indice
    botao.setAttribute('aria-label', label)
    return botao
}

function estadoVazioEscolhas(texto) {
    const mensagem = document.createElement('p')
    mensagem.className = 'mensagem-vazia'
    mensagem.textContent = texto
    return mensagem
}

function renderizarEscolhas() {
    const area = document.querySelector('#conteudo-escolhas')
    const ativo = document.activeElement
    const acaoAnterior = ativo?.dataset.acao
    const indiceAnterior = ativo?.dataset.item
    const produtoAnterior = ativo?.dataset.produto
    const estavaNoConteudo = area.contains(ativo)
    area.replaceChildren()
    const orcamento = document.querySelector('#whatsapp-sacola')
    orcamento.hidden = painelEscolhas !== 'sacola' || sacola.length === 0
    orcamento.removeAttribute('href')
    if(painelEscolhas === 'favoritos'){
        area.className = 'produtos favoritos-produtos'
        const lista = produtos.filter(produto => favoritos.has(identificarProduto(produto)))
        if(lista.length) lista.forEach(produto => area.appendChild(criarCard(produto)))
        else area.appendChild(estadoVazioEscolhas('Você ainda não tem favoritos. Toque no coração de uma peça para guardar suas escolhas.'))
    } else {
        area.className = 'itens-sacola'
        if(sacola.length === 0) area.appendChild(estadoVazioEscolhas('Sua sacola está vazia. Escolha um tamanho e adicione suas peças favoritas para consultar um orçamento.'))
        sacola.forEach((item, indice) => {
            const produto = produtosPorId.get(item.id)
            const linha = document.createElement('article')
            linha.className = 'item-sacola'
            const imagem = document.createElement('img')
            imagem.src = produto.imagem
            imagem.alt = produto.nome
            imagem.loading = 'lazy'
            const detalhes = document.createElement('div')
            const nome = document.createElement('h3')
            nome.textContent = produto.nome
            const descricao = document.createElement('p')
            descricao.textContent = produto.categoria + ' · ' + (item.tamanho === null ? 'Tamanho a consultar' : 'Tamanho ' + item.tamanho)
            const disponivel = estaDisponivel(produto)
            const valores = obterPrecos(produto)
            const subtotal = document.createElement('p')
            subtotal.className = 'subtotal-sacola'
            subtotal.textContent = !disponivel ? 'Remova esta peça da sacola para continuar o pedido.' : valores
                ? (valores.promocional !== null ? 'Black Friday · ' : '') + moeda(valores.atual) + ' cada · Subtotal: ' + moeda(valores.atual * item.quantidade)
                : 'Consultar preço'
            const quantidade = document.createElement('div')
            quantidade.className = 'quantidade-sacola'
            const menos = botaoItem('−', 'diminuir', indice, 'Diminuir quantidade de ' + produto.nome)
            menos.disabled = item.quantidade === 1 || !disponivel
            const valor = document.createElement('span')
            valor.textContent = 'Quantidade: ' + item.quantidade
            const mais = botaoItem('+', 'aumentar', indice, 'Aumentar quantidade de ' + produto.nome)
            mais.disabled = !disponivel
            quantidade.append(menos, valor, mais)
            detalhes.append(nome, descricao, criarPreco(produto), subtotal, quantidade, botaoItem('Remover', 'remover-item', indice, 'Remover ' + produto.nome + ' da sacola'))
            linha.append(imagem, detalhes)
            area.appendChild(linha)
        })
        if(sacola.length){
            const resumo = resumirSacola()
            const total = document.createElement('p')
            total.className = 'total-sacola'
            total.textContent = (resumo.consultar || resumo.indisponiveis ? 'Subtotal das peças com preço confirmado: ' : 'Total das peças: ') + moeda(resumo.total)
            if(resumo.consultar) total.textContent += ' · ' + resumo.consultar + ' peça(s) com preço a consultar, não incluídas no subtotal.'
            if(resumo.indisponiveis) total.textContent += ' · Remova as peças fora de venda para solicitar o orçamento.'
            area.appendChild(total)
            // Não permite enviar uma sacola com peças explicitamente indisponíveis.
            if(resumo.indisponiveis === 0) orcamento.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(criarMensagemSacola())
            orcamento.hidden = resumo.indisponiveis > 0
        }
    }
    if(estavaNoConteudo){
        const equivalente = [...area.querySelectorAll('button')].find(botao => botao.dataset.acao === acaoAnterior && (produtoAnterior ? botao.dataset.produto === produtoAnterior : botao.dataset.item === indiceAnterior) && !botao.disabled)
        ;(equivalente || area.querySelector('button:not(:disabled)') || document.querySelector('#fechar-escolhas')).focus({preventScroll: true})
    }
}

function abrirEscolhas(painel) {
    painelEscolhas = painel
    focoAnterior = document.activeElement
    dialogoEscolhas.classList.toggle('painel-favoritos', painel === 'favoritos')
    document.querySelector('#titulo-escolhas').textContent = painel === 'favoritos' ? 'Seus favoritos' : 'Sua sacola de orçamento'
    document.querySelector('#descricao-escolhas').textContent = painel === 'favoritos' ? 'Guarde as peças que você ama e escolha quais levar para a sacola.' : 'Selecione suas peças para consultar valores e disponibilidade. Adicionar à sacola não conclui uma compra.'
    renderizarEscolhas()
    if(!dialogoEscolhas.open) dialogoEscolhas.showModal()
    document.querySelector('#fechar-escolhas').focus()
}

/* 09. Vistos recentemente */

function validarRecentes(dados) {
    return [...new Set(dados.filter(id => typeof id === 'string' && produtosPorId.has(id)))].slice(0, limiteRecentes)
}

function registrarRecente(id) {
    if(!produtosPorId.has(id)) return
    const lista = [id, ...recentes.filter(anterior => anterior !== id)].slice(0, limiteRecentes)
    if(JSON.stringify(lista) === JSON.stringify(recentes)) return
    recentes = lista
    salvarPreferencia('evelinRecentes', recentes)
    renderizarRecentes()
}

function renderizarRecentes() {
    const area = document.querySelector('#produtos-recentes')
    const ativo = document.activeElement
    const card = ativo?.closest('#produtos-recentes .produto')
    const id = card?.dataset.produto
    const acao = ativo?.dataset.acao
    const tamanho = card?.querySelector('.tamanho-sacola')?.value
    const seletorAtivo = ativo?.classList.contains('tamanho-sacola')
    const whatsappAtivo = ativo?.matches('.botao-whatsapp')
    area.replaceChildren(...recentes.map(id => criarCard(produtosPorId.get(id))))
    document.querySelector('#recentes').hidden = recentes.length === 0
    if(card){
        const novo = [...area.children].find(card => card.dataset.produto === id)
        if(novo){
            const seletor = novo.querySelector('.tamanho-sacola')
            if(seletor) seletor.value = tamanho
            const controle = seletorAtivo ? novo.querySelector('.tamanho-sacola') : whatsappAtivo ? novo.querySelector('.botao-whatsapp') : [...novo.querySelectorAll('[data-acao]')].find(botao => botao.dataset.acao === acao)
            controle?.focus({preventScroll:true})
        }
    }
}

/* 10. Detalhe do produto */

function abrirDetalheProduto(id) {
    const produto = produtosPorId.get(id)
    if(!produto) return
    if(!dialogoDetalhe.open) focoDetalhe = document.activeElement
    document.querySelector('#titulo-detalhe').textContent = produto.nome
    document.querySelector('#conteudo-detalhe').replaceChildren(criarCard(produto, true))
    document.querySelector('#conteudo-detalhe .abrir-detalhe').disabled = true
    document.querySelector('#status-detalhe').textContent = ''
    renderizarRelacionados(produto)
    if(!dialogoDetalhe.open) dialogoDetalhe.showModal()
    document.querySelector('#fechar-detalhe').focus()
    registrarRecente(id)
}

function selecionarRelacionados(produto, limite = 3) {
    const proximas = {
        Vestidos: ['Conjuntos', 'Saias'], Blusas: ['Camisas', 'Blazers', 'Saias'],
        Saias: ['Blusas', 'Camisas'], Conjuntos: ['Vestidos', 'Blazers'],
        Camisas: ['Blusas', 'Blazers'], Blazers: ['Camisas', 'Conjuntos'], Outros: ['Blusas', 'Vestidos']
    }
    const prioridadeCategoria = p => p.categoria === produto.categoria ? 0 : proximas[produto.categoria]?.includes(p.categoria) ? 1 : 2
    return produtos.filter(p => identificarProduto(p) !== identificarProduto(produto))
        .sort((a,b) => prioridadeCategoria(a) - prioridadeCategoria(b) || Number(temEntregaRapida(b)) - Number(temEntregaRapida(a))).slice(0, limite)
}

function renderizarRelacionados(produto) {
    const area = document.querySelector('#produtos-relacionados')
    area.replaceChildren()
    selecionarRelacionados(produto).forEach(p => {
        const botao = document.createElement('button')
        botao.type = 'button'
        botao.className = 'produto-relacionado'
        botao.dataset.acao = 'detalhe'
        botao.dataset.produto = identificarProduto(p)
        botao.setAttribute('aria-label', 'Ver detalhes de ' + p.nome + (temEntregaRapida(p) ? ', entrega rápida' : ''))
        const imagem = document.createElement('img')
        imagem.src = p.imagem
        imagem.alt = p.nome
        imagem.loading = 'lazy'
        const nome = document.createElement('span')
        nome.textContent = p.nome
        botao.append(imagem, nome)
        if(temEntregaRapida(p)){
            const entrega = document.createElement('small')
            entrega.textContent = 'ENTREGA RÁPIDA'
            botao.appendChild(entrega)
        }
        area.appendChild(botao)
    })
}

/* 11. Compartilhamento e links públicos */

function slugProduto(produto) {
    const base = normalizarTexto(produto.nome).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const iguais = produtos.filter(p => normalizarTexto(p.nome).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === base)
    const variante = iguais.indexOf(produto)
    // Manter o primeiro link; variantes confirmadas têm link próprio, sem expor códigos internos.
    return variante > 0 ? base + '-' + (variante + 1) : base
}

function linkProduto(produto) {
    const url = new URL(location.href)
    url.search = ''
    url.hash = ''
    url.searchParams.set('produto', slugProduto(produto))
    return url.href
}

async function compartilharProduto(id) {
    const produto = produtosPorId.get(id)
    if(!produto) return
    registrarRecente(id)
    const dados = {title:'Evelin Boutique Delivery', text:'Olha esta peça da Evelin Boutique Delivery: ' + produto.nome, url:linkProduto(produto)}
    if(typeof navigator.share === 'function'){
        try { await navigator.share(dados); return }
        catch(erro){ if(erro.name === 'AbortError') return }
    }
    const mensagem = dados.text + '\n' + dados.url
    try {
        if(!navigator.clipboard?.writeText) throw new Error('Cópia indisponível')
        await navigator.clipboard.writeText(mensagem)
        avisarPreferencia('Link da peça copiado. Você pode enviá-lo para quem quiser.')
    } catch {
        window.prompt('Copie esta mensagem para compartilhar a peça:', mensagem)
    }
}

/* 12. Mensagens do WhatsApp */

function criarMensagem(produto) {

    if(!estaDisponivel(produto)) return ''

    let mensagem =
        `Olá! Tenho interesse no ${produto.nome}.`

    if(produto.tamanhos === null){

        mensagem +=
            ` Gostaria de consultar os tamanhos disponíveis.`

    } else {

        mensagem +=
            ` Vi que os tamanhos disponíveis são ${produto.tamanhos.join(', ')}.`
    }

    const valores = obterPrecos(produto)
    if(!valores){

        mensagem +=
            ` Também gostaria de consultar o preço e a disponibilidade.`

    } else {

        mensagem +=
            ` O valor ${valores.promocional !== null ? 'Black Friday (15% OFF)' : 'informado'} é ${moeda(valores.atual)}. Gostaria de consultar a disponibilidade.`
    }

    return mensagem
}

function criarMensagemSacola(itens = sacola) {
    if(resumirSacola(itens).indisponiveis > 0) return ''
    const linhas = itens.map(item => {
        const produto = produtosPorId.get(item.id)
        const valores = obterPrecos(produto)
        const preco = valores ? `${valores.promocional !== null ? 'Black Friday: ' : ''}${moeda(valores.atual)} cada; subtotal ${moeda(valores.atual * item.quantidade)}` : 'Consultar preço'
        return `${item.quantidade}x ${produto.nome} — ${item.tamanho === null ? 'tamanho a consultar' : 'tamanho ' + item.tamanho} — ${preco}`
    })
    const resumo = resumirSacola(itens)
    const total = (resumo.consultar ? 'Subtotal das peças com preço confirmado: ' : 'Total das peças: ') + moeda(resumo.total)
    const consulta = resumo.consultar ? '\nHá peças com preço a consultar, não incluídas no subtotal.' : ''
    return 'Olá! Tenho interesse nestas peças da Evelin Boutique Delivery:\n\n' + linhas.join('\n') + '\n\n' + total + consulta + '\nGostaria de confirmar os valores e a disponibilidade dessas peças.'
}

/* 13. Eventos — registrados uma única vez */

campoBusca.addEventListener('input', () => {
    textoBuscaAtual = campoBusca.value
    mostrarProdutos()
})
campoOrdem.addEventListener('change', () => {
    ordemAtual = campoOrdem.value
    mostrarProdutos()
})
campoTamanho.addEventListener('change', () => {
    tamanhoAtual = campoTamanho.value
    mostrarProdutos()
})
campoEntrega.addEventListener('change', () => {
    entregaAtual = campoEntrega.value
    mostrarProdutos()
})
campoPreco.addEventListener('change', () => {
    faixaPrecoAtual = campoPreco.value
    mostrarProdutos()
})
document.querySelector('#filtros-ativos').addEventListener('click', evento => {
    const botao = evento.target.closest('[data-remover-filtro]')
    if(!botao) return
    const tipo = botao.dataset.removerFiltro
    if(tipo === 'categoria') categoriaAtual = undefined
    if(tipo === 'busca') textoBuscaAtual = campoBusca.value = ''
    if(tipo === 'tamanho') tamanhoAtual = campoTamanho.value = ''
    if(tipo === 'entrega') entregaAtual = campoEntrega.value = ''
    if(tipo === 'preco') faixaPrecoAtual = campoPreco.value = ''
    if(tipo === 'novidades') somenteNovidadesAtual = document.querySelector('#filtro-novidades').checked = false
    if(tipo === 'black-friday') somenteBlackFridayAtual = document.querySelector('#filtro-black-friday').checked = false
    mostrarProdutos()
    document.querySelector('#filtros-ativos button')?.focus()
    if(document.querySelector('#filtros-ativos').hidden) document.querySelector('#limpar-filtros').focus()
})
document.querySelector('#filtro-novidades').addEventListener('change', evento => {
    somenteNovidadesAtual = evento.target.checked
    mostrarProdutos()
})
document.querySelector('#filtro-black-friday').addEventListener('change', evento => {
    somenteBlackFridayAtual = evento.target.checked
    mostrarProdutos()
})
botaoAbrirCatalogo.addEventListener('click', mostrarTodos)
document.querySelector('#ver-catalogo').addEventListener('click', mostrarTodos)
document.querySelector('#limpar-filtros').addEventListener('click', mostrarTodos)
document.querySelector('#ver-mais-produtos').addEventListener('click', () => {
    limiteVisivel += produtosPorLote
    mostrarProdutos(false)
})

document.querySelectorAll('a[href="#catalogo"]').forEach(link => {
    link.addEventListener('click', () => abrirCatalogo(false))
})

document.querySelector('#abrir-favoritos').addEventListener('click', () => abrirEscolhas('favoritos'))
document.querySelector('#abrir-sacola').addEventListener('click', () => abrirEscolhas('sacola'))
document.querySelector('#fechar-escolhas').addEventListener('click', () => dialogoEscolhas.close())
document.querySelector('#whatsapp-sacola').addEventListener('click', evento => {
    if(resumirSacola().indisponiveis === 0) return
    evento.preventDefault()
    renderizarEscolhas()
    avisarPreferencia('Remova as peças fora de venda para solicitar o orçamento.')
})
dialogoEscolhas.addEventListener('close', () => {
    painelEscolhas = ''
    focoAnterior?.focus({preventScroll: true})
})
// Uma delegação atende também os cards acrescentados pela paginação e os favoritos.
document.addEventListener('click', evento => {
    const link = evento.target.closest('.produto .botao-whatsapp')
    if(link){
        const id = link.closest('.produto').dataset.produto
        const produto = produtosPorId.get(id)
        if(!produto || !estaDisponivel(produto) || link.getAttribute('aria-disabled') === 'true'){ evento.preventDefault(); return }
        // Atualizar a faixa após a ação padrão do link, sem interromper o WhatsApp.
        setTimeout(() => registrarRecente(id), 0)
    }
    const botao = evento.target.closest('button[data-acao]')
    if(!botao || botao.disabled) return
    const acao = botao.dataset.acao
    if(acao === 'detalhe'){
        abrirDetalheProduto(botao.dataset.produto)
        return
    } else if(acao === 'compartilhar'){
        compartilharProduto(botao.dataset.produto)
        return
    } else if(acao === 'favorito'){
        const id = botao.dataset.produto
        if(!produtosPorId.has(id)) return
        if(favoritos.has(id)) favoritos.delete(id)
        else favoritos.add(id)
        salvarPreferencia('evelinFavoritos', [...favoritos])
        atualizarContadoresEscolhas()
        if(dialogoEscolhas.open && painelEscolhas === 'favoritos') renderizarEscolhas()
        registrarRecente(id)
    } else if(acao === 'adicionar-sacola'){
        const card = botao.closest('.produto')
        const id = card.dataset.produto
        const produto = produtosPorId.get(id)
        if(!estaDisponivel(produto)) return
        const seletor = card.querySelector('.tamanho-sacola')
        const tamanho = produto.tamanhos === null ? null : seletor.value
        if(!tamanhoValido(produto, tamanho)){
            seletor.reportValidity()
            seletor.focus()
            avisarPreferencia('Escolha um tamanho para adicionar esta peça à sacola.')
            return
        }
        const item = sacola.find(entrada => entrada.id === id && entrada.tamanho === tamanho)
        if(item){
            if(!Number.isSafeInteger(item.quantidade + 1)) return
            item.quantidade++
        } else sacola.push({id, tamanho, quantidade: 1})
        salvarPreferencia('evelinSacola', sacola)
        atualizarContadoresEscolhas()
        if(armazenamentoDisponivel) avisarPreferencia('Peça adicionada à sacola: ' + produto.nome + '.')
    } else if(['aumentar', 'diminuir', 'remover-item'].includes(acao)){
        const indice = Number(botao.dataset.item)
        if(!Number.isInteger(indice) || !sacola[indice]) return
        if(acao !== 'remover-item' && !estaDisponivel(produtosPorId.get(sacola[indice].id))) return
        if(acao === 'remover-item') sacola.splice(indice, 1)
        else if(acao === 'aumentar' && Number.isSafeInteger(sacola[indice].quantidade + 1)) sacola[indice].quantidade++
        else if(acao === 'diminuir' && sacola[indice].quantidade > 1) sacola[indice].quantidade--
        salvarPreferencia('evelinSacola', sacola)
        atualizarContadoresEscolhas()
        renderizarEscolhas()
    }
})
window.addEventListener('storage', evento => {
    if(evento.key !== null && !['evelinFavoritos', 'evelinSacola', 'evelinRecentes'].includes(evento.key)) return
    recentes = validarRecentes(lerPreferencia('evelinRecentes'))
    renderizarRecentes()
    favoritos = validarFavoritos(lerPreferencia('evelinFavoritos'))
    sacola = validarSacola(lerPreferencia('evelinSacola'))
    atualizarContadoresEscolhas()
    if(dialogoEscolhas.open) renderizarEscolhas()
})

// Manter a navegação de Tab dentro do detalhe, inclusive no fechamento do ciclo.
dialogoDetalhe.addEventListener('keydown', evento => {
    if(evento.key !== 'Tab') return
    const controles = [...dialogoDetalhe.querySelectorAll('button, a[href], select, input, [tabindex]')].filter(elemento => !elemento.disabled && elemento.tabIndex >= 0 && elemento.getClientRects().length)
    const primeiro = controles[0]
    const ultimo = controles.at(-1)
    if(evento.shiftKey && document.activeElement === primeiro){ evento.preventDefault(); ultimo?.focus() }
    else if(!evento.shiftKey && document.activeElement === ultimo){ evento.preventDefault(); primeiro?.focus() }
})
document.querySelector('#fechar-detalhe').addEventListener('click', () => dialogoDetalhe.close())
dialogoDetalhe.addEventListener('close', () => {
    if(focoDetalhe?.isConnected) focoDetalhe.focus({preventScroll:true})
    else if(dialogoEscolhas.open){
        document.querySelector('#fechar-escolhas').focus({preventScroll:true})
    } else {
        const id = document.querySelector('#conteudo-detalhe .produto')?.dataset.produto
        const card = [...document.querySelectorAll('#produtos-recentes .produto')].find(card => card.dataset.produto === id)
        card?.querySelector('.abrir-detalhe').focus({preventScroll:true})
    }
})
document.addEventListener('change', evento => {
    if(evento.target.matches('.produto .tamanho-sacola')) registrarRecente(evento.target.closest('.produto').dataset.produto)
})

/* 14. Inicialização */

document.querySelectorAll('.cta-quantidade').forEach(texto => {
    texto.textContent = `${produtos.length} peças no catálogo`
})

renderizarRecentes()
atualizarContadoresEscolhas()

campoTamanho.add(new Option('Todos os tamanhos', ''))
tamanhosDisponiveis.forEach(tamanho => campoTamanho.add(new Option(tamanho, tamanho)))
campoTamanho.add(new Option('Consultar tamanho', 'consultar'))

renderizarProdutos(document.querySelector('#produtos-novidades'), selecionarProdutos(undefined, '', true).sort((a, b) => a.ordemCatalogo - b.ordemCatalogo))
criarCategorias()
atualizarFiltrosCatalogo()
if(location.hash === '#catalogo') abrirCatalogo(false)

const slugSolicitado = new URLSearchParams(location.search).get('produto')
if(slugSolicitado){
    const encontrados = produtos.filter(produto => slugProduto(produto) === slugSolicitado)
    if(encontrados.length === 1){
        const produto = encontrados[0]
        mostrarTodos()
        campoBusca.value = produto.nome
        textoBuscaAtual = produto.nome
        mostrarProdutos()
        const card = [...document.querySelectorAll('#produtos-catalogo .produto')].find(card => card.dataset.produto === identificarProduto(produto))
        card?.querySelector('.abrir-detalhe').focus({preventScroll:true})
        abrirDetalheProduto(identificarProduto(produto))
    }
}

/* 15. Header recolhível em celular e tablet */

function inicializarHeaderMobile() {
    const cabecalho = document.querySelector('header')
    const conteudo = document.querySelector('#conteudo-header')
    const controle = document.querySelector('#alternar-header')
    const media = matchMedia('(max-width: 1000px)')
    let recolhido = false
    let inicioToque = null

    function atualizarAltura() {
        if(media.matches){
            document.documentElement.style.setProperty('--altura-header-mobile', Math.ceil(cabecalho.getBoundingClientRect().height) + 'px')
        } else {
            document.documentElement.style.removeProperty('--altura-header-mobile')
        }
    }

    function definirRecolhido(valor) {
        valor = media.matches && valor
        if(valor && document.querySelector('dialog[open]')) return
        if(valor && conteudo.contains(document.activeElement)) controle.focus({preventScroll: true})
        recolhido = valor
        cabecalho.classList.toggle('header-recolhido', valor)
        conteudo.inert = valor
        if(valor) conteudo.setAttribute('aria-hidden', 'true')
        else conteudo.removeAttribute('aria-hidden')
        controle.setAttribute('aria-expanded', String(!valor))
        controle.setAttribute('aria-label', valor ? 'Expandir menu' : 'Recolher menu')
        controle.querySelector('.indicador-header').textContent = valor ? '↓' : '↑'
        atualizarAltura()
    }

    function atualizarBreakpoint() {
        const focoNoControle = document.activeElement === controle
        inicioToque = null
        cabecalho.classList.toggle('header-recolhivel', media.matches)
        controle.hidden = !media.matches
        definirRecolhido(false)
        if(!media.matches && focoNoControle) conteudo.querySelector('nav a')?.focus({preventScroll: true})
        atualizarAltura()
    }

    controle.addEventListener('click', () => definirRecolhido(!recolhido))

    // Observa somente gestos iniciados no header; o navegador mantém o scroll nativo.
    cabecalho.addEventListener('touchstart', evento => {
        inicioToque = null
        if(!media.matches || evento.touches.length !== 1 || document.querySelector('dialog[open]')) return
        const toque = evento.touches[0]
        inicioToque = {id: toque.identifier, x: toque.clientX, y: toque.clientY, recolhido}
    }, {passive: true})

    cabecalho.addEventListener('touchmove', evento => {
        if(evento.touches.length !== 1) inicioToque = null
    }, {passive: true})

    cabecalho.addEventListener('touchend', evento => {
        const inicio = inicioToque
        inicioToque = null
        if(!inicio || !media.matches || inicio.recolhido !== recolhido) return
        const toque = [...evento.changedTouches].find(t => t.identifier === inicio.id)
        if(!toque) return
        const dx = toque.clientX - inicio.x
        const dy = toque.clientY - inicio.y
        if(Math.abs(dy) < 50 || Math.abs(dy) < Math.abs(dx) * 1.5) return
        if(dy < 0 && !recolhido) definirRecolhido(true)
        else if(dy > 0 && recolhido) definirRecolhido(false)
    }, {passive: true})

    cabecalho.addEventListener('touchcancel', () => { inicioToque = null }, {passive: true})
    media.addEventListener('change', atualizarBreakpoint)
    if(typeof ResizeObserver === 'function'){
        new ResizeObserver(atualizarAltura).observe(cabecalho)
    } else {
        window.addEventListener('resize', atualizarAltura, {passive: true})
        conteudo.addEventListener('transitionend', atualizarAltura)
    }
    atualizarBreakpoint()
}

inicializarHeaderMobile()
