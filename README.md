# Evelin Boutique Delivery — V2

Catálogo de moda feminina para descobrir peças, guardar escolhas e solicitar um orçamento pelo WhatsApp. O projeto usa **HTML, CSS e JavaScript puro**, sem framework, backend ou pagamento online.

## Catálogo

- **260 produtos** em **7 categorias**: Vestidos, Blusas, Saias, Conjuntos, Camisas, Blazers e Outros.
- **9 novidades** na home: três vestidos, três blusas e três saias.
- Catálogo completo inicialmente fechado, sem renderizar seus produtos; CTA **Explorar catálogo completo** com quantidade dinâmica.
- Busca por nome e categoria, sem distinção de acentos ou maiúsculas/minúsculas, por início de palavra.
- Categorias dinâmicas e filtro por tamanho, combináveis com busca e ordenação.
- Seleção da boutique e ordenação por nome **A–Z / Z–A**.
- Paginação incremental de **24 produtos**, contador total e quantidade exibida. Alterar filtros, busca ou ordenação reinicia o lote; **Limpar filtros** restaura a seleção inicial.
- Imagens proporcionais com lazy loading, tamanhos conhecidos, **Consultar preço** e etiqueta **Novo** nas novidades.

## Escolhas e atendimento

- **Favoritos**: guardar/remover peças e consultar um painel próprio.
- **Sacola de orçamento**: escolher um tamanho, agrupar peças por produto/tamanho, ajustar quantidades e remover itens. Adicionar não conclui uma compra.
- **WhatsApp individual e coletivo**: mensagens com nomes, tamanhos conhecidos e consulta de valores/disponibilidade. Sem preços do fornecedor ou referências internas na mensagem.
- **Vistos recentemente**: até 8 peças, sem repetição, mais recente primeiro; faixa horizontal acessível por toque e teclado. Registra abertura de detalhe, favorito, escolha de tamanho, adição à sacola, WhatsApp e compartilhamento; rolar a página não registra visualizações.
- **Detalhe do produto**: toque na imagem para ampliar e usar as mesmas ações; painel com fechamento, Escape e retorno do foco.
- **Compartilhar**: Web Share quando disponível; fallback de cópia da mensagem/link e cópia manual se a área de transferência estiver bloqueada. Links `?produto=nome-da-peca` localizam e abrem o detalhe, sem códigos internos.
- Favoritos, sacola e recentes usam respectivamente `evelinFavoritos`, `evelinSacola` e `evelinRecentes` no localStorage. Armazenam identificadores, não objetos completos; a sacola inclui tamanho e quantidade. Dados inválidos são ignorados; bloqueio de armazenamento permite continuar na sessão.

## Dados e interface

Os objetos possuem `nome`, `codigoFornecedor`, `categoria`, `preco`, `tamanhos`, `cores`, `novidade` e `imagem`. `codigoFornecedor` é string quando confirmado, com zeros à esquerda preservados, e `null` quando desconhecido; é um dado interno e não aparece nos cards. Identificadores usam código único ou a combinação categoria/nome/imagem.

Todos os preços de venda são `null`. Preços do fornecedor nos relatórios servem somente para conferência. Nenhum tamanho, cor, referência ou valor deve ser inventado.

Layout responsivo para desktop, tablet e celular; identidade rosada/bege, apresentação, novidades, categorias, catálogo, Sobre, Contato e footer preservados. Controles possuem labels, foco visível e ações por botões/links adequados.

## Tecnologias e estrutura

- `index.html`: estrutura, controles e painéis nativos.
- `style.css`: identidade visual, cards, painéis e responsividade.
- `script.js`: produtos, catálogo, filtros, ordenação, paginação, escolhas e WhatsApp.
- `assets/imagens/produtos/`: imagens finais e originais necessários para revisão de recortes.
- `verificacao/`: relatórios, manifestos, capturas e ferramentas auxiliares.
- `verificacao/v2-final/`: resultados, revisão de ambiguidades e imagens e capturas desta rodada.

## Publicação e manutenção

Projeto estático compatível com **GitHub Pages**, sem compilação. A publicação depende da configuração do repositório e do envio das alterações aprovadas. Consulte `AGENTS.md` antes de modificar o projeto.

`node verificacao/testar-v2-final.mjs` executa a regressão com Node.js e Google Chrome: dados, 260 imagens, busca, filtros, ordenação, paginação, favoritos, sacola, recentes, detalhe, WhatsApp e telas de 1440/768/390 px. Os testes de Web Share/clipboard usam simulação das APIs no navegador de teste; o seletor nativo de compartilhamento deve ser conferido em celular real. Evidências novas ficam em `verificacao/v2-final/`, preservando relatórios anteriores.

`node verificacao/revisar-ambiguos-v2.mjs` revisa os 104 casos a partir dos registros locais. `verificacao/revisar-imagens-v2.ps1` monta painéis proporcionais das imagens pendentes, sem alterar os arquivos dos produtos. Ferramentas de importações antigas exigem conferência antes de reutilização.

## Limitações atuais

- Sem login, autenticação, backend, painel administrativo ou banco de dados.
- Sem checkout ou pagamento online; preços, estoque e disponibilidade são consultados via WhatsApp.
- Escolhas salvas no navegador/dispositivo; não há sincronização entre dispositivos. Limpar dados do site remove essas escolhas.
- Armazenamento bloqueado mantém escolhas apenas na sessão; alterações simultâneas entre abas podem substituir o último estado salvo.
- Links compartilhados dependem de preservar o nome da peça; mudanças futuras de identidade exigem migração das preferências.
- Compartilhamento e cópia dependem do suporte e das permissões do navegador.
- A fila de produtos ambíguos e as imagens com enquadramento/resolução limitada continuam documentadas para revisão humana. Nenhum desses candidatos foi importado nesta rodada.
