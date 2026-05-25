# Implementation Plan

Complete reference for all engineering workflows, decision trees, checklists, and standards.

---

## 1. Project Initialization Workflow

### Framework Selection

| Criterion               | Choice               |
| ----------------------- | -------------------- |
| SPA, no SSR             | Vite 7 + React 19    |
| SSR/SSG, SEO            | Next.js (App Router) |
| Fullstack nested routes | Remix                |
| Mobile                  | Expo / React Native  |

### Setup Sequence

```
Step 1: Initialize project
  └── Vite: yarn create vite my-app --template react-ts

Step 2: Install core dependencies
  ├── Data fetching: @tanstack/react-query v5 + devtools
  ├── HTTP: axios v1
  ├── Forms: react-hook-form v7 + @hookform/resolvers/zod + zod v3
  ├── UI: tailwindcss v4 + @tailwindcss/vite + @radix-ui/* + class-variance-authority
  ├── State: zustand v5
  ├── Dates: date-fns v4
  ├── Icons: lucide-react
  ├── Notifications: sonner v2
  ├── i18n: i18next v24 + react-i18next v15
  ├── Theme: next-themes v0.4
  ├── SEO: react-helmet-async v2
  ├── Tables: @tanstack/react-table v8
  ├── Font: @fontsource-variable/inter

Step 3: Configure TypeScript
  ├── strict: true
  ├── noUncheckedIndexedAccess: true
  ├── verbatimModuleSyntax: true
  └── paths: @/* → ./src/*

Step 4: Set up tooling
  ├── ESLint v9 flat config (strict type-checked + React hooks)
  ├── Prettier + prettier-plugin-tailwindcss
  ├── Husky v9 (pre-commit hooks)
  └── lint-staged (format + lint on stage)

Step 5: Create directory structure
  ├── src/shared/{ui,lib,api,hooks,utils,types,config}
  ├── src/features/
  ├── src/pages/
  ├── src/routes/
  ├── src/layouts/
  └── src/stores/

Step 6: Configure Vite 7
  ├── @vitejs/plugin-react
  ├── @tailwindcss/vite (NOT PostCSS)
  ├── Path aliases (mirror tsconfig)
  ├── Proxy for API development
  └── Build optimization (manualChunks)

Step 7: Set up CI/CD
  ├── Lint → Type check → Test → Build
  ├── Parallel job execution
  └── Bundle analysis
```

---

## 2. Feature Planning Workflow

### Step-by-Step

```
1. Define Requirements
   ├── 1-2 sentence feature summary
   ├── Acceptance criteria (Given/When/Then)
   ├── Happy path + 2-3 edge cases
   └── Target route/URL

2. Identify Dependencies
   ├── Auth roles required?
   ├── Existing shared components usable?
   ├── New API endpoints needed?
   └── New packages needed?

3. Plan Component Tree
   ├── Page component (data orchestration)
   ├── Container components (layout, composition)
   └── Presentational components (pure, no data deps)

4. Plan Data Flow
   ├── User Action → Handler → Mutation → API → Cache → UI
   ├── Loading / empty / error states for every screen
   └── Optimistic updates appropriate?

5. Plan API Integration
   ├── Endpoints, methods, hooks, cache keys
   └── Error shapes and handling strategy

6. Apply State Decision Tree
   ├── Server data → useQuery
   ├── Form state → react-hook-form
   ├── UI state → useState
   ├── Shared state → zustand
   └── URL state → useSearchParams

7. Identify Edge Cases
   ├── Empty state, error state, loading state
   ├── Race conditions, stale responses
   ├── Permission denied
   └── Pagination boundary
```

---

## 3. Feature Scaffolding Rules

### Directory Structure

Every feature must follow this exact layout:

```
features/{feature-name}/
├── api/
│   └── index.ts
├── components/
│   └── index.ts
├── hooks/
│   └── index.ts
├── types/
│   └── index.ts
├── schemas/
│   └── index.ts
└── index.ts
```

### Scaffold Checklist

