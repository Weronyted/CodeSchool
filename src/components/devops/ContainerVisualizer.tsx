import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import confetti from 'canvas-confetti'
import type { ContainerVisualizerTask, ContainerState, VizAction } from '@/types/devops'
import { Glass, Magnetic, useLang, pick } from './ui'

// ─── What actually happens on docker run / stop / kill ──────────────────────
//
// The point is the transition, not the end state: a container does not "stop",
// it goes running → stopping → exited, and with `restart: always` it comes back
// through `restarting`. Each action plays its effects on a timeline so the
// student sees the intermediate states.

const STATE_META: Record<ContainerState, { color: string; label_ru: string; label_en: string }> = {
  absent:     { color: 'rgba(232,236,255,0.18)', label_ru: 'нет',           label_en: 'absent' },
  creating:   { color: '#38BDF8',                label_ru: 'создаётся',     label_en: 'creating' },
  running:    { color: '#2F9E44',                label_ru: 'работает',      label_en: 'running' },
  stopping:   { color: '#F08C00',                label_ru: 'останавливается', label_en: 'stopping' },
  exited:     { color: 'rgba(232,236,255,0.35)', label_ru: 'остановлен',    label_en: 'exited' },
  restarting: { color: '#FBBF24',                label_ru: 'перезапуск',    label_en: 'restarting' },
  crashed:    { color: '#F472B6',                label_ru: 'упал',          label_en: 'crashed' },
}

interface LogRow { text: string; tone: 'info' | 'warn' | 'ok' }

interface Props {
  task: ContainerVisualizerTask
  passed: boolean
  onPass: () => void
}

