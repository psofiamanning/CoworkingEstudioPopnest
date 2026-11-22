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
| `/privacidad` | `/privacidad` | |
| `/terminos` | `/terminos` | |

## Pendientes: páginas que NO se migraron todavía

- `/renta-salon`: `src/pages/Eventos.tsx` todavía enlaza a `popnest.app/renta-salon`. No redirigir hasta que ese flujo tenga otro destino.
- `/talleres`, `/run-club`: sin página equivalente aquí. Mantenerlas en popnest.app o crear páginas nuevas antes de redirigirlas.
- Rutas de cuenta y reserva (`/booking`, `/login`, `/mis-reservas`, `/admin`…): siguen en popnest.app hasta el 1 de diciembre de 2026 (paso a Fitune).

## Reservas

Todos los botones "Reservar" enlazan a Fitune (`src/config/fitune.ts`, variable `VITE_FITUNE_URL`) con parámetros UTM por página.
**Antes del 1 de diciembre de 2026** las reservas siguen en popnest.app: si estas páginas se publican antes de esa fecha, revisar que Fitune ya acepte reservas o cambiar el enlace temporalmente.
