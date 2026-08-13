import type { PipelineLevelConfig, PipelineRule, PipelineStage } from '@/types/devops'

// The single validation engine behind all three Pipeline Builder levels.
//
// A level is described either by `solution` (a canonical linear order — the
// basic level) or by hand-written `rules` (the advanced level, where several
// orders are legal as long as the dependencies hold). `solution` is just sugar:
// it expands into the same rules, so the runner and the feedback UI never need
// to know which level they are looking at.

export interface RuleResult {
  rule: PipelineRule
  ok: boolean
}

export interface PipelineValidation {
  ok: boolean
  results: RuleResult[]
  /** Stage the CI run should turn red on. */
  failedStageId?: string
  firstFailure?: PipelineRule
}

function labelOf(stages: PipelineStage[], id: string, lang: 'ru' | 'en'): string {
  const s = stages.find((x) => x.id === id)
  if (!s) return id
  return lang === 'ru' ? s.label_ru : s.label_en
}

/** Expands a level config into the flat rule list used for validation. */
export function buildRules(cfg: PipelineLevelConfig): PipelineRule[] {
  const rules: PipelineRule[] = []
  const { stages, solution } = cfg

  if (solution && solution.length > 0) {
    const inSolution = new Set(solution)

    for (const stage of stages) {
      if (inSolution.has(stage.id)) {
        rules.push({
          id: `req-${stage.id}`,
          type: 'required',
          stageId: stage.id,
          message_ru: `Этап «${labelOf(stages, stage.id, 'ru')}» обязателен — без него пайплайн неполный.`,
          message_en: `Stage "${labelOf(stages, stage.id, 'en')}" is required — the pipeline is incomplete without it.`,
        })
      } else {
        rules.push({
          id: `forbid-${stage.id}`,
          type: 'forbidden',
          stageId: stage.id,
          message_ru: `Этап «${labelOf(stages, stage.id, 'ru')}» здесь лишний — он не входит в этот пайплайн.`,
          message_en: `Stage "${labelOf(stages, stage.id, 'en')}" does not belong in this pipeline.`,
        })
      }
    }

    for (let i = 0; i < solution.length - 1; i++) {
      const a = solution[i]
      const b = solution[i + 1]
      rules.push({
        id: `seq-${a}-${b}`,
        type: 'immediately-before',
        stageId: a,
        otherStageId: b,
        message_ru: `«${labelOf(stages, a, 'ru')}» должен идти сразу перед «${labelOf(stages, b, 'ru')}».`,
        message_en: `"${labelOf(stages, a, 'en')}" must come directly before "${labelOf(stages, b, 'en')}".`,
      })
    }
  }

  if (cfg.rules) rules.push(...cfg.rules)
  return rules
}

function checkRule(rule: PipelineRule, order: string[]): boolean {
  const i = order.indexOf(rule.stageId)
  const j = rule.otherStageId ? order.indexOf(rule.otherStageId) : -1

  switch (rule.type) {
    case 'required':
      return i !== -1
    case 'forbidden':
      return i === -1
    case 'first':
      return order[0] === rule.stageId
    case 'last':
      return order[order.length - 1] === rule.stageId
    case 'before':
      // Vacuously true while one of the two stages is not placed yet — the
      // matching `required` rule is what complains about the missing stage.
      if (i === -1 || j === -1) return true
      return i < j
    case 'immediately-before':
      if (i === -1 || j === -1) return true
      return j === i + 1
    default:
      return true
  }
}

/** Which stage should light up red when this rule is violated. */
function blameStage(rule: PipelineRule, order: string[]): string | undefined {
  switch (rule.type) {
    case 'forbidden':
      return rule.stageId
    case 'before':
    case 'immediately-before':
      // The stage that ran too early is the one to blame.
      return rule.otherStageId && order.includes(rule.otherStageId) ? rule.otherStageId : rule.stageId
    case 'first':
    case 'last':
      return rule.stageId
    case 'required':
      return undefined
    default:
      return rule.stageId
  }
}

export function validatePipeline(order: string[], rules: PipelineRule[]): PipelineValidation {
  const results = rules.map((rule) => ({ rule, ok: checkRule(rule, order) }))
  const failures = results.filter((r) => !r.ok)

  if (failures.length === 0) return { ok: true, results }

  // Report the failure that happens earliest in the pipeline, so the feedback
  // matches where the animated run stops.
  const ranked = [...failures].sort((a, b) => {
    const ia = blameStage(a.rule, order)
    const ib = blameStage(b.rule, order)
    const pa = ia ? order.indexOf(ia) : Number.MAX_SAFE_INTEGER
    const pb = ib ? order.indexOf(ib) : Number.MAX_SAFE_INTEGER
    return pa - pb
  })

  const first = ranked[0]
  return {
    ok: false,
    results,
    firstFailure: first.rule,
    failedStageId: blameStage(first.rule, order),
  }
}

// ─── Presentation helpers ───────────────────────────────────────────────────

export const STAGE_ACCENT: Record<PipelineStage['kind'], string> = {
  checkout: '#94A3B8',
  install:  '#94A3B8',
  lint:     '#38BDF8',
  build:    '#4361EE',
  test:     '#7B2FBE',
  migrate:  '#F08C00',
  deploy:   '#2F9E44',
  monitor:  '#38BDF8',
  approve:  '#FBBF24',
  rollback: '#F472B6',
  notify:   '#A78BFA',
  cleanup:  '#94A3B8',
}

export const STAGE_GLYPH: Record<PipelineStage['kind'], string> = {
  checkout: '⤓',
  install:  '⬇',
  lint:     '✎',
  build:    '⚒',
  test:     '⚗',
  migrate:  '⇄',
  deploy:   '⇧',
  monitor:  '◉',
  approve:  '✋',
  rollback: '↩',
  notify:   '✉',
  cleanup:  '⌫',
}
