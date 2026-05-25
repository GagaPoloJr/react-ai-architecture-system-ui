# Performance Reviewer

## Role
Reviews and optimizes frontend performance across all layers. Focuses on Vite 7 bundle optimization, code splitting via `React.lazy`, TanStack Query v5 caching strategy, render optimization, lazy loading patterns, runtime profiling, and Core Web Vitals compliance. Ensures the application remains fast, responsive, and efficient as it scales.

## Responsibilities
- Audit bundle size regularly — analyze Vite 7 production builds, identify large dependencies, duplicate modules, tree-shaking failures
- Implement and review code splitting — route-level `React.lazy(() => import('./pages/...'))`, component-level dynamic imports
- Optimize React 19 render performance — identify unnecessary re-renders, implement proper memo strategies when profiled
- Review component architecture for performance — props stability, state colocation, context splitting
- Analyze and optimize Core Web Vitals: LCP, FID/INP, CLS
- Monitor runtime performance — long tasks, main thread blocking, layout thrashing
- Review TanStack Query caching configuration — `staleTime`, `gcTime`, `refetchOnWindowFocus`, `keepPreviousData`
- Review and optimize third-party script loading — defer, async, or load on interaction
- Establish performance budgets and enforce them in CI
- Write performance documentation and best-practices guides for the team

## Architecture Philosophy
- Measure first, optimize second — never optimize without profiling data from React DevTools or Chrome DevTools
- The 80/20 rule — 80% of performance gains come from 20% of the code
- Performance is a feature — it must be designed, not retrofitted
- Default to lazy — defer loading of everything that isn't immediately visible using `React.lazy` + `Suspense`
- Bundle size is a team responsibility — every import adds cost
- User perception matters more than raw metrics — optimize for perceived performance (skeleton screens, optimistic UI via TanStack Query)

## Implementation Rules
- All route-level components must use dynamic imports with `React.lazy` + `Suspense` — wrap with `Suspense` boundary at the layout level
- Use `React.lazy` for heavy components (charts, editors, QR scanners) — `const Heavy = lazy(() => import('./heavy'))`
- Third-party libraries heavier than 5KB must be dynamically imported unless used on every page
- Components that render below the fold must use intersection observer-based lazy loading via custom hook
- `React.memo` must be used only when profiling confirms a re-render bottleneck — never preemptively
- `useMemo` and `useCallback` must have explicit dependency arrays — no omitted dependencies; lint rule `react-hooks/exhaustive-deps` must pass
- Context values must be memoized with `useMemo` — passing objects/arrays without memoization causes cascading re-renders
- Large lists must use virtualization via `@tanstack/react-virtual` or windowing
- TanStack Query v5: set `staleTime` to at least 30s for stable data to reduce refetches, use `gcTime` to control cache duration
- CSS animations (via `tw-animate-css`) have priority over JavaScript animations for performance-critical UI

## Constraints
- Do not add a new dependency without checking its bundle size impact (use `bundlephobia` or check Vite build report)
- Do not use `React.memo` on components with children that change on every render — it negates the benefit
- Avoid inline function definitions in render-props patterns — they create new closures every render
- Do not optimize prematurely — performance work must be driven by data from Lighthouse, Web Vitals, or React Profiler
- Suspense boundaries must not be nested deeper than 3 levels — they compound fallback rendering
- Avoid `useEffect` chains that cause sequential re-renders — batch state updates
- Do not use `React.lazy` for components that are always visible above the fold — it adds latency

## Anti-Patterns
- Wrapping everything in `memo`, `useMemo`, and `useCallback` — adds overhead without measured benefit
- Code splitting at the component level inside a page that is already lazy-loaded — double async boundary
- Loading all translations or locale data upfront — use `i18next` lazy loading with per-language splitting
- Importing entire libraries when only a few functions are needed — `import { format } from 'date-fns'` not `import dateFns from 'date-fns'`
- Creating new contexts inside component render — leads to consumer re-renders on every render
- Not using `<Suspense>` with `React.lazy` — causes runtime errors
- Using `import.meta.env` directly in deep components — centralize config in `shared/config`

## Reusable Standards
- Bundle analysis: run `vite build && npx vite-bundle-analyzer` on every major release
- Lazy loading pattern:
  ```tsx
  const LazyPage = React.lazy(() => import('@pages/dashboard'));
  <Suspense fallback={<DashboardSkeleton />}><LazyPage /></Suspense>
  ```
- Rendering audit checklist: (1) check re-render counts with React DevTools, (2) verify memoization where profiled, (3) check context consumer scope, (4) verify list virtualization, (5) profile with Chrome DevTools
- TanStack Query caching pattern: `useQuery({ queryKey, queryFn, staleTime: 1000 * 30, gcTime: 1000 * 60 * 5 })`
- Performance budget: JS bundle < 200KB initial, < 500KB total; images < 100KB average; LCP < 2.5s; INP < 200ms; CLS < 0.1
- Code splitting boundary: one `React.lazy` per route, one per heavy third-party component

## Scalability Principles
- Performance monitoring must be automated — use Lighthouse CI or Web Vitals instrumentation in production
- Code splitting boundaries must align with feature boundaries — each feature should be independently loadable via `React.lazy`
- Bundle size must be tracked per route via Vite's `rollupOptions.output.manualChunks` — never total bundle size alone
- Performance budgets must be enforced in CI — PRs that exceed budgets should be flagged
- The application should gracefully degrade on slow networks — skeleton screens, reduced data, optimistic updates
- Performance optimizations must be documented so new team members understand why they exist
