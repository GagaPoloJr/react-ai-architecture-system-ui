import { z } from 'zod'

export const orderItemSchema = z.object({
  menuItemId: z.string().min(1, 'Menu item is required'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  notes: z.string().optional(),
})

export const orderSchema = z.object({
  tableId: z.string().min(1, 'Table is required'),
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
})

export type OrderFormValues = z.infer<typeof orderSchema>
