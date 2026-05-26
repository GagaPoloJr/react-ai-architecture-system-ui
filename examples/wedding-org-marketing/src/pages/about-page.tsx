import { Helmet } from 'react-helmet-async'
import { AboutSection } from '@features/about'

export function Component() {
  return (
    <>
      <Helmet>
        <title>About Us — Serenity Weddings</title>
        <meta name="description" content="Meet the Serenity Weddings team. We're a passionate group of planners, designers, and coordinators dedicated to crafting unforgettable celebrations." />
      </Helmet>
      <div className="pt-32">
        <AboutSection />
      </div>
    </>
  )
}
