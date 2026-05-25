# Conventions Reference

Complete guide to naming, file organization, imports, exports, and structural conventions.

## 1. Naming Conventions

### Files

| Entity | Convention | Example |
|--------|-----------|---------|
| Component files | `PascalCase.tsx` | `UserProfile.tsx` |
| Hook files | `kebab-case.ts` | `use-auth.ts` |
| Utility files | `kebab-case.ts` | `format-date.ts` |
| Type files | `kebab-case.ts` | `user-types.ts` |
| API module files | `kebab-case.ts` | `user-api.ts` |
| Schema files | `kebab-case.ts` | `user-schema.ts` |
| Store files | `kebab-case.ts` | `auth-store.ts` |
| Directory names | `kebab-case` | `user-management/` |
| Constants | `UPPER_SNAKE_CASE` | `DEFAULT_PAGE_SIZE` |
| CSS files | `kebab-case.css` | `globals.css` |

### Components

- **PascalCase**, noun-based: `UserProfile`, `OrderTable`, `DatePicker`
- File name matches the component name: `UserProfile.tsx` exports `UserProfile`
- One component per file. No exceptions.
- Props interface: `{ComponentName}Props` (use `interface`, not `type`)
- Event handlers: `on{Event}` pattern — `onClick`, `onChange`, `onSubmit`
- Boolean variant props use a `variant` string, not `is*` flags — `variant="primary"` not `isPrimary`
- No `React.FC` — always `function Component() { ... }`

### Hooks

- **camelCase**, `use` prefix: `useAuth`, `usePagination`, `useDebouncedValue`
- File name in kebab-case: `use-auth.ts`, `use-debounced-value.ts`
- Parameters: single options object when > 2 params
- Return: named object, never array — `{ data, loading, error }` not `[data, loading, error]`
- Pure with respect to inputs — same args, same outputs in same context

### TanStack Query Hooks

- Query hooks: `use{Entity}` or `use{Entity}List` — `useUsers`, `useOrderDetail`
- Mutation hooks: `useCreate{Entity}`, `useUpdate{Entity}`, `useDelete{Entity}`
- Hook files co-located in `features/{name}/hooks/use-{entity}-query.ts` or `use-{entity}-mutation.ts`
- Query key factory object: `{entity}Keys` — `userKeys.all`, `userKeys.list(params)`, `userKeys.detail(id)`
- Use `staleTime` and `gcTime` (not `cacheTime`) per data frequency

### Zustand Stores

- Store files: `{name}-store.ts` — `auth-store.ts`, `theme-store.ts`
- Export the store and its type: `export const useAuthStore` + `export interface AuthState`
- Use zustand v5 `create` with `devtools` and `persist` middleware via `httpAdapter`:
  ```ts
  import { create } from 'zustand'
  import { devtools, persist } from 'zustand/middleware'
  ```
- Store interface: `{Name}State` — `interface AuthState { user: User | null; token: string | null }`
- Actions prefixed with domain: `login`, `logout`, `setTheme`

### CVA Variants

- Variant names use kebab-case for multi-word: `variant="destructive"`, `size="sm"`
- Compound variants defined in the `cva` call, not as separate Booleans
- Default variant always defined: `defaultVariants: { variant: "default", size: "md" }`

### i18n Keys

- Namespace prefix: `common:`, `errors:`, `features:{feature-name}:`
- Dot-separated path: `features:users.list.title`, `common:actions.save`
- Parameterized keys: `errors:networkTimeout`, `features:users.detail.title`
- Translation files in `src/translations/{locale}/` — `src/translations/en/`

### Utilities

- **camelCase**, verb-first: `formatDate`, `calculateTotal`, `filterByStatus`
- Named exports only — no `export default`
- Pure functions prefer `shared/lib/` over `shared/utils/`
- Side-effectful operations must be explicit in name: `saveToStorage`, `navigateTo`
- `cn()` from `tailwind-merge` + `clsx` for class merging

### Types & Interfaces

