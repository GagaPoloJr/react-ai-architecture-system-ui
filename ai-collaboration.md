# AI Collaboration Guide

How to effectively use AI agents with this architecture — role mapping, context management, prompt templates, and output validation.

---

## 1. Agent Role Mapping

This repository defines specialized AI agents in `.agent/`. Each agent has a well-defined role, responsibilities, and constraints. Loading the agent file gives the AI full context about its expected behavior, boundaries, and output standards.

| Agent | File | Role Summary |
|-------|------|-------------|
| **Frontend Architect** | `.agent/frontend-architect.md` | System design, folder structure, module boundaries, dependency rules, scalability strategy |
| **Feature Generator** | `.agent/feature-generator.md` | Scaffolds complete, isolated feature modules following FDD conventions |
| **UI Engineer** | `.agent/ui-engineer.md` | Builds shared UI components (Radix + CVA), feature components, and layouts; enforces component hierarchy |
| **API Integrator** | `.agent/api-integrator.md` | Creates typed API modules (axios), TanStack Query hooks, caching strategies, error handling |
| **State Manager** | `.agent/state-manager.md` | Categorizes state, establishes data flow patterns, prevents state duplication |
| **Form Engineer** | `.agent/form-engineer.md` | Builds forms with react-hook-form v7, zod v3 schemas, validation, and accessibility |
| **Performance Reviewer** | `.agent/performance-reviewer.md` | Audits bundle size, renders, CWV; enforces performance budgets |
| **Accessibility Reviewer** | `.agent/accessibility-reviewer.md` | Enforces WCAG 2.1 AA, audits components for a11y, writes accessibility tests |
| **Refactor Engineer** | `.agent/refactor-engineer.md` | Detects duplication, extracts shared code, migrates patterns, eliminates technical debt |
| **Animation Engineer** | `.agent/animation-engineer.md` | Creates animation primitives, motion tokens, transitions, micro-interactions |

---

## 2. How to Use Agents Effectively

### Step 1: Load the Agent

Always start by loading the agent file so the AI understands its role:

```
Load .agent/ui-engineer.md
```

### Step 2: Load Context

Load the relevant architecture and convention files:

```
Load .docs/conventions.md
Load .docs/architecture-summary.md
```

### Step 3: Specify the Task

Be specific about what you need. Include:

- Feature name and entity
- Props, types, and contracts
- Which existing components to use
- State management approach
- Edge cases to handle

### Step 4: Request Output

Ask for specific deliverables:

```
Generate:
1. Type definitions in types/user.ts
2. API service in api/user-api.ts (axios)
3. TanStack Query hooks in hooks/
4. Component in components/UserList.tsx (no React.FC)
5. Barrel exports in index.ts
```

### Step 5: Validate

Check output against conventions and rules (see Section 6).

---

## 3. Multi-Agent Workflows

### Sequential Pipeline

For complex features, use a sequential pipeline where each agent builds on the previous output:

```
PHASE 1: Architect
Load .agent/frontend-architect.md
Plan the folder structure and module boundaries for a dashboard feature.
Output: directory tree, dependency map, component hierarchy.

PHASE 2: API Integrator
Load .agent/api-integrator.md
Using the architect's plan, create API modules and TanStack Query hooks.
Output: api/, hooks/ files with types and error handling.

PHASE 3: UI Engineer
Load .agent/ui-engineer.md
Using the architect's component hierarchy and the API hooks, build UI components.
Output: components/ files using shared/ui primitives (Radix + CVA).

PHASE 4: State Manager
Load .agent/state-manager.md
Wire data flow and state decisions for the feature.
Output: state integration, URL state for filters, zustand store slices if needed.
```

### Review Pipeline

```
PHASE 1: Performance Reviewer
Load .agent/performance-reviewer.md
Review feature components for performance issues.

PHASE 2: Accessibility Reviewer
Load .agent/accessibility-reviewer.md
Review same components for WCAG compliance.

PHASE 3: Refactor Engineer
Load .agent/refactor-engineer.md
Based on review feedback, refactor to address issues.
```

