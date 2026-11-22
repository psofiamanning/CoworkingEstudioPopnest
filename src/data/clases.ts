/**
 * Clases de Estudio Popnest: contenido, horarios y FAQ de cada práctica.
 * Migrado desde el sitio de wellness (popnest.app). Es la fuente de las páginas /clases/*.
 * Para cambiar un horario o un texto, edita este archivo y vuelve a desplegar.
 */

export type ClassId =
  | 'hatha-yoga' | 'pilates' | 'tai-chi' | 'power-yoga-1' | 'sound-healing' | 'belly-dance' | 'stretching'

export type Teacher = {
  id: number
  name: string
  specialty: string
  image: string | null
  bio: string
  classes: string[]
}

export type ClassType = {
  id: ClassId
  name: string
  teacher: string
  teacherId: number
  duration: number
  description: string
  fullDescription: string
  image: string
  whatToBring?: string[]
}

export type ClassSchedule = {
  days: string[]
  times: string[]
  timesByDay?: Record<string, string[]>
  teachersByDayTime?: Record<string, Record<string, string>>
}

export type Faq = { q: string; a: string }

export const teachers: Teacher[] = [
  {
    "id": 1,
    "name": "Blanca Bear",
    "specialty": "Movimiento y Yoga",
    "image": "/images/clases/blanca-bear.webp",
    "bio": "Coach de movimiento con más de diez años de experiencia y una formación profunda y continua en yoga, tai chi, meditación, pilates y movimiento somático. Su práctica une estructura y sensibilidad, observando con atención, ajustando con cuidado y acompañando cada práctica desde la escucha corporal. Sus clases se sienten contenidas, claras y humanas, invitando al movimiento con presencia, estabilidad y confianza.",
    "classes": [
      "Hatha Yoga",
      "Pilates",
      "Tai Chi"
    ]
  },
  {
    "id": 5,
    "name": "Rocío Enciso",
    "specialty": "Power Yoga · Yoga deportivo",
    "image": "/images/clases/rocio-enciso.webp",
    "bio": "Preparadora física y coach de Hatha Yoga & Fitness con certificación internacional Yoga Alliance (+500 h) y más de quince años de trayectoria. Referente en yoga deportivo: dos veces campeona nacional en México, jefa nacional de entrenadores de la Fundación Mexicana de Yoga y años en el circuito internacional con presencia en el top ten mundial. Formación en Anusara y Vinyasa, Pilates Stott y Total Barre (Akrostudio España), y talleres en pre y postnatal, espalda y rehabilitación. Embajadora oficial de la IYSF.",
    "classes": [
      "Power Yoga",
      "Stretching"
    ]
  },
  {
    "id": 6,
    "name": "Nadia Navarrete",
    "specialty": "Belly Dance Wellness",
    "image": null,
    "bio": "Bailarina y facilitadora de danza árabe con más de 25 años de trayectoria y 22 años impartiendo clases grupales y particulares, presenciales y en línea, en academias, gimnasios, centros culturales y espacios independientes. Fundadora del programa Bellydance Wellness y creadora de Mujeres Inspiración, una comunidad de apoyo y bienestar femenino a través de la danza y el movimiento. Se ha presentado en foros como el Teatro Ana María Hernández, el Teatro Coyoacán y la Feria del Hogar, y participó en la Gala de Clausura Copa Qatar–México 2021 y en proyectos culturales de la UAM y la UNAM. Su formación incluye estudios con Tamalyn Dallal, el percusionista Hossam Ramzy y el compositor Francisco Bringas, además de una base desde la infancia en gimnasia rítmica, danza regional y jazz, y más de diez años de práctica continua de yoga y entrenamiento funcional. Sus clases integran técnica, coordinación y expresión corporal para fortalecer el cuerpo, mejorar la postura y reconectar con la confianza y la feminidad.",
    "classes": [
      "Belly Dance"
    ]
  },
  {
    "id": 7,
    "name": "Juan Martínez",
    "specialty": "Sound Healing",
    "image": null,
    "bio": "Facilitador de Sound Healing. Acompaña sesiones de sanación sonora con cuencos, gongs y vibraciones para una relajación profunda.",
    "classes": [
      "Sound Healing"
    ]
  },
  {
    "id": 8,
    "name": "Jimena",
    "specialty": "Sound Healing",
    "image": null,
    "bio": "Facilitadora de Sound Healing. Acompaña sesiones de sanación sonora con cuencos, gongs y vibraciones para una relajación profunda.",
    "classes": [
      "Sound Healing"
    ]
  }
]

