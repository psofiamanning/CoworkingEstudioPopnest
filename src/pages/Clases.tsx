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
  thumbOf,
} from '../lib/clases'
import { buildBreadcrumb } from '../lib/schema'
import { formatMxn, paquetes } from '../data/paquetes'
import { FituneNotice } from '../components/FituneNotice'

export function Clases() {
  return (
    <main className="bg-cream">
      <JsonLd
        data={buildBreadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Clases', path: '/classes' },
        ])}
      />

      <section className="relative flex min-h-[min(80vh,640px)] items-end overflow-hidden">
        <img
          src="/images/clases/pilates-clase.webp"
          srcSet="/images/clases/pilates-clase-960.webp 960w, /images/clases/pilates-clase.webp 1200w"
          sizes="100vw"
          alt="Clase de Pilates mat en Estudio Popnest, Coyoacán"
          width={1600}
          height={1066}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-12 pt-32 text-white lg:px-12">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            Estudio Popnest · Coyoacán
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl">
            Pilates mat, yoga y bienestar en Coyoacán
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/95 md:text-lg">
            Clases de Pilates mat y yoga de 60 minutos en grupos reducidos, en la colonia Del Carmen. Clase
            suelta ${SINGLE_CLASS_PRICE_MXN} MXN; los paquetes y las reservas están en Fitune.
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
              href="#paquetes"
              className="inline-flex rounded-md border border-white px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver paquetes
            </a>
          </div>
          <FituneNotice campaign="clases-hero" className="mt-5 text-white/90 [&_img]:rounded [&_img]:bg-white [&_img]:px-2 [&_img]:py-1" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-2 pt-12 lg:px-12">
        <p className="max-w-3xl font-body text-base leading-relaxed text-body md:text-lg">
          En Estudio Popnest damos Pilates mat (en colchoneta, máximo 10 personas), Hatha Yoga, Power Yoga, Tai Chi, Sound Healing,
          Belly Dance y Stretching, en grupos reducidos y con coaches presentes. Elige tu práctica:
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-6 lg:px-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {classTypes.map((c) => (
            <li key={c.id}>
              <Link
                to={classPath(slugForClass(c.id))}
                className="flex h-full gap-4 rounded-xl border border-cream-border bg-cream-elevated p-5 transition-colors hover:border-primary"
              >
                {c.photo ? (
                  <img
                    src={thumbOf(c.photo)}
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

      <section id="paquetes" className="mx-auto max-w-5xl scroll-mt-20 px-6 pb-16 lg:px-12" aria-labelledby="paquetes-title">
        <h2 id="paquetes-title" className="font-heading text-2xl font-bold text-ink md:text-3xl">
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
        <FituneNotice campaign="clases-paquetes-aviso" className="mt-4" />
      </section>
    </main>
  )
}
