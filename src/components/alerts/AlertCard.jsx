import { AlertTriangle, AlertCircle, Info, CheckCircle, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAgroBot }  from '../../context/AgroBotContext'
import { timeAgo }     from '../../utils/dateUtils'

const SEVERITY_CONFIG = {
  low:      { Icon: Info,           border: 'border-blue-200',   bg: 'bg-blue-50',   title: 'text-blue-800',  badge: 'bg-blue-100 text-blue-700',   label: 'Baja'     },
  medium:   { Icon: AlertCircle,    border: 'border-yellow-200', bg: 'bg-yellow-50', title: 'text-yellow-800',badge: 'bg-yellow-100 text-yellow-700', label: 'Media'    },
  high:     { Icon: AlertTriangle,  border: 'border-orange-200', bg: 'bg-orange-50', title: 'text-orange-800',badge: 'bg-orange-100 text-orange-700', label: 'Alta'     },
  critical: { Icon: AlertTriangle,  border: 'border-red-200',    bg: 'bg-red-50',    title: 'text-red-800',   badge: 'bg-red-100 text-red-700',      label: 'Crítica'  },
}

export default function AlertCard({ alert, compact = false }) {
  const { dispatch } = useAgroBot()
  const navigate = useNavigate()
  const cfg = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.low

  const handleMarkRead = () => dispatch({ type: 'MARK_ALERT_READ', payload: alert.id })

  const handleConsult = () => {
    dispatch({ type: 'MARK_ALERT_READ', payload: alert.id })
    navigate('/', { state: { prefillQuery: alert.prefillQuery } })
  }

  return (
    <div className={`rounded-xl border p-4 ${cfg.border} ${cfg.bg} ${!alert.read ? 'ring-1 ring-offset-1 ring-opacity-50' : 'opacity-80'} transition-all`}>
      <div className="flex items-start gap-3">
        <cfg.Icon size={18} className={cfg.title + ' flex-shrink-0 mt-0.5'} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>
              {cfg.label}
            </span>
            {!alert.read && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-agro-100 text-agro-700">Nueva</span>
            )}
            <span className="text-[10px] text-gray-400 ml-auto">{timeAgo(alert.timestamp)}</span>
          </div>

          <h3 className={`text-sm font-semibold ${cfg.title} mb-0.5`}>{alert.title}</h3>
          <p className="text-[11px] text-gray-500 mb-0.5">{alert.farmName}</p>

          {!compact && (
            <p className="text-xs text-gray-600 leading-relaxed mt-2">{alert.message}</p>
          )}

          {!compact && !alert.read && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleConsult}
                className="flex items-center gap-1 text-xs bg-agro-600 hover:bg-agro-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                <ExternalLink size={11} />
                Consultar a AgroBot
              </button>
              <button
                onClick={handleMarkRead}
                className="flex items-center gap-1 text-xs bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                <CheckCircle size={11} />
                Marcar leída
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
