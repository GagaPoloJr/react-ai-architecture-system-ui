import { Helmet } from 'react-helmet-async'
import { AboutSection } from '@features/about'
import { TeamGrid } from '@features/team'
import { StatsBar } from '@features/stats'
import type { CompanyInfo } from '@features/about'
import type { TeamMember } from '@features/team'
import type { StatItem } from '@features/stats'

const companyInfo: CompanyInfo = {
  mission: 'Build the tools we wish we had',
  vision: 'A world where engineering teams spend less time in meetings and more time building',
  story: 'Postlight started as an internal tool at a fast-growing startup backed by Y Combinator. We were spending 6 hours a week just stitching together updates from Jira, Slack, and GitHub. So we built something better. When teams around us started asking for access, we knew we had stumbled onto something real. Today, Postlight is used by over 3,400 engineering teams worldwide, from 5-person startups to Fortune 500 engineering orgs.',
  foundingYear: 2021,
  teamSize: 18,
  values: [
    { title: 'Craft over consensus', description: 'We ship fast, iterate faster, and trust our team to make the right call without endless design reviews.', icon: 'target' },
    { title: 'Eat your own dogfood', description: 'Every feature we build gets used internally for at least two weeks before any customer sees it.', icon: 'eye' },
    { title: 'Default to open', description: 'Our roadmap, our pricing, and our bugs — all public. Transparency is a feature, not an afterthought.', icon: 'heart' },
  ],
  imageUrl: '',
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Riley Chen', role: 'CEO & Co-Founder', bio: 'Previously led infrastructure at Stripe. Built the payments pipeline that processes $18B+ annually.', avatarUrl: '', socialLinks: { linkedin: '#', twitter: '#' } },
  { id: '2', name: 'Morgan Webb', role: 'CTO & Co-Founder', bio: 'Ex-Vercel engineer on the edge compute team. Wrote the first version of Postlight in a weekend.', avatarUrl: '', socialLinks: { linkedin: '#', github: '#' } },
  { id: '3', name: 'Priya Kapoor', role: 'Head of Design', bio: 'Led product design at Linear before joining. Believes the best UI is the UI you don\'t notice.', avatarUrl: '', socialLinks: { linkedin: '#', website: '#' } },
  { id: '4', name: 'Jordan McAllister', role: 'Head of Engineering', bio: 'Built distributed systems at AWS for 6 years. Now building the real-time sync layer at Postlight.', avatarUrl: '', socialLinks: { linkedin: '#', twitter: '#' } },
  { id: '5', name: 'Samira Hassan', role: 'Head of Product', bio: 'PM #1 at Raycast. Scaled the product from 10k to 500k monthly active developers.', avatarUrl: '', socialLinks: { linkedin: '#', github: '#' } },
  { id: '6', name: 'Tyler Nakamura', role: 'Head of Growth', bio: 'Built developer relations at Supabase. Grew the community from zero to 60k GitHub stars.', avatarUrl: '', socialLinks: { linkedin: '#', twitter: '#' } },
]

const stats: StatItem[] = [
  { id: '1', value: 7.2, suffix: 'hrs', label: 'Time saved per developer per week', description: 'Average across all teams' },
  { id: '2', value: 3400, suffix: '+', label: 'Active teams', description: 'Growing 23% month over month' },
  { id: '3', value: 18, suffix: '', label: 'Team members', description: 'Across 8 time zones' },
  { id: '4', value: 2021, suffix: '', label: 'Founded', description: 'Y Combinator S21' },
]

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Postlight</title>
        <meta name="description" content="Learn about our mission, our team, and why we built Postlight." />
      </Helmet>

      <div className="pt-28">
        <StatsBar stats={stats} />
        <AboutSection info={companyInfo} />
        <TeamGrid
          badge="Team"
          title="The team behind Postlight"
          description="We're builders, designers, and former operators who have firsthand experience with the problems we're solving."
          members={teamMembers}
        />
      </div>
    </>
  )
}
