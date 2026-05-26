# Prompt Template: Company Profile Landing Page — Postlight

> Copy-paste this entire prompt to your AI agent (Claude Code, Gemini CLI, Cursor, opencode).
> The AI will read all referenced files for full context.

---

## Hard Constraints (MUST follow for every project)

1. **Node version**: Must with Node 20+. If there is no node, install: `nvm install 20`, `fnm install 20`, `volta install node@20`, or download manual in [nodejs.org](https://nodejs.org/). Skip automatically via `npm run dev` (there is a predev for checking the scripts).
2. **Examples folder**: `examples/` is a collection of project folders. Each project gets its own subfolder (e.g. `examples/company-profile/`). The prompt `.md` file stays at `.prompts/` level.
3. **Scaffold first**: Always scaffold via Vite CLI (`npm create vite`) — never create files manually before Vite succeeds.
4. **Architecture files**: Never remove `.agent/`, `.architecture/`, `.design/`, `.rules/`, `.scaffolds/`, `.templates/`, `.workflows/` — these are the operating system.

---

## About This Project

**Postlight** — a SaaS company profile landing page for a modern engineering tools company. Single-page marketing site with stacked sections: hero, stats bar, features grid, about, team, pricing, testimonials, blog, FAQ, and a contact form. Built with React 18, TypeScript, Tailwind v4, react-router-dom v7, TanStack Query v5.

---

## Load Context Files

### Design Skills

- `.design/high-end-visual-design/SKILL.md`
- `.design/minimalist-ui/SKILL.md`
- `.design/industrial-brutalist-ui/SKILL.md`

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

---

## Step 0: Design Selection

Follow `.workflows/init.md` Step 0 — handles both UI/UX Pro Max installed (scenario A) and not installed (scenario B). Recommend, present options, wait for user choice.

This project type is **SaaS company profile landing page**. AI recommendation example:

> **Recommended**: High-End Visual Design — Ethereal Glass (light variant)
> *Rationale: Postlight is a modern engineering tools brand that needs to feel premium and technically sophisticated. The Ethereal Glass archetype with light background provides the right balance of technical polish and approachability.*

Once chosen, plug the design's concrete values into all sections below. The rest of this template uses **Light Indigo Glassmorphism** (High-End Visual Design — Ethereal Glass light variant) as the default.

---

## Step 1: Project Setup

Each project gets its own subfolder inside `examples/`.

```bash
mkdir -p examples/{{project-name}}
cd examples/{{project-name}}

npm create vite@5 . -- --template react-ts
npm install

npm install react-router-dom @tanstack/react-query react-hook-form @hookform/resolvers zod sonner react-helmet-async clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-accordion @radix-ui/react-dialog lucide-react date-fns zustand i18next react-i18next js-cookie axios @fontsource-variable/plus-jakarta-sans

cd ../..
```

---

## Step 2: Feature Scaffolding

```bash
cd examples/{{project-name}}

bash ../../.scaffolds/feature-scaffold.sh hero
bash ../../.scaffolds/feature-scaffold.sh features
bash ../../.scaffolds/feature-scaffold.sh about
bash ../../.scaffolds/feature-scaffold.sh stats
bash ../../.scaffolds/feature-scaffold.sh team
bash ../../.scaffolds/feature-scaffold.sh pricing
bash ../../.scaffolds/feature-scaffold.sh testimonials
bash ../../.scaffolds/feature-scaffold.sh contact
bash ../../.scaffolds/feature-scaffold.sh blog
bash ../../.scaffolds/feature-scaffold.sh faq

cd ../../
```

---

## Step 3: Pages & Routes

```
src/pages/
├── home-page.tsx              # All sections stacked (scrolling landing page)
├── about-page.tsx             # Company story, mission, team
├── blog/
│   ├── blog-list-page.tsx     # Article listing with cover images
│   └── blog-detail-page.tsx   # Single article
├── contact-page.tsx           # Contact form + info
└── privacy-page.tsx           # Legal/privacy
```

Routes (react-router-dom v7 with lazy + Suspense):

```typescript
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Suspense fallback={<Loading />}><HomePage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<Loading />}><AboutPage /></Suspense> },
      { path: 'blog', element: <Suspense fallback={<Loading />}><BlogListPage /></Suspense> },
      { path: 'blog/:slug', element: <Suspense fallback={<Loading />}><BlogDetailPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<Loading />}><ContactPage /></Suspense> },
      { path: 'privacy', element: <Suspense fallback={<Loading />}><PrivacyPage /></Suspense> },
    ],
  },
])
```

### Scroll-to-Top

Add to `AppLayout`:

```typescript
import { useScrollToTop } from '@shared/hooks'

export function AppLayout() {
  useScrollToTop()  // scrolls to window top on every pathname change
  // ...
}
```

The hook (`src/shared/hooks/use-scroll-to-top.ts`):
```typescript
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
}
```

---

## Step 4: Feature Definitions

### Hero (`features/hero/`)

```typescript
export interface HeroContent {
  badge: string;
  title: string;
  highlightedPhrase: string;
  description: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  demoVideoUrl?: string;
  productPreviewImage: string;
  trustIndicator: {
    text: string;
    logos: Array<{ name: string; src: string }>;
  };
}
```

### Features Grid (`features/features/`)

```typescript
export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  imageUrl: string;
  benefits: string[];
  isReversed: boolean;
}
```

### Stats Bar (`features/stats/`)

```typescript
export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description?: string;
}
```

### Team Grid (`features/team/`)

```typescript
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}
```

### Pricing (`features/pricing/`)

```typescript
export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  features: Array<{ text: string; included: boolean }>;
  ctaText: string;
  ctaHref: string;
  isPopular: boolean;
  isHighlighted: boolean;
}
```

### Testimonials (`features/testimonials/`)

```typescript
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
  logoUrl?: string;
  rating: number;
  featured: boolean;
}
```

### Blog (`features/blog/`)

```typescript
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: { name: string; avatarUrl: string };
  tags: string[];
  publishedAt: string;
  readingTime: number;
}
```

### FAQ (`features/faq/`)

```typescript
export interface FAQCategory {
  id: string;
  name: string;
  items: FAQItem[];
}
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
```

### Contact (`features/contact/`) — Zod schema

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().regex(/^[+]?[\d\s()-]{8,20}$/, "Please enter a valid phone number").optional().or(z.literal("")),
  interest: z.enum(["general-inquiry", "sales", "support", "partnership", "demo-request", "careers", "other"]),
  message: z.string().min(10, "Please include a brief message"),
  agreeToContact: z.literal(true, { errorMap: () => ({ message: "You must agree to be contacted" }) }),
})
export type ContactFormData = z.infer<typeof contactFormSchema>
```

---

## Step 5: Images — Local Pexels Downloads

**Do NOT hotlink Pexels CDN URLs.** Download to `public/images/`:

```bash
mkdir -p public/images
curl -sL -A "Mozilla/5.0" -o public/images/hero-workspace.jpg   "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/feature-collab.jpg   "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/feature-analytics.jpg "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/feature-coding.jpg   "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/office.jpg           "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-riley.jpg     "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-morgan.jpg    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-priya.jpg     "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-jordan.jpg    "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-samira.jpg    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-tyler.jpg     "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-team-handshake.jpg "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-collab.jpg      "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-analytics.jpg   "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-inclusive.jpg   "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-coding.jpg      "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-office.jpg      "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
```

Reference locally: `/images/hero-workspace.jpg` (not the CDN URL).

---

## Step 6: Layout Components

```
layouts/
├── app-layout.tsx           # Nav + main + footer + useScrollToTop
├── components/
│   ├── site-header.tsx      # Floating glass card (top-4, rounded-2xl, backdrop-blur-xl)
│   ├── site-footer.tsx      # CTA section + multi-column footer + bottom bar
│   └── index.ts
└── index.ts
```

### Header Pattern (Light Indigo Glassmorphism)

```tsx
<header className="fixed top-4 left-4 right-4 z-50 bg-white/70 backdrop-blur-xl border border-[rgba(99,102,241,0.1)] rounded-2xl shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_4px_24px_rgba(99,102,241,0.06)] hidden md:block max-w-7xl mx-auto">
  {/* Logo left, nav links center, CTA button right */}
