import type { Room, RoomStatus } from '../data/rooms'

export function statusLabel(status: RoomStatus): { text: string; className: string; href?: string } {
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

export function RoomCard({ room }: { room: Room }) {
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
