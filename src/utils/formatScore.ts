export function formatScore(score: number): string {
  return `${Math.round(score)}%`
}

export function scoreVariant(score: number): 'success' | 'warning' | 'danger' | 'default' {
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  if (score > 0) return 'danger'
  return 'default'
}
