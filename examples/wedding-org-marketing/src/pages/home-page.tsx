import { Helmet } from 'react-helmet-async'
import { HeroSection } from '@features/hero'
import { ServicesSection } from '@features/services'
import { PortfolioSection } from '@features/portfolio'
import { TestimonialsSection } from '@features/testimonials'

export function Component() {
  return (
    <>
      <Helmet>
        <title>Serenity Weddings — Premium Wedding Organization</title>
        <meta name="description" content="Bespoke wedding planning and design services. We craft unforgettable celebrations that reflect your unique love story." />
      </Helmet>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
    </>
  )
}
