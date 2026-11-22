# Migración de popnest.app a estudiopopnest.com

Estado: las páginas de clases ya existen en este repositorio (rama `migracion-wellness`) con **las mismas rutas** que popnest.app. Las redirecciones 301 **no están activas todavía**: se ponen en el proyecto de popnest.app (repositorio `websitewellnesspopnest`) cuando estas páginas estén publicadas.

## Orden

1. Publicar esta rama en estudiopopnest.com y comprobar cada URL nueva.
2. Verificar estudiopopnest.com en Search Console, enviar `https://estudiopopnest.com/sitemap.xml`.
3. Cambiar el enlace del sitio en el perfil de Google Business Profile.
4. Poner las redirecciones 301 en popnest.app (tabla de abajo) y mantenerlas **al menos 12 meses**.
5. Mantener el dominio popnest.app renovado.
6. Search Console de popnest.app: herramienta "Cambio de dirección" si aparece disponible.

## Mapa de redirecciones (301)

| popnest.app | estudiopopnest.com | Nota |
|---|---|---|
| `/` | `/` | |
| `/classes` | `/classes` | |
| `/horario` | `/horario` | |
| `/clases/pilates-coyoacan` | `/clases/pilates-coyoacan` | |
| `/clases/hatha-yoga-coyoacan` | `/clases/hatha-yoga-coyoacan` | |
| `/clases/power-yoga-coyoacan` | `/clases/power-yoga-coyoacan` | |
| `/clases/tai-chi-coyoacan` | `/clases/tai-chi-coyoacan` | |
| `/clases/sound-healing-coyoacan` | `/clases/sound-healing-coyoacan` | |
| `/clases/belly-dance-coyoacan` | `/clases/belly-dance-coyoacan` | |
| `/clases/stretching-coyoacan` | `/clases/stretching-coyoacan` | |
| `/clases/yoga-coyoacan` | `/classes` | No hay página equivalente (decidir si se crea una guía de yoga) |
| `/packages` | `/classes` | Los paquetes y precios están en Fitune |
| `/ubicacion` | `/contacto` | |
| `/coworking` | `/planes` | |
| `/talleres` | `/talleres` | Lista de talleres: ahora en Fitune (eventos) |
| `/run-club` | `/run-club` | |
| `/privacidad` | `/privacidad` | |
| `/terminos` | `/terminos` | |

## Qué NO se redirige

- `/renta-salon`: en popnest.app es el **flujo de reserva y pago del salón** (Stripe). No se redirige. La página informativa nueva está en `estudiopopnest.com/renta-salon`; la de popnest.app debe llevar `canonical` hacia ella para no competir en Google.
- Rutas de cuenta y reserva (`/booking`, `/login`, `/mis-reservas`, `/admin`…): siguen en popnest.app hasta el paso a Fitune.
- `/talleres/:id` (detalle de un taller): sin equivalente. Quedan en popnest.app o se redirigen a `/talleres` cuando dejen de usarse.

## Reservas

Todos los botones "Reservar" enlazan a Fitune (`src/config/fitune.ts`, variable `VITE_FITUNE_URL`) con parámetros UTM por página.
Fitune ya acepta reservas, así que durante la transición se puede reservar en Fitune y en popnest.app.
