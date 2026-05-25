# Pixar-style script format for CodeStory

CodeStory scripts are **storyboard documents**, not shooting scripts. They should feel like a Pixar pitch: clear stakes, a small cast of ideas, and motion that earns attention.

## Story spine

Use this beat structure (adapt timing to 60–120s total):

1. **Once upon a time** — How the system worked before (one sentence).
2. **Every day** — What the team relied on (routine, contract, workflow).
3. **Until one day** — What this PR changes (the inciting incident).
4. **Because of that** — Consequence chain (1–3 beats): architecture → collaboration → risk.
5. **Until finally** — What reviewers and future maintainers should remember (sticky notes).
6. **Ever since** — How to work with the new shape (ownership, docs, follow-ups).

## Voice

- Present tense, active voice.
- Concrete nouns ("auth service", "billing webhook") over vague labels ("the module").
- One metaphor per video, carried across scenes (e.g. "traffic control", "library checkout").
- Warm and respectful—no blame, no sarcasm.

## Scene rules

Each scene needs:

- **Narration** — Speakable in ~8–15 seconds.
- **On screen** — Icons, labels, or a simple diagram spec (not full JSX).
- **Motion** — Enter/exit, emphasis, or camera (pan/zoom) in plain language.

Avoid:

- Reading file paths aloud unless they are the sticky memory (e.g. new `DESIGN.md` location).
- Listing more than three bullet lines on screen at once.
- Jargon without a one-line plain-English gloss.

## Example scene (abbreviated)

```markdown
### Scene 2 — New front door (0:12–0:28)
**Narration:** "Until now, every login walked through the monolith. This PR moves sign-in to its own service—same keys for users, new door for engineers."
**On screen:** Icon: door + key; arrow from "Monolith" box to "Auth service" box; DESIGN.md primary color on Auth box.
**Motion:** Door icon slides in; arrow draws left-to-right.
```

## Approval checklist

Before asking the user to approve, verify:

- [ ] Logline names the architectural or collaboration shift
- [ ] At least one scene covers **team dynamics** (review, ownership, rollout)
- [ ] Visual system section cites DESIGN.md (or notes defaults)
- [ ] Full narration read-through is under ~250 words unless user asked for longer
