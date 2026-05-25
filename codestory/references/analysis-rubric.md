# Change analysis rubric

Use this when reviewing `pr-context.json` before writing the script.

## Score each area (High / Medium / Low / None)

| Area | High signal examples |
|------|----------------------|
| Architecture | New service, boundary move, schema migration, public API change |
| Data & contracts | DB migrations, event shapes, shared types, feature flags |
| Collaboration | CODEOWNERS, new review paths, team ownership shift, runbooks |
| Security & compliance | AuthZ, secrets, PII handling, audit logs |
| Operability | Deploy order, rollback, observability, SLO impact |
| Developer experience | CLI, local setup, CI changes affecting everyone |

Only **High** and notable **Medium** items become scenes. **Low/None** → omit or one-line epilogue.

## Sticky note test

For each candidate point, ask:

> "If someone joins the team in 3 months without reading this PR, what one sentence must they know?"

If you cannot answer, cut it.

## Collaboration dynamics

Explicitly note:

- Who should review (teams, specialists)
- What changes for on-call or support
- Whether pairing or office hours is recommended
- Docs or ADRs that should be updated (link paths)

## Output: Change Brief (internal)

```markdown
# Change Brief — PR #N

## Architecture (sticky)
- ...

## Collaboration (sticky)
- ...

## Risks
- ...

## Scene candidates
1. ...
2. ...
```
