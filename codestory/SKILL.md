---
name: codestory
description: >-
  Turn pull-request and recent code changes into a short, high-impact storytelling
  video so the team can keep up when AI ships fast. Use this skill whenever the user
  mentions codestory, PR recap video, change storytelling, Remotion recap, team
  onboarding to a PR, architecture change video, DESIGN.md visuals, docs/codestory,
  or wants teammates to understand what changed and why it matters for collaboration.
  Also use when they ask to summarize a PR for humans, sticky mental models of a
  diff, or Pixar-style scripts before rendering a video.
---

# CodeStory

## Demo

<p align="center">

https://github.com/user-attachments/assets/19541b87-13e7-4ed4-b5cb-e9d33967448a

</p>

Help teams **stick** what changed: high-level architecture, collaboration impact, and decisions that matter—not every line of diff. Output is a **Remotion** video (React), branded from the repo's DESIGN.md.

## Principles

- **Sticky, not exhaustive**: Prioritize decisions people must remember to manage the project later. Skip noise, formatting-only edits, and dependency bumps unless they change architecture or team responsibility.
- **Visual-first**: Pull colors, typography, icon style, and layout rules from DESIGN.md. Use icons, diagrams, and motion—not walls of text.
- **Two-phase gate**: Never render video until the user explicitly approves the script (see Phase 2).
- **Human pace vs AI pace**: Frame the story for teammates who cannot read every AI-generated line; emphasize *why* and *who is affected*.
- **Always audible**: Every render includes looping geek/modern background music plus a subtle scene-transition tick. Silent videos are not acceptable. The skill ships **three BGM options** in `assets/audio/` for different PR vibes.
- **Centered frames**: All on-screen content is vertically and horizontally centered via `SceneShell`—no left-aligned slide decks.
- **Scene progress feedback**: Each scene shows a bottom progress bar that starts **full** and **drains** to empty before the next scene, with a seconds-remaining label so viewers know when the current clip ends.

## Prerequisites

Before starting, verify:

| Requirement | Check |
|-------------|--------|
| Git repo | `git rev-parse --show-toplevel` |
| GitHub CLI | `gh auth status` |
| Open PR for current branch | `gh pr view` (or guide user to open one) |
| Node 18+ | `node -v` |

If any check fails, stop and tell the user what to fix.

## Workflow overview

```text
Collect PR context → Find DESIGN.md → Analyze impact → Write Pixar-style script
        → USER APPROVES → Scaffold Remotion (if needed) → Render → Publish
```

---

## Phase 1: Discover and analyze

### 1.1 Collect PR and change context

Run from the repository root:

```bash
bash <skill-root>/scripts/collect_pr_context.sh
```

This writes `docs/codestory/.workspace/pr-context.json` (create parent dirs as needed). If the script is unavailable, gather manually with `gh`:

- `gh pr view --json title,body,number,url,baseRefName,headRefName,author,files,commits`
- `gh pr diff`
- Recent commits on the branch: `git log --oneline -20`

Read `references/analysis-rubric.md` and produce a short **Change Brief** (internal, not shown to user yet) covering:

1. **Architecture** — new modules, boundaries, data flow, APIs, infra
2. **Collaboration** — ownership, review burden, breaking changes, migrations, docs
3. **Risks** — what could surprise the team in 2–4 weeks
4. **Visual hooks** — 3–6 moments that deserve an icon or diagram on screen

### 1.2 Find DESIGN.md

```bash
bash <skill-root>/scripts/find_design_md.sh
```

Search order (first readable file wins): `DESIGN.md`, `docs/DESIGN.md`, `.design/DESIGN.md`, `design/DESIGN.md`.

- **Found**: Extract palette, fonts, logo/icon rules, spacing, and any component or illustration guidance into `docs/codestory/.workspace/design-tokens.md`.
- **Missing**: Warn the user once. Proceed with a neutral default (see `references/design-md.md`) and note in the script that branding is provisional.

---

## Phase 2: Script (approval required)

Write the video script before any Remotion or render work.

Read `references/pixar-script-format.md` and output:

**File:** `docs/codestory/<pr-number>-script.md`

**Tone:** Pixar-storyboard quality—clear emotional arc, concrete metaphors, warmth, zero corporate filler. Target **60–120 seconds** spoken (roughly 150–250 words narration unless the user asks otherwise).

**Structure (use this template):**

