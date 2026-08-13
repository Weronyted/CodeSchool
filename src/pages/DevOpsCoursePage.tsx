import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Clock } from 'lucide-react'
import { DEVOPS_MODULES, DEVOPS_META, DEVOPS_SLUGS } from '@/devops'
import { useDevOpsStore, STATUS_META } from '@/store/useDevOpsStore'
import { Glass, StatusPill, CometCursor, useLang, useMagnetic } from '@/components/devops/ui'
import type { DevOpsModule } from '@/types/devops'

export default function DevOpsCoursePage() {
  const lang = useLang()
  const progress = useDevOpsStore((s) => s.progress)
  const statusOf = useDevOpsStore((s) => s.statusOf)
  const isUnlocked = useDevOpsStore((s) => s.isUnlocked)

  const passed = DEVOPS_SLUGS.filter((s) => progress[s]?.passed).length
  const pct = Math.round((passed / DEVOPS_SLUGS.length) * 100)

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg)' }}>
      <CometCursor accent="#38BDF8" />

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-[1]">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="font-mono text-[11px] tracking-[3px] uppercase mb-3" style={{ color: 'var(--cyan)' }}>
            // {lang === 'ru' ? 'курс' : 'course'}
          </div>
          <h1
            className="font-heading text-4xl sm:text-5xl font-extrabold mb-3"
            style={{ color: 'var(--text)', letterSpacing: '-1.5px' }}
          >
            DevOps <span style={{ color: '#6B8BFF' }}>({lang === 'ru' ? 'Автоматизация' : 'Automation'})</span>
          </h1>
          <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--muted)' }}>
            {lang === 'ru'
              ? 'Здесь ты не пишешь код в редакторе — ты собираешь пайплайны, разбираешь инциденты по логам, вводишь настоящие команды в симуляторе терминала и смотришь, как живут контейнеры. Уроки открываются как джобы в CI: следующий стартует, когда предыдущий стал зелёным.'
              : 'You will not write code in an editor here — you assemble pipelines, triage incidents from logs, type real commands into a terminal simulator and watch containers live and die. Lessons unlock like CI jobs: the next one starts when the previous one goes green.'}
          </p>

          {/* Overall pipeline progress */}
          <Glass className="mt-6 p-5" spotlight>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[2px]" style={{ color: 'var(--muted)' }}>
                {lang === 'ru' ? 'общий прогресс' : 'overall progress'}
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--text)' }}>
                {passed} / {DEVOPS_SLUGS.length} · {pct}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ background: 'linear-gradient(90deg,#4361EE,#38BDF8,#2F9E44)' }}
              />
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {(Object.keys(STATUS_META) as (keyof typeof STATUS_META)[]).map((k) => (
                <span key={k} className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: STATUS_META[k].color }}>{STATUS_META[k].glyph}</span>
                  {lang === 'ru' ? STATUS_META[k].label_ru : STATUS_META[k].label_en}
                </span>
              ))}
            </div>
          </Glass>
        </motion.div>

        {/* Modules */}
        <div className="space-y-8">
          {DEVOPS_MODULES.map((mod, mi) => (
            <ModuleBlock
              key={mod.id}
              mod={mod}
              index={mi}
              lang={lang}
              statusOf={statusOf}
              isUnlocked={isUnlocked}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface ModuleBlockProps {
  mod: DevOpsModule
  index: number
  lang: 'ru' | 'en'
  statusOf: ReturnType<typeof useDevOpsStore.getState>['statusOf']
  isUnlocked: ReturnType<typeof useDevOpsStore.getState>['isUnlocked']
}

function ModuleBlock({ mod, index, lang, statusOf, isUnlocked }: ModuleBlockProps) {
  const done = mod.lessonSlugs.filter((s) => statusOf(s) === 'success').length
  const complete = done === mod.lessonSlugs.length

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: mod.accent + '1f', border: `1px solid ${mod.accent}44` }}
        >
          {mod.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px]" style={{ color: mod.accent }}>
              {String(mod.order).padStart(2, '0')}
            </span>
            <h2 className="font-heading text-xl font-bold" style={{ color: 'var(--text)' }}>
              {lang === 'ru' ? mod.title_ru : mod.title_en}
            </h2>
            {complete && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ background: '#2F9E4422', color: '#2F9E44' }}>
                ✓ {lang === 'ru' ? 'модуль закрыт' : 'module cleared'}
              </span>
            )}
          </div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {lang === 'ru' ? mod.description_ru : mod.description_en}
          </p>
        </div>
        <span className="font-mono text-[11px] flex-shrink-0" style={{ color: 'var(--muted)' }}>
          {done}/{mod.lessonSlugs.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 pl-0 sm:pl-[52px]">
        {mod.lessonSlugs.map((slug) => (
          <LessonTile
            key={slug}
            slug={slug}
            accent={mod.accent}
            lang={lang}
            status={statusOf(slug)}
            unlocked={isUnlocked(slug)}
          />
        ))}
      </div>
    </motion.section>
  )
}

function LessonTile({
  slug, accent, lang, status, unlocked,
}: {
  slug: string
  accent: string
  lang: 'ru' | 'en'
  status: ReturnType<ReturnType<typeof useDevOpsStore.getState>['statusOf']>
  unlocked: boolean
}) {
  const meta = DEVOPS_META[slug]
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLDivElement>(5)

  const body = (
    <div
      ref={ref}
      onMouseMove={unlocked ? onMouseMove : undefined}
      onMouseLeave={onMouseLeave}
      className="h-full rounded-[18px] p-4 transition-[transform,border-color,box-shadow] duration-200"
      style={{
        background: 'rgba(12,14,28,0.55)',
        border: `1px solid ${status === 'success' ? '#2F9E4455' : 'var(--border)'}`,
        backdropFilter: 'blur(18px)',
        opacity: unlocked ? 1 : 0.5,
      }}
      onMouseEnter={(e) => {
        if (!unlocked) return
        e.currentTarget.style.borderColor = accent + '77'
        e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.45)`
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = status === 'success' ? '#2F9E4455' : 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <span className="text-2xl">{meta.icon}</span>
        {unlocked ? <StatusPill status={status} size="sm" /> : <Lock size={13} style={{ color: 'var(--muted)' }} />}
      </div>
      <h3 className="font-heading font-bold text-sm mb-1.5" style={{ color: 'var(--text)' }}>
        {lang === 'ru' ? meta.title_ru : meta.title_en}
      </h3>
      <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--muted)' }}>
        {lang === 'ru' ? meta.description_ru : meta.description_en}
      </p>
      <div className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
        <Clock size={11} />
        {meta.readTime} {lang === 'ru' ? 'мин' : 'min'}
      </div>
    </div>
  )

  if (!unlocked) {
    return (
      <div
        className="cursor-not-allowed"
        title={lang === 'ru' ? 'Сначала закрой предыдущий урок' : 'Clear the previous lesson first'}
      >
        {body}
      </div>
    )
  }

  return <Link to={`/devops/${slug}`}>{body}</Link>
}
