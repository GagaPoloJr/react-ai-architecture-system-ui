export interface CompanyInfo {
  mission: string;
  vision: string;
  story: string;
  foundingYear: number;
  teamSize: number;
  values: Array<{ title: string; description: string; icon: string }>;
  imageUrl: string;
}
