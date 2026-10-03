# V2 final — relatório de implementação e revisão

## Estado preservado

260 produtos, 7 categorias, 9 novidades; 124 códigos de fornecedor conhecidos e 136 `null`. O trecho do array foi comparado integralmente com HEAD e permaneceu idêntico, incluindo nomes, códigos, grades, cores, categorias, preços, novidades e imagens. Todos os preços continuam `null`. WhatsApp: `5511971949711`, preservado. Nenhum candidato pendente importado ou imagem de produto alterada.

| Categoria | Produtos | Novidades |
| --- | ---: | ---: |
| Vestidos | 97 | 3 |
| Blusas | 64 | 3 |
| Saias | 51 | 3 |
| Conjuntos | 32 | 0 |
| Camisas | 6 | 0 |
| Blazers | 1 | 0 |
| Outros | 9 | 0 |

## Funcionalidades implementadas

- Vistos recentemente com `evelinRecentes`: até 8 identificadores estáveis válidos, sem duplicatas, mais recente primeiro, persistência e sincronização entre abas. JSON inválido/IDs inexistentes são ignorados; armazenamento bloqueado mantém sessão e avisa. Não guarda objetos completos.
- Interações registradas: abrir detalhe, favoritar/desfavoritar, selecionar tamanho, adicionar à sacola, clicar no WhatsApp e compartilhar. Rolagem/renderização de cards não é tratada como visualização. Uma interação que não muda a ordem não grava novamente.
- Faixa horizontal de recentes, oculta quando vazia, com rolagem por toque e região focável por teclado. Até 8 cards, imagens lazy, ações de favorito, tamanho, sacola, WhatsApp e compartilhar reutilizadas.
- Compartilhamento: `navigator.share()` quando disponível; cancelamento não aciona fallback. Falha ou falta da API leva à cópia de nome/link via Clipboard API. Se indisponível/bloqueada, prompt para cópia manual. Texto e URL não contêm referência interna nem preço do fornecedor.
- Link público `?produto=nome-da-peca`, derivado do nome normalizado. Os 260 slugs atuais são únicos. Link válido localiza a peça no catálogo e abre o detalhe; inexistente é ignorado sem erro. Não há páginas ou roteador extra. Mudança futura de nome pode invalidar links.
- Detalhe nativo: imagem ampliada, mesmos dados e ações do card. Um único dialog reutilizado, Escape, fechamento visível, ciclo de Tab e retorno do foco. Suporta abertura a partir de Favoritos, inclusive se o produto é removido enquanto o detalhe está aberto.

## Decisão sobre detalhe e hierarquia

O detalhe foi implementado porque permite inspecionar a foto sem abandonar os filtros, sobretudo em celular. Reaproveita o card e evita duplicar regras de tamanho, favorito e WhatsApp. Não foram criadas páginas individuais, galeria adicional ou novos dados.

A imagem é o controle de abertura do detalhe; coração ao lado do nome; tamanho e **Adicionar à sacola** como ação principal; WhatsApp e Compartilhar lado a lado como ações secundárias. Não há quatro botões grandes empilhados. Mantido o texto do WhatsApp.

## UX mobile e acessibilidade

- Botões secundários com altura mínima de 44 px, filtros/limpeza/menu com área de toque mínima no mobile.
- Espaço entre controles reduzido moderadamente, preservando labels e seleção nativa.
- Faixa de recentes limita altura da seção e permite deslizar, sem ampliar a largura da página.
- Detalhe com altura limitada à viewport, corpo rolável e cabeçalho de fechamento sempre disponível; imagem `contain`, sem deformação.
- Labels/aria-label nas ações, imagem com alt do produto, região de recentes focável e avisos live no detalhe.
- Foco visível e contido no detalhe, Escape e retorno ao acionador; quando um card de Favoritos deixa de existir, retorna ao fechamento daquele painel.
- Botão principal com fundo escuro e texto branco; ações secundárias com texto escuro e fundos claros, preservando a paleta.

## Revisão dos 104 candidatos

Resultado final: **14 no grupo A, 90 no B e 0 no C**. Tabela individual em `ambiguos.md`; códigos, blocos, grades e motivos em `ambiguos.json`. Ferramenta reproduzível: `../revisar-ambiguos-v2.mjs`.

