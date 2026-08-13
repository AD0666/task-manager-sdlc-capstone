---
name: sdlc-deployment-assistant
description: Builds and deploys Task Manager locally using project scripts. Use when running build scripts, starting local services, or verifying deployment for the SDLC capstone.
---

# Deployment Assistant (Deploy Phase)

## Scope

Build deployable artifacts and run the app on local environment.

## Scripts

- `scripts/build.ps1` / `scripts/build.sh` — install deps, build frontend
- `scripts/deploy-local.ps1` / `scripts/deploy-local.sh` — start backend + serve frontend

## Local Deployment Steps

1. `npm run install:all` — install all dependencies
2. `npm run db:init` — initialize SQLite (first run)
3. `./scripts/build.ps1` — build frontend to `frontend/dist`
4. Start backend: `npm run dev:backend` (port 3001)
5. Start frontend: `npm run dev:frontend` (port 5173) OR serve `frontend/dist`

## Verification

- `GET http://localhost:3001/api/health` returns `{ status: "ok" }`
- Frontend loads at `http://localhost:5173`
- CRUD operations work end-to-end

## HITL Checkpoint

Human verifies local deployment and signs off before documentation update.
