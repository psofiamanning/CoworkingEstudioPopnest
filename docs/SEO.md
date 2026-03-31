# SEO — Estudio Popnest

Documento de seguimiento: lo implementado en el código y líneas de trabajo pendientes o recomendadas (incluye acciones fuera del repositorio).

---

## Implementado en el proyecto

### Metaetiquetas y SPA (`src/components/seo/SeoHead.tsx`)

- **Título por ruta** (`document.title`).
- **Meta description** por ruta.
- **Canonical** al origen del sitio + pathname (usa `VITE_SITE_URL`, por defecto `https://estudiopopnest.com`).
- **Open Graph**: `og:type`, `og:site_name`, `og:locale` (es_MX), `og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`.
- **Twitter Card**: `summary_large_image` + título, descripción e imagen.
- **Robots**: `index, follow` en páginas normales; **`noindex`** en `/404`.
- **Geo** (apoyo local): `geo.region` = `MX-CMX`, `geo.placename` = `Coyoacán, Ciudad de México`.

### Títulos y descripciones por ruta (`src/config/seo.ts`)

- Definidos para: `/`, `/planes`, `/salas-de-juntas`, `/contacto`, `/sobre-nosotros`, `/privacidad`, `/terminos`, `/404`.
- Enfoque **local** (Del Carmen, Coyoacán, Ciudad de México / CDMX) y tipo de servicio (coworking, salas, membresías) sin relleno artificial de palabras clave.

### HTML estático inicial (`index.html`)

- `lang="es-MX"`.
- Meta description, canonical, OG y Twitter alineados con la **home** (primer paint y rastreadores que lean HTML sin ejecutar JS).
- Tras cargar la app, `SeoHead` actualiza según la ruta.

### Datos estructurados Schema.org

| Componente | Ubicación | Contenido |
|------------|-----------|-----------|
| **LocalBusiness + CoworkingSpace** | `src/components/seo/JsonLdLocalBusiness.tsx` (en `MainLayout`) | Nombre, descripción, `url`, dirección (incl. Col. Del Carmen), teléfono, email, `geo`, horarios (lun–vie, sáb), `hasMap` (Google Maps), `image`, `logo`, `contactPoint`, `sameAs` (Maps + Instagram), grafo con **WebSite** y `publisher`. |
| **FAQPage** | `src/components/seo/JsonLdFaqPage.tsx` | Solo en **Contacto**; preguntas/respuestas desde `src/data/contactFaq.ts` (mismo texto en página y JSON-LD). |

### Negocio y SEO local (config)

- **`src/config/seo.ts`**: objeto `business` (NAP, descripción, coordenadas, teléfono, email, imagen OG por defecto).
- **`src/config/site.ts`**: `googleMapsUrl` (y variables de entorno para WhatsApp, Instagram, etc.).

### Página de contacto (`src/pages/Contacto.tsx`)

- Sección **Ubicación y cómo llegar**: dirección legible (`<address>`), enlace a Google Maps, **mapa embebido** (`src/lib/googleMapsEmbed.ts` con coordenadas de `business.geo`), instrucciones de acceso, transporte público, estacionamiento.
- Coherencia con pie de página y FAQ.

### Mapa y archivos públicos

- **`public/sitemap.xml`**: URLs principales del sitio.
- **`public/robots.txt`**: `Allow: /` y enlace al sitemap.

### Despliegue

- **`vercel.json`**: rewrite a `index.html` para rutas del SPA; cabeceras de caché para assets.

### Consentimiento de cookies (`src/components/CookieConsent.tsx`, `src/lib/cookieConsent.ts`)

- Banner fijo al pie en todas las rutas (`CookieConsentProvider` en `MainLayout`) hasta que el usuario elija.
- Botones **Solo necesarias** (analíticas desactivadas) y **Aceptar todas** (preparado para futura medición de audiencia).
- Preferencias en `localStorage` (`estudio-popnest-cookie-consent`); helper `hasAnalyticsConsent()` para cargar scripts de analítica solo si procede.
- El botón flotante de WhatsApp sube cuando el banner está visible para no quedar tapado.
- Texto breve sobre cookies en **Aviso de privacidad** (`/privacidad`).

