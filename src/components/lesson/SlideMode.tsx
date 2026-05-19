import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, X,
  Lightbulb, Code2, BookOpen, Zap, Sparkles, Terminal, Columns, Image as ImageIcon,
} from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { html as htmlLang } from '@codemirror/lang-html'
import { css as cssLang } from '@codemirror/lang-css'
import { javascript as jsLang } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { useLanguageStore } from '@/store/useLanguageStore'
import TerminalAnim from '@/components/glossary/TerminalAnim'
import type { Slide, SlideVisual, SlideCompareColumn } from '@/types/lesson'

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
  'code-anim': Terminal,
  illustration: ImageIcon,
  compare: Columns,
}

const SLIDE_ACCENT: Record<string, string> = {
  title: 'from-primary-600 to-secondary-600',
  analogy: 'from-amber-500 to-orange-500',
  concept: 'from-blue-500 to-cyan-500',
  code: 'from-slate-600 to-slate-800',
  tip: 'from-amber-400 to-yellow-500',
  'practice-cta': 'from-green-500 to-emerald-600',
  'code-anim': 'from-violet-600 to-purple-700',
  illustration: 'from-teal-500 to-cyan-600',
  compare: 'from-rose-500 to-pink-600',
}

const TYPE_LABELS: Record<string, { ru: string; en: string }> = {
  'practice-cta': { ru: 'Практика',   en: 'Practice' },
  analogy:        { ru: 'Аналогия',   en: 'Analogy' },
  tip:            { ru: 'Интересно',  en: 'Tip' },
  code:           { ru: 'Код',        en: 'Code' },
  title:          { ru: 'Урок',       en: 'Lesson' },
  concept:        { ru: 'Концепция',  en: 'Concept' },
  'code-anim':    { ru: 'Анимация',   en: 'Animation' },
  illustration:   { ru: 'Схема',      en: 'Diagram' },
  compare:        { ru: 'Сравнение',  en: 'Compare' },
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CodeBlock({ code, lang = 'html' }: { code: string; lang?: 'html' | 'css' | 'javascript' }) {
  const ext = lang === 'css' ? [cssLang()] : lang === 'javascript' ? [jsLang()] : [htmlLang()]
  return (
    <div className="rounded-xl overflow-hidden border border-white/20 text-xs mt-3">
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

function VisualBlock({ visual, lang }: { visual: SlideVisual; lang: string }) {
  if (visual.kind === 'emoji') {
    return (
      <div className="flex items-center justify-center gap-4 py-6">
        {visual.emojis?.map((e, i) => (
          <span key={i} className="text-6xl select-none">{e}</span>
        ))}
        {(visual.caption_ru || visual.caption_en) && (
          <p className="w-full text-center text-white/40 text-sm mt-2">
            {lang === 'ru' ? visual.caption_ru : visual.caption_en}
          </p>
        )}
      </div>
    )
  }
  if (visual.kind === 'svg' && visual.svg) {
    return (
      <div className="mt-4">
        <div
          className="flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: visual.svg }}
        />
        {(visual.caption_ru || visual.caption_en) && (
          <p className="text-center text-white/40 text-sm mt-2">
            {lang === 'ru' ? visual.caption_ru : visual.caption_en}
          </p>
        )}
      </div>
    )
  }
  if (visual.kind === 'image' && visual.imageUrl) {
    return (
      <div className="mt-4">
        <img
          src={visual.imageUrl}
          alt={lang === 'ru' ? (visual.caption_ru ?? '') : (visual.caption_en ?? '')}
          className="w-full rounded-xl"
        />
        {(visual.caption_ru || visual.caption_en) && (
          <p className="text-center text-white/40 text-sm mt-2">
            {lang === 'ru' ? visual.caption_ru : visual.caption_en}
          </p>
        )}
      </div>
    )
  }
  return null
}

const COMPARE_COLORS: Record<string, string> = {
  green: 'border-green-500/40 bg-green-900/20',
  red:   'border-red-500/40 bg-red-900/20',
  blue:  'border-blue-500/40 bg-blue-900/20',
  amber: 'border-amber-500/40 bg-amber-900/20',
}

function CompareCol({ col, lang }: { col: SlideCompareColumn; lang: string }) {
  const label = lang === 'ru' ? col.label_ru : col.label_en
  const items = lang === 'ru' ? col.items_ru : col.items_en
  const colClass = col.color ? (COMPARE_COLORS[col.color] ?? 'border-white/10 bg-white/5') : 'border-white/10 bg-white/5'
  const bullet = col.color === 'green' ? '✓' : col.color === 'red' ? '✗' : '•'

  return (
    <div className={`rounded-xl p-3 border ${colClass}`}>
      <p className="text-xs font-bold text-white/50 mb-2 uppercase tracking-widest">{label}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-1.5 text-white/75 text-xs leading-snug">
            <span className="shrink-0 mt-0.5">{bullet}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

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
  const typeLabel = TYPE_LABELS[slide.type] ?? TYPE_LABELS.concept
  const typeLabelText = language === 'ru' ? typeLabel.ru : typeLabel.en

  const title = language === 'ru' ? slide.title_ru : slide.title_en
  const body  = language === 'ru' ? slide.body_ru  : slide.body_en
  const lang  = language === 'ru' ? 'ru' : 'en'

  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex-shrink-0">
        <span className="text-white/60 text-xs sm:text-sm font-medium truncate max-w-[35%] sm:max-w-[50%]">{lessonTitle}</span>

        {/* Progress dots — on mobile show at most 9, hide middle ones */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {slides.map((_, i) => {
            const total = slides.length
            const showOnMobile = total <= 9 || i === 0 || i === total - 1 || i === current || Math.abs(i - current) <= 1
            return (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`rounded-full transition-all duration-300 ${!showOnMobile ? 'hidden sm:block' : ''} ${
                  i === current
                    ? 'w-5 sm:w-6 h-2 bg-white'
                    : i < current
                      ? 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40'
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/20'
                }`}
              />
            )
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
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

      {/* Slide area — overflow-y-auto so tall slides (code-anim, compare) are scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5">
        <div className="min-h-full flex items-center justify-center">
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
            <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Colored top strip */}
              <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />

              <div className="p-3 sm:p-5 lg:p-7">
                {/* Icon + type label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${accent} flex items-center justify-center flex-shrink-0`}>
                    <SlideIcon size={15} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                    {typeLabelText}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-white mb-3 leading-tight">
                  {title}
                </h2>

                {/* Body */}
                {body && (
                  <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                    {body}
                  </p>
                )}

                {/* ── Bullets (any slide type) ─────────────────────────────── */}
                {slide.bullets && slide.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {slide.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/75 text-sm leading-relaxed">
                        <span className="text-white/30 mt-0.5 shrink-0">•</span>
                        {language === 'ru' ? b.text_ru : b.text_en}
                      </li>
                    ))}
                  </ul>
                )}

                {/* ── Existing code block (type 'code') ───────────────────── */}
                {slide.code && slide.type !== 'illustration' && (
                  <CodeBlock code={slide.code} lang={slide.codeLang ?? 'html'} />
                )}

                {/* ── Visual for non-illustration types ───────────────────── */}
                {slide.visual && slide.type !== 'illustration' && (
                  <VisualBlock visual={slide.visual} lang={lang} />
                )}

                {/* ── ILLUSTRATION: prominent visual ───────────────────────── */}
                {slide.type === 'illustration' && slide.visual && (
                  <VisualBlock visual={slide.visual} lang={lang} />
                )}
                {slide.type === 'illustration' && slide.code && (
                  <CodeBlock code={slide.code} lang={slide.codeLang ?? 'html'} />
                )}

                {/* ── CODE-ANIM: terminal animation ────────────────────────── */}
                {slide.type === 'code-anim' && slide.animSteps && (
                  <div className="mt-3" style={{ height: slide.animMode === 'preview' ? '380px' : '270px' }}>
                    <TerminalAnim
                      steps={slide.animSteps}
                      demoMode={slide.animMode ?? 'console'}
                      lang={lang}
                    />
                  </div>
                )}

                {/* ── COMPARE: two-column layout ───────────────────────────── */}
                {slide.type === 'compare' && (slide.compareLeft || slide.compareRight) && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {slide.compareLeft  && <CompareCol col={slide.compareLeft}  lang={lang} />}
                    {slide.compareRight && <CompareCol col={slide.compareRight} lang={lang} />}
                  </div>
                )}

                {/* ── CTA button ───────────────────────────────────────────── */}
                {isCta && (
                  <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={onGoToPractice}
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-base hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-900/40"
                  >
                    {language === 'ru' ? '🚀 Перейти к практике' : '🚀 Go to practice'}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-5 border-t border-white/10 flex-shrink-0">
        <button
          onClick={() => goTo(current - 1, -1)}
          disabled={isFirst}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 transition-all"
          >
            {language === 'ru' ? 'К практике' : 'To practice'}
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => goTo(current + 1, 1)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            {language === 'ru' ? 'Далее' : 'Next'}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
