import { z } from 'zod'

export const menuItemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  category: z.enum(['food', 'beverage', 'snack']),
  imageUrl: z.string().nullable().optional(),
  isAvailable: z.boolean().default(true),
})

export type MenuItemFormValues = z.infer<typeof menuItemSchema>
