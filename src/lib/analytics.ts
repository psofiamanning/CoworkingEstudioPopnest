import { hasAnalyticsConsent } from './cookieConsent'

/** ID de medición de Google Analytics 4. Se puede sobrescribir con VITE_GA4_ID. */
export const GA4_ID = import.meta.env.VITE_GA4_ID ?? 'G-GWGFTJ2KYH'

type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let started = false

/** Carga GA4 solo si la persona aceptó la medición de audiencia. Idempotente. */
export function startAnalytics(): void {
  if (started || typeof window === 'undefined' || !GA4_ID) return
  if (!hasAnalyticsConsent()) return
  started = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID, { anonymize_ip: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`
  document.head.appendChild(script)

  document.addEventListener('click', onDocumentClick, true)
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (!started || !window.gtag) return
  window.gtag('event', name, params)
}

/** Convierte un enlace en un evento de conversión (o null si no es relevante). */
export function eventForLink(href: string): { name: string; params: GtagParams } | null {
  let url: URL
  try {
    url = new URL(href, window.location.origin)
  } catch {
    return null
  }
  const base: GtagParams = { link_url: url.href, page_path: window.location.pathname }

  if (url.hostname === 'my.fitune.io') {
    const kind = url.pathname.includes('pricing') ? 'paquetes' : 'clases'
    return {
      name: 'fitune_click',
      params: { ...base, fitune_section: kind, campaign: url.searchParams.get('utm_campaign') ?? '' },
    }
  }
  if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') {
    return { name: 'whatsapp_click', params: base }
  }
  if (url.hostname === 'archieapp.co') return { name: 'daypass_purchase_click', params: base }
  if (url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms')) {
    return { name: 'form_click', params: base }
  }
  if (url.protocol === 'mailto:') return { name: 'email_click', params: base }
  if (url.protocol === 'tel:') return { name: 'phone_click', params: base }
  return null
}

function onDocumentClick(e: MouseEvent): void {
  const target = e.target as Element | null
  const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!anchor) return
  const ev = eventForLink(anchor.href)
  if (ev) trackEvent(ev.name, ev.params)
}
