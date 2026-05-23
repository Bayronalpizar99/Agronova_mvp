import { Thermometer, Droplets, CloudRain, Sun, Layers } from 'lucide-react'
import { useAgroBot }   from '../../context/AgroBotContext'
import FarmSelector     from './FarmSelector'
import ClimateCard      from './ClimateCard'
import ClimateChart     from './ClimateChart'
import StationStatus    from './StationStatus'

export default function FarmDataSidebar() {
  const { selectedFarm } = useAgroBot()
  if (!selectedFarm) return null

  const { currentData: d, thresholds: t } = selectedFarm

  const cards = [
    { label: 'Temperatura',  value: d.temperature,     unit: '°C',   Icon: Thermometer, min: t.tempMin,          max: t.tempMax          },
    { label: 'Humedad aire', value: d.humidity,         unit: '%',    Icon: Droplets,    min: t.humidityMin,      max: t.humidityMax       },
    { label: 'Lluvia 24h',   value: d.precipitation24h, unit: 'mm',   Icon: CloudRain,   min: 0,                  max: 20                  },
    { label: 'Radiación',    value: d.solarRadiation,   unit: 'W/m²', Icon: Sun,         min: 0,                  max: 800                 },
    { label: 'H. de suelo',  value: d.soilMoisture,     unit: '%',    Icon: Layers,      min: t.soilMoistureMin,  max: t.soilMoistureMax   },
  ]

  return (
    <aside className="hidden lg:flex flex-col w-72 xl:w-80 bg-white border-l border-gray-200 flex-shrink-0 overflow-y-auto">
      <FarmSelector />

      <div className="flex-1 px-4 py-3 space-y-2">
        {cards.map(card => (
          <ClimateCard key={card.label} {...card} />
        ))}
      </div>

      <div className="pb-3 border-t border-gray-100 pt-3">
        <ClimateChart data={selectedFarm.history24h} />
      </div>

      <div className="px-4 pb-4 pt-1">
        <StationStatus station={selectedFarm.station} />
      </div>
    </aside>
  )
}
