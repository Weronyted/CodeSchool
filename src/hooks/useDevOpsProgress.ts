import { useCallback } from 'react'
import { useDevOpsStore } from '@/store/useDevOpsStore'
import { useAuthStore } from '@/store/useAuthStore'
import { saveDevOpsProgress } from '@/services/devops.service'

/** Store actions + fire-and-forget cloud sync, mirroring hooks/useProgress.ts. */
export function useDevOpsProgress(slug?: string) {
  const store = useDevOpsStore()
  const user = useAuthStore((s) => s.user)

  const flush = useCallback((s: string) => {
    if (!user) return
    const fresh = useDevOpsStore.getState().progress[s]
    if (fresh) saveDevOpsProgress(user.uid, s, fresh).catch(() => {})
  }, [user])

  const markVisited = useCallback((s: string, labsTotal: number, quizTotal: number) => {
    useDevOpsStore.getState().markVisited(s, labsTotal, quizTotal)
    flush(s)
  }, [flush])

  const passLab = useCallback((s: string, labId: string) => {
    useDevOpsStore.getState().passLab(s, labId)
    flush(s)
  }, [flush])

  const submitQuiz = useCallback((s: string, score: number) => {
    useDevOpsStore.getState().submitQuiz(s, score)
    flush(s)
  }, [flush])

  const addTimeSpent = useCallback((s: string, seconds: number) => {
    useDevOpsStore.getState().addTimeSpent(s, seconds)
    flush(s)
  }, [flush])

  return {
    progress: slug ? store.progress[slug] : undefined,
    all: store.progress,
    status: slug ? store.statusOf(slug) : 'queued',
    isUnlocked: slug ? store.isUnlocked(slug) : true,
    passedCount: store.passedCount(),
    markVisited,
    passLab,
    submitQuiz,
    addTimeSpent,
  }
}
