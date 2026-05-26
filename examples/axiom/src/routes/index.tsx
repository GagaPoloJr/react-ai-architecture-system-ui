import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@layouts/app-layout'

const HomePage = lazy(() => import('@pages/home-page').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('@pages/about-page').then((m) => ({ default: m.AboutPage })))
const PortfolioPage = lazy(() => import('@pages/portfolio-page').then((m) => ({ default: m.PortfolioPage })))
const ContactPage = lazy(() => import('@pages/contact-page').then((m) => ({ default: m.ContactPage })))

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-text-secondary text-sm tracking-widest uppercase">Loading</p></div>}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <SuspenseWrapper><HomePage /></SuspenseWrapper> },
      { path: 'about', element: <SuspenseWrapper><AboutPage /></SuspenseWrapper> },
      { path: 'portfolio', element: <SuspenseWrapper><PortfolioPage /></SuspenseWrapper> },
      { path: 'contact', element: <SuspenseWrapper><ContactPage /></SuspenseWrapper> },
    ],
  },
])
