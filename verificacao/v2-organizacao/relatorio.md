# Organização do código e polimento dos botões

## Escopo e integridade

260 produtos, 7 categorias e 9 novidades preservados. O bloco inteiro dos produtos foi comparado com HEAD, sem diferença além de finais de linha. Códigos, nomes, grades, categorias, preços, cores, novidades e imagens permaneceram intactos; preços continuam null. Nenhuma imagem de produto alterada. Registro em integridade.json.

## JavaScript

35 funções mantidas, sem renomear APIs, alterar identificadores ou chaves de localStorage. 34 corpos iguais ignorando espaços; somente atualizarContadoresEscolhas foi adaptada à estrutura visual dos novos botões. Configuração e DOM vêm antes do estado; funções relacionadas estão juntas; eventos são registrados uma única vez e inicialização está no final. Funções declaradas continuam disponíveis por hoisting. O painel compartilhado de favoritos/sacola foi mantido para evitar uma abstração extra.

| Bloco | Funções agrupadas |
| --- | --- |
| 01. Dados dos produtos — informações confirmadas | Dados, declarações ou instruções de execução |
| 02. Configuração, índices e referências do DOM | Dados, declarações ou instruções de execução |
| 03. Estado da aplicação | Dados, declarações ou instruções de execução |
| 04. Utilidades, identidade e armazenamento local | identificarProduto, normalizarTexto, ordenarTamanhos, formatarPreco, tamanhoValido, lerPreferencia, salvarPreferencia, avisarPreferencia |
| 05. Cards e renderização de produtos | criarCard, renderizarProdutos |
| 06. Catálogo, busca, categorias, filtros e ordenação | selecionarProdutos, atualizarQuantidade, mostrarProdutos, abrirCatalogo, mostrarTodos, clicar, criarBotaoFiltro, criarCategorias |
| 07. Favoritos e contadores das escolhas | validarFavoritos, atualizarBotaoFavorito, atualizarContadoresEscolhas |
| 08. Sacola e painel compartilhado das escolhas | validarSacola, botaoItem, estadoVazioEscolhas, renderizarEscolhas, abrirEscolhas |
| 09. Vistos recentemente | validarRecentes, registrarRecente, renderizarRecentes |
| 10. Detalhe do produto | abrirDetalheProduto |
| 11. Compartilhamento e links públicos | slugProduto, linkProduto, compartilharProduto |
| 12. Mensagens do WhatsApp | criarMensagem, criarMensagemSacola |
| 13. Eventos — registrados uma única vez | Dados, declarações ou instruções de execução |
| 14. Inicialização | Dados, declarações ou instruções de execução |


## CSS

16 blocos: base/acessibilidade, header, navegação, hero, novidades, catálogo/filtros, cards, favoritos, sacola, painéis/detalhe, categorias, recentes, Sobre, Contato, footer/voltar ao topo e responsividade.

Seletores compartilhados foram separados por responsabilidade e preservados dentro dos grupos. Nove blocos repetidos foram consolidados; declarações repetidas do mesmo nome nesses blocos mantêm o último valor e sua ordem. Isso inclui .produto, .produto h3, .produto .botao-whatsapp, .adicionar-sacola, .adicionar-sacola:hover, .categorias e títulos/contador. As media queries preservam a ordem relativa, no final do arquivo; o espaçamento original de Sobre em mobile foi restaurado explicitamente após a comparação de estilos.

31 elementos representativos × 16 propriedades foram comparados no Chrome com o CSS de HEAD, em 1440/768/390 px. Nenhuma diferença nesses estilos fora do header. Isso verifica a amostra escolhida, não equivale a provar todos os estados possíveis de todos os seletores.

## HTML

Indentação padronizada, espaços/linhas vazias redundantes removidos e comentários para header, conteúdo, rodapé e painéis. Textos institucionais preservados, com normalização de espaços. IDs de controles e atributos dos painéis mantidos. Os botões do header ganharam três partes independentes: SVG, rótulo e contador.

## Favoritos e Sacola

- Coração e sacola em SVG inline, sem emoji ou biblioteca. Paths usam currentColor; SVGs decorativos com aria-hidden e focusable=false.
- Botões claros, borda rosada, formato arredondado, sombra discreta; coração em rosa/marrom. Sacola segue a mesma linguagem visual.
- Hover com fundo suave e leve deslocamento; active reduz o deslocamento/sombra; foco visível. Movimento reduzido continua respeitado.
- Badges pequenas, preenchimento rosado escuro e texto branco; largura cresce com o número, altura permanece 22 px. Dígitos tabulares e ausência de encolhimento evitam deformação.
- IDs contador-favoritos/contador-sacola permitem atualizar só o número, preservando SVG/rótulo. Favoritos conta peças salvas; sacola continua somando as quantidades.
- Aria-label recebe nome da ação e quantidade, com singular/plural; badge decorativa não repete o número na leitura acessível.
- Contraste medido no estado normal: aproximadamente 9,82:1 no botão e 5,36:1 na badge.

## Desktop, tablet e mobile

1440 px: ações junto à navegação, alinhadas no header sticky. 768 px: grupo centralizado abaixo da navegação. 390 px: grupo compacto em linha própria, ícone/rótulo/badge visíveis e área de toque de pelo menos 44 px. Números maiores podem fazer o grupo quebrar linha para preservar leitura, sem overflow. Testadas badges 3/12 e 125/1234567; números são fixtures do navegador isolado, não alterações nos produtos ou preferências do usuário.

## Ferramentas e testes

Os leitores testar-site.mjs, revisar-ambiguos-v2.mjs, cadastrar-expansao.mjs e relatar-expansao.mjs extraem o bloco de produtos sem depender de criarCard ser a primeira função. Não executamos os scripts de cadastro/importação. As duas asserções textuais do teste de escolhas passaram a consultar badges, mantendo quantidades esperadas 2/4.

O novo testar-organizacao-botoes.mjs reutiliza testar-v2-final.mjs para evitar copiar a regressão. Evidências novas são gravadas somente em v2-organizacao; relatórios/capturas anteriores preservados. O teste limpa avisos transitórios de suas simulações de armazenamento antes das capturas visuais. Nenhum dado do navegador pessoal é usado.

## Validações

Sintaxe JavaScript e git diff --check. Chrome headless: favoritos/sacola abrem/fecham, adicionar/remover, quantidades, seleção de tamanho, persistência e refresh; busca sem acentos/prefixos, categoria/tamanho, ordenação, paginação/contador/reset, recentes, detalhe/foco/Escape, compartilhamento e WhatsApp individual/coletivo. Imagens existentes decodificadas no navegador. O campo novos=201 em resultados.json vem da expansão histórica usada pelo teste-base; novosNestaRodada=0 identifica esta rodada. Resultados em resultados.json; capturas do header e dos dois painéis nas três larguras.

O compartilhamento nativo e clipboard continuam cobertos por simulação de API no teste existente, não pelo seletor de um celular físico. Sem erro no console nem rolagem horizontal inesperada; o histórico tem sua rolagem interna intencional. Não houve nova importação.

## Arquivos

Alterados: index.html, script.js, style.css; verificacao/testar-site.mjs, testar-favoritos-sacola.mjs, revisar-ambiguos-v2.mjs, cadastrar-expansao.mjs e relatar-expansao.mjs.

Criados: verificacao/testar-organizacao-botoes.mjs e verificacao/v2-organizacao/ com relatório, integridade, resultados e nove capturas representativas.

Não houve commit, push, publicação, exclusão de arquivos existentes ou alteração fora do projeto. Aguarda revisão do proprietário.
