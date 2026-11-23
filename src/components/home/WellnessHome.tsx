import { Link } from 'react-router-dom'
import { JsonLd } from '../seo/JsonLd'
import { fituneUrls, withUtm } from '../../config/fitune'
import { FituneNotice } from '../FituneNotice'
import { formatMxn, paquetes } from '../../data/paquetes'
import {
  DAYS_ORDER,
  SINGLE_CLASS_PRICE_MXN,
  classPath,
  classTypes,
  getScheduleLines,
  getTeachersLabel,
  slugForClass,
  thumbOf,
} from '../../lib/clases'

type Row = { time: string; name: string; slug: string }

function buildWeek(): { day: string; rows: Row[] }[] {
  const byDay = new Map<string, Row[]>()
  for (const c of classTypes) {
    for (const { day, slots } of getScheduleLines(c.id)) {
      for (const slot of slots) {
        const rows = byDay.get(day) ?? []
        rows.push({ time: slot.time, name: c.name, slug: slugForClass(c.id) })
        byDay.set(day, rows)
      }
    }
  }
  return DAYS_ORDER.filter((d) => byDay.has(d)).map((day) => ({
    day,
    rows: (byDay.get(day) ?? []).sort((a, b) => a.time.localeCompare(b.time)),
  }))
}

const FAQ: { q: string; a: string }[] = [
  {
    q: '¿Dónde está el estudio?',
    a: 'En Londres 105, colonia Del Carmen, Coyoacán, CDMX, a unos pasos del Museo Frida Kahlo. El estudio comparte entrada con galería, cafetería y coworking; el salón de clases está al fondo del inmueble.',
  },
  {
    q: '¿Qué clases hay en Estudio Popnest?',
    a: 'Pilates mat, Hatha Yoga, Power Yoga, Tai Chi, Sound Healing (sound bath), Belly Dance y Stretching, todas de 60 minutos. Además, un Run Club gratuito los miércoles y sábados.',
  },
  {
    q: '¿Cuánto cuesta una clase?',
    a: `La clase suelta cuesta ${formatMxn(SINGLE_CLASS_PRICE_MXN)} MXN. Hay paquetes desde $550 MXN por 3 clases, paquetes de 4 a 20 clases y un plan ilimitado mensual de $1,800 MXN.`,
  },
  {
    q: '¿Necesito experiencia previa?',
    a: 'No. Las clases son para todos los niveles y principiantes: las coaches dan opciones para cada cuerpo y los grupos son reducidos, así que hay atención y correcciones personalizadas.',
  },
  {
    q: '¿Qué tipo de Pilates dan: mat o reformer?',
    a: 'Pilates mat, en colchoneta y sin máquinas reformer, enfocado en core, postura y control del movimiento, en grupos reducidos.',
  },
  {
    q: '¿Qué debo llevar?',
    a: 'Ropa cómoda y tu propio mat de yoga para Pilates, Yoga y Stretching; para Sound Healing, mat y una cobija.',
  },
  {
    q: '¿Cómo reservo una clase?',
    a: 'Elige tu clase en el horario y reserva en Fitune, la plataforma de reservas del estudio. También puedes comprar un paquete para ahorrar por clase.',
  },
  {
    q: '¿Dudas sobre reservas, paquetes o pagos?',
    a: 'Escríbenos a info@estudiopopnest.com o por WhatsApp al +52 55 5437 9644.',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

const btnPrimary =
  'inline-flex rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary'
const btnGhost =
  'inline-flex rounded-md border border-primary px-6 py-3 font-body font-semibold text-primary transition-colors hover:bg-primary/5'

export function WellnessHome() {
  const week = buildWeek()
  return (
    <div id="wellness" className="scroll-mt-20">
      <JsonLd data={FAQ_SCHEMA} />

      {/* Intro */}
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
            Wellness
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            Tu pausa diaria en Coyoacán
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white/90">
            Pilates, yoga, tai chi, sound healing, belly dance y stretching. Sesiones de 60 minutos
            en grupos reducidos, en el mismo lugar que el coworking.
          </p>
        </div>
      </section>

      {/* Clases */}
      <section className="bg-cream py-16" aria-labelledby="home-clases">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <h2 id="home-clases" className="font-heading text-[30px] font-bold leading-[1.4] text-primary">
            Elige tu práctica
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {classTypes.map((c) => (
              <li key={c.id}>
                <Link
                  to={classPath(slugForClass(c.id))}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-cream-border bg-cream-elevated transition-colors hover:border-primary"
                >
                  {c.photo ? (
                    <img
                      src={thumbOf(c.photo)}
                      alt={`Clase de ${c.name} en Estudio Popnest, Coyoacán`}
                      width={320}
                      height={240}
                      loading="lazy"
                      className="h-40 w-full object-cover object-[50%_60%]"
                    />
                  ) : (
                    <img
                      src={c.image}
                      alt={`Clase de ${c.name} en Coyoacán, Estudio Popnest`}
                      width={320}
                      height={240}
                      loading="lazy"
                      className="h-40 w-full bg-cream-secondary object-contain p-4"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold text-ink">{c.name}</h3>
                    <p className="mt-1 font-body text-sm text-body">
                      {getTeachersLabel(c.id)} · {c.duration} min
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link to="/classes" className={btnGhost}>
              Ver todas las clases
            </Link>
          </div>
        </div>
      </section>

      {/* Horario */}
      <section className="bg-cream-secondary py-16" aria-labelledby="home-horario">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <h2 id="home-horario" className="font-heading text-[30px] font-bold leading-[1.4] text-primary">
            Horario semanal
          </h2>
          <p className="mt-2 max-w-2xl font-body text-body">
            Vista rápida del programa habitual. Para ver cupo y reservar, abre Fitune.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {week.map(({ day, rows }) => (
              <div key={day} className="rounded-xl border border-cream-border bg-cream-elevated">
                <h3 className="border-b border-cream-border px-3 py-2 font-heading text-base font-semibold text-primary">
                  {day}
                </h3>
                <ul className="space-y-2 p-3 font-body text-sm">
                  {rows.map((r) => (
                    <li key={`${r.slug}-${r.time}`}>
                      <span className="font-semibold text-ink">{r.time}</span>
                      <br />
                      <Link to={classPath(r.slug)} className="text-primary hover:underline">
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={withUtm(fituneUrls.schedule, 'home-horario')} rel="noopener" className={btnPrimary}>
              Reservar en Fitune
            </a>
            <Link to="/horario" className={btnGhost}>
              Ver horario completo
            </Link>
          </div>
          <FituneNotice campaign="home-horario-aviso" className="mt-4" />
        </div>
      </section>

      {/* Paquetes */}
      <section className="bg-cream py-16" aria-labelledby="home-paquetes">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <h2 id="home-paquetes" className="font-heading text-[30px] font-bold leading-[1.4] text-primary">
            Paquetes de clases
          </h2>
          <p className="mt-2 max-w-2xl font-body text-body">
            Ahorra comprando varias sesiones. Clase suelta {formatMxn(SINGLE_CLASS_PRICE_MXN)} MXN.
            Úsalas en cualquier práctica del estudio.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paquetes.map((p) => (
              <li
                key={p.name}
                className={`flex flex-col rounded-xl border bg-cream-elevated p-5 ${p.popular ? 'border-primary' : 'border-cream-border'}`}
              >
                {p.popular && (
                  <span className="mb-2 w-fit rounded-full bg-primary px-2 py-0.5 font-body text-xs font-semibold text-white">
                    Más popular
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
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <a href={withUtm(fituneUrls.pricing, 'home-paquetes')} rel="noopener" className={btnPrimary}>
              Comprar paquete
            </a>
            <FituneNotice campaign="home-paquetes-aviso" className="mt-4" />
          </div>
        </div>
      </section>

      {/* Filosofía */}
      <section className="bg-cream-secondary py-16" aria-labelledby="home-filosofia">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
          <h2 id="home-filosofia" className="font-heading text-[30px] font-bold leading-[1.4] text-primary">
            Nuestra filosofía
          </h2>
          <p className="mt-4 font-body leading-relaxed text-body">
            Creemos en el bienestar como una pausa honesta: grupos reducidos, coaches presentes y un
            ritmo que respeta al cuerpo. Aquí la práctica importa tanto como el descanso.
          </p>
          <p className="mt-4 font-body leading-relaxed text-body">
            Trabajamos con presencia, silencio compartido y la idea de que cada clase sea un
            momento real para volver a ti, sin prisa, con intención.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 font-body">
            {[
              ['7', 'prácticas distintas'],
              ['60 min', 'por sesión'],
              ['Grupos', 'reducidos'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-heading text-3xl font-bold text-primary">{n}</dt>
                <dd className="mt-1 text-sm text-body">{l}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="mt-8 font-heading text-xl italic text-[#1f2937]">
            Un espacio para el cuerpo, en una ciudad que rara vez le da tiempo.
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16" aria-labelledby="home-faq">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <h2 id="home-faq" className="font-heading text-[30px] font-bold leading-[1.4] text-primary">
            Preguntas frecuentes sobre las clases
          </h2>
          <div className="mt-6 divide-y divide-cream-border rounded-xl border border-cream-border bg-cream-elevated">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group px-5 py-4">
                <summary className="cursor-pointer font-heading text-base font-semibold text-ink">
                  {q}
                </summary>
                <p className="mt-2 font-body text-body">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
