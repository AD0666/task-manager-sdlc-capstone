# GitHub & Pull Request Setup

## Prerequisites

1. Install [GitHub CLI](https://cli.github.com/):
   ```powershell
   winget install GitHub.cli
   ```
2. Authenticate:
   ```powershell
   gh auth login
   ```

## Create Remote Repository

```powershell
# From project root
gh repo create task-manager-sdlc-capstone --public --source=. --remote=origin --push
```

Or create the repo manually on GitHub, then:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/task-manager-sdlc-capstone.git
git push -u origin master
git push -u origin feature/sprint-2-authentication
```

## Open Pull Requests

### Plan PR (demo step 3)

```powershell
git checkout master
git checkout -b plan/enhancements-v1
git push -u origin plan/enhancements-v1

gh pr create --base master --head plan/enhancements-v1 `
  --title "Plan: Task Manager enhancement roadmap" `
  --body-file docs/plan/pr-plan.md
```

### Sprint 2 Feature PR (demo step 5)

```powershell
git checkout feature/sprint-2-authentication
git push -u origin feature/sprint-2-authentication

gh pr create --base master --head feature/sprint-2-authentication `
  --title "feat: Sprint 2 user authentication (TM-101, TM-102, TM-103)" `
  --body-file docs/plan/pr-sprint-2.md
```

## Code Review (demo step 6)

Use CodeMie Code Review Assistant or:

```powershell
gh pr review <PR_NUMBER> --comment --body "Review notes from SDLC assistant"
```

## Current Branches

| Branch | Purpose |
|--------|---------|
| `master` | Baseline + Sprint 1 (search/filter) |
| `feature/sprint-2-authentication` | Sprint 2 auth (TM-101–103) |
| `plan/enhancements-v1` | Implementation plan PR (create from master) |
