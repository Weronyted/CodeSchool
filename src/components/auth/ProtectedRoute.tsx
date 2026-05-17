import type { ReactNode } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { SignInPrompt } from './SignInPrompt'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) return <SignInPrompt />
  return <>{children}</>
}
