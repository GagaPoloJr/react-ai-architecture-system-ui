import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:3001/api'),
  VITE_APP_TITLE: z.string().min(1).default('Company Profile'),
  VITE_ENABLE_DEBUG: z.enum(['true', 'false']).default('false'),
})

export const env = envSchema.parse(import.meta.env)
export type Env = z.infer<typeof envSchema>
