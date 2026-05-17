import { create } from 'zustand'
import type { User } from 'firebase/auth'

interface AuthStore {
  user: User | null
  loading: boolean
  needsProfileSetup: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setNeedsProfileSetup: (v: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  needsProfileSetup: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setNeedsProfileSetup: (v) => set({ needsProfileSetup: v }),
}))
