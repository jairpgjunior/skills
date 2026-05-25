#!/usr/bin/env bash
# Scaffold Remotion project under docs/codestory/remotion/
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 1
cd "$ROOT"

TARGET="docs/codestory/remotion"
if [[ -d "$TARGET/package.json" ]]; then
  echo "Remotion project already exists at $TARGET"
  exit 0
fi

mkdir -p "$TARGET"
SKILL_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [[ -d "$SKILL_ROOT/assets/remotion-template" ]]; then
  cp -R "$SKILL_ROOT/assets/remotion-template/." "$TARGET/"
  bash "$SKILL_ROOT/scripts/fetch_bgm.sh" 2>/dev/null || true
  bash "$SKILL_ROOT/scripts/select_bgm.sh" 2>/dev/null || true
else
  echo "Template missing; bootstrapping with npm create remotion@latest"
  cd docs/codestory
  npm create video@latest remotion -- --template blank
fi

cd "$TARGET"
if [[ ! -f package.json ]]; then
  echo "Failed to scaffold Remotion at $TARGET" >&2
  exit 1
fi

npm install
echo "Remotion scaffold ready at $TARGET"
