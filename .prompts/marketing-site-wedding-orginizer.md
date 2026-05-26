# Prompt Template: Wedding Organization Marketing Site

> Copy-paste this entire prompt to your AI agent (Claude Code, Gemini CLI, Cursor, opencode).
> The AI will read `core.md` + all referenced files for full context.
>
> **To adapt for your own project**: Replace the "Project" section with your wedding organization's name and specific services.
> Keep the file references, setup steps, standards, and structure — they are project-agnostic.

---

## Hard Constraints (MUST follow for every project)

1. **Node version**: Must with Node 20+.if there is no node, install: `nvm install 20`, `fnm install 20`, `volta install node@20`, or download manual in [nodejs.org](https://nodejs.org/). Skip automatically via `npm run dev` (there is a predev for checking the scripts).
2. **Examples folder**: `examples/` is a collection of project folders. Each project gets its own subfolder (e.g. `examples/wedding-org-marketing/`, `examples/pos-app-restaurant/`). The prompt `.md` file stays at `examples/` level.
3. **Scaffold first**: Always scaffold via Vite CLI (`npm create vite`) — never create files manually before Vite succeeds.
4. **Architecture files**: Never remove `.agent/`, `.architecture/`, `.design/`, `.rules/`, `.scaffolds/`, `.templates/`, `.workflows/` — these are the operating system.

---

## How to Use This Template

1. Replace the **Project** section below with your wedding org name and service list
2. Adjust the **Feature Definitions** to match your wedding package offerings
3. Keep everything else — it references the architecture docs that ship with this project
4. Delete or add agent/architecture files as needed in the context list below

---

Read `core.md`. Then load all these files for context:

### Design (select one based on desired aesthetic)

- `.design/high-end-visual-design/SKILL.md` — Recommended: Editorial Luxury vibe (warm creams, muted sage, deep espresso)

### Agents

- `.agent/frontend-architect.md`
- `.agent/feature-generator.md`
- `.agent/ui-engineer.md`
- `.agent/animation-engineer.md`
- `.agent/form-engineer.md`
- `.agent/state-manager.md`
- `.agent/accessibility-reviewer.md`

### Architecture

- `.architecture/folder-structure.md`
- `.architecture/ui-hierarchy.md`
- `.architecture/routing.md`
- `.architecture/form-architecture.md`
- `.architecture/validation.md`
- `.architecture/error-handling.md`
- `.architecture/responsive.md`
- `.architecture/environments.md`
- `.architecture/imports-aliases.md`
- `.architecture/types.md`
- `.architecture/shared-layer.md`
- `.architecture/utilities.md`
- `.architecture/animations.md`

### Templates

- `.templates/feature/feature-template.md`
- `.templates/component/component-template.md`
- `.templates/hook/hook-template.md`
- `.templates/form/form-template.md`
- `.templates/page/page-template.md`

### Workflows & Rules

- `.workflows/feature-planning.md`
- `.workflows/scaffolding.md`
- `.rules/scalability.md`
- `.rules/feature-isolation.md`
- `.rules/reusability.md`
- `.rules/performance.md`

---

## 0. Project Setup

Each project gets its own subfolder inside `examples/` — this keeps the root clean for architecture files only.

**⚠️ LANGKAH 0: Check Node version dulu (sebelum apa-apa!)**

Jalanin ini PERTAMA KALI di root project. Cuma butuh milidetik, zero dependencies:

```bash
node examples/check-node.js
```

Kalau output `✓ Node.js v20 — OK, lanjut!`, lanjut. Kalau error, ikutin petunjuk installnya.

---

**⚠️ LANGKAH 1: Scaffold project**

```bash
# Create project subfolder inside examples/
mkdir -p examples/{{project-name}}
cd examples/{{project-name}}

# MUST: always scaffold via Vite — never create files manually
npm create vite@5 . -- --template react-ts

# Install dependencies (auto gagal kalau Node < 20 karena engine-strict)
npm install

# Copy environment template
cp ../.env.example .env.local 2>/dev/null || echo "No .env.example at examples/ level — create one"

# Go back to root
cd ../..
```

**⚠️ LANGKAH 2: Mulai develop**

```bash
cd examples/{{project-name}}
npm run dev     # predev otomatis ngecek Node version lagi sebelum vite jalan
```

---

Verify:

- `examples/check-node.js` exists — jalanin dulu sebelum apa pun
- `.npmrc` di project subfolder punya `engine-strict=true`
- `scripts/check-version.js` di project subfolder — predev/prebuild hook otomatis
- `examples/` folder exists at root
- Project lives in its own subfolder: `examples/{{project-name}}/`
- Root stays clean — hanya `.agent/`, `.architecture/`, `.design/`, etc.
- `.env.local` is set inside the project subfolder
- `npm run dev` starts without errors (run from the project subfolder)

---

## 1. Design Configuration

Activate the high-end-visual-design skill with these tuned dials for a wedding marketing site:

> Follow the `high-end-visual-design` skill from `.design/high-end-visual-design/SKILL.md`
> Use **Editorial Luxury** Vibe (warm creams, muted sage tones, deep espresso text).
> Use **The Asymmetrical Bento** for service/portfolio layouts.
>
> Tune design-taste-frontend dials:
>
> - DESIGN_VARIANCE: 6 (offset, asymmetric but refined)
> - MOTION_INTENSITY: 5 (fluid scroll reveals, gentle parallax)
> - VISUAL_DENSITY: 3 (art gallery — generous whitespace, airy)

### Font Selection

- Headings: `Cabinet Grotesk` or `Satoshi` (high-end sans-serif with character)
- Body: `Geist` (clean, readable)
- Display moments: Consider a Variable Serif (e.g. `PP Editorial New`) for hero headlines only

### Color Palette Direction

- Background: Warm cream (`#FDFBF7`) or clean white (`#FAFAFA`)
- Text: Deep espresso (`#2D1B00`) or charcoal (`#1A1A1A`)
- Accent: Muted sage (`#9CAF88`), dusty rose (`#C9A9A6`), or champagne gold (`#D4AF37`)
- Cards: White (`#FFFFFF`) with subtle warm tint

### Layout Principles

- Section padding: `py-24` to `py-40` — let it breathe
- No 3-column equal card grids — use asymmetric bento or zig-zag layouts
- Hero: Split-screen or left-aligned with large atmospheric photography
- Navigation: Fluid island pill navbar detached from top
- Double-Bezel nested architecture for all major cards and containers

---

## 2. Feature Scaffolding

Run these commands one by one:

```bash
# Run from the project subfolder (e.g. examples/wedding-org-marketing/)
# Use relative paths to root for scaffolds
cd examples/{{project-name}}

bash ../../.scaffolds/feature-scaffold.sh hero
bash ../../.scaffolds/feature-scaffold.sh services
bash ../../.scaffolds/feature-scaffold.sh portfolio
bash ../../.scaffolds/feature-scaffold.sh testimonials
bash ../../.scaffolds/feature-scaffold.sh pricing
bash ../../.scaffolds/feature-scaffold.sh contact
bash ../../.scaffolds/feature-scaffold.sh about
bash ../../.scaffolds/feature-scaffold.sh vendors

cd ../../
```

Each command creates:

```
src/features/{{featureName}}/
├── api/
├── components/
├── schemas/
├── types/
└── index.ts
```

---

## 3. Pages & Routes

```
src/pages/
├── home-page.tsx              # Hero + Services + Portfolio preview + Testimonials
├── services-page.tsx          # Full services detail
├── portfolio-page.tsx         # Wedding gallery / case studies
├── pricing-page.tsx           # Packages and pricing
├── contact-page.tsx           # Contact form + map + info
├── about-page.tsx             # Team + story
├── vendors-page.tsx           # Vendor partnerships
└── blog/
    ├── blog-list-page.tsx     # Article listing
    └── blog-detail-page.tsx   # Single article
```

Routes (react-router-dom v7 with `lazy()`):

```typescript
const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, lazy: () => import('@pages/home-page') },
      { path: 'services', lazy: () => import('@pages/services-page') },
      { path: 'portfolio', lazy: () => import('@pages/portfolio-page') },
      { path: 'pricing', lazy: () => import('@pages/pricing-page') },
      { path: 'contact', lazy: () => import('@pages/contact-page') },
      { path: 'about', lazy: () => import('@pages/about-page') },
      { path: 'vendors', lazy: () => import('@pages/vendors-page') },
      { path: 'blog', lazy: () => import('@pages/blog/blog-list-page') },
      { path: 'blog/:slug', lazy: () => import('@pages/blog/blog-detail-page') },
    ],
  },
])
```

---

## 4. Feature Definitions

For each feature, follow this structure. Adapt the types, data shape, and components to your wedding domain.

### Per-Feature File Map

```
src/features/{{featureName}}/
├── api/
│   ├── {{featureName}}-api.ts       # Service functions (static data or CMS calls)
│   ├── {{featureName}}.query.ts     # Query key factory + useQuery hooks
│   └── index.ts                     # Barrel exports
├── components/
│   └── {{component-name}}.tsx
├── schemas/
│   └── index.ts                     # Zod validation schemas
├── types/
│   └── index.ts                     # TypeScript interfaces
└── index.ts                         # Feature barrel
```

### Example: Hero Feature (landing section)

```typescript
// types/index.ts
export interface HeroSlide {
  id: string;
  imageUrl: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}
export interface HeroContent {
  tagline: string;
  title: string;
  description: string;
  primaryCta: { text: string; link: string };
  secondaryCta: { text: string; link: string };
  backgroundImage: string;
}
```

```typescript
// schemas/index.ts
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  serviceInterest: z
    .enum([
      "full-planning",
      "partial-planning",
      "day-of-coordination",
      "design",
    ])
    .optional(),
  message: z.string().min(10, "Please include a brief message"),
  budget: z.string().optional(),
});
```

```typescript
// api/hero-api.ts
import { client } from "@shared/api/client";
const BASE = "/hero";
export const heroApi = {
  getContent: () => client.get<HeroContent>(BASE).then((r) => r.data),
  getSlides: () =>
    client.get<HeroSlide[]>(`${BASE}/slides`).then((r) => r.data),
};
```

```typescript
// api/hero.query.ts
export const queryKeys = {
  hero: ["hero"] as const,
  content: () => [...queryKeys.hero, "content"] as const,
  slides: () => [...queryKeys.hero, "slides"] as const,
};
export function useHeroContent() {
  return useQuery({
    queryKey: queryKeys.content(),
    queryFn: () => heroApi.getContent(),
  });
}
export function useHeroSlides() {
  return useQuery({
    queryKey: queryKeys.slides(),
    queryFn: () => heroApi.getSlides(),
  });
}
```

### Example: Services Feature

```typescript
// types/index.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  imageUrl: string;
  features: string[];
  startingPrice: number;
  isHighlighted: boolean;
}
export interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}
```

### Example: Portfolio Feature

```typescript
// types/index.ts
export interface WeddingProject {
  id: string;
  title: string;
  couple: { name: string };
  date: string;
  venue: string;
  guestCount: number;
  description: string;
  thumbnailUrl: string;
  galleryUrls: string[];
  servicesProvided: string[];
  testimonial?: {
    quote: string;
    author: string;
  };
}
```

### Example: Contact Feature (with form)

```typescript
// schemas/index.ts
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[+]?[\d\s()-]{8,20}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  eventDate: z.string().optional(),
  venue: z.string().optional(),
  serviceInterest: z.enum([
    "full-planning",
    "partial-planning",
    "day-of-coordination",
    "design-styling",
    "vendor-management",
    "other",
  ]),
  budgetRange: z
    .enum([
      "under-10k",
      "10k-20k",
      "20k-50k",
      "50k-100k",
      "100k-plus",
      "not-sure",
    ])
    .optional(),
  message: z
    .string()
    .min(10, "Please include a brief message about your wedding vision"),
  howHeard: z
    .enum(["instagram", "google", "friend", "venue", "wedding-fair", "other"])
    .optional(),
  agreeToContact: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;
```

### Example: Testimonials Feature

```typescript
// types/index.ts
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  coupleImage: string;
  weddingDate: string;
  venue: string;
  featuredImage: string;
  rating: number;
}
```

---

## 5. Shared Components to Create

Create these shared UI primitives for the wedding site:

```bash
bash .scaffolds/component-scaffold.sh WeddingButton shared/ui
bash .scaffolds/component-scaffold.sh SectionHeader shared/ui
bash .scaffolds/component-scaffold.sh ImageGallery shared/ui
bash .scaffolds/component-scaffold.sh TestimonialCard shared/ui
bash .scaffolds/component-scaffold.sh ServiceCard shared/ui
bash .scaffolds/component-scaffold.sh PricingCard shared/ui
```

Customize each with the high-end-visual-design patterns:

- Double-Bezel nested architecture for cards
- Button-in-Button trailing icon pattern
- Fluid island navigation
- Scroll-triggered fade-up reveals

---

## 6. Layout Components

```
layouts/
├── app-layout.tsx           # Fluid island nav + main + footer
├── components/
│   ├── site-header.tsx      # Floating pill navbar with hamburger morph
│   ├── site-footer.tsx      # Multi-column footer with CTA
│   ├── mobile-nav.tsx       # Full-screen overlay with staggered reveal
│   └── index.ts
└── index.ts
```

### Navigation Pattern (from high-end-visual-design)

- **Closed state**: Floating glass pill navbar (`mt-6 mx-auto w-max rounded-full`)
- **Hamburger morph**: Lines fluidly rotate to form 'X' using CSS transforms
- **Modal expansion**: Screen-filling overlay with `backdrop-blur-3xl`
- **Staggered mask reveal**: Menu links fade up with `translate-y-12 opacity-0` to `translate-y-0 opacity-100`, staggered `delay-100`, `delay-150`, `delay-200`

---

## 7. Footer Structure

```
Site Footer:
├── CTA Section     — "Ready to plan your dream wedding?" + booking link
├── Main Footer
│   ├── Brand column     — Logo + short description + social links
│   ├── Services column  — Links to services
│   ├── Company column   — About, Blog, Contact, FAQ
│   └── Contact column   — Address, phone, email, map
└── Bottom bar     — Copyright + legal links
```

---

## 8. Animations & Motion

Apply these motion patterns throughout:

### Entry Animations (Scroll Reveals)

- Elements fade up on scroll: `translate-y-16 blur-md opacity-0` → `translate-y-0 blur-0 opacity-100`
- Duration: 800ms+ with custom cubic-bezier
- Stagger children in grids and lists

### Micro-Interactions

- Magnetic button hover: icon translates diagonally on hover, button scales on active
- Smooth spring transitions for state changes
- Perpetual subtle animations on testimonial cards (gentle float)

### Navigation

- Fluid morph between hamburger and close icon
- Staggered link reveals in mobile menu
- Glass blur backdrop on open

### Hero

- Optional text scramble or kinetic typography for headline
- Subtle parallax on background imagery
- Gentle crossfade between hero slides

---

## 9. Coding Standards

- **NO** `React.FC` — always `function ComponentName()`
- **NO** default exports — use named exports always
- All files = kebab-case (e.g., `service-card.tsx`)
- All functions/components = PascalCase or camelCase
- Imports: `@shared/*`, `@features/*`, `@pages/*`, `@layouts/*` aliases
- TanStack Query v5 object syntax (`queryKey`, `queryFn`)
- Query keys co-located with hooks (no shared query key file)
- RHF v7 + `@hookform/resolvers/zod` for contact form
- Tailwind v4 classes (no `@apply`, no style objects)
- `cn()` utility from `@shared/utils/cn` for class merging
- sonner `toast.success()` / `toast.error()` for form submissions
- lucide-react icons only — no emojis
- All API calls through `client` from `@shared/api/client` — no direct `fetch` or raw axios
- All asymmetric layouts MUST collapse to single-column below `768px`

---

## 10. Responsive Design Conventions

- Mobile-first: base styles = mobile, breakpoints (`sm:`, `md:`, `lg:`) = larger screens
- Hero: full-width on mobile, split-screen on desktop
- Services/Portfolio grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` or asymmetric bento
- Section padding: `py-16 md:py-24 lg:py-32`
- Navigation: floating pill on desktop, bottom/top nav on mobile
- Images: always `object-cover` with explicit aspect ratios
- Never use `h-screen` — always `min-h-[100dvh]`
- Never use complex flexbox percentage math — use CSS Grid

---

## 11. Accessibility Requirements

- All images require descriptive `alt` text
- Navigation must be keyboard-navigable
- Form inputs require associated labels
- Color contrast meets WCAG 2.1 AA standards
- Focus indicators visible on all interactive elements
- Skip-to-content link as first focusable element
- Proper heading hierarchy (h1 → h2 → h3, never skip levels)
- ARIA labels on icon-only buttons and interactive cards

---

## 12. SEO & Meta

- Every page uses `react-helmet-async` for title and meta tags
- Open Graph and Twitter Card meta tags for social sharing
- Structured data (JSON-LD) for LocalBusiness and WeddingEvent
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Sitemap generated at build time

---

## 13. Performance Targets

- Lighthouse score: 90+ on all categories
- Code-split per route using React.lazy()
- Optimize images: WebP format, responsive srcset, lazy loading
- Minimal JavaScript — lean toward CSS animations over JS
- No layout-triggering animations (animate only `transform` and `opacity`)
- `backdrop-blur` only on fixed/sticky elements

---

Generate all files in order. After each feature, wait for confirmation before proceeding to the next.
