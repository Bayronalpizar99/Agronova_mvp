function generateHistory(baseTemp, basHum, hadRain, peakHour = 13) {
  return Array.from({ length: 24 }, (_, i) => {
    const distFromPeak = Math.abs(i - peakHour)
    const tempVariation = Math.max(0, 1 - distFromPeak / peakHour)
    const temp = parseFloat((baseTemp - 5 + tempVariation * 8 + (Math.random() - 0.5)).toFixed(1))
    const hum = Math.round(basHum + (i < 6 || i > 20 ? 8 : -5) + (Math.random() - 0.5) * 4)
    const radiation = i >= 6 && i <= 18
      ? Math.round(Math.sin(((i - 6) / 12) * Math.PI) * 680 + (Math.random() - 0.5) * 40)
      : 0
    const rain = hadRain && i === 17 ? parseFloat((Math.random() * 3 + 1).toFixed(1)) : 0
    return {
      hour: `${String(i).padStart(2, '0')}:00`,
      temperature: temp,
      humidity: Math.min(99, Math.max(30, hum)),
      precipitation: rain,
      radiation: Math.max(0, radiation),
    }
  })
}

export const mockFarms = [
  {
    id: 'farm-001',
    name: 'Finca Los Pinos',
    owner: 'Juan Pérez Rodríguez',
    location: 'San Carlos, Alajuela',
    elevation: 450,
    primaryCrop: 'yuca',
    secondaryCrop: 'plátano',
    station: {
      id: 'STA-001',
      model: 'AgroStation Pro v2',
      lastUpdate: '2026-05-19T08:30:00',
      status: 'online',
      batteryLevel: 87,
    },
    currentData: {
      temperature: 18.5,
      humidity: 72,
      precipitation24h: 4.2,
      solarRadiation: 320,
      soilMoisture: 58,
      windSpeed: 12,
    },
    thresholds: {
      tempMin: 12,
      tempMax: 35,
      humidityMin: 50,
      humidityMax: 90,
      soilMoistureMin: 40,
      soilMoistureMax: 80,
    },
    history24h: generateHistory(18.5, 72, true),
  },
  {
    id: 'farm-002',
    name: 'Finca La Esperanza',
    owner: 'María González Vargas',
    location: 'Sarapiquí, Heredia',
    elevation: 280,
    primaryCrop: 'café',
    secondaryCrop: 'macadamia',
    station: {
      id: 'STA-002',
      model: 'AgroStation Pro v2',
      lastUpdate: '2026-05-19T08:25:00',
      status: 'online',
      batteryLevel: 62,
    },
    currentData: {
      temperature: 22.3,
      humidity: 89,
      precipitation24h: 18.5,
      solarRadiation: 140,
      soilMoisture: 78,
      windSpeed: 8,
    },
    thresholds: {
      tempMin: 15,
      tempMax: 32,
      humidityMin: 55,
      humidityMax: 88,
      soilMoistureMin: 45,
      soilMoistureMax: 75,
    },
    history24h: generateHistory(22, 89, false),
  },
  {
    id: 'farm-003',
    name: 'Finca El Progreso',
    owner: 'Carlos Solís Mora',
    location: 'Guápiles, Limón',
    elevation: 95,
    primaryCrop: 'plátano',
    secondaryCrop: 'yuca',
    station: {
      id: 'STA-003',
      model: 'AgroStation Lite v1',
      lastUpdate: '2026-05-19T07:50:00',
      status: 'warning',
      batteryLevel: 18,
    },
    currentData: {
      temperature: 28.7,
      humidity: 61,
      precipitation24h: 1.2,
      solarRadiation: 580,
      soilMoisture: 39,
      windSpeed: 15,
    },
    thresholds: {
      tempMin: 18,
      tempMax: 38,
      humidityMin: 55,
      humidityMax: 92,
      soilMoistureMin: 45,
      soilMoistureMax: 85,
    },
    history24h: generateHistory(28, 61, false, 12),
  },
]

export const getFarmById = (id) => mockFarms.find(f => f.id === id) || mockFarms[0]
