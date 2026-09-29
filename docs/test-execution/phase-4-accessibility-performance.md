# Fase 4 — Accesibilidad, responsive y performance

## Objetivo

Evaluar la accesibilidad, el comportamiento responsive y el rendimiento del prototipo SafeDose QA Lab mediante validación automática, pruebas manuales y Lighthouse.

---

## W3C Validator

**Umbral esperado:** 0 errores.

**Resultado observado:**
- 2 errores
- 0 warnings

Errores detectados:
1. Valor no válido en `href` del favicon basado en `data:image/svg+xml`.
2. Uso de `aria-label` en un `<div>` genérico sin un `role` compatible.

**Estado:** FAIL

---

## WAVE

**Resultado general:**
- Errors: 0
- Alerts: 0
- Contrast Errors: 7

Los errores de contraste detectados fueron:

### Texto "Penicilinas"
- Foreground: `#A12B2B`
- Background: `#132F38`
- Ratio: `1.94:1`
- WCAG AA: FAIL
- WCAG AAA: FAIL

### Cabeceras de tabla
Elementos afectados:
- Medicamento
- Dosis
- Vía
- Frecuencia
- Alergias
- Estado

Valores:
- Foreground: `#35535B`
- Background: `#183D47`
- Ratio: `1.41:1`
- WCAG AA: FAIL
- WCAG AAA: FAIL

**Estado de contraste:** FAIL

---

## Navegación por teclado

**Umbral esperado:** toda la tarea debe poder completarse sin ratón.

**Resultado observado:**
- Orden de tabulación lógico.
- No se detectaron bloqueos de teclado.
- El foco es visible.
- El grupo de alergias puede manejarse mediante teclado.
- El formulario puede completarse y enviarse sin ratón.
- La cola de revisión y la actividad se actualizan correctamente.

**Estado:** PASS

---

## Contraste del indicador de foco

**Umbral esperado:** contraste mínimo de `3:1` entre el indicador de foco y el fondo adyacente.

**Resultado observado:**
- Color del foco: `#0b4a5a`
- Fondo adyacente: `#132f38`
- Ratio de contraste: `1.44:1`
- Grosor del outline: `3px`
- Estilo: `solid`

El indicador de foco es visible, pero no alcanza el contraste mínimo establecido.

**Estado:** FAIL

---

## Responsive

**Umbral esperado:** sin pérdida funcional en 320 px, 768 px, 1440 px y zoom al 200 %.

**Resultados:**
- 320 px: PASS
- 768 px: PASS
- 1440 px: PASS
- Zoom 200 %: PASS

En 320 px y 768 px la tabla necesita desplazamiento horizontal, pero todas las columnas y datos siguen siendo accesibles.

No se observan solapamientos, pérdida de contenido ni controles inaccesibles.

**Estado:** PASS

---

## Lighthouse

**Entorno de ejecución:**
- URL: `http://127.0.0.1:5500/index.html`
- Lighthouse: 13.4.1
- Modo: navigation
- Chrome DevTools

**Resultados:**
- Performance: 100
- Accessibility: 96
- Best Practices: 100
- SEO: 100

**Umbrales requeridos:**
- Accessibility ≥ 90
- Best Practices ≥ 90

**Estado:** PASS

Informe exportado:
- `lighthouse-phase-4.html`

---

## Resumen

| Área | Resultado |
|---|---|
| W3C | FAIL |
| WAVE general | PASS |
| Contraste de texto | FAIL |
| Navegación por teclado | PASS |
| Contraste del foco | FAIL |
| Responsive | PASS |
| Lighthouse | PASS |

La aplicación supera las comprobaciones de teclado, responsive y Lighthouse, pero presenta problemas de validación HTML y contraste que deben corregirse antes de considerar completada la revisión de accesibilidad.

---

## Issues relacionados

- #10 — El documento HTML no supera la validación W3C.
- #11 — Algunos textos no alcanzan el contraste mínimo de accesibilidad.
- #12 — El indicador de foco no alcanza el contraste mínimo de accesibilidad.