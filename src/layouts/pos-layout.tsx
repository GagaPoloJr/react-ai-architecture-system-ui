import { useEffect, useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Store, ClipboardList, CookingPot, CreditCard, Menu, Clock, ShoppingCart } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@shared/utils/cn'
import '@fontsource-variable/inter'

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
    <div className="flex min-h-[100dvh] flex-col bg-stone-50 font-sans">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4">
          <NavLink to="/pos" className="flex items-center gap-2 text-lg sm:text-xl font-bold text-emerald-600">
            <Store className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="hidden sm:inline">Warung Bahari</span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/pos'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-sm text-stone-500">
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

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-stone-200 bg-white px-2 py-1 md:hidden">
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
                  ? 'text-emerald-600'
                  : 'text-stone-500',
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
