# API Module Template

## Service Module Structure

```
features/{{featureName}}/api/
├── {{featureName}}-api.ts           # Raw axios calls
├── {{featureName}}.query.ts         # useQuery hooks
├── {{featureName}}.mutation.ts      # useMutation hooks
├── {{featureName}}.infinite.ts      # useInfiniteQuery hooks
└── index.ts
```

## Service Layer (Raw Axios Calls)

```ts
// {{featureName}}-api.ts
import { getApi, postApi, patchApi, deleteApi } from '@/configs/http/client';
import type { InstanceApiType } from '@/types/types';
import type {
  {{FeatureName}},
  Create{{FeatureName}}Dto,
  Update{{FeatureName}}Dto,
  ListParams,
  PaginatedResponse,
} from '../types/{{featureName}}.types';

const BASE = '/{{featureName}}';
const INSTANCE: InstanceApiType = 'service';

export const {{featureName}}Api = {
  list: (params?: ListParams) =>
    getApi<PaginatedResponse<{{FeatureName}}>>(BASE, { params }, INSTANCE).then((r) => r.data),

  byId: (id: string) =>
    getApi<{{FeatureName}}>(`${BASE}/${id}`, {}, INSTANCE).then((r) => r.data),

  create: (data: Create{{FeatureName}}Dto) =>
    postApi<{{FeatureName}}>(BASE, data, {}, INSTANCE).then((r) => r.data),

  update: (id: string, data: Update{{FeatureName}}Dto) =>
    patchApi<{{FeatureName}}>(`${BASE}/${id}`, data, {}, INSTANCE).then((r) => r.data),

  remove: (id: string) =>
    deleteApi(`${BASE}/${id}`, {}, INSTANCE),
};
```

## Query Key Factory (TanStack Query v5)

```ts
// {{featureName}}.query.ts (shared constants)
export const queryKeys = {
  all: ['{{featureName}}'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters?: ListParams) => [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
};
```

## Query Hook (useQuery)

```ts
// {{featureName}}.query.ts
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { {{featureName}}Api } from './{{featureName}}-api';

export function use{{FeatureName}}Query(
  id: string,
  options?: Omit<UseQueryOptions<{{FeatureName}}, AxiosError, {{FeatureName}}, ReturnType<typeof queryKeys.detail>>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => {{featureName}}Api.byId(id),
    ...options,
  });
}
```

## Mutation Hook (useMutation)

```ts
// {{featureName}}.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { {{featureName}}Api } from './{{featureName}}-api';
import { queryKeys } from './{{featureName}}.query';

export function useCreate{{FeatureName}}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: {{featureName}}Api.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success('{{FeatureName}} created successfully');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || 'Failed to create {{FeatureName}}');
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

## Error Handling Patterns

```ts
import { errorBus } from '@/lib/errors/error-bus';
import { normalizeError } from '@/lib/errors/normalize-error';

// In mutation
onError: (error: AxiosError) => {
  const normalized = normalizeError(error);
  errorBus.emit(normalized);
  toast.error(normalized.message);
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
