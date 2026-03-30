import type { ReactNode } from 'react'
import { buildWhatsAppUrl, joinMessageLines } from '../lib/whatsapp'
import { site } from '../config/site'

type Field = { label: string; value: string }

type Props = {
  /** Si no se pasa, usa el número de `site` / `VITE_WHATSAPP_PHONE`. */
  phoneDigits?: string
  /** Líneas del mensaje (se filtran vacías). */
  messageLines: Field[]
  intro?: string
  outro?: string
  className?: string
  children: ReactNode
}

/**
 * Enlace que abre WhatsApp con el texto armado desde los campos del formulario.
 * Sin backend: el usuario confirma el envío en la app de WhatsApp.
 */
export function WhatsAppPrefillLink({
  phoneDigits = site.whatsappPhoneDigits,
  messageLines,
  intro = 'Hola Estudio Popnest,',
  outro = '— Enviado desde la web',
  className,
  children,
}: Props) {
  const body = joinMessageLines([
    intro,
    '',
    ...messageLines
      .filter((f) => f.value.trim().length > 0)
      .map((f) => `${f.label}: ${f.value.trim()}`),
    '',
    outro,
  ])

  const href = buildWhatsAppUrl(phoneDigits, body)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}
