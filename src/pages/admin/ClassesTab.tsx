import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getClasses, createClass, deleteClass,
  getClassMembers, addMemberToClass, removeClassMember,
} from '@/services/admin.service'
import { listAllUsers } from '@/services/role.service'
import { useAuthStore } from '@/store/useAuthStore'
import { useConfirmStore } from '@/store/useConfirmStore'
import type { ClassGroup, ClassMember } from '@/types/roles'
import type { UserRoleRecord } from '@/types/roles'

interface UserEntry { uid: string; displayName: string; email: string }

export default function ClassesTab() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { confirm } = useConfirmStore()
  const [classes, setClasses] = useState<ClassGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ name: '', description: '' })
  const [newClass, setNewClass] = useState<ClassGroup | null>(null)
  const [copied, setCopied] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    getClasses().then(setClasses).finally(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!user || !form.name.trim()) return
    setCreating(true)
    const created = await createClass({ ...form, teacherId: user.uid })
    setClasses((prev) => [created, ...prev])
    setForm({ name: '', description: '' })
    setCreating(false)
    setNewClass(created)
    setCopied(false)
  }

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({
      title: t('admin.confirmDeleteClass', 'Удалить класс?'),
      message: `Класс «${name}» и все его данные будут удалены.`,
      confirmLabel: t('common.delete', 'Удалить'),
      danger: true,
    })
    if (!ok) return
    await deleteClass(id)
    setClasses((prev) => prev.filter((c) => c.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const toggleExpand = (id: string) => setExpandedId((prev) => (prev === id ? null : id))

  return (
    <div className="space-y-6">
      {/* Invite code modal */}
      <AnimatePresence>
        {newClass && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-700 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="font-heading text-xl font-extrabold text-gray-900 dark:text-white mb-1">
                Класс создан!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Поделись этим кодом с учениками
              </p>
              <div
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 mb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => handleCopy(newClass.inviteCode)}
              >
                <p className="text-3xl font-mono font-extrabold tracking-[0.3em] text-gray-900 dark:text-white">
                  {newClass.inviteCode}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {copied ? '✓ Скопировано!' : 'Нажми чтобы скопировать'}
                </p>
              </div>
              <p className="text-xs text-gray-400 mb-6">
                Класс: <span className="font-semibold text-gray-600 dark:text-gray-300">{newClass.name}</span>
              </p>
              <button
                onClick={() => setNewClass(null)}
                className="w-full py-2.5 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#3B5BDB' }}
              >
                Готово
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create form */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('admin.newClass', 'Новый класс')}</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder={t('admin.className', 'Название класса')}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder={t('admin.classDesc', 'Описание (необязательно)')}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleCreate}
            disabled={creating || !form.name.trim()}
            className="px-5 py-2 text-white rounded-xl font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#3B5BDB' }}
          >
            {creating ? t('admin.creating', 'Создание...') : t('admin.create', 'Создать')}
          </button>
        </div>
      </div>

      {/* Classes list */}
      {loading ? (
        <div className="py-8 text-center text-gray-400">{t('common.loading', 'Загрузка...')}</div>
      ) : classes.length === 0 ? (
        <div className="py-8 text-center text-gray-400">{t('admin.noClasses', 'Нет классов')}</div>
      ) : (
        <div className="space-y-3">
          {classes.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Class header row */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white">{c.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                      {c.inviteCode}
                    </span>
                    <button
                      onClick={() => handleCopy(c.inviteCode)}
                      className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Скопировать код"
                    >
                      📋
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleExpand(c.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      expandedId === c.id
                        ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    👥 Участники
                    <span className={`transition-transform duration-200 ${expandedId === c.id ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  <Link
                    to={`/class/${c.id}`}
                    className="text-xs text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors px-2"
                  >
                    Открыть →
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Members panel */}
              <AnimatePresence>
                {expandedId === c.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="border-t border-gray-100 dark:border-gray-700">
                      <MembersPanel classId={c.id} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Members panel ────────────────────────────────────────────────────────────

function MembersPanel({ classId }: { classId: string }) {
  const [members, setMembers] = useState<ClassMember[]>([])
  const [allUsers, setAllUsers] = useState<UserEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const { confirm } = useConfirmStore()

  useEffect(() => {
    Promise.all([
      getClassMembers(classId),
      listAllUsers(),
    ]).then(([m, u]) => {
      setMembers(m)
      setAllUsers(u.map((x) => ({ uid: x.uid, displayName: (x as UserEntry & UserRoleRecord).displayName ?? '', email: (x as UserEntry & UserRoleRecord).email ?? '' })))
    }).finally(() => setLoading(false))
  }, [classId])

  const memberUids = new Set(members.map((m) => m.uid))

  const filtered = allUsers.filter((u) => {
    if (memberUids.has(u.uid)) return false
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return u.displayName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  })

  const handleAdd = async (u: UserEntry) => {
    setAdding(true)
    try {
      await addMemberToClass(classId, u)
      setMembers((prev) => [...prev, { uid: u.uid, displayName: u.displayName, email: u.email, role: 'student', joinedAt: Date.now() }])
      setSearch('')
    } finally {
      setAdding(false)
    }
  }

  const handleRemove = async (member: ClassMember) => {
    const ok = await confirm({
      title: 'Удалить из класса?',
      message: `«${member.displayName || member.email}» будет удалён из этого класса.`,
      confirmLabel: 'Удалить',
      danger: true,
    })
    if (!ok) return
    await removeClassMember(classId, member.uid)
    setMembers((prev) => prev.filter((m) => m.uid !== member.uid))
  }

  if (loading) {
    return <div className="px-4 py-4 text-sm text-gray-400">Загрузка...</div>
  }

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Add member */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          Добавить участника
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 dark:text-white"
          />
        </div>

        {/* Search results dropdown */}
        {search.trim() && (
          <div className="mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-lg">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-400">Не найдено</div>
            ) : (
              filtered.slice(0, 20).map((u) => (
                <button
                  key={u.uid}
                  onClick={() => handleAdd(u)}
                  disabled={adding}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors disabled:opacity-50"
                >
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {u.displayName || '—'}
                    </span>
                    <span className="ml-2 text-gray-400 text-xs">{u.email}</span>
                  </div>
                  <span className="text-indigo-500 text-xs font-semibold ml-2 flex-shrink-0">+ Добавить</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Current members */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          Участники ({members.length})
        </p>
        {members.length === 0 ? (
          <p className="text-sm text-gray-400">Нет участников</p>
        ) : (
          <div className="space-y-1">
            {members.map((m) => (
              <div
                key={m.uid}
                className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="min-w-0">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {m.displayName || '—'}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">{m.email}</span>
                </div>
                <button
                  onClick={() => handleRemove(m)}
                  className="ml-2 flex-shrink-0 text-red-400 hover:text-red-600 transition-colors text-sm"
                  title="Удалить из класса"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
