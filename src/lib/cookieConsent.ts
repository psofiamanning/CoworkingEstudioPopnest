/** Versión del esquema guardado; subir si cambian categorías o significado legal. */
export const COOKIE_CONSENT_VERSION = 1 as const

export const COOKIE_CONSENT_STORAGE_KEY = 'estudio-popnest-cookie-consent'

export type CookiePreferences = {
  /** Siempre true: cookies técnicas / necesarias para el sitio. */
  necessary: true
  /** Medición de audiencia (p. ej. Google Analytics) cuando exista integración. */
  analytics: boolean
}

type StoredPayload = {
  v: typeof COOKIE_CONSENT_VERSION
  analytics: boolean
}

export function getStoredCookieConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredPayload
    if (parsed.v !== COOKIE_CONSENT_VERSION) return null
    return { necessary: true, analytics: Boolean(parsed.analytics) }
  } catch {
    return null
  }
}

export function saveCookieConsent(preferences: CookiePreferences): void {
  const payload: StoredPayload = {
    v: COOKIE_CONSENT_VERSION,
    analytics: preferences.analytics,
  }
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload))
}

/** Para futura carga de scripts de analítica: leer preferencias sin React. */
export function hasAnalyticsConsent(): boolean {
  return getStoredCookieConsent()?.analytics === true
}
