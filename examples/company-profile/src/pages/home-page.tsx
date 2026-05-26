import { Helmet } from "react-helmet-async";
import { HeroSection } from "@features/hero";
import { FeaturesGrid } from "@features/features";
import { StatsBar } from "@features/stats";
import { AboutSection } from "@features/about";
import { TeamGrid } from "@features/team";
import { PricingSection } from "@features/pricing";
import { TestimonialsSection } from "@features/testimonials";
import { BlogSection } from "@features/blog";
import { FAQSection } from "@features/faq";
import { ContactForm } from "@features/contact";
import type { HeroContent } from "@features/hero";
import type { ProductFeature } from "@features/features";
import type { StatItem } from "@features/stats";
import type { CompanyInfo } from "@features/about";
import type { TeamMember } from "@features/team";
import type { PricingTier } from "@features/pricing";
import type { Testimonial } from "@features/testimonials";
import type { BlogPost } from "@features/blog";
import type { FAQCategory } from "@features/faq";

const heroContent: HeroContent = {
  badge: "Now in public beta",
  title: "Build tools your team will",
  highlightedPhrase: "actually love.",
  description:
    "Postlight helps engineering teams cut through the noise with workflow tools designed for how modern teams actually build software.",
  primaryCta: { text: "Start building", href: "#pricing" },
  secondaryCta: { text: "Watch demo", href: "#demo" },
  productPreviewImage: "/product-preview.png",
  trustIndicator: {
    text: "Used by teams at",
    logos: [
      { name: "Linear", src: "" },
      { name: "Vercel", src: "" },
      { name: "Raycast", src: "" },
      { name: "Cal.com", src: "" },
    ],
  },
};

const features: ProductFeature[] = [
  {
    id: "1",
    title: "Works where you already work",
    description:
      "Deep integrations with Slack, GitHub, Linear, and Figma. No context switching, no tab-hoarding.",
    longDescription: "",
    icon: "⌘",
    imageUrl: "",
    benefits: [
      "Syncs bidirectionally with Linear and GitHub",
      "Inline actions from Slack and Discord",
      "Figma plugin for design handoff",
    ],
    isReversed: false,
  },
  {
    id: "2",
    title: "Analytics that actually tell a story",
    description:
      "Stop exporting CSV files. Get automated summaries, cycle time trends, and bottleneck detection out of the box.",
    longDescription: "",
    icon: "■",
    imageUrl: "",
    benefits: [
      "Cycle time and throughput tracked automatically",
      "DORA metrics with zero configuration",
      "Weekly digests sent to Slack or email",
    ],
    isReversed: true,
  },
  {
    id: "3",
    title: "Built for the way you ship",
    description:
      "From ticket to deploy, every step is connected. No more copy-pasting links into spreadsheets.",
    longDescription: "",
    icon: "◇",
    imageUrl: "",
    benefits: [
      "PRs linked to tickets automatically",
      "Deploy tracking via Vercel and Railway",
      "Changelogs generated from git history",
    ],
    isReversed: false,
  },
];

const stats: StatItem[] = [
  {
    id: "1",
    value: 7.2,
    suffix: "hrs",
    label: "Avg. time saved per week",
    description: "Per developer",
  },
  {
    id: "2",
    value: 3400,
    suffix: "+",
    label: "Active teams",
    description: "Growing 23% month over month",
  },
  {
    id: "3",
    value: 47,
    suffix: "%",
    label: "Faster cycle time",
    description: "Median improvement after 90 days",
  },
  {
    id: "4",
    value: 4.8,
    suffix: "/5",
    label: "Satisfaction rating",
    description: "From 1,247 verified reviews",
  },
];

