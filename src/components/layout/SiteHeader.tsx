import { Link, NavLink } from 'react-router-dom'
import { mainNav } from '../../config/navigation'
import type { NavItem } from '../../config/navigation'

function navClassName(isActive: boolean) {
  return [
    'font-body text-base font-medium antialiased transition-colors',
    isActive ? 'text-primary' : 'text-[#111827] hover:text-primary',
  ].join(' ')
}

function NavItemView({ item }: { item: NavItem }) {
  if ('to' in item) {
    return (
      <NavLink to={item.to} className={({ isActive }) => navClassName(isActive)}>
        {item.label}
      </NavLink>
    )
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-body text-base font-medium antialiased text-[#111827] transition-colors hover:text-primary"
    >
      {item.label}
    </a>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="Estudio Popnest — inicio"
        >
          <img
            src="/favicon.svg"
            alt=""
            width={48}
            height={46}
            className="h-10 w-auto object-contain object-left"
            decoding="async"
          />
        </Link>
        <nav
          className="flex max-w-[70%] flex-wrap items-center justify-end gap-x-3 gap-y-2 sm:gap-x-6 md:max-w-none md:gap-8"
          aria-label="Principal"
        >
          {mainNav.map((item) => (
            <NavItemView key={item.label} item={item} />
          ))}
        </nav>
      </div>
    </header>
  )
}
