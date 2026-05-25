# Core Architecture Reference

> Central entry point for the frontend engineering operating system.
> This document wraps all architectural concerns into a single reference.

## Stack Overview

| Layer         | Choice                                   | Purpose                                |
| ------------- | ---------------------------------------- | -------------------------------------- |
| Framework     | React 19 + TypeScript 5.9                | Component model, type safety           |
| Bundler       | Vite 7                                   | Dev server, build, HMR                 |
| Routing       | react-router-dom v7                      | SPA routing, URL params, navigation    |
| Server State  | @tanstack/react-query v5                 | Data fetching, caching, mutations      |
| Client State  | zustand v5                               | Shared UI state, cross-feature state   |
| Form State    | react-hook-form v7 + @hookform/resolvers | Form management, validation binding    |
| Validation    | zod v3 + zod-i18n-map                    | Schema-first validation, i18n errors   |
| Styling       | Tailwind CSS v4 + @tailwindcss/vite      | Utility-first CSS, JIT compilation     |
| UI Primitives | @radix-ui/\* + class-variance-authority  | Accessible headless components         |
| Icons         | lucide-react                             | Consistent icon system                 |
| HTTP          | axios                                    | API client, interceptors, auth headers |
| i18n          | i18next + react-i18next                  | Translation, locale switching          |
| Tables        | @tanstack/react-table                    | Data tables, sorting, filtering        |
| Toasts        | sonner                                   | User notifications                     |
| Theme         | next-themes                              | Dark/light mode                        |
| Head          | react-helmet-async                       | Meta tags, title management            |
| Date          | date-fns                                 | Date formatting, manipulation          |
| Animation     | tw-animate-css + CSS                     | Entry/exit/layout animations           |
| Cookie        | js-cookie                                | Client-side cookie management          |
| ML (opt-in)   | @tensorflow/tfjs + blazeface             | Face detection                         |
| OTP (opt-in)  | input-otp                                | One-time password input                |
| Font          | @fontsource-variable/inter               | Variable font                          |

## Architecture Map

```
.agent/                   AI agent definitions (10 roles)
├── frontend-architect    System ownership, structural decisions
├── feature-generator     Feature scaffolding, isolation
├── ui-engineer           Component design, Radix + CVA patterns
├── animation-engineer    Motion, transitions, reduced motion
├── api-integrator        Axios + TanStack Query integration
├── form-engineer         RHF + zod form architecture
├── state-manager         zustand + query state decisions
├── refactor-engineer     Extraction, deduplication, migration
├── performance-reviewer  Bundle, render, Core Web Vitals
└── accessibility-reviewer WCAG 2.1 AA compliance

.architecture/            Architecture documentation (15 files)
├── folder-structure      Monorepo + FDD layout philosophy
├── fdd-guide             Feature Driven Development rules
├── shared-layer          What goes in shared/ and why
├── ui-hierarchy          7-layer component system
├── api-layer             Axios client, query keys, hooks
├── state-management      State categories + decision tree
├── validation            Zod schema-first validation
├── form-architecture     RHF + zod form system
├── routing               react-router-dom structure
├── utilities             cn(), date-fns wrappers, etc.
├── animations            CSS animation system
├── imports-aliases       @/ @shared/ @features/ mapping
├── environments          VITE_ env vars + validation
├── types                 Shared + feature type organization
└── error-handling        Error boundaries, API errors, toasts

.rules/                   Engineering rulesets (5 files)
├── scalability           Feature isolation, module boundaries
├── performance           Memo, code split, lazy load rules
├── reusability           3+ use extraction rule
├── feature-isolation     No cross-feature imports
└── developer-experience  Naming, conventions, PR standards

.templates/               Reusable code templates (8 files)
├── feature               Feature module scaffold
├── component             Shared/feature component
├── hook                  Custom hook with return object
├── api                   Service + query + mutation
├── form                  RHF + zod form
├── state                 Zustand store
├── page                  Route page with data fetching
└── module                Shared package

.workflows/               Engineering workflows (8 files)
├── init                  Project bootstrap
├── feature-planning      Before you code
├── scaffolding           Directory + stub creation
├── shared-extraction     Feature → shared promotion
├── api-integration       End-to-end API integration
├── state-decision-tree   Where does state go?
├── code-review           PR review checklists
└── release-readiness     Pre-release gates

.design/                  Design system — Taste Skill (12 skills)
├── design-taste-frontend Core — premium UI with 3 dials
├── gpt-taste             Stricter rules for GPT/Codex
├── image-to-code         Image-first pipeline
├── redesign-existing-projects  Audit + fix existing UIs
├── high-end-visual-design      Soft, calm, expensive UI
├── minimalist-ui         Editorial product UI
├── industrial-brutalist-ui     Swiss typography, raw structure
├── full-output-enforcement     No placeholder code
├── stitch-design-taste   Google Stitch-compatible rules
├── imagegen-frontend-web      Website reference images
├── imagegen-frontend-mobile   Mobile screen reference images
└── brandkit              Brand identity board images

.scaffolds/               Executable scaffold scripts (3 files)
├── feature-scaffold      Creates feature directory tree
├── component-scaffold    Creates component with types
└── hook-scaffold         Creates hook with barrel export

.prompts/                 Ready-to-use AI prompts
├── pos-app-restaurant    POS Restaurant app — full example

.docs/                    Developer documentation (4 files)
├── getting-started       5-minute quick start
├── conventions           Complete naming + patterns reference
├── ai-workflows          AI collaboration guide + prompts
└── scaling-guide         Team + codebase growth strategy

Root files:
├── implementation-plan.md   17-section implementation plan
├── opencode.json            Skills path → .design/
├── ai-collaboration.md      AI agent usage + prompt templates
├── architecture-summary.md  One-page quick reference
├── core.md                  THIS FILE — central reference
└── README.md                Project README
```

