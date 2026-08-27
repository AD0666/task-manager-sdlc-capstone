# Traceability Matrix — Task Manager (AI-Driven SDLC)

**Project:** AI-Assistant–Driven SDLC Capstone  
**Application:** Task Manager (React + Express + SQLite)  
**Jira Project Key:** KAN  
**Jira Epic:** [KAN-2](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-2)  
**Last Updated:** 2026-08-27  
**Status:** In progress — Sprints 1–2 implemented

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

## SDLC Phase → Deliverable Mapping

| Capstone Phase | Demo Step | Local Artifact | Confluence Page (create & link) | Jira | Status |
|----------------|-----------|----------------|----------------------------------|------|--------|
| Analysis | 1 | `docs/analysis/gap-analysis.md` | **Task Manager — Analysis & Enhancements** | TM-EPIC-* stories | Draft ready |
| Requirements HITL | 2 | `docs/analysis/jira-stories.md` | (same as Analysis) | Epic + stories | Pending HITL |
| Plan | 3 | `docs/plan/implementation-plan.md` | **Task Manager — Implementation Plan** | — | Draft ready; PR: `plan/enhancements-v1` |
| Design | 4 | `docs/design/*` | **Architecture / HLD / LLD / Wireframes** | — | Draft ready |
| Development | 5 | `backend/`, `frontend/` | As-Built Confirmation section | TM-101–103, TM-201–202 | Sprint 1–2 done |
| Code Review | 6 | Git PR comments | — | — | Not started |
| Testing | 7 | `docs/testing/test-execution-report*.md` | **Testing — Gherkin + Playwright Evidence** | Test comments on stories | 13/13 pass locally |
| Build | — | `scripts/build.ps1`, `frontend/dist/` | **Build & Local Deployment** | — | Scripts ready |
| Deployment | 8 | `scripts/deploy-local.ps1` | Deployment Verified section | — | Verified locally |
| Documentation | 9 | `README.md`, this matrix | **Traceability Matrix** + Final Closure | — | This doc |

---

## Confluence Page Checklist (mirror from repo)

Create these pages in your Confluence space and paste URLs below:

| Page Title | Source in Repo | Your Confluence URL |
|------------|----------------|---------------------|
| Analysis & Enhancements | `docs/analysis/gap-analysis.md`, `jira-stories.md` | _fill in_ |
| Implementation Plan | `docs/plan/implementation-plan.md` | _fill in_ |
| Architecture / HLD / LLD | `docs/design/architecture.md`, `hld.md`, `lld.md` | _fill in_ |
| Wireframes | `docs/design/wireframes.md` | _fill in_ |
| Testing Evidence | `docs/testing/*.md` | _fill in_ |
| Build & Local Deployment | `README.md` + `scripts/` | _fill in_ |
| Traceability Matrix | `docs/traceability-matrix.md` | _fill in_ |

---

## Git & PR Traceability

| Item | Reference |
|------|-----------|
| Baseline + Sprint 1 | Commit `3655477` on `master` |
| Sprint 2 Auth | Commit `22dce2b` on `feature/sprint-2-authentication` |
| Plan PR branch | `plan/enhancements-v1` (same as master) |
| Plan PR body | `docs/plan/pr-plan.md` |
| Feature PR body | `docs/plan/pr-sprint-2.md` |
| GitHub setup | `docs/GITHUB_SETUP.md` |

---

## Test Evidence Summary

| Sprint | Report | Tests | Result |
|--------|--------|-------|--------|
| Sprint 1 | `docs/testing/test-execution-report.md` | 8 (CRUD + filter) | PASS |
| Sprint 2 | `docs/testing/test-execution-report-sprint2.md` | 13 (full suite) | PASS |

**Command:** `npm run test:e2e` (backend on :3001, frontend on :5173)

**Tip (from colleague's run):** If Playwright fails on `localhost`, use `http://127.0.0.1:5173`.

---

## Final Closure Template (for Confluence — Gate G8)

Copy to Traceability page when all phases complete:

```markdown
## Final Closure

- **Status:** Closed (Documentation complete)
- **PR merged:** _your GitHub PR URL_
- **Tests:** PASS — Playwright E2E (13/13)
- **Jira Epic:** _your TM-EPIC-1 URL_

### Confluence deliverables
- Analysis & Enhancements
- Implementation Plan
- Architecture / HLD / LLD
- Testing Evidence
- Build & Local Deployment
- Traceability Matrix (this page)
```

---

## HITL Sign-off

- [ ] Traceability matrix reviewed
- [ ] Confluence URLs filled in above
- [ ] Jira stories updated to match Status column
- [ ] Final closure section published after demo
