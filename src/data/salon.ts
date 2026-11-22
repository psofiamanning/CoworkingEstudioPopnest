/**
 * Tarifas de renta del Salón Coyote (precio por hora, MXN), copiadas de popnest.app.
 * El cobro real lo calcula el flujo de reserva en línea de popnest.app: si cambian aquí,
 * actualizar también src/config/salonPricing.js en el repositorio de wellness.
 */
export type SalonSlotKey = 'valle' | 'tarde' | 'fin_semana_dia' | 'noche'

export const salonSlots: Record<SalonSlotKey, { label: string; days: string; hours: string }> = {
  valle: { label: 'Mañana', days: 'Lunes a viernes', hours: '9:30 a 16:00' },
  tarde: { label: 'Tarde', days: 'Lunes a viernes', hours: '16:00 a 19:00' },
  fin_semana_dia: { label: 'Fin de semana', days: 'Sábado y domingo', hours: '11:30 a 19:00' },
  noche: { label: 'Noche', days: 'Todos los días', hours: '19:00 a 21:30' },
}

export const salonSlotOrder: SalonSlotKey[] = ['valle', 'tarde', 'fin_semana_dia', 'noche']

export const salonPriceTiers: { people: string; prices: Record<SalonSlotKey, number> }[] = [
  { people: '1 a 2 personas', prices: { valle: 150, tarde: 200, fin_semana_dia: 250, noche: 450 } },
  { people: '3 a 4 personas', prices: { valle: 300, tarde: 300, fin_semana_dia: 350, noche: 500 } },
  { people: '5 a 6 personas', prices: { valle: 450, tarde: 450, fin_semana_dia: 450, noche: 600 } },
  { people: '7 a 8 personas', prices: { valle: 600, tarde: 600, fin_semana_dia: 600, noche: 700 } },
  { people: '9 a 12 personas', prices: { valle: 900, tarde: 900, fin_semana_dia: 900, noche: 900 } },
  { people: '13 a 16 personas', prices: { valle: 1200, tarde: 1200, fin_semana_dia: 1200, noche: 1200 } },
  { people: '17 a 20 personas', prices: { valle: 1500, tarde: 1500, fin_semana_dia: 1500, noche: 1500 } },
]

export const salonExtras = [
  { label: 'Proyector', amount: 300 },
  { label: 'Montaje y desmontaje de mesas y sillas', amount: 300 },
]

export const salonMaxCapacity = 20
export const salonMinHours = 1
export const salonUseCases = [
  'Clases privadas',
  'Talleres',
  'Sesiones de fotos y video',
  'Ensayos',
  'Celebraciones',
  'Juntas y offsites',
]
