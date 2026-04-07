export interface EcosystemItem {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  logoPath?: string;
  logoNeedsDarkBackground?: boolean;
  websiteUrl?: string;
  developer?: string;
  goip?: boolean;
  featured?: boolean;
}
