# Getting Started

This guide gets you from zero to running a new feature in **5 minutes**. You'll learn the project structure, create a feature, add a page, and wire up an API.

## Prerequisites

- Node.js 20+
- npm or yarn
- Familiarity with React 19, TypeScript, Tailwind CSS v4, and TanStack Query v5

## Quick Start (Greenfield Project)

If you're starting a **brand new project**, the fastest path is the bootstrap script:

```bash
# Clone this architecture repo
git clone <this-repo-url> my-project-arch
cd my-project-arch

# Bootstrap creates a fresh Vite project with everything wired up
./.scaffolds/bootstrap.sh my-app
cd my-app
npm run dev
```

Open `http://localhost:5173`. You'll see a welcome page with the full stack ready (React 19, Vite 7, TanStack Query, zustand, react-router-dom, Tailwind v4, Radix, sonner, i18next, etc.).

## Manual Setup (Existing Project)

If you already have a project and want to adopt the architecture:

```bash
# Copy the architecture system into your project
cp -r .agent/ .architecture/ .rules/ .templates/ .workflows/ .docs/ core.md /path/to/your-project/
# Then install the matching stack (see .workflows/init.md)
```

## Project Structure

## 2. Understand the Structure In 30 Seconds

```
src/
├── shared/          # Reusable platform: UI primitives, lib, api client, hooks
├── features/        # Feature modules — each is self-contained
├── pages/           # Route-level page components (thin composition layer)
├── routes/          # Route definitions, guards, lazy loading
├── layouts/         # App layout shells (AuthLayout, MainLayout)
├── stores/          # Zustand stores for cross-feature client state
├── configs/         # HTTP client setup, navigation config
├── translations/    # i18n resources
├── middleware/      # Route guards, interceptors
├── types/           # Domain-agnostic shared types
├── models/          # Domain entity models
├── lib/             # Error handling, query client setup
└── hooks/           # Global shared hooks
```

Key rule: `shared/` knows nothing about `features/`. Features never import from other features. Pages compose features.

## 3. Create Your First Feature

```bash
yarn scaffold:feature user-management
```

Or create it manually:

```
src/features/user-management/
├── api/
│   ├── user-api.ts
│   └── index.ts
├── components/
│   ├── UserList.tsx
│   └── index.ts
├── hooks/
│   ├── use-users.ts
│   └── index.ts
├── types/
│   ├── user.ts
│   └── index.ts
├── schemas/
│   ├── user-schema.ts
│   └── index.ts
└── index.ts          # Public barrel — only export what pages may use
```

## 4. Add a Page

Create a page that uses your feature:

```tsx
// src/pages/user-management-page.tsx
import { UserList } from '@features/user-management'
import { PageHeader } from '@shared/ui/organisms'

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="User Management" />
      <UserList />
    </div>
  )
}
```

Register it in the router:

```tsx
// src/routes/modules/user-management-routes.tsx
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const UserManagementPage = lazy(() => import('@pages/user-management-page'))

export const userManagementRoutes: RouteObject[] = [
  {
    path: '/users',
    element: <UserManagementPage />,
  },
]
```

## 5. Add API Integration

First, set your API URL in `.env.local`:

```
VITE_API_URL=https://api.example.com/v1
```

Then create typed API calls and hooks:

```ts
// src/features/user-management/api/user-api.ts
import { client } from '@configs/http/client'
import type { User } from '../types/user'

export const userApi = {
  list: (params?: Record<string, unknown>) =>
    client.get('/users', { params }).then((r) => r.data),
  detail: (id: string) =>
    client.get(`/users/${id}`).then((r) => r.data),
}
```

```ts
// src/features/user-management/hooks/use-users.ts
import { useQuery } from '@tanstack/react-query'
import { userApi } from '../api/user-api'

const queryKeys = {
  all: ['users'] as const,
  list: (params?: Record<string, unknown>) => ['users', 'list', params] as const,
}

export function useUsers(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.list(params),
    queryFn: () => userApi.list(params),
    placeholderData: (prev) => prev,
  })
}
```

## 6. Quick Reference: Common Patterns

| Task | Pattern |
|------|---------|
| Data fetching | `useQuery` in `features/<name>/hooks/` |
| Data mutation | `useMutation` + query invalidation |
| Form | `react-hook-form` + zod schema in `features/<name>/schemas/` |
| Client state | Zustand store in `src/stores/` |
| URL state | `useSearchParams` from react-router-dom |
| Shared UI | Import from `@shared/ui` (atoms, molecules, organisms) |
| Navigation | `useNavigate` or `<Link>` — route constants in `src/routes/` |
| Theme | `useTheme` from `next-themes` |
| Toast | `toast` from `sonner` |
| Icons | `lucide-react` |
| Table | `@tanstack/react-table` |
| SEO | `Helmet` from `react-helmet-async` |
| Design quality | Load `.design/design-taste-frontend/SKILL.md` — anti-slop rules, 3 dials |

## 7. Next Steps

- Read `conventions.md` for complete naming, import, and export rules
- Read `architecture-summary.md` for the one-page overview
- Read `ai-collaboration.md` to use AI agents with this architecture
- Explore `.agent/` files for role-specific AI assistance

## Common Commands

```bash
yarn dev          # Start dev server
yarn build        # TypeScript check + production build
yarn lint         # ESLint check
yarn format       # Prettier format
yarn preview      # Preview production build
```
