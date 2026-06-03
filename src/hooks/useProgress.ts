import { useProgressStore } from '@/store/useProgressStore'
import { useAuthStore } from '@/store/useAuthStore'
import { saveTopicProgress, saveQuizAttempt, saveUserMeta } from '@/services/progress.service'

export function useProgress(slug?: string) {
  const store = useProgressStore()
  const { user } = useAuthStore()

  const progress = slug ? store.progress[slug] : undefined
  const bestScore = slug ? store.getBestScore(slug) : 0
  const allProgress = store.progress

  function markVisited(s: string) {
    store.markVisited(s)
    if (user) {
      // Read fresh state after synchronous Zustand update
      const fresh = useProgressStore.getState()
      saveTopicProgress(user.uid, s, { lastVisited: Date.now() }).catch(() => {})
      saveUserMeta(user.uid, { streak: fresh.streak, lastActiveDate: fresh.lastActiveDate }).catch(() => {})
    }
  }

  function updateQuizScore(s: string, score: number) {
    store.updateQuizScore(s, score)
    if (user) {
      const fresh = useProgressStore.getState()
      const freshTopic = fresh.progress[s]
      saveTopicProgress(user.uid, s, {
        quizScore: freshTopic?.quizScore ?? score,
        quizAttempts: freshTopic?.quizAttempts ?? 1,
        completed: freshTopic?.completed ?? false,
      }).catch(() => {})
      saveQuizAttempt(user.uid, { topicSlug: s, score, maxScore: 100 }).catch(() => {})
    }
  }

  function toggleBookmark(s: string, sectionId: string) {
    store.toggleBookmark(s, sectionId)
    if (user) {
      // Read fresh state after synchronous Zustand update to avoid stale closure
      const freshBookmarks = useProgressStore.getState().progress[s]?.bookmarks ?? []
      saveTopicProgress(user.uid, s, { bookmarks: freshBookmarks }).catch(() => {})
    }
  }

  function addTimeSpent(s: string, seconds: number) {
    store.addTimeSpent(s, seconds)
    if (user) {
      const fresh = useProgressStore.getState()
      saveTopicProgress(user.uid, s, {
        timeSpentSeconds: fresh.progress[s]?.timeSpentSeconds ?? seconds,
      }).catch(() => {})
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
    addTimeSpent,
  }
}
