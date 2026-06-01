import { useState, useEffect } from 'react'

export function LessonProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200 dark:bg-slate-800">
      <div
        className="h-full bg-primary dark:bg-primary-dark transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
