export function matchAnswer(userAnswer: string, correctAnswer: string): boolean {
  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ')
  return normalize(userAnswer) === normalize(correctAnswer)
}
