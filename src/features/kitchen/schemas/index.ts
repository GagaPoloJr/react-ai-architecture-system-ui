import { z } from 'zod'

export const kitchenSchema = z.object({})

export type KitchenFormValues = z.infer<typeof kitchenSchema>
