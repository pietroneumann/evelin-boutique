$ErrorActionPreference = 'Stop'
$urlCatalogo = 'https://sites.google.com/view/mariaamorecatalogo/cat%C3%A1logo'
$pagina = Invoke-WebRequest -Uri $urlCatalogo -UseBasicParsing -SessionVariable sessaoCatalogo
$blocos = [System.Collections.Generic.List[object]]::new()
$atual = $null
foreach ($token in [regex]::Matches($pagina.Content, '<img\b[^>]*>|<p\b[^>]*>.*?</p>', 'Singleline,IgnoreCase')) {
    if ($token.Value.StartsWith('<img')) {
        $src = [regex]::Match($token.Value, '\bsrc="([^"]+)"').Groups[1].Value
        if ($src -match '^https://sites.google.com/sitesv-images-rt/') {
            $atual = @{indice=$blocos.Count; imagem=[System.Net.WebUtility]::HtmlDecode($src); textos=[System.Collections.Generic.List[string]]::new()}
            $blocos.Add($atual)
        }
    } elseif ($null -ne $atual) {
        $texto = [System.Net.WebUtility]::HtmlDecode([regex]::Replace($token.Value, '<[^>]+>', ''))
        $texto = [regex]::Replace($texto, '\s+', ' ').Trim()
        if ($texto) { $atual.textos.Add($texto) }
    }
}
$destino = Join-Path $PSScriptRoot 'expansao-completa'
[System.IO.Directory]::CreateDirectory($destino) | Out-Null
$inventario = @{fonte=$urlCatalogo; consultadoEm=(Get-Date).ToUniversalTime().ToString('o'); blocos=@($blocos.ToArray())}
$json = $inventario | ConvertTo-Json -Depth 12
[System.IO.File]::WriteAllText((Join-Path $destino 'catalogo-atual.json'), $json, [System.Text.UTF8Encoding]::new($false))
Write-Output ('Blocos com imagem: ' + $blocos.Count)
