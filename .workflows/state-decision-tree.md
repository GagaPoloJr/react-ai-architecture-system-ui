# State Management Decision Tree

## Decision Flow

```
┌──────────────────────────────────────────┐
│  Where should this state live?           │
└──────────────────────────────────────────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
    Is it server data?     Is it something else?
    (from an API)                 │
          │                  ┌────┴────┐
          │ yes              ▼         ▼ no
          ▼             Is it URL-   Is it form
    ┌──────────────┐    related?     data?
    │ @tanstack/   │      │              │
    │ react-query  │  ┌───┴───┐    ┌────┴────────┐
    │ v5           │  │ react-│    │ react-hook- │
    │ useQuery /   │  │ router│    │ form v7     │
    │ useMutation  │  │ dom   │    │ + zod       │
    │ + queryKeys  │  │ v7    │    │ resolver    │
    └──────────────┘  │ use-  │    └─────────────┘
                      │ Search│
                      │ Params│
                      │ / use-│
                      │ Params│
                      └───────┘

    Is it UI state?         Is it persisted     Is it translated?
    (toggle, open/close,     user prefs?            │
     selected item)               │            ┌────┴────────┐
          │                  ┌────┴────┐       │ react-     │
     ┌────┴────┐             │ zustand │       │ i18next    │
     │ useState│             │ v5 +    │       │ v15        │
     │ (local) │             │ persist │       │ + i18next  │
     └────┴────┘             │ middleware│      └───────────┘
          │                  └─────────┘
     Is it shared
     between routes
     or deep siblings?
          │
     ┌────┴────────┐
     │ zustand v5  │
     │ create() +  │
     │ devtools    │
     └─────────────┘
```

## Decision Rules

| Question | Answer | Stack Tool |
|----------|--------|------------|
| Comes from/cached from API? | Yes | `@tanstack/react-query` v5 — `useQuery`, `useMutation`, `queryKeys` |
| Relevant to URL navigation? (filters, page, tab, id) | Yes | `react-router-dom` v7 — `useSearchParams`, `useParams` |
| Form input state? | Yes | `react-hook-form` v7 — `useForm` + `zodResolver` |
| Toggle, open/close, selected item? | Yes | `useState` in component (local only) |
| Shared between routes/ deep siblings + not in URL? | Yes | `zustand` v5 — `create()` with `devtools` |
| Survives refresh/close? | Yes | `zustand` v5 — `create()` + `persist` middleware |
| Derived from other state? | Yes | `useMemo` / zustand selector function |
| Needs translation? | Yes | `react-i18next` v15 — `useTranslation()` |
| Theme preference? | Yes | `next-themes` v0.4 — `useTheme()` |

## Zustand Store Patterns (v5)

```ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BearState {
  bears: number;
  addBear: () => void;
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        addBear: () => set((state) => ({ bears: state.bears + 1 })),
      }),
      { name: 'bear-storage' },
    ),
  ),
);
```

- `create` with explicit `<T>()()` curried call for TypeScript
- `devtools` wrapper for Redux DevTools debugging
- `persist` middleware with string storage key
- Selector-based subscriptions prevent unnecessary re-renders

## Anti-Patterns to Avoid

- ❌ Putting server data in zustand → react-query already caches it with dedup, refetch, GC
- ❌ Putting URL state (page, sort, filter) in useState → breaks on reload, share, back button
- ❌ Putting form state in zustand → react-hook-form handles it better with validation
- ❌ Using context for frequently-updating state → causes large re-render trees
- ❌ Over-normalizing: putting everything in a single global store
- ❌ Duplicating state: same data in zustand store + query cache
- ❌ Using `React.FC` — not needed, use regular function components
- ❌ Mixing axios interceptors with query hooks — keep data access separate

## When to Use Context vs. Zustand

| Aspect | React Context | Zustand v5 |
|--------|---------------|------------|
| Re-renders | All consumers | Selector-based only |
| Middleware | None built-in | `devtools`, `persist`, `immer` |
| Bundle size | ~0 (built-in) | ~1.2 KB gzipped |
| Debugging | React DevTools | Redux DevTools via `devtools` |
| Best for | Theme (`next-themes`), locale | Shared UI state, filters, persisted prefs |
