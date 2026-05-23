import { receptorAgent }      from './receptorAgent'
import { classifierAgent }    from './classifierAgent'
import { responseAgent }      from './responseAgent'
import { registrationAgent }  from './registrationAgent'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export async function processQuery(text, farm, dispatch) {
  dispatch({ type: 'SET_PROCESSING', payload: true })

  // Step 1 — Receptor
  dispatch({ type: 'SET_AGENT_STATUS', payload: 'receiving' })
  await delay(800)
  const structuredQuery = receptorAgent(text, farm)

  // Step 2 — Classifier
  dispatch({ type: 'SET_AGENT_STATUS', payload: 'classifying' })
  await delay(700)
  const classification = classifierAgent(structuredQuery)
  classification.detectedCrop = structuredQuery.detectedCrop

  // Step 3 — Response
  dispatch({ type: 'SET_AGENT_STATUS', payload: 'generating' })
  await delay(1000)
  const response = responseAgent(classification, farm)

  // Step 4 — Registration
  dispatch({ type: 'SET_AGENT_STATUS', payload: 'registering' })
  await delay(400)
  const interaction = registrationAgent(
    structuredQuery,
    classification,
    response,
    farm.id,
    farm.name,
  )

  // Done
  dispatch({ type: 'SET_AGENT_STATUS', payload: null })
  dispatch({ type: 'SET_PROCESSING', payload: false })

  const botMessage = {
    id: `msg-${Date.now()}`,
    type: 'bot',
    text: response.responseText,
    action: response.action,
    category: response.category,
    subcategory: response.subcategory,
    urgency: response.urgency,
    timestamp: new Date().toISOString(),
  }

  dispatch({ type: 'ADD_MESSAGE', payload: botMessage })
  dispatch({ type: 'ADD_INTERACTION', payload: interaction })
}
