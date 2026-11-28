# Evelin Boutique Delivery — V2

Catálogo de moda feminina para descobrir peças, guardar escolhas e solicitar um orçamento pelo WhatsApp. O projeto usa **HTML, CSS e JavaScript puro**, sem framework, backend ou pagamento online.

## Catálogo

- **409 produtos** em **7 categorias**: Vestidos, Blusas, Saias, Conjuntos, Camisas, Blazers e Outros.
- **27 novidades** dos dois lotes mais recentes: o lote técnico **lote-2026-11-28** e **Magnific**, sem limite fixo de peças. Peças reapresentadas usam o cadastro existente; modelos diferentes de mesmo nome têm links próprios.
- Catálogo completo inicialmente fechado, sem renderizar seus produtos; CTA **Explorar catálogo completo** com quantidade dinâmica.
- Busca por nome e categoria, sem distinção de acentos ou maiúsculas/minúsculas, por início de palavra.
- Categorias dinâmicas e filtros por tamanho, entrega rápida, faixa de preço, **Novidades** e **Black Friday**, combináveis com busca e ordenação. Os filtros mostram contagens e seleções ativas removíveis.
- Seleção da boutique e ordenação por nome **A–Z / Z–A** ou **menor / maior preço**. Produtos com preço a consultar ficam no fim das duas ordenações por preço.
- Paginação incremental de **24 produtos**, contador total e quantidade exibida. Alterar filtros, busca ou ordenação reinicia o lote; **Limpar filtros** restaura a seleção inicial.
- Imagens proporcionais com lazy loading, tamanhos conhecidos e etiquetas que permitem identificar novidades e promoções simultaneamente.

## Preços e Black Friday

- **15% OFF** nas peças participantes das coleções mais antigas: preço regular riscado, preço promocional em destaque e etiqueta **Black Friday**. A coleção atual e a imediatamente anterior ficam fora da promoção.
- **302 produtos** com preço regular confirmado, dos quais **275** participam da Black Friday; **107 produtos** permanecem com **Consultar preço**, sem valores ou descontos fictícios.
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

**Todos os 409 produtos podem ser comprados**, com tamanho quando conhecido, quantidade na sacola e pedido individual ou coletivo pelo WhatsApp. Todos possuem `disponivel: true`; esse campo fica reservado à permissão de compra, separada da entrega. Não há fluxo de reposição ou aviso de retorno nesta versão.

O campo independente `entregaRapida` define somente o benefício de entrega: **15 produtos** confirmados possuem `entregaRapida: true` e exibem o selo **ENTREGA RÁPIDA**; os **394 demais** possuem `entregaRapida: false`, continuam normalmente compráveis e não recebem selo de estado. Os filtros **Entrega rápida** e **Outros produtos** usam esse campo e contagens dinâmicas. Entrega rápida não muda preços, novidades ou Black Friday. Imagens continuam coloridas e itens salvos anteriormente na sacola são preservados, sem limpeza do localStorage. A confirmação do pedido e das condições de entrega acontece pelo atendimento; a página não representa estoque automático.

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

## Atualização automática do catálogo