export const classTypes: ClassType[] = [
  {
    "id": "hatha-yoga",
    "name": "Hatha Yoga",
    "teacher": "Blanca Bear",
    "teacherId": 1,
    "duration": 60,
    "description": "Práctica tradicional de Hatha Yoga en Coyoacán para equilibrar cuerpo y mente con posturas, respiración y atención consciente.",
    "fullDescription": "Hatha Yoga es una práctica clásica que integra posturas sostenidas, respiración consciente y pausas de atención para fortalecer el cuerpo y calmar la mente. El ritmo es claro y accesible, ideal para construir base técnica y presencia.\n\nPuedes esperar una secuencia progresiva con movilidad suave, trabajo de alineación, respiración guiada y cierre de relajación. Es una práctica equilibrada para cultivar estabilidad, flexibilidad y enfoque.",
    "image": "/images/clases/hatha-yoga.png",
    "whatToBring": [
      "tu propio mat de yoga"
    ]
  },
  {
    "id": "pilates",
    "name": "Pilates",
    "teacher": "Blanca Bear",
    "teacherId": 1,
    "duration": 60,
    "description": "Clase de Pilates mat en Coyoacán, en colchoneta y con máximo 10 personas, enfocada en core, alineación y control del movimiento. Ideal para fortalecer el centro del cuerpo, mejorar postura y ganar estabilidad con guía experta.",
    "fullDescription": "Nuestra clase es de Pilates mat (en colchoneta, sin reformer). Trabajamos desde los principios del método: respiración, precisión y fluidez, en grupos de máximo 10 personas donde la coach corrige la técnica de cada persona. La clase integra ejercicios en colchoneta y opciones progresivas para distintos niveles, con atención a la columna y la pelvis.\n\nPuedes esperar calentamiento articular, series de fortalecimiento del abdomen y espalda, y cierre con estiramientos. Es una práctica clara y contenida, pensada para sentir el cuerpo con más consciencia y sin prisa.",
    "image": "/images/clases/pilates.png",
    "whatToBring": [
      "tu propio mat de yoga"
    ]
  },
  {
    "id": "tai-chi",
    "name": "Tai Chi",
    "teacher": "Blanca Bear",
    "teacherId": 1,
    "duration": 60,
    "description": "Arte marcial suave y meditativo que integra movimientos fluidos, técnicas de respiración consciente y principios de meditación. Practica Tai Chi en Coyoacán para mejorar equilibrio y bienestar integral.",
    "fullDescription": "El Tai Chi es un arte marcial interno chino que combina movimientos lentos, fluidos y circulares con respiración profunda y meditación en movimiento. Esta práctica milenaria se realiza de pie, ejecutando secuencias de movimientos que fluyen como una danza suave y continua.\n\nDurante la clase, aprenderás formas tradicionales que conectan cuerpo, mente y espíritu en un movimiento armonioso. Puedes esperar una práctica accesible para todos los niveles, donde cada movimiento se enseña paso a paso, permitiendo que desarrolles coordinación, equilibrio y conciencia corporal.\n\nEl Tai Chi mejora significativamente el equilibrio y reduce el riesgo de caídas, aumenta la flexibilidad y rango de movimiento, fortalece las piernas y el core, reduce el estrés y la ansiedad, mejora la concentración y claridad mental, fortalece el sistema cardiovascular de manera suave, alivia dolores articulares y musculares, promueve la circulación sanguínea y linfática, y desarrolla la coordinación y agilidad, ofreciendo beneficios tanto físicos como mentales para personas de todas las edades.",
    "image": "/images/clases/tai-chi.png"
  },
  {
    "id": "power-yoga-1",
    "name": "Power Yoga",
    "teacher": "Rocío Enciso",
    "teacherId": 5,
    "duration": 60,
    "description": "Clase dinámica en Coyoacán que combina fuerza, resistencia y alineación en secuencias exigentes y claras, ideal para quien busca profundizar en posturas y energía atlética con guía experta.",
    "fullDescription": "Power Yoga es una práctica vigorosa en la que el calor y el ritmo sostienen secuencias fluidas entre posturas de pie, equilibrios y trabajo de fuerza. Rocío integra su experiencia en yoga deportivo y preparación física para ofrecer una clase desafiante y ordenada, con atención al detalle y opciones para distintos niveles.\n\nPuedes esperar calentamiento activo, series que desarrollan resistencia y estabilidad, y un cierre que devuelve el cuerpo a la calma. Es una propuesta para quien disfruta del movimiento intenso sin perder la consciencia respiratoria y la integridad articular.",
    "image": "/images/clases/power-yoga.png",
    "whatToBring": [
      "tu propio mat de yoga"
    ]
  },
  {
    "id": "sound-healing",
    "name": "Sound Healing",
    "teacher": "Juan Martínez",
    "teacherId": 7,
    "duration": 60,
    "description": "Experiencia de sanación sonora en Coyoacán que utiliza cuencos tibetanos, gongs y vibraciones terapéuticas para facilitar relajación profunda, reducir ansiedad y promover equilibrio energético.",
    "fullDescription": "El Sound Healing o Sanación Sonora es una terapia vibracional que utiliza instrumentos ancestrales como cuencos tibetanos, gongs, campanas, diapasones y la voz para crear frecuencias curativas que resuenan con el cuerpo y la mente.\n\nDurante la sesión, te recostarás cómodamente mientras te envuelves en un baño de sonidos que penetran profundamente en tus células y tejidos. La experiencia es completamente pasiva, permitiendo que el cuerpo entre en un estado de relajación profunda mientras las vibraciones trabajan a nivel celular.\n\nPuedes esperar una experiencia transformadora donde los sonidos te guían hacia estados de conciencia expandida, liberando tensiones físicas y emocionales almacenadas.\n\nEl Sound Healing reduce significativamente el estrés y la ansiedad, mejora la calidad del sueño, equilibra el sistema nervioso, libera bloqueos emocionales y traumas almacenados, reduce el dolor crónico y la inflamación, mejora la concentración y claridad mental, promueve la producción de ondas cerebrales alfa y theta asociadas con la relajación profunda, fortalece el sistema inmunológico, y facilita estados meditativos profundos, proporcionando una experiencia de sanación holística que integra cuerpo, mente y espíritu.",
    "image": "/images/clases/sound-healing.png",
    "whatToBring": [
      "tu propio mat de yoga",
      "una cobija"
    ]
  },
  {
    "id": "belly-dance",
    "name": "Belly Dance",
    "teacher": "Nadia Navarrete",
    "teacherId": 6,
    "duration": 60,
    "description": "Clase de danza árabe en Coyoacán que combina técnica, coordinación y expresión corporal. Fortalece el cuerpo, mejora la postura y reconecta con tu confianza. No necesitas experiencia previa.",
    "fullDescription": "La clase de Belly Dance es una práctica de danza árabe que combina técnica, coordinación y expresión corporal. A través de movimientos fluidos y dinámicos, fortalecerás el cuerpo, mejorarás tu postura y conectarás con tu confianza y feminidad.\n\nCada sesión integra calentamiento, trabajo de aislamientos y desplazamientos, y una secuencia final para disfrutar el movimiento. No necesitas experiencia previa: la práctica se adapta a todos los niveles.",
    "image": "/images/clases/tai-chi.png"
  },
  {
    "id": "stretching",
    "name": "Stretching",
    "teacher": "Rocío Enciso",
    "teacherId": 5,
    "duration": 60,
    "description": "Clase de estiramiento en Coyoacán para mejorar flexibilidad, movilidad y postura mediante estiramientos conscientes y progresivos. Apta para todos los niveles.",
    "fullDescription": "Stretching es una clase enfocada en mejorar la flexibilidad, la movilidad y la postura mediante estiramientos conscientes y progresivos. Libera la tensión acumulada, amplía tu rango de movimiento y disfruta una sensación de ligereza y bienestar.\n\nLa sesión avanza de forma gradual, con respiración guiada y opciones para cada cuerpo. Es una práctica apta para todos los niveles, ideal para complementar tu entrenamiento o para tus días de recuperación.",
    "image": "/images/clases/pilates.png",
    "whatToBring": [
      "tu propio mat de yoga"
    ]
  }
]

