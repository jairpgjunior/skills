#!/usr/bin/env bash
# Fetch all BGM assets, select track for current PR/content, sync to Remotion public/.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# fetch_bgm removed: audio assets are committed to the repo; select track only
bash "$ROOT/scripts/select_bgm.sh"
