import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import type { DevOpsLessonProgress } from '@/types/devops'

// DevOps progress lives in its own subcollection so it never mixes with the
// main course counters (Dashboard sums every doc under `progress`).

export async function saveDevOpsProgress(
  uid: string,
  slug: string,
  data: Partial<DevOpsLessonProgress>
): Promise<void> {
  await setDoc(doc(db, 'users', uid, 'devopsProgress', slug), data, { merge: true })
}

export async function getAllDevOpsProgress(uid: string): Promise<Record<string, DevOpsLessonProgress>> {
  const snap = await getDocs(collection(db, 'users', uid, 'devopsProgress'))
  const result: Record<string, DevOpsLessonProgress> = {}
  snap.forEach((d) => { result[d.id] = d.data() as DevOpsLessonProgress })
  return result
}
