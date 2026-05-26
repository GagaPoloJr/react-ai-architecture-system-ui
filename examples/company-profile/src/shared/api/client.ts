import axios from 'axios'
import { parseAxiosError } from './error'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(parseAxiosError(error)),
)
