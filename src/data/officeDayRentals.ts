/**
 * Oficinas en renta por día y por medio día (mañana o tarde).
 * Se muestran en /oficinas-largo-plazo, junto a los contratos de largo plazo.
 * Las amenidades son las mismas que la renta de sala de juntas por hora
 * (`hourlyRoomAmenities` en `rooms.ts`).
 */
export type OfficeDayRental = {
  id: string
  title: string
  priceLine: string
  scheduleLabel: string
  description: string
  /**
   * Tarifa a elegir en el desplegable de Archie (junto al calendario), que por
   * defecto viene en «Por hora».
   */
  archieRateLabel: string
  /** Enlace de Archie. Si falta, la tarjeta cae al CTA de WhatsApp. */
  reservationUrl?: string
}

/** Misma sala («Oficina Privada», Dakota) para ambos productos; cambia la tarifa. */
const officeReservationUrl =
  'https://archieapp.co/estudio-popnest-1/public/book-a-room/88dda80e-0cdb-5f3b-9f06-1ab5e1f3c287?filters=U2FsdGVkX18ZS3r3HscOcW8YWPPLr0cuQSxU7gYQNOc%253D'

export const officeDayRentals: OfficeDayRental[] = [
  {
    id: 'oficina-dia',
    title: 'Oficina por día',
    priceLine: '$1,200 MXN por día',
    scheduleLabel: 'Día completo · 9:00 a 19:00 h',
    description:
      'Una oficina privada para ti o tu equipo durante todo el día, sin contrato ni compromiso mensual.',
    archieRateLabel: 'Diario',
    reservationUrl: officeReservationUrl,
  },
  {
    id: 'oficina-medio-dia',
    title: 'Oficina por medio día',
    priceLine: '$600 MXN por medio día',
    scheduleLabel: 'Mañana 9:00 a 12:00 h · Tarde 12:00 a 19:00 h',
    description:
      'Elige el bloque de mañana o el de tarde: ideal para sesiones de trabajo, entrevistas o juntas largas.',
    archieRateLabel: 'Media jornada',
    reservationUrl: officeReservationUrl,
  },
]
