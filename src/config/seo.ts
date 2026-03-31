/** URL pública del sitio (sin barra final). Usar en producción vía `VITE_SITE_URL`. */
export function getSiteOrigin(): string {
  const raw = import.meta.env.VITE_SITE_URL ?? 'https://estudiopopnest.com'
  return raw.replace(/\/$/, '')
}

export const business = {
  name: 'Estudio Popnest',
  legalName: 'Estudio Popnest',
  description:
    'Coworking y salas de juntas en la colonia Del Carmen, Coyoacán (Ciudad de México): membresías, pase por día, Wi‑Fi, café y terraza, cerca del Museo Frida Kahlo.',
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
    title: 'Estudio Popnest | Coworking y salas de juntas en Del Carmen, Coyoacán',
    description:
      'Coworking en la colonia Del Carmen (Coyoacán, Ciudad de México): salas de reuniones por hora, pase por día y membresías, con Wi‑Fi, café y terraza. A pasos del Museo Frida Kahlo, Londres 105.',
  },
  '/planes': {
    title: 'Membresías y pase por día en Coyoacán | Estudio Popnest',
    description:
      'Planes para usar nuestro coworking en Del Carmen, Coyoacán (CDMX): pase por día, mensual y paquetes de varios días. Elige el acceso que encaje con tu forma de trabajar.',
  },
  '/salas-de-juntas': {
    title: 'Salas de juntas en Del Carmen, Coyoacán | Estudio Popnest',
    description:
      'Salas de reuniones por hora en Coyoacán, colonia Del Carmen: distintas capacidades para equipos, espacios equipados y ubicación céntrica cerca del centro histórico del barrio.',
  },
  '/contacto': {
    title: 'Contacto y ubicación en Del Carmen, Coyoacán | Estudio Popnest',
    description:
      'Teléfono, correo y dirección en Londres 105 (Del Carmen, Coyoacán, CDMX): mapa, cómo llegar, transporte público y orientación para estacionamiento. Horario y preguntas frecuentes.',
  },
  '/sobre-nosotros': {
    title: 'Sobre Estudio Popnest | Coworking en Del Carmen, Coyoacán',
    description:
      'Quiénes somos: comunidad de trabajo en la colonia Del Carmen, Coyoacán — un tercer lugar entre casa y oficina para profesionistas y equipos, con foco en diseño y creatividad.',
  },
  '/privacidad': {
    title: 'Aviso de privacidad | Estudio Popnest, Coyoacán',
    description:
      'Aviso de privacidad de Estudio Popnest (espacio de coworking en Coyoacán, Ciudad de México): tratamiento de datos personales conforme a la legislación aplicable.',
  },
  '/terminos': {
    title: 'Términos y condiciones | Estudio Popnest, Coyoacán',
    description:
      'Condiciones de uso de los servicios de coworking y salas de reunión de Estudio Popnest en Del Carmen, Coyoacán (CDMX).',
  },
  '/404': {
    title: 'Página no encontrada | Estudio Popnest',
    description: 'La página que buscas no existe o fue movida. Vuelve al inicio o revisa la URL.',
    noIndex: true,
  },
}

export function getSeoForPath(pathname: string): RouteSeo {
  const normalized = pathname.replace(/\/$/, '') || '/'
  return routeSeo[normalized] ?? routeSeo['/']
}
