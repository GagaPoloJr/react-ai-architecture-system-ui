import { z } from 'zod'

export const paymentSchema = z.object({
  orderId: z.string().min(1),
  amount: z.coerce.number().positive(),
  method: z.enum(['cash', 'card', 'qris']),
})

export type PaymentFormValues = z.infer<typeof paymentSchema>
