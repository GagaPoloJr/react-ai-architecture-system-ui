import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Link to="/" className="text-lg tracking-widest uppercase text-text-primary">
              Axiom
            </Link>
            <p className="mt-3 text-sm text-text-secondary max-w-xs leading-relaxed">
              Strategy, design, and engineering for organizations navigating complexity.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors">
              GitHub
            </a>
          </div>
        </div>
        <p className="mt-12 text-xs text-text-secondary/60">
          &copy; {new Date().getFullYear()} Axiom. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
