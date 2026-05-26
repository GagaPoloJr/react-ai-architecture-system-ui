import { Helmet } from 'react-helmet-async'
import { ServicesSection } from '@features/services'

export function Component() {
  return (
    <>
      <Helmet>
        <title>Our Services — Serenity Weddings</title>
        <meta name="description" content="Explore our wedding planning and design services including full planning, partial planning, day-of coordination, and more." />
      </Helmet>
      <div className="pt-32">
        <ServicesSection />
      </div>
    </>
  )
}
