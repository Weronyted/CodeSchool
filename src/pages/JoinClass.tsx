import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { joinClassByCode } from '@/services/admin.service'
import { useAuthStore } from '@/store/useAuthStore'

export default function JoinClass() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleJoin = async () => {
    if (!user || !code.trim()) return
    setLoading(true)
    setError('')
    try {
      const classId = await joinClassByCode(code.trim().toUpperCase(), user.uid, user.displayName ?? user.email ?? '')
      navigate(`/class/${classId}`)
    } catch {
      setError(t('joinClass.error', 'Класс не найден. Проверь код.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-5xl text-center mb-4">🏫</div>
        <h1 className="font-heading text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-2">
          {t('joinClass.title', 'Вступить в класс')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-8">
          {t('joinClass.subtitle', 'Введи код приглашения от учителя')}
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
          placeholder={t('joinClass.codePlaceholder', 'Например: ABC123')}
          maxLength={8}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-center text-2xl font-mono font-bold text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4 tracking-widest"
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          onClick={handleJoin}
          disabled={loading || !code.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {loading ? t('joinClass.joining', 'Вступаю...') : t('joinClass.join', 'Вступить')}
        </button>
      </motion.div>
    </div>
  )
}
