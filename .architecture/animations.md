# Animation Architecture

## Stack

- **CSS animations**: tw-animate-css v1 (Tailwind v4 plugin)
- **Reduced motion**: `prefers-reduced-motion` media query
- **Radix animation**: @radix-ui/* primitives handle their own mount/unmount animations via CSS

## Setup

```css
/* src/index.css */
@import "tailwindcss";
@import "tw-animate-css";
```

The `tw-animate-css` plugin provides utility classes: `animate-fade-in`, `animate-slide-up`, `animate-scale-in`, `animate-spin`, `animate-ping`, etc.

## Layer System

```
┌──────────────────────────────────────────────────┐
│ Layer 3: Compositions                             │
│ Page transitions, route-level animations,         │
│ orchestrated via Tailwind utility classes         │
├──────────────────────────────────────────────────┤
│ Layer 2: Pattern Library                          │
│ Entrance/exit, list stagger, skeleton pulse,      │
│ notification slide (sonner v2), modal backdrop    │
├──────────────────────────────────────────────────┤
│ Layer 1: Primitives                               │
│ fade-in, slide-up, scale-in, spin, ping           │
│ (from tw-animate-css v1)                          │
├──────────────────────────────────────────────────┤
│ Layer 0: Tokens                                   │
│ Tailwind v4 @theme: --duration-*, --ease-*       │
└──────────────────────────────────────────────────┘
```

## Animation Primitives (Layer 1)

Provided by `tw-animate-css v1`:

| Class | Effect | Use Case |
|-------|--------|----------|
| `animate-fade-in` | `opacity 0→1` | Generic appear |
| `animate-slide-up` | `translateY(4px)→0` + fade | Cards, panels |
| `animate-scale-in` | `scale(0.95)→1` + fade | Modals, dialogs |
| `animate-spin` | `rotate(0→360)` | Loading states |
| `animate-ping` | `scale(1→2)` + fade | Notification dots |

## Tailwind v4 Transition Classes

```tsx
// Entrance
<div className="animate-fade-in">Content</div>
<div className="animate-slide-up">Panel</div>

// Hover/Interact
<button className="transition-colors hover:bg-primary/90">Click</button>

// Stagger children
{items.map((item, i) => (
  <div
    key={item.id}
    className="animate-slide-up"
    style={{ animationDelay: `${i * 50}ms` }}
  >
    {item.name}
  </div>
))}
```

## Reduced Motion

```css
/* src/index.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Performance Rules

1. Animate only `transform` and `opacity` — GPU-accelerated.
2. Use `will-change: transform` sparingly (only on actively animating elements).
3. Avoid animating more than 20 elements simultaneously.
4. Prefer CSS animations (`tw-animate-css`) over JS-driven animations.

## Radix Animation Patterns

@radix-ui/* primitives use CSS `data-[state=open]` and `data-[state=closed]` attributes for animations:

```tsx
// Example: Dialog with animation
<Dialog.Content className="data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out">
  ...
</Dialog.Content>
```

Sonner v2 toasts come with built-in slide/enter animations — no additional setup needed.
