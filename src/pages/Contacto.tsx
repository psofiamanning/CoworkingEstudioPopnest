import { Link } from 'react-router-dom'
import { JsonLdFaqPage } from '../components/seo/JsonLdFaqPage'
import { business } from '../config/seo'
import { site } from '../config/site'
import { contactFaq } from '../data/contactFaq'
import { getGoogleMapsEmbedSrc } from '../lib/googleMapsEmbed'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const heroImg = '/images/contact/hero-pasillo.png'

const addressLines = [
  business.streetAddress,
  `Col. Del Carmen, ${business.addressLocality}`,
  `${business.addressRegion} · C.P. ${business.postalCode}`,
  'México',
] as const

export function Contacto() {
  const mapEmbedSrc = getGoogleMapsEmbedSrc()
  const waOrientacion = buildWhatsAppUrl(
    site.whatsappPhoneDigits,
    'Hola, vengo a Estudio Popnest y quiero orientación para llegar / estacionamiento.',
  )

  return (
    <main>
      <JsonLdFaqPage items={contactFaq} />
      <section className="relative flex min-h-[min(70vh,640px)] items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Pasillo y taquilleros en Estudio Popnest"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
        <div className="relative z-10 max-w-2xl px-6 py-20 text-center text-white">
          <p className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">
            Estudio Popnest
          </p>
          <h1 className="mt-4 font-heading text-2xl font-medium md:text-3xl">Contacto</h1>
          <p className="mt-3 font-body text-base text-white/90 md:text-lg">
            Ubicación en Coyoacán, cómo llegar y datos para escribirnos o llamar.
          </p>
          <p className="mt-8 font-body text-base leading-relaxed text-white/95 md:text-lg">
            Por favor contáctanos para información general y solicitudes en:
          </p>
          <ul className="mt-8 space-y-3 font-body text-lg md:text-xl">
            <li>
              <span className="text-white/80">Whatsapp: </span>
              <a href="tel:+525554379644" className="font-semibold underline decoration-white/40 hover:decoration-white">
                55 5437 9644
              </a>
            </li>
            <li>
              <a
                href="mailto:info@estudiopopnest.com"
                className="font-semibold underline decoration-white/40 hover:decoration-white"
              >
                info@estudiopopnest.com
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="border-t border-neutral/40 bg-white py-16 md:py-20"
        aria-labelledby="ubicacion-heading"
        id="ubicacion"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 id="ubicacion-heading" className="font-heading text-2xl font-bold text-[#1f2937] md:text-3xl">
            Ubicación y cómo llegar
          </h2>
          <p className="mt-3 max-w-3xl font-body text-body">
            Coworking y salas de reuniones en la colonia Del Carmen, a pasos del Museo Frida Kahlo. Dirección
            completa, mapa y orientación para visitarnos.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-8">
              <div className="rounded-lg border border-neutral/60 bg-[#fafafa] p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-[#1f2937]">Dirección</h3>
                <address className="mt-3 not-italic font-body leading-relaxed text-[#374151]">
                  <span className="block font-semibold text-[#1f2937]">{business.name}</span>
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-4 font-body text-sm text-[#6b7280]">
                  Punto de referencia: zona del Museo Frida Kahlo (Casa Azul), calles tranquilas y mayormente
                  peatonales.
                </p>
                <a
                  href={site.googleMapsUrl}
                  className="mt-4 inline-flex font-body font-semibold text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir en Google Maps
                </a>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-[#1f2937]">Instrucciones de acceso</h3>
                <p className="mt-3 font-body leading-relaxed text-[#374151]">
                  Buscamos el número en la calle <strong className="font-semibold">Londres</strong>, colonia Del
                  Carmen. El acceso al edificio está señalado; si tienes duda al llegar, escríbenos por WhatsApp y
                  te apoyamos.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-[#1f2937]">Transporte público</h3>
                <p className="mt-3 font-body leading-relaxed text-[#374151]">
                  La zona está bien conectada con <strong className="font-semibold">Metro Línea 3</strong>{' '}
                  (estaciones <strong className="font-semibold">Coyoacán</strong> o{' '}
                  <strong className="font-semibold">Viveros / Derechos Humanos</strong>): desde ahí suele ser un
                  trayecto a pie de unos minutos; te recomendamos completar el recorrido con tu app de mapas favorita
                  para la ruta más cómoda el día de tu visita.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-[#1f2937]">Estacionamiento</h3>
                <p className="mt-3 font-body leading-relaxed text-[#374151]">
                  No contamos con estacionamiento propio; la zona es muy peatonal. Hay alternativas de
                  estacionamiento público o privado en calles cercanas según hora y día.{' '}
                  <a href={waOrientacion} className="font-semibold text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    Escríbenos por WhatsApp
                  </a>{' '}
                  con la hora aproximada de tu visita y te orientamos.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-neutral/60 bg-[#e5e7eb] shadow-sm">
              <div className="aspect-[4/3] w-full min-h-[280px] lg:aspect-auto lg:min-h-[420px]" role="region" aria-label="Mapa de la ubicación de Estudio Popnest">
                <iframe
                  title="Ubicación de Estudio Popnest en Google Maps — Londres 105, Del Carmen, Coyoacán"
                  src={mapEmbedSrc}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="border-t border-neutral/40 bg-white px-4 py-3 font-body text-xs text-[#6b7280]">
                Mapa orientativo; la ubicación exacta coincide con la ficha de Estudio Popnest en Google Maps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral/40 bg-[#fafafa] py-16 md:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <h2 id="faq-heading" className="font-heading text-2xl font-bold text-[#1f2937] md:text-3xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 font-body text-body">
            Respuestas rápidas sobre ubicación, horario y cómo reservar.
          </p>
          <ul className="mt-10 space-y-3">
            {contactFaq.map((item) => (
              <li key={item.question} className="rounded-lg border border-neutral/60 bg-white shadow-sm">
                <details className="group">
                  <summary className="cursor-pointer list-none px-5 py-4 font-body font-semibold text-[#1f2937] marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-3">
                      <span>{item.question}</span>
                      <span
                        className="mt-0.5 shrink-0 text-primary transition-transform group-open:rotate-180"
                        aria-hidden
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </span>
                  </summary>
                  <div className="border-t border-neutral/40 px-5 pb-4 pt-1 font-body leading-relaxed text-[#374151]">
                    <p>{item.answer}</p>
                    {item.showPlanLinks ? (
                      <p className="mt-4 text-sm">
                        <Link to="/planes" className="font-semibold text-primary hover:underline">
                          Ver planes y membresías
                        </Link>
                        {' · '}
                        <Link to="/salas-de-juntas" className="font-semibold text-primary hover:underline">
                          Ver salas de juntas
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
