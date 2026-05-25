# API Integration Workflow

## 1. Define API Types + Zod Schemas
- Match the backend response shape exactly
- Use `zod` for runtime validation of critical data
- Use branded types for IDs: `type UserId = string & { __brand: 'UserId' }`

```ts
// types/stats.ts
export interface StatsResponse {
  totalCases: number;
  resolvedCases: number;
  pendingCases: number;
}
```

```ts
// types/schemas.ts
import { z } from 'zod';

export const statsResponseSchema = z.object({
  totalCases: z.number(),
  resolvedCases: z.number(),
  pendingCases: z.number(),
});
```

## 2. Create Axios Service Module
- Thin wrapper around `axios` instance
- Centralized error normalization
- Do NOT call hooks here; this is pure data access

```ts
// lib/axios.ts
import axios, { type AxiosError } from 'axios';
import Cookies from 'js-cookie';

export interface ApiError {
  message: string;
  code: string;
  status: number;
  fieldErrors?: Record<string, string[]>;
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string }>) => {
    const normalized: ApiError = {
      message: error.response?.data?.message ?? error.message ?? 'Unknown error',
      code: error.code ?? 'UNKNOWN',
      status: error.response?.status ?? 0,
    };
    return Promise.reject(normalized);
  },
);
```

```ts
// api/stats-api.ts
import { apiClient } from '@/lib/axios';
import type { StatsResponse } from '../types';
import type { StatsFilters } from '../types';

export type GetStatsResponse = { data: StatsResponse };

export const getStats = (filters: StatsFilters) =>
  apiClient.get<GetStatsResponse>('/api/stats', { params: filters });

export const exportStats = (filters: StatsFilters) =>
  apiClient.post<Blob>('/api/stats/export', filters, { responseType: 'blob' });
```

## 3. Create Query Keys Factory
```ts
// api/query-keys.ts
import type { StatsFilters } from '../types';

export const queryKeys = {
  stats: {
    all: () => ['stats'] as const,
    lists: () => ['stats', 'list'] as const,
    filters: (filters: StatsFilters) => ['stats', 'filters', filters] as const,
    detail: (id: string) => ['stats', id] as const,
  },
};
```

Using `as const` for type-safe query key inference.

## 4. Create useQuery Hook
```ts
// hooks/use-get-stats.ts
import { useQuery } from '@tanstack/react-query';
import { getStats, queryKeys } from '../api';
import type { StatsFilters } from '../types';

export const useGetStats = (filters: StatsFilters) =>
  useQuery({
    queryKey: queryKeys.stats.filters(filters),
    queryFn: () => getStats(filters).then((res) => res.data.data),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    enabled: !!filters.startDate,
  });
```

- `placeholderData` keeps previous data during refetch (prevents layout shift)
- `staleTime` controls refetch frequency
- `gcTime` (replaces `cacheTime` in v5) controls garbage collection
- `select` or inline transform to unwrap response

## 5. Create useMutation Hook
```ts
// hooks/use-export-stats.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { exportStats, queryKeys } from '../api';
import type { StatsFilters } from '../types';
import type { ApiError } from '@/lib/axios';

export const useExportStats = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (filters: StatsFilters) => exportStats(filters),
    onSuccess: () => {
      toast.success(t('stats.export.success'));
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.all() });
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
};
```

## 6. Handle Loading States
```tsx
if (isLoading && !data) {
  return (
    <div className="space-y-4">
      <div className="h-24 w-full animate-pulse rounded-xl bg-gray-100" />
      <div className="h-24 w-full animate-pulse rounded-xl bg-gray-100" />
    </div>
  );
}

// During background refetch (isFetching but data exists)
if (isFetching) {
  // subtle indicator like a top bar spinner
}
```

## 7. Handle Error States
```tsx
if (isError) {
  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="text-red-800">{t('stats.errors.loadFailed')}</p>
      <Button variant="outline" size="sm" onClick={() => refetch()}>
        {t('common.retry')}
      </Button>
    </div>
  );
}
```

- Network errors → sonner toast + retry button
- 401 → redirect to login (axios interceptor)
- 403 → "access denied" UI
- 422 → field-level validation errors in forms (map to RHF `setError`)
- 5xx → generic error banner with support contact

## 8. Handle Empty State
```tsx
if (data?.length === 0) {
  return (
    <div className="flex flex-col items-center py-12 text-gray-500">
      <InboxIcon className="mb-4 h-12 w-12" />
      <p>{t('stats.empty.title')}</p>
      <p className="text-sm">{t('stats.empty.description')}</p>
    </div>
  );
}
```

## 9. Handle Optimistic Updates
```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../api';

useMutation({
  mutationFn: updateItem,
  onMutate: async (newItem) => {
    await queryClient.cancelQueries({ queryKey: queryKeys.items.lists() });
    const previous = queryClient.getQueryData(queryKeys.items.lists());
    queryClient.setQueryData(queryKeys.items.lists(), (old) =>
      old?.map((item) =>
        item.id === newItem.id ? { ...item, ...newItem } : item,
      ),
    );
    return { previous };
  },
  onError: (_err, _newItem, context) => {
    queryClient.setQueryData(queryKeys.items.lists(), context?.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.items.lists() });
  },
});
```

## 10. Test Integration
- Unit test the service layer with MSW + axios mock adapter
- Unit test hook behavior using `renderHook` with `QueryClientProvider` wrapper
- Test error/loading/empty states from the hook
- E2E test the full flow through Playwright (if configured)
