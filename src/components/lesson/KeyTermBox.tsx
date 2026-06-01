import { useTranslation } from 'react-i18next'
import { Hash } from 'lucide-react'
import type { KeyTerm } from '@/types/lesson'

export function KeyTermBox({ terms }: { terms: KeyTerm[] }) {
  const { t } = useTranslation()
  return (
    <div className="rounded-2xl border border-primary/20 dark:border-primary-dark/30 bg-primary/5 dark:bg-primary-dark/10 p-5">
      <div className="space-y-4">
        {terms.map((term) => (
          <div key={term.term} className="flex gap-3">
            <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-primary/15 dark:bg-primary-dark/25 flex items-center justify-center">
              <Hash size={12} className="text-primary dark:text-primary-dark" />
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">{term.term}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{term.definition}</p>
              {term.example && (
                <p className="text-xs text-primary dark:text-primary-dark mt-1 italic">
                  {t('glossary.example')}: {term.example}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
