# Prompt Template: Project Scaffold & Feature Generation

> Copy-paste this entire prompt to your AI agent (Claude Code, Gemini CLI, Cursor, opencode).
> The AI will read `core.md` + all referenced files for full context.
>
> **To adapt for your own project**: Replace the "Project" section with your project's name and features.
> Keep the file references, setup steps, standards, and structure — they are project-agnostic.

---

## How to Use This Template

1. Replace the **Project** section below with your app name and feature list
2. Adjust the **Feature Definitions** to match your domain
3. Keep everything else — it references the architecture docs that ship with this project
4. Delete or add agent/architecture files as needed in the context list below

---

Read `core.md`. Then load all these files for context:

### Agents
- `.agent/frontend-architect.md`
- `.agent/feature-generator.md`
- `.agent/ui-engineer.md`
- `.agent/api-integrator.md`
- `.agent/form-engineer.md`
- `.agent/state-manager.md`
- `.agent/animation-engineer.md`

### Architecture
- `.architecture/folder-structure.md`
- `.architecture/state-management.md`
- `.architecture/api-layer.md`
- `.architecture/form-architecture.md`
- `.architecture/routing.md`
- `.architecture/ui-hierarchy.md`
- `.architecture/validation.md`
- `.architecture/error-handling.md`
- `.architecture/mocking.md`
- `.architecture/responsive.md`
- `.architecture/environments.md`
- `.architecture/imports-aliases.md`
- `.architecture/types.md`
- `.architecture/shared-layer.md`
- `.architecture/utilities.md`

### Templates
- `.templates/feature/feature-template.md`
- `.templates/component/component-template.md`
- `.templates/hook/hook-template.md`
- `.templates/api/api-template.md`
- `.templates/form/form-template.md`
- `.templates/state/state-template.md`
- `.templates/page/page-template.md`

### Workflows & Rules
- `.workflows/feature-planning.md`
- `.workflows/api-integration.md`
- `.workflows/state-decision-tree.md`
- `.rules/scalability.md`
- `.rules/feature-isolation.md`
- `.rules/reusability.md`

### Design
- `.design/design-taste-frontend/SKILL.md`

---

## 0. Project Setup

Before scaffolding features, ensure the project environment is ready:

```bash
# Use correct Node version
nvm use               # or: fnm use
node --version        # should match .nvmrc (20)

# Install dependencies (no --legacy-peer-deps needed)
npm install

# Copy environment template
cp .env.example .env.local
```

Verify:
- `.nvmrc` exists with Node version (e.g. `20`)
- `.env.local` has `VITE_API_URL` set (default: `http://localhost:3001/api`)
- `npm run dev` starts without errors
- Mock interceptor is active in dev (all API calls return mock data)

---

## 1. Feature Scaffolding

Run these commands one by one:

```bash
bash .scaffolds/feature-scaffold.sh {{featureName1}}
bash .scaffolds/feature-scaffold.sh {{featureName2}}
bash .scaffolds/feature-scaffold.sh {{featureName3}}
```

Each command creates:
```
src/features/{{featureName}}/
├── api/
├── components/
├── schemas/
├── types/
└── index.ts
```

---

## 2. Feature Definitions

For each feature, follow this structure. Adapt the types, API endpoints, and components to your domain.

### Per-Feature File Map

```
src/features/{{featureName}}/
├── api/
│   ├── {{featureName}}-api.ts       # Axios service functions (typed calls)
│   ├── {{featureName}}.query.ts     # Query key factory + useQuery hooks
│   ├── {{featureName}}.mutation.ts  # useMutation hooks with sonner toasts
│   └── index.ts                     # Barrel exports
├── components/
│   └── {{component-name}}.tsx
├── schemas/
│   └── index.ts                     # Zod validation schemas
├── types/
│   └── index.ts                     # TypeScript interfaces
└── index.ts                         # Feature barrel (re-exports from api/ and types/)
```

### Example: Menu Feature

```typescript
// types/index.ts
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: 'food' | 'beverage' | 'snack'
  imageUrl: string | null
  isAvailable: boolean
  createdAt: string
}
export type UpdateMenuItemDto = Partial<CreateMenuItemDto>
export interface MenuItemFilters { category?: string; isAvailable?: boolean; search?: string }
```

```typescript
// schemas/index.ts — zod validation
export const menuItemSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  category: z.enum(['food', 'beverage', 'snack']),
})
```

```typescript
// api/menu-api.ts — use client.get/post/patch/delete (no wrapper helpers)
import { client } from '@shared/api/client'
const BASE = '/menu'
export const menuApi = {
  list: (params?: MenuItemFilters) => client.get<MenuItem[]>(BASE, { params }).then(r => r.data),
  byId: (id: string) => client.get<MenuItem>(`${BASE}/${id}`).then(r => r.data),
  create: (data: CreateMenuItemDto) => client.post<MenuItem>(BASE, data).then(r => r.data),
  update: (id: string, data: UpdateMenuItemDto) => client.patch<MenuItem>(`${BASE}/${id}`, data).then(r => r.data),
  remove: (id: string) => client.delete(`${BASE}/${id}`),
}
```

