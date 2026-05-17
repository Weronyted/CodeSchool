import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { submitAssignment } from '@/services/admin.service'
import { useAuthStore } from '@/store/useAuthStore'
import type { Assignment } from '@/types/roles'
import { CodeRunner } from '@/components/code/CodeRunner'

export default function TakeAssignment() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user } = useAuthStore()

  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState(true)
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!id) return
    getDoc(doc(db, 'assignments', id)).then((snap) => {
      if (snap.exists()) setAssignment({ id: snap.id, ...snap.data() } as Assignment)
    }).finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async () => {
    if (!user || !id || !answer.trim()) return
    setSubmitting(true)
    await submitAssignment(id, user.uid, answer)
    setSubmitted(true)
    setSubmitting(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-4xl animate-pulse">📚</div>
  if (!assignment) return <div className="min-h-screen flex items-center justify-center text-gray-500">Задание не найдено</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          <button
            onClick={() => navigate('/assignments')}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
          >
            ← {t('assignments.back', 'Назад к заданиям')}
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6">
            <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">{assignment.title}</h1>
            {assignment.description && (
              <p className="text-gray-600 dark:text-gray-400">{assignment.description}</p>
            )}
          </div>

          {submitted ? (
            <motion.div
              className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border border-green-100 dark:border-green-800 text-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-heading font-bold text-xl text-green-800 dark:text-green-300 mb-2">
                {t('assignments.submitted', 'Задание сдано!')}
              </h2>
              <p className="text-green-700 dark:text-green-400">
                {t('assignments.submittedDesc', 'Учитель проверит твоё задание.')}
              </p>
            </motion.div>
          ) : (
            <>
              {assignment.type === 'code' ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {t('assignments.writeCode', 'Напиши код')}
                    </h2>
                  </div>
                  <CodeRunner
                    initialJs={answer || '// Напиши свой код здесь\n'}
                    mode="js"
                  />
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6">
                  <label className="block font-semibold text-gray-900 dark:text-white mb-3">
                    {t('assignments.yourAnswer', 'Твой ответ')}
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={6}
                    placeholder={t('assignments.answerPlaceholder', 'Напиши ответ...')}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting || !answer.trim()}
                className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {submitting ? t('assignments.submitting', 'Отправка...') : t('assignments.submit', 'Сдать задание')}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
