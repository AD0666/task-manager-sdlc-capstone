# Wireframes — Task Manager

**Version:** 1.0  
**Status:** Pending HITL Review

ASCII wireframes for key screens. Replace with Figma/links in Confluence as needed.

---

## Screen 1: Task List (Baseline — Current)

```
┌─────────────────────────────────────────────────────────────┐
│  Task Manager                                               │
│  Baseline app for AI-Assistant-Driven SDLC capstone         │
├─────────────────────────────────────────────────────────────┤
│  ┌ Create Task ──────────────────────────────────────────┐  │
│  │ Title *    [________________________]                 │  │
│  │ Description[________________________]                 │  │
│  │ Status     [ To Do ▼ ]                                │  │
│  │ Due Date   [ 📅 ]                                     │  │
│  │                              [ Add Task ]             │  │
│  └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ┌ Tasks ────────────────────────────────────────────────┐  │
│  │ Review project requirements          [ DONE ]         │  │
│  │ Read capstone brief...                                │  │
│  │ Due: 8/10/2026 · Updated: ...    [Edit] [Delete]      │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ Set up development environment   [ IN PROGRESS ]      │  │
│  │ ...                              [Edit] [Delete]      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 2: Task List + Search/Filter (Planned — TM-201, TM-202)

```
┌─────────────────────────────────────────────────────────────┐
│  Task Manager                          [ Login ] [Register]│
├─────────────────────────────────────────────────────────────┤
│  🔍 Search [_______________]  Status [ All ▼ ]  [ Apply ]   │
├─────────────────────────────────────────────────────────────┤
│  ... task cards (filtered) ...                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 3: Login (Planned — TM-102)

```
┌──────────────────────────────────┐
│           Login                  │
├──────────────────────────────────┤
│  Email    [__________________]   │
│  Password [__________________]   │
│                                  │
│         [ Log In ]               │
│                                  │
│  Don't have an account? Register │
└──────────────────────────────────┘
```

---

## Screen 4: Register (Planned — TM-101)

```
┌──────────────────────────────────┐
│          Register                │
├──────────────────────────────────┤
│  Name     [__________________]   │
│  Email    [__________________]   │
│  Password [__________________]   │
│  Confirm  [__________________]   │
│                                  │
│        [ Create Account ]        │
│                                  │
│  Already have an account? Login  │
└──────────────────────────────────┘
```

---

## Screen 5: Task with Category + Overdue (Planned — TM-301, TM-401)

```
┌─────────────────────────────────────────────────────────────┐
│  Submit expense report                    [ OVERDUE ]       │
│  Category: Work                                             │
│  Due: 8/1/2026 (past)                                       │
│  Status: IN PROGRESS                                        │
│                              [Edit] [Delete] [ History ]    │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 6: Audit History Panel (Planned — TM-501)

```
┌─ History: Submit expense report ────────────────────────────┐
│  2026-08-12 10:30  alice@co.com  status: todo → in_progress │
│  2026-08-10 09:00  alice@co.com  created task               │
└─────────────────────────────────────────────────────────────┘
```

---

## UI Components Map

| Component | Screen | data-testid (for tests) |
|-----------|--------|-------------------------|
| TaskForm | 1 | task-form, task-title-input |
| TaskList | 1 | task-list, task-item |
| SearchFilterBar | 2 | search-input, status-filter |
| LoginForm | 3 | login-form |
| RegisterForm | 4 | register-form |
| CategoryBadge | 5 | category-badge |
| OverdueBadge | 5 | overdue-badge |
| HistoryPanel | 6 | audit-history |

---

## Confluence

Mirror to: **Design > Wireframes**
