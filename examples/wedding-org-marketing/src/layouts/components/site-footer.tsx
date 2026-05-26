import { Link } from 'react-router-dom'
import { Heart, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@shared/ui'

export function SiteFooter() {
  return (
    <footer>
      <section className="relative overflow-hidden bg-espresso text-cream py-24 px-6 text-center">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_#D4AF37_0%,_transparent_70%)]" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] font-medium mb-4 text-cream/60">
            Let&apos;s Create Magic
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
            Ready to plan your dream wedding?
          </h2>
          <p className="text-cream/70 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Every love story deserves a celebration as unique as you are.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="bg-cream text-espresso hover:bg-cream/90 border-0">
              Book a Consultation
            </Button>
          </Link>
        </div>
      </section>

      <div className="bg-charcoal text-cream/70 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-cream font-semibold text-lg mb-4">Serenity Weddings</h3>
            <p className="text-sm leading-relaxed text-cream/60">
              Crafting unforgettable wedding experiences since 2015. We believe in love, detail, and moments that last a lifetime.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Heart, Mail].map((Icon) => (
                <a key={Icon.displayName} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Social link">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-cream font-medium text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              {['Full Planning', 'Partial Planning', 'Day-of Coordination', 'Design & Styling', 'Vendor Management'].map((s) => (
                <li key={s}>
                  <Link to="/services" className="hover:text-cream transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-medium text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Portfolio', path: '/portfolio' },
                { label: 'Pricing', path: '/pricing' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-cream transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-medium text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              {[
                { icon: Mail, text: 'hello@serenityweddings.com' },
                { icon: Phone, text: '+1 (312) 847-1928' },
                { icon: MapPin, text: 'Chicago, IL' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-cream/40" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-sm text-cream/40">
          &copy; {new Date().getFullYear()} Serenity Weddings. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
