import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getClasses, createClass, deleteClass } from '@/services/admin.service'
import { useAuthStore } from '@/store/useAuthStore'
import type { ClassGroup } from '@/types/roles'

export default function ClassesTab() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [classes, setClasses] = useState<ClassGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ name: '', description: '' })

  useEffect(() => {
    getClasses().then(setClasses).finally(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!user || !form.name.trim()) return
    setCreating(true)
    const newClass = await createClass({ ...form, teacherId: user.uid })
    setClasses((prev) => [newClass, ...prev])
    setForm({ name: '', description: '' })
    setCreating(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.confirmDeleteClass', 'Удалить класс?'))) return
    await deleteClass(id)
    setClasses((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('admin.newClass', 'Новый класс')}</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder={t('admin.className', 'Название класса')}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder={t('admin.classDesc', 'Описание (необязательно)')}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleCreate}
            disabled={creating || !form.name.trim()}
            className="px-5 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {creating ? t('admin.creating', 'Создание...') : t('admin.create', 'Создать')}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-gray-400">Загрузка...</div>
      ) : classes.length === 0 ? (
        <div className="py-8 text-center text-gray-400">{t('admin.noClasses', 'Нет классов')}</div>
      ) : (
        <div className="space-y-3">
          {classes.map((c) => (
            <div key={c.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{c.name}</p>
                <p className="text-xs font-mono text-primary-600 dark:text-primary-400 mt-0.5">{c.inviteCode}</p>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
