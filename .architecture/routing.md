# Routing

## Stack

- **Router**: react-router-dom v7 (createBrowserRouter)
- **Head management**: react-helmet-async v2
- **Lazy loading**: React.lazy + Suspense

## Router Structure

```
src/routes/
├── index.tsx           # createBrowserRouter definition
├── guards.tsx          # AuthGuard, RoleGuard components
└── index.ts
```

## Route Constants

Route path strings are centralized:

```ts
// src/routes/index.ts (or separate constants file)
export const ROUTES = {
  AUTH: {
    LOGIN:    '/login',
    REGISTER: '/register',
  },
  DASHBOARD: {
    ROOT:      '/dashboard',
    ANALYTICS: '/dashboard/analytics',
  },
} as const
```

## createBrowserRouter Pattern

```tsx
// src/routes/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthGuard } from './guards'
import { AppLayout } from '@layouts/app-layout'
import { AuthLayout } from '@layouts/auth-layout'
import { ROUTES } from './index'

const LoginPage = lazy(() => import('@pages/login-page'))
const DashboardPage = lazy(() => import('@pages/dashboard-page'))
const NotFoundPage = lazy(() => import('@pages/not-found-page'))

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.AUTH.LOGIN, element: <LoginPage /> },
    ],
  },
  {
    element: <AuthGuard><AppLayout /></AuthGuard>,
    children: [
      { path: ROUTES.DASHBOARD.ROOT, element: <DashboardPage /> },
    ],
  },
  {
    path: '/',
    element: <Navigate to={ROUTES.DASHBOARD.ROOT} replace />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <RouteErrorBoundary />,
  },
])
```

## Route Guards

```tsx
// src/routes/guards.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@stores/use-auth-store'
import { ROUTES } from './index'

export function AuthGuard() {
  const { user, isLoading } = useAuthStore()

  if (isLoading) return <PageLoader />
  if (!user) return <Navigate to={ROUTES.AUTH.LOGIN} replace />

  return <Outlet />
}
```

## Layout Route Pattern

```tsx
// src/layouts/app-layout.tsx
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@shared/ui/organisms/sidebar'
import { Header } from '@shared/ui/organisms/header'

export function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
```

## Navigation Patterns

| Pattern | Hook/Component | Use Case |
|---------|--------------|----------|
| Imperative | `useNavigate()` | After form submission |
| Declarative | `<Link>` from react-router-dom v7 | Navigation links |
| URL state | `useSearchParams()` | Filter/sort/pagination |
| Route params | `useParams()` | Detail pages from list |

## Best Practices

- One `Page` component per route. Pages are lazy-loaded with `React.lazy`.
- Routes are defined in `routes/index.tsx` only — never spread across features.
- Search params for filter/sort/pagination state (not zustand).
- Route constants prevent string duplication and enable easy refactoring.
- `react-helmet-async v2` `<Helmet>` for per-page title/meta tags.
- `errorElement` per layout or route for granular error boundaries.
