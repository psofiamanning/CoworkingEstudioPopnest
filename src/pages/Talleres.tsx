import { Link } from 'react-router-dom'
import { JsonLd } from '../components/seo/JsonLd'
import { fituneUrls, withUtm } from '../config/fitune'
import { FituneNotice } from '../components/FituneNotice'
import { site } from '../config/site'
import { buildBreadcrumb } from '../lib/schema'
import { buildWhatsAppUrl } from '../lib/whatsapp'

export function Talleres() {
  const waHref = buildWhatsAppUrl(
    site.whatsappPhoneDigits,
    'Hola Estudio Popnest, quiero información sobre los próximos talleres.',
  )

  return (
    <main className="bg-cream">
      <JsonLd
        data={buildBreadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Eventos', path: '/eventos' },
          { name: 'Talleres', path: '/talleres' },
        ])}
      />

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-12 lg:px-12">
        <nav aria-label="Migas de pan" className="font-body text-sm text-[#6b7280]">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link to="/eventos" className="hover:text-primary">Eventos</Link>
          <span className="mx-2" aria-hidden>/</span>
          <span aria-current="page">Talleres</span>
        </nav>
        <h1 className="mt-8 font-heading text-3xl font-bold text-ink md:text-5xl">
          Talleres y experiencias de bienestar en Coyoacán
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-body md:text-lg">
          Además de las clases semanales, en Estudio Popnest organizamos talleres y experiencias
          especiales con cupo limitado: sesiones de movimiento, sonido, meditación y otros temas
          de bienestar, en Londres 105, colonia Del Carmen.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={withUtm(fituneUrls.events, 'talleres')}
            rel="noopener"
            className="inline-flex rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
          >
            Ver próximos talleres
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
        <FituneNotice campaign="talleres-aviso" className="mt-4">
          La reservación y el pago de los talleres se hacen en Fitune.
        </FituneNotice>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-12">
        <h2 className="font-heading text-2xl font-bold text-primary">Cómo reservar un taller</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 font-body text-body">
          <li>Abre la lista de próximos talleres en Fitune y elige el que te interese.</li>
          <li>Revisa fecha, horario, precio y cupo disponible.</li>
          <li>Reserva y paga en línea para asegurar tu lugar.</li>
        </ol>
        <p className="mt-6 max-w-3xl font-body text-body">
          ¿Quieres proponer un taller o impartirlo en el estudio? Escríbenos por WhatsApp. También
          puedes <Link to="/renta-salon" className="text-primary underline">rentar el Salón Coyote</Link> para tu propio taller.
        </p>
        <p className="mt-6 font-body text-sm text-body">
          Mira también las <Link to="/classes" className="text-primary underline">clases semanales</Link>{' '}
          y el <Link to="/run-club" className="text-primary underline">Run Club gratuito</Link>.
        </p>
      </section>
    </main>
  )
}
