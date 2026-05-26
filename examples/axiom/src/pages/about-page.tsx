import { Helmet } from 'react-helmet-async'
import { PhilosophySection } from '@features/home'
import { TeamSection } from '@features/home'
import { ImpactSection } from '@features/home'

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Axiom</title>
      </Helmet>
      <div className="pt-32" />
      <PhilosophySection />
      <ImpactSection />
      <TeamSection />
    </>
  )
}
