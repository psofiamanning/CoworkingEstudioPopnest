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
  /** Formulario de Google para solicitudes de oficina a largo plazo (capta datos del prospecto). */
  officeLongTermFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfe5wdvJqY3Sqh1lV1-TriZBypGvd_LfXBR_dxhZ3au-vXWPw/viewform?usp=header',
  /** Enlace fijo al lugar en Google Maps (Google Business). */
  googleMapsUrl:
    import.meta.env.VITE_GOOGLE_MAPS_URL ?? 'https://maps.app.goo.gl/BMQ64Z1c8m89xt7H9',
} as const
