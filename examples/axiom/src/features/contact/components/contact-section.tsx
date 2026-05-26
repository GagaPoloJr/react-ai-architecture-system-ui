import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useScrollReveal } from '@shared/hooks'
import { contactFormSchema, type ContactFormValues } from '../types'

const interests = [
  'Strategy consulting',
  'Design partnership',
  'Engineering services',
  'Career opportunities',
  'General inquiry',
]

export function ContactSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const formRef = useScrollReveal<HTMLDivElement>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  function onSubmit(data: ContactFormValues) {
    console.log(data)
  }

  return (
    <section className="py-28 md:py-36 lg:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef}>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-text-primary">
            Get in touch
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-xl leading-relaxed">
            Tell us about what you are working on. We will be in touch within two business days.
          </p>
        </div>
        <div ref={formRef} className="mt-16 max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm tracking-widest uppercase text-text-secondary mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full border-b border-border bg-transparent py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-text-primary transition-colors"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm tracking-widest uppercase text-text-secondary mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full border-b border-border bg-transparent py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-text-primary transition-colors"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm tracking-widest uppercase text-text-secondary mb-2">
                Interest
              </label>
              <select
                id="interest"
                {...register('interest')}
                className="w-full border-b border-border bg-transparent py-3 text-text-primary focus:outline-none focus:border-text-primary transition-colors"
              >
                <option value="">Select an option</option>
                {interests.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
              {errors.interest && (
                <p className="mt-1 text-sm text-red-500">{errors.interest.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm tracking-widest uppercase text-text-secondary mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message')}
                className="w-full border-b border-border bg-transparent py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-text-primary transition-colors resize-none"
                placeholder="Tell us about your project"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="inline-block text-sm tracking-widest uppercase text-text-primary border-b border-text-primary pb-0.5 hover:opacity-60 transition-opacity"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
