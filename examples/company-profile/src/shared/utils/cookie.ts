import Cookies from 'js-cookie'

export const cookie = {
  get: (key: string) => Cookies.get(key),
  set: (key: string, value: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(key, value, { secure: true, sameSite: 'lax', ...options }),
  remove: (key: string) => Cookies.remove(key),
}
