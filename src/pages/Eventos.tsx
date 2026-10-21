const heroImg = '/images/espacios/salon-wellness-espejos.jpg'
const rentaSalonUrl = 'https://popnest.app/renta-salon'

const widePhoto = {
  src: '/images/espacios/coyote-grupo-pared.jpg',
  alt: 'Salón Coyote: pared de madera con iluminación cálida',
  width: 1600,
  height: 1234,
}

const portraitPhotos = [
  { src: '/images/espacios/coyote-yoga-espejos.jpg', alt: 'Salón Coyote: clase de yoga frente a los espejos', width: 1208, height: 1600 },
  { src: '/images/espacios/coyote-movimiento.jpg', alt: 'Salón Coyote: práctica en tapetes bajo la luz circular', width: 1066, height: 1600 },
  { src: '/images/espacios/coyote-muro-circulos.jpg', alt: 'Salón Coyote: muro de círculos en la entrada', width: 1103, height: 1600 },
]

const buttonClass =
  'inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 font-body font-semibold text-white shadow-sm transition-colors hover:bg-secondary'

export function Eventos() {
  return (
    <main className="flex flex-col items-center bg-[#fbfbfc] px-4 py-10 md:py-16">
      <h1 className="font-heading text-3xl font-bold text-[#1f2937] md:text-4xl">Salón Coyote</h1>
      <a href={rentaSalonUrl} className={`${buttonClass} mt-6`}>
        Renta el salón
      </a>

      <div className="mt-10 w-full max-w-[1280px] space-y-4 md:space-y-6">
        <a href={rentaSalonUrl} className="block">
          <img
            src={heroImg}
            alt="Salón Coyote con espejos e iluminación cálida"
            className="h-auto w-full rounded-xl shadow-sm"
            width={1280}
            height={963}
          />
        </a>
        <img
          src={widePhoto.src}
          alt={widePhoto.alt}
          className="h-auto w-full rounded-xl shadow-sm"
          width={widePhoto.width}
          height={widePhoto.height}
          loading="lazy"
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {portraitPhotos.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className="aspect-[3/4] h-auto w-full rounded-xl object-cover shadow-sm"
              width={photo.width}
              height={photo.height}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <a href={rentaSalonUrl} className={`${buttonClass} mt-10`}>
        Renta el salón
      </a>
    </main>
  )
}
