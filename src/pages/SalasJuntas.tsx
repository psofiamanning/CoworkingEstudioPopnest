import { rooms } from '../data/rooms'
import type { Room, RoomStatus } from '../data/rooms'
import { cateringPackages } from '../data/catering'

const heroImg = '/images/espacios/sala-mural-sillas-blancas.png'
const bottomImg = '/images/espacios/cafeteria-cocina.png'

function statusLabel(status: RoomStatus): { text: string; className: string; href?: string } {
  switch (status) {
    case 'bookable':
      return {
        text: 'Reservar',
        className:
          'inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-primary/20 transition-colors hover:bg-secondary/95 focus:outline-none focus:ring-2 focus:ring-primary/30',
      }
    case 'construction':
      return {
        text: 'En construcción',
        className:
          'inline-flex items-center justify-center rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200',
      }
    case 'unavailable_office':
      return {
        text: 'No disponible — Rentada 24/7',
        className:
          'inline-flex items-center justify-center rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 ring-1 ring-red-200',
      }
  }
}

function RoomCard({ room }: { room: Room }) {
  const st = statusLabel(room.status)

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral/70 bg-white shadow-sm transition-shadow hover:shadow-xl">
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden ${
          room.imageFit === 'contain' ? 'bg-neutral/50' : ''
        }`}
      >
        <img
          src={room.image}
          alt=""
          width={room.imageWidth ?? 800}
          height={room.imageHeight ?? 600}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 560px"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-center ${
            room.imageFit === 'contain' ? 'object-contain' : 'object-cover'
          } transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60"
          aria-hidden
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-heading text-lg font-bold leading-tight text-[#1f2937]">
              {room.name}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                {room.priceLabel}
              </span>
              <span className="rounded-full bg-neutral/90 px-3 py-1 text-xs font-semibold text-[#374151] ring-1 ring-neutral/70">
                {room.capacityLabel}
              </span>
            </div>
          </div>

          <div className="shrink-0 pt-1">
          {room.status === 'bookable' && room.reservationUrl ? (
            <a
              href={room.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={st.className}
            >
              {st.text}
            </a>
          ) : (
            <span className={st.className}>{st.text}</span>
          )}
        </div>
      </div>
      </div>
    </article>
  )
}

function ComingSoonCard() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral bg-[#fafafa] p-10 text-center">
      <div
        className="mb-4 flex h-24 w-24 items-center justify-center rounded-md bg-neutral/50 text-[#9ca3af]"
        aria-hidden
      >
        <svg className="h-14 w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M8 9h8M8 13h5"
          />
        </svg>
      </div>
      <p className="max-w-sm font-body text-sm leading-relaxed text-[#6b7280]">
        ¡Pronto más salas y oficinas! Escríbenos si estás buscando oficinas.
      </p>
    </div>
  )
}

function CateringCard({
  pkg,
}: {
  pkg: (typeof cateringPackages)[number]
}) {
  const bg =
    pkg.variant === 'light'
      ? 'bg-white border border-neutral'
      : pkg.variant === 'rose'
        ? 'bg-[#fce7e7] border border-[#f5c4c4]'
        : 'bg-primary text-white border border-primary'

  const textMuted = pkg.variant === 'dark' ? 'text-white/85' : 'text-[#6b7280]'

  return (
    <div className={`flex flex-col rounded-xl p-6 ${bg}`}>
      <h3 className="font-heading text-lg font-semibold">{pkg.title}</h3>
      <p className="mt-4 font-heading text-4xl font-bold">
        ${pkg.price}{' '}
        <span className="text-lg font-normal">{pkg.currency}</span>
      </p>
      <ul className={`mt-6 flex-1 space-y-2 font-body text-sm ${textMuted}`}>
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span
              className={pkg.variant === 'dark' ? 'text-white' : 'text-primary'}
              aria-hidden
            >
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={pkg.purchaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 inline-flex justify-center rounded-md px-4 py-2 text-center font-body text-sm font-semibold transition-colors ${
          pkg.variant === 'dark'
            ? 'bg-white text-primary hover:bg-quaternary'
            : 'bg-primary text-white hover:bg-secondary'
        }`}
      >
        Solicitar
      </a>
    </div>
  )
}

export function SalasJuntas() {
  return (
    <main className="bg-[#fbfbfc] pb-0">
      <section className="relative flex min-h-[min(55vh,480px)] items-center justify-center overflow-hidden">
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
            Reserva una Sala de Reuniones
          </h1>
          <p className="mt-4 font-body text-base leading-relaxed text-white/95 md:text-lg">
            Salas equipadas para juntas por hora. Elige la sala según capacidad y disponibilidad.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        {import.meta.env.DEV && (
          <p className="mb-6 rounded-md border border-dashed border-primary/30 bg-primary/5 px-3 py-2 font-body text-xs text-body">
            <span className="font-semibold text-primary">Modo desarrollo:</span> si esta lista no
            coincide con las tarjetas de abajo, haz recarga forzada (Cmd+Shift+R) o ejecuta{' '}
            <code className="rounded bg-neutral/50 px-1">npm run dev:clean</code>.
            <span className="mt-1 block text-[#6b7280]">
              Datos cargados: {rooms.map((r) => r.name).join(' · ')}
            </span>
          </p>
        )}
        <div className="grid gap-10 md:grid-cols-2">
          {rooms.map((r: Room) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <ComingSoonCard />
          <ComingSoonCard />
        </div>
      </div>

      <section className="border-t border-neutral bg-[#fafafa] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="font-heading text-[30px] font-bold leading-[1.4] text-primary">
            Plan de alimentos para reuniones
          </h2>
          <p className="mt-4 max-w-2xl font-body text-body">
            Coordinamos coffee breaks y comidas para tus juntas. Elige un paquete y completa el
            pedido en el enlace.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {cateringPackages.map((pkg) => (
              <CateringCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral/60 bg-[#fafafa] px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-neutral/40 bg-white shadow-sm ring-1 ring-black/[0.03]">
          <img
            src={bottomImg}
            alt="Cafetería y área de café en Estudio Popnest"
            className="h-52 w-full object-cover object-center md:h-64 lg:h-72"
            width={1024}
            height={768}
            sizes="(max-width: 1024px) 100vw, 1024px"
            decoding="async"
          />
        </div>
      </section>
    </main>
  )
}
