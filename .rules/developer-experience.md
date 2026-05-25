# Developer Experience Standards

## 1. Naming Conventions
- **Components**: PascalCase, noun-based: `UserProfile`, `OrderTable`, `DatePicker`.
- **Hooks**: camelCase, `use`-prefixed, verb-based: `useAuth`, `usePagination`, `useDebouncedValue`.
- **Utilities**: camelCase, verb-based: `formatDate`, `parseCSV`, `mergeClassNames`.
- **Types/Interfaces**: PascalCase, prefixed with `T` for generics only: `User`, `OrderItem`, not `IUser`.
- **Files**: kebab-case: `user-profile.tsx`, `use-auth.ts`, `format-date.ts`. Consistent case per directory.
- **Constants**: UPPER_SNAKE_CASE for module-level constants: `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`.

## 2. File Organization
- One component per file. No exceptions.
- A component file must contain ONLY the component definition, its types (co-located), and its styled elements if applicable.
- Hooks, utilities, and constants each get their own file. No "utils.js" garbage dumps.
- Maximum 200 lines per file. If exceeded, split into smaller modules.

## 3. Import Ordering
Imports must be grouped and sorted in this exact order (separated by blank lines):
1. Built-in (Node) / External (npm packages)
2. `@/shared/` imports
3. `@/features/` imports (the current feature only)
4. `@/app/` imports
5. Relative imports (`./`, `../`)
Within each group: alphabetical by source path.

## 4. Type Exports
- Use `export type` for type-only exports (enables `isolatedModules` and `verbatimModuleSyntax`).
- Prefer `interface` over `type` for object shapes (better error messages, faster compilation).
- Use `type` aliases for unions, intersections, and mapped types only.
- Every exported function must have explicit return types; never rely on inference for public APIs.

## 5. Documentation Standards
- Complex logic (> 5 lines) requires a comment explaining **why**, not what.
- Every shared utility and hook must have a JSDoc comment describing purpose, parameters, and return value.
- TODO comments must include a ticket/issue number: `// TODO(PROJ-123): handle edge case`.
- No dead code. Commented-out code is deleted immediately.

## 6. Testing Requirements
- Every feature must have > 80% coverage on business logic (hooks, utilities, API modules).
- UI components require snapshot or interaction tests only when they have conditional rendering logic.
- Test files must mirror source: `src/features/x/hooks/use-foo.ts` → `src/features/x/hooks/__tests__/use-foo.test.ts`.
- Shared components must have Storybook stories for every prop permutation.

## 7. Error Message Quality
- All user-facing error messages must be actionable: "Something went wrong" is not acceptable.
- Console errors must include a correlation ID and component name: `[UserProfile] Failed to load user (traceId: abc-123)`.
- Never log raw error objects to the console — use a structured logger.

## 8. Logging Standards
- Use a structured logging utility (`@/shared/lib/logger`) that outputs JSON in production.
- Log levels: `debug` (dev only), `info` (significant events), `warn` (handled errors), `error` (unhandled errors).
- Never log personally identifiable information (PII) or auth tokens.

## 9. Commit Conventions
- Follow Conventional Commits: `type(scope): description`.
- Types: `feat`, `fix`, `chore`, `refactor`, `perf`, `docs`, `test`, `style`, `ci`.
- Scope is the feature or shared module: `feat(orders): add bulk export`, `fix(shared): correct date formatting`.
- Body explains **why** (not what). Link to the issue: `Closes PROJ-123`.

## 10. PR Standards
- Every PR must include a description with: what changed, why, how to test, and screenshots (if UI).
- PRs must be under 400 lines of actual code change. Large PRs must be split.
- Self-review before requesting reviewers. No draft PRs that don't compile.
- At least 1 approval required. PR author merges after approval.
