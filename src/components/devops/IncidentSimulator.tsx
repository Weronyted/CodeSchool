import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, FastForward, RotateCcw, AlertTriangle } from 'lucide-react'
import confetti from 'canvas-confetti'
import type { IncidentSimulatorTask, IncidentScenario, IncidentChoice, LogLevel } from '@/types/devops'
import { Glass, Magnetic, RunLine, useLang, pick } from './ui'

// ─── Incident triage ────────────────────────────────────────────────────────
//
// Two deliberate steps: first name the cause, only then choose the action.
// That split is the whole lesson — the wrong instinct is to restart something
// before you know what broke. Difficulty comes from the log data, not from the
// component: level 1 has one loud error, level 3 buries the root cause under
// symptoms that arrive later and look scarier.

const LEVEL_COLOR: Record<LogLevel, string> = {
  debug: 'rgba(232,236,255,0.35)',
  info:  '#38BDF8',
  warn:  '#F08C00',
  error: '#F472B6',
  fatal: '#EF4444',
}

type Phase = 'idle' | 'streaming' | 'cause' | 'action' | 'done'

interface ScenarioState {
  phase: Phase
  shown: number
  causePick: string | null
  actionPick: string | null
  solved: boolean
}

const initState = (): ScenarioState => ({
  phase: 'idle',
  shown: 0,
  causePick: null,
  actionPick: null,
  solved: false,
})

const STREAM_MS = 380

interface Props {
  task: IncidentSimulatorTask
  passed: boolean
  onPass: () => void
}

