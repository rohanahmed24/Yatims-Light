'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Heart } from 'lucide-react'
import { toast } from 'sonner'
import { useFadeInUp, useStaggerAnimation } from '@/hooks/useGsapAnimations'

// Form schemas
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  location: z.string().min(2, 'Please enter your location'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

const shareSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  story: z.string().min(20, 'Please share at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>
type ShareFormData = z.infer<typeof shareSchema>

export function Contact() {
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [isSubmittingShare, setIsSubmittingShare] = useState(false)

  const badgeRef = useFadeInUp()
  const headingRef = useFadeInUp({ delay: 0.2 })
  const formsRef = useStaggerAnimation({ stagger: 0.3 })

  // Contact form
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { errors: errorsContact },
    reset: resetContact,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  // Share form
  const {
    register: registerShare,
    handleSubmit: handleSubmitShare,
    formState: { errors: errorsShare },
    reset: resetShare,
  } = useForm<ShareFormData>({
    resolver: zodResolver(shareSchema),
  })

  const onSubmitContact = async (data: ContactFormData) => {
    setIsSubmittingContact(true)
    try {
      // TODO: Send to backend API
      console.log('Contact form data:', data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success('Message sent! We\'ll get back to you soon.')
      resetContact()
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmittingContact(false)
    }
  }

  const onSubmitShare = async (data: ShareFormData) => {
    setIsSubmittingShare(true)
    try {
      // TODO: Send to backend API
      console.log('Share form data:', data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success('Thank you for sharing! Your story inspires others.')
      resetShare()
    } catch (error) {
      toast.error('Failed to submit story. Please try again.')
    } finally {
      setIsSubmittingShare(false)
    }
  }

  return (
    <section id="contact" className="section py-20 bg-navy-900/50">
      <div className="container">
        <div className="text-center mb-12">
          <span ref={badgeRef as any} className="badge mb-4">
            Connect With Us
          </span>
          <h2
            ref={headingRef as any}
            className="text-3xl lg:text-4xl font-bold text-slate-50"
          >
            Reach out, share, inspire.
          </h2>
        </div>

        <div ref={formsRef as any} className="grid lg:grid-cols-2 gap-8">
          {/* Reach Out Form */}
          <div className="card-glassy p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                <Send className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Reach Out</h3>
                <p className="text-sm text-slate-400">Have questions or want to help?</p>
              </div>
            </div>

            <form onSubmit={handleSubmitContact(onSubmitContact)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-input"
                  {...registerContact('name')}
                />
                {errorsContact.name && (
                  <p className="text-red-400 text-xs mt-1">{errorsContact.name.message}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-input"
                  {...registerContact('email')}
                />
                {errorsContact.email && (
                  <p className="text-red-400 text-xs mt-1">{errorsContact.email.message}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Country/City"
                  className="form-input"
                  {...registerContact('location')}
                />
                {errorsContact.location && (
                  <p className="text-red-400 text-xs mt-1">{errorsContact.location.message}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="form-input"
                  {...registerContact('subject')}
                />
                {errorsContact.subject && (
                  <p className="text-red-400 text-xs mt-1">{errorsContact.subject.message}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="form-textarea"
                  {...registerContact('message')}
                />
                {errorsContact.message && (
                  <p className="text-red-400 text-xs mt-1">{errorsContact.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmittingContact}
                className="w-full btn btn-solid"
              >
                {isSubmittingContact ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Share & Inspire Form */}
          <div className="card-glassy p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Share & Inspire</h3>
                <p className="text-sm text-slate-400">
                  Know a story that moves hearts?
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitShare(onSubmitShare)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  className="form-input"
                  {...registerShare('name')}
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email (Optional)"
                  className="form-input"
                  {...registerShare('email')}
                />
                {errorsShare.email && (
                  <p className="text-red-400 text-xs mt-1">{errorsShare.email.message}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Share an orphan's story, a reminder, or something that inspired you..."
                  rows={8}
                  className="form-textarea"
                  {...registerShare('story')}
                />
                {errorsShare.story && (
                  <p className="text-red-400 text-xs mt-1">{errorsShare.story.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmittingShare}
                className="w-full btn bg-accent-500/10 border border-accent-500/70 text-accent-100 hover:bg-accent-500/20 hover:border-accent-500/90"
              >
                {isSubmittingShare ? 'Submitting...' : 'Share to Inspire'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
