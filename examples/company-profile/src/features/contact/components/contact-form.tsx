import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shared/ui/atoms/button'
import { toast } from 'sonner'
import { contactFormSchema, type ContactFormData } from '../schemas'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  function onSubmit(data: ContactFormData) {
    console.log(data)
    toast.success('Message sent — we\'ll be in touch within 24 hours.')
    reset()
  }

  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <span className="inline-block rounded-full border border-[rgba(99,102,241,0.15)] bg-white/60 backdrop-blur-sm px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                Contact
              </span>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl leading-[1.05]">
                Let&apos;s talk
              </h2>
              <p className="text-base leading-relaxed text-text-secondary max-w-sm">
                Have a project in mind? We&apos;d love to hear about it.
              </p>
            </div>

            <div className="space-y-5">
              {[
                { label: 'Email', value: 'hello@postlight.dev' },
                { label: 'Phone', value: '+1 (415) 628-3914' },
                { label: 'Office', value: '548 Market St, San Francisco, CA 94104' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="text-xs font-medium text-text-secondary w-16 shrink-0">{item.label}</div>
                  <div className="text-sm text-text-primary">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-medium text-text-secondary">Name</label>
                <input
                  id="name"
                  {...register('name')}
                  className="w-full rounded-xl border border-[rgba(99,102,241,0.15)] bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-[11px] text-red-400/80">{errors.name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-text-secondary">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full rounded-xl border border-[rgba(99,102,241,0.15)] bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-[11px] text-red-400/80">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="company" className="text-xs font-medium text-text-secondary">Company</label>
                <input
                  id="company"
                  {...register('company')}
                  className="w-full rounded-xl border border-[rgba(99,102,241,0.15)] bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="interest" className="text-xs font-medium text-text-secondary">Interest</label>
                <select
                  id="interest"
                  {...register('interest')}
                  className="w-full rounded-xl border border-[rgba(99,102,241,0.15)] bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                >
                  <option value="general-inquiry">General inquiry</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="demo-request">Demo request</option>
                  <option value="careers">Careers</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-medium text-text-secondary">Message</label>
              <textarea
                id="message"
                rows={4}
                {...register('message')}
                className="w-full rounded-xl border border-[rgba(99,102,241,0.15)] bg-white/60 backdrop-blur-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
              {errors.message && <p className="text-[11px] text-red-400/80">{errors.message.message}</p>}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="agreeToContact"
                type="checkbox"
                {...register('agreeToContact')}
                className="mt-0.5 size-4 rounded border-[rgba(99,102,241,0.15)] bg-white/60 text-accent focus:ring-accent"
              />
              <label htmlFor="agreeToContact" className="text-xs text-text-secondary">
                I agree to be contacted regarding my inquiry
              </label>
            </div>
            {errors.agreeToContact && <p className="text-[11px] text-red-400/80">{errors.agreeToContact.message}</p>}

            <Button type="submit" variant="primary" disabled={isSubmitting} showArrow>
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
