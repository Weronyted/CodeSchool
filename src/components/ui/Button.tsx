import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  children?: ReactNode
}

const variants = {
  primary: 'bg-primary dark:bg-primary-dark text-white hover:opacity-90 active:scale-[0.98]',
  secondary: 'bg-secondary dark:bg-secondary-dark text-white hover:opacity-90 active:scale-[0.98]',
  outline: 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
  ghost: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
  danger: 'bg-danger text-white hover:opacity-90 active:scale-[0.98]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm h-8 min-h-0',
  md: 'px-4 py-2 text-sm h-10',
  lg: 'px-6 py-3 text-base h-12',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, asChild, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none'

    if (asChild && children) {
      const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>
      return (
        <child.type
          {...child.props}
          className={cn(base, variants[variant], sizes[size], className, child.props.className)}
        />
      )
    }

    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
