$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$raizProjeto = Split-Path $PSScriptRoot -Parent
$pastaProdutos = Join-Path $raizProjeto 'assets/imagens/produtos'

# Recortes retangulares: nenhuma reconstrução, retoque ou mudança de proporção.
$recortes = @(
    @{nome='blusa-debora'; fracao=0.73},
    @{nome='blusa-agatha'; fracao=0.72},
    @{nome='blusa-andreza'; fracao=0.72},
    @{nome='blusa-vera'; fracao=0.76},
    @{nome='blusa-valentina'; fracao=0.76},
    @{nome='camisa-maisa'; fracao=0.68},
    @{nome='camisa-eugenia'; fracao=0.70},
    @{nome='camisa-beatriz'; fracao=0.73},
    @{nome='camisa-jaqueline'; fracao=0.69},
    @{nome='camisa-relga'; fracao=0.71},
    @{nome='blazer-helena'; fracao=0.76},
    @{nome='casaquinho-iolanda'; fracao=0.76},
    @{nome='saia-karen'; inicio=0.34; fracao=0.65}
)

foreach ($recorte in $recortes) {
    $original = Get-ChildItem -LiteralPath $pastaProdutos | Where-Object BaseName -eq ($recorte.nome + '-original') | Select-Object -First 1
    if (!$original) {
        $fonte = Get-ChildItem -LiteralPath $pastaProdutos | Where-Object BaseName -eq $recorte.nome | Select-Object -First 1
        if (!$fonte) { throw ('Imagem não encontrada: ' + $recorte.nome) }
        $destinoOriginal = Join-Path $pastaProdutos ($recorte.nome + '-original' + $fonte.Extension)
        if (Test-Path -LiteralPath $destinoOriginal) { throw 'Original já existente' }
        Move-Item -LiteralPath $fonte.FullName -Destination $destinoOriginal
        $original = Get-Item -LiteralPath $destinoOriginal
    }
    $destinoRecorte = Join-Path $pastaProdutos ($recorte.nome + '.png')
    if (Test-Path -LiteralPath $destinoRecorte) { throw ('Recorte já existente: ' + $destinoRecorte) }
    $imagem = [System.Drawing.Bitmap]::FromFile($original.FullName)
    $inicio = if ($recorte.ContainsKey('inicio')) { [int]($imagem.Height * $recorte.inicio) } else { 0 }
    $altura = [int]($imagem.Height * $recorte.fracao)
    $retangulo = [System.Drawing.Rectangle]::new(0, $inicio, $imagem.Width, $altura)
    $final = $imagem.Clone($retangulo, $imagem.PixelFormat)
    $final.Save($destinoRecorte, [System.Drawing.Imaging.ImageFormat]::Png)
    $final.Dispose()
    $imagem.Dispose()
    Write-Output ($recorte.nome + '.png')
}