export function ContainerVisualizer({ task, passed, onPass }: Props) {
  const lang = useLang()
  const [states, setStates] = useState<Record<string, ContainerState>>(() =>
    Object.fromEntries(task.initial.map((c) => [c.id, c.state]))
  )
  const [log, setLog] = useState<LogRow[]>([])
  const [ran, setRan] = useState<string[]>([])
  const [busyAction, setBusyAction] = useState<string | null>(null)
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])
  useEffect(() => clearTimers, [clearTimers])

  const reported = useRef(passed)
  useEffect(() => {
    const quest = task.quest
    if (reported.current || !quest) return
    const ok = quest.ordered
      ? quest.requiredActionIds.every((id, i) => ran[i] === id)
      : quest.requiredActionIds.every((id) => ran.includes(id))
    if (ok) {
      reported.current = true
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 }, disableForReducedMotion: true })
      onPass()
    }
  }, [ran, task.quest, onPass])

  function play(action: VizAction) {
    if (busyAction) return
    setBusyAction(action.id)
    setLog((l) => [...l, { text: `$ ${action.command}`, tone: 'info' }])

    const last = action.effects.reduce((m, e) => Math.max(m, e.at), 0)

    action.effects.forEach((eff) => {
      timers.current.push(window.setTimeout(() => {
        setStates((s) => ({ ...s, [eff.containerId]: eff.state }))
        const note = lang === 'ru' ? eff.note_ru : eff.note_en
        if (note) {
          setLog((l) => [...l, {
            text: note,
            tone: eff.state === 'crashed' ? 'warn' : eff.state === 'running' ? 'ok' : 'info',
          }])
        }
      }, eff.at))
    })

    timers.current.push(window.setTimeout(() => {
      setLog((l) => [...l, { text: pick(action, 'narration', lang), tone: 'info' }])
      setRan((r) => [...r, action.id])
      setBusyAction(null)
    }, last + 350))
  }

  function reset() {
    clearTimers()
    setStates(Object.fromEntries(task.initial.map((c) => [c.id, c.state])))
    setLog([])
    setRan([])
    setBusyAction(null)
  }

  return (
    <div className="space-y-4">
      {task.quest && (
        <Glass className="p-4" accent="#4361EE">
          <div className="font-mono text-[10px] tracking-[2px] uppercase mb-1.5" style={{ color: 'var(--cyan)' }}>
            // {lang === 'ru' ? 'задача' : 'mission'}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
            {pick(task.quest, 'goal', lang)}
          </p>
        </Glass>
      )}

      {/* Host */}
      <Glass className="p-4" style={{ background: 'rgba(6,8,16,0.6)' }}>
        <div className="flex items-center justify-between mb-3.5">
          <span className="font-mono text-[10px] tracking-[2px] uppercase" style={{ color: 'var(--muted)' }}>
            {lang === 'ru' ? 'docker host' : 'docker host'}
          </span>
          <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
            {Object.values(states).filter((s) => s === 'running').length} {lang === 'ru' ? 'запущено' : 'running'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {task.initial.map((c) => {
            const state = states[c.id] ?? 'absent'
            const meta = STATE_META[state]
            const alive = state === 'running'
            return (
              <motion.div
                key={c.id}
                animate={
                  state === 'crashed'
                    ? { x: [0, -4, 4, -3, 3, 0] }
                    : state === 'restarting'
                      ? { rotate: [0, 0.6, -0.6, 0] }
                      : { x: 0, rotate: 0 }
                }
                transition={{ duration: state === 'crashed' ? 0.4 : 1.2, repeat: state === 'restarting' ? Infinity : 0 }}
                className="rounded-xl p-3.5 relative overflow-hidden"
                style={{
                  background: state === 'absent' ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.035)',
                  border: `1px solid ${meta.color}55`,
                  opacity: state === 'absent' ? 0.4 : 1,
                  boxShadow: alive ? `0 0 26px ${meta.color}22` : 'none',
                }}
              >
                {alive && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: [0.05, 0.14, 0.05] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                    style={{ background: `radial-gradient(circle at 50% 0%, ${meta.color}, transparent 70%)` }}
                  />
                )}

                <div className="flex items-start justify-between gap-2 mb-2 relative">
                  <div className="min-w-0">
                    <div className="font-mono text-[12px] font-semibold truncate" style={{ color: 'var(--text)' }}>
                      {c.name}
                    </div>
                    <div className="font-mono text-[10px] truncate" style={{ color: 'var(--muted)' }}>
                      {c.image}
                    </div>
                  </div>
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                    style={{
                      background: meta.color,
                      boxShadow: alive ? `0 0 10px ${meta.color}` : 'none',
                      animation: alive ? 'blink 2s ease-in-out infinite' : undefined,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between relative">
                  <span
                    className="font-mono text-[9.5px] px-1.5 py-0.5 rounded uppercase tracking-wider"
                    style={{ background: meta.color + '1f', color: meta.color }}
                  >
                    {lang === 'ru' ? meta.label_ru : meta.label_en}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[9.5px]" style={{ color: 'var(--muted)' }}>
                    {c.ports && <span>{c.ports}</span>}
                    {c.restartPolicy && c.restartPolicy !== 'no' && <span>↻ {c.restartPolicy}</span>}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Glass>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {task.actions.map((a) => {
          const used = ran.includes(a.id)
          return (
            <Magnetic
              key={a.id}
              strength={6}
              disabled={busyAction !== null}
              onClick={() => play(a)}
              title={a.command}
              className="px-3 py-2 rounded-xl text-[11px] font-mono text-left"
              style={{
                background: used ? 'rgba(47,158,68,0.1)' : 'var(--surface)',
                border: `1px solid ${used ? '#2F9E4444' : 'var(--border)'}`,
                color: used ? '#7BC98F' : 'var(--text)',
              }}
            >
              <span className="block">{a.command}</span>
              <span className="block text-[9.5px] mt-0.5" style={{ color: 'var(--muted)' }}>
                {pick(a, 'label', lang)}
              </span>
            </Magnetic>
          )
        })}

        <Magnetic
          strength={5}
          onClick={reset}
          className="px-3 py-2 rounded-xl text-[11px] flex items-center gap-1.5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <RotateCcw size={11} />
          {lang === 'ru' ? 'Сбросить' : 'Reset'}
        </Magnetic>
      </div>

      {/* Event log */}
      <AnimatePresence>
        {log.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Glass className="p-4" style={{ background: 'rgba(4,6,12,0.85)' }}>
              <div className="font-mono text-[10px] tracking-[2px] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                docker events
              </div>
              <div className="max-h-[180px] overflow-y-auto space-y-0.5 font-mono text-[11.5px] leading-relaxed">
                {log.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                      color: row.tone === 'warn' ? '#F9A8D4' : row.tone === 'ok' ? '#7BC98F' : 'rgba(232,236,255,0.65)',
                    }}
                  >
                    {row.text}
                  </motion.div>
                ))}
              </div>
            </Glass>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
