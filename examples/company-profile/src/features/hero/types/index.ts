export interface HeroContent {
  badge: string;
  title: string;
  highlightedPhrase: string;
  description: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  demoVideoUrl?: string;
  productPreviewImage: string;
  trustIndicator: {
    text: string;
    logos: Array<{ name: string; src: string }>;
  };
}
