import { Link } from 'react-router-dom'
import { JsonLd } from '../components/seo/JsonLd'
import { fituneUrls, withUtm } from '../config/fitune'
import {
  SINGLE_CLASS_PRICE_MXN,
  classPath,
  classTypes,
  getScheduleSummary,
  getTeachersLabel,
  slugForClass,
} from '../lib/clases'
import { buildBreadcrumb } from '../lib/schema'

export function Clases() {
  return (
    <main className="bg-[#fbfbfc]">
      <JsonLd
        data={buildBreadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Clases', path: '/classes' },
        ])}
      />

      <section className="mx-auto max-w-5xl px-6 pb-8 pt-14 lg:px-12">
        <h1 className="font-heading text-3xl font-bold text-[#111827] md:text-4xl">
          Clases de yoga, Pilates y bienestar en Coyoacán
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-body md:text-lg">
          En Estudio Popnest, en la colonia Del Carmen, damos clases presenciales de 60 minutos en
          grupos reducidos: Pilates mat, Hatha Yoga, Power Yoga, Tai Chi, Sound Healing, Belly
          Dance y Stretching. Clase suelta ${SINGLE_CLASS_PRICE_MXN} MXN; los paquetes y las
          reservas están en Fitune.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={withUtm(fituneUrls.schedule, 'clases')}
            rel="noopener"
            className="inline-flex rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
          >
            Reservar clase
          </a>
          <a
            href={withUtm(fituneUrls.pricing, 'clases-paquetes')}
            rel="noopener"
            className="inline-flex rounded-md border border-primary px-6 py-3 font-body font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            Ver paquetes
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {classTypes.map((c) => (
            <li key={c.id}>
              <Link
                to={classPath(slugForClass(c.id))}
                className="flex h-full gap-4 rounded-xl border border-neutral bg-white p-5 transition-colors hover:border-primary"
              >
                <img
                  src={c.image}
                  alt=""
                  width={80}
                  height={80}
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-xl bg-quaternary/30 object-contain p-2"
                />
                <div>
                  <h2 className="font-heading text-xl font-semibold text-[#111827]">{c.name}</h2>
                  <p className="mt-1 font-body text-sm text-primary">
                    {getTeachersLabel(c.id)} · {c.duration} min
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-body">{c.description}</p>
                  <p className="mt-2 font-body text-xs text-[#6b7280]">{getScheduleSummary(c.id)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-body text-sm text-body">
          ¿Prefieres ver todo junto? Consulta el <Link to="/horario" className="text-primary underline">horario semanal</Link>.
        </p>
      </section>
    </main>
  )
}
