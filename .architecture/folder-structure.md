# Folder Structure

## Vite + React SPA Layout

```
bnn-fe-officer/
├── .env                      # Base env (committed)
├── .env.local                # Local overrides (gitignored)
├── .env.development          # Dev overrides
├── .env.production           # Prod overrides
├── index.html                # Vite entry HTML
├── vite.config.ts            # Vite config (React plugin, aliases, Tailwind v4)
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx              # App bootstrap
    ├── App.tsx               # Providers + Router
    ├── index.css             # Tailwind v4 import + tw-animate-css
    ├── shared/               # Reusable platform (zero feature knowledge)
    │   ├── ui/
    │   │   ├── atoms/        # Radix primitives, CVA components
    │   │   ├── molecules/    # FormField, Card, DataTable
    │   │   └── sections/     # Cross-page section components (team-grid, stats-bar, etc.)
    │   ├── lib/              # Pure functions (date-fns, formatters)
    │   ├── api/              # Axios client, interceptors, TanStack Query v5 hooks
    │   ├── hooks/            # Generic React hooks
    │   ├── utils/            # cn(), cookie helpers (js-cookie), storage
    │   ├── types/            # ApiResponse<T>, PaginatedResult<T>, BaseEntity
    │   └── config/           # env.ts (zod validation), constants
    ├── features/             # Feature modules (FDD)
    │   ├── auth/             # Dashboard-style: complex domain, own api/hooks/schemas
    │   │   ├── api/          # Axios service + useQuery/useMutation hooks
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── types/
    │   │   ├── schemas/      # Zod schemas
    │   │   └── index.ts      # Public barrel
    │   ├── home/             # Site-style: feature = page, components/ holds all sections
    │   │   ├── components/
    │   │   │   ├── hero-section.tsx
    │   │   │   ├── stats-section.tsx
    │   │   │   └── ...
    │   │   ├── types/
    │   │   └── index.ts
    │   └── ...
    ├── pages/                # Route-level components (thin composers)
    ├── routes/               # createBrowserRouter definitions + guards
    ├── layouts/              # AppLayout, AuthLayout (Outlet pattern)
    ├── stores/               # Zustand v5 stores (cross-feature client state)
    ├── translations/         # i18next resources (en, id)
    └── styles/               # Global CSS extras
```

## Key Principles

1. **`shared/` is the platform** — code with zero knowledge of any feature. It is the "operating system."
2. **`features/` are silos** — each feature owns its components, hooks, types, etc. Features never import from other features.
3. **`pages/` compose features** — a page is a thin layer that assembles feature components into a route.
4. **Feature granularity depends on app type:**
   - **Dashboard / admin apps** (complex domain logic): each feature gets a full structure with `api/`, `hooks/`, `schemas/`, `types/`, `components/`. Single-component features are normal (e.g. `auth`, `users`).
   - **Marketing / brochure sites** (presentational): features map to pages. One feature per page (e.g. `home`, `contact`). Section components are children of `components/`. Avoid splitting single-section components into their own feature — that's overhead without benefit.
5. **Cross-page sections move to shared** — if a section component (e.g. `portfolio-section`, `stats-bar`) is used in 2+ pages, elevate it to `shared/ui/sections/`. Single-page sections stay in `features/<page>/components/`.
5. **No empty stubs** — scaffold tools may create empty `api/`, `hooks/`, `schemas/`, `types/` subdirectories per feature. Delete any that remain unused after implementation. Also remove empty global dirs like `assets/`, `stores/`, `translations/` if not needed. Every file and folder should earn its place.
6. **No `apps/` directory** — this is a single SPA. For multi-app scenarios, add at the monorepo level.

## Dependency Rules

| Layer | Can Import From | Cannot Import From |
|-------|----------------|-------------------|
| `shared/` | External libs, `@fontsource-variable/inter` | `features/`, `pages/` |
| `features/` | `shared/`, external libs | Sibling features, `pages/` |
| `pages/` | `features/`, `shared/`, `layouts/` | Other pages |
| `routes/` | `pages/`, `layouts/`, `shared/` | `features/` directly |
