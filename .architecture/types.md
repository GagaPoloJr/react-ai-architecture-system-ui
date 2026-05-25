# Type Organization

## Type Location

| Scope | Location | Pattern |
|-------|----------|---------|
| Shared domain | `shared/types/` | `ApiResponse<T>`, `PaginatedResult<T>`, `BaseEntity` |
| Feature domain | `features/{name}/types/` | `User`, `Report` (or `z.infer<typeof userSchema>`) |
| API contracts | Co-located in `features/{name}/api/` | Request/response shapes |
| Component props | In component file or `{name}.ts` | `ButtonProps` interface |
| Schema-inferred | From zod v3 schemas | `z.infer<typeof userSchema>` |

## Shared Types

```ts
// shared/types/api.ts
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}
```

```ts
// shared/types/common.ts
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}
```

## Zod-Inferred Types (Preferred)

Feature types should be derived from zod schemas whenever possible:

```ts
// features/users/schemas/user-schema.ts
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(['admin', 'user', 'viewer']),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
})

export type User = z.infer<typeof userSchema>
export type CreateUserInput = z.input<typeof userSchema>
```

```ts
// features/users/types/user.ts
// Re-exported for convenience. Hand-written only for shapes zod cannot represent.
export type { User, CreateUserInput } from '../schemas/user-schema'
export interface UserListParams {
  page: number
  pageSize: number
  search?: string
  role?: string
}
```

## API Response Types

```ts
// features/users/api/user-api.ts
import { client } from '@shared/api/client'
import type { User } from '../types/user'

type UserListResponse = ApiResponse<PaginatedResult<User>>
type UserDetailResponse = ApiResponse<User>
```

## Component Props

Defined as interfaces for extendability. No `React.FC` or generic props pattern:

```ts
// shared/ui/atoms/button.tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isLoading?: boolean
  asChild?: boolean
}
```

## Utility Types

```ts
// shared/types/utility.ts
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

export type Nullable<T> = T | null

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
```

## Best Practices

- Prefer `z.infer<typeof schema>` over hand-written types for domain models.
- Use `interface` over `type` for object shapes (better error messages, extendable).
- Use `type` for unions, intersections, and utility types.
- No `export default` on types — always named exports.
- Use `export type` for isolated type exports (satisfies `isolatedModules`).
- Barrel exports at each level: `shared/types/index.ts`, `features/orders/types/index.ts`.
