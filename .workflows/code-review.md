# Code Review Standards

## Architecture & Organization
- [ ] Does the change follow feature isolation rules? (no `@/features/*` → another `@/features/*`)
- [ ] Is the component in the correct layer? (`pages/` vs `components/` vs `@/components/ui/`)
- [ ] Are barrel exports correct and minimal? (only public API)
- [ ] No circular imports (check with `npx madge --circular src/`)
- [ ] Consistent naming: `kebab-case.ts` for files, `PascalCase.tsx` for components, `camelCase` for hooks/fns
- [ ] Feature barrel at root `index.ts` only exports what external features may consume

## TanStack Query v5 Patterns
- [ ] `useQuery` is used for all server data — no manual fetch in `useEffect`
- [ ] `queryKeys` factory used, not inline string arrays
- [ ] `placeholderData: (prev) => prev` for smooth transitions instead of loading spinner on refetch
- [ ] `useMutation.onError` handler present — shows sonner toast with `ApiError.message`
- [ ] `useMutation.onSuccess` invalidates relevant queries via `queryClient.invalidateQueries`
- [ ] `gcTime` used instead of old `cacheTime` (v5 rename)
- [ ] `staleTime` set appropriately per query (not all at default 0)
- [ ] `enabled` condition used for dependent queries
- [ ] No `useQuery` inside `useEffect`

## Zustand v5 Usage
- [ ] Created with `create<T>()()` curried syntax (not `create<T>(...)`)
- [ ] Devtools middleware used in development: `devtools(...)`
- [ ] Persist middleware used only when state must survive refresh: `persist(store, { name: 'key' })`
- [ ] Selectors used at component level to avoid full-store re-renders
- [ ] No server data stored in zustand (should be react-query)
- [ ] No form state in zustand (should be react-hook-form)
- [ ] Stores are flat and domain-specific

## React Hook Form + Zod
- [ ] `useForm` uses `zodResolver` from `@hookform/resolvers/zod`
- [ ] Zod schemas are defined in `types/schemas.ts` per feature
- [ ] `z.infer<typeof schema>` used for TypeScript types
- [ ] `setError` used for server-side validation errors (422 responses)
- [ ] Fields use `aria-invalid` or Radix field error components
- [ ] i18n validation messages via `zod-i18n-map`

## CVA Variant Design
- [ ] `cva()` from `class-variance-authority` used for multi-variant components
- [ ] Variants cover all visual differences (no inline conditional classes)
- [ ] `cn()` from `tailwind-merge` used to merge `className` props
- [ ] `VariantProps<typeof variants>` exported for consumer type safety
- [ ] Default variants defined in `defaultVariants`
- [ ] No hardcoded color/size classes outside of CVA definition

## Tailwind CSS v4 Usage
- [ ] No `tailwind.config` — Tailwind v4 CSS-first, all config in CSS
- [ ] Custom values use `@theme` directive in CSS, not `extend` in config
- [ ] No `@apply` in component files (use CVA instead)
- [ ] `tw-animate-css` classes used for animations (`animate-in`, `fade-in`, `slide-in`)
- [ ] `dark:` variants used for dark mode (powered by `next-themes`)

## i18n Usage
- [ ] All user-facing strings use `useTranslation()` — no hardcoded text
- [ ] Namespace per feature: `t('feature.key')` following feature namespace convention
- [ ] i18n keys are in `features/<name>/i18n/en.json`
- [ ] Dynamic values use `t('key', { count, name })` interpolation, not string concatenation

## Radix UI Primitives
- [ ] Dialog/Modal uses `<Dialog.Root>` + `<Dialog.Portal>` + `<Dialog.Overlay>` + `<Dialog.Content>`
- [ ] Form fields use `<Label>` from `@radix-ui/react-label` with `htmlFor`
- [ ] Select uses `<Select.Root>` + `<Select.Trigger>` + `<Select.Content>` + `<Select.Item>`
- [ ] Interactive elements have proper `aria-*` attributes (handled by Radix)
- [ ] Focus trapping handled by Radix primitives, not custom code

## No React.FC
- [ ] No `React.FC` or `React.FunctionComponent` type — use regular functions
```ts
// GOOD
export function MyComponent({ prop1, prop2 }: Props) { ... }

// BAD
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => { ... }
```

## Performance
- [ ] No `useState` for derived data — use `useMemo` instead
- [ ] No inline function/object in JSX props (unless wrapping in `useCallback`)
- [ ] Lists have stable `key` props (never `index`)
- [ ] Large lists use `@tanstack/react-table` with pagination
- [ ] Images have explicit `width`/`height`, `loading="lazy"`

## Accessibility
- [ ] Interactive elements use Radix primitives (handle ARIA automatically)
- [ ] Forms have labels associated via `htmlFor`/`id`
- [ ] Color is not the only indicator of state (use icons + text)
- [ ] `role="alert"` on error messages
- [ ] Alt text on all non-decorative `lucide-react` icons (use `aria-label`)

## Error Handling
- [ ] Every `useQuery` has loading and error state handled in UI
- [ ] Every `useMutation` has `onError` handler with sonner toast
- [ ] Network errors are caught by axios interceptor and normalized
- [ ] Form validation errors shown per-field via RHF `fieldState.error`

## Type Safety
- [ ] No `any` or type casts (`as`) — document with eslint-disable if unavoidable
- [ ] API responses have proper types, not `unknown`
- [ ] `noUncheckedIndexedAccess` respected (safely access arrays/objects)
- [ ] Zod schemas match API response types exactly

## Test Coverage
- [ ] Hooks tested with `renderHook` + `QueryClientProvider` wrapper
- [ ] Error states are tested
- [ ] No snapshot tests (prefer assertion-based)
- [ ] E2E tests for critical user journeys (if Playwright configured)
