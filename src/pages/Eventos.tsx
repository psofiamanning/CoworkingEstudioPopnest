import { site } from '../config/site'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const rentaSalonUrl = 'https://popnest.app/renta-salon'
const heroImg = '/images/espacios/salon-wellness-espejos.jpg'

const disponibilidadWhatsAppUrl = buildWhatsAppUrl(
  site.whatsappPhoneDigits,
  'Hola, me interesa rentar el Salón Coyote. ¿Me pueden compartir disponibilidad de fechas y horarios?',
)

/**
 * Galería del Salón Coyote. `crop` ajusta alto (en celular) y recorte para que no se corten
 * las personas; las fotos verticales con gente completa van cuadradas en celular para que el
 * recorte no dependa del ancho.
 */
const photos: { src: string; alt: string; crop: string }[] = [
  { src: '/images/espacios/coyote-grupo-pared.jpg', alt: 'Salón Coyote: pared de madera con iluminación cálida', crop: 'h-64 object-[center_70%]' },
  { src: '/images/espacios/coyote-yoga-espejos.jpg', alt: 'Salón Coyote: clase de yoga frente a los espejos', crop: 'h-64 object-[center_65%]' },
  { src: '/images/espacios/coyote-movimiento.jpg', alt: 'Salón Coyote: práctica en tapetes bajo la luz circular', crop: 'aspect-square object-[center_68%] md:aspect-auto md:object-[center_60%]' },
  { src: '/images/espacios/coyote-muro-circulos.jpg', alt: 'Salón Coyote: muro de círculos en la entrada', crop: 'aspect-square object-[center_85%] md:aspect-auto md:object-[center_80%]' },
]

// Datos tomados de popnest.app/renta-salon (config/salonPricing.js del proyecto Wellness).
const chips = ['Hasta 20 personas', 'Desde $150 MXN por hora', 'Renta mínima de 1 hora', 'Reserva en línea']

const incluye = [
  'Muros de espejo e iluminación cálida',
  'Paneles acústicos de madera y sistema de sonido',
  'Ventanales con vista al jardín',
  'Proyector disponible (+$300 MXN)',
  'Montaje y desmontaje de mesas y sillas (+$300 MXN)',
]

/** Antetítulo en versalitas: hilo visual entre secciones. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-primary">
      {children}
    </p>
  )
}

const pillPrimary =
  'inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-secondary'
const pillWhite =
  'inline-flex items-center justify-center rounded-full bg-white px-7 py-3 font-body text-sm font-semibold tracking-wide text-[#1f2937] shadow-sm transition-colors hover:bg-quaternary'
const pillWhiteOutline =
  'inline-flex items-center justify-center rounded-full border border-white/60 px-7 py-3 font-body text-sm font-semibold tracking-wide text-white transition-colors hover:border-white hover:bg-white/10'

export function Eventos() {
  return (
    <main className="bg-[#fbfaf9] pb-0">
      <section className="relative flex min-h-[min(55vh,480px)] items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={1280}
          height={963}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/65"
          aria-hidden
        />
        <div className="relative z-10 max-w-3xl px-6 py-12 text-center text-white">
          <p className="font-body text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-white/70">
            Estudio Popnest · Wellness
          </p>
          <h1 className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.15] tracking-tight md:text-4xl">
            Salón Coyote
          </h1>
          <p className="mt-3 font-body text-base leading-relaxed text-white/95 md:text-lg">
            Un salón amplio y luminoso para yoga, pilates, danza, clases privadas, talleres y
            celebraciones.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={rentaSalonUrl} className={pillWhite}>
              Reservar salón
            </a>
            <a
              href={disponibilidadWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={pillWhiteOutline}
            >
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>El salón</Eyebrow>
          <h2 className="mt-4 font-heading text-[1.75rem] font-bold leading-[1.2] tracking-tight text-[#1f2937] md:text-[2.125rem]">
            Un espacio para moverte, enseñar y reunirte
          </h2>
          <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-body">
            En Londres 105, Del Carmen, Coyoacán, a pasos del Museo Frida Kahlo. Elige tu horario y
            reserva en línea.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-primary/10 px-3 py-1 font-body text-xs font-semibold text-primary"
              >
                {chip}
              </li>
            ))}
          </ul>
          <p className="mt-3 font-body text-xs text-[#6b7280]">
            Capacidad recomendada de 20 personas; para grupos mayores, cotizamos a la medida.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          {photos.map((photo) => (
            <a
              key={photo.src}
              href={rentaSalonUrl}
              className="group block overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className={`w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] md:h-[380px] ${photo.crop}`}
                loading="lazy"
              />
            </a>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-5 md:p-8">
          <h3 className="font-heading text-base font-semibold tracking-tight text-primary">Incluye</h3>
          <ul className="mt-4 grid gap-x-10 gap-y-3 font-body text-[0.9375rem] leading-relaxed text-body sm:grid-cols-2">
            {incluye.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-primary/20 pt-4 font-body text-sm text-[#6b7280]">
            El precio depende del número de personas y del horario. Las horas rentadas incluyen tu
            montaje y recogida.
          </p>
        </div>

        <div className="mt-10 text-center">
          <a href={rentaSalonUrl} className={pillPrimary}>
            Ver precios y reservar
          </a>
        </div>
      </section>

      <section className="bg-surface-dark">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-6 py-8 text-center sm:flex-row sm:text-left lg:px-12">
          <p className="font-body text-sm leading-relaxed text-white/85 sm:text-base">
            <span className="font-heading font-semibold text-white">¿Tu fecha está disponible?</span>{' '}
            Escríbenos por WhatsApp y te compartimos disponibilidad de fechas y horarios.
          </p>
          <a
            href={disponibilidadWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${pillWhite} shrink-0`}
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}
