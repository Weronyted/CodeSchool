import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/useAuthStore'
import { useProgressStore } from '@/store/useProgressStore'
import { useThemeStore } from '@/store/useThemeStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'
import { signOut } from '@/services/auth.service'
import { useConfirmStore } from '@/store/useConfirmStore'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLevel(pct: number, lang: 'ru' | 'en') {
  if (pct >= 80) return { label: lang === 'ru' ? 'Senior' : 'Senior', emoji: '🚀', color: 'text-purple-600 dark:text-purple-400' }
  if (pct >= 40) return { label: lang === 'ru' ? 'Middle' : 'Middle', emoji: '⚡', color: 'text-blue-600 dark:text-blue-400' }
  return { label: lang === 'ru' ? 'Junior' : 'Junior', emoji: '🌱', color: 'text-green-600 dark:text-green-400' }
}

function formatTime(seconds: number, lang: 'ru' | 'en'): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return lang === 'ru' ? `${h} ч ${m} мин` : `${h}h ${m}m`
  return lang === 'ru' ? `${m} мин` : `${m}m`
}

// ─── Activity heatmap (last 28 days) ─────────────────────────────────────────

function ActivityHeatmap({ progress, lang }: { progress: Record<string, { lastVisited?: number }>, lang: 'ru' | 'en' }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Build day → activity count map from lastVisited timestamps
  const activityMap: Record<string, number> = {}
  Object.values(progress).forEach((p) => {
    if (!p.lastVisited) return
    const d = new Date(p.lastVisited)
    d.setHours(0, 0, 0, 0)
    const key = d.toISOString().split('T')[0]
    activityMap[key] = (activityMap[key] ?? 0) + 1
  })

  // Last 28 days grid (4 rows × 7 cols)
  const days: { date: Date; count: number }[] = []
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = d.toISOString().split('T')[0]
    days.push({ date: d, count: activityMap[key] ?? 0 })
  }

  const maxCount = Math.max(...days.map((d) => d.count), 1)

  function getCellColor(count: number) {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-700'
    const intensity = count / maxCount
    if (intensity > 0.66) return 'bg-green-500'
    if (intensity > 0.33) return 'bg-green-400'
    return 'bg-green-300'
  }

  const weeks = []
  for (let i = 0; i < 28; i += 7) weeks.push(days.slice(i, i + 7))

  return (
    <div>
      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-3">
        📅 {lang === 'ru' ? 'Активность за 4 недели' : 'Activity – last 4 weeks'}
      </h3>
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}: ${day.count} ${lang === 'ru' ? 'урок(ов)' : 'lesson(s)'}`}
                className={`w-7 h-7 rounded-md transition-colors ${getCellColor(day.count)}`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        {lang === 'ru' ? 'Каждая клетка — один день обучения' : 'Each cell represents one day of study'}
      </p>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Profile() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { progress, streak, clearProgress } = useProgressStore()
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'
  const { language, toggleLanguage } = useLanguageStore()
  const confirm = useConfirmStore()
  const [signingOut, setSigningOut] = useState(false)
  const lang = language as 'ru' | 'en'

  const completed = LESSON_SLUGS.filter((s) => progress[s]?.completed)
  const bookmarked = LESSON_SLUGS.filter((s) => progress[s]?.bookmarks?.length)
  const totalCount = LESSON_SLUGS.length
  const pct = Math.round((completed.length / totalCount) * 100)
  const level = getLevel(pct, lang)

  const allValues = Object.values(progress)
  const totalSeconds = allValues.reduce((sum, p) => sum + (p.timeSpentSeconds ?? 0), 0)
  const scoresWithQuiz = allValues.filter((p) => p.completed && Number.isFinite(p.quizScore))
  const avgScore = scoresWithQuiz.length
    ? Math.round(scoresWithQuiz.reduce((s, p) => s + p.quizScore, 0) / scoresWithQuiz.length)
    : 0
  const bestScore = scoresWithQuiz.length
    ? Math.max(...scoresWithQuiz.map((p) => p.quizScore))
    : 0

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut()
  }

  const handleResetProgress = async () => {
    const ok = await confirm.confirm({
      title: lang === 'ru' ? 'Сбросить прогресс?' : 'Reset progress?',
      message: lang === 'ru'
        ? 'Все пройденные уроки, баллы и закладки будут удалены. Это нельзя отменить.'
        : 'All completed lessons, scores and bookmarks will be deleted. This cannot be undone.',
      confirmLabel: lang === 'ru' ? 'Сбросить' : 'Reset',
      danger: true,
    })
    if (ok) clearProgress()
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

          {/* User card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-3xl">
                  👤
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="font-heading font-bold text-xl text-gray-900 dark:text-white truncate">
                  {user?.displayName ?? t('profile.anonymous', 'Аноним')}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm truncate">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`text-sm font-bold ${level.color}`}>
                    {level.emoji} {level.label}
                  </span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-primary-600 dark:text-primary-400 font-semibold">
                    {completed.length}/{totalCount} {lang === 'ru' ? 'уроков' : 'lessons'}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>{lang === 'ru' ? 'До следующего уровня' : 'Progress to next level'}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
              📊 {lang === 'ru' ? 'Статистика' : 'Stats'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="text-2xl font-extrabold text-orange-500">🔥 {streak}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {lang === 'ru' ? 'Дней подряд' : 'Day streak'}
                </div>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  {totalSeconds > 0 ? formatTime(totalSeconds, lang) : '—'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {lang === 'ru' ? 'Время обучения' : 'Time spent'}
                </div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                  {scoresWithQuiz.length ? `${avgScore}%` : '—'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {lang === 'ru' ? 'Средний балл' : 'Avg score'}
                </div>
              </div>
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <div className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-400">
                  {scoresWithQuiz.length ? `${bestScore}%` : '—'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {lang === 'ru' ? 'Лучший результат' : 'Best score'}
                </div>
              </div>
            </div>
          </div>

          {/* Activity heatmap */}
          {Object.keys(progress).length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <ActivityHeatmap progress={progress} lang={lang} />
            </div>
          )}

          {/* Completed lessons */}
          {completed.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
                ✅ {t('profile.completed', 'Пройденные уроки')}
              </h2>
              <div className="space-y-2">
                {completed.map((slug) => {
                  const meta = LESSON_META[slug]
                  const score = Number.isFinite(progress[slug]?.quizScore) ? progress[slug].quizScore : 0
                  const time = progress[slug]?.timeSpentSeconds ?? 0
                  return (
                    <div key={slug} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        {meta.icon} {lang === 'ru' ? meta.title : meta.title_en}
                      </span>
                      <div className="flex items-center gap-3 text-xs">
                        {time > 0 && (
                          <span className="text-gray-400">⏱ {formatTime(time, lang)}</span>
                        )}
                        <span className="font-semibold text-green-600 dark:text-green-400">{score}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bookmarks */}
          {bookmarked.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
                🔖 {t('profile.bookmarks', 'Закладки')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {bookmarked.map((slug) => (
                  <span key={slug} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                    {LESSON_META[slug].icon} {lang === 'ru' ? LESSON_META[slug].title : LESSON_META[slug].title_en}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
              ⚙️ {t('profile.settings', 'Настройки')}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{t('profile.darkMode', 'Тёмная тема')}</span>
                <button
                  onClick={toggleTheme}
                  style={{ backgroundColor: isDark ? '#3B5BDB' : '#d1d5db' }}
                  className="relative w-12 h-6 rounded-full transition-colors"
                >
                  <span
                    style={{ transform: `translateX(${isDark ? '28px' : '4px'})` }}
                    className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform"
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{t('profile.language', 'Язык интерфейса')}</span>
                <button
                  onClick={toggleLanguage}
                  className="px-4 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-primary-400 transition-colors"
                >
                  {language === 'ru' ? '🇬🇧 EN' : '🇷🇺 RU'}
                </button>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="space-y-3">
            {Object.keys(progress).length > 0 && (
              <button
                onClick={handleResetProgress}
                className="w-full py-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl font-semibold hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
              >
                🗑️ {lang === 'ru' ? 'Сбросить прогресс' : 'Reset progress'}
              </button>
            )}
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50"
            >
              {signingOut ? t('profile.signingOut', 'Выход...') : t('profile.signOut', 'Выйти из аккаунта')}
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
