import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const heroImg = '/images/espacios/sala-mural-sillas-blancas.png'

export function OficinasLargoPlazo() {
  const waHref = buildWhatsAppUrl(
    site.whatsappPhoneDigits,
    'Hola, me interesa rentar una oficina a largo plazo o con contrato anual en Estudio Popnest.',
  )

  return (
    <main className="bg-white pb-0">
      <section className="relative flex min-h-[min(50vh,420px)] items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />
        <div className="relative z-10 max-w-3xl px-6 py-16 text-center text-white">
          <h1 className="font-heading text-3xl font-bold md:text-4xl">
            Renta de oficinas a largo plazo
          </h1>
          <p className="mt-4 font-body text-base leading-relaxed text-white/95 md:text-lg">
            Espacios dedicados en Coyoacán para equipos que buscan estabilidad: contratos anuales o
            plazos extendidos, con acceso al ecosistema del estudio.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
        <p className="font-body text-lg leading-relaxed text-body">
          Además del coworking por día y las membresías flexibles, ofrecemos{' '}
          <strong className="font-semibold text-[#1f2937]">oficinas privadas en renta</strong> para
          quien necesita un mismo espacio durante meses o todo el año, con las comodidades de Estudio
          Popnest en la colonia Del Carmen.
        </p>

        <h2 className="mt-14 font-heading text-xl font-bold text-[#1f2937] md:text-2xl">
          Modalidades
        </h2>
        <ul className="mt-6 space-y-4 font-body leading-relaxed text-body">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>
              <strong className="font-semibold text-[#1f2937]">Contrato anual:</strong> tarifa
              mensual acordada con compromiso de 12 meses; ideal para presupuestos previsibles y
              equipos en crecimiento.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>
              <strong className="font-semibold text-[#1f2937]">Largo plazo (no anual):</strong>{' '}
              acuerdos de varios meses según disponibilidad de espacios; lo afinamos contigo en
              visita o por correo.
            </span>
          </li>
        </ul>

        <h2 className="mt-14 font-heading text-xl font-bold text-[#1f2937] md:text-2xl">
          Qué suele incluirse
        </h2>
        <ul className="mt-6 space-y-3 font-body leading-relaxed text-body">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>Uso exclusivo del espacio asignado en horario acordado.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>Acceso a áreas comunes, cafetería y ambiente profesional del edificio.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>
              Wi‑Fi, servicios básicos del inmueble y coordinación con el equipo para ajustar
              mobiliario según inventario disponible.
            </span>
          </li>
        </ul>
        <p className="mt-6 rounded-lg border border-neutral/80 bg-[#fafafa] px-4 py-3 font-body text-sm leading-relaxed text-[#4b5563]">
          Las oficinas disponibles para renta largo plazo dependen de ocupación actual. Algunos
          espacios pueden figurar como &quot;no disponibles&quot; en la web porque están asignados a
          contratos vigentes.
        </p>

        <h2 className="mt-14 font-heading text-xl font-bold text-[#1f2937] md:text-2xl">
          Cómo seguir
        </h2>
        <p className="mt-4 font-body leading-relaxed text-body">
          No publicamos precios fijos aquí porque dependen del m², ubicación dentro del edificio y
          duración del contrato. Escríbenos para agendar una visita o recibir una cotización
          orientativa.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
          >
            WhatsApp — Oficinas largo plazo
          </a>
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center rounded-md border border-primary bg-white px-6 py-3 font-body font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            Ver contacto y ubicación
          </Link>
        </div>
        <p className="mt-8 font-body text-sm text-[#6b7280]">
          También puedes revisar{' '}
          <Link to="/planes" className="font-semibold text-primary hover:underline">
            planes de coworking
          </Link>{' '}
          si buscas acceso flexible sin oficina fija.
        </p>
      </div>
    </main>
  )
}
