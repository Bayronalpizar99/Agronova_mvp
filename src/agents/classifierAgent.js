const CATEGORY_KEYWORDS = {
  alerta_climatica: [
    'helada', 'frio', 'calor', 'lluvia', 'tormenta', 'viento', 'temperatura',
    'peligro', 'riesgo', 'dano', 'granizo', 'peligrosa', 'afectar', 'danar',
    'nocturna', 'noche', 'nochе',
  ],
  recomendacion_accion: [
    'regar', 'riego', 'agua', 'fertilizar', 'aplicar', 'fumigar', 'cosechar',
    'debo', 'deberia', 'cuando', 'momento', 'puedo', 'recomiendan', 'cosecha',
    'fertilizante', 'fumigacion',
  ],
  interpretacion_datos: [
    'significa', 'significar', 'que es', 'como se lee', 'dato', 'lectura',
    'sensor', 'numero', 'valor', 'medicion', 'porcentaje', 'radiacion',
    'humedad', 'suelo',
  ],
  soporte_tecnico: [
    'error', 'falla', 'funciona', 'problema', 'apagado', 'desconectado',
    'sistema', 'bateria', 'senal', 'offline', 'no envia', 'no llegan',
  ],
}

function scoreCategory(keywords, category) {
  return keywords.filter(kw => CATEGORY_KEYWORDS[category].some(ck => kw.includes(ck) || ck.includes(kw))).length
}

function detectSubcategory(category, normalizedText, farmSnapshot, farmThresholds) {
  if (category === 'alerta_climatica') {
    if (normalizedText.includes('lluvia') || normalizedText.includes('precipitacion')) return 'heavy_rain'
    if (normalizedText.includes('calor') || (farmSnapshot.temperature > farmThresholds.tempMax)) return 'temperature_high'
    return 'temperature_low'
  }
  if (category === 'recomendacion_accion') {
    if (normalizedText.includes('fertiliz')) return 'fertilizacion'
    if (normalizedText.includes('cosech')) return 'cosecha'
    return 'riego'
  }
  if (category === 'interpretacion_datos') {
    if (normalizedText.includes('radiacion') || normalizedText.includes('solar')) return 'solar_radiation'
    if (normalizedText.includes('suelo') || normalizedText.includes('tierra')) return 'soil_moisture'
    if (normalizedText.includes('lluvia') || normalizedText.includes('precipitacion')) return 'precipitation'
    if (normalizedText.includes('temperatura') || normalizedText.includes('calor') || normalizedText.includes('frio')) return 'temperature'
    return 'humidity'
  }
  if (category === 'soporte_tecnico') {
    if (normalizedText.includes('bateria')) return 'battery_low'
    if (normalizedText.includes('dato') || normalizedText.includes('envia') || normalizedText.includes('sensor')) return 'sensor_offline'
    return 'generic'
  }
  return 'generic'
}

function computeUrgency(category, subcategory, farmSnapshot, farmThresholds) {
  if (category === 'alerta_climatica') {
    const temp = farmSnapshot.temperature
    const rain = farmSnapshot.precipitation24h
    if (temp <= farmThresholds.tempMin || temp >= farmThresholds.tempMax) return 'high'
    if (rain > 15) return 'medium'
    if (temp <= farmThresholds.tempMin + 3) return 'medium'
    return 'low'
  }
  if (category === 'recomendacion_accion' && subcategory === 'riego') {
    if (farmSnapshot.soilMoisture < farmThresholds.soilMoistureMin) return 'high'
    return 'low'
  }
  if (category === 'soporte_tecnico') return 'medium'
  return 'low'
}

export function classifierAgent(structuredQuery) {
  const { keywords, normalizedText, farmSnapshot, farmThresholds } = structuredQuery

  const scores = {
    alerta_climatica:     scoreCategory(keywords, 'alerta_climatica'),
    recomendacion_accion: scoreCategory(keywords, 'recomendacion_accion'),
    interpretacion_datos: scoreCategory(keywords, 'interpretacion_datos'),
    soporte_tecnico:      scoreCategory(keywords, 'soporte_tecnico'),
  }

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
  const confidence = totalScore > 0 ? parseFloat((best[1] / totalScore).toFixed(2)) : 0

  if (confidence < 0.3 && totalScore === 0) {
    return { category: 'fallback', subcategory: null, urgency: 'low', confidence: 0 }
  }

  const category = best[0]
  const subcategory = detectSubcategory(category, normalizedText, farmSnapshot, farmThresholds)
  const urgency = computeUrgency(category, subcategory, farmSnapshot, farmThresholds)

  return { category, subcategory, urgency, confidence: Math.max(confidence, 0.65) }
}
