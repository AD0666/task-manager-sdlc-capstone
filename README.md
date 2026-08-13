# Task Manager — AI-Assistant-Driven SDLC Capstone

Enterprise-grade SDLC demonstration using AI assistants with human-in-the-loop (HITL) at every phase. The application is intentionally simple; **the value is the orchestration**.

## Project Overview

| Item | Detail |
|------|--------|
| Application | Task Manager (CRUD for tasks) |
| Stack | React 18 + Vite, Express 4, SQLite (node:sqlite) |
| SDLC Skills | `.cursor/skills/sdlc-*` (8 persona skills + orchestrator) |
| Docs | `docs/analysis`, `docs/plan`, `docs/design` |

## Quick Start

### Prerequisites

- Node.js 22.5+ (uses built-in `node:sqlite`; no native build tools required)
- npm 9+

> **Note:** If the project path contains spaces (as with this capstone folder name), npm bin shims may fail on Windows. Scripts use `node .../vite.js` directly to avoid that. For fewer issues, clone to a path without spaces (e.g. `C:\projects\task-manager`).

### Install & Run

```powershell
# From project root
npm run install:all
npm run db:init

# Terminal 1 — API (port 3001)
npm run dev:backend

# Terminal 2 — UI (port 5173)
npm run dev:frontend
```

Or use the deploy script:

```powershell
.\scripts\deploy-local.ps1
```

Open **http://localhost:5173**

### Build

```powershell
.\scripts\build.ps1
```

Output: `frontend/dist/`

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/tasks` | List tasks (optional `?status=todo` and/or `?q=keyword`) |
| GET | `/api/tasks/:id` | Get task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

**Create task body:**

```json
{
  "title": "My task",
  "description": "Optional",
  "status": "todo",
  "due_date": "2026-08-20"
}
```

Status values: `todo`, `in_progress`, `done`

## Testing

```powershell
# Install test deps (included in install:all)
npm run install:all

# Start backend + frontend first, then:
npm run test:e2e

# View report
npm run report --prefix tests
```

- Gherkin: `tests/features/task-crud.feature`
- Playwright: `tests/e2e/task-crud.spec.js`

## SDLC Workflow & Skills

| Phase | Skill | Artifact |
|-------|-------|----------|
| Analysis | `sdlc-ba-assistant` | `docs/analysis/` |
| Plan | `sdlc-planning-assistant` | `docs/plan/` |
| Design | `sdlc-design-assistant` | `docs/design/` |
| Development | `sdlc-dev-assistant` | Code in `backend/`, `frontend/` |
| Code Review | `sdlc-code-review-assistant` | PR comments |
| Testing | `sdlc-qa-assistant` | `tests/` |
| Deployment | `sdlc-deployment-assistant` | `scripts/` |
| Documentation | `sdlc-documentation-assistant` | README, Confluence |

Orchestrate the full demo: invoke **`sdlc-orchestrator`** skill.

## Demo Flow Checklist

1. [ ] Gaps identified (CodeMie, Jira) — `docs/analysis/gap-analysis.md`
2. [ ] Requirements generated → **Human review** — `docs/analysis/jira-stories.md`
3. [ ] Plan created → Pull Request — `docs/plan/implementation-plan.md`
4. [ ] Design docs (Confluence) → **Human review** — `docs/design/`
5. [ ] Code written/committed (Claude-Code, Git) → **Human review**
6. [ ] Code review comments (CodeMie, Git) → **Human review**
7. [ ] Tests (Playwright, Gherkin) → **Human review**
8. [ ] Local deployment → **Human review**
9. [ ] Documentation updated (Confluence) → **Human review**

## Project Structure

```
├── backend/           # Express API + SQLite
├── frontend/          # React SPA
├── tests/             # Gherkin + Playwright
├── scripts/           # build.ps1, deploy-local.ps1
├── docs/
│   ├── analysis/      # Gap analysis, Jira stories
│   ├── plan/          # Implementation plan
│   └── design/        # Architecture, HLD, LLD, wireframes
└── .cursor/skills/    # SDLC persona skills
```

## Enhancement Backlog (Planned)

See `docs/analysis/jira-stories.md` for full EPICs:

- EPIC-1: User Authentication
- EPIC-2: Search & Filter
- EPIC-3: Categories/Tags
- EPIC-4: Due Date Reminders
- EPIC-5: Audit Trail
- EPIC-6: Test Automation

## Confluence Mirror

Copy these to your Confluence space:

| Repo Path | Confluence Page |
|-----------|-----------------|
| `docs/analysis/gap-analysis.md` | FRD > Enhancement Backlog |
| `docs/design/architecture.md` | Design > Architecture |
| `docs/design/hld.md` | Design > HLD |
| `docs/design/lld.md` | Design > LLD |
| `docs/design/wireframes.md` | Design > Wireframes |

## License

Capstone project — internal/educational use.
