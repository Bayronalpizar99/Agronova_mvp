export function formatTime(isoString) {
  const d = new Date(isoString)
  return d.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(isoString) {
  const d = new Date(isoString)
  return d.toLocaleDateString('es-CR', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatDateTime(isoString) {
  return `${formatDate(isoString)}, ${formatTime(isoString)}`
}

export function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'hace un momento'
  if (mins < 60) return `hace ${mins} min`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `hace ${hrs}h`
  const days = Math.floor(hrs / 24)
  return `hace ${days}d`
}

export function nowISO() {
  return new Date().toISOString()
}