---

## 4. Prompt Templates

### Feature Generation

```
Load .agent/feature-generator.md
Generate a feature called "{feature-name}" with entity "{entity}".

Types:
- {Entity}: {field-name}: {type}, ...
- {Entity}Filters: {filter fields}

Endpoints:
- GET /{entities} → paginated list
- POST /{entities} → create
- PUT /{entities}/:id → update
- DELETE /{entities}/:id → delete

Include:
- All barrel exports
- TanStack Query hooks with proper cache keys (useQuery v5)
- Mutation hooks with invalidation (useMutation v5)
- Loading, empty, and error state stubs
```

### API Integration (axios + TanStack Query v5)

```
Load .agent/api-integrator.md
Add API integration for {feature-name}.

Contracts:
- GET /{path}: returns {type} — staleTime {n}s
- POST /{path}: accepts {type} — invalidate [key]
- Error shape: {{ error: string, details?: Record<string, string[]> }}

Cache strategy:
- List: staleTime {n}s, gcTime {n}s
- Detail: staleTime {n}s
- Mutations: invalidate list + detail on success

Use axios client from @configs/http/client
Use useQuery / useMutation from @tanstack/react-query
```

### Component Building (Radix + CVA + tailwind-merge)

```
Load .agent/ui-engineer.md
Build a {component-name} component.

Properties:
- {prop}: {type} — {description}
- {prop}: {type} — {description}

Behavior:
- {expected behavior description}

States:
- Loading: {description}
- Empty: {description}
- Error: {description}
- Success: {description}

Accessibility:
- Keyboard: {keyboard behavior}
- ARIA: {ARIA requirements} (Radix handles most)

Use from shared/ui:
- {Component} from @shared/ui/{layer}

Styling:
- class-variance-authority for variants
- tailwind-merge + clsx via cn() utility
- @radix-ui/react-slot for asChild
```

### State Decisions (zustand v5)

```
Load .agent/state-manager.md
Design state management for {feature-name}.

Data sources:
- {source 1}: server API → TanStack Query, refresh frequency
- {source 2}: user input → react-hook-form
- {source 3}: cross-feature shared state → zustand v5

URL parameters:
- {param}: {purpose} (useSearchParams)
- {param}: {purpose}

Shared state needs:
- {state}: used by {features} → zustand store with devtools + persist middleware
```

### React Hook Form (v7 + zod v3)

```
Load .agent/form-engineer.md
Create a form for {feature-name}.

Fields:
- {field}: {type}, {zod validation} → {zod schema definition}
- {field}: {type}, {zod validation} → {zod schema definition}

Resolver: @hookform/resolvers/zod (zodResolver)
Submit: useCreate{Entity} mutation with sonner toast on success/error

Use shared FormField component from @shared/ui/molecules
Validation messages via i18n keys
```

### Refactoring

```
Load .agent/refactor-engineer.md
Refactor {file/feature}:

Problems:
- {issue 1}: {description}
- {issue 2}: {description}

Target pattern:
- Extract {thing} to shared/{location}
- Split {component} into {components}
- Migrate {pattern} to {new pattern}

Rules:
- Preserve all behavior
- Update all imports
- Run tests after
```

---

## 5. Context Management Strategy

### Repository Context Files

This hierarchy of context files ensures consistent AI quality across sessions:

```
Priority 1: .agent/{name}.md     — Role definition (always load)
Priority 2: .docs/*.md           — System design + conventions (load per task)
Priority 3: .architecture/*.md   — Architecture decisions (load per task)
Priority 4: .rules/*.md          — Constraints (load per task)
Priority 5: .templates/*         — Code patterns (reference)
```

### Session Recovery

When resuming work after a break or starting a new session:

