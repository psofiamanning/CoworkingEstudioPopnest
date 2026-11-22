import {
  classSchedules,
  classTypes,
  landingFaq,
  landingH1,
  landingInstructors,
  landingSeoDescription,
  landingSeoTitle,
  slugToClass,
  teachers,
} from '../data/clases'
import type { ClassId, ClassType, Faq, Teacher } from '../data/clases'

/** Precio de una clase suelta (MXN). Los paquetes se consultan en Fitune. */
export const SINGLE_CLASS_PRICE_MXN = 250

export const DAYS_ORDER = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export const classSlugs = Object.keys(slugToClass)

export function classPath(slug: string): string {
  return `/clases/${slug}`
}

export function slugForClass(id: ClassId): string {
  return Object.entries(slugToClass).find(([, classId]) => classId === id)?.[0] ?? ''
}

export function getClassBySlug(slug: string | undefined): ClassType | null {
  if (!slug) return null
  const id = slugToClass[slug]
  return classTypes.find((c) => c.id === id) ?? null
}

export type SlotLine = { time: string; teacher?: string }
export type DayLine = { day: string; slots: SlotLine[] }

/** Horario por día, con la coach de cada horario cuando difiere de la titular. */
export function getScheduleLines(classId: ClassId): DayLine[] {
  const schedule = classSchedules[classId]
  return schedule.days.map((day) => {
    const times = schedule.timesByDay?.[day] ?? schedule.times
    return {
      day,
      slots: times.map((time) => ({
        time,
        teacher: schedule.teachersByDayTime?.[day]?.[time],
      })),
    }
  })
}

/** "Lunes 08:30 · Martes 09:30, 19:30 · …" */
export function getScheduleSummary(classId: ClassId): string {
  return getScheduleLines(classId)
    .map(({ day, slots }) => `${day} ${slots.map((s) => s.time).join(', ')}`)
    .join(' · ')
}

export function getTeacherNames(classId: ClassId): string[] {
  const base = classTypes.find((c) => c.id === classId)?.teacher
  const overrides = Object.values(classSchedules[classId].teachersByDayTime ?? {}).flatMap(
    (byTime) => Object.values(byTime),
  )
  return [...new Set([base, ...overrides].filter((n): n is string => Boolean(n)))]
}

export function getTeachersLabel(classId: ClassId): string {
  const names = getTeacherNames(classId)
  return names.length > 1
    ? `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`
    : (names[0] ?? '')
}

export function getTeacherProfiles(classId: ClassId): Teacher[] {
  return getTeacherNames(classId)
    .map((name) => teachers.find((t) => t.name === name))
    .filter((t): t is Teacher => Boolean(t))
}

export function getFaqs(classId: ClassId): Faq[] {
  return landingFaq[classId] ?? []
}

export function getH1(classId: ClassId): string {
  return landingH1[classId]
}

export function getInstructors(classId: ClassId): string[] {
  return landingInstructors[classId] ?? []
}

export function getClassSeo(slug: string): { title: string; description: string } | null {
  const id = slugToClass[slug]
  if (!id) return null
  return { title: landingSeoTitle[id], description: landingSeoDescription[id] }
}

/** Prioridad SEO: Pilates mat primero; el resto se reordena según demanda en Coyoacán. */
const SEO_PRIORITY: string[] = ['pilates']
const orderedClassTypes = [...classTypes].sort((a, b) => {
  const ia = SEO_PRIORITY.indexOf(String(a.id))
  const ib = SEO_PRIORITY.indexOf(String(b.id))
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
})
export { orderedClassTypes as classTypes }
export type { ClassId, ClassType }

/** Miniatura ligera (≈640 px) de la foto de una clase, para tarjetas. */
export function thumbOf(photo: string): string {
  return photo.replace('-clase.webp', '-clase-thumb.webp')
}
