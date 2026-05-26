# Shared Layer

## Structure

```
shared/
├── ui/
│   ├── atoms/         # Radix primitives + CVA variants + cn()
│   ├── molecules/     # FormField, Card, DataTable
│   └── sections/      # Section components used across 2+ pages
├── lib/             # Pure functions (date-fns v4 wrappers, formatters)
├── api/             # Axios v1 client, interceptors, TanStack Query v5 base
├── hooks/           # Generic React hooks (use-debounce, use-media-query)
├── utils/           # cn() (tailwind-merge + clsx), js-cookie wrappers
├── types/           # ApiResponse<T>, PaginatedResult<T>, BaseEntity
└── config/          # env.ts (zod env validation), constants
```

## What Goes Where

| Code | Location |
|------|----------|
| `@radix-ui/*` wrappers (Button, Dialog, Select) | `shared/ui/atoms/` |
| CVA variants for Radix components | `shared/ui/atoms/` |
| Cross-page section components (team-grid, stats-bar, about-section) | `shared/ui/sections/` |
| `cn()` utility (tailwind-merge + clsx v2) | `shared/utils/cn.ts` |
| Axios v1 instance with interceptors | `shared/api/client.ts` |
| TanStack Query v5 query key factory | `shared/api/query.ts` |
| Zod-schemas for env validation | `shared/config/env.ts` |
| i18next configuration | `shared/config/i18n.ts` |
| Lucide icon wrapper | `shared/ui/atoms/icon.tsx` |
| Sonner toast setup | `shared/ui/atoms/toaster.tsx` |
| date-fns v4 wrapper functions | `shared/lib/date/` |
| js-cookie v3 helpers | `shared/utils/cookie.ts` |

## shared/lib vs shared/utils

| Aspect | `shared/lib` | `shared/utils` |
|--------|------------|----------------|
| Dependencies | Zero or date-fns v4 | React, clsx v2, tailwind-merge, js-cookie v3 |
| Examples | `formatDate`, `clamp`, `slugify` | `cn`, `getCookie`, `setCookie` |
| Importable in | Any context (even non-React) | React context only |

## Barrel Exports

- Each subdirectory has `index.ts` barrel.
- Use `export * from './module'` for stable exports.
- Use explicit `export { Component } from './component'` for controlled surface area.
- Never export internal implementation details.

## Example: cn.ts

```ts
// shared/utils/cn.ts
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Example: Env Config

```ts
// shared/config/env.ts
import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_TITLE: z.string().min(1),
  VITE_ENABLE_DEBUG: z.enum(['true', 'false']).default('false'),
})

export const env = envSchema.parse(import.meta.env)
export type Env = z.infer<typeof envSchema>
```
