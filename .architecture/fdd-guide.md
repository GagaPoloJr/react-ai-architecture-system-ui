# Feature-Driven Development Guide

## When to FDD (and when not to)

**FDD is ideal for:** dashboard-style apps with complex domain logic — each feature has its own data fetching, validation, state, and routing (e.g. `auth`, `users`, `invoices`, `reports`).

**FDD is overkill for:** marketing / brochure sites where a "feature" is just one section component with no API calls, no routing, and no state. In that case, map features to pages:

```
features/{page-name}/
├── components/         # All sections for that page
│   ├── hero-section.tsx
│   ├── stats-section.tsx
│   └── ...
├── types/              # Shared types for all sections in this page
└── index.ts            # Public barrel
```

If a section is shared across 2+ pages, move it to `shared/ui/sections/`.

## Feature Structure (Dashboard-style)

```
features/{feature-name}/
├── api/                   # Axios service functions + TanStack Query v5 hooks
│   ├── {entity}-api.ts    # Typed axios calls
│   ├── use-{entity}-query.ts    # useQuery with queryKey/queryFn object
│   ├── use-{entity}-mutation.ts # useMutation with onSuccess invalidation
│   └── index.ts
├── components/            # Feature-specific components (no React.FC)
│   ├── {Entity}List.tsx
│   ├── {Entity}Form.tsx   # RHF v7 + @hookform/resolvers/zod
│   └── index.ts
├── hooks/                 # Feature-specific hooks (camelCase)
│   ├── use-{entity}-filters.ts
│   └── index.ts
├── types/                 # Feature-specific types (z.infer preferred)
│   ├── {entity}.ts
│   └── index.ts
├── schemas/               # Zod v3 schemas (single source of truth)
│   ├── {entity}-schema.ts
│   └── index.ts
└── index.ts               # Public barrel — only export what pages may consume
```

## Naming Conventions

- **Directories**: kebab-case (`user-management`, `report-builder`)
- **Components**: PascalCase (`UserManagementPage`), no `React.FC`
- **Hooks/utilities**: camelCase (`useUserFilters`)
- **Schemas**: camelCase + `Schema` suffix (`userSchema`)
- **Files**: kebab-case matching the primary export

## Feature Lifecycle

### For dashboard / admin features (complex domain)

1. **Scaffold** — Create feature directory structure with full subdirs (api, components, hooks, types, schemas)
2. **Define types** — Start with zod schemas, derive types via `z.infer`
3. **Define schemas** — Zod v3 + `zod-i18n-map` for translated errors
4. **Implement API** — Axios service functions in `api/{entity}-api.ts`
5. **Create hooks** — TanStack Query v5 `useQuery`/`useMutation` with query key factory
6. **Build components** — Feature-specific compositions using `shared/ui` primitives
7. **Wire into pages** — Import feature barrel into a page component

### For brochure / marketing features (presentational)

1. **Create page-level feature** — e.g. `features/home/`
2. **Drop sections in `components/`** — Each section is a single component with its animations + JSX. No api/, hooks/, schemas/ directories unless actually needed.
3. **Keep types together** — One `types/index.ts` for the whole page feature.
4. **When a section is used in 2+ pages** — Elevate to `shared/ui/sections/`.

### Clean up
- Remove empty stub directories (api/, hooks/, schemas/) if unused.
- Tree-shaking handles dead code; delete source for clarity.

## Dependency Rules

```
┌─────────────────────────────────────────────────┐
│                   PAGES / ROUTES                  │
│  assembles features + layouts into routes         │
├────────────────┬────────────────┬────────────────┤
│   Feature A    │   Feature B    │   Feature C    │
│  (no cross-   │  (no cross-    │  (no cross-   │
│   imports)    │   imports)     │   imports)    │
├────────────────┴────────────────┴────────────────┤
│                   SHARED LAYER                    │
│  ui (Radix+CVA), lib, api (axios), hooks, types  │
├──────────────────────────────────────────────────┤
│               EXTERNAL LIBRARIES                  │
│  react 19, react-router-dom v7, @tanstack/react-query v5, │
│  zustand v5, react-hook-form v7, zod v3, axios v1 │
└──────────────────────────────────────────────────┘
```

## Feature Communication

Features communicate through **shared zustand v5 stores** (with devtools + persist middleware), **URL state** (`useSearchParams` from react-router-dom v7), or **react-router params** (`useParams`). Never import a component or hook from another feature.

Acceptable patterns:
- **Store-based** — Feature A writes to a zustand v5 store; Feature B reads from it via the same store.
- **URL-based** — Feature A pushes search params; Feature B reads them via `useSearchParams`.
- **Slot-based** — Parent page passes React children from Feature A into Feature B.

## Feature Boundaries

- A feature owns its **data fetching** (TanStack Query v5), **validation** (zod v3), **types** (`z.infer`), and **UI components**.
- For brochure sites: a feature may have no api/ or hooks/ directories at all — sections are pure presentational components. That's correct. Don't add directories you don't need.
- A feature's `index.ts` is the public API contract — only export what is safe for pages to consume.
- Private components (internal to the feature) are NOT re-exported.
- Feature-level lazy loading: `const DashboardFeature = lazy(() => import('@features/dashboard'))`.
