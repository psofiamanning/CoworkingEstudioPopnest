/** Bloque con lista (p. ej. Day Pass): mejor jerarquía visual en la página de planes. */
export type PlanDetail = {
  /** Línea destacada bajo la nota de recepción */
  tagline: string
  paragraphs: string[]
  /** Título de la lista; por defecto «Incluye» */
  includesHeading?: string
  includes: string[]
}

/** URLs de compra/reserva: sustituye por las reales (checkout, landing, etc.). */
export type PlanItem = {
  id: string
  title: string
  priceLine: string
  /**
   * Video en la parte superior de la tarjeta (ruta bajo `public/videos/`, ej. `/videos/pase-dia.mp4`).
   * Sustituye el archivo en disco manteniendo el nombre o actualiza esta ruta.
   */
  videoSrc?: string
  /** Poster opcional (jpg/webp) para la primera imagen antes de reproducir. */
  poster?: string
  /** Si no hay `videoSrc`, se puede usar imagen estática. */
  image?: string
  shortNote: string
  /** Texto simple; si existe `detail`, el diseño usa `detail` y este puede ir vacío. */
  description: string
  detail?: PlanDetail
  schedule?: string
  purchaseUrl: string
}

export const plans: PlanItem[] = [
  {
    id: 'pase-dia',
    title: 'Pase por día · Day Pass 🎟️',
    priceLine: '$300 | Individual',
    videoSrc: '/videos/pase-dia.mp4',
    poster: '/videos/BBA5BBD1-63F8-45EF-A468-B34B4051EB59_1_105_c.jpeg',
    shortNote:
      'Compras un solo día de acceso; al llegar, muestra en recepción la confirmación de tu pago.',
    description: '',
    detail: {
      tagline: 'Un día para trabajar distinto.',
      paragraphs: [
        '¿Necesitas un lugar cómodo, profesional y con buena energía para trabajar solo por un día?',
        'Si no conoces un coworking: es un espacio compartido donde puedes trabajar con tu laptop, con internet y servicios comunes, sin rentar una oficina fija ni un contrato largo. El Day Pass te da acceso completo a nuestro espacio por un día.',
      ],
      includes: [
        'Acceso de 9:00 a 19:00 h (lun–vie) y de 9:00 a 17:00 h (sáb–dom).',
        'Escritorio flexible (hot desk) en zona compartida.',
        'Wi‑Fi de alta velocidad.',
        'Uso de impresora (sujeto a disponibilidad).',
        'Acceso a pantalla para presentaciones (sujeto a disponibilidad).',
        'Puedes traer tu propio equipo (monitor, teclado, etc.).',
        'Café, té y agua siempre disponibles.',
        'Acceso a cocina, refrigerador y áreas comunes.',
        'Espacio pet-friendly 🐾',
      ],
    },
    purchaseUrl:
      'https://archieapp.co/estudio-popnest-1/public/store/day-passes/d802e120-96c3-5740-a8af-c949dcb05a5f',
  },
]
