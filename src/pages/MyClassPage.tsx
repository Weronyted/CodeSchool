import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/store/useAuthStore'

export default function MyClassPage() {
  const { t } = useTranslation()
  const { user, loading: authLoading } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user) { setLoading(false); return }
    const findClass = async () => {
      try {
        // Teachers/owners: find a class they created
        const teacherSnap = await getDocs(
          query(collection(db, 'classes'), where('teacherId', '==', user.uid))
        )
        if (!teacherSnap.empty) {
          navigate(`/class/${teacherSnap.docs[0].id}`, { replace: true })
          return
        }

        // Students: check if user's own member document exists in any class
        const allSnap = await getDocs(collection(db, 'classes'))
        for (const classDoc of allSnap.docs) {
          const memberDoc = await getDoc(
            doc(db, 'classes', classDoc.id, 'members', user.uid)
          )
          if (memberDoc.exists()) {
            navigate(`/class/${classDoc.id}`, { replace: true })
            return
          }
        }
      } catch {
        // permission denied or no classes
      }
      setLoading(false)
    }
    findClass()
  }, [user, authLoading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-spin">🏫</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-4">🏫</div>
        <h1 className="font-heading text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
          {t('classes.notInClass', 'Ты ещё не в классе')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          {t('classes.askTeacher', 'Попроси учителя выдать код для вступления в класс')}
        </p>
        <Link
          to="/join/enter"
          className="inline-block px-6 py-3 rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#3B5BDB' }}
        >
          {t('classes.join', 'Вступить в класс')}
        </Link>
      </motion.div>
    </div>
  )
}
