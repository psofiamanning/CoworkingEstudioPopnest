/**
 * Fitune: plataforma externa donde se reserva, se compran paquetes y viven las cuentas de clientes.
 * El sitio solo enlaza a ella: no hay lógica de reservas ni pagos aquí.
 */
export const FITUNE_BASE_URL =
  import.meta.env.VITE_FITUNE_URL ?? 'https://my.fitune.io/popnest-wellness'

export const fituneUrls = {
  /** Horario y reserva de clases. */
  schedule: `${FITUNE_BASE_URL}/activities`,
  /** Paquetes y precios. */
  pricing: `${FITUNE_BASE_URL}/pricing`,
  /** Cuenta del cliente. */
  account: `${FITUNE_BASE_URL}/user/dashboard`,
} as const

/** Agrega parámetros UTM para poder medir de qué página salen las reservas. */
export function withUtm(url: string, campaign: string): string {
  const u = new URL(url)
  u.searchParams.set('utm_source', 'estudiopopnest.com')
  u.searchParams.set('utm_medium', 'sitio_web')
  u.searchParams.set('utm_campaign', campaign)
  return u.toString()
}
