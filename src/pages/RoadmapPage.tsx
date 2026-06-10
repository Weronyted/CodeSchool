import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { useProgressStore } from '@/store/useProgressStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'
import { TEACHER_CLASSES } from '@/data/teacherGuide'
import type { LessonCategory } from '@/types/lesson'
import type { TeacherClass } from '@/data/teacherGuide'

type TrackId = LessonCategory

const TRACK_ORDER: TrackId[] = ['BASICS', 'HTML', 'CSS', 'JS', 'REACT']

const TRACK_CFG: Record<TrackId, { ru: string; en: string; color: string; glow: string; bg: string; icon: string }> = {
  BASICS: { ru: 'Основы', en: 'Basics', color: '#A78BFA', glow: '0 0 24px rgba(167,139,250,0.35)', bg: 'rgba(167,139,250,0.08)', icon: '🌱' },
  HTML:   { ru: 'HTML',   en: 'HTML',   color: '#FB923C', glow: '0 0 24px rgba(251,146,60,0.35)',  bg: 'rgba(251,146,60,0.08)',  icon: '🌐' },
  CSS:    { ru: 'CSS',    en: 'CSS',    color: '#38BDF8', glow: '0 0 24px rgba(56,189,248,0.35)',  bg: 'rgba(56,189,248,0.08)',  icon: '🎨' },
  JS:     { ru: 'JS',     en: 'JS',     color: '#FBBF24', glow: '0 0 24px rgba(251,191,36,0.35)',  bg: 'rgba(251,191,36,0.08)',  icon: '⚡' },
  REACT:  { ru: 'React',  en: 'React',  color: '#22D3EE', glow: '0 0 24px rgba(34,211,238,0.35)',  bg: 'rgba(34,211,238,0.08)',  icon: '⚛️' },
}

interface NodeProgress { completed?: boolean; quizScore?: number }

// ─── Phase types ──────────────────────────────────────────────────────────────

type PhaseType = 'review' | 'theory' | 'demo' | 'practice' | 'break' | 'quiz' | 'wrap'

interface Phase {
  type: PhaseType
  emoji: string
  title_ru: string
  title_en: string
  duration: number
}

const PHASE_COLORS: Record<PhaseType, string> = {
  review:   '#FBBF24',
  theory:   '#4361EE',
  demo:     '#A78BFA',
  practice: '#4ADE80',
  break:    '#6B7280',
  quiz:     '#FB923C',
  wrap:     '#22D3EE',
}

function getTitle(slug: string, lang: 'ru' | 'en'): string {
  const m = (LESSON_META as Record<string, { title: string; title_en: string }>)[slug]
  return (lang === 'ru' ? m?.title : m?.title_en) ?? slug
}

