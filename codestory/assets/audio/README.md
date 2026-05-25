# CodeStory audio library

Three BGM beds + one scene tick. The skill picks a BGM via `scripts/select_bgm.sh`.

| File | ID | Best for |
|------|-----|----------|
| `bgm-focus.mp3` | focus | Architecture, security, migrations |
| `bgm-energy.mp3` | energy | Large / breaking / high-impact PRs |
| `bgm-flow.mp3` | flow | Collaboration, process, onboarding |
| `scene-tick.mp3` | — | Scene transitions |

```bash
bash scripts/fetch_bgm.sh      # generate or refresh all files
bash scripts/prepare_audio.sh  # fetch + select for current repo
```

Replace MP3s to customize; keep filenames. See `manifest.json`.
