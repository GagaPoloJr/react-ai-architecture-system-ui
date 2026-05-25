# Utilities

## Stack References

- **cn()**: clsx v2 + tailwind-merge
- **Date**: date-fns v4
- **Cookies**: js-cookie v3
- **Icons**: lucide-react

## Structure

```
shared/
├── lib/          # Pure functions — zero React/BOM/DOM dependencies
│   ├── date/     # date-fns v4 wrappers (formatDate, isToday, etc.)
│   ├── math/     # clamp, round, percentage, aggregation
│   ├── string/   # slugify, truncate, capitalize
│   └── index.ts
└── utils/        # React/DOM-aware utilities
    ├── cn.ts     # clsx + tailwind-merge
    ├── cookie.ts # js-cookie v3 wrappers (typed get/set/remove)
    └── index.ts
```

## cn() Utility

```ts
// shared/utils/cn.ts
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Cookie Helpers

```ts
// shared/utils/cookie.ts
import Cookies from 'js-cookie'

export const cookie = {
  get: (key: string) => Cookies.get(key),
  set: (key: string, value: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(key, value, { secure: true, sameSite: 'lax', ...options }),
  remove: (key: string) => Cookies.remove(key),
}
```

## Date Helpers (date-fns v4)

```ts
// shared/lib/date/format-date.ts
import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns'

export function formatDate(date: Date | string, pattern = 'dd/MM/yyyy') {
  return format(new Date(date), pattern)
}

export function formatRelative(date: Date | string) {
  const d = new Date(date)
  if (isToday(d)) return formatDistanceToNow(d, { addSuffix: true })
  if (isYesterday(d)) return 'Yesterday'
  return formatDate(d)
}
```

## Naming Conventions

- **Functions**: camelCase, verb-first — `formatDate`, `calculateTotal`
- **Files**: kebab-case matching the main export — `format-date.ts`, `cn.ts`
- **Exports**: Named exports only (no `export default` for utilities)

## Import Best Practices

Use deep imports for tree-shaking:

```ts
// ✅ Good — tree-shakeable
import { formatDate } from '@shared/lib/date/format-date'
import { cn } from '@shared/utils/cn'

// ❌ Bad — pulls entire barrel
import { formatDate, cn } from '@shared/lib'
```

## Feature-Specific Utilities

```
features/reports/
├── utils/
│   ├── calculate-report-summary.ts
│   ├── format-report-period.ts
│   └── index.ts
```
