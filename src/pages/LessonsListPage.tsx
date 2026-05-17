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
}

export default function LessonsListPage() {
  const { t } = useTranslation()
  const progress = useProgressStore((s) => s.progress)
  const { language } = useLanguageStore()
  const [filter, setFilter] = useState<FilterCategory>('ALL')

  const visibleSlugs = filter === 'ALL'
    ? LESSON_SLUGS
    : LESSON_SLUGS.filter((s) => LESSON_META[s].category === filter)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {t('lessons.title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('lessons.subtitle', { count: LESSON_SLUGS.length })}
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {(Object.keys(CATEGORY_LABELS) as FilterCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors"
              style={filter === cat
                ? { backgroundColor: '#3B5BDB', color: '#fff', borderColor: '#3B5BDB' }
                : { backgroundColor: 'transparent', color: '#6b7280', borderColor: '#e5e7eb' }
              }
            >
              {language === 'en' ? CATEGORY_LABELS[cat].en : CATEGORY_LABELS[cat].ru}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleSlugs.map((slug) => {
            const meta = LESSON_META[slug]
            const i = LESSON_SLUGS.indexOf(slug)
            const p = progress[slug]
            const done = p?.completed
            const score = p?.quizScore ?? 0

            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/lessons/${slug}`}
                  className="block bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{meta.icon}</span>
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      #{i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {language === 'en' ? meta.title_en : meta.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {language === 'en' ? meta.description_en : meta.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {done ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                        ✅ {t('lessons.done')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                        📖 {t('lessons.readTime', { min: 8 })}
                      </span>
                    )}
                    {score > 0 && (
                      <span className="text-xs text-primary-600 dark:text-primary-400 font-semibold">
                        {score}%
                      </span>
                    )}
                  </div>

                  {done && (
                    <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${score}%` }}
                      />
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
