import { useState, useRef, useEffect, useCallback } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Terminal as TerminalIcon, CheckCircle2, Circle } from 'lucide-react'
import confetti from 'canvas-confetti'
import type { TerminalSimulatorTask, TerminalResponse } from '@/types/devops'
import { Glass, Magnetic, useLang, pick } from './ui'

// ─── Pseudo-CLI ─────────────────────────────────────────────────────────────
//
// Real commands in, realistic output out, nothing real behind it. Responses can
// depend on state flags, so sequences behave: `docker ps` shows nothing until
// `docker run` has been typed, `systemctl status` reports dead until you start
// the unit.

interface Entry {
  cmd: string
  out: string[]
  code: number
}

interface Props {
  task: TerminalSimulatorTask
  passed: boolean
  onPass: () => void
}

export function TerminalSimulator({ task, passed, onPass }: Props) {
  const lang = useLang()
  const motd = lang === 'ru' ? task.motd_ru : task.motd_en

  const [entries, setEntries] = useState<Entry[]>([])
  const [input, setInput] = useState('')
  const [flags, setFlags] = useState<string[]>([])
  const [doneGoals, setDoneGoals] = useState<string[]>([])
  const [busy, setBusy] = useState(false)
  const [historyIdx, setHistoryIdx] = useState<number | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)) }, [])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [entries, busy])

  const reported = useRef(passed)
  useEffect(() => {
    if (reported.current) return
    if (task.goals.length > 0 && task.goals.every((g) => doneGoals.includes(g.id))) {
      reported.current = true
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 }, disableForReducedMotion: true })
      onPass()
    }
  }, [doneGoals, task.goals, onPass])

  // ─── Matching ─────────────────────────────────────────────────────────────

  const findResponse = useCallback((cmd: string): { res: TerminalResponse; groups: string[] } | null => {
    for (const res of task.responses) {
      if (res.regex) {
        const m = new RegExp(`^${res.match}$`).exec(cmd)
        if (m) return { res, groups: m.slice(1) }
      } else if (res.match === cmd) {
        return { res, groups: [] }
      }
    }
    return null
  }, [task.responses])

  function substitute(lines: string[], groups: string[]): string[] {
    return lines.map((l) => l.replace(/\$(\d)/g, (_, d: string) => groups[Number(d) - 1] ?? ''))
  }

  function submit(raw: string) {
    const cmd = raw.trim().replace(/\s+/g, ' ')
    setInput('')
    setHistoryIdx(null)
    if (!cmd) {
      setEntries((e) => [...e, { cmd: '', out: [], code: 0 }])
      return
    }

    if (cmd === 'clear') { setEntries([]); return }

    if (cmd === 'help') {
      setEntries((e) => [...e, {
        cmd,
        out: [
          lang === 'ru' ? 'Доступные в этом симуляторе команды:' : 'Commands available in this simulator:',
          ...task.suggestions.map((s) => `  ${s}`),
        ],
        code: 0,
      }])
      return
    }

    const hit = findResponse(cmd)

    // Tick off any goal this command satisfies (only for commands that exist)
    if (hit) {
      const matchedGoals = task.goals
        .filter((g) => !doneGoals.includes(g.id) && new RegExp(g.pattern).test(cmd))
        .map((g) => g.id)
      if (matchedGoals.length) setDoneGoals((d) => [...d, ...matchedGoals])
    }

    if (!hit) {
      setEntries((e) => [...e, {
        cmd,
        out: [
          `${cmd.split(' ')[0]}: ${lang === 'ru' ? 'команда не найдена в симуляторе' : 'command not found in this simulator'}`,
          lang === 'ru' ? 'Подсказка: набери `help`, чтобы увидеть, что здесь работает.' : 'Hint: type `help` to see what works here.',
        ],
        code: 127,
      }])
      return
    }

    const { res, groups } = hit
    const blocked = res.requires !== undefined && !flags.includes(res.requires)
    const out = substitute(blocked ? (res.unless ?? []) : res.output, groups)
    const code = blocked ? 1 : (res.exitCode ?? 0)

    if (!blocked) {
      if (res.sets?.length) setFlags((f) => [...new Set([...f, ...res.sets as string[]])])
      if (res.clears?.length) setFlags((f) => f.filter((x) => !res.clears?.includes(x)))
    }

    if (res.delayMs && !blocked) {
      setBusy(true)
      timers.current.push(window.setTimeout(() => {
        setBusy(false)
        setEntries((e) => [...e, { cmd, out, code }])
      }, res.delayMs))
      setEntries((e) => [...e, { cmd, out: [], code: 0 }])
      return
    }

    setEntries((e) => [...e, { cmd, out, code }])
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { submit(input); return }

    if (e.key === 'Tab') {
      e.preventDefault()
      const hit = task.suggestions.find((s) => s.startsWith(input) && s !== input)
      if (hit) setInput(hit)
      return
    }

    const past = entries.map((x) => x.cmd).filter(Boolean)
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!past.length) return
      const idx = historyIdx === null ? past.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(idx)
      setInput(past[idx])
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx === null) return
      const idx = historyIdx + 1
      if (idx >= past.length) { setHistoryIdx(null); setInput('') }
      else { setHistoryIdx(idx); setInput(past[idx]) }
    }
  }

  const allDone = task.goals.length > 0 && task.goals.every((g) => doneGoals.includes(g.id))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4">
      {/* Terminal */}
      <Glass className="overflow-hidden" style={{ background: 'rgba(4,6,12,0.9)' }}>
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
              <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
            ))}
            <span className="font-mono text-[10px] ml-2 flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
              <TerminalIcon size={10} /> {task.prompt}
            </span>
          </div>
          <span className="font-mono text-[9px]" style={{ color: 'var(--muted)' }}>
            {lang === 'ru' ? 'Tab — автодополнение · ↑ — история' : 'Tab — complete · ↑ — history'}
          </span>
        </div>

        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className="h-[340px] overflow-y-auto px-4 py-3 font-mono text-[12px] leading-[1.75] cursor-text"
        >
          {motd.map((l, i) => (
            <div key={`motd-${i}`} style={{ color: 'rgba(232,236,255,0.4)' }}>{l}</div>
          ))}

          {entries.map((e, i) => (
            <div key={i} className="mt-1">
              <div className="flex gap-2">
                <span style={{ color: '#6B8BFF' }}>{task.prompt}</span>
                <span style={{ color: 'var(--text)' }}>{e.cmd}</span>
              </div>
              {e.out.map((line, j) => (
                <div
                  key={j}
                  className="whitespace-pre-wrap break-words"
                  style={{ color: e.code === 0 ? 'rgba(232,236,255,0.72)' : '#F9A8D4' }}
                >
                  {line}
                </div>
              ))}
            </div>
          ))}

          {busy && (
            <div className="mt-1" style={{ color: '#F08C00' }}>
              <span className="animate-spin-slow inline-block">◐</span>{' '}
              {lang === 'ru' ? 'выполняется…' : 'working…'}
            </div>
          )}

          {!busy && (
            <div className="flex gap-2 mt-1">
              <span style={{ color: '#6B8BFF' }}>{task.prompt}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none font-mono text-[12px]"
                style={{ color: 'var(--text)' }}
              />
            </div>
          )}
        </div>
      </Glass>

      {/* Goals */}
      <div className="space-y-3">
        <Glass className="p-4" accent={allDone ? '#2F9E44' : undefined}>
          <div className="font-mono text-[10px] tracking-[2px] uppercase mb-3" style={{ color: 'var(--muted)' }}>
            {lang === 'ru' ? 'задачи' : 'tasks'}
          </div>
          <div className="space-y-2.5">
            {task.goals.map((g) => {
              const done = doneGoals.includes(g.id)
              return (
                <motion.div
                  key={g.id}
                  animate={{ opacity: done ? 1 : 0.75 }}
                  className="flex items-start gap-2 text-[11.5px] leading-snug"
                  style={{ color: done ? '#7BC98F' : 'var(--muted)' }}
                >
                  {done
                    ? <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" />
                    : <Circle size={12} className="mt-0.5 flex-shrink-0" />}
                  <span style={{ textDecoration: done ? 'line-through' : 'none' }}>
                    {pick(g, 'description', lang)}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </Glass>

        <Glass className="p-4">
          <div className="font-mono text-[10px] tracking-[2px] uppercase mb-2.5" style={{ color: 'var(--muted)' }}>
            {lang === 'ru' ? 'шпаргалка' : 'cheat sheet'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {task.suggestions.map((s) => (
              <Magnetic
                key={s}
                strength={4}
                onClick={() => { setInput(s); inputRef.current?.focus() }}
                className="px-2 py-1 rounded-md font-mono text-[10px] text-left"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
              >
                {s}
              </Magnetic>
            ))}
          </div>
        </Glass>
      </div>
    </div>
  )
}
