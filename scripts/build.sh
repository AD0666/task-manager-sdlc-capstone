#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> Installing dependencies..."
cd "$ROOT"
npm run install:all

echo "==> Initializing database..."
npm run db:init

echo "==> Building frontend..."
npm run build --prefix frontend

echo "==> Build complete. Artifacts in frontend/dist"