export const classSchedules: Record<ClassId, ClassSchedule> = {
  "hatha-yoga": {
    "days": [
      "Jueves",
      "Domingo"
    ],
    "times": [
      "08:00",
      "20:30"
    ],
    "timesByDay": {
      "Jueves": [
        "20:30"
      ],
      "Domingo": [
        "08:00"
      ]
    }
  },
  "pilates": {
    "days": [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves"
    ],
    "times": [
      "08:30",
      "09:30",
      "19:30"
    ],
    "timesByDay": {
      "Lunes": [
        "08:30"
      ],
      "Martes": [
        "09:30",
        "19:30"
      ],
      "Miércoles": [
        "08:30"
      ],
      "Jueves": [
        "09:30"
      ]
    }
  },
  "tai-chi": {
    "days": [
      "Lunes",
      "Miércoles",
      "Sábado"
    ],
    "times": [
      "10:30",
      "19:30"
    ],
    "timesByDay": {
      "Lunes": [
        "19:30"
      ],
      "Miércoles": [
        "19:30"
      ],
      "Sábado": [
        "10:30"
      ]
    }
  },
  "power-yoga-1": {
    "days": [
      "Martes"
    ],
    "times": [
      "08:30"
    ]
  },
  "sound-healing": {
    "days": [
      "Martes",
      "Miércoles",
      "Jueves",
      "Domingo"
    ],
    "times": [
      "09:00",
      "10:30",
      "19:30",
      "20:30"
    ],
    "timesByDay": {
      "Martes": [
        "20:30"
      ],
      "Miércoles": [
        "20:30"
      ],
      "Jueves": [
        "19:30"
      ],
      "Domingo": [
        "09:00",
        "10:30"
      ]
    },
    "teachersByDayTime": {
      "Jueves": {
        "19:30": "Jimena"
      },
      "Domingo": {
        "10:30": "Jimena"
      }
    }
  },
  "belly-dance": {
    "days": [
      "Miércoles",
      "Viernes"
    ],
    "times": [
      "18:00"
    ],
    "timesByDay": {
      "Miércoles": [
        "18:00"
      ],
      "Viernes": [
        "18:00"
      ]
    }
  },
  "stretching": {
    "days": [
      "Viernes",
      "Sábado"
    ],
    "times": [
      "08:30",
      "09:00"
    ],
    "timesByDay": {
      "Viernes": [
        "08:30"
      ],
      "Sábado": [
        "09:00"
      ]
    }
  }
}

