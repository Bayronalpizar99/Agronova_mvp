const CROP_NAMES = ['yuca', 'cafe', 'café', 'platano', 'plátano', 'maiz', 'maíz', 'tomate', 'frijol', 'papa', 'pina', 'piña', 'macadamia']

const AGRO_KEYWORDS = [
  'regar', 'riego', 'agua', 'temperatura', 'frio', 'fría', 'calor', 'helada',
  'lluvia', 'humedad', 'suelo', 'sensor', 'estacion', 'radiacion', 'fertilizar',
  'cosechar', 'cosecha', 'fertilizante', 'problema', 'error', 'falla', 'bateria',
  'alerta', 'peligro', 'riesgo', 'danio', 'afectar', 'significar', 'significa',
  'deberia', 'debo', 'cuando', 'momento', 'aplicar', 'fumigacion', 'fumigar',
]

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
}

function extractKeywords(normalizedText) {
  return AGRO_KEYWORDS.filter(kw => normalizedText.includes(normalize(kw)))
}

function detectCrop(normalizedText, fallback) {
  const found = CROP_NAMES.find(c => normalizedText.includes(normalize(c)))
  if (!found) return fallback
  const n = normalize(found)
  if (n === 'cafe') return 'café'
  if (n === 'platano') return 'plátano'
  if (n === 'maiz') return 'maíz'
  return found
}

export function receptorAgent(text, farm) {
  const normalized = normalize(text)
  const keywords = extractKeywords(normalized)
  const detectedCrop = detectCrop(normalized, farm.primaryCrop)

  return {
    originalText: text,
    normalizedText: normalized,
    keywords,
    detectedCrop,
    farmSnapshot: { ...farm.currentData },
    farmThresholds: { ...farm.thresholds },
    timestamp: new Date().toISOString(),
  }
}
