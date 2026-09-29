# Fase 5 — Validación de correcciones por riesgo

## Objetivo

Validar las correcciones de los defectos detectados durante las fases anteriores.

Cada corrección se realizó en una rama independiente y se revisó mediante pruebas antes de su fusión en `main`.

El criterio para aprobar una corrección fue:

- comprobar que el defecto original queda resuelto;
- ejecutar una regresión mínima relacionada;
- comprobar que no aparecen efectos secundarios evidentes;
- emitir un veredicto QA basado en los resultados obtenidos.

---

## Issue #5 — Confirmación de alergias

**Riesgo:** 25  
**Probabilidad:** 5  
**Impacto:** 5

### Comportamiento antes de la corrección

El formulario permitía enviar un registro sin seleccionar `Sí` o `No` en alergias.

El registro se añadía mostrando:

`Sin confirmar`

### Criterio de aceptación

Si no se confirma el estado de alergias:

- el envío debe rechazarse;
- la cola no debe aumentar;
- `Última actividad` no debe modificarse.

Los valores `Sí` y `No` deben seguir aceptándose.

### Pruebas

| Caso | Resultado |
|---|---|
| TC-FIX-01 — Sin confirmar alergias | PASS |
| TC-FIX-02 — Alergias = Sí | PASS |
| TC-FIX-03 — Alergias = No | PASS |
| TC-FIX-04 — Regresión: dosis vacía | PASS |

### Resultado

El formulario bloquea correctamente los registros sin confirmación de alergias.

**Veredicto:** PASS

---

## Issue #6 — Límite mínimo de dosis

**Riesgo:** 20  
**Probabilidad:** 5  
**Impacto:** 4

### Comportamiento antes de la corrección

El HTML declaraba:

`min="0.1"`

pero JavaScript aceptaba cualquier dosis mayor que `0`.

Por ello, `0.05` era aceptado.

### Criterio de aceptación

La dosis válida debe encontrarse entre:

`0.1` y `9999`

ambos límites incluidos.

### Pruebas

| Caso | Resultado |
|---|---|
| TC-FIX-05 — Dosis 0.05, rechazada | PASS |
| TC-FIX-06 — Dosis 0.1, aceptada | PASS |
| TC-FIX-07 — Dosis 0.5, aceptada | PASS |
| TC-FIX-08 — Dosis 9999, aceptada | PASS |
| TC-FIX-09 — Dosis 10000, rechazada | PASS |
| TC-FIX-10 — Dosis vacía, rechazada | PASS |

### Resultado

La validación JavaScript queda alineada con el mínimo declarado por el formulario.

**Veredicto:** PASS

---

## Issue #7 — Duplicados y capitalización

**Riesgo:** 20  
**Probabilidad:** 5  
**Impacto:** 4

### Comportamiento antes de la corrección

La detección de duplicados distinguía entre mayúsculas y minúsculas.

Ejemplo:

`DuplicadoCase`

y

`duplicadocase`

podían añadirse como registros diferentes.

### Criterio de aceptación

El nombre del medicamento debe compararse sin distinguir mayúsculas y minúsculas.

### Pruebas

| Caso | Resultado |
|---|---|
| TC-FIX-11 — Misma medicación con distinta capitalización | PASS |
| TC-FIX-12 — Misma medicación con dosis distinta | PASS |
| TC-FIX-13 — Medicamento distinto con misma dosis | PASS |
| TC-FIX-14 — Duplicado exacto | PASS |

### Resultado

Los nombres equivalentes con distinta capitalización se detectan correctamente como duplicados.

**Veredicto:** PASS

---

## Issue #8 — Duplicados, vía y frecuencia

**Riesgo:** 20  
**Probabilidad:** 5  
**Impacto:** 4

### Comportamiento antes de la corrección

La detección de duplicados solo utilizaba:

- medicamento;
- dosis;
- unidad.

La vía y la frecuencia se ignoraban.

### Criterio de aceptación

Dos registros solo deben considerarse duplicados si coinciden en:

- medicamento;
- dosis;
- unidad;
- vía;
- frecuencia.

### Pruebas

