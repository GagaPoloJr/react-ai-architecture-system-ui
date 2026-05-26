import { Helmet } from 'react-helmet-async'
import { Mail, Phone, MapPin } from 'lucide-react'
import { ContactForm } from '@features/contact'

export function Component() {
  return (
    <>
      <Helmet>
        <title>Contact Us — Serenity Weddings</title>
        <meta name="description" content="Ready to plan your dream wedding? Get in touch with our team for a complimentary consultation." />
      </Helmet>
      <section className="pt-32 pb-24 md:pb-32 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-lg mb-16">
            <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-sage bg-sage/10 mb-4">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-espresso mb-4">
              Let&apos;s Start Planning
            </h1>
            <p className="text-espresso/60 leading-relaxed">
              Tell us about your vision, and we&apos;ll create a celebration that exceeds every expectation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="rounded-[2rem] bg-white p-1.5 ring-1 ring-espresso/5">
                <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 md:p-10">
                  <ContactForm />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 border border-espresso/5">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-sage" />
                </div>
                <h3 className="font-medium text-sm text-espresso mb-1">Email</h3>
                <p className="text-sm text-espresso/60">hello@serenityweddings.com</p>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-espresso/5">
                <div className="w-10 h-10 rounded-full bg-dusty-rose/10 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-dusty-rose" />
                </div>
                <h3 className="font-medium text-sm text-espresso mb-1">Phone</h3>
                <p className="text-sm text-espresso/60">+1 (312) 847-1928</p>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-espresso/5">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-champagne" />
                </div>
                <h3 className="font-medium text-sm text-espresso mb-1">Location</h3>
                <p className="text-sm text-espresso/60">Chicago, IL<br />Serving destinations worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
