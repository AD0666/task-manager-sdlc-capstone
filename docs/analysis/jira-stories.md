# Jira Backlog — Task Manager Enhancements

**Project Key:** TM (suggested)  
**Import:** Copy stories into Jira or use CSV import  
**Status:** Pending HITL Review

---

## EPIC-1: User Authentication

**Summary:** TM-EPIC-1 User Authentication  
**Description:** Enable users to register, log in, and access their own task sessions. Foundation for multi-user support and audit trail.

### TM-101: User Registration

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

### TM-102: User Login

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

### TM-103: Protect Task API

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

## EPIC-2: Search & Filter

**Summary:** TM-EPIC-2 Search and Filter  
**Description:** Allow users to find tasks by keyword, status, and due date range.

### TM-201: Filter Tasks by Status

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

### TM-202: Search Tasks by Keyword

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

### TM-203: Filter by Due Date Range

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

## EPIC-3: Task Categories/Tags

**Summary:** TM-EPIC-3 Categories and Tags  
**Description:** Organize tasks with categories or tags.

### TM-301: Assign Category to Task

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

## EPIC-4: Due Date Reminders

**Summary:** TM-EPIC-4 Due Date Visibility  
**Description:** Highlight overdue tasks and sort by due date.

### TM-401: Overdue Task Highlighting

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

## EPIC-5: Audit Trail

**Summary:** TM-EPIC-5 Audit Trail  
**Description:** Track changes to tasks for accountability.

### TM-501: Record Task Change History

**As a** admin/user  
**I want** to see history of task changes  
**So that** I know who changed what and when

**Acceptance Criteria:**
- [ ] task_audit table: task_id, user_id, action, old_value, new_value, timestamp
- [ ] CREATE, UPDATE, DELETE logged automatically
- [ ] GET /api/tasks/:id/history returns audit entries
- [ ] Requires authentication (EPIC-1)

**Tasks:**
- [ ] DB migration: task_audit table
- [ ] Backend: audit middleware/hooks
- [ ] Frontend: history panel on task detail
- [ ] Tests: audit entries created on update

**Story Points:** 8

---

## EPIC-6: Test Automation (Cross-cutting)

**Summary:** TM-EPIC-6 QA Automation  
**Description:** Gherkin scenarios and Playwright E2E for baseline and enhancements.

### TM-601: Baseline CRUD E2E Tests

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
| Sprint 1 | TM-601, TM-201, TM-202 | Tests + Search/Filter |
| Sprint 2 | TM-101, TM-102, TM-103 | Authentication |
| Sprint 3 | TM-301, TM-401 | Categories + Due dates |
| Sprint 4 | TM-203, TM-501 | Date range + Audit |

---

## HITL Sign-off

- [ ] EPICs approved for Jira creation
- [ ] Story points validated
- [ ] Sprint plan accepted
