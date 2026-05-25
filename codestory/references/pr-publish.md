# Publishing CodeStory to the PR

## PR body prepend

Insert at the **top** of the existing body:

```markdown
## CodeStory

https://github.com/<owner>/<repo>/blob/<head-sha>/docs/codestory/<pr-number>-codestory.mp4

Short recap video for this PR — architecture and team impact in ~90s.

---

```

If the video is uploaded to GitHub Releases or external hosting instead, use that URL. Prefer repo-relative links when the mp4 is committed on the PR branch.

## GitHub video display

GitHub renders some video URLs in the PR UI. If inline playback fails, the link still works. Optional: add a static poster frame image `docs/codestory/<pr-number>-poster.png` in the same section.

## gh CLI pattern

`scripts/update_pr_body.sh` uses:

```bash
gh pr view --json body,number
# prepend block
gh pr edit --body-file /tmp/pr-body.md
```

Never overwrite unrelated PR content—always read-merge-write.

## Commit message suggestion

```
docs(codestory): add PR #<n> recap video and script
```
