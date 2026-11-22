import { Link } from 'react-router-dom'
import { espaciosGallery } from '../data/espaciosGallery'
import { DualHero } from '../components/home/DualHero'
import { WellnessHome } from '../components/home/WellnessHome'

/** Hero: `public/images/home/`. Galería: `espaciosGallery`. */
const img = {
  hero: '/images/home/hero-sala.png',
  reunion: '/images/home/reunion-sala-azul.png',
}

export function Home() {
  return (
    <>
      <DualHero />

      <section className="bg-primary py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 lg:flex-row lg:justify-between lg:px-12">
          <p className="max-w-3xl text-center font-body text-lg leading-relaxed md:text-xl lg:text-left">
            Somos una comunidad en Coyoacán para profesionistas y creativos en
            busca de su tercer lugar.
          </p>
          <div className="shrink-0 text-white/90" aria-hidden>
            <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={img.reunion}
              alt="Sala de reuniones con mesa y paneles circulares"
              className="h-full w-full object-cover"
              width={800}
              height={600}
            />
          </div>
          <div>
            <h2 className="font-heading text-[30px] font-bold leading-[1.4] text-primary">
              Reuniones en Popnest
            </h2>
            <p className="mt-6 font-body leading-relaxed text-body">
              Equipamiento para presentaciones y trabajo en equipo. Capacidad
              según sala, de 2 a 8 personas en nuestras salas estándar.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/salas-de-juntas"
                className="inline-flex justify-center rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
              >
                Ver salas de reuniones
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="font-heading text-[30px] font-bold leading-[1.4] text-[#1f2937]">
            Nuestro espacio
          </h2>
          <p className="mt-3 max-w-2xl font-body text-body">
            Salas de juntas, patio y áreas comunes en Coyoacán.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {espaciosGallery.map((item) => (
              <div
                key={item.src}
                className="overflow-hidden rounded-xl border border-neutral/60 bg-white shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[4/3] w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WellnessHome />
    </>
  )
}
