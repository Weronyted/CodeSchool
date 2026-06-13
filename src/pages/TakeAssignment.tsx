import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { submitAssignment as submitTextAssignment } from '@/services/admin.service'
import { submitAssignment as submitQuizAssignment } from '@/services/submission.service'
import { useAuthStore } from '@/store/useAuthStore'
import type { Assignment } from '@/types/roles'
import { CodeRunner } from '@/components/code/CodeRunner'

export default function TakeAssignment() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user } = useAuthStore()

  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState(true)
  const [answer, setAnswer] = useState('')
  const [codeAnswer, setCodeAnswer] = useState({ html: '', css: '', js: '' })
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState<{ score: number; maxScore: number } | null>(null)

  useEffect(() => {
    if (!id) return
    getDoc(doc(db, 'assignments', id)).then((snap) => {
      if (snap.exists()) setAssignment({ id: snap.id, ...snap.data() } as Assignment)
    }).finally(() => setLoading(false))
  }, [id])

  const isQuizWithQuestions =
    assignment?.type === 'quiz' && assignment.questions && assignment.questions.length > 0

  const allQuestionsAnswered =
    isQuizWithQuestions &&
    assignment!.questions!.every((q) => selectedAnswers[q.id] !== undefined)

  const handleQuizSubmit = async () => {
    if (!user || !id || !assignment?.questions) return
    setSubmitting(true)

    try {
      let score = 0
      const maxScore = assignment.questions.reduce((sum, q) => sum + q.points, 0)

      assignment.questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          score += q.points
        }
      })

      await submitQuizAssignment({
        userId: user.uid,
        studentId: user.uid,
        displayName: user.displayName ?? user.email ?? 'Ученик',
        assignmentId: id,
        answers: selectedAnswers,
        score,
        maxScore,
        percentage: Math.round((score / maxScore) * 100),
        submittedAt: Date.now(),
      } as any)

      setQuizScore({ score, maxScore })
      setSubmitted(true)
    } catch (err) {
      console.error('Ошибка при сдаче задания:', err)
      alert('Не удалось отправить задание. Попробуй ещё раз.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleTextSubmit = async () => {
    if (!user || !id || !answer.trim()) return
    setSubmitting(true)
    await submitTextAssignment(id, user.uid, answer, {
      displayName: user.displayName ?? user.email ?? 'Ученик',
    })
    setSubmitted(true)
    setSubmitting(false)
  }

  const isHtmlCode = assignment?.type === 'code' && assignment.starterHtml != null
  const hasCode = isHtmlCode
    ? codeAnswer.html.trim().length > 0
    : codeAnswer.js.trim().length > 0

  const handleCodeSubmit = async () => {
    if (!user || !id) return
    setSubmitting(true)
    try {
      const combined = isHtmlCode
        ? `<!-- HTML -->\n${codeAnswer.html}\n\n/* CSS */\n${codeAnswer.css}`
        : codeAnswer.js
      await submitTextAssignment(id, user.uid, combined, {
        displayName: user.displayName ?? user.email ?? 'Ученик',
        ...(isHtmlCode ? { answerHtml: codeAnswer.html, answerCss: codeAnswer.css } : {}),
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Ошибка при сдаче задания:', err)
      alert('Не удалось отправить задание. Попробуй ещё раз.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-4xl animate-pulse">📚</div>
  if (!assignment) return <div className="min-h-screen flex items-center justify-center text-gray-500">Задание не найдено</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          <button
            onClick={() => navigate('/assignments')}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
          >
            ← {t('assignments.back', 'Назад к заданиям')}
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6">
            <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">{assignment.title}</h1>
            {assignment.description && (
              <p className="text-gray-600 dark:text-gray-400">{assignment.description}</p>
            )}
          </div>

          {submitted ? (
            <motion.div
              className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border border-green-100 dark:border-green-800 text-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-heading font-bold text-xl text-green-800 dark:text-green-300 mb-2">
                {t('assignments.submitted', 'Задание сдано!')}
              </h2>
              {quizScore ? (
                <div className="mt-4">
                  <p className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-1">
                    {quizScore.score} / {quizScore.maxScore}
                  </p>
                  <p className="text-green-600 dark:text-green-500 text-lg">
                    {Math.round((quizScore.score / quizScore.maxScore) * 100)}%
                  </p>
                </div>
              ) : (
                <p className="text-green-700 dark:text-green-400">
                  {t('assignments.submittedDesc', 'Учитель проверит твоё задание.')}
                </p>
              )}
            </motion.div>
          ) : isQuizWithQuestions ? (
            // ── Quiz with questions ──────────────────────────────────────────
            <div className="space-y-5">
              {assignment.questions!.map((q, idx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <p className="font-semibold text-gray-900 dark:text-white mb-4">
                    <span className="text-primary-500 mr-2">{idx + 1}.</span>
                    {q.text}
                  </p>
                  <div className="space-y-2">
                    {q.options?.map((option, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === String(optIdx)
                      return (
                        <button
                          key={optIdx}
                          onClick={() =>
                            setSelectedAnswers((prev) => ({ ...prev, [q.id]: String(optIdx) }))
                          }
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                              : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border mr-3 text-xs font-bold ${
                            isSelected
                              ? 'border-primary-500 bg-primary-500 text-white'
                              : 'border-gray-300 dark:border-gray-600 text-gray-400'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              ))}

              <div className="text-sm text-gray-400 text-center">
                Отвечено: {Object.keys(selectedAnswers).length} / {assignment.questions!.length}
              </div>

              <button
                onClick={handleQuizSubmit}
                disabled={submitting || !allQuestionsAnswered}
                className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {submitting
                  ? t('assignments.submitting', 'Отправка...')
                  : t('assignments.submit', 'Сдать задание')}
              </button>
            </div>
          ) : (
            // ── Text or code answer ──────────────────────────────────────────
            <>
              {assignment.type === 'code' ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {t('assignments.writeCode', 'Напиши код')}
                    </h2>
                  </div>
                  {assignment.starterHtml != null ? (
                    <CodeRunner
                      initialHtml={assignment.starterHtml}
                      initialCss={assignment.starterCss ?? ''}
                      mode="html"
                      onCodeChange={setCodeAnswer}
                    />
                  ) : (
                    <CodeRunner
                      initialJs={answer || '// Напиши свой код здесь\n'}
                      mode="js"
                      onCodeChange={setCodeAnswer}
                    />
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6">
                  <label className="block font-semibold text-gray-900 dark:text-white mb-3">
                    {t('assignments.yourAnswer', 'Твой ответ')}
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={6}
                    placeholder={t('assignments.answerPlaceholder', 'Напиши ответ...')}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>
              )}

              {assignment.type === 'code' ? (
                <button
                  onClick={handleCodeSubmit}
                  disabled={submitting || !hasCode}
                  className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? t('assignments.submitting', 'Отправка...') : t('assignments.submit', 'Сдать задание')}
                </button>
              ) : (
                <button
                  onClick={handleTextSubmit}
                  disabled={submitting || !answer.trim()}
                  className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? t('assignments.submitting', 'Отправка...') : t('assignments.submit', 'Сдать задание')}
                </button>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
