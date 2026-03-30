import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <main className="bg-white pb-24 pt-16">
      <div className="mx-auto max-w-lg px-6 text-center">
        <p className="font-heading text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 font-heading text-2xl text-[#1f2937]">Página no encontrada</h1>
        <p className="mt-4 font-body text-body">
          La ruta no existe o fue movida.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 font-body font-semibold text-white hover:bg-secondary"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
