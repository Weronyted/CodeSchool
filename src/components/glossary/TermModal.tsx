import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, AlertCircle, Lightbulb, Link } from 'lucide-react'
import type { BilingualGlossaryTerm } from '@/types/glossary'
import TerminalAnim from './TerminalAnim'

interface Props {
  term: BilingualGlossaryTerm | null
  lang: 'ru' | 'en'
  onClose: () => void
}

const CATEGORY_COLORS: Record<string, string> = {
  HTML: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  CSS: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  JS: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
}

export default function TermModal({ term, lang, onClose }: Props) {
  useEffect(() => {
    if (!term) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [term, onClose])

  const t = (ru: string, en: string) => (lang === 'ru' ? ru : en)

  return (
    <AnimatePresence>
      {term && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key={term.id}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl
                       bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                       flex flex-col"
            style={{ height: 'calc(100vh - 32px)', maxHeight: '920px' }}
          >
            {/* ── Mobile header ────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700 shrink-0 sm:hidden">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[term.category]}`}>
                  {term.category}
                </span>
                <span className="font-heading font-bold text-gray-900 dark:text-white">
                  {lang === 'ru' ? term.term_ru : term.term_en}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Two-column body ───────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row flex-1 min-h-0 overflow-hidden">

              {/* LEFT: Terminal animation */}
              <div className="sm:w-[58%] shrink-0 sm:border-r border-b sm:border-b-0 border-gray-200 dark:border-gray-700 flex flex-col"
                   style={{ minHeight: '360px' }}
              >
                <TerminalAnim
                  key={term.id}
                  steps={term.demo.steps}
                  demoMode={term.demoMode}
                  lang={lang}
                />
              </div>

              {/* RIGHT: Theory */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">

                {/* Close button — desktop only */}
                <div className="hidden sm:flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[term.category]}`}>
                      {term.category}
                    </span>
                    <h2 className="font-heading font-extrabold text-2xl text-gray-900 dark:text-white">
                      {lang === 'ru' ? term.term_ru : term.term_en}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Definition */}
                <div className="flex gap-3">
                  <BookOpen size={16} className="text-primary dark:text-primary-dark shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                      {t('Определение', 'Definition')}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {lang === 'ru' ? term.definition_ru : term.definition_en}
                    </p>
                  </div>
                </div>

                {/* Why needed */}
                <div className="flex gap-3">
                  <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                      {t('Зачем нужно', 'Why it matters')}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {lang === 'ru' ? term.whyNeeded_ru : term.whyNeeded_en}
                    </p>
                  </div>
                </div>

                {/* Common mistake */}
                <div className="flex gap-3">
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                      {t('Типичная ошибка', 'Common mistake')}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {lang === 'ru' ? term.commonMistake_ru : term.commonMistake_en}
                    </p>
                  </div>
                </div>

                {/* Example */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                    {t('Пример', 'Example')}
                  </p>
                  <code className="block bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-xl text-sm font-mono leading-relaxed whitespace-pre-wrap">
                    {lang === 'ru' ? term.example_ru : term.example_en}
                  </code>
                </div>

                {/* Lesson link */}
                {term.topicSlug && (
                  <a
                    href={`/lessons/${term.topicSlug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-primary dark:text-primary-dark font-medium hover:underline"
                    onClick={onClose}
                  >
                    <Link size={13} />
                    {t('Подробнее в уроке →', 'Learn more in the lesson →')}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
