import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  children?: ReactNode
}

export function Card({ padding = 'md', hover, className, children, ...props }: CardProps) {
  const paddings = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-6' }
  return (
    <div
      className={cn(
        'rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
        paddings[padding],
        hover && 'transition-all hover:border-primary/40 dark:hover:border-primary-dark/40 hover:shadow-md cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
