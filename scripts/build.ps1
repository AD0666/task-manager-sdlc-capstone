# Build script for Task Manager (PowerShell)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot

Write-Host "==> Installing dependencies..."
Set-Location $Root
npm run install:all

Write-Host "==> Initializing database..."
npm run db:init

Write-Host "==> Building frontend..."
npm run build --prefix frontend

Write-Host "==> Build complete. Artifacts in frontend/dist"
