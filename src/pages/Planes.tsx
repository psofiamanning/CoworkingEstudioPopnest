import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { JsonLd } from '../components/seo/JsonLd'
import { getSiteOrigin } from '../config/seo'
import { buildBreadcrumb } from '../lib/schema'
import { plans } from '../data/plans'
import type { PlanItem } from '../data/plans'

function PlanShortNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border border-neutral/80 bg-[#f8f9fb] px-4 py-3.5 text-sm leading-relaxed text-[#4b5563]">
      {children}
    </div>
  )
}

function PlanDescriptionBody({ plan }: { plan: PlanItem }) {
  if (plan.detail) {
    const d = plan.detail
    return (
      <div className="mt-8 space-y-6">
        <p className="font-heading text-xl font-semibold leading-snug text-[#111827] md:text-2xl">
          {d.tagline}
        </p>
        <div className="space-y-4 text-[0.9375rem] leading-relaxed text-[#374151]">
          {d.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
          <h4 className="font-heading text-base font-semibold tracking-tight text-primary">
            {d.includesHeading ?? 'Incluye'}
          </h4>
          <ul className="mt-4 space-y-3 font-body text-[0.9375rem] leading-relaxed text-[#374151]">
            {d.includes.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (!plan.description) return null

  return (
    <p className="mt-4 whitespace-pre-line leading-relaxed">{plan.description}</p>
  )
}

function ComprarLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 rounded-full bg-secondary px-5 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-primary"
    >
      Comprar
    </a>
  )
}

function PlanMedia({ plan }: { plan: PlanItem }) {
  if (plan.videoSrc) {
    return (
      <div className="mb-4 overflow-hidden rounded-md bg-black">
        <video
          className="aspect-[4/3] w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={plan.poster}
          aria-label={`Video: ${plan.title}`}
        >
          <source src={plan.videoSrc} type="video/mp4" />
          Tu navegador no reproduce video embebido; descarga el archivo o prueba otro navegador.
        </video>
      </div>
    )
  }

  if (plan.image) {
    return (
      <div className="mb-4 overflow-hidden rounded-md">
        <img
          src={plan.image}
          alt=""
          className="aspect-[4/3] w-full object-cover"
          width={800}
          height={600}
        />
      </div>
    )
  }

  return null
}

function PlanBlockWithMedia({ plan }: { plan: PlanItem }) {
  return (
    <article className="font-body text-body">
      <PlanMedia plan={plan} />
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg font-semibold text-[#1f2937]">{plan.title}</h3>
          <p className="mt-1 text-sm text-[#6b7280]">{plan.priceLine}</p>
        </div>
        <ComprarLink href={plan.purchaseUrl} />
      </div>
      {plan.shortNote ? <PlanShortNote>{plan.shortNote}</PlanShortNote> : null}
      <PlanDescriptionBody plan={plan} />
      {plan.schedule ? (
        <p className="mt-4 font-semibold text-[#1f2937]">{plan.schedule}</p>
      ) : null}
    </article>
  )
}

const FAQS = [
  {
    q: '¿Cuánto cuesta el pase por día del coworking?',
    a: 'El Day Pass cuesta $300 MXN por persona y da acceso completo al coworking por un día.',
  },
  {
    q: '¿Qué incluye el pase por día?',
    a: 'Escritorio flexible en zona compartida, Wi‑Fi de alta velocidad, impresora y pantalla para presentaciones (sujetas a disponibilidad), café, té y agua, y acceso a cocina, refrigerador y áreas comunes. El espacio es pet-friendly.',
  },
  {
    q: '¿Cuál es el horario del coworking?',
    a: 'De lunes a viernes de 9:00 a 19:00 h, y sábado y domingo de 9:00 a 17:00 h.',
  },
  {
    q: '¿Dónde está el coworking?',
    a: 'En Londres 105, colonia Del Carmen, Coyoacán, CDMX, a unos pasos del Museo Frida Kahlo.',
  },
  {
    q: '¿Cómo compro el pase y cómo entro?',
    a: 'Compras el pase en línea desde esta página y, al llegar, muestras en recepción la confirmación de tu pago.',
  },
  {
    q: '¿Puedo traer mi propio equipo?',
    a: 'Sí. Puedes traer tu laptop, monitor, teclado u otros accesorios.',
  },
  {
    q: '¿Y si necesito una oficina o un espacio para mi equipo?',
    a: 'Mira las opciones de oficinas y contratos en la sección de Oficinas, o escríbenos a info@estudiopopnest.com.',
  },
] as const

export function Planes() {
  const paseDia = plans.find((p) => p.id === 'pase-dia')
  if (!paseDia) return null
  const origin = getSiteOrigin()

  return (
    <main className="bg-[#fbfbfc] pb-20">
      <JsonLd
        data={buildBreadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Coworking', path: '/planes' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Pase por día de coworking en Coyoacán',
          description:
            'Day Pass: acceso por un día al coworking de Estudio Popnest en Del Carmen, Coyoacán, con escritorio flexible, Wi‑Fi, café, té y agua.',
          brand: { '@id': `${origin}/#business` },
          offers: {
            '@type': 'Offer',
            price: '300',
            priceCurrency: 'MXN',
            availability: 'https://schema.org/InStock',
            url: `${origin}/planes`,
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }}
      />
      <div className="mx-auto max-w-3xl px-6 pt-12 lg:px-12">
        <h1 className="font-heading text-[30px] font-bold leading-[1.4] text-[#1f2937] md:text-4xl">
          Coworking en Coyoacán: pase por día
        </h1>
        <p className="mt-4 font-body text-body">
          Trabaja un día en Estudio Popnest, en la colonia Del Carmen, a pasos del Museo Frida
          Kahlo, con Wi‑Fi, café y un espacio cómodo para tu laptop. Sin contrato.
        </p>

        <div className="mt-12">
          <PlanBlockWithMedia plan={paseDia} />
        </div>

        <section className="mt-16" aria-labelledby="planes-faq">
          <h2 id="planes-faq" className="font-heading text-2xl font-bold text-[#1f2937]">
            Preguntas frecuentes sobre el coworking
          </h2>
          <div className="mt-6 divide-y divide-neutral/70 rounded-xl border border-neutral/70 bg-white">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group px-5 py-4">
                <summary className="cursor-pointer font-heading text-base font-semibold text-[#1f2937]">
                  {q}
                </summary>
                <p className="mt-2 font-body text-body">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 font-body text-sm text-[#6b7280]">
            ¿Buscas una oficina?{' '}
            <Link to="/oficinas-largo-plazo" className="font-semibold text-primary hover:underline">
              Ver oficinas
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
