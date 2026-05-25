# Stack Adaptation Guide

> How to adopt this architecture for **any React stack** — swap libraries, keep the engineering system.

## Philosophy

This architecture is **two layers**:

```
┌─────────────────────────────────────┐
│  Engineering System (universal)     │  ← .rules/, .workflows/, .agent/,
│  Architecture patterns, disciplines │    .architecture/ (concepts)
├─────────────────────────────────────┤
│  Implementation Examples (swappable)│  ← .templates/, .architecture/ (code),
│  Code snippets for a specific stack │    .agent/ (library references)
└─────────────────────────────────────┘
```

You can adopt Layer 1 without Layer 2. Or swap Layer 2 for your stack.

---

## What Stays (Layer 1 — Universal)

These files need **zero changes** regardless of your React stack:

| File | Why it's universal |
|------|-------------------|
| `.rules/scalability.md` | Feature isolation, module boundaries, dependency direction |
| `.rules/feature-isolation.md` | No cross-feature imports, barrel contracts |
| `.rules/developer-experience.md` | Naming, file organization, PR standards |
| `.workflows/feature-planning.md` | How to plan before coding |
| `.workflows/scaffolding.md` | Directory structure rules |
| `.workflows/shared-extraction.md` | 3+ use extraction rule |
| `.workflows/code-review.md` | Review checklist (conceptual) |
| `.workflows/release-readiness.md` | Pre-release gates |
| `.agent/frontend-architect.md` | FDD structure, layer hierarchy, naming |
| `.agent/refactor-engineer.md` | Extraction, deduplication, migration |
| `.architecture/fdd-guide.md` | Feature lifecycle, boundaries |
| `.architecture/types.md` | Type organization patterns |
| `.architecture/imports-aliases.md` | Alias strategy (swap paths) |
| `.architecture/environments.md` | Env var patterns (swap prefix) |
| `.architecture/error-handling.md` | Error boundary hierarchy, recovery |

---

## What You Swap (Layer 2 — Stack-Specific)

### Option A: Replace Code Examples Only

Keep the structure, replace library references and imports.

**Example: Swap TanStack Query → RTK Query**

In `.architecture/api-layer.md`:

```diff
- import { useQuery } from '@tanstack/react-query'
- export function useUsers() {
-   return useQuery({
-     queryKey: ['users'],
-     queryFn: () => userApi.list(),
-   })
- }

+ import { useGetUsersQuery } from '../api/user-api'
+ export function useUsers() {
+   const { data, isLoading, error } = useGetUsersQuery()
+   return { data, isLoading, error }
+ }
```

**Example: Swap zustand → Redux Toolkit**

In `.architecture/state-management.md`:

```diff
- import { create } from 'zustand'
- import { devtools } from 'zustand/middleware'
- export const useUIStore = create<UIState>()(
-   devtools((set) => ({ ... }))
- )

+ import { createSlice, configureStore } from '@reduxjs/toolkit'
+ const uiSlice = createSlice({ name: 'ui', initialState, reducers: { ... } })
+ export const store = configureStore({ reducer: { ui: uiSlice.reducer } })
```

### Option B: Adopt Concepts Only

Read the architecture docs for **patterns**, ignore the code examples entirely:

```bash
# Copy only the universal layer
cp -r \
  .rules/ \
  .workflows/ \
  .agent/frontend-architect.md \
  .agent/refactor-engineer.md \
  .architecture/fdd-guide.md \
  .architecture/types.md \
  .architecture/imports-aliases.md \
  .architecture/environments.md \
  .architecture/error-handling.md \
  core.md \
  your-project/
```

Then write your own `api-layer.md`, `state-management.md`, `form-architecture.md`, etc. using your actual stack.

---

## Stack Swap Reference