- [ ] Directory created with kebab-case name
- [ ] All 6 subdirectories exist
- [ ] Barrel exports in every directory
- [ ] Public barrel (feature/index.ts) exports only intended API
- [ ] Type stubs match backend contract
- [ ] API stubs use axios client
- [ ] Hook stubs use proper query keys with @tanstack/react-query v5
- [ ] No nested subdirectories beyond 1 level
- [ ] Feature does NOT import from other features

### Barrel Export Pattern

```ts
// features/{feature}/types/index.ts
export type { Entity, EntityFilters } from './entity';

// features/{feature}/api/index.ts
export { entityApi } from './entity-api';
export type { EntityResponse } from './entity-api';

// features/{feature}/hooks/index.ts
export { useEntities } from './use-entities';
export { useCreateEntity } from './use-create-entity';

// features/{feature}/components/index.ts
export { default as EntityList } from './EntityList';

// features/{feature}/index.ts
export { useEntities, useCreateEntity } from './hooks';
export type { Entity, EntityFilters } from './types';
```

---

## 4. Shared Component Extraction Rules

### The 3-Use Rule

A component, hook, or utility must be used in **3+ features** before extraction to shared.

**Exceptions:**

- Base UI primitives (Button, Input, Modal, Select — built with Radix + CVA)
- Layout components (PageHeader, Sidebar)
- Auth/guard components (RequireAuth, RequireRole)

### Extraction Process

```
1. Identify duplication — grep for usages, verify identical semantics
2. Design shared interface — add variant/size props to absorb differences
3. Move to shared/ — copy file, update barrel exports
4. Update imports — point all consumers to shared location
5. Verify no feature coupling — must not import from any feature/
6. Delete original — no dead stub files
```

### Verification Checklist

- [ ] Used in 3+ features (or is a base primitive)
- [ ] Props interface designed for reuse
- [ ] No feature imports in component
- [ ] All feature-specific logic removed
- [ ] Barrel exports updated everywhere
- [ ] Old files deleted
- [ ] All consuming features updated

---

## 5. API Integration Workflow

### Step-by-Step

```
1. Define API Types
   ├── Match backend response shape exactly
   ├── Use zod for runtime validation (critical data)
   └── Co-locate in features/{feature}/api/

2. Create Service Module (axios)
   ├── Thin wrapper around axios client
   ├── Parse response, throw typed errors
   └── No hooks — pure data access only

3. Create Query Hook (@tanstack/react-query v5)
   ├── Use structured query keys factory
   ├── Set staleTime, gcTime per data frequency
   ├── Use select to unwrap response
   └── Handle loading/error states

4. Create Mutation Hook
   ├── onSuccess: invalidate related queries
   ├── onError: sonner toast or form field errors
   └── onMutate: optimistic updates (when appropriate)

5. Handle Loading States
   ├── isLoading + !data → skeleton
   └── isFetching → subtle background indicator

6. Handle Error States
   ├── Network errors → retry button + toast
   ├── 401 → redirect login
   ├── 403 → access denied UI
   ├── 422 → field-level validation errors
   └── 5xx → generic error banner

7. Test Integration
   ├── Unit test service layer with MSW
   ├── Test hook behavior with renderHook + QueryClientProvider
   ├── Test error/loading states
   └── E2E test full flow
```

### Error Handling Flow

```ts
// On mutation error
onError: (error: AppError) => {
  if (error.details) {
    // Map API validation errors to form fields
    Object.entries(error.details).forEach(([field, messages]) => {
      form.setError(field as keyof FormData, { message: messages[0] });
    });
  } else {
    toast.error(error.message); // sonner
  }
};
```

---

## 6. State Management Decision Tree

### Decision Flow

```
Where should this state live?
├── Is it fetched from or synced with a server?
│   ├── YES → SERVER STATE → TanStack Query v5
│   │   └── Use useQuery / useMutation
│   └── NO → Is it visible in the URL?
│       ├── YES → URL STATE → useSearchParams / useParams
│       └── NO → Is it form input?
│           ├── YES → FORM STATE → react-hook-form v7 + zod v3
│           └── NO → Is it used by 2+ unrelated components?
│               ├── YES → CLIENT STATE → zustand v5
│               └── NO → LOCAL STATE → useState / useReducer
```

