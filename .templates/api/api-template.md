# API Module Template

## Service Module Structure

```
features/{{featureName}}/api/
├── {{featureName}}-api.ts           # Raw axios calls
├── {{featureName}}.query.ts         # Query keys + useQuery hooks
├── {{featureName}}.mutation.ts      # useMutation hooks
├── {{featureName}}.infinite.ts      # useInfiniteQuery hooks (optional)
└── index.ts
```

## Service Layer (Raw Axios Calls)

Use the project's shared `client` instance directly — no wrapper helpers.

```ts
// {{featureName}}-api.ts
import { client } from '@shared/api/client'
import type {
  {{FeatureName}},
  Create{{FeatureName}}Dto,
  Update{{FeatureName}}Dto,
  ListParams,
} from '../types';

const BASE = '/{{featureName}}';

export const {{featureName}}Api = {
  list: (params?: ListParams) =>
    client.get<{{FeatureName}}[]>(BASE, { params }).then((r) => r.data),

  byId: (id: string) =>
    client.get<{{FeatureName}}>(`${BASE}/${id}`).then((r) => r.data),

  create: (data: Create{{FeatureName}}Dto) =>
    client.post<{{FeatureName}}>(BASE, data).then((r) => r.data),

  update: (id: string, data: Update{{FeatureName}}Dto) =>
    client.patch<{{FeatureName}}>(`${BASE}/${id}`, data).then((r) => r.data),

  remove: (id: string) =>
    client.delete(`${BASE}/${id}`),
};
```

## Query Key Factory + Query Hooks

Query keys must be co-located with the hook that defines them (no shared query key file). Use a factory function pattern with `lists()` / `details()` intermediate keys for targeted cache invalidation:

```ts
// {{featureName}}.query.ts
import { useQuery } from '@tanstack/react-query';
import { {{featureName}}Api } from './{{featureName}}-api';
import type { ListParams } from '../types';

export const queryKeys = {
  all: ['{{featureName}}'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters?: ListParams) => [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
};

export function use{{FeatureName}}Query(id: string) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => {{featureName}}Api.byId(id),
    enabled: !!id,
  });
}

export function use{{FeatureName}}List(filters?: ListParams) {
  return useQuery({
    queryKey: queryKeys.list(filters),
    queryFn: () => {{featureName}}Api.list(filters),
  });
}
```

## Mutation Hook (useMutation)

Every mutation must cache-invalidate its query keys and show user-friendly toast notifications via sonner:

```ts
// {{featureName}}.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { {{featureName}}Api } from './{{featureName}}-api';
import { queryKeys } from './{{featureName}}.query';
import type { Create{{FeatureName}}Dto } from '../types';

export function useCreate{{FeatureName}}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Create{{FeatureName}}Dto) => {{featureName}}Api.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success('{{FeatureName}} created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create {{FeatureName}}');
    },
  });
}

export function useDelete{{FeatureName}}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {{featureName}}Api.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success('{{FeatureName}} deleted');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete {{FeatureName}}');
    },
  });
}
```

## Infinite Query (useInfiniteQuery)

```ts
// {{featureName}}.infinite.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { {{featureName}}Api } from './{{featureName}}-api';
import { queryKeys } from './{{featureName}}.query';

export function use{{FeatureName}}InfiniteQuery(params: ListParams) {
  return useInfiniteQuery({
    queryKey: queryKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      {{featureName}}Api.list({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.meta?.nextPage ?? undefined,
    initialPageParam: 1,
  });
}
```

## Barrel Export

```ts
// index.ts
export { {{featureName}}Api } from './{{featureName}}-api';
export { queryKeys, use{{FeatureName}}List, use{{FeatureName}}Query } from './{{featureName}}.query';
export { useCreate{{FeatureName}}, useDelete{{FeatureName}} } from './{{featureName}}.mutation';
```

## Error Handling in Mutations

Use `AppError` and `parseAxiosError` from `@shared/api/error` for typed errors:

```ts
import { AppError, parseAxiosError } from '@shared/api/error';

// In mutation
onError: (error: AppError) => {
  toast.error(error.message);
};
```

## Loading State Patterns

```tsx
const { data, isLoading, isFetching, error, refetch } = use{{FeatureName}}Query(id);

if (isLoading) return <Skeleton />;
if (error) return <ErrorState onRetry={refetch} />;
if (!data) return <EmptyState />;
return <{{FeatureName}}Detail data={data} />;
```

- `isLoading` — first load, show skeleton.
- `isFetching` — background refetch, keep existing data visible.
- `error` — show error state with retry.
- No data — show empty state (not a loading state).
