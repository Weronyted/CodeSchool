import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import Fuse from 'fuse.js'
import { BILINGUAL_TERMS } from '@/glossary/bilingual'
import { useLanguageStore } from '@/store/useLanguageStore'
import TermModal from '@/components/glossary/TermModal'
import type { BilingualGlossaryTerm } from '@/types/glossary'

type Category = 'All' | 'Основы' | 'HTML' | 'CSS' | 'JS'

const CATEGORIES: Category[] = ['All', 'Основы', 'HTML', 'CSS', 'JS']

const CATEGORY_BADGE: Record<string, string> = {
  'Основы': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  HTML: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  CSS: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  JS: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
}

const CATEGORY_RING: Record<string, string> = {
  'Основы': 'hover:border-purple-400 dark:hover:border-purple-500',
  HTML: 'hover:border-orange-400 dark:hover:border-orange-500',
  CSS: 'hover:border-blue-400 dark:hover:border-blue-500',
  JS: 'hover:border-yellow-400 dark:hover:border-yellow-500',
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

export default function Glossary() {
  const { t } = useTranslation()
  const { language } = useLanguageStore()
  const lang = language as 'ru' | 'en'

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [selected, setSelected] = useState<BilingualGlossaryTerm | null>(null)

  const L = useCallback(
    (ru: string, en: string) => (lang === 'ru' ? ru : en),
    [lang]
  )

  const fuse = useMemo(
    () =>
      new Fuse(BILINGUAL_TERMS, {
        keys: ['term_ru', 'term_en', 'definition_ru', 'definition_en'],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    []
  )

  const filtered = useMemo(() => {
    let base: BilingualGlossaryTerm[]
    if (search.trim()) {
      base = fuse.search(search.trim()).map((r) => r.item)
    } else {
      base = BILINGUAL_TERMS
    }
    if (category !== 'All') {
      base = base.filter((t) => t.category === category)
    }
    return base
  }, [search, category, fuse])

  const catLabel = (c: Category) => {
    if (c === 'All') return L('Все', 'All')
    if (c === 'Основы') return L('Основы', 'Basics')
    return c
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* ── Header ─────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="font-heading text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              📖 {t('glossary.title', 'Словарь терминов')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {L(
                `${BILINGUAL_TERMS.length} терминов по HTML, CSS и JavaScript — с анимацией и примерами`,
                `${BILINGUAL_TERMS.length} terms on HTML, CSS and JavaScript — with animation and examples`
              )}
            </p>
          </motion.div>

          {/* ── Search ─────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="relative mb-5"
          >
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder={L('Поиск терминов…', 'Search terms…')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800
                         border border-gray-200 dark:border-gray-700 rounded-xl
                         text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary
                         dark:focus:ring-primary-dark transition-shadow"
            />
          </motion.div>

          {/* ── Category filter ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
                  category === cat
                    ? 'bg-primary text-white border-primary dark:bg-primary-dark dark:border-primary-dark'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-dark'
                }`}
              >
                {catLabel(cat)}
                <span className={`ml-1.5 text-xs font-normal opacity-70`}>
                  {cat === 'All'
                    ? BILINGUAL_TERMS.length
                    : BILINGUAL_TERMS.filter((t) => t.category === cat).length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* ── Card grid ──────────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${search}-${category}`}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((term) => (
                  <motion.button
                    key={term.id}
                    variants={item}
                    onClick={() => setSelected(term)}
                    className={`text-left bg-white dark:bg-gray-800 rounded-2xl p-5
                                border border-gray-200 dark:border-gray-700
                                transition-all duration-200 cursor-pointer
                                hover:shadow-lg hover:-translate-y-0.5
                                focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark
                                ${CATEGORY_RING[term.category]}`}
                  >
                    {/* Category badge */}
                    <span
                      className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${CATEGORY_BADGE[term.category]}`}
                    >
                      {term.category}
                    </span>

                    {/* Term name */}
                    <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight">
                      {lang === 'ru' ? term.term_ru : term.term_en}
                    </h3>

                    {/* Short definition */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3">
                      {lang === 'ru' ? term.definition_ru : term.definition_en}
                    </p>

                    {/* Example code snippet */}
                    <code className="block bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 text-xs font-mono px-3 py-2 rounded-lg truncate">
                      {lang === 'ru' ? term.example_ru : term.example_en}
                    </code>

                    {/* CTA hint */}
                    <p className="text-xs text-primary dark:text-primary-dark mt-3 font-medium">
                      {L('Посмотреть анимацию →', 'View animation →')}
                    </p>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-gray-400 dark:text-gray-600"
              >
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-lg font-medium">
                  {L('Термины не найдены', 'No terms found')}
                </p>
                <p className="text-sm mt-1">
                  {L('Попробуй другой запрос', 'Try a different search')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Term modal ───────────────────────────────────────────────────────── */}
      <TermModal
        term={selected}
        lang={lang}
        onClose={() => setSelected(null)}
      />
    </>
  )
}
