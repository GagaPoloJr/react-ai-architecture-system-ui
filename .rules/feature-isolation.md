# Feature Isolation Rules

## 1. Feature Directory Structure
Every feature must follow this exact structure:
```
features/<feature-name>/
├── api/          # API calls for this feature only
├── components/   # UI components (local to feature)
├── hooks/        # Feature-specific hooks
├── types/        # Feature-specific TypeScript types
├── routes/       # Feature route definitions
├── index.ts      # Public barrel — only what's safe to export
```
No file inside a feature may reference `../` to exit the feature boundary (except to `@/shared/` or `@/app/`).

## 2. Feature Boundary Enforcement
- A linter rule (`no-restricted-imports` or `import/no-restricted-paths`) MUST enforce that no feature imports from another feature.
- CI must fail on cross-feature imports.
- Banned patterns: `../../other-feature/`, `@/features/other-feature/`.

## 3. Feature-Only API Modules
- Every API module inside a feature owns its own endpoints. No shared "god API file" that handles all features.
- API functions must be named after the domain action: `getUserProfile`, `submitOrder`, `cancelSubscription`.
- Error handling is local to the feature's API module — transform API errors into domain-typed errors.

## 4. Feature-Only Types
- Every feature owns its types. Shared domain types (User, Order) live in `@/shared/types/`.
- Feature types must NOT be exported via the shared barrel. They are internal to the feature.
- If two features need the same type, it was prematurely shared or needs extraction to `@/shared/types/`.

## 5. Feature-Only Routes
- Route definitions for a feature live in `features/<name>/routes/`.
- The app shell imports feature route configs and merges them. Features do NOT know about each other's routes.
- Each route config must export a lazy-loaded element — no static imports of page components.

## 6. Cross-Feature Communication
- Features communicate ONLY through:
  - **Events**: A shared event bus (`@/shared/lib/event-bus`) for loosely coupled coordination.
  - **Context**: App-level React Context or state store (Zustand, Jotai) for cross-cutting state (auth, theme).
- Direct function calls across features are forbidden.
- Events must be typed and namespaced by feature: `order:placed`, `user:loggedOut`.

## 7. Feature Lifecycle Management
- Each feature can define an optional lifecycle hook (`register()` / `cleanup()`) called by the app shell on mount/unmount.
- Use lifecycles for: registering global event listeners, initializing feature-level stores, cleaning up subscriptions.
- A feature must never leave side effects after `cleanup()` — no orphaned timers, listeners, or cache entries.
- Features that don't clean up after themselves fail CI review.

## 8. Feature Toggling
- Every feature must support a boolean enable/disable toggle through a feature flag system.
- Disabled features must NOT render, load their chunk, or execute any code path.
- Feature flags live in `@/shared/config/feature-flags.ts` and are evaluated at build or runtime via env vars.
