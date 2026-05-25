import { z } from 'zod'

export const tablesSchema = z.object({
  // TODO: define fields
})

export type TablesFormValues = z.infer<typeof tablesSchema>
