import { joinMessageLines } from './whatsapp'

/** Opciones de tipo de actividad (valor → etiqueta legible). */
export const TIPOS_EVENTO = [
  { value: 'taller', label: 'Taller práctico' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'charla', label: 'Charla o conferencia' },
  { value: 'networking', label: 'Networking / meetup' },
  { value: 'curso', label: 'Curso (varias sesiones)' },
  { value: 'presentacion', label: 'Presentación o lanzamiento' },
  { value: 'otro', label: 'Otro' },
] as const

export const DISPOSICION_OPCIONES = [
  { value: '', label: 'Selecciona…' },
  { value: 'teatro', label: 'Auditorio / sillas frente a frente (estilo teatro)' },
  { value: 'escuela', label: 'Mesas tipo escuela (filas)' },
  { value: 'u', label: 'Mesas en U o herradura' },
  { value: 'redondas', label: 'Mesas redondas o islas de trabajo' },
  { value: 'mixto', label: 'Mixto (presentación + trabajo en grupo)' },
  { value: 'libre', label: 'Espacio abierto / poco mobiliario' },
  { value: 'no_seguro', label: 'Aún no lo definimos — necesitamos asesoría' },
] as const

export const PRESUPUESTO_OPCIONES = [
  { value: '', label: 'Selecciona un rango orientativo…' },
  { value: 'menos15', label: 'Menos de $15,000 MXN' },
  { value: '15-30', label: '$15,000 – $30,000 MXN' },
  { value: '30-60', label: '$30,000 – $60,000 MXN' },
  { value: '60-100', label: '$60,000 – $100,000 MXN' },
  { value: 'mas100', label: 'Más de $100,000 MXN' },
  { value: 'definir', label: 'Prefiero definirlo en llamada o visita' },
] as const

export const EQUIPAMIENTO_ITEMS = [
  { id: 'proyector', label: 'Proyector o pantalla grande' },
  { id: 'sonido', label: 'Sistema de sonido / bocinas' },
  { id: 'microfono', label: 'Micrófono (inalámbrico o de mano)' },
  { id: 'pizarra', label: 'Pizarra acrílica o flip chart' },
  { id: 'videollamada', label: 'Equipamiento para videollamada híbrida' },
  { id: 'iluminacion', label: 'Iluminación especial (presentación o foto)' },
] as const

export type EventoInquiryForm = {
  nombre: string
  organizacion: string
  email: string
  telefono: string
  tipoEvento: string
  tituloTema: string
  fechaPrincipal: string
  fechaAlternativa: string
  sinFechaDefinida: boolean
  horaInicio: string
  horaFin: string
  duracionHoras: string
  asistentes: string
  disposicion: string
  equipamiento: Record<string, boolean>
  necesitaCatering: boolean
  cateringDetalle: string
  tiempoMontaje: string
  presupuesto: string
  accesibilidad: string
  comoConocieron: string
  comentarios: string
}

export function initialEventoForm(): EventoInquiryForm {
  const equipamiento: Record<string, boolean> = {}
  for (const item of EQUIPAMIENTO_ITEMS) {
    equipamiento[item.id] = false
  }
  return {
    nombre: '',
    organizacion: '',
    email: '',
    telefono: '',
    tipoEvento: '',
    tituloTema: '',
    fechaPrincipal: '',
    fechaAlternativa: '',
    sinFechaDefinida: false,
    horaInicio: '',
    horaFin: '',
    duracionHoras: '',
    asistentes: '',
    disposicion: '',
    equipamiento,
    necesitaCatering: false,
    cateringDetalle: '',
    tiempoMontaje: '',
    presupuesto: '',
    accesibilidad: '',
    comoConocieron: '',
    comentarios: '',
  }
}

export function buildEventoWhatsAppMessage(f: EventoInquiryForm): string {
  const tipoLabel = TIPOS_EVENTO.find((t) => t.value === f.tipoEvento)?.label ?? f.tipoEvento
  const disposicionLabel = DISPOSICION_OPCIONES.filter((d) => d.value).find(
    (d) => d.value === f.disposicion,
  )?.label
  const presupuestoLabel = PRESUPUESTO_OPCIONES.filter((p) => p.value).find(
    (p) => p.value === f.presupuesto,
  )?.label

  const equipSel = EQUIPAMIENTO_ITEMS.filter((item) => f.equipamiento[item.id])
    .map((item) => item.label)
    .join(', ')

  return joinMessageLines([
    '📅 *Solicitud de espacio para evento / taller — Estudio Popnest*',
    '',
    '*Contacto*',
    `Nombre: ${f.nombre}`,
    f.organizacion && `Organización o colectivo: ${f.organizacion}`,
    `Correo: ${f.email}`,
    `Teléfono / WhatsApp: ${f.telefono}`,
    '',
    '*Actividad*',
    `Tipo: ${tipoLabel || '—'}`,
    `Tema o nombre del evento: ${f.tituloTema}`,
    '',
    '*Fecha y horario*',
    f.sinFechaDefinida
      ? 'Fecha: aún por definir / flexible'
      : `Fecha preferida: ${f.fechaPrincipal || '—'}`,
    !f.sinFechaDefinida && f.fechaAlternativa
      ? `Fecha alternativa: ${f.fechaAlternativa}`
      : undefined,
    f.horaInicio || f.horaFin
      ? `Horario: ${f.horaInicio || '?'} – ${f.horaFin || '?'}`
      : undefined,
    f.duracionHoras && `Duración estimada (horas): ${f.duracionHoras}`,
    '',
    '*Aforo y espacio*',
    `Asistentes esperados (aprox.): ${f.asistentes}`,
    disposicionLabel && `Disposición deseada: ${disposicionLabel}`,
    '',
    '*Equipamiento*',
    equipSel ? equipSel : 'Sin requisitos especiales indicados',
    '',
    '*Catering*',
    f.necesitaCatering
      ? `Sí — ${f.cateringDetalle || 'detallar por mensaje'}`
      : 'No solicitado por ahora',
    '',
    '*Logística*',
    f.tiempoMontaje && `Tiempo extra para montaje / desmontaje: ${f.tiempoMontaje}`,
    '',
    '*Presupuesto orientativo*',
    presupuestoLabel || '—',
    '',
    '*Accesibilidad o necesidades especiales*',
    f.accesibilidad || 'Ninguna indicada',
    '',
    '*¿Cómo nos conocieron?*',
    f.comoConocieron || '—',
    '',
    '*Comentarios adicionales*',
    f.comentarios || '—',
  ])
}
