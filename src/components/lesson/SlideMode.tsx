import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Lightbulb, Code2, BookOpen, Zap, Sparkles } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { html as htmlLang } from '@codemirror/lang-html'
import { css as cssLang } from '@codemirror/lang-css'
import { javascript as jsLang } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { useLanguageStore } from '@/store/useLanguageStore'
import type { Slide } from '@/types/lesson'

interface SlideModeProps {
  slides: Slide[]
  lessonTitle: string
  onClose: () => void
  onGoToPractice: () => void
}

const SLIDE_ICONS: Record<string, React.ElementType> = {
  title: Sparkles,
  analogy: BookOpen,
  concept: Zap,
  code: Code2,
  tip: Lightbulb,
  'practice-cta': Sparkles,
}

const SLIDE_ACCENT: Record<string, string> = {
  title: 'from-primary-600 to-secondary-600',
  analogy: 'from-amber-500 to-orange-500',
  concept: 'from-blue-500 to-cyan-500',
  code: 'from-slate-600 to-slate-800',
  tip: 'from-amber-400 to-yellow-500',
  'practice-cta': 'from-green-500 to-emerald-600',
}

function CodeBlock({ code, lang = 'html' }: { code: string; lang?: 'html' | 'css' | 'javascript' }) {
  const ext = lang === 'css' ? [cssLang()] : lang === 'javascript' ? [jsLang()] : [htmlLang()]
  return (
    <div className="rounded-xl overflow-hidden border border-white/20 text-sm mt-4">
      <CodeMirror
        value={code.trim()}
        extensions={ext}
        theme={oneDark}
        editable={false}
        basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLineGutter: false }}
      />
    </div>
  )
}

export function SlideMode({ slides, lessonTitle, onClose, onGoToPractice }: SlideModeProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const { language } = useLanguageStore()

  const slide = slides[current]
  const isFirst = current === 0
  const isLast = current === slides.length - 1
  const isCta = slide.type === 'practice-cta'

  const goTo = useCallback((index: number, dir: 1 | -1) => {
    if (index < 0 || index >= slides.length) return
    setDirection(dir)
    setCurrent(index)
  }, [slides.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1, 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(current - 1, -1)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, goTo, onClose])

  const SlideIcon = SLIDE_ICONS[slide.type] ?? Zap
  const accent = SLIDE_ACCENT[slide.type] ?? 'from-primary-600 to-secondary-600'

  const title = language === 'ru' ? slide.title_ru : slide.title_en
  const body = language === 'ru' ? slide.body_ru : slide.body_en

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
        <span className="text-white/60 text-sm font-medium truncate max-w-[50%]">{lessonTitle}</span>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-white'
                  : i < current
                    ? 'w-2 h-2 bg-white/40'
                    : 'w-2 h-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white/40 text-xs">
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Slide area */}
      <div className="flex-1 overflow-hidden relative flex items-center justify-center px-6 py-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.8 }}
            className="w-full max-w-2xl"
          >
            {/* Card */}
            <div className="bg-gray-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Colored top strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />

              <div className="p-8 sm:p-10">
                {/* Icon + type label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center flex-shrink-0`}>
                    <SlideIcon size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                    {slide.type === 'practice-cta'
                      ? (language === 'ru' ? 'Практика' : 'Practice')
                      : slide.type === 'analogy'
                        ? (language === 'ru' ? 'Аналогия' : 'Analogy')
                        : slide.type === 'tip'
                          ? (language === 'ru' ? 'Интересно' : 'Tip')
                          : slide.type === 'code'
                            ? (language === 'ru' ? 'Код' : 'Code')
                            : slide.type === 'title'
                              ? (language === 'ru' ? 'Урок' : 'Lesson')
                              : (language === 'ru' ? 'Концепция' : 'Concept')}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                  {title}
                </h2>

                {/* Body */}
                <p className="text-white/75 text-base sm:text-lg leading-relaxed">
                  {body}
                </p>

                {/* Code block */}
                {slide.code && (
                  <CodeBlock code={slide.code} lang={slide.codeLang ?? 'html'} />
                )}

                {/* CTA button */}
                {isCta && (
                  <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={onGoToPractice}
                    className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-900/40"
                  >
                    {language === 'ru' ? '🚀 Перейти к практике' : '🚀 Go to practice'}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between px-6 py-5 border-t border-white/10 flex-shrink-0">
        <button
          onClick={() => goTo(current - 1, -1)}
          disabled={isFirst}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
          {language === 'ru' ? 'Назад' : 'Back'}
        </button>

        <span className="text-white/30 text-xs hidden sm:block">
          {language === 'ru' ? '← → для навигации · Esc для выхода' : '← → to navigate · Esc to exit'}
        </span>

        {isLast ? (
          <button
            onClick={onGoToPractice}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 transition-all"
          >
            {language === 'ru' ? 'К практике' : 'To practice'}
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => goTo(current + 1, 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            {language === 'ru' ? 'Далее' : 'Next'}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
