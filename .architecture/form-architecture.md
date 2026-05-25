# Form Architecture

## Stack

- **Form**: react-hook-form v7
- **Validation resolver**: @hookform/resolvers/zod
- **Schema**: zod v3
- **UI primitives**: @radix-ui/* (checkbox, select, dialog, label)
- **Icons**: lucide-react

## Component Hierarchy

```
┌──────────────────────────────────────────────────────────────┐
│  shared/ui/molecules/form-field.tsx                          │
│  - Composes @radix-ui/react-label + Input + error message    │
│  - Accepts RHF v7 `fieldState` for error display             │
│  - Generic, no knowledge of form shape                       │
├──────────────────────────────────────────────────────────────┤
│  features/{feature}/components/{Entity}Form.tsx              │
│  - Feature-specific form composition                         │
│  - Defines zod schema, useForm<T>({ resolver: zodResolver }) │
│  - Calls feature mutation hook on submit                     │
├──────────────────────────────────────────────────────────────┤
│  features/{feature}/components/{Entity}FormFields.tsx        │
│  - Field layout and arrangement                              │
│  - Uses FormField + Radix primitives from shared/ui          │
│  - Optional conditional rendering                            │
└──────────────────────────────────────────────────────────────┘
```

## Form Component Pattern

```tsx
// features/users/components/user-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@shared/ui/atoms/button'
import { FormField } from '@shared/ui/molecules/form-field'
import { Input } from '@shared/ui/atoms/input'
import { useCreateUser } from '../api/use-create-user-mutation'

const userFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
})

type UserFormData = z.infer<typeof userFormSchema>

export function UserForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  })

  const createUser = useCreateUser()

  function onSubmit(data: UserFormData) {
    createUser.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="name"
        control={control}
        label="Name"
        error={errors.name}
      >
        <Input {...register('name')} />
      </FormField>

      <FormField
        name="email"
        control={control}
        label="Email"
        error={errors.email}
      >
        <Input type="email" {...register('email')} />
      </FormField>

      <Button type="submit" isLoading={createUser.isPending}>
        Save
      </Button>
    </form>
  )
}
```

## Radix + RHF Field Wrapping

For Radix primitives that don't use native `<input>` (Select, Checkbox), use RHF's `Controller`:

```tsx
import { Controller } from 'react-hook-form'
import { Select } from '@shared/ui/atoms/select'

<Controller
  name="role"
  control={control}
  render={({ field }) => (
    <Select value={field.value} onValueChange={field.onChange}>
      <Select.Trigger>
        <Select.Value placeholder="Select role" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="admin">Admin</Select.Item>
        <Select.Item value="user">User</Select.Item>
      </Select.Content>
    </Select>
  )}
/>
```

## Submission Patterns

| Pattern | Hook/Method | Use Case |
|---------|-------------|----------|
| Direct mutation | `mutation.mutate(data)` | Simple create/update |
| Optimistic update | `onMutate` callback | Latency-sensitive UIs |
| Confirmation dialog | @radix-ui/react-alert-dialog | Destructive actions |
| Debounced submit | `useDebounce` + watch | Search/filter forms |

## State Flow

```
User Input → RHF v7 manages field state (isolated re-renders)
         → Zod v3 validation on blur/submit (via @hookform/resolvers)
         → If valid: mutation hook → axios v1 call
         → If invalid: error messages populate FormField
         → On success: form.reset(), invalidate TanStack Query cache
```

## Error Handling

- **Field errors**: Driven by zod schema with `zod-i18n-map` translations, displayed by `FormField`.
- **Submission errors**: Caught in mutation's `onError`, mapped to form fields or shown via sonner v2 toast.
- **Network errors**: Axios interceptor normalizes, sonner toast displayed, form stays intact.
