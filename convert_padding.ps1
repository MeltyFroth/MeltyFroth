$cssFile = "css/style.css"
$content = Get-Content $cssFile -Raw -Encoding UTF8

Write-Host "Converting padding px to rem..."

# padding の px を rem に変換（16px = 1rem）
$content = $content -replace 'padding:\s*200px', 'padding: 12.5rem'
$content = $content -replace 'padding:\s*120px', 'padding: 7.5rem'
$content = $content -replace 'padding:\s*100px', 'padding: 6.25rem'
$content = $content -replace 'padding:\s*80px\s+20px', 'padding: 5rem 1.25rem'
$content = $content -replace 'padding:\s*80px\s+0', 'padding: 5rem 0'
$content = $content -replace 'padding:\s*80px', 'padding
