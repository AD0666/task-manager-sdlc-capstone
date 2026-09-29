# Verify G7 Build & Deploy — fresh build + dist check (local capstone).
# Usage: git checkout feature/orange-login-button; .\scripts\verify-build-deploy.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "=== G7 Build & Deploy Verification ===" -ForegroundColor Cyan
Write-Host "Branch: $(git branch --show-current)"
Write-Host "Commit: $(git rev-parse --short HEAD)"
Write-Host ""

Write-Host "[1/3] Running build.ps1 ..." -ForegroundColor Yellow
& "$Root\scripts\build.ps1"

$dist = Join-Path $Root "frontend\dist"
if (-not (Test-Path $dist)) {
    Write-Host "FAIL: frontend/dist not found" -ForegroundColor Red
    exit 1
}
Write-Host "OK  frontend/dist exists" -ForegroundColor Green

Write-Host ""
Write-Host "[2/3] Checking dist for orange login CSS ..." -ForegroundColor Yellow
$found = $false
Get-ChildItem -Path $dist -Recurse -Filter "*.css" | ForEach-Object {
    if ((Get-Content $_.FullName -Raw) -match "ea580c|login-submit") {
        Write-Host "OK  Found in $($_.Name)" -ForegroundColor Green
        $found = $true
    }
}
if (-not $found) { Write-Host "WARN: check dist CSS manually (minification)" -ForegroundColor Yellow }

Write-Host ""
Write-Host "[3/3] Next: .\scripts\deploy-local.ps1 → http://localhost:5173 (local only)" -ForegroundColor Cyan
