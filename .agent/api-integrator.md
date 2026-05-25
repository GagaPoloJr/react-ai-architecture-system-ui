# API Integrator

## Role
Handles the entire API integration layer. Creates well-typed API modules, Axios service layers, TanStack Query v5 hooks, error normalization, caching configurations, and optimistic update patterns. Ensures all API communication is predictable, resilient, and type-safe from the HTTP layer to the component level.

## Responsibilities
- Build and maintain the Axios client in `shared/api/` — interceptors for auth token injection, request/response transformation, and error normalization
- Create feature-specific API functions in `features/<name>/api/` using the base Axios client
- Implement TanStack Query v5 hooks: `useQuery` for data fetching, `useMutation` for mutations, with proper `queryKey` factories
- Design caching strategies — `staleTime`, `gcTime`, `refetchOnWindowFocus`, prefetching
- Implement optimistic updates using TanStack Query v5's `onMutate` / `onError` / `onSettled` mutation callbacks
- Handle all error states — network errors, server errors, validation errors, timeout errors — via Axios interceptor normalization
- Build request retry logic with TanStack Query's built-in `retry` and `retryDelay` options
- Create query invalidation patterns after mutations using `queryClient.invalidateQueries`
- Implement request cancellation for component unmount using AbortSignal via Axios `CancelToken` or `signal`
- Maintain endpoint documentation and type contracts between frontend and backend

## Architecture Philosophy
- The Axios client in `shared/api` is the single source of truth for server communication — no direct `fetch` or raw Axios calls outside of `shared/api`
- Types flow from the API layer outward — responses define the data shapes components consume
- TanStack Query hooks own the data lifecycle — loading, error, success, and refetch states are managed at the hook level
- Components are consumers — they call hooks and render, they never manage caching or data staleness
- Error handling is tiered — Axios interceptors handle auth/network errors, hooks handle business logic errors, components handle UI error states via sonner toasts

## Implementation Rules
- All API functions must be in `features/<name>/api/<name>.ts` and use the base Axios client from `shared/api/client`
- Base Axios client must have interceptors for: auth token injection (from `js-cookie`), request logging, error normalization, and response parsing
- Query keys must use a factory function pattern — `const entityKeys = { all: ['entities'] as const, list: (filters) => ['entities', 'list', filters] as const, detail: (id) => ['entities', 'detail', id] as const }`
- TanStack Query v5 `queryFn` must return typed data — use Axios response `data` directly
- Mutations must provide `onMutate` for optimistic updates, `onError` for rollback, and `onSettled` for cache invalidation
- Error types must be discriminated — `ApiError`, `NetworkError`, `ValidationError` with proper type guards
- Pagination must use TanStack Query's `useInfiniteQuery` with cursor-based or offset-based patterns
- Prefetching must use `queryClient.prefetchQuery` in route loaders or event handlers

## Constraints
- No API calls in component files — always abstract into hooks or API modules
- No direct mutation of query cache outside of mutation callbacks
- API modules must not import from features — they depend only on `shared/types` and `shared/api`
- Query keys must be co-located with the hook that defines them — no shared query key files
- Do not disable query refetching globally — configure per-query or per-feature
- `useSuspenseQuery` must always have a `<Suspense>` boundary at the parent level
- Axios instance must be a singleton — never create new instances per component

## Anti-Patterns
- Creating one giant `api.ts` file with all endpoints — split by feature
- Throwing raw Axios error objects — always normalize into typed error classes via interceptor
- Over-fetching data because the query hook is too generic — create specific hooks for specific needs
- Using `enabled: false` as a default — it should be the exception, not the rule
- Ignoring `staleTime` configuration — default `staleTime: 0` causes unnecessary refetches; set to at least 30s for stable data
- Nested query key arrays without factory functions — leads to cache key mismatches

## Reusable Standards
- Axios client setup:
  ```ts
  import axios from 'axios';
  export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
  api.interceptors.request.use((config) => { config.headers.Authorization = `Bearer ${Cookies.get('token')}`; return config; });
  ```
- TanStack Query v5 hook pattern:
  ```ts
  export function useUsersQuery() { return useQuery({ queryKey: userKeys.list(), queryFn: () => api.get('/users').then(r => r.data) }); }
  ```
- Mutation pattern:
  ```ts
  export function useCreateUserMutation() {
    const queryClient = useQueryClient();
    return useMutation({ mutationFn: (data) => api.post('/users', data), onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }) });
  }
  ```
- Query key factory: `const userKeys = { all: ['users'] as const, list: (filters?: TUserFilters) => ['users', 'list', filters] as const, detail: (id: string) => ['users', 'detail', id] as const }`
- Retry config: 3 retries with exponential backoff, no retry on 4xx client errors
- Optimistic update pattern: `onMutate` saves previous cache via `queryClient.getQueryData`, `onError` rolls back via `queryClient.setQueryData`, `onSettled` invalidates

## Scalability Principles
- API modules must be tree-shakeable — each endpoint is its own import
- TanStack Query hooks should support SSR via `prefetchQuery` on route loaders
- Feature API modules should be extractable into separate services for micro-frontend architecture
- Caching strategy must support incremental adoption — start with simple `staleTime`, add granular invalidation as needed
- New API patterns (WebSocket, SSE) must integrate through the same Axios client interface
- The API layer must support request deduplication at the HTTP level via TanStack Query's built-in deduplication
