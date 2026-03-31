import { business } from '../config/seo'

/** URL de iframe embebido (sin API key) alineada con `business.geo` en SEO local. */
export function getGoogleMapsEmbedSrc(): string {
  const { latitude, longitude } = business.geo
  return `https://maps.google.com/maps?q=${latitude},${longitude}&z=17&hl=es&output=embed`
}