```markdown
# CodeStory — PR #<number>: <title>

## Logline
One sentence: what changed and why the team should care.

## Audience sticky notes
- ...
- ...

## Visual system (from DESIGN.md)
- Colors: ...
- Type / icons: ...

## Scenes

### Scene 1 — <title> (0:00–0:12)
**Narration:** ...
**On screen:** [icon/diagram/text]
**Motion:** ...

(repeat per scene)

## Full narration (read-through)
...

## Assets checklist
| Asset | Source | Notes |
|-------|--------|-------|
| ... | DESIGN.md / repo | ... |
```

Present the script to the user in chat (summary + path). Ask explicitly:

> "Review `docs/codestory/<pr-number>-script.md`. Reply **approve** to render the video, or tell me what to change."

**Do not** run Remotion, `render_video.sh`, or update the PR body until the user approves.

---

## Phase 3: Produce video (after approval only)

### 3.1 Scaffold Remotion under docs/codestory

If `docs/codestory/remotion/` does not exist:

```bash
bash <skill-root>/scripts/init_remotion_project.sh
```

Follow `references/remotion-composition.md` to implement compositions that match the approved script scenes.

### 3.2 Implement and render

1. Map each scene to a Remotion composition or sequence.
2. Use DESIGN.md tokens for backgrounds, text, and icon treatment.
3. Prefer simple vector icons (e.g. Lucide via `lucide-react`) aligned with DESIGN.md style.
4. Wrap every scene in **`SceneShell`** (centered content + draining progress bar). See `references/remotion-composition.md`.
5. Prepare audio (all three BGM options + auto-select for this PR):
   ```bash
   bash <skill-root>/scripts/prepare_audio.sh
   ```
   Confirm `docs/codestory/remotion/public/bgm-{focus,energy,flow}.mp3` and `scene-tick.mp3` exist. Tell the user which track was selected (`docs/codestory/.workspace/audio-choice.json`).

Render:

```bash
bash <skill-root>/scripts/render_video.sh docs/codestory/<pr-number>-codestory.mp4
```

**Outputs (commit-worthy):**

| Path | Purpose |
|------|---------|
| `docs/codestory/<pr-number>-codestory.mp4` | Final video |
| `docs/codestory/<pr-number>-script.md` | Approved script |
| `docs/codestory/remotion/` | Source project (if scaffolded) |

If the repo should not commit large binaries, ask the user once; otherwise default to committing the mp4 so the PR can reference it.

### 3.3 Update PR description

Prepend a video block to the **existing** PR body (do not erase unrelated content):

```bash
bash <skill-root>/scripts/update_pr_body.sh docs/codestory/<pr-number>-codestory.mp4
```

The script inserts a markdown header and uses **GitHub's file attachment method** to ensure the video renders properly when opening or updating the PR. This method:

1. **Uploads the video** as a GitHub asset (via `gh` or direct media upload)
2. **Generates a markdown link** using the asset URL pattern: `https://github.com/user-attachments/assets/...`
3. **Inserts at the top** of the PR body for immediate visibility

This approach guarantees video playback works in all PR views (web UI, mobile, email notifications, etc.) and prevents broken links from relative blob paths.

See `references/pr-publish.md` for GitHub video/link patterns and attachment workflows.

Confirm with the user: PR URL, video asset URL, and that `docs/codestory/` is ready to commit.

---

## What to emphasize vs skip

| Emphasize | De-emphasize |
|-----------|----------------|
| New boundaries between services/modules | Renames without behavior change |
| Auth, permissions, data contracts | Formatting-only diffs |
| Migrations and rollout order | Lockfile-only PRs (unless security-critical) |
| Who owns what going forward | Single-line comments |
| Breaking API or config changes | Test-only changes (unless they signal new contracts) |

---

## Bundled resources

| Resource | When to read |
|----------|----------------|
| `references/pixar-script-format.md` | Writing Phase 2 script |
| `references/design-md.md` | Parsing DESIGN.md |
| `references/remotion-composition.md` | Building compositions |
| `references/audio.md` | Background music + scene ticks |
| `references/analysis-rubric.md` | Phase 1 analysis |
| `references/pr-publish.md` | Updating PR body and video attachment |
| `scripts/*.sh` | Automation for context, render, PR update |

---

## Errors and edge cases

- **No open PR**: Offer `gh pr create` guidance or ask for a branch comparison target.
- **Huge PR**: Summarize by area (top-level dirs); do not narrate every file.
- **DESIGN.md missing**: Use defaults; flag for design follow-up.
- **Render fails**: Capture stderr, fix dependencies in `docs/codestory/remotion/`, retry once, then report.
- **User wants script only**: Stop after Phase 2; do not render.
- **Video attachment fails**: Fall back to blob link pattern with warning that playback may be inconsistent across platforms.