### Rules

| Question                      | Tool                         |
| ----------------------------- | ---------------------------- |
| Comes from server API?        | TanStack Query v5            |
| Relevant to URL navigation?   | useSearchParams / useParams  |
| Form input?                   | react-hook-form v7           |
| Toggle, open/close, selected? | useState                     |
| Shared across routes?         | zustand v5                   |
| Survives refresh?             | zustand + persist middleware |
| Derived from other state?     | useMemo / selector           |
| Theme?                        | next-themes (useTheme)       |

### Anti-Patterns

- Storing server data in zustand (use TanStack Query cache)
- Storing URL params in useState (breaks navigation)
- Storing form state in zustand (use react-hook-form)
- Duplicating state in store + query cache
- Using context for frequently-updating state (use zustand)

---

## 7. Validation Checklist

### Schema-First Approach

- [ ] Zod schemas are the single source of truth for data shapes
- [ ] Form types inferred via `z.infer<typeof schema>`
- [ ] API responses validated at boundary (axios interceptor)
- [ ] Error messages from translation files, not hardcoded
- [ ] Custom validation messages use i18n keys

### Schema Location

| Scope            | Location                                |
| ---------------- | --------------------------------------- |
| Shared domain    | `shared/schemas/{entity}.ts`            |
| Feature-specific | `features/{feature}/schemas/`           |
| API contract     | Co-located in `features/{feature}/api/` |
| Form only        | Same file as form component             |

---

## 8. Accessibility Checklist

### WCAG 2.1 AA Compliance

- [ ] All interactive elements focusable and keyboard-operable
- [ ] Custom components have appropriate ARIA roles/states/properties
- [ ] Every form input has an associated `<label>`
- [ ] Images have descriptive `alt` text (decorative: `alt=""`)
- [ ] Focus indicators have minimum 2:1 contrast ratio
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Color is not the only means of conveying information
- [ ] Modal dialogs trap focus, have `role="dialog"`, `aria-modal`
- [ ] Error messages linked via `aria-describedby`
- [ ] Live region updates use `aria-live`
- [ ] Touch targets >= 44x44px
- [ ] `prefers-reduced-motion` respected

### Automated Checks

- [ ] axe-core in CI
- [ ] Lighthouse accessibility score >= 90
- [ ] Color contrast audit

---

## 9. Performance Checklist

### Core Web Vitals

| Metric    | Target            |
| --------- | ----------------- |
| LCP       | <= 2.5s           |
| FID / INP | <= 200ms          |
| CLS       | <= 0.1            |
| TTI       | <= 3.5s (3G Slow) |

### Bundle Budgets

| Asset                       | Limit     |
| --------------------------- | --------- |
| Initial JS (gzipped)        | <= 200 KB |
| Single page chunk (gzipped) | <= 100 KB |
| Images (average)            | <= 100 KB |

### Optimization Checklist

- [ ] Every route lazy-loaded via React.lazy with react-router-dom
- [ ] Heavy components (charts, PDF viewers) lazy-loaded
- [ ] Images have explicit width/height and `loading="lazy"`
- [ ] Images use modern formats (WebP/AVIF) with `<picture>` fallback
- [ ] Lists > 50 items use virtualization
- [ ] `React.memo` only where profiling confirms benefit
- [ ] `useMemo` / `useCallback` with complete dependency arrays
- [ ] Context values memoized
- [ ] No inline function/object literals in JSX (passed to memoized children)
- [ ] No `useEffect` chains causing sequential re-renders
- [ ] Bundle analysis run before major releases
- [ ] Debounce thresholds: search 300ms, resize 150ms, scroll 100ms

---

## 10. Refactor Triggers

### Automatic Extraction

