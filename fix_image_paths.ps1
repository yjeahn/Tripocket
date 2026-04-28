$TargetDir = "images"
if (!(Test-Path -Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir | Out-Null
}

$FilesToProcess = @("index.html", "app.js", "style.css")

foreach ($File in $FilesToProcess) {
    if (Test-Path -Path $File) {
        $Content = Get-Content -Path $File -Raw -Encoding UTF8

        # Regex to match file:///C:/Users/... paths
        $Pattern = 'file:///(C:/Users/yja02/\.gemini/antigravity/brain/[^/]+/[^"\''\s>]+)'
        
        $Matches = [regex]::Matches($Content, $Pattern)
        foreach ($Match in $Matches) {
            $FullPath = $Match.Groups[1].Value
            $SourcePath = $FullPath -replace '/', '\'
            $FileName = Split-Path $SourcePath -Leaf
            $DestPath = Join-Path $TargetDir $FileName
            
            if (Test-Path -Path $SourcePath) {
                Copy-Item -Path $SourcePath -Destination $DestPath -Force
                Write-Host "Copied: $FileName"
            } else {
                Write-Host "File not found: $SourcePath"
            }
            
            # Replace in content
            $OriginalString = $Match.Groups[0].Value
            $NewString = "./$TargetDir/$FileName"
            $Content = $Content.Replace($OriginalString, $NewString)
        }
        
        Set-Content -Path $File -Value $Content -Encoding UTF8
        Write-Host "Updated paths in: $File"
    }
}
Write-Host "Done!"
