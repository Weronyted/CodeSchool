import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/useAuthStore'
import { useRoleStore } from '@/store/useRoleStore'
import UsersTab from './admin/UsersTab'
import LessonsTab from './admin/LessonsTab'
import ClassesTab from './admin/ClassesTab'
import AssignmentsTab from './admin/AssignmentsTab'

export default function AdminPanel() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { role } = useRoleStore()
  const [activeTab, setActiveTab] = useState('users')

  if (!user || (role !== 'admin' && role !== 'owner')) {
    return <Navigate to="/dashboard" replace />
  }

  const TABS = [
    { id: 'users', label: `👥 ${t('admin.tabs.users', 'Пользователи')}` },
    { id: 'lessons', label: `📚 ${t('admin.tabs.lessons', 'Уроки')}` },
    { id: 'classes', label: `🏫 ${t('admin.tabs.classes', 'Классы')}` },
    { id: 'assignments', label: `📝 ${t('admin.tabs.assignments', 'Задания')}` },
  ]

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            ⚙️ {t('admin.title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {role === 'owner' ? t('admin.ownerDesc', 'Полный доступ') : t('admin.adminDesc', 'Администратор')}
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                }`}
                style={activeTab === tab.id ? { backgroundColor: '#3B5BDB' } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content with animation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {activeTab === 'users' && <UsersTab />}
                {activeTab === 'lessons' && <LessonsTab />}
                {activeTab === 'classes' && <ClassesTab />}
                {activeTab === 'assignments' && <AssignmentsTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
