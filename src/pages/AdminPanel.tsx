import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/useAuthStore'
import { useRoleStore } from '@/store/useRoleStore'
import UsersTab from './admin/UsersTab'
import LessonsTab from './admin/LessonsTab'
import ClassesTab from './admin/ClassesTab'
import AssignmentsTab from './admin/AssignmentsTab'

const TABS = [
  { id: 'users', label: '👥 Пользователи' },
  { id: 'lessons', label: '📚 Уроки' },
  { id: 'classes', label: '🏫 Классы' },
  { id: 'assignments', label: '📝 Задания' },
]

export default function AdminPanel() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { role } = useRoleStore()
  const [activeTab, setActiveTab] = useState('users')

  if (!user || (role !== 'admin' && role !== 'owner')) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            ⚙️ {t('admin.title', 'Панель управления')}
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
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-200 dark:shadow-none'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'lessons' && <LessonsTab />}
            {activeTab === 'classes' && <ClassesTab />}
            {activeTab === 'assignments' && <AssignmentsTab />}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
