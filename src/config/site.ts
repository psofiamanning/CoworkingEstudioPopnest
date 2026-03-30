/** Número en formato internacional sin + (ej. México: 525554379644). Configurable por entorno. */
function whatsappDigitsFromEnv(): string {
  const raw = import.meta.env.VITE_WHATSAPP_PHONE ?? '525554379644'
  return raw.replace(/\D/g, '')
}

export const site = {
  whatsappPhoneDigits: whatsappDigitsFromEnv(),
  /** Plataforma Wellness externa (menú). */
  wellnessUrl: import.meta.env.VITE_WELLNESS_URL ?? 'https://popnest.app/',
  instagramUrl:
    import.meta.env.VITE_INSTAGRAM_URL ?? 'https://www.instagram.com/estudio_popnest/',
  businessEmail: 'info@estudiopopnest.com',
  /** Enlace fijo al lugar en Google Maps (Google Business). */
  googleMapsUrl:
    import.meta.env.VITE_GOOGLE_MAPS_URL ?? 'https://maps.app.goo.gl/BMQ64Z1c8m89xt7H9',
} as const
