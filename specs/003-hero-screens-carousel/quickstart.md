# Quickstart: validar la spec 003

## Preparación

```bash
npm run build      # MUST terminar sin errores ni advertencias nuevas
npm run start      # http://localhost:3000
```

Estado actual: 6 capturas reales en `public/screens/` (sin variantes -oscuro).
Para probar imágenes, copiar temporalmente una captura como `public/screens/bodega-oscuro.png`
reconstruir y **borrarla antes de entregar** (Principio I: solo capturas reales).

## Escenarios

| # | Paso | Resultado esperado |
|---|------|--------------------|
| 1 | Cargar a 360 px y esperar 30 s | Avanza cada ~2,5 s en orden 1→6→1 con fundido; la leyenda cambia; nada fuera del teléfono se mueve |
| 2 | Pasar el mouse sobre el teléfono (1440 px) | Se detiene; al salir, se reanuda |
| 3 | Tab hasta los controles | Foco visible en pausa e indicadores; el avance se detiene mientras haya foco dentro |
| 4 | Activar el indicador 3 | Muestra pantalla 3 y se detiene; el botón pasa a "Reanudar recorrido" |
| 5 | Pausar / Reanudar | Alterna la etiqueta y el avance |
| 6 | DevTools → Rendering → `prefers-reduced-motion: reduce`, recargar | Sin avance ni fundido; sin botón de pausa; indicadores cambian al instante |
| 7 | Lector de pantalla (NVDA/Narrador) | Anuncia "carrusel"; no anuncia los cambios automáticos; anuncia "Pantalla 3 de 6: …" al usar un indicador |
| 8 | Cambiar tema con el botón (con par claro/oscuro de prueba) | La captura cambia de versión sin reiniciar el recorrido |
| 9 | Network → primera carga | Solo la primera captura se pide al inicio (preload); el resto después de `load` |
| 10 | JS deshabilitado | Se ve la pantalla 1 y su leyenda, sin saltos |
| 11 | Revisión visual 360 px y 1440 px, claro y oscuro | Leyenda e indicadores con contraste AA; sin scroll horizontal |
| 12 | Lighthouse móvil | Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 |
