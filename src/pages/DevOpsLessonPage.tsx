import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Lock, Clock } from 'lucide-react'
import { DEVOPS_SLUGS, DEVOPS_META, getModuleOfLesson } from '@/devops'
import { useDevOpsStore } from '@/store/useDevOpsStore'
import { useDevOpsProgress } from '@/hooks/useDevOpsProgress'
import { Glass, StatusPill, CometCursor, useLang, pick } from '@/components/devops/ui'
import { CodeBlock } from '@/components/devops/CodeBlock'
import { LabCard } from '@/components/devops/LabCard'
import { DevOpsQuiz } from '@/components/devops/DevOpsQuiz'
import type { DevOpsLesson } from '@/types/devops'

const LESSON_FILES = import.meta.glob('/src/devops/lessons/*.ts')

export default function DevOpsLessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const lang = useLang()

  const [lesson, setLesson] = useState<DevOpsLesson | null>(null)
  const [missing, setMissing] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const sectionRefs = useRef<Record<string, HTMLElement>>({})
  const sessionStart = useRef(Date.now())

  const { markVisited, addTimeSpent } = useDevOpsProgress(slug)
  const status = useDevOpsStore((s) => (slug ? s.statusOf(slug) : 'queued'))
  const unlocked = useDevOpsStore((s) => (slug ? s.isUnlocked(slug) : true))
  const progress = useDevOpsStore((s) => (slug ? s.progress[slug] : undefined))

  const meta = slug ? DEVOPS_META[slug] : undefined
  const mod = slug ? getModuleOfLesson(slug) : undefined
  const index = slug ? DEVOPS_SLUGS.indexOf(slug) : -1
  const prevSlug = index > 0 ? DEVOPS_SLUGS[index - 1] : null
  const nextSlug = index >= 0 && index < DEVOPS_SLUGS.length - 1 ? DEVOPS_SLUGS[index + 1] : null

  // Load the lesson module
  useEffect(() => {
    if (!slug || !DEVOPS_META[slug]) { navigate('/devops'); return }
    window.scrollTo(0, 0)
    setLesson(null)
    setMissing(false)
    const loader = LESSON_FILES[`/src/devops/lessons/${slug}.ts`]
    if (!loader) { setMissing(true); return }
    loader().then((modImport) => {
      const record = modImport as Record<string, unknown>
      const key = Object.keys(record).find((k) => k !== 'default')
      const data = (key ? record[key] : record.default) as DevOpsLesson | undefined
      if (data) setLesson(data)
      else setMissing(true)
    })
  }, [slug, navigate])

  // Register the visit once the lesson (and therefore its lab/quiz counts) is known
  useEffect(() => {
    if (!slug || !lesson) return
    markVisited(slug, lesson.labs.length, lesson.quiz.length)
  }, [slug, lesson, markVisited])

  // Time tracking
  useEffect(() => {
    if (!slug) return
    sessionStart.current = Date.now()
    return () => {
      const seconds = Math.round((Date.now() - sessionStart.current) / 1000)
      if (seconds >= 5) addTimeSpent(slug, seconds)
    }
  }, [slug, addTimeSpent])

  // Section spy
  useEffect(() => {
    if (!lesson) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { setActiveSection(e.target.id); break }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [lesson])

  if (!slug || !meta) return null

  // ─── Locked ───────────────────────────────────────────────────────────────
  if (!unlocked) {
    const blocker = prevSlug ? DEVOPS_META[prevSlug] : null
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <Glass className="p-8 max-w-md text-center">
          <Lock size={28} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
          <h1 className="font-heading text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            {lang === 'ru' ? 'Урок заблокирован' : 'Lesson blocked'}
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            {lang === 'ru'
              ? `Как в CI: следующая джоба стартует только после зелёной предыдущей. Закрой «${blocker ? blocker.title_ru : ''}».`
              : `Just like CI: the next job starts only after the previous one goes green. Clear "${blocker ? blocker.title_en : ''}" first.`}
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            {prevSlug && (
              <Link
                to={`/devops/${prevSlug}`}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'linear-gradient(90deg,#4361EE,#38BDF8)', color: '#fff' }}
              >
                {lang === 'ru' ? 'К предыдущему уроку' : 'To the previous lesson'}
              </Link>
            )}
            <Link
              to="/devops"
              className="px-4 py-2 rounded-xl text-sm"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
            >
              {lang === 'ru' ? 'Все модули' : 'All modules'}
            </Link>
          </div>
        </Glass>
      </div>
    )
  }

  // ─── Not written yet ──────────────────────────────────────────────────────
  if (missing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <Glass className="p-8 max-w-md text-center">
          <div className="text-5xl mb-4">{meta.icon}</div>
          <h1 className="font-heading text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            {lang === 'ru' ? meta.title_ru : meta.title_en}
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            {lang === 'ru' ? 'Урок скоро появится.' : 'This lesson is coming soon.'}
          </p>
          <Link to="/devops" className="text-sm" style={{ color: '#6B8BFF' }}>
            ← {lang === 'ru' ? 'Все модули' : 'All modules'}
          </Link>
        </Glass>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="font-mono text-sm animate-pulse" style={{ color: 'var(--muted)' }}>
          ◐ {lang === 'ru' ? 'загрузка джобы…' : 'loading job…'}
        </div>
      </div>
    )
  }

  const accent = mod?.accent ?? '#4361EE'
  const navItems = [
    ...lesson.sections.map((s) => ({ id: s.id, label: pick(s, 'title', lang) })),
    ...lesson.labs.map((l, i) => ({ id: `lab-${l.id}`, label: `⚙ ${i + 1}. ${pick(l, 'title', lang)}` })),
    ...(lesson.quiz.length ? [{ id: 'quiz', label: lang === 'ru' ? '🧪 Проверка' : '🧪 Check' }] : []),
  ]

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg)' }}>
      <CometCursor accent={accent} />

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-[1]">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Link
                to="/devops"
                className="flex items-center gap-1.5 font-mono text-[11px] mb-4 transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                <ArrowLeft size={12} /> DevOps
              </Link>

              <div className="mb-4">
                <div className="font-mono text-[10px] mb-1" style={{ color: accent }}>
                  {mod ? (lang === 'ru' ? mod.title_ru : mod.title_en) : ''}
                </div>
                <h3 className="font-heading font-bold text-sm" style={{ color: 'var(--text)' }}>
                  {lang === 'ru' ? lesson.title_ru : lesson.title_en}
                </h3>
              </div>

              <div className="space-y-0.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      sectionRefs.current[item.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-[12px] transition-colors"
                    style={{
                      color: activeSection === item.id ? 'var(--text)' : 'var(--muted)',
                      background: activeSection === item.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 space-y-5">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <Glass className="p-6" spotlight accent={accent}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className="font-mono text-[10px] px-2 py-1 rounded"
                        style={{ background: accent + '1f', color: accent }}
                      >
                        {mod ? `${String(mod.order).padStart(2, '0')} · ${lang === 'ru' ? mod.title_ru : mod.title_en}` : ''}
                      </span>
                      <StatusPill status={status} size="sm" />
                    </div>
                    <span className="text-4xl">{meta.icon}</span>
                    <h1
                      className="font-heading text-3xl font-extrabold mt-3 mb-2"
                      style={{ color: 'var(--text)', letterSpacing: '-1px' }}
                    >
                      {lang === 'ru' ? lesson.title_ru : lesson.title_en}
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                      {lang === 'ru' ? lesson.description_ru : lesson.description_en}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
                    <Clock size={12} /> {lesson.readTime} {lang === 'ru' ? 'мин' : 'min'}
                  </div>
                </div>

                {/* Job checklist */}
                <div className="flex flex-wrap gap-2 mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  {lesson.labs.map((l, i) => {
                    const done = progress?.labsPassed.includes(l.id)
                    return (
                      <span
                        key={l.id}
                        className="font-mono text-[10px] px-2 py-1 rounded flex items-center gap-1.5"
                        style={{
                          background: done ? '#2F9E4418' : 'rgba(255,255,255,0.04)',
                          color: done ? '#2F9E44' : 'var(--muted)',
                        }}
                      >
                        {done ? '✓' : '○'} lab {i + 1}
                      </span>
                    )
                  })}
                  {lesson.quiz.length > 0 && (
                    <span
                      className="font-mono text-[10px] px-2 py-1 rounded flex items-center gap-1.5"
                      style={{
                        background: (progress?.quizScore ?? 0) >= 60 ? '#2F9E4418' : 'rgba(255,255,255,0.04)',
                        color: (progress?.quizScore ?? 0) >= 60 ? '#2F9E44' : 'var(--muted)',
                      }}
                    >
                      {(progress?.quizScore ?? 0) >= 60 ? '✓' : '○'} quiz
                    </span>
                  )}
                </div>
              </Glass>
            </motion.div>

            {/* Intro */}
            <Glass className="p-6">
              <p className="leading-relaxed" style={{ color: 'var(--text)' }}>
                {lang === 'ru' ? lesson.content.intro_ru : lesson.content.intro_en}
              </p>
            </Glass>

            {/* Sections */}
            {lesson.sections.map((sec, i) => {
              const block = lesson.content.blocks.find((b) => b.sectionId === sec.id)
              const isKeyTerms = sec.id === 'key-terms'
              if (!block && !isKeyTerms) return null

              return (
                <motion.section
                  key={sec.id}
                  id={sec.id}
                  ref={(el) => { if (el) sectionRefs.current[sec.id] = el }}
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <Glass className="p-6">
                    <h2 className="font-heading text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                      {pick(sec, 'title', lang)}
                    </h2>

                    {isKeyTerms ? (
                      <div className="space-y-2.5">
                        {lesson.keyTerms.map((kt) => (
                          <div
                            key={kt.term_en}
                            className="rounded-xl p-3.5"
                            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
                          >
                            <code className="font-mono text-sm font-semibold" style={{ color: '#6B8BFF' }}>
                              {pick(kt, 'term', lang)}
                            </code>
                            <p className="text-[13px] mt-1 leading-relaxed" style={{ color: 'var(--muted)' }}>
                              {pick(kt, 'definition', lang)}
                            </p>
                            {(kt.example_ru || kt.example_en) && (
                              <p className="font-mono text-[11px] mt-1.5" style={{ color: 'var(--cyan)' }}>
                                {pick(kt, 'example', lang)}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : block ? (
                      <>
                        <p className="leading-relaxed whitespace-pre-line" style={{ color: 'var(--muted)' }}>
                          {pick(block, 'text', lang)}
                        </p>
                        {block.code && (
                          <CodeBlock
                            code={block.code}
                            lang={block.codeLang}
                            caption={block.codeCaption}
                            shell={block.codeLang === 'bash' && !block.codeCaption}
                          />
                        )}
                      </>
                    ) : null}
                  </Glass>
                </motion.section>
              )
            })}

            {/* Did you know */}
            {lesson.didYouKnow.length > 0 && (
              <Glass className="p-6" accent="#F08C00">
                <h3 className="font-heading font-bold mb-3" style={{ color: '#F08C00' }}>
                  💡 {lang === 'ru' ? 'Из практики' : 'From the field'}
                </h3>
                <ul className="space-y-2">
                  {lesson.didYouKnow.map((d, i) => (
                    <li key={i} className="text-[13px] flex gap-2 leading-relaxed" style={{ color: 'var(--muted)' }}>
                      <span style={{ color: '#F08C00' }}>›</span>
                      <span>{lang === 'ru' ? d.text_ru : d.text_en}</span>
                    </li>
                  ))}
                </ul>
              </Glass>
            )}

            {/* Labs */}
            {lesson.labs.map((lab, i) => (
              <div key={lab.id} ref={(el) => { if (el) sectionRefs.current[`lab-${lab.id}`] = el }}>
                <LabCard slug={slug} lab={lab} index={i} />
              </div>
            ))}

            {/* Quiz */}
            {lesson.quiz.length > 0 && (
              <section id="quiz" ref={(el) => { if (el) sectionRefs.current['quiz'] = el }} className="scroll-mt-24">
                <Glass className="p-6">
                  <div className="font-mono text-[10px] tracking-[2px] uppercase mb-1" style={{ color: 'var(--cyan)' }}>
                    // {lang === 'ru' ? 'финальная проверка' : 'final check'}
                  </div>
                  <h2 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                    {lang === 'ru' ? 'Проверка знаний' : 'Knowledge check'}
                  </h2>
                  <DevOpsQuiz slug={slug} questions={lesson.quiz} />
                </Glass>
              </section>
            )}

            {/* Nav */}
            <div className="flex items-center justify-between gap-3 pt-2">
              {prevSlug ? (
                <Link
                  to={`/devops/${prevSlug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  <ArrowLeft size={14} />
                  <span className="hidden sm:inline">
                    {lang === 'ru' ? DEVOPS_META[prevSlug].title_ru : DEVOPS_META[prevSlug].title_en}
                  </span>
                </Link>
              ) : <div />}

              {nextSlug && (
                <NextLink slug={nextSlug} lang={lang} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function NextLink({ slug, lang }: { slug: string; lang: 'ru' | 'en' }) {
  const unlocked = useDevOpsStore((s) => s.isUnlocked(slug))
  const meta = DEVOPS_META[slug]

  if (!unlocked) {
    return (
      <span
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm cursor-not-allowed"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)', opacity: 0.6 }}
        title={lang === 'ru' ? 'Закрой все задания и проверку в этом уроке' : 'Clear every lab and the check in this lesson'}
      >
        <Lock size={13} />
        <span className="hidden sm:inline">{lang === 'ru' ? meta.title_ru : meta.title_en}</span>
      </span>
    )
  }

  return (
    <Link
      to={`/devops/${slug}`}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold btn-sheen"
      style={{ background: 'linear-gradient(90deg,#4361EE,#38BDF8)', color: '#fff' }}
    >
      <span className="hidden sm:inline">{lang === 'ru' ? meta.title_ru : meta.title_en}</span>
      <ArrowRight size={14} />
    </Link>
  )
}
