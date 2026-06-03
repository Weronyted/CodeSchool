import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Search, Menu, X, Code2, LayoutDashboard, BookMarked, User, LogOut, ShieldCheck, ClipboardList, Globe, School, FlaskConical } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useRoleStore } from '@/store/useRoleStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useConfirmStore } from '@/store/useConfirmStore'
import { signOut } from '@/services/auth.service'
import { UserAvatar } from '@/components/auth/UserAvatar'

interface NavbarProps {
  onSearchOpen: () => void
  onSignInOpen: () => void
}

export function Navbar({ onSearchOpen, onSignInOpen }: NavbarProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const { theme, toggleTheme } = useThemeStore()
  const { user } = useAuthStore()
  const { isAdmin } = useRoleStore()
  const { toggleLanguage, language } = useLanguageStore()
  const { confirm } = useConfirmStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const navLinks = [
    { href: '/lessons', label: t('nav.lessons'), icon: Code2 },
    { href: '/sandbox', label: t('nav.sandbox', 'Песочница'), icon: FlaskConical },
    { href: '/assignments', label: t('nav.assignments'), icon: ClipboardList },
    { href: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { href: '/glossary', label: t('nav.glossary'), icon: BookMarked },
    ...(user ? [{ href: '/my-class', label: t('nav.class', 'Класс'), icon: School }] : []),
  ]

  async function handleSignOut() {
    setUserMenuOpen(false)
    const ok = await confirm({
      title: t('nav.signOutConfirmTitle', 'Выйти из аккаунта?'),
      message: t('nav.signOutConfirmMsg', 'Твой прогресс сохранён в облаке. Ты сможешь войти снова в любое время.'),
      confirmLabel: t('nav.signOut'),
      danger: true,
    })
    if (ok) await signOut()
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-heading font-semibold text-lg" style={{ color: '#3B5BDB' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3B5BDB' }}>
              <Code2 size={16} className="text-white" />
            </div>
            <span className="hidden sm:block">CodeSchool</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/' + href.split('/')[1])
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                style={location.pathname.startsWith('/' + href.split('/')[1]) ? { backgroundColor: '#3B5BDB' } : {}}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <button onClick={onSearchOpen} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Поиск (Ctrl+K)">
              <Search size={18} />
            </button>

            <button onClick={toggleLanguage} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Переключить язык (L)">
              <motion.div key={language} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
                <Globe size={18} />
              </motion.div>
              <span className="sr-only">{language === 'ru' ? 'EN' : 'RU'}</span>
            </button>

            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Тема (T)">
              <motion.div key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
            </button>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <UserAvatar user={user} size={32} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{user.displayName}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <User size={14} /> {t('nav.profile')}
                      </Link>
                      {isAdmin() && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" style={{ color: '#3B5BDB' }}>
                          <ShieldCheck size={14} /> {t('nav.admin')}
                        </Link>
                      )}
                      <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <LogOut size={14} /> {t('nav.signOut')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={onSignInOpen} className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90 active:scale-[0.98] ml-1" style={{ backgroundColor: '#3B5BDB' }}>
                {t('nav.signIn')}
              </button>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link key={href} to={href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Icon size={16} /> {label}
                </Link>
              ))}
              {!user && (
                <button onClick={() => { onSignInOpen(); setMobileOpen(false) }} className="w-full mt-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: '#3B5BDB' }}>
                  {t('nav.signIn')}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {userMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />}
    </nav>
  )
}
