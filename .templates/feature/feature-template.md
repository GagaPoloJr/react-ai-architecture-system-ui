# Feature Module Template

## Purpose

A feature module encapsulates a complete business capability (e.g., "user-management", "reporting", "approval-workflow"). It bundles all concerns — API, components, hooks, types, utilities — under a single namespace so the module is self-contained, discoverable, and removable.

## Directory Structure

```
features/{{featureName}}/
├── api/                              # Axios service + TanStack Query hooks
│   ├── {{featureName}}-api.ts        # Raw axios calls (getApi/postApi/putApi/patchApi/deleteApi)
│   ├── {{featureName}}.query.ts      # useQuery wrappers
│   ├── {{featureName}}.mutation.ts   # useMutation wrappers
│   ├── {{featureName}}.infinite.ts   # useInfiniteQuery wrappers
│   └── index.ts
├── components/                       # Components used ONLY by this feature
│   ├── {{FeatureName}}-list.tsx
│   ├── {{FeatureName}}-detail.tsx
│   ├── {{FeatureName}}-form.tsx
│   └── index.ts
├── hooks/                            # Hooks used ONLY by this feature
│   ├── use-{{featureName}}-filters.ts
│   └── index.ts
├── stores/                           # Zustand stores for feature-scoped state
│   ├── {{featureName}}.store.ts
│   └── index.ts
├── schemas/                          # Zod schemas for forms
│   ├── {{featureName}}.schema.ts
│   └── index.ts
├── types/                            # Types used ONLY by this feature
│   ├── {{featureName}}.types.ts
│   └── index.ts
└── index.ts                          # Barrel exports
```

## Rules for Feature Creation

1. **One feature = one business capability.** Do not split a single capability across multiple features.
2. **No cross-feature imports.** A feature must never import from another feature's internal modules. Shared code lives in `shared/` or `@/`.
3. **Lazy-load by feature.** Feature modules must be lazily loaded at the route level.
4. **Keep it small.** If a feature exceeds ~15 files, split into sub-features.
5. **Feature boundary.** The only public surface is the barrel `index.ts`. Everything else is implementation detail.

## When NOT to Use a Feature

| Scenario | Where it goes |
|----------|--------------|
| Utility function used by 2+ features | `shared/utils/` or `@/lib/` |
| Generic UI component (Button, Modal) | `shared/ui/` or `@/components/ui/` |
| Shared hook (useDebounce, useMediaQuery) | `shared/hooks/` or `@/hooks/` |
| Axios instance / config | `@/configs/http/` |
| TanStack Query client config | `@/lib/react-query/` |
| Auth / theme / layout concerns | `@/stores/`, `@/context/`, `@/layouts/` |
| Cross-cutting types | `@/types/` or `@/models/` |

## Creating a Feature

```bash
# Scaffold a new feature
bash .scaffolds/feature-scaffold.sh {{featureName}}
```

Then populate each stub file following the dedicated templates in `.templates/`.
