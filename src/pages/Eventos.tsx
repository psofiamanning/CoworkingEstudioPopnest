const heroImg = '/images/espacios/sala-mural-sillas-blancas.png'
const rentaSalonUrl = 'https://popnest.app/renta-salon'

export function Eventos() {
  return (
    <main className="flex flex-col items-center bg-[#fbfbfc] px-4 py-10 md:py-16">
      <a href={rentaSalonUrl} className="block w-full max-w-[1024px]">
        <img
          src={heroImg}
          alt="Salón de eventos de Estudio Popnest"
          className="h-auto w-full rounded-xl shadow-sm"
          width={1024}
          height={768}
        />
      </a>
      <a
        href={rentaSalonUrl}
        className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 font-body font-semibold text-white shadow-sm transition-colors hover:bg-secondary"
      >
        Renta el salón
      </a>
    </main>
  )
}
