#!/usr/bin/env bash
# Render CodeStoryPR composition to mp4.
set -euo pipefail

OUTPUT="${1:?Usage: render_video.sh <output.mp4>}"
ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 1
cd "$ROOT"

REMOTION_DIR="docs/codestory/remotion"
if [[ ! -d "$REMOTION_DIR" ]]; then
  echo "Run init_remotion_project.sh first." >&2
  exit 1
fi

OUT_DIR="$(dirname "$OUTPUT")"
mkdir -p "$OUT_DIR"
ABS_OUT="$(cd "$ROOT" && cd "$OUT_DIR" && pwd)/$(basename "$OUTPUT")"
cd "$REMOTION_DIR"

npx remotion render src/index.ts CodeStoryPR "$ABS_OUT"
echo "Rendered: $OUTPUT"
