import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { doc, deleteDoc, getDoc, getDocFromServer } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/store/useAuthStore'
import { useRoleStore } from '@/store/useRoleStore'
import { useConfirmStore } from '@/store/useConfirmStore'
import type { ClassGroup, ClassMember } from '@/types/roles'

const AVATAR_COLORS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-pink-500 to-rose-600',
  'from-indigo-500 to-blue-600',
]

function avatarColor(uid: string) {
  let n = 0
  for (let i = 0; i < uid.length; i++) n += uid.charCodeAt(i)
  return AVATAR_COLORS[n % AVATAR_COLORS.length]
}

function formatDate(ts?: number) {
  if (!ts) return ''
  return new Date(ts).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ClassPage() {
  const { id: paramId } = useParams<{ id: string }>()
  const location = useLocation()
  // fallback: parse from URL if useParams loses context (AnimatePresence + ProtectedRoute timing)
  const id = paramId || location.pathname.split('/class/')[1] || undefined
  const { t } = useTranslation()
  const { user, loading: authLoading } = useAuthStore()
  const { isTeacher, isAdmin } = useRoleStore()
  const { confirm } = useConfirmStore()
  const navigate = useNavigate()

  const [classGroup, setClassGroup] = useState<ClassGroup | null>(null)
  const [classCol, setClassCol] = useState<'classes' | 'classGroups'>('classes')
  const [members, setMembers] = useState<ClassMember[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const isPrivileged = isTeacher() || isAdmin()
  const isOwner = classGroup?.teacherId === user?.uid

  useEffect(() => {
    if (authLoading) return
    if (!id) { setLoading(false); return }
    const timeout = setTimeout(() => setLoading(false), 8000)
    const tryGet = async (col: string) => {
      let s = await getDoc(doc(db, col, id)).catch(() => null)
      if (!s?.exists()) s = await getDocFromServer(doc(db, col, id)).catch(() => null)
      return s?.exists() ? s : null
    }
    const fetchClass = async () => {
      const snap = (await tryGet('classes')) ?? (await tryGet('classGroups'))
      const { getDocs, collection } = await import('firebase/firestore')
      const snapCol: 'classes' | 'classGroups' = snap?.ref.path.startsWith('classGroups') ? 'classGroups' : 'classes'
      const mems = await (async () => {
        for (const c of [snapCol, snapCol === 'classes' ? 'classGroups' : 'classes'] as const) {
          const s = await getDocs(collection(db, c, id, 'members')).catch(() => null)
          if (s && s.docs.length > 0) return s.docs.map((d) => ({ uid: d.id, ...d.data() } as ClassMember))
        }
        return [] as ClassMember[]
      })()
      if (snap) {
        setClassGroup({ id: snap.id, ...snap.data() } as ClassGroup)
        setClassCol(snapCol)
      }
      setMembers(mems)
    }
    fetchClass().finally(() => { clearTimeout(timeout); setLoading(false) })
    return () => clearTimeout(timeout)
  }, [id, authLoading])

  function copyCode() {
    if (!classGroup) return
    navigator.clipboard.writeText(classGroup.inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleLeave() {
    if (!user || !id) return
    const ok = await confirm({
      title: 'Покинуть класс?',
      message: 'Тебя удалят из списка участников. Ты сможешь снова вступить по коду.',
      confirmLabel: 'Покинуть',
      danger: true,
    })
    if (!ok) return
    await deleteDoc(doc(db, classCol, id, 'members', user.uid)).catch(() => {})
    navigate('/dashboard')
  }

  async function handleKick(member: ClassMember) {
    if (!id) return
    const ok = await confirm({
      title: `Удалить ${member.displayName}?`,
      message: 'Участник будет удалён из класса.',
      confirmLabel: 'Удалить',
      danger: true,
    })
    if (!ok) return
    await deleteDoc(doc(db, classCol, id, 'members', member.uid)).catch(() => {})
    setMembers((prev) => prev.filter((m) => m.uid !== member.uid))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-5xl"
        >
          🏫
        </motion.div>
      </div>
    )
  }

  if (!classGroup) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-6xl">😕</div>
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Класс не найден</h2>
        <p className="text-gray-500 text-sm">Возможно, ты попал по неверной ссылке</p>
      </div>
    )
  }

  const teachers = members.filter((m) => m.uid === classGroup?.teacherId || m.role === 'teacher')
  const students = members.filter((m) => m.uid !== classGroup?.teacherId && m.role !== 'teacher')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-8 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #3B5BDB, #7950F2)' }}
        >
          {/* BG decoration */}
          <div className="absolute right-6 top-6 text-[120px] opacity-[0.07] select-none leading-none">🏫</div>

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="text-primary-200 text-sm font-medium mb-1 uppercase tracking-wider">
                  {t('class.title', 'Класс')}
                </p>
                <h1 className="font-heading text-3xl font-extrabold leading-tight break-words">
                  {classGroup.name}
                </h1>
                {classGroup.description && (
                  <p className="text-primary-200 mt-2 text-sm leading-relaxed max-w-lg">
                    {classGroup.description}
                  </p>
                )}
                {classGroup.teacherName && (
                  <p className="text-white/60 text-sm mt-3">
                    👨‍🏫 {classGroup.teacherName}
                  </p>
                )}
              </div>

              {/* Invite code */}
              <div className="flex-shrink-0">
                <p className="text-primary-200 text-xs mb-1.5 text-right">
                  {t('class.inviteCode', 'Код приглашения')}
                </p>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-3 bg-white/15 hover:bg-white/25 transition-colors rounded-2xl px-5 py-3"
                >
                  <span className="font-mono font-bold text-xl tracking-widest">
                    {classGroup.inviteCode}
                  </span>
                  <span className="text-lg">{copied ? '✅' : '📋'}</span>
                </button>
                {copied && (
                  <p className="text-primary-200 text-xs mt-1 text-right">Скопировано!</p>
                )}
              </div>
            </div>

            {classGroup.createdAt && (
              <p className="text-white/40 text-xs mt-5">
                Создан {formatDate(classGroup.createdAt)}
              </p>
            )}
          </div>
        </motion.div>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { icon: '👥', label: t('class.students', 'Учеников'), value: students.length },
            { icon: '👨‍🏫', label: t('class.teachers', 'Учителей'), value: teachers.length },
            { icon: '🧑‍💻', label: t('class.total', 'Всего'), value: members.length },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-heading text-2xl font-extrabold text-gray-900 dark:text-white">
                {s.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Members ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-heading font-bold text-gray-900 dark:text-white">
              👥 {t('class.members', 'Участники')}
              <span className="ml-2 text-sm font-normal text-gray-400">({members.length})</span>
            </h2>
          </div>

          {members.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-center px-4">
              <div className="text-5xl">🪑</div>
              <p className="font-heading font-bold text-gray-900 dark:text-white">Пока никого нет</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                Поделись кодом{' '}
                <button onClick={copyCode} className="font-mono font-bold text-primary-600 dark:text-primary-400 hover:underline">
                  {classGroup.inviteCode}
                </button>{' '}
                чтобы ученики могли вступить
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {members.map((m, i) => {
                const isMe = m.uid === user?.uid
                const isTeacherMember = m.uid === classGroup?.teacherId || m.role === 'teacher'
                const canKick = (isOwner || isAdmin()) && !isMe && m.uid !== classGroup?.teacherId

                return (
                  <motion.div
                    key={m.uid}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${avatarColor(m.uid)} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                      {m.displayName?.charAt(0).toUpperCase() ?? '?'}
                    </div>

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {m.displayName}
                        </span>
                        {isMe && (
                          <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full font-semibold">
                            {t('class.you', 'ты')}
                          </span>
                        )}
                      </div>
                      {m.joinedAt && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          Вступил {formatDate(m.joinedAt)}
                        </p>
                      )}
                    </div>

                    {/* Role badge */}
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${
                      isTeacherMember
                        ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {isTeacherMember ? '👨‍🏫 ' + t('roles.teacher', 'Учитель') : t('roles.student', 'Студент')}
                    </span>

                    {/* Kick button (teacher/admin only) */}
                    {canKick && (
                      <button
                        onClick={() => handleKick(m)}
                        className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0 text-lg"
                        title="Удалить из класса"
                      >
                        ✕
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* ── Actions ──────────────────────────────────────────────────────── */}
        {!isOwner && !isPrivileged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex justify-end"
          >
            <button
              onClick={handleLeave}
              className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors font-medium"
            >
              Покинуть класс →
            </button>
          </motion.div>
        )}

      </div>
    </div>
  )
}
