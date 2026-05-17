import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/useAuthStore'
import { useProgressStore } from '@/store/useProgressStore'
import { useThemeStore } from '@/store/useThemeStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'
import { signOut } from '@/services/auth.service'

export default function Profile() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const progress = useProgressStore((s) => s.progress)
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'
  const { language, toggleLanguage } = useLanguageStore()
  const [signingOut, setSigningOut] = useState(false)

  const completed = LESSON_SLUGS.filter((s) => progress[s]?.completed)
  const bookmarked = LESSON_SLUGS.filter((s) => progress[s]?.bookmarks?.length)

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut()
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* User card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6">
            <div className="flex items-center gap-4">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-3xl">
                  👤
                </div>
              )}
              <div>
                <h1 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                  {user?.displayName ?? t('profile.anonymous', 'Аноним')}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mt-0.5">
                  {t('profile.student', 'Студент')} · {completed.length}/{LESSON_SLUGS.length} {t('profile.lessons', 'уроков')}
                </p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6">
            <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
              ⚙️ {t('profile.settings', 'Настройки')}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{t('profile.darkMode', 'Тёмная тема')}</span>
                <button
                  onClick={toggleTheme}
                  className={`relative w-12 h-6 rounded-full transition-colors ${isDark ? 'bg-primary-600' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isDark ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{t('profile.language', 'Язык интерфейса')}</span>
                <button
                  onClick={toggleLanguage}
                  className="px-4 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-primary-400 transition-colors"
                >
                  {language === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}
                </button>
              </div>
            </div>
          </div>

          {/* Completed lessons */}
          {completed.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6">
              <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
                ✅ {t('profile.completed', 'Пройденные уроки')}
              </h2>
              <div className="space-y-2">
                {completed.map((slug) => {
                  const meta = LESSON_META[slug]
                  const score = progress[slug]?.quizScore ?? 0
                  return (
                    <div key={slug} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        {meta.icon} {meta.title}
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{score}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bookmarks */}
          {bookmarked.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6">
              <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
                🔖 {t('profile.bookmarks', 'Закладки')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {bookmarked.map((slug) => (
                  <span key={slug} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                    {LESSON_META[slug].icon} {LESSON_META[slug].title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50"
          >
            {signingOut ? t('profile.signingOut', 'Выход...') : t('profile.signOut', 'Выйти из аккаунта')}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
