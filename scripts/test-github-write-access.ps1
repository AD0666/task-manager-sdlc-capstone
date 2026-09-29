# Verify GitHub token can post PR comments.
param(
    [string]$Owner = "AD0666",
    [string]$Repo = "task-manager-sdlc-capstone",
    [int]$PrNumber = 1,
    [switch]$DryRun
)

$token = $env:GITHUB_TOKEN
if (-not $token) { try { $token = gh auth token 2>$null } catch {} }
if (-not $token) { Write-Host "ERROR: gh auth login or set GITHUB_TOKEN" -ForegroundColor Red; exit 1 }

Write-Host "=== GitHub write test: PR #$PrNumber ===" -ForegroundColor Cyan
if ($DryRun) { Write-Host "DRY RUN"; exit 0 }

gh api "repos/$Owner/$Repo/issues/$PrNumber/comments" -X POST `
    -f "body=[SDLC write-access test — safe to delete]" | Out-Null
Write-Host "OK  Comment posted on PR #$PrNumber" -ForegroundColor Green
