# Gap Analysis — Task Manager Baseline

**Project:** AI-Assistant-Driven SDLC Capstone  
**Application:** Task Manager (React + Express + SQLite)  
**Date:** 2026-08-13  
**Author:** BA Assistant  
**Status:** Pending HITL Review

---

## Executive Summary

The baseline Task Manager provides basic CRUD for tasks with title, description, status, and due date. It is suitable as a demo application but lacks enterprise features expected in production task-management tools. **Six enhancement themes** are tracked in Jira under epic **[KAN-2](https://anupamsworkspace-40464013.atlassian.net/browse/KAN-2)** (Authentication, Search/Filter, Categories/Tags, Due Date Visibility, Audit Trail, QA Automation) to demonstrate the full AI-driven SDLC pipeline.

---

## Current State (Baseline Features)

| Feature | Status | Notes |
|---------|--------|-------|
| Create task | ✅ Implemented | Title required; optional description, status, due date |
| List tasks | ✅ Implemented | Ordered by created_at DESC |
| Update task | ✅ Implemented | Full field update via PUT |
| Delete task | ✅ Implemented | Hard delete |
| Status workflow | ✅ Partial | todo / in_progress / done — no validation rules |
| User authentication | ❌ Missing | No login; single anonymous user |
| Search & filter | ❌ Missing | No query params on GET /api/tasks |
| Categories/tags | ❌ Missing | No taxonomy for tasks |
| Due date reminders | ❌ Missing | No overdue highlighting or notifications |
| Audit trail | ❌ Missing | No history of changes |
| Multi-user / assignee | ❌ Missing | No user or assignee field |
| Pagination | ❌ Missing | All tasks returned in one response |
| Input validation (UI) | ⚠️ Partial | HTML5 required on title only |
| Error handling | ⚠️ Partial | Basic API errors; no global error boundary |
| Automated tests | ❌ Missing | No unit or E2E tests in baseline |
| Build/deploy scripts | ⚠️ Partial | Scripts scaffolded; not yet verified |

---

## Identified Gaps & Enhancements

### GAP-001: No User Authentication (High)

**Current:** Anyone can access all tasks.  
**Impact:** Cannot demonstrate role-based access or user-specific task lists.  
**Recommendation:** EPIC — User Authentication (register, login, JWT sessions).

### GAP-002: No Search or Filter (High)

**Current:** Users must scroll entire list to find tasks.  
**Impact:** Poor usability as task count grows.  
**Recommendation:** EPIC — Search & Filter (by status, due date, keyword).

### GAP-003: No Categories/Tags (Medium)

**Current:** Tasks are flat with no grouping.  
**Impact:** Cannot organize work by project or category.  
**Recommendation:** EPIC — Task Categories/Tags.

### GAP-004: No Due Date Visibility (Medium)

**Current:** Due dates stored but no overdue indication.  
**Impact:** Users miss deadlines.  
**Recommendation:** EPIC — Due Date Reminders (overdue badge, sort by due date).

### GAP-005: No Audit Trail (Medium)

**Current:** Updates overwrite records; no change history.  
**Impact:** No accountability for enterprise compliance.  
**Recommendation:** EPIC — Audit Trail (who changed what, when).

### GAP-006: No Automated Test Coverage (High)

**Current:** No Gherkin or Playwright tests.  
**Impact:** Cannot demonstrate QA phase of SDLC demo.  
**Recommendation:** Include test creation in each EPIC's tasks.

### GAP-007: No Documentation in Confluence (Low)

**Current:** Docs in repo only.  
**Impact:** Demo flow requires Confluence mirror.  
**Recommendation:** Documentation Assistant syncs after each phase.

---

## Prioritization (MoSCoW)

| Priority | EPIC | Rationale |
|----------|------|-----------|
| **Must** | Authentication | Foundation for multi-user and audit |
| **Must** | Search & Filter | High demo value, moderate effort |
| **Should** | Categories/Tags | Extends data model cleanly |
| **Should** | Due Date Reminders | Visible UX improvement |
| **Could** | Audit Trail | Depends on auth EPIC |
| **Must** | Test Automation | Required for demo step 7 |

---

## HITL Review Checklist

- [ ] Approve gap findings
- [ ] Confirm EPIC prioritization
- [ ] Adjust scope if needed (add/remove EPICs)
- [x] Jira project key confirmed: **KAN** (epic **KAN-2**, backlog **KAN-3 … KAN-18**)
- [ ] Sign off to proceed to Planning phase

---

## Next Steps

1. Human reviews and approves this document
2. Align repo docs with Jira keys (see `jira-stories.md` traceability table)
3. Planning Assistant generates `docs/plan/implementation-plan.md`
4. Mirror this document to Confluence FRD page (TMS space)
