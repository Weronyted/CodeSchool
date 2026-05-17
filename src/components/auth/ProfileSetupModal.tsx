import { useState } from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { updateDisplayName } from '@/services/auth.service'
import { useAuthStore } from '@/store/useAuthStore'
import { toast } from '@/store/useToastStore'

export function ProfileSetupModal() {
  const { t } = useTranslation()
  const { user, needsProfileSetup, setNeedsProfileSetup } = useAuthStore()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()
    if (!fullName) return
    setLoading(true)
    try {
      await updateDisplayName(user, fullName)
      setNeedsProfileSetup(false)
      toast.success(t('profile.setupDone', 'Профиль заполнен!'))
    } catch {
      toast.error(t('errors.saveFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={needsProfileSetup} onClose={() => setNeedsProfileSetup(false)} maxWidth="sm">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary dark:bg-primary-dark flex items-center justify-center mb-3">
            <User size={26} className="text-white" />
          </div>
          <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">
            {t('profile.setupTitle', 'Как тебя зовут?')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1">
            {t('profile.setupSubtitle', 'Введи своё имя и фамилию, чтобы завершить регистрацию.')}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder={t('profile.firstName', 'Имя')}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoFocus
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            type="text"
            placeholder={t('profile.lastName', 'Фамилия')}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <Button type="submit" className="w-full" disabled={loading || !firstName.trim() || !lastName.trim()}>
            {loading ? t('common.loading') : t('common.save')}
          </Button>
        </form>

        <button
          onClick={() => setNeedsProfileSetup(false)}
          className="mt-3 w-full text-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {t('profile.setupSkip', 'Пропустить (можно заполнить позже в профиле)')}
        </button>
      </div>
    </Modal>
  )
}
