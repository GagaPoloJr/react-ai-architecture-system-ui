# Scaling Guide

Strategic guidance for scaling this architecture as your application, team, and requirements grow.

## 1. When to Extract Features to Packages

### Thresholds

| Factor | Keep in Monolith | Extract to Package |
|--------|-----------------|-------------------|
| Feature maturity | < 6 months stable | > 6 months stable |
| Feature ownership | Single team | Dedicated team |
| Feature releases | Same release cycle | Independent release cycle |
| Cross-feature coupling | High | Low |
| Bundle size | < 200 KB total | Feature chunk > 100 KB |
| Test suite | < 10s per feature test | > 30s per feature test |

### Extraction Strategy

```
# Phase 1: Internal extraction
src/features/checkout/
→ packages/feature-checkout/   # (still in monorepo, but isolated)

# Phase 2: Package refinement
packages/feature-checkout/
→ Add README, package.json, tsconfig, test suite, CI pipeline

# Phase 3: Independent versioning
packages/feature-checkout/
→ npm publish @scope/feature-checkout
→ Import via package.json dependency
```

### Monorepo Package Layout

```
packages/
├── ui/                 # Shared UI component library
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── lib/                # Pure utility library
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── api-client/         # API client (shared across apps)
├── config/             # Shared ESLint, TypeScript, Prettier configs
└── feature-{name}/     # Extracted feature packages
```

### Migration Pattern

```
1. Copy feature code to packages/feature-{name}/
2. Add package.json with proper dependencies
3. Update imports in src/ to point to the package
4. Verify build: tsc + vite build pass
5. Add CI pipeline for the package
6. Remove original feature code from src/
```

## 2. When to Split Monolith into Micro-Frontends

### Decision Criteria

**Split when 3+ of these are true:**

- Team count > 5 teams working on the same frontend
- Deployment frequency per team differs (daily vs weekly)
- Route domains are independent (checkout vs admin vs public)
- Build time exceeds 5 minutes
- Single-team ownership boundaries are clear
- Different tech requirements exist (one team needs WebGL, another needs forms)

### Recommended approach: Module Federation

```
Host App (shell)
├── Auth Module (remote)
├── Dashboard Module (remote)
├── Reports Module (remote)
└── Shared Component Library (package)
```

### Module Federation with Vite 7

```ts
// host/vite.config.ts
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        dashboard: 'http://dashboard-app/assets/remoteEntry.js',
        reports: 'http://reports-app/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', '@tanstack/react-query', 'zustand'],
    }),
  ],
})
```

### Shared State Across Micro-Frontends

| Approach | Use Case |
|----------|----------|
| URL state (search params) | Navigation, filters, pagination |
| Cross-frame events (postMessage) | Auth state, notifications |
| Shared zustand store (via package) | Cross-cutting UI state |
| API gateway with session | Server-driven state sharing |

### Anti-Patterns for Micro-Frontends

- Splitting before reaching the threshold — adds overhead without benefit
- Shared component duplication — use a shared library package
- Tight coupling between remotes — each remote should be independently deployable
- Shared global state — each remote manages its own state; share via events or URL

## 3. When to Add More Layers

### Current Layer System

```
shared/ → features/ → layouts/ → pages/ → routes/
```

### When to Add an App Layer

**Add `apps/` when deploying multiple applications from the same codebase:**

```
apps/
├── officer-portal/    # Main app — imports features A, B, C
├── admin-portal/      # Admin app — imports features A, D, E
└── public-portal/     # Public app — imports features F, G
```

Each app is an entry point that imports features and configures routing, theming, and layouts.

### When to Add a Service Layer

**Add a service layer when business logic becomes complex enough to warrant its own abstraction:**

```
features/orders/
├── api/                    # HTTP calls
├── services/               # Business logic (pure domain operations)
│   ├── order-calculator.ts # Pricing, discounts, tax
│   ├── order-validator.ts  # Complex validation rules
│   └── order-orchestrator.ts # Multi-step order processing
├── components/
├── hooks/
└── types/
```

Services are pure TypeScript modules with no React dependency. They operate on domain types and return domain results. This makes them independently testable.

### When to Add a Gateway Layer

**Add a gateway layer between API and hooks when:**

- Multiple API calls need to be composed (parallel or sequential)
- Response transformation is complex
- Caching strategy differs from default TanStack Query
- API versioning needs to be abstracted

```ts
// features/orders/gateway/order-gateway.ts
export class OrderGateway {
  async getDashboardData(officerId: string) {
    const [stats, recentOrders, notifications] = await Promise.all([
      this.statsApi.get(officerId),
      this.ordersApi.list({ officerId, limit: 5 }),
      this.notificationsApi.list({ officerId, limit: 3 }),
    ])
    return { stats, recentOrders, notifications }
  }
}
```

## 4. When to Add Build Optimization

