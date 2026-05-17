import { useEffect, useRef } from 'react'
import { onAuthChange } from '@/services/auth.service'
import { ensureUserRole, getUserRole } from '@/services/role.service'
import { getAllProgress } from '@/services/progress.service'
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
        try {
          const role = await ensureUserRole(user.uid, user.displayName ?? '', user.email ?? '')
          setRole(role)
          const progress = await getAllProgress(user.uid)
          mergeFromFirestore(progress)
        } catch {
          const role = await getUserRole(user.uid)
          setRole(role)
        } finally {
          setRoleLoading(false)
        }
      } else {
        clearProgress()
        setRole(null)
      }
    })
    return unsub
  }, [])
}
