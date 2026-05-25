# Design System — Taste Skill

> All 12 [Taste Skill](https://www.tasteskill.dev) design skills installed.
> Framework by [Leon Lin](https://github.com/Leonxlnx) and [blueemi](https://github.com/blueemi99).
> Licensed under MIT.

## Skills Index

| Directory | Install Name | Purpose |
|-----------|-------------|---------|
| `design-taste-frontend/` | `design-taste-frontend` | Core — premium frontend with 3 dials (variance, motion, density) |
| `gpt-taste/` | `gpt-taste` | Stricter rules for GPT/Codex models |
| `image-to-code/` | `image-to-code` | Image-first pipeline: generate → analyze → code |
| `redesign-existing-projects/` | `redesign-existing-projects` | Audit + fix existing UIs |
| `high-end-visual-design/` | `high-end-visual-design` | Soft, calm, expensive-looking UI |
| `minimalist-ui/` | `minimalist-ui` | Editorial product UI (Notion/Linear vibes) |
| `industrial-brutalist-ui/` | `industrial-brutalist-ui` | Swiss typography, raw structure, sharp contrast |
| `full-output-enforcement/` | `full-output-enforcement` | Anti-laziness — no placeholder code |
| `stitch-design-taste/` | `stitch-design-taste` | Google Stitch-compatible design rules |
| `imagegen-frontend-web/` | `imagegen-frontend-web` | Website reference image generation |
| `imagegen-frontend-mobile/` | `imagegen-frontend-mobile` | Mobile screen reference images |
| `brandkit/` | `brandkit` | Brand identity board images |

## How to Use

OpenCode loads these skills automatically from `.design/`. To activate one in a session:

> "Follow the `design-taste-frontend` skill from `.design/design-taste-frontend/SKILL.md` with DESIGN_VARIANCE: 8, MOTION_INTENSITY: 6, VISUAL_DENSITY: 4."

Or install individual skills into other agents:

```bash
npx skills add Leonxlnx/taste-skill --skill "design-taste-frontend"
npx skills add Leonxlnx/taste-skill --skill "minimalist-ui"
```

## Credits

- **Taste Skill**: [tasteskill.dev](https://www.tasteskill.dev) — The Anti-Slop Frontend Framework for AI Agents
- **Author**: [Leon Lin](https://x.com/lexnlin)
- **Co-author**: [blueemi](https://x.com/blueemi99)
- **Repository**: [github.com/Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
- **License**: MIT
