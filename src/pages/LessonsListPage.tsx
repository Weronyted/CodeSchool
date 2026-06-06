import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useProgressStore } from '@/store/useProgressStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'
import type { LessonCategory } from '@/types/lesson'

type FilterCategory = 'ALL' | LessonCategory

const CATEGORY_LABELS: Record<FilterCategory, { ru: string; en: string }> = {
  ALL:    { ru: 'Все',     en: 'All' },
  BASICS: { ru: 'Основы', en: 'Basics' },
  HTML:   { ru: 'HTML',   en: 'HTML' },
  CSS:    { ru: 'CSS',    en: 'CSS' },
  JS:     { ru: 'JS',     en: 'JS' },
  REACT:  { ru: 'React',  en: 'React' },
}

export default function LessonsListPage() {
  const { t } = useTranslation()
  const progress = useProgressStore((s) => s.progress)
  const { language } = useLanguageStore()
  const [filter, setFilter] = useState<FilterCategory>('ALL')
  const lang = language as 'ru' | 'en'

  const visibleSlugs = filter === 'ALL'
    ? LESSON_SLUGS
    : LESSON_SLUGS.filter((s) => LESSON_META[s].category === filter)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="font-mono text-[11px] tracking-[3px] uppercase mb-3" style={{ color: 'var(--cyan)' }}>// уроки</div>
          <h1 className="font-heading text-4xl font-extrabold mb-2" style={{ color: 'var(--text)', letterSpacing: '-1.5px' }}>
            {t('lessons.title')}
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            {t('lessons.subtitle', { count: LESSON_SLUGS.length })}
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {(Object.keys(CATEGORY_LABELS) as FilterCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-1.5 rounded-lg font-mono text-xs tracking-wider transition-all"
              style={filter === cat
                ? { background: 'var(--blue)', color: '#fff', border: '1px solid transparent' }
                : { background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }
              }
              onMouseEnter={e => { if (filter !== cat) (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
              onMouseLeave={e => { if (filter !== cat) (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
            >
              {lang === 'en' ? CATEGORY_LABELS[cat].en : CATEGORY_LABELS[cat].ru}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleSlugs.map((slug) => {
            const meta = LESSON_META[slug]
            const i = LESSON_SLUGS.indexOf(slug)
            const p = progress[slug]
            const done = p?.completed
            const score = p?.quizScore ?? 0

            return (
              <motion.div key={slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Link
                  to={`/lessons/${slug}`}
                  className="block rounded-2xl p-6 transition-all"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(107,139,255,0.25)'; el.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.transform = '' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{meta.icon}</span>
                    <span className="font-mono text-[10px]" style={{ color: 'var(--blue)' }}>#{i + 1}</span>
                  </div>
                  <h3 className="font-heading font-bold mb-1 transition-colors" style={{ color: 'var(--text)' }}>
                    {lang === 'en' ? meta.title_en : meta.title}
                  </h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>
                    {lang === 'en' ? meta.description_en : meta.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {done ? (
                      <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#38BDF8' }}>
                        ✅ {t('lessons.done')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                        📖 {t('lessons.readTime', { min: 8 })}
                      </span>
                    )}
                    {score > 0 && (
                      <span className="text-xs font-semibold" style={{ color: '#6B8BFF' }}>{score}%</span>
                    )}
                  </div>

                  {done && (
                    <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div className="h-full rounded-full" style={{ width: `${score}%`, background: 'linear-gradient(90deg,#4361EE,#38BDF8)' }} />
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
