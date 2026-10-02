param([int]$Limite = 0)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$pastaEvidencias = Join-Path $PSScriptRoot 'expansao-completa'
$raizProjeto = Split-Path $PSScriptRoot -Parent
$pastaProdutos = Join-Path $raizProjeto 'assets/imagens/produtos'
$analise = Get-Content -LiteralPath (Join-Path $pastaEvidencias 'analise.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$pagina = Invoke-WebRequest -Uri $analise.fonte -UseBasicParsing -SessionVariable sessaoCatalogo
$fontes = @([regex]::Matches($pagina.Content, '<img\b[^>]*\bsrc="(https://sites.google.com/sitesv-images-rt/[^"]+)"[^>]*>', 'IgnoreCase') | ForEach-Object { [System.Net.WebUtility]::HtmlDecode($_.Groups[1].Value) })
$inventario = Get-Content -LiteralPath (Join-Path $pastaEvidencias 'catalogo-atual.json') -Raw -Encoding UTF8 | ConvertFrom-Json
if ($fontes.Count -ne $inventario.blocos.Count) { throw 'O catálogo mudou de estrutura; refaça a conferência antes de baixar.' }
$grupos = @($analise.seguros | Group-Object indice)
if ($Limite -gt 0) { $grupos = @($grupos | Select-Object -First $Limite) }
$baixadas = [System.Collections.Generic.List[object]]::new()
foreach ($grupo in $grupos) {
    $indice = [int]$grupo.Name
    # Mantém os originais para inspeção antes de qualquer recorte/cadastro.
    $base = 'catalogo-' + $indice.ToString('0000') + '-original'
    $anterior = @(Get-ChildItem -LiteralPath $pastaProdutos -File | Where-Object BaseName -eq $base)
    if ($anterior.Count -gt 0) {
        $arquivo = $anterior[0]
    } else {
        $resposta = $null
        for ($tentativa = 0; $tentativa -lt 3; $tentativa++) {
            try {
                $resposta = Invoke-WebRequest -Uri $fontes[$indice] -WebSession $sessaoCatalogo -Headers @{Referer=$analise.fonte} -UseBasicParsing
                break
            } catch {
                # URLs assinadas expiram: obter novamente pela mesma página autorizada.
                $pagina = Invoke-WebRequest -Uri $analise.fonte -UseBasicParsing -SessionVariable sessaoCatalogo
                $fontes = @([regex]::Matches($pagina.Content, '<img\b[^>]*\bsrc="(https://sites.google.com/sitesv-images-rt/[^"]+)"[^>]*>', 'IgnoreCase') | ForEach-Object { [System.Net.WebUtility]::HtmlDecode($_.Groups[1].Value) })
                if ($fontes.Count -ne $inventario.blocos.Count) { throw 'Estrutura do catálogo mudou' }
            }
        }
        if ($null -eq $resposta) { throw ('Imagem indisponível após três tentativas: ' + $indice) }
        $bytes = $resposta.Content
        if ($bytes -isnot [byte[]]) { throw ('Resposta não binária no bloco ' + $indice) }
        $fluxo = [System.IO.MemoryStream]::new($bytes, $false)
        $imagem = [System.Drawing.Image]::FromStream($fluxo)
        $extensao = if ($imagem.RawFormat.Guid -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid) {'.jpg'} elseif ($imagem.RawFormat.Guid -eq [System.Drawing.Imaging.ImageFormat]::Png.Guid) {'.png'} else {throw ('Formato não suportado no bloco ' + $indice)}
        $destino = Join-Path $pastaProdutos ($base + $extensao)
        if (Test-Path -LiteralPath $destino) { throw 'Não sobrescrever imagem existente' }
        [System.IO.File]::WriteAllBytes($destino, $bytes)
        $imagem.Dispose(); $fluxo.Dispose()
        $arquivo = Get-Item -LiteralPath $destino
    }
    $imagem = [System.Drawing.Image]::FromFile($arquivo.FullName)
    $baixadas.Add(@{indice=$indice; arquivo=('assets/imagens/produtos/' + $arquivo.Name); largura=$imagem.Width; altura=$imagem.Height; nomes=@($grupo.Group.nome)})
    $imagem.Dispose()
    [System.IO.File]::WriteAllText((Join-Path $pastaEvidencias 'imagens-baixadas.json'), ($baixadas.ToArray() | ConvertTo-Json -Depth 8), [System.Text.UTF8Encoding]::new($false))
    Write-Output ($indice.ToString() + ': ' + ($grupo.Group.nome -join ' / '))
}
[System.IO.File]::WriteAllText((Join-Path $pastaEvidencias 'imagens-baixadas.json'), ($baixadas.ToArray() | ConvertTo-Json -Depth 8), [System.Text.UTF8Encoding]::new($false))
