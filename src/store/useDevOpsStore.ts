import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEVOPS_SLUGS } from '@/devops'
import type { DevOpsLessonProgress, PipelineStatus } from '@/types/devops'

// Kept deliberately separate from useProgressStore: the Dashboard counts every
// key in that store as a lesson of the main 40-lesson course, so mixing DevOps
// progress in would skew its counters and badges.

export const DEVOPS_PASS_MARK = 60

const defaultLesson = (): DevOpsLessonProgress => ({
  visited: false,
  labsPassed: [],
  labsTotal: 0,
  quizTotal: 0,
  quizScore: 0,
  quizAttempts: 0,
  passed: false,
  failed: false,
  lastVisited: 0,
  timeSpentSeconds: 0,
})

interface DevOpsStore {
  progress: Record<string, DevOpsLessonProgress>

  markVisited: (slug: string, labsTotal: number, quizTotal: number) => void
  passLab: (slug: string, labId: string) => void
  resetLab: (slug: string, labId: string) => void
  submitQuiz: (slug: string, score: number) => void
  addTimeSpent: (slug: string, seconds: number) => void
  mergeFromCloud: (data: Record<string, DevOpsLessonProgress>) => void
  clear: () => void

  get: (slug: string) => DevOpsLessonProgress
  isUnlocked: (slug: string) => boolean
  statusOf: (slug: string) => PipelineStatus
  passedCount: () => number
}

/** Recompute `passed` from the parts — a lesson is green only when every lab is
 *  green and the quiz (if any) cleared the pass mark. */
function recompute(p: DevOpsLessonProgress): DevOpsLessonProgress {
  const labsDone = p.labsPassed.length >= p.labsTotal
  const quizDone = p.quizTotal === 0 || p.quizScore >= DEVOPS_PASS_MARK
  return { ...p, passed: labsDone && quizDone }
}

export const useDevOpsStore = create<DevOpsStore>()(
  persist(
    (set, get) => ({
      progress: {},

      markVisited: (slug, labsTotal, quizTotal) => {
        set((s) => {
          const prev = { ...defaultLesson(), ...s.progress[slug] }
          const next = { ...prev, visited: true, labsTotal, quizTotal, lastVisited: Date.now() }
          return { progress: { ...s.progress, [slug]: recompute(next) } }
        })
      },

      passLab: (slug, labId) => {
        set((s) => {
          const prev = { ...defaultLesson(), ...s.progress[slug] }
          if (prev.labsPassed.includes(labId)) return s
          const next = { ...prev, labsPassed: [...prev.labsPassed, labId] }
          return { progress: { ...s.progress, [slug]: recompute(next) } }
        })
      },

      resetLab: (slug, labId) => {
        set((s) => {
          const prev = s.progress[slug]
          if (!prev) return s
          const next = { ...prev, labsPassed: prev.labsPassed.filter((id) => id !== labId) }
          return { progress: { ...s.progress, [slug]: { ...next, passed: false } } }
        })
      },

      submitQuiz: (slug, score) => {
        set((s) => {
          const prev = { ...defaultLesson(), ...s.progress[slug] }
          const next: DevOpsLessonProgress = {
            ...prev,
            quizScore: Math.max(prev.quizScore, score),
            quizAttempts: prev.quizAttempts + 1,
            failed: score < DEVOPS_PASS_MARK && prev.quizScore < DEVOPS_PASS_MARK,
          }
          return { progress: { ...s.progress, [slug]: recompute(next) } }
        })
      },

      addTimeSpent: (slug, seconds) => {
        set((s) => {
          const prev = { ...defaultLesson(), ...s.progress[slug] }
          return {
            progress: {
              ...s.progress,
              [slug]: { ...prev, timeSpentSeconds: prev.timeSpentSeconds + seconds },
            },
          }
        })
      },

      mergeFromCloud: (data) => {
        set((s) => ({
          progress: {
            ...s.progress,
            ...Object.fromEntries(
              Object.entries(data).map(([k, v]) => [k, { ...defaultLesson(), ...v }])
            ),
          },
        }))
      },

      clear: () => set({ progress: {} }),

      get: (slug) => ({ ...defaultLesson(), ...get().progress[slug] }),

      isUnlocked: (slug) => {
        const i = DEVOPS_SLUGS.indexOf(slug)
        if (i <= 0) return true
        return get().progress[DEVOPS_SLUGS[i - 1]]?.passed === true
      },

      statusOf: (slug) => {
        const p = get().progress[slug]
        if (p?.passed) return 'success'
        if (!get().isUnlocked(slug)) return 'blocked'
        if (p?.failed) return 'failed'
        if (p?.visited) return 'running'
        return 'queued'
      },

      passedCount: () => Object.values(get().progress).filter((p) => p.passed).length,
    }),
    { name: 'codeschool-devops-progress' }
  )
)

// ─── Status presentation ────────────────────────────────────────────────────

export const STATUS_META: Record<
  PipelineStatus,
  { color: string; glyph: string; label_ru: string; label_en: string }
> = {
  blocked: { color: '#6B7280', glyph: '⏸', label_ru: 'Заблокировано', label_en: 'Blocked' },
  queued:  { color: '#38BDF8', glyph: '○', label_ru: 'В очереди',     label_en: 'Queued' },
  running: { color: '#F08C00', glyph: '◐', label_ru: 'В процессе',    label_en: 'Running' },
  success: { color: '#2F9E44', glyph: '✓', label_ru: 'Успешно',       label_en: 'Passed' },
  failed:  { color: '#F472B6', glyph: '✕', label_ru: 'Провалено',     label_en: 'Failed' },
}
