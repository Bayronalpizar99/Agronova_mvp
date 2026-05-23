import {
  ResponsiveContainer, ComposedChart, Line, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2.5 text-xs">
      <p className="font-semibold text-gray-600 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}{p.dataKey === 'temperature' ? '°C' : '%'}
        </p>
      ))}
    </div>
  )
}

export default function ClimateChart({ data }) {
  const sliced = data.filter((_, i) => i % 2 === 0)

  return (
    <div>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
        Últimas 24 horas
      </p>
      <ResponsiveContainer width="100%" height={120}>
        <ComposedChart data={sliced} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 8, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            interval={2}
          />
          <YAxis
            yAxisId="temp"
            domain={['auto', 'auto']}
            tick={{ fontSize: 8, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="hum"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 8, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            hide
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            yAxisId="hum"
            type="monotone"
            dataKey="humidity"
            name="Humedad"
            fill="#dcfce7"
            stroke="#4ade80"
            strokeWidth={1.5}
            dot={false}
            fillOpacity={0.5}
          />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temperature"
            name="Temperatura"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
