import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { githubLight } from '@uiw/codemirror-theme-github'
import { oneDark } from '@codemirror/theme-one-dark'
import { useThemeStore } from '@/store/useThemeStore'

interface CodeEditorProps {
  value: string
  onChange?: (val: string) => void
  language?: 'html' | 'css' | 'javascript'
  readOnly?: boolean
  minHeight?: string
}

const langExtensions = {
  html: html(),
  css: css(),
  javascript: javascript({ jsx: false }),
}

export function CodeEditor({ value, onChange, language = 'html', readOnly, minHeight = '200px' }: CodeEditorProps) {
  const { theme } = useThemeStore()

  return (
    <CodeMirror
      value={value}
      height="auto"
      minHeight={minHeight}
      extensions={[langExtensions[language]]}
      theme={theme === 'dark' ? oneDark : githubLight}
      readOnly={readOnly}
      onChange={onChange}
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: !readOnly }}
    />
  )
}
