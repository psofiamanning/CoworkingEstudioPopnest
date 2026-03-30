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
        'Acceso de 9:00 a 19:00 h (lun–vie) y de 10:00 a 17:00 h (sáb–dom).',
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
  {
    id: 'plan-mensual',
    title: 'Plan Mensual',
    priceLine: '$4,800 | Individual',
    videoSrc: '/videos/plan-mensual.mp4',
    poster: '/videos/F0FAA4A2-C3C0-45C3-A708-28D4513B47FF_1_105_c.jpeg',
    shortNote:
      'Para ingresar, solo presenta tu pase de confirmación de pago a tu llegada.',
    description:
      'Un espacio sereno y luminoso para trabajar a tu ritmo, con acceso 24/7, mesas compartidas, café, té y agua de cortesía, cocina equipada, terraza arbolada, locker personal y atención en recepción.',
    purchaseUrl:
      'https://archieapp.co/estudio-popnest-1/public/store/plans/fb9abf3c-2f55-5304-af29-a6b8a59aae64?filters=U2FsdGVkX1%252BdRJN03H0KzJs87In6x9Xe9kWA23CoIAwhxDG6nVsbq8DmJRwP2Has9AJ3krgo52ckqVoD6aqWiq5Zk%252BSwytQfKORaGa1rQ%252B8%253D',
  },
  {
    id: 'paquete-5',
    title: 'Paquete 5 días',
    priceLine: '$1,350 | por mes | Individual',
    shortNote: '',
    description:
      'Cinco días al mes para usar cuando los necesites. Ideal si tu ritmo cambia semana a semana.',
    purchaseUrl:
      'https://archieapp.co/estudio-popnest-1/public/store/plans/58569aed-bebb-53fb-8631-7d5fea2e3ad1?filters=U2FsdGVkX19lBBFe7FfMuLRRq6ICS2UkLSLBv6x2XGpFhLbPcoQIM3Ub5OsqPvP0rZ3AUezyNDMJyhngQedzUHOP5NEB2qnXMq8xHegeAnU%253D',
  },
  {
    id: 'paquete-10',
    title: 'Paquete 10 días',
    priceLine: '$2,700 | por mes | Individual',
    shortNote: '',
    description:
      'Diez días al mes con la misma flexibilidad: distribuye tus visitas según tu calendario.',
    purchaseUrl:
      'https://archieapp.co/estudio-popnest-1/public/store/plans/b05156cc-ae03-52d9-abad-3191cfbcfae3?filters=U2FsdGVkX1%252F8vvAp%252F%252BP0ulm4XoAQb2Pf5q8cAHlMb74VYIpRQoxUiAnqchZTHCbzjlFqUxaRjp5URbylntN3m1p3tY6o5beS8lq7e7swzo4%253D',
  },
]
