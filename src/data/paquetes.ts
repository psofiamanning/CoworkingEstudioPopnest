/** Paquetes vigentes en Fitune (precios en MXN). Verificado en la página de precios el 2026-11-22. */
export interface Paquete {
  name: string
  classes: number | 'ilimitadas'
  price: number
  regularPrice?: number
  validity: string
  note?: string
  popular?: boolean
}

export const paquetes: Paquete[] = [
  { name: 'Descubre Popnest', classes: 3, price: 550, regularPrice: 750, validity: '30 días', note: 'Ideal para nuevos alumnos' },
  { name: 'Paquete de 4 clases', classes: 4, price: 900, regularPrice: 1000, validity: '30 días' },
  { name: 'Paquete de 8 clases', classes: 8, price: 1600, regularPrice: 2000, validity: '30 días' },
  { name: 'Paquete de 10 clases', classes: 10, price: 1900, regularPrice: 2500, validity: '30 días' },
  { name: 'Paquete de 12 clases', classes: 12, price: 2200, regularPrice: 3000, validity: '30 días' },
  { name: 'Paquete de 20 clases', classes: 20, price: 4500, regularPrice: 5000, validity: '2 meses' },
  { name: 'Ilimitado mensual', classes: 'ilimitadas', price: 1800, validity: '30 días', note: 'Todas las disciplinas', popular: true },
  { name: 'Popnest Duo', classes: 8, price: 1750, regularPrice: 2000, validity: '30 días', note: '8 clases para compartir entre dos personas' },
]

export const formatMxn = (n: number) => `$${n.toLocaleString('es-MX')}`