### Data Fetching

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| TanStack Query v5 | `@tanstack/react-query` → your lib | `.architecture/api-layer.md` |
| RTK Query | `useQuery` → `useGetXxxQuery` | `.agent/api-integrator.md` |
| SWR | `useQuery` → `useSWR` | `.templates/api/api-template.md` |
| Apollo Client | `useQuery` → `useQuery` (Apollo) | `.workflows/api-integration.md` |
| Bare fetch + useEffect | Remove query lib | `.rules/performance.md` (caching) |

### Client State

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| zustand v5 | `zustand` → your lib | `.architecture/state-management.md` |
| Redux Toolkit | `create` → `createSlice` | `.templates/state/state-template.md` |
| Jotai | `create` → `atom` | `.agent/state-manager.md` |
| Context only | Remove zustand | `.workflows/state-decision-tree.md` |

### Forms

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| react-hook-form v7 | `react-hook-form` → your lib | `.architecture/form-architecture.md` |
| Formik | `useForm` → `useFormik` | `.templates/form/form-template.md` |
| Ant Design Form | Remove RHF | `.agent/form-engineer.md` |

### Validation

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| zod v3 | `zod` → your lib | `.architecture/validation.md` |
| yup | `z.object` → `yup.object` | `.templates/api/api-template.md` |
| io-ts | `z.infer` → `TypeOf` | `.architecture/types.md` |
| No validation | Remove `schemas/` dir | `.rules/scalability.md` |

### Design System / AI Skills

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| Taste Skill | `.design/design-taste-frontend/SKILL.md` | `.agent/ui-engineer.md` |
| Custom design rules | Write your own SKILL.md in `.design/` | `.agent/animation-engineer.md` |
| No design skill | Remove `.design/` directory | `.architecture/ui-hierarchy.md` |

### UI / Styling

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| Tailwind CSS v4 | `tailwindcss` → your lib | `.architecture/ui-hierarchy.md` |
| MUI / Chakra | Remove CVA + cn() | `.templates/component/component-template.md` |
| CSS Modules | Remove `cn()` utility | `.architecture/utilities.md` |
| Ant Design | Import from `antd` | `.agent/ui-engineer.md` |

### Routing

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| react-router-dom v7 | `react-router-dom` → your lib | `.architecture/routing.md` |
| TanStack Router | `createBrowserRouter` → `createRouter` | `.templates/page/page-template.md` |
| Next.js App Router | Remove react-router | `.architecture/state-management.md` |

### HTTP Client

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| axios | `axios` → your lib | `.architecture/api-layer.md` |
| ky | `client.get` → `ky.get` | `.agent/api-integrator.md` |
| fetch | Remove axios | `.templates/api/api-template.md` |
| graphql-request | Remove REST patterns | `.workflows/api-integration.md` |

### i18n

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| i18next | `i18next` → your lib | `.architecture/form-architecture.md` |
| react-intl | `useTranslation` → `useIntl` | `.templates/hook/hook-template.md` |
| No i18n | Remove `translations/` dir | `.docs/conventions.md` |

### Notifications / Toasts

| Your choice | Replace | Also update |
|-------------|---------|-------------|
| sonner | `sonner` → your lib | `.architecture/error-handling.md` |
| react-hot-toast | `toast` → `toast` (hot) | `.templates/api/api-template.md` |
| MUI Snackbar | Import from MUI | `.agent/ui-engineer.md` |

---

## Quick Swap Workflow

```
1.  Copy the repo
2.  Delete .templates/ (you'll regenerate with your stack)
3.  Delete .architecture/ files that are too stack-specific
4.  Keep: .rules/ .workflows/ .agent/ .architecture/conceptual-files.md
5.  Replace code examples in remaining files with your library calls
6.  Run .scaffolds/bootstrap.sh or follow .workflows/init.md with your packages
7.  Generate new .templates/ using your actual stack
```

Or for a minimal adoption:

```
cp .rules/ .workflows/ .agent/ core.md your-project/
```

That's the pure engineering system — no code examples, just disciplines and processes.
