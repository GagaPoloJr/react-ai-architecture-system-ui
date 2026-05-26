# Prompt Template: Company Profile — Axiom

> Copy-paste this entire prompt to your AI agent (Claude Code, Gemini CLI, Cursor, opencode).
> The AI will read all referenced files for full context.
>
> **Design reference**: https://creandum.com/ — Analyze the design language, UX philosophy, motion behavior, and visual storytelling approach. Extract the global experience principles and reinterpret them for Axiom.
>
> **Do NOT copy Creandum directly.**
> Do NOT replicate branding, layout structure, or exact visuals.
> Instead, adopt the design philosophy and reinterpret it through Axiom's own identity.

---

## Hard Constraints (MUST follow for every project)

1. **Node version**: Must with Node 20+. If there is no node, install: `nvm install 20`, `fnm install 20`, `volta install node@20`, or download manual in [nodejs.org](https://nodejs.org/). Skip automatically via `npm run dev` (there is a predev for checking the scripts).
2. **Examples folder**: `examples/` is a collection of project folders. Each project gets its own subfolder (e.g. `examples/company-profile/`). The prompt `.md` file stays at `.prompts/` level.
3. **Scaffold first**: Always scaffold via Vite CLI (`npm create vite`) — never create files manually before Vite succeeds.
4. **Architecture files**: Never remove `.agent/`, `.architecture/`, `.design/`, `.rules/`, `.scaffolds/`, `.templates/`, `.workflows/` — these are the operating system.

---

## About This Project

**Axiom** — A frontier technology and design company. Not a SaaS. Not a consultancy. Axiom is an innovation lab that builds, invests in, and scales transformative ideas across AI, spatial computing, climate tech, and next-generation infrastructure.

Think: equal parts research lab, venture builder, and design studio. The website is a brand showcase — editorial, restrained, confident. It tells a story rather than selling a product.

Built with React 18, TypeScript, Tailwind v4, react-router-dom v7, TanStack Query v5, GSAP (ScrollTrigger).

---

## Anti-AI-Slop Design Constraints

This project must NOT look like a typical AI-generated website. Apply these to every decision:

### What to Avoid (AI-Slop Patterns)

- **Symmetrical everything** — balanced 3-column grids with equal cards. Asymmetry is intentional, not random.
- **"Hero with gradient mesh background + centered headline + two buttons + mockup image"** — this is the default AI SaaS template.
- **Card after card after card** — every section does NOT need to be a card grid. Mix flat text blocks, full-width images, and spaced-out content.
- **Tagline + badge + "eyebrow" label** on every section. Just use a heading. No `section.tagline`, no `section.badge`.
- **Generic stock photos of people shaking hands / smiling at laptops /** staring at screens. Use atmospheric, editorial, or abstract imagery.
- **Feature lists with checkmarks** — this is not a landing page for an app.
- **"Ready to get started?" CTA section** at the bottom with a big button. Too SaaS.
- **Layered decorative blobs / gradient orbs / mesh gradients** — every AI site has these.
- **Floating navigation pills / glassmorphism nav** — overused AI pattern.
- **Icons in circles** (blue circle with white icon inside). Very generic.
- **The word "seamless", "robust", "next-gen", "game-changer", "empower", "unlock"** — banned from copy.

### What to Do Instead

- **Typographic hierarchy** is your primary visual tool, not shapes or colors.
- **Whitespace** is your secondary visual tool — let sections breathe.
- **Asymmetry** comes from content length and image placement, not from grid gymnastics.
- **One accent moment per page** — not every section needs a visual flourish.
- **Copy is short and specific** — no filler sentences.
- **Images are large and cinematic** — thumbnails and small icons are for SaaS dashboards.

---

## Load Context Files

### Design Skills

- `.design/high-end-visual-design/SKILL.md`
- `.design/minimalist-ui/SKILL.md`

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

## Design Philosophy (Creandum-Inspired, Reinterpreted)

This is NOT a SaaS dashboard. This is an **editorial-tech brand experience** for a high-end innovation lab.

### Core Directives

| Principle | Application |
|---|---|
| **Typography-first** | Headlines are oversized serif (`text-5xl md:text-7xl lg:text-8xl font-serif`). Body is `text-base md:text-lg leading-relaxed font-sans`. Strong hierarchy contrast. Editorial rhythm. |
| **Restrained warm palette** | Neutral warm tones. Off-white `#FAFAF8` canvas. Warm near-black `#1C1917` text. Stone/clay accents. No saturated colors. |
| **Cinematic motion** | Scroll-driven reveals. Fade-up + subtle scale (0.95→1). Word-by-word hero entrance. Horizontal line draws between sections. Staggered children with personality. Long duration (1000-1200ms). Custom bezier `cubic-bezier(0.65, 0, 0.35, 1)`. |
| **Calm UX** | Low cognitive load. Minimal navigation. No carousels. No popups. No cookie banners in design. |

### Banned Elements

- Glassmorphism, heavy gradients, neon colors, web3 aesthetic
- Lucide or Feather icons (use simple inline SVGs or no icons)
- `rounded-full` on containers or cards
- Heavy box shadows (`shadow-md` and above)
- Aggressive animations, bounce effects, parallax that fights scroll
- Grid backgrounds, noise overlays, decorative flourishes
- Excessive card usage — prefer flat text blocks with generous spacing
- "Get started" / "Sign up" CTAs — this is a brand site, not a SaaS

### Color Palette (Warm Editorial)

```css
--color-canvas:       #FAFAF8;    /* warm off-white paper */
--color-surface:      #F3F0EB;    /* warm cream for cards/surfaces */
--color-text-primary: #1C1917;    /* warm near-black (stone 900) */
--color-text-secondary:#706B65;   /* warm medium grey (stone 500) */
--color-border:       rgba(28,25,23,0.08);
--color-accent:       #57534E;    /* warm charcoal (stone 600) */
--color-accent-solid: #1C1917;    /* warm black for CTAs */
```

### Typography

- Headings: `Playfair Display` — refined serif with elegance and editorial weight
- Body: `Plus Jakarta Sans` — clean, modern, warm sans-serif
- **BANNED**: Inter, Instrument Serif, PP Editorial New, Zodiak, Outfit, Manrope, Geist, Roboto, Arial

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

/* Tailwind v4 theme */
--font-serif: 'Playfair Display', serif;
--font-sans: 'Plus Jakarta Sans', sans-serif;
```

### Animation System (GSAP + ScrollTrigger via `@gsap/react`) — Cinematic Edition

Replace all Tailwind transition utilities with GSAP. Motion must feel **cinematic and calm** — not flashy or robotic.

**Core Principles:**
- Opacity + translate are primary motion drivers
- 1-2 animated elements per viewport maximum (UX guideline: excessive motion causes distraction)
- Scroll pacing over interaction-heavy animation
- Duration: 1000-1200ms for entrances (slow, deliberate)
- Custom ease: `cubic-bezier(0.65, 0, 0.35, 1)` — smoother ease-out than standard
- Stagger: 0.12s tight rhythm for grouped children
- `will-change: transform, opacity` on animated elements

```typescript
// src/shared/hooks/use-gsap-scroll-reveal.ts
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ScrollRevealOptions {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  trigger?: string | Element
  markers?: boolean
  type?: 'fade-up' | 'scale-in' | 'line-draw' | 'word-reveal'
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null!)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1, clearProps: 'all' })
      return
    }

    const type = options.type || 'fade-up'

    if (type === 'fade-up') {
      gsap.fromTo(el,
        { opacity: 0, y: 48, ...options.from },
        {
          opacity: 1, y: 0,
          duration: 1.1,
          ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
            markers: options.markers,
          },
          ...options.to,
        }
      )
    } else if (type === 'scale-in') {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.95, y: 24, ...options.from },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.2,
          ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          ...options.to,
        }
      )
    } else if (type === 'line-draw') {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: 'left center', ...options.from },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          ...options.to,
        }
      )
    }
  })

  return ref
}
```

**Advanced patterns for mindblowing scroll storytelling:**

```tsx
// 1. WORD-BY-WORD HERO REVEAL (cinematic headline entrance)
function HeroSection() {
  const container = useRef<HTMLDivElement>(null!)
  const headline = "We build the things that haven't been built yet"

  useGSAP(() => {
    const words = container.current.querySelectorAll('.hero-word')
    gsap.fromTo(words,
      { opacity: 0, y: 40, rotateX: -15 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
      }
    )
  }, { scope: container })

  return (
    <div ref={container}>
      <h1 className="font-serif text-7xl">
        {headline.split(' ').map((word, i) => (
          <span key={i} className="hero-word inline-block mr-[0.3em]">
            {word}
          </span>
        ))}
      </h1>
    </div>
  )
}

// 2. HORIZONTAL LINE DRAW (section divider — one per page, maximum)
function SectionDivider() {
  const ref = useScrollReveal<HTMLDivElement>({ type: 'line-draw' })
  return (
    <div className="w-full h-px bg-border">
      <div ref={ref} className="h-full bg-text-primary origin-left" />
    </div>
  )
}

// 3. SCALE-IN FOR PORTFOLIO/TEAM CARDS (subtle, not aggressive)
function PortfolioGrid() {
  const container = useRef<HTMLDivElement>(null!)

  useGSAP(() => {
    gsap.fromTo('.portfolio-card',
      { opacity: 0, scale: 0.95, y: 24 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: container })

  return <div ref={container}>...</div>
}

// 4. SUBTLE PARALLAX (cinematic depth, not aggressive)
function CinematicImage() {
  const container = useRef<HTMLDivElement>(null!)
  const image = useRef<HTMLImageElement>(null!)

  useGSAP(() => {
    gsap.to(image.current, {
      y: '10%',
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, { scope: container })

  return (
    <div ref={container} className="overflow-hidden">
      <img ref={image} src="..." alt="" className="w-full h-full object-cover" />
    </div>
  )
}

// 5. NUMBER COUNT-UP (for impact metrics)
function CountUp({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null!)

  useGSAP(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString()
      },
    })
  })

  return (
    <div>
      <span ref={ref} className="font-serif text-6xl">0</span>
      <span className="block text-sm text-text-secondary mt-2">{label}</span>
    </div>
  )
}
```

### Cinematic Motion Rules

| Rule | Implementation |
|------|---------------|
| **1-2 elements per viewport** | Animate the container, let children inherit. Don't animate every sub-element. |
| **No bounce/spring** | Banned easing types: bounce, elastic, back, rubber band. Only use custom cubic-bezier. |
| **No infinite loops** | `repeat: -1` is banned. No floating, pulsing, shimmering elements. |
| **Respect scroll** | Never scroll-jack. No `ScrollTrigger.scrollerProxy()`. User controls scroll. |
| **Line draws** | Max 1 horizontal line draw per page, used as a section divider accent. |
| **Word reveal** | Only for hero headline. Not for every heading on the page. |
| **Count-up** | Only for impact/metrics section. Duration 2s, ease-out. |
| **Parallax** | Subtle: `scrub: 1.5`, `y` offset ≤10% of element. One parallax element per section max. |

---

## Step 0: Design Selection

Follow `.workflows/init.md` Step 0. For this project, the AI should recommend **High-End Visual Design — Editorial Luxury** (warm neutral, typography-first, restrained) or **Minimalist UI — Premium Utilitarian** (monochrome, editorial). Both fit the design philosophy above.

> **Recommended**: Minimalist UI — Premium Utilitarian
> *Rationale: Axiom is a frontier innovation lab that needs to feel authoritative, intelligent, and timeless. The monochrome palette, typographic contrast, and editorial whitespace of Minimalist UI align with Creandum's design language while maintaining Axiom's distinct identity.*

Wait for user choice, then apply the chosen design's concrete values, overriding with the Creandum-inspired directives above.

---

## Step 1: Project Setup

```bash
mkdir -p examples/axiom
cd examples/axiom

npm create vite@5 . -- --template react-ts
npm install

npm install react-router-dom @tanstack/react-query react-hook-form @hookform/resolvers zod sonner react-helmet-async clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-accordion @radix-ui/react-dialog date-fns zustand axios gsap @gsap/react

cd ../..
```

---

## Step 2: Feature Scaffolding

```bash
cd examples/axiom

bash ../../.scaffolds/feature-scaffold.sh hero
bash ../../.scaffolds/feature-scaffold.sh philosophy
bash ../../.scaffolds/feature-scaffold.sh portfolio
bash ../../.scaffolds/feature-scaffold.sh impact
bash ../../.scaffolds/feature-scaffold.sh team
bash ../../.scaffolds/feature-scaffold.sh perspectives
bash ../../.scaffolds/feature-scaffold.sh contact

cd ../../
```

## Step 2b: Structure Cleanup

After scaffolding, **remove empty/unused scaffold artifacts** to keep the context small and meaningful.

### Remove barrel stubs that are never used

Each scaffold creates empty `api/`, `hooks/`, `schemas/` subdirectories with stub files. If a feature doesn't need them (e.g. `hero` has no API calls), delete them:

```bash
# Remove unused scaffold stubs per feature
rm -f src/features/hero/api/index.ts         && rmdir src/features/hero/api        2>/dev/null || true
rm -f src/features/hero/hooks/index.ts       && rmdir src/features/hero/hooks      2>/dev/null || true
rm -f src/features/hero/schemas/index.ts     && rmdir src/features/hero/schemas    2>/dev/null || true
rm -f src/features/hero/types/index.ts       && rmdir src/features/hero/types      2>/dev/null || true

# Repeat for each feature — delete api/, hooks/, schemas/, types/ if they only contain the stub
```

### Remove empty global directories

```bash
rmdir src/assets         2>/dev/null || true
rmdir src/stores         2>/dev/null || true
rmdir src/translations   2>/dev/null || true
rmdir src/shared/ui/organisms  2>/dev/null || true
```

### Elevate cross-page components to `shared/ui/sections/`

If a section component (like `team-grid` or `contact-form`) appears in **2 or more pages**, move it from `features/` to `shared/ui/sections/`:

```
src/shared/ui/sections/
├── team-grid.tsx         # used on home + about
├── stats-bar.tsx         # used on home + about
├── about-section.tsx     # used on home + about
└── contact-form.tsx      # used on home + contact
```

Single-page sections stay in `features/<name>/components/`.

**Rule of thumb**: If you're importing the same feature component from 2+ page files, it belongs in shared. No over-engineering — move it only when the second page actually exists.

---

## Step 3: Pages & Routes

```
src/pages/
├── home-page.tsx       # All sections stacked (story-driven scroll)
├── about-page.tsx      # Philosophy, team, mission
├── portfolio-page.tsx  # All portfolio companies/projects
├── contact-page.tsx    # Contact form + info
```

Routes:

```typescript
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Suspense fallback={<Loading />}><HomePage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<Loading />}><AboutPage /></Suspense> },
      { path: 'portfolio', element: <Suspense fallback={<Loading />}><PortfolioPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<Loading />}><ContactPage /></Suspense> },
      { path: 'perspectives/:slug', element: <Suspense fallback={<Loading />}><PerspectiveDetail /></Suspense> },
    ],
  },
])
```

### Scroll-to-Top

```typescript
import { useScrollToTop } from '@shared/hooks'

export function AppLayout() {
  useScrollToTop()
  // ...
}
```

---

## Step 4: Feature Definitions & Section Data

### Hero Section

No badge. No tagline. Just a single oversized headline and short description. CTAs are minimal — "Explore our work" and "Our philosophy".

```typescript
export interface HeroContent {
  headline: string;           // e.g. "We build the  
                              //  things that  
                              //  haven't been  
                              //  built yet"
  description: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}
```

### Philosophy Section

A single powerful statement about the company, then a wall of quotes from founders/partners. Based on Creandum's "We don't make deals, we make commitments" block and the rotating quote wall.

```typescript
export interface PhilosophyStatement {
  title: string;              // e.g. "We don't invest. We commit."
  body: string;
}

export interface Belief {
  id: string;
  text: string;
  author: string;
  role: string;
}
```

### Portfolio Section

Grid of companies/projects Axiom has built or backed. Each with logo, short description, link.

```typescript
export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  category: string;
  featured: boolean;
}
```

### Impact Section

Not a stats bar — a storytelling section that shows impact through narrative and data.

```typescript
export interface ImpactMetric {
  id: string;
  value: string;     // e.g. "$2.4B"
  label: string;     // e.g. "Total portfolio value"
  description?: string;
}
```

### Team Section

Team members by office location. Emphasis on collective expertise.

```typescript
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  office: string;    // e.g. "San Francisco", "London"
  bio: string;
}
```

### Perspectives Section

Blog/perspectives — editorial content like Creandum's "Stories" section.

```typescript
export interface Perspective {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: { name: string; role: string };
  category: string;
  publishedAt: string;
  readingTime: number;
}
```

### Contact

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  interest: z.enum(["partnership", "press", "careers", "general"]),
})
```

---

## Step 5: Images — Local Pexels Downloads

Use high-quality, cinematic images from Pexels that feel editorial and premium. Avoid generic stock photography.

```bash
mkdir -p public/images
# Hero — abstract/cinematic technology concept
curl -sL -A "Mozilla/5.0" -o public/images/hero-bg.jpg "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1920&dpr=2"
# Portfolio images (one per portfolio item)
curl -sL -A "Mozilla/5.0" -o public/images/portfolio-1.jpg "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/portfolio-2.jpg "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/portfolio-3.jpg "https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/portfolio-4.jpg "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
# Team photos
curl -sL -A "Mozilla/5.0" -o public/images/team-1.jpg "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/team-2.jpg "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/team-3.jpg "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/team-4.jpg "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=2"
# Perspectives cover images
curl -sL -A "Mozilla/5.0" -o public/images/perspective-1.jpg "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/perspective-2.jpg "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
curl -sL -A "Mozilla/5.0" -o public/images/perspective-3.jpg "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2"
```

---

## Step 6: Layout Components

### Header — Minimal Transparent

No glassmorphism. No floating pill. Just a clean, transparent bar with logo left and nav links right. Turns solid white on scroll.

```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-700">
  <div className="mx-auto max-w-7xl px-8 flex items-center justify-between h-20">
    <Link to="/" className="text-sm font-medium tracking-tight text-text-primary">
      AXIOM
    </Link>
    <nav className="flex items-center gap-8">
      {links.map(link => (
        <NavLink to={link.href}>{link.label}</NavLink>
      ))}
    </nav>
  </div>
