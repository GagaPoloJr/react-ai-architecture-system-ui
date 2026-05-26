import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@layouts/app-layout'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, lazy: () => import('./home-page') },
      { path: 'services', lazy: () => import('./services-page') },
      { path: 'portfolio', lazy: () => import('./portfolio-page') },
      { path: 'pricing', lazy: () => import('./pricing-page') },
      { path: 'contact', lazy: () => import('./contact-page') },
      { path: 'about', lazy: () => import('./about-page') },
    ],
  },
])
