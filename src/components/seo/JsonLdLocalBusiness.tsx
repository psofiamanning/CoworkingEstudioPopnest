import { useMemo } from 'react'
import { business, getSiteOrigin } from '../../config/seo'
import { site } from '../../config/site'

/**
 * Datos estructurados LocalBusiness + horario (Google Rich Results / búsqueda local).
 */
export function JsonLdLocalBusiness() {
  const json = useMemo(() => {
    const origin = getSiteOrigin()
    const sameAs: string[] = [origin]
    if (site.googleMapsUrl.startsWith('http')) sameAs.push(site.googleMapsUrl)
    if (site.instagramUrl.startsWith('http')) sameAs.push(site.instagramUrl)

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': `${origin}/#business`,
          name: business.name,
          description: business.description,
          url: origin,
          image: `${origin}${business.defaultOgImagePath}`,
          telephone: business.telephoneInternational,
          email: business.email,
          priceRange: '$$',
          areaServed: {
            '@type': 'City',
            name: 'Ciudad de México',
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: business.streetAddress,
            addressLocality: business.addressLocality,
            addressRegion: business.addressRegion,
            postalCode: business.postalCode,
            addressCountry: business.addressCountry,
          },
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
          sameAs,
        },
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: business.name,
          publisher: { '@id': `${origin}/#business` },
          inLanguage: 'es-MX',
        },
      ],
    }
  }, [])

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  )
}
