# V2 — códigos internos do fornecedor

As referências foram aproveitadas exclusivamente dos manifestos locais, da análise e dos textos do catálogo preservados na consulta de 2026-10-02T20:56:55.3063920Z. Não houve nova consulta nem download. Códigos são strings para preservar zeros à esquerda. Não foram usados os identificadores V001/B008/S022 citados em planejamentos anteriores: eles não constam como referências confirmadas nestas fontes.

## Resultado

124 produtos com código e 136 com `null`, de um total de 260. Nenhum campo anterior foi alterado. Os 104 candidatos ambíguos continuam pendentes; nenhum foi cadastrado ou resolvido nesta etapa.

| Categoria | Com código | Sem código |
|---|---:|---:|
| Vestidos | 45 | 52 |
| Blusas | 39 | 25 |
| Saias | 29 | 22 |
| Conjuntos | 6 | 26 |
| Camisas | 2 | 4 |
| Blazers | 0 | 1 |
| Outros | 3 | 6 |

## Referências não atribuídas por ambiguidade

- **Vestido Priscila**: Referência não informada nas fontes locais. Grades diferentes nas ocorrências; tamanhos do site preservados. Descrições e tecidos diferentes entre ocorrências sem referência; identidade pendente.
- **Vestido Sindy**: Referência não informada nas fontes locais. Grades diferentes nas ocorrências; tamanhos do site preservados. Descrições e tecidos diferentes entre ocorrências sem referência; identidade pendente.
- **Saia Telma**: Mais de uma referência para o mesmo nome; identidade não confirmada. Grades diferentes nas ocorrências; tamanhos do site preservados.
- **Saia Melissa**: Modelos homônimos: o cadastro corresponde ao bloco 66, sem código e com PP/P; 01426 está no bloco 223, com PP/P/M/G e preço diferente. Não associar pelo nome. Grades diferentes nas ocorrências; tamanhos do site preservados.

## Divergências e cuidado com as fontes

- Saia Telma: referências 00181 e 00178; as grades das ocorrências não confirmam o cadastro atual 48/50/52/54. Nenhuma referência foi escolhida.
- Blusa Katy: 01397 se repete nos três registros próprios, apesar das grades diferentes; código confirmado e grade atual G/GG preservada.
- Saia Paula: 00697 confirmado nos registros próprios; algumas ocorrências incluem PP. A grade atual foi preservada.
- Vestido Clarissa, Saia Samara e Chemise Beth: grades divergentes sem código informado; continuam null, sem corrigir tamanhos.
- Saia Rosane Plus Size: 00840 confirmado em seis registros independentes. A análise associa esse mesmo código à Blusa Regina no bloco 207 porque o texto da saia seguinte ficou dentro do trecho da blusa. A referência não está no trecho próprio da blusa; não foi tratada como código de Regina nem como motivo para inventar outra referência. O inventário histórico foi preservado.

## Rastreabilidade

`v2-codigos-fornecedor.json` lista os 260 produtos, os motivos de null, os códigos candidatos e as fontes/blocos usados nas atribuições. Correspondências de nome ignoram apenas acentos, capitalização e espaços; não usam similaridade de grafia. A importação anterior só é usada quando nome, imagem e tamanhos correspondem ao cadastro. Preços presentes nos textos de evidência não foram copiados para os objetos do site.

## Validação final

- Sintaxe JavaScript e `git diff --check` aprovados.
- Os 260 objetos foram comparados com HEAD: removendo apenas `codigoFornecedor`, todos os campos e a ordem dos produtos são idênticos. Todas as funções do site também são idênticas.
- Exatamente 9 novidades, três em Vestidos, Blusas e Saias; sete categorias; todos os preços null; nenhuma duplicata de nome, imagem ou código atribuído.
- Chrome/154.0.8037.95: 260 imagens decodificadas, 260 mensagens WhatsApp e grades dos cards corretas.
- Busca por nome/categoria e sem acentos, início de palavra, filtros, A–Z/Z–A, paginação de 24, reset e contadores aprovados.
- Telas 1440/768/390 px: grids 3/2/1, cards alinhados e sem overflow horizontal. Zero erros no console.
- A execução de teste não alterou arquivos nem sobrescreveu capturas históricas.
- Alterados: `script.js`, `verificacao/testar-site.mjs`. Criados: este relatório e `v2-codigos-fornecedor.json`. Nenhum commit ou push.
