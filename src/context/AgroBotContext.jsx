import { createContext, useContext, useReducer, useEffect } from 'react'
import { mockFarms }        from '../data/mockFarms'
import { mockAlerts }       from '../data/mockAlerts'
import { mockInteractions } from '../data/mockInteractions'
import { loadStoredInteractions } from '../agents/registrationAgent'

const AgroBotContext = createContext(null)

const WELCOME_MESSAGE = {
  id: 'msg-welcome',
  type: 'bot',
  text: 'Hola, soy AgroBot. Puedo ayudarte a interpretar los datos climáticos de tu finca y orientarte sobre las acciones a tomar en tu cultivo.',
  action: 'Selecciona una consulta rápida o escribe tu pregunta en el campo de abajo.',
  category: null,
  urgency: null,
  timestamp: new Date().toISOString(),
}

const initialState = {
  farms:          mockFarms,
  selectedFarmId: mockFarms[0].id,
  messages:       [WELCOME_MESSAGE],
  agentStatus:    null,
  isProcessing:   false,
  interactions:   [],
  alerts:         mockAlerts,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FARM':
      return {
        ...state,
        selectedFarmId: action.payload,
        messages: [
          WELCOME_MESSAGE,
          {
            id: `msg-sys-${Date.now()}`,
            type: 'system',
            text: `Ahora consultando datos de ${mockFarms.find(f => f.id === action.payload)?.name}.`,
            timestamp: new Date().toISOString(),
          }
        ],
      }
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_AGENT_STATUS':
      return { ...state, agentStatus: action.payload }
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload }
    case 'ADD_INTERACTION':
      return { ...state, interactions: [action.payload, ...state.interactions] }
    case 'SET_INTERACTIONS':
      return { ...state, interactions: action.payload }
    case 'MARK_ALERT_READ':
      return {
        ...state,
        alerts: state.alerts.map(a => a.id === action.payload ? { ...a, read: true } : a),
      }
    case 'MARK_ALL_ALERTS_READ':
      return { ...state, alerts: state.alerts.map(a => ({ ...a, read: true })) }
    case 'CLEAR_CHAT':
      return { ...state, messages: [WELCOME_MESSAGE] }
    case 'RATE_INTERACTION':
      return {
        ...state,
        interactions: state.interactions.map(i =>
          i.id === action.payload.id ? { ...i, userRating: action.payload.rating } : i
        ),
      }
    default:
      return state
  }
}

export function AgroBotProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const stored = loadStoredInteractions()
    const merged = [
      ...stored,
      ...mockInteractions.filter(m => !stored.find(s => s.id === m.id)),
    ]
    dispatch({ type: 'SET_INTERACTIONS', payload: merged })
  }, [])

  const selectedFarm = state.farms.find(f => f.id === state.selectedFarmId) || state.farms[0]
  const unreadAlerts = state.alerts.filter(a => !a.read).length
  const farmAlerts   = state.alerts.filter(a => a.farmId === state.selectedFarmId && !a.read)

  return (
    <AgroBotContext.Provider value={{ state, dispatch, selectedFarm, unreadAlerts, farmAlerts }}>
      {children}
    </AgroBotContext.Provider>
  )
}

export function useAgroBot() {
  const ctx = useContext(AgroBotContext)
  if (!ctx) throw new Error('useAgroBot must be used within AgroBotProvider')
  return ctx
}
