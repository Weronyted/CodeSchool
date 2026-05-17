import { useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, RotateCcw, AlertTriangle, Loader2 } from 'lucide-react'
import { CodeEditor } from './CodeEditor'
import { Button } from '@/components/ui/Button'
import { buildHTMLPage, runJavaScriptSandboxed } from '@/utils/codeRunner'
import { explainError } from '@/utils/errorExplainer'

interface CodeRunnerProps {
  initialHtml?: string
  initialCss?: string
  initialJs?: string
  mode?: 'html' | 'js'
}

export function CodeRunner({ initialHtml = '', initialCss = '', initialJs = '', mode = 'html' }: CodeRunnerProps) {
  const { t } = useTranslation()
  const [html, setHtml] = useState(initialHtml)
  const [css, setCss]   = useState(initialCss)
  const [js, setJs]     = useState(initialJs)
  const [output, setOutput]   = useState<{ line: string; level: string }[]>([])
  const [error, setError]     = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const iframeRef  = useRef<HTMLIFrameElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  const run = useCallback(() => {
    // Abort any previous sandbox run
    cleanupRef.current?.()
    cleanupRef.current = null

    setError(null)
    setOutput([])

    if (mode === 'js') {
      setIsRunning(true)
      cleanupRef.current = runJavaScriptSandboxed(
        js,
        (line, level) => setOutput((prev) => [...prev, { line, level }]),
        (msg)         => setError(msg),
        ()            => setIsRunning(false),
      )
    } else {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = buildHTMLPage(html, css, js)
      }
    }
  }, [mode, js, html, css])

  function reset() {
    cleanupRef.current?.()
    cleanupRef.current = null
    setHtml(initialHtml)
    setCss(initialCss)
    setJs(initialJs)
    setOutput([])
    setError(null)
    setIsRunning(false)
    if (iframeRef.current) iframeRef.current.srcdoc = ''
  }

  const errorInfo = error ? explainError(error) : null

  const levelColor: Record<string, string> = {
    log:   'text-slate-800 dark:text-slate-200',
    info:  'text-blue-600 dark:text-blue-400',
    warn:  'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            {mode === 'html' ? 'index.html' : 'script.js'}
          </span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={reset} className="gap-1.5 text-xs">
            <RotateCcw size={12} /> {t('quiz.resetCode')}
          </Button>
          <Button size="sm" onClick={run} disabled={isRunning} className="gap-1.5 text-xs">
            {isRunning ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
            {t('quiz.runCode')}
          </Button>
        </div>
      </div>

      <div className={`grid ${mode === 'html' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        <div className={mode === 'html' ? 'border-r border-slate-200 dark:border-slate-700' : ''}>
          {mode === 'html' && (
            <>
              <div className="px-3 py-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">HTML</div>
              <CodeEditor value={html} onChange={setHtml} language="html" />
              {css !== undefined && (
                <>
                  <div className="px-3 py-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">CSS</div>
                  <CodeEditor value={css} onChange={setCss} language="css" />
                </>
              )}
            </>
          )}
          {mode === 'js' && (
            <>
              <div className="px-3 py-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">JavaScript</div>
              <CodeEditor value={js} onChange={setJs} language="javascript" />
            </>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900">
          <div className="px-3 py-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            {t('quiz.output')}
          </div>
          {mode === 'html' ? (
            <iframe
              ref={iframeRef}
              className="w-full h-64 border-0"
              title="preview"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="p-4 min-h-24 font-mono text-sm">
              {output.map((item, i) => (
                <p key={i} className={levelColor[item.level] ?? levelColor.log}>{item.line}</p>
              ))}
              {errorInfo && (
                <div className="mt-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-danger flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-700 dark:text-red-400">{errorInfo.title}</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{errorInfo.explanation}</p>
                      <p className="text-xs text-red-500 dark:text-red-500 mt-1 italic">💡 {errorInfo.tip}</p>
                    </div>
                  </div>
                </div>
              )}
              {output.length === 0 && !error && !isRunning && (
                <p className="text-slate-400 dark:text-slate-500 text-xs">Нажми «Запустить код» для выполнения...</p>
              )}
              {isRunning && (
                <p className="text-slate-400 dark:text-slate-500 text-xs flex items-center gap-1.5">
                  <Loader2 size={11} className="animate-spin" /> Выполняется...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
