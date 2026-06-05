import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useAuthStore } from '@/store/useAuthStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'

// ─── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const dur = 1200, start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return <div ref={ref} className="font-heading text-5xl font-extrabold" style={{ color: 'var(--text)' }}>{val}{suffix}</div>
}

// ─── Typewriter ────────────────────────────────────────────────────────────────
function Typewriter({ wordsRu, wordsEn, lang }: { wordsRu: string[]; wordsEn: string[]; lang: string }) {
  const words = lang === 'ru' ? wordsRu : wordsEn
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(words[0].length)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState(words[0])

  useEffect(() => {
    const word = words[wi % words.length]
    const pause = !deleting && ci === word.length ? 1400 : 0
    const speed = deleting ? 55 : 90
    const t = setTimeout(() => {
      if (!deleting) {
        if (ci < word.length) { const nc = ci + 1; setCi(nc); setText(word.slice(0, nc)) }
        else setDeleting(true)
      } else {
        if (ci > 0) { const nc = ci - 1; setCi(nc); setText(word.slice(0, nc)) }
        else { setDeleting(false); setWi(w => w + 1) }
      }
    }, pause || speed)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ci, deleting, wi])

  return (
    <>
      {text}
      <span className="cursor-blink inline-block w-[3px] h-[0.8em] ml-[3px] align-middle rounded-sm" style={{ background: '#6B8BFF' }} />
    </>
  )
}

