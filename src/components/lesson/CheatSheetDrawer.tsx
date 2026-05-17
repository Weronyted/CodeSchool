import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookOpen } from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'

interface CheatSheet {
  title: string
  items: Array<{ label: string; code: string; desc?: string }>
}

interface CheatSheetDrawerProps {
  sheets?: CheatSheet[]
}

export function CheatSheetDrawer({ sheets }: CheatSheetDrawerProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  if (!sheets?.length) return null

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="gap-2">
        <BookOpen size={14} />
        {t('lessons.cheatsheet')}
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title={t('lessons.cheatsheet')} side="right">
        <div className="p-5 space-y-6">
          {sheets.map((sheet) => (
            <div key={sheet.title}>
              <h3 className="font-heading font-semibold text-sm text-slate-900 dark:text-white mb-3">{sheet.title}</h3>
              <div className="space-y-2">
                {sheet.items.map((item) => (
                  <div key={item.label} className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{item.label}</p>
                    </div>
                    <pre className="px-3 py-2 text-xs font-mono text-primary dark:text-primary-dark overflow-x-auto">{item.code}</pre>
                    {item.desc && <p className="px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700">{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  )
}
