# Error Handling

## Stack

- **Error boundaries**: React 19 ErrorBoundary (custom component)
- **Route errors**: react-router-dom v7 `errorElement`
- **API errors**: Axios v1 interceptors → normalized `AppError`
- **Toast notifications**: sonner v2
- **i18n**: i18next v24 (translated user-facing messages)

## Error Boundary Hierarchy

```
<App>
  └── <RootErrorBoundary>                    ← Catch-all (sonner toast + refresh)
      └── <QueryClientProvider>               ← @tanstack/react-query v5
          └── <ThemeProvider>                 ← next-themes v0.4
              └── <RouterProvider>            ← react-router-dom v7
                  ├── <AuthLayout>
                  │   └── <LoginPage />       ← errorElement: <RouteErrorFallback />
                  └── <AppLayout>
                      └── <AuthGuard>
                          └── <Suspense>
                              └── <DashboardPage />  ← errorElement: <RouteErrorFallback />
```

## Error Boundary Component

```tsx
// shared/ui/atoms/error-boundary.tsx
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, info: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorFallback error={this.state.error} />
    }
    return this.props.children
  }
}
```

## API Error Normalization

```ts
// shared/api/error.ts
import axios from 'axios'

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public details?: Record<string, string[]>,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function parseAxiosError(error: unknown): AppError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    return new AppError(
      data?.code ?? 'UNKNOWN_ERROR',
      data?.message ?? error.message,
      error.response?.status ?? 500,
      data?.details,
    )
  }
  return new AppError('UNKNOWN_ERROR', 'An unexpected error occurred', 500)
}
```

## Axios Error Interceptor

```ts
// shared/api/client.ts
import { parseAxiosError } from './error'

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const appError = parseAxiosError(error)
    if (appError.status === 401) {
      Cookies.remove('access_token')
      window.location.href = ROUTES.AUTH.LOGIN
    }
    return Promise.reject(appError)
  },
)
```

## React Router errorElement

```tsx
// src/routes/error-fallback.tsx
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Button } from '@shared/ui/atoms/button'

export function RouteErrorFallback() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">{error.status}</h1>
        <p className="text-muted-foreground">{error.statusText}</p>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Something went wrong</p>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </div>
  )
}
```

## Sonner Toast for API Errors

```tsx
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: CreateUserDto) => userApi.create(data),
    onError: (error: AppError) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('User created successfully')
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}
```

## Mutation Error → Form Field Mapping

```tsx
const mutation = useCreateUser({
  onError: (error: AppError) => {
    if (error.details) {
      Object.entries(error.details).forEach(([field, messages]) => {
        form.setError(field as keyof FormData, {
          message: messages[0],
        })
      })
    } else {
      toast.error(error.message)
    }
  },
})
```

## Recovery Strategies

| Strategy | Implementation | When to Use |
|----------|---------------|-------------|
| Retry | `refetch()` / `mutation.reset()` | Transient API failures |
| Rollback | Optimistic update revert | Mutation failures |
| Fallback UI | Render simplified component | Non-critical feature failure |
| Full reload | `window.location.reload()` | Corrupted app state |

## User-Facing Messages

- All user-facing error messages go through i18n via `react-i18next v15`: `t('errors:networkTimeout')`.
- Messages are specific and actionable: "Could not save. Please try again."
- Avoid technical jargon: no "500 Internal Server Error" to users.
