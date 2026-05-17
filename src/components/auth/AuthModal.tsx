import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Code2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { toast } from '@/store/useToastStore'
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } from '@/services/auth.service'

interface AuthModalProps {
  open: boolean
  onClose: () => void
}

type Mode = 'signin' | 'signup' | 'reset'

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { t } = useTranslation()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGoogle() {
    setLoading(true)
    try {
      await signInWithGoogle()
      onClose()
      toast.success('Добро пожаловать!')
    } catch {
      toast.error(t('errors.authFailed'))
    } finally {
      setLoading(false)
    }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'reset') {
        await resetPassword(email)
        toast.success('Письмо для сброса пароля отправлено')
        setMode('signin')
      } else if (mode === 'signup') {
        await signUpWithEmail(email, password, displayName)
        onClose()
        toast.success('Аккаунт создан!')
      } else {
        await signInWithEmail(email, password)
        onClose()
        toast.success('Добро пожаловать!')
      }
    } catch {
      toast.error(t('errors.authFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm">
      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary dark:bg-primary-dark flex items-center justify-center mb-3">
            <Code2 size={22} className="text-white" />
          </div>
          <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">
            {mode === 'reset' ? 'Сброс пароля' : t('auth.signInTitle')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1">{t('auth.signInSubtitle')}</p>
        </div>

        {mode !== 'reset' && (
          <>
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('auth.continueWithGoogle')}
            </button>

            <div className="my-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs text-slate-400">{t('auth.orSignInWithEmail')}</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>
          </>
        )}

        <form onSubmit={handleEmail} className="space-y-3">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder={t('auth.displayName')}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          )}
          <input
            type="email"
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {mode !== 'reset' && (
            <input
              type="password"
              placeholder={t('auth.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('common.loading') : mode === 'reset' ? 'Сбросить пароль' : mode === 'signup' ? t('auth.signUp') : t('auth.signIn')}
          </Button>
        </form>

        <div className="mt-4 text-center space-y-2">
          {mode === 'signin' && (
            <>
              <button onClick={() => setMode('signup')} className="text-sm text-primary dark:text-primary-dark hover:underline">
                {t('auth.noAccount')} {t('auth.signUp')}
              </button>
              <br />
              <button onClick={() => setMode('reset')} className="text-xs text-slate-500 hover:underline">
                {t('auth.forgotPassword')}
              </button>
            </>
          )}
          {mode === 'signup' && (
            <button onClick={() => setMode('signin')} className="text-sm text-primary dark:text-primary-dark hover:underline">
              {t('auth.hasAccount')} {t('auth.signIn')}
            </button>
          )}
          {mode === 'reset' && (
            <button onClick={() => setMode('signin')} className="text-sm text-primary dark:text-primary-dark hover:underline">
              {t('auth.backShort')}
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}
