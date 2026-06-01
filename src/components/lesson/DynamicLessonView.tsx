import { useTranslation } from 'react-i18next'
import { Clock } from 'lucide-react'
import type { DynamicLesson } from '@/types/roles'
import { LessonProgress } from './LessonProgress'
import { Badge } from '@/components/ui/Badge'

interface DynamicLessonViewProps {
  lesson: DynamicLesson
}

export function DynamicLessonView({ lesson }: DynamicLessonViewProps) {
  const { t } = useTranslation()
  const readTime = Math.max(1, Math.ceil(lesson.content.split(/\s+/).length / 200))

  return (
    <>
      <LessonProgress />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Badge variant="primary">{t('lessons.readTime', { min: readTime })}</Badge>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <Clock size={14} />
            <span>{t('lessons.readTime', { min: readTime })}</span>
          </div>
        </div>
        <h1 className="font-heading text-3xl font-semibold text-slate-900 dark:text-white mb-6">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{lesson.description}</p>
        )}
        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      </div>
    </>
  )
}
