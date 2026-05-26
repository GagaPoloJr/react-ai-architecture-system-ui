# Project Initialization Workflow

## 0. Design Selection

Before any code, the user must pick a visual direction. The AI handles two scenarios:

### Scenario A: UI/UX Pro Max Is Installed (Recommended)

[UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) is a skill with 67 UI styles, 161 color palettes, 57 font pairings, and 161 industry-specific reasoning rules.

**Install it once** (if not already installed):

```bash
npm install -g uipro-cli
cd /path/to/your/project
uipro init --ai claude      # Claude Code
uipro init --ai cursor      # Cursor
uipro init --ai windsurf    # Windsurf
uipro init --ai opencode    # OpenCode
uipro init --ai gemini      # Gemini CLI
# or: uipro init --ai all   # Install for all assistants
```

**Use it**: Run `skill ui-ux-pro-max` (the skill auto-activates for UI/UX requests). Or run the search script directly:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS landing page" --design-system -p "ProjectName"
```

The search engine returns a complete design system: pattern, style, colors, typography, effects, anti-patterns.

### Scenario B: UI/UX Pro Max Not Installed

Fall back to the project's built-in `.design/` skills. Read each `SKILL.md` and present options manually.

### AI Recommendation

Analyze the project (type, audience, brand vibe, technical complexity) and recommend ONE design direction with rationale.

### Options List

Present these options for the user to choose from:

| # | Design Skill | Archetype / Mode | Best For | Key Traits |
|---|---|---|---|---|
| 1 | **High-End Visual Design** | Ethereal Glass (Light) | SaaS, Tech, AI | Glassmorphism, floating cards, accent indigo, backdrop-blur, premium polish |
| 2 | **High-End Visual Design** | Ethereal Glass (Dark) | SaaS, AI, Developer tools | OLED black, radial mesh gradients, double-bezel cards, dark-and-rich |
| 3 | **High-End Visual Design** | Editorial Luxury | Lifestyle, Agency, Real Estate | Warm creams, serif fonts, noise overlay, physical/paper feel |
| 4 | **High-End Visual Design** | Soft Structuralism | Consumer, Health, Portfolio | Silver-grey, massive bold type, airy components, soft shadows |
| 5 | **Minimalist UI** | Premium Utilitarian | Editorial, Documentation, Workspace | Monochrome, bento grids, typographic contrast, no gradients |
| 6 | **Industrial Brutalist UI** | Swiss Industrial Print (Light) | Data dashboards, Portfolios | Rigid grids, extreme type scale, primary red accent |
| 7 | **Industrial Brutalist UI** | Tactical Telemetry (Dark) | Developer tools, Aerospace | Monospace, CRT scanlines, high data density |

If UI/UX Pro Max is installed, the search engine may suggest additional styles beyond this list. The AI must include those in the options.

The AI must wait for the user's choice before proceeding to Step 1.

### Design Reference

If UI/UX Pro Max was used, its output defines the full design system. Otherwise, read the chosen `.design/*/SKILL.md` for fonts, colors, spacing, card patterns, and animations. Apply the chosen design's values throughout the rest of this workflow.

---

## 1. Create Vite + React + TypeScript Project
```bash
npm create vite@latest . -- --template react-ts
```

Confirm React 19, TypeScript 5.9, Vite 7.

## 2. Install Core Dependencies
```bash
# Routing
npm install react-router-dom

# Data fetching & caching
npm install @tanstack/react-query

# State management
npm install zustand

# Forms
npm install react-hook-form @hookform/resolvers zod

# i18n
npm install i18next react-i18next zod-i18n-map

# HTTP client
npm install axios

# UI utilities
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-label @radix-ui/react-separator @radix-ui/react-avatar @radix-ui/react-toast

# Icons
npm install lucide-react

# Table
npm install @tanstack/react-table

# Toast
npm install sonner

# Theme
npm install next-themes

# Head management
npm install react-helmet-async

# Dates
npm install date-fns

# Cookies
npm install js-cookie

# Animation
npm install tw-animate-css

# Font
npm install @fontsource-variable/inter

# Dev dependencies
npm install -D @tailwindcss/vite tailwindcss
```

## 3. Configure vite.config.ts
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
```

NO PostCSS config, NO tailwind.config — Tailwind v4 uses `@tailwindcss/vite` plugin only.

## 4. Configure TypeScript
```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "verbatimModuleSyntax": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@features/*": ["./src/features/*"],
      "@lib/*": ["./src/lib/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@types/*": ["./src/types/*"],
      "@utils/*": ["./src/utils/*"]
    }
  },
  "include": ["src"]
}
```

## 5. Set Up Tailwind CSS v4 Entry
```css
/* src/index.css */
@import 'tailwindcss';
@import 'tw-animate-css';
@import '@fontsource-variable/inter';
```
No `@tailwind` directives, no PostCSS — Tailwind v4 CSS-first config.

## 6. Set Up ESLint + Prettier
```bash
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh prettier eslint-config-prettier
```

```ts
// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  { ignores: ['dist/'] },
);
```

## 7. Set Up Husky + Lint-Staged
```bash
npm install -D husky lint-staged
npx husky init
```

```jsonc
// package.json (add)
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . && tsc --noEmit",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

```bash
# .husky/pre-commit
npx lint-staged
```

## 8. Verify
- `npm run dev` starts and renders
- `npm run build` passes (tsc + vite build)
- `npm run lint` clean
- `npm run typecheck` passes
