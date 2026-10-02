param([switch]$Recortes)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$raizProjeto = Split-Path $PSScriptRoot -Parent
$pasta = Join-Path $PSScriptRoot 'expansao-completa'
$imagens = @(Get-ChildItem -LiteralPath (Join-Path $raizProjeto 'assets/imagens/produtos') -File | Where-Object Name -Match '^catalogo-\d+-original\.(jpg|png)$' | Sort-Object Name)
if ($Recortes) {
    $plano = Get-Content -LiteralPath (Join-Path $pasta 'plano-imagens.json') -Raw -Encoding UTF8 | ConvertFrom-Json
    $imagens = @($plano | Where-Object {$null -ne $_.recorte} | ForEach-Object { Get-Item -LiteralPath (Join-Path $raizProjeto $_.imagem) })
}
$larguraCelula = 185
$alturaCelula = 300
$porPainel = 36
$fonte = [System.Drawing.Font]::new('Arial', 10)
for ($pagina = 0; $pagina * $porPainel -lt $imagens.Count; $pagina++) {
    $lote = @($imagens | Select-Object -Skip ($pagina * $porPainel) -First $porPainel)
    $painel = [System.Drawing.Bitmap]::new($larguraCelula * 6, $alturaCelula * [int][Math]::Ceiling($lote.Count / 6))
    $grafico = [System.Drawing.Graphics]::FromImage($painel)
    $grafico.Clear([System.Drawing.Color]::White)
    $grafico.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    for ($i = 0; $i -lt $lote.Count; $i++) {
        $imagem = [System.Drawing.Image]::FromFile($lote[$i].FullName)
        $x = ($i % 6) * $larguraCelula
        $y = [int][Math]::Floor($i / 6) * $alturaCelula
        $escala = [Math]::Min(($larguraCelula - 8) / $imagem.Width, ($alturaCelula - 30) / $imagem.Height)
        $w = [int]($imagem.Width * $escala); $h = [int]($imagem.Height * $escala)
        $grafico.DrawImage($imagem, [System.Drawing.Rectangle]::new([int]($x + ($larguraCelula-$w)/2), $y, $w, $h))
        $grafico.DrawString($lote[$i].BaseName.Replace('catalogo-','').Replace('-original',''), $fonte, [System.Drawing.Brushes]::Black, $x + 6, $y + $alturaCelula - 25)
        $imagem.Dispose()
    }
    $prefixo = if ($Recortes) {'recortes-painel-'} else {'originais-painel-'}
    $destino = Join-Path $pasta ($prefixo + ($pagina+1) + '.jpg')
    $painel.Save($destino, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $grafico.Dispose(); $painel.Dispose()
}
$fonte.Dispose()
Write-Output ($imagens.Count.ToString() + ' imagens em painéis proporcionais')
