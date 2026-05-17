import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useProgressStore } from '@/store/useProgressStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'

export default function LessonsListPage() {
  const { t } = useTranslation()
  const progress = useProgressStore((s) => s.progress)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-heading text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {t('lessons.title', 'Все уроки')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('lessons.subtitle', '12 уроков по HTML, CSS и JavaScript')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LESSON_SLUGS.map((slug, i) => {
            const meta = LESSON_META[slug]
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
                    {meta.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{meta.description}</p>

                  <div className="flex items-center justify-between">
                    {done ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                        ✅ {t('lessons.done', 'Пройден')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                        📖 {t('lessons.readTime', '~{{min}} мин', { min: 8 })}
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
