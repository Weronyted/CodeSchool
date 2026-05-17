import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { DemoStep } from '@/types/glossary'

interface Props {
  steps: DemoStep[]
  demoMode: 'console' | 'preview'
  lang: 'ru' | 'en'
}

type Phase = 'ready' | 'typing' | 'comment' | 'output' | 'done'

interface AnimState {
  stepIdx: number
  charIdx: number
  phase: Phase
  completedIndices: number[]
  playing: boolean
  speed: 'slow' | 'normal' | 'fast'
  currentPreview: string
}

const CHAR_DELAYS = { slow: 75, normal: 35, fast: 12 }
const LABELS = { slow: '0.5×', normal: '1×', fast: '2×' }

export default function TerminalAnim({ steps, demoMode, lang }: Props) {
  const [, forceRender] = useState(0)
  const render = () => forceRender(n => n + 1)

  const anim = useRef<AnimState>({
    stepIdx: 0,
    charIdx: 0,
    phase: 'ready',
    completedIndices: [],
    playing: true,
    speed: 'normal',
    currentPreview: '',
  })

  const timer = useRef<ReturnType<typeof setTimeout>>()
  const scrollRef = useRef<HTMLDivElement>(null)

  const schedule = (ms: number) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(advance, ms)
  }

  const goNext = () => {
    const a = anim.current
    a.completedIndices = [...a.completedIndices, a.stepIdx]
    const next = a.stepIdx + 1
    if (next >= steps.length) {
      a.phase = 'done'
      render()
    } else {
      a.stepIdx = next
      a.charIdx = 0
      a.phase = 'ready'
      render()
      schedule(450)
    }
  }

  const advance = () => {
    const a = anim.current
    if (!a.playing || a.phase === 'done') return
    const code = steps[a.stepIdx]?.code ?? ''

    if (a.phase === 'ready' || a.phase === 'typing') {
      a.phase = 'typing'
      if (a.charIdx < code.length) {
        a.charIdx++
        render()
        schedule(CHAR_DELAYS[a.speed])
      } else {
        a.phase = 'comment'
        render()
        schedule(700)
      }
    } else if (a.phase === 'comment') {
      const step = steps[a.stepIdx]
      const hasOutput =
        (demoMode === 'console' && !!step?.output) ||
        (demoMode === 'preview' && !!step?.preview)
      if (hasOutput) {
        if (demoMode === 'preview' && step?.preview) {
          a.currentPreview = step.preview
        }
        a.phase = 'output'
        render()
        schedule(1400)
      } else {
        goNext()
      }
    } else if (a.phase === 'output') {
      goNext()
    }
  }

  useEffect(() => {
    schedule(600)
    return () => clearTimeout(timer.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  })

  const replay = () => {
    clearTimeout(timer.current)
    anim.current = {
      stepIdx: 0,
      charIdx: 0,
      phase: 'ready',
      completedIndices: [],
      playing: true,
      speed: anim.current.speed,
      currentPreview: '',
    }
    render()
    schedule(300)
  }

  const togglePlay = () => {
    const a = anim.current
    a.playing = !a.playing
    if (a.playing && a.phase !== 'done') {
      advance()
    } else {
      clearTimeout(timer.current)
    }
    render()
  }

  const setSpeed = (s: 'slow' | 'normal' | 'fast') => {
    anim.current.speed = s
    render()
  }

  // ── snapshot for rendering ────────────────────────────────────────────────
  const a = anim.current
  const currentStep = steps[a.stepIdx]
  const showComment = a.phase === 'comment' || a.phase === 'output' || a.phase === 'done'
  const showOutput = a.phase === 'output' || a.phase === 'done'
  const isDone = a.phase === 'done'

  const previewHtml = a.currentPreview
    ? `<!DOCTYPE html><html><head><style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:system-ui,sans-serif;padding:12px;background:#fff;color:#222}
        h1{font-size:1.7em;margin-bottom:.3em}
        h2{font-size:1.25em;margin-bottom:.25em}
        p{line-height:1.5;margin-bottom:.5em}
        a{color:#3B5BDB}
        ul,ol{padding-left:1.4em;margin-bottom:.5em}
        li{margin-bottom:.2em}
        div{line-height:1.5}
      </style></head><body>${a.currentPreview}</body></html>`
    : ''

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono select-none">

      {/* ── macOS traffic lights + title ───────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-[#3d3d3d] shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[#888] text-xs tracking-wide">
          {demoMode === 'console' ? 'JavaScript Console' : 'HTML Editor'}
        </span>
      </div>

      {/* ── scrollable REPL area ───────────────────────────────────────────── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">

        {/* Completed steps */}
        {a.completedIndices.map((idx) => {
          const s = steps[idx]
          if (!s) return null
          return (
            <div key={idx} className="opacity-60">
              <div className="flex gap-2">
                <span className="text-[#4ec9b0] shrink-0">&gt;</span>
                <pre className="text-[#d4d4d4] whitespace-pre-wrap break-all leading-relaxed">
                  {s.code}
                </pre>
              </div>
              <div className="text-[#6a9955] pl-4 mt-1 leading-relaxed">
                {'// ' + (lang === 'ru' ? s.comment_ru : s.comment_en)}
              </div>
              {demoMode === 'console' && s.output && (
                <div className={`pl-4 mt-1 leading-relaxed ${s.isError ? 'text-[#f48771]' : 'text-[#9cdcfe]'}`}>
                  {s.output}
                </div>
              )}
            </div>
          )
        })}

        {/* Current animating step */}
        {!isDone && currentStep && (
          <div>
            <div className="flex gap-2">
              <span className="text-[#4ec9b0] shrink-0">&gt;</span>
              <pre className="text-[#d4d4d4] whitespace-pre-wrap break-all leading-relaxed">
                {currentStep.code.slice(0, a.charIdx)}
                {a.phase === 'typing' && (
                  <span className="animate-pulse text-[#aeafad]">▋</span>
                )}
              </pre>
            </div>

            <AnimatePresence>
              {showComment && (
                <motion.div
                  key="comment"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[#6a9955] pl-4 mt-1 leading-relaxed"
                >
                  {'// ' + (lang === 'ru' ? currentStep.comment_ru : currentStep.comment_en)}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showOutput && demoMode === 'console' && currentStep.output && (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`pl-4 mt-1 leading-relaxed whitespace-pre-wrap ${
                    currentStep.isError ? 'text-[#f48771]' : 'text-[#9cdcfe]'
                  }`}
                >
                  {currentStep.output}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {isDone && (
          <div className="text-[#555] text-xs">
            — {lang === 'ru' ? 'Готово!' : 'Done!'}
          </div>
        )}
      </div>

      {/* ── Preview panel (preview mode only) ─────────────────────────────── */}
      <AnimatePresence>
        {demoMode === 'preview' && previewHtml && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-[#3d3d3d] shrink-0"
          >
            <div className="px-4 pt-2 pb-1 text-xs text-[#888]">
              {lang === 'ru' ? '▸ Предпросмотр' : '▸ Preview'}
            </div>
            <div className="px-4 pb-3">
              <iframe
                key={previewHtml}
                srcDoc={previewHtml}
                className="w-full rounded border border-[#3d3d3d] bg-white"
                style={{ height: '90px' }}
                sandbox="allow-scripts"
                title="preview"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Controls ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] border-t border-[#3d3d3d] shrink-0">
        <button
          onClick={isDone ? replay : togglePlay}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#3d3d3d] hover:bg-[#4a4a4a] text-[#ccc] transition-colors"
        >
          {isDone
            ? (lang === 'ru' ? '↺ Сначала' : '↺ Replay')
            : a.playing
            ? '⏸'
            : '▶'}
        </button>

        <div className="flex gap-1 ml-auto">
          {(['slow', 'normal', 'fast'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                a.speed === s
                  ? 'bg-[#3B5BDB] text-white'
                  : 'text-[#888] hover:text-[#ccc]'
              }`}
            >
              {LABELS[s]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
