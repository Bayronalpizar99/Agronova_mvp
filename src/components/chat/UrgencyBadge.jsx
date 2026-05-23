const CONFIG = {
  low:      { label: 'Normal',    bg: 'bg-gray-100',   text: 'text-gray-500'   },
  medium:   { label: 'Atención',  bg: 'bg-yellow-100', text: 'text-yellow-700' },
  high:     { label: 'Urgente',   bg: 'bg-red-100',    text: 'text-red-700'    },
  critical: { label: 'Crítico',   bg: 'bg-red-200',    text: 'text-red-800'    },
}

export default function UrgencyBadge({ urgency }) {
  if (!urgency || urgency === 'low') return null
  const cfg = CONFIG[urgency] || CONFIG.low
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  )
}
