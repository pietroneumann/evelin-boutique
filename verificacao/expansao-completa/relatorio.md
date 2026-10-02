# Evelin Boutique — expansão completa e navegação do catálogo

Data de revisão: 02/10/2026.

Fonte: [catálogo autorizado Maria Amore](https://sites.google.com/view/mariaamorecatalogo/cat%C3%A1logo). Consulta direta: 2026-10-02T20:56:55.3063920Z. A página atual prevaleceu sobre a extração do navegador de pesquisa, que apresentou dados desatualizados.

## 1. Estado inicial

59 produtos, 7 categorias, 9 novidades. Git iniciou limpo na branch `main`, após o commit `dfb7d8c2166d31cd6988fe134e930ca693811c99`. Todos os 59 objetos e os hashes das imagens anteriores foram preservados.

| Categoria | Inicial | Importados | Final |
| --- | --- | --- | --- |
| Vestidos | 15 | 82 | 97 |
| Blusas | 14 | 50 | 64 |
| Saias | 14 | 37 | 51 |
| Conjuntos | 5 | 27 | 32 |
| Camisas | 5 | 1 | 6 |
| Blazers | 1 | 0 | 1 |
| Outros | 5 | 4 | 9 |

## 2–5. Inventário e seleção

551 ocorrências de produtos em fotos/listagens repetidas; 364 nomes textuais distintos após normalizar acentos/capitalização/espaços. 59 correspondem aos 59 nomes atuais; 305 rótulos restantes foram analisados. Destes, 201 candidatos seguros foram importados e 104 ficaram na fila de revisão. Os rótulos ambíguos podem representar variações de itens existentes, não necessariamente produtos novos.

Teste inicial com somente Blusa Kelly: aprovado com 60 produtos (`teste-primeiro-produto.json`). Depois foram cadastrados os demais 200. Total final: **260 produtos**. Não houve substituição por produto inventado. Todas as 201 imagens finais foram aprovadas; nenhum candidato deste conjunto foi descartado por imagem.

## 6–7. Categorias

Continuam 7 categorias, geradas dinamicamente pelo array. Não foi necessário abrir categorias novas: Jardineira com Blusa Olivia, Trijunto Julia, Tubinho Laura e T-Shirt Sara têm apenas um novo candidato seguro por tipo e ficaram em `Outros`, com os nomes originais. Body Leticia e T-Shirt Personalizada têm grades conflitantes e não foram importados. Os campos e categorias anteriores permaneceram intactos.

## 8. Produtos importados

Todos usam `preco: null` e `novidade: false`. Cores não confirmadas usam `null`. Código ausente usa `null` no relatório; o esquema do site continua sem campo de código. Os valores abaixo são do fornecedor e servem somente para conferência; não são preços de venda.

### Vestidos

| Nome | Código | Tamanhos | Cores | Preço fornecedor | Arquivo final | Bloco / original | Recorte |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Vestido Tamara | null | P, M, G, GG, EXG | null | R$ 214,90 | vestido-tamara.jpg | 16 / vestido-tamara.jpg | Não |
| Vestido Janete | null | P, M, G, GG, EXG | null | R$ 249,90 | vestido-janete.jpg | 18 / vestido-janete.jpg | Não |
| Vestido Cecy | null | P, M, G, GG, EXG | null | R$ 219,90 | vestido-cecy.jpg | 33 / vestido-cecy.jpg | Não |
| Vestido Malu | null | P, M, G | null | R$ 219,90 | vestido-malu.jpg | 34 / vestido-malu.jpg | Não |
| Vestido Carla | null | PP, P, M, G, GG | null | R$ 179,90 | vestido-carla.jpg | 36 / vestido-carla.jpg | Não |
| Vestido Lenita | null | PP, P, M, G, GG | null | R$ 179,90 | vestido-lenita.jpg | 42 / vestido-lenita.jpg | Não |
| Vestido Thaila | null | PP, P, M, G, GG | null | R$ 199,90 | vestido-thaila.jpg | 49 / vestido-thaila.jpg | Não |
| Vestido Jennifer | null | P | null | R$ 209,90 | vestido-jennifer.jpg | 56 / vestido-jennifer.jpg | Não |
| Vestido Carolina | null | P, M, EXG | null | R$ 219,90 | vestido-carolina.jpg | 60 / vestido-carolina.jpg | Não |
| Vestido Suzete | null | P, M, G, GG, EXG | null | R$ 249,90 | vestido-suzete.jpg | 61 / vestido-suzete.jpg | Não |
| Vestido Emília | null | PP, P, M | null | R$ 189,90 | vestido-emilia.jpg | 65 / vestido-emilia.jpg | Não |
| Vestido Laila | 01404 | PP, P, M, G, GG | null | R$ 199,90 | vestido-laila.jpg | 68 / vestido-laila.jpg | Não |
| Vestido Analise | null | PP, P, M, G, GG | null | R$ 189,90 | vestido-analise.jpg | 69 / vestido-analise.jpg | Não |
| Vestido Gildete | 01391 | P, M, G, EXG | null | R$ 189,90 | vestido-gildete.jpg | 77 / vestido-gildete.jpg | Não |
| Vestido Nicole | 01419 | M | null | R$ 199,90 | vestido-nicole.jpg | 87 / vestido-nicole.jpg | Não |
| Vestido Tamires | null | P, M, G, GG, EXG | null | R$ 179,90 | vestido-tamires.jpg | 92 / vestido-tamires.jpg | Não |
| Vestido Aquila | 01046 | P, M, G, GG, EXG | null | R$ 199,90 | vestido-aquila.jpg | 95 / vestido-aquila.jpg | Não |
| Vestido Jade | null | PP, P, M, G, GG | null | R$ 199,90 | vestido-jade.jpg | 122 / vestido-jade.jpg | Não |
| Vestido Gislaine | null | PP, P, M, G, EXG | null | R$ 229,90 | vestido-gislaine.jpg | 128 / vestido-gislaine.jpg | Não |
| Vestido Solange | null | P, M, G, EXG | null | R$ 239,90 | vestido-solange.jpg | 130 / vestido-solange.jpg | Não |
| Vestido Úrsula | null | 50 | null | R$ 139,90 | vestido-ursula.jpg | 135 / vestido-ursula.jpg | Não |
| Vestido Maitê | 01049 | P | null | R$ 239,90 | vestido-maite.jpg | 217 / vestido-maite.jpg | Não |
| Vestido Anne | null | GG | null | R$ 229,90 | vestido-anne.png | 156 / catalogo-0156-original.jpg | Sim |
| Vestido Lorena | null | PP | null | R$ 209,90 | vestido-lorena.jpg | 158 / vestido-lorena.jpg | Não |
| Vestido Jordana | null | P, M, G, GG, EXG | null | R$ 219,90 | vestido-jordana.jpg | 161 / vestido-jordana.jpg | Não |
| Vestido Sandra | null | P, M, G | null | R$ 229,90 | vestido-sandra.jpg | 163 / vestido-sandra.jpg | Não |
| Vestido Joana | null | G, GG, EXG | null | R$ 199,90 | vestido-joana.jpg | 164 / vestido-joana.jpg | Não |
| Vestido Juliana | null | M, G, GG, EXG | null | R$ 229,90 | vestido-juliana.jpg | 166 / vestido-juliana.jpg | Não |
| Vestido Marion | null | P, M | null | R$ 199,90 | vestido-marion.jpg | 167 / vestido-marion.jpg | Não |
| Vestido Jaqueline | null | P, M | null | R$ 219,90 | vestido-jaqueline.jpg | 168 / vestido-jaqueline.jpg | Não |
| Vestido Ayla | null | P | null | R$ 249,90 | vestido-ayla.jpg | 169 / vestido-ayla.jpg | Não |
| Vestido Zuleica | null | P, M | null | R$ 159,90 | vestido-zuleica.jpg | 172 / vestido-zuleica.jpg | Não |
| Vestido Olga | null | P | null | R$ 239,90 | vestido-olga.jpg | 173 / vestido-olga.jpg | Não |
| Vestido Alexa | null | P | null | R$ 219,90 | vestido-alexa.jpg | 174 / vestido-alexa.jpg | Não |
| Vestido Composé Rafaela | 01183 | GG | null | R$ 149,90 | vestido-compose-rafaela.jpg | 175 / vestido-compose-rafaela.jpg | Não |
| Vestido Adele | null | P | null | R$ 179,90 | vestido-adele.jpg | 177 / vestido-adele.jpg | Não |
| Vestido Leonora | null | G, EXG | null | R$ 199,90 | vestido-leonora.jpg | 178 / vestido-leonora.jpg | Não |
| Vestido Salete | null | P, M, G, GG, EXG | null | R$ 269,90 | vestido-salete.jpg | 187 / vestido-salete.jpg | Não |
| Vestido Roberta | null | P, M, G, GG, EXG | null | R$ 219,90 | vestido-roberta.jpg | 188 / vestido-roberta.jpg | Não |
| Vestido Julia | 01057 | P, M | null | R$ 199,90 | vestido-julia.png | 192 / vestido-julia.png | Não |
| Vestido Rebeca | null | P, M, G, GG, EXG | null | R$ 229,90 | vestido-rebeca.jpg | 193 / vestido-rebeca.jpg | Não |
| Vestido Hortência | 01224 | P, M, GG, EXG, 48, 50 | null | R$ 48,50 | vestido-hortencia.jpg | 197 / vestido-hortencia.jpg | Não |
| Vestido Lavinia | 01113 | P, M | null | R$ 239,90 | vestido-lavinia.jpg | 198 / vestido-lavinia.jpg | Não |
| Vestido Estela | 01221 | P, M, G, GG | null | R$ 169,90 | vestido-estela.jpg | 213 / vestido-estela.jpg | Não |
| Vestido Dandara | 01168 | P, M | null | R$ 199,90 | vestido-dandara.jpg | 214 / vestido-dandara.jpg | Não |
| Vestido Tânia | 01102 | P | null | R$ 179,90 | vestido-tania.png | 227 / vestido-tania.png | Não |
| Vestido Paloma | 01174 | M | null | R$ 169,90 | vestido-paloma.jpg | 230 / vestido-paloma.jpg | Não |
| Vestido Jessica | 01254 | PP, P | null | R$ 179,90 | vestido-jessica.png | 231 / vestido-jessica.png | Não |
| Vestido Leia | 01035 | PP, P | null | R$ 139,90 | vestido-leia.jpg | 234 / vestido-leia.jpg | Não |
| Vestido Celina | 01201 | P, M | null | R$ 179,90 | vestido-celina.jpg | 235 / vestido-celina.jpg | Não |
| Vestido Liliane | 01285 | M, G, GG | null | R$ 189,90 | vestido-liliane.jpg | 244 / vestido-liliane.jpg | Não |
| Vestido Cacilda | 01162 | P, M, 48, 50 | null | R$ 48,50 | vestido-cacilda.jpg | 246 / vestido-cacilda.jpg | Não |
| Vestido Telma | null | P | null | R$ 209,90 | vestido-telma.jpg | 267 / vestido-telma.jpg | Não |
| Vestido Pamela | null | P, M, G, GG | null | R$ 239,90 | vestido-pamela.jpg | 268 / vestido-pamela.jpg | Não |
| Vestido Gisele | null | M, G | null | R$ 179,90 | vestido-gisele.jpg | 271 / vestido-gisele.jpg | Não |
| Vestido Aurora | null | P, M, GG | null | R$ 229,90 | vestido-aurora.jpg | 274 / vestido-aurora.jpg | Não |
| Vestido Sônia | 01351 | P, M, G | null | R$ 199,90 | vestido-sonia.jpg | 275 / vestido-sonia.jpg | Não |
| Vestido Letícia | 01207 | P, M | null | R$ 159,90 | vestido-leticia.jpg | 276 / vestido-leticia.jpg | Não |
| Vestido Emily | 01289 | M, G, GG | null | R$ 199,90 | vestido-emily.jpg | 277 / vestido-emily.jpg | Não |
| Vestido Vivien | null | G, EXG | null | R$ 149,90 | vestido-vivien.jpg | 279 / vestido-vivien.jpg | Não |
| Vestido Sofia | 01415 | P, G, GG | null | R$ 199,90 | vestido-sofia.jpg | 284 / vestido-sofia.jpg | Não |
| Vestido Isadora | 01336 | P | null | R$ 189,90 | vestido-isadora.jpg | 289 / vestido-isadora.jpg | Não |
| Vestido Flora | 01424 | P | null | R$ 109,90 | vestido-flora.jpg | 295 / vestido-flora.jpg | Não |
| Vestido Guta | 01425 | P, M, G | null | R$ 219,90 | vestido-guta.jpg | 296 / vestido-guta.jpg | Não |
| Vestido Eliana | 01364 | P | null | R$ 219,90 | vestido-eliana.jpg | 297 / vestido-eliana.jpg | Não |
| Vestido Isaura | 01257 | P, M, G, GG, EXG | null | R$ 179,90 | vestido-isaura.jpg | 303 / vestido-isaura.jpg | Não |
| Vestido Simône | 01350 | P, M, G, GG, EXG | null | R$ 189,90 | vestido-simone.jpg | 313 / vestido-simone.jpg | Não |
| Vestido Raquel | 01342 | M, G, GG, EXG | null | R$ 219,90 | vestido-raquel.jpg | 319 / vestido-raquel.jpg | Não |
| Vestido Vera | 01343 | P, M, G | null | R$ 199,90 | vestido-vera.jpg | 329 / vestido-vera.jpg | Não |
| Vestido Suzana | 01361 | M, G, GG, EXG | null | R$ 169,90 | vestido-suzana.jpg | 331 / vestido-suzana.jpg | Não |
| Vestido Mayumi | 01365 | P, G | null | R$ 199,90 | vestido-mayumi.jpg | 336 / vestido-mayumi.jpg | Não |
| Vestido Thaís | 01360 | P | null | R$ 189,90 | vestido-thais.jpg | 338 / vestido-thais.jpg | Não |
| Vestido Edite | 00479 | M, G, GG | null | R$ 119,90 | vestido-edite.jpg | 339 / vestido-edite.jpg | Não |
| Vestido Joyce | 01345 | M, G, GG | null | R$ 219,90 | vestido-joyce.jpg | 345 / vestido-joyce.jpg | Não |
| Vestido Geane | 01092 | P | null | R$ 119,90 | vestido-geane.jpg | 364 / vestido-geane.jpg | Não |
| Vestido Sol | 01281 | P | null | R$ 199,90 | vestido-sol.jpg | 367 / vestido-sol.jpg | Não |
| Vestido Thereza | 01271 | M | null | R$ 199,90 | vestido-thereza.jpg | 368 / vestido-thereza.jpg | Não |
| Vestido Elis | 00954 | PP, P | null | R$ 89,90 | vestido-elis.jpg | 373 / vestido-elis.jpg | Não |
| Vestido Kyara | 01100 | P | null | R$ 199,90 | vestido-kyara.jpg | 375 / vestido-kyara.jpg | Não |
| Vestido Elizabeth | 01231 | P, M, G, GG | null | R$ 219,90 | vestido-elizabeth.jpg | 377 / vestido-elizabeth.jpg | Não |
| Vestido Silmara | 00187 | EXG | null | R$ 119,90 | vestido-silmara.jpg | 393 / vestido-silmara.jpg | Não |
| Vestido Fernanda | 00964 | P, G | null | R$ 179,90 | vestido-fernanda.jpg | 395 / vestido-fernanda.jpg | Não |

### Blusas

| Nome | Código | Tamanhos | Cores | Preço fornecedor | Arquivo final | Bloco / original | Recorte |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Blusa Kelly | null | P, M, G, GG, EXG | null | R$ 79,90 | blusa-kelly.png | 11 / catalogo-0011-original.jpg | Sim |
| Blusa Tânia | null | P, M, G, GG, EXG | null | R$ 74,90 | blusa-tania.png | 38 / catalogo-0038-original.jpg | Sim |
| Blusa Patrícia | null | P, M, EXG | null | R$ 86,90 | blusa-patricia.png | 39 / catalogo-0039-original.jpg | Sim |
| Blusa Marta | null | P, M, G, EXG | null | R$ 77,90 | blusa-marta.png | 40 / catalogo-0040-original.jpg | Sim |
| Blusa Guta | null | P, M, GG, EXG | null | R$ 79,90 | blusa-guta.png | 46 / catalogo-0046-original.jpg | Sim |
| Blusa Bruna | null | P, M, G, GG, EXG | null | R$ 99,90 | blusa-bruna.png | 94 / catalogo-0094-original.jpg | Sim |
| Blusa Melissa | null | P, M, G, GG, EXG | null | R$ 109,90 | blusa-melissa.png | 102 / catalogo-0102-original.jpg | Sim |
| Blusa Lenita | null | M, G, GG, EXG | null | R$ 129,90 | blusa-lenita.png | 133 / catalogo-0133-original.png | Sim |
| Blusa Lavinia | null | P, M, G, GG, EXG | null | R$ 79,90 | blusa-lavinia.png | 223 / catalogo-0223-original.jpg | Sim |
| Blusa Fabiola | null | G, GG, EXG | null | R$ 109,90 | blusa-fabiola.png | 194 / catalogo-0194-original.png | Sim |
| Blusa Catarina | 01362 | M, G, GG, EXG | null | R$ 89,90 | blusa-catarina.png | 195 / catalogo-0195-original.jpg | Sim |
| Blusa Yara | null | P, M, G, GG, EXG | null | R$ 109,90 | blusa-yara.png | 199 / catalogo-0199-original.jpg | Sim |
| Blusa Valesca | null | P, M, EXG | null | R$ 119,90 | blusa-valesca.png | 201 / catalogo-0201-original.jpg | Sim |
| Blusa Lais | null | P, M, G, GG, EXG | null | R$ 99,90 | blusa-lais.png | 202 / catalogo-0202-original.jpg | Sim |
| Blusa Mari | 01294 | P, M, G | null | R$ 79,90 | blusa-mari.png | 205 / catalogo-0205-original.png | Sim |
| Blusa Andréia | 01375 | P, M, G, GG, EXG | null | R$ 89,90 | blusa-andreia.png | 330 / catalogo-0330-original.jpg | Sim |
| Blusa Lucilene | 01252 | P, M, G | null | R$ 79,90 | blusa-lucilene.png | 239 / catalogo-0239-original.png | Sim |
| Blusa Clara | null | P, M, G | null | R$ 79,90 | blusa-clara.png | 240 / catalogo-0240-original.png | Sim |
| Blusa Solange | 01272 | P, M | null | R$ 79,90 | blusa-solange.png | 250 / catalogo-0250-original.png | Sim |
| Blusa Bella | 00424 | M | null | R$ 79,90 | blusa-bella.png | 251 / catalogo-0251-original.png | Sim |
| Blusa Fabiana | 00699 | P | null | R$ 89,90 | blusa-fabiana.png | 252 / catalogo-0252-original.png | Sim |
| Blusa Alanis | 01233 | P, M | null | R$ 74,90 | blusa-alanis.png | 304 / catalogo-0304-original.jpg | Sim |
| Blusa Iolanda Plus Size | 01047 | 48, 50, 52, 54 | null | R$ 79,90 | blusa-iolanda-plus-size.png | 307 / catalogo-0307-original.png | Sim |
| Blusa Rosana | 01028 | 48, 50, 52, 54 | null | R$ 48,50 | blusa-rosana.png | 309 / catalogo-0309-original.png | Sim |
| Blusa Jane | 01376 | M, G, GG | null | R$ 89,90 | blusa-jane.png | 326 / catalogo-0326-original.jpg | Sim |
| Blusa Elisa | 01277 | P, G | null | R$ 79,90 | blusa-elisa.jpg | 334 / blusa-elisa.jpg | Não |
| Blusa Cibele | 01316 | P, M, G | null | R$ 79,90 | blusa-cibele.png | 340 / catalogo-0340-original.jpg | Sim |
| Blusa Cristiane | 01192 | P | null | R$ 99,90 | blusa-cristiane.png | 343 / catalogo-0343-original.jpg | Sim |
| Blusa Paola | 00873 | P | null | R$ 79,90 | blusa-paola.png | 353 / catalogo-0353-original.jpg | Sim |
| Blusa Ingrid | 01213 | P, GG | null | R$ 79,90 | blusa-ingrid.png | 357 / catalogo-0357-original.jpg | Sim |
| Blusa Priscila | 01279 | G, EXG | null | R$ 79,90 | blusa-priscila.png | 359 / catalogo-0359-original.jpg | Sim |
| Blusa Edna | 01261 | M, G | null | R$ 79,90 | blusa-edna.png | 362 / catalogo-0362-original.jpg | Sim |
| Blusa Pamela | 01297 | P, GG | null | R$ 79,90 | blusa-pamela.png | 366 / catalogo-0366-original.jpg | Sim |
| Blusa Leona | 01292 | M, GG, EXG | null | R$ 74,90 | blusa-leona.png | 376 / catalogo-0376-original.jpg | Sim |
| Blusa Carolina | 01232 | P, M, G | null | R$ 79,90 | blusa-carolina.png | 378 / catalogo-0378-original.jpg | Sim |
| Blusa Thalita | 00729 | P, M, GG, EXG | null | R$ 49,90 | blusa-thalita.png | 379 / catalogo-0379-original.jpg | Sim |
| Blusa Rafaela | 00994 | P | null | R$ 79,90 | blusa-rafaela.png | 388 / catalogo-0388-original.jpg | Sim |
| Blusa Daniele | 00913 | P | null | R$ 79,90 | blusa-daniele.png | 389 / catalogo-0389-original.jpg | Sim |
| Blusa Jasmim | 00909 | P | null | R$ 69,90 | blusa-jasmim.png | 391 / catalogo-0391-original.jpg | Sim |
| Blusa Camily | 00866 | P, M | null | R$ 49,90 | blusa-camily.png | 392 / catalogo-0392-original.jpg | Sim |
| Blusa Marê | 00707 | M, GG | null | R$ 69,90 | blusa-mare.png | 396 / catalogo-0396-original.jpg | Sim |
| Blusa Betina | 00675 | P, M, GG | null | R$ 69,90 | blusa-betina.png | 398 / catalogo-0398-original.jpg | Sim |
| Blusa Marléia | 01399 | P, M, G, GG, EXG | null | R$ 79,90 | blusa-marleia.jpg | 399 / blusa-marleia.jpg | Não |
| Blusa Sol | 01157 | P, M, G | null | R$ 79,90 | blusa-sol.jpg | 400 / blusa-sol.jpg | Não |
| Blusa Isa | 01118 | P | null | R$ 99,90 | blusa-isa.jpg | 402 / blusa-isa.jpg | Não |
| Blusa Otília | 00046 | GG, EXG | null | R$ 79,90 | blusa-otilia.jpg | 403 / blusa-otilia.jpg | Não |
| Blusa Ludmila | 00959 | P | null | R$ 79,90 | blusa-ludmila.jpg | 405 / blusa-ludmila.jpg | Não |
| Blusa Nayane | 00388 | P | null | R$ 59,90 | blusa-nayane.jpg | 406 / blusa-nayane.jpg | Não |
| Blusa Lucy | 00028 | PP | null | R$ 69,90 | blusa-lucy.jpg | 407 / blusa-lucy.jpg | Não |
| Blusa Paula | 01369 | G | null | R$ 89,90 | blusa-paula.jpg | 408 / blusa-paula.jpg | Não |

### Saias

| Nome | Código | Tamanhos | Cores | Preço fornecedor | Arquivo final | Bloco / original | Recorte |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Saia Kelly | null | P, M, G, GG | null | R$ 139,90 | saia-kelly.png | 11 / catalogo-0011-original.jpg | Sim |
| Saia Sueli | 01180 | P, M, G, GG, EXG | null | R$ 79,90 | saia-sueli.png | 39 / catalogo-0039-original.jpg | Sim |
| Saia Alessandra | null | PP, P, M, G | null | R$ 159,90 | saia-alessandra.png | 99 / camisa-maisa-original.jpg | Sim |
| Saia Katy | 01396 | P, M, G, GG, EXG | null | R$ 94,90 | saia-katy.png | 100 / catalogo-0100-original.jpg | Sim |
| Saia Jéssica | 00990 | PP, P, M, G, GG, EXG | null | R$ 89,90 | saia-jessica.png | 105 / catalogo-0105-original.jpg | Sim |
| Saia Marjorie | null | P, EXG | null | R$ 169,90 | saia-marjorie.png | 120 / camisa-beatriz-original.jpg | Sim |
| Saia Larissa | null | P, G | null | R$ 119,90 | saia-larissa.png | 133 / catalogo-0133-original.png | Sim |
| Saia Ester | null | M, G, GG, EXG | null | R$ 89,90 | saia-ester.png | 134 / catalogo-0134-original.jpg | Sim |
| Saia Nataly | 00168 | GG, EXG | null | R$ 72,90 | saia-nataly.jpg | 423 / saia-nataly.jpg | Não |
| Saia Yasmim | null | P, EXG | null | R$ 159,90 | saia-yasmim.png | 180 / catalogo-0180-original.jpg | Sim |
| Saia Gabriele | null | P, M, G, GG, EXG | null | R$ 119,90 | saia-gabriele.png | 191 / catalogo-0191-original.jpg | Sim |
| Saia Tamires | null | M, G | null | R$ 99,90 | saia-tamires.png | 194 / catalogo-0194-original.png | Sim |
| Saia Nancy | null | P, M, G, GG, EXG | null | R$ 89,90 | saia-nancy.png | 202 / catalogo-0202-original.jpg | Sim |
| Saia Nathalia | null | P, M, G, GG, EXG | null | R$ 109,90 | saia-nathalia.jpg | 221 / saia-nathalia.jpg | Não |
| Saia Thalia | 01454 | P | null | R$ 119,90 | saia-thalia.png | 204 / camisa-relga-original.png | Sim |
| Saia Claudia | null | PP, P | null | R$ 119,90 | saia-claudia.png | 210 / catalogo-0210-original.jpg | Sim |
| Saia Cibele | null | PP, P, M, G, GG | null | R$ 89,90 | saia-cibele.png | 215 / catalogo-0215-original.jpg | Sim |
| Saia Eliete | null | P, M, G, GG | null | R$ 79,90 | saia-eliete.png | 237 / catalogo-0237-original.png | Sim |
| Saia Camila | null | PP, P | null | R$ 119,90 | saia-camila.png | 247 / catalogo-0247-original.jpg | Sim |
| Saia Pamela | null | EXG | null | R$ 119,90 | saia-pamela.png | 250 / catalogo-0250-original.png | Sim |
| Saia Clara | 00754 | EXG | null | R$ 99,90 | saia-clara.png | 252 / catalogo-0252-original.png | Sim |
| Saia Perla | 01082 | P | null | R$ 109,90 | saia-perla.png | 281 / catalogo-0281-original.jpg | Sim |
| Saia Vilma | 00696 | P, M, G, GG, EXG | null | R$ 89,90 | saia-vilma.png | 293 / catalogo-0293-original.jpg | Sim |
| Saia Eliz | 01378 | P, GG, EXG | null | R$ 89,90 | saia-eliz.png | 332 / catalogo-0332-original.jpg | Sim |
| Saia Valentina | 01348 | GG, EXG | null | R$ 79,90 | saia-valentina.png | 340 / catalogo-0340-original.jpg | Sim |
| Saia Celeste | 01339 | G | null | R$ 89,90 | saia-celeste.png | 343 / catalogo-0343-original.jpg | Sim |
| Saia Breda | 01136 | P, G, EXG | null | R$ 109,90 | saia-breda.png | 347 / catalogo-0347-original.jpg | Sim |
| Saia Ruth | 01230 | P, GG, EXG | null | R$ 79,90 | saia-ruth.png | 348 / catalogo-0348-original.jpg | Sim |
| Saia Gildete | 00450 | P, M, G, GG, EXG | null | R$ 89,90 | saia-gildete.png | 358 / catalogo-0358-original.jpg | Sim |
| Saia Ayla | 00797 | G, GG | null | R$ 89,90 | saia-ayla.png | 360 / catalogo-0360-original.jpg | Sim |
| Saia Patrícia | 00872 | M, G, EXG | null | R$ 89,90 | saia-patricia.png | 386 / catalogo-0386-original.jpg | Sim |
| Saia Jamily | 00926 | P, EXG | null | R$ 89,90 | saia-jamily.png | 391 / catalogo-0391-original.jpg | Sim |
| Saia Marieta | 01112 | P | null | R$ 129,90 | saia-marieta.jpg | 420 / saia-marieta.jpg | Não |
| Saia Meire | 00137 | P, G, GG, EXG | null | R$ 72,90 | saia-meire.jpg | 421 / saia-meire.jpg | Não |
| Saia Jussara | null | GG, EXG | null | R$ 139,90 | saia-jussara.jpg | 425 / saia-jussara.jpg | Não |
| Saia Reder | 01310 | M, G, GG, EXG | null | R$ 79,90 | saia-reder.jpg | 426 / saia-reder.jpg | Não |
| Saia Carla | 00154 | GG | null | R$ 99,90 | saia-carla.jpg | 428 / saia-carla.jpg | Não |

### Conjuntos

| Nome | Código | Tamanhos | Cores | Preço fornecedor | Arquivo final | Bloco / original | Recorte |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Conjunto Tamy | null | EXG | null | R$ 165,90 | conjunto-tamy.jpg | 73 / conjunto-tamy.jpg | Não |
| Conjunto Mayara | null | P, M, G, GG, EXG | null | R$ 229,90 | conjunto-mayara.jpg | 103 / conjunto-mayara.jpg | Não |
| Conjunto Dandara | null | PP, P, M, G, GG | null | R$ 239,90 | conjunto-dandara.jpg | 104 / conjunto-dandara.jpg | Não |
| Conjunto Katharina | null | P, M, G, GG, EXG | null | R$ 247,90 | conjunto-katharina.jpg | 107 / conjunto-katharina.jpg | Não |
| Conjunto Olivia | null | P, M, G, GG | null | R$ 259,90 | conjunto-olivia.jpg | 124 / conjunto-olivia.jpg | Não |
| Conjunto Ludmila | null | PP, P | null | R$ 209,90 | conjunto-ludmila.jpg | 127 / conjunto-ludmila.jpg | Não |
| Conjunto Magnolia | null | P, M, G, GG, EXG | null | R$ 249,90 | conjunto-magnolia.jpg | 131 / conjunto-magnolia.jpg | Não |
| Conjunto Dione | null | P, M, G, GG, EXG | null | R$ 269,90 | conjunto-dione.jpg | 136 / conjunto-dione.jpg | Não |
| Conjunto Pamela | null | P, M, G, GG | null | R$ 269,90 | conjunto-pamela.jpg | 139 / conjunto-pamela.jpg | Não |
| Conjunto Lena | null | G, GG, EXG | null | R$ 249,90 | conjunto-lena.jpg | 140 / conjunto-lena.jpg | Não |
| Conjunto Tiffany | null | P, M, G, GG, EXG | null | R$ 249,90 | conjunto-tiffany.jpg | 148 / conjunto-tiffany.jpg | Não |
| Conjunto Emma | null | P, M, G, GG | null | R$ 299,90 | conjunto-emma.jpg | 149 / conjunto-emma.jpg | Não |
| Conjunto Shirley | null | P, M, G, EXG | null | R$ 219,90 | conjunto-shirley.jpg | 150 / conjunto-shirley.jpg | Não |
| Conjunto Laura | null | GG | null | R$ 289,90 | conjunto-laura.jpg | 151 / conjunto-laura.jpg | Não |
| Conjunto Alanes | null | PP, P, M, G, GG | null | R$ 269,90 | conjunto-alanes.jpg | 152 / conjunto-alanes.jpg | Não |
| Conjunto Charlotte | null | P, M, G, GG, EXG | null | R$ 199,90 | conjunto-charlotte.jpg | 153 / conjunto-charlotte.jpg | Não |
| Conjunto Clara | null | P, M, G, GG, EXG | null | R$ 219,90 | conjunto-clara.jpg | 154 / conjunto-clara.jpg | Não |
| Conjunto Jeh | null | PP, P, M, G, GG | null | R$ 269,90 | conjunto-jeh.jpg | 159 / conjunto-jeh.jpg | Não |
| Conjunto Rafaela | null | G | null | R$ 269,90 | conjunto-rafaela.jpg | 160 / conjunto-rafaela.jpg | Não |
| Conjunto Edite | 01144 | M, G, GG, EXG | null | R$ 189,90 | conjunto-edite.jpg | 162 / conjunto-edite.jpg | Não |
| Conjunto Ariane | null | G | null | R$ 239,90 | conjunto-ariane.jpg | 171 / conjunto-ariane.jpg | Não |
| Conjunto Evilyn | null | GG | null | R$ 189,90 | conjunto-evilyn.jpg | 224 / conjunto-evilyn.jpg | Não |
| Conjunto Nataly | 01267 | PP, P | null | R$ 229,90 | conjunto-nataly.png | 232 / conjunto-nataly.png | Não |
| Conjunto Lidia | null | P, M | null | R$ 219,90 | conjunto-lidia.jpg | 282 / conjunto-lidia.jpg | Não |
| Conjunto Mariah | 01392 | P | null | R$ 169,90 | conjunto-mariah.jpg | 286 / conjunto-mariah.jpg | Não |
| Conjunto Isabela | 01401 | PP, P, M, G | null | R$ 189,90 | conjunto-isabela.jpg | 288 / conjunto-isabela.jpg | Não |
| Conjunto Larissa | 01295 | GG, EXG | null | R$ 219,90 | conjunto-larissa.jpg | 369 / conjunto-larissa.jpg | Não |

### Camisas

| Nome | Código | Tamanhos | Cores | Preço fornecedor | Arquivo final | Bloco / original | Recorte |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Camisa Ludmila | 01146 | P | null | R$ 99,90 | camisa-ludmila.png | 382 / catalogo-0382-original.jpg | Sim |

### Outros

| Nome | Código | Tamanhos | Cores | Preço fornecedor | Arquivo final | Bloco / original | Recorte |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Jardineira com Blusa Olivia | 01186 | EXG | null | R$ 249,90 | jardineira-com-blusa-olivia.jpg | 112 / jardineira-com-blusa-olivia.jpg | Não |
| Trijunto Julia | null | PP, P, M, G, GG | null | R$ 329,90 | trijunto-julia.jpg | 141 / trijunto-julia.jpg | Não |
| Tubinho Laura | 01209 | GG, EXG | null | R$ 169,90 | tubinho-laura.jpg | 219 / tubinho-laura.jpg | Não |
| T-Shirt Sara | 00612 | PP, P | null | R$ 49,90 | t-shirt-sara.jpg | 410 / t-shirt-sara.jpg | Não |

## 9–10. Imagens e originais

201 arquivos finais, 73 recortes retangulares e 60 novos arquivos originais distintos preservados em `assets/imagens/produtos/` (inclusive fontes das imagens compartilhadas). Formato real conferido pela decodificação; originais JPEG/PNG, recortes PNG. Nenhum arquivo anterior foi sobrescrito. Todos os nomes finais usam minúsculas, hífens e ausência de acentos/espaços.

Seis painéis de originais e três de recortes documentam a inspeção visual. Os retângulos estão em `plano-imagens.json`; o recortador clona pixels do original, verifica amostras de pixels correspondentes e não redimensiona, deforma, reconstrói ou retoca roupas. As cópias completas mantêm os bytes originais.

## 11. Performance

A entrada tem somente 9 cards de novidades e nenhum card de catálogo. Na medição inicial, 8 imagens de produtos foram solicitadas, incluindo capas de categorias. Não foram renderizados nem solicitados centenas de produtos na entrada. Todas as imagens de cards usam `loading="lazy"`, `decoding="async"` e alt com nome. Não foram adicionados frameworks ou bibliotecas.

## 12. Paginação

Lotes de 24: abertura mostra 24 cards, primeiro clique em “Ver mais produtos” mostra 48 e os próximos cliques somam mais 24 até 260. O contador principal representa o total filtrado; o indicador inferior informa os cards exibidos. O botão desaparece quando a lista acaba ou não há resultados. Busca/categoria/ordenação/limpeza reiniciam em 24. Novos grupos são acrescentados sem recriar os cards anteriores.

## 13. CTA

“Explorar catálogo completo →” ganhou tamanho, fundo accent marrom da identidade existente, texto branco, sombra discreta, hover e adaptação mobile. A segunda linha é derivada de `produtos.length`: **260 peças disponíveis**. Ambos os pontos de entrada usam esta contagem. O clique abre o catálogo e rola até ele; a preferência por movimento reduzido é respeitada.

## 14. Validações

Chrome real/headless: Chrome/154.0.8037.95.

| Tela | Grid de novidades | Rolagem horizontal | Cards |
| --- | --- | --- | --- |
| 1440 px | 3 colunas | Não | Alinhados |
| 768 px | 2 colunas | Não | Alinhados |
| 390 px | 1 colunas | Não | Alinhados |

- Sintaxe de `script.js` e helper válida; HTML com aninhamento válido, IDs únicos, controles rotulados e links externos seguros.
- 260 nomes únicos após normalização; caminhos de imagens únicos e existentes.
- Todos os 59 objetos anteriores e hashes antigos idênticos.
- Exatamente 9 novidades originais, 3 em cada categoria original; todos os novos com `novidade: false`.
- Todos os novos com preço `null`; consulta de preço e disponibilidade no WhatsApp, número `5511971949711` preservado.
- 260 buscas de nome e mensagens/grades corretas; acentos, capitalização, início de palavra e categorias testados.
- Todos os filtros, total/singular/zero, ordenação A–Z/Z–A, paginação/reset/fim e limpeza aprovados.
- 260 imagens decodificadas no Chrome; proporções preservadas com `object-fit: contain`.
- CTA, catálogo, paginação, header, hero, categorias, Sobre, Contato, footer e voltar ao topo verificados nas três larguras.
- Nenhum erro de JavaScript/console na validação final. Capturas estão nesta pasta.
- `git diff --check` aprovado; avisos locais LF→CRLF são somente de conversão de finais de linha.

A primeira tentativa do Chrome no sandbox teve timeout antes de abrir a página; a repetição autorizada completou os testes. Links de imagem expirados foram renovados lendo a mesma página autorizada. Nenhuma dessas tentativas incompletas foi tratada como validação aprovada.

## 15. Arquivos e Git

Alterados: `index.html`, `script.js`, `style.css`, `verificacao/testar-site.mjs`. Criadas imagens finais/originais, inventário, evidências, relatórios e ferramentas auxiliares de importação/verificação. Lista completa: [arquivos-incluidos.txt](arquivos-incluidos.txt) (326 caminhos). As capturas anteriores da primeira evolução permaneceram preservadas; evidências novas ficaram em `verificacao/expansao-completa/`.

Não houve commit, push, publicação, troca de remoto ou alterações fora do projeto. HEAD permaneceu `dfb7d8c2166d31cd6988fe134e930ca693811c99`.

Resumo de status:

```text
M index.html
 M script.js
 M style.css
 M verificacao/testar-site.mjs
+ imagens novas e relatórios/helpers não rastreados (lista completa em arquivos-incluidos.txt)
```

## 16. Fila de revisão e pendências

A lista completa e separada de 104 nomes, códigos, grades divergentes e motivos está em [ambiguos.md](ambiguos.md). As ocorrências completas com referências de imagem/preços do fornecedor estão em `analise.json`; não unir grades automaticamente.

Revisar visualmente o catálogo e os recortes antes de autorizar o commit. Definir preços de venda continua sendo uma tarefa da boutique. Confirmar com o fornecedor modelos homônimos, variantes e grades conflitantes antes de futuras importações. Nenhuma cor foi deduzida visualmente.

## 17. Limpeza controlada e revisão manual

Foram removidos somente 131 originais duplicados e quatro capturas redundantes autorizados. Os 128 produtos sem recorte preservam os bytes do fornecedor no próprio arquivo final; os manifestos agora usam esse arquivo como fonte. Três fontes de recorte reutilizam os originais já existentes de Camisa Maisa, Camisa Beatriz e Camisa Relga. Permanecem 60 novos originais necessários, além dessas três fontes antigas. Os 191 registros de origem do inventário foram mantidos, com os caminhos atualizados; não representam 191 arquivos originais separados. Todos os produtos e as imagens finais permaneceram inalterados.

As capturas anteriores equivalentes foram preservadas. A captura removida de início no desktop repetia a do catálogo e não era evidência independente do hero; a revisão final do hero foi feita no Chrome sem gravar novas capturas.

Pendências de revisão manual, sem novos recortes ou alterações de imagem:
- `saia-nataly.jpg`: resolução 372 × 433 px.
- `vestido-anne.png`: parte de outra pessoa na borda direita.
- `saia-eliete.png`: enquadramento do fornecedor não mostra toda a barra.
- Recortes quase quadrados: `blusa-alanis.png`, `blusa-andreia.png`, `blusa-betina.png`, `blusa-camily.png`, `blusa-carolina.png`, `blusa-cibele.png`, `blusa-clara.png`, `blusa-cristiane.png`, `blusa-daniele.png`, `blusa-edna.png`, `blusa-ingrid.png`, `blusa-jane.png`, `blusa-jasmim.png`, `blusa-kelly.png`, `blusa-leona.png`, `blusa-mare.png`, `blusa-pamela.png`, `blusa-paola.png`, `blusa-priscila.png`, `blusa-rafaela.png`, `blusa-rosana.png`, `blusa-thalita.png`, `camisa-ludmila.png`.

Os scripts de importação documentam esta rodada e requerem nova conferência antes de uso em um catálogo atualizado. A limpeza não os transforma em automação genérica.

Economia: 41.010.016 bytes (aproximadamente 39,1 MiB). Após a limpeza, 326 arquivos novos ou alterados compõem a lista para eventual commit, incluindo o README atualizado. Não houve commit ou push nesta etapa.
