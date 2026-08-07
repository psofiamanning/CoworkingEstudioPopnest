import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { officeDayRentals } from '../data/officeDayRentals'
import type { OfficeDayRental } from '../data/officeDayRentals'
import { hourlyRoomAmenities } from '../data/rooms'

const heroImg = '/images/espacios/sala-mural-sillas-blancas.png'
/** Oficina privada (sala Dakota) que se renta por día y medio día. */
const officeImg = '/images/espacios/sala-dakota.png'

/** Anclas para los botones de navegación interna de la página. */
const dayRatesId = 'oficina-por-dia'
const monthlyPlansId = 'planes-mensuales'

/** Antetítulo en versalitas: hilo visual entre secciones. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-primary">
      {children}
    </p>
  )
}

/** Fila de tarifa: título y horario a la izquierda, precio a la derecha. */
function RateRow({ rental }: { rental: OfficeDayRental }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-neutral/70 py-5 first:border-t-0 first:pt-0">
      <div className="min-w-0">
        <h3 className="font-heading text-lg font-semibold leading-tight text-[#1f2937]">
          {rental.title}
        </h3>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-[#6b7280]">
          {rental.scheduleLabel}
        </p>
        <p className="mt-2 font-body text-sm leading-relaxed text-body">{rental.description}</p>
      </div>
      <p className="shrink-0 font-heading text-2xl font-bold leading-none text-primary">
        {rental.priceLine.replace(' MXN', '')}
        <span className="ml-1.5 align-middle font-body text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
          MXN
        </span>
      </p>
    </div>
  )
}

