import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  collection, addDoc, getDocs, deleteDoc, doc, query, orderBy,
} from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/store/useAuthStore'
import { useRoleStore } from '@/store/useRoleStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { Trash2, Send } from 'lucide-react'

interface Comment {
  id: string
  uid: string
  displayName: string
  photoURL?: string
  text: string
  createdAt: number
}

interface Props {
  slug: string
}

function timeAgo(ts: number, lang: 'ru' | 'en'): string {
  const diff = Math.floor((Date.now() - ts) / 1000)
  if (diff < 60) return lang === 'ru' ? 'только что' : 'just now'
  if (diff < 3600) return lang === 'ru' ? `${Math.floor(diff / 60)} мин назад` : `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return lang === 'ru' ? `${Math.floor(diff / 3600)} ч назад` : `${Math.floor(diff / 3600)}h ago`
  return lang === 'ru' ? `${Math.floor(diff / 86400)} дн назад` : `${Math.floor(diff / 86400)}d ago`
}

export function LessonComments({ slug }: Props) {
  const { user } = useAuthStore()
  const { isTeacher } = useRoleStore()
  const { language } = useLanguageStore()
  const lang = language as 'ru' | 'en'
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)

  const colRef = collection(db, 'lessonComments', slug, 'entries')

  useEffect(() => {
    getDocs(query(colRef, orderBy('createdAt', 'asc')))
      .then((snap) => setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment))))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  async function post() {
    if (!user || !text.trim()) return
    setPosting(true)
    const entry = {
      uid: user.uid,
      displayName: user.displayName ?? user.email?.split('@')[0] ?? 'Аноним',
      photoURL: user.photoURL ?? null,
      text: text.trim(),
      createdAt: Date.now(),
    }
    try {
      const ref = await addDoc(colRef, entry)
      setComments((prev) => [...prev, { id: ref.id, ...entry }])
      setText('')
    } catch { /* silent */ }
    setPosting(false)
  }

  async function remove(commentId: string, authorUid: string) {
    if (!user) return
    if (user.uid !== authorUid && !isTeacher) return
    try {
      await deleteDoc(doc(db, 'lessonComments', slug, 'entries', commentId))
      setComments((prev) => prev.filter((c) => c.id !== commentId))
    } catch { /* silent */ }
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">
        💬 {lang === 'ru' ? 'Вопросы и ответы' : 'Q&A'}
        {comments.length > 0 && (
          <span className="ml-2 text-sm font-normal text-gray-400">({comments.length})</span>
        )}
      </h3>

      {/* Post form */}
      {user ? (
        <div className="flex gap-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-sm flex-shrink-0 overflow-hidden">
            {user.photoURL
              ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
              : <span>👤</span>}
          </div>
          <div className="flex-1 flex gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) post() }}
              placeholder={lang === 'ru' ? 'Задай вопрос или поделись мыслью...' : 'Ask a question or share a thought...'}
              rows={2}
              maxLength={1000}
              className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
            />
            <button
              onClick={post}
              disabled={!text.trim() || posting}
              className="self-end px-3 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white rounded-xl transition-colors flex-shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-500 dark:text-gray-400 text-center">
          {lang === 'ru' ? 'Войдите, чтобы оставить комментарий' : 'Sign in to leave a comment'}
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="text-center py-8 text-2xl animate-pulse">💬</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 text-gray-400 dark:text-gray-500">
          <div className="text-3xl mb-2">🤔</div>
          <p className="text-sm">{lang === 'ru' ? 'Пока вопросов нет. Будь первым!' : 'No questions yet. Be the first!'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {comments.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-sm flex-shrink-0 overflow-hidden">
                  {c.photoURL
                    ? <img src={c.photoURL} alt="" className="w-full h-full object-cover" />
                    : <span>👤</span>}
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{c.displayName}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{timeAgo(c.createdAt, lang)}</span>
                      {user && (user.uid === c.uid || isTeacher) && (
                        <button
                          onClick={() => remove(c.id, c.uid)}
                          className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{c.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
