const rentaSalonUrl = 'https://popnest.app/renta-salon'

/** Fotos del Salón Coyote; `position` ajusta el recorte para que no se corte lo importante. */
const photos = [
  { src: '/images/espacios/salon-wellness-espejos.jpg', alt: 'Salón Coyote con espejos e iluminación cálida', position: 'center' },
  { src: '/images/espacios/coyote-grupo-pared.jpg', alt: 'Salón Coyote: pared de madera con iluminación cálida', position: 'center 70%' },
  { src: '/images/espacios/coyote-yoga-espejos.jpg', alt: 'Salón Coyote: clase de yoga frente a los espejos', position: 'center 65%' },
  { src: '/images/espacios/coyote-movimiento.jpg', alt: 'Salón Coyote: práctica en tapetes bajo la luz circular', position: 'center 60%' },
  { src: '/images/espacios/coyote-muro-circulos.jpg', alt: 'Salón Coyote: muro de círculos en la entrada', position: 'center 80%' },
]

const buttonClass =
  'inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 font-body font-semibold text-white shadow-sm transition-colors hover:bg-secondary'

// Dos fotos por vista: en celular una arriba de otra, en desktop lado a lado.
const photoClass =
  'h-[calc((100svh-140px)/2)] w-full rounded-xl object-cover shadow-sm md:h-[min(calc(100svh-160px),640px)]'

export function Eventos() {
  return (
    <main className="flex flex-col items-center bg-[#fbfbfc] px-4 py-8 md:py-12">
      <h1 className="font-heading text-3xl font-bold text-[#1f2937] md:text-4xl">Salón Coyote</h1>
      <a href={rentaSalonUrl} className={`${buttonClass} mt-5`}>
        Renta el salón
      </a>

      <div className="mt-8 grid w-full max-w-[1280px] gap-3 md:grid-cols-2 md:gap-6">
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
              className={photoClass}
              style={{ objectPosition: photo.position }}
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          </a>
        ))}
      </div>

      <a href={rentaSalonUrl} className={`${buttonClass} mt-10`}>
        Renta el salón
      </a>
    </main>
  )
}