- **PascalCase**
- `interface` for object shapes (better error messages): `interface User { ... }`
- `type` for unions, intersections, mapped/utility types: `type Status = 'active' | 'inactive'`
- API request/response types co-located in `features/{name}/api/`
- Component prop types co-located in the component file
- Schema-inferred types via `z.infer<typeof schema>` — never manually duplicate

### API Modules

- Service functions in `features/{name}/api/{entity}-api.ts`
- Query hooks in `features/{name}/hooks/use-{entity}-query.ts`
- Mutation hooks in `features/{name}/hooks/use-{entity}-mutation.ts`
- Query key factory: `const {entity}Keys = { all: [...], list: [...], detail: [...] }`
- Service functions named after domain action: `getUserProfile`, `submitOrder`, `cancelSubscription`
- Axios client from `@configs/http/client`

### Routes

- Route constants: `UPPER_SNAKE_CASE` in route path strings, camelCase for objects
- Route modules in `routes/modules/{domain}-routes.tsx`
- Route guards in `routes/guards/`
- File exports: named arrays of `RouteObject`
- Use `createBrowserRouter` from react-router-dom v7

## 2. Import Ordering

Imports are grouped and sorted in this exact order (blank line between groups, alphabetical within):

```
1. Node built-ins (fs, path)
2. External packages (react, zustand, @tanstack/react-query)
3. @/shared/* imports
4. @/features/* imports (current feature only)
5. @/pages/*, @/layouts/*, @/routes/* imports
6. Relative imports (./, ../)
7. CSS/style imports
```

```ts
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@shared/ui/atoms/button'
import { useUsers } from '@features/users/hooks/use-users'
import type { User } from '@features/users/types/user'
import { ROUTES } from '@routes/route-constants'
import { cn } from '../utils/cn'
import './users-page.css'
```

- Use `import type` for type-only imports (enables `verbatimModuleSyntax`)
- Deep imports preferred for tree-shaking: `@shared/lib/date/format-date` not `@shared`
- No relative imports that exit the feature boundary (`../../other-feature/`)

## 3. Export Patterns

### Barrel Exports

Each directory has an `index.ts` barrel that defines the public API:

```ts
// features/users/index.ts
export { useUsers, useCreateUser } from './hooks'
export type { User, CreateUserDto } from './types'
```

- Barrel exports are the **contract** — only export what consumers may use
- Internal modules are NOT re-exported
- `export * from './module'` for stable exports (use sparingly)
- `export { Thing } from './thing'` for controlled surface area (preferred)

### Component Exports

- Default export for the main component: `export default function Button`
- Named exports for sub-components and types: `export interface ButtonProps`
- Barrel re-exports the default as named: `export { default as Button } from './Button'`

### Hook & Utility Exports

- Named exports only: `export function useDebounce`
- Barrel re-exports: `export { useDebounce } from './use-debounce'`

### Type Exports

- Named exports only: `export type { User } from './user'`
- Always use `export type` for isolatedModules compatibility

## 4. Directory Conventions

### Feature Structure

```
features/{feature-name}/
├── api/              # Service functions + query/mutation hooks (if small)
├── components/       # Feature-specific components
├── hooks/            # Feature-specific hooks
├── types/            # Feature-specific types
├── schemas/          # Zod schemas (validation)
└── index.ts          # Public barrel
```

- No nested subdirectories beyond 1 level deep inside api/, components/, hooks/, types/
- Feature directories are kebab-case: `user-management`, `report-builder`
- Max 500 lines per file — split early

### Shared Structure

```
shared/
├── ui/
│   ├── atoms/        # Button, Input, Text, Icon
│   ├── molecules/    # FormField, Card, DataTable
│   ├── organisms/    # Header, Sidebar, DataList
│   └── index.ts
├── lib/              # Pure functions (zero React deps)
│   ├── date/
│   ├── format/
│   ├── math/
│   └── index.ts
├── api/              # HTTP client, base hooks
│   ├── client.ts
│   ├── query.ts
│   └── index.ts
├── hooks/            # Generic React hooks
│   ├── use-debounce.ts
│   └── index.ts
├── utils/            # React-adjacent utilities
│   ├── cn.ts
│   └── index.ts
├── types/            # Domain-agnostic types
│   ├── api.ts
│   ├── common.ts
│   └── index.ts
└── config/           # App-wide config
    ├── env.ts
    └── index.ts
```

