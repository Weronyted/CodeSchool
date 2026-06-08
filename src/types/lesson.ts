// ─── Legacy format (existing lessons) ───────────────────────────────────────

export interface LessonSection {
  id: string
  title: string
}

export interface KeyTerm {
  term: string
  definition: string
  example?: string
}

export interface MultipleChoiceRow {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export interface CodeQuizRow {
  id: string
  instruction: string
  startCode: string
  solution: string
  language: 'html' | 'css' | 'javascript'
}

export interface WorkedExample {
  title: string
  scenario?: string
  solution: string
}

export interface LessonData {
  slug: string
  title: string
  readTime: number
  sections: LessonSection[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any>
  keyTerms?: KeyTerm[]
  didYouKnow?: string[]
  multipleChoiceQuiz?: {
    scenario: string
    rows: MultipleChoiceRow[]
  }
  codeQuiz?: {
    scenario: string
    rows: CodeQuizRow[]
  }
}

// ─── New bilingual format ────────────────────────────────────────────────────

import type { DemoStep } from '@/types/glossary'

export type LessonCategory = 'BASICS' | 'HTML' | 'CSS' | 'JS' | 'REACT'
export type CodeLang = 'html' | 'css' | 'javascript'
export type SlideType =
  | 'title' | 'concept' | 'code' | 'analogy' | 'tip' | 'practice-cta'
  | 'code-anim' | 'illustration' | 'compare'

export interface BilingualSection {
  id: string
  title_ru: string
  title_en: string
}

export interface SlideBullet {
  text_ru: string
  text_en: string
}

export interface SlideVisual {
  kind: 'svg' | 'emoji' | 'image'
  svg?: string
  emojis?: string[]
  imageUrl?: string
  caption_ru?: string
  caption_en?: string
}

export interface SlideCompareColumn {
  label_ru: string
  label_en: string
  items_ru: string[]
  items_en: string[]
  color?: 'green' | 'red' | 'blue' | 'amber'
}

export interface Slide {
  id: string
  type: SlideType
  title_ru: string
  title_en: string
  body_ru: string
  body_en: string
  code?: string
  codeLang?: CodeLang
  // new optional enrichment fields
  bullets?: SlideBullet[]
  visual?: SlideVisual
  animSteps?: DemoStep[]
  animMode?: 'console' | 'preview'
  compareLeft?: SlideCompareColumn
  compareRight?: SlideCompareColumn
}

export interface ContentBlock {
  sectionId: string
  heading_ru: string
  heading_en: string
  text_ru: string
  text_en: string
  code?: string
  codeLang?: CodeLang
}

export interface LessonContent {
  intro_ru: string
  intro_en: string
  blocks: ContentBlock[]
}

export interface EditorTask {
  title_ru: string
  title_en: string
  instructions_ru: string
  instructions_en: string
  activeTabs: CodeLang[]
  starterCode: Partial<Record<CodeLang, string>>
  hints_ru: string[]
  hints_en: string[]
}

export interface BilingualKeyTerm {
  term_ru: string
  term_en: string
  definition_ru: string
  definition_en: string
  example_ru?: string
  example_en?: string
}

export interface DidYouKnowItem {
  text_ru: string
  text_en: string
}

export interface QuizQuestion {
  id: string
  text_ru: string
  text_en: string
  options_ru: string[]
  options_en: string[]
  correctIndex: number
  explanation_ru: string
  explanation_en: string
}

export interface Lesson {
  slug: string
  category: LessonCategory
  readTime: number
  icon: string
  title_ru: string
  title_en: string
  description_ru: string
  description_en: string
  sections: BilingualSection[]
  slides: Slide[]
  content: LessonContent
  editorTask?: EditorTask
  keyTerms: BilingualKeyTerm[]
  didYouKnow: DidYouKnowItem[]
  quiz: QuizQuestion[]
}
