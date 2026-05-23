const CONFIG = {
  alerta_climatica:     { label: 'Alerta Climática',      bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500'    },
  recomendacion_accion: { label: 'Recomendación',         bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500'  },
  interpretacion_datos: { label: 'Interpretación',        bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  soporte_tecnico:      { label: 'Soporte Técnico',       bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500'  },
  fallback:             { label: 'Consulta General',      bg: 'bg-gray-100',   text: 'text-gray-600',   dot: 'bg-gray-400'   },
}

export default function CategoryBadge({ category }) {
  if (!category) return null
  const cfg = CONFIG[category] || CONFIG.fallback
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}
