import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getDynamicLessons, createDynamicLesson, deleteDynamicLesson } from '@/services/admin.service'
import { useAuthStore } from '@/store/useAuthStore'
import type { DynamicLesson } from '@/types/roles'

export default function LessonsTab() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [lessons, setLessons] = useState<DynamicLesson[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', content: '' })

  useEffect(() => {
    getDynamicLessons().then(setLessons).finally(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!user || !form.title.trim()) return
    setCreating(true)
    const lesson = await createDynamicLesson({ title: form.title, description: form.description, content: form.content, createdBy: user.uid })
    setLessons((prev) => [lesson, ...prev])
    setForm({ title: '', description: '', content: '' })
    setCreating(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.confirmDelete', 'Удалить урок?'))) return
    await deleteDynamicLesson(id)
    setLessons((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Create form */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('admin.newLesson', 'Новый урок')}</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder={t('admin.lessonTitle', 'Название урока')}
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder={t('admin.lessonDesc', 'Описание (необязательно)')}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
          <textarea
            placeholder={t('admin.lessonContent', 'Содержимое урока (markdown)...')}
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white resize-none"
          />
          <button
            onClick={handleCreate}
            disabled={creating || !form.title.trim()}
            className="px-5 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {creating ? t('admin.creating', 'Создание...') : t('admin.create', 'Создать')}
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="py-8 text-center text-gray-400">Загрузка...</div>
      ) : lessons.length === 0 ? (
        <div className="py-8 text-center text-gray-400">{t('admin.noLessons', 'Нет динамических уроков')}</div>
      ) : (
        <div className="space-y-3">
          {lessons.map((l) => (
            <div key={l.id} className="flex items-start justify-between gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{l.title}</p>
                {l.description && <p className="text-sm text-gray-500 dark:text-gray-400">{l.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(l.id)}
                className="text-red-400 hover:text-red-600 transition-colors text-sm"
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
