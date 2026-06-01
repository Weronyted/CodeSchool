import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { getClasses, createClass, deleteClass } from '@/services/admin.service'
import { useAuthStore } from '@/store/useAuthStore'
import { useConfirmStore } from '@/store/useConfirmStore'
import type { ClassGroup } from '@/types/roles'

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
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

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
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
            >
              <div>
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
              <div className="flex items-center gap-3">
                <Link
                  to={`/class/${c.id}`}
                  className="text-xs text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
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
          ))}
        </div>
      )}
    </div>
  )
}
