# Remotion composition guide for CodeStory

CodeStory videos live in **`docs/codestory/remotion/`** after scaffold.

## Project layout (after init)

```text
docs/codestory/remotion/
├── package.json
├── remotion.config.ts
├── public/
│   ├── bgm-focus.mp3          # Calm bed (architecture / security PRs)
│   ├── bgm-energy.mp3         # Upbeat bed (large / breaking PRs)
│   ├── bgm-flow.mp3           # Groove bed (collaboration / process PRs)
│   └── scene-tick.mp3         # Scene-transition UI blip
├── src/
│   ├── index.ts               # registerRoot
│   ├── Root.tsx
│   ├── CodeStory.tsx          # Audio + scene sequences
│   ├── scenesData.ts
│   ├── theme.ts
│   ├── components/
│   │   ├── SceneShell.tsx     # Centered layout + progress bar
│   │   ├── SceneProgressBar.tsx
│   │   └── ...
│   └── scenes/
└── ...
```

Run `bash <skill-root>/scripts/prepare_audio.sh` before render (fetch all tracks + `select_bgm.sh`).

## SceneShell (required)

Every scene **must** be wrapped in `SceneShell` from `CodeStory.tsx`:

- **Centers** all content (flex column, `alignItems: center`, `textAlign: center`).
- **Progress bar** at the bottom: starts at 100% width, drains to 0% over the scene duration.
- Shows `Scene N/M` and approximate seconds remaining.
- Optional `background` slot (e.g. mesh gradient) and `surfaceColor` per scene.

Scene components should return **inner content only**—no outer `AbsoluteFill` layout.

## Audio (required)

In `CodeStory.tsx`:

```tsx
import { selectedBgm } from "./bgmSelection";
import { BGM_FILES } from "./bgmTracks";

<Audio src={staticFile(BGM_FILES[selectedBgm])} volume={0.35} loop />
// At each scene start (except the first):
<Sequence from={sceneStartFrame}>
  <Audio src={staticFile("scene-tick.mp3")} volume={0.28} />
</Sequence>
```

See `references/audio.md` for licensing and custom tracks.

## Implementation rules

1. **One composition**: `CodeStoryPR` with props `{ prNumber, title }`.
2. **Scene timing**: Match approved script; long reads are OK if the progress bar is present.
3. **Theme**: Import from `theme.ts` only.
4. **Icons**: Lucide 2px stroke unless DESIGN.md overrides.
5. **Duration**: `durationInFrames = fps * seconds`; default **fps = 30**.

## Rendering

```bash
bash <skill-root>/scripts/render_video.sh docs/codestory/<pr-number>-codestory.mp4
```

## Quality bar

- **Sound on**: BGM + scene ticks audible in the rendered mp4.
- **Centered**: No persistent left-aligned blocks.
- **Progress**: Bar visible and draining on every scene.
- First frame readable as thumbnail.
- No placeholder lorem ipsum.
