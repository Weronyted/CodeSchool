import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '@/i18n'

type Language = 'ru' | 'en'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'ru',
      setLanguage: (language) => {
        i18n.changeLanguage(language)
        set({ language })
      },
      toggleLanguage: () => {
        const next: Language = get().language === 'ru' ? 'en' : 'ru'
        i18n.changeLanguage(next)
        set({ language: next })
      },
    }),
    {
      name: 'codeschool-language',
      onRehydrateStorage: () => (state) => {
        if (state) i18n.changeLanguage(state.language)
      },
    }
  )
)
