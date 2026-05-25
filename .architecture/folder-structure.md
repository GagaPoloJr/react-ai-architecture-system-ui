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
    │   ├── ui/               # Radix primitives, CVA components, cn()
    │   ├── lib/              # Pure functions (date-fns, formatters)
    │   ├── api/              # Axios client, interceptors, TanStack Query v5 hooks
    │   ├── hooks/            # Generic React hooks
    │   ├── utils/            # cn(), cookie helpers (js-cookie), storage
    │   ├── types/            # ApiResponse<T>, PaginatedResult<T>, BaseEntity
    │   └── config/           # env.ts (zod validation), constants
    ├── features/             # Feature modules (FDD)
    │   ├── auth/
    │   │   ├── api/          # Axios service + useQuery/useMutation hooks
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── types/
    │   │   ├── schemas/      # Zod schemas
    │   │   └── index.ts      # Public barrel
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
2. **`features/` are silos** — each feature owns its API calls, components, hooks, types, and zod schemas. Features never import from other features.
3. **`pages/` compose features** — a page is a thin layer that assembles feature components into a route.
4. **No `apps/` directory** — this is a single SPA. For multi-app scenarios, add at the monorepo level.

## Dependency Rules

| Layer | Can Import From | Cannot Import From |
|-------|----------------|-------------------|
| `shared/` | External libs, `@fontsource-variable/inter` | `features/`, `pages/` |
| `features/` | `shared/`, external libs | Sibling features, `pages/` |
| `pages/` | `features/`, `shared/`, `layouts/` | Other pages |
| `routes/` | `pages/`, `layouts/`, `shared/` | `features/` directly |
