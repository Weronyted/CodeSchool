import {
  collection, doc, addDoc, getDocs, setDoc, deleteDoc,
  query, where, updateDoc, getDoc,
} from 'firebase/firestore'
import { db } from './firebase'
import type { DynamicLesson, Assignment, ClassGroup, ClassMember } from '@/types/roles'

// ── Dynamic Lessons ─────────────────────────────────────────────────────────

export async function getDynamicLessons(): Promise<DynamicLesson[]> {
  const snap = await getDocs(collection(db, 'lessons'))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as DynamicLesson))
}

export async function createDynamicLesson(data: Partial<DynamicLesson>): Promise<DynamicLesson> {
  const ref = await addDoc(collection(db, 'lessons'), { ...data, createdAt: Date.now() })
  return { id: ref.id, ...data } as DynamicLesson
}

export async function updateDynamicLesson(id: string, data: Partial<DynamicLesson>): Promise<void> {
  await updateDoc(doc(db, 'lessons', id), { ...data, updatedAt: Date.now() })
}

export async function deleteDynamicLesson(id: string): Promise<void> {
  await deleteDoc(doc(db, 'lessons', id))
}

export async function getDynamicLessonBySlug(slug: string): Promise<DynamicLesson | null> {
  const snap = await getDocs(query(collection(db, 'lessons'), where('slug', '==', slug), where('published', '==', true)))
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...d.data() } as DynamicLesson
}

// ── Assignments ─────────────────────────────────────────────────────────────

export async function getAssignments(teacherId: string): Promise<Assignment[]> {
  const snap = await getDocs(query(collection(db, 'assignments'), where('teacherId', '==', teacherId)))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Assignment))
}

export async function getAssignmentsForStudent(_studentId: string): Promise<Assignment[]> {
  const snap = await getDocs(
    query(collection(db, 'assignments'), where('published', '==', true))
  )
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Assignment))
}

function stripUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>
}

export async function createAssignment(data: Partial<Assignment>): Promise<Assignment> {
  const clean = stripUndefined({ ...data, createdAt: Date.now(), published: true })
  const ref = await addDoc(collection(db, 'assignments'), clean)
  return { id: ref.id, ...data } as Assignment
}

export async function updateAssignment(id: string, data: Partial<Assignment>): Promise<void> {
  await updateDoc(doc(db, 'assignments', id), data)
}

export async function deleteAssignment(id: string): Promise<void> {
  await deleteDoc(doc(db, 'assignments', id))
}

export async function submitAssignment(
  assignmentId: string,
  studentId: string,
  answer: string,
  extra?: { displayName?: string; answerHtml?: string; answerCss?: string },
): Promise<void> {
  await addDoc(collection(db, 'submissions'), stripUndefined({
    assignmentId,
    studentId,
    answer,
    displayName: extra?.displayName,
    answerHtml: extra?.answerHtml,
    answerCss: extra?.answerCss,
    submittedAt: Date.now(),
  }))
}

// ── Classes ──────────────────────────────────────────────────────────────────

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function getClasses(): Promise<ClassGroup[]> {
  const snap = await getDocs(collection(db, 'classes'))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ClassGroup))
}

export async function createClass(data: Partial<ClassGroup>): Promise<ClassGroup> {
  const inviteCode = generateInviteCode()
  const ref = await addDoc(collection(db, 'classes'), {
    ...data,
    inviteCode,
    createdAt: Date.now(),
  })
  return { id: ref.id, ...data, inviteCode } as ClassGroup
}

export async function deleteClass(id: string): Promise<void> {
  await deleteDoc(doc(db, 'classes', id))
}

export async function addMemberToClass(
  classId: string,
  member: { uid: string; displayName: string; email: string }
): Promise<void> {
  await setDoc(doc(db, 'classes', classId, 'members', member.uid), {
    uid: member.uid,
    displayName: member.displayName,
    email: member.email,
    role: 'student',
    joinedAt: Date.now(),
  })
}

export async function removeClassMember(classId: string, uid: string): Promise<void> {
  await deleteDoc(doc(db, 'classes', classId, 'members', uid))
}

export async function getClassMembers(classId: string): Promise<ClassMember[]> {
  const snap = await getDocs(collection(db, 'classes', classId, 'members'))
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() } as ClassMember))
}

export async function joinClassByCode(code: string, uid: string, displayName: string, email: string): Promise<string> {
  const snap = await getDocs(query(collection(db, 'classes'), where('inviteCode', '==', code)))
  if (snap.empty) throw new Error('Class not found')
  const classId = snap.docs[0].id
  await setDoc(doc(db, 'classes', classId, 'members', uid), {
    uid,
    displayName,
    role: 'student',
    joinedAt: Date.now(),
  })
  // Grant student access if this user has no role yet
  const roleSnap = await getDoc(doc(db, 'userRoles', uid))
  if (!roleSnap.exists()) {
    await setDoc(doc(db, 'userRoles', uid), { role: 'student', displayName, email })
  }
  return classId
}
