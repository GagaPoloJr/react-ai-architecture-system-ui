import { Outlet } from 'react-router-dom'
import { useScrollToTop } from '@shared/hooks'
import { SiteHeader } from './components/site-header'
import { SiteFooter } from './components/site-footer'

export function AppLayout() {
  useScrollToTop()

  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
