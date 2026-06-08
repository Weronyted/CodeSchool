import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Code2, LayoutDashboard, BookMarked, User, LogOut, ShieldCheck, ClipboardList, Globe, School, FlaskConical, Map } from 'lucide-react'
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
  useThemeStore()
  const { user } = useAuthStore()
  const { isAdmin } = useRoleStore()
  const { toggleLanguage, language } = useLanguageStore()
  const { confirm } = useConfirmStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const navLinks = [
    { href: '/lessons', label: t('nav.lessons'), icon: Code2 },
    { href: '/roadmap', label: t('nav.roadmap', 'Roadmap'), icon: Map },
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
    <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(6,8,16,0.75)', backdropFilter: 'blur(20px)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-heading font-bold text-[17px]" style={{ color: 'var(--text)' }}>
            <div className="w-8 h-8 rounded-[9px] flex items-center justify-center text-white font-mono text-xs" style={{ background: 'var(--blue)', boxShadow: '0 0 18px rgba(67,97,238,0.4)' }}>
              &lt;/&gt;
            </div>
            <span className="hidden sm:block">CodeSchool</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const isActive = location.pathname.startsWith('/' + href.split('/')[1])
              return (
                <Link
                  key={href}
                  to={href}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{ color: isActive ? 'var(--text)' : 'var(--muted)' }}
                  onMouseEnter={e => { if (!isActive) (e.target as HTMLElement).style.color = 'var(--text)'; (e.target as HTMLElement).style.background = 'var(--surface)' }}
                  onMouseLeave={e => { if (!isActive) (e.target as HTMLElement).style.color = 'var(--muted)'; (e.target as HTMLElement).style.background = '' }}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <button onClick={onSearchOpen} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--muted)' }} title="Поиск (Ctrl+K)">
              <Search size={18} />
            </button>

            <button onClick={toggleLanguage} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--muted)' }} title="Переключить язык">
              <motion.div key={language} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
                <Globe size={18} />
              </motion.div>
            </button>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1 rounded-lg transition-colors" style={{ background: userMenuOpen ? 'var(--surface)' : '' }}>
                  <UserAvatar user={user} size={32} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-1 w-52 rounded-xl overflow-hidden z-50"
                      style={{ background: '#0e1022', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                    >
                      <div className="px-3 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                        <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{user.displayName}</p>
                        <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{user.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm transition-colors" style={{ color: 'var(--muted)' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')} onMouseLeave={e => (e.currentTarget.style.background = '')}>
                        <User size={14} /> {t('nav.profile')}
                      </Link>
                      {isAdmin() && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm transition-colors" style={{ color: '#6B8BFF' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')} onMouseLeave={e => (e.currentTarget.style.background = '')}>
                          <ShieldCheck size={14} /> {t('nav.admin')}
                        </Link>
                      )}
                      <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors" style={{ color: '#F472B6' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(244,114,182,0.08)')} onMouseLeave={e => (e.currentTarget.style.background = '')}>
                        <LogOut size={14} /> {t('nav.signOut')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={onSignInOpen} className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all btn-sheen ml-1" style={{ background: 'var(--blue)', boxShadow: '0 4px 20px rgba(67,97,238,0.35)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(67,97,238,0.5)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(67,97,238,0.35)' }}
              >
                {t('nav.signIn')}
              </button>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg transition-colors" style={{ color: 'var(--muted)' }}>
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
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(6,8,16,0.95)', borderTop: '1px solid var(--border)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link key={href} to={href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors" style={{ color: 'var(--muted)' }}>
                  <Icon size={16} /> {label}
                </Link>
              ))}
              {!user && (
                <button onClick={() => { onSignInOpen(); setMobileOpen(false) }} className="w-full mt-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold btn-sheen" style={{ background: 'var(--blue)' }}>
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
