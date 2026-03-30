/** URL pública del sitio (sin barra final). Usar en producción vía `VITE_SITE_URL`. */
export function getSiteOrigin(): string {
  const raw = import.meta.env.VITE_SITE_URL ?? 'https://estudiopopnest.com'
  return raw.replace(/\/$/, '')
}

export const business = {
  name: 'Estudio Popnest',
  legalName: 'Estudio Popnest',
  description:
    'Coworking y salas de reuniones en Coyoacán, CDMX, cerca del Museo Frida Kahlo. Membresías, pase por día, Wi‑Fi, café y terraza.',
  streetAddress: 'Londres 105',
  addressLocality: 'Coyoacán',
  addressRegion: 'Ciudad de México',
  postalCode: '04100',
  addressCountry: 'MX',
  /** Coordenadas aproximadas (Col. Del Carmen) para SEO local / mapas */
  geo: { latitude: 19.3495, longitude: -99.1628 },
  telephoneInternational: '+525554379644',
  email: 'info@estudiopopnest.com',
  /** Imagen OG por defecto (ruta bajo public/) */
  defaultOgImagePath: '/images/home/hero-sala.png',
} as const

export type RouteSeo = { title: string; description: string; noIndex?: boolean }

/** Meta por ruta (pathname con react-router, sin dominio) */
export const routeSeo: Record<string, RouteSeo> = {
  '/': {
    title: 'Estudio Popnest | Coworking y salas de reuniones en Coyoacán, CDMX',
    description:
      'Coworking en Coyoacán, a pasos del Museo Frida Kahlo: salas de juntas, pase por día, membresías, Wi‑Fi, café, terraza y ambiente profesional. Londres 105, Del Carmen.',
  },
  '/planes': {
    title: 'Planes y membresías | Estudio Popnest Coyoacán',
    description:
      'Pase por día, plan mensual y paquetes de 5 y 10 días en Estudio Popnest. Elige tu acceso al coworking en Coyoacán, CDMX.',
  },
  '/salas-de-juntas': {
    title: 'Salas de juntas y eventos en Coyoacán | Estudio Popnest',
    description:
      'Reserva salas de reuniones en Coyoacán: capacidades desde 4 hasta 70 personas. Espacios equipados cerca del centro de Coyoacán.',
  },
  '/contacto': {
    title: 'Contacto | Estudio Popnest — Coyoacán, CDMX',
    description:
      'WhatsApp, correo, dirección en Londres 105 (Del Carmen, Coyoacán), horario y preguntas frecuentes: ubicación, reservas y estacionamiento.',
  },
  '/sobre-nosotros': {
    title: 'Sobre nosotros | Estudio Popnest',
    description:
      'Conoce Estudio Popnest: comunidad de trabajo en Coyoacán, tercer lugar entre hogar y oficina, diseño y creatividad.',
  },
  '/privacidad': {
    title: 'Aviso de privacidad | Estudio Popnest',
    description: 'Aviso de privacidad y tratamiento de datos personales de Estudio Popnest.',
  },
  '/terminos': {
    title: 'Términos y condiciones | Estudio Popnest',
    description: 'Términos y condiciones de uso de los servicios de Estudio Popnest.',
  },
  '/404': {
    title: 'Página no encontrada | Estudio Popnest',
    description: 'La página que buscas no existe o fue movida.',
    noIndex: true,
  },
}

export function getSeoForPath(pathname: string): RouteSeo {
  const normalized = pathname.replace(/\/$/, '') || '/'
  return routeSeo[normalized] ?? routeSeo['/']
}
