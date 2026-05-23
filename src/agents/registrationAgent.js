const STORAGE_KEY = 'agrobot_interactions'

export function registrationAgent(structuredQuery, classification, response, farmId, farmName) {
  const interaction = {
    id: `INT-${Date.now()}`,
    farmId,
    farmName,
    timestamp: new Date().toISOString(),
    query: {
      originalText: structuredQuery.originalText,
      keywords: structuredQuery.keywords,
      detectedCrop: structuredQuery.detectedCrop,
    },
    classification: {
      category: classification.category,
      subcategory: classification.subcategory,
      urgency: classification.urgency,
      confidence: classification.confidence,
    },
    response: {
      text: response.responseText,
      action: response.action,
    },
    userRating: null,
    escalated: classification.urgency === 'high',
  }

  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    localStorage.setItem(STORAGE_KEY, JSON.stringify([interaction, ...existing]))
  } catch (_) {
    // localStorage not available — in-memory only
  }

  return interaction
}

export function loadStoredInteractions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch (_) {
    return []
  }
}

export function updateRating(interactionId, rating) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const updated = stored.map(i => i.id === interactionId ? { ...i, userRating: rating } : i)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (_) {
    // ignore
  }
}
