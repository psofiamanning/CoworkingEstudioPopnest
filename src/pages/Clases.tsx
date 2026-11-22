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
import { formatMxn, paquetes } from '../data/paquetes'

export function Clases() {
  return (
    <main className="bg-cream">
      <JsonLd
        data={buildBreadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Clases', path: '/classes' },
        ])}
      />

      <section className="mx-auto max-w-5xl px-6 pb-8 pt-14 lg:px-12">
        <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">
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
                className="flex h-full gap-4 rounded-xl border border-cream-border bg-cream-elevated p-5 transition-colors hover:border-primary"
              >
                {c.photo ? (
                  <img
                    src={c.photo}
                    alt={`Clase de ${c.name} en Estudio Popnest, Coyoacán`}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-xl object-cover object-[50%_60%]"
                  />
                ) : (
                  <img
                    src={c.image}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-xl bg-cream-secondary object-contain p-2"
                  />
                )}
                <div>
                  <h2 className="font-heading text-xl font-semibold text-ink">{c.name}</h2>
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

      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-12" aria-labelledby="paquetes">
        <h2 id="paquetes" className="font-heading text-2xl font-bold text-ink md:text-3xl">
          Paquetes y precios
        </h2>
        <p className="mt-2 max-w-3xl font-body text-body">
          Clase suelta {formatMxn(SINGLE_CLASS_PRICE_MXN)} MXN. Los paquetes son válidos para todas
          las clases y se compran en Fitune.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paquetes.map((p) => (
            <li
              key={p.name}
              className={`flex flex-col rounded-xl border bg-cream-elevated p-5 ${p.popular ? 'border-primary' : 'border-cream-border'}`}
            >
              {p.popular && (
                <span className="mb-2 w-fit rounded-full bg-primary px-2 py-0.5 font-body text-xs font-semibold text-white">
                  Popular
                </span>
              )}
              <h3 className="font-heading text-lg font-semibold text-ink">{p.name}</h3>
              <p className="mt-2 font-heading text-2xl font-bold text-primary">
                {formatMxn(p.price)} <span className="text-sm font-normal text-[#6b7280]">MXN</span>
              </p>
              {p.regularPrice && (
                <p className="font-body text-sm text-[#6b7280]">
                  <s>{formatMxn(p.regularPrice)}</s> · ahorras {formatMxn(p.regularPrice - p.price)}
                </p>
              )}
              <p className="mt-2 font-body text-sm text-body">
                {p.classes === 'ilimitadas' ? 'Clases ilimitadas' : `${p.classes} clases`} · vigencia {p.validity}
              </p>
              {p.note && <p className="font-body text-sm text-body">{p.note}</p>}
            </li>
          ))}
        </ul>
        <a
          href={withUtm(fituneUrls.pricing, 'clases-paquetes')}
          rel="noopener"
          className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
        >
          Comprar en Fitune
        </a>
      </section>
    </main>
  )
}
