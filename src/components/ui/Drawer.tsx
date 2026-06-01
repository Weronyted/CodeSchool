import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: 'left' | 'right' | 'bottom'
}

export function Drawer({ open, onClose, title, children, side = 'right' }: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const variants = {
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' }, className: 'left-0 top-0 h-full w-80 max-w-[90vw]' },
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, className: 'right-0 top-0 h-full w-80 max-w-[90vw]' },
    bottom: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' }, className: 'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl' },
  }

  const v = variants[side]

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={v.initial}
            animate={v.animate}
            exit={v.exit}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`absolute bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-y-auto ${v.className}`}
          >
            {title && (
              <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 z-10">
                <h2 className="font-heading font-semibold text-slate-900 dark:text-white">{title}</h2>
                <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <X size={18} />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