```
1. Load the agent file for your role
2. Load the relevant docs (.docs/conventions.md, .docs/architecture-summary.md)
3. Load the relevant rules
4. State current task and what was done previously
```

### Project Context File

For complex multi-session work, maintain an `AGENTS.md` file at root:

```markdown
# Current Project Context

## Active Session
- Feature: order-management
- Completed: scaffold, types, API layer
- In Progress: OrderList component, pagination
- Next: OrderForm, route wiring

## Decisions
- Pagination: cursor-based (server requirement)
- Status colors: use design tokens
- Cache: 30s stale for lists, 2min for details

## Open Questions
- Backend team hasn't confirmed /orders/export endpoint shape
- Need to decide on optimistic update approach
```

---

## 6. Output Validation

### Architecture Validation

After receiving AI output, verify:

- [ ] Files in correct directories per the structure
- [ ] No cross-feature imports (features never import from other features)
- [ ] Layer import rules respected (shared never imports from features)
- [ ] Barrel exports match conventions (named exports, no leaks)

### Convention Validation

- [ ] File names: kebab-case (components: PascalCase.tsx)
- [ ] Component exports: default + named interface, no `React.FC`
- [ ] Hook exports: named function with `use` prefix
- [ ] Type exports: `export type`, never `export default`
- [ ] Import order: external → @shared → @features → relative
- [ ] Max file size: 300 lines (components), 500 lines (other)
- [ ] CVA variants use kebab-case for multi-word names
- [ ] i18n keys follow namespace:path convention

### Technical Validation

- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Tests pass (if applicable)
- [ ] All imports resolve correctly
- [ ] No `any`, `as` casts, or `// @ts-expect-error`

---

## 7. Error Recovery Patterns

### When AI Output Is Incorrect

```
1. Identify the specific violation
2. Load the relevant rule/convention file
3. State: "The [output] violates [rule]. [Rule says X]. Please fix."
4. Request corrected output with the rule as context
```

### Common Violations

| Violation | Fix |
|-----------|-----|
| Cross-feature import | Extract shared logic to shared/ |
| Wrong file location | Move to correct layer directory |
| Incorrect export pattern | Fix to named exports, proper barrel |
| Missing error handling | Add error boundary + error states |
| No loading state | Add skeleton or loading indicator |
| Wrong naming convention | Rename to kebab-case/PascalCase |
| Missing types | Add TypeScript interface or type |
| Uses React.FC | Convert to function Component() |

---

## 8. Tips for Better AI Output

### Be Specific

| Instead of | Use |
|-----------|-----|
| "Make a user list" | "Generate a UserList component that displays users from useUsers TanStack Query. Columns: name, email, role, status. Use @tanstack/react-table v8. Support sorting by name and filtering by role." |
| "Add API" | "Add a useOrders query hook that fetches from GET /orders with pagination params {page, limit, sort}. Use axios client. staleTime: 30s." |
| "Fix performance" | "Profile the DashboardPage: re-renders on every search param change. Memoize StatsGrid and lazy-load ChartWidget." |
| "Make a form" | "Create a login form with react-hook-form v7 + zod v3. Fields: email (required, email), password (required, min 8). Use zodResolver from @hookform/resolvers. Submit via useLogin mutation. Show sonner toast on error." |

### Provide Examples

Give the AI one example of the expected output format. This significantly improves consistency.

### Iterate

Don't expect perfect output on the first try. Use the validation checklist, identify issues, and guide the AI through corrections.

---

## 9. Setting Up AI in Your Editor

### Recommended Configuration

For best results with AI coding assistants:

1. Load `.agent/{role}.md` as system prompt or custom instructions
2. Load `.docs/conventions.md` as reference context
3. Set TypeScript strict mode for type-aware suggestions

### File-Specific Context

When working on a specific file, include:
- The barrel export chain that imports/exports this file
- The parent component or hook that uses this file
- The shared components it should use (not create)
