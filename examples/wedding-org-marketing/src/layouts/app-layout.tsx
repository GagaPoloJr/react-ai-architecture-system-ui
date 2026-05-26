import { Outlet } from 'react-router-dom'
import { SiteHeader } from './components/site-header'
import { SiteFooter } from './components/site-footer'

export function AppLayout() {
  return (
    <div className="min-h-[100dvh] bg-cream text-espresso">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
