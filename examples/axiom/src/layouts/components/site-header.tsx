import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '@shared/utils'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 64)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-canvas/95 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className={cn('text-lg tracking-widest uppercase transition-colors', scrolled ? 'text-text-primary' : 'text-text-primary')}>
          Axiom
        </Link>
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-xs tracking-widest uppercase transition-colors',
                  isActive
                    ? 'text-text-primary'
                    : scrolled ? 'text-text-secondary hover:text-text-primary' : 'text-text-secondary hover:text-text-primary'
                )
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
