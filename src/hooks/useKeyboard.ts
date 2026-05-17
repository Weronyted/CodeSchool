import { useEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'
import { useLanguageStore } from '@/store/useLanguageStore'

interface Options {
  onSearchOpen?: () => void
}

export function useKeyboard({ onSearchOpen }: Options = {}) {
  const { toggleTheme } = useThemeStore()
  const { toggleLanguage } = useLanguageStore()

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable

      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        onSearchOpen?.()
        return
      }

      if (isInput) return

      if (e.key === 't' || e.key === 'T') toggleTheme()
      if (e.key === 'l' || e.key === 'L') toggleLanguage()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onSearchOpen, toggleTheme, toggleLanguage])
}
