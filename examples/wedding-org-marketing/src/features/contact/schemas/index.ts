import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().or(z.literal('')),
  eventDate: z.string().optional(),
  venue: z.string().optional(),
  serviceInterest: z.enum([
    'full-planning',
    'partial-planning',
    'day-of-coordination',
    'design-styling',
    'vendor-management',
    'other',
  ]),
  budgetRange: z
    .enum(['under-10k', '10k-20k', '20k-50k', '50k-100k', '100k-plus', 'not-sure'])
    .optional(),
  message: z.string().min(10, 'Please include a brief message about your wedding vision'),
  howHeard: z
    .enum(['instagram', 'google', 'friend', 'venue', 'wedding-fair', 'other'])
    .optional(),
  agreeToContact: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to be contacted' }),
  }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
