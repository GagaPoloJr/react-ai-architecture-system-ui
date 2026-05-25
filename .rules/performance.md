# Performance Rules

## 1. Component Memoization
- `React.memo` — use ONLY when profiling proves a render saves measurable time. Do NOT wrap everything.
- `useMemo` — use for expensive computations (O(n²+) or array/object references passed to child memoized components). Do NOT use for trivial operations like `a + b`.
- `useCallback` — use ONLY when passing callbacks to memoized children or to hooks in dependency arrays. Otherwise, define functions directly in the component body.
- Measure before and after with React DevTools Profiler. If no improvement, revert.

## 2. Code Splitting & Lazy Loading
- Every route must use `React.lazy()`. No static imports for page-level components.
- Heavy non-route components (rich text editors, chart libraries, PDF viewers) must be lazy-loaded with `React.lazy` or `Loadable` at the point of use.
- Never split a component that is < 5 KB (gzipped) — the overhead of another network request outweighs the benefit.

## 3. Image Optimization
- All `<img>` tags must include `loading="lazy"` for below-the-fold images.
- Use `srcSet` and `sizes` for responsive images. Never serve a desktop-resolution image to mobile.
- Always specify explicit `width` and `height` to prevent Cumulative Layout Shift (CLS).
- Use modern formats (WebP, AVIF) with `<picture>` fallback.

## 4. Bundle Analysis
- Run `vite-bundle-visualizer` or `webpack-bundle-analyzer` before every major release.
- Investigate any single dependency > 20 KB gzipped before adding it. Prefer tree-shakeable libraries.
- Flag duplicates of the same library at different versions — deduplicate via `resolve.alias` or `overrides`.

## 5. Render Optimization
- Keep component state as low as possible. Prefer `useState` over `useReducer` unless state logic is complex.
- Lift state up only when necessary for sharing; otherwise keep it close to the UI that uses it.
- Use `React.Fragment` (or `<>`) instead of wrapper `<div>`s to avoid extra DOM nodes.
- Avoid inline object/array literals in JSX props passed to memoized children — extract to `useMemo` or module-level constants.

## 6. List Virtualization
- Any list exceeding **50 items** visible at once MUST use virtualization (`react-window`, `@tanstack/virtual`).
- Without virtualization, cap DOM nodes rendered at once to 500 max.
- Virtualized lists must have consistent item heights (fixed or measured) for scroll stability.

## 7. Debounce & Throttle
- Input searching/autocomplete: debounce at **300ms**.
- Window resize handler: debounce at **150ms**.
- Scroll position tracking: throttle at **100ms**.
- Save-on-type: debounce at **1000ms**.
- Use `lodash.debounce` / `lodash.throttle` or a custom hook (`useDebounce`); do NOT reimplement.

## 8. Font Loading
- Use `font-display: swap` on all `@font-face` declarations to prevent invisible text during load.
- Preload primary fonts via `<link rel="preload">` in `index.html`.
- Subset fonts to the Latin character set (or the required Unicode range) to reduce file size.

## 9. Core Web Vitals Targets
- LCP (Largest Contentful Paint): **≤ 2.5s**
- FID (First Input Delay) / INP (Interaction to Next Paint): **≤ 200ms** (INP for React apps)
- CLS (Cumulative Layout Shift): **≤ 0.1**
- TTI (Time to Interactive): **≤ 3.5s** on 3G Slow
- Use `web-vitals` library to report real-user metrics to monitoring.
