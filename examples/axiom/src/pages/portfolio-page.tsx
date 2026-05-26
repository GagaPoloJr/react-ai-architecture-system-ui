import { Helmet } from 'react-helmet-async'
import { PortfolioSection } from '@shared/ui/sections/portfolio-section'

export function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Work — Axiom</title>
      </Helmet>
      <div className="pt-32" />
      <PortfolioSection />
    </>
  )
}
