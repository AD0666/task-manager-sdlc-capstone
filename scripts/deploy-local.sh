#!/usr/bin/env bash
# Local deployment script — run backend and frontend (requires two terminals or background)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Ensuring dependencies and DB..."
[[ -d backend/node_modules ]] || npm install --prefix backend
[[ -d frontend/node_modules ]] || npm install --prefix frontend
npm run db:init --prefix backend 2>/dev/null || true

echo "==> Starting backend (background) on :3001..."
(cd backend && npm run dev) &
BACKEND_PID=$!
sleep 2

echo "==> Starting frontend on :5173..."
echo "  Frontend: http://localhost:5173"
echo "  API:      http://localhost:3001/api/health"
echo "  Press Ctrl+C to stop"

trap "kill $BACKEND_PID 2>/dev/null" EXIT
cd frontend && npm run dev
