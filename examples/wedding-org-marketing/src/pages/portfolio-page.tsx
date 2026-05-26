import { Helmet } from 'react-helmet-async'
import { PortfolioSection } from '@features/portfolio'

export function Component() {
  return (
    <>
      <Helmet>
        <title>Our Portfolio — Serenity Weddings</title>
        <meta name="description" content="Browse our portfolio of beautifully crafted weddings. Each celebration is a unique reflection of the couple's love story." />
      </Helmet>
      <div className="pt-32">
        <PortfolioSection />
      </div>
    </>
  )
}