## Quick Navigation

| What you need                   | Go to                                                    |
| ------------------------------- | -------------------------------------------------------- |
| Understanding the folder layout | `.architecture/folder-structure.md`                      |
| Creating a new feature          | `.workflows/feature-planning.md` + `feature-scaffold.sh` |
| Adding API integration          | `.workflows/api-integration.md`                          |
| Deciding where state goes       | `.architecture/state-management.md`                      |
| Building a form | `.templates/form/form-template.md` |
| Designing the UI | `.design/README.md` + `.design/design-taste-frontend/SKILL.md` |
| Full app example | `.prompts/pos-app-restaurant.md` |
| Creating a component            | `.templates/component/component-template.md`             |
| Setting up a zustand store      | `.templates/state/state-template.md`                     |
| Getting AI assistance           | `ai-collaboration.md` + `.agent/*`                       |
| Code review checklist           | `.workflows/code-review.md`                              |
| Performance rules | `.rules/performance.md` |
| Design quality | `.design/README.md` + `.design/design-taste-frontend/SKILL.md` |
| Scaling strategy                | `.docs/scaling-guide.md`                                 |

## Engineering Philosophy

1. **Feature isolation first** — features never import from features
2. **Shared extraction on demand** — 3+ uses triggers shared promotion
3. **State has one home** — server/URL/form/client, never mix
4. **Composition over configuration** — build small, compose
5. **Validation at the boundary** — zod schemas at API boundaries
6. **Accessibility is default** — Radix primitives, ARIA, keyboard
7. **Performance by convention** — code-split per route, memo when proven
8. **AI-native workflows** — agents scaffold, review, refactor, optimize
9. **Convention over configuration** — predictable patterns reduce decisions
10. **Types from the edge** — zod infers types, types flow inward

## Dependency Direction

```
pages/ → layouts/ → features/ → shared/ → external packages
                                          (react, tanstack-query,
                                           zustand, radix, etc.)
```

Features communicate via:

- **Shared zustand stores** (cross-feature UI state)
- **URL state** (react-router search params)
- **Custom events** (pub/sub for decoupled communication)

Never: feature → feature.
