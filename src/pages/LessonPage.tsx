import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import CodeMirror from '@uiw/react-codemirror'
import { html as htmlLang } from '@codemirror/lang-html'
import { css as cssLang } from '@codemirror/lang-css'
import { javascript as jsLang } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { githubLight } from '@uiw/codemirror-theme-github'
import { Lightbulb, Play, SlidersHorizontal } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { useThemeStore } from '@/store/useThemeStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LESSON_SLUGS, LESSON_META } from '@/lessons'
import { MultipleChoiceQuiz } from '@/components/quiz/MultipleChoiceQuiz'
import { LessonQuiz } from '@/components/lesson/LessonQuiz'
import { SlideMode } from '@/components/lesson/SlideMode'
import { CheatSheetDrawer } from '@/components/lesson/CheatSheetDrawer'
import { HTMLStructureSVG } from '@/components/diagrams/HTMLStructureSVG'
import { CSSBoxModelSVG } from '@/components/diagrams/CSSBoxModelSVG'
import { DOMTreeSVG } from '@/components/diagrams/DOMTreeSVG'
import type { MultipleChoiceRow } from '@/types/lesson'
import type { Lesson, ContentBlock, BilingualKeyTerm, DidYouKnowItem, QuizQuestion, CodeLang } from '@/types/lesson'

type LessonSlug = typeof LESSON_SLUGS[number]

// ─── Lesson loaders (auto-discovers all files in src/lessons/) ───────────────

const LESSON_FILES = import.meta.glob('/src/lessons/*.ts')

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isNewLesson(lesson: Record<string, unknown>): lesson is unknown & { slides: unknown[] } {
  return Array.isArray(lesson.slides)
}

function detectLang(sectionId: string, code: string): 'html' | 'css' | 'javascript' {
  if (sectionId.includes('css') || (code.includes('{') && code.includes(':'))) return 'css'
  if (
    sectionId.includes('js') || sectionId.includes('javascript') ||
    sectionId.includes('event') || sectionId.includes('select') ||
    sectionId.includes('modify') || sectionId.includes('loop') ||
    sectionId.includes('array') || sectionId.includes('function') ||
    sectionId.includes('condition') || sectionId.includes('ternary') ||
    sectionId.includes('break') || sectionId.includes('map') ||
    sectionId.includes('interactivity') || sectionId.includes('style')
  ) return 'javascript'
  return 'html'
}

// ─── Shared code block ────────────────────────────────────────────────────────

function CodeBlock({ code, lang = 'html' }: { code: string; lang?: 'html' | 'css' | 'javascript' }) {
  const { theme } = useThemeStore()
  const ext = lang === 'css' ? [cssLang()] : lang === 'javascript' ? [jsLang()] : [htmlLang()]
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 my-4 text-sm">
      <CodeMirror
        value={code.trim()}
        extensions={ext}
        theme={theme === 'dark' ? oneDark : githubLight}
        editable={false}
        basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLineGutter: false }}
      />
    </div>
  )
}

// ─── OLD format section renderer ─────────────────────────────────────────────

interface LessonItem { name: string; description: string; example?: string }
interface WorkedExample { title: string; scenario?: string; solution: string }

function LegacySectionContent({ lesson, sectionId }: { lesson: Record<string, unknown>; sectionId: string }) {
  if (sectionId === 'key-terms') {
    const terms = lesson.keyTerms as Array<{ term: string; definition: string }> | undefined
    return (
      <div className="space-y-3">
        {terms?.map((item) => (
          <div key={item.term} className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
            <span className="font-semibold text-primary-700 dark:text-primary-300">{item.term}</span>
            <span className="text-gray-600 dark:text-gray-400"> — {item.definition}</span>
          </div>
        ))}
      </div>
    )
  }

  const camelKey = sectionId.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
  const content = lesson.content as Record<string, unknown> | undefined
  const block = content?.[camelKey] as Record<string, unknown> | undefined

  if (!block) return null

  const lang = detectLang(sectionId, (block.code as string) ?? '')

  return (
    <div className="space-y-4">
      {block.description
        ? <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{block.description as string}</p>
        : null}

      {block.items
        ? (
          <div className="space-y-3">
            {(block.items as LessonItem[]).map((item) => (
              <div key={item.name} className="bg-gray-50 dark:bg-gray-800/80 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <code className="text-primary-600 dark:text-primary-400 font-mono font-bold">{item.name}</code>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-2">{item.description}</p>
                {item.example ? <CodeBlock code={item.example} lang="javascript" /> : null}
              </div>
            ))}
          </div>
        ) : null}

      {block.code ? <CodeBlock code={block.code as string} lang={lang} /> : null}

      {(content?.workedExamples as WorkedExample[] | undefined)?.map((ex) => (
        <div key={ex.title} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">{ex.title}</h4>
          {ex.scenario && <p className="text-blue-700 dark:text-blue-400 text-sm mb-3">{ex.scenario}</p>}
          <CodeBlock code={ex.solution} lang="javascript" />
        </div>
      ))}
    </div>
  )
}

