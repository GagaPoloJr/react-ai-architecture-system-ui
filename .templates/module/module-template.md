# Shared Module / Package Template

## Package Structure

```
shared/{{moduleName}}/
├── api/                # Axios service layer
├── components/         # UI components (Tailwind + Radix + CVA)
├── hooks/              # Custom hooks
├── stores/             # Zustand stores
├── schemas/            # Zod schemas
├── types/              # TypeScript types
├── utils/              # Pure helper functions
├── index.ts            # Public API — only what consumers need
├── internal.ts         # Internal exports (if module is a package)
└── package.json        # If extracted as a standalone package
```

## Public API (index.ts)

```ts
// shared/{{moduleName}}/index.ts
// Only export what consumers of this module need.

// Components
export { {{ComponentName}} } from './components/{{component-name}}';
export type { {{ComponentName}}Props } from './components/{{component-name}}';

// Hooks
export { use{{HookName}} } from './hooks/use-{{hook-name}}';

// Utilities
export { formatDate } from './utils/date';
export { cn } from './utils/cn';

// Types
export type { PaginatedResponse, ApiError } from './types/api.types';
```

**Rules:**
- Export only the public surface. Everything else is `_private/` or unexported.
- Prefer named exports over default exports.
- Re-export types with `export type` for clarity.
- Every export must have a clear, single responsibility.

## Import Path Resolution

Use `@/` path aliases within the app. For shared modules that may be extracted later, use relative imports:

```ts
// Within shared/{{moduleName}}/ — use relative imports
import { cn } from '../../lib/utils';

// Within features/ or pages/ — use @/ alias
import { {{ComponentName}} } from '@/shared/{{moduleName}}';
```

## Internal vs External Types

```ts
// types/{{moduleName}}.types.ts — Internal types (not exported)
interface InternalConfig {
  baseUrl: string;
  timeout: number;
}

// types/index.ts — Public types (re-exported through index.ts)
export interface {{ModuleName}}Options {
  variant: 'solid' | 'outline';
  size: 'sm' | 'md' | 'lg';
}
```

- Prefix internal types with `Internal` or place in a `_internal` directory.
- Only types that appear in public API signatures should be exported.
- Internal types can change without a major version bump.

## Dependency Rules

```
shared/{{moduleName}}/
├── api/         → may import from @/configs/http/client (axios instances)
├── hooks/       → may import from @/hooks, @/stores
├── utils/       → must be pure — no React, no API
├── components/  → may import from @/components/ui, @/hooks, @/lib/utils
├── stores/      → may import from zustand
├── schemas/     → may import from zod, zod-i18n-map
```

- **No circular dependencies** between submodules.
- **No dependency on features/**, app/, or pages/.
- Dependencies on other shared modules are allowed but should be minimised.
- If a module depends on another module's internal, extract to a lower-level shared package.

## Versioning Approach

| Change | Version Bump | Example |
|--------|-------------|---------|
| New public export added | Minor | 1.0.0 → 1.1.0 |
| Breaking API change | Major | 1.0.0 → 2.0.0 |
| Bug fix / internal change | Patch | 1.0.0 → 1.0.1 |

- Maintain a `CHANGELOG.md` for each package/module.
- Mark deprecations with JSDoc `@deprecated` and a migration path.
- Never remove an export in a minor version — deprecate first, remove in the next major.
