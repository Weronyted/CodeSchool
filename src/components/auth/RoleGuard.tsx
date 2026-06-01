import type { ReactNode } from 'react'
import { useRoleStore } from '@/store/useRoleStore'
import { useAuthStore } from '@/store/useAuthStore'

interface RoleGuardProps {
  children: ReactNode
  require?: 'admin' | 'teacher'
}

export function RoleGuard({ children, require = 'admin' }: RoleGuardProps) {
  const { user } = useAuthStore()
  const { isAdmin, isTeacher } = useRoleStore()

  if (!user) return null
  if (require === 'admin' && !isAdmin()) return null
  if (require === 'teacher' && !isTeacher()) return null

  return <>{children}</>
}
