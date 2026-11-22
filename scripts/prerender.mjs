/**
 * Después de `vite build` y del bundle de servidor: genera un index.html por ruta pública
 * con el contenido dentro de #root y las metaetiquetas correctas, para que Google y los
 * rastreadores de IA (que muchas veces no ejecutan JavaScript) lean el texto real de cada página.
 * También genera dist/sitemap.xml a partir de la misma lista de rutas.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const serverEntry = path.join(distDir, 'server', 'entry-server.js')

const { render, business, getSeoForPath, getSiteOrigin, getSitemapMeta, publicRoutes } = await import(
  pathToFileURL(serverEntry).href
)

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')
const origin = getSiteOrigin()

const esc = (text) =>
  String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Reemplaza una etiqueta existente o la agrega antes de </head>. */
function setTag(html, pattern, tag) {
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function headFor(html, pathname) {
  const seo = getSeoForPath(pathname)
  const canonical = pathname === '/' ? `${origin}/` : `${origin}${pathname}`
  const title = esc(seo.title)
  const desc = esc(seo.description)
  const image = `${origin}${business.defaultOgImagePath}`
  let out = html
  out = setTag(out, /<title>[^<]*<\/title>/, `<title>${title}</title>`)
  out = setTag(out, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${desc}" />`)
  out = setTag(out, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(canonical)}" />`)
  out = setTag(out, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
  out = setTag(out, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${desc}" />`)
  out = setTag(out, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${esc(canonical)}" />`)
  out = setTag(out, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${esc(image)}" />`)
  out = setTag(out, /<meta name="twitter:card" content="[^"]*"\s*\/?>/, `<meta name="twitter:card" content="summary_large_image" />`)
  out = setTag(out, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`)
  out = setTag(out, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${desc}" />`)
  out = setTag(out, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${seo.noIndex ? 'noindex, follow' : 'index, follow'}" />`)
  return out
}

let count = 0
for (const route of publicRoutes) {
  const appHtml = render(route)
  let html = headFor(template, route)
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  if (!html.includes(`<div id="root">${appHtml.slice(0, 20)}`)) {
    throw new Error(`No se pudo insertar el contenido de ${route} en #root`)
  }
  const outPath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html')
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, html)
  count += 1
}

const today = new Date().toISOString().slice(0, 10)
const urls = publicRoutes
  .map((route) => {
    const { changefreq, priority } = getSitemapMeta(route)
    const loc = route === '/' ? `${origin}/` : `${origin}${route}`
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join('\n')
await fs.writeFile(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

// El bundle de servidor no se publica.
await fs.rm(path.join(distDir, 'server'), { recursive: true, force: true })
console.log(`Prerender: ${count} páginas + sitemap.xml (${publicRoutes.length} URLs)`)
