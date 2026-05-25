# API Layer Architecture

## Stack

- **HTTP client**: axios v1
- **Server state**: @tanstack/react-query v5 (with devtools)
- **Runtime validation**: zod v3 (API boundary validation)

## Structure

```
shared/api/
├── client.ts           # Axios v1 instance, base URL, interceptors
├── query.ts            # Query key factory, TanStack Query v5 helpers
├── error.ts            # Error normalization, typed error classes
└── index.ts

features/{feature}/api/
├── {entity}-api.ts     # Service functions (typed axios calls)
├── use-{entity}-query.ts     # useQuery wrapper
├── use-{entity}-mutation.ts  # useMutation wrapper
└── index.ts
```

## Axios Client (`shared/api/client.ts`)

Single axios v1 instance:

```ts
import axios from 'axios'
import { env } from '@shared/config/env'

export const client = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})
```

### Interceptors

- **Request**: Attach auth token from js-cookie v3 (`Cookies.get('access_token')`)
- **Response**: Unwrap data, parse with zod schema on boundary
- **Error**: Normalize to `AppError` shape, handle 401 (clear token + redirect to login)

## Query Key Factory (`shared/api/query.ts`)

Centralized, typed query key generation for TanStack Query v5:

```ts
export const queryKeys = {
  users: {
    all:    ['users'] as const,
    list:   (params: UserListParams) => ['users', 'list', params] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },
  reports: {
    all:    ['reports'] as const,
    summary: (period: string) => ['reports', 'summary', period] as const,
  },
}
```

## Service Functions

Feature service files export pure data-fetching functions returning axios promises:

```ts
// features/users/api/user-api.ts
import { client } from '@shared/api/client'
import type { User, CreateUserDto, UpdateUserDto } from '../types/user'

export const userApi = {
  list:   (params: UserListParams) => client.get<User[]>('/users', { params }),
  detail: (id: string) => client.get<User>(`/users/${id}`),
  create: (data: CreateUserDto) => client.post<User>('/users', data),
  update: (id: string, data: UpdateUserDto) => client.put<User>(`/users/${id}`, data),
  delete: (id: string) => client.delete(`/users/${id}`),
}
```

## TanStack Query v5 Hooks

Query hooks use the object-syntax `useQuery`:

```ts
// features/users/api/use-users-query.ts
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@shared/api/query'
import { userApi } from './user-api'
import type { UserListParams } from '../types/user'

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => userApi.list(params),
  })
}
```

Mutation hooks handle cache invalidation:

```ts
// features/users/api/use-create-user-mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@shared/api/query'
import { userApi } from './user-api'
import type { CreateUserDto } from '../types/user'

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUserDto) => userApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
  })
}
```

## Error Handling

```ts
// shared/api/error.ts
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public details?: Record<string, string[]>,
  ) { super(message) }
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

## TanStack Query Devtools

Enabled only in development via `import.meta.env.DEV`:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
```
