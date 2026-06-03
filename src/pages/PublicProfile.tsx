import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LESSON_SLUGS } from '@/lessons'

interface PublicUser {
  displayName: string
  photoURL?: string
  createdAt?: number
  completedCount?: number
}

function getLevel(count: number, total: number, lang: 'ru' | 'en') {
  const pct = (count / total) * 100
  if (pct >= 80) return { label: 'Senior', emoji: '🚀', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' }
  if (pct >= 40) return { label: 'Middle', emoji: '⚡', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' }
  return { label: 'Junior', emoji: '🌱', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' }
}

export default function PublicProfile() {
  const { uid } = useParams<{ uid: string }>()
  const { language } = useLanguageStore()
  const lang = language as 'ru' | 'en'
  const [profile, setProfile] = useState<PublicUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'users', uid))
      .then((snap) => {
        if (!snap.exists()) { setNotFound(true); return }
        setProfile(snap.data() as PublicUser)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [uid])

  const total = LESSON_SLUGS.length
  const completed = profile?.completedCount ?? 0
  const level = getLevel(completed, total, lang)
  const pct = Math.round((completed / total) * 100)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-4xl animate-pulse">👤</div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
        <div className="text-5xl">🔍</div>
        <p className="font-heading text-xl font-bold text-gray-900 dark:text-white">
          {lang === 'ru' ? 'Профиль не найден' : 'Profile not found'}
        </p>
        <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline text-sm">
          {lang === 'ru' ? '← На главную' : '← Back to home'}
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden">
          {/* Gradient header */}
          <div className="h-24 bg-gradient-to-br from-primary-500 to-purple-600" />

          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="-mt-12 mb-4 flex justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-primary-100 dark:bg-primary-900 overflow-hidden flex items-center justify-center text-4xl shadow-lg">
                {profile?.photoURL
                  ? <img src={profile.photoURL} alt="" className="w-full h-full object-cover" />
                  : '👤'}
              </div>
            </div>

            {/* Name + level */}
            <div className="text-center mb-6">
              <h1 className="font-heading text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                {profile?.displayName ?? (lang === 'ru' ? 'Студент' : 'Student')}
              </h1>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${level.bg} ${level.color}`}>
                {level.emoji} {level.label}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{completed}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {lang === 'ru' ? 'уроков пройдено' : 'lessons done'}
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{pct}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {lang === 'ru' ? 'курса' : 'of course'}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-5">
              <motion.div
                className="h-full bg-primary-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>

            {/* Join date */}
            {profile?.createdAt && (
              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                {lang === 'ru' ? 'На платформе с ' : 'Member since '}
                {new Date(profile.createdAt).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', year: 'numeric' })}
              </p>
            )}
          </div>
        </div>

        {/* CodeSchool badge */}
        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            🎓 CodeSchool
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
