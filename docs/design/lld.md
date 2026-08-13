# Low-Level Design (LLD) — Task Manager

**Version:** 1.0  
**Status:** Pending HITL Review

---

## Backend Structure

```
backend/
├── src/
│   ├── index.js          # Express app entry, middleware, routes mount
│   ├── db.js             # SQLite init, migration runner
│   ├── db-init.js        # CLI to init DB
│   ├── middleware/
│   │   └── auth.js       # JWT verify (planned)
│   └── routes/
│       ├── tasks.js      # Task CRUD + filters (planned)
│       └── auth.js       # Register/login (planned)
├── db/migrations/
│   ├── 001_init.sql
│   ├── 002_users.sql     # planned
│   ├── 003_task_user.sql # planned
│   └── 004_audit.sql     # planned
└── data/tasks.db         # runtime (gitignored)
```

---

## tasks.js — GET / (Enhanced)

```javascript
// Query building (planned)
const { status, q, category, due_before, due_after, sort } = req.query;
let sql = 'SELECT * FROM tasks WHERE 1=1';
const params = [];

if (req.user) {
  sql += ' AND user_id = ?';
  params.push(req.user.id);
}
if (status) {
  sql += ' AND status = ?';
  params.push(status);
}
if (q) {
  sql += ' AND (title LIKE ? OR description LIKE ?)';
  params.push(`%${q}%`, `%${q}%`);
}
// ... category, date range, ORDER BY
```

---

## auth.js Middleware (Planned)

```javascript
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

---

## Frontend Structure

```
frontend/src/
├── App.jsx                 # Root state, fetch orchestration
├── components/
│   ├── TaskForm.jsx        # Create/edit form
│   ├── TaskList.jsx        # Task cards
│   ├── SearchFilterBar.jsx # planned
│   ├── LoginForm.jsx       # planned
│   └── RegisterForm.jsx    # planned
├── context/
│   └── AuthContext.jsx     # planned: token, user, login/logout
└── api/
    └── client.js           # planned: fetch wrapper with auth header
```

---

## TaskList — Overdue Logic (Planned)

```javascript
function getDueStatus(dueDate, status) {
  if (!dueDate || status === 'done') return null;
  const today = new Date().toISOString().slice(0, 10);
  if (dueDate < today) return 'overdue';
  if (dueDate === today) return 'due-today';
  return null;
}
```

---

## Audit Hook (Planned)

On PUT /api/tasks/:id:

1. Load existing task
2. Compare each field; for each change insert into `task_audit`
3. Apply UPDATE
4. Return updated task

---

## Error Codes

| Code | When |
|------|------|
| 400 | Validation failure |
| 401 | Missing/invalid JWT |
| 404 | Task/user not found |
| 409 | Duplicate email on register |
| 500 | Unhandled server error |

---

## Confluence

Mirror to: **Design > LLD**
