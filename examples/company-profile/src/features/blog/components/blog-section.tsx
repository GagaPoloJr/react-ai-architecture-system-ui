import { SectionHeader } from '@shared/ui/molecules/section-header'
import { Button, ArrowIcon } from '@shared/ui/atoms/button'
import { formatDate } from '@shared/lib/date/format-date'
import type { BlogPost } from '../types'

interface BlogSectionProps {
  badge?: string;
  title: string;
  description?: string;
  posts: BlogPost[];
}

export function BlogSection({ badge, title, description, posts }: BlogSectionProps) {
  const [featured, ...rest] = posts

  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader badge={badge} title={title} description={description} />

        <div className="mt-20 grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <div className="rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/30 md:row-span-2 overflow-hidden">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="/images/blog-team-handshake.jpg"
                alt={featured.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 lg:p-10 space-y-4">
              <div className="flex gap-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[rgba(99,102,241,0.15)] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-accent/70">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-xl font-semibold text-text-primary tracking-tight group-hover:text-accent transition-colors">
                {featured.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-text-secondary/50">
                <span>{formatDate(featured.publishedAt)}</span>
                <span>{featured.readingTime} min read</span>
              </div>
            </div>
          </div>

          {rest.map((post) => (
            <div
              key={post.id}
              className="rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl p-8 lg:p-10 space-y-4 shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/30"
            >
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[rgba(99,102,241,0.15)] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-accent/70">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-base font-semibold text-text-primary tracking-tight group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-text-secondary/50">
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="secondary" asChild>
            <a href="/blog">
              View all articles
              <ArrowIcon />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
