# Local deployment script (PowerShell)
# Starts backend and frontend in separate processes
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot

Write-Host "==> Ensuring dependencies and DB..."
Set-Location $Root
if (-not (Test-Path "backend/node_modules")) { npm install --prefix backend }
if (-not (Test-Path "frontend/node_modules")) { npm install --prefix frontend }
npm run db:init --prefix backend 2>$null

Write-Host "==> Starting backend on http://localhost:3001 ..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$Root\backend'; npm run dev"

Start-Sleep -Seconds 2

Write-Host "==> Starting frontend on http://localhost:5173 ..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$Root\frontend'; npm run dev"

Write-Host ""
Write-Host "Task Manager deployed locally:"
Write-Host "  Frontend: http://localhost:5173"
Write-Host "  API:      http://localhost:3001/api/health"
Write-Host ""
Write-Host "Close the spawned terminal windows to stop services."
