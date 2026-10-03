/* 01. Dados dos produtos — informações confirmadas */

let produtos = [

    /* =========================
       VESTIDOS
    ========================= */

    {
        nome: 'Vestido Clarissa',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-clarissa.jpeg',
    },

    {
        nome: 'Vestido Mariel',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-mariel.jpg',
    },

    {
        nome: 'Vestido Gleide',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: true,
        imagem: 'assets/imagens/produtos/vestido-gleide.jpg',
    },

    {
        nome: 'Vestido Mariana',
        codigoFornecedor: "01367",
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: true,
        imagem: 'assets/imagens/produtos/vestido-mariana.jpg',
    },

    {
        nome: 'Vestido Karol',
        codigoFornecedor: "01416",
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['P', 'M', 'G'],
        cores: null,
        novidade: true,
        imagem: 'assets/imagens/produtos/vestido-karol.jpg',
    },

    {
        nome: 'Vestido Ana',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['P', 'M'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-ana.jpg',
    },

    {
        nome: 'Vestido Camily',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-camily.jpg',
    },

    {
        nome: 'Vestido Stella',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['PP', 'P', 'M', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-stella.jpg',
    },

    {
        nome: 'Vestido Priscila',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-priscila.jpg',
    },

    {
        nome: 'Vestido Sindy',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-sindy.jpg',
    },


    {
        nome: 'Vestido Clara',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-clara.jpg',
    },

    {
        nome: 'Vestido Grace',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-grace.jpg',
    },

    {
        nome: 'Vestido Lais',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['P', 'M'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-lais.jpg',
    },

    {
        nome: 'Vestido Julieta',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-julieta.jpg',
    },

    {
        nome: 'Vestido Dinah',
        codigoFornecedor: null,
        categoria: 'Vestidos',
        preco: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/vestido-dinah.jpg',
    },

    {
        nome: "Vestido Tamara",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-tamara.jpg",
    },

    {
        nome: "Vestido Janete",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-janete.jpg",
    },

    {
        nome: "Vestido Cecy",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-cecy.jpg",
    },

    {
        nome: "Vestido Malu",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-malu.jpg",
    },

    {
        nome: "Vestido Carla",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-carla.jpg",
    },

    {
        nome: "Vestido Lenita",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-lenita.jpg",
    },

    {
        nome: "Vestido Thaila",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-thaila.jpg",
    },

    {
        nome: "Vestido Jennifer",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jennifer.jpg",
    },

    {
        nome: "Vestido Carolina",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-carolina.jpg",
    },

    {
        nome: "Vestido Suzete",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-suzete.jpg",
    },

    {
        nome: "Vestido Emília",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-emilia.jpg",
    },

    {
        nome: "Vestido Laila",
        codigoFornecedor: "01404",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-laila.jpg",
    },

    {
        nome: "Vestido Analise",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-analise.jpg",
    },

    {
        nome: "Vestido Gildete",
        codigoFornecedor: "01391",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-gildete.jpg",
    },

    {
        nome: "Vestido Nicole",
        codigoFornecedor: "01419",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-nicole.jpg",
    },

    {
        nome: "Vestido Tamires",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-tamires.jpg",
    },

    {
        nome: "Vestido Aquila",
        codigoFornecedor: "01046",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-aquila.jpg",
    },

    {
        nome: "Vestido Jade",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jade.jpg",
    },

    {
        nome: "Vestido Gislaine",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-gislaine.jpg",
    },

    {
        nome: "Vestido Solange",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-solange.jpg",
    },

    {
        nome: "Vestido Úrsula",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["50"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-ursula.jpg",
    },

    {
        nome: "Vestido Maitê",
        codigoFornecedor: "01049",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-maite.jpg",
    },

    {
        nome: "Vestido Anne",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-anne.png",
    },

    {
        nome: "Vestido Lorena",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-lorena.jpg",
    },

    {
        nome: "Vestido Jordana",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jordana.jpg",
    },

    {
        nome: "Vestido Sandra",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-sandra.jpg",
    },

    {
        nome: "Vestido Joana",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-joana.jpg",
    },

    {
        nome: "Vestido Juliana",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-juliana.jpg",
    },

    {
        nome: "Vestido Marion",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-marion.jpg",
    },

    {
        nome: "Vestido Jaqueline",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jaqueline.jpg",
    },

    {
        nome: "Vestido Ayla",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-ayla.jpg",
    },

    {
        nome: "Vestido Zuleica",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-zuleica.jpg",
    },

    {
        nome: "Vestido Olga",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-olga.jpg",
    },

    {
        nome: "Vestido Alexa",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-alexa.jpg",
    },

    {
        nome: "Vestido Composé Rafaela",
        codigoFornecedor: "01183",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-compose-rafaela.jpg",
    },

    {
        nome: "Vestido Adele",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-adele.jpg",
    },

    {
        nome: "Vestido Leonora",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-leonora.jpg",
    },

    {
        nome: "Vestido Salete",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-salete.jpg",
    },

    {
        nome: "Vestido Roberta",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-roberta.jpg",
    },

    {
        nome: "Vestido Julia",
        codigoFornecedor: "01057",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-julia.png",
    },

    {
        nome: "Vestido Rebeca",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-rebeca.jpg",
    },

    {
        nome: "Vestido Hortência",
        codigoFornecedor: "01224",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","GG","EXG","48","50"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-hortencia.jpg",
    },

    {
        nome: "Vestido Lavinia",
        codigoFornecedor: "01113",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-lavinia.jpg",
    },

    {
        nome: "Vestido Estela",
        codigoFornecedor: "01221",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-estela.jpg",
    },

    {
        nome: "Vestido Dandara",
        codigoFornecedor: "01168",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-dandara.jpg",
    },

    {
        nome: "Vestido Tânia",
        codigoFornecedor: "01102",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-tania.png",
    },

    {
        nome: "Vestido Paloma",
        codigoFornecedor: "01174",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-paloma.jpg",
    },

    {
        nome: "Vestido Jessica",
        codigoFornecedor: "01254",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-jessica.png",
    },

    {
        nome: "Vestido Leia",
        codigoFornecedor: "01035",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-leia.jpg",
    },

    {
        nome: "Vestido Celina",
        codigoFornecedor: "01201",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-celina.jpg",
    },

    {
        nome: "Vestido Liliane",
        codigoFornecedor: "01285",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-liliane.jpg",
    },

    {
        nome: "Vestido Cacilda",
        codigoFornecedor: "01162",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","48","50"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-cacilda.jpg",
    },

    {
        nome: "Vestido Telma",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-telma.jpg",
    },

    {
        nome: "Vestido Pamela",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-pamela.jpg",
    },

    {
        nome: "Vestido Gisele",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-gisele.jpg",
    },

    {
        nome: "Vestido Aurora",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-aurora.jpg",
    },

    {
        nome: "Vestido Sônia",
        codigoFornecedor: "01351",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-sonia.jpg",
    },

    {
        nome: "Vestido Letícia",
        codigoFornecedor: "01207",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-leticia.jpg",
    },

    {
        nome: "Vestido Emily",
        codigoFornecedor: "01289",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-emily.jpg",
    },

    {
        nome: "Vestido Vivien",
        codigoFornecedor: null,
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-vivien.jpg",
    },

    {
        nome: "Vestido Sofia",
        codigoFornecedor: "01415",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-sofia.jpg",
    },

    {
        nome: "Vestido Isadora",
        codigoFornecedor: "01336",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-isadora.jpg",
    },

    {
        nome: "Vestido Flora",
        codigoFornecedor: "01424",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-flora.jpg",
    },

    {
        nome: "Vestido Guta",
        codigoFornecedor: "01425",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-guta.jpg",
    },

    {
        nome: "Vestido Eliana",
        codigoFornecedor: "01364",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-eliana.jpg",
    },

    {
        nome: "Vestido Isaura",
        codigoFornecedor: "01257",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-isaura.jpg",
    },

    {
        nome: "Vestido Simône",
        codigoFornecedor: "01350",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-simone.jpg",
    },

    {
        nome: "Vestido Raquel",
        codigoFornecedor: "01342",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-raquel.jpg",
    },

    {
        nome: "Vestido Vera",
        codigoFornecedor: "01343",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-vera.jpg",
    },

    {
        nome: "Vestido Suzana",
        codigoFornecedor: "01361",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-suzana.jpg",
    },

    {
        nome: "Vestido Mayumi",
        codigoFornecedor: "01365",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-mayumi.jpg",
    },

    {
        nome: "Vestido Thaís",
        codigoFornecedor: "01360",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-thais.jpg",
    },

    {
        nome: "Vestido Edite",
        codigoFornecedor: "00479",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-edite.jpg",
    },

    {
        nome: "Vestido Joyce",
        codigoFornecedor: "01345",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-joyce.jpg",
    },

    {
        nome: "Vestido Geane",
        codigoFornecedor: "01092",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-geane.jpg",
    },

    {
        nome: "Vestido Sol",
        codigoFornecedor: "01281",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-sol.jpg",
    },

    {
        nome: "Vestido Thereza",
        codigoFornecedor: "01271",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-thereza.jpg",
    },

    {
        nome: "Vestido Elis",
        codigoFornecedor: "00954",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-elis.jpg",
    },

    {
        nome: "Vestido Kyara",
        codigoFornecedor: "01100",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-kyara.jpg",
    },

    {
        nome: "Vestido Elizabeth",
        codigoFornecedor: "01231",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-elizabeth.jpg",
    },

    {
        nome: "Vestido Silmara",
        codigoFornecedor: "00187",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-silmara.jpg",
    },

    {
        nome: "Vestido Fernanda",
        codigoFornecedor: "00964",
        categoria: "Vestidos",
        preco: null,
        tamanhos: ["P","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/vestido-fernanda.jpg",
    },

    /* =========================
       BLUSAS
    ========================= */

    {
        nome: 'Blusa Jussara',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-jussara.png',
    },

    {
        nome: 'Blusa Soraya',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['48', '50', '52', '54'],
        cores: null,
        novidade: true,
        imagem: 'assets/imagens/produtos/blusa-soraya.png',
    },

    {
        nome: 'Blusa Jêssica',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M'],
        cores: null,
        novidade: true,
        imagem: 'assets/imagens/produtos/blusa-jessica.png',
    },

    {
        nome: 'Blusa Katy',
        codigoFornecedor: "01397",
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['G', 'GG'],
        cores: null,
        novidade: true,
        imagem: 'assets/imagens/produtos/blusa-katy.png',
    },

    {
        nome: 'Blusa Adele',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-adele.png',
    },

    {
        nome: 'Blusa Sofia',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-sofia.png',
    },

    {
        nome: 'Blusa Charlote',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-charlote.png',
    },

    {
        nome: 'Blusa Emanuelly',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-emanuelly.png',
    },

    {
        nome: 'Blusa Helena',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['48', '50', '52', '54'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-helena.png',
    },


    {
        nome: 'Blusa Debora',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-debora.png',
    },

    {
        nome: 'Blusa Agatha',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-agatha.png',
    },

    {
        nome: 'Blusa Andreza',
        codigoFornecedor: "01101",
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-andreza.png',
    },

    {
        nome: 'Blusa Vera',
        codigoFornecedor: "00598",
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-vera.png',
    },

    {
        nome: 'Blusa Valentina',
        codigoFornecedor: null,
        categoria: 'Blusas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blusa-valentina.png',
    },

    {
        nome: "Blusa Kelly",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-kelly.png",
    },

    {
        nome: "Blusa Tânia",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-tania.png",
    },

    {
        nome: "Blusa Patrícia",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-patricia.png",
    },

    {
        nome: "Blusa Marta",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-marta.png",
    },

    {
        nome: "Blusa Guta",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-guta.png",
    },

    {
        nome: "Blusa Bruna",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-bruna.png",
    },

    {
        nome: "Blusa Melissa",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-melissa.png",
    },

    {
        nome: "Blusa Lenita",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lenita.png",
    },

    {
        nome: "Blusa Lavinia",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lavinia.png",
    },

    {
        nome: "Blusa Fabiola",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-fabiola.png",
    },

    {
        nome: "Blusa Catarina",
        codigoFornecedor: "01362",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-catarina.png",
    },

    {
        nome: "Blusa Yara",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-yara.png",
    },

    {
        nome: "Blusa Valesca",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-valesca.png",
    },

    {
        nome: "Blusa Lais",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lais.png",
    },

    {
        nome: "Blusa Mari",
        codigoFornecedor: "01294",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-mari.png",
    },

    {
        nome: "Blusa Andréia",
        codigoFornecedor: "01375",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-andreia.png",
    },

    {
        nome: "Blusa Lucilene",
        codigoFornecedor: "01252",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lucilene.png",
    },

    {
        nome: "Blusa Clara",
        codigoFornecedor: null,
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-clara.png",
    },

    {
        nome: "Blusa Solange",
        codigoFornecedor: "01272",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-solange.png",
    },

    {
        nome: "Blusa Bella",
        codigoFornecedor: "00424",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-bella.png",
    },

    {
        nome: "Blusa Fabiana",
        codigoFornecedor: "00699",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-fabiana.png",
    },

    {
        nome: "Blusa Alanis",
        codigoFornecedor: "01233",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-alanis.png",
    },

    {
        nome: "Blusa Iolanda Plus Size",
        codigoFornecedor: "01047",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["48","50","52","54"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-iolanda-plus-size.png",
    },

    {
        nome: "Blusa Rosana",
        codigoFornecedor: "01028",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["48","50","52","54"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-rosana.png",
    },

    {
        nome: "Blusa Jane",
        codigoFornecedor: "01376",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-jane.png",
    },

    {
        nome: "Blusa Elisa",
        codigoFornecedor: "01277",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-elisa.jpg",
    },

    {
        nome: "Blusa Cibele",
        codigoFornecedor: "01316",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-cibele.png",
    },

    {
        nome: "Blusa Cristiane",
        codigoFornecedor: "01192",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-cristiane.png",
    },

    {
        nome: "Blusa Paola",
        codigoFornecedor: "00873",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-paola.png",
    },

    {
        nome: "Blusa Ingrid",
        codigoFornecedor: "01213",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-ingrid.png",
    },

    {
        nome: "Blusa Priscila",
        codigoFornecedor: "01279",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-priscila.png",
    },

    {
        nome: "Blusa Edna",
        codigoFornecedor: "01261",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-edna.png",
    },

    {
        nome: "Blusa Pamela",
        codigoFornecedor: "01297",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-pamela.png",
    },

    {
        nome: "Blusa Leona",
        codigoFornecedor: "01292",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["M","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-leona.png",
    },

    {
        nome: "Blusa Carolina",
        codigoFornecedor: "01232",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-carolina.png",
    },

    {
        nome: "Blusa Thalita",
        codigoFornecedor: "00729",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-thalita.png",
    },

    {
        nome: "Blusa Rafaela",
        codigoFornecedor: "00994",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-rafaela.png",
    },

    {
        nome: "Blusa Daniele",
        codigoFornecedor: "00913",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-daniele.png",
    },

    {
        nome: "Blusa Jasmim",
        codigoFornecedor: "00909",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-jasmim.png",
    },

    {
        nome: "Blusa Camily",
        codigoFornecedor: "00866",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-camily.png",
    },

    {
        nome: "Blusa Marê",
        codigoFornecedor: "00707",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["M","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-mare.png",
    },

    {
        nome: "Blusa Betina",
        codigoFornecedor: "00675",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-betina.png",
    },

    {
        nome: "Blusa Marléia",
        codigoFornecedor: "01399",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-marleia.jpg",
    },

    {
        nome: "Blusa Sol",
        codigoFornecedor: "01157",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-sol.jpg",
    },

    {
        nome: "Blusa Isa",
        codigoFornecedor: "01118",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-isa.jpg",
    },

    {
        nome: "Blusa Otília",
        codigoFornecedor: "00046",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-otilia.jpg",
    },

    {
        nome: "Blusa Ludmila",
        codigoFornecedor: "00959",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-ludmila.jpg",
    },

    {
        nome: "Blusa Nayane",
        codigoFornecedor: "00388",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-nayane.jpg",
    },

    {
        nome: "Blusa Lucy",
        codigoFornecedor: "00028",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["PP"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-lucy.jpg",
    },

    {
        nome: "Blusa Paula",
        codigoFornecedor: "01369",
        categoria: "Blusas",
        preco: null,
        tamanhos: ["G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/blusa-paula.jpg",
    },

    /* =========================
       SAIAS
    ========================= */

    {
        nome: 'Saia Paula',
        codigoFornecedor: "00697",
        categoria: 'Saias',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-paula.png',
    },

    {
        nome: 'Saia Telma',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        tamanhos: ['48', '50', '52', '54'],
        cores: null,
        novidade: true,
        imagem: 'assets/imagens/produtos/saia-telma.png',
    },

    {
        nome: 'Saia Andréia',
        codigoFornecedor: "01234",
        categoria: 'Saias',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: true,
        imagem: 'assets/imagens/produtos/saia-andreia.png',
    },

    {
        nome: 'Saia Ema',
        codigoFornecedor: "01188",
        categoria: 'Saias',
        preco: null,
        tamanhos: ['PP', 'P', 'M', 'G'],
        cores: null,
        novidade: true,
        imagem: 'assets/imagens/produtos/saia-ema.png',
    },

    {
        nome: 'Saia Bela',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-bela.png',
    },

    {
        nome: 'Saia Melissa',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        tamanhos: ['PP', 'P'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-melissa.png',
    },

    {
        nome: 'Saia Samara',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        tamanhos: ['M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-samara.png',
    },

    {
        nome: 'Saia Graciela',
        codigoFornecedor: "01301",
        categoria: 'Saias',
        preco: null,
        tamanhos: ['M', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-graciela.png',
    },

    {
        nome: 'Saia Rosane Plus Size',
        codigoFornecedor: "00840",
        categoria: 'Saias',
        preco: null,
        tamanhos: ['48', '50', '52', '54'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-rosane-plus-size.png',
    },
    {
        nome: 'Saia Karen',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        tamanhos: ['G', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-karen.png',
    },

    {
        nome: 'Saia Luciana',
        codigoFornecedor: null,
        categoria: 'Saias',
        preco: null,
        tamanhos: ['P', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-luciana.png',
    },

    {
        nome: 'Saia Yamares',
        codigoFornecedor: "01155",
        categoria: 'Saias',
        preco: null,
        tamanhos: ['GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-yamares.jpg',
    },

    {
        nome: 'Saia Zelda',
        codigoFornecedor: "00483",
        categoria: 'Saias',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-zelda.jpg',
    },

    {
        nome: 'Saia Amanda',
        codigoFornecedor: "01052",
        categoria: 'Saias',
        preco: null,
        tamanhos: ['G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/saia-amanda.jpg',
    },

    {
        nome: "Saia Kelly",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-kelly.png",
    },

    {
        nome: "Saia Sueli",
        codigoFornecedor: "01180",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-sueli.png",
    },

    {
        nome: "Saia Alessandra",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["PP","P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-alessandra.png",
    },

    {
        nome: "Saia Katy",
        codigoFornecedor: "01396",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-katy.png",
    },

    {
        nome: "Saia Jéssica",
        codigoFornecedor: "00990",
        categoria: "Saias",
        preco: null,
        tamanhos: ["PP","P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-jessica.png",
    },

    {
        nome: "Saia Marjorie",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-marjorie.png",
    },

    {
        nome: "Saia Larissa",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-larissa.png",
    },

    {
        nome: "Saia Ester",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-ester.png",
    },

    {
        nome: "Saia Nataly",
        codigoFornecedor: "00168",
        categoria: "Saias",
        preco: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-nataly.jpg",
    },

    {
        nome: "Saia Yasmim",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-yasmim.png",
    },

    {
        nome: "Saia Gabriele",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-gabriele.png",
    },

    {
        nome: "Saia Tamires",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-tamires.png",
    },

    {
        nome: "Saia Nancy",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-nancy.png",
    },

    {
        nome: "Saia Nathalia",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-nathalia.jpg",
    },

    {
        nome: "Saia Thalia",
        codigoFornecedor: "01454",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-thalia.png",
    },

    {
        nome: "Saia Claudia",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-claudia.png",
    },

    {
        nome: "Saia Cibele",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-cibele.png",
    },

    {
        nome: "Saia Eliete",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-eliete.png",
    },

    {
        nome: "Saia Camila",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-camila.png",
    },

    {
        nome: "Saia Pamela",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-pamela.png",
    },

    {
        nome: "Saia Clara",
        codigoFornecedor: "00754",
        categoria: "Saias",
        preco: null,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-clara.png",
    },

    {
        nome: "Saia Perla",
        codigoFornecedor: "01082",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-perla.png",
    },

    {
        nome: "Saia Vilma",
        codigoFornecedor: "00696",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-vilma.png",
    },

    {
        nome: "Saia Eliz",
        codigoFornecedor: "01378",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-eliz.png",
    },

    {
        nome: "Saia Valentina",
        codigoFornecedor: "01348",
        categoria: "Saias",
        preco: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-valentina.png",
    },

    {
        nome: "Saia Celeste",
        codigoFornecedor: "01339",
        categoria: "Saias",
        preco: null,
        tamanhos: ["G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-celeste.png",
    },

    {
        nome: "Saia Breda",
        codigoFornecedor: "01136",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-breda.png",
    },

    {
        nome: "Saia Ruth",
        codigoFornecedor: "01230",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-ruth.png",
    },

    {
        nome: "Saia Gildete",
        codigoFornecedor: "00450",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-gildete.png",
    },

    {
        nome: "Saia Ayla",
        codigoFornecedor: "00797",
        categoria: "Saias",
        preco: null,
        tamanhos: ["G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-ayla.png",
    },

    {
        nome: "Saia Patrícia",
        codigoFornecedor: "00872",
        categoria: "Saias",
        preco: null,
        tamanhos: ["M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-patricia.png",
    },

    {
        nome: "Saia Jamily",
        codigoFornecedor: "00926",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-jamily.png",
    },

    {
        nome: "Saia Marieta",
        codigoFornecedor: "01112",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-marieta.jpg",
    },

    {
        nome: "Saia Meire",
        codigoFornecedor: "00137",
        categoria: "Saias",
        preco: null,
        tamanhos: ["P","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-meire.jpg",
    },

    {
        nome: "Saia Jussara",
        codigoFornecedor: null,
        categoria: "Saias",
        preco: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-jussara.jpg",
    },

    {
        nome: "Saia Reder",
        codigoFornecedor: "01310",
        categoria: "Saias",
        preco: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-reder.jpg",
    },

    {
        nome: "Saia Carla",
        codigoFornecedor: "00154",
        categoria: "Saias",
        preco: null,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/saia-carla.jpg",
    },

    /* CONJUNTOS */

    {
        nome: 'Conjunto Talita',
        codigoFornecedor: null,
        categoria: 'Conjuntos',
        preco: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-talita.jpg',
    },

    {
        nome: 'Conjunto Yara',
        codigoFornecedor: "01409",
        categoria: 'Conjuntos',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-yara.jpg',
    },

    {
        nome: 'Conjunto Eny',
        codigoFornecedor: null,
        categoria: 'Conjuntos',
        preco: null,
        tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-eny.jpg',
    },

    {
        nome: 'Conjunto Marina',
        codigoFornecedor: null,
        categoria: 'Conjuntos',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-marina.jpg',
    },

    {
        nome: 'Conjunto Cecilia',
        codigoFornecedor: null,
        categoria: 'Conjuntos',
        preco: null,
        tamanhos: ['G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/conjunto-cecilia.jpg',
    },

    {
        nome: "Conjunto Tamy",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-tamy.jpg",
    },

    {
        nome: "Conjunto Mayara",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-mayara.jpg",
    },

    {
        nome: "Conjunto Dandara",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-dandara.jpg",
    },

    {
        nome: "Conjunto Katharina",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-katharina.jpg",
    },

    {
        nome: "Conjunto Olivia",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-olivia.jpg",
    },

    {
        nome: "Conjunto Ludmila",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-ludmila.jpg",
    },

    {
        nome: "Conjunto Magnolia",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-magnolia.jpg",
    },

    {
        nome: "Conjunto Dione",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-dione.jpg",
    },

    {
        nome: "Conjunto Pamela",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-pamela.jpg",
    },

    {
        nome: "Conjunto Lena",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-lena.jpg",
    },

    {
        nome: "Conjunto Tiffany",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-tiffany.jpg",
    },

    {
        nome: "Conjunto Emma",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-emma.jpg",
    },

    {
        nome: "Conjunto Shirley",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-shirley.jpg",
    },

    {
        nome: "Conjunto Laura",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-laura.jpg",
    },

    {
        nome: "Conjunto Alanes",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-alanes.jpg",
    },

    {
        nome: "Conjunto Charlotte",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-charlotte.jpg",
    },

    {
        nome: "Conjunto Clara",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-clara.jpg",
    },

    {
        nome: "Conjunto Jeh",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-jeh.jpg",
    },

    {
        nome: "Conjunto Rafaela",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-rafaela.jpg",
    },

    {
        nome: "Conjunto Edite",
        codigoFornecedor: "01144",
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["M","G","GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-edite.jpg",
    },

    {
        nome: "Conjunto Ariane",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-ariane.jpg",
    },

    {
        nome: "Conjunto Evilyn",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-evilyn.jpg",
    },

    {
        nome: "Conjunto Nataly",
        codigoFornecedor: "01267",
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-nataly.png",
    },

    {
        nome: "Conjunto Lidia",
        codigoFornecedor: null,
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P","M"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-lidia.jpg",
    },

    {
        nome: "Conjunto Mariah",
        codigoFornecedor: "01392",
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-mariah.jpg",
    },

    {
        nome: "Conjunto Isabela",
        codigoFornecedor: "01401",
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["PP","P","M","G"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-isabela.jpg",
    },

    {
        nome: "Conjunto Larissa",
        codigoFornecedor: "01295",
        categoria: "Conjuntos",
        preco: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/conjunto-larissa.jpg",
    },

    /* CAMISAS */

    {
        nome: 'Camisa Maisa',
        codigoFornecedor: null,
        categoria: 'Camisas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-maisa.png',
    },

    {
        nome: 'Camisa Eugenia',
        codigoFornecedor: null,
        categoria: 'Camisas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-eugenia.png',
    },

    {
        nome: 'Camisa Beatriz',
        codigoFornecedor: null,
        categoria: 'Camisas',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-beatriz.png',
    },

    {
        nome: 'Camisa Jaqueline',
        codigoFornecedor: "01400",
        categoria: 'Camisas',
        preco: null,
        tamanhos: ['M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-jaqueline.png',
    },

    {
        nome: 'Camisa Relga',
        codigoFornecedor: null,
        categoria: 'Camisas',
        preco: null,
        tamanhos: ['GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/camisa-relga.png',
    },

    {
        nome: "Camisa Ludmila",
        codigoFornecedor: "01146",
        categoria: "Camisas",
        preco: null,
        tamanhos: ["P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/camisa-ludmila.png",
    },

    /* BLAZERS */

    {
        nome: 'Blazer Helena',
        codigoFornecedor: null,
        categoria: 'Blazers',
        preco: null,
        tamanhos: ['50'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/blazer-helena.png',
    },

    /* OUTROS */

    {
        nome: 'Chemise Beth',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        tamanhos: ['P', 'M', 'G'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/chemise-beth.jpg',
    },

    {
        nome: 'Salopete com blusa Luiza',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/salopete-com-blusa-luiza.jpg',
    },

    {
        nome: 'Sobretudo Tamires',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        tamanhos: ['P', 'M', 'G'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/sobretudo-tamires.jpg',
    },

    {
        nome: 'Sobretudo Michelle',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        tamanhos: ['P', 'M', 'G', 'GG', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/sobretudo-michelle.jpg',
    },

    {
        nome: 'Casaquinho Iolanda',
        codigoFornecedor: null,
        categoria: 'Outros',
        preco: null,
        tamanhos: ['P', 'EXG'],
        cores: null,
        novidade: false,
        imagem: 'assets/imagens/produtos/casaquinho-iolanda.png',
    },

    {
        nome: "Jardineira com Blusa Olivia",
        codigoFornecedor: "01186",
        categoria: "Outros",
        preco: null,
        tamanhos: ["EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/jardineira-com-blusa-olivia.jpg",
    },

    {
        nome: "Trijunto Julia",
        codigoFornecedor: null,
        categoria: "Outros",
        preco: null,
        tamanhos: ["PP","P","M","G","GG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/trijunto-julia.jpg",
    },

    {
        nome: "Tubinho Laura",
        codigoFornecedor: "01209",
        categoria: "Outros",
        preco: null,
        tamanhos: ["GG","EXG"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/tubinho-laura.jpg",
    },

    {
        nome: "T-Shirt Sara",
        codigoFornecedor: "00612",
        categoria: "Outros",
        preco: null,
        tamanhos: ["PP","P"],
        cores: null,
        novidade: false,
        imagem: "assets/imagens/produtos/t-shirt-sara.jpg",
    },
]

/* 02. Configuração, índices e referências do DOM */

const produtosPorLote = 24
const limiteRecentes = 8
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
const painelCatalogo = document.querySelector('#painel-catalogo')
const botaoAbrirCatalogo = document.querySelector('#abrir-catalogo')
const dialogoEscolhas = document.querySelector('#dialogo-escolhas')
const dialogoDetalhe = document.querySelector('#dialogo-produto')

/* 03. Estado da aplicação */

let categoriaAtual
let textoBuscaAtual = ''
let tamanhoAtual = ''
let ordemAtual = 'original'
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

function criarCard(produto) {

    let card = document.createElement('article')
    card.className = 'produto'
    card.dataset.produto = identificarProduto(produto)

    if(produto.novidade === true){

        let etiquetaNovo =
            document.createElement('span')

        etiquetaNovo.className =
            'etiqueta-novo'

        etiquetaNovo.textContent =
            'Novo'

        card.appendChild(
            etiquetaNovo
        )
    }   

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

    let preco = document.createElement('p')
    preco.className = 'preco'

    if(produto.preco === null){

        preco.textContent =
            'Consultar preço'

    } else {

        preco.textContent =
            `R$ ${formatarPreco(produto.preco)}`
    }

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
        `https://wa.me/5511971949711?text=${mensagemCodificada}`

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
    seletor.disabled = consulta
    seletor.required = !consulta
    if(!consulta) produto.tamanhos.forEach(tamanho => seletor.add(new Option(tamanho, tamanho)))
    const adicionar = document.createElement('button')
    adicionar.type = 'button'
    adicionar.className = 'adicionar-sacola'
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
    acoes.append(whatsapp, compartilhar)
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

function selecionarProdutos(categoria, textoBusca = '', somenteNovidades = false, tamanho = '') {
    const termos = normalizarTexto(textoBusca).split(/\s+/).filter(Boolean)
    return produtos.filter(produto => {
        if(somenteNovidades && produto.novidade !== true) return false
        if(categoria && produto.categoria !== categoria) return false
        if(tamanho === 'consultar'){
            if(produto.tamanhos !== null) return false
        } else if(tamanho && !produto.tamanhos?.includes(tamanho)) return false
        const palavras = normalizarTexto(produto.nome + ' ' + produto.categoria).split(/\s+/)
        return termos.every(termo => palavras.some(palavra => palavra.startsWith(termo)))
    })
}

function atualizarQuantidade(quantidade) {
    document.querySelector('#quantidade-produtos').textContent =
        quantidade === 1 ? '1 produto encontrado' : `${quantidade} produtos encontrados`
}

function mostrarProdutos(reiniciar = true) {
    if(reiniciar) limiteVisivel = produtosPorLote
    let lista = selecionarProdutos(categoriaAtual, textoBuscaAtual, false, tamanhoAtual)
    if(ordemAtual !== 'original'){
        lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
        if(ordemAtual === 'za') lista.reverse()
    }
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
            const quantidade = document.createElement('div')
            quantidade.className = 'quantidade-sacola'
            const menos = botaoItem('−', 'diminuir', indice, 'Diminuir quantidade de ' + produto.nome)
            menos.disabled = item.quantidade === 1
            const valor = document.createElement('span')
            valor.textContent = 'Quantidade: ' + item.quantidade
            quantidade.append(menos, valor, botaoItem('+', 'aumentar', indice, 'Aumentar quantidade de ' + produto.nome))
            detalhes.append(nome, descricao, quantidade, botaoItem('Remover', 'remover-item', indice, 'Remover ' + produto.nome + ' da sacola'))
            linha.append(imagem, detalhes)
            area.appendChild(linha)
        })
        if(sacola.length) orcamento.href = 'https://wa.me/5511971949711?text=' + encodeURIComponent(criarMensagemSacola())
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
    const tamanho = card?.querySelector('.tamanho-sacola').value
    const seletorAtivo = ativo?.classList.contains('tamanho-sacola')
    const whatsappAtivo = ativo?.matches('.botao-whatsapp')
    area.replaceChildren(...recentes.map(id => criarCard(produtosPorId.get(id))))
    document.querySelector('#recentes').hidden = recentes.length === 0
    if(card){
        const novo = [...area.children].find(card => card.dataset.produto === id)
        if(novo){
            novo.querySelector('.tamanho-sacola').value = tamanho
            const controle = seletorAtivo ? novo.querySelector('.tamanho-sacola') : whatsappAtivo ? novo.querySelector('.botao-whatsapp') : [...novo.querySelectorAll('[data-acao]')].find(botao => botao.dataset.acao === acao)
            controle?.focus({preventScroll:true})
        }
    }
}

/* 10. Detalhe do produto */

function abrirDetalheProduto(id) {
    const produto = produtosPorId.get(id)
    if(!produto) return
    focoDetalhe = document.activeElement
    document.querySelector('#titulo-detalhe').textContent = produto.nome
    document.querySelector('#conteudo-detalhe').replaceChildren(criarCard(produto))
    document.querySelector('#conteudo-detalhe .abrir-detalhe').disabled = true
    document.querySelector('#status-detalhe').textContent = ''
    if(!dialogoDetalhe.open) dialogoDetalhe.showModal()
    document.querySelector('#fechar-detalhe').focus()
    registrarRecente(id)
}

/* 11. Compartilhamento e links públicos */

function slugProduto(produto) {
    return normalizarTexto(produto.nome).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
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
    const dados = {title:'Evelin Boutique', text:'Olha esta peça da Evelin Boutique: ' + produto.nome, url:linkProduto(produto)}
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

    let mensagem =
        `Olá! Tenho interesse no ${produto.nome}.`

    if(produto.tamanhos === null){

        mensagem +=
            ` Gostaria de consultar os tamanhos disponíveis.`

    } else {

        mensagem +=
            ` Vi que os tamanhos disponíveis são ${produto.tamanhos.join(', ')}.`
    }

    if(produto.preco === null){

        mensagem +=
            ` Também gostaria de consultar o preço e a disponibilidade.`

    } else {

        mensagem +=
            ` O valor informado é R$ ${formatarPreco(produto.preco)}. Gostaria de consultar a disponibilidade.`
    }

    return mensagem
}

function criarMensagemSacola(itens = sacola) {
    const linhas = itens.map(item => {
        const produto = produtosPorId.get(item.id)
        return `${item.quantidade}x ${produto.nome} — ${item.tamanho === null ? 'tamanho a consultar' : 'tamanho ' + item.tamanho}`
    })
    return 'Olá! Tenho interesse nestas peças da Evelin Boutique:\n\n' + linhas.join('\n') + '\n\nGostaria de consultar os valores e a disponibilidade dessas peças.'
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
dialogoEscolhas.addEventListener('close', () => {
    painelEscolhas = ''
    focoAnterior?.focus({preventScroll: true})
})
// Uma delegação atende também os cards acrescentados pela paginação e os favoritos.
document.addEventListener('click', evento => {
    const link = evento.target.closest('.produto .botao-whatsapp')
    if(link){
        const id = link.closest('.produto').dataset.produto
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
    texto.textContent = `${produtos.length} peças disponíveis`
})

renderizarRecentes()
atualizarContadoresEscolhas()

campoTamanho.add(new Option('Todos os tamanhos', ''))
tamanhosDisponiveis.forEach(tamanho => campoTamanho.add(new Option(tamanho, tamanho)))
campoTamanho.add(new Option('Consultar tamanho', 'consultar'))

renderizarProdutos(document.querySelector('#produtos-novidades'), selecionarProdutos(undefined, '', true))
criarCategorias()
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
