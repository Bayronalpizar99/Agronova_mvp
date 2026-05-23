import { useState }   from 'react'
import { ChevronDown, ChevronUp, Star } from 'lucide-react'
import CategoryBadge   from '../chat/CategoryBadge'
import UrgencyBadge    from '../chat/UrgencyBadge'
import { useAgroBot }  from '../../context/AgroBotContext'
import { formatDateTime } from '../../utils/dateUtils'
import { updateRating } from '../../agents/registrationAgent'

export default function InteractionCard({ interaction }) {
  const [expanded, setExpanded] = useState(false)
  const { dispatch } = useAgroBot()

  const handleRate = (rating) => {
    dispatch({ type: 'RATE_INTERACTION', payload: { id: interaction.id, rating } })
    updateRating(interaction.id, rating)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full px-4 py-3 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <CategoryBadge category={interaction.classification.category} />
              <UrgencyBadge  urgency={interaction.classification.urgency}   />
              {interaction.escalated && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Escalado</span>
              )}
            </div>
            <p className="text-sm text-gray-800 font-medium line-clamp-2 text-left">
              "{interaction.query.originalText}"
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] text-gray-400">{interaction.farmName}</span>
              <span className="text-[10px] text-gray-300">·</span>
              <span className="text-[10px] text-gray-400">{formatDateTime(interaction.timestamp)}</span>
            </div>
          </div>
          <div className="flex-shrink-0 text-gray-400">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3 animate-fade-in">
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Respuesta de AgroBot</p>
            <p className="text-sm text-gray-700 leading-relaxed">{interaction.response.text}</p>
          </div>

          {interaction.response.action && (
            <div className="bg-agro-50 border border-agro-100 rounded-lg px-3 py-2">
              <p className="text-[10px] font-semibold text-agro-600 uppercase tracking-wide mb-0.5">Acción recomendada</p>
              <p className="text-xs text-agro-700">{interaction.response.action}</p>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <p className="text-[11px] text-gray-400 font-medium">Tu calificación:</p>
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => handleRate(n)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={14}
                  className={n <= (interaction.userRating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                />
              </button>
            ))}
            {interaction.userRating && (
              <span className="text-[10px] text-gray-400 ml-1">({interaction.userRating}/5)</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <span>Confianza del clasificador: {Math.round(interaction.classification.confidence * 100)}%</span>
            {interaction.query.detectedCrop && (
              <>
                <span>·</span>
                <span>Cultivo: {interaction.query.detectedCrop}</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