/** slug de la URL (/clases/<slug>) → id de clase */
export const slugToClass: Record<string, ClassId> = {
  "hatha-yoga-coyoacan": "hatha-yoga",
  "pilates-coyoacan": "pilates",
  "sound-healing-coyoacan": "sound-healing",
  "power-yoga-coyoacan": "power-yoga-1",
  "tai-chi-coyoacan": "tai-chi",
  "belly-dance-coyoacan": "belly-dance",
  "stretching-coyoacan": "stretching"
}

export const landingSeoTitle: Record<ClassId, string> = {
  "hatha-yoga": "Hatha Yoga en Coyoacán | Clases y Reserva | Estudio Popnest",
  "pilates": "Pilates Mat en Coyoacán | Grupos Reducidos | Estudio Popnest",
  "sound-healing": "Sound Healing y Sound Bath en Coyoacán | Terapia de Sonido | Estudio Popnest",
  "power-yoga-1": "Power Yoga en Coyoacán | Clases Dinámicas | Estudio Popnest",
  "tai-chi": "Tai Chi en Coyoacán | Clases y Reserva | Estudio Popnest",
  "belly-dance": "Belly Dance en Coyoacán | Danza Árabe y Reserva | Estudio Popnest",
  "stretching": "Stretching en Coyoacán | Clases de Estiramiento | Estudio Popnest"
}

