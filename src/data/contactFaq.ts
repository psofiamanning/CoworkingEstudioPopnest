export type FaqItem = {
  question: string
  answer: string
  /** Si true, la página muestra enlaces a Planes y Salas bajo la respuesta. */
  showPlanLinks?: boolean
}

/** Preguntas frecuentes (contacto / SEO local). Mismo texto en página y JSON-LD. */
export const contactFaq: readonly FaqItem[] = [
  {
    question: '¿Dónde está Estudio Popnest?',
    answer:
      'En Londres 105, Colonia Del Carmen, Coyoacán, Ciudad de México (CP 04100), a pasos del Museo Frida Kahlo. Puedes abrir la ubicación en Google Maps desde el pie de página de este sitio o escribirnos por WhatsApp.',
  },
  {
    question: '¿Cuál es el horario?',
    answer:
      'De lunes a viernes de 9:00 a 19:00 y sábados de 9:00 a 17:00. Domingo cerrado.',
  },
  {
    question: '¿Cómo contrato un plan o reservo una sala?',
    answer:
      'En este sitio encontrarás la sección Planes y membresías y la sección Salas de juntas con detalles y enlaces. Para dudas o acompañamiento, también por WhatsApp o correo electrónico.',
    showPlanLinks: true,
  },
  {
    question: '¿Hay estacionamiento?',
    answer:
      'La zona es muy peatonal. Si vienes en auto, en Coyoacán hay alternativas de estacionamiento; escríbenos por WhatsApp y te orientamos según el día y la hora de tu visita.',
  },
]
