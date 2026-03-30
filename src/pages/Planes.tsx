import type { ReactNode } from 'react'
import { plans } from '../data/plans'
import type { PlanItem } from '../data/plans'

function PlanShortNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border border-neutral/80 bg-[#f8f9fb] px-4 py-3.5 text-sm leading-relaxed text-[#4b5563]">
      {children}
    </div>
  )
}

function PlanDescriptionBody({ plan }: { plan: PlanItem }) {
  if (plan.detail) {
    const d = plan.detail
    return (
      <div className="mt-8 space-y-6">
        <p className="font-heading text-xl font-semibold leading-snug text-[#111827] md:text-2xl">
          {d.tagline}
        </p>
        <div className="space-y-4 text-[0.9375rem] leading-relaxed text-[#374151]">
          {d.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
          <h4 className="font-heading text-base font-semibold tracking-tight text-primary">
            {d.includesHeading ?? 'Incluye'}
          </h4>
          <ul className="mt-4 space-y-3 font-body text-[0.9375rem] leading-relaxed text-[#374151]">
            {d.includes.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (!plan.description) return null

  return (
    <p className="mt-4 whitespace-pre-line leading-relaxed">{plan.description}</p>
  )
}

function ComprarLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 rounded-full bg-secondary px-5 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-primary"
    >
      Comprar
    </a>
  )
}

function PlanMedia({ plan }: { plan: PlanItem }) {
  if (plan.videoSrc) {
    return (
      <div className="mb-4 overflow-hidden rounded-md bg-black">
        <video
          className="aspect-[4/3] w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={plan.poster}
          aria-label={`Video: ${plan.title}`}
        >
          <source src={plan.videoSrc} type="video/mp4" />
          Tu navegador no reproduce video embebido; descarga el archivo o prueba otro navegador.
        </video>
      </div>
    )
  }

  if (plan.image) {
    return (
      <div className="mb-4 overflow-hidden rounded-md">
        <img
          src={plan.image}
          alt=""
          className="aspect-[4/3] w-full object-cover"
          width={800}
          height={600}
        />
      </div>
    )
  }

  return null
}

function PlanBlockWithMedia({ plan }: { plan: PlanItem }) {
  return (
    <article className="font-body text-body">
      <PlanMedia plan={plan} />
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg font-semibold text-[#1f2937]">{plan.title}</h3>
          <p className="mt-1 text-sm text-[#6b7280]">{plan.priceLine}</p>
        </div>
        <ComprarLink href={plan.purchaseUrl} />
      </div>
      {plan.shortNote ? <PlanShortNote>{plan.shortNote}</PlanShortNote> : null}
      <PlanDescriptionBody plan={plan} />
      {plan.schedule ? (
        <p className="mt-4 font-semibold text-[#1f2937]">{plan.schedule}</p>
      ) : null}
    </article>
  )
}

function PlanRowCompact({ plan }: { plan: PlanItem }) {
  return (
    <article className="border-b border-neutral pb-6 font-body text-body last:border-0 last:pb-0">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg font-semibold text-[#1f2937]">{plan.title}</h3>
          <p className="mt-1 text-sm text-[#6b7280]">{plan.priceLine}</p>
        </div>
        <ComprarLink href={plan.purchaseUrl} />
      </div>
      <p className="mt-4 whitespace-pre-line leading-relaxed">{plan.description}</p>
    </article>
  )
}

export function Planes() {
  const paseDia = plans.find((p) => p.id === 'pase-dia')
  const mensual = plans.find((p) => p.id === 'plan-mensual')
  const paquetes = plans.filter((p) => p.id === 'paquete-5' || p.id === 'paquete-10')

  if (!paseDia || !mensual) return null

  return (
    <main className="bg-white pb-20">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-12">
        <h1 className="font-heading text-[30px] font-bold leading-[1.4] text-[#1f2937] md:text-4xl">
          Planes y Paquetes
        </h1>
        <p className="mt-4 max-w-2xl font-body text-body">
          En Estudio Popnest, Coyoacán, elige tu acceso: pase por día, plan mensual o paquetes de
          días flexibles. Cada opción incluye detalle y enlace para completar tu compra o reserva.
        </p>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <PlanBlockWithMedia plan={paseDia} />
          </div>
          <div className="space-y-12">
            <PlanBlockWithMedia plan={mensual} />
            <div className="space-y-8">
              {paquetes.map((p) => (
                <PlanRowCompact key={p.id} plan={p} />
              ))}
            </div>
            <p className="font-body text-sm leading-relaxed text-[#6b7280]">
              Los paquetes de 5 y 10 días están pensados para distribuir tus visitas a lo largo
              del mes según tu ritmo de trabajo.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
