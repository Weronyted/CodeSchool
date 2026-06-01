import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function SignInPrompt() {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary-dark/20 flex items-center justify-center mx-auto mb-5">
          <Code2 size={28} className="text-primary dark:text-primary-dark" />
        </div>
        <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white mb-2">
          {t('auth.requiredTitle')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {t('auth.requiredSubtitle')}
        </p>
        <Button onClick={() => window.dispatchEvent(new Event('open-auth-modal'))}>
          {t('nav.signIn')}
        </Button>
      </motion.div>
    </div>
  )
}
