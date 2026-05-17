import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { useToastStore } from '@/store/useToastStore'

const icons = {
  success: <CheckCircle2 size={18} className="text-success flex-shrink-0" />,
  error: <XCircle size={18} className="text-danger flex-shrink-0" />,
  info: <Info size={18} className="text-info flex-shrink-0" />,
}

export function Toaster() {
  const { toasts, remove } = useToastStore()
  return (
    <div className="fixed bottom-4 right-4 z-[100] space-y-2 w-80">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            {icons[t.type]}
            <p className="flex-1 text-sm text-slate-700 dark:text-slate-300">{t.message}</p>
            <button onClick={() => remove(t.id)} className="p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors flex-shrink-0">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
