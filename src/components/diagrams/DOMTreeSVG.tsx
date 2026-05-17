export function DOMTreeSVG() {
  const node = (x: number, y: number, label: string, color: string) => (
    <g key={`${x}-${y}`}>
      <rect x={x - 40} y={y - 14} width="80" height="28" rx="6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <text x={x} y={y + 5} textAnchor="middle" fill={color} fontSize="11" fontFamily="monospace" fontWeight="600">{label}</text>
    </g>
  )

  const line = (x1: number, y1: number, x2: number, y2: number) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="1.5" />
  )

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 overflow-x-auto">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">DOM-дерево</p>
      <svg viewBox="0 0 380 200" className="w-full max-w-md mx-auto">
        {line(190, 34, 190, 56)}
        {line(190, 84, 100, 106)}
        {line(190, 84, 280, 106)}
        {line(100, 134, 60, 156)}
        {line(100, 134, 140, 156)}

        {node(190, 20, 'document', '#3B5BDB')}
        {node(190, 70, 'html', '#3B5BDB')}
        {node(100, 120, 'head', '#7950F2')}
        {node(280, 120, 'body', '#2F9E44')}
        {node(60, 170, 'title', '#7950F2')}
        {node(140, 170, 'meta', '#7950F2')}
        <text x="280" y="168" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic">дочерние элементы...</text>
      </svg>
    </div>
  )
}
