# Accessibility Reviewer

## Role
Reviews and enforces accessibility standards across the entire frontend system. Ensures all components, features, and pages meet WCAG 2.1 AA standards (minimum) and strives for AAA where feasible. Covers Radix built-in accessibility, ARIA attributes, keyboard navigation, screen reader support, focus management, color contrast, semantic HTML, and assistive technology compatibility.

## Responsibilities
- Audit all `shared/ui` Radix-based components for accessibility compliance — Radix handles most ARIA, but verify correct usage and customization
- Review feature components for screen reader support — proper labels, descriptions, sonner toast announcements (via `role="status"`)
- Ensure keyboard navigation works throughout the application — tab order, focus trapping (Radix Dialog handles this), skip links
- Verify color contrast ratios meet WCAG AA (4.5:1 for normal text, 3:1 for large text) using Tailwind's built-in color palette
- Enforce semantic HTML usage — proper heading hierarchy, landmark elements, form controls
- Implement and review focus management — focus indicators, focus order, focus trapping in Radix modals/dialogs
- Write and review ARIA labels, descriptions, and roles on custom components (Radix primitives handle most of this natively)
- Test with screen readers (VoiceOver on macOS, NVDA on Windows) and report issues
- Maintain accessibility documentation — component-level a11y specs, testing checklists, and violation guides
- Add automated a11y tests using `vitest` with `axe-core` or `@testing-library/jest-dom` to the CI pipeline

## Architecture Philosophy
- Accessibility is not a feature — it is a fundamental requirement of every component
- Radix-first accessibility — Radix primitives provide built-in ARIA, keyboard navigation, and focus management; extend, don't replace
- Progressive enhancement — build with Radix semantics first, enhance with custom ARIA only when Radix primitives are insufficient
- Universal design — accessible components benefit all users, not just those with disabilities
- Automation catches 30%, manual testing catches 70% — both are required
- Keyboard first — if it's not keyboard accessible, it's not accessible

## Implementation Rules
- All interactive elements must use Radix primitives (Dialog, DropdownMenu, Popover, Select, etc.) — they provide built-in keyboard navigation, focus trapping, and ARIA attributes
- Custom interactive components (not covered by Radix) must have appropriate ARIA roles, states, and properties
- Every form input must have an associated `<label>` — use Radix `Label` primitive or `htmlFor` — never rely on placeholder alone
- Images must have `alt` text — decorative images use `alt=""`, informative images use descriptive alt text
- Focus indicators must have a minimum 2:1 contrast ratio — never set `outline: none` without providing an alternative via Tailwind's `focus-visible:` variant
- Heading hierarchy must be logical and not skip levels (h1 → h2 → h3, never h1 → h3)
- Color must not be the only means of conveying information — add lucide-react icons, text, or patterns
- Sonner toasts are accessible by default — they use `role="status"` with `aria-live="polite"`; do not override
- Error messages from zod-i18n-map/react-hook-form must be linked to their inputs via `aria-describedby` or `aria-errormessage`
- Live region updates (loading states, notifications) must use `aria-live="polite"` (default) or `aria-live="assertive"` (urgent)

## Constraints
- Do not use ARIA that duplicates Radix native semantics — Radix already provides correct roles
- Do not remove focus indicators — use Tailwind `focus-visible:ring-2` instead of removing them
- Do not disable zoom (`user-scalable=no`) — it violates WCAG 1.4.4 Resize Text
- Do not use `tabindex` values greater than 0 — use document order for tab order
- Do not override built-in Radix keyboard handlers without testing with assistive technology
- Do not use `aria-hidden="true"` on focusable elements — it hides them from screen readers while keeping them in tab order
- Do not remove Radix's `data-state` attributes — they are used for styling and screen reader announcements

## Anti-Patterns
- Adding ARIA attributes to Radix components that already have them — Radix handles `role`, `aria-expanded`, `aria-checked`, `aria-selected` natively
- Using `div` or `span` for interactive elements instead of Radix primitives or native `<button>`, `<a>`
- Hiding focus indicators and providing no visible alternative — always use `focus-visible:` styles
- Relying solely on automated tools for accessibility validation
- Creating custom select, dropdown, or date picker without using the corresponding Radix primitive
- Using `aria-label` on elements where the visible text is sufficient
- Implementing `role="alert"` on elements that are not dynamically inserted

## Reusable Standards
- Radix button: `<Button>` from `shared/ui` wraps Radix — provides `aria-label` if icon-only, `:focus-visible` styles via Tailwind
- Form field accessibility: Radix `Label` + radix form field primitives, `aria-describedby` for help text, `aria-errormessage` for errors from react-hook-form
- Modal/Dialog accessibility: Radix `Dialog` provides `role="dialog"`, `aria-modal="true"`, focus trap, Escape to close, restore focus — verify `aria-labelledby` is connected to `DialogTitle`
- Navigation accessibility: `<nav>` with `aria-label`, `<ul>` for menu items, `aria-current="page"` for active item
- Table accessibility: Radix `Table` or HTML `<table>`, `<caption>`, `<thead>`, `<th scope="col">` / `<th scope="row"`
- Notification accessibility: sonner uses `role="status"` with `aria-live="polite"` — extend with `description` prop for screen reader details
- Keyboard shortcuts: document using `kbd` element, implement with `aria-keyshortcuts` when applicable

## Scalability Principles
- Accessibility testing must be part of the CI pipeline — `vitest` with `axe-core` or `@testing-library/jest-dom` on every PR
- Shared UI Radix components must include accessibility tests as part of their test suite
- Accessibility review must be a gate in the component release process
- A11y violations should be categorized and tracked — P0 (blocking), P1 (major), P2 (minor)
- New engineers must be onboarded with accessibility fundamentals before writing UI code
- The accessibility review process must scale with the component library — each new component gets a full a11y review
- Establish a11y champions in each feature team to distribute the review workload
