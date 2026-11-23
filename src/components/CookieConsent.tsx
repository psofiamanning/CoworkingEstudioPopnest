import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import {
  type CookiePreferences,
  getStoredCookieConsent,
  saveCookieConsent,
} from '../lib/cookieConsent'
import { startAnalytics } from '../lib/analytics'

type CookieConsentContextValue = {
  /** `true` mientras el usuario no ha guardado una elección en este dispositivo. */
  showBanner: boolean
  preferences: CookiePreferences | null
  acceptAll: () => void
  acceptNecessaryOnly: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) {
    throw new Error('useCookieConsent debe usarse dentro de CookieConsentProvider')
  }
  return ctx
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  // `ready` es false en el servidor y en la hidratación, y true ya en el navegador:
  // así el HTML prerenderizado y la hidratación coinciden y luego se lee la elección guardada.
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const stored = useMemo(() => (ready ? getStoredCookieConsent() : null), [ready])
  const [chosen, setChosen] = useState<CookiePreferences | null>(null)
  const preferences = chosen ?? stored

  const showBanner = ready && preferences === null
  const analyticsOn = preferences?.analytics === true

  // GA4 solo se carga con consentimiento explícito ("Aceptar todas").
  useEffect(() => {
    if (analyticsOn) startAnalytics()
  }, [analyticsOn])

  const acceptAll = useCallback(() => {
    const next: CookiePreferences = { necessary: true, analytics: true }
    saveCookieConsent(next)
    setChosen(next)
  }, [])

  const acceptNecessaryOnly = useCallback(() => {
    const next: CookiePreferences = { necessary: true, analytics: false }
    saveCookieConsent(next)
    setChosen(next)
  }, [])

  const value = useMemo(
    () => ({
      showBanner,
      preferences,
      acceptAll,
      acceptNecessaryOnly,
    }),
    [showBanner, preferences, acceptAll, acceptNecessaryOnly],
  )

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {showBanner ? <CookieConsentBanner onAcceptAll={acceptAll} onNecessaryOnly={acceptNecessaryOnly} /> : null}
    </CookieConsentContext.Provider>
  )
}

function CookieConsentBanner({
  onAcceptAll,
  onNecessaryOnly,
}: {
  onAcceptAll: () => void
  onNecessaryOnly: () => void
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] rounded-t-2xl border border-neutral/70 border-b-0 bg-white/90 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] backdrop-blur supports-[backdrop-filter]:bg-white/70 md:px-8"
      role="region"
      aria-label="Aviso de cookies"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0 font-body text-sm leading-relaxed text-[#374151]">
          <p>
            Usamos cookies necesarias para que el sitio funcione correctamente. Con tu autorización
            también usamos Google Analytics para medir visitas y clics (por ejemplo, en reservar o
            en WhatsApp). Puedes leer más en nuestro{' '}
            <Link to="/privacidad" className="font-semibold text-primary underline hover:no-underline">
              aviso de privacidad
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={onNecessaryOnly}
            className="rounded-md border border-neutral/80 bg-white px-4 py-2.5 font-body text-sm font-semibold text-[#1f2937] transition-colors hover:bg-[#fafafa]"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="rounded-md bg-primary px-4 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:opacity-95"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
