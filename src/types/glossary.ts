export interface GlossaryTerm {
  id?: string
  term: string
  definition: string
  example?: string
  topic?: string
  category?: string
}

export interface DemoStep {
  code: string
  comment_ru: string
  comment_en: string
  output?: string
  isError?: boolean
  preview?: string
}

export interface BilingualGlossaryTerm {
  id: string
  term_ru: string
  term_en: string
  category: 'HTML' | 'CSS' | 'JS' | 'Основы'
  topicSlug?: string
  definition_ru: string
  definition_en: string
  whyNeeded_ru: string
  whyNeeded_en: string
  commonMistake_ru: string
  commonMistake_en: string
  example_ru: string
  example_en: string
  demoMode: 'console' | 'preview'
  demo: {
    steps: DemoStep[]
  }
}
