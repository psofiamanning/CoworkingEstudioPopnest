import { Link } from 'react-router-dom'
import { JsonLd } from '../components/seo/JsonLd'
import { business, getSiteOrigin } from '../config/seo'
import { site } from '../config/site'
import { buildBreadcrumb } from '../lib/schema'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const ADDRESS = 'Londres 105, Col. Del Carmen, Coyoacán, CDMX'

const sessions = [
  { day: 'Miércoles', time: '6:30 a.m.', isoDay: 'Wednesday', isoTime: '06:30' },
  { day: 'Sábado', time: '7:30 a.m.', isoDay: 'Saturday', isoTime: '07:30' },
]

const steps = [
  {
    title: 'Llega al estudio',
    text: `Nos vemos en Estudio Popnest, ${ADDRESS}. Llega 5 minutos antes para calentar.`,
  },
  {
    title: 'Corremos juntos',
    text: 'Salimos en grupo por las calles de Coyoacán a un ritmo en el que se puede platicar.',
  },
  {
    title: 'Estiramos al final',
    text: 'Regresamos al estudio para estirar y cerrar la sesión en comunidad.',
  },
]

const bring = [
  'Tenis para correr y ropa cómoda',
  'Botella de agua',
  'Gorra o lentes si hay sol',
  'Ganas de conocer gente del barrio',
]

const faqs = [
  {
    q: '¿El Run Club de Coyoacán tiene costo?',
    a: 'No. El Run Club de Estudio Popnest es gratuito y abierto a todas las personas.',
  },
  {
    q: '¿Necesito reservar o registrarme?',
    a: 'No hace falta reservar. Solo llega al estudio a la hora de salida: miércoles 6:30 a.m. o sábado 7:30 a.m.',
  },
  {
    q: '¿Dónde es el punto de encuentro?',
    a: `En Estudio Popnest, ${ADDRESS}, a unos pasos del Museo Frida Kahlo.`,
  },
  {
    q: '¿Necesito experiencia corriendo?',
    a: 'No. Corremos a un ritmo cómodo para platicar y el grupo se espera. Es para todos los niveles, desde quien empieza hasta quien ya corre seguido.',
  },
]

export function RunClub() {
  const origin = getSiteOrigin()
  const waHref = buildWhatsAppUrl(
    site.whatsappPhoneDigits,
    'Hola, quiero información del Run Club de Estudio Popnest.',
  )

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: 'Run Club Coyoacán — Estudio Popnest',
    description:
      'Run club gratuito en Coyoacán. Salidas en grupo desde Estudio Popnest, todos los niveles, sin reservación.',
    sport: 'Running',
    isAccessibleForFree: true,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventSchedule: sessions.map((s) => ({
      '@type': 'Schedule',
      repeatFrequency: 'P1W',
      byDay: `https://schema.org/${s.isoDay}`,
      startTime: s.isoTime,
      scheduleTimezone: 'America/Mexico_City',
    })),
    location: {
      '@type': 'Place',
      name: business.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Londres 105, Del Carmen',
        addressLocality: 'Coyoacán',
        addressRegion: 'CDMX',
        addressCountry: 'MX',
      },
    },
    organizer: { '@id': `${origin}/#business` },
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
    },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main className="bg-[#fbfbfc]">
      <JsonLd
        data={buildBreadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Eventos', path: '/eventos' },
          { name: 'Run Club', path: '/run-club' },
        ])}
      />
      <JsonLd data={eventSchema} />
      <JsonLd data={faqSchema} />

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-12 lg:px-12">
        <nav aria-label="Migas de pan" className="font-body text-sm text-[#6b7280]">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link to="/eventos" className="hover:text-primary">Eventos</Link>
          <span className="mx-2" aria-hidden>/</span>
          <span aria-current="page">Run Club</span>
        </nav>
        <p className="mt-8 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Run Club · Coyoacán · Gratis
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-[#111827] md:text-5xl">
          Run Club en Coyoacán: corre con nosotros, gratis
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-body md:text-lg">
          Salimos a correr en grupo desde Estudio Popnest, en la colonia Del Carmen. Sin costo, sin
          reservación y para todos los niveles: solo llega con tus tenis.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={site.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
          >
            Cómo llegar
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

      <section className="mx-auto max-w-5xl px-6 pb-12 lg:px-12" aria-labelledby="rc-horario">
        <h2 id="rc-horario" className="font-heading text-2xl font-bold text-primary">
          Horario de salidas
        </h2>
        <dl className="mt-4 divide-y divide-neutral rounded-xl border border-neutral bg-white font-body">
          {sessions.map((s) => (
            <div key={s.day} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <dt className="font-heading text-xl font-bold text-[#111827]">{s.day}</dt>
              <dd className="text-xl font-bold tabular-nums text-primary">{s.time}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-body text-sm text-body">
          Punto de encuentro: Estudio Popnest · {ADDRESS}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12 lg:px-12">
        <h2 className="font-heading text-2xl font-bold text-primary">Sin registro, sin presión</h2>
        <p className="mt-3 max-w-2xl font-body text-body">
          Corremos a un ritmo en el que se puede platicar y el grupo se espera. Si estás empezando,
          aquí tienes lugar.
        </p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-neutral bg-white p-5">
              <span className="font-heading text-3xl font-bold text-primary">{i + 1}</span>
              <p className="mt-2 font-heading text-lg font-semibold text-[#111827]">{step.title}</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-body">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12 lg:px-12">
        <h2 className="font-heading text-2xl font-bold text-primary">Qué llevar</h2>
        <ul className="mt-4 list-disc space-y-1 pl-5 font-body text-body">
          {bring.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-12">
        <h2 className="font-heading text-2xl font-bold text-primary">Preguntas frecuentes</h2>
        <dl className="mt-4 space-y-5 font-body">
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-semibold text-[#111827]">{q}</dt>
              <dd className="mt-1 leading-relaxed text-body">{a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 font-body text-sm text-body">
          ¿Prefieres otra actividad? Mira nuestras <Link to="/classes" className="text-primary underline">clases</Link> o
          los demás <Link to="/eventos" className="text-primary underline">eventos y espacios</Link>.
        </p>
      </section>
    </main>
  )
}
