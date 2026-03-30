import { useMemo } from 'react'
import type { FaqItem } from '../../data/contactFaq'

/** FAQPage para rich results cuando la página incluye bloque de preguntas frecuentes. */
export function JsonLdFaqPage({ items }: { items: readonly FaqItem[] }) {
  const json = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    [items],
  )

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  )
}
