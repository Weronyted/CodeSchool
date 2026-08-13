import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import type { DragEvent as ReactDragEvent, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, X, Play, RotateCcw, Lightbulb, GripVertical, Lock } from 'lucide-react'
import confetti from 'canvas-confetti'
import type {
  PipelineBuilderTask,
  PipelineLevel,
  PipelineLevelConfig,
  PipelineStage,
} from '@/types/devops'
import { buildRules, validatePipeline, STAGE_ACCENT, STAGE_GLYPH } from './pipelineRules'
import type { RuleResult } from './pipelineRules'
import { Glass, Magnetic, RunLine, useLang, pick } from './ui'

// ─── One component, three levels ────────────────────────────────────────────
//
// The level tabs swap the *config*, never the component: the tray, the canvas,
// the runner and the feedback panel are shared. Level 2 adds branch decision
// cards, level 3 adds dependency rules — both are just extra data on the
// config, validated by the same engine.

type StageRunState = 'idle' | 'queued' | 'running' | 'success' | 'failed' | 'skipped'

interface LevelState {
  order: string[]
  answers: Record<string, string>
  runState: Record<string, StageRunState>
  status: 'idle' | 'running' | 'passed' | 'failed'
  results: RuleResult[]
  failureMessage: string
  branchFeedback: { id: string; ok: boolean; text: string }[]
  showHint: boolean
}

const emptyLevelState = (): LevelState => ({
  order: [],
  answers: {},
  runState: {},
  status: 'idle',
  results: [],
  failureMessage: '',
  branchFeedback: [],
  showHint: false,
})

const LEVEL_LABEL: Record<PipelineLevel, { ru: string; en: string; hint_ru: string; hint_en: string }> = {
  basic:     { ru: 'Базовый',     en: 'Basic',     hint_ru: 'линейный порядок',        hint_en: 'linear order' },
  branching: { ru: 'Средний',     en: 'Branching', hint_ru: 'условные ветвления',      hint_en: 'conditional branches' },
  advanced:  { ru: 'Продвинутый', en: 'Advanced',  hint_ru: 'зависимости сервисов',    hint_en: 'service dependencies' },
}

const STEP_MS = 460

interface Props {
  task: PipelineBuilderTask
  passed: boolean
  onPass: () => void
}

