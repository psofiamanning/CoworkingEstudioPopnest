/**
 * Entrada de servidor para el prerenderizado (scripts/prerender.mjs).
 * Se compila con `vite build --ssr` y genera el HTML de cada ruta pública al construir el sitio.
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
}

export { business, getSeoForPath, getSiteOrigin, getSitemapMeta, publicRoutes } from './config/seo'