const companyInfo: CompanyInfo = {
  mission: "Build the tools we wish we had",
  vision:
    "A world where engineering teams spend less time in meetings and more time building",
  story:
    "Postlight started as an internal tool at a fast-growing startup. We were spending 6 hours a week just stitching together updates from Jira, Slack, and GitHub. So we built something better. When teams around us started asking for access, we knew we had stumbled onto a real problem.",
  foundingYear: 2021,
  teamSize: 18,
  values: [
    {
      title: "Craft over consensus",
      description:
        "We ship fast, iterate faster, and trust our team to make the right call without endless design reviews.",
      icon: "target",
    },
    {
      title: "Eat your own dogfood",
      description:
        "Every feature we build gets used internally for at least two weeks before any customer sees it.",
      icon: "eye",
    },
    {
      title: "Default to open",
      description:
        "Our roadmap, our pricing, and our bugs — all public. Transparency is a feature, not an afterthought.",
      icon: "heart",
    },
  ],
  imageUrl: "",
};

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Riley Chen",
    role: "CEO & Co-Founder",
    bio: "Previously led infrastructure at Stripe. Built the payments pipeline that processes $18B+ annually.",
    avatarUrl: "",
    socialLinks: { linkedin: "#", twitter: "#" },
  },
  {
    id: "2",
    name: "Morgan Webb",
    role: "CTO & Co-Founder",
    bio: "Ex-Vercel engineer on the edge compute team. Wrote the first version of Postlight in a weekend.",
    avatarUrl: "",
    socialLinks: { linkedin: "#", github: "#" },
  },
  {
    id: "3",
    name: "Priya Kapoor",
    role: "Head of Design",
    bio: "Led product design at Linear before joining. Believes the best UI is the UI you dont notice.",
    avatarUrl: "",
    socialLinks: { linkedin: "#", website: "#" },
  },
  {
    id: "4",
    name: "Jordan McAllister",
    role: "Head of Engineering",
    bio: "Built distributed systems at AWS for 6 years. Now building the real-time sync layer at Postlight.",
    avatarUrl: "",
    socialLinks: { linkedin: "#", twitter: "#" },
  },
  {
    id: "5",
    name: "Samira Hassan",
    role: "Head of Product",
    bio: "PM #1 at Raycast. Scaled the product from 10k to 500k monthly active developers.",
    avatarUrl: "",
    socialLinks: { linkedin: "#", github: "#" },
  },
  {
    id: "6",
    name: "Tyler Nakamura",
    role: "Head of Growth",
    bio: "Built developer relations at Supabase. Grew the community from zero to 60k GitHub stars.",
    avatarUrl: "",
    socialLinks: { linkedin: "#", twitter: "#" },
  },
];

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For small teams getting their feet wet.",
    monthlyPrice: 24,
    yearlyPrice: 240,
    currency: "$",
    features: [
      { text: "Up to 10 team members", included: true },
      { text: "GitHub and Linear sync", included: true },
      { text: "Weekly Slack digests", included: true },
      { text: "7-day history", included: true },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
    ],
    ctaText: "Start free trial",
    ctaHref: "#",
    isPopular: false,
    isHighlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For teams that ship daily.",
    monthlyPrice: 64,
    yearlyPrice: 640,
    currency: "$",
    features: [
      { text: "Unlimited team members", included: true },
      { text: "All integrations", included: true },
      { text: "Daily Slack digests", included: true },
      { text: "90-day history", included: true },
      { text: "API access", included: true },
      { text: "Priority support", included: true },
    ],
    ctaText: "Start free trial",
    ctaHref: "#",
    isPopular: true,
    isHighlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations with custom needs.",
    monthlyPrice: 149,
    yearlyPrice: 1490,
    currency: "$",
    features: [
      { text: "Unlimited everything", included: true },
      { text: "SSO / SAML / SCIM", included: true },
      { text: "Audit logs", included: true },
      { text: "Unlimited history", included: true },
      { text: "Dedicated support engineer", included: true },
      { text: "Custom SLA", included: true },
    ],
    ctaText: "Contact sales",
    ctaHref: "#",
    isPopular: false,
    isHighlighted: false,
  },
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "We cut our standup time from 30 minutes to 8. Postlight automatically surfaces what everyone worked on so we can focus on blockers instead of status updates.",
    author: "Drew Marshall",
    role: "VP Engineering",
    company: "Tagboard",
    avatarUrl: "",
    rating: 5,
    featured: true,
  },
  {
    id: "2",
    quote:
      "The cycle time tracking alone was worth the switch. We identified a 3-day bottleneck in our review process within the first week.",
    author: "Lena Orozco",
    role: "Engineering Director",
    company: "Rutter",
    avatarUrl: "",
    rating: 5,
    featured: false,
  },
  {
    id: "3",
    quote:
      "We tried Jira, Asana, Linear, and Clubhouse. Postlight is the first tool that actually reduced our meeting load instead of adding to it.",
    author: "Omar Farooq",
    role: "CTO",
    company: "Capsule",
    avatarUrl: "",
    rating: 4,
    featured: false,
  },
];

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "cycle-time-debt",
    title: "Cycle time debt is the new technical debt",
    excerpt:
      "Most teams track sprint velocity but ignore the silent killer of developer productivity: accumulated cycle time debt. Here's how we measure it.",
    content: "",
    coverImage: "/images/blog-analytics.jpg",
    author: { name: "Jordan McAllister", avatarUrl: "" },
    tags: ["Engineering", "Metrics"],
    publishedAt: "2026-05-12",
    readingTime: 6,
  },
  {
    id: "2",
    slug: "async-standups",
    title: "Why we replaced our daily standup with a Slack command",
    excerpt:
      "After 18 months of async standups, our team is shipping 40% more. Heres exactly how we made the transition without losing alignment.",
    content: "",
    coverImage: "/images/blog-inclusive.jpg",
    author: { name: "Riley Chen", avatarUrl: "" },
    tags: ["Culture", "Remote Work"],
    publishedAt: "2026-04-28",
    readingTime: 8,
  },
  {
    id: "3",
    slug: "dogfooding-engineering",
    title: "The art of dogfooding: building what you actually use",
    excerpt:
      "Every feature at Postlight goes through 2 weeks of internal use before customers see it. Heres why that discipline makes our product better.",
    content: "",
    coverImage: "/images/blog-coding.jpg",
    author: { name: "Morgan Webb", avatarUrl: "" },
    tags: ["Product", "Engineering"],
    publishedAt: "2026-04-15",
    readingTime: 5,
  },
];

