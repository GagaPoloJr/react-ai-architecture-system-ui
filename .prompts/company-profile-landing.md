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

This is **Postlight** — a SaaS company profile landing page for a modern engineering tools company. It's a single-page marketing site with stacked sections: hero, stats bar, features grid, about, team, pricing, testimonials, blog, FAQ, and a contact form. Built with React 18, TypeScript, Tailwind v4, react-router-dom v7, and TanStack Query v5.

---

## How to Use This Template

1. Replace the **Project** section with your startup's name, tagline, and product description
2. Adjust the **Feature Definitions** to match your product offerings
3. Switch Pexels image IDs in section 5 to match your brand imagery
4. Keep everything else — it references the architecture docs that ship with this project

---

Load all these files for context:

### Design

- `.design/high-end-visual-design/SKILL.md` — Reference, but override with Light Indigo Glassmorphism (section 1 below)

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

## 0. Project Setup

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

## 1. Design Configuration — Light Indigo Glassmorphism

### Design Vibe

Light indigo glassmorphism — airy, premium, approachable. Not dark. Not heavy.

### Font

- **Headings + Body**: `Plus Jakarta Sans Variable` (single font family throughout)
- **BANNED**: Inter, Roboto, Arial, Outfit, Manrope, Open Sans, Helvetica

### Color Palette

```css
--color-canvas:       #F5F3FF;   /* lavender-50 — light indigo wash */
--color-surface:      #FFFFFF;   /* pure white cards */
--color-surface-hover:#EEF2FF;   /* indigo-50 hover state */
--color-text-primary: #1E1B4B;   /* indigo-950 — near-black indigo */
--color-text-secondary:#6B6B9E;  /* indigo-400 — muted */
--color-border:       rgba(99, 102, 241, 0.12);
--color-accent:       #6366F1;   /* indigo-500 — primary accent */
--color-accent-subtle:rgba(99, 102, 241, 0.08);
```

- Accent: Indigo `#6366F1` — single primary accent
- CTA buttons: Indigo `#6366F1` (not emerald — that was a prior iteration)
- **BANNED**: Dark backgrounds, OLED black, pure `#000000`, purple gradients, neon glows

### Layout Principles

- **Floating glass header**: `fixed top-4 left-4 right-4 mx-auto rounded-2xl bg-white/70 backdrop-blur-xl border border-[rgba(99,102,241,0.1)]` — pill-like, detached from top edge
- **Section padding**: `py-24 lg:py-32` — generous whitespace
- **Cards**: White/80 `backdrop-blur-xl` with indigo borders (`border-[rgba(99,102,241,0.08)]`) and subtle glass shadow (`shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_4px_24px_rgba(99,102,241,0.06)]`)
- **Hero**: Split-screen (text left, product mockup right), ambient gradient orbs as background decoration
- **Stats**: Centered row, large values with indigo accent
- **Features**: 3-column bento-style grid (not zig-zag, not 3-column equal)
- **Team**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Pricing**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with popular card scaled up
- **CTA buttons**: Always use trailing ArrowIcon pattern — `Button variant="primary"` with `<ArrowIcon />` child

### Animations

- Entry animations: fade-in-up with `opacity-0 translate-y-8` → `opacity-100 translate-y-0`
- All transitions: `duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]` — no linear or ease-in-out
- Stagger children with `style={{ animationDelay: `${i * 0.1}s` }}`
- Reduced motion: `@media (prefers-reduced-motion: reduce)` zeroes out durations

### Tailwind v4 Notes

- Use Tailwind v4 class syntax (no `@apply`, no style objects)
- `@theme` block defines custom tokens in `index.css`
- `cn()` utility from `@shared/utils/cn` for class merging (uses `clsx` + `tailwind-merge`)

---

## 2. Feature Scaffolding

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

## 4. Feature Definitions

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

### About (`features/about/`)