export const landingSeoDescription: Record<ClassId, string> = {
  "hatha-yoga": "Práctica tradicional de Hatha Yoga en Coyoacán para equilibrar cuerpo y mente con posturas, respiración y atención consciente.",
  "pilates": "Pilates mat en Coyoacán (Del Carmen): clases en colchoneta con máximo 10 personas, enfocadas en core, alineación y postura. Aptas para principiantes. Reserva en línea.",
  "sound-healing": "Sound Healing (sound bath o terapia de sonido) en Coyoacán: baño de sonido con cuencos tibetanos y gongs para relajación profunda. Sin experiencia previa.",
  "power-yoga-1": "Clase dinámica en Coyoacán que combina fuerza, resistencia y alineación en secuencias exigentes con guía experta.",
  "tai-chi": "Tai Chi en Coyoacán: movimientos fluidos y respiración consciente para mejorar equilibrio y bienestar integral.",
  "belly-dance": "Clases de Belly Dance (danza árabe) en Coyoacán: técnica, coordinación y expresión corporal. Fortalece el cuerpo y mejora la postura. Sin experiencia previa.",
  "stretching": "Clases de Stretching en Coyoacán para mejorar flexibilidad, movilidad y postura con estiramientos conscientes y progresivos. Aptas para todos los niveles."
}

export const landingH1: Record<ClassId, string> = {
  "hatha-yoga": "Hatha Yoga en Coyoacán",
  "pilates": "Pilates en Coyoacán",
  "sound-healing": "Sound Healing en Coyoacán",
  "power-yoga-1": "Power Yoga en Coyoacán",
  "tai-chi": "Tai Chi en Coyoacán",
  "belly-dance": "Belly Dance en Coyoacán",
  "stretching": "Stretching en Coyoacán"
}

export const landingInstructors: Record<ClassId, string[]> = {
  "hatha-yoga": [
    "Blanca Bear"
  ],
  "pilates": [
    "Blanca Bear"
  ],
  "sound-healing": [
    "Juan Martínez",
    "Jimena"
  ],
  "power-yoga-1": [
    "Rocío Enciso"
  ],
  "tai-chi": [
    "Blanca Bear"
  ],
  "belly-dance": [
    "Nadia Navarrete"
  ],
  "stretching": [
    "Rocío Enciso"
  ]
}

export const landingClassName: Record<ClassId, string> = {
  "hatha-yoga": "Hatha Yoga",
  "pilates": "Pilates",
  "sound-healing": "Sound Healing",
  "power-yoga-1": "Power Yoga",
  "tai-chi": "Tai Chi",
  "belly-dance": "Belly Dance",
  "stretching": "Stretching"
}

