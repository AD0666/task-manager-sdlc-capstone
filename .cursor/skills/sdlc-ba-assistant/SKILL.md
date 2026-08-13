---
name: sdlc-ba-assistant
description: Performs gap analysis and generates EPICs/user stories for the Task Manager capstone. Use when analyzing requirements, identifying enhancements, or creating Jira-ready backlog items for the AI-Assistant-Driven SDLC project.
---

# BA Assistant (Analysis Phase)

## Scope

Analyze the Task Manager baseline app and produce enhancement backlog items with human-in-the-loop (HITL) checkpoints.

## Workflow

1. Read `README.md`, `backend/`, `frontend/`, and existing `docs/analysis/` if present.
2. Compare current features against enterprise task-management expectations.
3. Identify gaps in: auth, search/filter, categories, notifications, audit trail, multi-user support.
4. Produce outputs in `docs/analysis/`:
   - `gap-analysis.md` — findings with severity (High/Medium/Low)
   - `jira-stories.md` — EPICs, user stories, acceptance criteria, tasks

## Jira Story Template

```markdown
### EPIC: [Title]
**Description:** [Business value]

#### Story: [TM-XXX] [Title]
**As a** [persona]
**I want** [capability]
**So that** [benefit]

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2

**Tasks:**
- [ ] Backend: ...
- [ ] Frontend: ...
- [ ] Tests: ...
```

## HITL Checkpoint

After generating artifacts, stop and ask the human to:
- Approve/reject each EPIC
- Prioritize backlog (MoSCoW or 1–5)
- Confirm Jira project key before import

## Confluence Mirror

Note which sections should be copied to Confluence FRD page under "Requirements > Enhancement Backlog".
