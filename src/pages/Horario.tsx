import { Link } from 'react-router-dom'
import { JsonLd } from '../components/seo/JsonLd'
import { fituneUrls, withUtm } from '../config/fitune'
import { DAYS_ORDER, classPath, classTypes, getScheduleLines, slugForClass } from '../lib/clases'
import { buildBreadcrumb } from '../lib/schema'

type Row = { time: string; classId: string; name: string; slug: string; teacher: string }

function buildWeek(): { day: string; rows: Row[] }[] {
  const byDay = new Map<string, Row[]>()
  for (const c of classTypes) {
    for (const { day, slots } of getScheduleLines(c.id)) {
      for (const slot of slots) {
        const rows = byDay.get(day) ?? []
        rows.push({
          time: slot.time,
          classId: c.id,
          name: c.name,
          slug: slugForClass(c.id),
          teacher: slot.teacher ?? c.teacher,
        })
        byDay.set(day, rows)
      }
    }
  }
  return DAYS_ORDER.filter((d) => byDay.has(d)).map((day) => ({
    day,
    rows: (byDay.get(day) ?? []).sort((a, b) => a.time.localeCompare(b.time)),
  }))
}

export function Horario() {
  const week = buildWeek()
  return (
    <main className="bg-[#fbfbfc]">
      <JsonLd
        data={buildBreadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Horario', path: '/horario' },
        ])}
      />

      <section className="mx-auto max-w-5xl px-6 pb-8 pt-14 lg:px-12">
        <h1 className="font-heading text-3xl font-bold text-[#111827] md:text-4xl">
          Horario de clases en Coyoacán
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-body md:text-lg">
          Horario semanal habitual de Estudio Popnest (Londres 105, Del Carmen). Cada clase dura 60
          minutos. Para ver cupo y reservar, abre Fitune.
        </p>
        <a
          href={withUtm(fituneUrls.schedule, 'horario')}
          rel="noopener"
          className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-secondary"
        >
          Reservar en Fitune
        </a>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-12">
        <div className="space-y-6">
          {week.map(({ day, rows }) => (
            <div key={day} className="rounded-xl border border-neutral bg-white">
              <h2 className="border-b border-neutral px-5 py-3 font-heading text-lg font-semibold text-primary">
                {day}
              </h2>
              <ul className="divide-y divide-neutral font-body">
                {rows.map((r) => (
                  <li
                    key={`${r.classId}-${r.time}`}
                    className="flex flex-wrap items-center justify-between gap-2 px-5 py-3"
                  >
                    <span className="font-semibold text-[#111827]">{r.time} h</span>
                    <Link to={classPath(r.slug)} className="text-primary hover:underline">
                      {r.name}
                    </Link>
                    <span className="text-sm text-body">{r.teacher}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 font-body text-sm text-[#6b7280]">
          Los horarios pueden cambiar; la reserva en Fitune siempre muestra la disponibilidad real.
        </p>
      </section>
    </main>
  )
}
