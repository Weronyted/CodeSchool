import { useTranslation } from 'react-i18next'
import { Modal } from './Modal'
import { Button } from './Button'
import { useConfirmStore } from '@/store/useConfirmStore'

export function ConfirmDialog() {
  const { t } = useTranslation()
  const { open, options, answer } = useConfirmStore()

  if (!options) return null

  return (
    <Modal open={open} onClose={() => answer(false)} maxWidth="sm">
      <div className="p-6">
        <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-2">{options.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{options.message}</p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => answer(false)}>{t('common.cancel')}</Button>
          <Button variant={options.danger ? 'danger' : 'primary'} onClick={() => answer(true)}>
            {options.confirmLabel ?? t('common.yes')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