// ─── NEW format: bilingual section content ────────────────────────────────────

function NewSectionContent({ block, lang }: { block: ContentBlock; lang: 'ru' | 'en' }) {
  const text = lang === 'ru' ? block.text_ru : block.text_en
  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line break-words">{text}</p>
      {block.code && <CodeBlock code={block.code} lang={block.codeLang ?? 'html'} />}
    </div>
  )
}

// ─── NEW format: bilingual key terms ─────────────────────────────────────────

function NewKeyTerms({ terms, lang }: { terms: BilingualKeyTerm[]; lang: 'ru' | 'en' }) {
  return (
    <div className="space-y-3">
      {terms.map((kt) => {
        const term = lang === 'ru' ? kt.term_ru : kt.term_en
        const def = lang === 'ru' ? kt.definition_ru : kt.definition_en
        const example = lang === 'ru' ? kt.example_ru : kt.example_en
        return (
          <div key={kt.term_en} className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-100 dark:border-primary-900">
            <code className="font-semibold text-primary-700 dark:text-primary-300 font-mono">{term}</code>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{def}</p>
            {example && (
              <p className="text-xs text-primary-600 dark:text-primary-400 mt-1.5 italic">
                {lang === 'ru' ? 'Пример' : 'Example'}: {example}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── NEW format: did you know ────────────────────────────────────────────────

function NewDidYouKnow({ items, lang }: { items: DidYouKnowItem[]; lang: 'ru' | 'en' }) {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
      <h3 className="font-heading font-bold text-amber-800 dark:text-amber-300 mb-3">
        💡 {lang === 'ru' ? 'А ты знал?' : 'Did you know?'}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-amber-700 dark:text-amber-400 text-sm flex gap-2">
            <span>•</span>
            <span>{lang === 'ru' ? item.text_ru : item.text_en}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── NEW format: interactive editor task ─────────────────────────────────────

function EditorTask({ lesson, lang }: { lesson: Lesson; lang: 'ru' | 'en' }) {
  const { theme } = useThemeStore()
  const task = lesson.editorTask

  const [codes, setCodes] = useState<Partial<Record<CodeLang, string>>>(() => {
    if (!task) return {}
    return Object.fromEntries(task.activeTabs.map((tab) => [tab, task.starterCode[tab] ?? '']))
  })
  const [activeTab, setActiveTab] = useState<CodeLang>(task?.activeTabs[0] ?? 'html')
  const [preview, setPreview] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)

  if (!task) return null

  const ext = activeTab === 'css' ? [cssLang()] : activeTab === 'javascript' ? [jsLang()] : [htmlLang()]
  const instructions = lang === 'ru' ? task.instructions_ru : task.instructions_en
  const hints = lang === 'ru' ? task.hints_ru : task.hints_en

  function run() {
    const html = codes.html ?? ''
    const css  = codes.css  ?? ''
    const js   = codes.javascript ?? ''
    setPreview(
      `<!DOCTYPE html><html><head><style>${css}</style></head>` +
      `<body>${html}<script>${js}<\/script></body></html>`
    )
  }

  function nextHint() {
    setShowHint(true)
    setHintIndex((i) => Math.min(i + 1, hints.length - 1))
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">{instructions}</p>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Editor toolbar with tabs */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1">
            {task.activeTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-semibold transition-colors ${
                  activeTab === tab
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {hints.length > 0 && (
              <button
                onClick={nextHint}
                className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <Lightbulb size={12} />
                {lang === 'ru' ? 'Подсказка' : 'Hint'}
              </button>
            )}
            <button
              onClick={run}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold transition-colors"
            >
              <Play size={11} />
              {lang === 'ru' ? 'Запустить' : 'Run'}
            </button>
          </div>
        </div>

        {/* Hint bar */}
        <AnimatePresence>
          {showHint && hints[hintIndex] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 flex items-start gap-2">
                <Lightbulb size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400">{hints[hintIndex]}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Split: editor + preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[260px]">
          <div className="border-r border-gray-200 dark:border-gray-700">
            <CodeMirror
              value={codes[activeTab] ?? ''}
              extensions={ext}
              theme={theme === 'dark' ? oneDark : githubLight}
              onChange={(val) => setCodes((prev) => ({ ...prev, [activeTab]: val }))}
              minHeight="260px"
              basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true }}
            />
          </div>
          <div className="bg-white dark:bg-gray-900 relative">
            {preview ? (
              <iframe
                srcDoc={preview}
                title="preview"
                sandbox="allow-scripts"
                className="w-full h-full min-h-[260px] border-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600 text-sm">
                {lang === 'ru' ? '← Нажми «Запустить»' : '← Click "Run"'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { allProgress: progress, toggleBookmark, markVisited } = useProgress(slug)
  const { language } = useLanguageStore()

  const [lesson, setLesson] = useState<Record<string, unknown> | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [showSlides, setShowSlides] = useState(false)
  const [comingSoon, setComingSoon] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLElement>>({})
  const practiceRef = useRef<HTMLElement | null>(null)

  const isValidSlug = (s: string): s is LessonSlug => LESSON_SLUGS.includes(s as LessonSlug)
  const meta = slug && isValidSlug(slug) ? LESSON_META[slug] : null
  const slugIndex = slug ? LESSON_SLUGS.indexOf(slug as LessonSlug) : -1
  const prevSlug = slugIndex > 0 ? LESSON_SLUGS[slugIndex - 1] : null
  const nextSlug = slugIndex < LESSON_SLUGS.length - 1 ? LESSON_SLUGS[slugIndex + 1] : null
  const p = slug ? progress[slug] : undefined

  useEffect(() => {
    if (!slug || !isValidSlug(slug)) { navigate('/lessons'); return }
    window.scrollTo(0, 0)
    setLesson(null)
    setComingSoon(false)
    const filePath = `/src/lessons/${slug}.ts`
    const loader = LESSON_FILES[filePath]
    if (!loader) { setComingSoon(true); return }
    loader().then((mod) => {
      const record = mod as Record<string, unknown>
      const key = Object.keys(record).find((k) => k !== 'default')
      const data = key ? record[key] : record['default']
      if (data) {
        setLesson(data as Record<string, unknown>)
        markVisited(slug)
      }
    })
  }, [slug, navigate])

  useEffect(() => {
    if (!lesson) return
    const sections = lesson.sections as Array<{ id: string }> | undefined
    if (sections?.length) setActiveSection(sections[0].id)
  }, [lesson])

  useEffect(() => {
    if (!lesson) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) { setActiveSection(entry.target.id); break }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [lesson])

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }

  const scrollToPractice = () => {
    setShowSlides(false)
    setTimeout(() => practiceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  if (comingSoon && meta) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">{meta.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {language === 'ru' ? meta.title : meta.title_en}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {language === 'ru' ? 'Этот урок скоро появится. Мы активно работаем над курсом.' : 'This lesson is coming soon. We are actively working on the course.'}
          </p>
          <Link to="/lessons" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
            {language === 'ru' ? '← Все уроки' : '← All lessons'}
          </Link>
        </div>
      </div>
    )
  }

  if (!lesson || !slug || !meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-spin">⚙️</div>
      </div>
    )
  }

  const isNew = isNewLesson(lesson)
  const newLesson = isNew ? (lesson as unknown as Lesson) : null

  // ── Bilingual helpers for new format
  const lang = language

  // ── New format: sections with bilingual titles
  const newSections = (newLesson?.sections ?? []).filter((sec) =>
    sec.id === 'key-terms' ||
    (newLesson?.content.blocks ?? []).some((b: ContentBlock) => b.sectionId === sec.id)
  )
  // ── Old format: sections with single title
  const oldSections = !isNew ? (lesson.sections as Array<{ id: string; title: string }>) : []

  const allSections = isNew
    ? newSections.map((s) => ({ id: s.id, title: lang === 'ru' ? s.title_ru : s.title_en }))
    : oldSections

  const oldQuiz = !isNew ? (lesson.multipleChoiceQuiz as { scenario: string; rows: MultipleChoiceRow[] } | undefined) : undefined
  const oldDidYouKnow = !isNew ? (lesson.didYouKnow as string[] | undefined) : undefined
  const oldKeyTerms = !isNew ? (lesson.keyTerms as Array<{ term: string; definition: string }> | undefined) : undefined

  const cheatSheets = oldKeyTerms?.length
    ? [{ title: t('lesson.keyTerms', 'Ключевые термины'), items: oldKeyTerms.map((kt) => ({ label: kt.term, code: kt.definition })) }]
    : newLesson?.keyTerms.length
      ? [{
          title: lang === 'ru' ? 'Ключевые термины' : 'Key terms',
          items: newLesson.keyTerms.map((kt) => ({
            label: lang === 'ru' ? kt.term_ru : kt.term_en,
            code: lang === 'ru' ? kt.definition_ru : kt.definition_en,
          })),
        }]
      : undefined

  const lessonTitle = isNew
    ? (lang === 'ru' ? (newLesson?.title_ru ?? meta.title) : (newLesson?.title_en ?? meta.title))
    : meta.title

  return (
    <>
      {/* Slide mode overlay */}
      <AnimatePresence>
        {showSlides && newLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <SlideMode
              slides={newLesson.slides}
              lessonTitle={lessonTitle}
              onClose={() => setShowSlides(false)}
              onGoToPractice={scrollToPractice}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-4 lg:gap-8">

            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-1">
                <div className="mb-4">
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-1">{lessonTitle}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">~{Number(lesson.readTime)} {t('lesson.min', 'мин')}</p>
                </div>
                {allSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === sec.id
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
                {(oldQuiz || newLesson?.quiz.length) && (
                  <button
                    onClick={() => scrollToSection('quiz')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    🧪 {t('lesson.quiz', 'Тест')}
                  </button>
                )}
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">

              {/* Header card */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <span className="text-5xl">{meta.icon}</span>
                    <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-3 mb-2">
                      {lessonTitle}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                      {isNew
                        ? (lang === 'ru' ? newLesson?.description_ru : newLesson?.description_en)
                        : meta.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => slug && toggleBookmark(slug, 'intro')}
                      className="flex-shrink-0 text-2xl hover:scale-110 transition-transform"
                    >
                      {p?.bookmarks?.includes('intro') ? '🔖' : '📌'}
                    </button>
                    {isNew && (
                      <button
                        onClick={() => setShowSlides(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors"
                      >
                        <SlidersHorizontal size={14} />
                        {lang === 'ru' ? 'Слайды' : 'Slides'}
                      </button>
                    )}
                  </div>
                </div>
                {p?.completed && (
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                      ✅ {t('lesson.completed', 'Пройден')} · {p.quizScore}%
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.quizScore}%` }} />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Intro text */}
              {(typeof (lesson.content as Record<string, unknown> | undefined)?.intro === 'string' ||
                (isNew && newLesson?.content.intro_ru)) && (
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg break-words">
                    {isNew
                      ? (lang === 'ru' ? newLesson?.content.intro_ru : newLesson?.content.intro_en)
                      : (lesson.content as Record<string, unknown>).intro as string}
                  </p>
                </motion.div>
              )}

              {/* SVG diagrams (old lessons) */}
              {(slug === 'html-elements') && (
                <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                  <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">🏗️ {t('lesson.htmlStructure', 'Структура HTML')}</h2>
                  <HTMLStructureSVG />
                </motion.div>
              )}
              {slug === 'css-box-model' && (
                <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                  <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">📦 {t('lesson.boxModel', 'Блочная модель CSS')}</h2>
                  <CSSBoxModelSVG />
                </motion.div>
              )}
              {slug === 'dom-manipulation' && (
                <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                  <h2 className="font-heading font-bold text-gray-900 dark:text-white mb-4">🌲 {t('lesson.domTree', 'Дерево DOM')}</h2>
                  <DOMTreeSVG />
                </motion.div>
              )}

              {/* ── NEW FORMAT RENDERING ─────────────────────────────────── */}
              {isNew && newLesson && (
                <>
                  {newSections.map((sec, i) => {
                    const sectionTitle = lang === 'ru' ? sec.title_ru : sec.title_en
                    const isKeyTerms = sec.id === 'key-terms'
                    const contentBlock = newLesson.content.blocks.find((b: ContentBlock) => b.sectionId === sec.id)

                    return (
                      <motion.section
                        key={sec.id}
                        ref={(el) => { if (el) sectionRefs.current[sec.id] = el }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6 scroll-mt-24"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-4">{sectionTitle}</h2>
                        {isKeyTerms
                          ? <NewKeyTerms terms={newLesson.keyTerms} lang={lang} />
                          : contentBlock
                            ? <NewSectionContent block={contentBlock} lang={lang} />
                            : null}
                      </motion.section>
                    )
                  })}

                  {/* Did you know */}
                  {newLesson.didYouKnow.length > 0 && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    >
                      <NewDidYouKnow items={newLesson.didYouKnow} lang={lang} />
                    </motion.div>
                  )}

                  {/* Practice / Editor task */}
                  {newLesson.editorTask && (
                    <motion.section
                      ref={(el) => { practiceRef.current = el }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6 scroll-mt-24"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    >
                      <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-1">
                        ✏️ {lang === 'ru' ? newLesson.editorTask.title_ru : newLesson.editorTask.title_en}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        {lang === 'ru' ? 'Попробуй написать код самостоятельно' : 'Try writing the code yourself'}
                      </p>
                      <EditorTask lesson={newLesson} lang={lang} />
                    </motion.section>
                  )}

                  {/* Quiz */}
                  {newLesson.quiz.length > 0 && (
                    <motion.section
                      ref={(el) => { if (el) sectionRefs.current['quiz'] = el }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6 scroll-mt-24"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    >
                      <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">
                        🧪 {lang === 'ru' ? 'Тест' : 'Quiz'}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        {lang === 'ru' ? 'Проверь, как хорошо ты усвоил урок.' : 'Check how well you understood the lesson.'}
                      </p>
                      <LessonQuiz
                        questions={newLesson.quiz as QuizQuestion[]}
                        topicSlug={slug}
                        onNext={nextSlug ? () => navigate(`/lessons/${nextSlug}`) : undefined}
                      />
                    </motion.section>
                  )}
                </>
              )}

              {/* ── OLD FORMAT RENDERING ──────────────────────────────────── */}
              {!isNew && (
                <>
                  {oldSections.map((sec, i) => (
                    <motion.section
                      key={sec.id}
                      ref={(el) => { if (el) sectionRefs.current[sec.id] = el }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6 scroll-mt-24"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-4">{sec.title}</h2>
                      <LegacySectionContent lesson={lesson} sectionId={sec.id} />
                    </motion.section>
                  ))}

                  {oldDidYouKnow && (
                    <motion.div
                      className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800 mb-6"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-heading font-bold text-amber-800 dark:text-amber-300 mb-3">
                        💡 {t('lesson.didYouKnow', 'Знаешь ли ты?')}
                      </h3>
                      <ul className="space-y-2">
                        {oldDidYouKnow.map((fact, i) => (
                          <li key={i} className="text-amber-700 dark:text-amber-400 text-sm flex gap-2">
                            <span>•</span> {fact}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {oldQuiz && (
                    <motion.section
                      ref={(el) => { if (el) sectionRefs.current['quiz'] = el }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-6 scroll-mt-24"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    >
                      <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">
                        🧪 {t('lesson.quiz', 'Тест')}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{oldQuiz.scenario}</p>
                      <MultipleChoiceQuiz
                        rows={oldQuiz.rows}
                        topicSlug={slug}
                        onNext={() => { /* handled inside */ }}
                      />
                    </motion.section>
                  )}
                </>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4 mt-8">
                {prevSlug ? (
                  <Link
                    to={`/lessons/${prevSlug}`}
                    className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-primary-400 transition-colors font-medium"
                  >
                    ← {LESSON_META[prevSlug].title}
                  </Link>
                ) : <div />}
                {nextSlug && (
                  <Link
                    to={`/lessons/${nextSlug}`}
                    className="flex items-center gap-2 px-5 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
                  >
                    {LESSON_META[nextSlug].title} →
                  </Link>
                )}
              </div>
            </main>
          </div>
        </div>

        <CheatSheetDrawer sheets={cheatSheets} />
      </div>
    </>
  )
}
