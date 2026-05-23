function getStatus(value, min, max) {
  if (value === undefined || min === undefined || max === undefined) return 'normal'
  if (value < min || value > max) return 'critical'
  if (value < min + (max - min) * 0.1 || value > max - (max - min) * 0.1) return 'warning'
  return 'normal'
}

const statusStyles = {
  normal:   { card: 'border-gray-100',   icon: 'text-agro-600',  value: 'text-gray-800'  },
  warning:  { card: 'border-yellow-200', icon: 'text-yellow-600', value: 'text-yellow-700' },
  critical: { card: 'border-red-200',    icon: 'text-red-600',    value: 'text-red-700'    },
}

export default function ClimateCard({ label, value, unit, Icon, min, max }) {
  const status = getStatus(value, min, max)
  const styles = statusStyles[status]

  return (
    <div className={`bg-white rounded-xl border p-3 flex items-center gap-3 ${styles.card}`}>
      <div className={`flex-shrink-0 ${styles.icon}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide truncate">{label}</p>
        <p className={`text-lg font-bold leading-tight ${styles.value}`}>
          {value !== undefined ? value : '—'}
          <span className="text-xs font-normal ml-0.5 text-gray-500">{unit}</span>
        </p>
      </div>
      {status !== 'normal' && (
        <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0
          ${status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}
        `}>
          {status === 'critical' ? '!' : '~'}
        </span>
      )}
    </div>
  )
}
