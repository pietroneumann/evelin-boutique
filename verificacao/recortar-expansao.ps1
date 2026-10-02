$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$raizProjeto = [System.IO.Path]::GetFullPath((Split-Path $PSScriptRoot -Parent))
$pasta = Join-Path $PSScriptRoot 'expansao-completa'
$plano = Get-Content -LiteralPath (Join-Path $pasta 'plano-imagens.json') -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($produto in $plano) {
    $origem = [System.IO.Path]::GetFullPath((Join-Path $raizProjeto $produto.original))
    $destino = [System.IO.Path]::GetFullPath((Join-Path $raizProjeto $produto.imagem))
    if (!$origem.StartsWith($raizProjeto + [System.IO.Path]::DirectorySeparatorChar) -or !$destino.StartsWith($raizProjeto + [System.IO.Path]::DirectorySeparatorChar)) { throw 'Caminho fora do projeto' }
    if (Test-Path -LiteralPath $destino) { throw ('Não sobrescrever: ' + $destino) }
    if ($null -eq $produto.recorte) {
        Copy-Item -LiteralPath $origem -Destination $destino
    } else {
        $imagem = [System.Drawing.Bitmap]::FromFile($origem)
        $r = $produto.recorte
        $x = [int][Math]::Floor($imagem.Width * $r[0]); $y = [int][Math]::Floor($imagem.Height * $r[1])
        $w = [int][Math]::Floor($imagem.Width * $r[2]); $h = [int][Math]::Floor($imagem.Height * $r[3])
        if ($x+$w -gt $imagem.Width -or $y+$h -gt $imagem.Height -or $w -lt 1 -or $h -lt 1) { throw 'Recorte inválido' }
        $final = $imagem.Clone([System.Drawing.Rectangle]::new($x,$y,$w,$h),$imagem.PixelFormat)
        $final.Save($destino,[System.Drawing.Imaging.ImageFormat]::Png)
        for ($i=0; $i -lt 20; $i++) {
            $px = [int][Math]::Floor($w * $i/20); $py = [int][Math]::Floor($h * $i/20)
            if ($final.GetPixel($px,$py).ToArgb() -ne $imagem.GetPixel($x+$px,$y+$py).ToArgb()) { throw 'Pixel alterado no recorte' }
        }
        $final.Dispose(); $imagem.Dispose()
    }
}
Write-Output ('Imagens finais criadas: ' + $plano.Count)
