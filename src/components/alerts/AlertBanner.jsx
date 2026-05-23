import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAgroBot } from '../../context/AgroBotContext'

export default function AlertBanner() {
  const { farmAlerts } = useAgroBot()
  const [dismissed, setDismissed] = useState(false)
  const navigate = useNavigate()

  if (!farmAlerts.length || dismissed) return null

  const highestSeverity = farmAlerts.some(a => a.severity === 'critical' || a.severity === 'high')

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 text-sm flex-shrink-0
      ${highestSeverity ? 'bg-orange-50 border-b border-orange-200' : 'bg-yellow-50 border-b border-yellow-200'}
    `}>
      <AlertTriangle size={15} className={highestSeverity ? 'text-orange-600 flex-shrink-0' : 'text-yellow-600 flex-shrink-0'} />
      <p className="flex-1 text-xs text-gray-700">
        <span className="font-semibold">{farmAlerts.length} alerta{farmAlerts.length > 1 ? 's' : ''} activa{farmAlerts.length > 1 ? 's' : ''}</span>
        {' '}en esta finca.{' '}
        <button onClick={() => navigate('/alerts')} className="underline font-medium hover:no-underline">
          Ver alertas
        </button>
      </p>
      <button onClick={() => setDismissed(true)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
        <X size={14} />
      </button>
    </div>
  )
}
