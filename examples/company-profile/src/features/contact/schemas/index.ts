import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z
    .string()
    .regex(/^[+]?[\d\s()-]{8,20}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  interest: z.enum([
    "general-inquiry",
    "sales",
    "support",
    "partnership",
    "demo-request",
    "careers",
    "other",
  ]),
  message: z.string().min(10, "Please include a brief message"),
  agreeToContact: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
