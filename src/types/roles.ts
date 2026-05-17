export type UserRole = 'owner' | 'admin' | 'teacher' | 'student'

export interface UserRoleRecord {
  role: UserRole
  displayName: string
  email: string
  assignedBy?: string
  assignedAt?: number
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer'

export interface AssignmentQuestion {
  id: string
  text: string
  type: QuestionType
  options?: string[]
  correctAnswer: string
  points: number
}

export interface AssignmentSubmission {
  id?: string
  userId: string
  displayName: string
  assignmentId: string
  answers: Record<string, string>
  score: number
  maxScore: number
  percentage: number
  submittedAt: number
  manualScore?: number
  manualNote?: string
  gradedBy?: string
}

export interface Assignment {
  id: string
  title: string
  description: string
  lessonSlug?: string
  dueDate?: { toMillis(): number } | null
  teacherId: string
  teacherName?: string
  published?: boolean
  type: 'internal' | 'quiz' | 'code' | 'text'
  createdAt?: number
  questions?: AssignmentQuestion[]
  maxScore?: number
}

export interface LessonQuizQuestion {
  id: string
  text: string
  options: [string, string, string, string]
  correctIndex: number
}

export interface DynamicLesson {
  id: string
  title: string
  slug: string
  description: string
  content: string
  coverImageUrl?: string
  quiz?: LessonQuizQuestion[]
  published: boolean
  createdBy: string
  createdByName: string
  createdAt: number
  updatedAt: number
}

export interface ClassGroup {
  id: string
  name: string
  description?: string
  teacherId: string
  teacherName?: string
  inviteCode: string
  createdAt?: number
}

export interface ClassMember {
  uid: string
  displayName: string
  email: string
  role: 'teacher' | 'student'
  joinedAt?: number
}
