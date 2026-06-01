import { doc, setDoc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from './firebase'
import type { TopicProgress } from '@/store/useProgressStore'

export async function saveTopicProgress(uid: string, topicSlug: string, data: Partial<TopicProgress>): Promise<void> {
  const ref = doc(db, 'users', uid, 'progress', topicSlug)
  await setDoc(ref, data, { merge: true })
}

export interface UserMeta { streak: number; lastActiveDate: string }

export async function saveUserMeta(uid: string, meta: UserMeta): Promise<void> {
  await setDoc(doc(db, 'users', uid), meta, { merge: true })
}

export async function getUserMeta(uid: string): Promise<UserMeta | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null
  const d = snap.data()
  return d.streak != null ? { streak: d.streak as number, lastActiveDate: d.lastActiveDate as string ?? '' } : null
}

export async function getAllProgress(uid: string): Promise<Record<string, TopicProgress>> {
  const snap = await getDocs(collection(db, 'users', uid, 'progress'))
  const result: Record<string, TopicProgress> = {}
  snap.forEach((d) => { result[d.id] = d.data() as TopicProgress })
  return result
}

export async function getTopicProgress(uid: string, topicSlug: string): Promise<TopicProgress | null> {
  const snap = await getDoc(doc(db, 'users', uid, 'progress', topicSlug))
  return snap.exists() ? (snap.data() as TopicProgress) : null
}

export interface QuizAttempt {
  topicSlug: string
  score: number
  maxScore: number
  submittedAt: number
}

export async function saveQuizAttempt(uid: string, attempt: Omit<QuizAttempt, 'submittedAt'>): Promise<void> {
  await addDoc(collection(db, 'users', uid, 'quizHistory'), {
    ...attempt,
    submittedAt: Date.now(),
  })
}

export async function getQuizHistory(uid: string): Promise<QuizAttempt[]> {
  const snap = await getDocs(collection(db, 'users', uid, 'quizHistory'))
  return snap.docs.map((d) => d.data() as QuizAttempt).sort((a, b) => b.submittedAt - a.submittedAt)
}
