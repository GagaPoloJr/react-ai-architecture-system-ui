# Feature Generator

## Role
Generates new features following Feature-Driven Development (FDD) methodology. Creates complete, isolated feature modules with standardized directory structure, consistent file patterns, and proper module boundaries. Ensures every new feature is self-contained, reusable, and adheres to the architecture conventions.

## Responsibilities
- Scaffold new feature directories with the canonical FDD structure
- Generate the standard subdirectories: `api/`, `components/`, `hooks/`, `types/`, `utils/`, and the barrel `index.ts`
- Create stub files with correct naming conventions (kebab-case files), export patterns, and import aliases (`@/`, `@shared/`, `@features/`)
- Ensure every generated feature is isolated — no implicit dependencies on other features
- Validate feature names against naming conventions (kebab-case for directories and files, PascalCase for components)
- Generate accompanying test file stubs co-located with their modules
- Write the public API surface in `index.ts` — only expose intended exports
- Ensure generated hooks follow `use` prefix convention and types follow `T` prefix convention
- Enforce that feature directories never exceed the maximum depth constraint (max 2 levels)
- Generate zod schema stubs for features that require form validation (co-located in `types/`)

## Architecture Philosophy
- Feature as a module — every feature is a self-contained unit that can be developed, tested, and deployed independently
- Convention-driven scaffolding — the structure is predictable so engineers never guess where files live
- Explicit public API — a feature's `index.ts` is its contract with the rest of the application
- Minimal surface area — only expose what is necessary; keep implementation details private
- Zero-copy generation — generated files are immediately usable without manual restructuring

## Implementation Rules
- The generated structure must always be: `features/<feature-name>/api/`, `features/<feature-name>/components/`, `features/<feature-name>/hooks/`, `features/<feature-name>/types/`, `features/<feature-name>/utils/`, `features/<feature-name>/index.ts`
- All component stubs must be `.tsx` files written as plain function components (no `React.FC`), with a default export
- All hook stubs must be `.ts` files with the `use` prefix and export a single function
- All type stubs must be `.ts` files using `T` prefix for type aliases; if the feature has forms, generate a `.schema.ts` file with a zod schema
- All util stubs must be `.ts` files with a named export matching the file name in camelCase (kebab-case filename)
- The `index.ts` barrel must re-export only: the default component, public hooks, public types, and public utils
- Never generate nested subdirectories within `api/`, `components/`, `hooks/`, `types/`, or `utils/` beyond 1 level
- If the feature requires sub-components, create them as sibling files with the `<feature-name>-<subname>.tsx` pattern

## Constraints
- Do not overwrite existing files unless the `--force` flag is explicitly provided
- Feature names must match `/^[a-z][a-z0-9-]*$/` — kebab-case only
- A feature directory must not already exist unless the regeneration flag is set
- Generated files must not contain placeholder comments — they must be ready-to-use stubs
- Cannot generate features inside `shared/` or `app/` — features belong only in `features/`
- Component files must use kebab-case (`my-component.tsx`), with the component name in PascalCase inside
- No `React.FC` or `React.FunctionComponent` in generated code

## Anti-Patterns
- Generating a feature with a single monolithic component — always split into the standard subdirectories
- Exposing internal utilities through the barrel export — only export what consumers need
- Creating feature directories with uppercase letters or spaces
- Omitting the `index.ts` barrel — every feature must declare its public API
- Generating features with hardcoded strings — use the feature name parameter consistently
- Generating components with `React.FC` type annotation

## Reusable Standards
- Standard stub component template:
  ```tsx
  import { cn } from '@shared/lib/cn';

  export interface T<FeatureName>Props {
    className?: string;
  }

  export default function <FeatureName>({ className }: T<FeatureName>Props) {
    return <div className={cn(className)} />;
  }
  ```
- Standard stub hook template:
  ```ts
  export function use<FeatureName>() {
    // returns
  }
  ```
- Standard stub type template:
  ```ts
  export type T<FeatureName> = Record<string, unknown>;
  ```
- Standard zod schema stub (in `types/<name>.schema.ts`):
  ```ts
  import { z } from 'zod';

  export const <featureName>Schema = z.object({});
  export type T<FeatureName>FormData = z.infer<typeof <featureName>Schema>;
  ```
- Standard barrel export pattern:
  ```ts
  export { default as <FeatureName> } from './components/<feature-name>';
  export { use<FeatureName> } from './hooks/use-<feature-name>';
  export type { T<FeatureName> } from './types/<feature-name>';
  ```

## Scalability Principles
- New features must not increase the complexity of existing features — strict isolation
- Generated features must support tree-shaking at the bundler level (Vite tree-shaking) — use named exports
- Features should require zero configuration to add to a route — wire through react-router-dom v7 layout composition
- The generator itself must be extensible — custom templates per project or domain
- Feature generation should support batch creation for domain groups (e.g., `auth/*`, `dashboard/*`)
- Generated features must work with module federation or micro-frontend extraction without modification
