import { business, getSiteOrigin } from '../config/seo'
import type { ClassId } from '../data/clases'
import { landingClassName, landingSeoDescription } from '../data/clases'
import { SINGLE_CLASS_PRICE_MXN, classPath, getFaqs, getInstructors, slugForClass } from './clases'

export type Crumb = { name: string; path: string }

export function buildBreadcrumb(crumbs: Crumb[]) {
  const origin = getSiteOrigin()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.path === '/' ? origin : `${origin}${c.path}`,
    })),
  }
}

export function buildFaqSchema(classId: ClassId) {
  const faqs = getFaqs(classId)
  if (faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function buildCourseSchema(classId: ClassId) {
  const origin = getSiteOrigin()
  const slug = slugForClass(classId)
  const url = `${origin}${classPath(slug)}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${landingClassName[classId]} en Coyoacán`,
    description: landingSeoDescription[classId],
    url,
    provider: { '@id': `${origin}/#business` },
    offers: {
      '@type': 'Offer',
      price: String(SINGLE_CLASS_PRICE_MXN),
      priceCurrency: 'MXN',
      url,
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      duration: 'PT60M',
      instructor: getInstructors(classId).map((name) => ({
        '@type': 'Person',
        name,
        jobTitle: 'Coach',
      })),
      location: {
        '@type': 'Place',
        name: business.name,
        address: 'Londres 105, Del Carmen, Coyoacán, CDMX',
      },
    },
  }
}