## 5. State Conventions

| State Category | Tool | Location |
|---------------|------|----------|
| Server state (API data) | TanStack Query v5 | `features/{name}/hooks/` |
| URL state (params, search params) | `useSearchParams`, `useParams` | In component or custom hook |
| Form state | react-hook-form v7 + zod v3 | `features/{name}/schemas/` |
| Cross-feature client state | Zustand v5 | `src/stores/` |
| Local UI state | `useState` / `useReducer` | In component |
| Persisted state | Zustand + persist middleware | `src/stores/` |
| Theme | `next-themes` (ThemeProvider, useTheme) | `src/providers/` |

Decision flow:

```
Is it server data? → TanStack Query
Is it URL-related? → useSearchParams / useParams
Is it form input? → react-hook-form + zod
Is it shared across 2+ unrelated components? → Zustand
Otherwise → useState / useReducer
```

## 6. Error Conventions

### Error Boundary Hierarchy

```
RootErrorBoundary → RouteErrorBoundary → PageErrorBoundary → FeatureErrorBoundary
```

### API Error Handling

- All errors normalized to `AppError` shape via axios interceptor
- Query hooks: catch errors in component with `<ErrorState error={error} onRetry={refetch} />`
- Mutation hooks: `onError` handler shows toast (sonner) or maps to form fields
- Form errors: Zod validation (field-level) + API errors (toast/banner)

### Error Messages

- User-facing messages go through i18n: `t('errors:networkTimeout')`
- Specific and actionable: "Could not save. Please try again."
- No technical jargon: never "500 Internal Server Error" to users

## 7. Component Hierarchy (7 Layers)

| Layer | Name | Location | Description |
|-------|------|----------|-------------|
| 0 | Design Tokens | `styles/` | Colors, spacing, typography (CSS vars) + Tailwind v4 |
| 1 | Atoms (Primitives) | `shared/ui/atoms/` | Button, Input, Text, Icon |
| 2 | Molecules | `shared/ui/molecules/` | FormField, Card, DataTable |
| 3 | Organisms | `shared/ui/organisms/` | Header, Sidebar, DataList |
| 4 | Layouts | `src/layouts/` | AppLayout, AuthLayout |
| 5 | Pages | `src/pages/` | Route-level composition |
| 6 | Features | `features/{name}/` | Feature-specific compositions |

Dependencies flow **downward**. A Layer N component may only import from ≤ Layer N.

## 8. Dependency Rules

| Layer | Can Import From | Cannot Import From |
|-------|----------------|-------------------|
| `shared/` | External libs, `styles/`, `types/` | Any `features/`, `pages/`, `layouts/` |
| `features/` | `shared/`, external libs | Sibling features, `pages/`, `layouts/` |
| `pages/` | `features/`, `shared/`, `layouts/` | Other pages |
| `layouts/` | `shared/`, external libs | `features/`, `pages/` |

## 9. Testing Conventions

- Co-located tests: `features/x/hooks/__tests__/use-foo.test.ts`
- Coverage target: > 80% on business logic (hooks, utilities, API modules)
- Use MSW for API mocking in tests
- No snapshot tests — prefer assertion-based tests

## 10. Commit Conventions

```
type(scope): description

feat(users): add bulk user export
fix(auth): correct token refresh race condition
chore(deps): upgrade react-query to v5
```

Types: `feat`, `fix`, `chore`, `refactor`, `perf`, `docs`, `test`, `style`, `ci`
Scope: feature name or shared module.
Body explains **why**, not what. Link to issue: `Closes PROJ-123`.