A resolve somente identidade/referência nos registros: uma referência em todas as ocorrências, sem reutilização por outro nome na base local e sem conflito relevante de modelo/tecido; exceção documentada para Saia Rosane 00436 distinta de Rosane Plus Size 00840. Grades inconsistentes continuam exigindo confirmação atual. Não é uma lista pronta para importação. B inclui códigos ausentes/conflitantes, grafias próximas sem confirmação e descrições/modelos divergentes. Não foi seguro descartar nenhum como novo só pelo nome.

Fonte local: inventário de `2026-10-02T20:56:55.3063920Z`, manifestos e códigos atuais. Não foi necessário acessar novamente o catálogo e não se afirma disponibilidade atual. Nenhum candidato cadastrado, nenhum código de produto preenchido nesta rodada.

## Revisão das imagens

26 arquivos inspecionados: os 3 casos nominados e 23 recortes quase quadrados. Classificação e dimensões individuais em `imagens-revisadas.md/json`, com três painéis proporcionais.

- 5 boas: Blusa Carolina, Clara, Cristiane, Leona e Rosana.
- 20 aceitáveis: as demais, incluindo Nataly e Eliete.
- 1 para recorte manual posterior: Vestido Anne, devido à outra pessoa à direita. A fonte preservada foi aberta e confirma que vale avaliar estreitar essa borda sem cortar manga/vestido. Nenhuma correção aplicada.
- Saia Nataly: 372×433 px; recortar não melhora a resolução. Legível no card, limitada na ampliação.
- Saia Eliete: a inspeção ampliada do arquivo atual e da fonte confirma barra visível e saia inteira, próxima da borda inferior. A pendência anterior não justifica novo recorte automaticamente.
- Formato quase quadrado não significa imagem defeituosa: as peças estão reconhecíveis. Recorte mais estreito pode eliminar mangas; manter e avaliar individualmente se houver incômodo visual real.

Nenhuma imagem do catálogo baixada ou sobrescrita. Painéis são evidências de revisão, não novos arquivos de roupa.

## Performance

Entrada sem histórico: 9 cards de novidades e 0 de catálogo. Com histórico, no máximo mais 8 cards na faixa. Catálogo continua em lotes de 24, com append preservando cards existentes; filtros reiniciam o lote. Imagens do catálogo/recentes usam lazy loading e proporção preservada. Detalhe gera apenas um card por abertura, substituindo o anterior.

Uma delegação de clique atende ações dos cards e WhatsApp; uma de change registra seleção de tamanho. Listeners são instalados na inicialização, não a cada renderização. Preferências são reconstruídas por IDs e lidas na entrada/evento storage, sem leitura de storage por card. Não há framework/biblioteca adicional.

## README e arquivos

README reescrito para documentar catálogo, filtro por tamanho, códigos, favoritos/sacola, mensagens WhatsApp, recentes, compartilhamento, detalhe, tecnologias, Pages, testes e limitações.

Alterados: `README.md`, `index.html`, `script.js`, `style.css`.

Criados: `verificacao/testar-v2-final.mjs`, `verificacao/revisar-ambiguos-v2.mjs`, `verificacao/revisar-imagens-v2.ps1` e evidências/relatórios em `verificacao/v2-final/`. Relatórios e capturas anteriores preservados. Nenhuma imagem/dado de produto modificado.

## Testes e evidências

Resultados finais em `resultados.json`. Regressão completa usa Chrome real headless em 1440×1000, 768×1024 e 390×844: dados, 260 imagens, 260 buscas/mensagens individuais, categorias, tamanho, ordenação, paginação/contador/reset/limpar, favoritos/sacola/persistência/WhatsApp coletivo, recentes/limite/ordem/duplicatas, detalhes, teclado, foco, Escape e ausência de erros no console.

Web Share/clipboard são simulados no navegador de teste; valida-se conteúdo, seleção do caminho de API, cancelamento e fallback manual. Isso não confirma o seletor nativo de um celular físico. Deep links são navegados realmente pelo Chrome. Capturas representativas de início, catálogo, recentes e detalhe estão nesta pasta; a faixa horizontal tem rolagem interna intencional, não overflow da página.

## Limitações e recomendação

Não implementados login, checkout, backend, pagamentos ou sincronização entre dispositivos, conforme escopo. Sem novas importações, recortes de roupa ou redesenho. Não houve commit, push ou publicação.

Recomendo considerar a V2 concluída após revisão visual do proprietário e uma checagem de compartilhamento/cópia em celular real. Grades dos candidatos ambíguos, qualidade de Nataly e recorte de Anne permanecem pendências de manutenção, sem bloquear os fluxos atuais. Links de nome exigem cuidado em futuras renomeações; armazenamento continua local e sujeito às permissões do navegador.
