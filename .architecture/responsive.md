# Responsive Conventions

## Approach: Mobile-First

Always start with the mobile layout (single column, full-width) and add `sm:`/`md:`/`lg:` breakpoints to enhance for larger screens.

## Breakpoint Strategy

| Breakpoint | Min Width | Layout Behavior |
|-----------|-----------|----------------|
| Base (no prefix) | 0 | Single column, stacked, full-width |
| `sm:` | 640px | Two-column grids, inline nav |
| `md:` | 768px | Sidebar layouts, multi-column cards |
| `lg:` | 1024px | Full desktop layout, sidebars beside content |
| `xl:` | 1280px | Three-column grids, wide layouts |

## Navigation Patterns

### Desktop (md+)
- Horizontal nav bar in the `pos-layout` header with icon + label links

### Mobile (<md)
- **Bottom tab bar**: Fixed at the bottom of the viewport with icon-only navigation
- The `<main>` content needs `pb-16 md:pb-0` to avoid being hidden under the tab bar
- Labels are hidden, only icons shown

## Layout Patterns

### Page Layouts
- Use `flex flex-col gap-6 lg:flex-row` for sidebar + content pages
- Sidebar should be `w-full lg:w-80 shrink-0` — full width on mobile, fixed width on desktop
- Content area should be `flex-1`

### Content Grids
- Start at `grid-cols-1`, widen at breakpoints: `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Always use `gap-4` or `gap-6`

### Cards & Lists
- Don't hardcode widths — let the parent grid/container control the width
- Use `truncate` on text that might overflow in flex layouts
- Responsive text: `text-base sm:text-lg` or `text-2xl sm:text-3xl` for titles
- Card action buttons: `text-sm sm:text-lg`

## Flex Wrapping

Any horizontal flex row that might overflow should add `flex-wrap`:

```tsx
// Good
<div className="flex flex-wrap items-center gap-2">

// Bad — overflows on small screens
<div className="flex items-center gap-2">
```

## Input Widths

Never use hardcoded widths like `w-64`. Instead:
- `w-full` on mobile with `sm:w-64` for larger screens
- Or let flexbox sizing handle it with `flex-1`

## Kitchen Display

- Grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`
- Padded with `p-4 sm:p-6`
- Kitchen header: `flex flex-wrap items-center gap-4 sm:gap-6 px-4 sm:px-6`

## Negative Margins

Avoid `-mx-*` / `-my-*` to break out of parent padding — they cause horizontal overflow. Instead, restructure the parent container or remove the page-level wrapper.

## Common Patterns

```tsx
// Page layout with sidebar
<div className="flex flex-col gap-6 lg:flex-row">
  <div className="flex-1">{/* main content */}</div>
  <div className="w-full lg:w-80 shrink-0">{/* sidebar */}</div>
</div>

// Content grid
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map(item => <Card key={item.id} />)}
</div>

// Button row that wraps
<div className="flex flex-wrap items-center gap-2">
  <button>Category 1</button>
  <button>Category 2</button>
  <div className="ml-auto">{/* search + actions */}</div>
</div>

// Responsive text
<h2 className="text-lg sm:text-xl font-bold">Title</h2>
```
