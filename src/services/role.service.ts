import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore'
import { db } from './firebase'
import type { UserRole, UserRoleRecord } from '@/types/roles'

const OWNER_UID = import.meta.env.VITE_OWNER_UID ?? ''

export function isOwnerUid(uid: string): boolean {
  return uid === OWNER_UID
}

export async function getUserRole(uid: string): Promise<UserRole> {
  if (isOwnerUid(uid)) return 'owner'
  const snap = await getDoc(doc(db, 'userRoles', uid))
  if (snap.exists()) return (snap.data() as UserRoleRecord).role
  return 'student'
}

export async function ensureUserRole(uid: string, displayName: string, email: string): Promise<UserRole> {
  if (isOwnerUid(uid)) {
    const snap = await getDoc(doc(db, 'userRoles', uid))
    if (!snap.exists() || (snap.data() as UserRoleRecord).role !== 'owner') {
      await setDoc(doc(db, 'userRoles', uid), { role: 'owner' as UserRole, displayName, email }, { merge: true })
    }
    return 'owner'
  }
  const snap = await getDoc(doc(db, 'userRoles', uid))
  if (snap.exists()) return (snap.data() as UserRoleRecord).role
  const record: UserRoleRecord = { role: 'student', displayName, email }
  await setDoc(doc(db, 'userRoles', uid), record)
  return 'student'
}

export async function setUserRole(targetUid: string, role: UserRole, assignerUid: string): Promise<void> {
  await setDoc(doc(db, 'userRoles', targetUid), { role, assignedBy: assignerUid, assignedAt: Date.now() }, { merge: true })
}

export async function listAllUsers(): Promise<Array<{ uid: string } & UserRoleRecord>> {
  const snap = await getDocs(collection(db, 'userRoles'))
  return snap.docs.map((d) => ({ uid: d.id, ...(d.data() as UserRoleRecord) }))
}