export function OficinasLargoPlazo() {
  const waHref = buildWhatsAppUrl(
    site.whatsappPhoneDigits,
    'Hola, me interesa rentar una oficina a largo plazo o con contrato anual en Estudio Popnest.',
  )
  const waDiaHref = buildWhatsAppUrl(
    site.whatsappPhoneDigits,
    'Hola, me interesa reservar la oficina privada por día o por medio día en Estudio Popnest.',
  )
  const reservationUrl = officeDayRentals.find((r) => r.reservationUrl)?.reservationUrl

  return (
    <main className="bg-[#fbfaf9] pb-0">
      <section className="relative flex min-h-[min(38vh,340px)] items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          width={1920}
          height={800}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/70"
          aria-hidden
        />
        <div className="relative z-10 max-w-3xl px-6 py-10 text-center text-white">
          <p className="font-body text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-white/70">
            Estudio Popnest · Coyoacán
          </p>
          <h1 className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.15] tracking-tight md:text-4xl">
            Oficinas privadas
          </h1>
          <p className="mt-3 font-body text-sm leading-relaxed text-white/90 md:text-base">
            Por un día, por medio día o por todo el año.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`#${monthlyPlansId}`}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 font-body text-sm font-semibold tracking-wide text-[#1f2937] shadow-sm transition-colors hover:bg-quaternary"
            >
              Planes mensuales
            </a>
            <a
              href={`#${dayRatesId}`}
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-7 py-3 font-body text-sm font-semibold tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Oficina por día
            </a>
          </div>
        </div>
      </section>

      {/* Oficina por día / medio día */}
      <section id={dayRatesId} className="scroll-mt-24 border-b border-neutral/50 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
              <span
                className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-2xl border border-primary/25 lg:block"
                aria-hidden
              />
              <img
                src={officeImg}
                alt="Oficina privada en Estudio Popnest: mesa azul para hasta 10 personas, pantalla y ventanal al patio."
                width={576}
                height={1024}
                sizes="(max-width: 1024px) 28rem, 34rem"
                loading="lazy"
                decoding="async"
                className="relative aspect-[3/4] w-full rounded-2xl object-cover shadow-[0_24px_60px_-30px_rgba(31,41,55,0.55)] ring-1 ring-black/[0.06] lg:aspect-[4/5]"
              />
            </figure>

            <div>
              <Eyebrow>Renta por día</Eyebrow>
              <h2 className="mt-4 font-heading text-[1.75rem] font-bold leading-[1.2] tracking-tight text-[#1f2937] md:text-[2.125rem]">
                Oficina por día y por medio día
              </h2>
              <p className="mt-5 font-body leading-relaxed text-body">
                Sin contrato ni compromiso mensual: reserva la oficina privada el día que la
                necesites. Es un espacio cerrado con mesa para hasta 10 personas, pantalla y ventanal
                al patio, ideal para concentrarte o tener juntas privadas.
              </p>

              <div className="mt-10">
                {officeDayRentals.map((rental) => (
                  <RateRow key={rental.id} rental={rental} />
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={reservationUrl ?? waDiaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-secondary"
                >
                  {reservationUrl ? 'Reservar oficina' : 'Reservar por WhatsApp'}
                </a>
                <a
                  href={waDiaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-neutral px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-[#1f2937] transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Preguntar por WhatsApp
                </a>
              </div>

              {reservationUrl && (
                <p className="mt-6 border-l-2 border-primary/30 pl-4 font-body text-sm leading-relaxed text-[#6b7280]">
                  En el sitio de reservas, el menú junto al calendario viene en{' '}
                  <span className="font-semibold text-[#1f2937]">«Por hora»</span>: cámbialo a{' '}
                  {officeDayRentals.map((r, i) => (
                    <span key={r.id}>
                      {i > 0 && ' o '}
                      <span className="font-semibold text-[#1f2937]">«{r.archieRateLabel}»</span>
                    </span>
                  ))}{' '}
                  para ver estas tarifas.
                </p>
              )}

              <p className="mt-6 font-body text-sm text-[#6b7280]">
                ¿La necesitas todos los días?{' '}
                <a
                  href={`#${monthlyPlansId}`}
                  className="font-semibold text-primary hover:underline"
                >
                  Ver planes mensuales →
                </a>
              </p>
            </div>
          </div>

          {/* Amenidades */}
          <div className="mt-16 border-t border-neutral/60 pt-10 lg:mt-20">
            <Eyebrow>Incluido en ambas tarifas</Eyebrow>
            <p className="mt-3 font-body text-sm text-[#6b7280]">
              Las mismas amenidades que la renta de sala de juntas por hora.
            </p>
            <ul className="mt-6 grid gap-x-10 gap-y-3 font-body text-sm leading-relaxed text-body sm:grid-cols-2 lg:grid-cols-3">
              {hourlyRoomAmenities.map((amenity) => (
                <li key={amenity} className="flex gap-3 border-b border-neutral/40 pb-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Puente hacia planes mensuales */}
      <section className="border-b border-neutral/50 bg-surface-dark">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-8 text-center sm:flex-row sm:text-left lg:px-12">
          <p className="font-body text-sm leading-relaxed text-white/85 sm:text-base">
            <span className="font-heading font-semibold text-white">
              ¿Buscas una oficina fija?
            </span>{' '}
            Tenemos planes mensuales y contratos anuales.
          </p>
          <a
            href={`#${monthlyPlansId}`}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-3 font-body text-sm font-semibold tracking-wide text-[#1f2937] transition-colors hover:bg-quaternary"
          >
            Planes mensuales
          </a>
        </div>
      </section>

      {/* Largo plazo */}
      <section id={monthlyPlansId} className="mx-auto max-w-3xl scroll-mt-24 px-6 py-14 lg:px-12 lg:py-16">
        <Eyebrow>Planes mensuales · Largo plazo</Eyebrow>
        <h2 className="mt-4 font-heading text-[1.75rem] font-bold leading-[1.2] tracking-tight text-[#1f2937] md:text-[2.125rem]">
          Oficinas con contrato
        </h2>
        <p className="mt-5 font-body text-lg leading-relaxed text-body">
          Para quien necesita un mismo espacio durante meses o todo el año, con las comodidades de
          Estudio Popnest en la colonia Del Carmen.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral/70 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-base font-semibold text-[#1f2937]">Contrato anual</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-body">
              Tarifa mensual acordada con compromiso de 12 meses; ideal para presupuestos previsibles
              y equipos en crecimiento.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral/70 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-base font-semibold text-[#1f2937]">
              Largo plazo (no anual)
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-body">
              Acuerdos de varios meses según disponibilidad de espacios; lo afinamos contigo en visita
              o por correo.
            </p>
          </div>
        </div>

        <h3 className="mt-14 font-heading text-lg font-bold text-[#1f2937]">Qué suele incluirse</h3>
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
        <p className="mt-6 border-l-2 border-neutral pl-4 font-body text-sm leading-relaxed text-[#6b7280]">
          Las oficinas disponibles para renta largo plazo dependen de ocupación actual. Algunos
          espacios pueden figurar como &quot;no disponibles&quot; en la web porque están asignados a
          contratos vigentes.
        </p>

        <h3 className="mt-14 font-heading text-lg font-bold text-[#1f2937]">Cómo seguir</h3>
        <p className="mt-4 font-body leading-relaxed text-body">
          No publicamos precios fijos aquí porque dependen del m², ubicación dentro del edificio y
          duración del contrato. La forma más rápida es llenar el formulario: nos dejas tus datos y
          lo que necesitas, y te contactamos con una propuesta.
        </p>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm sm:p-8">
          <Eyebrow>Solicitud de oficina</Eyebrow>
          <p className="mt-3 font-heading text-lg font-semibold leading-snug text-[#1f2937]">
            Cuéntanos qué oficina necesitas
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-body">
            Un formulario corto con tus datos, tamaño de equipo y fechas. Nos permite revisar
            disponibilidad antes de escribirte y responder con una cotización orientativa.
          </p>
          <a
            href={site.officeLongTermFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-secondary"
          >
            Llenar formulario de oficinas
          </a>
        </div>

        <p className="mt-8 font-body text-sm text-[#6b7280]">
          ¿Prefieres escribirnos directo?
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-neutral px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-[#1f2937] transition-colors hover:border-primary/40 hover:text-primary"
          >
            WhatsApp — Oficinas largo plazo
          </a>
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center rounded-full border border-neutral px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-[#1f2937] transition-colors hover:border-primary/40 hover:text-primary"
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
      </section>
    </main>
  )
}
