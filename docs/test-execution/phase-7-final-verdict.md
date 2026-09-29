# Fase 7 — Veredicto final de calidad

## Objetivo

Revisar la evidencia obtenida durante el proyecto y decidir si el prototipo cumple los criterios necesarios para cerrar el laboratorio QA.

---

## Resultado final de pruebas

- PASS: 26
- FAIL: 0
- BLOCKED: 0
- NOT RUN: 0

Los fallos encontrados en fases anteriores fueron corregidos y revalidados.

---

## Principales hallazgos

### 1. Confirmación de alergias

**Severidad:** HIGH

El formulario permitía registrar un medicamento sin confirmar el estado de alergias.

**Impacto:** podía quedar un registro incompleto en un dato importante.

**Estado final:** corregido y revalidado.

**Resultado:** PASS

---

### 2. Límite mínimo de dosis

**Severidad:** HIGH

El formulario indicaba una dosis mínima de `0.1`, pero JavaScript permitía valores menores como `0.05`.

**Impacto:** la aplicación no respetaba el límite mínimo definido.

**Estado final:** corregido y revalidado.

**Resultado:** PASS

---

### 3. Detección de duplicados

**Severidad:** MEDIUM

La detección de duplicados tenía problemas con mayúsculas/minúsculas y no tenía en cuenta la vía y la frecuencia.

**Impacto:** podía aceptar duplicados reales o bloquear registros que eran diferentes.

**Estado final:** corregido y revalidado.

**Resultado:** PASS

---

## Métricas finales

### WAVE

- Errors: 0
- Contrast Errors: 0
- Alerts: 0
- AIM Score: 10/10

### W3C

- Errors: 0
- Warnings: 0

### Lighthouse

- Performance: 100
- Accessibility: 96
- Best Practices: 100
- SEO: 100

### Keyboard

**PASS**

La aplicación puede utilizarse mediante teclado y el foco es visible.

### Responsive

**PASS**

Probado en:

- 320 px
- 768 px
- 1440 px
- zoom 200%

---

## Riesgos residuales

Aunque el resultado final es positivo, quedan algunas limitaciones conocidas:

- no se realizó una prueba con lector de pantalla real;
- la cobertura de navegadores fue limitada;
- el proyecto es un prototipo educativo y no ha sido validado como un sistema clínico real.

---

## Veredicto

# CONDITIONAL GO

Los defectos de mayor riesgo encontrados durante las pruebas fueron corregidos y revalidados.

Las pruebas finales no muestran fallos abiertos que impidan cerrar el laboratorio.

Sin embargo, todavía existen algunas limitaciones en la cobertura de pruebas, especialmente en lectores de pantalla y diferentes navegadores.

Estas limitaciones quedan documentadas como riesgos residuales.

---

## Conclusión

El prototipo cumple los criterios necesarios para cerrar el laboratorio QA con las limitaciones indicadas.

**Estado de Fase 7: PASS**

**Veredicto final: CONDITIONAL GO**