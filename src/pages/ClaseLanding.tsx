import { Link, Navigate, useParams } from 'react-router-dom'
import { JsonLd } from '../components/seo/JsonLd'
import { fituneUrls, withUtm } from '../config/fitune'
import { site } from '../config/site'
import {
  SINGLE_CLASS_PRICE_MXN,
  classPath,
  classTypes,
  getClassBySlug,
  getFaqs,
  getH1,
  getScheduleLines,
  getTeacherProfiles,
  getTeachersLabel,
  slugForClass,
} from '../lib/clases'
import { buildBreadcrumb, buildCourseSchema, buildFaqSchema } from '../lib/schema'
import { buildWhatsAppUrl } from '../lib/whatsapp'

export function ClaseLanding() {
  const { slug } = useParams<{ slug: string }>()
  const clase = getClassBySlug(slug)
  if (!clase || !slug) return <Navigate to="/404" replace />

  const faqs = getFaqs(clase.id)
  const schedule = getScheduleLines(clase.id)
  const teachers = getTeacherProfiles(clase.id)
  const paragraphs = clase.fullDescription
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)
  const reserveHref = withUtm(fituneUrls.schedule, slug)
  const waHref = buildWhatsAppUrl(
    site.whatsappPhoneDigits,
    `Hola Estudio Popnest, quiero información sobre la clase de ${clase.name}`,
  )
  const faqSchema = buildFaqSchema(clase.id)
  const others = classTypes.filter((c) => c.id !== clase.id)

  return (
    <main className="bg-cream">
      <JsonLd data={buildBreadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Clases', path: '/classes' },
          { name: clase.name, path: classPath(slug) },
        ])} />
      <JsonLd data={buildCourseSchema(clase.id)} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-12 lg:px-12">
        <nav aria-label="Migas de pan" className="font-body text-sm text-[#6b7280]">
          <Link to="/" className="hover:text-primary">
            Inicio
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <Link to="/classes" className="hover:text-primary">
            Clases
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span aria-current="page">{clase.name}</span>
        </nav>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <img
            src={clase.image}
            alt={`Clase de ${clase.name} en Coyoacán — Estudio Popnest`}
            width={160}
            height={160}
            className="h-32 w-32 shrink-0 rounded-2xl bg-cream-secondary object-contain p-3 md:h-40 md:w-40"
          />
          <div>
            <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">
              {getH1(clase.id)}
            </h1>
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-body md:text-lg">
              {clase.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={reserveHref}
                className="inline-flex rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
                rel="noopener"
              >
                Reservar clase
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md border border-primary px-6 py-3 font-body font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Preguntar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {clase.photo && (
        <section className="mx-auto max-w-5xl px-6 pb-10 lg:px-12" aria-label={`Así se vive la clase de ${clase.name}`}>
          <figure className="overflow-hidden rounded-2xl">
            <img
              src={clase.photo}
              alt={`Alumnas y coach en clase de ${clase.name} en Estudio Popnest, Coyoacán`}
              width={1200}
              height={800}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover object-[50%_65%]"
            />
          </figure>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 pb-12 lg:px-12">
        <dl className="grid gap-4 rounded-xl border border-cream-border bg-cream-elevated p-6 font-body text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-[#6b7280]">Duración</dt>
            <dd className="mt-1 font-semibold text-ink">{clase.duration} minutos</dd>
          </div>
          <div>
            <dt className="text-[#6b7280]">Coach</dt>
            <dd className="mt-1 font-semibold text-ink">{getTeachersLabel(clase.id)}</dd>
          </div>
          <div>
            <dt className="text-[#6b7280]">Clase suelta</dt>
            <dd className="mt-1 font-semibold text-ink">${SINGLE_CLASS_PRICE_MXN} MXN</dd>
          </div>
          <div>
            <dt className="text-[#6b7280]">Dónde</dt>
            <dd className="mt-1 font-semibold text-ink">Londres 105, Del Carmen, Coyoacán</dd>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12 lg:px-12">
        <h2 className="font-heading text-2xl font-bold text-primary">
          Sobre la clase de {clase.name}
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 font-body leading-relaxed text-body">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {clase.whatToBring && clase.whatToBring.length > 0 && (
          <p className="mt-6 max-w-3xl font-body text-body">
            <span className="font-semibold text-ink">Qué llevar:</span>{' '}
            {clase.whatToBring.join(' y ')}.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12 lg:px-12">
        <h2 className="font-heading text-2xl font-bold text-primary">
          Horario de {clase.name} en Coyoacán
        </h2>
        <ul className="mt-4 divide-y divide-cream-border rounded-xl border border-cream-border bg-cream-elevated font-body">
          {schedule.map(({ day, slots }) => (
            <li key={day} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3">
              <span className="font-semibold text-ink">{day}</span>
              <span className="text-body">
                {slots
                  .map((s) => (s.teacher ? `${s.time} h (con ${s.teacher})` : `${s.time} h`))
                  .join(' · ')}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-body text-sm text-[#6b7280]">
          Los horarios pueden cambiar. Consulta fechas y cupo en{' '}
          <a href={reserveHref} className="text-primary underline" rel="noopener">
            Fitune
          </a>{' '}
          o en el <Link to="/horario" className="text-primary underline">horario semanal</Link>.
        </p>
      </section>

      {teachers.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-12 lg:px-12">
          <h2 className="font-heading text-2xl font-bold text-primary">
            {teachers.length > 1 ? 'Tus coaches' : 'Tu coach'}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {teachers.map((t) => (
              <article key={t.id} className="flex gap-4 rounded-xl border border-cream-border bg-cream-elevated p-5">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={`${t.name}, coach en Estudio Popnest`}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="h-24 w-24 shrink-0 rounded-full object-cover object-top"
                  />
                ) : (
                  <div
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-quaternary/40 font-heading text-xl font-bold text-primary"
                    aria-hidden
                  >
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">{t.name}</h3>
                  <p className="font-body text-sm text-primary">{t.specialty}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-body">{t.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-12 lg:px-12">
          <h2 className="font-heading text-2xl font-bold text-primary">Preguntas frecuentes</h2>
          <dl className="mt-4 space-y-5 font-body">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-ink">{q}</dt>
                <dd className="mt-1 leading-relaxed text-body">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="border-t border-cream-border bg-cream-secondary py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <h2 className="font-heading text-2xl font-bold text-primary">Otras clases en Coyoacán</h2>
          <ul className="mt-4 flex flex-wrap gap-3 font-body">
            {others.map((c) => (
              <li key={c.id}>
                <Link
                  to={classPath(slugForClass(c.id))}
                  className="inline-flex rounded-full border border-cream-border bg-cream-elevated px-4 py-2 text-sm text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-body text-sm text-body">
            Estudio Popnest está en Londres 105, col. Del Carmen, Coyoacán, a pocos pasos del Museo
            Frida Kahlo. <Link to="/contacto" className="text-primary underline">Cómo llegar</Link>.
          </p>
        </div>
      </section>
    </main>
  )
}