export const landingFaq: Record<ClassId, Faq[]> = {
  "hatha-yoga": [
    {
      "q": "¿Necesito experiencia previa para Hatha Yoga en Coyoacán?",
      "a": "No es indispensable. Las clases están pensadas para distintos niveles; la coach guía posturas, respiración y ritmo con grupos reducidos."
    },
    {
      "q": "¿Cuánto dura la clase?",
      "a": "Cada sesión dura 60 minutos en Estudio Popnest, Del Carmen, Coyoacán."
    }
  ],
  "pilates": [
    {
      "q": "¿Qué tipo de Pilates dan en Estudio Popnest: mat o reformer?",
      "a": "Pilates mat: se practica en colchoneta, sin máquinas reformer. Trabajamos los principios del método (respiración, control, precisión) en grupos de máximo 10 personas, con correcciones personalizadas de la coach Blanca Bear."
    },
    {
      "q": "¿Pilates mat sirve si soy principiante o tengo poca condición física?",
      "a": "Sí. El trabajo es progresivo, con foco en alineación y control, y cada ejercicio tiene opciones para distintos niveles. Puedes adaptar la intensidad desde el primer día."
    },
    {
      "q": "¿Cuántas personas hay por clase?",
      "a": "Máximo 10 personas por clase, para que la coach pueda observar y corregir la técnica de cada persona durante la sesión."
    },
    {
      "q": "¿Qué días hay Pilates en Coyoacán?",
      "a": "Lunes 8:30, martes 9:30 y 19:30, miércoles 8:30 y jueves 9:30. Cada sesión dura 60 minutos en Londres 105, Del Carmen, Coyoacán. Consulta fechas disponibles en el horario semanal."
    },
    {
      "q": "¿Qué debo llevar?",
      "a": "Ropa cómoda y tu propio mat de yoga. Si tienes dudas antes de tu primera clase, escríbenos."
    }
  ],
  "sound-healing": [
    {
      "q": "¿Qué es una sesión de Sound Healing?",
      "a": "Es una experiencia pasiva con cuencos, gongs y otras frecuencias. Te recuestas mientras el sonido acompaña la relajación profunda."
    },
    {
      "q": "¿Sound Healing, sound bath y terapia de sonido son lo mismo?",
      "a": "Sí, son nombres para la misma práctica: un baño de sonido con cuencos tibetanos y gongs. En Estudio Popnest la sesión dura 60 minutos, te recuestas sobre tu mat con una cobija y no requiere experiencia."
    },
    {
      "q": "¿Qué días hay Sound Healing en Coyoacán?",
      "a": "Martes y miércoles 20:30, jueves 19:30 y domingo 9:00 y 10:30, con Juan Martínez y Jimena. Trae tu mat de yoga y una cobija."
    },
    {
      "q": "¿Puedo asistir si nunca he meditado?",
      "a": "Sí. No requiere posturas ni experiencia previa; solo llegar con ropa cómoda y apertura a descansar."
    }
  ],
  "power-yoga-1": [
    {
      "q": "¿En qué se diferencia Power Yoga de otras clases de yoga?",
      "a": "Es una práctica más vigorosa, con secuencias fluidas que desarrollan fuerza y resistencia, siempre con atención a la respiración."
    },
    {
      "q": "¿Quién imparte la clase?",
      "a": "Rocío Enciso, con formación en yoga deportivo y amplia trayectoria docente."
    }
  ],
  "tai-chi": [
    {
      "q": "¿Tai Chi es solo para adultos mayores?",
      "a": "No. Es accesible a cualquier edad; los movimientos son suaves y se aprenden paso a paso."
    },
    {
      "q": "¿Se practica de pie o en el suelo?",
      "a": "Las clases regulares son de pie, en secuencias lentas y continuas. Ven con ropa cómoda y calzado ligero."
    }
  ],
  "belly-dance": [
    {
      "q": "¿Necesito experiencia para Belly Dance en Coyoacán?",
      "a": "No. Las clases están abiertas a todos los niveles; aprendes técnica, coordinación y expresión corporal paso a paso con la coach."
    },
    {
      "q": "¿Qué debo llevar a la clase?",
      "a": "Ropa cómoda que te permita moverte y, si quieres, un pañuelo de cadera. Cada sesión dura 60 minutos en Del Carmen, Coyoacán."
    }
  ],
  "stretching": [
    {
      "q": "¿Para qué sirve la clase de Stretching?",
      "a": "Mejora tu flexibilidad, movilidad y postura con estiramientos progresivos. Ideal por sí sola o como complemento de otras prácticas."
    },
    {
      "q": "¿Es apta si soy principiante?",
      "a": "Sí. Los estiramientos se adaptan a tu nivel y avanzan de forma gradual. Cada sesión dura 60 minutos en Estudio Popnest, Coyoacán."
    }
  ]
}
