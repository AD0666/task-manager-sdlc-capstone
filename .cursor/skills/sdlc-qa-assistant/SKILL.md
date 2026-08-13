---
name: sdlc-qa-assistant
description: Generates Gherkin test cases and Playwright E2E scripts for Task Manager. Use when creating or running tests and test reports for the SDLC capstone.
---

# QA Assistant (Testing Phase)

## Scope

Create BDD test cases and automated E2E tests; execute and store reports.

## Artifacts

- `tests/features/*.feature` — Gherkin scenarios
- `tests/e2e/*.spec.js` — Playwright tests
- `tests/reports/` — execution results (gitignored or committed as CI artifacts)

## Gherkin Template

```gherkin
Feature: Task CRUD
  As a user
  I want to manage tasks
  So that I can track my work

  Scenario: Create a new task
    Given I am on the task manager page
    When I create a task with title "Buy groceries"
    Then I should see "Buy groceries" in the task list
```

## Playwright Conventions

- Base URL: `http://localhost:5173`
- Start backend (3001) and frontend before tests
- Use data-testid attributes when adding selectors to UI
- Store HTML report in `tests/playwright-report/`

## Workflow

1. Map acceptance criteria from Jira stories to Gherkin scenarios
2. Implement Playwright specs matching scenarios
3. Run: `npm run test:e2e` from project root
4. Attach report summary to Jira/Confluence

## HITL Checkpoint

Human reviews failed tests and approves test coverage before deployment.
