import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import { useAuthStore } from '@/store/useAuthStore'
import { useProgressStore } from '@/store/useProgressStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'
import { useThemeStore } from '@/store/useThemeStore'

const BADGES = [
  { id: 'firstTag', emoji: '🏷️', slugIndex: 0 },
  { id: 'stylist', emoji: '🎨', slugIndex: 3 },
  { id: 'coder', emoji: '⚡', slugIndex: 5 },
  { id: 'developer', emoji: '🖥️', slugIndex: 10 },
  { id: 'fullStack', emoji: '🚀', slugIndex: 11 },
]

export default function Dashboard() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const progress = useProgressStore((s) => s.progress)
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const completedCount = Object.values(progress).filter((p) => p.completed).length
  const totalCount = LESSON_SLUGS.length
  const overallPct = Math.round((completedCount / totalCount) * 100)

  const radarData = LESSON_SLUGS.map((slug) => ({
    subject: LESSON_META[slug].icon + ' ' + LESSON_META[slug].title.split(' ')[0],
    score: progress[slug]?.quizScore ?? 0,
  }))

  const earnedBadges = BADGES.filter((b) => progress[LESSON_SLUGS[b.slugIndex]]?.completed)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Welcome card */}
        <motion.div
          className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative z-10">
            <h1 className="font-heading text-3xl font-extrabold mb-4">
              {t('dashboard.welcome', { name: user?.displayName ?? user?.email?.split('@')[0] ?? t('dashboard.student', 'Студент') })} 👋
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <div className="text-4xl font-extrabold font-heading">{completedCount}/{totalCount}</div>
                <div className="text-primary-200 text-sm">{t('dashboard.lessonsCompleted', 'Уроков пройдено')}</div>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-primary-200">{t('dashboard.progress', 'Прогресс')}</span>
                  <span className="font-bold">{overallPct}%</span>
                </div>
                <div className="h-3 bg-primary-500/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-4 text-8xl opacity-10 select-none">💻</div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Lessons grid */}
          <div className="lg:col-span-2">
            <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-4">
              {t('dashboard.yourLessons', 'Уроки')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LESSON_SLUGS.map((slug, i) => {
                const meta = LESSON_META[slug]
                const p = progress[slug]
                const done = p?.completed
                const score = p?.quizScore ?? 0

                return (
                  <motion.div
                    key={slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={`/lessons/${slug}`}
                      className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-sm transition-all group"
                    >
                      <span className="text-2xl flex-shrink-0 mt-0.5">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {meta.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {done ? (
                            <span className="text-xs text-green-600 dark:text-green-400 font-semibold">✅ {score}%</span>
                          ) : (
                            <span className="text-xs text-gray-400">{t('dashboard.notStarted', 'Не начат')}</span>
                          )}
                        </div>
                        {done && (
                          <div className="mt-1.5 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${score}%` }} />
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
                🏅 {t('dashboard.badgesTitle', 'Достижения')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {BADGES.map((badge) => {
                  const earned = earnedBadges.includes(badge)
                  return (
                    <div
                      key={badge.id}
                      title={t(`badges.${badge.id}`, badge.id)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                        earned
                          ? 'bg-primary-100 dark:bg-primary-900/40 animate-badge-reveal'
                          : 'bg-gray-100 dark:bg-gray-700 opacity-40 grayscale'
                      }`}
                    >
                      {badge.emoji}
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Radar */}
            {completedCount > 0 && (
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
                  📊 {t('dashboard.skills', 'Навыки')}
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData.slice(0, 8)}>
                    <PolarGrid stroke={isDark ? '#374151' : '#e5e7eb'} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 9, fill: isDark ? '#9ca3af' : '#6b7280' }}
                    />
                    <Radar
                      dataKey="score"
                      stroke="#3B5BDB"
                      fill="#3B5BDB"
                      fillOpacity={0.25}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Quick actions */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">
                {t('dashboard.quickActions', 'Быстрые действия')}
              </h3>
              <Link
                to="/lessons"
                className="flex items-center gap-3 px-4 py-3 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors font-medium text-sm"
              >
                📚 {t('dashboard.allLessons', 'Все уроки')}
              </Link>
              <Link
                to="/glossary"
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
              >
                📖 {t('dashboard.glossary', 'Словарь терминов')}
              </Link>
              <Link
                to="/assignments"
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
              >
                📝 {t('dashboard.assignments', 'Задания')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
