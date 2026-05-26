# Frontend Architecture System

Opinionated Frontend Engineering System for scalable AI-based web application development.

**React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS v4 SPA** — A reusable frontend engineering system designed for scalable AI-assisted development workflows. Use it as a project starter **or** adopt its architecture docs as your engineering foundation.

---

## Two Ways to Use This

### 🆕 Path A — Bootstrap a New Project (From Zero)

**Step 1: Clone this architecture repo**

```bash
git clone <this-repo-url> frontend-os
cd frontend-os
```

**Step 2: Generate your project**

```bash
./.scaffolds/bootstrap.sh my-app
```

This one command does everything:

- Creates a fresh Vite + React + TypeScript project
- Installs all 28+ dependencies (TanStack Query, zustand, RHF, Radix, axios, etc.)
- Configures `vite.config.ts` with `@tailwindcss/vite` plugin + path aliases
- Sets up TypeScript paths, ESLint 9 flat config, Prettier, Husky, lint-staged
- Creates the full `src/` directory structure (shared/, features/, pages/, routes/, etc.)
- Adds working stubs: `AppProvider`, `Router`, `cn()`, axios client, home page
- **Copies the entire architecture system**: `.agent/`, `.architecture/`, `.rules/`, `.templates/`, `.workflows/`, `.docs/`, `.design/`, `core.md`

**Step 3: Start building**

```bash
cd my-app
npm run dev
# Open http://localhost:5173
```

Now prompt the AI:

> "Read `core.md` then load `.agent/feature-generator.md`. Scaffold a `billing` feature."

### 📖 Path B — Adopt the Architecture Into an Existing Project

Use only the docs, rules, agents, and templates as your engineering blueprint:

```bash
cp -r .agent/ .architecture/ .rules/ .templates/ .workflows/ .docs/ core.md your-project/
```

Then follow `.workflows/init.md` to install the matching stack (or adapt to yours). The patterns are stack-agnostic — swap React for Vue, TanStack Query for SWR, etc.

---

## Stack

| Category      | Library                                                         | Version |
| ------------- | --------------------------------------------------------------- | ------- |
| Framework     | React + react-dom                                               | 19      |
| Language      | TypeScript                                                      | 5.9     |
| Bundler       | Vite + @vitejs/plugin-react                                     | 7       |
| Routing       | react-router-dom (SPA, createBrowserRouter)                     | 7       |
| Server state  | @tanstack/react-query + devtools                                | 5       |
| Client state  | zustand (create, devtools, persist)                             | 5       |
| Forms         | react-hook-form + @hookform/resolvers/zod                       | 7       |
| Validation    | zod + zod-i18n-map                                              | 3       |
| Styling       | Tailwind CSS (v4, @tailwindcss/vite)                            | 4       |
| UI primitives | @radix-ui/\* (dialog, dropdown-menu, select, tabs, etc.)        | latest  |
| Icons         | lucide-react                                                    | latest  |
| HTTP          | axios                                                           | 1       |
| Tables        | @tanstack/react-table                                           | 8       |
| i18n          | i18next + react-i18next                                         | 24 / 15 |
| Notifications | sonner (toast, Toaster)                                         | 2       |
| Theme         | next-themes (ThemeProvider, useTheme)                           | 0.4     |
| SEO           | react-helmet-async (Helmet, HelmetProvider)                     | 2       |
| Date          | date-fns                                                        | 4       |
| Cookies       | js-cookie                                                       | 3       |
| OTP input     | input-otp                                                       | latest  |
| Class utils   | class-variance-authority + tailwind-merge + clsx                | latest  |
| Animation     | tw-animate-css                                                  | 1       |
| Font          | @fontsource-variable/inter                                      | latest  |
| Linting       | ESLint 9 (flat config) + Prettier (prettier-plugin-tailwindcss) | latest  |
| Git hooks     | husky 9 + lint-staged                                           | latest  |

---

## Architecture at a Glance

