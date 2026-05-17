import { useProgressStore } from '@/store/useProgressStore'
import { useAuthStore } from '@/store/useAuthStore'
import { saveTopicProgress, saveQuizAttempt } from '@/services/progress.service'

export function useProgress(slug?: string) {
  const store = useProgressStore()
  const { user } = useAuthStore()

  const progress = slug ? store.progress[slug] : undefined
  const bestScore = slug ? store.getBestScore(slug) : 0
  const allProgress = store.progress

  function markVisited(s: string) {
    store.markVisited(s)
    if (user) saveTopicProgress(user.uid, s, { lastVisited: Date.now() }).catch(() => {})
  }

  function updateQuizScore(s: string, score: number) {
    store.updateQuizScore(s, score)
    if (user) {
      saveTopicProgress(user.uid, s, {
        quizScore: Math.max(store.getBestScore(s), score),
        quizAttempts: (store.progress[s]?.quizAttempts ?? 0) + 1,
        completed: score >= 60 || store.progress[s]?.completed,
      }).catch(() => {})
      saveQuizAttempt(user.uid, { topicSlug: s, score, maxScore: 100 }).catch(() => {})
    }
  }

  function toggleBookmark(s: string, sectionId: string) {
    store.toggleBookmark(s, sectionId)
    if (user) {
      const updated = store.progress[s]?.bookmarks ?? []
      saveTopicProgress(user.uid, s, { bookmarks: updated }).catch(() => {})
    }
  }

  return {
    progress,
    bestScore,
    allProgress,
    streak: store.streak,
    completedCount: store.getCompletedCount(),
    markVisited,
    updateQuizScore,
    toggleBookmark,
  }
}
