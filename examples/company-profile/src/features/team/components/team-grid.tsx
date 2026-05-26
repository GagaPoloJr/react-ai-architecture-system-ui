import { SectionHeader } from '@shared/ui/molecules/section-header'
import type { TeamMember } from '../types'

const avatarImages: Record<string, string> = {
  '1': '/images/avatar-riley.jpg',
  '2': '/images/avatar-morgan.jpg',
  '3': '/images/avatar-priya.jpg',
  '4': '/images/avatar-jordan.jpg',
  '5': '/images/avatar-samira.jpg',
  '6': '/images/avatar-tyler.jpg',
}

interface TeamGridProps {
  badge?: string;
  title: string;
  description?: string;
  members: TeamMember[];
}

export function TeamGrid({ badge, title, description, members }: TeamGridProps) {
  const featured = members.filter(m => m.role.includes('Co-Founder') || m.role === 'CEO')
  const rest = members.filter(m => !featured.includes(m))

  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader badge={badge} title={title} description={description} />

        <div className="mt-20 grid gap-6 md:grid-cols-[1.5fr_1fr_1fr]">
          {featured.map((member) => (
            <div
              key={member.id}
              className="rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl p-8 lg:p-10 space-y-5 shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/30"
            >
              <img
                src={avatarImages[member.id]}
                alt={member.name}
                className="size-16 rounded-full object-cover"
                loading="lazy"
              />
              <div className="space-y-1">
                <h3 className="font-display text-lg font-semibold text-text-primary tracking-tight">{member.name}</h3>
                <p className="text-sm text-accent">{member.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">{member.bio}</p>
            </div>
          ))}

          {rest.map((member) => (
            <div
              key={member.id}
              className="rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl p-8 lg:p-10 space-y-5 shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/30"
            >
              <img
                src={avatarImages[member.id]}
                alt={member.name}
                className="size-14 rounded-full object-cover"
                loading="lazy"
              />
              <div className="space-y-1">
                <h3 className="font-display text-base font-semibold text-text-primary tracking-tight">{member.name}</h3>
                <p className="text-xs text-accent/80">{member.role}</p>
              </div>
              <p className="text-xs leading-relaxed text-text-secondary">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
