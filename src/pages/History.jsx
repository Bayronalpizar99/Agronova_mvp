import { useState, useMemo } from 'react'
import { Clock, Download }   from 'lucide-react'
import { useAgroBot }        from '../context/AgroBotContext'
import InteractionCard       from '../components/history/InteractionCard'
import Header                from '../components/layout/Header'

const CATEGORIES = [
  { value: 'all',                  label: 'Todas las categorías' },
  { value: 'alerta_climatica',     label: 'Alerta Climática'     },
  { value: 'recomendacion_accion', label: 'Recomendación'        },
  { value: 'interpretacion_datos', label: 'Interpretación'       },
  { value: 'soporte_tecnico',      label: 'Soporte Técnico'      },
]

const DATE_FILTERS = [
  { value: 'all',    label: 'Todo el historial' },
  { value: '7d',     label: 'Últimos 7 días'    },
  { value: '24h',    label: 'Últimas 24h'       },
]

export default function History() {
  const { state }        = useAgroBot()
  const [catFilter, setCatFilter]   = useState('all')
  const [farmFilter, setFarmFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const filtered = useMemo(() => {
    const now = Date.now()
    return state.interactions.filter(i => {
      if (catFilter  !== 'all' && i.classification.category !== catFilter)  return false
      if (farmFilter !== 'all' && i.farmId !== farmFilter)                   return false
      if (dateFilter === '24h' && now - new Date(i.timestamp).getTime() > 86400000)  return false
      if (dateFilter === '7d'  && now - new Date(i.timestamp).getTime() > 604800000) return false
      return true
    })
  }, [state.interactions, catFilter, farmFilter, dateFilter])

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `agrobot-historial-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Historial de Consultas" />

      <div className="flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex flex-wrap gap-2 items-center">
          <select
            value={farmFilter}
            onChange={e => setFarmFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-agro-400 text-gray-700"
          >
            <option value="all">Todas las fincas</option>
            {state.farms.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>

          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-agro-400 text-gray-700"
          >
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>

          <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-agro-400 text-gray-700"
          >
            {DATE_FILTERS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>

          <span className="text-xs text-gray-400 ml-1">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>

          <button
            onClick={handleExport}
            className="ml-auto flex items-center gap-1.5 text-xs text-gray-500 hover:text-agro-600 font-medium border border-gray-200 hover:border-agro-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Download size={13} />
            Exportar JSON
          </button>
        </div>

        {/* List */}
        <div className="p-6 space-y-3 max-w-2xl">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium text-sm">Sin resultados</p>
              <p className="text-gray-400 text-xs mt-1">Ajusta los filtros o realiza nuevas consultas en AgroBot.</p>
            </div>
          ) : (
            filtered.map(i => <InteractionCard key={i.id} interaction={i} />)
          )}
        </div>
      </div>
    </div>
  )
}
