import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@shared/ui/atoms/button'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { formatDate } from '@shared/lib/date/format-date'

const posts = {
  'future-of-team-collaboration': {
    title: 'The Future of Team Collaboration in 2024',
    content: `
      <p>The way teams collaborate has evolved dramatically over the past few years. Remote work, AI assistants, and async-first communication are reshaping how we think about teamwork.</p>
      <h2>The Rise of AI-Assisted Workflows</h2>
      <p>Artificial intelligence is no longer a futuristic concept—it's here, and it's transforming how teams work. From automated code reviews to intelligent scheduling assistants, AI is making teams more efficient than ever.</p>
      <h2>Async-First Communication</h2>
      <p>The traditional 9-to-5 synchronous workday is giving way to async-first communication. Teams are adopting tools that allow them to collaborate across time zones without sacrificing productivity.</p>
      <h2>Real-Time Collaboration</h2>
      <p>Despite the async trend, real-time collaboration remains crucial. The key is knowing when to use sync vs async communication. The best teams use a hybrid approach.</p>
    `,
    author: { name: 'Alex Chen', avatarUrl: '' },
    tags: ['Product', 'Trends'],
    publishedAt: '2024-03-15',
    readingTime: 5,
  },
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? posts[slug as keyof typeof posts] : null

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Article not found</h1>
        <Button variant="primary" className="mt-6" asChild>
          <Link to="/blog">Back to blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Postlight Blog</title>
        <meta name="description" content={post.title} />
      </Helmet>

      <article className="pt-28 pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/blog" className="gap-2">
                <ArrowLeft className="size-4" />
                Back to blog
              </Link>
            </Button>
          </div>

          <header className="space-y-6 mb-12">
            <h1 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1">
                <Calendar className="size-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {post.readingTime} min read
              </span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[rgba(99,102,241,0.15)] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-accent/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div
            className="max-w-none space-y-4 text-text-secondary leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-text-primary [&_h2]:mt-8 [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  )
}
