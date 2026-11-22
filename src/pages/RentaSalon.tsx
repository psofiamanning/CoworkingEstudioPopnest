import { Link } from 'react-router-dom'
import { JsonLd } from '../components/seo/JsonLd'
import { business, getSiteOrigin } from '../config/seo'
import { site } from '../config/site'
import {
  salonExtras,
  salonMaxCapacity,
  salonMinHours,
  salonPriceTiers,
  salonSlotOrder,
  salonSlots,
  salonUseCases,
} from '../data/salon'
import { buildBreadcrumb } from '../lib/schema'
import { buildWhatsAppUrl } from '../lib/whatsapp'

/** Flujo de reserva y pago en línea del salón (sigue en popnest.app). */
const BOOKING_URL = 'https://popnest.app/renta-salon'

const money = (n: number) => `$${n.toLocaleString('es-MX')}`

const allPrices = salonPriceTiers.flatMap((t) => Object.values(t.prices))
const minPrice = Math.min(...allPrices)
const maxPrice = Math.max(...allPrices)

const photos = [
  { src: '/images/espacios/salon-wellness-espejos.jpg', alt: 'Salón Coyote con muros de espejo e iluminación cálida' },
  { src: '/images/espacios/coyote-yoga-espejos.jpg', alt: 'Clase de yoga frente a los espejos del Salón Coyote' },
  { src: '/images/espacios/coyote-movimiento.jpg', alt: 'Práctica en tapetes bajo la luz circular del Salón Coyote' },
]

export function RentaSalon() {
  const origin = getSiteOrigin()
  const waHref = buildWhatsAppUrl(
    site.whatsappPhoneDigits,
    'Hola, me interesa rentar el Salón Coyote. ¿Me pueden compartir disponibilidad de fechas y horarios?',
  )

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Renta de salón en Coyoacán',
    serviceType: 'Renta de salón para eventos, clases privadas y sesiones de fotos',
    description: `Salón Coyote en Coyoacán para clases privadas, talleres, sesiones de fotos y video, ensayos y celebraciones. Precio por hora según número de personas, hasta ${salonMaxCapacity} personas.`,
    url: `${origin}/renta-salon`,
    areaServed: { '@type': 'City', name: 'Ciudad de México' },
    provider: { '@id': `${origin}/#business` },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'MXN',
      lowPrice: minPrice,
      highPrice: maxPrice,
      offerCount: salonPriceTiers.length,
      url: `${origin}/renta-salon#precios`,
    },
  }

  return (
    <main className="bg-[#fbfbfc]">
      <JsonLd
        data={buildBreadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Eventos', path: '/eventos' },
          { name: 'Renta de salón', path: '/renta-salon' },
        ])}
      />
      <JsonLd data={serviceSchema} />

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-12 lg:px-12">
        <nav aria-label="Migas de pan" className="font-body text-sm text-[#6b7280]">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link to="/eventos" className="hover:text-primary">Eventos</Link>
          <span className="mx-2" aria-hidden>/</span>
          <span aria-current="page">Renta de salón</span>
        </nav>
        <h1 className="mt-8 font-heading text-3xl font-bold text-[#111827] md:text-5xl">
          Renta de salón en Coyoacán
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-body md:text-lg">
          El Salón Coyote es un salón amplio y luminoso, con espejos, ventanales y sonido, para clases
          privadas, talleres, sesiones de fotos y video, ensayos y celebraciones. Está en Londres 105,
          colonia Del Carmen, a pasos del Museo Frida Kahlo. Hasta {salonMaxCapacity} personas, desde{' '}
          {money(minPrice)} MXN por hora, mínimo {salonMinHours} hora.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={BOOKING_URL}
            className="inline-flex rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
          >
            Reservar en línea
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-primary px-6 py-3 font-body font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12 lg:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          {photos.map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-56 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      </section>

      <section id="precios" className="mx-auto max-w-5xl px-6 pb-12 lg:px-12">
        <h2 className="font-heading text-2xl font-bold text-primary">
          Precios por hora según personas y horario
        </h2>
        <p className="mt-3 max-w-3xl font-body text-body">
          Precio por hora en pesos mexicanos. Elige el horario y el número de personas; el total se
          calcula al reservar.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral bg-white">
          <table className="w-full min-w-[640px] text-left font-body text-sm">
            <caption className="sr-only">Precio por hora de renta del Salón Coyote</caption>
            <thead className="border-b border-neutral bg-[#fafafa]">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-[#111827]">Personas</th>
                {salonSlotOrder.map((k) => (
                  <th key={k} scope="col" className="px-4 py-3 font-semibold text-[#111827]">
                    {salonSlots[k].label}
                    <span className="block text-xs font-normal text-[#6b7280]">
                      {salonSlots[k].days}, {salonSlots[k].hours}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              {salonPriceTiers.map((tier) => (
                <tr key={tier.people}>
                  <th scope="row" className="px-4 py-3 font-semibold text-[#111827]">{tier.people}</th>
                  {salonSlotOrder.map((k) => (
                    <td key={k} className="px-4 py-3 tabular-nums text-body">
                      {money(tier.prices[k])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mt-8 font-heading text-lg font-semibold text-[#111827]">Extras</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 font-body text-body">
          {salonExtras.map((e) => (
            <li key={e.label}>
              {e.label}: +{money(e.amount)} MXN
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl font-body text-sm text-[#6b7280]">
          Para grupos de más de {salonMaxCapacity} personas, o para pedir un horario que desplace una
          clase del estudio, cotizamos a la medida por WhatsApp.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-12">
        <h2 className="font-heading text-2xl font-bold text-primary">Para qué se renta</h2>
        <ul className="mt-4 flex flex-wrap gap-3 font-body">
          {salonUseCases.map((u) => (
            <li
              key={u}
              className="rounded-full border border-neutral bg-white px-4 py-2 text-sm text-[#111827]"
            >
              {u}
            </li>
          ))}
        </ul>
        <p className="mt-8 font-body text-sm text-body">
          {business.name} · Londres 105, Del Carmen, Coyoacán. <Link to="/contacto" className="text-primary underline">Cómo llegar</Link>{' '}
          · <Link to="/eventos" className="text-primary underline">Más eventos y espacios</Link>
        </p>
      </section>
    </main>
  )
}
