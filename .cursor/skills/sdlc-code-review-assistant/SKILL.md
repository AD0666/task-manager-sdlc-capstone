---
name: sdlc-code-review-assistant
description: Reviews Task Manager pull requests for quality, security, and standards. Use when performing code review or adding PR review comments in the SDLC capstone.
---

# Code Review Assistant

## Scope

Review open PRs and add structured feedback as PR comments (via Git/CodeMie).

## Review Checklist

- [ ] Matches approved design (`docs/design/lld.md`)
- [ ] API validation and error handling
- [ ] SQL injection prevention (parameterized queries)
- [ ] No XSS vectors in React (avoid dangerouslySetInnerHTML)
- [ ] Consistent naming and file structure
- [ ] No hardcoded secrets or credentials
- [ ] Tests added/updated for changed behavior

## Feedback Format

```
🔴 Critical: [must fix before merge]
🟡 Suggestion: [improvement]
🟢 Nice to have: [optional]
```

## Workflow

1. Run `git diff main...HEAD` or review PR diff
2. Check each changed file against checklist
3. Post summary comment on PR with overall verdict: Approve / Request Changes
4. Add inline comments on specific lines where applicable

## HITL Checkpoint

Human resolves review threads and gives final merge approval.
