import { useRef, useCallback, useEffect, useState } from 'react'
import type { ReactNode, CSSProperties, MouseEvent as ReactMouseEvent } from 'react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { STATUS_META } from '@/store/useDevOpsStore'
import type { PipelineStatus } from '@/types/devops'

// Shared visual language for the DevOps course: glassmorphism cards, magnetic
// hover, comet cursor. Scoped to this course so no existing page changes.

export function useLang(): 'ru' | 'en' {
  return useLanguageStore((s) => s.language)
}

/** Picks the field for the active language: pick(obj, 'label') → label_ru | label_en */
export function pick(obj: object, base: string, lang: 'ru' | 'en'): string {
  const rec = obj as Record<string, unknown>
  return (rec[`${base}_${lang}`] as string) ?? (rec[`${base}_en`] as string) ?? ''
}

// ─── Magnetic hover ─────────────────────────────────────────────────────────

/** Element drifts toward the cursor, then springs back. `strength` in px. */
export function useMagnetic<T extends HTMLElement>(strength = 12) {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback((e: ReactMouseEvent) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`
  }, [strength])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (el) el.style.transform = ''
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
  style?: CSSProperties
  onClick?: () => void
  disabled?: boolean
  title?: string
}

export function Magnetic({ children, strength = 10, className = '', style, onClick, disabled, title }: MagneticProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement>(strength)
  return (
    <button
      ref={ref}
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={disabled ? undefined : onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transition-[transform,background,border-color,color,box-shadow] duration-200 ease-out disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      style={style}
    >
      {children}
    </button>
  )
}

// ─── Comet cursor ───────────────────────────────────────────────────────────

/** Canvas comet trail. Mounted once per DevOps page, removes itself on unmount. */
export function CometCursor({ accent = '#38BDF8' }: { accent?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const trail: { x: number; y: number; life: number }[] = []
    const pointer = { x: -100, y: -100, active: false }

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }
    const onLeave = () => { pointer.active = false }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      if (pointer.active) trail.push({ x: pointer.x, y: pointer.y, life: 1 })
      if (trail.length > 26) trail.shift()

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i]
        p.life -= 0.035
        if (p.life <= 0) continue
        const t = i / trail.length
        const radius = 1 + t * 5
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3)
        grad.addColorStop(0, accent)
        grad.addColorStop(1, 'transparent')
        ctx.globalAlpha = p.life * t * 0.5
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [accent])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

// ─── Glass card ─────────────────────────────────────────────────────────────

interface GlassProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Adds the spotlight-follows-cursor treatment used on the landing page. */
  spotlight?: boolean
  accent?: string
}

export function Glass({ children, className = '', style, spotlight = false, accent }: GlassProps) {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseMove = useCallback((e: ReactMouseEvent) => {
    if (!spotlight) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%')
    el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%')
  }, [spotlight])

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`relative rounded-[20px] overflow-hidden ${spotlight ? 'card-spotlight' : ''} ${className}`}
      style={{
        background: 'rgba(12,14,28,0.55)',
        border: `1px solid ${accent ? accent + '2b' : 'var(--border)'}`,
        backdropFilter: 'blur(18px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── CI status pill ─────────────────────────────────────────────────────────

export function StatusPill({ status, size = 'md' }: { status: PipelineStatus; size?: 'sm' | 'md' }) {
  const lang = useLang()
  const meta = STATUS_META[status]
  const spinning = status === 'running'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider ${
        size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
      }`}
      style={{
        color: meta.color,
        background: meta.color + '14',
        border: `1px solid ${meta.color}38`,
      }}
    >
      <span className={spinning ? 'animate-spin-slow inline-block' : 'inline-block'}>{meta.glyph}</span>
      {lang === 'ru' ? meta.label_ru : meta.label_en}
    </span>
  )
}

// ─── Run console line ───────────────────────────────────────────────────────

/** Monospace line with a coloured gutter — used by every lab's result panel. */
export function RunLine({ ok, children }: { ok: boolean | null; children: ReactNode }) {
  const color = ok === null ? 'var(--muted)' : ok ? '#2F9E44' : '#F472B6'
  return (
    <div className="flex items-start gap-2 font-mono text-[12px] leading-relaxed">
      <span style={{ color }}>{ok === null ? '›' : ok ? '✓' : '✕'}</span>
      <span style={{ color: ok === null ? 'var(--muted)' : 'var(--text)' }}>{children}</span>
    </div>
  )
}

// ─── Typewriter reveal for terminal-ish output ──────────────────────────────

export function useTypedLines(lines: string[], speed = 22) {
  const [shown, setShown] = useState<string[]>([])

  useEffect(() => {
    setShown([])
    if (lines.length === 0) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(lines.slice(0, i))
      if (i >= lines.length) clearInterval(id)
    }, speed * 4)
    return () => clearInterval(id)
  }, [lines, speed])

  return shown
}
