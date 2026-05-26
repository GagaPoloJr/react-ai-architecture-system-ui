export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  tags: string[];
  publishedAt: string;
  readingTime: number;
}
