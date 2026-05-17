import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import type { AssignmentSubmission } from '@/types/roles'

export async function submitAssignment(data: Omit<AssignmentSubmission, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'submissions'), data)
  return ref.id
}

export async function getSubmissionsByAssignment(assignmentId: string): Promise<AssignmentSubmission[]> {
  const snap = await getDocs(query(collection(db, 'submissions'), where('assignmentId', '==', assignmentId)))
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AssignmentSubmission, 'id'>) }))
}

export async function getSubmissionByUser(assignmentId: string, userId: string): Promise<AssignmentSubmission | null> {
  const snap = await getDocs(
    query(collection(db, 'submissions'), where('assignmentId', '==', assignmentId), where('userId', '==', userId))
  )
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...(d.data() as Omit<AssignmentSubmission, 'id'>) }
}

export async function gradeSubmission(id: string, manualScore: number, manualNote: string, gradedBy: string): Promise<void> {
  await updateDoc(doc(db, 'submissions', id), { manualScore, manualNote, gradedBy })
}
