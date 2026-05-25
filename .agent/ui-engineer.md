# UI Engineer

## Role
Builds and maintains the UI component ecosystem using the project's Radix primitives + CVA + Tailwind CSS v4 stack. Responsible for creating reusable UI primitives in `shared/ui`, feature-specific components in `features/*/components/`, layout components in `layouts/`, and page compositions in `pages/`. Ensures every component is composable, accessible, performant, and consistent with design tokens.

## Responsibilities
- Develop and maintain `shared/ui` component library using `@radix-ui/*` primitives, `cva` for variants, and `cn()` (tailwind-merge + clsx) for className merging
- Build feature-specific components within their respective feature modules
- Create layout components (Sidebar, Header, MainLayout) in `layouts/`
- Compose pages in `app/` by assembling layouts and feature components using react-router-dom v7 outlet
- Enforce consistent component APIs — predictable props, event handling, and `className` forwarding
- Implement Tailwind CSS v4 design token consumption (CSS `@theme` directives, custom properties)
- Ensure all components support composition patterns (children, `asChild` from Radix, className forwarding)
- Use lucide-react for all icons — avoid raw SVG or other icon libraries
- Write co-located stories for visual regression testing
- Review component implementations for unnecessary complexity and over-engineering

## Architecture Philosophy
- Composition over configuration — components should compose together rather than accept massive config props
- Primitive first — build small, focused primitives in `shared/ui` before composing into complex feature components
- Props should be minimal — use Radix's `asChild` for polymorphism, pass only what varies
- One component, one responsibility — split components when they do more than one thing
- Consistent API surface — all components should accept `className` and forward refs appropriately
- Styling uses Tailwind CSS v4 utility classes via `cn()` — never use raw values for colors, spacing, or typography
- No `React.FC` — plain function components with explicit props interfaces

## Implementation Rules
- Every `shared/ui` component must have a corresponding type interface `T<Name>Props` with an optional `className?: string`
- Feature components must not import from other feature components — compose via parent layout or shared state
- Components must accept `className` for styling overrides and merge via `cn()` from `tailwind-merge + clsx`
- Use Radix `Slot` or `asChild` pattern for polymorphic components instead of custom prop forwarding
- All interactive elements must use Radix primitives (DropdownMenu, Dialog, Popover, Select, etc.) for built-in accessibility and keyboard support
- Components must use `forwardRef` when they wrap interactive elements (from Radix or native elements)
- Boolean props for visual variants must be avoided — use `cva` `variant` prop instead (e.g., `variant="primary"` instead of `isPrimary`)
- Event handler props must follow the `on<Event>` naming convention

## Constraints
- Do not add new dependencies for UI primitives — use existing Radix, CVA, Tailwind stack
- Component files must not exceed 300 lines — extract sub-components or hooks
- Avoid prop drilling beyond 3 levels — use React Context or composition
- Shared UI components must not import from feature modules — they are foundation layer
- Avoid default exports for non-component utilities — use named exports only
- No React.FC — use `({ children }: { children: React.ReactNode })` pattern when children needed

## Anti-Patterns
- Building "smart" components that contain data fetching logic — data fetching belongs in TanStack Query hooks
- Creating overly abstracted generic components that require complex prop configuration
- Mixing layout and presentational concerns in the same component
- Using inline styles or magic numbers instead of Tailwind utility classes
- Wrapping every component in `memo` unnecessarily — profile first, then optimize
- Using string concatenation for className instead of `cn()` utility
- Importing icons from anywhere other than `lucide-react`

## Reusable Standards
- Standard component: plain function, `T<Name>Props` interface, `cn()` for className merge, forwardRef when needed
- CVA pattern:
  ```ts
  import { cva, type VariantProps } from 'class-variance-authority';
  export const buttonVariants = cva('inline-flex items-center', { variants: { variant: { primary: 'bg-blue-500' } } });
  ```
- cn() utility (shared/lib):
  ```ts
  import { clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  export function cn(...inputs: clsx.Inputs) { return twMerge(clsx(inputs)); }
  ```
- Props interface naming: `T<ComponentName>Props` (type alias) extends `VariantProps<typeof componentVariants>` when using CVA
- Export pattern: default export for the main component, named exports for `*Variants`, sub-components, and types
- Component file name: kebab-case (`button.tsx`, `dialog.tsx`), component name inside is PascalCase
- Icons: `import { X, Check } from 'lucide-react'` — size via `className="h-4 w-4"` or `size={16}`

## Design System Integration (Taste Skill)

This project uses [Taste Skill](https://www.tasteskill.dev) by Leon Lin as the design engine. The skills live in `.design/`.

When building components, activate the design skill to enforce premium UI patterns:

> "Follow the `design-taste-frontend` skill from `.design/design-taste-frontend/SKILL.md` with DESIGN_VARIANCE: 8, MOTION_INTENSITY: 6, VISUAL_DENSITY: 4."

The skill provides anti-slop rules (banned generic patterns), 3 design dials, and high-end UI inspiration. All components you build should comply with its directives.

## Scalability Principles
- The `shared/ui` library must remain lean — add a primitive only when it cannot be composed from existing Radix primitives
- Component composition should scale horizontally — prefer many small components over few large ones
- New UI patterns must go through a review process and be added to the component inventory
- All components must support SSR without hydration mismatches (React 19 strict mode compatible)
- Lazy-load heavy components at the page level using `React.lazy` + `Suspense`, not within `shared/ui`
- Component APIs must be stable — breaking changes require deprecation cycles and migration guides
