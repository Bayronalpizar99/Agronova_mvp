import { Wifi, WifiOff, Battery, AlertTriangle } from 'lucide-react'
import { formatDateTime } from '../../utils/dateUtils'

const STATUS_CONFIG = {
  online:  { label: 'En línea',    color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200', Icon: Wifi           },
  warning: { label: 'Advertencia', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', Icon: AlertTriangle  },
  offline: { label: 'Desconectada',color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',   Icon: WifiOff        },
}

export default function StationStatus({ station }) {
  const cfg = STATUS_CONFIG[station.status] || STATUS_CONFIG.offline

  return (
    <div className={`rounded-xl border p-3 ${cfg.bg} ${cfg.border}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <cfg.Icon size={13} className={cfg.color} />
          <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <Battery size={12} className="text-gray-400" />
          <span className={`text-[11px] font-medium ${station.batteryLevel < 25 ? 'text-red-600' : 'text-gray-500'}`}>
            {station.batteryLevel}%
          </span>
        </div>
      </div>
      <p className="text-[10px] text-gray-400">{station.model} · {station.id}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">
        Última actualización: {formatDateTime(station.lastUpdate)}
      </p>
    </div>
  )
}
