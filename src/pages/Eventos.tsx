import { site } from '../config/site'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const rentaSalonUrl = 'https://popnest.app/renta-salon'

/**
 * Fotos del Salón Coyote. `crop` ajusta alto (en celular) y recorte para que no se corten
 * las personas; las fotos verticales con gente completa necesitan más alto en celular.
 */
const photos: { src: string; alt: string; crop: string }[] = [
  { src: '/images/espacios/salon-wellness-espejos.jpg', alt: 'Salón Coyote con espejos e iluminación cálida', crop: 'h-64 object-center' },
  { src: '/images/espacios/coyote-grupo-pared.jpg', alt: 'Salón Coyote: pared de madera con iluminación cálida', crop: 'h-64 object-[center_70%]' },
  { src: '/images/espacios/coyote-yoga-espejos.jpg', alt: 'Salón Coyote: clase de yoga frente a los espejos', crop: 'h-64 object-[center_65%]' },
  { src: '/images/espacios/coyote-movimiento.jpg', alt: 'Salón Coyote: práctica en tapetes bajo la luz circular', crop: 'h-80 object-[center_68%] md:object-[center_60%]' },
  { src: '/images/espacios/coyote-muro-circulos.jpg', alt: 'Salón Coyote: muro de círculos en la entrada', crop: 'h-80 object-[center_85%] md:object-[center_80%]' },
]

// Datos tomados de popnest.app/renta-salon (config/salonPricing.js del proyecto Wellness).
const datos: { titulo: string; valor: string; nota?: string }[] = [
  { titulo: 'Capacidad', valor: '20 personas', nota: 'Recomendada · grupos mayores bajo cotización' },
  { titulo: 'Precio desde', valor: '$150 MXN / hora' },
  { titulo: 'Renta mínima', valor: '1 hora' },
  { titulo: 'Reserva', valor: 'En línea' },
]

const disponibilidadWhatsAppUrl = buildWhatsAppUrl(
  site.whatsappPhoneDigits,
  'Hola, me interesa rentar el Salón Coyote. ¿Me pueden compartir disponibilidad de fechas y horarios?',
)

const caracteristicas = [
  'Muros de espejo e iluminación cálida',
  'Paneles acústicos de madera y sistema de sonido',
  'Ventanales con vista al jardín',
  'Proyector disponible (+$300 MXN)',
  'Montaje y desmontaje de mesas y sillas (+$300 MXN)',
]

const buttonClass =
  'inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 font-body font-semibold text-white shadow-sm transition-colors hover:bg-secondary'

// Dos fotos por vista: en celular una arriba de otra, en desktop lado a lado.
const photoClass = 'w-full rounded-xl object-cover shadow-sm md:h-[380px]'

export function Eventos() {
  return (
    <main className="flex flex-col items-center bg-[#fbfbfc] px-4 py-8 md:py-12">
      <div className="max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-bold text-[#1f2937] md:text-4xl">Salón Coyote</h1>
        <p className="mt-4 font-body text-base leading-relaxed text-body md:text-lg">
          Un salón amplio y luminoso en Del Carmen, Coyoacán, pensado para yoga, pilates, danza,
          clases privadas, talleres, sesiones de trabajo y celebraciones. Elige tu horario y
          reserva en línea.
        </p>
        <a href={rentaSalonUrl} className={`${buttonClass} mt-6`}>
          Renta el salón
        </a>
      </div>

      <dl className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral/60 bg-neutral/60 shadow-sm md:grid-cols-4">
        {datos.map((d) => (
          <div key={d.titulo} className="flex flex-col justify-center bg-white px-3 py-3 text-center">
            <dt className="font-body text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{d.titulo}</dt>
            <dd className="mt-0.5 font-heading text-sm font-bold text-[#1f2937] md:text-base">{d.valor}</dd>
            {d.nota ? <dd className="font-body text-[11px] leading-snug text-[#6b7280]">{d.nota}</dd> : null}
          </div>
        ))}
      </dl>

      <div className="mt-8 grid w-full max-w-5xl gap-3 md:grid-cols-2 md:gap-6">
        {photos.map((photo, i) => (
          <a
            key={photo.src}
            href={rentaSalonUrl}
            className={
              i === photos.length - 1 && photos.length % 2 === 1
                ? 'block md:col-span-2 md:mx-auto md:w-[calc(50%-12px)]'
                : 'block'
            }
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className={`${photoClass} ${photo.crop}`}
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          </a>
        ))}
      </div>

      <div className="mt-12 grid w-full max-w-5xl gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-neutral/60 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-[#1f2937]">El espacio</h2>
          <ul className="mt-4 space-y-2 font-body text-sm text-body">
            {caracteristicas.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-primary" aria-hidden>
                  •
                </span>
                {c}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-neutral/60 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-[#1f2937]">Disponibilidad</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-body">
            Escríbenos por WhatsApp para consultar la disponibilidad de fechas y horarios. Con gusto
            te ayudamos a encontrar el espacio ideal para tu actividad.
          </p>
          <a
            href={disponibilidadWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-md border border-primary px-6 py-2.5 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Consultar por WhatsApp
          </a>
          <p className="mt-4 font-body text-xs leading-relaxed text-[#6b7280]">
            El precio depende del número de personas y del horario. Las horas rentadas incluyen tu
            montaje y recogida.
          </p>
        </section>
      </div>

      <a href={rentaSalonUrl} className={`${buttonClass} mt-10`}>
        Ver precios y reservar
      </a>
    </main>
  )
}
