import type { ReactNode } from 'react'
import { Lightbulb } from 'lucide-react'

export function DidYouKnow({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500">
      <Lightbulb size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 dark:text-amber-300">{children}</p>
    </div>
  )
}
