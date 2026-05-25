# Import Aliases

## Vite Resolve Aliases

Configured in `vite.config.ts`:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@':         resolve(__dirname, './src'),
      '@shared':   resolve(__dirname, './src/shared'),
      '@features': resolve(__dirname, './src/features'),
      '@pages':    resolve(__dirname, './src/pages'),
      '@routes':   resolve(__dirname, './src/routes'),
      '@layouts':  resolve(__dirname, './src/layouts'),
      '@stores':   resolve(__dirname, './src/stores'),
      '@styles':   resolve(__dirname, './src/styles'),
    },
  },
})
```

## TypeScript Path Mapping

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*":            ["./src/*"],
      "@shared/*":      ["./src/shared/*"],
      "@features/*":    ["./src/features/*"],
      "@pages/*":       ["./src/pages/*"],
      "@routes/*":      ["./src/routes/*"],
      "@layouts/*":     ["./src/layouts/*"],
      "@stores/*":      ["./src/stores/*"],
      "@styles/*":      ["./src/styles/*"]
    }
  }
}
```

## Usage Conventions

| Scope | Alias | Example |
|-------|-------|---------|
| Shared UI | `@shared/ui/{layer}` | `import { Button } from '@shared/ui/atoms/button'` |
| Shared lib | `@shared/lib/{category}` | `import { formatDate } from '@shared/lib/date/format-date'` |
| Shared hooks | `@shared/hooks` | `import { useDebounce } from '@shared/hooks/use-debounce'` |
| Feature | `@features/{name}` | `import { useUsers } from '@features/users'` |
| Page | `@pages/{name}` | `import { DashboardPage } from '@pages/dashboard-page'` |
| Route | `@routes` | `import { ROUTES } from '@routes/index'` |
| Store | `@stores/{name}` | `import { useAuthStore } from '@stores/use-auth-store'` |
| Layout | `@layouts/{name}` | `import { AppLayout } from '@layouts/app-layout'` |

## Deep Imports for Tree-Shaking

```ts
// ✅ Direct file import (most tree-shakeable)
import { Button } from '@shared/ui/atoms/button'
import { cn } from '@shared/utils/cn'

// ✅ Sub-path barrel import
import { formatDate } from '@shared/lib/date'

// ❌ Avoid top-level barrel for production code
import { Button, Input, Card } from '@shared/ui'
```

## Circular Dependency Prevention

- `shared/*` never imports from `features/*`, `pages/*`
- `features/*` never imports from sibling features
- `pages/*` never imports from other pages
- `@/*` (src root) is allowed from anywhere but should be avoided in shared code

## Import Order

1. Node built-ins
2. External packages (`react`, `zustand`, `@tanstack/react-query`, etc.)
3. Internal aliases (`@shared/*`, `@features/*`)
4. Relative imports (`../`, `./`)
5. CSS/styles

Blank line between groups. Sorted alphabetically within groups.
