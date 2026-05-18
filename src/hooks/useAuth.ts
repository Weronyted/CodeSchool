import { useEffect, useRef } from 'react'
import { onAuthChange } from '@/services/auth.service'
import { ensureUserRole, getUserRole } from '@/services/role.service'
import { getAllProgress, getUserMeta } from '@/services/progress.service'
import { useAuthStore } from '@/store/useAuthStore'
import { useRoleStore } from '@/store/useRoleStore'
import { useProgressStore } from '@/store/useProgressStore'

export function useAuth() {
  const { setUser, setLoading } = useAuthStore()
  const { setRole, setRoleLoading } = useRoleStore()
  const { mergeFromFirestore, clearProgress } = useProgressStore()
  const prevUidRef = useRef<string | null>(null)

  useEffect(() => {
    const unsub = onAuthChange(async (user) => {
      if (user && prevUidRef.current && prevUidRef.current !== user.uid) {
        clearProgress()
      }
      prevUidRef.current = user?.uid ?? null

      setUser(user)
      setLoading(false)

      if (user) {
        setRoleLoading(true)
        // Role and progress are loaded independently — a role error must not block progress sync
        try {
          const role = await ensureUserRole(user.uid, user.displayName ?? '', user.email ?? '')
          setRole(role)
        } catch {
          try {
            const role = await getUserRole(user.uid)
            setRole(role)
          } catch { /* stay with current role */ }
        } finally {
          setRoleLoading(false)
        }
        try {
          const [progress, meta] = await Promise.all([
            getAllProgress(user.uid),
            getUserMeta(user.uid),
          ])
          mergeFromFirestore(progress)
          if (meta) {
            useProgressStore.setState((s) => ({
              streak: Math.max(s.streak, meta.streak),
              lastActiveDate: meta.lastActiveDate || s.lastActiveDate,
            }))
          }
        } catch { /* silent — local progress still available */ }
      } else {
        clearProgress()
        setRole(null)
      }
    })
    return unsub
  }, [])
}
