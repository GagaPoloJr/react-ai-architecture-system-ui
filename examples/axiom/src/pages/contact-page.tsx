import { Helmet } from 'react-helmet-async'
import { ContactSection } from '@features/contact'

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — Axiom</title>
      </Helmet>
      <div className="pt-32" />
      <ContactSection />
    </>
  )
}
