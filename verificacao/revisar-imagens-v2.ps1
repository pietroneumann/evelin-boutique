param()
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$raiz = Split-Path $PSScriptRoot -Parent
$destino = Join-Path $PSScriptRoot 'v2-final'
$nomes = @('saia-nataly.jpg','vestido-anne.png','saia-eliete.png','blusa-alanis.png','blusa-andreia.png','blusa-betina.png','blusa-camily.png','blusa-carolina.png','blusa-cibele.png','blusa-clara.png','blusa-cristiane.png','blusa-daniele.png','blusa-edna.png','blusa-ingrid.png','blusa-jane.png','blusa-jasmim.png','blusa-kelly.png','blusa-leona.png','blusa-mare.png','blusa-pamela.png','blusa-paola.png','blusa-priscila.png','blusa-rafaela.png','blusa-rosana.png','blusa-thalita.png','camisa-ludmila.png')
$fonte = [System.Drawing.Font]::new('Arial', 12)
$inventario = @()
for ($pagina=0; $pagina*12 -lt $nomes.Count; $pagina++) {
    $lote = @($nomes | Select-Object -Skip ($pagina*12) -First 12)
    $painel = [System.Drawing.Bitmap]::new(1000, ([int][Math]::Ceiling($lote.Count/4)*330))
    $g = [System.Drawing.Graphics]::FromImage($painel)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    for ($i=0; $i -lt $lote.Count; $i++) {
        $imagem = [System.Drawing.Image]::FromFile((Join-Path $raiz ('assets/imagens/produtos/'+$lote[$i])))
        $x=($i%4)*250; $y=[int][Math]::Floor($i/4)*330
        $escala=[Math]::Min(240/$imagem.Width,295/$imagem.Height)
        $w=[int]($imagem.Width*$escala); $h=[int]($imagem.Height*$escala)
        $g.DrawImage($imagem,[System.Drawing.Rectangle]::new([int]($x+(250-$w)/2),$y,$w,$h))
        $g.DrawString($lote[$i],$fonte,[System.Drawing.Brushes]::Black,$x+4,$y+302)
        $inventario += [pscustomobject]@{arquivo=$lote[$i];largura=$imagem.Width;altura=$imagem.Height}
        $imagem.Dispose()
    }
    $painel.Save((Join-Path $destino ('pendencias-painel-'+($pagina+1)+'.jpg')),[System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose(); $painel.Dispose()
}
$fonte.Dispose()
$inventario | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $destino 'imagens-dimensoes.json') -Encoding UTF8