```typescript
// Check actual types — features/about/types/index.ts
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

## 5. Images — Local Pexels Downloads

**Do NOT hotlink Pexels CDN URLs.** Download images to `public/images/` with descriptive names:

```bash
mkdir -p public/images
curl -sL -A "Mozilla/5.0" -o public/images/hero-workspace.jpg   "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/feature-collab.jpg   "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/feature-analytics.jpg "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/feature-coding.jpg   "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/office.jpg           "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
# Team avatars
curl -sL -A "Mozilla/5.0" -o public/images/avatar-riley.jpg     "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-morgan.jpg    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-priya.jpg     "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-jordan.jpg    "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-samira.jpg    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/avatar-tyler.jpg     "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2"
# Blog covers
curl -sL -A "Mozilla/5.0" -o public/images/blog-team-handshake.jpg "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-collab.jpg      "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-analytics.jpg   "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-inclusive.jpg   "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-coding.jpg      "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/blog-office.jpg      "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
```

Reference locally: `/images/hero-workspace.jpg` (not the CDN URL).

---

## 6. Header — Floating Glass Card

```tsx
<header className="fixed top-4 left-4 right-4 z-50 bg-white/70 backdrop-blur-xl border border-[rgba(99,102,241,0.1)] rounded-2xl shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_4px_24px_rgba(99,102,241,0.06)] hidden md:block max-w-7xl mx-auto">
  <div className="flex items-center justify-between px-6 h-14">
    <Link to="/" className="text-sm font-medium text-text-primary tracking-tight">
      Postlight<span className="text-accent">.</span>
    </Link>
    {/* nav links with active state: text-accent bg-accent/5 */}
    <Button variant="primary" size="sm" asChild>
      <Link to="/contact">Get started<ArrowIcon /></Link>
    </Button>
  </div>
</header>
```

Mobile: inline hamburger within same glass card. Full-screen menu on open (`bg-white/95 backdrop-blur-3xl`).

---

## 7. Footer Structure

```
Site Footer (bg-canvas):
├── CTA Section     — "Ready to ship faster?" + primary button, border-b separator
├── Main Footer
│   ├── Brand column (col-span-2) — Logo + description + social links (X, GitHub, LinkedIn)
│   ├── Product column
│   ├── Company column
│   └── Resources column
└── Bottom bar     — Copyright + Privacy + Terms
```

All borders use `border-[rgba(99,102,241,0.08)]`.

---

## 8. Buttons (Shared UI)

```tsx
// src/shared/ui/atoms/button.tsx
// Uses Radix Slot for polymorphic asChild
// Variants: primary (bg-accent text-white), secondary (border-border), ghost
// Sizes: sm, md, lg, xl, icon
// ArrowIcon component: white circular bg on hover with translate animation
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

## 9. Coding Standards

- **NO** `React.FC` — always `function ComponentName()`
- **NO** default exports — use named exports always
- All files = kebab-case (e.g., `hero-section.tsx`)
- All functions/components = PascalCase or camelCase
- Imports: `@shared/*`, `@features/*`, `@pages/*`, `@layouts/*` aliases
- TanStack Query v5 object syntax (`queryKey`, `queryFn`)
- Query keys co-located with hooks (no shared query key file)
- RHF v7 + `@hookform/resolvers/zod` for contact form
- Tailwind v4 classes (no `@apply`, no style objects)
- `cn()` utility from `@shared/utils/cn` for class merging
- sonner `toast.success()` / `toast.error()` for form submissions
- lucide-react icons — no emojis
- All API calls through `client` from `@shared/api/client` — no direct `fetch` or raw axios
- Images always use local `/images/` paths, never external CDN URLs
- All asymmetric layouts MUST collapse to single-column below `768px`

---

## 10. Responsive Design

- Mobile-first: base styles = mobile, breakpoints (`sm:`, `md:`, `lg:`) = larger screens
- Hero: stacked on mobile (image below text), split-screen on `lg:`
- Stats: `grid-cols-2 md:grid-cols-4`
- Team: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Pricing: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with popular card scaled
- Blog list: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Section padding: `py-16 md:py-24 lg:py-32`
- Images: always `object-cover` with explicit aspect ratios
- Never use `h-screen` — always `min-h-[100dvh]`
- Never use complex flexbox percentage math — use CSS Grid

---

## 11. Accessibility

- All images require descriptive `alt` text
- Navigation must be keyboard-navigable
- Form inputs require associated labels
- Color contrast meets WCAG 2.1 AA standards
- Focus indicators visible on all interactive elements
- Skip-to-content link as first focusable element
- Proper heading hierarchy (h1 → h2 → h3, never skip levels)
- ARIA labels on icon-only buttons and interactive cards
- Tab order follows visual order

---

## 12. SEO & Meta

- Every page uses `react-helmet-async` for title and meta tags
- Open Graph and Twitter Card meta tags for social sharing
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`

---

## 13. Dependencies

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
