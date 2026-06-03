import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'

export default function StatsPage() {
  const { language } = useLanguageStore()
  const lang = language as 'ru' | 'en'
  const [studentCount, setStudentCount] = useState<number | null>(null)

  useEffect(() => {
    getDocs(collection(db, 'userRoles'))
      .then((snap) => setStudentCount(snap.size))
      .catch(() => setStudentCount(null))
  }, [])

  const lessonCount = LESSON_SLUGS.length
  const categories = {
    BASICS: LESSON_SLUGS.filter((s) => LESSON_META[s].category === 'BASICS').length,
    HTML: LESSON_SLUGS.filter((s) => LESSON_META[s].category === 'HTML').length,
    CSS: LESSON_SLUGS.filter((s) => LESSON_META[s].category === 'CSS').length,
    JS: LESSON_SLUGS.filter((s) => LESSON_META[s].category === 'JS').length,
  }

  const stats = [
    {
      emoji: '👨‍🎓',
      value: studentCount !== null ? studentCount.toString() : '…',
      label: lang === 'ru' ? 'Студентов на платформе' : 'Students on the platform',
      color: 'from-blue-500 to-primary-600',
    },
    {
      emoji: '📚',
      value: lessonCount.toString(),
      label: lang === 'ru' ? 'Уроков в курсе' : 'Lessons in the course',
      color: 'from-purple-500 to-pink-500',
    },
    {
      emoji: '🏗️',
      value: `${categories.HTML}`,
      label: lang === 'ru' ? 'Уроков по HTML' : 'HTML lessons',
      color: 'from-orange-400 to-red-500',
    },
    {
      emoji: '🎨',
      value: `${categories.CSS}`,
      label: lang === 'ru' ? 'Уроков по CSS' : 'CSS lessons',
      color: 'from-teal-400 to-blue-500',
    },
    {
      emoji: '⚡',
      value: `${categories.JS}`,
      label: lang === 'ru' ? 'Уроков по JavaScript' : 'JavaScript lessons',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      emoji: '🌿',
      value: `${categories.BASICS}`,
      label: lang === 'ru' ? 'Базовых уроков' : 'Basics lessons',
      color: 'from-green-400 to-teal-500',
    },
  ]

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-16">

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            📊 {lang === 'ru' ? 'Статистика платформы' : 'Platform Stats'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {lang === 'ru'
              ? 'Живые данные о нашем сообществе учеников и курсе'
              : 'Live data about our student community and course'}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                {s.emoji}
              </div>
              <div className="font-heading text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
                {s.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-4">
            {lang === 'ru' ? '🛠️ Чему ты научишься' : '🛠️ What you will learn'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'HTML5', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
              { label: 'CSS3', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
              { label: 'JavaScript', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' },
              { label: 'Git', color: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' },
              { label: 'GitHub', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
              { label: 'Flexbox', color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' },
              { label: 'CSS Grid', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
              { label: 'DOM API', color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
              { label: 'Async/Await', color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
            ].map((t) => (
              <span key={t.label} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${t.color}`}>
                {t.label}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
