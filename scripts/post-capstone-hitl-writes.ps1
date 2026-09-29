# Post pending SDLC writes to Jira + GitHub PRs.
# Usage: $env:JIRA_EMAIL=...; $env:JIRA_TOKEN=...; .\scripts\post-capstone-hitl-writes.ps1

param(
    [string]$JiraBase = "https://anupamsworkspace-40464013.atlassian.net",
    [string]$JiraEpic = "KAN-2",
    [string]$JiraStory = "KAN-19",
    [switch]$DryRun
)

function Get-JiraHeaders {
    $email = $env:JIRA_EMAIL
    $token = if ($env:JIRA_API_TOKEN) { $env:JIRA_API_TOKEN } else { $env:JIRA_TOKEN }
    if (-not $email -or -not $token) { throw "Set JIRA_EMAIL and JIRA_TOKEN" }
    $b64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${email}:${token}"))
    return @{ Authorization = "Basic $b64"; Accept = "application/json"; "Content-Type" = "application/json" }
}

function Add-JiraComment {
    param([string]$Key, [string]$Body)
    if ($DryRun) { Write-Host "[DRY] Jira $Key"; return }
    $payload = @{
        body = @{
            type = "doc"; version = 1
            content = @(@{ type = "paragraph"; content = @(@{ type = "text"; text = $Body.Trim() }) })
        }
    } | ConvertTo-Json -Depth 10
    Invoke-RestMethod -Method POST -Uri "$JiraBase/rest/api/3/issue/$Key/comment" -Headers (Get-JiraHeaders) -Body $payload | Out-Null
    Write-Host "OK  Jira comment on $Key" -ForegroundColor Green
}

function Add-PrComment {
    param([int]$Num, [string]$Body)
    if ($DryRun) { Write-Host "[DRY] PR #$Num"; return }
    gh api "repos/AD0666/task-manager-sdlc-capstone/issues/$Num/comments" -X POST -f "body=$($Body.Trim())" | Out-Null
    Write-Host "OK  PR #$Num comment" -ForegroundColor Green
}

$g5Auth = @"
G5 Code Review (HITL) — Sprint 2 Auth PR #1

✓ JWT env, bcrypt hashing, parameterized SQL, user_id scoping
✓ tests/e2e/auth.spec.js — 401 + task isolation
Approved to proceed per SDLC gate.
"@

$g5Orange = @"
G5 Code Review (HITL) — KAN-19 Orange Login PR #3

✓ Scoped .login-submit CSS only (#ea580c / #c2410c)
✓ No auth logic changes; Register button unchanged
✓ 13/13 E2E regression pass
Approved per SDLC gate.
"@

$kan19 = @"
KAN-19 closure (SDLC G8).

PR: https://github.com/AD0666/task-manager-sdlc-capstone/pull/3
Commit: 6b7b1b4 | Tests: 13/13 PASS
Confluence TMS: Analysis, Plan, Design, Testing, Build, Traceability
Local verify: http://localhost:5173 orange Log In button
"@

Write-Host "=== Post capstone HITL writes ===" -ForegroundColor Cyan
try { Add-JiraComment -Key $JiraStory -Body $kan19 } catch { Write-Host "FAIL Jira $JiraStory : $_" -ForegroundColor Red }
try { Add-PrComment -Num 1 -Body $g5Auth } catch { Write-Host "FAIL PR #1 : $_" -ForegroundColor Red }
try { Add-PrComment -Num 3 -Body $g5Orange } catch { Write-Host "FAIL PR #3 : $_" -ForegroundColor Red }
Write-Host "Done."
