import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '@shared/hooks'
import type { TeamMember } from '../types'

interface TeamSectionProps {
  members?: TeamMember[]
}

const defaultMembers: TeamMember[] = [
  { id: '1', name: 'Ana Voss', role: 'Founder & CEO', photoUrl: '/images/team-1.jpg', office: 'New York', bio: '' },
  { id: '2', name: 'Marcus Chen', role: 'Chief Design Officer', photoUrl: '/images/team-2.jpg', office: 'New York', bio: '' },
  { id: '3', name: 'Sofia Reyes', role: 'Chief Technology Officer', photoUrl: '/images/team-3.jpg', office: 'San Francisco', bio: '' },
  { id: '4', name: 'James Okonkwo', role: 'Head of Strategy', photoUrl: '/images/team-4.jpg', office: 'London', bio: '' },
  { id: '5', name: 'Elena Petrov', role: 'Design Director', photoUrl: '/images/team-1.jpg', office: 'London', bio: '' },
  { id: '6', name: 'David Park', role: 'Engineering Lead', photoUrl: '/images/team-2.jpg', office: 'San Francisco', bio: '' },
  { id: '7', name: 'Claire Dubois', role: 'Product Director', photoUrl: '/images/team-3.jpg', office: 'New York', bio: '' },
  { id: '8', name: 'Raj Patel', role: 'Data Strategist', photoUrl: '/images/team-4.jpg', office: 'London', bio: '' },
]

const offices = ['New York', 'San Francisco', 'London'] as const

export function TeamSection({ members = defaultMembers }: TeamSectionProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-28 md:py-36 lg:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef}>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-text-primary">
            The team
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-xl leading-relaxed">
            Strategists, designers, and engineers across three offices.
          </p>
        </div>
        <div className="mt-16 space-y-20">
          {offices.map((office) => {
            const officeMembers = members.filter((m) => m.office === office)
            return <OfficeGroup key={office} office={office} members={officeMembers} />
          })}
        </div>
      </div>
    </section>
  )
}

function OfficeGroup({ office, members }: { office: string; members: TeamMember[] }) {
  const ref = useRef<HTMLDivElement>(null!)

  useGSAP(() => {
    gsap.fromTo('.team-card',
      { opacity: 0, scale: 0.95, y: 24 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: ref })

  return (
    <div ref={ref}>
      <h3 className="text-xs tracking-widest uppercase text-text-secondary mb-8">
        {office}
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <div key={member.id} className="team-card">
            <div className="aspect-[3/4] overflow-hidden bg-surface">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4">
              <p className="text-sm tracking-widest uppercase text-text-primary">
                {member.name}
              </p>
              <p className="text-xs tracking-widest uppercase text-text-secondary mt-1">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
