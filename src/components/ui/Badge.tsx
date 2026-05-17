import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
  children?: ReactNode
}

const variants: Record<Variant, string> = {
  default: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
  primary: 'bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-dark',
  secondary: 'bg-secondary/10 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-dark',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
}
