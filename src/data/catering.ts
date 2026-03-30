export type CateringPackage = {
  id: string
  title: string
  price: number
  currency: string
  features: string[]
  purchaseUrl: string
  variant: 'light' | 'rose' | 'dark'
}

export const cateringPackages: CateringPackage[] = [
  {
    id: 'basico',
    title: 'Paquete básico',
    price: 210,
    currency: 'MXN',
    features: ['Café y agua', 'Snacks salados', 'Servicio en sala'],
    purchaseUrl: 'https://example.com/catering/basico',
    variant: 'light',
  },
  {
    id: 'equilibrado',
    title: 'Paquete equilibrado',
    price: 230,
    currency: 'MXN',
    features: ['Bebidas calientes', 'Fruta de temporada', 'Opción vegetariana'],
    purchaseUrl: 'https://example.com/catering/equilibrado',
    variant: 'rose',
  },
  {
    id: 'premium',
    title: 'Paquete premium',
    price: 300,
    currency: 'MXN',
    features: ['Menú completo', 'Postre', 'Coordinación con cocina'],
    purchaseUrl: 'https://example.com/catering/premium',
    variant: 'dark',
  },
]
