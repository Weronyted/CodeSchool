import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useAuthStore } from '@/store/useAuthStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'

const SHAPES = [
  { emoji: '🏗️', x: '8%',  y: '12%', size: 56, delay: 0 },
  { emoji: '🎨', x: '85%', y: '8%',  size: 48, delay: 0.3 },
  { emoji: '⚡', x: '75%', y: '65%', size: 64, delay: 0.6 },
  { emoji: '</>', x: '5%',  y: '70%', size: 52, delay: 0.2 },
  { emoji: '🖥️', x: '50%', y: '5%',  size: 44, delay: 0.9 },
  { emoji: '📱', x: '92%', y: '40%', size: 40, delay: 0.4 },
  { emoji: '🔧', x: '15%', y: '40%', size: 38, delay: 0.7 },
  { emoji: '🌐', x: '60%', y: '80%', size: 46, delay: 1.1 },
  { emoji: '💡', x: '30%', y: '85%', size: 42, delay: 0.5 },
  { emoji: '🚀', x: '40%', y: '15%', size: 50, delay: 0.8 },
  { emoji: '📦', x: '20%', y: '20%', size: 36, delay: 1.2 },
  { emoji: '🎯', x: '70%', y: '30%', size: 44, delay: 0.1 },
]

const FEATURES = [
  { icon: '💻', titleKey: 'landing.features.interactive.title', descKey: 'landing.features.interactive.desc' },
  { icon: '✅', titleKey: 'landing.features.quizzes.title',     descKey: 'landing.features.quizzes.desc' },
  { icon: '📊', titleKey: 'landing.features.progress.title',    descKey: 'landing.features.progress.desc' },
  { icon: '🆓', titleKey: 'landing.features.free.title',        descKey: 'landing.features.free.desc' },
]

export default function Landing() {
  const { t } = useTranslation()
  const { language } = useLanguageStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const handleStart = () => {
    if (user) navigate('/lessons')
    else window.dispatchEvent(new Event('open-auth-modal'))
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">

      {/* Floating shapes — CSS animation: starts immediately, no JS init delay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {SHAPES.map((s, i) => (
          <div
            key={i}
            className="absolute select-none"
            style={{
              left: s.x,
              top: s.y,
              fontSize: s.size,
              animation: `float ${4 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          >
            <span className="opacity-50 dark:opacity-15">{s.emoji}</span>
          </div>
        ))}
      </div>

      {/* Hero */}
      <section className="relative z-10 text-center px-4 pt-16 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            {t('landing.hero.title')}{' '}
            <span className="text-primary-600 dark:text-primary-400">{t('landing.hero.titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('landing.hero.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={handleStart}
              className="px-8 py-4 rounded-2xl font-bold text-lg transition-colors shadow-xl"
              style={{ backgroundColor: '#3B5BDB', color: '#ffffff' }}
            >
              {t('landing.hero.cta')}
            </button>
            <Link
              to="/lessons"
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 rounded-2xl font-bold text-lg hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors bg-white/70 dark:bg-transparent backdrop-blur-sm"
            >
              {t('landing.hero.ctaSecondary')}
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { value: String(LESSON_SLUGS.length), label: t('landing.hero.stat1') },
            { value: '100+', label: t('landing.hero.stat2') },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold font-heading" style={{ color: '#3B5BDB' }}>{s.value}</div>
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
          {t('landing.features.title')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.titleKey}
              className="bg-white/80 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-cream-200 dark:border-gray-700 hover:shadow-md transition-shadow backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
          className="font-heading text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('landing.topics.title')}
        </motion.h2>
        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('landing.topics.subtitle')}
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LESSON_SLUGS.map((slug, i) => {
            const meta = LESSON_META[slug]
            return (
              <motion.div
                key={slug}
                className="bg-white/80 dark:bg-gray-800 rounded-2xl p-5 border border-cream-200 dark:border-gray-700 flex items-start gap-4 hover:border-primary-300 dark:hover:border-primary-600 transition-colors backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-3xl flex-shrink-0">{meta.icon}</span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#3B5BDB' }}>
                    {t('landing.lesson')} {i + 1}
                  </span>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white text-sm mt-0.5">
                    {language === 'en' ? meta.title_en : meta.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {language === 'en' ? meta.description_en : meta.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-4">
        <motion.div
          className="max-w-3xl mx-auto rounded-3xl p-12 text-center text-white shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #3B5BDB, #7950F2)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl font-extrabold mb-4">{t('landing.cta.title')}</h2>
          <p className="text-indigo-100 text-lg mb-8">{t('landing.cta.subtitle')}</p>
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-white rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
            style={{ color: '#3B5BDB' }}
          >
            {t('landing.cta.button')}
          </button>
        </motion.div>
      </section>

      <footer className="relative z-10 text-center py-8 text-gray-400 dark:text-gray-500 text-sm border-t border-cream-200 dark:border-gray-800">
        © {new Date().getFullYear()} CodeSchool — {t('footer.forLearners')}
      </footer>
    </div>
  )
}
