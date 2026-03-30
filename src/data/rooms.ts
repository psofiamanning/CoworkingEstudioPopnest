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
    reservationUrl: 'https://example.com/reservar/bohemios',
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
    reservationUrl: 'https://example.com/reservar/dakota',
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
    id: 'colibri',
    name: 'Colibrí',
    priceLabel: 'Desde $400 MXN por hora',
    capacityLabel: '8 asientos',
    image: '/images/espacios/sala-azul-mural-tv.png',
    status: 'construction',
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