- Same logic in **3+ places** → extract to shared/
- Component > **300 lines** → split into sub-components
- File > **500 lines** → split into modules
- Props > **6 props** or > **3 levels of prop drilling** → context or composition
- Duplicate type definitions → extract to shared/types/

### Migration Patterns

```
Large component:
├── Identify distinct responsibilities
├── Extract child component
├── Thread props (or context if 3+ levels)
└── Verify composition

Duplicated logic:
├── Identify 3+ occurrences
├── Extract to function/hook/component
├── Update all call sites
├── Verify tests pass
└── Delete original code
```

### Refactoring Rules

- Pure structural changes only — no feature work mixed in
- Run full test suite before and after
- Max 3 files per refactoring PR (unless mechanical)
- Deprecation cycles for public API changes
- Linting and type-checking pass at every commit

---

## 11. Architecture Review Checklist

### Structural Review

- [ ] Feature isolation: no cross-feature imports
- [ ] Layer rules: shared doesn't import features
- [ ] Dependency direction: unidirectional (pages → features → shared)
- [ ] No circular dependencies (verified by tooling)
- [ ] Barrel exports are complete and minimal
- [ ] New components in correct layer (atom vs molecule vs organism vs feature)
- [ ] Feature follows canonical directory structure

### Quality Review

- [ ] Consistent naming: PascalCase components, camelCase hooks/utils, kebab-case files
- [ ] One component per file
- [ ] File size within limits (300 lines components, 500 lines other)
- [ ] Props typed, no `any`
- [ ] Loading / empty / error states present
- [ ] Form validation using zod schemas
- [ ] API calls through feature API module (not inline)

---

## 12. Code Review Standards

### Architecture & Organization

- [ ] Follows feature isolation rules
- [ ] Component in correct layer
- [ ] Barrel exports correct and complete
- [ ] No circular imports
- [ ] Consistent naming conventions (kebab-case files, PascalCase components)

### Performance

- [ ] No unnecessary `useEffect` (use `useMemo` or derived state)
- [ ] No `useState` for server data (should be TanStack Query)
- [ ] Lists have stable `key` props (not index)
- [ ] Large lists virtualized
- [ ] Images optimized (width, height, lazy loading)

### Accessibility

- [ ] Interactive elements have proper ARIA attributes (Radix handles most)
- [ ] Forms have labels via htmlFor/id
- [ ] Color is not the only state indicator
- [ ] Focus management in modals (Radix handles)
- [ ] Alt text on non-decorative images

### Type Safety

- [ ] No `any` or `as` casts
- [ ] API responses typed (not `unknown`)
- [ ] Strict null checks respected
- [ ] Return types explicit on public functions

### Error Handling

- [ ] Every `useQuery` has loading/error UI
- [ ] Every `useMutation` has `onError` (sonner toast or form errors)
- [ ] Network errors shown to user (not console.log)
- [ ] Form validation errors per-field

### PR Standards

- [ ] Description: what changed, why, how to test
- [ ] Under 400 lines of code change
- [ ] Self-reviewed before requesting
- [ ] At least 1 approval required

---

## 13. AI Collaboration Workflow

### Agent Mapping

| Task                 | Agent                  |
| -------------------- | ---------------------- |
| System design        | frontend-architect     |
| Feature scaffolding  | feature-generator      |
| Component building   | ui-engineer            |
| API integration      | api-integrator         |
| State decisions      | state-manager          |
| Form building        | form-engineer          |
| Performance review   | performance-reviewer   |
| Accessibility review | accessibility-reviewer |
| Code refactoring     | refactor-engineer      |
| Animation            | animation-engineer     |

### Prompt Structure

```
1. Load the relevant .agent/{name}.md file
2. Load relevant .docs/{topic}.md files
3. Describe the task with specific context
4. Reference templates from .templates/ if applicable
5. Request output following conventions
```

### Validation After AI Output

