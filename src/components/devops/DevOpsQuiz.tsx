import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import confetti from 'canvas-confetti'
import type { QuizQuestion } from '@/types/lesson'
import { useDevOpsProgress } from '@/hooks/useDevOpsProgress'
import { DEVOPS_PASS_MARK } from '@/store/useDevOpsStore'
import { Glass, Magnetic, useLang } from './ui'

// A DevOps-flavoured quiz: same shape as the main course's LessonQuiz, but it
// writes to the DevOps store and reports its result as a CI job.

interface Props {
  slug: string
  questions: QuizQuestion[]
}

export function DevOpsQuiz({ slug, questions }: Props) {
  const lang = useLang()
  const { submitQuiz } = useDevOpsProgress(slug)
  const [current, setCurrent] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[current]
  const options = lang === 'ru' ? q.options_ru : q.options_en

  function choose(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === q.correctIndex) setCorrectCount((c) => c + 1)
  }

  function next() {
    const isLast = current === questions.length - 1
    if (!isLast) {
      setCurrent((c) => c + 1)
      setPicked(null)
      return
    }
    const score = Math.round((correctCount / questions.length) * 100)
    submitQuiz(slug, score)
    setDone(true)
    if (score >= DEVOPS_PASS_MARK) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.65 }, disableForReducedMotion: true })
    }
  }

  function retry() {
    setCurrent(0)
    setPicked(null)
    setCorrectCount(0)
    setDone(false)
  }

  if (done) {
    const score = Math.round((correctCount / questions.length) * 100)
    const ok = score >= DEVOPS_PASS_MARK
    return (
      <Glass className="p-5" accent={ok ? '#2F9E44' : '#F472B6'} style={{ background: 'rgba(6,8,16,0.7)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[2px] mb-3" style={{ color: ok ? '#2F9E44' : '#F472B6' }}>
          {ok
            ? lang === 'ru' ? 'job: quiz — успешно' : 'job: quiz — passed'
            : lang === 'ru' ? 'job: quiz — провален' : 'job: quiz — failed'}
        </div>
        <div className="flex items-end gap-3 mb-3">
          <span className="font-heading text-4xl font-extrabold" style={{ color: 'var(--text)' }}>{score}%</span>
          <span className="text-sm pb-1.5" style={{ color: 'var(--muted)' }}>
            {correctCount} / {questions.length}
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ background: ok ? 'linear-gradient(90deg,#2F9E44,#38BDF8)' : 'linear-gradient(90deg,#F472B6,#F08C00)' }}
          />
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
          {ok
            ? lang === 'ru'
              ? 'Проверка пройдена — следующий урок разблокирован.'
              : 'Check passed — the next lesson is unlocked.'
            : lang === 'ru'
              ? `Нужно минимум ${DEVOPS_PASS_MARK}%. Перечитай урок и перезапусти проверку.`
              : `You need at least ${DEVOPS_PASS_MARK}%. Re-read the lesson and re-run the check.`}
        </p>
        <Magnetic
          strength={6}
          onClick={retry}
          className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        >
          <RotateCcw size={12} />
          {lang === 'ru' ? 'Перезапустить' : 'Re-run'}
        </Magnetic>
      </Glass>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${((current + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }}
            style={{ background: 'linear-gradient(90deg,#4361EE,#38BDF8)' }}
          />
        </div>
        <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
          {current + 1}/{questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.18 }}
        >
          <p className="text-base font-semibold mb-4" style={{ color: 'var(--text)' }}>
            {lang === 'ru' ? q.text_ru : q.text_en}
          </p>

          <div className="space-y-2">
            {options.map((opt, i) => {
              const isCorrect = i === q.correctIndex
              const isPicked = picked === i
              const reveal = picked !== null
              const border = reveal && isCorrect
                ? '#2F9E44'
                : reveal && isPicked ? '#F472B6' : 'var(--border)'
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={reveal}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm flex items-center gap-3 transition-all"
                  style={{
                    background: reveal && isCorrect ? 'rgba(47,158,68,0.1)' : 'var(--surface)',
                    border: `1px solid ${border}`,
                    color: 'var(--text)',
                  }}
                  onMouseEnter={(e) => { if (!reveal) e.currentTarget.style.borderColor = 'rgba(107,139,255,0.4)' }}
                  onMouseLeave={(e) => { if (!reveal) e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <span className="font-mono text-[10px] w-5 flex-shrink-0" style={{ color: 'var(--muted)' }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {reveal && isCorrect && <CheckCircle2 size={15} style={{ color: '#2F9E44' }} />}
                  {reveal && isPicked && !isCorrect && <XCircle size={15} style={{ color: '#F472B6' }} />}
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {picked !== null && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="overflow-hidden"
              >
                <p className="text-xs leading-relaxed mt-4 mb-4" style={{ color: 'var(--muted)' }}>
                  {lang === 'ru' ? q.explanation_ru : q.explanation_en}
                </p>
                <Magnetic
                  strength={7}
                  onClick={next}
                  className="px-4 py-2 rounded-xl text-xs font-semibold btn-sheen"
                  style={{ background: 'linear-gradient(90deg,#4361EE,#38BDF8)', color: '#fff' }}
                >
                  {current === questions.length - 1
                    ? lang === 'ru' ? 'Завершить проверку' : 'Finish check'
                    : lang === 'ru' ? 'Дальше' : 'Next'}
                </Magnetic>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