**Automação semanal ativa:** toda **sexta-feira às 09:10**, no timezone **America/Sao_Paulo**, com cron `10 9 * * 5`. O workflow **Atualizar catálogo** (`.github/workflows/atualizar-catalogo.yml`) consulta o [catálogo público autorizado da Maria Amore](https://sites.google.com/view/mariaamorecatalogo/cat%C3%A1logo). A execução manual por `workflow_dispatch` continua disponível. O GitHub pode atrasar o início das execuções; o horário configurado não é garantia de início exato.

Somente os produtos dos **dois lotes mais recentes** recebem `NOVO` e ficam fora da Black Friday. A detecção busca uma subsequência ordenada e compacta do último lote conhecido e considera candidatos somente os blocos anteriores a essa fronteira. O bootstrap local aceito manualmente registrou 12 modelos no lote técnico `lote-2026-11-28`, com 11 cadastros novos e reutilização da Camisa Maisa. As duas fotos de Pamela e Mikaelly são evidências alternativas de um único cadastro de cada modelo.

A âncora principal desse lote exige pelo menos 10 dos 12 modelos corroborados, densidade de 80% e janela efetiva de até 14 itens. Magnific permanece como âncora secundária original, sem recalibrar sua ordem silenciosamente. O fallback só pode confirmar o contexto e uma fronteira principal parcial segura; nunca oferece o lote principal conhecido como lançamento. Se nenhuma fronteira for segura, a execução é interrompida. Tipos explícitos, nomes normalizados e evidências de referências, imagens e metadados corroboram o reconhecimento. Preço e tamanho são auxiliares; custos do fornecedor não são guardados no histórico.

Uma execução com a âncora no topo informa **Nenhum produto novo encontrado**, preserva os lotes e não cria commit. Alterações e ambiguidades no histórico abaixo da fronteira não geram lançamentos. Um inventário compacto dos blocos já observados também impede tratar um bloco histórico reposicionado como lançamento. Produtos antigos não são removidos porque desapareceram da fonte; Entrega rápida permanece uma classificação própria da loja. A rotina confere duas leituras HTTP contra o Chrome renderizado, incluindo visibilidade e ordem real; diferenças materiais ou instabilidade interrompem a execução. O Chrome deve estar instalado (`CHROME_PATH` permite indicar seu executável).

Para apenas investigar a fonte, use `npm run catalogo:diagnosticar` ou `node scripts/atualizar-catalogo.mjs --diagnostico-fronteira`. Esse modo nunca cria lote ou altera dados/imagens do catálogo. Gera o relatório detalhado e capturas somente na pasta local ignorada, com comparação HTTP/Chrome e desktop/celular; preços da fonte ficam apenas nesse material de revisão. Uma hipótese abaixo do quórum é identificada como não aprovada, sem autorizar cadastro.

Para executar manualmente, abra **GitHub → Actions → Atualizar catálogo → Run workflow**, selecionando `main`. Consulte o resultado, logs e `GITHUB_STEP_SUMMARY` nessa mesma área do GitHub Actions. A concorrência usa o grupo `atualizar-catalogo-main`, com `cancel-in-progress: false`, para impedir execuções simultâneas sem cancelar uma atualização em andamento. Se a âncora não for encontrada, a fonte estiver parcial, as duas leituras divergirem ou algum candidato exigir revisão, a execução inteira é interrompida: nenhum lote parcial é publicado. Para conferir localmente sem alterar dados, instale as ferramentas com `npm ci --ignore-scripts` e use `node scripts/atualizar-catalogo.mjs --dry-run`. Os testes são executados com `npm test`.

Somente um lançamento válido, com dados e imagens confirmados e todos os testes aprovados, permite criar commit, enviar a `origin/main` e solicitar o **mesmo build de Pages já configurado**. Sem lançamento, não há commit vazio, push, alteração do histórico ou rotação das novidades. O token temporário do GitHub usa somente `contents: write` e `pages: write`, sem PAT ou chaves gravadas. Não há alteração de domínio, DNS, HTTPS ou CNAME.

Para pausar as execuções automáticas e manuais, abra o menu do workflow no GitHub Actions e escolha **Disable workflow**. **Enable workflow** reativa os dois gatilhos existentes no arquivo. A automação não usa IA, API paga ou credenciais gravadas no repositório.

## Limitações atuais

- Sem login, autenticação, backend, painel administrativo ou banco de dados.
- Sem checkout ou pagamento online; a confirmação do pedido e da disponibilidade acontece pelo WhatsApp.
- Escolhas salvas no navegador/dispositivo; não há sincronização entre dispositivos. Limpar dados do site remove essas escolhas.
- Armazenamento bloqueado mantém escolhas apenas na sessão; alterações simultâneas entre abas podem substituir o último estado salvo.
- Links compartilhados dependem de preservar o nome da peça; mudanças futuras de identidade exigem migração das preferências.
- Compartilhamento e cópia dependem do suporte e das permissões do navegador.
- Identificações ambíguas e imagens com enquadramento/resolução limitada ficam documentadas para revisão humana.
