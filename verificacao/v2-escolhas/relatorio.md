# V2 — Favoritos e sacola de orçamento

## Implementação

- `index.html`: botões Favoritos/Sacola no header, diálogo nativo rotulado, fechamento e mensagens de status.
- `script.js`: coração fora da imagem, seletor de tamanho e botão de sacola nos cards; persistência e validação local; favoritos, quantidades e WhatsApp coletivo. Nenhum dos 260 objetos foi alterado.
- `style.css`: controles na identidade rosada/bege, painéis responsivos e cabeçalho do diálogo sempre visível; apenas o conteúdo rola.
- `verificacao/testar-favoritos-sacola.mjs`: ferramenta de teste que reutiliza a validação do catálogo e adiciona os casos desta etapa. Evidências anteriores não são sobrescritas.
- Esta pasta: resultados JSON, sete capturas e este relatório.

## Favoritos

Coração `♡`/`♥` ao lado do nome, botão real com aria-label, aria-pressed e foco visível. O contador indica produtos distintos. Abrir Favoritos mostra somente as peças selecionadas, com seletor de tamanho, botão de sacola e WhatsApp individual. Remover um favorito não remove a peça da sacola. Novidades e catálogo sincronizam seus corações.

## Sacola

O contador representa a soma das quantidades de peças. Produto/tamanho iguais compartilham uma linha e somam quantidade. Outro tamanho cria outra linha. O painel mostra imagem, nome, categoria, tamanho, quantidade, aumentar/diminuir e remover, sem preço. Quantidade mínima 1; não há limite de estoque. Quantidades precisam ser inteiros positivos seguros do JavaScript.

Tamanhos conhecidos exigem escolha explícita; o placeholder não adiciona itens. Quando `tamanhos === null`, o seletor mostra Consultar tamanho, fica desabilitado e o item guarda `tamanho: null`. A opção não cria tamanho novo. Todos os produtos atuais têm grade; o caminho de tamanho desconhecido foi testado com uma fixture isolada, sem mudar o array.

## Identificação e localStorage

Chaves `evelinFavoritos` e `evelinSacola`.

- Se o código for único no catálogo: `codigo:01367`.
- Caso contrário: `produto:` seguido de JSON com `[categoria, nome, imagem]`, sem usar a posição no array e sem adicionar IDs aos produtos.

Exemplo:

```json
{
  "evelinFavoritos": ["codigo:01367"],
  "evelinSacola": [
    {"id": "codigo:01367", "tamanho": "M", "quantidade": 1}
  ]
}
```

Os valores são serializados separadamente em cada chave. Produto, categoria, imagem e código são reconstruídos pelo catálogo atual, evitando duplicar dados. JSON inválido, tipos errados, IDs desconhecidos, tamanhos inválidos e quantidades negativas/fracionárias ou fora dos inteiros seguros são rejeitados. Linhas válidas repetidas são agrupadas. Preferências são sincronizadas pelo evento storage entre abas do mesmo navegador/origem.

Nenhuma preferência é enviada a servidor. Se a gravação estiver bloqueada, a interface avisa e continua mantendo as escolhas em memória durante a sessão.

## WhatsApp coletivo

Número original `5511971949711` preservado. Um único link monta a mensagem ao abrir ou atualizar a sacola:

```text
Olá! Tenho interesse nestas peças da Evelin Boutique:

1x Vestido Mariana — tamanho M
1x Blusa Katy — tamanho G
2x Saia Ema — tamanho P

Gostaria de consultar os valores e a disponibilidade dessas peças.
```

Quando não houver grade: `tamanho a consultar`. Códigos internos e preços do fornecedor não entram na mensagem. Sacola vazia não apresenta link de orçamento. Adicionar peças não conclui compra; o WhatsApp individual permanece igual.

## Acessibilidade e eventos

Diálogo modal nativo com foco contido, Escape, botão Fechar sempre visível e retorno do foco ao botão de abertura. Controles têm labels, aria-label e foco visível. Imagens e molduras permanecem proporcionais. Uma delegação de clique atende todos os cards, inclusive os carregados pela paginação; não são acrescentados listeners por card.

## Validação

Chrome/154.0.8037.95, isolado do localStorage pessoal da cliente.

- 260 produtos, 7 categorias, 9 novidades e 124 códigos preservados; todos os preços null.
- Array original comparado byte a byte com HEAD; nenhum campo de produto, imagem ou novidade alterado.
- 260 imagens decodificadas e 260 mensagens individuais do WhatsApp verificadas.
- Busca dos 260 nomes, acentos/capitalização, prefixos, categoria, filtros, A–Z/Z–A, contadores e paginação de 24/48/todos aprovados.
- Favoritos com e sem código: adicionar, remover, contador, vazio, independência da sacola, sincronização e persistência após recarga.
- Sacola: tamanho obrigatório, agrupamento, tamanhos distintos, aumento/diminuição, mínimo 1, remoção, persistência, vazio e contador.
- WhatsApp coletivo: uma peça, várias peças, quantidade maior que 1, tamanhos distintos, tamanho desconhecido, sem preços/códigos, número original.
- Armazenamento: JSON inválido, tipo errado, IDs desconhecidos, tamanhos errados, quantidades inválidas, duplicatas e gravação bloqueada; evento de sincronização entre abas.
- 1440/768/390 px: grids do catálogo 3/2/1, sem overflow horizontal; painéis dentro da tela, foco visível/contido, cabeçalho/fechamento preservados e Escape funcional.
- Zero erros no console. Sintaxe JavaScript e git diff --check aprovados.

A revisão visual identificou inicialmente que o fechamento podia sair da área visível na rolagem do celular. O conteúdo do painel passou a rolar separadamente do cabeçalho; testes e capturas foram repetidos após esse ajuste.

## Limitações

As preferências pertencem ao navegador/origem, sem conta ou sincronização entre dispositivos. Limpar dados do navegador remove as escolhas. Se o identificador mudar no futuro (por exemplo, atribuição de código a um produto sem código), a preferência antiga será descartada; uma migração poderá ser necessária nessa evolução futura. Atualizações simultâneas entre abas não são transações: prevalece o último valor gravado.

A sacola consulta orçamento e disponibilidade; não confirma estoque, preço ou pedido. Nenhum checkout, pagamento, login, backend ou banco de dados foi implementado.

## Git

Nenhum commit, push ou alteração do remoto. A implementação aguarda revisão do usuário.