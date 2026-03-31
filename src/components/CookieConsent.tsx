import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import {
  type CookiePreferences,
  getStoredCookieConsent,
  saveCookieConsent,
} from '../lib/cookieConsent'

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
  const [preferences, setPreferences] = useState<CookiePreferences | null>(() =>
    getStoredCookieConsent(),
  )

  const showBanner = preferences === null

  const acceptAll = useCallback(() => {
    const next: CookiePreferences = { necessary: true, analytics: true }
    saveCookieConsent(next)
    setPreferences(next)
  }, [])

  const acceptNecessaryOnly = useCallback(() => {
    const next: CookiePreferences = { necessary: true, analytics: false }
    saveCookieConsent(next)
    setPreferences(next)
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
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-neutral/60 bg-white px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.12)] md:px-8"
      role="region"
      aria-label="Aviso de cookies"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0 font-body text-sm leading-relaxed text-[#374151]">
          <p>
            Usamos cookies necesarias para que el sitio funcione correctamente. Si en el futuro
            incorporamos medición de audiencia, solo se activará si lo autorizas. Puedes leer más en
            nuestro{' '}
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
