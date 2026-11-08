# Quickstart: validar la spec 004

## Preparación

```bash
npm run build      # MUST terminar sin errores ni advertencias nuevas
npm run start      # http://localhost:3000
```

Revisar cada escenario en tema claro y oscuro (botón de tema del header).

## Escenarios

| # | Paso | Resultado esperado |
|---|------|--------------------|
| 1 | 1440 px: pasar el mouse por cada tarjeta de Problemas, Beneficios, Cómo funciona, Casos de uso, Contadores y Credibilidad | Sube ~3 px, sombra más marcada, borde primario; misma velocidad (~200 ms) en todas; vuelve al salir |
| 2 | Mismo recorrido, mirando el ícono | El ícono crece levemente y su fondo pasa a primario con el ícono en contraste, a la vez que la tarjeta; también al pasar por el texto, lejos del ícono. En Problemas pasa de naranja a primario |
| 3 | Comparar Beneficios, Cómo funciona y Credibilidad con el mouse fuera | Se ven idénticos a `main` antes del cambio (comparar capturas); al resaltar, el texto no se corre |
| 4 | Cómo funciona a ≥ 768 px, resaltar el paso 2 | La caja aparece alrededor del paso; la línea entre pasos llega al borde de la caja sin verse cortada de forma rara |
| 5 | Tab hasta "Soy contador" | El panel de Contadores se resalta además del contorno de foco del botón; al salir con Tab, vuelve |
| 6 | Clic con el mouse en "Soy contador" y volver | No queda el panel resaltado por foco (solo foco de teclado lo resalta) |
| 7 | FAQ: pasar el mouse sobre una pregunta cerrada | El "+" toma un tono suave del primario |
| 8 | FAQ: abrir una pregunta (clic, Enter, Espacio) | El "+" gira y se llena de primario con el signo en contraste; con el mouse encima no vuelve al tono suave |
| 9 | FAQ: cerrar la pregunta | Vuelve a fondo neutro y sin giro |
| 10 | FAQ: Tab a una pregunta cerrada | Mismo tono suave que con el mouse |
| 11 | DevTools → Rendering → `prefers-reduced-motion: reduce` | Nada sube, crece ni gira animado; colores, borde y sombra cambian al instante; el "+" abierto queda girado |
| 12 | DevTools → modo dispositivo táctil (o celular real): tocar una tarjeta y una pregunta, luego hacer scroll | Ninguna tarjeta queda elevada ni "+" en tono suave; la pregunta abierta sí muestra su estado |
| 13 | 360 px | Sin scroll horizontal; las cajas de los ítems sin caja no tocan el borde de la pantalla |
| 14 | JavaScript deshabilitado | Hover y FAQ (abrir/cerrar y colores) funcionan igual |
| 15 | DevTools → Performance → recorrer tarjetas y abrir/cerrar FAQs | CLS = 0; sin "Layout" en los cambios de estado |
| 16 | Contrastes | Ver tabla de [research.md R7](./research.md); revisar en pantalla con el selector de color de DevTools |
| 17 | Lighthouse móvil | Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 |
| 18 | Revisión de contenido | `git diff` no toca `src/content/landing.ts` ni el carrusel del hero |
| 19 | Windows → Accesibilidad → Temas de contraste (activar uno), recargar | En reposo no aparecen cajas en Beneficios, Cómo funciona ni Credibilidad; textos y bordes legibles; al pasar el mouse la tarjeta sigue elevándose |

Testimonios hoy no se muestra (sin testimonios reales); su `.card-hover` se valida cuando haya datos.
