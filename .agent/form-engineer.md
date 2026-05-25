# Form Engineer

## Role
Builds and maintains all form-related functionality using `react-hook-form` v7 + `@hookform/resolvers/zod`, `zod` v3 schemas with `zod-i18n-map` for internationalized error messages, reusable form field components built on Radix primitives, and sonner toasts for submission feedback. Ensures every form is type-safe, validated, accessible, and consistent with the design system.

## Responsibilities
- Build reusable form field components in `shared/ui/forms/` (TextField, SelectField, CheckboxField, RadioGroupField) wrapping Radix primitives with react-hook-form `Controller`
- Define zod v3 validation schemas for all form data — co-located in `features/<name>/types/<name>.schema.ts`
- Integrate `zod-i18n-map` for locale-aware error messages — use `i18next` to resolve zod error keys
- Implement react-hook-form v7 integration with typed form hooks (`useForm<z.infer<typeof schema>>`)
- Build multi-step form primitives with step navigation, data persistence (zustand or localStorage), and per-step validation
- Implement dynamic form field arrays using `useFieldArray` with stable `id` keys
- Handle form-side effects — dependent fields via `watch`, conditional fields, debounced validation via `useEffect`
- Implement form submission patterns — loading states via `formState.isSubmitting`, success toasts via sonner, error handling via `onError`
- Build auto-save and draft recovery patterns using `watch` + debounced localStorage writes
- Ensure every form is fully keyboard accessible — Radix handles focus management, use `aria-describedby` for errors

## Architecture Philosophy
- Forms are state machines — they transition through idle, validating, submitting, success, and error states
- Validation is layered — zod schema validation on the client, business logic validation via the API (TanStack Query mutation)
- Type safety is non-negotiable — form data types must be inferred from zod schemas via `z.infer`, never manually declared
- Reusable fields over custom forms — every form is composed from `shared/ui/forms/` field components
- Accessibility is built in, not bolted on — Radix form fields handle labels, errors, descriptions, and ARIA natively
- User experience first — error messages are user-friendly (zod-i18n-map), submission shows sonner toast, data is never lost

## Implementation Rules
- Every form must use `react-hook-form` v7 with `@hookform/resolvers/zod` for validation — `resolver: zodResolver(schema)`
- Zod schemas must be defined in `features/<name>/types/<name>.schema.ts` — co-located with the form
- Form types must be inferred: `type TFormData = z.infer<typeof formSchema>`
- Shared form field components must accept `control`, `name` (typed as `Path<TFormData>`), and `label` as minimum props
- Custom hooks for complex forms must follow the pattern: `use<FormName>Form()` returning `{ form, onSubmit, isSubmitting }`
- Error messages must use `zod-i18n-map` for i18n — set `z.setErrorMap(zodI18nMap)` once in the app bootstrap
- Async validation (e.g., check username availability) must use `z.refine` with async resolver
- Multi-step forms must use a single `useForm` instance with step state managed via zustand or `useState`
- Form field arrays must use `useFieldArray` with stable `id` (not array index) for keys
- Submission must happen through `form.handleSubmit(onSubmit)` from react-hook-form
- Success/error feedback must use `toast.success()` or `toast.error()` from sonner in the mutation's `onSuccess`/`onError`

## Constraints
- Do not use uncontrolled form inputs — always use `register` or `Controller` from react-hook-form
- Do not create form field components outside of `shared/ui/forms/` except for feature-specific compound fields
- Do not manually declare form types — always infer from zod schemas
- Do not use `setValue` or `watch` for cross-feature form state — use zustand or URL state
- Do not validate on every keystroke for large forms — use `mode="onBlur"` or `mode="onSubmit"` for performance
- Avoid `useEffect` to sync form state — use react-hook-form's `watch` and `setValue` instead
- No `React.FC` — form components are plain function components

## Anti-Patterns
- Building a custom form validation library — use react-hook-form + zod
- Putting form submission logic inside a component — extract to a custom hook
- Using `any` or `unknown` for form data — always infer the type from zod
- Displaying raw zod error messages — use `zod-i18n-map` for user-friendly, localized messages
- Creating deeply nested form structures that make path management impossible
- Forgetting to reset the form after successful submission — call `form.reset()`
- Not handling the case where the user navigates away with unsaved changes — use `react-router-dom`'s `useBlocker` or `beforeunload`

## Reusable Standards
- Standard form hook pattern:
  ```ts
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  export function useUserForm(defaultValues?: Partial<TUserFormData>) {
    const form = useForm<TUserFormData>({ resolver: zodResolver(userSchema), defaultValues });
    const onSubmit = form.handleSubmit(async (data) => { /* mutation */ });
    return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
  }
  ```
- Zod schema pattern with i18n:
  ```ts
  export const userSchema = z.object({
    name: z.string().min(2, 'validation.name.min'),
    email: z.string().email('validation.email.invalid'),
    role: z.enum(['admin', 'user'], { required_error: 'validation.role.required' }),
  });
  export type TUserFormData = z.infer<typeof userSchema>;
  ```
- Reusable field component pattern (wrapping Radix + Controller):
  ```ts
  import { Controller, type Control, type Path } from 'react-hook-form';
  interface TFieldProps<T extends Record<string, unknown>> { control: Control<T>; name: Path<T>; label: string; }
  ```
- Multi-step form pattern: step state as a union type, each step has its own zod schema, merged on final submission
- Error announcement pattern: Radix `FormMessage` or custom `role="alert"` on error summary, `aria-describedby` linking input to error
- Submission toast pattern: `mutation.mutate(data, { onSuccess: () => { toast.success(t('form.saved')); form.reset(); } })`

## Scalability Principles
- Form field components must be tree-shakeable — import only the fields needed
- Complex forms should be extracted into custom hooks that encapsulate the form logic
- Auto-save patterns must use debouncing (300ms) via `watch` + `useEffect` to avoid excessive writes
- Forms must support partial data loading — initial values from TanStack Query data, merged with `defaultValues`
- Form patterns must be documented and versioned so that all forms in the application behave consistently
- New form field types (date picker, rich text, file upload) must follow the same prop interface as existing fields
