# Feature Planning Workflow

## 1. Define Requirements
- Write 1–2 sentence feature summary
- List acceptance criteria (Given/When/Then)
- Define the "happy path" and 2–3 edge cases
- Identify target routes using `createBrowserRouter`

## 2. Identify Shared Dependencies
- Does this feature depend on auth roles? → check zustand auth store
- Does it need existing Radix primitives? (`<Dialog>`, `<Select>`, `<Tabs>`, `<Tooltip>`)
- Does it need new API endpoints? → coordinate with backend
- Does it reuse existing `useQuery` keys or mutations?
- Will it introduce new packages?
- Does it require i18n namespace registration?

## 3. Plan Routes
```ts
// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      {
        path: 'dashboard',
        lazy: () => import('./features/dashboard'),
      },
      {
        path: 'reports/:reportId',
        lazy: () => import('./features/reports'),
      },
    ],
  },
]);
```

- Use `lazy()` for code-splitting per feature
- Use `useParams` for route params, `useSearchParams` for query strings
- Use `<Helmet>` from `react-helmet-async` for per-route titles

## 4. Plan Component Tree
```
features/dashboard/
├── pages/DashboardPage        # page wrapper, data orchestration, <Helmet>
├── components/
│   ├── StatsGrid              # layout container
│   ├── StatCard               # presentational, typed props
│   └── RecentActivity         # feature-specific
│       └── ActivityItem       # presentational
```

- Page component (`pages/`): orchestrates `useQuery`, passes props down
- Container components: layout, composition with Radix primitives
- Presentational components: pure, no data dependencies, use `cva()` for variants
- Shared components: extracted to `src/components/ui/` with CVA

## 5. Plan TanStack Query Hooks
| Endpoint | Method | Hook | Query Key Factory |
|----------|--------|------|-------------------|
| `/api/stats` | GET | `useGetStats` | `queryKeys.stats.all()` |
| `/api/stats/export` | POST | `useExportStats` | `queryKeys.stats.export()` |
| `/api/reports` | GET | `useGetReports` | `queryKeys.reports.list(filters)` |

Define a `queryKeys` factory per domain:
```ts
// features/stats/api/query-keys.ts
export const queryKeys = {
  stats: {
    all: () => ['stats'] as const,
    detail: (id: string) => ['stats', id] as const,
    filters: (filters: StatsFilters) => ['stats', 'filters', filters] as const,
  },
};
```

## 6. Plan Zustand Stores
- Identify shared UI state that crosses component boundaries
- Use `create()` from `zustand` with `devtools` middleware in development
- Use `persist` middleware for user preferences (theme, language)
- Keep stores flat and domain-specific

```ts
// shared/stores/use-ui-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UiState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>()(
  devtools((set) => ({
    sidebarOpen: true,
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  })),
);
```

## 7. Plan React Hook Form + Zod Schemas
- Define Zod schemas per form in `types/schemas.ts`
- Use `zod-i18n-map` for translated validation messages
- Use `useForm` with `zodResolver`

```ts
// features/reports/types/schemas.ts
import { z } from 'zod';

export const reportSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  priority: z.enum(['low', 'medium', 'high']),
  assigneeId: z.string().uuid(),
});

export type ReportInput = z.infer<typeof reportSchema>;
```

## 8. Plan i18n Keys
- Namespace per feature: `features/<name>/i18n/en.json`
- Use `useTranslation()` with typed namespace
- Keys follow: `feature.section.action`

```json
{
  "dashboard": {
    "title": "Dashboard",
    "stats": {
      "totalCases": "Total Cases",
      "resolvedCases": "Resolved Cases",
      "pendingCases": "Pending Cases"
    },
    "errors": {
      "loadFailed": "Failed to load dashboard data"
    }
  }
}
```

## 9. Identify Edge Cases
- Empty state: no data returned — show illustration with CTA
- Error state: API 4xx/5xx, network offline — sonner toast + retry
- Loading state: initial load, refetch — skeleton with `<div className="animate-pulse">`
- Race conditions: rapid filter changes — `useQuery` `placeholderData` keeps previous data
- Permission denied: user lacks role — guard with zustand auth store
- Pagination: last page, overflow — check `@tanstack/react-table` page count
