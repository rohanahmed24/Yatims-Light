'use client'

import { useFadeInUp, useStaggerAnimation } from '@/hooks/useGsapAnimations'

export function FounderStory() {
  const badgeRef = useFadeInUp()
  const headingRef = useFadeInUp({ delay: 0.2 })
  const contentRef = useStaggerAnimation({ stagger: 0.2 })
  const sidebarRef = useStaggerAnimation({ stagger: 0.3, y: 40 })

  return (
    <section id="founder" className="section py-20">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <span ref={badgeRef as any} className="badge">
              Founder's Story
            </span>

            <h2
              ref={headingRef as any}
              className="text-3xl lg:text-4xl font-bold text-slate-50"
            >
              From an orphaned child in Bangladesh to a man racing against time.
            </h2>

            <div ref={contentRef as any} className="space-y-6">
              <div className="card-glassy p-6 rounded-lg">
                <p className="text-slate-300 leading-relaxed">
                  At 29, I live with <span className="text-primary-300 font-semibold">F4 liver cirrhosis</span> – 
                  the final stage before failure. Doctors can't say when my time will end, but I know it's limited.
                </p>
              </div>

              <div className="card-glassy p-6 rounded-lg">
                <p className="text-slate-300 leading-relaxed mb-4">
                  I lost both my parents when I was young. I was fortunate – others stepped in to raise me. 
                  But I know many orphans aren't as lucky. They face hardship, loneliness, and neglect every single day.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  This website isn't about fundraising. It's about <span className="text-accent-400 font-semibold">reminding</span> people 
                  that orphans exist, that they matter, and that caring for them is a duty we all share.
                </p>
              </div>

              <div className="card-glassy p-6 rounded-lg border-l-4 border-primary-500 bg-primary-500/5">
                <blockquote className="text-slate-200 italic text-lg leading-relaxed">
                  "If this site plants even one seed of compassion, if even one person remembers to check on an orphan, 
                  to smile at them, to show them they're not forgotten – then I can meet Allah knowing I tried."
                </blockquote>
                <p className="text-sm text-slate-400 mt-4">
                  — [Rohan Ahmed]
                </p>
              </div>

              <div className="card-glassy p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-100 mb-3">
                  My only ask:
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Remember the orphans in Bangladesh and worldwide. Keep them in your du'a. 
                  If you can help, do. If you can't, at least don't forget they're there.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div ref={sidebarRef as any} className="space-y-6">
            {/* Quranic Quote Card */}
            <div className="card-glassy p-6 rounded-lg border border-primary-500/30">
              <div className="aspect-video bg-navy-800 rounded-lg mb-4 flex items-center justify-center border border-navy-700">
                <span className="text-4xl">📖</span>
              </div>
              <p className="arabic-text text-lg text-primary-300 mb-3">
                لَيْسَ الْبِرَّ أَنْ تُوَلُّوا وُجُوهَكُمْ...
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                "Righteousness is not that you turn your faces toward the east or the west, 
                but righteousness is in one who believes in Allah... and gives wealth, 
                in spite of love for it, to relatives, orphans..."
              </p>
              <p className="text-xs text-slate-500 mt-2">— Qur'an 2:177</p>
            </div>

            {/* Info Cards */}
            <div className="card-glassy p-6 rounded-lg space-y-4">
              <div className="bg-navy-800/50 p-4 rounded-lg border border-accent-500/30">
                <h4 className="text-sm font-bold text-accent-400 mb-2">
                  No Fundraising
                </h4>
                <p className="text-xs text-slate-400">
                  This is purely awareness. No money collected. Just reminders and du'a.
                </p>
              </div>

              <div className="bg-navy-800/50 p-4 rounded-lg border border-primary-500/30">
                <h4 className="text-sm font-bold text-primary-400 mb-2">
                  Sadaqah of Words
                </h4>
                <p className="text-xs text-slate-400">
                  Every share, every reminder you give someone, is an act of continuous charity.
                </p>
              </div>
            </div>

            {/* Reference Card */}
            <div className="card-glassy p-4 rounded-lg border border-sky-500/30">
              <p className="text-xs text-slate-400 leading-relaxed">
                <span className="text-sky-400 font-semibold">Qur'an 4:36:</span> "Worship Allah 
                and associate nothing with Him, and to parents do good, and to relatives, orphans, 
                the needy..."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
