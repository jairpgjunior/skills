# Audio for CodeStory videos

CodeStory videos **must include audio**. The skill ships **three BGM options** in `assets/audio/` and picks one based on PR/content signals.

## Bundled tracks (`assets/audio/`)

| ID | File | Mood | Prefer when |
|----|------|------|-------------|
| **focus** | `bgm-focus.mp3` | Calm, minimal | Architecture, security, migrations, APIs, boundaries |
| **energy** | `bgm-energy.mp3` | Upbeat pulse | Large diffs, breaking changes, major refactors |
| **flow** | `bgm-flow.mp3` | Steady groove | Collaboration, reviews, docs, onboarding, workflows |

Also: **`scene-tick.mp3`** — short blip at each scene transition.

See `assets/audio/manifest.json` for machine-readable metadata.

## Selection (automatic)

After collecting PR context and the change brief:

```bash
bash <skill-root>/scripts/prepare_audio.sh
```

This runs:

1. **`fetch_bgm.sh`** — ensures all three BGM files + tick exist (generates via ffmpeg if missing).
2. **`select_bgm.sh`** — scores keywords and diff size from `docs/codestory/.workspace/pr-context.json` and `change-brief.md`, then writes:
   - `docs/codestory/.workspace/audio-choice.json`
   - `docs/codestory/remotion/src/bgmSelection.ts` (imported by `CodeStory.tsx`)

Tell the user which track was chosen and why (from `audio-choice.json`).

## Remotion

```tsx
import { selectedBgm } from "./bgmSelection";
import { BGM_FILES } from "./bgmTracks";

<Audio src={staticFile(BGM_FILES[selectedBgm])} volume={0.35} loop />
```

All three files must be present in `docs/codestory/remotion/public/`.

## Custom tracks

Replace files in `assets/audio/` keeping IDs `focus`, `energy`, `flow`, then re-run `prepare_audio.sh` and render.

Record license/source in `docs/codestory/.workspace/audio-sources.md` when swapping.
