import { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/store/useAuthStore'
import { listAllUsers } from '@/services/role.service'

interface Submission {
  id: string
  studentId: string
  assignmentId: string
  answer?: string
  submittedAt: number
  grade?: number
  feedback?: string
}

export default function GradesTab() {
  const { user } = useAuthStore()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [assignmentTitles, setAssignmentTitles] = useState<Record<string, string>>({})
  const [studentNames, setStudentNames] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [localGrades, setLocalGrades] = useState<Record<string, { grade: string; feedback: string }>>({})

  useEffect(() => {
    async function load() {
      const [subSnap, asnSnap, users] = await Promise.all([
        getDocs(collection(db, 'submissions')),
        getDocs(collection(db, 'assignments')),
        listAllUsers(),
      ])

      const asnMap: Record<string, string> = {}
      asnSnap.docs.forEach((d) => { asnMap[d.id] = (d.data().title as string) ?? d.id })

      const nameMap: Record<string, string> = {}
      users.forEach((u) => { nameMap[u.uid] = u.displayName ?? u.email ?? u.uid })

      const subs = subSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Submission))

      const initial: Record<string, { grade: string; feedback: string }> = {}
      subs.forEach((s) => {
        initial[s.id] = { grade: s.grade != null ? String(s.grade) : '', feedback: s.feedback ?? '' }
      })

      setAssignmentTitles(asnMap)
      setStudentNames(nameMap)
      setSubmissions(subs)
      setLocalGrades(initial)
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async (id: string) => {
    if (!user) return
    setSaving(id)
    const g = localGrades[id]
    await updateDoc(doc(db, 'submissions', id), {
      grade: Number(g.grade) || 0,
      feedback: g.feedback,
      gradedBy: user.uid,
      gradedAt: Date.now(),
    })
    setSubmissions((prev) =>
      prev.map((s) => s.id === id ? { ...s, grade: Number(g.grade), feedback: g.feedback } : s)
    )
    setSaving(null)
  }

  if (loading) {
    return <div className="py-12 text-center text-gray-400">Загрузка...</div>
  }

  if (submissions.length === 0) {
    return <div className="py-12 text-center text-gray-400">Нет сданных работ</div>
  }

  return (
    <div className="space-y-3">
      {submissions.map((sub) => (
        <div
          key={sub.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white">
                {studentNames[sub.studentId] ?? sub.studentId}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {assignmentTitles[sub.assignmentId] ?? sub.assignmentId}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(sub.submittedAt).toLocaleDateString()}
              </p>
              {sub.answer && (
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg p-2 border border-gray-100 dark:border-gray-700 max-h-24 overflow-y-auto whitespace-pre-wrap">
                  {sub.answer}
                </p>
              )}
              {sub.grade != null && (
                <span className="inline-block mt-1 text-xs font-bold text-green-600 dark:text-green-400">
                  ✓ Оценка: {sub.grade}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:w-44 flex-shrink-0">
              <input
                type="number"
                min={0}
                max={100}
                placeholder="Оценка (0–100)"
                value={localGrades[sub.id]?.grade ?? ''}
                onChange={(e) =>
                  setLocalGrades((g) => ({ ...g, [sub.id]: { ...g[sub.id], grade: e.target.value } }))
                }
                className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Комментарий"
                value={localGrades[sub.id]?.feedback ?? ''}
                onChange={(e) =>
                  setLocalGrades((g) => ({ ...g, [sub.id]: { ...g[sub.id], feedback: e.target.value } }))
                }
                className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={() => handleSave(sub.id)}
                disabled={saving === sub.id}
                className="px-3 py-1.5 text-sm text-white rounded-lg font-semibold disabled:opacity-50 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#3B5BDB' }}
              >
                {saving === sub.id ? 'Сохранение...' : 'Сохранить оценку'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
