# Traceability Matrix — Task Manager (AI-Driven SDLC)

**Project:** AI-Assistant–Driven SDLC Capstone  
**Application:** Task Manager (React + Express + SQLite)  
**Jira Project Key:** KAN  
**Jira Epic:** [KAN-2](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-2)  
**Last Updated:** 2026-08-27  
**Status:** Sprints 1–2 + KAN-19 implemented; PRs open pending merge

---

## How to Use This Matrix

| Column | Meaning |
|--------|---------|
| **Story** | Jira key (KAN-*) from `docs/analysis/jira-stories.md`; legacy TM-* in parentheses |
| **Design** | Local doc to mirror in Confluence |
| **Code** | Primary implementation files |
| **Tests** | Gherkin + Playwright evidence |
| **Git** | Branch / commit reference |
| **Confluence** | Target page (fill in your space URL after publish) |
| **Status** | Done / Partial / Planned |

---

## EPIC & Story Traceability

### EPIC-0: Baseline Task CRUD

| Story | Requirement | Design | Code | Tests | Git | Status |
|-------|-------------|--------|------|-------|-----|--------|
| Baseline | Create/list/update/delete tasks | `docs/design/hld.md` | `backend/src/routes/tasks.js`, `frontend/src/App.jsx`, `TaskForm.jsx`, `TaskList.jsx` | `tests/features/task-crud.feature`, `tests/e2e/task-crud.spec.js` | `3655477` on `master` | **Done** |

---

### EPIC-1: User Authentication

| Story | Requirement | Design | Code | Tests | Git | Status |
|-------|-------------|--------|------|-------|-----|--------|
| **TM-101** | User registration | `docs/design/lld.md` (auth) | `backend/src/routes/auth.js`, `backend/db/migrations/002_users.sql`, `frontend/src/components/RegisterForm.jsx` | `tests/features/auth.feature`, `tests/e2e/auth.spec.js` (register, duplicate email) | `22dce2b` on `feature/sprint-2-authentication` | **Done** |
| **TM-102** | User login (JWT) | `docs/design/lld.md` | `backend/src/middleware/auth.js`, `frontend/src/components/LoginForm.jsx`, `frontend/src/context/AuthContext.jsx` | `tests/e2e/auth.spec.js` (login) | `22dce2b` | **Done** |
| **TM-103** | Protect task API per user | `docs/design/hld.md` | `backend/src/routes/tasks.js` (requireAuth, user_id), `backend/db/migrations/003_tasks_user_id.sql` | `tests/e2e/auth.spec.js` (401, task isolation) | `22dce2b` | **Done** |

---

### EPIC-2: Search & Filter

| Story | Requirement | Design | Code | Tests | Git | Status |
|-------|-------------|--------|------|-------|-----|--------|
| **TM-201** | Filter by status | `docs/design/wireframes.md` (Screen 2) | `backend/src/routes/tasks.js` (?status=), `frontend/src/components/SearchFilterBar.jsx` | `tests/features/search-filter.feature`, `tests/e2e/search-filter.spec.js` | `3655477` | **Done** |
| **TM-202** | Search by keyword | `docs/design/wireframes.md` | `backend/src/routes/tasks.js` (?q=), `SearchFilterBar.jsx` | `tests/e2e/search-filter.spec.js` | `3655477` | **Done** |
| **TM-203** | Filter by due date range | `docs/design/hld.md` | — | — | — | **Planned** (Sprint 4) |

---

### EPIC-3: Categories / Tags

| Story | Requirement | Design | Code | Tests | Git | Status |
|-------|-------------|--------|------|-------|-----|--------|
| **TM-301** | Assign category to task | `docs/design/wireframes.md` (Screen 5) | — | — | — | **Planned** (Sprint 3) |

---

### EPIC-4: Due Date Reminders

| Story | Requirement | Design | Code | Tests | Git | Status |
|-------|-------------|--------|------|-------|-----|--------|
| **TM-401** | Overdue / due-today highlighting | `docs/design/wireframes.md`, `docs/design/lld.md` | — | — | — | **Planned** (Sprint 3) |

---

### EPIC-5: Audit Trail

| Story | Requirement | Design | Code | Tests | Git | Status |
|-------|-------------|--------|------|-------|-----|--------|
| **TM-501** | Task change history | `docs/design/lld.md` (audit hook) | — | — | — | **Planned** (Sprint 4) |

---

### EPIC-6: Test Automation

| Story | Requirement | Design | Code | Tests | Git | Status |
|-------|-------------|--------|------|-------|-----|--------|
| **TM-601** | Baseline CRUD E2E | — | `tests/playwright.config.js` | `task-crud.feature`, `task-crud.spec.js` | `3655477` | **Done** |
| TM-601+ | Auth + filter regression | — | `tests/e2e/helpers/auth.js` | `auth.feature`, `auth.spec.js`, `search-filter.spec.js` | `22dce2b` | **Done** (13 tests total) |

---

### KAN-19: Orange Login Button

