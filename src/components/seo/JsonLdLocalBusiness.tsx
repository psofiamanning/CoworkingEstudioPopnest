import { useMemo } from 'react'
import { business, getSiteOrigin } from '../../config/seo'
import { site } from '../../config/site'

/**
 * Datos estructurados CoworkingSpace + LocalBusiness (Schema.org) para Google Rich Results
 * y coherencia con ficha de negocio: dirección, teléfono, horario, URL, mapa.
 *
 * Validar en: https://search.google.com/test/rich-results (pegar URL publicada o fragmento HTML).
 */
export function JsonLdLocalBusiness() {
  const json = useMemo(() => {
    const origin = getSiteOrigin()
    const sameAs: string[] = []
    if (site.googleMapsUrl.startsWith('http')) sameAs.push(site.googleMapsUrl)
    if (site.instagramUrl.startsWith('http')) sameAs.push(site.instagramUrl)

    const imageUrl = `${origin}${business.defaultOgImagePath}`
    const logoUrl = `${origin}/favicon.svg`

    const postalAddress = {
      '@type': 'PostalAddress' as const,
      streetAddress: `${business.streetAddress}, Col. Del Carmen`,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      postalCode: business.postalCode,
      addressCountry: business.addressCountry,
    }

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['CoworkingSpace', 'LocalBusiness'],
          '@id': `${origin}/#business`,
          name: business.name,
          legalName: business.legalName,
          description: business.description,
          url: origin,
          mainEntityOfPage: { '@id': `${origin}/#website` },
          image: [imageUrl],
          logo: {
            '@type': 'ImageObject',
            url: logoUrl,
            caption: business.name,
          },
          telephone: business.telephoneInternational,
          email: business.email,
          hasMap: site.googleMapsUrl,
          priceRange: '$$',
          areaServed: {
            '@type': 'City',
            name: 'Ciudad de México',
          },
          address: postalAddress,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: business.geo.latitude,
            longitude: business.geo.longitude,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '19:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '09:00',
              closes: '17:00',
            },
          ],
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: business.telephoneInternational,
              contactType: 'customer service',
              email: business.email,
              availableLanguage: ['es-MX'],
            },
          ],
          sameAs: sameAs.length > 0 ? sameAs : undefined,
        },
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: business.name,
          inLanguage: 'es-MX',
          publisher: { '@id': `${origin}/#business` },
        },
      ],
    }
  }, [])

  const serialized = JSON.stringify(json)
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />
  )
}
