import { MessageCircle } from 'lucide-react'
import { Tooltip } from './Tooltip'

export function SupportButton() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Tooltip content="Написать преподавателю">
        <a
          href="https://t.me/Weronyted"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-primary dark:bg-primary-dark text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <MessageCircle size={20} />
        </a>
      </Tooltip>
    </div>
  )
}