const faqCategories: FAQCategory[] = [
  {
    id: "general",
    name: "General",
    items: [
      {
        id: "g1",
        question: "What does Postlight actually do?",
        answer:
          "Postlight connects the tools your engineering team already uses — GitHub, Linear, Slack, Figma — and surfaces insights about how work is actually progressing. No more manual status updates, no more stale dashboards.",
      },
      {
        id: "g2",
        question: "How does the free trial work?",
        answer:
          "You get full access to Pro for 14 days. No credit card required. If you decide not to continue, your data is exportable as JSON or CSV.",
      },
      {
        id: "g3",
        question: "Can I change plans later?",
        answer:
          "Yes — upgrades take effect immediately, downgrades apply at the next billing cycle. No penalties, no hidden fees.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    items: [
      {
        id: "t1",
        question: "Where is my data stored?",
        answer:
          "Postlight is hosted on AWS (us-west-2). Data is encrypted at rest using AES-256 and in transit using TLS 1.3. We are SOC 2 Type II compliant.",
      },
      {
        id: "t2",
        question: "What integrations are supported?",
        answer:
          "GitHub, GitLab, Bitbucket, Linear, Jira, Slack, Discord, Figma, Vercel, Railway, and Render. Our API supports custom integrations via webhooks.",
      },
      {
        id: "t3",
        question: "Do you support on-premise deployment?",
        answer:
          "Enterprise plans include optional self-hosted deployment via Docker. Contact sales for details.",
      },
    ],
  },
];

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Postlight — Modern engineering for modern teams</title>
        <meta
          name="description"
          content="Postlight helps engineering teams ship faster with purpose-built workflow tools."
        />
      </Helmet>

      <HeroSection content={heroContent} />
      <StatsBar stats={stats} />
      <FeaturesGrid
        badge="Features"
        title="Everything you need, nothing you don't."
        description="Postlight connects the dots between your tools so your team can focus on shipping."
        features={features}
      />
      <AboutSection info={companyInfo} />
      <TeamGrid
        badge="Team"
        title="Built by builders"
        description="We're a small team of engineers, designers, and former PMs who have been in your shoes."
        members={teamMembers}
      />
      <PricingSection
        badge="Pricing"
        title="Simple, predictable pricing"
        description="No per-seat minimums. No surprise fees. Start free and upgrade when you outgrow us."
        tiers={pricingTiers}
      />
      <TestimonialsSection
        badge="Testimonials"
        title="Trusted by teams that ship"
        description="Hear from engineering leaders who use Postlight daily."
        testimonials={testimonials}
      />
      <FAQSection
        badge="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know before signing up."
        categories={faqCategories}
      />
      <BlogSection
        badge="Blog"
        title="Latest from Postlight"
        description="Insights, guides, and stories from our team."
        posts={blogPosts}
      />
      <ContactForm />
    </>
  );
}
