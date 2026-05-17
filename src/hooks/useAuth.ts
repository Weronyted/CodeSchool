import { useEffect } from 'react'
import { onAuthChange } from '@/services/auth.service'
import { ensureUserRole, getUserRole } from '@/services/role.service'
import { getAllProgress } from '@/services/progress.service'
import { useAuthStore } from '@/store/useAuthStore'
import { useRoleStore } from '@/store/useRoleStore'
import { useProgressStore } from '@/store/useProgressStore'

export function useAuth() {
  const { setUser, setLoading } = useAuthStore()
  const { setRole, setRoleLoading } = useRoleStore()
  const { mergeFromFirestore } = useProgressStore()

  useEffect(() => {
    const unsub = onAuthChange(async (user) => {
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
        setRole(null)
      }
    })
    return unsub
  }, [])
}
