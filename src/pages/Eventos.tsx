import { useCallback, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { business } from '../config/seo'
import { site } from '../config/site'
import {
  DISPOSICION_OPCIONES,
  EQUIPAMIENTO_ITEMS,
  PRESUPUESTO_OPCIONES,
  TIPOS_EVENTO,
  buildEventoWhatsAppMessage,
  initialEventoForm,
  type EventoInquiryForm,
} from '../lib/eventoInquiryMessage'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const heroImg = '/images/espacios/sala-mural-sillas-blancas.png'

const inputClass =
  'mt-1 w-full rounded-md border border-neutral/80 bg-white px-3 py-2.5 font-body text-sm text-[#1f2937] shadow-sm placeholder:text-[#9ca3af] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25'
const labelClass = 'block font-body text-sm font-semibold text-[#374151]'
const fieldsetClass = 'rounded-xl border border-neutral/60 bg-[#fafafa] p-6 shadow-sm'

function validateEventoForm(f: EventoInquiryForm): string | null {
  if (!f.nombre.trim()) return 'Indica tu nombre completo.'
  if (!f.email.trim()) return 'Indica un correo electrónico.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) return 'Revisa el formato del correo.'
  if (!f.telefono.trim()) return 'Indica un teléfono o WhatsApp de contacto.'
  if (!f.tipoEvento) return 'Selecciona el tipo de actividad.'
  if (!f.tituloTema.trim()) return 'Indica el tema o nombre del evento.'
  if (!f.asistentes.trim()) return 'Indica el número aproximado de asistentes.'
  if (!f.sinFechaDefinida && !f.fechaPrincipal) return 'Indica la fecha preferida o marca “Aún no tengo fecha definida”.'
  return null
}

export function Eventos() {
  const [form, setForm] = useState<EventoInquiryForm>(() => initialEventoForm())
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const update = useCallback(<K extends keyof EventoInquiryForm>(key: K, value: EventoInquiryForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }, [])

  const toggleEquip = useCallback((id: string) => {
    setForm((prev) => ({
      ...prev,
      equipamiento: { ...prev.equipamiento, [id]: !prev.equipamiento[id] },
    }))
    setError(null)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const err = validateEventoForm(form)
    if (err) {
      setError(err)
      return
    }
    const message = buildEventoWhatsAppMessage(form)
    const url = buildWhatsAppUrl(site.whatsappPhoneDigits, message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCopySummary = async () => {
    const err = validateEventoForm(form)
    if (err) {
      setError(err)
      return
    }
    const message = buildEventoWhatsAppMessage(form)
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setError('No se pudo copiar al portapapeles. Intenta desde otro navegador o envía por WhatsApp.')
    }
  }

  const mailtoHref = `mailto:${business.email}?subject=${encodeURIComponent(
    'Solicitud de espacio para evento / taller — Estudio Popnest',
  )}&body=${encodeURIComponent(buildEventoWhatsAppMessage(form))}`

  return (
    <main className="bg-[#fbfbfc] pb-20">
      <section className="relative flex min-h-[min(48vh,400px)] items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />
        <div className="relative z-10 max-w-3xl px-6 py-14 text-center text-white">
          <h1 className="font-heading text-3xl font-bold md:text-4xl">Eventos y talleres</h1>
          <p className="mt-4 font-body text-base leading-relaxed text-white/95 md:text-lg">
            Renta de espacios en Coyoacán para workshops, charlas y encuentros. Completa el
            formulario y te respondemos por WhatsApp con disponibilidad y siguiente paso.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 pt-12 lg:px-12">
        <p className="font-body leading-relaxed text-body">
          Para cotizar de forma útil necesitamos datos típicos que cualquier espacio pide:{' '}
          <strong className="font-semibold text-[#1f2937]">quién eres</strong>,{' '}
          <strong className="font-semibold text-[#1f2937]">qué tipo de actividad</strong> es,{' '}
          <strong className="font-semibold text-[#1f2937]">fechas y horario</strong>,{' '}
          <strong className="font-semibold text-[#1f2937]">aforo</strong>,{' '}
          <strong className="font-semibold text-[#1f2937]">cómo quieres el salón</strong> (mesas,
          teatro, etc.), <strong className="font-semibold text-[#1f2937]">equipamiento</strong>{' '}
          (proyector, sonido, micrófono…), si hay{' '}
          <strong className="font-semibold text-[#1f2937]">catering</strong>, tiempo de montaje y un{' '}
          <strong className="font-semibold text-[#1f2937]">presupuesto orientativo</strong>. Nada de
          esto es compromiso de contratación: nos ayuda a prepararte una propuesta clara.
        </p>
      </div>

      <form
        className="mx-auto max-w-3xl space-y-8 px-6 pb-8 pt-10 lg:px-12"
        onSubmit={handleSubmit}
        noValidate
      >
        {error ? (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-800"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <fieldset className={fieldsetClass}>
          <legend className="font-heading text-lg font-bold text-[#1f2937]">1. Datos de contacto</legend>
          <p className="mt-2 font-body text-sm text-[#6b7280]">
            Quien coordina la reserva y por dónde te escribimos.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="ev-nombre">
                Nombre completo <span className="text-primary">*</span>
              </label>
              <input
                id="ev-nombre"
                className={inputClass}
                value={form.nombre}
                onChange={(e) => update('nombre', e.target.value)}
                autoComplete="name"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="ev-org">
                Organización, marca o colectivo{' '}
                <span className="font-normal text-[#6b7280]">(opcional)</span>
              </label>
              <input
                id="ev-org"
                className={inputClass}
                value={form.organizacion}
                onChange={(e) => update('organizacion', e.target.value)}
                autoComplete="organization"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="ev-email">
                Correo electrónico <span className="text-primary">*</span>
              </label>
              <input
                id="ev-email"
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                autoComplete="email"
                inputMode="email"
                required
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="ev-tel">
                Teléfono / WhatsApp <span className="text-primary">*</span>
              </label>
              <input
                id="ev-tel"
                type="tel"
                className={inputClass}
                value={form.telefono}
                onChange={(e) => update('telefono', e.target.value)}
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="font-heading text-lg font-bold text-[#1f2937]">2. Actividad</legend>
          <div className="mt-6 grid gap-5">
            <div>
              <label className={labelClass} htmlFor="ev-tipo">
                Tipo de actividad <span className="text-primary">*</span>
              </label>
              <select
                id="ev-tipo"
                className={inputClass}
                value={form.tipoEvento}
                onChange={(e) => update('tipoEvento', e.target.value)}
                required
              >
                <option value="">Selecciona…</option>
                {TIPOS_EVENTO.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="ev-titulo">
                Tema o nombre del evento <span className="text-primary">*</span>
              </label>
              <input
                id="ev-titulo"
                className={inputClass}
                value={form.tituloTema}
                onChange={(e) => update('tituloTema', e.target.value)}
                placeholder="Ej. Taller de cerámica, Workshop de UX, Meetup de escritores…"
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="font-heading text-lg font-bold text-[#1f2937]">3. Fecha y horario</legend>
          <div className="mt-6 space-y-5">
            <label className="flex cursor-pointer items-start gap-3 font-body text-sm text-[#374151]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-neutral text-primary focus:ring-primary"
                checked={form.sinFechaDefinida}
                onChange={(e) => update('sinFechaDefinida', e.target.checked)}
              />
              <span>Aún no tengo fecha definida (flexible / por confirmar)</span>
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="ev-fecha1">
                  Fecha preferida {!form.sinFechaDefinida ? <span className="text-primary">*</span> : null}
                </label>
                <input
                  id="ev-fecha1"
                  type="date"
                  className={`${inputClass} ${form.sinFechaDefinida ? 'opacity-60' : ''}`}
                  value={form.fechaPrincipal}
                  onChange={(e) => update('fechaPrincipal', e.target.value)}
                  disabled={form.sinFechaDefinida}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ev-fecha2">
                  Fecha alternativa <span className="font-normal text-[#6b7280]">(opcional)</span>
                </label>
                <input
                  id="ev-fecha2"
                  type="date"
                  className={`${inputClass} ${form.sinFechaDefinida ? 'opacity-60' : ''}`}
                  value={form.fechaAlternativa}
                  onChange={(e) => update('fechaAlternativa', e.target.value)}
                  disabled={form.sinFechaDefinida}
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className={labelClass} htmlFor="ev-ini">
                  Hora de inicio
                </label>
                <input
                  id="ev-ini"
                  type="time"
                  className={inputClass}
                  value={form.horaInicio}
                  onChange={(e) => update('horaInicio', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ev-fin">
                  Hora de término
                </label>
                <input
                  id="ev-fin"
                  type="time"
                  className={inputClass}
                  value={form.horaFin}
                  onChange={(e) => update('horaFin', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ev-dur">
                  Duración (horas){' '}
                  <span className="font-normal text-[#6b7280]">(si prefieres texto)</span>
                </label>
                <input
                  id="ev-dur"
                  className={inputClass}
                  value={form.duracionHoras}
                  onChange={(e) => update('duracionHoras', e.target.value)}
                  placeholder="Ej. 4"
                  inputMode="decimal"
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="font-heading text-lg font-bold text-[#1f2937]">4. Aforo y disposición del espacio</legend>
          <div className="mt-6 grid gap-5">
            <div>
              <label className={labelClass} htmlFor="ev-aforo">
                Asistentes esperados (aprox.) <span className="text-primary">*</span>
              </label>
              <input
                id="ev-aforo"
                className={inputClass}
                value={form.asistentes}
                onChange={(e) => update('asistentes', e.target.value)}
                placeholder="Ej. 25 personas"
                inputMode="numeric"
                required
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="ev-disp">
                Cómo imaginas el salón
              </label>
              <select
                id="ev-disp"
                className={inputClass}
                value={form.disposicion}
                onChange={(e) => update('disposicion', e.target.value)}
              >
                {DISPOSICION_OPCIONES.map((d) => (
                  <option key={d.value || 'empty'} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="font-heading text-lg font-bold text-[#1f2937]">5. Equipamiento</legend>
          <p className="mt-2 font-body text-sm text-[#6b7280]">
            Marca lo que necesitas; si falta algo, descríbelo al final.
          </p>
          <ul className="mt-4 space-y-3">
            {EQUIPAMIENTO_ITEMS.map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer items-start gap-3 font-body text-sm text-[#374151]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-neutral text-primary focus:ring-primary"
                    checked={form.equipamiento[item.id]}
                    onChange={() => toggleEquip(item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="font-heading text-lg font-bold text-[#1f2937]">6. Catering y logística</legend>
          <div className="mt-6 space-y-5">
            <label className="flex cursor-pointer items-start gap-3 font-body text-sm text-[#374151]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-neutral text-primary focus:ring-primary"
                checked={form.necesitaCatering}
                onChange={(e) => update('necesitaCatering', e.target.checked)}
              />
              <span>Necesitamos coffee break, comida o bebidas coordinadas con el espacio</span>
            </label>
            <div>
              <label className={labelClass} htmlFor="ev-cat">
                Detalle de catering{' '}
                <span className="font-normal text-[#6b7280]">(si aplica)</span>
              </label>
              <textarea
                id="ev-cat"
                rows={2}
                className={inputClass}
                value={form.cateringDetalle}
                onChange={(e) => update('cateringDetalle', e.target.value)}
                placeholder="Ej. coffee para 30 personas, menú vegetariano…"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="ev-montaje">
                Tiempo extra para montaje y desmontaje
              </label>
              <input
                id="ev-montaje"
                className={inputClass}
                value={form.tiempoMontaje}
                onChange={(e) => update('tiempoMontaje', e.target.value)}
                placeholder="Ej. 1 h antes para armar mesas, 30 min después para recoger"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="font-heading text-lg font-bold text-[#1f2937]">7. Presupuesto y origen</legend>
          <div className="mt-6 grid gap-5">
            <div>
              <label className={labelClass} htmlFor="ev-pres">
                Presupuesto orientativo (total o por concepto)
              </label>
              <select
                id="ev-pres"
                className={inputClass}
                value={form.presupuesto}
                onChange={(e) => update('presupuesto', e.target.value)}
              >
                {PRESUPUESTO_OPCIONES.map((p) => (
                  <option key={p.value || 'p-empty'} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="ev-como">
                ¿Cómo se enteraron de Estudio Popnest?
              </label>
              <input
                id="ev-como"
                className={inputClass}
                value={form.comoConocieron}
                onChange={(e) => update('comoConocieron', e.target.value)}
                placeholder="Redes, recomendación, Google, pasando por la zona…"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="font-heading text-lg font-bold text-[#1f2937]">8. Accesibilidad y comentarios</legend>
          <div className="mt-6 grid gap-5">
            <div>
              <label className={labelClass} htmlFor="ev-acc">
                Accesibilidad o necesidades especiales
              </label>
              <textarea
                id="ev-acc"
                rows={2}
                className={inputClass}
                value={form.accesibilidad}
                onChange={(e) => update('accesibilidad', e.target.value)}
                placeholder="Ej. silla de ruedas, intérprete, menores acompañados…"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="ev-com">
                Comentarios adicionales
              </label>
              <textarea
                id="ev-com"
                rows={4}
                className={inputClass}
                value={form.comentarios}
                onChange={(e) => update('comentarios', e.target.value)}
                placeholder="Cualquier detalle que debamos saber para tu taller o evento."
              />
            </div>
          </div>
        </fieldset>

        <div className="flex flex-col gap-4 border-t border-neutral/60 pt-8 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 font-body font-semibold text-white shadow-sm transition-colors hover:bg-secondary"
          >
            Enviar solicitud por WhatsApp
          </button>
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center justify-center rounded-md border border-neutral bg-white px-6 py-3.5 font-body font-semibold text-[#374151] transition-colors hover:bg-[#fafafa]"
          >
            {copied ? 'Copiado al portapapeles' : 'Copiar resumen'}
          </button>
          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center font-body text-sm font-semibold text-primary underline hover:no-underline"
          >
            Abrir en correo ({business.email})
          </a>
        </div>
        <p className="font-body text-xs leading-relaxed text-[#6b7280]">
          Al enviar por WhatsApp o correo aceptas que usemos estos datos para contactarte sobre tu
          solicitud. Consulta el{' '}
          <Link to="/privacidad" className="font-semibold text-primary hover:underline">
            aviso de privacidad
          </Link>
          .
        </p>
        <p className="font-body text-sm text-[#6b7280]">
          ¿Solo necesitas una sala por horas sin evento complejo?{' '}
          <Link to="/salas-de-juntas" className="font-semibold text-primary hover:underline">
            Ver salas de juntas
          </Link>
        </p>
      </form>
    </main>
  )
}
