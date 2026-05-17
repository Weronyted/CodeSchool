import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/store/useAuthStore'
import { useConfirmStore } from '@/store/useConfirmStore'
import { listAllUsers, setUserRole, isOwnerUid } from '@/services/role.service'
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
  const { user } = useAuthStore()
  const [users, setUsers] = useState<UserRecord[]>([])
  const { confirm } = useConfirmStore()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    listAllUsers().then((list) =>
      setUsers(list.map((u) => ({ uid: u.uid, email: u.email ?? '', displayName: u.displayName ?? '', role: u.role })))
    ).finally(() => setLoading(false))
  }, [])

  const updateRole = async (uid: string, role: UserRole) => {
    if (!user || isOwnerUid(uid)) return
    await setUserRole(uid, role, user.uid)
    setUsers((prev) => prev.map((u) => u.uid === uid ? { ...u, role } : u))
  }

  const handleDelete = async (uid: string, displayName: string) => {
    if (!user || isOwnerUid(uid) || uid === user.uid) return
    const ok = await confirm({
      title: t('admin.deleteUserTitle', 'Удалить пользователя?'),
      message: t('admin.deleteUserMsg', 'Пользователь «{{name}}» будет удалён из системы. Это действие необратимо.', { name: displayName || uid }),
      confirmLabel: t('common.delete', 'Удалить'),
      danger: true,
    })
    if (!ok) return
    await deleteDoc(doc(db, 'userRoles', uid))
    try { await deleteDoc(doc(db, 'users', uid)) } catch { /* doc may not exist */ }
    setUsers((prev) => prev.filter((u) => u.uid !== uid))
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
        <div className="py-12 text-center text-gray-400">{t('common.loading', 'Загрузка...')}</div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-gray-400">{t('admin.noUsers', 'Пользователи не найдены')}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 text-left">
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">{t('admin.user', 'Пользователь')}</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">{t('admin.email', 'Email')}</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">{t('admin.role', 'Роль')}</th>
                <th className="pb-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((u) => {
                const isOwner = isOwnerUid(u.uid)
                const isSelf = u.uid === user?.uid
                return (
                  <tr key={u.uid}>
                    <td className="py-3 font-medium text-gray-900 dark:text-white">
                      {u.displayName || '—'}
                      {isOwner && <span className="ml-2 text-xs text-amber-500 font-semibold">👑 Владелец</span>}
                      {isSelf && !isOwner && <span className="ml-2 text-xs text-gray-400">(вы)</span>}
                    </td>
                    <td className="py-3 text-gray-500 dark:text-gray-400">{u.email || '—'}</td>
                    <td className="py-3">
                      {isOwner ? (
                        <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-semibold">owner</span>
                      ) : (
                        <select
                          value={u.role}
                          onChange={(e) => updateRole(u.uid, e.target.value as UserRole)}
                          className="px-3 py-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          {ROLES.filter((r) => r !== 'owner').map((r) => (
                            <option key={r} value={r}>{t(`roles.${r}`, r)}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      {!isOwner && !isSelf && (
                        <button
                          onClick={() => handleDelete(u.uid, u.displayName)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1"
                          title={t('common.delete', 'Удалить')}
                        >
                          🗑️
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
