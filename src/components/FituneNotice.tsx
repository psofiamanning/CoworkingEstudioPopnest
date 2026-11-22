import { fituneUrls, withUtm } from '../config/fitune'

type Props = {
  campaign: string
  /** Texto del aviso; por defecto, clases. */
  children?: React.ReactNode
  className?: string
}

/** Aviso: reservaciones y compras se hacen en Fitune (con logotipo). */
export function FituneNotice({ campaign, children, className = '' }: Props) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-sm text-body ${className}`}
    >
      <a
        href={withUtm(fituneUrls.schedule, campaign)}
        rel="noopener"
        aria-label="Ir a Fitune"
        className="shrink-0"
      >
        <img
          src="/images/fitune-logo.svg"
          alt="Fitune"
          width={104}
          height={19}
          loading="lazy"
          className="h-5 w-auto"
        />
      </a>
      <span>
        {children ?? 'Las reservaciones y las compras de clases y paquetes se hacen únicamente en Fitune.'}
      </span>
    </p>
  )
}
