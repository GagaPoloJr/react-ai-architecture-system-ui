# State Management

## Four State Categories

| Category | Library | Purpose |
|----------|---------|---------|
| **Server State** | @tanstack/react-query v5 | Data fetched from/synced with server |
| **URL State** | react-router-dom v7 | Search params, route params |
| **Form State** | react-hook-form v7 + @hookform/resolvers/zod | Form field values, validation |
| **Client State** | zustand v5 (devtools + persist) | UI state, cross-feature state |

## Decision Tree

```
Where should this state live?
├── Is it fetched from or synced with a server?
│   ├── Yes → SERVER STATE (@tanstack/react-query v5)
│   │   ├── Use useQuery(queryKey, queryFn, options)
│   │   ├── Use useMutation(mutationFn, { onSuccess })
│   │   └── NEVER duplicate in zustand
│   └── No → Is it visible in the URL?
│       ├── Yes → URL STATE (react-router-dom v7)
│       │   ├── useSearchParams() for filter/sort/pagination
│       │   └── useParams() for dynamic segments
│       └── No → Is it form input?
│           ├── Yes → FORM STATE (react-hook-form v7)
│           │   ├── useForm<T>({ resolver: zodResolver(schema) })
│           │   └── Field-level via useFieldArray for dynamic lists
│           └── No → Is it used by 2+ components?
│               ├── Yes → CLIENT STATE (zustand v5)
│               │   ├── create() with (set, get) => ({ ... })
│               │   └── devtools + persist middleware as needed
│               └── No → LOCAL STATE (useState / useReducer)
```

## Zustand v5 Store Pattern

```ts
// stores/use-auth-store.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
        logout: () => set({ user: null, token: null }),
      }),
      { name: 'auth-storage' },
    ),
    { name: 'AuthStore' },
  ),
)
```

## Data Flow

```
Server API → TanStack Query v5 cache → Components (via useQuery)
                                          ↕
URL (useSearchParams) ←→ Components ←→ Zustand v5 stores
                                          ↕
                              React Hook Form v7 (local field state)
```

## Rules

- Server state belongs in TanStack Query v5 only — never in zustand.
- URL is the source of truth for filter/sort/pagination (bookmarkable, shareable).
- Form state lives in RHF v7 `useForm` — not zustand, not useState.
- Use zustand v5 for: auth state, theme (via next-themes v0.4), sidebar open/close, global UI preferences.
- Non-serializable values (functions, class instances) must not go in URL state or persisted zustand stores.
