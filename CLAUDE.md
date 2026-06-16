# CLAUDE.md

## Project

**csc_website** — Next.js 16 / React 19 / TypeScript / Tailwind CSS website.

## Development Workflow

**Primary workflow: GitHub Issues + Feature branches + Worktrees**

### Rules
- EVERY change goes through a feature branch (never commit directly to main)
- EVERY new task starts with a GitHub issue (`gh issue create`)
- Use git worktrees for all feature work
- Push to branch, verify CI passes, then create PR

### Starting New Work

1. **Create a GitHub issue** describing the work
2. **Create a worktree + branch from main:**
```bash
git worktree add ../csc_website-worktrees/GH-XXX-description -b feature/GH-XXX-description main \
  && mkdir -p ../csc_website-worktrees/GH-XXX-description/.claude \
  && ln -sf "$(pwd)/.claude/hooks" ../csc_website-worktrees/GH-XXX-description/.claude/hooks \
  && ln -sf "$(pwd)/.claude/settings.json" ../csc_website-worktrees/GH-XXX-description/.claude/settings.json
```
3. **Switch into the worktree:**
```
EnterWorktree(path: "../csc_website-worktrees/GH-XXX-description")
```
4. Work, commit, push, create PR targeting `main`

### Why Worktrees
- `cd` in Bash does NOT persist between commands — hooks always see the main repo CWD
- `EnterWorktree` is the ONLY way to persistently switch the session CWD
- The `.claude/hooks` and `.claude/settings.json` symlinks are required so hooks fire in worktrees

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript
- **Package manager:** npm

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint

## Code Style
- Prefer small, focused components
- Use early returns over nested conditionals
- No unnecessary comments or docstrings
- Keep code simple — no over-engineering

## Branch Protection
- Hooks block all Edit/Write/Bash operations on `main` in the main repo
- Read-only commands (git, gh, ls, find, grep) are allowed on main for worktree setup
- The `task-setup-workflow` hook detects new tasks and requires a GitHub issue first