function buildPhases(slugs: string[], lang: 'ru' | 'en'): Phase[] {
  if (slugs.length === 2) {
    const t1 = getTitle(slugs[0], lang)
    const t2 = getTitle(slugs[1], lang)
    return [
      { type: 'review',   emoji: '🔄', title_ru: 'Повторение',            title_en: 'Review',             duration: 10 },
      { type: 'theory',   emoji: '📖', title_ru: `Теория: ${t1}`,         title_en: `Theory: ${t1}`,      duration: 15 },
      { type: 'demo',     emoji: '💻', title_ru: `Демо: ${t1}`,           title_en: `Demo: ${t1}`,        duration: 10 },
      { type: 'practice', emoji: '✏️', title_ru: `Практика: ${t1}`,       title_en: `Practice: ${t1}`,    duration: 15 },
      { type: 'break',    emoji: '☕', title_ru: 'Перерыв',                title_en: 'Break',              duration: 10 },
      { type: 'theory',   emoji: '📖', title_ru: `Теория: ${t2}`,         title_en: `Theory: ${t2}`,      duration: 15 },
      { type: 'demo',     emoji: '💻', title_ru: `Демо: ${t2}`,           title_en: `Demo: ${t2}`,        duration: 10 },
      { type: 'practice', emoji: '✏️', title_ru: `Практика: ${t2}`,       title_en: `Practice: ${t2}`,    duration: 15 },
      { type: 'quiz',     emoji: '🧪', title_ru: 'Тест',                   title_en: 'Quiz',               duration: 10 },
      { type: 'wrap',     emoji: '📝', title_ru: 'Итоги и вопросы',        title_en: 'Wrap-up & Q&A',      duration:  5 },
    ]
  }
  const t = getTitle(slugs[0], lang)
  return [
    { type: 'review',   emoji: '🔄', title_ru: 'Повторение',           title_en: 'Review',             duration: 10 },
    { type: 'theory',   emoji: '📖', title_ru: `Теория: ${t}`,         title_en: `Theory: ${t}`,       duration: 25 },
    { type: 'demo',     emoji: '💻', title_ru: `Демо: ${t}`,           title_en: `Demo: ${t}`,         duration: 20 },
    { type: 'break',    emoji: '☕', title_ru: 'Перерыв',               title_en: 'Break',              duration: 10 },
    { type: 'practice', emoji: '✏️', title_ru: `Практика: ${t}`,       title_en: `Practice: ${t}`,     duration: 30 },
    { type: 'quiz',     emoji: '🧪', title_ru: 'Тест',                  title_en: 'Quiz',               duration: 15 },
    { type: 'wrap',     emoji: '📝', title_ru: 'Итоги и вопросы',       title_en: 'Wrap-up & Q&A',      duration: 10 },
  ]
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  const allProgress = useProgressStore(s => s.progress)
  const { language } = useLanguageStore()
  const lang = language as 'ru' | 'en'
  const [teacherMode, setTeacherMode] = useState(false)

  const totalCompleted = LESSON_SLUGS.filter(s => allProgress[s]?.completed).length
  const totalPct = Math.round((totalCompleted / LESSON_SLUGS.length) * 100)

  const byTrack = Object.fromEntries(TRACK_ORDER.map(t => [t, [] as string[]])) as Record<TrackId, string[]>
  for (const slug of LESSON_SLUGS) {
    const cat = LESSON_META[slug].category as TrackId | undefined
    if (cat && byTrack[cat]) byTrack[cat].push(slug)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="font-mono text-[11px] tracking-[3px] uppercase mb-3" style={{ color: 'var(--cyan)' }}>// roadmap</div>
          <h1 className="font-heading text-4xl font-extrabold mb-2" style={{ color: 'var(--text)', letterSpacing: '-1.5px' }}>
            {lang === 'ru' ? 'Карта обучения' : 'Learning Map'}
          </h1>

          {!teacherMode && (
            <>
              <p className="mb-4" style={{ color: 'var(--muted)' }}>
                {lang === 'ru'
                  ? `Пройдено ${totalCompleted} из ${LESSON_SLUGS.length} уроков`
                  : `${totalCompleted} of ${LESSON_SLUGS.length} lessons completed`}
              </p>
              <div className="h-2 rounded-full overflow-hidden w-72 max-w-full" style={{ background: 'var(--surface)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg,#4361EE,#38BDF8)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${totalPct}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </>
          )}

          {/* Mode toggle */}
          <div className="flex gap-2 mt-6">
            {(['student', 'teacher'] as const).map(mode => {
              const active = teacherMode ? mode === 'teacher' : mode === 'student'
              return (
                <button
                  key={mode}
                  onClick={() => setTeacherMode(mode === 'teacher')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: active ? 'rgba(67,97,238,0.18)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? 'rgba(67,97,238,0.5)' : 'rgba(255,255,255,0.07)'}`,
                    color: active ? '#7B93FF' : 'var(--muted)',
                  }}
                >
                  {mode === 'student' ? '👨‍🎓' : '👨‍🏫'}
                  <span>
                    {lang === 'ru'
                      ? (mode === 'student' ? 'Студент' : 'Учитель')
                      : (mode === 'student' ? 'Student' : 'Teacher')}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {teacherMode ? (
          <TeacherView lang={lang} />
        ) : (
          <div className="overflow-x-auto -mx-4 px-4 pb-8">
            <div className="flex gap-3" style={{ minWidth: '900px' }}>
              {TRACK_ORDER.map((track, trackIdx) => (
                <TrackColumn
                  key={track}
                  track={track}
                  slugs={byTrack[track]}
                  progress={allProgress}
                  lang={lang}
                  trackIdx={trackIdx}
                  tooltipSide={trackIdx >= 3 ? 'left' : 'right'}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// ─── Teacher view ─────────────────────────────────────────────────────────────

function TeacherView({ lang }: { lang: 'ru' | 'en' }) {
  const totalHours = Math.round(
    TEACHER_CLASSES.reduce((sum, cls) => {
      return sum + buildPhases(cls.slugs, lang).reduce((s, p) => s + p.duration, 0)
    }, 0) / 60
  )

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-5 text-sm"
        style={{ color: 'var(--muted)' }}
      >
        {lang === 'ru'
          ? `${TEACHER_CLASSES.length} занятий · ~${totalHours} часов`
          : `${TEACHER_CLASSES.length} classes · ~${totalHours} hours`}
      </motion.div>
      <div className="space-y-2">
        {TEACHER_CLASSES.map((cls, i) => (
          <ClassCard key={i} cls={cls} number={i + 1} lang={lang} />
        ))}
      </div>
    </div>
  )
}

// ─── Class card ───────────────────────────────────────────────────────────────

function ClassCard({
  cls, number, lang,
}: {
  cls: TeacherClass
  number: number
  lang: 'ru' | 'en'
}) {
  const [open, setOpen] = useState(false)
  const phases = buildPhases(cls.slugs, lang)
  const totalMin = phases.reduce((s, p) => s + p.duration, 0)
  const tips = lang === 'ru' ? cls.tips_ru : cls.tips_en
  const metaList = cls.slugs.map(s => (LESSON_META as Record<string, { title: string; title_en: string; icon: string }>)[s])

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: number * 0.015 }}
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors"
        style={{ background: open ? 'rgba(255,255,255,0.03)' : 'transparent' }}
      >
        {/* Class number badge */}
        <div
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold font-mono"
          style={{ background: 'rgba(67,97,238,0.15)', color: '#7B93FF', border: '1px solid rgba(67,97,238,0.3)' }}
        >
          {number}
        </div>

        {/* Lesson titles */}
        <div className="flex-1 min-w-0 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          {metaList.map((m, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>+</span>}
              <span className="text-sm" style={{ color: 'var(--text)' }}>
                {m?.icon} {lang === 'ru' ? m?.title : m?.title_en}
              </span>
            </span>
          ))}
        </div>

        {/* Duration + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[11px] font-mono" style={{ color: 'var(--muted)' }}>
            {totalMin} {lang === 'ru' ? 'мин' : 'min'}
          </span>
          <span
            className="text-xs transition-transform duration-200"
            style={{ color: 'var(--muted)', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none' }}
          >
            ▾
          </span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-5 pt-4 pb-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Phase timeline */}
              <div className="space-y-0.5">
                {phases.map((phase, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5">
                    <div
                      className="flex-shrink-0 w-[3px] h-6 rounded-full"
                      style={{ background: PHASE_COLORS[phase.type] }}
                    />
                    <span className="text-sm leading-none w-5 flex-shrink-0">{phase.emoji}</span>
                    <span className="flex-1 text-[13px]" style={{ color: 'var(--text)' }}>
                      {lang === 'ru' ? phase.title_ru : phase.title_en}
                    </span>
                    <span
                      className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md flex-shrink-0"
                      style={{
                        background: `${PHASE_COLORS[phase.type]}18`,
                        color: PHASE_COLORS[phase.type],
                      }}
                    >
                      {phase.duration} {lang === 'ru' ? 'мин' : 'min'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tips */}
              {tips.length > 0 && (
                <div
                  className="mt-4 rounded-xl p-4"
                  style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.18)' }}
                >
                  <div className="text-[11px] font-semibold mb-2.5" style={{ color: '#FBBF24' }}>
                    💡 {lang === 'ru' ? 'Советы учителю' : 'Teacher tips'}
                  </div>
                  <ul className="space-y-1.5">
                    {tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-[12px] leading-relaxed">
                        <span className="flex-shrink-0" style={{ color: '#FBBF24' }}>•</span>
                        <span style={{ color: 'var(--muted)' }}>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Track column ─────────────────────────────────────────────────────────────

function TrackColumn({
  track, slugs, progress, lang, trackIdx, tooltipSide,
}: {
  track: TrackId
  slugs: string[]
  progress: Record<string, NodeProgress>
  lang: 'ru' | 'en'
  trackIdx: number
  tooltipSide: 'left' | 'right'
}) {
  const cfg = TRACK_CFG[track]
  const completed = slugs.filter(s => progress[s]?.completed).length
  const pct = slugs.length > 0 ? Math.round((completed / slugs.length) * 100) : 0

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: trackIdx * 0.07 }}
        className="w-full rounded-xl px-3 py-3 mb-3 text-center"
        style={{ background: cfg.bg, border: `1px solid ${cfg.color}30` }}
      >
        <div className="text-xl mb-1">{cfg.icon}</div>
        <div className="text-sm font-bold" style={{ color: cfg.color }}>
          {lang === 'ru' ? cfg.ru : cfg.en}
        </div>
        <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>
          {completed}/{slugs.length}
        </div>
        <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: cfg.color }}
          />
        </div>
      </motion.div>

      {slugs.map((slug, i) => (
        <LessonNode
          key={slug}
          slug={slug}
          nodeIndex={i}
          isLast={i === slugs.length - 1}
          cfg={cfg}
          progress={progress[slug]}
          trackIdx={trackIdx}
          tooltipSide={tooltipSide}
          lang={lang}
        />
      ))}
    </div>
  )
}

// ─── Lesson node ──────────────────────────────────────────────────────────────

function LessonNode({
  slug, nodeIndex, isLast, cfg, progress, trackIdx, tooltipSide, lang,
}: {
  slug: string
  nodeIndex: number
  isLast: boolean
  cfg: typeof TRACK_CFG[TrackId]
  progress: NodeProgress | undefined
  trackIdx: number
  tooltipSide: 'left' | 'right'
  lang: 'ru' | 'en'
}) {
  const [hovered, setHovered] = useState(false)
  const meta = LESSON_META[slug as keyof typeof LESSON_META]
  const done = progress?.completed ?? false
  const score = progress?.quizScore ?? 0
  const num = (LESSON_SLUGS as readonly string[]).indexOf(slug) + 1

  return (
    <div className="flex flex-col items-center w-full">
      {/* Node row */}
      <motion.div
        className="flex items-center gap-2 w-full relative py-0.5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: trackIdx * 0.07 + nodeIndex * 0.025 }}
      >
        {/* Circle */}
        <Link to={`/lessons/${slug}`} className="flex-shrink-0 block">
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-base relative select-none"
            style={{
              background: done ? `${cfg.color}1a` : 'var(--surface)',
              border: `2px solid ${done ? cfg.color : 'rgba(255,255,255,0.08)'}`,
              boxShadow: done ? cfg.glow : 'none',
              transition: 'box-shadow 0.3s, border-color 0.3s, background 0.3s',
            }}
          >
            {meta.icon}
            {done && (
              <div
                className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
              >
                <span className="text-white font-bold leading-none" style={{ fontSize: '8px' }}>✓</span>
              </div>
            )}
          </motion.div>
        </Link>

        {/* Title */}
        <Link to={`/lessons/${slug}`} className="flex-1 min-w-0">
          <p
            className="text-[11px] font-medium leading-tight line-clamp-2 transition-colors duration-200"
            style={{ color: done ? 'var(--text)' : 'var(--muted)' }}
          >
            {lang === 'ru' ? meta.title : meta.title_en}
          </p>
          {done && score > 0 ? (
            <p className="text-[10px] mt-0.5 font-mono font-bold" style={{ color: cfg.color }}>{score}%</p>
          ) : (
            <p className="text-[10px] mt-0.5 font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>#{num}</p>
          )}
        </Link>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.12 }}
              className="absolute top-0 z-50 w-52 rounded-xl p-3 pointer-events-none"
              style={{
                [tooltipSide === 'right' ? 'left' : 'right']: 'calc(100% + 4px)',
                background: '#0d0f1e',
                border: `1px solid ${cfg.color}30`,
                boxShadow: `0 16px 48px rgba(0,0,0,0.75), ${cfg.glow}`,
              }}
            >
              <p className="text-[11px] font-bold mb-1 leading-snug" style={{ color: cfg.color }}>
                {lang === 'ru' ? meta.title : meta.title_en}
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                {lang === 'ru' ? meta.description : meta.description_en}
              </p>
              {done ? (
                <div
                  className="mt-2 pt-1.5 flex items-center gap-1.5"
                  style={{ borderTop: `1px solid ${cfg.color}22` }}
                >
                  <CheckCircle2 size={10} style={{ color: cfg.color }} />
                  <span className="text-[10px] font-semibold" style={{ color: cfg.color }}>
                    {lang === 'ru' ? 'Пройдено' : 'Completed'}{score > 0 ? ` · ${score}%` : ''}
                  </span>
                </div>
              ) : (
                <div className="mt-2 flex items-center gap-1">
                  <ChevronRight size={10} style={{ color: 'var(--muted)' }} />
                  <span className="text-[10px]" style={{ color: 'var(--muted)' }}>
                    {lang === 'ru' ? 'Перейти к уроку' : 'Go to lesson'}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Connector line below */}
      {!isLast && (
        <div
          className="w-px h-4 transition-colors duration-500"
          style={{ background: done ? cfg.color : 'rgba(255,255,255,0.08)' }}
        />
      )}
    </div>
  )
}