```typescript
// api/menu.query.ts — co-located query keys + useQuery hooks
export const queryKeys = {
  all: ['menu'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters?: MenuItemFilters) => [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
}
export function useMenuList(filters?: MenuItemFilters) { ... }
export function useMenuItemDetail(id: string) { ... }
```

```typescript
// api/menu.mutation.ts — mutations with cache invalidation + sonner toasts
export function useCreateMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateMenuItemDto) => menuApi.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: queryKeys.all }); toast.success('Menu item created') },
    onError: (error) => { toast.error(error.message || 'Failed to create menu item') },
  })
}
```

```typescript
// index.ts — barrel
export { useMenuList, useMenuItemDetail, useCreateMenuItem, ... } from './api'
export type { MenuItem, MenuItemFilters, ... } from './types'
```

### Kitchen Feature (special case — separate API from orders)

Kitchen has its **own API endpoints** with a different data shape than orders. Add mock endpoints for it in `src/mocks/interceptor.ts` following the pattern in `.architecture/mocking.md`.

```typescript
// api/kitchen-api.ts
export const kitchenApi = {
  list: (params?: KitchenFilters) => client.get<KitchenOrder[]>('/kitchen', { params }).then(r => r.data),
  updateStatus: (orderId: string, status: KitchenOrder['status']) =>
    client.patch<KitchenOrder>(`/kitchen/${orderId}/status`, { status }).then(r => r.data),
}
```

---

## 3. Error Handling Setup

After features are scaffolded, set up the route-level error boundary:

- Create `src/routes/error-fallback.tsx` using `useRouteError` + `isRouteErrorResponse`
- Add `errorElement: <RouteErrorFallback />` to your root route in the router
- All mutations should already have `onError` with `toast.error()` — this is part of the mutation template

See `.architecture/error-handling.md` for the full pattern.

---

## 4. Mocking Setup

The project uses an Axios request interceptor-based mock system (`src/mocks/interceptor.ts`). After creating feature API modules, add corresponding mock endpoint handlers:

1. Open `src/mocks/interceptor.ts`
2. Add a new `if (method === 'get' && path === '/your-entity')` block in `handleRequest()`
3. Add initial seed data to `src/mocks/mock-data.ts` if needed

The mock interceptor registers itself automatically in dev mode via `src/shared/api/client.ts`. No additional setup needed.

See `.architecture/mocking.md` for detailed instructions.

---

## 5. Responsive Design

Apply these conventions to every component:

- Use the **mobile-first** approach: base styles = mobile, breakpoints (`sm:`, `md:`, `lg:`) = larger screens
- Add `flex-wrap` to any horizontal flex row that might overflow on small screens
- Use `w-full sm:w-{size}` instead of hardcoded widths like `w-64`
- Add `pb-16 md:pb-0` to `<main>` content to account for the mobile bottom tab bar
- Sidebar layouts: `flex flex-col gap-6 lg:flex-row` with `w-full lg:w-80 shrink-0`

See `.architecture/responsive.md` for full reference.

---

## 6. Shared Components

Create shared UI primitives in `src/shared/ui/`:

```bash
bash .scaffolds/component-scaffold.sh StatusBadge shared/ui
bash .scaffolds/component-scaffold.sh SearchInput shared/ui
bash .scaffolds/component-scaffold.sh ConfirmDialog shared/ui
```

---

## 7. State Management (Zustand)

Create stores in `src/stores/` using zustand v5 with `create` + `devtools` middleware.

---

## 8. Routing

Use `react-router-dom` v7 `createBrowserRouter` with `lazy()` imports for every page.

---

## 9. Coding Standards

- **NO** `React.FC` — always `function ComponentName()`
- **NO** default exports — use named exports always
- All files = kebab-case (e.g., `menu-item-card.tsx`)
- All functions/components = PascalCase or camelCase
- Imports: `@shared/*`, `@features/*`, `@pages/*`, `@layouts/*`, `@stores/*` aliases
- TanStack Query v5 object syntax (`queryKey`, `queryFn`)
- Query keys co-located with hooks (no shared query key file)
- Zustand v5 `create()` + `devtools` middleware
- RHF v7 + `@hookform/resolvers/zod`
- Tailwind v4 classes (no `@apply`, no style objects)
- `cn()` utility from `@shared/utils/cn` for class merging
- sonner `toast.success()` / `toast.error()` for user notifications
- lucide-react icons only — no emojis
- All API calls through `client` from `@shared/api/client` — no direct `fetch` or raw axios

---

Generate all files in order. After each feature, wait for confirmation before proceeding to the next.
