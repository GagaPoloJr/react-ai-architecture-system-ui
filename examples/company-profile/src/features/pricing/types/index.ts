export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  features: Array<{ text: string; included: boolean }>;
  ctaText: string;
  ctaHref: string;
  isPopular: boolean;
  isHighlighted: boolean;
}