export function PipelineBuilder({ task, passed, onPass }: Props) {
  const lang = useLang()
  const levels = task.levels
  const [activeLevel, setActiveLevel] = useState<PipelineLevel>(levels[0].level)
  const [states, setStates] = useState<Record<string, LevelState>>(() =>
    Object.fromEntries(levels.map((l) => [l.level, emptyLevelState()]))
  )
  const [solved, setSolved] = useState<Record<string, boolean>>({})
  const timers = useRef<number[]>([])
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const cfg = useMemo(
    () => levels.find((l) => l.level === activeLevel) as PipelineLevelConfig,
    [levels, activeLevel]
  )
  const st = states[activeLevel]

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  // Switching levels mid-run must not let the old run write into the new level.
  useEffect(() => { clearTimers() }, [activeLevel, clearTimers])

  const patch = useCallback((level: string, next: Partial<LevelState>) => {
    setStates((s) => ({ ...s, [level]: { ...s[level], ...next } }))
  }, [])

  // Lab passes only once every level is green — the switcher is a progression,
  // not three separate tasks.
  const reported = useRef(passed)
  useEffect(() => {
    if (reported.current) return
    if (levels.every((l) => solved[l.level])) {
      reported.current = true
      onPass()
    }
  }, [solved, levels, onPass])

  // ─── Tray / canvas mutations ──────────────────────────────────────────────

  const stageById = useCallback(
    (id: string) => cfg.stages.find((s) => s.id === id) as PipelineStage,
    [cfg]
  )
  const trayStages = cfg.stages.filter((s) => !st.order.includes(s.id))

  function resetRun(next: Partial<LevelState> = {}) {
    clearTimers()
    patch(activeLevel, {
      runState: {},
      status: 'idle',
      results: [],
      failureMessage: '',
      branchFeedback: [],
      ...next,
    })
  }

  function addStage(id: string, at?: number) {
    const order = [...st.order]
    order.splice(at ?? order.length, 0, id)
    resetRun({ order })
  }

  function removeStage(id: string) {
    resetRun({ order: st.order.filter((x) => x !== id) })
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= st.order.length) return
    const order = [...st.order]
    ;[order[index], order[target]] = [order[target], order[index]]
    resetRun({ order })
  }

  function moveTo(from: number, to: number) {
    if (from === to) return
    const order = [...st.order]
    const [item] = order.splice(from, 1)
    order.splice(from < to ? to - 1 : to, 0, item)
    resetRun({ order })
  }

  function reset() {
    resetRun({ order: [], answers: {}, showHint: false })
  }

  // ─── Drag & drop ──────────────────────────────────────────────────────────

  function onDragStartTray(e: ReactDragEvent, id: string) {
    e.dataTransfer.setData('text/plain', `tray:${id}`)
    e.dataTransfer.effectAllowed = 'copyMove'
  }

  function onDragStartPipe(e: ReactDragEvent, index: number) {
    e.dataTransfer.setData('text/plain', `pipe:${index}`)
    e.dataTransfer.effectAllowed = 'move'
  }

  function onDropAt(e: ReactDragEvent, index: number) {
    e.preventDefault()
    setDragOverIndex(null)
    const raw = e.dataTransfer.getData('text/plain')
    if (raw.startsWith('tray:')) addStage(raw.slice(5), index)
    else if (raw.startsWith('pipe:')) moveTo(Number(raw.slice(5)), index)
  }

  // ─── The run ──────────────────────────────────────────────────────────────

  const activeBranches = (cfg.branches ?? []).filter((b) => st.order.includes(b.stageId))

  function run() {
    clearTimers()
    const rules = buildRules(cfg)
    const verdict = validatePipeline(st.order, rules)

    const branchFeedback = activeBranches.map((b) => {
      const opt = b.options.find((o) => o.id === st.answers[b.id])
      return {
        id: b.id,
        ok: Boolean(opt?.correct),
        text: opt
          ? pick(opt, 'feedback', lang)
          : lang === 'ru'
            ? 'Ты не ответил на это условие — пайплайн не знает, что делать при таком исходе.'
            : 'You left this condition unanswered — the pipeline does not know what to do here.',
      }
    })
    const branchesOk = branchFeedback.every((b) => b.ok)

    const stopIndex = verdict.failedStageId ? st.order.indexOf(verdict.failedStageId) : -1

    const queued: Record<string, StageRunState> = Object.fromEntries(
      st.order.map((id) => [id, 'queued' as StageRunState])
    )
    patch(activeLevel, {
      status: 'running',
      runState: queued,
      results: verdict.results,
      failureMessage: '',
      branchFeedback: [],
    })

    st.order.forEach((id, i) => {
      if (stopIndex !== -1 && i > stopIndex) return

      timers.current.push(
        window.setTimeout(() => {
          setStates((s) => ({
            ...s,
            [activeLevel]: { ...s[activeLevel], runState: { ...s[activeLevel].runState, [id]: 'running' } },
          }))
        }, i * STEP_MS)
      )

      timers.current.push(
        window.setTimeout(() => {
          const isFail = i === stopIndex
          setStates((s) => ({
            ...s,
            [activeLevel]: {
              ...s[activeLevel],
              runState: {
                ...s[activeLevel].runState,
                [id]: isFail ? 'failed' : 'success',
                ...(isFail
                  ? Object.fromEntries(st.order.slice(i + 1).map((rest) => [rest, 'skipped' as StageRunState]))
                  : {}),
              },
            },
          }))
        }, i * STEP_MS + STEP_MS * 0.8)
      )
    })

    const total = (stopIndex === -1 ? st.order.length : stopIndex + 1) * STEP_MS + 200
    timers.current.push(
      window.setTimeout(() => {
        const ok = verdict.ok && branchesOk && st.order.length > 0
        patch(activeLevel, {
          status: ok ? 'passed' : 'failed',
          branchFeedback,
          failureMessage: ok
            ? ''
            : verdict.firstFailure
              ? pick(verdict.firstFailure, 'message', lang)
              : !branchesOk
                ? lang === 'ru'
                  ? 'Порядок этапов верный, но ветвление обработано неправильно.'
                  : 'The stage order is right, but the branching is handled incorrectly.'
                : lang === 'ru'
                  ? 'Пайплайн пуст — перетащи этапы в конвейер.'
                  : 'The pipeline is empty — drag stages into the canvas.',
        })
        if (ok) {
          setSolved((s) => ({ ...s, [activeLevel]: true }))
          confetti({ particleCount: 70, spread: 62, origin: { y: 0.7 }, disableForReducedMotion: true })
        }
      }, total)
    )
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Level switcher */}
      <div className="flex flex-wrap items-center gap-2">
        {levels.map((l) => {
          const isActive = l.level === activeLevel
          const isSolved = solved[l.level]
          return (
            <Magnetic
              key={l.level}
              strength={5}
              onClick={() => setActiveLevel(l.level)}
              className="px-3.5 py-2 rounded-xl text-xs font-mono tracking-wide"
              style={{
                background: isActive ? 'rgba(67,97,238,0.18)' : 'var(--surface)',
                border: `1px solid ${isActive ? 'rgba(107,139,255,0.45)' : 'var(--border)'}`,
                color: isActive ? 'var(--text)' : 'var(--muted)',
              }}
            >
              <span className="flex items-center gap-2">
                <span style={{ color: isSolved ? '#2F9E44' : isActive ? '#6B8BFF' : 'var(--muted)' }}>
                  {isSolved ? '✓' : '○'}
                </span>
                {LEVEL_LABEL[l.level][lang]}
                <span className="opacity-50 hidden sm:inline">· {LEVEL_LABEL[l.level][`hint_${lang}`]}</span>
              </span>
            </Magnetic>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="space-y-4"
        >
          {/* Goal */}
          <Glass className="p-4" accent="#4361EE">
            <div className="font-mono text-[10px] tracking-[2px] uppercase mb-1.5" style={{ color: 'var(--cyan)' }}>
              // {pick(cfg, 'title', lang)}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              {pick(cfg, 'goal', lang)}
            </p>
          </Glass>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
            {/* Tray */}
            <Glass className="p-4 h-fit">
              <div className="font-mono text-[10px] tracking-[2px] uppercase mb-3" style={{ color: 'var(--muted)' }}>
                {lang === 'ru' ? 'Доступные этапы' : 'Available stages'}
              </div>
              <div className="space-y-2">
                {trayStages.length === 0 && (
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>
                    {lang === 'ru' ? 'Все этапы в конвейере.' : 'Every stage is on the canvas.'}
                  </p>
                )}
                {trayStages.map((s) => (
                  <div
                    key={s.id}
                    draggable
                    onDragStart={(e) => onDragStartTray(e, s.id)}
                    onClick={() => addStage(s.id)}
                    className="group cursor-grab active:cursor-grabbing rounded-xl px-3 py-2.5 transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${STAGE_ACCENT[s.kind]}33`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.borderColor = STAGE_ACCENT[s.kind] + '99'
                      el.style.background = STAGE_ACCENT[s.kind] + '14'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.borderColor = STAGE_ACCENT[s.kind] + '33'
                      el.style.background = 'rgba(255,255,255,0.03)'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm" style={{ color: STAGE_ACCENT[s.kind] }}>
                        {STAGE_GLYPH[s.kind]}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
                        {pick(s, 'label', lang)}
                      </span>
                    </div>
                    {s.service && (
                      <span
                        className="inline-block mt-1.5 font-mono text-[9px] px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--muted)' }}
                      >
                        {s.service}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Glass>

            {/* Canvas */}
            <Glass className="p-4" spotlight>
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono text-[10px] tracking-[2px] uppercase" style={{ color: 'var(--muted)' }}>
                  {lang === 'ru' ? 'Конвейер' : 'Pipeline'}
                </div>
                <div className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                  {st.order.length} {lang === 'ru' ? 'этапов' : 'stages'}
                </div>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDropAt(e, st.order.length)}
                className="min-h-[180px] rounded-xl p-2"
                style={{ border: '1px dashed var(--border)' }}
              >
                {st.order.length === 0 && (
                  <div className="h-[160px] flex items-center justify-center text-center px-6">
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>
                      {lang === 'ru'
                        ? 'Перетащи сюда этапы из списка слева — или просто кликни по ним.'
                        : 'Drag stages here from the tray on the left — or just click them.'}
                    </p>
                  </div>
                )}

                {st.order.map((id, i) => {
                  const s = stageById(id)
                  const state = st.runState[id] ?? 'idle'
                  const accent = STAGE_ACCENT[s.kind]
                  const border =
                    state === 'running' ? '#F08C00'
                    : state === 'success' ? '#2F9E44'
                    : state === 'failed' ? '#F472B6'
                    : state === 'skipped' ? 'rgba(255,255,255,0.06)'
                    : accent + '44'

                  return (
                    <div key={id}>
                      {/* Drop indicator above the item */}
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDragOverIndex(i) }}
                        onDragLeave={() => setDragOverIndex((v) => (v === i ? null : v))}
                        onDrop={(e) => onDropAt(e, i)}
                        className="h-2 transition-all rounded-full"
                        style={{ background: dragOverIndex === i ? '#6B8BFF' : 'transparent' }}
                      />

                      <div
                        draggable
                        onDragStart={(e) => onDragStartPipe(e, i)}
                        className="rounded-xl px-3 py-2.5 flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all duration-200"
                        style={{
                          background: state === 'skipped' ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.035)',
                          border: `1px solid ${border}`,
                          opacity: state === 'skipped' ? 0.4 : 1,
                          boxShadow: state === 'running' ? '0 0 22px rgba(240,140,0,0.25)' : 'none',
                        }}
                      >
                        <GripVertical size={13} style={{ color: 'var(--muted)', flexShrink: 0 }} />

                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs flex-shrink-0"
                          style={{ background: accent + '1f', color: accent }}
                        >
                          {STAGE_GLYPH[s.kind]}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
                              {pick(s, 'label', lang)}
                            </span>
                            {s.service && (
                              <span
                                className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                                style={{ background: accent + '1f', color: accent }}
                              >
                                {s.service}
                              </span>
                            )}
                          </div>
                          {s.command && (
                            <div className="font-mono text-[10px] truncate" style={{ color: 'var(--muted)' }}>
                              $ {s.command}
                            </div>
                          )}
                        </div>

                        <RunGlyph state={state} />

                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          <IconBtn onClick={() => move(i, -1)} disabled={i === 0} label="↑">
                            <ChevronUp size={13} />
                          </IconBtn>
                          <IconBtn onClick={() => move(i, 1)} disabled={i === st.order.length - 1} label="↓">
                            <ChevronDown size={13} />
                          </IconBtn>
                          <IconBtn onClick={() => removeStage(id)} label="×">
                            <X size={13} />
                          </IconBtn>
                        </div>
                      </div>

                      {i < st.order.length - 1 && (
                        <div className="flex justify-center py-0.5">
                          <div
                            className="w-px h-3"
                            style={{
                              background:
                                state === 'success' ? '#2F9E44' : 'var(--border)',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Branch decisions (level 2) */}
              {activeBranches.length > 0 && (
                <div className="mt-4 space-y-3">
                  <div className="font-mono text-[10px] tracking-[2px] uppercase" style={{ color: 'var(--muted)' }}>
                    {lang === 'ru' ? 'Условные ветвления' : 'Conditional branches'}
                  </div>
                  {activeBranches.map((b) => {
                    const fb = st.branchFeedback.find((f) => f.id === b.id)
                    return (
                      <div
                        key={b.id}
                        className="rounded-xl p-3"
                        style={{
                          background: 'rgba(255,255,255,0.025)',
                          border: `1px solid ${fb ? (fb.ok ? '#2F9E4455' : '#F472B655') : 'var(--border)'}`,
                        }}
                      >
                        <div className="font-mono text-[10px] mb-1" style={{ color: '#F08C00' }}>
                          if ({pick(b, 'condition', lang)})
                        </div>
                        <p className="text-xs mb-2.5" style={{ color: 'var(--text)' }}>
                          {pick(b, 'question', lang)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {b.options.map((o) => {
                            const chosen = st.answers[b.id] === o.id
                            return (
                              <Magnetic
                                key={o.id}
                                strength={4}
                                onClick={() =>
                                  resetRun({ answers: { ...st.answers, [b.id]: o.id } })
                                }
                                className="px-3 py-1.5 rounded-lg text-[11px]"
                                style={{
                                  background: chosen ? 'rgba(107,139,255,0.18)' : 'var(--surface)',
                                  border: `1px solid ${chosen ? 'rgba(107,139,255,0.5)' : 'var(--border)'}`,
                                  color: chosen ? 'var(--text)' : 'var(--muted)',
                                }}
                              >
                                {pick(o, 'label', lang)}
                              </Magnetic>
                            )
                          })}
                        </div>
                        {fb && (
                          <p
                            className="text-[11px] mt-2.5 leading-relaxed"
                            style={{ color: fb.ok ? '#7BC98F' : '#F9A8D4' }}
                          >
                            {fb.ok ? '✓ ' : '✕ '}{fb.text}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Magnetic
                  strength={8}
                  onClick={run}
                  disabled={st.status === 'running' || st.order.length === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 btn-sheen"
                  style={{
                    background: 'linear-gradient(90deg,#4361EE,#38BDF8)',
                    color: '#fff',
                    boxShadow: '0 8px 24px rgba(67,97,238,0.28)',
                  }}
                >
                  <Play size={12} />
                  {st.status === 'running'
                    ? lang === 'ru' ? 'Выполняется…' : 'Running…'
                    : lang === 'ru' ? 'Запустить пайплайн' : 'Run pipeline'}
                </Magnetic>

                <Magnetic
                  strength={6}
                  onClick={reset}
                  className="px-3 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  <RotateCcw size={12} />
                  {lang === 'ru' ? 'Сбросить' : 'Reset'}
                </Magnetic>

                <Magnetic
                  strength={6}
                  onClick={() => patch(activeLevel, { showHint: !st.showHint })}
                  className="px-3 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: '#F08C00' }}
                >
                  <Lightbulb size={12} />
                  {lang === 'ru' ? 'Подсказка' : 'Hint'}
                </Magnetic>
              </div>

              <AnimatePresence>
                {st.showHint && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-[11px] mt-3 leading-relaxed overflow-hidden"
                    style={{ color: '#FBBF24' }}
                  >
                    💡 {pick(cfg, 'hint', lang)}
                  </motion.p>
                )}
              </AnimatePresence>
            </Glass>
          </div>

          {/* Run console */}
          <AnimatePresence>
            {(st.status === 'passed' || st.status === 'failed') && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Glass
                  className="p-4"
                  accent={st.status === 'passed' ? '#2F9E44' : '#F472B6'}
                  style={{ background: 'rgba(6,8,16,0.7)' }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider"
                      style={{
                        background: st.status === 'passed' ? '#2F9E4422' : '#F472B622',
                        color: st.status === 'passed' ? '#2F9E44' : '#F472B6',
                      }}
                    >
                      {st.status === 'passed'
                        ? lang === 'ru' ? 'pipeline · успешно' : 'pipeline · passed'
                        : lang === 'ru' ? 'pipeline · провален' : 'pipeline · failed'}
                    </span>
                  </div>

                  {st.status === 'failed' ? (
                    <RunLine ok={false}>{st.failureMessage}</RunLine>
                  ) : (
                    <>
                      <RunLine ok>{pick(cfg, 'explanation', lang)}</RunLine>
                      {levels.every((l) => solved[l.level]) && (
                        <RunLine ok>
                          {lang === 'ru'
                            ? 'Все уровни пройдены — задание засчитано.'
                            : 'Every level cleared — the lab is complete.'}
                        </RunLine>
                      )}
                    </>
                  )}
                </Glass>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Small pieces ───────────────────────────────────────────────────────────

function RunGlyph({ state }: { state: StageRunState }) {
  if (state === 'idle' || state === 'queued') {
    return <span className="font-mono text-[11px] flex-shrink-0" style={{ color: 'var(--muted)' }}>○</span>
  }
  if (state === 'running') {
    return <span className="font-mono text-[11px] animate-spin-slow flex-shrink-0" style={{ color: '#F08C00' }}>◐</span>
  }
  if (state === 'success') {
    return <span className="font-mono text-[11px] flex-shrink-0" style={{ color: '#2F9E44' }}>✓</span>
  }
  if (state === 'failed') {
    return <span className="font-mono text-[11px] flex-shrink-0" style={{ color: '#F472B6' }}>✕</span>
  }
  return <Lock size={11} className="flex-shrink-0" style={{ color: 'var(--muted)' }} />
}

function IconBtn({
  children, onClick, disabled, label,
}: { children: ReactNode; onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="w-6 h-6 rounded-md flex items-center justify-center transition-colors disabled:opacity-25"
      style={{ color: 'var(--muted)' }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
    >
      {children}
    </button>
  )
}
