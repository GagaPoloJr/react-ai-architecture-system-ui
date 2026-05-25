# Release Readiness Checklist

## Run Pre-Release Commands
```bash
npm run test          # vitest, 0 failures
npm run lint           # eslint, clean
npm run typecheck      # tsc --noEmit, clean
npm run build          # tsc -b && vite build, clean
```

## Feature Completeness
- [ ] All acceptance criteria from feature specs are met
- [ ] No unfinished features behind feature flags without a removal plan
- [ ] Empty states, loading states (skeleton/animate-pulse), and error states all implemented
- [ ] Pagination/overflow boundaries handled in `@tanstack/react-table`
- [ ] Optimistic updates tested for all mutation flows

## Test Suite
- [ ] `npm run test` passes (0 failures)
- [ ] New features have unit + integration tests
- [ ] Hooks tested with `renderHook` + `QueryClientProvider`
- [ ] Zod schema tests for critical validation paths
- [ ] No flaky tests (run CI twice in a row)
- [ ] MSW handlers (if used) are up-to-date with API changes

## Accessibility Audit
- [ ] Keyboard navigation works for all interactive Radix primitives
- [ ] Focus management: modals trap focus, route changes reset focus
- [ ] `role="alert"` on dynamic error messages
- [ ] `aria-label` on icon-only buttons (lucide-react)
- [ ] Color contrast ratios meet WCAG AA (use Tailwind v4 default palette)
- [ ] Reduced motion respected: `motion-safe:` variants in Tailwind

## Performance Budget
| Metric | Budget |
|--------|--------|
| Lighthouse Performance score | >= 85 |
| Largest Contentful Paint (LCP) | <= 2.5s |
| First Input Delay (FID) | <= 100ms |
| Cumulative Layout Shift (CLS) | <= 0.1 |
| Time to Interactive (TTI) | <= 3.5s |
| Total bundle size (gzipped) | <= 250 KB |

- [ ] `placeholderData` from `@tanstack/react-query` prevents layout shifts
- [ ] Route-based code splitting via `lazy()` from `react-router-dom`
- [ ] Dynamic `import()` for heavy components (charts, PDF viewers)
- [ ] Measure with throttled CPU (4x slowdown)
- [ ] Measure on 3G network

## Bundle Analysis
```bash
npm install -D vite-bundle-analyzer
```
- [ ] `vite-bundle-analyzer` or `rollup-plugin-visualizer` output reviewed
- [ ] No large dependency added without justification
- [ ] Dynamic imports for heavy components (charts, PDF viewers, etc.)
- [ ] Tree-shaking verified: no `import *` from libraries (only named imports)
- [ ] `lucide-react` icons imported individually, not as full library

## i18n Coverage Check
- [ ] All user-facing strings use `useTranslation()` or `t()` function
- [ ] No hardcoded text in JSX except for accessibility labels
- [ ] New i18n keys added to `features/<name>/i18n/en.json`
- [ ] i18n namespace matches feature folder name
- [ ] `zod-i18n-map` configured for translated validation messages
- [ ] No missing keys warnings in console during E2E walkthrough

## Error Monitoring
- [ ] Error boundary at root (React ErrorBoundary wrapper)
- [ ] Per-feature error boundaries for critical sections
- [ ] Axios interceptor normalizes errors with `ApiError` type
- [ ] `sonner` toast for mutation errors
- [ ] API error tracking context: user, route, request params

## Dependency Audit
```bash
npm audit
npm outdated
```
- [ ] No critical vulnerabilities
- [ ] All packages at stable versions (React 19, TypeScript 5.9, Vite 7)
- [ ] No duplicate packages (check `npm ls`)

## Documentation
- [ ] Environment variables documented in `.env.example`
- [ ] API contract changes communicated to backend team
- [ ] Zod schema changes that affect API validation shared with backend
- [ ] New i18n keys communicated to content team

## Final Verification
- [ ] `npm run build` passes with 0 errors
- [ ] `npm run lint` is clean
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes
- [ ] Dev server starts and renders all routes without console errors
- [ ] Staging deployment smoke test passed
