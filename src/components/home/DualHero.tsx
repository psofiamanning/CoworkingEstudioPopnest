import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { fituneUrls, withUtm } from '../../config/fitune'

const VIDEO_SRC = '/videos/hero-classes.mp4'
const VIDEO_POSTER = '/videos/hero-classes-poster.webp'
const COWORKING_IMG = '/images/home/hero-sala.png'

/**
 * El video sale con preload="none": se ve el póster y el video arranca después de la carga
 * (en móvil con retraso), salvo ahorro de datos, red lenta o movimiento reducido.
 */
function useDeferredVideo(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current
    if (!video) return undefined
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }).connection
    const slow = ['slow-2g', '2g', '3g'].includes(conn?.effectiveType ?? '')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (conn?.saveData === true || slow || reduced) return undefined

    const onPlaying = () => video.classList.remove('opacity-0')
    video.addEventListener('playing', onPlaying, { once: true })
    const start = () => {
      video.preload = 'auto'
      video.play().catch(() => {})
    }
    let timer: number | undefined
    const startLater = () => {
      timer = window.setTimeout(start, 2500)
    }
    if (window.matchMedia('(min-width: 768px)').matches) start()
    else if (document.readyState === 'complete') startLater()
    else window.addEventListener('load', startLater, { once: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', startLater)
      video.removeEventListener('playing', onPlaying)
    }
  }, [ref])
}

export function DualHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useDeferredVideo(videoRef)

  return (
    <>
    <section aria-label="Coworking y clases" className="grid min-h-[min(90vh,820px)] md:grid-cols-2">
      {/* Coworking */}
      <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden">
        <img
          src={COWORKING_IMG}
          alt="Sala de reuniones Estudio Popnest"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div className="relative z-10 max-w-md px-6 py-16 text-center text-white">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            Coworking
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Estudio Popnest
          </h1>
          <p className="mt-3 font-heading text-lg font-medium md:text-xl">
            Privacidad. Diseño. Creatividad.
          </p>
          <p className="mt-5 font-body text-base leading-relaxed text-white/95">
            Coworking en Coyoacán, a pasos del Museo Frida Kahlo: salas de reuniones, áreas
            comunes y cafetería para trabajar solo o con tu equipo.
          </p>
          <Link
            to="/planes"
            className="mt-8 inline-flex rounded-md bg-white px-8 py-3 font-body font-semibold text-[#1f2937] transition-colors hover:bg-quaternary"
          >
            Reservar
          </Link>
        </div>
      </div>

      {/* Wellness */}
      <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-[#2A2D3D]">
        <img
          src={VIDEO_POSTER}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={720}
          height={1280}
          decoding="async"
        />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
          src={VIDEO_SRC}
          width={720}
          height={1280}
          muted
          loop
          playsInline
          preload="none"
          aria-label="Práctica de yoga en Estudio Popnest"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 max-w-md px-6 py-16 text-center text-white">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            Wellness
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Tu pausa diaria en Coyoacán.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-white/95">
            Clases de pilates, yoga, tai chi, sound bath y belly dance para bajar el ritmo, todos
            los días.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={withUtm(fituneUrls.schedule, 'home-hero')}
              rel="noopener"
              className="inline-flex rounded-md bg-white px-8 py-3 font-body font-semibold text-[#1f2937] transition-colors hover:bg-quaternary"
            >
              Reservar una clase
            </a>
            <Link
              to="/classes"
              className="inline-flex rounded-md border border-white px-8 py-3 font-body font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver clases
            </Link>
          </div>
        </div>
      </div>
    </section>
    <nav aria-label="Secciones" className="border-b border-neutral bg-white">
      <div className="mx-auto flex max-w-5xl justify-center gap-8 px-6 py-3 font-body text-sm font-semibold">
        <a href="#coworking" className="text-primary hover:underline">Coworking ↓</a>
        <a href="#wellness" className="text-primary hover:underline">Wellness ↓</a>
      </div>
    </nav>
    </>
  )
}
