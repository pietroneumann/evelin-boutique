# Evolução autônoma — Evelin Boutique

Data: 02/10/2026. Fonte: [catálogo autorizado da Maria Amore](https://sites.google.com/view/mariaamorecatalogo/cat%C3%A1logo).

## 1. Estado inicial

AGENTS.md, index.html, style.css e script.js lidos; imagens inspecionadas; git status e git diff inicialmente limpos. Branch main. HEAD 2e161051fadf0b3d2293f15f1d3a13a6ac5a236f.

28 produtos: 10 Vestidos, 9 Blusas, 9 Saias. Novidades: exatamente 9, três por categoria. Todos os 28 objetos foram preservados integralmente e todas as imagens antigas conservaram seus hashes SHA-256.

## 2. Produtos importados do Lote 1

Todos os 15 candidatos foram importados. A leitura atual confirmou a grafia “Vestido Lais”; o espaço interno “L ais” da análise anterior não foi corrigido por suposição. Os tamanhos são os da ocorrência selecionada na página atual, sem unir grades de outras fotos.

Todos os novos objetos têm preco: null, cores: null e novidade: false. Os valores abaixo são somente conferência do fornecedor; não foram cadastrados como preço de venda.

| Nome | Categoria | Código | Tamanhos | Preço fornecedor (R$), só conferência | Arquivo final |
|---|---|---|---|---:|---|
| Vestido Clara | Vestidos | null | PP, P, M, G, GG, EXG | 189,90 | assets/imagens/produtos/vestido-clara.jpg |
| Vestido Grace | Vestidos | null | P, M, G, GG | 179,90 | assets/imagens/produtos/vestido-grace.jpg |
| Vestido Lais | Vestidos | null | P, M | 219,90 | assets/imagens/produtos/vestido-lais.jpg |
| Vestido Julieta | Vestidos | null | M, G, GG, EXG | 229,90 | assets/imagens/produtos/vestido-julieta.jpg |
| Vestido Dinah | Vestidos | null | PP, P, M, G, GG | 219,90 | assets/imagens/produtos/vestido-dinah.jpg |
| Blusa Debora | Blusas | null | P, M, G, GG, EXG | 79,90 | assets/imagens/produtos/blusa-debora.png |
| Blusa Agatha | Blusas | null | P, M, G, EXG | 119,90 | assets/imagens/produtos/blusa-agatha.png |
| Blusa Andreza | Blusas | 01101 | P, M, G, GG, EXG | 89,90 | assets/imagens/produtos/blusa-andreza.png |
| Blusa Vera | Blusas | 00598 | P | 39,90 | assets/imagens/produtos/blusa-vera.png |
| Blusa Valentina | Blusas | null | P, M, G, GG | 99,90 | assets/imagens/produtos/blusa-valentina.png |
| Saia Karen | Saias | null | G, EXG | 99,90 | assets/imagens/produtos/saia-karen.png |
| Saia Luciana | Saias | null | P, EXG | 119,90 | assets/imagens/produtos/saia-luciana.png |
| Saia Yamares | Saias | 01155 | GG | 119,90 | assets/imagens/produtos/saia-yamares.jpg |
| Saia Zelda | Saias | 00483 | P, M, G, GG, EXG | 99,90 | assets/imagens/produtos/saia-zelda.jpg |
| Saia Amanda | Saias | 01052 | G, GG, EXG | 94,90 | assets/imagens/produtos/saia-amanda.jpg |

## 3. Novas categorias

Conjuntos, Camisas, Blazers e Outros foram adicionadas. Vestidos, Blusas e Saias permanecem. Outros agrupa tipos pouco numerosos sem renomear as peças: Chemise, Salopete com blusa, Sobretudos e Casaquinho nesta seleção.

Categorias e filtros são gerados pelo array; nenhuma categoria adicional precisa de onclick manual.

## 4. Produtos importados das novas categorias

| Nome | Categoria | Código | Tamanhos | Preço fornecedor (R$), só conferência | Arquivo final |
|---|---|---|---|---:|---|
| Conjunto Talita | Conjuntos | null | PP, P, M, G, GG | 209,90 | assets/imagens/produtos/conjunto-talita.jpg |
| Conjunto Yara | Conjuntos | 01409 | P, M, G, GG, EXG | 149,90 | assets/imagens/produtos/conjunto-yara.jpg |
| Conjunto Eny | Conjuntos | null | PP, P, M, G, GG | 199,90 | assets/imagens/produtos/conjunto-eny.jpg |
| Conjunto Marina | Conjuntos | null | P, M, G, GG, EXG | 149,90 | assets/imagens/produtos/conjunto-marina.jpg |
| Conjunto Cecilia | Conjuntos | null | G, GG, EXG | 199,90 | assets/imagens/produtos/conjunto-cecilia.jpg |
| Camisa Maisa | Camisas | null | P, M, G, GG, EXG | 99,90 | assets/imagens/produtos/camisa-maisa.png |
| Camisa Eugenia | Camisas | null | P, M, G, EXG | 139,90 | assets/imagens/produtos/camisa-eugenia.png |
| Camisa Beatriz | Camisas | null | P, M, G, GG, EXG | 119,90 | assets/imagens/produtos/camisa-beatriz.png |
| Camisa Jaqueline | Camisas | 01400 | M, G, GG, EXG | 99,90 | assets/imagens/produtos/camisa-jaqueline.png |
| Camisa Relga | Camisas | null | GG, EXG | 119,90 | assets/imagens/produtos/camisa-relga.png |
| Blazer Helena | Blazers | null | 50 | 159,90 | assets/imagens/produtos/blazer-helena.png |
| Chemise Beth | Outros | null | P, M, G | 229,90 | assets/imagens/produtos/chemise-beth.jpg |
| Salopete com blusa Luiza | Outros | null | P, M, G, GG | 229,90 | assets/imagens/produtos/salopete-com-blusa-luiza.jpg |
| Sobretudo Tamires | Outros | null | P, M, G | 349,90 | assets/imagens/produtos/sobretudo-tamires.jpg |
| Sobretudo Michelle | Outros | null | P, M, G, GG, EXG | 329,90 | assets/imagens/produtos/sobretudo-michelle.jpg |
| Casaquinho Iolanda | Outros | null | P, EXG | 169,90 | assets/imagens/produtos/casaquinho-iolanda.png |

Referências são mantidas nesta evidência para conferência; não acrescentei campos ao esquema dos objetos do site. Nenhuma cor nominal estava explicitamente informada para os 31 produtos selecionados.

## 5. Substituições e limites da seleção

- Camisa Cléo foi descartada desta seleção porque havia grades diferentes em ocorrências sem referência. Camisa Jaqueline 01400 foi selecionada no lugar, com nome e grade atuais confirmados.
- Blazer Joyce ficou fora por apresentar diferentes grades sem referência que resolva a disponibilidade. Blazer Helena foi importado; não inventei um terceiro modelo nem dupliquei Joyce para atingir a meta.
- Não houve substituição no Lote 1; Lais pôde ser confirmado.
- Não foi necessário substituir produto por recorte inviável.
- A meta era “até” 5 Conjuntos, 5 Camisas, 3 Blazers e 5 Outros. Foram importados 5, 5, 1 e 5, respectivamente.

## 6. Imagens

31 imagens do fornecedor foram baixadas; os formatos foram identificados pela decodificação real, antes da definição dos caminhos. Houve 13 recortes PNG; seus originais foram preservados. Total: 44 arquivos novos em assets/imagens/produtos/.

Somente recortes retangulares dos originais, mantendo os pixels e as proporções. Nenhuma IA generativa, reconstrução, retoque de roupa ou deformação. As imagens de conjuntos e da Salopete com blusa permaneceram inteiras para representar o produto completo.

### Originais preservados dos recortes

- blazer-helena-original.jpg
- blusa-agatha-original.jpg
- blusa-andreza-original.jpg
- blusa-debora-original.jpg
- blusa-valentina-original.jpg
- blusa-vera-original.png
- camisa-beatriz-original.jpg
- camisa-eugenia-original.jpg
- camisa-jaqueline-original.jpg
- camisa-maisa-original.jpg
- camisa-relga-original.png
- casaquinho-iolanda-original.jpg
- saia-karen-original.jpg

### Recortes criados

- blazer-helena.png
- blusa-agatha.png
- blusa-andreza.png
- blusa-debora.png
- blusa-valentina.png
- blusa-vera.png
- camisa-beatriz.png
- camisa-eugenia.png
- camisa-jaqueline.png
- camisa-maisa.png
- camisa-relga.png
- casaquinho-iolanda.png
- saia-karen.png

### Todos os arquivos novos de imagem

- assets/imagens/produtos/blazer-helena-original.jpg
- assets/imagens/produtos/blazer-helena.png
- assets/imagens/produtos/blusa-agatha-original.jpg
- assets/imagens/produtos/blusa-agatha.png
- assets/imagens/produtos/blusa-andreza-original.jpg
- assets/imagens/produtos/blusa-andreza.png
- assets/imagens/produtos/blusa-debora-original.jpg
- assets/imagens/produtos/blusa-debora.png
- assets/imagens/produtos/blusa-valentina-original.jpg
- assets/imagens/produtos/blusa-valentina.png
- assets/imagens/produtos/blusa-vera-original.png
- assets/imagens/produtos/blusa-vera.png
- assets/imagens/produtos/camisa-beatriz-original.jpg
- assets/imagens/produtos/camisa-beatriz.png
- assets/imagens/produtos/camisa-eugenia-original.jpg
- assets/imagens/produtos/camisa-eugenia.png
- assets/imagens/produtos/camisa-jaqueline-original.jpg
- assets/imagens/produtos/camisa-jaqueline.png
- assets/imagens/produtos/camisa-maisa-original.jpg
- assets/imagens/produtos/camisa-maisa.png
- assets/imagens/produtos/camisa-relga-original.png
- assets/imagens/produtos/camisa-relga.png
- assets/imagens/produtos/casaquinho-iolanda-original.jpg
- assets/imagens/produtos/casaquinho-iolanda.png
- assets/imagens/produtos/chemise-beth.jpg
- assets/imagens/produtos/conjunto-cecilia.jpg
- assets/imagens/produtos/conjunto-eny.jpg
- assets/imagens/produtos/conjunto-marina.jpg
- assets/imagens/produtos/conjunto-talita.jpg
- assets/imagens/produtos/conjunto-yara.jpg
- assets/imagens/produtos/saia-amanda.jpg
- assets/imagens/produtos/saia-karen-original.jpg
- assets/imagens/produtos/saia-karen.png
- assets/imagens/produtos/saia-luciana.png
- assets/imagens/produtos/saia-yamares.jpg
- assets/imagens/produtos/saia-zelda.jpg
- assets/imagens/produtos/salopete-com-blusa-luiza.jpg
- assets/imagens/produtos/sobretudo-michelle.jpg
- assets/imagens/produtos/sobretudo-tamires.jpg
- assets/imagens/produtos/vestido-clara.jpg
- assets/imagens/produtos/vestido-dinah.jpg
- assets/imagens/produtos/vestido-grace.jpg
- assets/imagens/produtos/vestido-julieta.jpg
- assets/imagens/produtos/vestido-lais.jpg

As folhas imagens-originais.jpg e imagens-recortadas.jpg são evidências de inspeção; não são usadas no site.

## 7. Site

- Home mantém apenas as nove novidades na vitrine; nenhum produto novo recebeu etiqueta Novo.
- Catálogo completo separado, inicialmente fechado e sem renderizar todos os produtos na entrada.
- Botões e links permitem abrir o catálogo ou uma coleção.
- Categorias visuais em grid responsivo, com contagem de peças.
- Filtros dinâmicos com botões semânticos e aria-pressed.
- Busca normaliza Unicode para ignorar acentos e capitalização; cada termo deve iniciar uma palavra do nome ou categoria. Não busca trechos intermediários. Consultas com várias palavras também funcionam.
- Ordenação por seleção original, Nome A–Z ou Nome Z–A, sem ordenação por preço.
- Contador com singular, plural e zero; mensagem de resultado vazio; limpar filtros.
- Cards alinhados com botão WhatsApp ao final; molduras e proporções das imagens preservadas.
- Imagens com alt, loading lazy e decoding async.
- Labels, foco visível, contador anunciado por aria-live, navegação nomeada e voltar ao topo com aria-label.
- Links externos continuam com noopener noreferrer.
- Menu mobile compacto, controles empilhados e filtros que quebram linha.
- Preferência por movimento reduzido respeitada.
- Header, hero, identidade rosada/bege, textos de Sobre/Contato e conteúdo institucional do footer preservados. Apenas a navegação recebeu o link Catálogo.
- Removidos handlers manuais e seletores de categorias comprovadamente obsoletos; nenhuma minificação.
- Sem pagamento, checkout, login, banco, backend de aplicação, estoque ou painel. O servidor local do teste é exclusivamente uma ferramenta de verificação.

## 8. Arquivos alterados/criados

Arquivos de aplicação alterados: index.html, style.css e script.js.

44 imagens novas, listadas acima. Evidências e ferramentas em verificacao/:

- verificacao/1440-camisas.png
- verificacao/1440-catalogo.png
- verificacao/1440-categorias.png
- verificacao/1440-contato.png
- verificacao/1440-footer.png
- verificacao/1440-inicio.png
- verificacao/1440-novidades-grade-completa.png
- verificacao/1440-outros.png
- verificacao/1440-produtos-novidades.png
- verificacao/1440-sobre.png
- verificacao/390-camisas.png
- verificacao/390-catalogo.png
- verificacao/390-categorias.png
- verificacao/390-contato.png
- verificacao/390-footer.png
- verificacao/390-inicio.png
- verificacao/390-outros.png
- verificacao/390-produtos-novidades.png
- verificacao/390-sobre.png
- verificacao/768-camisas.png
- verificacao/768-catalogo.png
- verificacao/768-categorias.png
- verificacao/768-contato.png
- verificacao/768-footer.png
- verificacao/768-inicio.png
- verificacao/768-outros.png
- verificacao/768-produtos-novidades.png
- verificacao/768-sobre.png
- verificacao/imagens-originais.jpg
- verificacao/imagens-recortadas.jpg
- verificacao/importacao.json
- verificacao/recortar-imagens.ps1
- verificacao/resultados.json
- verificacao/testar-site.mjs
- verificacao/relatorio.md

Nenhum arquivo antigo de imagem removido ou sobrescrito. Nenhuma dependência instalada. As ferramentas de recorte recusam sobrescrever arquivos existentes.

## 9. Resultados dos testes

- node --check script.js: passou.
- git diff --check: passou; apenas avisos Git de conversão LF/CRLF, sem erros de whitespace.
- Dados: 59 nomes normalizados únicos e 59 caminhos de produto únicos.
- Os 28 objetos iniciais são idênticos aos originais; hashes das imagens antigas idênticos.
- Todos os 31 novos têm preco null, cores null, novidade false e grades iguais às confirmadas.
- Exatamente nove novidades, três em cada categoria original.
- Aninhamento de tags HTML verificado; IDs únicos; imagens com alt; inputs/select com label; botões sem onclick; links externos com rel seguro.
- Chrome Chrome/154.0.8037.95: nenhum erro no console.
- Busca pelos 59 nomes, consultas sem acento/maiúsculas, início de palavra e categoria: passaram.
- Busca por trecho intermediário rejeitada; filtros das sete categorias, contador, zero resultados, limpar filtros e ambas ordenações: passaram.
- Todas as 59 mensagens WhatsApp verificadas: número 5511971949711, nome e tamanhos corretos, consulta de preço, sem valores do fornecedor.
- Todos os 59 arquivos de produto decodificados pelo Chrome.
- Desktop 1440×1000: três colunas; novidades em três linhas de três.
- Tablet 768×1024: duas colunas.
- Mobile 390×844: uma coluna.
- Nenhuma rolagem horizontal ou elemento fora da largura nas três telas. Imagens usam object-fit contain e dimensões automáticas.
- Header, hero, novidades, categorias, catálogo, Sobre, Contato, footer e voltar ao topo verificados.
- 28 screenshots PNG de verificação, mais duas folhas de imagens JPEG, preservados.

Para repetir a verificação, com Node e Chrome instalados: node verificacao/testar-site.mjs. O teste usa somente um servidor local, encerra o Chrome e restringe seu perfil descartável à pasta de verificação do projeto. Não executa Git nem envia WhatsApp.

## 10. Estado final

| Categoria | Produtos | Novidades |
|---|---:|---:|
| Vestidos | 15 | 3 |
| Blusas | 14 | 3 |
| Saias | 14 | 3 |
| Conjuntos | 5 | 0 |
| Camisas | 5 | 0 |
| Blazers | 1 | 0 |
| Outros | 5 | 0 |
| Total | 59 | 9 |

31 produtos adicionados, 7 categorias totais.

## 11. Git

Não houve commit, push, publicação, mudança de remoto ou manipulação de histórico. Branch main; HEAD permanece 2e161051fadf0b3d2293f15f1d3a13a6ac5a236f.

Git status --short (os arquivos de verificacao aparecem agrupados como pasta não rastreada):

```text
 M index.html
 M script.js
 M style.css
?? assets/imagens/produtos/blazer-helena-original.jpg
?? assets/imagens/produtos/blazer-helena.png
?? assets/imagens/produtos/blusa-agatha-original.jpg
?? assets/imagens/produtos/blusa-agatha.png
?? assets/imagens/produtos/blusa-andreza-original.jpg
?? assets/imagens/produtos/blusa-andreza.png
?? assets/imagens/produtos/blusa-debora-original.jpg
?? assets/imagens/produtos/blusa-debora.png
?? assets/imagens/produtos/blusa-valentina-original.jpg
?? assets/imagens/produtos/blusa-valentina.png
?? assets/imagens/produtos/blusa-vera-original.png
?? assets/imagens/produtos/blusa-vera.png
?? assets/imagens/produtos/camisa-beatriz-original.jpg
?? assets/imagens/produtos/camisa-beatriz.png
?? assets/imagens/produtos/camisa-eugenia-original.jpg
?? assets/imagens/produtos/camisa-eugenia.png
?? assets/imagens/produtos/camisa-jaqueline-original.jpg
?? assets/imagens/produtos/camisa-jaqueline.png
?? assets/imagens/produtos/camisa-maisa-original.jpg
?? assets/imagens/produtos/camisa-maisa.png
?? assets/imagens/produtos/camisa-relga-original.png
?? assets/imagens/produtos/camisa-relga.png
?? assets/imagens/produtos/casaquinho-iolanda-original.jpg
?? assets/imagens/produtos/casaquinho-iolanda.png
?? assets/imagens/produtos/chemise-beth.jpg
?? assets/imagens/produtos/conjunto-cecilia.jpg
?? assets/imagens/produtos/conjunto-eny.jpg
?? assets/imagens/produtos/conjunto-marina.jpg
?? assets/imagens/produtos/conjunto-talita.jpg
?? assets/imagens/produtos/conjunto-yara.jpg
?? assets/imagens/produtos/saia-amanda.jpg
?? assets/imagens/produtos/saia-karen-original.jpg
?? assets/imagens/produtos/saia-karen.png
?? assets/imagens/produtos/saia-luciana.png
?? assets/imagens/produtos/saia-yamares.jpg
?? assets/imagens/produtos/saia-zelda.jpg
?? assets/imagens/produtos/salopete-com-blusa-luiza.jpg
?? assets/imagens/produtos/sobretudo-michelle.jpg
?? assets/imagens/produtos/sobretudo-tamires.jpg
?? assets/imagens/produtos/vestido-clara.jpg
?? assets/imagens/produtos/vestido-dinah.jpg
?? assets/imagens/produtos/vestido-grace.jpg
?? assets/imagens/produtos/vestido-julieta.jpg
?? assets/imagens/produtos/vestido-lais.jpg
?? verificacao/
```

## 12. Pendências para revisão manual

- Revisar os recortes, especialmente camisas: eles mantêm parte do look para preservar mangas e proporção vertical, sem reconstruir partes.
- Conferir no celular físico a navegação e a leitura; os testes realizados foram no Chrome headless nos três tamanhos solicitados.
- Preços de venda continuam pendentes de definição pela Evelin Boutique.
- Grades correspondem às legendas selecionadas; não representam estoque sincronizado. Consultar disponibilidade com o fornecedor antes de vender.
- Joyce e os demais candidatos ambíguos continuam pendentes; nenhuma tentativa de resolver esses casos por suposição.
- Revisar o diff e escolher os arquivos de evidência que deseja manter no futuro commit. Não houve staging automático.
- Aguardar autorização antes de qualquer commit ou push.
