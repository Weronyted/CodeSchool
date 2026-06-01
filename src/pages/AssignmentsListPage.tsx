import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/useAuthStore'
import { getAssignmentsForStudent } from '@/services/admin.service'
import type { Assignment } from '@/types/roles'

export default function AssignmentsListPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getAssignmentsForStudent(user.uid)
      .then(setAssignments)
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            📝 {t('assignments.title', 'Задания')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {t('assignments.subtitle', 'Задания от твоего учителя')}
          </p>

          {loading ? (
            <div className="text-center py-20 text-4xl animate-pulse">📚</div>
          ) : assignments.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-500 dark:text-gray-400">
                {t('assignments.empty', 'Пока нет заданий')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignments.map((a, i) => {
                const due = a.dueDate ? new Date(a.dueDate.toMillis()) : null
                const overdue = due && due < new Date()
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-1">{a.title}</h3>
                        {a.description && (
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{a.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {due && (
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              overdue
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            }`}>
                              📅 {overdue ? t('assignments.overdue', 'Просрочено') : t('assignments.due', 'Сдать до')}: {due.toLocaleDateString('ru-RU')}
                            </span>
                          )}
                          {a.lessonSlug && (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">
                              📖 {a.lessonSlug}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/assignments/${a.id}`}
                        className="flex-shrink-0 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
                      >
                        {t('assignments.open', 'Открыть')} →
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
