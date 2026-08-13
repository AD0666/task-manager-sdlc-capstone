---
name: sdlc-planning-assistant
description: Generates implementation plans and milestone breakdowns for Task Manager enhancements. Use when creating sprint plans, implementation roadmaps, or plan pull requests for the SDLC capstone.
---

# Planning Assistant (Plan Phase)

## Scope

Convert approved Jira backlog into a phased implementation plan with dependencies, estimates, and risk notes.

## Workflow

1. Read `docs/analysis/gap-analysis.md` and `docs/analysis/jira-stories.md`.
2. Group stories into phases (Phase 1 = MVP enhancements, Phase 2 = advanced).
3. Write `docs/plan/implementation-plan.md` with:
   - Objectives and scope
   - Phase breakdown with story mapping
   - Technical dependencies (DB migrations, API changes, UI)
   - Timeline estimate (story points or days)
   - Risks and mitigations
4. Create a plan branch `plan/enhancements-v1` and open a PR containing only plan docs (no code).

## Plan Document Template

```markdown
# Implementation Plan

## Overview
## Scope (In / Out)
## Phases
### Phase 1: [Name]
- Stories: TM-XXX, TM-YYY
- Deliverables: ...
- Exit criteria: ...

## Dependencies
## Risks
## HITL Sign-off
- [ ] Plan approved by stakeholder
```

## HITL Checkpoint

Stop after PR creation. Human must review plan PR before Design phase begins.
