export function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const val = vars[key]
    return val !== undefined && val !== null ? String(val) : `{${key}}`
  })
}
