import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { business, getSeoForPath, getSiteOrigin } from '../../config/seo'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLinkRel(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Actualiza título, descripción, canonical y Open Graph / Twitter en cada navegación (SPA).
 */
export function SeoHead() {
  const { pathname } = useLocation()
  const origin = getSiteOrigin()
  const seo = getSeoForPath(pathname)
  const canonical = pathname === '/' ? origin : `${origin}${pathname}`
  const ogImage = `${origin}${business.defaultOgImagePath}`

  useEffect(() => {
    document.title = seo.title

    setMeta('name', 'description', seo.description)
    setMeta('name', 'robots', seo.noIndex ? 'noindex, follow' : 'index, follow')
    setMeta('name', 'geo.region', 'MX-CMX')
    setMeta('name', 'geo.placename', 'Coyoacán, Ciudad de México')

    setLinkRel('canonical', canonical)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', business.name)
    setMeta('property', 'og:locale', 'es_MX')
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:image:alt', `${business.name} — coworking en Coyoacán`)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', ogImage)
  }, [canonical, ogImage, pathname, seo.description, seo.noIndex, seo.title])

  return null
}
