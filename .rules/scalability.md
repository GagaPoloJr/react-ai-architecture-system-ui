# Scalability Rules

## 1. Feature Isolation (Zero Cross-Feature Imports)
- Features MUST NEVER import from other features. A feature is a self-contained module.
- The only exception: importing types from a shared `types` module that is part of `@/shared`.
- Violation example: `features/users/` importing from `features/orders/` — banned.

## 2. Shared Code Extraction Rule
- When the same logic or component appears in **2+ places**, extract it to `@/shared/`.
- Do NOT extract prematurely based on speculation; wait for real duplication.
- Extracted code must be generic enough to serve all consumers without feature-specific logic.

## 3. Module Boundary Enforcement
- Every module must have a single public API surface (barrel `index.ts`).
- Internal module files are private; only barrel exports are importable by other modules.
- Deep imports into module internals (`features/x/components/internal/thing.ts`) are forbidden.

## 4. Dependency Direction
- **Shared → Features**: `@/shared/` may NOT depend on any feature.
- **App → Features**: `@/app/` orchestrates features but must NOT contain business logic.
- **Features → Shared**: Features import only from `@/shared/` or `@/app/` (routes, layouts).
- **Features → Features**: Strictly forbidden.

## 5. Circular Dependency Prevention
- Zero circular dependencies allowed. Use a tool (Madge, DPAT) in CI to detect them.
- A circular dependency is a design smell; break it by extracting the shared concern to `@/shared/`.
- Team leads must review any `index.ts` that re-exports more than 10 symbols — it may indicate a cohesion problem.

## 6. Bundle Size Budgets
- Initial JS bundle must stay under **200 KB** (gzipped).
- Any single page chunk must not exceed **100 KB** (gzipped).
- CI must fail if bundle analysis (Webpack Bundle Analyzer / Vite Rollup Plugin Visualizer) exceeds budgets.

## 7. Code Splitting Rules
- Every route must be lazy-loaded via `React.lazy` or dynamic `import()`.
- Never import a page component statically outside of route configs.
- Use `React.lazy` only at the route level, not for individual components (exceptions: heavy modals, charts, editors).
- Named exports from dynamic imports are not supported by React.lazy — default export the page component.

## 8. Shared Library Stability
- Libraries in `@/shared/` must never reference environment-specific globals (`window`, `document`, `localStorage`).
- Shared utilities must be pure functions unless they explicitly wrap an IO operation.
- Platform abstractions (storage, API, router) belong in `@/lib/`, not `@/shared/`.