- [ ] Files in correct directories
- [ ] No cross-feature imports
- [ ] Correct naming conventions (kebab-case files)
- [ ] Proper exports (named, not default for types)
- [ ] Import order correct
- [ ] Rules respected (feature isolation, reusability, scalability)

---

## 14. Release Readiness Checklist

### Feature Completeness

- [ ] All acceptance criteria met
- [ ] No unfinished features behind flags without removal plan
- [ ] Deprecated code paths flagged or removed
- [ ] Empty, loading, and error states implemented
- [ ] Pagination/overflow boundaries handled

### Test Suite

- [ ] All tests pass
- [ ] New features have unit + integration tests
- [ ] E2E tests pass for critical journeys
- [ ] MSW handlers up-to-date

### Performance

- [ ] Lighthouse Performance >= 85
- [ ] LCP <= 2.5s, CLS <= 0.1, INP <= 200ms
- [ ] Bundle size within budget
- [ ] Dynamic imports for heavy components

### Accessibility

- [ ] Lighthouse Accessibility >= 90
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion respected

### Error Monitoring

- [ ] Error boundaries at root and per-page
- [ ] API error tracking
- [ ] Source maps uploaded

### Documentation

- [ ] README updated if setup changed
- [ ] .env.example updated
- [ ] API changes communicated
- [ ] Migration guide if breaking changes

---

## 15. Scaling Strategy

| Stage | Architecture                   | Team       | Key Focus                              |
| ----- | ------------------------------ | ---------- | -------------------------------------- |
| 1     | Single app, single package     | 2-4 devs   | Convention enforcement                 |
| 2     | Single app, feature boundaries | 5-10 devs  | Feature isolation, code owners         |
| 3     | Multi-app monorepo             | 10-20 devs | Shared packages, platform team         |
| 4     | Micro-frontends                | 20+ devs   | Module federation, independent deploys |

### Early (1-2 developers)

- Use the full architecture but stay flexible
- Shared/ is your accelerator — build UI primitives early (Radix + CVA)
- Skip formal ADRs; use conventions verbally

### Growth (3-5 developers)

- Enforce feature isolation strictly
- Start code review checklists
- Document ADRs for architecture changes
- Assign feature ownership

### Scale (5+ developers)

- Platform team owns shared/, tooling, CI
- Feature teams own feature modules
- Regular architecture audits
- Automated convention enforcement

---

## 16. Technical Debt Management

### Debt Categorization

| Priority | Definition                   | Action               |
| -------- | ---------------------------- | -------------------- |
| P0       | Blocking development         | Fix immediately      |
| P1       | Significant drag on velocity | Schedule next sprint |
| P2       | Minor inconsistency          | Track in backlog     |

### Budget

- 20% of each sprint allocated to debt reduction
- Quarterly architecture audit
- Debt quantified as estimated hours to fix

### Common Debt Triggers

- Cross-feature import → Extract to shared/
- 500+ line component → Split
- Duplicated types → Extract to shared/types/
- Inline API calls → Extract to feature api/ + hooks/
- Missing error states → Add error boundaries
- No loading UI → Add skeleton/loading states

---

## 17. Feature Lifecycle Standards

### Creation

```
1. Plan
2. Scaffold
3. Implement types + schemas (zod)
4. Implement API layer (axios + TanStack Query)
5. Implement components
6. Wire into pages/routes (react-router-dom v7)
7. Test
```

### Maintenance

- Feature ownership assigned
- Dependencies tracked (renew/remove stale deps)
- Tests updated with changes
- Documentation kept current

### Deprecation

```
1. Mark feature as deprecated in code/documentation
2. Add deprecation warnings for consumers
3. Keep backward compatibility for 1 release cycle
4. Remove feature in next major release
5. Delete feature directory and barrel exports
6. Remove any cross-references
```

### Cleanup Checklist

- [ ] Feature directory deleted
- [ ] All imports to feature removed
- [ ] Barrel exports removed from route modules
- [ ] Route config cleaned up
- [ ] Feature flags removed
- [ ] Translation keys removed
- [ ] Tests removed or updated
- [ ] Documentation updated
