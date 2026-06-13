import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/store/useAuthStore'
import { listAllUsers } from '@/services/role.service'
import type { Assignment } from '@/types/roles'

interface Submission {
  id: string
  studentId?: string  // text / code submissions
  userId?: string     // quiz submissions
  displayName?: string
  assignmentId: string
  answer?: string                    // text / code (combined)
  answerHtml?: string                // code submissions
  answerCss?: string                 // code submissions
  answers?: Record<string, string>   // quiz: questionId -> selected option index
  score?: number
  maxScore?: number
  percentage?: number
  submittedAt: number
  grade?: number
  feedback?: string
}

export default function GradesTab() {
  const { user } = useAuthStore()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [assignments, setAssignments] = useState<Record<string, Assignment>>({})
  const [studentNames, setStudentNames] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [localGrades, setLocalGrades] = useState<Record<string, { grade: string; feedback: string }>>({})
  const [expanded, setExpanded] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filterAssignment, setFilterAssignment] = useState('')

  useEffect(() => {
    async function load() {
      const [subSnap, asnSnap, users] = await Promise.all([
        getDocs(collection(db, 'submissions')),
        getDocs(collection(db, 'assignments')),
        listAllUsers(),
      ])

      const asnMap: Record<string, Assignment> = {}
      asnSnap.docs.forEach((d) => { asnMap[d.id] = { id: d.id, ...d.data() } as Assignment })

      const nameMap: Record<string, string> = {}
      users.forEach((u) => { nameMap[u.uid] = u.displayName ?? u.email ?? u.uid })

      const subs = subSnap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Submission))
        .sort((a, b) => b.submittedAt - a.submittedAt)

      const initial: Record<string, { grade: string; feedback: string }> = {}
      subs.forEach((s) => {
        initial[s.id] = { grade: s.grade != null ? String(s.grade) : '', feedback: s.feedback ?? '' }
      })

      setAssignments(asnMap)
      setStudentNames(nameMap)
      setSubmissions(subs)
      setLocalGrades(initial)
      setLoading(false)
    }
    load()
  }, [])

  const studentNameOf = (sub: Submission) =>
    sub.displayName
    ?? studentNames[sub.userId ?? sub.studentId ?? '']
    ?? sub.userId ?? sub.studentId ?? '—'

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return submissions.filter((s) => {
      if (filterAssignment && s.assignmentId !== filterAssignment) return false
      if (!q) return true
      const name = studentNameOf(s).toLowerCase()
      const title = (assignments[s.assignmentId]?.title ?? '').toLowerCase()
      return name.includes(q) || title.includes(q)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissions, search, filterAssignment, assignments, studentNames])

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
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Поиск по ученику или заданию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={filterAssignment}
          onChange={(e) => setFilterAssignment(e.target.value)}
          className="px-4 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Все задания</option>
          {Object.values(assignments).map((a) => (
            <option key={a.id} value={a.id}>{a.title}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-gray-400">Ничего не найдено</div>
      ) : (
        filtered.map((sub) => {
          const assignment = assignments[sub.assignmentId]
          const isExpanded = expanded === sub.id
          const hasDetail =
            (assignment?.questions && assignment.questions.length > 0 && sub.answers) ||
            sub.answerHtml != null || (sub.answer && sub.answer.trim().length > 0)

          return (
            <div
              key={sub.id}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {studentNameOf(sub)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {assignment?.title ?? sub.assignmentId}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(sub.submittedAt).toLocaleString('ru-RU')}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {sub.score != null && sub.maxScore != null && (
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        🎯 {sub.score} / {sub.maxScore} ({sub.percentage}%)
                      </span>
                    )}
                    {sub.answerHtml != null && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium">
                        💻 Код
                      </span>
                    )}
                    {sub.grade != null && (
                      <span className="text-xs font-bold text-green-600 dark:text-green-400">
                        ✓ Оценка: {sub.grade}
                      </span>
                    )}
                    {hasDetail && (
                      <button
                        onClick={() => setExpanded(isExpanded ? null : sub.id)}
                        className="text-xs font-medium text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                      >
                        {isExpanded ? '▴ Скрыть ответы' : '▾ Посмотреть ответы'}
                      </button>
                    )}
                  </div>
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

              {/* Detail */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                      {assignment?.questions && assignment.questions.length > 0 && sub.answers ? (
                        <QuizDetail assignment={assignment} answers={sub.answers} />
                      ) : sub.answerHtml != null ? (
                        <CodeDetail html={sub.answerHtml} css={sub.answerCss} />
                      ) : sub.answer ? (
                        <pre className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 whitespace-pre-wrap break-words">
                          {sub.answer}
                        </pre>
                      ) : (
                        <p className="text-sm text-gray-400">Нет данных для отображения</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })
      )}
    </div>
  )
}

// ─── Quiz detail: per-question chosen vs correct ──────────────────────────────

function QuizDetail({ assignment, answers }: { assignment: Assignment; answers: Record<string, string> }) {
  return (
    <div className="space-y-4">
      {assignment.questions!.map((q, idx) => {
        const selected = answers[q.id]              // selected option index (string)
        const correct = q.correctAnswer             // correct option index (string)
        const isCorrect = selected === correct
        return (
          <div key={q.id}>
            <p className="font-medium text-sm text-gray-900 dark:text-white mb-2 flex items-start gap-2">
              <span className="text-gray-400">{idx + 1}.</span>
              <span>{q.text}</span>
              <span className={`ml-auto flex-shrink-0 text-xs font-bold ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {isCorrect ? '✓ верно' : '✗ неверно'}
              </span>
            </p>
            <div className="space-y-1.5 ml-5">
              {q.options?.map((opt, optIdx) => {
                const isSel = selected === String(optIdx)
                const isCor = correct === String(optIdx)
                let cls = 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                if (isCor) cls = 'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                else if (isSel) cls = 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                return (
                  <div
                    key={optIdx}
                    className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border ${cls}`}
                  >
                    <span className="font-mono font-bold text-xs w-4">{String.fromCharCode(65 + optIdx)}</span>
                    <span className="flex-1">{opt}</span>
                    {isSel && <span className="text-xs font-semibold">выбрал ученик</span>}
                    {isCor && !isSel && <span className="text-xs font-semibold">правильный ответ</span>}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Code detail: submitted HTML/CSS ──────────────────────────────────────────

function CodeDetail({ html, css }: { html: string; css?: string }) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 mb-1">HTML</p>
        <pre className="text-xs text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
          {html || '(пусто)'}
        </pre>
      </div>
      {css != null && css.trim().length > 0 && (
        <div>
          <p className="text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 mb-1">CSS</p>
          <pre className="text-xs text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
            {css}
          </pre>
        </div>
      )}
      {/* Live preview */}
      <div>
        <p className="text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 mb-1">Предпросмотр</p>
        <iframe
          title="submission-preview"
          sandbox="allow-scripts"
          className="w-full h-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white"
          srcDoc={`<style>${css ?? ''}</style>${html}`}
        />
      </div>
    </div>
  )
}
