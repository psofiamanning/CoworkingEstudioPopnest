/**
 * Salas en /salas-de-juntas. Nombres y precios según listado oficial.
 */
export type RoomStatus = 'bookable' | 'construction' | 'unavailable_office'

export type Room = {
  id: string
  name: string
  priceLabel: string
  capacityLabel: string
  image: string
  /**
   * `contain` muestra la foto completa sin forzar escala por encima del archivo (evita pixelado en fotos pequeñas o verticales).
   * Default `cover` (recorte uniforme con el resto de salas).
   */
  imageFit?: 'cover' | 'contain'
  /** Dimensiones reales del archivo (ancho × alto) para el atributo `width`/`height` del `<img>`. */
  imageWidth?: number
  imageHeight?: number
  status: RoomStatus
  /** Solo si status === 'bookable' */
  reservationUrl?: string
}

export const rooms: Room[] = [
  {
    id: 'bohemios',
    name: 'Bohemios',
    priceLabel: 'Desde $400 MXN por hora',
    capacityLabel: '8 asientos',
    image: '/images/home/reunion-sala-azul.png',
    status: 'bookable',
    reservationUrl:
      'https://archieapp.co/estudio-popnest-1/public/book-a-room/f0c4e0dd-f679-5056-8e85-bffe060fb2e9?filters=U2FsdGVkX1%252FqQMt2sv5GZ7DE2McSNzK9KgNBoUnDYqE%253D',
  },
  {
    id: 'dakota',
    name: 'Dakota',
    priceLabel: 'Desde $400 MXN por hora',
    capacityLabel: 'Hasta 10 personas',
    image: '/images/espacios/sala-dakota.png',
    imageFit: 'contain',
    imageWidth: 576,
    imageHeight: 1024,
    status: 'bookable',
    reservationUrl:
      'https://archieapp.co/estudio-popnest-1/public/book-a-room/3a737e8d-7214-5df9-8981-7462941fbd1a?filters=U2FsdGVkX1%252BTum1tgnkau8CUKJda2ppZ3AkK9HqUi8Y%253D',
  },
  {
    id: 'carmelo',
    name: 'Carmelo',
    priceLabel: 'Desde $300 MXN por hora',
    capacityLabel: '4 asientos',
    image: '/images/espacios/sala-azul-mural-tv.png',
    status: 'bookable',
    // TODO: reemplazar por enlace real de reserva (Archie) para Carmelo.
    reservationUrl: 'https://example.com/reservar/carmelo',
  },
  {
    id: 'coyote',
    name: 'Coyote',
    priceLabel: 'Desde $400 MXN por hora',
    capacityLabel: 'Hasta 50 personas',
    image: '/images/espacios/sala-coyote.png',
    status: 'bookable',
    reservationUrl: 'https://example.com/reservar/coyote',
  },
  {
    id: 'sacramento',
    name: 'Sacramento',
    priceLabel: 'Desde $300 MXN por hora',
    capacityLabel: '4 asientos',
    image: '/images/espacios/sala-terracota-oval.png',
    status: 'unavailable_office',
  },
  {
    id: 'oaxaca',
    name: 'Oaxaca',
    priceLabel: 'Desde $300 MXN por hora',
    capacityLabel: '4 asientos',
    image: '/images/home/reunion-sala-azul.png',
    status: 'unavailable_office',
  },
  {
    id: 'oso-polar',
    name: 'Oso Polar',
    priceLabel: 'Desde $300 MXN por hora',
    capacityLabel: '4 asientos',
    image: '/images/espacios/sala-oso-polar.png',
    status: 'unavailable_office',
  },
]
