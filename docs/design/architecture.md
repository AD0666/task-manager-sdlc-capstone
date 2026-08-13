# Architecture — Task Manager

**Version:** 1.0 (Baseline + Planned Enhancements)  
**Status:** Pending HITL Review

---

## System Context

```mermaid
flowchart TB
    subgraph Client
        Browser[Web Browser]
        React[React SPA - Vite]
    end

    subgraph Server
        Express[Express API :3001]
        Auth[JWT Auth Middleware]
        Tasks[Tasks Router]
        Audit[Audit Service]
    end

    subgraph Data
        SQLite[(SQLite DB)]
    end

    Browser --> React
    React -->|REST /api| Express
    Express --> Auth
    Auth --> Tasks
    Tasks --> Audit
    Tasks --> SQLite
    Audit --> SQLite
```

---

## Components

| Component | Technology | Responsibility |
|-----------|------------|----------------|
| Frontend | React 18, Vite | UI, forms, task list, auth screens |
| API Gateway | Express 4 | HTTP routing, JSON, CORS |
| Auth | JWT + bcrypt | Register, login, route protection |
| Task Service | node:sqlite | CRUD, filter, search |
| Audit Service | node:sqlite | Change history logging |
| Database | SQLite | Persistent storage |

---

## Deployment (Local)

```mermaid
flowchart LR
    Dev[Developer Machine]
    Dev --> BE[Backend :3001]
    Dev --> FE[Frontend :5173]
    BE --> DB[(tasks.db)]
    FE -->|proxy /api| BE
```

Production build: Vite outputs static files to `frontend/dist`; Express can serve them or use separate static host.

---

## Security (Planned)

- Passwords hashed with bcrypt (cost factor 10)
- JWT in Authorization: Bearer header
- Parameterized SQL queries only
- CORS restricted to localhost in dev

---

## Confluence

Mirror this page to: **Design > Architecture**
