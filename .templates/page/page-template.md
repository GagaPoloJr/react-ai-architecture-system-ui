# Page Template

## Page Component Structure

```
pages/{{featureName}}/
├── index.tsx                          # Route entry (lazy-load wrapper)
├── {{feature-name}}-page.tsx          # Main page component
├── {{feature-name}}-page.loading.tsx  # Skeleton loading state
├── {{feature-name}}-page.error.tsx    # Error state
├── {{feature-name}}-page.empty.tsx    # Empty state
└── {{feature-name}}.test.tsx
```

## Page Component

```tsx
// {{feature-name}}-page.tsx
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { use{{FeatureName}}Query } from '@/features/{{featureName}}/api/{{featureName}}.query';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/skeleton/skeleton';
import { {{FeatureName}}Detail } from '@/features/{{featureName}}/components/{{feature-name}}-detail';
import { {{FeatureName}}PageLoading } from './{{feature-name}}-page.loading';
import { {{FeatureName}}PageError } from './{{feature-name}}-page.error';
import { {{FeatureName}}PageEmpty } from './{{feature-name}}-page.empty';

export function {{FeatureName}}Page() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'overview';

  const { data, isLoading, isError, error, refetch } = use{{FeatureName}}Query(id!);

  if (isLoading) return <{{FeatureName}}PageLoading />;
  if (isError) return <{{FeatureName}}PageError error={error} onRetry={refetch} />;
  if (!data) return <{{FeatureName}}PageEmpty />;

  return (
    <>
      <Helmet>
        <title>{data.name} — {t('app.name')}</title>
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
        </div>

        <{{FeatureName}}Detail data={data} defaultTab={tab} />
      </div>
    </>
  );
}
```

## Loading States

```tsx
// {{feature-name}}-page.loading.tsx
import { Skeleton } from '@/components/skeleton/skeleton';

export function {{FeatureName}}PageLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
```

- Match the skeleton layout to the actual page layout (same structure, just gray).

## Error States

```tsx
// {{feature-name}}-page.error.tsx
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface {{FeatureName}}PageErrorProps {
  error: Error;
  onRetry: () => void;
}

export function {{FeatureName}}PageError({ error, onRetry }: {{FeatureName}}PageErrorProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4 px-4 py-16 text-center">
      <AlertCircle className="size-12 text-destructive" />
      <h2 className="text-xl font-semibold">Failed to load</h2>
      <p className="text-muted-foreground text-sm">{error.message}</p>
      <Button onClick={onRetry}>
        <RefreshCw className="mr-2 size-4" />
        Try Again
      </Button>
    </div>
  );
}
```

- Provide a clear error message.
- Always include a retry action.

## Empty States

```tsx
// {{feature-name}}-page.empty.tsx
import { FileIcon } from 'lucide-react';

export function {{FeatureName}}PageEmpty() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4 px-4 py-16 text-center">
      <FileIcon className="size-12 text-muted-foreground" />
      <h2 className="text-xl font-semibold">No {{FeatureName}} found</h2>
      <p className="text-muted-foreground text-sm">
        Create your first {{FeatureName}} to get started.
      </p>
    </div>
  );
}
```

- Guide the user toward the next action.
- Use lucide-react icons.

## Route Parameters

```tsx
import { useParams, useSearchParams } from 'react-router-dom';

export function {{FeatureName}}Page() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'overview';

  function setTab(tab: string) {
    setSearchParams((prev) => {
      prev.set('tab', tab);
      return prev;
    });
  }

  // ...
}
```

- Validate route params with an early return.
- Default search params to sensible values.
- Use `useNavigate` for programmatic navigation.
