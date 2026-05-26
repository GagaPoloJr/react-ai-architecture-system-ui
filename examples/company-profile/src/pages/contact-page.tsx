import { Helmet } from 'react-helmet-async'
import { ContactForm } from '@features/contact'

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us — Postlight</title>
        <meta name="description" content="Get in touch with our team. We'd love to hear from you." />
      </Helmet>

      <div className="pt-28">
        <ContactForm />
      </div>
    </>
  )
}
