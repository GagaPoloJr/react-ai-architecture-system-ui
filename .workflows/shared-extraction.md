# Shared Component Extraction Rules

## The 3-Use Rule

A component/hook/utility **must** be used in 3+ features before it's extracted to shared.

**Exceptions:**
- Base UI primitives (Button, Input, Modal via `@radix-ui/*`, etc.)
- Layout components (PageHeader, Sidebar, etc.)
- Auth/guard components (RequireAuth, RequireRole)
- Any component using `cva()` that has clear variant surface

## Extraction Process

### 1. Identify Duplication
- Search with `rg "useGetStats" src/features/` to count usages
- Compare implementations — same pattern or just similar?
- If similar but not identical → abstract with `cva()` variants or props

### 2. Create CVA Variant Interface
```tsx
// Before (hardcoded in feature A & B):
<div className="rounded-xl border border-green-200 bg-green-50 p-4">
<div className="rounded-xl border border-red-200 bg-red-50 p-4">

// After (shared CVA component):
// src/components/ui/stat-card.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statCardVariants = cva('rounded-xl border p-4', {
  variants: {
    variant: {
      success: 'border-green-200 bg-green-50',
      danger: 'border-red-200 bg-red-50',
      default: 'border-gray-200 bg-gray-50',
    },
    size: {
      sm: 'p-3 text-sm',
      md: 'p-4 text-base',
      lg: 'p-6 text-lg',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, icon, variant, size }: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant, size }))}>
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-gray-500">{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
```

### 3. Move to Shared
```
src/components/ui/stat-card.tsx    # single file, no subfolder for simple components
```
Use flat structure for simple components; subfolder only if multiple related files needed.

### 4. Update Imports
- Remove the old file from the source feature
- Update references in source features to `@/components/ui/stat-card`
- Do NOT leave dead stub files

```ts
// Before
import { StatCard } from '@/features/dashboard/components';

// After
import { StatCard } from '@/components/ui/stat-card';
```

### 5. Verify No Feature Coupling
The shared component **must not**:
- Import from any feature folder (`@/features/*`)
- Reference feature-specific types or Zod schemas
- Call feature-specific hooks or query keys
- Know about business domain concepts
- Use `useTranslation()` with feature-specific namespaces

```tsx
// BAD — feature coupling
import { useAuthStore } from '@/features/auth/hooks/use-auth-store';

// GOOD — uses shared primitives only
import { useUiStore } from '@/hooks/use-ui-store';
```

### 6. Update Barrel Exports
- Add re-export to `src/components/ui/index.ts`
- Remove from the originating feature's barrel
- Remove from any other feature that was duplicating it
- Run `npm run typecheck` to catch stale imports

## Checklist

| Step | Status |
|------|--------|
| Used in 3+ features (or is a base primitive with CVA) | ☐ |
| CVA variants designed to absorb differences | ☐ |
| No feature imports in component | ☐ |
| All feature-specific logic removed | ☐ |
| Barrel exports updated everywhere | ☐ |
| Old files deleted (no dead code) | ☐ |
| All consuming features updated | ☐ |
| `npm run typecheck` passes | ☐ |
