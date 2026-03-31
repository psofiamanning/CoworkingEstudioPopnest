import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { buildWhatsAppUrl } from '../../lib/whatsapp'

export function SiteFooter() {
  const waHref = buildWhatsAppUrl(site.whatsappPhoneDigits, 'Hola Estudio Popnest')
  const mailtoHref = `mailto:${site.businessEmail}`

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#b73d37] to-[#c76661] py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <Link
            to="/"
            className="inline-flex rounded-2xl bg-white/95 p-2.5 shadow-sm ring-1 ring-white/20"
            aria-label="Estudio Popnest — inicio"
          >
            <img
              src="/favicon.svg"
              alt=""
              width={48}
              height={46}
              className="h-10 w-auto object-contain object-left"
              decoding="async"
            />
          </Link>
        </div>
        <div className="font-body text-sm leading-relaxed">
          <p>
            <a href={waHref} className="hover:underline" target="_blank" rel="noopener noreferrer">
              WA +52 55 5437 9644
            </a>
          </p>
          <p className="mt-2">
            <a href={mailtoHref} className="hover:underline">
              {site.businessEmail}
            </a>
          </p>
          <p className="mt-2">
            <Link to="/" className="hover:underline">
              estudiopopnest.com
            </Link>
          </p>
        </div>
        <div className="font-body text-sm leading-relaxed">
          <p>
            <a
              href={site.googleMapsUrl}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Londres 105, Col. Del Carmen, Coyoacán, CDMX
            </a>
          </p>
          <p className="mt-2">Horario: Lun a Vie 9am–7pm, Sáb 9am–5pm</p>
        </div>
        <div className="font-body text-sm">
          <ul className="space-y-2">
            <li>
              <Link to="/sobre-nosotros" className="hover:underline">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="/privacidad" className="hover:underline">
                Aviso de Privacidad
              </Link>
            </li>
            <li>
              <Link to="/terminos" className="hover:underline">
                Términos y Condiciones
              </Link>
            </li>
          </ul>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block"
            aria-label="Instagram"
          >
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
