# Jira Backlog — Task Manager Enhancements

**Project Key:** KAN  
**Parent Epic:** [KAN-2](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-2) — [CAPSTONE] Task Manager AI-SDLC  
**Confluence:** TMS — [Analysis Enhancements](https://anupamsworkspace-40464013.atlassian.net/wiki/spaces/TMS/pages/720899/Analysis+Enhancements)  
**Status:** Created in Jira — pending HITL review

---

## Traceability mapping (repo placeholder → Jira)

| Repo placeholder | Jira key | Summary |
|------------------|----------|---------|
| Capstone epic | **KAN-2** | [CAPSTONE] Task Manager AI-SDLC |
| TM-EPIC-1 | **KAN-3** | User Authentication |
| TM-101 | **KAN-4** | User Registration |
| TM-102 | **KAN-5** | User Login |
| TM-103 | **KAN-6** | Protect Task API |
| TM-EPIC-2 | **KAN-7** | Search and Filter |
| TM-201 | **KAN-8** | Filter Tasks by Status |
| TM-202 | **KAN-9** | Search Tasks by Keyword |
| TM-203 | **KAN-10** | Filter by Due Date Range |
| TM-EPIC-3 | **KAN-11** | Categories and Tags |
| TM-301 | **KAN-12** | Assign Category to Task |
| TM-EPIC-4 | **KAN-13** | Due Date Visibility |
| TM-401 | **KAN-14** | Overdue Task Highlighting |
| TM-EPIC-5 | **KAN-15** | Audit Trail |
| TM-501 | **KAN-16** | Record Task Change History |
| TM-EPIC-6 | **KAN-17** | QA Automation |
| TM-601 | **KAN-18** | Baseline CRUD E2E Tests |
| — | **KAN-19** | UI Enhancement — Orange Login Button |

---

## KAN-19: Orange Login Button (UI Enhancement)

**Jira:** [KAN-19](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-19)  
**Parent:** KAN-2  
**Summary:** Change Login submit button to orange (#ea580c); scoped CSS class `.login-submit`

**Acceptance Criteria:**
- [x] Login submit button orange; hover darker orange
- [x] Register and other buttons unchanged
- [x] E2E regression 13/13 PASS

**Story Points:** 1

---

## KAN-3: User Authentication (Feature)

**Jira:** [KAN-3](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-3)  
**Legacy ref:** TM-EPIC-1  
**Parent:** KAN-2  
**Description:** Enable users to register, log in, and access their own task sessions. Foundation for multi-user support and audit trail.

### KAN-4: User Registration (TM-101)

**As a** new user  
**I want** to register with email and password  
**So that** I can create a personal account

**Acceptance Criteria:**
- [ ] POST /api/auth/register accepts email, password, name
- [ ] Password minimum 8 characters; email must be unique
- [ ] Returns 201 with user id (no password in response)
- [ ] Returns 409 if email already exists

**Tasks:**
- [ ] DB migration: users table
- [ ] Backend: auth routes, password hashing (bcrypt)
- [ ] Frontend: registration form
- [ ] Tests: registration happy path and duplicate email

**Story Points:** 5

---

### KAN-5: User Login (TM-102)

**As a** registered user  
**I want** to log in with my credentials  
**So that** I can access my tasks securely

**Acceptance Criteria:**
- [ ] POST /api/auth/login returns JWT token
- [ ] Invalid credentials return 401
- [ ] Token expires after configurable duration (e.g. 24h)
- [ ] Frontend stores token and sends Authorization header

**Tasks:**
- [ ] Backend: login endpoint, JWT middleware
- [ ] Frontend: login form, auth context
- [ ] Tests: login success and failure

**Story Points:** 5

---

### KAN-6: Protect Task API (TM-103)

**As a** logged-in user  
**I want** my tasks to be private  
**So that** other users cannot see or modify them

**Acceptance Criteria:**
- [ ] All /api/tasks routes require valid JWT
- [ ] Tasks scoped to user_id
- [ ] 401 for missing/invalid token

**Tasks:**
- [ ] DB migration: add user_id to tasks
- [ ] Backend: auth middleware on task routes
- [ ] Tests: unauthorized access blocked

**Story Points:** 3

---

## KAN-7: Search and Filter (Feature)

**Jira:** [KAN-7](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-7)  
**Legacy ref:** TM-EPIC-2  
**Parent:** KAN-2  
**Description:** Allow users to find tasks by keyword, status, and due date range.

### KAN-8: Filter Tasks by Status (TM-201)

**As a** user  
**I want** to filter tasks by status  
**So that** I can focus on active work

**Acceptance Criteria:**
- [ ] GET /api/tasks?status=todo returns only todo tasks
- [ ] Frontend dropdown filters list without page reload
- [ ] "All" option shows every status

**Tasks:**
- [ ] Backend: query param filtering
- [ ] Frontend: status filter UI
- [ ] Tests: filter by each status

**Story Points:** 3

---

### KAN-9: Search Tasks by Keyword (TM-202)

**As a** user  
**I want** to search tasks by title or description  
**So that** I can quickly find specific items

**Acceptance Criteria:**
- [ ] GET /api/tasks?q=keyword searches title and description (case-insensitive)
- [ ] Frontend search input with debounce
- [ ] Empty search shows all tasks

**Tasks:**
- [ ] Backend: LIKE query on title/description
- [ ] Frontend: search bar component
- [ ] Tests: search matches and no-match

**Story Points:** 3

---

### KAN-10: Filter by Due Date Range (TM-203)

**As a** user  
**I want** to filter tasks by due date  
**So that** I can plan my week

**Acceptance Criteria:**
- [ ] GET /api/tasks?due_before=YYYY-MM-DD&due_after=YYYY-MM-DD
- [ ] Frontend date range picker or presets (Today, This Week)
- [ ] Tasks without due date excluded when date filter active

**Tasks:**
- [ ] Backend: date range query params
- [ ] Frontend: date filter UI
- [ ] Tests: date range filtering

**Story Points:** 5

---

## KAN-11: Categories and Tags (Feature)

**Jira:** [KAN-11](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-11)  
**Legacy ref:** TM-EPIC-3  
**Parent:** KAN-2  
**Description:** Organize tasks with categories or tags.

### KAN-12: Assign Category to Task (TM-301)

**As a** user  
**I want** to assign a category to each task  
**So that** I can group related work

**Acceptance Criteria:**
- [ ] Categories: Work, Personal, Shopping (configurable list)
- [ ] Task form includes category dropdown
- [ ] Task list displays category badge
- [ ] GET /api/tasks?category=Work filters by category

**Tasks:**
- [ ] DB migration: category column on tasks
- [ ] Backend: category validation and filter
- [ ] Frontend: category selector and badge
- [ ] Tests: create with category, filter by category

**Story Points:** 5

---

## KAN-13: Due Date Visibility (Feature)

**Jira:** [KAN-13](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-13)  
**Legacy ref:** TM-EPIC-4  
**Parent:** KAN-2  
**Description:** Highlight overdue tasks and sort by due date.

### KAN-14: Overdue Task Highlighting (TM-401)

**As a** user  
**I want** overdue tasks visually highlighted  
**So that** I notice missed deadlines

**Acceptance Criteria:**
- [ ] Tasks with due_date < today and status != done show red "Overdue" badge
- [ ] Tasks due today show "Due Today" badge
- [ ] Sort option: due date ascending

**Tasks:**
- [ ] Frontend: overdue/due-today logic and styling
- [ ] Backend: optional sort=due_date query param
- [ ] Tests: overdue badge appears correctly

**Story Points:** 3

---

## KAN-15: Audit Trail (Feature)

**Jira:** [KAN-15](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-15)  
**Legacy ref:** TM-EPIC-5  
**Parent:** KAN-2  
**Description:** Track changes to tasks for accountability.

### KAN-16: Record Task Change History (TM-501)

**As a** admin/user  
**I want** to see history of task changes  
**So that** I know who changed what and when

**Acceptance Criteria:**
- [ ] task_audit table: task_id, user_id, action, old_value, new_value, timestamp
- [ ] CREATE, UPDATE, DELETE logged automatically
- [ ] GET /api/tasks/:id/history returns audit entries
- [ ] Requires authentication (KAN-3)

**Tasks:**
- [ ] DB migration: task_audit table
- [ ] Backend: audit middleware/hooks
- [ ] Frontend: history panel on task detail
- [ ] Tests: audit entries created on update

**Story Points:** 8

---

## KAN-17: QA Automation (Feature)

**Jira:** [KAN-17](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-17)  
**Legacy ref:** TM-EPIC-6  
**Parent:** KAN-2  
**Description:** Gherkin scenarios and Playwright E2E for baseline and enhancements.

### KAN-18: Baseline CRUD E2E Tests (TM-601)

**As a** QA engineer  
**I want** automated E2E tests for task CRUD  
**So that** regressions are caught early

**Acceptance Criteria:**
- [ ] Gherkin feature file for task CRUD
- [ ] Playwright spec passes against local env
- [ ] Test report generated in tests/playwright-report/

**Tasks:**
- [ ] Write tests/features/task-crud.feature
- [ ] Write tests/e2e/task-crud.spec.js
- [ ] Add data-testid to UI elements
- [ ] Document test run in README

**Story Points:** 5

---

## Sprint Suggestion

| Sprint | Stories | Focus |
|--------|---------|-------|
| Sprint 1 | KAN-18, KAN-8, KAN-9 | Tests + Search/Filter |
| Sprint 2 | KAN-4, KAN-5, KAN-6 | Authentication |
| Sprint 3 | KAN-12, KAN-14 | Categories + Due dates |
| Sprint 4 | KAN-10, KAN-16 | Date range + Audit |

---

## HITL Sign-off

- [x] EPICs created in Jira under KAN-2 (KAN-3 … KAN-18)
- [ ] Story points validated
- [ ] Sprint plan accepted
- [ ] Traceability mapping confirmed (see table above)
