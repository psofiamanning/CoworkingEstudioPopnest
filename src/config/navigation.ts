
export type NavItem =
  | { label: string; to: string }
  | { label: string; href: string; external: true }

export const mainNav: NavItem[] = [
  { label: 'Clases', to: '/classes' },
  { label: 'Planes', to: '/planes' },
  { label: 'Salas de juntas', to: '/salas-de-juntas' },
  { label: 'Eventos', to: '/eventos' },
  { label: 'Oficinas', to: '/oficinas-largo-plazo' },
  { label: 'Contacto', to: '/contacto' },
]
