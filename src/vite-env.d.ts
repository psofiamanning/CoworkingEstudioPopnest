/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL pública del sitio (sin barra final), p. ej. https://estudiopopnest.com — SEO y JSON-LD */
  readonly VITE_SITE_URL?: string
  readonly VITE_WHATSAPP_PHONE?: string
  readonly VITE_WELLNESS_URL?: string
  readonly VITE_INSTAGRAM_URL?: string
  /** URL completa de Google Maps del negocio (opcional; por defecto búsqueda «Estudio Popnest» + dirección) */
  readonly VITE_GOOGLE_MAPS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
