import type { DevOpsCodeLang } from '@/types/devops'

// Tiny highlighter for the languages this course shows. CodeMirror only ships
// html/css/js grammars in this project, and bash/YAML/Dockerfile snippets here
// are short — a regex pass keeps the bundle flat and the styling on-brand.

const PALETTE = {
  comment: 'rgba(232,236,255,0.32)',
  string:  '#7BC98F',
  keyword: '#6B8BFF',
  flag:    '#38BDF8',
  key:     '#F472B6',
  plain:   'var(--text)',
}

const KEYWORDS: Record<string, string[]> = {
  bash: ['docker', 'git', 'sudo', 'systemctl', 'apt', 'ssh', 'curl', 'npm', 'cd', 'ls', 'cat', 'grep', 'chmod', 'chown', 'kill', 'ps', 'tail', 'echo', 'export', 'scp', 'journalctl', 'nginx', 'certbot'],
  dockerfile: ['FROM', 'RUN', 'CMD', 'COPY', 'ADD', 'WORKDIR', 'ENV', 'EXPOSE', 'ENTRYPOINT', 'ARG', 'USER', 'HEALTHCHECK', 'VOLUME', 'AS'],
  yaml: [],
  json: [],
  ini: [],
  javascript: ['const', 'let', 'function', 'return', 'await', 'async', 'import', 'export'],
}

interface Token { text: string; color: string }

function tokenizeLine(line: string, lang: DevOpsCodeLang): Token[] {
  const trimmed = line.trimStart()

  if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
    return [{ text: line, color: PALETTE.comment }]
  }

  const tokens: Token[] = []
  // Split on strings first so keywords inside quotes stay plain.
  const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g)

  for (const part of parts) {
    if (!part) continue
    if (/^["']/.test(part)) {
      tokens.push({ text: part, color: PALETTE.string })
      continue
    }

    const words = part.split(/(\s+)/)
    for (const w of words) {
      if (!w) continue
      if (/^\s+$/.test(w)) { tokens.push({ text: w, color: PALETTE.plain }); continue }
      if (/^-{1,2}[a-zA-Z]/.test(w)) { tokens.push({ text: w, color: PALETTE.flag }); continue }
      if ((KEYWORDS[lang] ?? []).includes(w)) { tokens.push({ text: w, color: PALETTE.keyword }); continue }
      if ((lang === 'yaml' || lang === 'ini') && /^[\w.-]+:$/.test(w)) {
        tokens.push({ text: w, color: PALETTE.key }); continue
      }
      tokens.push({ text: w, color: PALETTE.plain })
    }
  }

  return tokens
}

interface Props {
  code: string
  lang?: DevOpsCodeLang
  caption?: string
  /** Renders a shell prompt gutter instead of line numbers. */
  shell?: boolean
}

export function CodeBlock({ code, lang = 'bash', caption, shell = false }: Props) {
  const lines = code.replace(/\s+$/, '').split('\n')

  return (
    <figure
      className="rounded-xl overflow-hidden my-3"
      style={{ background: 'rgba(6,8,16,0.75)', border: '1px solid var(--border)' }}
    >
      {caption && (
        <figcaption
          className="px-3.5 py-2 font-mono text-[10px] tracking-wider"
          style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}
        >
          {caption}
        </figcaption>
      )}
      <pre className="overflow-x-auto px-3.5 py-3 text-[12.5px] leading-[1.7] font-mono">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              <span
                className="select-none inline-block w-6 flex-shrink-0"
                style={{ color: 'rgba(232,236,255,0.18)' }}
              >
                {shell ? '$' : i + 1}
              </span>
              {tokenizeLine(line, lang).map((t, j) => (
                <span key={j} style={{ color: t.color }}>{t.text}</span>
              ))}
            </div>
          ))}
        </code>
      </pre>
    </figure>
  )
}
