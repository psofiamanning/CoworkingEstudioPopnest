const WA_ME = 'https://wa.me/'

/** Deja solo dígitos (incluye código de país). */
export function normalizeWhatsAppPhone(input: string): string {
  return input.replace(/\D/g, '')
}

/**
 * URL de WhatsApp Web / app con mensaje opcional prellenado.
 * @param phoneDigits Solo dígitos, con código de país (sin +).
 * @param message Texto del mensaje; se codifica con URLSearchParams.
 */
export function buildWhatsAppUrl(phoneDigits: string, message: string): string {
  const phone = normalizeWhatsAppPhone(phoneDigits)
  const text = message.trim()
  const qs = new URLSearchParams()
  if (text.length > 0) qs.set('text', text)
  const query = qs.toString()
  return `${WA_ME}${phone}${query ? `?${query}` : ''}`
}

/** Une líneas ignorando valores vacíos opcionalmente. */
export function joinMessageLines(
  lines: Array<string | undefined | null>,
): string {
  return lines
    .filter((line): line is string => Boolean(line?.trim()))
    .map((line) => line.trim())
    .join('\n')
}
