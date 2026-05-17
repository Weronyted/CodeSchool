import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useProgress } from '@/hooks/useProgress'
import type { QuizQuestion } from '@/types/lesson'
import confetti from 'canvas-confetti'

interface LessonQuizProps {
  questions: QuizQuestion[]
  topicSlug: string
  onNext?: () => void
}

function ScoreBar({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / total) * 100)
  const { language } = useLanguageStore()
  const isPerfect = score === total
  const isGood = pct >= 60

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-heading text-3xl font-extrabold text-gray-900 dark:text-white">
            {pct}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {score} / {total} {language === 'ru' ? 'правильных ответов' : 'correct answers'}
          </p>
        </div>
        <span className="text-4xl">
          {isPerfect ? '🏆' : isGood ? '🎉' : '💪'}
        </span>
      </div>

      <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isPerfect ? 'bg-yellow-400' : isGood ? 'bg-green-500' : 'bg-primary-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      </div>

      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {isPerfect
          ? (language === 'ru' ? 'Идеально! Ты знаешь этот урок отлично 🌟' : 'Perfect! You know this lesson perfectly 🌟')
          : isGood
            ? (language === 'ru' ? 'Отлично! Можно двигаться дальше.' : 'Great! You can move on.')
            : (language === 'ru' ? 'Попробуй ещё раз — у тебя получится!' : 'Try again — you can do it!')}
      </p>
    </div>
  )
}

export function LessonQuiz({ questions, topicSlug, onNext }: LessonQuizProps) {
  const { language } = useLanguageStore()
  const { updateQuizScore } = useProgress(topicSlug)
  const [selected, setSelected] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const allAnswered = questions.every((q) => selected[q.id] !== undefined)
  const correctCount = questions.filter((q) => selected[q.id] === q.correctIndex).length

  function submit() {
    setSubmitted(true)
    const score = Math.round((correctCount / questions.length) * 100)
    updateQuizScore(topicSlug, score)
    setTimeout(() => {
      setShowResult(true)
      if (correctCount === questions.length) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
      }
    }, 600)
  }

  function retry() {
    setSelected({})
    setSubmitted(false)
    setShowResult(false)
  }

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <ScoreBar score={correctCount} total={questions.length} />

        {/* Review */}
        <div className="space-y-3">
          {questions.map((q) => {
            const isCorrect = selected[q.id] === q.correctIndex
            const text = language === 'ru' ? q.text_ru : q.text_en
            const correctOpt = language === 'ru' ? q.options_ru[q.correctIndex] : q.options_en[q.correctIndex]
            const yourOpt = selected[q.id] !== undefined
              ? (language === 'ru' ? q.options_ru[selected[q.id]] : q.options_en[selected[q.id]])
              : '—'
            const explanation = language === 'ru' ? q.explanation_ru : q.explanation_en

            return (
              <div
                key={q.id}
                className={`rounded-xl border p-4 ${
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex gap-2.5">
                  {isCorrect
                    ? <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    : <XCircle size={16} className="text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{text}</p>
                    {!isCorrect && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {language === 'ru' ? 'Твой ответ' : 'Your answer'}: {yourOpt}
                      </p>
                    )}
                    <p className={`text-xs font-medium ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      {isCorrect
                        ? (language === 'ru' ? '✓ Правильно!' : '✓ Correct!')
                        : `${language === 'ru' ? 'Правильно' : 'Correct'}: ${correctOpt}`}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">{explanation}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={retry} className="gap-2">
            <RotateCcw size={14} />
            {language === 'ru' ? 'Попробовать снова' : 'Try again'}
          </Button>
          {onNext && (
            <Button size="sm" onClick={onNext} className="gap-2 ml-auto">
              {language === 'ru' ? 'Следующий урок' : 'Next lesson'}
              <ChevronRight size={14} />
            </Button>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => {
        const text = language === 'ru' ? q.text_ru : q.text_en
        const options = language === 'ru' ? q.options_ru : q.options_en

        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qi * 0.05 }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {qi + 1}. {text}
              </p>
            </div>
            <div className="p-3 grid sm:grid-cols-2 gap-2">
              {options.map((opt, oi) => {
                const isSelected = selected[q.id] === oi
                const isCorrect = submitted && oi === q.correctIndex
                const isWrong = submitted && isSelected && oi !== q.correctIndex

                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => !submitted && setSelected((s) => ({ ...s, [q.id]: oi }))}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left transition-all border ${
                      isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300'
                        : isWrong
                          ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400'
                          : isSelected
                            ? 'bg-primary/10 dark:bg-primary-dark/20 border-primary/40 dark:border-primary-dark/40 text-primary dark:text-primary-dark'
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

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800">
                    <p className="text-xs text-blue-700 dark:text-blue-300 italic">
                      {language === 'ru' ? q.explanation_ru : q.explanation_en}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      <Button
        onClick={submit}
        disabled={!allAnswered}
        className="w-full"
      >
        {language === 'ru' ? 'Проверить ответы' : 'Check answers'}
      </Button>
    </div>
  )
}
