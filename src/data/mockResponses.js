export const mockResponses = {
  alerta_climatica: {
    temperature_low: {
      low: {
        template: 'La temperatura de {temp}°C registrada en tu finca está ligeramente por debajo de lo ideal para {crop}, pero no representa un riesgo inmediato. El umbral crítico para este cultivo es {tempMin}°C.',
        action: 'Monitorear la temperatura durante la próxima noche. Si baja de {tempMin}°C, contactar al agrónomo asignado.',
      },
      medium: {
        template: 'La temperatura de {temp}°C está cerca del límite inferior recomendado para {crop} ({tempMin}°C). Esta condición podría causar estrés en las plantas si se mantiene por más de 6 horas.',
        action: 'Revisar el sistema de protección contra frío si dispone de uno. Monitorear cada 2 horas esta noche.',
      },
      high: {
        template: 'La temperatura de {temp}°C ha alcanzado el umbral crítico para {crop}. Existe riesgo real de daño en las plantas, especialmente en etapas de floración o fructificación.',
        action: 'Contactar a su agrónomo asignado de inmediato. Considerar medidas de protección urgentes como cobertura o riego por aspersión.',
      },
    },
    temperature_high: {
      low: {
        template: 'La temperatura de {temp}°C es alta para {crop}, aunque aún dentro de los rangos manejables. El umbral máximo recomendado es {tempMax}°C.',
        action: 'Asegurarse de que el riego sea adecuado para compensar la evapotranspiración elevada. Revisar en las próximas horas.',
      },
      medium: {
        template: 'Con {temp}°C, su finca está experimentando estrés térmico para {crop}. Esto puede reducir la eficiencia fotosintética y aumentar el consumo de agua.',
        action: 'Aumentar la frecuencia de riego. Evitar aplicación de fertilizantes o agroquímicos con estas temperaturas.',
      },
      high: {
        template: 'Temperatura de {temp}°C: condición de calor extremo para {crop}. Este nivel de temperatura puede causar daño irreversible en el cultivo.',
        action: 'Contactar al agrónomo asignado urgentemente. Activar sistemas de enfriamiento o sombreado si están disponibles.',
      },
    },
    heavy_rain: {
      low: {
        template: 'Se registraron {precipitation}mm de lluvia en las últimas 24 horas en tu finca. Para {crop}, esta precipitación es moderada y generalmente beneficiosa.',
        action: 'No regar en las próximas 48 horas. Verificar que los drenajes estén funcionando correctamente.',
      },
      medium: {
        template: 'Con {precipitation}mm de precipitación registrados, existe riesgo de saturación de suelo para {crop}. La humedad actual de suelo es {soilMoisture}%, sobre el umbral recomendado.',
        action: 'Revisar el sistema de drenaje de la finca. Evitar maquinaria pesada en el campo para no compactar el suelo húmedo.',
      },
      high: {
        template: 'Lluvia intensa de {precipitation}mm en 24h. Esta cantidad puede generar encharcamiento y favorecer enfermedades fúngicas en {crop}, especialmente con la humedad actual de {humidity}%.',
        action: 'Contactar al agrónomo para evaluación de riesgo fitosanitario. Inspeccionar el campo en las próximas 24 horas.',
      },
    },
  },

  recomendacion_accion: {
    riego: {
      humidity_ok: {
        template: 'La humedad de suelo actual de tu finca es {soilMoisture}%, dentro del rango óptimo para {crop} ({soilMoistureMin}% - {soilMoistureMax}%). No es necesario regar hoy.',
        action: 'Revisar nuevamente en 24 horas. Próxima evaluación sugerida: mañana a primera hora.',
      },
      humidity_low: {
        template: 'La humedad de suelo de {soilMoisture}% está por debajo del mínimo recomendado para {crop} ({soilMoistureMin}%). El cultivo necesita agua para mantener un desarrollo óptimo.',
        action: 'Regar entre las 06:00 y 08:00 AM para minimizar evaporación. Cantidad sugerida: riego hasta alcanzar 65% de humedad de suelo.',
      },
      after_rain: {
        template: 'Se registraron {precipitation}mm de lluvia en las últimas 24 horas en tu finca. La humedad de suelo está en {soilMoisture}%, por encima del nivel óptimo.',
        action: 'Posponer el riego al menos 48 horas. Verificar que no haya encharcamiento en las zonas bajas del campo.',
      },
    },
    fertilizacion: {
      conditions_ok: {
        template: 'Las condiciones actuales en tu finca son favorables para la aplicación de fertilizante. Temperatura de {temp}°C, humedad de {humidity}% y sin lluvia intensa reciente.',
        action: 'Aplicar fertilizante en las horas de la mañana (06:00 - 09:00 AM). Evitar aplicación si se esperan lluvias en las próximas 6 horas.',
      },
      conditions_not_ok: {
        template: 'Las condiciones actuales no son ideales para fertilización. Con {precipitation}mm de lluvia reciente y humedad de suelo al {soilMoisture}%, el fertilizante podría ser arrastrado por escorrentía.',
        action: 'Esperar a que el suelo baje a menos de 70% de humedad. Se recomienda esperar 2-3 días después de la última lluvia.',
      },
    },
    cosecha: {
      conditions_ok: {
        template: 'Las condiciones climáticas en tu finca son favorables para labores de cosecha. Temperatura de {temp}°C y humedad de {humidity}%, adecuadas para el trabajo en campo.',
        action: 'Proceder con la cosecha en las horas de menor calor (06:00 - 10:00 AM o después de las 15:00). Verificar el estado de madurez del cultivo.',
      },
      conditions_not_ok: {
        template: 'Con {precipitation}mm de lluvia reciente, el terreno puede estar lodoso y dificultar las labores de cosecha de {crop}. Además, la humedad de {humidity}% puede afectar la calidad del producto cosechado.',
        action: 'Posponer la cosecha 1-2 días hasta que el terreno esté más seco. Consultar con su agrónomo sobre el impacto en la calidad.',
      },
    },
  },

  interpretacion_datos: {
    humidity: {
      normal: {
        template: 'La humedad relativa del aire en tu finca es {humidity}%. Este valor indica cuánta humedad hay en el aire comparado con el máximo posible a esa temperatura. Para {crop}, un rango de {humidityMin}% a {humidityMax}% es considerado óptimo.',
        action: 'Los valores actuales están dentro del rango normal. No se requiere acción inmediata.',
      },
      high: {
        template: 'La humedad relativa de {humidity}% en tu finca está por encima del rango óptimo para {crop}. Una humedad muy alta favorece el desarrollo de hongos y enfermedades como mildiú y botrytis.',
        action: 'Monitorear el follaje del cultivo en busca de síntomas de enfermedades fúngicas. Asegurar buena ventilación entre plantas.',
      },
      low: {
        template: 'La humedad relativa de {humidity}% está por debajo del rango recomendado para {crop}. Esto puede causar estrés hídrico en las plantas y reducir la eficiencia en el uso de nutrientes.',
        action: 'Revisar si el riego es suficiente. Considerar aumentar la frecuencia de riego en las horas más calurosas del día.',
      },
    },
    temperature: {
      normal: {
        template: 'La temperatura actual de {temp}°C en tu finca se encuentra dentro del rango óptimo para el desarrollo de {crop}. Este cultivo se desarrolla mejor entre {tempMin}°C y {tempMax}°C.',
        action: 'Condiciones térmicas favorables. Mantener el monitoreo regular.',
      },
    },
    solar_radiation: {
      normal: {
        template: 'La radiación solar registrada en tu finca es {radiation} W/m². Este valor indica la energía solar disponible para la fotosíntesis de {crop}. Un valor entre 200 y 600 W/m² es ideal para la mayoría de cultivos tropicales.',
        action: 'Valores normales para la hora del día. No requiere acción.',
      },
    },
    soil_moisture: {
      normal: {
        template: 'La humedad de suelo en tu finca es {soilMoisture}%. Este sensor mide el contenido de agua en el suelo. Para {crop}, el rango ideal es {soilMoistureMin}% a {soilMoistureMax}%. Un valor adecuado garantiza disponibilidad de agua y nutrientes para las raíces.',
        action: 'Humedad de suelo en niveles óptimos. Continuar con el plan de riego actual.',
      },
      low: {
        template: 'La humedad de suelo de {soilMoisture}% está por debajo del mínimo para {crop} ({soilMoistureMin}%). Esto significa que hay poca agua disponible para las raíces del cultivo.',
        action: 'Se recomienda riego pronto. Ver sección de recomendación de riego para más detalles.',
      },
    },
    precipitation: {
      normal: {
        template: 'Los {precipitation}mm de precipitación registrados en las últimas 24h representan la cantidad de agua de lluvia que cayó en tu finca. 1mm de lluvia equivale a 1 litro de agua por metro cuadrado de suelo.',
        action: 'Tomar en cuenta esta precipitación en la planificación del riego de los próximos días.',
      },
    },
  },

  soporte_tecnico: {
    sensor_offline: {
      template: 'El sistema indica que la estación de monitoreo de tu finca no está enviando datos. Esto puede deberse a problemas de conectividad, batería agotada o falla de hardware.',
      action: 'Verificar la conexión eléctrica y señal de red en la estación. Contactar al equipo técnico de AgroNova al +506 2200-0000 si el problema persiste más de 2 horas.',
    },
    battery_low: {
      template: 'La batería de la estación climática STA-003 está al {battery}%. Con este nivel, la estación puede dejar de funcionar en las próximas 12-24 horas dependiendo de las condiciones de luz solar para la recarga.',
      action: 'Programar una visita técnica en los próximos 1-2 días para revisar el sistema de carga. Contactar al soporte técnico de AgroNova.',
    },
    data_gap: {
      template: 'Se detectó una brecha en los datos de tu estación. Puede haber ocurrido un reinicio del sistema o pérdida temporal de conexión.',
      action: 'Si los datos han retomado normalidad, no es necesaria acción inmediata. Si persiste, contactar al equipo técnico.',
    },
    generic: {
      template: 'Hemos recibido tu consulta sobre el funcionamiento del sistema. El equipo técnico de AgroNova puede ayudarte a resolver cualquier problema con la estación o la plataforma.',
      action: 'Contactar al soporte técnico de AgroNova: soporte@agronova.cr o al +506 2200-0000, disponible de lunes a viernes de 7:00 AM a 5:00 PM.',
    },
  },

  fallback: {
    template: 'No pude identificar con certeza el tema de tu consulta. Para brindarte la mejor orientación, necesito información más específica sobre lo que necesitas.',
    action: 'Puedes reformular tu pregunta o contactar directamente al equipo técnico de AgroNova. También puedes usar los botones de consulta rápida para temas comunes.',
  },
}
