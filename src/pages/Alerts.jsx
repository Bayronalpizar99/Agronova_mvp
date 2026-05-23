import { useState }   from 'react'
import { Bell, CheckCheck } from 'lucide-react'
import { useAgroBot } from '../context/AgroBotContext'
import AlertCard      from '../components/alerts/AlertCard'
import Header         from '../components/layout/Header'

export default function Alerts() {
  const { state, dispatch } = useAgroBot()
  const [tab, setTab] = useState('active')

  const active  = state.alerts.filter(a => !a.read)
  const read    = state.alerts.filter(a => a.read)
  const shown   = tab === 'active' ? active : read

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Alertas" />

      <div className="flex-1 overflow-y-auto">
        {/* Tabs */}
        <div className="flex items-center gap-0 px-6 pt-5 pb-0 border-b border-gray-200 bg-white">
          <button
            onClick={() => setTab('active')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors mr-2
              ${tab === 'active' ? 'border-agro-600 text-agro-700' : 'border-transparent text-gray-500 hover:text-gray-700'}
            `}
          >
            Activas
            {active.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {active.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab('read')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors
              ${tab === 'read' ? 'border-agro-600 text-agro-700' : 'border-transparent text-gray-500 hover:text-gray-700'}
            `}
          >
            Historial ({read.length})
          </button>

          {active.length > 0 && (
            <button
              onClick={() => dispatch({ type: 'MARK_ALL_ALERTS_READ' })}
              className="ml-auto flex items-center gap-1.5 text-xs text-gray-500 hover:text-agro-600 font-medium transition-colors mb-2.5"
            >
              <CheckCheck size={14} />
              Marcar todas leídas
            </button>
          )}
        </div>

        <div className="p-6 space-y-3 max-w-2xl">
          {shown.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-agro-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell size={24} className="text-agro-600" />
              </div>
              <p className="text-gray-500 font-medium text-sm">
                {tab === 'active' ? 'No hay alertas activas' : 'Sin alertas anteriores'}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {tab === 'active' ? 'Todas las fincas están dentro de los parámetros normales.' : ''}
              </p>
            </div>
          ) : (
            shown.map(alert => <AlertCard key={alert.id} alert={alert} />)
          )}
        </div>
      </div>
    </div>
  )
}
