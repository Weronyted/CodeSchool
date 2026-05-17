import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import type { UserRole } from '@/types/roles'

interface UserRecord {
  uid: string
  email: string
  displayName: string
  role: UserRole
}

const ROLES: UserRole[] = ['student', 'teacher', 'admin', 'owner']

export default function UsersTab() {
  const { t } = useTranslation()
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getDocs(collection(db, 'users')).then((snap) => {
      setUsers(snap.docs.map((d) => ({ uid: d.id, ...d.data() } as UserRecord)))
    }).finally(() => setLoading(false))
  }, [])

  const updateRole = async (uid: string, role: UserRole) => {
    await updateDoc(doc(db, 'users', uid), { role })
    setUsers((prev) => prev.map((u) => u.uid === uid ? { ...u, role } : u))
  }

  const filtered = users.filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.displayName?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('admin.searchUsers', 'Поиск по имени или email...')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-400">Загрузка...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 text-left">
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">{t('admin.user', 'Пользователь')}</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">{t('admin.email', 'Email')}</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">{t('admin.role', 'Роль')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((u) => (
                <tr key={u.uid}>
                  <td className="py-3 font-medium text-gray-900 dark:text-white">{u.displayName || '—'}</td>
                  <td className="py-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                  <td className="py-3">
                    <select
                      value={u.role}
                      onChange={(e) => updateRole(u.uid, e.target.value as UserRole)}
                      className="px-3 py-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{t(`roles.${r}`, r)}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
