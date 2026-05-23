const PROMPTS = [
  '¿Debo regar hoy?',
  '¿La temperatura es peligrosa para mi cultivo?',
  '¿Qué significa la humedad de suelo?',
  '¿Es buen momento para fertilizar?',
  'El sensor no está enviando datos',
]

export default function QuickPrompts({ onSelect }) {
  return (
    <div className="px-4 pb-3">
      <p className="text-[11px] text-gray-400 mb-2 font-medium">Consultas frecuentes</p>
      <div className="flex flex-wrap gap-2">
        {PROMPTS.map(p => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            className="text-xs bg-white border border-agro-200 text-agro-700 hover:bg-agro-50 hover:border-agro-400 px-3 py-1.5 rounded-full transition-colors font-medium"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
