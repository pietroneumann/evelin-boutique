# Evelin Boutique Delivery

Catálogo web de moda feminina desenvolvido com **HTML, CSS e JavaScript puro**. O projeto permite explorar produtos, pesquisar e filtrar peças, salvar favoritos, montar uma sacola de orçamento e entrar em contato pelo WhatsApp.

🌐 **Demonstração:** https://pietroneumann.github.io/evelin-boutique/

## Sobre o projeto

A Evelin Boutique Delivery foi desenvolvida como um catálogo responsivo para facilitar a descoberta de peças e o contato com a loja.

O site funciona sem framework e sem backend, utilizando JavaScript para controlar o catálogo, filtros, favoritos, sacola, produtos vistos recentemente e outras interações da interface.

## Funcionalidades

- Catálogo com **260 produtos** distribuídos em **7 categorias**.
- Seção de **novidades** com produtos em destaque.
- Busca por nome e categoria, sem diferenciação entre letras maiúsculas/minúsculas e acentos.
- Filtro por categoria e tamanho.
- Ordenação de produtos por nome **A–Z** e **Z–A**.
- Paginação incremental com carregamento de **24 produtos por vez**.
- Sistema de **favoritos**.
- **Sacola de orçamento** com seleção de tamanho e quantidade.
- Integração com **WhatsApp** para consultar produtos e solicitar orçamento.
- Seção de **produtos vistos recentemente**.
- Modal com **detalhes do produto**.
- Compartilhamento de produtos por link e recursos nativos do navegador quando disponíveis.
- Persistência de favoritos, sacola e itens recentes usando **localStorage**.
- Imagens com **lazy loading**.
- Layout responsivo para **desktop, tablet e celular**.
- Cuidados de acessibilidade, como labels, foco visível e navegação por teclado em diferentes componentes.

## Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **Git**
- **GitHub**
- **GitHub Pages**

## Estrutura do projeto

```text
evelin-boutique/
├── assets/
│   └── imagens/
├── index.html
├── script.js
├── style.css
└── README.md
```

### Arquivos principais

- `index.html` — estrutura e conteúdo da página.
- `style.css` — identidade visual, responsividade e estilos dos componentes.
- `script.js` — catálogo, busca, filtros, favoritos, sacola, produtos recentes e integrações.
- `assets/imagens/` — imagens utilizadas no site.

## Conceitos praticados

Durante o desenvolvimento do projeto foram aplicados conceitos como:

- Manipulação do **DOM**.
- Eventos em JavaScript.
- Arrays e objetos.
- Métodos de arrays como `map()`, `filter()`, `find()`, `some()` e `every()`.
- `Set` e `Map`.
- Estado da interface.
- `localStorage` e JSON.
- Criação dinâmica de elementos HTML.
- Delegação de eventos.
- Manipulação de URLs.
- Web Share API e Clipboard API.
- Responsividade.
- Acessibilidade e gerenciamento de foco.

## Limitações atuais

- O projeto não possui backend ou banco de dados.
- Não possui login ou autenticação.
- Não realiza pagamentos online.
- Preços, estoque e disponibilidade são consultados diretamente com a loja pelo WhatsApp.
- Favoritos, sacola e produtos recentes ficam armazenados apenas no navegador do usuário.

## Autor

**Pietro Klaoss Neumann**

- GitHub: https://github.com/pietroneumann
- LinkedIn: https://www.linkedin.com/in/pietroneumann/
