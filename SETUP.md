# Setup Guide - Yatim's Light Next.js Project

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js 18.17.0 or higher installed
- [ ] A code editor (VS Code recommended)
- [ ] Git installed (optional, for version control)
- [ ] Terminal/Command Prompt access

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
# Navigate to project folder
cd yatims-light-nextjs

# Install dependencies (choose one)
npm install
# or
yarn install
# or
pnpm install
```

This will install all required packages including:
- Next.js 15
- React 19
- GSAP
- Lenis
- Tailwind CSS
- And more...

### Step 2: Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: See It Live! 🎉

You should now see the website running with all animations working.

## 🎨 Customization Guide

### 1. Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#10B981',  // Change this to your color
    // ... other shades
  },
}
```

### 2. Update Content

#### Hero Section
File: `src/components/HeroSection.tsx`
- Change main heading text
- Update Quranic quotes
- Modify info card content

#### Founder's Story
File: `src/components/FounderStorySection.tsx`
- Replace placeholder text with actual founder info
- Update personal narrative
- Change sidebar quotes

#### Stories
File: `src/components/StoriesSection.tsx`
- Replace story data in the `stories` array
- Add actual photos (see Image Management below)

### 3. Add Real Images

Create folder: `public/images/`

Add images:
- `amina.jpg` (360x144px)
- `rahim.jpg` (360x144px)
- `yusuf.jpg` (360x144px)

Then update `src/components/StoriesSection.tsx`:

```tsx
<Image
  src="/images/amina.jpg"  // Change placeholder
  alt="Amina's story"
  width={360}
  height={144}
/>
```

## 🔧 Backend Integration

### Option 1: Resend (Email Service) ⭐ Recommended

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Create `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

4. Install Resend:

```bash
npm install resend
```

5. Update `src/app/actions.ts`:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(data: ContactFormData) {
  const validatedData = contactFormSchema.parse(data)
  
  await resend.emails.send({
    from: 'contact@yourdomain.com',
    to: 'your-email@gmail.com',
    subject: validatedData.subject,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${validatedData.fullName}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Location:</strong> ${validatedData.city}, ${validatedData.country}</p>
      <p><strong>Message:</strong></p>
      <p>${validatedData.message}</p>
    `
  })
  
  return { success: true, message: 'Email sent successfully!' }
}
```

### Option 2: Supabase (Database)

1. Create project at [supabase.com](https://supabase.com)
2. Create tables:

```sql
-- Contact submissions
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Stories
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  story TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. Install Supabase:

```bash
npm install @supabase/supabase-js
```

4. Create `.env.local`:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

5. Update actions:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function submitContactForm(data: ContactFormData) {
  const validatedData = contactFormSchema.parse(data)
  
  const { error } = await supabase
    .from('contacts')
    .insert(validatedData)
  
  if (error) throw error
  
  return { success: true, message: 'Saved successfully!' }
}
```

### Option 3: Zapier/Make.com (No Code)

1. Create a webhook in Zapier/Make.com
2. Get webhook URL
3. Create `.env.local`:

```env
CONTACT_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
```

4. Update actions:

```typescript
export async function submitContactForm(data: ContactFormData) {
  const validatedData = contactFormSchema.parse(data)
  
  await fetch(process.env.CONTACT_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validatedData)
  })
  
  return { success: true, message: 'Sent successfully!' }
}
```

## 🚀 Deployment

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"

Done! Your site is live.

### Deploy to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

### Environment Variables (Production)

In Vercel/Netlify dashboard:
1. Go to Settings → Environment Variables
2. Add your `.env.local` values
3. Redeploy

## 🎬 Animation Customization

### Adjust Timing

Edit `src/hooks/useGsapAnimations.ts`:

```typescript
// Slower fade-in
export function useFadeInUp() {
  gsap.from(ref.current, {
    y: 50,
    opacity: 0,
    duration: 1.5,  // Change from 0.8 to 1.5
    ease: 'power3.out',
  })
}
```

### Change Smooth Scroll Speed

Edit `src/hooks/useSmoothScroll.ts`:

```typescript
const lenis = new Lenis({
  duration: 1.5,  // Slower scroll (default: 1.2)
})
```

### Disable Animations (Performance)

Remove or comment out in `src/app/page.tsx`:

```typescript
export default function HomePage() {
  // useSmoothScroll()  // Disable smooth scroll
  
  return (
    // ...
  )
}
```

## 📱 Testing

### Test Responsiveness

1. Open DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

### Test Forms

1. Try submitting empty forms (should show errors)
2. Test with valid data
3. Check console for logs
4. Test email notifications (if integrated)

## 🐛 Troubleshooting

### Issue: "Module not found" error

**Solution**: Delete `node_modules` and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: GSAP animations not working

**Solution**: Check that you're using `'use client'` at the top of component files.

### Issue: Forms not submitting

**Solution**: 
1. Check browser console for errors
2. Verify server actions are working
3. Check network tab in DevTools

### Issue: Smooth scroll not working

**Solution**: Make sure you're on `http://localhost:3000`, not `file://`

## 📚 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### GSAP
- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Utility Classes](https://tailwindcss.com/docs/utility-first)

## 💡 Pro Tips

1. **Use Hot Reload**: Save files and see changes instantly
2. **TypeScript**: Let TypeScript catch errors before runtime
3. **Component Inspector**: Use React DevTools extension
4. **Performance**: Use Chrome Lighthouse to audit
5. **SEO**: Update metadata in `src/app/layout.tsx`

## ✅ Production Checklist

Before going live:
- [ ] Replace all placeholder images
- [ ] Update founder's actual name and details
- [ ] Connect backend (email/database)
- [ ] Test all forms
- [ ] Check responsive design on real devices
- [ ] Set up analytics (Google Analytics, Plausible)
- [ ] Add your domain to Vercel/Netlify
- [ ] Configure email service with verified domain
- [ ] Test email notifications
- [ ] Add loading states to forms
- [ ] Set up error monitoring (Sentry)
- [ ] Optimize images (use WebP format)
- [ ] Test on different browsers
- [ ] Set up automatic backups
- [ ] Create favicon and social media images

## 🆘 Getting Help

- Check `README.md` for detailed documentation
- Review component files for inline comments
- Search Next.js docs
- Check GSAP documentation
- Open an issue on GitHub

## 🎉 You're All Set!

Your cutting-edge Next.js website is ready to go. Enjoy building!

---

**Need help?** Check the README or component files for detailed documentation.
