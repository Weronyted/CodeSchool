// ─── DevOps course (Автоматизация) ──────────────────────────────────────────
//
// Reuses the bilingual primitives of the main course (types/lesson.ts) so the
// DevOps course renders through the same building blocks, but swaps the single
// `editorTask` for a list of `labs` — interactive tasks that are not
// "write code → see result".

import type {
  BilingualSection,
  BilingualKeyTerm,
  DidYouKnowItem,
  QuizQuestion,
} from '@/types/lesson'

// ─── Lesson prose ───────────────────────────────────────────────────────────
//
// Same shape as the main course's LessonContent, but with the languages DevOps
// actually shows (bash, YAML, Dockerfile) instead of html/css/js.

export type DevOpsCodeLang = 'bash' | 'yaml' | 'dockerfile' | 'json' | 'ini' | 'javascript'

export interface DevOpsContentBlock {
  sectionId: string
  heading_ru: string
  heading_en: string
  text_ru: string
  text_en: string
  code?: string
  codeLang?: DevOpsCodeLang
  /** Optional caption under the snippet, e.g. a file path. */
  codeCaption?: string
}

export interface DevOpsContent {
  intro_ru: string
  intro_en: string
  blocks: DevOpsContentBlock[]
}

// ─── Course structure ───────────────────────────────────────────────────────

export type DevOpsModuleId =
  | 'foundations'
  | 'containers'
  | 'cicd'
  | 'servers'
  | 'observability'
  | 'capstone'

export interface DevOpsModule {
  id: DevOpsModuleId
  order: number
  icon: string
  /** Accent colour used for the module rail, badges and pipeline nodes. */
  accent: string
  title_ru: string
  title_en: string
  description_ru: string
  description_en: string
  lessonSlugs: string[]
}

/** Lesson status, phrased the way a real CI system phrases a job. */
export type PipelineStatus = 'blocked' | 'queued' | 'running' | 'success' | 'failed'

export interface DevOpsLesson {
  slug: string
  moduleId: DevOpsModuleId
  /** Position inside its module. */
  order: number
  icon: string
  readTime: number
  title_ru: string
  title_en: string
  description_ru: string
  description_en: string
  sections: BilingualSection[]
  content: DevOpsContent
  keyTerms: BilingualKeyTerm[]
  didYouKnow: DidYouKnowItem[]
  quiz: QuizQuestion[]
  /** Interactive tasks. A lesson passes only when every lab passes. */
  labs: DevOpsLab[]
}

export interface DevOpsLab {
  id: string
  title_ru: string
  title_en: string
  brief_ru: string
  brief_en: string
  task: DevOpsTask
}

export type DevOpsTask =
  | PipelineBuilderTask
  | IncidentSimulatorTask
  | TerminalSimulatorTask
  | ContainerVisualizerTask

export type DevOpsTaskKind = DevOpsTask['kind']

// ─── a) Pipeline Builder ────────────────────────────────────────────────────
//
// One component, three difficulty levels. Every level is validated by the same
// rule engine; `solution` is sugar that expands into a strict `before` chain,
// while the advanced level writes dependency rules by hand (so several orders
// can be correct at once).

export type PipelineLevel = 'basic' | 'branching' | 'advanced'

export type PipelineStageKind =
  | 'checkout' | 'install' | 'lint' | 'build' | 'test' | 'migrate'
  | 'deploy' | 'monitor' | 'approve' | 'rollback' | 'notify' | 'cleanup'

export interface PipelineStage {
  id: string
  kind: PipelineStageKind
  label_ru: string
  label_en: string
  /** Optional service tag — shown as a chip, used by advanced dependency rules. */
  service?: string
  /** Short "what this step actually runs" line, shown under the label. */
  command?: string
}

export type PipelineRuleType =
  /** `stageId` must appear somewhere before `otherStageId`. */
  | 'before'
  /** `stageId` must be the direct predecessor of `otherStageId`. */
  | 'immediately-before'
  /** `stageId` must be present in the pipeline. */
  | 'required'
  /** `stageId` must NOT be present (distractor stages). */
  | 'forbidden'
  /** `stageId` must be the last stage of the pipeline. */
  | 'last'
  /** `stageId` must be the first stage of the pipeline. */
  | 'first'

export interface PipelineRule {
  id: string
  type: PipelineRuleType
  stageId: string
  otherStageId?: string
  /** Explanation shown when the rule is violated — this is the teaching moment. */
  message_ru: string
  message_en: string
}

/** Level 2: a decision point attached to a stage ("тест упал — что дальше?"). */
export interface PipelineBranchPoint {
  id: string
  /** Branch is asked once this stage sits in the pipeline. */
  stageId: string
  condition_ru: string
  condition_en: string
  question_ru: string
  question_en: string
  options: PipelineBranchOption[]
}

export interface PipelineBranchOption {
  id: string
  label_ru: string
  label_en: string
  correct: boolean
  feedback_ru: string
  feedback_en: string
}

