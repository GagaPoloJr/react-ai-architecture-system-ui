import { Helmet } from 'react-helmet-async'
import { PricingSection } from '@features/pricing'

export function Component() {
  return (
    <>
      <Helmet>
        <title>Pricing — Serenity Weddings</title>
        <meta name="description" content="Transparent wedding planning packages. Choose from Essentials, Signature, or Luxury — no hidden fees." />
      </Helmet>
      <div className="pt-32">
        <PricingSection />
      </div>
    </>
  )
}
