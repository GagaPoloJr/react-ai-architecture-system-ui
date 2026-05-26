import { Link } from 'react-router-dom'
import { Button, ArrowIcon } from '@shared/ui/atoms/button'

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/' },
      { label: 'Pricing', href: '/' },
      { label: 'Integrations', href: '/' },
      { label: 'Changelog', href: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/' },
      { label: 'FAQ', href: '/' },
      { label: 'API', href: '/' },
      { label: 'Status', href: '/' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(99,102,241,0.08)] bg-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="py-24 lg:py-32 text-center border-b border-[rgba(99,102,241,0.08)]">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl leading-[1.05]">
            Ready to ship faster?
          </h2>
          <p className="mt-4 text-base text-text-secondary/70 max-w-md mx-auto">
            Join teams already using Postlight to streamline their workflow.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link to="/contact">
                Start building
                <ArrowIcon />
              </Link>
            </Button>
          </div>
        </div>

        <div className="py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="text-lg font-medium text-text-primary tracking-tight">
              Postlight<span className="text-accent">.</span>
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary/60 max-w-xs">
              Modern engineering tools for modern teams. We build software that helps you ship with confidence.
            </p>
            <div className="flex gap-5 pt-2">
              {['X', 'GitHub', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs font-medium text-text-secondary/40 hover:text-accent transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-text-secondary/40">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-text-secondary/60 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(99,102,241,0.08)] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary/40">
          <p>&copy; {new Date().getFullYear()} Postlight. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-accent transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
