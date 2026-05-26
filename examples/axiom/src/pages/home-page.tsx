import { Helmet } from 'react-helmet-async'
import { HeroSection } from '@features/home'
import { PhilosophySection } from '@features/home'
import { PortfolioSection } from '@shared/ui/sections/portfolio-section'
import { ImpactSection } from '@features/home'
import { TeamSection } from '@features/home'
import { PerspectivesSection } from '@features/home'
import { ContactSection } from '@features/contact'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Axiom — Strategy, Design, Engineering</title>
      </Helmet>
      <HeroSection />
      <PhilosophySection />
      <PortfolioSection />
      <ImpactSection />
      <TeamSection />
      <PerspectivesSection />
      <ContactSection />
    </>
  )
}
