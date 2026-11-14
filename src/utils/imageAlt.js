/**
 * Accessible, SEO-friendly alt text for the event photo archive.
 *
 * Most photos in the gallery share the same display title ("UPLAYERSONE //
 * EVENTS"), so the title alone is useless as an image description. Every
 * photo does carry a unique tag, location and a written description, and
 * those three together describe what is actually in the frame — which is
 * what both screen readers and image search need.
 */
export function galleryAlt(photo) {
  if (!photo) return 'Ultimate Players gaming truck at a real event in Los Angeles'

  const rawTag = (photo.tag || 'Event').trim()
  const tag = rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase()
  const location = photo.location ? ` in ${photo.location}` : ''
  const description = (photo.description || '').trim()

  const text = description
    ? `${tag}${location} — ${description}`
    : `${tag} gaming truck event${location}`

  return text.length > 170 ? `${text.slice(0, 167).trimEnd()}…` : text
}

/**
 * Alt text for a fleet unit.
 */
export function truckAlt(vehicle) {
  if (!vehicle) return 'Ultimate Players gaming truck'
  const name = (vehicle.title || '').trim()
  const displays = vehicle.displays || ''
  const detail = vehicle.detail ? ` (${vehicle.detail})` : ''
  return `${name} gaming truck with ${displays}${detail} in Los Angeles`.replace(
    /\s+/g,
    ' '
  )
}

export default galleryAlt
