import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDevOpsStore } from '@/store/useDevOpsStore'
import { useDevOpsProgress } from '@/hooks/useDevOpsProgress'
import type { DevOpsLab } from '@/types/devops'
import { Glass, StatusPill, useLang, pick } from './ui'
import { PipelineBuilder } from './PipelineBuilder'
import { IncidentSimulator } from './IncidentSimulator'
import { TerminalSimulator } from './TerminalSimulator'
import { ContainerVisualizer } from './ContainerVisualizer'

// Every interactive task renders through here, so labs share the card chrome,
// the pass bookkeeping and the CI-style status — only the body differs.

const KIND_LABEL: Record<string, { ru: string; en: string }> = {
  'pipeline-builder':    { ru: 'Сборка пайплайна', en: 'Pipeline builder' },
  'incident-simulator':  { ru: 'Разбор инцидента', en: 'Incident triage' },
  'terminal-simulator':  { ru: 'Терминал',         en: 'Terminal' },
  'container-visualizer':{ ru: 'Контейнеры',       en: 'Containers' },
}

interface Props {
  slug: string
  lab: DevOpsLab
  index: number
}

export function LabCard({ slug, lab, index }: Props) {
  const lang = useLang()
  const { passLab } = useDevOpsProgress(slug)
  const passed = useDevOpsStore((s) => s.progress[slug]?.labsPassed.includes(lab.id) ?? false)

  const onPass = useCallback(() => passLab(slug, lab.id), [passLab, slug, lab.id])

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      className="scroll-mt-24"
      id={`lab-${lab.id}`}
    >
      <Glass className="p-5 sm:p-6" accent={passed ? '#2F9E44' : undefined}>
        <div className="flex items-start justify-between gap-4 mb-1.5 flex-wrap">
          <div className="min-w-0">
            <div className="font-mono text-[10px] tracking-[2px] uppercase mb-1" style={{ color: 'var(--cyan)' }}>
              // lab {index + 1} · {KIND_LABEL[lab.task.kind]?.[lang] ?? lab.task.kind}
            </div>
            <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--text)' }}>
              {pick(lab, 'title', lang)}
            </h3>
          </div>
          <StatusPill status={passed ? 'success' : 'queued'} size="sm" />
        </div>

        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
          {pick(lab, 'brief', lang)}
        </p>

        <LabBody lab={lab} passed={passed} onPass={onPass} />
      </Glass>
    </motion.section>
  )
}

function LabBody({ lab, passed, onPass }: { lab: DevOpsLab; passed: boolean; onPass: () => void }) {
  switch (lab.task.kind) {
    case 'pipeline-builder':
      return <PipelineBuilder task={lab.task} passed={passed} onPass={onPass} />
    case 'incident-simulator':
      return <IncidentSimulator task={lab.task} passed={passed} onPass={onPass} />
    case 'terminal-simulator':
      return <TerminalSimulator task={lab.task} passed={passed} onPass={onPass} />
    case 'container-visualizer':
      return <ContainerVisualizer task={lab.task} passed={passed} onPass={onPass} />
  }
}
