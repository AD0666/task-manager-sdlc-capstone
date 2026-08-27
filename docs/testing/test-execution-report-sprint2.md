# Test Execution Report — Sprint 2

**Date:** 2026-08-13  
**Stories:** TM-101, TM-102, TM-103 (+ regression for TM-201, TM-202, TM-601)  
**Tool:** Playwright (Chromium)

## Summary

| Metric | Value |
|--------|-------|
| Total scenarios | 13 |
| Passed | 13 |
| Failed | 0 |

## New Tests — Authentication

| Test | Story |
|------|-------|
| registers a new account | TM-101 |
| logs in with existing credentials | TM-102 |
| rejects duplicate email on register | TM-101 |
| blocks unauthenticated API access | TM-103 |
| users only see their own tasks | TM-103 |

## Regression

- Task CRUD (4 tests) — pass with auth helper
- Search & Filter (4 tests) — pass with auth helper

## Re-run

```powershell
npm run dev:backend
npm run dev:frontend
npm run test:e2e
```
