# UI Component Hierarchy

## 7-Layer System

```
Layer 6: Features         ─── Feature-specific compositions
Layer 5: Pages            ─── Route-level components (thin)
Layer 4: Layouts          ─── AppLayout, AuthLayout (Outlet pattern)
Layer 3: Organisms        ─── DataList, ConfirmDialog, EmptyState
Layer 2: Molecules        ─── FormField, Card, DataTable
Layer 1: Primitives       ─── Radix wrappers, CVA variants, cn()
Layer 0: Design Tokens    ─── Tailwind v4 CSS custom properties
```

Dependencies flow **downward**. A Layer N component may only import from Layers ≤ N.

## Layer 0 — Design Tokens

Defined in `index.css` via Tailwind v4 `@theme` directive and CSS custom properties:

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  --color-primary: oklch(0.55 0.2 260);
  --font-sans: 'Inter Variable', sans-serif;
}
```

No React components here — pure CSS consumed by all layers.

## Layer 1 — Primitives (Atoms)

Built with `@radix-ui/*` primitives + `class-variance-authority` (CVA) + `cn()`:

```
shared/ui/atoms/
├── button.tsx          # @radix-ui/react-slot + CVA variants
├── input.tsx           # Styled <input> + CVA
├── dialog.tsx          # @radix-ui/react-dialog wrapper
├── select.tsx          # @radix-ui/react-select wrapper
├── checkbox.tsx        # @radix-ui/react-checkbox wrapper
├── avatar.tsx          # @radix-ui/react-avatar wrapper
├── tabs.tsx            # @radix-ui/react-tabs wrapper
├── label.tsx           # @radix-ui/react-label wrapper
├── dropdown-menu.tsx   # @radix-ui/react-dropdown-menu wrapper
├── alert-dialog.tsx    # @radix-ui/react-alert-dialog wrapper
├── separator.tsx       # @radix-ui/react-separator wrapper
├── icon.tsx            # lucide-react wrapper
└── index.ts
```

### Component pattern (no `React.FC`)

```tsx
// shared/ui/atoms/button.tsx
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        destructive: 'bg-red-500 text-white hover:bg-red-500/90',
        outline: 'border border-input bg-background hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

## Layer 2 — Molecules

Compose primitives into reusable patterns:

```
shared/ui/molecules/
├── form-field.tsx       # Label + Input + ErrorMessage (RHF v7 compatible)
├── card.tsx             # Container with header/body/footer
├── data-table.tsx       # @tanstack/react-table v8 wrapper
└── index.ts
```

## Layer 3 — Organisms

Complex compositions of molecules and atoms:

```
shared/ui/organisms/
├── data-list.tsx        # Toolbar + DataTable + Pagination
├── confirm-dialog.tsx   # AlertDialog + Text + Button
├── empty-state.tsx      # Icon + Text + CTA Button
└── index.ts
```

## Layer 4 — Layouts

Page-level structure using `<Outlet />` from react-router-dom v7:

```
layouts/
├── app-layout.tsx       # Sidebar + Header + Outlet
├── auth-layout.tsx      # Centered card + Outlet
└── index.ts
```

## Layer 5 — Pages

Thin route-level components that import features:

```
pages/
├── dashboard-page.tsx
├── login-page.tsx
└── index.ts
```

Pages are lazy-loaded by `createBrowserRouter` from react-router-dom v7.

## Layer 6 — Features

```
features/dashboard/
├── components/
│   ├── dashboard-grid.tsx     # Uses organisms + molecules
│   ├── metric-card.tsx        # Uses Card + Text
│   └── index.ts
```

## Design Skill Integration

[Taste Skill](https://www.tasteskill.dev) (`.design/design-taste-frontend/SKILL.md`) enforces anti-slop UI rules across all layers:

- **Layer 0 (Tokens)**: Color calibration — max 1 accent, saturation < 80%, no pure black, no "AI purple"
- **Layer 1 (Atoms)**: Typography — Geist/Satoshi over Inter, no serif on dashboards, deterministic sizing
- **Layer 2–3 (Molecules/Organisms)**: Layout — no 3-column equal card grids, grid over flex-math, asymmetric split
- **All Layers**: No neon glows, no gradient text, no emojis, no `h-screen` (use `min-h-[100dvh]`)

Load the skill when generating UI at any layer.

## Enforcement

- ESLint rules restrict imports to forbid downward layer violations.
- Barrel files at each layer control the public API surface.
- Layer 0–4 live in `shared/ui/`. Layer 5 lives in `pages/`. Layer 6 lives in `features/`.