```
.agent/             10 AI agent definitions (prompt any AI assistant)
.architecture/      15 architecture docs (folder, FDD, shared, API, state...)
.rules/             5 enforceable rulesets (scalability, isolation, perf...)
.templates/         8 reusable templates (feature, component, hook, API...)
.workflows/         8 step-by-step engineering workflows (init, review...)
.scaffolds/         4 executable scripts (bootstrap, feature, component, hook)
.docs/              4 documentation guides (getting started, conventions...)
core.md             Central reference — start here
```

## Project Structure (src/)

```
src/
├── shared/                  # Reusable platform (knows nothing about features)
│   ├── ui/                  #   atoms/, molecules/, organisms/
│   ├── lib/                 #   Pure utilities
│   ├── api/                 #   Axios config + base hooks
│   ├── hooks/               #   Generic React hooks
│   ├── utils/               #   cn() via tailwind-merge + clsx
│   ├── types/               #   Domain-agnostic types
│   └── config/              #   App-wide config
├── features/{name}/         # Self-contained modules
│   ├── api/                 #   Axios service functions
│   ├── components/          #   Feature-specific components
│   ├── hooks/               #   TanStack Query hooks
│   ├── types/               #   Feature-specific types
│   ├── schemas/             #   Zod validation schemas
│   └── index.ts             #   Public barrel
├── pages/                   # Route-level page composition
├── routes/                  # Route definitions + guards
├── layouts/                 # App shell layouts
├── stores/                  # Zustand cross-feature state
├── translations/            # i18next resources
├── providers/               # Theme, Query, Helmet, Toaster providers
└── configs/                 # Client, navigation config
```

### Key Conventions

- kebab-case for all files and directories (components are PascalCase)
- No `React.FC` — always `function Component()`
- Features never import from features
- Barrel exports are the public API contract
- Zod schemas are single source of truth for data shapes
- TanStack Query → server state, Zustand → client state, URL params → navigation state

---

## How to Prompt AI With This System

> "Read `core.md` then load `.agent/frontend-architect.md`. Scaffold a `billing` feature following `.templates/feature/feature-template.md`. Use react-router-dom v7, TanStack Query v5, zod v3, Radix + CVA components."

Each agent file is a complete prompt — the AI knows your stack, rules, and patterns instantly. See [ai-collaboration.md](./ai-collaboration.md).

---

## Quick Navigation

| Need                  | Open                                                           |
| --------------------- | -------------------------------------------------------------- |
| Start here            | `core.md`                                                      |
| AI prompts            | `ai-collaboration.md`                                          |
| Step-by-step init     | `.workflows/init.md`                                           |
| Create a feature      | `.workflows/feature-planning.md`                               |
| Add API integration   | `.workflows/api-integration.md`                                |
| State decision tree   | `.architecture/state-management.md`                            |
| Build a form          | `.templates/form/form-template.md`                             |
| Design the UI         | `.design/README.md` + `.design/design-taste-frontend/SKILL.md` |
| Full app example      | `.prompts/pos-app-restaurant.md`                               |
| Code review checklist | `.workflows/code-review.md`                                    |
| Performance rules     | `.rules/performance.md`                                        |
| Accessibility rules   | `.agent/accessibility-reviewer.md`                             |
| Scaling guide         | `.docs/scaling-guide.md`                                       |

---

## Project Status

Active, evolving. Built on React 19 + Vite 7 + Tailwind CSS v4.

### Design System

This project uses [Taste Skill](https://www.tasteskill.dev) — The Anti-Slop Frontend Framework for AI Agents by [Leon Lin](https://github.com/Leonxlnx) and [blueemi](https://github.com/blueemi99). 12 design skills are installed in `.design/` and loaded automatically by OpenCode.

### Roadmap

- [x] Core architecture (shared, features, pages, routes, layouts)
- [x] Radix UI primitives + CVA theming
- [x] TanStack Query v5 data layer
- [x] Zustand v5 state management
- [x] react-hook-form + zod validation
- [x] i18n with i18next / react-i18next
- [x] Theme support (next-themes)
- [x] Sonner toasts
- [x] Taste Skill design system integration (`.design/`)
- [ ] Automated architecture validation (ESLint plugins)
- [ ] Feature generation CLI
- [ ] Performance budget enforcement in CI
