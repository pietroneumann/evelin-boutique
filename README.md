# Evelin Boutique Delivery — V2

Catálogo de moda feminina para descobrir peças, guardar escolhas e solicitar um orçamento pelo WhatsApp. O projeto usa **HTML, CSS e JavaScript puro**, sem framework, backend ou pagamento online.

## Catálogo

- **387 produtos** em **7 categorias**: Vestidos, Blusas, Saias, Conjuntos, Camisas, Blazers e Outros.
- Coleção recente na home, atualmente com **11 novidades**, na ordem do catálogo. A seleção acompanha a sequência visual da coleção, sem limite fixo de peças.
- Catálogo completo inicialmente fechado, sem renderizar seus produtos; CTA **Explorar catálogo completo** com quantidade dinâmica.
- Busca por nome e categoria, sem distinção de acentos ou maiúsculas/minúsculas, por início de palavra.
- Categorias dinâmicas e filtros por tamanho, disponibilidade, faixa de preço, **Novidades** e **Black Friday**, combináveis com busca e ordenação. Os filtros mostram contagens e seleções ativas removíveis.
- Seleção da boutique e ordenação por nome **A–Z / Z–A** ou **menor / maior preço**. Produtos com preço a consultar ficam no fim das duas ordenações por preço.
- Paginação incremental de **24 produtos**, contador total e quantidade exibida. Alterar filtros, busca ou ordenação reinicia o lote; **Limpar filtros** restaura a seleção inicial.
- Imagens proporcionais com lazy loading, tamanhos conhecidos e etiquetas que permitem identificar novidades e promoções simultaneamente.

## Preços e Black Friday

- **15% OFF** nos produtos com preço confirmado: preço regular riscado, preço promocional em destaque e etiqueta **Black Friday**.
- **278 produtos** com preço promocional confirmado; **109 produtos** permanecem com **Consultar preço**, sem valores ou descontos fictícios.
- O filtro Black Friday mostra somente as ofertas com preço promocional válido, preservando a categoria de cada peça.
- A sacola e as mensagens do WhatsApp usam o preço promocional durante a campanha. Peças sem preço confirmado ficam identificadas separadamente e não entram no subtotal das peças com preço conhecido.

## Escolhas e atendimento

- **Favoritos**: guardar/remover peças e consultar um painel próprio.
- **Sacola de orçamento**: escolher um tamanho, agrupar peças por produto/tamanho, ajustar quantidades e remover itens. Adicionar não conclui uma compra.
- **WhatsApp individual e coletivo**: mensagens com nomes, tamanhos conhecidos, preços promocionais quando confirmados e consulta de disponibilidade.
- **Vistos recentemente**: até 8 peças, sem repetição, mais recente primeiro; faixa horizontal acessível por toque e teclado. Registra abertura de detalhe, favorito, escolha de tamanho, adição à sacola, WhatsApp e compartilhamento; rolar a página não registra visualizações.
- **Detalhe do produto**: toque na imagem para ampliar e usar as mesmas ações; painel com fechamento, Escape e retorno do foco.
- **Você também pode gostar**: sugestões no detalhe priorizam peças disponíveis da mesma categoria e de categorias relacionadas, sem repetir o produto aberto.
- **Compartilhar**: Web Share quando disponível; fallback de cópia da mensagem/link e cópia manual se a área de transferência estiver bloqueada. Links localizam e abrem o detalhe; variantes de mesmo nome possuem links próprios.
- Favoritos, sacola e recentes usam respectivamente `evelinFavoritos`, `evelinSacola` e `evelinRecentes` no localStorage. Armazenam identificadores, não objetos completos; a sacola inclui tamanho e quantidade. Dados inválidos são ignorados; bloqueio de armazenamento permite continuar na sessão.

## Dados e interface

Os dados dos produtos ficam no JavaScript. Informações desconhecidas são representadas por `null`; referências internas não são exibidas nos cards. Os identificadores dos produtos anteriores foram preservados para manter favoritos, sacola e recentes já salvos.

A disponibilidade é explícita em todos os produtos: atualmente **15 disponíveis e 372 indisponíveis**, definidos exclusivamente pela boutique. A presença de uma peça no fornecedor não define estoque. Peças indisponíveis continuam visíveis, com imagem acinzentada e identificação prioritária, preservando detalhes, busca e favoritos. Pedidos, adição à sacola e ajustes de quantidade ficam bloqueados, inclusive para itens em sacolas antigas. **Avise-me quando voltar** permite escolher um tamanho de interesse nos detalhes e solicitar aviso pelo WhatsApp, sem quantidade nem garantia de preço futuro. A página não representa estoque automático.

A seção **Como comprar** orienta o uso do catálogo, da sacola e do WhatsApp. O Instagram oficial é **[@contato.evelinboutique](https://www.instagram.com/contato.evelinboutique/)**, também acessível no cabeçalho, no contato e no rodapé.

Layout responsivo para desktop, tablet e celular; identidade rosada/bege, apresentação, novidades, categorias, catálogo, Sobre, Contato e footer preservados. Controles possuem labels, foco visível e ações por botões/links adequados.

## Tecnologias e estrutura

- `index.html`: estrutura, controles e painéis nativos.
- `style.css`: identidade visual, cards, painéis e responsividade.
- `script.js`: produtos, catálogo, filtros, ordenação, paginação, escolhas e WhatsApp.
- `assets/imagens/produtos/`: imagens utilizadas pelo catálogo.

## Publicação e manutenção

Projeto estático compatível com **GitHub Pages**, sem compilação. A publicação depende da configuração do repositório e do envio das alterações aprovadas. Consulte `AGENTS.md` antes de modificar o projeto.

## Limitações atuais

- Sem login, autenticação, backend, painel administrativo ou banco de dados.
- Sem checkout ou pagamento online; a confirmação do pedido e da disponibilidade acontece pelo WhatsApp.
- Escolhas salvas no navegador/dispositivo; não há sincronização entre dispositivos. Limpar dados do site remove essas escolhas.
- Armazenamento bloqueado mantém escolhas apenas na sessão; alterações simultâneas entre abas podem substituir o último estado salvo.
- Links compartilhados dependem de preservar o nome da peça; mudanças futuras de identidade exigem migração das preferências.
- Compartilhamento e cópia dependem do suporte e das permissões do navegador.
- Identificações ambíguas e imagens com enquadramento/resolução limitada ficam documentadas para revisão humana.