export function IncidentSimulator({ task, passed, onPass }: Props) {
  const lang = useLang()
  const scenarios = task.scenarios
  const [activeId, setActiveId] = useState(scenarios[0].id)
  const [states, setStates] = useState<Record<string, ScenarioState>>(() =>
    Object.fromEntries(scenarios.map((s) => [s.id, initState()]))
  )
  const timer = useRef<number | null>(null)
  const logRef = useRef<HTMLDivElement>(null)

  const sc = useMemo(
    () => scenarios.find((s) => s.id === activeId) as IncidentScenario,
    [scenarios, activeId]
  )
  const st = states[activeId]

  const patch = useCallback((id: string, next: Partial<ScenarioState>) => {
    setStates((s) => ({ ...s, [id]: { ...s[id], ...next } }))
  }, [])

  const stopStream = useCallback(() => {
    if (timer.current) { window.clearInterval(timer.current); timer.current = null }
  }, [])

  useEffect(() => stopStream, [stopStream])
  useEffect(() => { stopStream() }, [activeId, stopStream])

  const reported = useRef(passed)
  useEffect(() => {
    if (reported.current) return
    if (scenarios.every((s) => states[s.id]?.solved)) {
      reported.current = true
      onPass()
    }
  }, [states, scenarios, onPass])

  // ─── Log streaming ────────────────────────────────────────────────────────

  function stream() {
    stopStream()
    patch(activeId, { phase: 'streaming', shown: 0, causePick: null, actionPick: null })
    let i = 0
    timer.current = window.setInterval(() => {
      i += 1
      setStates((s) => ({ ...s, [activeId]: { ...s[activeId], shown: i } }))
      logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
      if (i >= sc.logs.length) {
        stopStream()
        setStates((s) => ({ ...s, [activeId]: { ...s[activeId], phase: 'cause' } }))
      }
    }, STREAM_MS)
  }

  function skip() {
    stopStream()
    patch(activeId, { phase: 'cause', shown: sc.logs.length })
  }

  function restart() {
    stopStream()
    patch(activeId, initState())
  }

  // ─── Answering ────────────────────────────────────────────────────────────

  function pickCause(c: IncidentChoice) {
    if (st.causePick) return
    patch(activeId, { causePick: c.id, phase: c.correct ? 'action' : 'cause' })
  }

  function pickAction(c: IncidentChoice) {
    if (st.actionPick) return
    const causeOk = sc.causes.find((x) => x.id === st.causePick)?.correct === true
    const solved = causeOk && c.correct
    patch(activeId, { actionPick: c.id, phase: 'done', solved })
    if (solved) {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 }, disableForReducedMotion: true })
    }
  }

  const causeChoice = sc.causes.find((c) => c.id === st.causePick)
  const actionChoice = sc.actions.find((c) => c.id === st.actionPick)
  const revealRootCause = st.phase === 'done' || causeChoice?.correct === true

  return (
    <div className="space-y-4">
      {/* Scenario switcher */}
      <div className="flex flex-wrap items-center gap-2">
        {scenarios.map((s) => {
          const isActive = s.id === activeId
          const solved = states[s.id]?.solved
          return (
            <Magnetic
              key={s.id}
              strength={5}
              onClick={() => setActiveId(s.id)}
              className="px-3.5 py-2 rounded-xl text-xs font-mono tracking-wide"
              style={{
                background: isActive ? 'rgba(244,114,182,0.14)' : 'var(--surface)',
                border: `1px solid ${isActive ? 'rgba(244,114,182,0.4)' : 'var(--border)'}`,
                color: isActive ? 'var(--text)' : 'var(--muted)',
              }}
            >
              <span className="flex items-center gap-2">
                <span style={{ color: solved ? '#2F9E44' : isActive ? '#F472B6' : 'var(--muted)' }}>
                  {solved ? '✓' : '○'}
                </span>
                P{4 - s.level} · {pick(s, 'title', lang)}
              </span>
            </Magnetic>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="space-y-4"
        >
          {/* Briefing */}
          <Glass className="p-4" accent="#F472B6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={13} style={{ color: '#F472B6' }} />
              <span className="font-mono text-[10px] tracking-[2px] uppercase" style={{ color: '#F472B6' }}>
                {lang === 'ru' ? 'инцидент' : 'incident'} · P{4 - sc.level}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              {pick(sc, 'context', lang)}
            </p>
          </Glass>

          {/* Log stream */}
          <Glass className="overflow-hidden" style={{ background: 'rgba(6,8,16,0.8)' }}>
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2">
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                  <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                ))}
                <span className="font-mono text-[10px] ml-2" style={{ color: 'var(--muted)' }}>
                  journalctl -u app -f
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {st.phase === 'idle' && (
                  <Magnetic
                    strength={5}
                    onClick={stream}
                    className="px-2.5 py-1 rounded-lg font-mono text-[10px] flex items-center gap-1.5"
                    style={{ background: 'rgba(67,97,238,0.2)', color: '#6B8BFF', border: '1px solid rgba(107,139,255,0.35)' }}
                  >
                    <Play size={10} /> {lang === 'ru' ? 'Читать логи' : 'Tail logs'}
                  </Magnetic>
                )}
                {st.phase === 'streaming' && (
                  <Magnetic
                    strength={5}
                    onClick={skip}
                    className="px-2.5 py-1 rounded-lg font-mono text-[10px] flex items-center gap-1.5"
                    style={{ background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                  >
                    <FastForward size={10} /> {lang === 'ru' ? 'Пропустить' : 'Skip'}
                  </Magnetic>
                )}
                {st.phase !== 'idle' && st.phase !== 'streaming' && (
                  <Magnetic
                    strength={5}
                    onClick={restart}
                    className="px-2.5 py-1 rounded-lg font-mono text-[10px] flex items-center gap-1.5"
                    style={{ background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                  >
                    <RotateCcw size={10} /> {lang === 'ru' ? 'Заново' : 'Replay'}
                  </Magnetic>
                )}
              </div>
            </div>

            <div ref={logRef} className="max-h-[280px] overflow-y-auto px-4 py-3 font-mono text-[11.5px] leading-[1.85]">
              {st.shown === 0 && (
                <p style={{ color: 'var(--muted)' }}>
                  {lang === 'ru'
                    ? '# нажми «Читать логи», чтобы подключиться к потоку'
                    : '# hit "Tail logs" to attach to the stream'}
                </p>
              )}
              {sc.logs.slice(0, st.shown).map((l, i) => {
                const highlight = revealRootCause && l.rootCause
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2 rounded px-1.5 -mx-1.5"
                    style={{
                      background: highlight ? 'rgba(47,158,68,0.12)' : 'transparent',
                      boxShadow: highlight ? 'inset 2px 0 0 #2F9E44' : 'none',
                    }}
                  >
                    <span style={{ color: 'rgba(232,236,255,0.28)' }}>{l.ts}</span>
                    <span className="uppercase w-10 flex-shrink-0" style={{ color: LEVEL_COLOR[l.level] }}>
                      {l.level}
                    </span>
                    <span style={{ color: 'rgba(232,236,255,0.45)' }}>[{l.service}]</span>
                    <span style={{ color: l.level === 'error' || l.level === 'fatal' ? '#F9A8D4' : 'var(--text)' }}>
                      {pick(l, 'message', lang)}
                    </span>
                  </motion.div>
                )
              })}
              {st.phase === 'streaming' && (
                <span className="cursor-blink inline-block w-2 h-3.5 align-middle" style={{ background: '#6B8BFF' }} />
              )}
            </div>
          </Glass>

          {/* Step 1 — cause */}
          {st.phase !== 'idle' && st.phase !== 'streaming' && (
            <Glass className="p-4">
              <div className="font-mono text-[10px] tracking-[2px] uppercase mb-2" style={{ color: 'var(--cyan)' }}>
                {lang === 'ru' ? 'шаг 1 · причина' : 'step 1 · root cause'}
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>{pick(sc, 'causeQuestion', lang)}</p>
              <ChoiceList
                choices={sc.causes}
                pickedId={st.causePick}
                onPick={pickCause}
                lang={lang}
              />
              {causeChoice && !causeChoice.correct && (
                <Magnetic
                  strength={5}
                  onClick={() => patch(activeId, { causePick: null })}
                  className="mt-3 px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-1.5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  <RotateCcw size={11} /> {lang === 'ru' ? 'Ещё раз' : 'Try again'}
                </Magnetic>
              )}
            </Glass>
          )}

          {/* Step 2 — action */}
          {(st.phase === 'action' || st.phase === 'done') && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Glass className="p-4">
                <div className="font-mono text-[10px] tracking-[2px] uppercase mb-2" style={{ color: 'var(--cyan)' }}>
                  {lang === 'ru' ? 'шаг 2 · действие' : 'step 2 · action'}
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>{pick(sc, 'actionQuestion', lang)}</p>
                <ChoiceList
                  choices={sc.actions}
                  pickedId={st.actionPick}
                  onPick={pickAction}
                  lang={lang}
                />
                {actionChoice && !actionChoice.correct && (
                  <Magnetic
                    strength={5}
                    onClick={() => patch(activeId, { actionPick: null, phase: 'action', solved: false })}
                    className="mt-3 px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-1.5"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                  >
                    <RotateCcw size={11} /> {lang === 'ru' ? 'Ещё раз' : 'Try again'}
                  </Magnetic>
                )}
              </Glass>
            </motion.div>
          )}

          {/* Postmortem */}
          {st.solved && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Glass className="p-4" accent="#2F9E44" style={{ background: 'rgba(6,8,16,0.7)' }}>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider"
                  style={{ background: '#2F9E4422', color: '#2F9E44' }}
                >
                  {lang === 'ru' ? 'postmortem' : 'postmortem'}
                </span>
                <div className="mt-2.5">
                  <RunLine ok>{pick(sc, 'postmortem', lang)}</RunLine>
                </div>
              </Glass>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ChoiceList({
  choices, pickedId, onPick, lang,
}: {
  choices: IncidentChoice[]
  pickedId: string | null
  onPick: (c: IncidentChoice) => void
  lang: 'ru' | 'en'
}) {
  return (
    <div className="space-y-2">
      {choices.map((c) => {
        const isPicked = pickedId === c.id
        const reveal = pickedId !== null
        const border = isPicked ? (c.correct ? '#2F9E44' : '#F472B6') : 'var(--border)'
        return (
          <div key={c.id}>
            <button
              type="button"
              disabled={reveal}
              onClick={() => onPick(c)}
              className="w-full text-left rounded-xl px-3.5 py-2.5 text-[13px] transition-all disabled:cursor-default"
              style={{
                background: isPicked
                  ? c.correct ? 'rgba(47,158,68,0.1)' : 'rgba(244,114,182,0.1)'
                  : 'var(--surface)',
                border: `1px solid ${border}`,
                color: 'var(--text)',
                opacity: reveal && !isPicked ? 0.45 : 1,
              }}
              onMouseEnter={(e) => { if (!reveal) e.currentTarget.style.borderColor = 'rgba(107,139,255,0.4)' }}
              onMouseLeave={(e) => { if (!reveal) e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {pick(c, 'label', lang)}
            </button>
            {isPicked && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-[11.5px] leading-relaxed px-3.5 pt-2 overflow-hidden"
                style={{ color: c.correct ? '#7BC98F' : '#F9A8D4' }}
              >
                {c.correct ? '✓ ' : '✕ '}{pick(c, 'feedback', lang)}
              </motion.p>
            )}
          </div>
        )
      })}
    </div>
  )
}