</header>
```

### Footer — Minimal

Simple footer with logo, social links, and copyright. No massive CTA section.

```
footer:
├── Brand area    — Logo + short description
├── Links         — About, Portfolio, Perspectives, Contact
├── Social        — LinkedIn, X, GitHub
└── Bottom        — © Axiom. All rights reserved.
```

### Buttons

- No rounded-full. Use flat, clean buttons with `rounded-none` or `rounded-sm`.
- Primary: `bg-text-primary text-canvas hover:bg-text-secondary`
- Secondary: `border border-border text-text-primary hover:bg-surface`
- No arrow icons by default. Subtle text underline on hover.

---

## Step 7: Coding Standards

- **NO** `React.FC` — always `function ComponentName()`
- **NO** default exports — use named exports always
- All files = kebab-case
- Imports: `@shared/*`, `@features/*`, `@pages/*`, `@layouts/*` aliases
- TanStack Query v5 object syntax (`queryKey`, `queryFn`)
- Tailwind v4 classes (no `@apply`, no style objects)
- `cn()` utility from `@shared/utils/cn` (`clsx` + `tailwind-merge`)
- Images always use local `/images/` paths, never external CDN URLs
- All transitions use GSAP — Tailwind transitions only for hover states (`hover:opacity-80`)
- All scroll-driven animations use `useGSAP()` from `@gsap/react` (via `useScrollReveal` hook in `@shared/hooks/use-gsap-scroll-reveal`)
- `gsap.registerPlugin(useGSAP, ScrollTrigger)` once at module level (e.g. `main.tsx`)
- Cinematic ease everywhere: `cubic-bezier(0.65, 0, 0.35, 1)`
- Duration: 1000-1200ms for entries, 800ms for card grids
- Font: Playfair Display for headings (`font-serif`), Plus Jakarta Sans for body (`font-sans`)
- Colors from the warm palette: `bg-canvas`, `text-text-primary`, `text-text-secondary`

---

## Step 8: Responsive Design

- Mobile-first: base = mobile, breakpoints (`sm:`, `md:`, `lg:`) = larger
- Hero: massive type scales down on mobile (`text-4xl` → `text-8xl`)
- Portfolio grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Team: `grid-cols-1 md:grid-cols-2`
- Perspectives: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Section padding: `py-20 md:py-32 lg:py-40`
- Never use `h-screen` — always `min-h-[100dvh]`
- Images: always `object-cover` with explicit aspect ratios

---

## Step 9: Section Implementation Notes

### Homepage Section Order

1. **Hero** — Full-viewport headline. Minimal. One sentence. Two CTAs.
2. **Philosophy** — Manifesto-style statement block. Followed by quote wall (3-5 quotes in grid, no carousel).
3. **Portfolio** — Grid of companies/projects with logos. No hover effects beyond opacity.
4. **Impact** — Narrative-driven metrics. Not a stats grid — more like magazine layout with data points.
5. **Team** — Photo grid with names and roles. Grouped by office location.
6. **Perspectives** — Editorial blog grid. Equal-width cards with cover image, title, author.
7. **Contact** — Minimal form. No info cards. Just a message area.

### Key Visual Patterns

- Every section has ample top/bottom padding (`py-32+`)
- Headings sit alone with generous margin below (`mb-16` or `mb-20`)
- Body text is 16-18px with `leading-relaxed` (1.7-1.8 line height)
- Images are treated editorially — full-width within their container, no rounded corners
- Dividers between sections are rare — use whitespace to separate, not lines
- No section badges, no "eyebrow" labels — just headings

---

## Step 10: Accessibility

- All images require descriptive `alt` text
- Navigation must be keyboard-navigable
- Form inputs require associated labels
- Color contrast meets WCAG 2.1 AA standards
- Focus indicators visible on all interactive elements
- Proper heading hierarchy (h1 → h2 → h3, never skip levels)
- `prefers-reduced-motion` respected — use `gsap.set()` to skip all animations and reveal content immediately

---

## Step 11: SEO & Meta

- Every page uses `react-helmet-async` for title and meta tags
- Open Graph and Twitter Card meta tags for social sharing
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`

---

## Axiom Brand Reference

| Field | Value |
|---|---|
| **Name** | Axiom |
| **Tagline** | *Things that haven't been built yet* |
| **Description** | A frontier technology and design company. We build, invest in, and scale transformative ideas. |
| **Founded** | 2018 |
| **Offices** | San Francisco, London, Singapore |
| **Voice** | Confident, restrained, intellectual. Short sentences. No jargon. |
| **Tone** | Authoritative but warm. Think: a thoughtful founder speaking to peers, not a marketing page pitching customers. |
