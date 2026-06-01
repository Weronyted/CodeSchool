import {
  collection, doc, addDoc, getDoc, getDocs, setDoc, deleteDoc, query, where,
} from 'firebase/firestore'
import { db } from './firebase'
import type { ClassGroup, ClassMember } from '@/types/roles'

function generateCode(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export async function createClassGroup(name: string, teacherId: string, teacherName: string): Promise<ClassGroup> {
  const data: Omit<ClassGroup, 'id'> = {
    name, teacherId, teacherName, inviteCode: generateCode(), createdAt: Date.now(),
  }
  const ref = await addDoc(collection(db, 'classGroups'), data)
  return { id: ref.id, ...data }
}

export async function getClassGroup(id: string): Promise<ClassGroup | null> {
  const snap = await getDoc(doc(db, 'classGroups', id))
  return snap.exists() ? { id: snap.id, ...(snap.data() as Omit<ClassGroup, 'id'>) } : null
}

export async function getClassGroupByCode(code: string): Promise<ClassGroup | null> {
  const snap = await getDocs(query(collection(db, 'classGroups'), where('inviteCode', '==', code.toUpperCase())))
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...(d.data() as Omit<ClassGroup, 'id'>) }
}

export async function listTeacherClasses(teacherId: string): Promise<ClassGroup[]> {
  const snap = await getDocs(query(collection(db, 'classGroups'), where('teacherId', '==', teacherId)))
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ClassGroup, 'id'>) }))
}

export async function deleteClassGroup(classId: string): Promise<void> {
  await deleteDoc(doc(db, 'classGroups', classId))
}

export async function joinClassGroup(classId: string, uid: string, displayName: string, email: string): Promise<void> {
  const member: ClassMember = { uid, displayName, email, role: 'student', joinedAt: Date.now() }
  await setDoc(doc(db, 'classGroups', classId, 'members', uid), member)
}

export async function getClassMembers(classId: string): Promise<ClassMember[]> {
  const snap = await getDocs(collection(db, 'classGroups', classId, 'members'))
  return snap.docs.map((d) => d.data() as ClassMember)
}

export async function removeClassMember(classId: string, uid: string): Promise<void> {
  await deleteDoc(doc(db, 'classGroups', classId, 'members', uid))
}
