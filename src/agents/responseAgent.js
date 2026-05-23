import { mockResponses } from '../data/mockResponses'
import { interpolate } from '../utils/interpolate'

function buildVars(farm, detectedCrop) {
  const d = farm.currentData
  const t = farm.thresholds
  return {
    temp:             d.temperature,
    humidity:         d.humidity,
    precipitation:    d.precipitation24h,
    radiation:        d.solarRadiation,
    soilMoisture:     d.soilMoisture,
    windSpeed:        d.windSpeed,
    crop:             detectedCrop,
    tempMin:          t.tempMin,
    tempMax:          t.tempMax,
    humidityMin:      t.humidityMin,
    humidityMax:      t.humidityMax,
    soilMoistureMin:  t.soilMoistureMin,
    soilMoistureMax:  t.soilMoistureMax,
    battery:          farm.station.batteryLevel,
    farmName:         farm.name,
  }
}

function pickResponseNode(category, subcategory, urgency, farmSnapshot, farmThresholds) {
  const cat = mockResponses[category]
  if (!cat) return mockResponses.fallback

  if (category === 'fallback') return cat

  const sub = cat[subcategory]
  if (!sub) {
    const firstKey = Object.keys(cat)[0]
    const fallbackSub = cat[firstKey]
    if (!fallbackSub) return mockResponses.fallback
    if (fallbackSub.template) return fallbackSub
    return fallbackSub[urgency] || fallbackSub.low || Object.values(fallbackSub)[0]
  }

  if (sub.template) return sub

  // subcategory is an object keyed by scenario
  if (category === 'recomendacion_accion' && subcategory === 'riego') {
    const rain = farmSnapshot.precipitation24h
    const soil = farmSnapshot.soilMoisture
    if (rain > 10) return sub.after_rain
    if (soil < farmThresholds.soilMoistureMin) return sub.humidity_low
    return sub.humidity_ok
  }

  if (category === 'recomendacion_accion' && subcategory === 'fertilizacion') {
    return farmSnapshot.precipitation24h > 8 ? sub.conditions_not_ok : sub.conditions_ok
  }

  if (category === 'recomendacion_accion' && subcategory === 'cosecha') {
    return farmSnapshot.precipitation24h > 8 ? sub.conditions_not_ok : sub.conditions_ok
  }

  if (sub[urgency]) return sub[urgency]
  if (sub.normal) return sub.normal
  if (sub.low) return sub.low
  return Object.values(sub)[0]
}

export function responseAgent(classification, farm) {
  const { category, subcategory, urgency } = classification
  const vars = buildVars(farm, classification.detectedCrop || farm.primaryCrop)
  const node = pickResponseNode(category, subcategory, urgency, farm.currentData, farm.thresholds)

  let responseText = interpolate(node.template, vars)
  let action = interpolate(node.action || '', vars)

  if (urgency === 'high' && category !== 'soporte_tecnico') {
    action += ' Esta situación requiere atención prioritaria.'
  }

  return { responseText, action, category, subcategory, urgency }
}
