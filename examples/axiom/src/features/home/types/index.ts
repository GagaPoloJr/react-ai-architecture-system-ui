export interface HeroContent {
  headline: string
  description: string
  primaryCta: string
  secondaryCta: string
}

export interface PhilosophyStatement {
  title: string
  body: string
}

export interface Belief {
  id: string
  text: string
  author: string
  role: string
}

export interface ImpactMetric {
  id: string
  value: string
  label: string
  description?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photoUrl: string
  office: string
  bio: string
}

export interface Perspective {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  author: {
    name: string
    role: string
  }
  category: string
  publishedAt: string
  readingTime: number
}