export interface PipelineLevelConfig {
  level: PipelineLevel
  title_ru: string
  title_en: string
  goal_ru: string
  goal_en: string
  /** Stage pool, shown shuffled in the tray. */
  stages: PipelineStage[]
  /** Basic sugar: canonical order, expanded into consecutive `before` rules. */
  solution?: string[]
  /** Extra constraints (the only source of truth for the advanced level). */
  rules?: PipelineRule[]
  branches?: PipelineBranchPoint[]
  hint_ru: string
  hint_en: string
  explanation_ru: string
  explanation_en: string
}

export interface PipelineBuilderTask {
  kind: 'pipeline-builder'
  levels: PipelineLevelConfig[]
}

// ─── b) Incident Simulator ──────────────────────────────────────────────────
//
// Log stream → pick the cause → pick the action. Difficulty grows from a single
// obvious error line to a chain where the first error is only a symptom.

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export interface IncidentLogLine {
  ts: string
  level: LogLevel
  service: string
  message_ru: string
  message_en: string
  /** The line that actually explains the outage (used for the "reveal" step). */
  rootCause?: boolean
  /** A loud line that only looks like the cause. */
  symptom?: boolean
}

export interface IncidentChoice {
  id: string
  label_ru: string
  label_en: string
  correct: boolean
  /** Why this is right / wrong — always shown after answering. */
  feedback_ru: string
  feedback_en: string
}

export interface IncidentScenario {
  id: string
  level: 1 | 2 | 3
  title_ru: string
  title_en: string
  /** Situation briefing: what was deployed, when, what users report. */
  context_ru: string
  context_en: string
  logs: IncidentLogLine[]
  causeQuestion_ru: string
  causeQuestion_en: string
  causes: IncidentChoice[]
  actionQuestion_ru: string
  actionQuestion_en: string
  actions: IncidentChoice[]
  postmortem_ru: string
  postmortem_en: string
}

export interface IncidentSimulatorTask {
  kind: 'incident-simulator'
  scenarios: IncidentScenario[]
}

// ─── c) Terminal Simulator ──────────────────────────────────────────────────
//
// Pseudo-CLI: real commands in, realistic output out, no real system behind it.

export interface TerminalResponse {
  /** Command to match. Treated as a regex when `regex` is true. */
  match: string
  regex?: boolean
  /** Output lines. `$1`, `$2`… are substituted from regex capture groups. */
  output: string[]
  exitCode?: number
  /** Fake latency, so `docker build` does not feel instant. */
  delayMs?: number
  /** Requires this state flag to be set, otherwise `unless` output is used. */
  requires?: string
  unless?: string[]
  /** State flags flipped by this command (drives stateful sequences). */
  sets?: string[]
  clears?: string[]
}

export interface TerminalGoal {
  id: string
  description_ru: string
  description_en: string
  /** Regex the student's command must match to tick this goal off. */
  pattern: string
}

export interface TerminalSimulatorTask {
  kind: 'terminal-simulator'
  /** e.g. `student@codeschool:~/app$` */
  prompt: string
  /** Lines printed before the first prompt. */
  motd_ru: string[]
  motd_en: string[]
  responses: TerminalResponse[]
  goals: TerminalGoal[]
  /** Commands offered in the cheat-sheet panel. */
  suggestions: string[]
}

// ─── d) Container Visualizer ────────────────────────────────────────────────

export type ContainerState =
  | 'absent' | 'creating' | 'running' | 'stopping'
  | 'exited' | 'restarting' | 'crashed'

export interface VizContainer {
  id: string
  name: string
  image: string
  state: ContainerState
  ports?: string
  /** Restart policy shown on the card — explains auto-restart behaviour. */
  restartPolicy?: 'no' | 'on-failure' | 'always'
}

export interface VizEffect {
  /** Delay in ms from the start of the action. */
  at: number
  containerId: string
  state: ContainerState
  note_ru?: string
  note_en?: string
}

export interface VizAction {
  id: string
  command: string
  label_ru: string
  label_en: string
  narration_ru: string
  narration_en: string
  effects: VizEffect[]
}

export interface ContainerVisualizerTask {
  kind: 'container-visualizer'
  initial: VizContainer[]
  actions: VizAction[]
  /** Optional mission: run these actions (in order) to pass the lab. */
  quest?: {
    goal_ru: string
    goal_en: string
    requiredActionIds: string[]
    /** Whether the order of `requiredActionIds` matters. */
    ordered?: boolean
  }
}

// ─── Progress ───────────────────────────────────────────────────────────────

export interface DevOpsLessonProgress {
  visited: boolean
  /** Ids of labs the student has passed. */
  labsPassed: string[]
  /** How many labs / quiz questions the lesson has — stored so the course page
   *  can show status without loading every lesson module. */
  labsTotal: number
  quizTotal: number
  quizScore: number
  quizAttempts: number
  /** Every lab passed and the quiz cleared — the job went green. */
  passed: boolean
  /** Last quiz attempt was below the pass mark — the job went red. */
  failed: boolean
  lastVisited: number
  timeSpentSeconds: number
}
