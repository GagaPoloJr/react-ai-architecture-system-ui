import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Send } from 'lucide-react'
import { Button } from '@shared/ui'
import { contactFormSchema, type ContactFormValues } from '../schemas'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      serviceInterest: 'full-planning',
    },
  })

  function onSubmit(data: ContactFormValues) {
    console.log('Form submitted:', data)
    toast.success('Thank you! We will be in touch within 24 hours.')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-espresso">
            Full Name <span className="text-dusty-rose">*</span>
          </label>
          <input
            id="name"
            {...register('name')}
            placeholder="Your name"
            className="w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
          />
          {errors.name && <p className="text-xs text-dusty-rose mt-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-espresso">
            Email <span className="text-dusty-rose">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your@email.com"
            className="w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
          />
          {errors.email && <p className="text-xs text-dusty-rose mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-espresso">
            Phone Number
          </label>
          <input
            id="phone"
            {...register('phone')}
            placeholder="+1 (312) 555-0123"
            className="w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="eventDate" className="block text-sm font-medium text-espresso">
            Event Date
          </label>
          <input
            id="eventDate"
            type="date"
            {...register('eventDate')}
            className="w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="serviceInterest" className="block text-sm font-medium text-espresso">
            Service Interested In <span className="text-dusty-rose">*</span>
          </label>
          <select
            id="serviceInterest"
            {...register('serviceInterest')}
            className="w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
          >
            <option value="full-planning">Full Planning</option>
            <option value="partial-planning">Partial Planning</option>
            <option value="day-of-coordination">Day-of Coordination</option>
            <option value="design-styling">Design & Styling</option>
            <option value="vendor-management">Vendor Management</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="budgetRange" className="block text-sm font-medium text-espresso">
            Budget Range
          </label>
          <select
            id="budgetRange"
            {...register('budgetRange')}
            className="w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
          >
            <option value="">Select a range</option>
            <option value="under-10k">Under $10,000</option>
            <option value="10k-20k">$10,000 - $20,000</option>
            <option value="20k-50k">$20,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="100k-plus">$100,000+</option>
            <option value="not-sure">Not Sure Yet</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="venue" className="block text-sm font-medium text-espresso">
          Venue (if decided)
        </label>
        <input
          id="venue"
          {...register('venue')}
          placeholder="Venue name or location"
          className="w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-espresso">
          Your Vision <span className="text-dusty-rose">*</span>
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          placeholder="Tell us about your wedding vision, style, and anything we should know..."
          className="w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all resize-none"
        />
        {errors.message && <p className="text-xs text-dusty-rose mt-1">{errors.message.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="howHeard" className="block text-sm font-medium text-espresso">
          How Did You Hear About Us?
        </label>
        <select
          id="howHeard"
          {...register('howHeard')}
          className="w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
        >
          <option value="">Select one</option>
          <option value="instagram">Instagram</option>
          <option value="google">Google Search</option>
          <option value="friend">Friend or Family</option>
          <option value="venue">Venue Referral</option>
          <option value="wedding-fair">Wedding Fair</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="agreeToContact"
          type="checkbox"
          {...register('agreeToContact')}
          className="mt-1 h-4 w-4 rounded border-espresso/20 text-sage focus:ring-sage/30"
        />
        <label htmlFor="agreeToContact" className="text-sm text-espresso/60">
          I agree to be contacted regarding my wedding inquiry. <span className="text-dusty-rose">*</span>
        </label>
      </div>
      {errors.agreeToContact && <p className="text-xs text-dusty-rose">{errors.agreeToContact.message}</p>}

      <Button type="submit" disabled={isSubmitting} size="lg" className="group">
        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        <span className="ml-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
          <Send className="w-4 h-4" />
        </span>
      </Button>
    </form>
  )
}
