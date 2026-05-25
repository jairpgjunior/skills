#!/usr/bin/env bash
# Prepend CodeStory section to current PR description.
set -euo pipefail

VIDEO_PATH="${1:?Usage: update_pr_body.sh <path-to-mp4>}"
ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 1
cd "$ROOT"

command -v gh >/dev/null || { echo "gh required" >&2; exit 1; }

PR_NUM="$(gh pr view --json number -q .number)"
BODY="$(gh pr view --json body -q .body)"
HEAD_SHA="$(git rev-parse HEAD)"
REMOTE_URL="$(git remote get-url origin 2>/dev/null || echo "")"

# GitHub web path guess for blob link
REPO_PATH=""
if [[ "$REMOTE_URL" =~ github.com[:/]([^/]+/[^/.]+) ]]; then
  REPO_PATH="${BASH_REMATCH[1]%.git}"
fi

LINK="$VIDEO_PATH"
if [[ -n "$REPO_PATH" ]]; then
  LINK="https://github.com/${REPO_PATH}/blob/${HEAD_SHA}/${VIDEO_PATH}"
fi

BLOCK="## CodeStory

${LINK}

Short recap video for this PR — architecture and team impact.

---

"

TMP="$(mktemp)"
# Avoid duplicating if already present
if echo "$BODY" | grep -q "## CodeStory"; then
  echo "$BODY" | sed '/^## CodeStory$/,/^---$/d' | sed '/^$/N;/^\n$/d' > "$TMP"
  BODY="$(cat "$TMP")"
fi

printf '%s%s' "$BLOCK" "$BODY" > "$TMP"
gh pr edit "$PR_NUM" --body-file "$TMP"
rm -f "$TMP"
echo "Updated PR #$PR_NUM description with CodeStory link."