| Story | Requirement | Design | Code | Tests | Git | Status |
|-------|-------------|--------|------|-------|-----|--------|
| **KAN-19** | Orange login submit button | `docs/design/wireframes.md` | `LoginForm.jsx`, `index.css` | `auth.spec.js` regression | [PR #3](https://github.com/AD0666/task-manager-sdlc-capstone/pull/3) `6b7b1b4` | **Done** (open PR) |

---

## SDLC Phase → Deliverable Mapping

| Capstone Phase | Demo Step | Local Artifact | Confluence Page (create & link) | Jira | Status |
|----------------|-----------|----------------|----------------------------------|------|--------|
| Analysis | 1 | `docs/analysis/gap-analysis.md` | [Analysis & Enhancements](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/720899/Analysis+Enhancements) | KAN-2, KAN-3…19 | **Done** |
| Requirements HITL | 2 | `docs/analysis/jira-stories.md` | (same) | Epic + stories | **Done** (HITL Continue) |
| Plan | 3 | `docs/plan/implementation-plan.md` | [Implementation Plan](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/753667/Implementation+Plan) | — | **Done**; PR: `plan/enhancements-v1` |
| Design | 4 | `docs/design/*` | [Architecture HLD LLD](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/819203/Architecture+HLD+LLD) | — | **Done** |
| Development | 5 | `backend/`, `frontend/` | As-Built section | KAN-4…6, KAN-8…9, KAN-19 | **Done** (PRs #1–3 open) |
| Code Review | 6 | Git PR comments | — | — | **Done** (via `post-capstone-hitl-writes.ps1`) |
| Testing | 7 | `docs/testing/test-execution-report*.md` | [Testing Evidence](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/753693/Testing+Evidence) | KAN-19 comment | **13/13 PASS** |
| Build | — | `scripts/build.ps1`, `frontend/dist/` | [Build & Local Deployment](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/688155/Build+Local+Deployment) | — | **Done** (`verify-build-deploy.ps1`) |
| Deployment | 8 | `scripts/deploy-local.ps1` | Deployment Verified section | — | **Local** localhost:5173 |
| Documentation | 9 | `README.md`, this matrix | [Traceability Matrix](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/753710/Traceability+Matrix) | KAN-19 closure | **Done** |

---

## Confluence Page Checklist (mirror from repo)

Create these pages in your Confluence space and paste URLs below:

| Page Title | Source in Repo | Confluence URL |
|------------|----------------|----------------|
| Analysis & Enhancements | `docs/analysis/*` | https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/720899/Analysis+Enhancements |
| Implementation Plan | `docs/plan/*` | https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/753667/Implementation+Plan |
| Architecture / HLD / LLD | `docs/design/*` | https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/819203/Architecture+HLD+LLD |
| Testing Evidence | `docs/testing/*` | https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/753693/Testing+Evidence |
| Build & Local Deployment | `scripts/` + README | https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/688155/Build+Local+Deployment |
| Traceability Matrix | this file | https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/753710/Traceability+Matrix |

---

## Git & PR Traceability

| Item | Reference |
|------|-----------|
| Baseline + Sprint 1 | Commit `3655477` on `master` |
| Sprint 2 Auth | Commit `22dce2b` on `feature/sprint-2-authentication` — [PR #1](https://github.com/AD0666/task-manager-sdlc-capstone/pull/1) |
| Claude footer | [PR #2](https://github.com/AD0666/task-manager-sdlc-capstone/pull/2) |
| KAN-19 Orange login | Commit `6b7b1b4` on `feature/orange-login-button` — [PR #3](https://github.com/AD0666/task-manager-sdlc-capstone/pull/3) |
| Plan PR branch | `plan/enhancements-v1` → `master` — [PR #4](https://github.com/AD0666/task-manager-sdlc-capstone/pull/4) |
| Plan PR body | `docs/plan/pr-plan.md` |
| Feature PR body | `docs/plan/pr-sprint-2.md` |
| GitHub setup | `docs/GITHUB_SETUP.md` |

---

## Test Evidence Summary

| Sprint | Report | Tests | Result |
|--------|--------|-------|--------|
| Sprint 1 | `docs/testing/test-execution-report.md` | 8 (CRUD + filter) | PASS |
| Sprint 2 | `docs/testing/test-execution-report-sprint2.md` | 13 (full suite) | PASS |

| KAN-19 Orange | `docs/testing/test-execution-report-kan19.md` | 13 (regression) | PASS |

**Command:** `npm run test:e2e` (backend on :3001, frontend on :5173)

**Tip (from colleague's run):** If Playwright fails on `localhost`, use `http://127.0.0.1:5173`.

---

## Final Closure

- **Status:** SDLC complete (documentation); PRs open pending merge
- **PRs:** [#1 Auth](https://github.com/AD0666/task-manager-sdlc-capstone/pull/1), [#2 Footer](https://github.com/AD0666/task-manager-sdlc-capstone/pull/2), [#3 KAN-19 Orange](https://github.com/AD0666/task-manager-sdlc-capstone/pull/3), [#4 Plan](https://github.com/AD0666/task-manager-sdlc-capstone/pull/4)
- **Tests:** PASS — Playwright E2E (13/13)
- **Jira Epic:** [KAN-2](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-2)

### Confluence deliverables (TMS)
- [Analysis & Enhancements](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/720899/Analysis+Enhancements)
- [Implementation Plan](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/753667/Implementation+Plan)
- [Architecture / HLD / LLD](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/819203/Architecture+HLD+LLD)
- [Testing Evidence](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/753693/Testing+Evidence)
- [Build & Local Deployment](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/688155/Build+Local+Deployment)
- [Traceability Matrix](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/753710/Traceability+Matrix)

---

## HITL Sign-off

- [x] Traceability matrix reviewed
- [x] Confluence URLs filled in above
- [x] Jira stories KAN-3…KAN-19 documented
- [x] Final closure section published in repo (mirror to Confluence)
