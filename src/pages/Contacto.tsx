import { Link } from 'react-router-dom'
import { JsonLdFaqPage } from '../components/seo/JsonLdFaqPage'
import { contactFaq } from '../data/contactFaq'

const heroImg = '/images/contact/hero-pasillo.png'

export function Contacto() {
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
