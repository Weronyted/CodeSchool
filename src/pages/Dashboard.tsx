import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import { useAuthStore } from '@/store/useAuthStore'
import { useProgressStore } from '@/store/useProgressStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'
import { useThemeStore } from '@/store/useThemeStore'

const BADGES = [
  { id: 'firstTag',     emoji: '🏷️' },
  { id: 'stylist',      emoji: '🎨' },
  { id: 'coder',        emoji: '⚡' },
  { id: 'developer',    emoji: '🖥️' },
  { id: 'fullStack',    emoji: '🚀' },
  { id: 'perfectScore', emoji: '⭐' },
  { id: 'persistent',   emoji: '💪' },
]

export default function Dashboard() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const progress = useProgressStore((s) => s.progress)
  const streak = useProgressStore((s) => s.streak)
  const { language } = useLanguageStore()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const completedCount = Object.values(progress).filter((p) => p.completed).length
  const totalCount = LESSON_SLUGS.length
  const overallPct = Math.round((completedCount / totalCount) * 100)

  // Radar grouped by category instead of slice(0,8)
  const avgCategoryScore = (cat: string) => {
    const slugs = LESSON_SLUGS.filter((s) => LESSON_META[s].category === cat)
    if (!slugs.length) return 0
    return Math.round(slugs.reduce((sum, s) => sum + (progress[s]?.quizScore ?? 0), 0) / slugs.length)
  }
  const radarData = [
    { subject: '💡 Основы', score: avgCategoryScore('BASICS') },
    { subject: '🏗️ HTML',   score: avgCategoryScore('HTML') },
    { subject: '🎨 CSS',    score: avgCategoryScore('CSS') },
    { subject: '⚡ JS',     score: avgCategoryScore('JS') },
  ]

  // "Continue" — last visited incomplete lesson, or first unstarted
  const continueSlug =
    LESSON_SLUGS
      .filter((s) => !progress[s]?.completed && (progress[s]?.lastVisited ?? 0) > 0)
      .sort((a, b) => (progress[b]?.lastVisited ?? 0) - (progress[a]?.lastVisited ?? 0))[0]
    ?? LESSON_SLUGS.find((s) => !progress[s]?.completed)

  const allValues = Object.values(progress)
  const earnedBadges = new Set<string>([
    ...(completedCount >= 1   ? ['firstTag']     : []),
    ...(completedCount >= 5   ? ['stylist']       : []),
    ...(completedCount >= 12  ? ['coder']         : []),
    ...(completedCount >= 25  ? ['developer']     : []),
    ...(completedCount >= totalCount && allValues.length > 0 &&
        allValues.every((p) => !p.completed || p.quizScore >= 80)
        && allValues.filter((p) => p.completed).length >= totalCount
          ? ['fullStack'] : []),
    ...(allValues.some((p) => p.quizScore >= 100)  ? ['perfectScore'] : []),
    ...(allValues.some((p) => (p.quizAttempts ?? 0) >= 3) ? ['persistent'] : []),
  ])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Welcome card */}
        <motion.div
          className="rounded-3xl p-8 text-white mb-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#1a1f4e,#0f1035)', border: '1px solid rgba(107,139,255,0.2)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative z-10">
            <h1 className="font-heading text-3xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
              {t('dashboard.welcome', { name: user?.displayName ?? user?.email?.split('@')[0] ?? t('dashboard.student', 'Студент') })} 👋
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <div className="text-4xl font-extrabold font-heading" style={{ color: 'var(--text)' }}>{completedCount}/{totalCount}</div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>{t('dashboard.lessonsCompleted', 'Уроков пройдено')}</div>
              </div>
              {streak > 0 && (
                <div>
                  <div className="text-4xl font-extrabold font-heading" style={{ color: 'var(--text)' }}>🔥 {streak}</div>
                  <div className="text-sm" style={{ color: 'var(--muted)' }}>{language === 'ru' ? 'Дней подряд' : 'Day streak'}</div>
                </div>
              )}
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: 'var(--muted)' }}>{t('dashboard.progress', 'Прогресс')}</span>
                  <span className="font-bold" style={{ color: 'var(--text)' }}>{overallPct}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg,#4361EE,#38BDF8)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-4 text-8xl opacity-10 select-none">💻</div>
        </motion.div>

        {/* Continue card */}
        {continueSlug && (
          <motion.div className="mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Link to={`/lessons/${continueSlug}`}
              className="flex items-center gap-4 rounded-2xl p-5 transition-all group"
              style={{ background: 'var(--surface)', border: '1px solid rgba(107,139,255,0.2)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(107,139,255,0.4)'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(107,139,255,0.2)'; el.style.transform = '' }}
            >
              <div className="text-4xl flex-shrink-0">{LESSON_META[continueSlug].icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs uppercase tracking-wider mb-0.5" style={{ color: '#6B8BFF' }}>
                  {language === 'ru' ? '▶ Продолжить' : '▶ Continue'}
                </p>
                <p className="font-bold truncate transition-colors" style={{ color: 'var(--text)' }}>
                  {language === 'ru' ? LESSON_META[continueSlug].title : LESSON_META[continueSlug].title_en}
                </p>
              </div>
              <div className="text-xl transition-transform group-hover:translate-x-1" style={{ color: '#6B8BFF' }}>→</div>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Lessons grid */}
          <div className="lg:col-span-2">
            <h2 className="font-heading font-bold text-xl mb-4" style={{ color: 'var(--text)' }}>
              {t('dashboard.yourLessons', 'Уроки')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LESSON_SLUGS.map((slug, i) => {
                const meta = LESSON_META[slug]
                const p = progress[slug]
                const done = p?.completed
                const score = p?.quizScore ?? 0

                return (
                  <motion.div key={slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link to={`/lessons/${slug}`}
                      className="flex items-start gap-3 rounded-2xl p-4 transition-all group"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(107,139,255,0.25)'; el.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.transform = '' }}
                    >
                      <span className="text-2xl flex-shrink-0 mt-0.5">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate transition-colors" style={{ color: 'var(--text)' }}>
                          {language === 'en' ? meta.title_en : meta.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {done ? (
                            <span className="text-xs font-semibold" style={{ color: '#38BDF8' }}>✅ {score}%</span>
                          ) : (
                            <span className="text-xs" style={{ color: 'var(--muted)' }}>{t('dashboard.notStarted', 'Не начат')}</span>
                          )}
                        </div>
                        {done && (
                          <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                            <div className="h-full rounded-full" style={{ width: `${score}%`, background: 'linear-gradient(90deg,#4361EE,#38BDF8)' }} />
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <motion.div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            >
              <h3 className="font-heading font-bold mb-4" style={{ color: 'var(--text)' }}>
                🏅 {t('dashboard.badgesTitle', 'Достижения')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {BADGES.map((badge) => {
                  const earned = earnedBadges.has(badge.id)
                  return (
                    <div key={badge.id} title={t(`badges.${badge.id}`, badge.id)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${earned ? 'animate-badge-reveal' : 'opacity-30 grayscale'}`}
                      style={earned ? { background: 'rgba(67,97,238,0.12)', border: '1px solid rgba(67,97,238,0.2)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}
                    >
                      {badge.emoji}
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Radar */}
            {completedCount > 0 && (
              <motion.div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              >
                <h3 className="font-heading font-bold mb-4" style={{ color: 'var(--text)' }}>
                  📊 {t('dashboard.skills', 'Навыки')}
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.07)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: 'rgba(232,236,255,0.4)' }} />
                    <Radar
                      dataKey="score"
                      stroke="#4361EE"
                      fill="#4361EE"
                      fillOpacity={0.25}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Quick actions */}
            <motion.div className="rounded-2xl p-6 space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            >
              <h3 className="font-heading font-bold mb-3" style={{ color: 'var(--text)' }}>
                {t('dashboard.quickActions', 'Быстрые действия')}
              </h3>
              {[
                { to: '/lessons', icon: '📚', label: t('dashboard.allLessons', 'Все уроки') },
                { to: '/sandbox', icon: '🧪', label: language === 'ru' ? 'Песочница' : 'Sandbox' },
                { to: '/glossary', icon: '📖', label: t('dashboard.glossary', 'Словарь терминов') },
                { to: '/assignments', icon: '📝', label: t('dashboard.assignments', 'Задания') },
              ].map(({ to, icon, label }) => (
                <Link key={to} to={to}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all"
                  style={{ color: 'var(--muted)', background: 'transparent' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(67,97,238,0.08)'; el.style.color = 'var(--text)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'var(--muted)' }}
                >
                  {icon} {label}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
