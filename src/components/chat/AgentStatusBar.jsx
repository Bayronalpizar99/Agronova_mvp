import { Check } from 'lucide-react'

const STEPS = [
  { key: 'receiving',   label: 'Receptor'     },
  { key: 'classifying', label: 'Clasificador' },
  { key: 'generating',  label: 'Respuesta'    },
  { key: 'registering', label: 'Registro'     },
]

const ORDER = ['receiving', 'classifying', 'generating', 'registering']

function getStepState(stepKey, currentStatus) {
  if (!currentStatus) return 'idle'
  const currentIdx = ORDER.indexOf(currentStatus)
  const stepIdx    = ORDER.indexOf(stepKey)
  if (stepIdx < currentIdx)  return 'done'
  if (stepIdx === currentIdx) return 'active'
  return 'pending'
}

export default function AgentStatusBar({ agentStatus }) {
  if (!agentStatus) return null

  return (
    <div className="mx-4 mb-2 bg-agro-50 border border-agro-200 rounded-xl px-4 py-2.5 animate-fade-in">
      <div className="flex items-center gap-1 justify-between">
        {STEPS.map((step, i) => {
          const state = getStepState(step.key, agentStatus)
          return (
            <div key={step.key} className="flex items-center gap-1 flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all
                  ${state === 'active'  ? 'bg-agro-600 animate-pulse ring-2 ring-agro-300' : ''}
                  ${state === 'done'    ? 'bg-agro-600' : ''}
                  ${state === 'pending' ? 'bg-gray-200' : ''}
                `}>
                  {state === 'done' && <Check size={10} className="text-white" strokeWidth={3} />}
                  {state === 'active' && <span className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`text-[9px] font-medium hidden sm:block
                  ${state === 'active'  ? 'text-agro-700' : ''}
                  ${state === 'done'    ? 'text-agro-600' : ''}
                  ${state === 'pending' ? 'text-gray-400' : ''}
                `}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-1 transition-colors
                  ${state === 'done' ? 'bg-agro-400' : 'bg-gray-200'}
                `} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
