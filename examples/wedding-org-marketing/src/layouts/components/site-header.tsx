import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <nav className="flex items-center justify-between w-max rounded-full bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] px-6 py-3">
        <Link to="/" className="text-espresso font-semibold tracking-tight text-lg mr-8">
          Serenity
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-espresso text-cream'
                    : 'text-espresso/70 hover:text-espresso hover:bg-espresso/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden ml-4 p-2 rounded-full hover:bg-espresso/5 transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative w-5 h-5">
            <span
              className={`absolute top-0 left-0 w-5 h-0.5 bg-espresso transition-all duration-300 ${
                isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute top-2 left-0 w-5 h-0.5 bg-espresso transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute top-4 left-0 w-5 h-0.5 bg-espresso transition-all duration-300 ${
                isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-espresso/80 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          {navItems.map((item, i) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-cream text-2xl font-light tracking-tight opacity-0 translate-y-12 animate-[fadeUp_0.6s_cubic-bezier(0.32,0.72,0,1)_forwards]"
              style={{ animationDelay: `${i * 100 + 100}ms` }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
