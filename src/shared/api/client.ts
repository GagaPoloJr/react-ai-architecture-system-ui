import axios from 'axios'
import { setupMockInterceptor } from '@/mocks/interceptor'
import { parseAxiosError } from './error'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

/*
 * ── Mock Interceptor ──────────────────────────────────────────────────
 * In DEV mode, all API calls are intercepted and served from mock data
 * in src/mocks/ so you can run the full app without a backend.
 *
 * To connect to a real API:
 *   1. Delete or comment out the 2 lines below (setupMockInterceptor)
 *   2. Set VITE_API_URL in .env to point at your backend
 *      e.g. VITE_API_URL=https://api.example.com
 *   3. Restart the dev server — all {name}-api.ts calls now hit the real
 *      endpoint. No other code changes needed.
 * ───────────────────────────────────────────────────────────────────────
 */
if (import.meta.env.DEV) {
  setupMockInterceptor(client)
}

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const appError = parseAxiosError(error)
    if (appError.status === 401) {
      console.warn('Unauthorized')
    }
    return Promise.reject(appError)
  },
)
