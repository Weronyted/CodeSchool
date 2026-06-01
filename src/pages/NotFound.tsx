import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-extrabold text-primary-600 dark:text-primary-400 mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{t('notFound.message', 'Страница не найдена')}</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          {t('notFound.home', 'На главную')}
        </Link>
      </motion.div>
    </div>
  )
}
