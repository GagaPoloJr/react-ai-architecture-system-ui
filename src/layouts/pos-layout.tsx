import { useEffect, useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Store, ClipboardList, CookingPot, CreditCard, Menu, Clock, ShoppingCart } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@shared/utils/cn'


const navItems = [
  { to: '/pos', label: 'POS', icon: ShoppingCart },
  { to: '/pos/menu', label: 'Menu', icon: Menu },
  { to: '/pos/orders', label: 'Orders', icon: ClipboardList },
  { to: '/pos/kitchen', label: 'Kitchen', icon: CookingPot },
  { to: '/pos/payments', label: 'Payments', icon: CreditCard },
]

export function PosLayout() {
  const [time, setTime] = useState(new Date())
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const isPosActive = location.pathname === '/pos'

  return (
    <div className="flex min-h-[100dvh] flex-col bg-surface font-sans">
      <header className="sticky top-0 z-50 border-b border-border-subtle/80 bg-surface-card/80 backdrop-blur-lg shadow-sm">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4">
          <NavLink to="/pos" className="flex items-center gap-2.5 text-lg sm:text-xl font-bold">
            <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-brand text-white text-sm shadow-sm">
              <Store className="size-4" />
            </div>
            <span className="hidden sm:inline text-gradient-brand">Warung Bahari</span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/pos'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-sm'
                      : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <Clock className="hidden sm:block h-4 w-4" />
            <span>{format(time, 'HH:mm')}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-16 md:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Outlet />
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border-subtle bg-surface-card/90 backdrop-blur-lg px-2 py-1 md:hidden">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = to === '/pos' ? isPosActive : location.pathname.startsWith(to)
          return (
            <NavLink
              key={to}
              to={to}
              end={to === '/pos'}
              className={cn(
                'flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                isActive
                  ? 'text-brand-600'
                  : 'text-text-tertiary',
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
