# Component Template

## File Structure

```
shared/ui/{{ComponentName}}/
├── {{component-name}}.tsx          # Component implementation
├── {{component-name}}.types.ts     # Props interface & related types
├── {{component-name}}.test.tsx     # Unit / integration tests
└── index.ts                        # Re-export
```

## Props Interface Conventions

```tsx
// {{component-name}}.types.ts

export interface {{ComponentName}}Props extends React.ComponentProps<'div'> {
  items: Item[];
  onSelect?: (item: Item) => void;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}
```

- Extend `React.ComponentProps<'element'>` when the component wraps a native element.
- Use discriminated unions for mutually exclusive props.
- Use JSDoc `/** */` comments on public props.

## Component Definition — No React.FC

```tsx
// {{component-name}}.tsx
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

const {{componentName}}Variants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function {{ComponentName}}({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof {{componentName}}Variants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="{{component-name}}"
      className={cn({{componentName}}Variants({ variant, size, className }))}
      {...props}
    />
  );
}

export { {{ComponentName}}, {{componentName}}Variants };
```

## Slot / asChild Pattern (Radix)

Use `Slot` from `@radix-ui/react-slot` when you need to let consumers override the root element:

```tsx
import { Slot } from '@radix-ui/react-slot';

function {{ComponentName}}({ asChild, ...props }: Props) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
}
```

## Forward Ref (Interactive Elements)

```tsx
import { forwardRef } from 'react';

function {{ComponentName}}(
  { children, ...props }: {{ComponentName}}Props,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
```

## Icons (lucide-react)

```tsx
import { ChevronDown, ChevronUp } from 'lucide-react';

function AccordionIcon({ isOpen }: { isOpen: boolean }) {
  return isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />;
}
```

## Compound Components / Sub-components

```tsx
function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return <table data-slot="table" className={cn('w-full', className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-head" className={cn(className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr data-slot="table-row" className={cn(className)} {...props} />;
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return <td data-slot="table-cell" className={cn('p-2', className)} {...props} />;
}

export { Table, TableHead, TableRow, TableCell };
```

## Shared vs Feature Components

| Kind | Location | Reusable? |
|------|----------|-----------|
| Shared UI primitives (Button, Input, Modal) | `@/components/ui/` | Yes — used across features |
| Feature-specific (UserList, ApprovalCard) | `features/*/components/` | No — only used in one feature |
| Page-level (DashboardPage) | `features/*/pages/` | No — route entry point |

**Rule of thumb:** If you're tempted to copy a component to another feature, extract it to `@/components/ui/` first.

## Accessibility Requirements

- Every interactive element must have an accessible name (`aria-label` or visible label).
- Use semantic HTML (`<button>`, `<nav>`, `<table>`) over `<div>` soup.
- Manage focus for modals, dialogs, and menus.
- Support keyboard navigation (Enter, Escape, Arrow keys).
- Test with a screen reader before marking complete.
