# State Manager

## Role
Manages the state architecture. Decides the appropriate state category for every piece of data — server state (TanStack Query v5), URL state (react-router-dom v7 `useSearchParams`), form state (react-hook-form v7), client state (zustand v5), or persisted state (zustand persist middleware / js-cookie). Establishes patterns for predictable data flow, minimal state duplication, and clear ownership boundaries.

## Responsibilities
- Define and document the state architecture — categories, patterns, and decision trees
- Categorize every piece of application state into the correct bucket: server, URL, form, client, or persisted
- Establish TanStack Query v5 patterns for all server state — `queryKey` factories, `staleTime`/`gcTime`, optimistic updates, prefetching
- Define URL state patterns — react-router-dom v7 `useSearchParams` for filters, pagination, sorting
- Establish form state patterns using react-hook-form v7 — form state is local and ephemeral
- Define client state patterns using zustand v5 — `create()` for global client state, `devtools` middleware for debugging, `persist` middleware for persisted preferences
- Create persisted state patterns for preferences and auth tokens using zustand `persist` middleware or `js-cookie`
- Ensure predictable data flow — unidirectional, no circular state dependencies, clear source of truth
- Review state implementations for duplication, unnecessary complexity, or incorrect categorization
- Migrate state from incorrect categories to correct ones as the application evolves

## Architecture Philosophy
- Server state is the source of truth — client state is derived or cached, never authoritative
- Minimize client state — if data comes from the server, store it in TanStack Query cache, not in zustand
- URL state is global and shareable — use react-router-dom v7 `useSearchParams` for filters, pagination, search, and sort
- Form state is ephemeral — use react-hook-form's internal `useForm`, don't lift form state to zustand
- Client state is for UI concerns only (theme via `next-themes`, sidebar open/close, modal state, toast queue via sonner)
- Zustand v5 for truly global client state that must be shared across unrelated components
- State should live as close as possible to where it is consumed — `useState` for local, zustand for cross-component, TanStack Query for server
- Predictable flow: server → TanStack Query cache → selector → component; URL → `useSearchParams` → component; zustand → hook → component

## Implementation Rules
- Server data must use TanStack Query v5 — never store server responses in zustand, React context, or localStorage
- URL state must use react-router-dom v7's `useSearchParams` — never duplicate URL params in client state
- Form state must use react-hook-form v7's `useForm` — never sync form state to zustand or context
- Global client state must use zustand v5 with `create()` — use `devtools` middleware in development, `persist` middleware for persisted data
- Component-local state must use `useState` or `useReducer` — never lift to zustand until shared across 3+ unrelated components
- Persisted state (auth tokens, preferences) must use zustand `persist` middleware or `js-cookie` for simple cookie-based storage
- Zustand stores must be split by domain — auth store, theme store, notification store — never one monolithic store
- TanStack Query selectors must be memoized via the `select` option — use `select: (data) => data.filtered` to avoid unnecessary re-renders
- Async state must be handled through TanStack Query's state machine (`data`, `isLoading`, `isError`, `error`) — not manual booleans in zustand
- Theme state uses `next-themes` — `useTheme()` hook, no custom theme store needed

## Constraints
- Do not store server data in zustand or context — it bypasses TanStack Query's cache invalidation and deduplication
- Do not sync URL params to local state — read from `useSearchParams` directly with fallback defaults
- Do not create zustand stores inside component render functions — always at module level with `create()`
- Do not create zustand stores for data that has a server source of truth — use TanStack Query
- Do not store derived state — compute it from the source of truth (e.g., `filteredItems` from `items` + `filters`)
- Do not use `useState` for data that has a server source of truth — use TanStack Query
- Avoid using zustand for server data caching even with custom logic — TanStack Query handles deduplication, refetching, and cache invalidation

## Anti-Patterns
- Storing filtered/sorted data as separate zustand state — derive it from the source data and filter params
- Prop drilling beyond 3 levels without introducing zustand or composition
- Creating a zustand store for UI state that is only used by one component — use `useState`
- Using TanStack Query for data that never changes during the session — use zustand with static initial data instead
- Storing form input values in zustand — form state is local to the form instance via react-hook-form
- Using `useEffect` to synchronize state between two sources — lift state up or use derived state
- Over-using zustand for everything — not all state needs to be global

## Reusable Standards
- State categorization decision flow:
  1. Does the data come from the server? → TanStack Query cache (`useQuery`/`useMutation`)
  2. Can the data be encoded in the URL? → URL state (`useSearchParams` from react-router-dom v7)
  3. Is the data form input? → react-hook-form (`useForm` + `zodResolver`)
  4. Is the data shared across 3+ unrelated components? → zustand v5 (`create`)
  5. Does the data need to persist? → zustand `persist` middleware or `js-cookie`
  6. Otherwise → local state (`useState`/`useReducer`)
- TanStack Query v5 pattern: `useQuery({ queryKey, queryFn, staleTime: 1000 * 30, gcTime: 1000 * 60 * 5 })`
- URL state pattern: `const [searchParams, setSearchParams] = useSearchParams(); const page = Number(searchParams.get('page') ?? '1')`
- Zustand v5 store pattern:
  ```ts
  import { create } from 'zustand';
  import { devtools, persist } from 'zustand/middleware';
  interface TAuthStore { user: TUser | null; setUser: (user: TUser | null) => void; }
  export const useAuthStore = create<TAuthStore>()(devtools(persist((set) => ({ user: null, setUser: (user) => set({ user }) }), { name: 'auth-storage' })));
  ```
- Theme state: `import { useTheme } from 'next-themes'; const { theme, setTheme } = useTheme();` — no custom store required
- Persisted state pattern: zustand `persist` middleware for complex objects, `js-cookie` for simple auth tokens

## Scalability Principles
- The state architecture must support incremental migration — start with simple patterns, add complexity only when needed
- Zustand stores must be composable — use zustand v5's `create` at module level, import the hook where needed
- TanStack Query cache must support normalized cache structures for relational data if the application grows complex (via `queryClient.setQueryData`)
- URL state must be the default for any state that represents the user's current view — it enables deep linking, sharing, and back/forward navigation in the SPA
- State management decisions must be documented in ADRs when they deviate from the standard patterns
- The state architecture must support micro-frontend isolation — each micro-frontend manages its own state, with shared state flowing through a defined bridge (zustand cross-store subscriptions)
- New state patterns must be reviewed against the existing architecture — no new pattern without a clear justification
