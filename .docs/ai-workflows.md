# AI Workflows

How to use AI effectively with this architecture — prompting, context management, delegation, and validation.

## 1. Agent Role Mapping

This repo includes specialized AI agents in `.agent/`. Each agent has a defined role, responsibilities, and rules. Map your task to the right agent:

| Agent | File | Best For |
|-------|------|----------|
| Frontend Architect | `.agent/frontend-architect.md` | System design, folder structure, module boundaries, scalability |
| Feature Generator | `.agent/feature-generator.md` | Scaffolding new features, generating stubs |
| UI Engineer | `.agent/ui-engineer.md` | Building components, shared UI, layouts |
| API Integrator | `.agent/api-integrator.md` | API modules, query hooks, caching, error handling |
| State Manager | `.agent/state-manager.md` | State architecture, state categorization decisions |
| Form Engineer | `.agent/form-engineer.md` | Form building, validation schemas, form patterns |
| Performance Reviewer | `.agent/performance-reviewer.md` | Bundle analysis, render optimization, Core Web Vitals |
| Accessibility Reviewer | `.agent/accessibility-reviewer.md` | WCAG compliance, ARIA, keyboard nav, screen readers |
| Refactor Engineer | `.agent/refactor-engineer.md` | Code extraction, deduplication, pattern migration |
| Animation Engineer | `.agent/animation-engineer.md` | Motion design, transitions, micro-interactions |

## 2. How to Prompt Agents

### Include Context

Loading the agent file (`load .agent/{name}.md`) gives the AI its role definition, rules, and constraints. Always include this before asking the agent to do work.

### Specify the Task Clearly

Good prompt:

> Load .agent/ui-engineer.md and .agent/frontend-architect.md. I need a DataTable component for shared/ui/molecules. It should support sorting, filtering, pagination, and row selection. Use @tanstack/react-table v8. Use the existing UI primitives (Button, Checkbox) from shared/ui/atoms. The API contract is: { items: T[], total: number, page: number, pageSize: number }.

Bad prompt:

> Make a table component.

### Reference Architecture Files

> Read .docs/conventions.md and .docs/architecture-summary.md. Then create the API integration for a new "orders" feature.

### Use Templates

Templates in `.templates/` provide standard patterns for code generation. Reference them:

> Use the form template from .templates/form/ to generate a create-order form with these fields: customer name, email, product ID, quantity.

## 3. Context Management Across Sessions

### The Context Stack

Maintain context across AI sessions using this stack:

1. **Architecture files** (`.docs/*.md`) — persistent ground truth
2. **Agent files** (`.agent/*.md`) — role definitions for each agent
3. **Templates** (`.templates/`) — reusable patterns
4. **Current task context** — task-specific

### Recovery Pattern

When starting a new session, always load:

```
1. Load the relevant .docs/*.md files
2. Load the relevant .agent/*.md files
3. Load current .templates/ for the task type
4. Describe the current task
```

### Project Status Reference

For complex multi-session work, maintain a status file (e.g., `AGENTS.md` at the root):

```
# Current Session
- Task: Build order management feature
- Completed: feature scaffold, types, API layer
- In Progress: components (OrderList, OrderForm)
- Next: pages, route wiring, tests
- Blockers: Waiting on backend /orders endpoint spec

# Decisions Made
- Pagination: cursor-based (backend requirement)
- Status colors: use design tokens, not raw colors
- Forms: use shared FormField component
```

## 4. Delegation Patterns

### Single Agent Task

```
Load .agent/feature-generator.md
Generate a new feature called "inventory" with these types:
- Product: id, name, sku, quantity, price, category
- Category: id, name, description
Include API stubs for CRUD operations.
```

### Multi-Agent Workflow

```
=== PHASE 1: Architect ===
Load .agent/frontend-architect.md
Plan the folder structure for a dashboard feature.
Consider: stats widgets, activity feed, export button.
Output the directory tree.

=== PHASE 2: API Integrator ===
Load .agent/api-integrator.md
Based on the architect's plan, create the API layer.
Endpoints: GET /stats, GET /activity, POST /stats/export

=== PHASE 3: UI Engineer ===
Load .agent/ui-engineer.md and .docs/conventions.md
Build the dashboard components using shared/ui primitives.
StatCard, ActivityFeed, ExportButton.

=== PHASE 4: State Manager ===
Load .agent/state-manager.md
Wire the data flow: TanStack Query queries → components → URL state for filters.
```

### Review Pattern

```
Load .agent/accessibility-reviewer.md
Review this component for WCAG compliance:
[component code]
```

## 5. AI Code Generation Templates

### Feature Generation

```
Feature: {feature-name}
Entity: {entity-name}
Fields: {field-name}:{type}, ...
Endpoints: GET/POST/PUT/DELETE /{endpoint}
Special requirements: {validation rules, permissions, etc.}
```

### Component Generation

