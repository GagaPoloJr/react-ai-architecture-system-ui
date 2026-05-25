# Validation Architecture

## Stack

- **Schema library**: zod v3
- **i18n**: zod-i18n-map (auto-translates zod default errors via i18next)
- **Form resolver**: @hookform/resolvers/zod (RHF v7 integration)

## Schema-First Philosophy

Zod schemas are the **single source of truth** for validation. Types are derived via `z.infer`.

```
                    ┌─────────────────────┐
                    │   Zod v3 Schema     │
                    │   (single truth)    │
                    └──────┬──────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼──────┐  ┌──────▼───────┐  ┌────▼──────┐
    │ API         │  │  Form        │  │  Type     │
    │ Boundary    │  │  Validation  │  │  Inference│
    │ (interceptor)│  │  (RHF v7)   │  │  z.infer  │
    └────────────┘  └──────────────┘  └───────────┘
```

## Schema Location

| Schema Scope | Location | Pattern |
|-------------|----------|---------|
| Domain model | `features/{name}/schemas/{entity}-schema.ts` | `userSchema`, `addressSchema` |
| API contract | `features/{name}/api/` | `loginResponseSchema` |
| Form scoped | Same file as form component | `filterSchema`, `searchSchema` |
| Shared domain | `shared/schemas/` (rare) | Cross-feature entity schemas |

## Type Inference

Never hand-write types that zod can generate:

```ts
// features/users/schemas/user-schema.ts
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1, 'validation:name.required'),
  role: z.enum(['admin', 'user', 'viewer']),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
})

export type User = z.infer<typeof userSchema>
export type CreateUserInput = z.input<typeof userSchema> // before defaults/transforms
export type UserOutput = z.output<typeof userSchema>     // after transforms
```

## Form Validation

RHF v7 + @hookform/resolvers/zod:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('validation:email.invalid'),
  password: z.string().min(8, 'validation:password.minLength'),
})

type LoginForm = z.infer<typeof loginSchema>

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })
  // ...
}
```

## zod-i18n-map Setup

```ts
// shared/config/i18n.ts (or i18next init)
import i18n from 'i18next'
import { zodI18nMap } from 'zod-i18n-map'
import translation from 'zod-i18n-map/locales/id/zod.json'

i18n.init({
  resources: { id: { zod: translation } },
  // ...
})

z.setErrorMap(zodI18nMap)
```

## API Boundary Validation

All API responses are validated at the interceptor level:

```ts
// shared/api/client.ts — response interceptor
import { z } from 'zod'

const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string().optional(),
  })

client.interceptors.response.use((response) => {
  // Optional: validate response shape at boundary
  return response
})
```

## Schema Composition

```ts
export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string().regex(/^\d{5}$/, 'validation:zip.invalid'),
})

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  address: addressSchema,
})

export const createUserSchema = userSchema.omit({ id: true })
export const updateUserSchema = createUserSchema.partial()
```
