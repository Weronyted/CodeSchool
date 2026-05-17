import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TopicProgress {
  completed: boolean
  quizScore: number
  quizAttempts: number
  lastVisited: number
  timeSpentSeconds: number
  bookmarks: string[]
}

interface ProgressStore {
  progress: Record<string, TopicProgress>
  streak: number
  lastActiveDate: string

  markVisited: (slug: string) => void
  updateQuizScore: (slug: string, score: number) => void
  markCompleted: (slug: string) => void
  toggleBookmark: (slug: string, sectionId: string) => void
  addTimeSpent: (slug: string, seconds: number) => void
  mergeFromFirestore: (data: Record<string, TopicProgress>) => void
  getTopicProgress: (slug: string) => TopicProgress | undefined
  getCompletedCount: () => number
  getBestScore: (slug: string) => number
}

const defaultTopic = (): TopicProgress => ({
  completed: false,
  quizScore: 0,
  quizAttempts: 0,
  lastVisited: 0,
  timeSpentSeconds: 0,
  bookmarks: [],
})

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},
      streak: 0,
      lastActiveDate: '',

      markVisited: (slug) => {
        const today = new Date().toISOString().split('T')[0]
        set((s) => {
          const prev = s.progress[slug] ?? defaultTopic()
          const newStreak =
            s.lastActiveDate === today
              ? s.streak
              : s.lastActiveDate === new Date(Date.now() - 86400000).toISOString().split('T')[0]
              ? s.streak + 1
              : 1
          return {
            progress: { ...s.progress, [slug]: { ...prev, lastVisited: Date.now() } },
            streak: newStreak,
            lastActiveDate: today,
          }
        })
      },

      updateQuizScore: (slug, score) => {
        set((s) => {
          const prev = s.progress[slug] ?? defaultTopic()
          return {
            progress: {
              ...s.progress,
              [slug]: {
                ...prev,
                quizScore: Math.max(prev.quizScore, score),
                quizAttempts: prev.quizAttempts + 1,
                completed: score >= 60 || prev.completed,
              },
            },
          }
        })
      },

      markCompleted: (slug) => {
        set((s) => {
          const prev = s.progress[slug] ?? defaultTopic()
          return { progress: { ...s.progress, [slug]: { ...prev, completed: true } } }
        })
      },

      toggleBookmark: (slug, sectionId) => {
        set((s) => {
          const prev = s.progress[slug] ?? defaultTopic()
          const bookmarks = prev.bookmarks.includes(sectionId)
            ? prev.bookmarks.filter((b) => b !== sectionId)
            : [...prev.bookmarks, sectionId]
          return { progress: { ...s.progress, [slug]: { ...prev, bookmarks } } }
        })
      },

      addTimeSpent: (slug, seconds) => {
        set((s) => {
          const prev = s.progress[slug] ?? defaultTopic()
          return { progress: { ...s.progress, [slug]: { ...prev, timeSpentSeconds: prev.timeSpentSeconds + seconds } } }
        })
      },

      mergeFromFirestore: (data) => {
        set((s) => ({ progress: { ...s.progress, ...data } }))
      },

      getTopicProgress: (slug) => get().progress[slug],

      getCompletedCount: () => Object.values(get().progress).filter((p) => p.completed).length,

      getBestScore: (slug) => get().progress[slug]?.quizScore ?? 0,
    }),
    { name: 'codeschool-progress' }
  )
)
