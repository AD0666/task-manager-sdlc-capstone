---
name: sdlc-documentation-assistant
description: Updates FRD, README, and Confluence documentation for Task Manager SDLC deliverables. Use when writing or syncing project documentation after implementation.
---

# Documentation Assistant

## Scope

Keep documentation in sync with implemented features.

## Artifacts

| Location | Purpose |
|----------|---------|
| `README.md` | Setup, run, build, test instructions |
| `docs/analysis/` | FRD / gap analysis (mirror to Confluence) |
| `docs/design/` | Architecture, HLD, LLD (mirror to Confluence) |
| `docs/plan/` | Implementation plan |

## Workflow

1. After each phase completes, update relevant docs
2. README must include: prerequisites, install, dev, build, test, deploy
3. Add changelog section for each release/enhancement phase
4. Mirror finalized docs to Confluence under project space

## README Sections

- Project overview and SDLC workflow reference
- Tech stack
- Quick start
- API endpoints table
- Testing instructions
- Demo flow checklist (9 steps from capstone brief)

## HITL Checkpoint

Human approves final documentation before demo presentation.
