# Evelin Boutique Delivery

Catálogo online de moda feminina, com atendimento e pedidos pelo WhatsApp.

## Estado atual

- **260 produtos** em **7 categorias**: Vestidos, Blusas, Saias, Conjuntos, Camisas, Blazers e Outros.
- **9 novidades** na home: três vestidos, três blusas e três saias.
- O catálogo completo começa fechado, sem renderizar seus produtos na entrada do site.
- O CTA **Explorar catálogo completo** abre o catálogo e mostra a quantidade disponível, calculada a partir dos dados.

## Funcionalidades

- Busca por nome e categoria, ignorando acentos e maiúsculas/minúsculas e encontrando por início de palavra.
- Categorias e filtros dinâmicos, gerados a partir dos produtos; busca e filtro podem ser combinados.
- Ordenação pela seleção da boutique, por nome A–Z ou Z–A.
- Paginação incremental de **24 produtos** pelo botão **Ver mais produtos**.
- Contador total de resultados e indicador da quantidade exibida; busca, filtros e ordenação reiniciam a paginação.
- Estados para nenhum resultado e limpeza dos filtros.
- Cards com imagem, nome, tamanhos conhecidos, consulta de preço e etiqueta **Novo** nas novidades.
- Integração com WhatsApp com nome do produto, tamanhos conhecidos e consulta de preço e disponibilidade.
- Layout responsivo para desktop, tablet e celular, imagens proporcionais e carregamento lazy nos cards.
- Seções de apresentação, novidades, categorias, catálogo, Sobre e Contato, além do botão voltar ao topo.

## Tecnologias e estrutura

O site usa **HTML, CSS e JavaScript puro**, sem backend ou banco de dados.

- `index.html`: estrutura da página.
- `style.css`: identidade visual, layout e responsividade.
- `script.js`: array de produtos, cards, busca, filtros, ordenação, paginação e WhatsApp.
- `assets/imagens/produtos/`: imagens finais e fontes preservadas para recortes.
- `verificacao/`: relatórios, manifestos, capturas e ferramentas auxiliares.

Os preços de venda atuais são `null`; os cards exibem **Consultar preço**. Valores do fornecedor registrados nos relatórios servem apenas para conferência e não são preços de venda.

## Publicação

O projeto é estático e compatível com **GitHub Pages**. A publicação pode servir os arquivos HTML, CSS, JavaScript e imagens diretamente, sem etapa de compilação. Alterações locais dependem de commit, push e da configuração de publicação do repositório para aparecerem no site publicado.

## Manutenção e verificação

Consulte `AGENTS.md` antes de modificar o projeto. Não invente dados de produtos nem altere o WhatsApp sem autorização.

Os relatórios desta expansão estão em `verificacao/expansao-completa/`. As ferramentas auxiliares documentam os processos de importação, recorte e teste; scripts específicos de uma rodada exigem conferência antes de reutilização em um catálogo atualizado.

O teste `verificacao/testar-site.mjs` usa Node.js e Chrome e verifica dados, imagens, busca, filtros, ordenação, paginação, WhatsApp e telas de 1440, 768 e 390 px. Sua execução normal gera evidências na pasta de verificação.
