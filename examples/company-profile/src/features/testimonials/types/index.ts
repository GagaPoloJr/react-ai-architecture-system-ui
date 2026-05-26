export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
  logoUrl?: string;
  rating: number;
  featured: boolean;
}
