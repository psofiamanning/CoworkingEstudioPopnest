import { useState } from 'react'
import { Link } from 'react-router-dom'
import { espaciosGallery } from '../data/espaciosGallery'

/** Hero: `public/images/home/`. Galería: `espaciosGallery`. */
const img = {
  hero: '/images/home/hero-sala.png',
  mural: '/images/home/mural-circulos-3x3.png',
  reunion: '/images/home/reunion-sala-azul.png',
}

export function Home() {
  const [salaForm, setSalaForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    empresa: '',
    dia: '',
    hora: '',
    personas: '',
    info: '',
  })
  const [miembroForm, setMiembroForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    dia: '',
    hora: '',
    info: '',
  })

  return (
    <>
      <section className="relative flex min-h-[min(90vh,820px)] items-center justify-center overflow-hidden">
        <img
          src={img.hero}
          alt="Sala de reuniones Estudio Popnest"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div className="relative z-10 max-w-3xl px-6 py-20 text-center text-white">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Estudio Popnest
          </h1>
          <p className="mt-3 font-heading text-xl font-medium md:text-2xl">
            Privacidad. Diseño. Creatividad.
          </p>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-white/95 md:text-lg">
            Coworking en Coyoacán, a pasos del Museo Frida Kahlo: salas de reuniones,
            áreas comunes y cafetería para trabajar solo o con tu equipo.
          </p>
          <Link
            to="/planes"
            className="mt-10 inline-flex rounded-md bg-white px-8 py-3 font-body font-semibold text-[#1f2937] transition-colors hover:bg-quaternary"
          >
            Reservar
          </Link>
        </div>
      </section>

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
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start lg:px-12">
          <div>
            <h2 className="font-heading text-[30px] font-bold leading-[1.4] text-primary">
              Membresías y Pases
            </h2>
            <ul className="mt-8 space-y-6 font-body text-body">
              {[
                'Acceso ilimitado mensual',
                'Paquete de 10 días al mes',
                'Paquete de 6 días al mes',
                'Pase diario individual',
              ].map((item) => (
                <li
                  key={item}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral pb-4"
                >
                  <span>{item}</span>
                  <Link
                    to="/planes"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Ver más
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src={img.mural}
              alt="Mural con pájaros y círculos azules en Estudio Popnest"
              className="h-full w-full object-cover"
              width={800}
              height={600}
            />
          </div>
        </div>
      </section>

      <section id="reservar-sala" className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Reservar una Sala de Reuniones
          </h2>
          <form
            className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            {(
              [
                ['nombre', 'Nombre'],
                ['apellido', 'Apellido'],
                ['email', 'Email'],
                ['empresa', 'Empresa'],
                ['dia', 'Día'],
                ['hora', 'Hora'],
                ['personas', 'Número de Personas'],
              ] as const
            ).map(([key, ph]) => (
              <input
                key={key}
                type={key === 'email' ? 'email' : 'text'}
                placeholder={ph}
                value={salaForm[key]}
                onChange={(e) =>
                  setSalaForm((s) => ({ ...s, [key]: e.target.value }))
                }
                className="rounded-md border border-white/40 bg-white/15 px-4 py-3 font-body text-white placeholder:text-white/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            ))}
            <textarea
              placeholder="Información adicional"
              rows={3}
              value={salaForm.info}
              onChange={(e) =>
                setSalaForm((s) => ({ ...s, info: e.target.value }))
              }
              className="rounded-md border border-white/40 bg-white/15 px-4 py-3 font-body text-white placeholder:text-white/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white md:col-span-2"
            />
            <div className="md:col-span-2 flex justify-center pt-2">
              <button
                type="submit"
                className="rounded-md bg-white px-10 py-3 font-body font-semibold text-primary transition-colors hover:bg-quaternary"
              >
                Enviar
              </button>
            </div>
          </form>
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
                className="inline-flex justify-center rounded-md border-2 border-primary bg-white px-6 py-3 font-body font-semibold text-primary transition-colors hover:bg-quaternary/30"
              >
                Ir a Sala de Reuniones
              </Link>
              <a
                href="#reservar-sala"
                className="inline-flex justify-center rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
              >
                Reservar Sala de Reuniones
              </a>
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

      <section className="border-b border-white/[0.07] bg-surface-dark pb-20 pt-16 text-white md:pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Hazte Miembro
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center font-body text-white/85">
            Agenda una visita para conocer el espacio y encontrar el plan ideal.
          </p>
          <form
            className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            {(
              [
                ['nombre', 'Nombre'],
                ['telefono', 'Teléfono'],
                ['email', 'Email'],
                ['dia', 'Día'],
                ['hora', 'Hora'],
              ] as const
            ).map(([key, ph]) => (
              <input
                key={key}
                type={key === 'email' ? 'email' : 'text'}
                placeholder={ph}
                value={miembroForm[key as keyof typeof miembroForm]}
                onChange={(e) =>
                  setMiembroForm((s) => ({
                    ...s,
                    [key]: e.target.value,
                  }))
                }
                className="rounded-md border border-white/25 bg-white/10 px-4 py-3 font-body text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            ))}
            <textarea
              placeholder="Información adicional"
              rows={3}
              value={miembroForm.info}
              onChange={(e) =>
                setMiembroForm((s) => ({ ...s, info: e.target.value }))
              }
              className="rounded-md border border-white/25 bg-white/10 px-4 py-3 font-body text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-1 focus:ring-white md:col-span-2"
            />
            <div className="md:col-span-2 flex justify-center pt-2">
              <button
                type="submit"
                className="rounded-md bg-white px-10 py-3 font-body font-semibold text-surface-dark transition-colors hover:bg-quaternary"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
