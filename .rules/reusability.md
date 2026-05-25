# Reusability Rules

## 1. Extraction Thresholds
- **3+ uses**: Extract to `@/shared/ui/` for components, `@/shared/lib/` for utilities.
- **2 uses, architecturally significant**: Extraction allowed without waiting for a third occurrence. "Architecturally significant" means the abstraction is required by system constraints (auth boundary, data layer contract).
- **1 use**: Keep local until another consumer emerges. Resist the urge to over-abstract.

## 2. Shared Component API Design
- All shared components MUST be **controlled** by default. Accept `value` + `onChange` props.
- **Uncontrolled** variants are acceptable only when provided alongside controlled (via `defaultValue`) and clearly documented.
- Props must use explicit TypeScript types; never `any` or `Record<string, any>`.
- Use `React.ComponentPropsWithoutRef<'div'>` for HTML attribute extension when needed, but whitelist only relevant props.

## 3. Hook Design
- Hooks must return named objects (not arrays) for clarity: `const { data, loading, error } = useQuery(...)`.
- Parameters must be a single options object (not positional arguments) when there are > 2 params.
- All hooks must be pure with respect to their inputs — same args produce same outputs in the same context.
- Hooks must never call other hooks conditionally (standard Rules of Hooks apply).
- Prefix with `use` and suffix with the domain concern: `useAuth`, `usePagination`, `useDebouncedValue`.

## 4. Utility Function Purity
- Every exported utility function in `@/shared/lib/` must be **pure** (deterministic, no side effects).
- Side-effectful operations (I/O, mutations, navigation) must be explicit in the function name: `saveToStorage`, `navigateTo`, `logEvent`.
- Utility functions must have **zero runtime dependencies** on React or framework-specific APIs. Framework adapters belong in `@/shared/lib/` with an `-adapter` suffix (e.g., `storage-adapter.ts`).

## 5. Generic Patterns
- Prefer **composition** over configuration. A Button with 20 boolean props is worse than a `Button` + `IconButton` + `LinkButton` trio.
- When a component needs more than 6 props, consider whether it should be split into smaller components.
- Render-props and slot patterns (`children`, `renderHeader`) are preferred over deeply nested config objects.

## 6. Composition Over Configuration
- Write components that compose via `children` and named slots, not giant `config` prop objects.
- Example: prefer `<Card><Card.Header>...</Card.Header><Card.Body>...</Card.Body></Card>` over `<Card config={{ header: ..., body: ... }} />`.
- Config-driven components are acceptable ONLY when the configuration is data-driven (e.g., a form generated from a JSON schema).

## 7. API Client Reusability
- All API calls must go through a centralized `@/shared/api/` client configured with base URL, auth interceptors, and error handling.
- Individual features must NOT create their own `fetch` or `axios` instances.
- The API client must expose typed request/response types for every endpoint.