### Variables de entorno relevantes (`src/vite-env.d.ts`)

- `VITE_SITE_URL` — origen canónico y JSON-LD.
- `VITE_GOOGLE_MAPS_URL` — enlace al lugar en Maps.
- `VITE_WHATSAPP_PHONE`, `VITE_INSTAGRAM_URL` — contacto y `sameAs` donde aplique.

---

## Pendiente o recomendable (no todo está en código)

### Técnico / producto en el sitio

- **Imagen Open Graph por ruta**: ahora todas las rutas comparten `business.defaultOgImagePath`. Se puede extender `routeSeo` con `ogImagePath` opcional para planes, salas, contacto, etc.
- **BreadcrumbList** (JSON-LD) en páginas internas si se quiere reforzar jerarquía en resultados.
- **Mapa embebido “oficial”** (`embed?pb=...` desde Google Maps → Compartir → Insertar mapa): opcional; el iframe actual por coordenadas es válido.
- **Imagen del logo en JSON-LD**: se usa `favicon.svg`; si Google pide formato raster, valorar PNG en tamaño adecuado.
- **SSR o pre-render**: el sitio es SPA; Google suele renderizar JS, pero si se prioriza SEO crítico sin depender del render, habría que valorar SSG/SSR (p. ej. Vite plugin o framework con HTML por ruta).
- **Analítica (GA4, GTM, etc.)**: cargar scripts solo si `hasAnalyticsConsent()` es verdadero tras **Aceptar todas**; no insertar antes del consentimiento.

### Contenido y SEO on-page

- Revisión periódica de textos en **Home**, **Planes**, **Salas** y **Sobre nosotros** para alinear con búsquedas reales (sin perder naturalidad).
- **Textos alternativos** (`alt`) en imágenes relevantes: revisar galerías y hero donde falte descripción útil.
- **Enlaces internos** claros (ya hay navegación); valorar enlaces contextuales en párrafos hacia contacto, planes o salas.

### Fuera del repositorio (local y Search)

- **Google Business Profile**: reclamar/optimizar ficha, NAP idéntico al sitio, fotos, horario, reseñas.
- **Google Search Console**: propiedad del dominio, envío/lectura del sitemap, inspección de URLs.
- **Prueba de resultados enriquecidos**: validar URL publicada tras cada cambio relevante de JSON-LD.
- **Reseñas** y menciones coherentes en otros sitios (directorios locales, colaboraciones).
- **Rendimiento (Core Web Vitals)**: medir en PageSpeed Insights o Search Console; optimizar imágenes, fuentes y JS si hace falta.

### Mantenimiento

- Al **añadir rutas nuevas**: actualizar `routeSeo`, `sitemap.xml` y la navegación.
- Mantener **NAP** (nombre, dirección, teléfono) igual en web, GBP y redes.

---

## Referencia rápida de archivos

| Área | Archivos |
|------|----------|
| Meta y negocio | `src/config/seo.ts`, `src/components/seo/SeoHead.tsx` |
| JSON-LD | `src/components/seo/JsonLdLocalBusiness.tsx`, `src/components/seo/JsonLdFaqPage.tsx` |
| FAQ contacto | `src/data/contactFaq.ts` |
| Contacto / mapa | `src/pages/Contacto.tsx`, `src/lib/googleMapsEmbed.ts` |
| Cookies | `src/components/CookieConsent.tsx`, `src/lib/cookieConsent.ts` |
| Sitio / Maps | `src/config/site.ts` |
| HTML base | `index.html` |
| Rastreo | `public/sitemap.xml`, `public/robots.txt` |

---

*Última revisión del documento alineada con el estado del repositorio. Actualizar esta sección cuando se cierren nuevas tareas de SEO.*
