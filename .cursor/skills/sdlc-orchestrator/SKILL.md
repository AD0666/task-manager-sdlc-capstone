---
name: sdlc-orchestrator
description: Orchestrates the full AI-Assistant-Driven SDLC demo flow for the Task Manager capstone with human-in-the-loop checkpoints. Use when running the complete SDLC pipeline or demo preparation.
---

# SDLC Orchestrator

## Demo Flow (9 Steps)

Execute phases in order. **Stop at each HITL checkpoint** for human approval.

| Step | Phase | Skill | Output |
|------|-------|-------|--------|
| 1 | Analysis | sdlc-ba-assistant | gap-analysis.md, jira-stories.md, Jira |
| 2 | Requirements HITL | — | Human approves stories in Jira |
| 3 | Plan | sdlc-planning-assistant | implementation-plan.md, Plan PR |
| 4 | Design | sdlc-design-assistant | docs/design/*, Confluence |
| 5 | Development | sdlc-dev-assistant | Feature branches, code commits |
| 6 | Code Review | sdlc-code-review-assistant | PR review comments |
| 7 | Testing | sdlc-qa-assistant | Gherkin, Playwright, reports |
| 8 | Deployment | sdlc-deployment-assistant | Local deploy verification |
| 9 | Documentation | sdlc-documentation-assistant | README, Confluence sync |

## Invocation Examples

```
Run sdlc-ba-assistant to analyze gaps in the baseline app
Run sdlc-planning-assistant after I approve the backlog
Run sdlc-design-assistant for Phase 1 stories
Run sdlc-dev-assistant to implement TM-201 status filter
Run sdlc-code-review-assistant on the open PR
Run sdlc-qa-assistant to run Playwright tests
Run sdlc-deployment-assistant to deploy locally
Run sdlc-documentation-assistant to update README
```

## External Tools (CodeMie / Enterprise)

| Tool | Usage |
|------|-------|
| CodeMie | Chain marketplace assistants; Claude-Code CLI for dev |
| Jira | EPICs, stories, test execution links |
| Confluence | FRD, architecture, design, test reports |
| Git | Commits, PRs, review comments |

## Current Project State

Check these paths before each phase:

- Baseline app: `backend/`, `frontend/`
- Analysis: `docs/analysis/`
- Plan: `docs/plan/implementation-plan.md`
- Design: `docs/design/`
- Tests: `tests/features/`, `tests/e2e/`
- Skills: `.cursor/skills/sdlc-*`

## HITL Protocol

At each checkpoint, present summary and ask:
1. Approve / Request changes / Defer
2. Any scope adjustments
3. Permission to proceed to next phase

Never skip HITL unless human explicitly says "proceed without review."
