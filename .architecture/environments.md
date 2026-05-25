# Environments

## Stack

- **Build tool**: Vite 7 (VITE_ prefix convention)
- **Validation**: zod v3 (env schema at startup)
- **CSS**: Tailwind v4 (@tailwindcss/vite plugin)
- **TypeScript**: TypeScript 5.9 (strict mode)

## Environment Variables

All env vars use the `VITE_` prefix (Vite convention):

```
VITE_API_URL=https://api.example.com/v1
VITE_APP_TITLE=BNN Officer
VITE_AUTH_TOKEN_KEY=access_token
VITE_ENABLE_DEBUG=false
VITE_SENTRY_DSN=https://xxx@sentry.io/yyy
```

## .env File Hierarchy

```
.env                  # Loaded in all environments (committed)
.env.local            # Local overrides (gitignored)
.env.development      # Development builds (committed)
.env.production       # Production builds (committed)
.env.test             # Test runs (committed)
```

Priority (highest first): `.env.local` > `.env.{mode}` > `.env`

Never commit secrets to `.env` files. Use `.env.example` as the template.

## Runtime Access

All env vars are accessed via `import.meta.env.VITE_*` (Vite 7):

```ts
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
```

## Zod Validation at Startup

```ts
// shared/config/env.ts
import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_TITLE: z.string().min(1),
  VITE_ENABLE_DEBUG: z.enum(['true', 'false']).default('false'),
  VITE_SENTRY_DSN: z.string().url().optional(),
  VITE_AUTH_TOKEN_KEY: z.string().default('access_token'),
})

export const env = envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
  VITE_ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG,
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  VITE_AUTH_TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY,
})

export type Env = z.infer<typeof envSchema>
```

If validation fails, the app logs a clear error message listing missing/invalid vars before anything mounts.

## Build-Time Only

All `VITE_` variables are evaluated at build time. For truly runtime variables (e.g., API URLs per deployment), serve a `/config.js` script that sets `window.ENV = {...}` and read it at runtime.

## Mode Detection

```ts
const isDev = import.meta.env.DEV    // true for `vite dev`
const isProd = import.meta.env.PROD  // true for `vite build`
const mode = import.meta.env.MODE    // 'development' | 'production' | 'test'
```

## Node.js & npm

Required versions are pinned in `.nvmrc` at the project root:

```
20
```

Switch to the correct Node version:

```bash
nvm use       # if using nvm
fnm use       # if using fnm
```

The project uses npm as the package manager — avoid yarn or pnpm. If peer dependency conflicts arise (e.g. a package pins React 18 but the project uses React 19), fix the root cause by upgrading or removing the offending package rather than using `--legacy-peer-deps`:

## Feature Flags

```ts
// shared/config/features.ts
export const featureFlags = {
  enableNewDashboard: import.meta.env.VITE_FEATURE_NEW_DASHBOARD === 'true',
  enableReportV2: import.meta.env.VITE_FEATURE_REPORT_V2 === 'true',
} as const
```
