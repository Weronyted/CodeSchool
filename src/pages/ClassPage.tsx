import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { getClassMembers } from '@/services/admin.service'
import { useAuthStore } from '@/store/useAuthStore'
import type { ClassGroup, ClassMember } from '@/types/roles'

export default function ClassPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { user } = useAuthStore()

  const [classGroup, setClassGroup] = useState<ClassGroup | null>(null)
  const [members, setMembers] = useState<ClassMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      getDoc(doc(db, 'classes', id)),
      getClassMembers(id),
    ]).then(([snap, mems]) => {
      if (snap.exists()) setClassGroup({ id: snap.id, ...snap.data() } as ClassGroup)
      setMembers(mems)
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-4xl animate-pulse">🏫</div>
  if (!classGroup) return <div className="min-h-screen flex items-center justify-center text-gray-500">Класс не найден</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Header */}
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-8 text-white mb-6">
            <h1 className="font-heading text-3xl font-extrabold mb-1">{classGroup.name}</h1>
            {classGroup.description && (
              <p className="text-primary-200">{classGroup.description}</p>
            )}
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 text-sm">
              <span className="font-mono font-bold tracking-widest">{classGroup.inviteCode}</span>
              <button
                onClick={() => navigator.clipboard.writeText(classGroup.inviteCode)}
                className="text-primary-200 hover:text-white transition-colors"
                title={t('class.copyCode', 'Скопировать код')}
              >
                📋
              </button>
            </div>
          </div>

          {/* Members */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">
              👥 {t('class.members', 'Участники')} ({members.length})
            </h2>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {members.map((m) => (
                <div key={m.uid} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-sm font-bold text-primary-700 dark:text-primary-300">
                      {m.displayName?.charAt(0).toUpperCase() ?? '?'}
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm font-medium">
                      {m.displayName}
                      {m.uid === user?.uid && (
                        <span className="ml-2 text-xs text-primary-600 dark:text-primary-400">({t('class.you', 'ты')})</span>
                      )}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    m.role === 'teacher'
                      ? 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {m.role === 'teacher' ? t('roles.teacher', 'Учитель') : t('roles.student', 'Студент')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