</header>
```

Mobile: same glass card with inline hamburger → full-screen overlay (`bg-white/95 backdrop-blur-3xl`).

### Footer Structure

```
footer (bg-canvas, border-t border-[rgba(99,102,241,0.08)]):
├── CTA Section     — large heading + primary button, border-b separator
├── Main Footer
│   ├── Brand column (col-span-2) — Logo + description + social links
│   ├── Product column
│   ├── Company column
│   └── Resources column
└── Bottom bar     — Copyright + Privacy + Terms
```

---

## Step 7: Buttons (Shared UI)

```tsx
// Button uses Radix Slot for polymorphic asChild
// Variants: primary (bg-accent text-white rounded-full), secondary (border-border), ghost
// ArrowIcon: inline circular SVG wrapper that translates on group-hover
```

Usage:
```tsx
<Button variant="primary" asChild>
  <Link to="/contact">
    Get started
    <ArrowIcon />
  </Link>
</Button>
```

---

## Step 8: Coding Standards

- **NO** `React.FC` — always `function ComponentName()`
- **NO** default exports — use named exports always
- All files = kebab-case (e.g., `hero-section.tsx`)
- All functions/components = PascalCase or camelCase
- Imports: `@shared/*`, `@features/*`, `@pages/*`, `@layouts/*` aliases
- TanStack Query v5 object syntax (`queryKey`, `queryFn`)
- Query keys co-located with hooks (no shared query key file)
- RHF v7 + `@hookform/resolvers/zod` for contact form
- Tailwind v4 classes (no `@apply`, no style objects)
- `cn()` utility from `@shared/utils/cn` (`clsx` + `tailwind-merge`)
- sonner `toast.success()` / `toast.error()` for form submissions
- lucide-react icons — no emojis
- All API calls through `client` from `@shared/api/client`
- Images always use local `/images/` paths, never external CDN URLs
- All asymmetric layouts MUST collapse to single-column below `768px`

---

## Step 9: Responsive Design

- Mobile-first: base = mobile, breakpoints (`sm:`, `md:`, `lg:`) = larger screens
- Hero: stacked on mobile, split-screen on `lg:`
- Stats: `grid-cols-2 md:grid-cols-4`
- Team: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Pricing: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Blog list: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Section padding: `py-16 md:py-24 lg:py-32`
- Images: always `object-cover` with explicit aspect ratios
- Never use `h-screen` — always `min-h-[100dvh]`
- Never use complex flexbox percentage math — use CSS Grid

---

## Step 10: Accessibility

- All images require descriptive `alt` text
- Navigation must be keyboard-navigable
- Form inputs require associated labels
- Color contrast meets WCAG 2.1 AA standards
- Focus indicators visible on all interactive elements
- Proper heading hierarchy (h1 → h2 → h3, never skip levels)
- ARIA labels on icon-only buttons and interactive cards

---

## Step 11: SEO & Meta

- Every page uses `react-helmet-async` for title and meta tags
- Open Graph and Twitter Card meta tags for social sharing
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`

---

## Dependencies

```json
{
  "@fontsource-variable/plus-jakarta-sans": "^5.2.8",
  "@hookform/resolvers": "^5.4.0",
  "@radix-ui/react-accordion": "^1.2.12",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-slot": "^1.2.4",
  "@tailwindcss/vite": "^4.3.0",
  "@tanstack/react-query": "^5.100.14",
  "axios": "^1.16.1",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "date-fns": "^4.3.0",
  "lucide-react": "^1.16.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-helmet-async": "^3.0.0",
  "react-hook-form": "^7.76.1",
  "react-router-dom": "^7.15.1",
  "sonner": "^2.0.7",
  "tailwind-merge": "^3.6.0",
  "tailwindcss": "^4.3.0",
  "tw-animate-css": "^1.4.0",
  "zod": "^3.25.76",
  "zustand": "^5.0.13"
}
```
