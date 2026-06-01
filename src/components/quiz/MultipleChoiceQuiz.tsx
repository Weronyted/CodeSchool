import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { QuizResult } from './QuizResult'
import { useProgress } from '@/hooks/useProgress'
import type { MultipleChoiceRow } from '@/types/lesson'

interface MultipleChoiceQuizProps {
  rows: MultipleChoiceRow[]
  topicSlug: string
  scenario?: string
  onNext?: () => void
}

export function MultipleChoiceQuiz({ rows, topicSlug, scenario, onNext }: MultipleChoiceQuizProps) {
  const { t } = useTranslation()
  const { updateQuizScore } = useProgress(topicSlug)
  const [selected, setSelected] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const allAnswered = rows.every((r) => selected[r.id] !== undefined)

  function submit() {
    setSubmitted(true)
    const correct = rows.filter((r) => selected[r.id] === r.correctIndex).length
    const score = Math.round((correct / rows.length) * 100)
    updateQuizScore(topicSlug, score)
    setShowResult(true)
  }

  function retry() {
    setSelected({})
    setSubmitted(false)
    setShowResult(false)
  }

  if (showResult) {
    const correctCount = rows.filter((r) => selected[r.id] === r.correctIndex).length
    const reviews = rows.map((r) => ({
      question: r.question,
      yourAnswer: selected[r.id] !== undefined ? r.options[selected[r.id]] : '—',
      correctAnswer: r.options[r.correctIndex],
      correct: selected[r.id] === r.correctIndex,
    }))
    return <QuizResult score={correctCount} total={rows.length} reviews={reviews} onRetry={retry} onNext={onNext} />
  }

  return (
    <div className="space-y-5">
      {scenario && (
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300">{scenario}</p>
        </div>
      )}

      {rows.map((row, qi) => (
        <motion.div
          key={row.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: qi * 0.05 }}
          className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {t('quiz.question')} {qi + 1}. {row.question}
            </p>
          </div>
          <div className="p-3 grid sm:grid-cols-2 gap-2">
            {row.options.map((opt, oi) => {
              const isSelected = selected[row.id] === oi
              const isCorrect = submitted && oi === row.correctIndex
              const isWrong = submitted && isSelected && oi !== row.correctIndex
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => !submitted && setSelected((s) => ({ ...s, [row.id]: oi }))}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left transition-all border ${
                    isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300'
                    : isWrong ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400'
                    : isSelected ? 'bg-primary/10 dark:bg-primary-dark/20 border-primary/40 dark:border-primary-dark/40 text-primary dark:text-primary-dark'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-primary/30 dark:hover:border-primary-dark/30 hover:bg-primary/5 dark:hover:bg-primary-dark/5'
                  }`}
                >
                  {submitted && isCorrect && <CheckCircle2 size={14} className="text-success flex-shrink-0" />}
                  {submitted && isWrong && <XCircle size={14} className="text-danger flex-shrink-0" />}
                  <span>{opt}</span>
                </button>
              )
            })}
          </div>
        </motion.div>
      ))}

      <Button onClick={submit} disabled={!allAnswered} className="w-full">
        {t('quiz.submit')}
      </Button>
    </div>
  )
}
