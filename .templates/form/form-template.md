# Form Template

## Form Component Structure

```
features/{{featureName}}/components/{{FeatureName}}Form/
├── {{feature-name}}-form.tsx        # Main form component
├── {{feature-name}}.schema.ts       # Zod schema
├── {{feature-name}}-form-fields.tsx # Field sub-components
├── {{feature-name}}.test.tsx        # Tests
└── index.ts
```

## Schema Definition (Zod)

```ts
// {{feature-name}}.schema.ts
import { z } from 'zod';

export const {{featureName}}Schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  age: z.coerce.number().min(18, 'Must be at least 18').optional(),
  role: z.enum(['admin', 'user', 'viewer']),
  tags: z.array(z.string()).min(1).max(5),
  metadata: z.record(z.string()).optional(),
});

export type {{FeatureName}}FormData = z.infer<typeof {{featureName}}Schema>;
```

## Form Hook (useForm + zodResolver)

```ts
// {{feature-name}}-form.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { {{featureName}}Schema, type {{FeatureName}}FormData } from './{{feature-name}}.schema';
```

## Field Rendering (Controller Pattern)

Use `Controller` from `react-hook-form` with Radix `Field` components:

```tsx
// {{feature-name}}-form-fields.tsx
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Field, FieldContent, FieldLabel, FieldError } from '@/components/ui/field';
import type { {{FeatureName}}FormData } from './{{feature-name}}.schema';

export function NameField() {
  const { control } = useFormContext<{{FeatureName}}FormData>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
          <FieldContent>
            <Input {...field} id={field.name} placeholder="Enter name" />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </FieldContent>
        </Field>
      )}
    />
  );
}
```

## Form Component

```tsx
// {{feature-name}}-form.tsx
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { {{featureName}}Schema, type {{FeatureName}}FormData } from './{{feature-name}}.schema';
import { NameField, EmailField, RoleField } from './{{feature-name}}-form-fields';
import { useCreate{{FeatureName}} } from '../../api/{{featureName}}.mutation';

interface {{FeatureName}}FormProps {
  defaultValues?: Partial<{{FeatureName}}FormData>;
}

export function {{FeatureName}}Form({ defaultValues }: {{FeatureName}}FormProps) {
  const createMutation = useCreate{{FeatureName}}();

  const form = useForm<{{FeatureName}}FormData>({
    resolver: zodResolver({{featureName}}Schema),
    defaultValues,
    mode: 'onChange',
  });

  async function handleSubmit(data: {{FeatureName}}FormData) {
    try {
      await createMutation.mutateAsync(data);
      toast.success('{{FeatureName}} saved');
    } catch {
      toast.error('Failed to save {{FeatureName}}');
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <NameField />
        <EmailField />
        <RoleField />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save {{FeatureName}}'}
        </Button>
      </form>
    </FormProvider>
  );
}
```

## Validation Patterns

| Type | Approach |
|------|----------|
| Schema validation | Zod rules on the schema object |
| Cross-field validation | `.refine()` on the schema |
| Async validation (email unique) | `validate` with async fn |
| Server-side errors | `setError()` from `useForm` after mutation failure |
| Disabled submit | `disabled={form.formState.isSubmitting \|\| !form.formState.isValid}` |

## Server Error Mapping

```ts
async function handleSubmit(data: {{FeatureName}}FormData) {
  try {
    await createMutation.mutateAsync(data);
    toast.success('{{FeatureName}} created');
  } catch (error) {
    toast.error('Failed to create {{FeatureName}}');

    // Map server validation errors back to fields
    if (error instanceof AxiosError && error.response?.status === 422) {
      const fields = error.response.data?.fields ?? [];
      for (const { path, message } of fields) {
        form.setError(path as keyof {{FeatureName}}FormData, { message });
      }
    }
  }
}
```

## Multi-Step Form Patterns

```tsx
const steps = [
  { id: 'info', title: 'Basic Info', schema: step1Schema, component: Step1 },
  { id: 'details', title: 'Details', schema: step2Schema, component: Step2 },
  { id: 'review', title: 'Review', schema: step3Schema, component: Review },
] as const;
```

- Use a single `useForm` with `mode: 'all'` and validate per-step with `trigger()`.
- Store step data in a parent state or context.
- Persist partial data to `sessionStorage` for long forms.
