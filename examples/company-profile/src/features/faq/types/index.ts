export interface FAQCategory {
  id: string;
  name: string;
  items: FAQItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
