## Summary

Adds user authentication for the Task Manager capstone (Sprint 2).

- **TM-101:** User registration with email/password (bcrypt hashing)
- **TM-102:** Login with JWT tokens (24h expiry)
- **TM-103:** Task API protected; tasks scoped per user

## Changes

- Backend: `users` table, `/api/auth/register`, `/api/auth/login`, JWT middleware
- Frontend: login/register forms, auth context, logout
- Tests: auth E2E specs + updated CRUD/search tests for authenticated sessions

## Test plan

- [x] Register new user
- [x] Login with valid credentials
- [x] Reject duplicate email (409)
- [x] Block unauthenticated `/api/tasks` (401)
- [x] Users only see their own tasks
- [x] Existing CRUD and search/filter tests pass when logged in

Run: `npm run test:e2e` (backend + frontend must be running)

## Jira

Closes TM-101, TM-102, TM-103

## HITL

- [ ] Stakeholder review of auth UX
- [ ] Security review of JWT secret handling for production
