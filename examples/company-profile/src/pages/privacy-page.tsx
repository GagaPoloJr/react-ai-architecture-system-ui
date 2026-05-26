import { Helmet } from 'react-helmet-async'

export function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Postlight</title>
        <meta name="description" content="Our privacy policy outlines how we collect, use, and protect your data." />
      </Helmet>

      <div className="pt-32 pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-primary mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-text-secondary leading-relaxed">
            <p>Last updated: March 2024</p>
            <h2 className="text-xl font-semibold text-text-primary">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, company name, and other contact details.</p>
            <h2 className="text-xl font-semibold text-text-primary">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.</p>
            <h2 className="text-xl font-semibold text-text-primary">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
            <h2 className="text-xl font-semibold text-text-primary">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@postlight.dev.</p>
          </div>
        </div>
      </div>
    </>
  )
}
