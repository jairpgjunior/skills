# DESIGN.md parsing for CodeStory

## Search paths (first match wins)

1. `DESIGN.md` (repository root)
2. `docs/DESIGN.md`
3. `.design/DESIGN.md`
4. `design/DESIGN.md`

## What to extract

Build `docs/codestory/.workspace/design-tokens.md` with:

| Token | Look for |
|-------|----------|
| Colors | hex, rgb, CSS variables, "primary", "accent" |
| Typography | font families, scale, weights |
| Icons | icon set name (Lucide, Heroicons, custom), stroke width, corner radius |
| Spacing | base unit, grid |
| Logo | paths or URLs to mark assets |
| Illustration | mascots, shapes, forbidden styles |
| Motion | duration/easing notes if present |

## Defaults (when DESIGN.md is missing)

```yaml
colors:
  background: "#0f172a"
  surface: "#1e293b"
  primary: "#38bdf8"
  text: "#f8fafc"
typography:
  heading: "system-ui, sans-serif"
  body: "system-ui, sans-serif"
icons:
  library: "lucide-react"
  style: "outline, 2px stroke"
motion:
  default_duration_frames: 20
  fps: 30
```

State clearly in the script that branding is provisional until DESIGN.md exists.
