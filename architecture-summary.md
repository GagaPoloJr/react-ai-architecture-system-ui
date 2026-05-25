# Architecture Summary

One-page overview of the entire frontend architecture — layers, principles, patterns, and conventions.

---

## Core Layers

```
┌─────────────────────────────────────────────────────────┐
│  L6: Features    features/{name}/ — Self-contained      │
│  L5: Pages       pages/ — Route-level composition        │
│  L4: Layouts     layouts/ — App shells                   │
│  L3: Organisms   shared/ui/organisms/ — Complex UIs      │
│  L2: Molecules   shared/ui/molecules/ — Reusable UIs     │
│  L1: Atoms       shared/ui/atoms/ — Primitives (Radix)   │
│  L0: Tokens      styles/ — Design tokens (CSS vars)      │
└─────────────────────────────────────────────────────────┘
```

**Dependency rule:** A layer N component may only import from ≤ layer N.

---

## Directory Structure

```
src/
├── shared/           # Reusable platform (no feature awareness)
│   ├── ui/{atoms,molecules,organisms}/
│   ├── lib/date,format,math/      # Pure functions
│   ├── api/client.ts,query.ts     # Axios client + base hooks
│   ├── hooks/                     # Generic hooks
│   ├── utils/cn,storage           # cn() via tailwind-merge + clsx
│   ├── types/api,common           # Domain-agnostic types
│   └── config/env,constants       # App-wide config
├── features/{name}/
│   ├── api/          # Axios service functions + query keys
│   ├── components/   # Feature-specific components
│   ├── hooks/        # TanStack Query v5 hooks
│   ├── types/        # Feature-specific types
│   ├── schemas/      # Zod v3 validation schemas
│   └── index.ts      # Public barrel
├── pages/            # Route-level page components
├── routes/           # Route definitions + guards (react-router-dom v7)
├── layouts/          # App layout shells
├── stores/           # Zustand v5 cross-feature state
├── translations/     # i18next resources
├── middleware/       # Route guards, interceptors
├── configs/          # Axios client setup, navigation
├── types/            # Shared domain types
├── models/           # Domain entity models
├── lib/              # Error handling, TanStack Query client
├── hooks/            # Global shared hooks
└── providers/        # ThemeProvider, HelmetProvider, QueryClientProvider, Toaster
```

---

## Dependency Rules

| Layer | Can Import From | Cannot Import From |
|-------|----------------|-------------------|
| shared/ | External libs, styles/, types/ | Any features/, pages/, layouts/ |
| features/ | shared/, external libs | Sibling features, pages/, layouts/ |
| pages/ | features/, shared/, layouts/ | Other pages |
| layouts/ | shared/, external libs | features/, pages/ |

---

## State Management

| Category | Tool | Where |
|----------|------|-------|
| Server state | TanStack Query v5 | features/{name}/hooks/ |
| URL state | useSearchParams / useParams (react-router-dom v7) | In component |
| Form state | react-hook-form v7 + zod v3 | features/{name}/schemas/ |
| Client state | Zustand v5 | src/stores/ |
| Local state | useState / useReducer | In component |
| Persisted state | Zustand v5 + persist | src/stores/ |
| Theme | next-themes v0.4 (ThemeProvider, useTheme) | src/providers/ |

**Decision flow:** Server? → TanStack Query. URL? → useSearchParams. Form? → RHF. Shared 2+? → Zustand. Else → useState.

---

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Components | PascalCase | `UserProfile.tsx`, `OrderTable.tsx` |
| Hooks | camelCase, use- | `use-auth.ts`, `use-pagination.ts` |
| Utils | camelCase, verb-first | `format-date.ts`, `calculate-total.ts` |
| Files (most) | kebab-case | `user-profile-api.ts`, `use-auth.ts` |
| Directories | kebab-case | `user-management/` |
| Types/Interfaces | PascalCase, interface preferred | `interface UserProps` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Store files | kebab-case | `auth-store.ts` |
| Route modules | kebab-case | `user-management-routes.tsx` |

---

## Import Order

```
1. Node built-ins
2. External packages (react, zustand, @tanstack/react-query)
3. @/shared/* imports
4. @/features/* imports
5. Relative imports
6. CSS/styles
```

Blank line between groups. Alphabetical within groups. `import type` for type-only imports.

---

## Export Patterns

- **Barrel exports** (index.ts) are the public API contract
- Internal modules are NOT re-exported
- Components: default export + named interface, no `React.FC`
- Hooks/utils: named exports only
- Types: `export type`, never `export default`

---

## Key Principles

