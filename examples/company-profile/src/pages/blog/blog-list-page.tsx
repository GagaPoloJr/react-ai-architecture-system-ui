import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Calendar, Clock } from 'lucide-react'
import { formatDate } from '@shared/lib/date/format-date'
import type { BlogPost } from '@features/blog'

const posts: BlogPost[] = [
  { id: '1', slug: 'future-of-team-collaboration', title: 'The Future of Team Collaboration in 2024', excerpt: 'Explore the trends shaping how teams work together, from AI-assisted workflows to async-first communication.', content: '', coverImage: '/images/blog-team-handshake.jpg', author: { name: 'Alex Chen', avatarUrl: '' }, tags: ['Product', 'Trends'], publishedAt: '2024-03-15', readingTime: 5 },
  { id: '2', slug: 'remote-productivity-tips', title: '10 Remote Productivity Tips from Top Engineering Teams', excerpt: 'Learn from the best remote teams in the world about how they stay productive and connected.', content: '', coverImage: '/images/blog-collab.jpg', author: { name: 'Sarah Johnson', avatarUrl: '' }, tags: ['Remote Work', 'Productivity'], publishedAt: '2024-03-10', readingTime: 7 },
  { id: '3', slug: 'data-driven-decisions', title: 'Making Data-Driven Decisions: A Practical Guide', excerpt: 'How to build a data-driven culture in your organization without overwhelming your team.', content: '', coverImage: '/images/blog-analytics.jpg', author: { name: 'Marcus Williams', avatarUrl: '' }, tags: ['Analytics', 'Guide'], publishedAt: '2024-03-05', readingTime: 6 },
  { id: '4', slug: 'building-inclusive-teams', title: 'Building Inclusive Teams: Lessons from Industry Leaders', excerpt: 'Learn how top companies are building diverse and inclusive engineering organizations.', content: '', coverImage: '/images/blog-inclusive.jpg', author: { name: 'Emily Liu', avatarUrl: '' }, tags: ['Culture', 'Diversity'], publishedAt: '2024-02-28', readingTime: 8 },
  { id: '5', slug: 'api-first-development', title: 'Why API-First Development is the Future', excerpt: 'Discover the benefits of adopting an API-first approach to software development.', content: '', coverImage: '/images/blog-coding.jpg', author: { name: 'James Rodriguez', avatarUrl: '' }, tags: ['Engineering', 'API'], publishedAt: '2024-02-20', readingTime: 5 },
  { id: '6', slug: 'scaling-engineering-teams', title: 'Scaling Engineering Teams: A Practical Framework', excerpt: 'A comprehensive guide to scaling your engineering organization from 10 to 100+ people.', content: '', coverImage: '/images/blog-office.jpg', author: { name: 'Alex Chen', avatarUrl: '' }, tags: ['Engineering', 'Management'], publishedAt: '2024-02-15', readingTime: 10 },
]

export function BlogListPage() {
  return (
    <>
      <Helmet>
        <title>Blog — Postlight</title>
        <meta name="description" content="Insights, guides, and updates from our team." />
      </Helmet>

      <div className="pt-28 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 pt-16 pb-16">
            <span className="inline-block rounded-full border border-[rgba(99,102,241,0.15)] bg-white/60 backdrop-blur-sm px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
              Blog
            </span>
            <h1 className="text-4xl font-bold text-text-primary sm:text-5xl">
              Latest articles
            </h1>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              Insights, guides, and updates from our team.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_12px_40px_rgba(99,102,241,0.1)] hover:-translate-y-1"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[rgba(99,102,241,0.15)] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-accent/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-text-secondary line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
