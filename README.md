# Evelin Boutique Delivery — V2

Catálogo de moda feminina para descobrir peças, guardar escolhas e solicitar um orçamento pelo WhatsApp. O projeto usa **HTML, CSS e JavaScript puro**, sem framework, backend ou pagamento online.

## Catálogo

- **398 produtos** em **7 categorias**: Vestidos, Blusas, Saias, Conjuntos, Camisas, Blazers e Outros.
- Coleção **Magnific** na home, com **15 novidades únicas**, na ordem do catálogo. Peças reapresentadas usam o cadastro existente; modelos diferentes de mesmo nome têm links próprios.
- Catálogo completo inicialmente fechado, sem renderizar seus produtos; CTA **Explorar catálogo completo** com quantidade dinâmica.
- Busca por nome e categoria, sem distinção de acentos ou maiúsculas/minúsculas, por início de palavra.
- Categorias dinâmicas e filtros por tamanho, entrega rápida, faixa de preço, **Novidades** e **Black Friday**, combináveis com busca e ordenação. Os filtros mostram contagens e seleções ativas removíveis.
- Seleção da boutique e ordenação por nome **A–Z / Z–A** ou **menor / maior preço**. Produtos com preço a consultar ficam no fim das duas ordenações por preço.
- Paginação incremental de **24 produtos**, contador total e quantidade exibida. Alterar filtros, busca ou ordenação reinicia o lote; **Limpar filtros** restaura a seleção inicial.
- Imagens proporcionais com lazy loading, tamanhos conhecidos e etiquetas que permitem identificar novidades e promoções simultaneamente.

## Preços e Black Friday

- **15% OFF** nas peças participantes das coleções mais antigas: preço regular riscado, preço promocional em destaque e etiqueta **Black Friday**. A coleção atual e a imediatamente anterior ficam fora da promoção.
- **291 produtos** com preço regular confirmado, dos quais **266** participam da Black Friday; **107 produtos** permanecem com **Consultar preço**, sem valores ou descontos fictícios.
- O filtro Black Friday mostra somente as ofertas com preço promocional válido, preservando a categoria de cada peça.
- A sacola e as mensagens do WhatsApp usam o preço promocional durante a campanha. Peças sem preço confirmado ficam identificadas separadamente e não entram no subtotal das peças com preço conhecido.

## Escolhas e atendimento

- **Favoritos**: guardar/remover peças e consultar um painel próprio.
- **Sacola de orçamento**: escolher um tamanho, agrupar peças por produto/tamanho, ajustar quantidades e remover itens. Adicionar não conclui uma compra.
- **WhatsApp individual e coletivo**: mensagens com nomes, tamanhos conhecidos, preços promocionais quando confirmados e consulta de disponibilidade.
- **Vistos recentemente**: até 8 peças, sem repetição, mais recente primeiro; faixa horizontal acessível por toque e teclado. Registra abertura de detalhe, favorito, escolha de tamanho, adição à sacola, WhatsApp e compartilhamento; rolar a página não registra visualizações.
- **Detalhe do produto**: toque na imagem para ampliar e usar as mesmas ações; painel com fechamento, Escape e retorno do foco.
- **Você também pode gostar**: sugestões no detalhe priorizam a mesma categoria e categorias relacionadas, usando entrega rápida como desempate, sem repetir o produto aberto. Todas as peças recomendadas podem ser pedidas.
- **Compartilhar**: Web Share quando disponível; fallback de cópia da mensagem/link e cópia manual se a área de transferência estiver bloqueada. Links localizam e abrem o detalhe; variantes de mesmo nome possuem links próprios.
- Favoritos, sacola e recentes usam respectivamente `evelinFavoritos`, `evelinSacola` e `evelinRecentes` no localStorage. Armazenam identificadores, não objetos completos; a sacola inclui tamanho e quantidade. Dados inválidos são ignorados; bloqueio de armazenamento permite continuar na sessão.

## Dados e interface

Os dados dos produtos ficam no JavaScript. Informações desconhecidas são representadas por `null`; referências internas não são exibidas nos cards. Os identificadores dos produtos anteriores foram preservados para manter favoritos, sacola e recentes já salvos.

**Todos os 398 produtos podem ser comprados**, com tamanho quando conhecido, quantidade na sacola e pedido individual ou coletivo pelo WhatsApp. Todos possuem `disponivel: true`; esse campo fica reservado à permissão de compra, separada da entrega. Não há fluxo de reposição ou aviso de retorno nesta versão.

O campo independente `entregaRapida` define somente o benefício de entrega: **15 produtos** confirmados possuem `entregaRapida: true` e exibem o selo **ENTREGA RÁPIDA**; os **383 demais** possuem `entregaRapida: false`, continuam normalmente compráveis e não recebem selo de estado. Os filtros **Entrega rápida** e **Outros produtos** usam esse campo e contagens dinâmicas. Entrega rápida não muda preços, novidades ou Black Friday. Imagens continuam coloridas e itens salvos anteriormente na sacola são preservados, sem limpeza do localStorage. A confirmação do pedido e das condições de entrega acontece pelo atendimento; a página não representa estoque automático.

A seção **Como comprar** orienta o uso do catálogo, da sacola e do WhatsApp. O Instagram oficial é **[@contato.evelinboutique](https://www.instagram.com/contato.evelinboutique/)**, também acessível no cabeçalho, no contato e no rodapé.

Layout responsivo para desktop, tablet e celular; identidade rosada/bege, apresentação, novidades, categorias, catálogo, Sobre, Contato e footer preservados. Controles possuem labels, foco visível e ações por botões/links adequados.

## Tecnologias e estrutura

- `index.html`: estrutura, controles e painéis nativos.
- `style.css`: identidade visual, cards, painéis e responsividade.
- `script.js`: produtos, catálogo, filtros, ordenação, paginação, escolhas e WhatsApp.
- `assets/imagens/produtos/`: imagens utilizadas pelo catálogo.

## Publicação e manutenção

O nome oficial da loja é **Evelin Boutique Delivery** e seu domínio oficial é **[evelinboutiquedelivery.com.br](https://evelinboutiquedelivery.com.br/)**.

Projeto estático compatível com **GitHub Pages**, sem compilação. A publicação depende da configuração do repositório e do envio das alterações aprovadas. Consulte `AGENTS.md` antes de modificar o projeto.

## Limitações atuais

- Sem login, autenticação, backend, painel administrativo ou banco de dados.
- Sem checkout ou pagamento online; a confirmação do pedido e da disponibilidade acontece pelo WhatsApp.
- Escolhas salvas no navegador/dispositivo; não há sincronização entre dispositivos. Limpar dados do site remove essas escolhas.
- Armazenamento bloqueado mantém escolhas apenas na sessão; alterações simultâneas entre abas podem substituir o último estado salvo.
- Links compartilhados dependem de preservar o nome da peça; mudanças futuras de identidade exigem migração das preferências.
- Compartilhamento e cópia dependem do suporte e das permissões do navegador.
- Identificações ambíguas e imagens com enquadramento/resolução limitada ficam documentadas para revisão humana.
