import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getAssignments, createAssignment, deleteAssignment } from '@/services/admin.service'
import { useAuthStore } from '@/store/useAuthStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'
import type { Assignment } from '@/types/roles'
import { PRESET_ASSIGNMENTS } from '@/data/presetAssignments'

export default function AssignmentsTab() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [seedingIndex, setSeedingIndex] = useState<number | null>(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    lessonSlug: '',
    type: 'quiz' as 'quiz' | 'code' | 'text',
    dueDate: '',
  })

  useEffect(() => {
    if (!user) return
    getAssignments(user.uid).then(setAssignments).finally(() => setLoading(false))
  }, [user])

  const handleCreate = async () => {
    if (!user || !form.title.trim()) return
    setCreating(true)
    const newAssignment = await createAssignment({
      title: form.title,
      description: form.description,
      lessonSlug: form.lessonSlug || undefined,
      type: form.type,
      teacherId: user.uid,
    })
    setAssignments((prev) => [newAssignment, ...prev])
    setForm({ title: '', description: '', lessonSlug: '', type: 'quiz', dueDate: '' })
    setCreating(false)
  }

  const handleSeedPreset = async (index: number) => {
    if (!user) return
    setSeedingIndex(index)
    try {
      const preset = PRESET_ASSIGNMENTS[index]
      const newAssignment = await createAssignment({
        title: preset.title,
        description: preset.description,
        type: preset.type,
        ...(preset.questions  ? { questions: preset.questions }   : {}),
        ...(preset.maxScore   ? { maxScore:  preset.maxScore }     : {}),
        ...(preset.starterHtml ? { starterHtml: preset.starterHtml } : {}),
        ...(preset.starterCss  ? { starterCss:  preset.starterCss  } : {}),
        teacherId: user.uid,
      })
      setAssignments((prev) => [newAssignment, ...prev])
    } catch (err) {
      console.error('Ошибка при создании задания:', err)
      alert('Не удалось создать задание. Проверь консоль.')
    } finally {
      setSeedingIndex(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.confirmDeleteAssignment', 'Удалить задание?'))) return
    await deleteAssignment(id)
    setAssignments((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-6">

      {/* ── Готовые задания ─────────────────────────────────────────── */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
          ⚡ Готовые задания
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
          Создай задание в один клик — вопросы уже написаны
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRESET_ASSIGNMENTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSeedPreset(idx)}
              disabled={seedingIndex !== null}
              className="flex flex-col items-start gap-1 px-4 py-3 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all disabled:opacity-50 text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                {seedingIndex === idx ? 'Создание...' : preset.title}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {preset.description}
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                {preset.type === 'quiz'
                  ? `${preset.questions!.length} вопросов · ${preset.maxScore} баллов`
                  : '📝 Код — HTML/CSS'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Новое задание вручную ────────────────────────────────────── */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('admin.newAssignment', 'Новое задание')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder={t('admin.assignmentTitle', 'Название задания')}
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder={t('admin.assignmentDesc', 'Описание задания')}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="sm:col-span-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
          />
          <select
            value={form.lessonSlug}
            onChange={(e) => setForm((f) => ({ ...f, lessonSlug: e.target.value }))}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
          >
            <option value="">{t('admin.pickLesson', 'Выбери урок (необязательно)')}</option>
            {LESSON_SLUGS.map((s) => (
              <option key={s} value={s}>{LESSON_META[s].icon} {LESSON_META[s].title}</option>
            ))}
          </select>
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as typeof form.type }))}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
          >
            <option value="quiz">{t('admin.typeQuiz', 'Тест')}</option>
            <option value="code">{t('admin.typeCode', 'Код')}</option>
            <option value="text">{t('admin.typeText', 'Текстовый ответ')}</option>
          </select>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating || !form.title.trim()}
          className="mt-3 px-5 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {creating ? t('admin.creating', 'Создание...') : t('admin.create', 'Создать')}
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-gray-400">Загрузка...</div>
      ) : assignments.length === 0 ? (
        <div className="py-8 text-center text-gray-400">{t('admin.noAssignments', 'Нет заданий')}</div>
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => (
            <div key={a.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{a.title}</p>
                <div className="flex gap-2 mt-1">
                  {a.lessonSlug && (
                    <span className="text-xs text-primary-600 dark:text-primary-400">{a.lessonSlug}</span>
                  )}
                  <span className="text-xs text-gray-400">{a.type}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
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
