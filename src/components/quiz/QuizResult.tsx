import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { scoreVariant } from '@/utils/formatScore'

interface AnswerReview {
  question: string
  yourAnswer: string
  correctAnswer: string
  correct: boolean
}

interface QuizResultProps {
  score: number
  total: number
  reviews?: AnswerReview[]
  onRetry: () => void
  onNext?: () => void
}

export function QuizResult({ score, total, reviews, onRetry, onNext }: QuizResultProps) {
  const { t } = useTranslation()
  const percent = total > 0 ? Math.round((score / total) * 100) : 0

  useEffect(() => {
    if (percent >= 80) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#3B5BDB', '#7950F2', '#2F9E44'] })
    }
  }, [percent])

  const message = percent === 100 ? t('quiz.perfect') : percent >= 80 ? t('quiz.great') : percent >= 60 ? t('quiz.good') : t('quiz.keepTrying')

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 py-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative w-24 h-24"
        >
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-200 dark:text-slate-700" />
            <motion.circle
              cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeDasharray="100" strokeLinecap="round"
              className={scoreVariant(percent) === 'success' ? 'text-success' : scoreVariant(percent) === 'warning' ? 'text-warning' : 'text-danger'}
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - percent }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">{percent}%</span>
          </div>
        </motion.div>

        <Badge variant={scoreVariant(percent)} className="text-sm px-3 py-1">
          {t('quiz.score', { correct: score, total, percent })}
        </Badge>
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center max-w-xs">{message}</p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RotateCcw size={14} /> {t('quiz.tryAgain')}
        </Button>
        {onNext && (
          <Button onClick={onNext} className="gap-2">
            {t('quiz.nextTopic')} <ArrowRight size={14} />
          </Button>
        )}
      </div>

      {reviews && reviews.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-sm text-slate-900 dark:text-white">{t('quiz.answerReview')}</h3>
          {reviews.map((r, i) => (
            <div key={i} className={`rounded-xl p-4 border ${r.correct ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
              <div className="flex items-start gap-2 mb-2">
                {r.correct ? <CheckCircle2 size={16} className="text-success flex-shrink-0 mt-0.5" /> : <XCircle size={16} className="text-danger flex-shrink-0 mt-0.5" />}
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{r.question}</p>
              </div>
              {!r.correct && (
                <div className="ml-6 space-y-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400"><span className="font-medium">{t('quiz.yourAnswer')}</span> {r.yourAnswer}</p>
                  <p className="text-xs text-success font-medium"><span>{t('quiz.correctAnswer')}</span> {r.correctAnswer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
