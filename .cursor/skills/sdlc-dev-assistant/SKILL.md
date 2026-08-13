---
name: sdlc-dev-assistant
description: Implements Task Manager features per approved design using Express, React, and SQLite. Use when writing backend/frontend code, DB migrations, or committing development work for the SDLC capstone.
---

# Dev Assistant (Development Phase)

## Scope

Implement approved stories following `docs/design/lld.md`. Code via Claude-Code CLI (CodeMie) or Cursor agent.

## Stack

- Backend: Node.js 22+, Express, node:sqlite (built-in)
- Frontend: React 18, Vite
- DB: SQLite (`backend/data/tasks.db`)

## Workflow

1. Create feature branch from `main`: `feature/TM-XXX-short-name`
2. Implement in order: DB migration → API route → frontend component → wire-up
3. Follow existing patterns in `backend/src/routes/tasks.js` and `frontend/src/components/`
4. Commit with conventional messages: `feat(scope): description`
5. Open PR linking to Jira story ID

## Code Standards

- Validate input on API (400 for bad requests, 404 for missing resources)
- Use prepared statements for SQL (no string interpolation)
- Keep components small; extract forms/lists as needed
- No secrets in code; use `.env` for config if needed

## DB Migrations

Add new files under `backend/db/migrations/` with incremental numbers. Update `db.js` or migration runner to apply them.

## HITL Checkpoint

Stop after PR is ready. Human reviews code before Code Review Assistant runs.
