import { classPath, classSlugs, getClassSeo } from '../lib/clases'

/** URL pública del sitio (sin barra final). Usar en producción vía `VITE_SITE_URL`. */
export function getSiteOrigin(): string {
  const raw = import.meta.env.VITE_SITE_URL ?? 'https://estudiopopnest.com'
  return raw.replace(/\/$/, '')
}

export const business = {
  name: 'Estudio Popnest',
  legalName: 'Estudio Popnest',
  description:
    'Coworking, salas de juntas y clases de Pilates, yoga y bienestar en la colonia Del Carmen, Coyoacán (Ciudad de México): membresías, pase por día, café y terraza, cerca del Museo Frida Kahlo.',
  streetAddress: 'Londres 105',
  addressLocality: 'Coyoacán',
  addressRegion: 'Ciudad de México',
  postalCode: '04100',
  addressCountry: 'MX',
  /** Coordenadas aproximadas (Col. Del Carmen) para SEO local / mapas */
  geo: { latitude: 19.3495, longitude: -99.1628 },
  telephoneInternational: '+525554379644',
  /**
   * Coworking: lun–vie 9:00–19:00, sáb–dom 9:00–17:00.
   * Aquí va la unión con clases y Run Club (primera actividad → fin de la última clase).
   * Debe ser IDÉNTICO al footer (SiteFooter.tsx) y al perfil de Google Business.
   */
  hours: [
    { days: ['Monday'], opens: '08:30', closes: '20:30' },
    { days: ['Tuesday', 'Thursday'], opens: '08:30', closes: '21:30' },
    { days: ['Wednesday'], opens: '06:30', closes: '21:30' },
    { days: ['Friday'], opens: '08:30', closes: '19:00' },
    { days: ['Saturday'], opens: '07:30', closes: '17:00' },
    { days: ['Sunday'], opens: '08:00', closes: '17:00' },
  ],
  email: 'info@estudiopopnest.com',
  /** Imagen OG por defecto (ruta bajo public/) */
  defaultOgImagePath: '/images/home/hero-sala.png',
} as const

export type RouteSeo = { title: string; description: string; noIndex?: boolean }

/** Meta por ruta (pathname con react-router, sin dominio) */
export const routeSeo: Record<string, RouteSeo> = {
  '/': {
    title: 'Estudio Popnest | Coworking, Pilates y yoga en Del Carmen, Coyoacán',
    description:
      'Coworking, salas de juntas y clases de Pilates, yoga, Tai Chi y Sound Healing en la colonia Del Carmen, Coyoacán (CDMX), con café y terraza. A pasos del Museo Frida Kahlo, Londres 105.',
  },
  '/classes': {
    title: 'Pilates mat y yoga en Coyoacán | Clases en Del Carmen | Estudio Popnest',
    description:
      'Clases de Pilates mat en Coyoacán, además de Hatha Yoga, Power Yoga, Tai Chi, Sound Healing, Belly Dance y Stretching en Del Carmen. Grupos reducidos de 60 minutos. Reserva en línea.',
  },
  '/horario': {
    title: 'Horario de clases en Coyoacán | Estudio Popnest',
    description:
      'Horario semanal de Pilates, yoga, Tai Chi, Sound Healing, Belly Dance y Stretching en Estudio Popnest, Londres 105, Del Carmen, Coyoacán. Reserva tu lugar en línea.',
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
  '/oficinas-largo-plazo': {
    title: 'Renta de oficina privada por día, medio día y largo plazo en Coyoacán | Estudio Popnest',
    description:
      'Oficinas privadas en renta en Del Carmen, Coyoacán: por día ($1,200) o medio día ($600) con reserva en línea, y contratos anuales o de largo plazo con cotización por WhatsApp.',
  },
  '/eventos': {
    title: 'Eventos, talleres y workshops en Coyoacán | Estudio Popnest',
    description:
      'Renta de espacio en Del Carmen para talleres, workshops y encuentros. Formulario de solicitud con fecha, aforo, equipamiento y catering. Respuesta por WhatsApp.',
  },
  '/talleres': {
    title: 'Talleres y experiencias de bienestar en Coyoacán | Estudio Popnest',
    description:
      'Talleres y experiencias de bienestar con cupo limitado en Estudio Popnest, Del Carmen, Coyoacán. Consulta los próximos talleres y reserva tu lugar en línea.',
  },
  '/renta-salon': {
    title: 'Renta de salón en Coyoacán por hora | Salón Coyote | Estudio Popnest',
    description:
      'Renta el Salón Coyote en Del Carmen, Coyoacán, para clases privadas, talleres, fotos y celebraciones. Hasta 20 personas, desde $150 MXN por hora. Reserva en línea.',
  },
  '/run-club': {
    title: 'Run Club gratis en Coyoacán | Estudio Popnest',
    description:
      'Run club gratuito en Coyoacán: salidas en grupo miércoles 6:30 a.m. y sábado 7:30 a.m. desde Estudio Popnest, Del Carmen. Todos los niveles, sin reservación.',
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
  if (normalized.startsWith('/clases/')) {
    const seo = getClassSeo(normalized.replace('/clases/', ''))
    if (seo) return seo
    return routeSeo['/404']
  }
  return routeSeo[normalized] ?? routeSeo['/404']
}

/** Rutas públicas e indexables (se prerenderizan y van al sitemap). */
export const publicRoutes: string[] = [
  ...Object.keys(routeSeo).filter((r) => r !== '/404'),
  ...classSlugs.map(classPath),
]

type SitemapMeta = { changefreq: string; priority: number }

export function getSitemapMeta(pathname: string): SitemapMeta {
  if (pathname === '/') return { changefreq: 'weekly', priority: 1 }
  if (pathname.startsWith('/clases/')) return { changefreq: 'monthly', priority: 0.8 }
  if (pathname === '/classes' || pathname === '/horario') return { changefreq: 'weekly', priority: 0.9 }
  if (pathname === '/run-club' || pathname === '/renta-salon' || pathname === '/talleres') return { changefreq: 'monthly', priority: 0.8 }
  if (pathname === '/planes' || pathname === '/salas-de-juntas') return { changefreq: 'weekly', priority: 0.9 }
  if (pathname === '/privacidad' || pathname === '/terminos') return { changefreq: 'yearly', priority: 0.4 }
  return { changefreq: 'monthly', priority: 0.8 }
}
