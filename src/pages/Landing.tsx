import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'

const SHAPES = [
  { emoji: '🏗️', x: '8%', y: '12%', size: 56, delay: 0 },
  { emoji: '🎨', x: '85%', y: '8%', size: 48, delay: 0.3 },
  { emoji: '⚡', x: '75%', y: '65%', size: 64, delay: 0.6 },
  { emoji: '</>', x: '5%', y: '70%', size: 52, delay: 0.2 },
  { emoji: '🖥️', x: '50%', y: '5%', size: 44, delay: 0.9 },
  { emoji: '📱', x: '92%', y: '40%', size: 40, delay: 0.4 },
  { emoji: '🔧', x: '15%', y: '40%', size: 38, delay: 0.7 },
  { emoji: '🌐', x: '60%', y: '80%', size: 46, delay: 1.1 },
  { emoji: '💡', x: '30%', y: '85%', size: 42, delay: 0.5 },
  { emoji: '🚀', x: '40%', y: '15%', size: 50, delay: 0.8 },
  { emoji: '📦', x: '20%', y: '20%', size: 36, delay: 1.2 },
  { emoji: '🎯', x: '70%', y: '30%', size: 44, delay: 0.1 },
]

const FEATURES = [
  { icon: '📚', titleKey: 'landing.feat1Title', descKey: 'landing.feat1Desc' },
  { icon: '⚡', titleKey: 'landing.feat2Title', descKey: 'landing.feat2Desc' },
  { icon: '🎮', titleKey: 'landing.feat3Title', descKey: 'landing.feat3Desc' },
  { icon: '🏆', titleKey: 'landing.feat4Title', descKey: 'landing.feat4Desc' },
  { icon: '🌙', titleKey: 'landing.feat5Title', descKey: 'landing.feat5Desc' },
  { icon: '👨‍🏫', titleKey: 'landing.feat6Title', descKey: 'landing.feat6Desc' },
]

export default function Landing() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {SHAPES.map((s, i) => (
          <motion.div
            key={i}
            className="absolute select-none"
            style={{ left: s.x, top: s.y, fontSize: s.size }}
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          >
            <span className="opacity-20 dark:opacity-10">{s.emoji}</span>
          </motion.div>
        ))}
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-2xl text-primary-600 dark:text-primary-400">
          <span className="text-3xl">💻</span> CodeSchool
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => document.dispatchEvent(new Event('open-auth-modal'))}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
          >
            {t('auth.signIn')}
          </button>
          <button
            onClick={() => document.dispatchEvent(new Event('open-auth-modal'))}
            className="px-5 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-md shadow-primary-200 dark:shadow-none"
          >
            {t('landing.getStarted')}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-4 pt-16 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-6">
            {t('landing.badge', '12 уроков · HTML · CSS · JavaScript')}
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            {t('landing.heroTitle1', 'Научись создавать')}{' '}
            <span className="text-primary-600 dark:text-primary-400">{t('landing.heroTitle2', 'веб-сайты')}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('landing.heroDesc', 'Пройди 12 интерактивных уроков от первого тега до полноценного веб-приложения. Практические задания, встроенный редактор кода и мгновенная проверка.')}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => document.dispatchEvent(new Event('open-auth-modal'))}
              className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-colors shadow-xl shadow-primary-200 dark:shadow-none"
            >
              {t('landing.startFree', 'Начать бесплатно →')}
            </button>
            <Link
              to="/lessons"
              className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-lg hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {t('landing.viewLessons', 'Посмотреть уроки')}
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { value: '12', label: t('landing.stat1', 'Уроков') },
            { value: '60+', label: t('landing.stat2', 'Заданий') },
            { value: '3', label: t('landing.stat3', 'Языка') },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold text-primary-600 dark:text-primary-400 font-heading">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <motion.h2
          className="font-heading text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('landing.whyTitle', 'Почему CodeSchool?')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.titleKey}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">{t(f.titleKey)}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t(f.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lessons grid */}
      <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <motion.h2
          className="font-heading text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('landing.topicsTitle', 'Программа курса')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LESSON_SLUGS.map((slug, i) => {
            const meta = LESSON_META[slug]
            return (
              <motion.div
                key={slug}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 flex items-start gap-4 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-3xl flex-shrink-0">{meta.icon}</span>
                <div>
                  <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    {t('landing.lesson', 'Урок')} {i + 1}
                  </span>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white text-sm mt-0.5">{meta.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{meta.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-4">
        <motion.div
          className="max-w-3xl mx-auto bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-12 text-center text-white shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl font-extrabold mb-4">{t('landing.ctaTitle', 'Готов начать?')}</h2>
          <p className="text-primary-100 text-lg mb-8">{t('landing.ctaDesc', 'Создай аккаунт бесплатно и начни свой первый урок прямо сейчас.')}</p>
          <button
            onClick={() => document.dispatchEvent(new Event('open-auth-modal'))}
            className="px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg hover:bg-primary-50 transition-colors shadow-lg"
          >
            {t('landing.startFree', 'Начать бесплатно →')}
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400 dark:text-gray-500 text-sm border-t border-gray-100 dark:border-gray-800">
        © {new Date().getFullYear()} CodeSchool — {t('landing.footer', 'Учись создавать интернет')}
      </footer>
    </div>
  )
}