// ─── Bento card ────────────────────────────────────────────────────────────────
function BentoCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%')
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%')
  }, [])
  return (
    <div ref={ref} onMouseMove={onMouseMove} className={`card-spotlight relative rounded-[22px] p-7 overflow-hidden h-full transition-all duration-300 ${className}`}
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(107,139,255,0.25)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.transform = ''; el.style.boxShadow = '' }}
    >
      {children}
    </div>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Landing() {
  const { t } = useTranslation()
  const { language } = useLanguageStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const lang = language as 'ru' | 'en'

  // Mockup 3D tilt
  const mockupRef = useRef<HTMLDivElement>(null)
  const onHeroMouseMove = useCallback((e: React.MouseEvent) => {
    const el = mockupRef.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / r.width
    const y = (e.clientY - r.top - r.height / 2) / r.height
    el.style.transform = `perspective(800px) rotateX(${(-y * 8).toFixed(1)}deg) rotateY(${(x * 8).toFixed(1)}deg)`
  }, [])

  // Drag scroll
  const scrollRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })

  // Progress bars in view
  const barsRef = useRef<HTMLDivElement>(null)
  const barsInView = useInView(barsRef, { once: true })

  const marqueeItems = [
    'HTML', 'CSS Flexbox', 'JavaScript', 'DOM API', 'CSS Grid', 'Async/Await',
    'Git & GitHub', lang === 'ru' ? 'Адаптивный дизайн' : 'Responsive Design',
    lang === 'ru' ? 'CSS анимации' : 'CSS Animations', 'LocalStorage',
    lang === 'ru' ? 'Функции' : 'Functions', lang === 'ru' ? 'Массивы' : 'Arrays',
  ]

  return (
    <div className="relative z-[1]">

      {/* Marquee */}
      <div className="overflow-hidden py-2.5" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(6,8,16,0.5)', backdropFilter: 'blur(10px)' }}>
        <div className="flex gap-10 w-max marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-2 font-mono text-[11px] whitespace-nowrap tracking-[0.5px]" style={{ color: 'var(--muted)' }}>
              <span className="text-base" style={{ color: 'var(--cyan)' }}>·</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div
        onMouseMove={onHeroMouseMove}
        onMouseLeave={() => { if (mockupRef.current) mockupRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0)' }}
        className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16"
      >
        {/* Left */}
        <motion.div className="flex-1 min-w-0" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 text-xs font-medium" style={{ background: 'rgba(56,189,248,0.07)', border: '1px solid rgba(56,189,248,0.18)', color: 'var(--cyan)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }} />
            {lang === 'ru' ? '41 урок · 100+ упражнений · бесплатно' : '41 lessons · 100+ exercises · free'}
          </motion.div>

          <motion.h1 className="font-heading font-extrabold leading-[0.93] mb-6" style={{ fontSize: 'clamp(52px,7vw,88px)', letterSpacing: '-3px' }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {lang === 'ru' ? 'Учись' : 'Learn to'}<br />
            <span className="block" style={{ background: 'linear-gradient(100deg,#6B8BFF 0%,#A78BFA 45%,#38BDF8 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              <Typewriter wordsRu={['кодить', 'создавать', 'строить', 'разрабатывать']} wordsEn={['code', 'create', 'build', 'develop']} lang={lang} />
            </span>
          </motion.h1>

          <motion.p className="text-[17px] leading-relaxed mb-9 font-light max-w-md" style={{ color: 'var(--muted)' }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            {lang === 'ru' ? 'Интерактивные уроки по HTML, CSS и JavaScript. Пиши настоящий код — прямо в браузере, без установок.' : 'Interactive lessons on HTML, CSS and JavaScript. Write real code — right in the browser, no setup needed.'}
          </motion.p>

          <motion.div className="flex gap-3 flex-wrap" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <button onClick={() => navigate('/lessons')} className="btn-sheen px-8 py-3.5 rounded-xl text-white font-semibold text-[15px] transition-all"
              style={{ background: 'var(--blue)', boxShadow: '0 4px 20px rgba(67,97,238,0.35)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 28px rgba(67,97,238,0.5)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '0 4px 20px rgba(67,97,238,0.35)' }}
            >
              {lang === 'ru' ? 'Начать бесплатно' : 'Start for free'}
            </button>
            <Link to="/lessons" className="px-7 py-3.5 rounded-xl font-medium text-[15px] transition-all"
              style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', backdropFilter: 'blur(8px)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--surface)'; el.style.borderColor = 'rgba(255,255,255,0.14)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'var(--border)' }}
            >
              {lang === 'ru' ? 'Все темы →' : 'All topics →'}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: glassmorphism mockup */}
        <motion.div className="hidden lg:block flex-shrink-0 w-[420px]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div ref={mockupRef} className="rounded-[20px] overflow-hidden" style={{ background: 'rgba(12,14,28,0.85)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(67,97,238,0.15),inset 0 1px 0 rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', transition: 'transform 0.1s ease', transformStyle: 'preserve-3d' }}>
            <div className="flex items-center gap-2 px-4 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
              <span className="ml-2 font-mono text-[11px] px-2.5 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--muted)' }}>index.js</span>
            </div>
            <div className="flex">
              <div className="w-36 p-4 font-mono text-[11px]" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                {[{ ico: '📁', n: 'project', indent: false, active: false }, { ico: '⚡', n: 'index.js', indent: true, active: true }, { ico: '🎨', n: 'style.css', indent: true, active: false }, { ico: '🌐', n: 'index.html', indent: true, active: false }].map(f => (
                  <div key={f.n} className="px-2 py-1.5 rounded-md mb-0.5" style={{ paddingLeft: f.indent ? '16px' : '8px', color: f.active ? 'var(--cyan)' : 'var(--muted)', background: f.active ? 'rgba(67,97,238,0.15)' : '' }}>
                    {f.ico} {f.n}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-4 font-mono text-[12px] leading-[1.8]">
                <div><span style={{ color: '#818CF8' }}>const</span> btn = <span style={{ color: '#38BDF8' }}>document</span></div>
                <div>&nbsp;&nbsp;.<span style={{ color: '#38BDF8' }}>querySelector</span>(<span style={{ color: '#86EFAC' }}>'#btn'</span>)</div>
                <div style={{ marginTop: '6px' }}><span style={{ color: '#818CF8' }}>let</span> count = <span style={{ color: '#86EFAC' }}>0</span></div>
                <div style={{ marginTop: '6px' }}>btn.<span style={{ color: '#38BDF8' }}>addEventListener</span>(</div>
                <div>&nbsp;&nbsp;<span style={{ color: '#86EFAC' }}>'click'</span>, <span style={{ color: '#94A3B8' }}>{'() =>'}</span> {'{'}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;count<span style={{ color: '#94A3B8' }}>++</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;btn.textContent = <span style={{ color: '#86EFAC' }}>`Кликов: ${'{'}count{'}'}`</span></div>
                <div>&nbsp;&nbsp;{'}'})</div>
              </div>
            </div>
            <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
              <div className="font-mono text-[10px] mb-2" style={{ color: 'var(--muted)' }}>▶ PREVIEW</div>
              <div className="bg-white rounded-lg px-4 py-3">
                <button className="text-white text-[13px] px-4 py-2 rounded-lg font-medium" style={{ background: '#4361EE' }}
                  onClick={e => { const n = parseInt((e.currentTarget.textContent || '').replace(/\D/g,'') || '0') + 1; e.currentTarget.textContent = `Кликов: ${n}` }}>
                  Кликов: 0
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <motion.div className="flex overflow-hidden rounded-[20px]" style={{ border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {[{ target: 41, suffix: '', labelRu: 'уроков', labelEn: 'lessons' }, { target: 100, suffix: '+', labelRu: 'упражнений', labelEn: 'exercises' }, { target: 0, suffix: '₀', labelRu: 'навсегда', labelEn: 'forever free' }].map((s, i) => (
            <div key={i} className="flex-1 text-center py-7 transition-colors" style={{ borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
            >
              <Counter target={s.target} suffix={s.suffix} />
              <div className="font-mono text-[11px] mt-1.5 tracking-[0.5px]" style={{ color: 'var(--muted)' }}>{lang === 'ru' ? s.labelRu : s.labelEn}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bento features */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-mono text-[11px] mb-3 tracking-[3px] uppercase" style={{ color: 'var(--cyan)' }}>// возможности</div>
          <h2 className="font-heading font-extrabold mb-3" style={{ fontSize: 'clamp(28px,4vw,46px)', letterSpacing: '-1.5px' }}>
            {lang === 'ru' ? 'Всё что нужно для старта' : 'Everything to get started'}
          </h2>
          <p className="text-[15px] font-light max-w-sm" style={{ color: 'var(--muted)' }}>
            {lang === 'ru' ? 'Никаких установок. Просто открываешь и кодишь.' : 'No setup needed. Just open and code.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          <motion.div className="md:col-span-7" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <BentoCard>
              <div className="w-11 h-11 rounded-[13px] flex items-center justify-center text-xl mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(67,97,238,0.1)', border: '1px solid rgba(67,97,238,0.18)' }}>💻</div>
              <h3 className="font-heading font-bold text-[17px] mb-2">{lang === 'ru' ? 'Живой редактор кода' : 'Live code editor'}</h3>
              <p className="text-[13px] leading-relaxed font-light" style={{ color: 'var(--muted)' }}>
                {lang === 'ru' ? 'Пиши HTML, CSS и JS прямо в браузере. Видишь результат мгновенно — как в VSCode, только без установки.' : 'Write HTML, CSS and JS right in the browser. See results instantly — like VSCode, no installation needed.'}
              </p>
            </BentoCard>
          </motion.div>

          <motion.div className="md:col-span-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <BentoCard>
              <div className="w-11 h-11 rounded-[13px] flex items-center justify-center text-xl mb-5" style={{ background: 'rgba(67,97,238,0.1)', border: '1px solid rgba(67,97,238,0.18)' }}>📊</div>
              <h3 className="font-heading font-bold text-[17px] mb-2">{lang === 'ru' ? 'Прогресс' : 'Progress'}</h3>
              <p className="text-[13px] font-light mb-5" style={{ color: 'var(--muted)' }}>{lang === 'ru' ? 'Радар навыков и серия дней.' : 'Skills radar and day streak.'}</p>
              <div ref={barsRef} className="space-y-3.5">
                {[{ label: 'HTML', pct: 87, color: 'linear-gradient(90deg,#4361EE,#38BDF8)' }, { label: 'CSS', pct: 64, color: 'linear-gradient(90deg,#7B2FBE,#A78BFA)' }, { label: 'JavaScript', pct: 41, color: 'linear-gradient(90deg,#3B82F6,#7DD3FC)' }].map(b => (
                  <div key={b.label}>
                    <div className="flex justify-between text-[11.5px] mb-1.5" style={{ color: 'var(--muted)' }}>
                      <span>{b.label}</span><span style={{ color: 'var(--cyan)' }}>{b.pct}%</span>
                    </div>
                    <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color, transform: barsInView ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 1s cubic-bezier(0.23,1,0.32,1)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          {[{ emoji: '✅', titleRu: 'Тесты', titleEn: 'Quizzes', textRu: 'Задания после каждого урока.', textEn: 'Tasks after every lesson.' }, { emoji: '🔥', titleRu: 'Стрик', titleEn: 'Streak', textRu: 'Каждый день +1 к серии.', textEn: '+1 to streak every day.' }, { emoji: '🆓', titleRu: 'Бесплатно', titleEn: 'Free', textRu: 'Без карты и рекламы. Навсегда.', textEn: 'No card, no ads. Forever.' }].map((c, i) => (
            <motion.div key={c.emoji} className="md:col-span-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
              <BentoCard>
                <div className="w-11 h-11 rounded-[13px] flex items-center justify-center text-xl mb-5" style={{ background: 'rgba(67,97,238,0.1)', border: '1px solid rgba(67,97,238,0.18)' }}>{c.emoji}</div>
                <h3 className="font-heading font-bold text-[17px] mb-2">{lang === 'ru' ? c.titleRu : c.titleEn}</h3>
                <p className="text-[13px] font-light" style={{ color: 'var(--muted)' }}>{lang === 'ru' ? c.textRu : c.textEn}</p>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lessons horizontal scroll */}
      <div className="pb-24">
        <motion.div className="max-w-6xl mx-auto px-6 mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-mono text-[11px] mb-3 tracking-[3px] uppercase" style={{ color: 'var(--cyan)' }}>// программа</div>
          <h2 className="font-heading font-extrabold mb-1" style={{ fontSize: 'clamp(28px,4vw,46px)', letterSpacing: '-1.5px' }}>
            {lang === 'ru' ? '41 урок — от нуля до сайта' : '41 lessons — from zero to website'}
          </h2>
          <p className="text-[15px] font-light" style={{ color: 'var(--muted)' }}>{lang === 'ru' ? 'Листай вправо →' : 'Scroll right →'}</p>
        </motion.div>

        <div
          ref={scrollRef}
          className="drag-scroll px-6 pb-6"
          onMouseDown={e => { const el = scrollRef.current; if (!el) return; drag.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft } }}
          onMouseMove={e => { if (!drag.current.active || !scrollRef.current) return; e.preventDefault(); scrollRef.current.scrollLeft = drag.current.scrollLeft - (e.pageX - scrollRef.current.offsetLeft - drag.current.startX) * 1.2 }}
          onMouseLeave={() => { drag.current.active = false }}
          onMouseUp={() => { drag.current.active = false }}
        >
          <div className="flex gap-3 w-max pb-2">
            {LESSON_SLUGS.map((slug, i) => {
              const meta = LESSON_META[slug]
              return (
                <motion.div key={slug}
                  className="relative flex-shrink-0 w-[220px] rounded-[18px] p-5 cursor-pointer overflow-hidden"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', transformStyle: 'preserve-3d' }}
                  whileHover={{ y: -6, borderColor: 'rgba(107,139,255,0.3)', boxShadow: '0 16px 40px rgba(0,0,0,0.4)' } as Record<string, unknown>}
                  onClick={() => navigate(`/lessons/${slug}`)}
                >
                  <div className="font-mono text-[10px] mb-2.5" style={{ color: 'rgba(107,139,255,0.7)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <div className="text-[26px] mb-3">{meta.icon}</div>
                  <div className="text-[13px] font-semibold mb-1 leading-snug">{lang === 'ru' ? meta.title : meta.title_en}</div>
                  <div className="font-mono text-[10.5px]" style={{ color: 'var(--muted)' }}>{meta.category}</div>
                  <div className="absolute right-4 bottom-4 text-base transition-all" style={{ color: 'var(--muted)' }}>→</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div className="relative rounded-[28px] overflow-hidden text-center py-20 px-8"
          style={{ background: 'linear-gradient(160deg,rgba(17,20,48,0.95),rgba(10,8,30,0.95))', border: '1px solid rgba(107,139,255,0.15)' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div className="absolute pointer-events-none" style={{ top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '480px', height: '280px', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(67,97,238,0.17),transparent 70%)' }} />
          <h2 className="font-heading font-extrabold relative z-10 mb-3" style={{ fontSize: 'clamp(26px,4vw,46px)', letterSpacing: '-1.5px' }}>
            {lang === 'ru' ? 'Готов начать кодить?' : 'Ready to start coding?'}
          </h2>
          <p className="text-[16px] font-light mb-9 relative z-10" style={{ color: 'var(--muted)' }}>
            {lang === 'ru' ? 'Первый урок займёт 10 минут.' : 'The first lesson takes 10 minutes.'}
          </p>
          <Link to="/lessons" className="btn-sheen inline-block px-10 py-4 rounded-xl text-white font-semibold text-[16px] relative z-10 transition-all"
            style={{ background: 'var(--blue)', boxShadow: '0 4px 20px rgba(67,97,238,0.35)' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 28px rgba(67,97,238,0.5)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '0 4px 20px rgba(67,97,238,0.35)' }}
          >
            {lang === 'ru' ? 'Начать бесплатно →' : 'Start for free →'}
          </Link>
        </motion.div>
      </div>

    </div>
  )
}
