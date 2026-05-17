import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { AuthModal } from '@/components/auth/AuthModal'
import { GlobalSearch } from '@/components/ui/GlobalSearch'
import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import LessonPage from '@/pages/LessonPage'
import LessonsListPage from '@/pages/LessonsListPage'
import AssignmentsListPage from '@/pages/AssignmentsListPage'
import ClassPage from '@/pages/ClassPage'
import JoinClass from '@/pages/JoinClass'
import Glossary from '@/pages/Glossary'
import Profile from '@/pages/Profile'
import AdminPanel from '@/pages/AdminPanel'
import TakeAssignment from '@/pages/TakeAssignment'
import NotFound from '@/pages/NotFound'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Toaster } from '@/components/ui/Toaster'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { SupportButton } from '@/components/ui/SupportButton'
import { useAuth } from '@/hooks/useAuth'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useLanguageStore } from '@/store/useLanguageStore'

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/lessons" element={<PageTransition><LessonsListPage /></PageTransition>} />
        <Route path="/lessons/:slug" element={<ProtectedRoute><PageTransition><LessonPage /></PageTransition></ProtectedRoute>} />
        <Route path="/assignments" element={<PageTransition><AssignmentsListPage /></PageTransition>} />
        <Route path="/assignments/:id" element={<ProtectedRoute><PageTransition><TakeAssignment /></PageTransition></ProtectedRoute>} />
        <Route path="/class/:classId" element={<ProtectedRoute><PageTransition><ClassPage /></PageTransition></ProtectedRoute>} />
        <Route path="/join/:code" element={<PageTransition><JoinClass /></PageTransition>} />
        <Route path="/glossary" element={<ProtectedRoute><PageTransition><Glossary /></PageTransition></ProtectedRoute>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPanel /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { language } = useLanguageStore()

  useAuth()
  useKeyboard({ onSearchOpen: () => setSearchOpen(true) })

  useEffect(() => {
    const handler = () => setAuthOpen(true)
    window.addEventListener('open-auth-modal', handler)
    return () => window.removeEventListener('open-auth-modal', handler)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-gray-950 font-body text-slate-900 dark:text-slate-100">
      <Navbar onSearchOpen={() => setSearchOpen(true)} onSignInOpen={() => setAuthOpen(true)} />

      <motion.main
        key={language}
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
      >
        <AppRoutes />
      </motion.main>

      <Footer />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toaster />
      <ConfirmDialog />
      <SupportButton />
    </div>
  )
}
