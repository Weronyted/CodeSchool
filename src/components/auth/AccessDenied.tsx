import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { signOut } from '@/services/auth.service'
import { joinClassByCode } from '@/services/admin.service'
import { useAuthStore } from '@/store/useAuthStore'
import { useRoleStore } from '@/store/useRoleStore'

export function AccessDenied() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { setRole } = useRoleStore()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleJoin = async () => {
    if (!user || !code.trim()) return
    setLoading(true)
    setError('')
    try {
      const classId = await joinClassByCode(
        code.trim().toUpperCase(),
        user.uid,
        user.displayName ?? user.email ?? '',
        user.email ?? '',
      )
      setRole('student')
      navigate(`/class/${classId}`)
    } catch {
      setError(t('joinClass.error', 'Класс не найден. Проверь код.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm w-full"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-5">
          <Lock size={28} className="text-red-500 dark:text-red-400" />
        </div>
        <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white mb-2">
          {t('auth.accessDeniedTitle')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {t('auth.accessDeniedSubtitle')}
        </p>

        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            placeholder={t('joinClass.codePlaceholder', 'ABC123')}
            maxLength={8}
            className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-center font-mono font-bold text-slate-900 dark:text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-primary tracking-widest text-sm"
          />
          <Button onClick={handleJoin} disabled={loading || !code.trim()}>
            {loading ? '...' : t('joinClass.join', 'Войти')}
          </Button>
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-4">{error}</p>
        )}

        <Button variant="ghost" size="sm" onClick={() => signOut()} className="mt-2 text-slate-400">
          {t('nav.signOut')}
        </Button>
      </motion.div>
    </div>
  )
}
