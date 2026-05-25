# Feature Scaffolding Rules

## When to Scaffold
- Before writing any implementation code
- When a feature has been fully planned (see `feature-planning.md`)
- When the component tree, data flow, and i18n keys are reviewed

## Scaffold Checklist

### 1. Create Directory Structure
```
src/features/<feature-name>/
├── api/
│   ├── index.ts              # barrel export
│   ├── query-keys.ts         # queryKeys factory
│   └── <name>-api.ts         # axios service functions
├── components/
│   └── index.ts              # barrel export
├── hooks/
│   ├── index.ts              # barrel export
│   ├── use-get-<name>.ts     # useQuery hook
│   └── use-<action>-<name>.ts # useMutation hook
├── types/
│   ├── index.ts              # barrel export
│   ├── <name>.ts             # TypeScript interfaces
│   └── schemas.ts            # Zod schemas (if forms)
├── utils/
│   ├── index.ts              # barrel export
│   └── <name>.ts             # pure helper functions
├── i18n/
│   └── en.json               # i18n keys for this feature
├── pages/
│   ├── index.ts              # barrel + default export for lazy route
│   └── <Name>Page.tsx        # page component
└── index.ts                  # feature-level barrel
```

No nested feature dirs. Sub-features become their own folders under `features/`.

### 2. Create Barrel Exports
```ts
// types/index.ts
export type { Stats, StatsFilters } from './stats';
export { reportSchema } from './schemas';
export type { ReportInput } from './schemas';

// api/index.ts
export { getStats, exportStats } from './stats-api';
export type { GetStatsResponse } from './stats-api';
export { queryKeys } from './query-keys';

// hooks/index.ts
export { useGetStats } from './use-get-stats';

// components/index.ts (only if used outside the feature)
export { StatsCard } from './stats-card';

// utils/index.ts
export { formatStatValue } from './format-stat-value';

// feature index.ts — public API of the feature
export { useGetStats } from './hooks';
export type { Stats, StatsFilters } from './types';
```

### 3. Create Type Stubs
```ts
// types/stats.ts
export interface Stats {
  totalCases: number;
  resolvedCases: number;
  pendingCases: number;
  avgResolutionDays: number;
}

export interface StatsFilters {
  startDate: string;
  endDate: string;
  officerId?: string;
}
```

```ts
// types/schemas.ts
import { z } from 'zod';

export const statsFilterSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  officerId: z.string().uuid().optional(),
});

export type StatsFilterInput = z.infer<typeof statsFilterSchema>;
```

### 4. Create API Stubs
```ts
// api/query-keys.ts
import type { StatsFilters } from '../types';

export const queryKeys = {
  stats: {
    all: () => ['stats'] as const,
    filters: (filters: StatsFilters) => ['stats', filters] as const,
    detail: (id: string) => ['stats', id] as const,
  },
};
```

```ts
// api/stats-api.ts
import axios from '@/lib/axios';
import type { Stats, StatsFilters } from '../types';

export type GetStatsResponse = { data: Stats };

export const getStats = (filters: StatsFilters): Promise<GetStatsResponse> =>
  axios.get('/api/stats', { params: filters });

export const exportStats = (filters: StatsFilters): Promise<Blob> =>
  axios.post('/api/stats/export', filters, { responseType: 'blob' });
```

### 5. Create Hook Stubs
```ts
// hooks/use-get-stats.ts
import { useQuery } from '@tanstack/react-query';
import { getStats, queryKeys } from '../api';
import type { StatsFilters } from '../types';

export const useGetStats = (filters: StatsFilters) =>
  useQuery({
    queryKey: queryKeys.stats.filters(filters),
    queryFn: () => getStats(filters),
    enabled: !!filters.startDate,
    placeholderData: (prev) => prev,
    select: (res) => res.data,
  });
```

```ts
// hooks/use-export-stats.ts
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { exportStats } from '../api';
import { useTranslation } from 'react-i18next';
import type { StatsFilters } from '../types';

export const useExportStats = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (filters: StatsFilters) => exportStats(filters),
    onSuccess: () => {
      toast.success(t('stats.export.success'));
    },
    onError: () => {
      toast.error(t('stats.export.error'));
    },
  });
};
```

### 6. Create Page Stub
```ts
// pages/stats-page.tsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function StatsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('stats.pageTitle')}</title>
      </Helmet>
      <div>{/* feature implementation */}</div>
    </>
  );
}
```

### 7. Create Component Stubs
- Use `cva()` from `class-variance-authority` for variant props
- Use `cn()` from `@/lib/utils` for class merging
- Use `lucide-react` for icons
- Use Radix primitives for interactive elements

```ts
// components/stat-card.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

const statCardVariants = cva('rounded-xl border p-4', {
  variants: {
    trend: {
      up: 'border-green-200 bg-green-50',
      down: 'border-red-200 bg-red-50',
      neutral: 'border-gray-200 bg-gray-50',
    },
  },
  defaultVariants: { trend: 'neutral' },
});

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: number;
}

export function StatCard({ title, value, trend }: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ trend }))}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
      {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
    </div>
  );
}
```

### 8. Verify Isolation Rules
- Feature A must NOT import from feature B directly
- Shared code must go through `@/components/ui/` or `@/lib/` or `@/hooks/`
- No barrel file should import from `../` outside the feature folder
- Types are defined inside the feature, not in a global types folder
- `index.ts` barrel at feature root only exports what external features may consume
