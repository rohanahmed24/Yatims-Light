import { z } from 'zod'

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  country: z
    .string()
    .min(2, 'Please enter your country')
    .max(100, 'Country name is too long'),
  city: z
    .string()
    .min(2, 'Please enter your city')
    .max(100, 'City name is too long'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Share story form validation schema
 */
export const shareStorySchema = z.object({
  name: z
    .string()
    .max(100, 'Name must be less than 100 characters')
    .optional(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  story: z
    .string()
    .min(50, 'Story must be at least 50 characters')
    .max(5000, 'Story must be less than 5000 characters'),
})

export type ShareStoryData = z.infer<typeof shareStorySchema>
