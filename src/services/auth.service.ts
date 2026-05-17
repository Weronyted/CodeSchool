import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase'

const provider = new GoogleAuthProvider()

export async function signInWithGoogle(): Promise<{ user: User; isNewUser: boolean }> {
  const result = await signInWithPopup(auth, provider)
  let isNewUser = false
  try { isNewUser = await ensureUserProfile(result.user) } catch {}
  return { user: result.user, isNewUser }
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export async function signUpWithEmail(email: string, password: string, displayName: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(result.user, { displayName })
  try { await ensureUserProfile(result.user) } catch {}
  return result.user
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth)
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback)
}

export async function ensureUserProfile(user: User): Promise<boolean> {
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, {
      role: 'student',
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      photoURL: user.photoURL ?? null,
      createdAt: serverTimestamp(),
    })
    return true
  }
  return false
}

export async function updateDisplayName(user: User, displayName: string): Promise<void> {
  await updateProfile(user, { displayName })
  const ref = doc(db, 'users', user.uid)
  await setDoc(ref, { displayName }, { merge: true })
}
