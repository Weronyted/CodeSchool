export function HTMLStructureSVG() {
  const box = (x: number, y: number, w: number, h: number, label: string, color: string) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fill={color} fontSize="13" fontFamily="monospace" fontWeight="600">{label}</text>
    </g>
  )

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 overflow-x-auto">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">Структура HTML-документа</p>
      <svg viewBox="0 0 380 260" className="w-full max-w-md mx-auto">
        {box(10, 10, 360, 240, '', '#3B5BDB')}
        <text x="30" y="32" fill="#3B5BDB" fontSize="12" fontFamily="monospace">&lt;html&gt;</text>
        {box(30, 40, 320, 80, '', '#7950F2')}
        <text x="50" y="60" fill="#7950F2" fontSize="12" fontFamily="monospace">&lt;head&gt;</text>
        {box(55, 68, 120, 40, '<title>', '#7950F2')}
        {box(195, 68, 140, 40, '<style> <link>', '#7950F2')}
        {box(30, 135, 320, 100, '', '#2F9E44')}
        <text x="50" y="155" fill="#2F9E44" fontSize="12" fontFamily="monospace">&lt;body&gt;</text>
        {box(55, 162, 80, 60, '<h1>', '#2F9E44')}
        {box(150, 162, 80, 60, '<p>', '#2F9E44')}
        {box(245, 162, 90, 60, '<div>', '#2F9E44')}
        <text x="190" y="253" textAnchor="middle" fill="#94a3b8" fontSize="11">дерево элементов</text>
      </svg>
    </div>
  )
}
