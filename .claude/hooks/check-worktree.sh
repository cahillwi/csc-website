#!/bin/bash
# Claude Code Hook: Block operations in main repo (must use worktrees)
# This runs before tool execution to enforce worktree workflow
#
# Exit codes:
#   0 - Allow the tool call
#   2 - Block the tool call (stderr sent to Claude as feedback)
#
# Exceptions (allowed on dev):
#   - Success prompts: .claude/prompts/success-*.md

# Detect if we're in the main repo vs a worktree using git internals.
# In worktrees, .git at the repo root is a FILE (pointing to main .git).
# In the main repo, .git is a DIRECTORY. Works on all platforms.
TOPLEVEL=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -z "$TOPLEVEL" ]; then
  exit 0  # Not in a git repo, allow
fi

# If .git is a regular file (not a symlink), we're in a worktree - allow operations.
# Symlinks are rejected to prevent bypass via symlink attack.
if [ -f "$TOPLEVEL/.git" ] && [ ! -L "$TOPLEVEL/.git" ]; then
  # Verify it's a real worktree by checking gitdir format
  if grep -q '^gitdir: ' "$TOPLEVEL/.git" 2>/dev/null; then
    MAIN_REPO=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null | sed 's|/\.git$||')

    # Auto-symlink .claude pieces from main repo if missing in worktree.
    # Claude Code creates .claude/ as a real directory (for settings.local.json),
    # so we symlink hooks/ and settings.json individually rather than the whole dir.
    if [ -d "$TOPLEVEL/.claude" ] && [ ! -L "$TOPLEVEL/.claude" ]; then
      if [ ! -d "$TOPLEVEL/.claude/hooks" ] && [ ! -L "$TOPLEVEL/.claude/hooks" ] && [ -d "$MAIN_REPO/.claude/hooks" ]; then
        ln -s "$MAIN_REPO/.claude/hooks" "$TOPLEVEL/.claude/hooks" 2>/dev/null
      fi
      if [ ! -f "$TOPLEVEL/.claude/settings.json" ] && [ ! -L "$TOPLEVEL/.claude/settings.json" ] && [ -f "$MAIN_REPO/.claude/settings.json" ]; then
        ln -s "$MAIN_REPO/.claude/settings.json" "$TOPLEVEL/.claude/settings.json" 2>/dev/null
      fi
    elif [ ! -d "$TOPLEVEL/.claude" ] && [ ! -L "$TOPLEVEL/.claude" ]; then
      if [ -d "$MAIN_REPO/.claude" ]; then
        ln -s "$MAIN_REPO/.claude" "$TOPLEVEL/.claude" 2>/dev/null
      fi
    fi

    exit 0
  fi
fi

# Read JSON input from stdin
INPUT=$(cat)

# Allow worktree creation/management commands through (avoids catch-22)
COMMAND=$(echo "$INPUT" | sed -n 's/.*"command" *: *"\([^"]*\)".*/\1/p')
if echo "$COMMAND" | grep -qE "git worktree (add|list|prune|remove)"; then
  exit 0
fi
if echo "$COMMAND" | grep -qE "git pull|git fetch|git log|gh (issue|pr|run|api|workflow) |^az |^ssh |^ls |^find |^grep |^cat |^head |^wc "; then
  exit 0
fi
# Allow worktree setup commands (symlinks, directory creation)
if echo "$COMMAND" | grep -qE "^mkdir -p |^ln -s "; then
  exit 0
fi

# Allow brainstorm visual companion (read-only design tool, no code changes)
if echo "$COMMAND" | grep -qE "superpowers/.*/brainstorming/scripts/|\.superpowers/brainstorm/"; then
  exit 0
fi

# We're in the main repo (.git is a directory) - check branch
BRANCH=$(git branch --show-current 2>/dev/null)

# Block if on main or dev branch
if [ "$BRANCH" = "main" ]; then

  # Exception: Allow success prompts to be committed directly to dev
  # Check if only success prompt files are being modified
  STAGED=$(git diff --cached --name-only 2>/dev/null)
  UNSTAGED=$(git diff --name-only 2>/dev/null)
  UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null)
  ALL_CHANGES=$(printf '%s\n%s\n%s' "$STAGED" "$UNSTAGED" "$UNTRACKED" | grep -v '^$' | sort -u)

  # Check if all changes are success prompts (strict name pattern)
  ONLY_SUCCESS_PROMPTS=true
  while IFS= read -r file; do
    if [ -n "$file" ] && ! printf '%s\n' "$file" | grep -qE '^\.claude/prompts/success-[a-zA-Z0-9_-]+\.md$'; then
      ONLY_SUCCESS_PROMPTS=false
      break
    fi
  done <<< "$ALL_CHANGES"

  # Allow if only success prompts are being modified
  if [ "$ONLY_SUCCESS_PROMPTS" = true ] && [ -n "$ALL_CHANGES" ]; then
    exit 0
  fi

  # Derive project name and worktrees directory name
  PROJECT_NAME=$(basename "$TOPLEVEL")
  WORKTREES_DIR="${PROJECT_NAME}-worktrees"

  echo "" >&2
  echo "========================================" >&2
  echo "  BLOCKED: Working directly in main repo" >&2
  echo "========================================" >&2
  echo "" >&2
  echo "  Current directory: $(pwd)" >&2
  echo "  Current branch: $BRANCH" >&2
  echo "" >&2
  echo "  Create a worktree with hook symlinks:" >&2
  echo "" >&2
  echo "    git worktree add ../${WORKTREES_DIR}/GH-XXX-name -b feature/GH-XXX-name main \\" >&2
  echo "      && mkdir -p ../${WORKTREES_DIR}/GH-XXX-name/.claude \\" >&2
  echo "      && ln -sf \"\$(pwd)/.claude/hooks\" ../${WORKTREES_DIR}/GH-XXX-name/.claude/hooks \\" >&2
  echo "      && ln -sf \"\$(pwd)/.claude/settings.json\" ../${WORKTREES_DIR}/GH-XXX-name/.claude/settings.json" >&2
  echo "" >&2
  echo "  Then switch into it:" >&2
  echo "" >&2
  echo "    EnterWorktree(path: \"../${WORKTREES_DIR}/GH-XXX-name\")" >&2
  echo "" >&2
  echo "  Exception: Success prompts (.claude/prompts/success-*.md) can be" >&2
  echo "  committed directly to dev without a worktree." >&2
  echo "" >&2
  exit 2  # Exit code 2 blocks the tool call in Claude Code
fi

exit 0
