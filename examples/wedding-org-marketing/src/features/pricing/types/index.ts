export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  isPopular: boolean
  cta: string
}
