import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import CodeMirror from '@uiw/react-codemirror'
import { html as htmlLang } from '@codemirror/lang-html'
import { css as cssLang } from '@codemirror/lang-css'
import { javascript as jsLang } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { githubLight } from '@uiw/codemirror-theme-github'
import { Play, Share2, RotateCcw, Check, Maximize2, Minimize2 } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { toast } from '@/store/useToastStore'

type Tab = 'html' | 'css' | 'javascript'

const STORAGE_KEY = 'codeschool-sandbox-v1'

const DEFAULTS: Record<Tab, string> = {
  html: `<h1>Привет, мир! 👋</h1>
<p>Это твоя песочница. Пиши любой HTML здесь.</p>
<button id="btn">Нажми меня</button>`,
  css: `body {
  font-family: sans-serif;
  padding: 24px;
  background: #f0f4ff;
  color: #1e293b;
}

h1 { color: #3B5BDB; }

button {
  margin-top: 12px;
  padding: 8px 20px;
  background: #3B5BDB;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

button:hover { background: #2f4ac0; }`,
  javascript: `document.getElementById('btn')
  ?.addEventListener('click', () => {
    alert('Привет от JavaScript! 🎉')
  })`,
}

function encode(codes: Record<Tab, string>): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(codes))))
}

function decode(str: string): Record<Tab, string> | null {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))))
  } catch {
    return null
  }
}

function buildSrcDoc(html: string, css: string, js: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`
}

export default function Sandbox() {
  const { theme } = useThemeStore()
  const { language } = useLanguageStore()
  const lang = language as 'ru' | 'en'
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<Tab>('html')
  const [preview, setPreview] = useState('')
  const [fullscreen, setFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)

  const [codes, setCodes] = useState<Record<Tab, string>>(() => {
    const shared = searchParams.get('code')
    if (shared) {
      const decoded = decode(shared)
      if (decoded) return decoded
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch { /* ignore */ }
    return { ...DEFAULTS }
  })

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes))
  }, [codes])

  // Auto-run on first load
  useEffect(() => {
    setPreview(buildSrcDoc(codes.html, codes.css, codes.javascript))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function run() {
    setPreview(buildSrcDoc(codes.html, codes.css, codes.javascript))
  }

  function reset() {
    setCodes({ ...DEFAULTS })
    setPreview(buildSrcDoc(DEFAULTS.html, DEFAULTS.css, DEFAULTS.javascript))
  }

  function share() {
    const url = `${window.location.origin}/sandbox?code=${encode(codes)}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      toast.success(lang === 'ru' ? 'Ссылка скопирована!' : 'Link copied!')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const ext = activeTab === 'css' ? [cssLang()] : activeTab === 'javascript' ? [jsLang()] : [htmlLang()]
  const isDark = theme === 'dark'

  const tabLabels: Record<Tab, string> = { html: 'HTML', css: 'CSS', javascript: 'JS' }
  const tabColors: Record<Tab, string> = {
    html: 'bg-orange-500',
    css: 'bg-blue-500',
    javascript: 'bg-yellow-500',
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${fullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-gray-900 dark:text-white">
              🧪 {lang === 'ru' ? 'Песочница' : 'Sandbox'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {lang === 'ru' ? 'Пиши HTML, CSS и JS — результат сразу в превью' : 'Write HTML, CSS and JS — see results instantly'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 transition-all"
            >
              <RotateCcw size={14} />
              {lang === 'ru' ? 'Сброс' : 'Reset'}
            </button>
            <button
              onClick={share}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-700 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
            >
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              {lang === 'ru' ? 'Поделиться' : 'Share'}
            </button>
            <button
              onClick={run}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Play size={14} />
              {lang === 'ru' ? 'Запустить' : 'Run'}
            </button>
          </div>
        </motion.div>

        {/* Editor + Preview */}
        <div className={`grid gap-4 ${fullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>

          {/* Editor panel */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Tabs */}
            <div className="flex items-center gap-1 px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              {(['html', 'css', 'javascript'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tabColors[tab]}`} />
                  {tabLabels[tab]}
                </button>
              ))}
            </div>

            <CodeMirror
              value={codes[activeTab]}
              extensions={ext}
              theme={isDark ? oneDark : githubLight}
              onChange={(val) => setCodes((prev) => ({ ...prev, [activeTab]: val }))}
              minHeight="500px"
              basicSetup={{ lineNumbers: true, foldGutter: true, highlightActiveLine: true }}
            />
          </motion.div>

          {/* Preview panel */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Preview
              </span>
              <button
                onClick={() => setFullscreen((f) => !f)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            </div>
            <iframe
              srcDoc={preview}
              title="sandbox-preview"
              sandbox="allow-scripts"
              className="w-full border-0 bg-white"
              style={{ minHeight: '500px' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
