import { useEffect, useRef } from 'react'
import { Heart, Sparkles, Users, Award } from 'lucide-react'

const stats = [
  { icon: Heart, label: 'Weddings Planned', value: '247+' },
  { icon: Users, label: 'Happy Couples', value: '500+' },
  { icon: Sparkles, label: 'Years Experience', value: '10+' },
  { icon: Award, label: 'Industry Awards', value: '18' },
]

const team = [
  {
    name: 'Elena Voss',
    role: 'Founder & Creative Director',
    bio: 'With over a decade in the industry, Elena brings an artist\'s eye and a producer\'s precision to every wedding.',
    image: 'https://picsum.photos/seed/elena/400/500',
  },
  {
    name: 'Marcus Rivera',
    role: 'Lead Planner',
    bio: 'Marcus thrives on logistics and timelines — ensuring every moment flows seamlessly from start to finish.',
    image: 'https://picsum.photos/seed/marcus/400/500',
  },
  {
    name: 'Priya Patel',
    role: 'Design Director',
    bio: 'Priya transforms spaces into immersive environments, blending textures, light, and color into harmony.',
    image: 'https://picsum.photos/seed/priya/400/500',
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.about-reveal').forEach((child, i) => {
              setTimeout(() => {
                (child as HTMLElement).style.transform = 'translateY(0)'
                ;(child as HTMLElement).style.opacity = '1'
              }, i * 120)
            })
          }
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          <div className="about-reveal" style={{ transform: 'translateY(30px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}>
            <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-sage bg-sage/10 mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-espresso mb-6">
              We Believe in Love, Detail & Storytelling
            </h2>
            <p className="text-espresso/60 leading-relaxed mb-6">
              Founded in 2015, Serenity Weddings was born from a simple belief: your wedding should feel like you. 
              Not a template, not a trend — but a genuine reflection of your relationship.
            </p>
            <p className="text-espresso/60 leading-relaxed">
              Our team of seasoned planners, designers, and coordinators brings together decades of experience 
              across venues, cultures, and styles. We speak the language of weddings fluently — so you don&apos;t have to.
            </p>
          </div>

          <div className="about-reveal relative" style={{ transform: 'translateY(30px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}>
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
              <div className="w-full h-full bg-[url('https://picsum.photos/seed/about-team/800/1000')] bg-cover bg-center" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-sage/10 blur-2xl" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat) => (
            <div key={stat.label} className="about-reveal text-center p-8 rounded-2xl bg-cream" style={{ transform: 'translateY(30px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}>
              <stat.icon className="w-6 h-6 text-sage mx-auto mb-4" />
              <p className="text-2xl md:text-3xl font-light text-espresso mb-1">{stat.value}</p>
              <p className="text-xs text-espresso/50 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <article key={member.name} className="about-reveal" style={{ transform: 'translateY(30px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}>
              <div className="rounded-[2rem] bg-cream/50 p-1.5 ring-1 ring-espresso/5">
                <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden">
                  <div className="aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: `url(${member.image})` }} />
                </div>
              </div>
              <div className="mt-4 px-2">
                <h3 className="font-medium text-espresso">{member.name}</h3>
                <p className="text-xs text-sage uppercase tracking-wider mt-1 mb-2">{member.role}</p>
                <p className="text-sm text-espresso/60 leading-relaxed">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