1. **Feature isolation** — features never import from other features
2. **Co-location** — keep related code together (types, tests near source)
3. **Convention over configuration** — predictable patterns reduce decisions
4. **Explicit public API** — barrel exports are contracts
5. **Composition over configuration** — children/slots over giant config props
6. **Schema-first** — zod schemas as single source of truth for data shapes
7. **AI-ready** — all docs structured for both human and AI consumption
8. **kebab-case** — all file and directory names are kebab-case (except component files)

---

## Bundle Budgets

| Asset | Limit |
|-------|-------|
| Initial JS (gzipped) | <= 200 KB |
| Single page chunk (gzipped) | <= 100 KB |
| LCP | <= 2.5s |
| CLS | <= 0.1 |
| INP | <= 200ms |

---

## WCAG 2.1 AA Targets

| Requirement | Standard |
|-------------|----------|
| Color contrast (text) | 4.5:1 |
| Color contrast (large text) | 3:1 |
| Touch targets | >= 44x44px |
| Keyboard | Full operation |
| Focus indicator | >= 2:1 contrast |

---

## Toolchain

| Tool | Version | Purpose |
|------|---------|---------|
| React + react-dom | 19 | UI framework |
| TypeScript | 5.9 | Type safety (strict, verbatimModuleSyntax) |
| Vite | 7 | Bundler + dev server |
| @vitejs/plugin-react | 5 | React fast refresh |
| @tailwindcss/vite | 4 | Tailwind CSS (NO PostCSS config) |
| Tailwind CSS | 4 | Utility-first styling |
| ESLint | 9 | Flat config, strict type-checked |
| Prettier + prettier-plugin-tailwindcss | latest | Code formatting |
| Husky + lint-staged | 9 / latest | Pre-commit hooks |

---

## Key Libraries

| Library | Purpose |
|---------|---------|
| @tanstack/react-query v5 + devtools | Server state, caching |
| zustand v5 | Client state (devtools, persist) |
| react-hook-form v7 + @hookform/resolvers/zod | Form management |
| zod v3 + zod-i18n-map | Schema validation |
| react-router-dom v7 | SPA routing (createBrowserRouter) |
| axios v1 | HTTP client |
| @radix-ui/* | Accessible UI primitives |
| class-variance-authority | Component variants |
| tailwind-merge + clsx | Class merging (cn()) |
| lucide-react | Icons |
| sonner v2 | Toast notifications |
| i18next v24 + react-i18next v15 | Internationalization |
| next-themes v0.4 | Theme management |
| react-helmet-async v2 | SEO / head management |
| @tanstack/react-table v8 | Data tables |
| date-fns v4 | Date utilities |
| js-cookie v3 | Cookie management |
| input-otp | OTP input |
| @fontsource-variable/inter | Variable font |
| tw-animate-css v1 | Tailwind CSS animations |

---

## AI Agents

| Agent | File |
|-------|------|
| Frontend Architect | `.agent/frontend-architect.md` |
| Feature Generator | `.agent/feature-generator.md` |
| UI Engineer | `.agent/ui-engineer.md` |
| API Integrator | `.agent/api-integrator.md` |
| State Manager | `.agent/state-manager.md` |
| Form Engineer | `.agent/form-engineer.md` |
| Performance Reviewer | `.agent/performance-reviewer.md` |
| Accessibility Reviewer | `.agent/accessibility-reviewer.md` |
| Refactor Engineer | `.agent/refactor-engineer.md` |
| Animation Engineer | `.agent/animation-engineer.md` |

---

## Quick Reference: Common Commands

```bash
yarn dev              # Start dev server
yarn build            # TypeScript check + build
yarn lint             # ESLint
yarn format           # Prettier
yarn preview          # Preview production build
```

## Quick Reference: Common Patterns

| Need | Pattern |
|------|---------|
| Data fetching | `useQuery` in features/{name}/hooks/ |
| Data mutation | `useMutation` + query invalidation |
| Form | `react-hook-form` + zod schema |
| Client state | Zustand v5 store in src/stores/ |
| URL state | `useSearchParams` from react-router-dom |
| Shared UI | Import from @shared/ui/{layer} |
| Navigation | `useNavigate` or `<Link>` from react-router-dom |
| API calls | Through features/{name}/api/ via axios |
| Validation | Zod v3 schemas in features/{name}/schemas/ |
| Toast | `toast` from sonner |
| Theme | `useTheme` from next-themes |
| Icons | lucide-react |
| Table | @tanstack/react-table v8 |
| SEO | Helmet from react-helmet-async |