| Caso | Resultado |
|---|---|
| TC-FIX-15 — Vía y frecuencia distintas | PASS |
| TC-FIX-16 — Duplicado exacto | PASS |
| TC-FIX-17 — Solo frecuencia distinta | PASS |
| TC-FIX-18 — Solo vía distinta | PASS |
| TC-FIX-19 — Regresión de mayúsculas/minúsculas | PASS |

### Resultado

Los registros con vía o frecuencia distintas pueden añadirse y los duplicados completos siguen bloqueándose.

La comparación sin distinguir mayúsculas y minúsculas continúa funcionando.

**Veredicto:** PASS

---

## Issue #12 — Contraste del indicador de foco

### Comportamiento antes de la corrección

En modo oscuro:

- foco: `#0b4a5a`
- fondo adyacente: `#132f38`
- contraste: `1.44:1`
- mínimo requerido: `3:1`

**Resultado:** FAIL

### Criterio de aceptación

El indicador `:focus-visible` debe:

- mantenerse visible;
- permitir navegación mediante teclado;
- alcanzar al menos `3:1` de contraste.

### Resultado después de la corrección

- foco: `#5ee4c2`
- fondo adyacente: `#132f38`
- contraste: `8.95:1`
- grosor: `3px`
- estilo: `solid`

### Pruebas

| Caso | Resultado |
|---|---|
| TC-FIX-20 — Contraste del indicador de foco | PASS |
| TC-FIX-21 — Regresión de navegación por teclado | PASS |

**Veredicto:** PASS

---

## Issue #11 — Contraste de textos

### Comportamiento antes de la corrección

WAVE detectaba:

- Errors: 0
- Contrast Errors: 7
- Alerts: 0

`Penicilinas`:

- texto: `#A12B2B`
- fondo: `#132F38`
- ratio: `1.94:1`

Cabeceras de tabla:

- texto: `#35535B`
- fondo: `#183D47`
- ratio: `1.41:1`

### Criterio de aceptación

Los textos afectados deben alcanzar al menos `4.5:1`.

### Resultado después de la corrección

`Penicilinas`:

- texto: `#FF8A8A`
- fondo: `#132F38`
- ratio: `6.21:1`

Cabeceras:

- texto: `#A7B8BC`
- fondo: `#183D47`
- ratio: `5.69:1`

WAVE:

- Errors: 0
- Contrast Errors: 0
- Alerts: 0
- AIM Score: 10/10

### Pruebas

| Caso | Resultado |
|---|---|
| TC-FIX-22 — Contraste de textos en modo oscuro | PASS |
| TC-FIX-23 — Revisión visual de legibilidad | PASS |

**Veredicto:** PASS

---

## Issue #10 — Validación W3C

### Comportamiento antes de la corrección

W3C Nu Html Checker:

- 2 errores
- 0 warnings

Problemas:

1. URL del favicon SVG no codificada correctamente.
2. `aria-label` aplicado a un `<div>` genérico sin un `role` compatible.

### Criterio de aceptación

`index.html` debe superar W3C Nu Html Checker con:

- 0 errores;
- 0 warnings.

### Resultado después de la corrección

W3C Nu Html Checker:

- 0 errores
- 0 warnings

### Pruebas

| Caso | Resultado |
|---|---|
| TC-FIX-24 — Validación W3C | PASS |
| TC-FIX-25 — Regresión visual | PASS |

**Veredicto:** PASS

---

## Resumen de ejecución

| Corrección | Resultado |
|---|---|
| Confirmación obligatoria de alergias | PASS |
| Límite mínimo de dosis | PASS |
| Duplicados sin distinguir capitalización | PASS |
| Duplicados considerando vía y frecuencia | PASS |
| Contraste del foco | PASS |
| Contraste de textos | PASS |
| Validación W3C | PASS |

**Casos ejecutados en Fase 5:** 25  
**PASS:** 25  
**FAIL:** 0

## Veredicto de la fase

Las correcciones probadas cumplen los criterios de aceptación definidos y las regresiones mínimas ejecutadas no han detectado nuevos fallos relacionados.

**Estado de Fase 5: PASS**