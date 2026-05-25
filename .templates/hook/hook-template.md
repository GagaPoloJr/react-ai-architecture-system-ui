# Hook Template

## Naming Conventions

```
use{{Verb}}{{Noun}}
  ^      ^    ^
  |      |    └─ domain object (User, Session, Filter)
  |      └─────── action (Fetch, Create, Update, Delete, Toggle)
  └────────────── prefix
```

Examples: `useFetchUsers`, `useToggleSidebar`, `useDebouncedValue`, `useMediaQuery`.

## Parameter Conventions

```ts
// Single config object — never positional params
export function use{{HookName}}(
  params: {{HookName}}Params,
  options?: {{HookName}}Options,
): {{HookName}}Return { ... }
```

- Always accept a single params object, never positional arguments.
- Separate required params from optional options/config.
- Provide sensible defaults via object destructuring.

## Return Value — Always Return an Object

```ts
// ✅ Correct
return { data, isLoading, error, refetch };

// ❌ Never return an array
return [data, isLoading, error, refetch];
```

- Return objects for stable references and named destructuring.
- Include at minimum: `data`, `isLoading`, `error` (or equivalent).

## useTransition for Loading States

```ts
import { useTransition } from 'react';

export function use{{HookName}}() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<Data | null>(null);

  const update = (value: string) => {
    startTransition(async () => {
      const result = await fetchData(value);
      setData(result);
    });
  };

  return { data, isPending, update };
}
```

## useSearchParams for URL State

```ts
import { useSearchParams } from 'react-router-dom';

export function use{{HookName}}Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    search: searchParams.get('search') ?? '',
    status: searchParams.get('status') ?? 'all',
    page: Number(searchParams.get('page')) || 1,
  };

  const setFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      return prev;
    });
  };

  const resetFilters = () => setSearchParams({});

  return { filters, setFilter, resetFilters };
}
```

## Effect & Cleanup

```ts
import { useEffect } from 'react';

useEffect(() => {
  const abortController = new AbortController();

  // Side-effect logic here

  return () => {
    abortController.abort();
    // Clear timeouts, remove listeners, etc.
  };
}, []);
```

- Every `useEffect` must return a cleanup function when it creates side effects.
- Use `AbortController` to cancel fetch requests on unmount.
- Clear timeouts / intervals, remove event listeners.

## Translation (i18next)

```ts
import { useTranslation } from 'react-i18next';

export function use{{HookName}}() {
  const { t } = useTranslation();

  const items = t('{{hookName}}', { returnObjects: true });

  return { items };
}
```

## When to Extract to Shared

| Situation | Location |
|-----------|----------|
| Used by 1 feature | `features/*/hooks/` |
| Used by 2+ features | `@/hooks/` |
| You start duplicating logic | Extract immediately |

## Testing Patterns

```ts
import { renderHook, act } from '@testing-library/react';

describe('use{{HookName}}', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => use{{HookName}}());
    expect(result.current.data).toBeNull();
  });

  it('should update on action', () => {
    const { result } = renderHook(() => use{{HookName}}());
    act(() => result.current.update({ key: 'value' }));
    expect(result.current.data).toEqual({ key: 'value' });
  });
});
```

- Test the public API (return value), not internal state.
- Use `renderHook` from `@testing-library/react`.
- Use `act` for state updates.
- Mock external dependencies at the boundary.
