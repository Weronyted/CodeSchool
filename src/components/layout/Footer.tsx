import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Code2, Heart } from 'lucide-react'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-heading font-semibold text-primary dark:text-primary-dark">
          <Code2 size={18} />
          CodeSchool
        </Link>
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/glossary" className="hover:text-primary dark:hover:text-primary-dark transition-colors">{t('nav.glossary')}</Link>
          <Link to="/dashboard" className="hover:text-primary dark:hover:text-primary-dark transition-colors">{t('nav.dashboard')}</Link>
          <Link to="/lessons" className="hover:text-primary dark:hover:text-primary-dark transition-colors">{t('nav.lessons')}</Link>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          {t('footer.madeWith')} <Heart size={12} className="text-danger fill-danger" /> {t('footer.forLearners')}
        </p>
      </div>
    </footer>
  )
}