### Optimization Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Build time | > 3 minutes | TypeScript project references, esbuild minification |
| Dev server start | > 10 seconds | Module graph optimization, lazy compilation |
| Initial bundle | > 200 KB gzipped | Route-level code splitting, dependency audit |
| Single page chunk | > 100 KB gzipped | Component-level lazy loading |
| TypeScript check | > 30 seconds | Project references, incremental builds |
| Test suite | > 2 minutes | Test splitting, parallel execution |

### Build Optimization Toolkit

| Tool | Purpose |
|------|---------|
| Vite 7 | Fast dev server, esbuild transpilation, @vitejs/plugin-react |
| TypeScript project references | Incremental type checking |
| Rollup (via Vite) | Tree-shaking, code splitting |
| vite-bundle-analyzer | Bundle visualization |
| @tanstack/react-query-devtools | Dev-only query debugging |

### Recommended Config

```ts
// vite.config.ts — optimization for scale
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
          ],
        },
      },
    },
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
  },
})
```

### Code Splitting with react-router-dom v7

Use `React.lazy` with `createBrowserRouter`:

```tsx
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const DashboardPage = lazy(() => import('@pages/dashboard-page'))
const UsersPage = lazy(() => import('@pages/users-page'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
])
```

### TanStack Query Cache Tuning

```ts
// shared/lib/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,       // 30s default
      gcTime: 5 * 60 * 1000,      // 5min garbage collection
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

## 5. Team Scaling Patterns

### Small Team (2-4 engineers)

- Single codebase, single app
- No formal ownership boundaries
- Feature branches per developer
- Shared code review: everyone reviews everything
- Convention enforcement: manual (pair review)

### Medium Team (5-10 engineers)

- Single codebase, possible multi-app
- Feature teams own feature directories
- Code owners file for feature boundaries
- Shared library owned by senior engineer or guild
- Convention enforcement: ESLint rules + CI checks
- Architecture Decision Records (ADRs) for changes

### Large Team (10+ engineers)

- Monorepo with multiple apps and packages
- Dedicated platform team owns shared/ and infra
- Feature teams own features independently
- Module federation or independent deployments
- Automated code generation from OpenAPI specs
- Regular architecture reviews and RFCs

### Recommended Team Structure

```
Platform Team (2-3 people)
├── Shared UI library
├── API client & infrastructure
├── Build tooling & CI/CD
├── Architecture governance
└── Developer experience

Feature Teams (3-5 people each)
├── Own 2-4 feature modules
├── Own their testing
└── Deploy independently (micro-frontend setup)
```

## 6. Onboarding Patterns

### First Week

```
Day 1-2:
├── Read architecture-summary.md
├── Read .docs/getting-started.md
├── Read .docs/conventions.md
├── Run the app, make a trivial change
├── Explore the feature structure

Day 3-4:
├── Scaffold a new feature using .agent/feature-generator.md
├── Complete the API integration
├── Build a component using shared/ui

Day 5:
├── Submit a PR
├── Go through the code review workflow
├── Read ai-collaboration.md
```

### Ongoing Learning

| Resource | When |
|----------|------|
| `.architecture/*.md` | Before starting work in a new area |
| `.agent/*.md` | Before delegating to AI |
| `.rules/*.md` | When designing new patterns |
| `.workflows/*.md` | When starting a new process type |

### PR Review Training

New engineers review PRs alongside senior engineers using the code review checklist. First 3 PRs are co-reviewed with a senior. After 5 PRs, they can review independently for compliance checks.

## 7. Architecture Evolution

### Making Changes to the Architecture

1. Write an ADR (Architecture Decision Record) in `.architecture/adr/`
2. Update relevant `.architecture/*.md` files
3. Update `.rules/*.md` files if constraints change
4. Update `.agent/*.md` files if agent responsibilities change
5. Update `.docs/*.md` files for developer-facing documentation
6. Announce the change and migration path

### ADR Template

```
# ADR-{number}: {Title}

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
What is the issue motivating this decision?

## Decision
What is the change?

## Consequences
What becomes easier or harder?

## Migration
How to migrate existing code?
```

## 8. Technical Debt Management

### Debt Review Cycle

- **Weekly**: Flag debt during code review (small extraction opportunities)
- **Monthly**: Debt backlog grooming, prioritize top items
- **Quarterly**: Architecture audit, major refactoring sprint

### Budget Allocation

- 20% of each sprint to debt reduction
- Debt is categorized: P0 (blocking), P1 (major), P2 (minor)
- P0 debt is fixed immediately
- P1 debt is scheduled in the next sprint
- P2 debt is tracked in backlog

### Common Debt Patterns

| Pattern | Solution |
|---------|----------|
| Cross-feature import | Extract shared logic to shared/ |
| 500+ line component | Split into sub-components |
| Duplicated type definitions | Extract to shared/types/ |
| Inline API calls (no hook) | Extract to feature api/ + hooks/ |
| Missing error handling | Add error boundaries + error states |
| No loading state | Add skeleton or loading indicator |