```
Component: {ComponentName}
Layer: shared/ui/{atoms|molecules|organisms} or features/{name}/components
Props: {prop-name}:{type}, ...
State: {local|query|zustand}
Accessibility: {keyboard nav, ARIA, screen reader considerations}
```

### TanStack Query Hook Generation

```
Feature: {feature-name}
Entity: {entity-name}
Endpoints:
  - GET /{entity}?page=&limit=&sort= → {paginated response}
  - POST /{entity} → {created entity}
  - PUT /{entity}/:id → {updated entity}
  - DELETE /{entity}/:id → {void}
Error responses: {error shape}
Cache strategy: {staleTime, gcTime, invalidation rules}
Use @tanstack/react-query v5: useQuery, useMutation, queryKeys factory
```

### Zustand Store Generation

```
Store: {name}
State:
  - {field}: {type} — {purpose}
  - {field}: {type} — {purpose}
Actions:
  - {action}: {description}
Persistence: {localStorage key if persisted}
Middleware: devtools, persist
Use zustand v5: import { create } from 'zustand'
```

### React Hook Form Generation

```
Form: {name}
Fields:
  - {field}: {type}, {validation rules} — {zod schema}
  - {field}: {type}, {validation rules} — {zod schema}
Resolver: @hookform/resolvers/zod
Submit: {mutation hook name}
Use react-hook-form v7: useForm with zodResolver
```

## 6. Validating AI Output

### Against Architecture Rules

After the AI generates code, validate:

- [ ] Files are in the correct directories per the structure
- [ ] No cross-feature imports (features never import from other features)
- [ ] Layer import rules respected (shared never imports from features)
- [ ] Barrel exports match the feature's `index.ts`

### Against Conventions

- [ ] File names are kebab-case (components: PascalCase)
- [ ] Component exports: default + named props interface, no `React.FC`
- [ ] Hook exports: named function with `use` prefix
- [ ] Type exports: `export type`, no `export default` on types
- [ ] Import order: externals → @shared → @features → relative
- [ ] One component per file, max 300-500 lines
- [ ] CVA variant names use kebab-case
- [ ] i18n keys use namespace:prefix pattern

### Technical Validation

- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] All imports resolve correctly
- [ ] No `any`, `as` casts, or `// @ts-expect-error`

### Validation Checklist Prompt

```
Validate this code against:
1. Cross-feature imports — are there any?
2. Reusability — is this extraction justified? (3+ uses)
3. Circular dependencies — are there any?
4. File placement — are files in the right directory?
5. Naming conventions — kebab-case files, PascalCase components?
6. Export patterns — named exports, proper barrels?

Code:
[code block]
```

## 7. Example Prompts

### Scaffold a Feature

```
Load .agent/feature-generator.md. Generate a feature called "reports" with:
- Types: Report (id, title, type, createdAt, status: 'draft'|'published'|'archived')
- API: CRUD at /reports
- Components: ReportList (table via @tanstack/react-table), ReportForm (react-hook-form + zod), ReportDetail
- Include barrel exports
```

### Add API Integration

```
Load .agent/api-integrator.md. I have a feature "inventory" already scaffolded.
Add these endpoints:
- GET /api/inventory/items?category=&search= → { items: Item[], total: number }
- POST /api/inventory/items → Item
Use @tanstack/react-query v5: useQuery with staleTime 30s, invalidate on create.
```

### Build a Form

```
Load .agent/form-engineer.md. Create a user registration form.
Schema (zod v3): name (required, min 2), email (required, valid email),
password (required, min 8), role (enum: admin | officer | viewer).
Use react-hook-form v7 + @hookform/resolvers/zod.
Use shared FormField component. Submit via useCreateUser mutation with sonner toast.
```

### Build a Zustand Store

```
Load .agent/state-manager.md. Create an auth store.
State: user (User | null), token (string | null), isAuthenticated (boolean)
Actions: login(credentials), logout(), setUser(user)
Use zustand v5 with devtools and persist middleware.
Persist token to localStorage.
```

### Build a Component with CVA

```
Load .agent/ui-engineer.md. Build a Button component for shared/ui/atoms.
Use class-variance-authority for variants: default, primary, destructive, outline, ghost, link.
Sizes: sm, md, lg.
Use tailwind-merge + clsx via cn() utility.
Use @radix-ui/react-slot for asChild prop.
```

### Performance Review

```
Load .agent/performance-reviewer.md. Review this page component:
[code]
Check for: unnecessary re-renders, missing lazy loading, large bundle imports,
inline functions/objects in JSX, inefficient list rendering.
```

### Design Quality Review

```
Load .design/design-taste-frontend/SKILL.md. Review this component:
[code]
Check: anti-slop compliance (no neon, no pure black, no Inter),
DESIGN_VARIANCE dial (layout asymmetry), color calibration,
no 3-column card grids, no emojis, proper viewport units.
```

### Accessibility Review

```
Load .agent/accessibility-reviewer.md. Audit this modal component:
[code]
Check: focus trap, ARIA attributes, keyboard handlers, focus restoration,
aria-labelledby, Escape key handling, reduced motion.
```
