# API Layer Architecture

## Stack

- **HTTP client**: axios v1
- **Server state**: @tanstack/react-query v5 (with devtools)
- **Runtime validation**: zod v3 (API boundary validation)

## Structure

```
shared/api/
├── client.ts           # Axios v1 instance, base URL, interceptors
├── error.ts            # Error normalization (AppError class, parseAxiosError)
└── index.ts

features/{feature}/api/
├── {name}-api.ts       # Service functions (typed axios calls)
├── {name}.query.ts     # Query key factory + useQuery hooks
├── {name}.mutation.ts  # useMutation hooks
└── index.ts
```

## Axios Client (`shared/api/client.ts`)

Single axios v1 instance — must include mock interceptor in dev and error normalization:

```ts
import axios from 'axios'
import { setupMockInterceptor } from '@/mocks/interceptor'
import { parseAxiosError } from './error'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

if (import.meta.env.DEV) setupMockInterceptor(client)

client.interceptors.response.use(
  (response) => response,
  (error) => { return Promise.reject(parseAxiosError(error)) },
)
```

### Interceptors

- **Request (dev)**: `setupMockInterceptor` intercepts all requests and returns mock data — no backend needed
- **Error**: Normalize to `AppError` shape via `parseAxiosError`, handle 401 (clear token + redirect)

## Service Functions

Feature service files export pure data-fetching functions using the shared client:

```ts
// features/users/api/user-api.ts
import { client } from '@shared/api/client'
import type { User, CreateUserDto, UpdateUserDto } from '../types/user'

export const userApi = {
  list:   (params: UserListParams) => client.get<User[]>('/users', { params }).then(r => r.data),
  detail: (id: string) => client.get<User>(`/users/${id}`).then(r => r.data),
  create: (data: CreateUserDto) => client.post<User>('/users', data).then(r => r.data),
  update: (id: string, data: UpdateUserDto) => client.patch<User>(`/users/${id}`, data).then(r => r.data),
  delete: (id: string) => client.delete(`/users/${id}`),
}
```

## TanStack Query v5 Hooks

Query hooks must co-locate query keys with the hook that defines them (no shared query key file). Query keys use a factory function pattern:

```ts
// features/users/api/users.query.ts
import { useQuery } from '@tanstack/react-query'
import { userApi } from './user-api'
import type { UserListParams } from '../types/user'

export const queryKeys = {
  all:    ['users'] as const,
  lists:  () => [...queryKeys.all, 'list'] as const,
  list:   (params?: UserListParams) => [...queryKeys.lists(), params] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
}

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: queryKeys.list(params),
    queryFn: () => userApi.list(params),
  })
}
```

Mutation hooks handle cache invalidation and user-facing toast notifications via sonner:

```ts
// features/users/api/users.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userApi } from './user-api'
import { queryKeys } from './users.query'
import type { CreateUserDto } from '../types/user'

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUserDto) => userApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('User created')
    },
    onError: (error) => toast.error(error.message || 'Failed to create user'),
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
  ) { super(message); this.name = 'AppError' }
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
  if (error instanceof AppError) return error
  return new AppError('UNKNOWN_ERROR', 'An unexpected error occurred', 500)
}
```

## TanStack Query Devtools

Enabled only in development:

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
