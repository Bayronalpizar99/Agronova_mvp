import { ChevronDown } from 'lucide-react'
import { useAgroBot } from '../../context/AgroBotContext'

export default function FarmSelector() {
  const { state, dispatch, selectedFarm } = useAgroBot()

  const statusColor = {
    online:  'bg-green-500',
    warning: 'bg-yellow-500',
    offline: 'bg-red-500',
  }

  return (
    <div className="px-4 pt-4 pb-3 border-b border-gray-100">
      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
        Finca activa
      </label>
      <div className="relative">
        <select
          value={state.selectedFarmId}
          onChange={e => dispatch({ type: 'SELECT_FARM', payload: e.target.value })}
          className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-agro-400 cursor-pointer"
        >
          {state.farms.map(farm => (
            <option key={farm.id} value={farm.id}>
              {farm.name}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {selectedFarm && (
        <div className="flex items-center gap-1.5 mt-2">
          <span className={`w-1.5 h-1.5 rounded-full ${statusColor[selectedFarm.station.status]}`} />
          <span className="text-[11px] text-gray-500">{selectedFarm.location}</span>
          <span className="text-[11px] text-gray-400 ml-auto capitalize">{selectedFarm.primaryCrop}</span>
        </div>
      )}
    </div>
  )
}
