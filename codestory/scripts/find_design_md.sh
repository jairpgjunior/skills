#!/usr/bin/env bash
# Locate DESIGN.md and write design-tokens stub path.
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 1
cd "$ROOT"

PATHS=(DESIGN.md docs/DESIGN.md .design/DESIGN.md design/DESIGN.md)
FOUND=""

for p in "${PATHS[@]}"; do
  if [[ -f "$p" ]]; then
    FOUND="$p"
    break
  fi
done

OUT_DIR="docs/codestory/.workspace"
mkdir -p "$OUT_DIR"

if [[ -z "$FOUND" ]]; then
  echo "DESIGN.md not found (searched: ${PATHS[*]})" >&2
  echo '{"found": false, "searched": ["DESIGN.md", "docs/DESIGN.md", ".design/DESIGN.md", "design/DESIGN.md"]}' > "$OUT_DIR/design-source.json"
  exit 0
fi

python3 - <<PY
import json
from pathlib import Path
src = Path("$FOUND")
out = Path("$OUT_DIR/design-source.json")
out.write_text(json.dumps({"found": True, "path": str(src), "content_preview": src.read_text()[:8000]}, indent=2))
print(f"Found DESIGN.md at {src}")
PY

echo "Next: extract tokens into $OUT_DIR/design-tokens.md per references/design-md.md"
