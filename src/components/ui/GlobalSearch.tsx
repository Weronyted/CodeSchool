import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen, Hash } from 'lucide-react'
import Fuse from 'fuse.js'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'
import { GLOSSARY_TERMS } from '@/glossary'

interface SearchResult {
  type: 'lesson' | 'glossary'
  slug?: string
  title: string
  description: string
}

function buildIndex(): SearchResult[] {
  const lessons = LESSON_SLUGS.map((slug) => ({
    type: 'lesson' as const,
    slug,
    title: LESSON_META[slug].title,
    description: LESSON_META[slug].description,
  }))
  const terms = GLOSSARY_TERMS.map((t) => ({
    type: 'glossary' as const,
    title: t.term,
    description: t.definition,
  }))
  return [...lessons, ...terms]
}

interface GlobalSearchProps {
  open: boolean
  onClose: () => void
}

export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [results, setResults] = useState<SearchResult[]>([])

  const index = useRef(new Fuse(buildIndex(), { keys: ['title', 'description'], threshold: 0.35 }))

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    setResults(index.current.search(query).slice(0, 8).map((r) => r.item))
  }, [query])

  function handleSelect(r: SearchResult) {
    if (r.type === 'lesson' && r.slug) navigate(`/lessons/${r.slug}`)
    else navigate('/glossary')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <Search size={18} className="text-slate-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 rounded border border-slate-200 dark:border-slate-600">
                Esc
              </kbd>
            </div>
            {results.length > 0 && (
              <ul className="py-2 max-h-80 overflow-y-auto">
                {results.map((r, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleSelect(r)}
                      className="w-full flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                    >
                      <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 dark:bg-primary-dark/20 flex items-center justify-center">
                        {r.type === 'lesson' ? <BookOpen size={12} className="text-primary dark:text-primary-dark" /> : <Hash size={12} className="text-primary dark:text-primary-dark" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{r.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{r.description}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {query && results.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Ничего не найдено по запросу «{query}»
              </p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
