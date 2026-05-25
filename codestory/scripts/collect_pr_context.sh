#!/usr/bin/env bash
# Collect PR metadata and diff for CodeStory analysis.
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "Not inside a git repository." >&2
  exit 1
}
cd "$ROOT"

OUT_DIR="docs/codestory/.workspace"
mkdir -p "$OUT_DIR"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required." >&2
  exit 1
fi

if ! gh pr view >/dev/null 2>&1; then
  echo "No open PR for current branch. Create one with: gh pr create" >&2
  exit 1
fi

PR_JSON="$(gh pr view --json number,title,body,url,baseRefName,headRefName,author,files,commits,additions,deletions,changedFiles)"
PR_DIFF="$(gh pr diff)"
LOG="$(git log --oneline -20 "$(gh pr view --json headRefName -q .headRefName)")"

python3 - <<'PY' "$OUT_DIR/pr-context.json" "$PR_JSON" "$PR_DIFF" "$LOG"
import json, sys
out, pr_json, diff, log = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
data = json.loads(pr_json)
data["diff"] = diff
data["recent_commits_oneline"] = log.strip().split("\n") if log.strip() else []
with open(out, "w") as f:
    json.dump(data, f, indent=2)
print(f"Wrote {out}")
PY

echo "PR #$(echo "$PR_JSON" | python3 -c 'import json,sys; print(json.load(sys.stdin)["number"])')"
