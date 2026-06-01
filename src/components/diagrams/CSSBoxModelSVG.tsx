export function CSSBoxModelSVG() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 overflow-x-auto">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">Блочная модель CSS</p>
      <svg viewBox="0 0 360 260" className="w-full max-w-sm mx-auto">
        {/* Margin */}
        <rect x="5" y="5" width="350" height="250" rx="8" fill="#FEF9C3" stroke="#EAB308" strokeWidth="1.5" />
        <text x="180" y="22" textAnchor="middle" fill="#854D0E" fontSize="11" fontWeight="600">margin</text>

        {/* Border */}
        <rect x="30" y="30" width="300" height="200" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
        <text x="180" y="47" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">border</text>

        {/* Padding */}
        <rect x="55" y="55" width="250" height="150" rx="4" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
        <text x="180" y="72" textAnchor="middle" fill="#1E40AF" fontSize="11" fontWeight="600">padding</text>

        {/* Content */}
        <rect x="85" y="85" width="190" height="90" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="180" y="136" textAnchor="middle" fill="#5B21B6" fontSize="13" fontWeight="700">content</text>
        <text x="180" y="153" textAnchor="middle" fill="#7C3AED" fontSize="10">width × height</text>
      </svg>
    </div>
  )
}
