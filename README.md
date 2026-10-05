# SafeDose QA Lab

Proyecto educativo de QA centrado en el análisis de riesgos, diseño y ejecución de pruebas, reporte de defectos, regresión, accesibilidad y toma de decisiones basada en evidencia.

SafeDose utiliza un prototipo ficticio de revisión de medicamentos como sistema bajo prueba.

> **Entorno exclusivamente educativo.** Todos los nombres y registros son ficticios. SafeDose no calcula dosis, no diagnostica afecciones ni ofrece recomendaciones clínicas y no debe utilizarse para tomar decisiones sanitarias reales.

---

## Pregunta de calidad

El proyecto parte de una pregunta:

> **¿Podemos confiar en que los datos que llegan a la cola son completos, únicos y exactos?**

A partir de ella se analizaron los principales riesgos del flujo y se diseñaron pruebas para comprobar su comportamiento.

---

## Mi trabajo como QA

Durante el proyecto trabajé en:

- inspección inicial del prototipo;
- análisis y priorización de riesgos;
- diseño de pruebas funcionales, negativas y de límites;
- ejecución manual de pruebas;
- creación y seguimiento de Issues;
- validación de correcciones;
- regression testing;
- accesibilidad y navegación por teclado;
- responsive testing;
- validación W3C, WAVE y Lighthouse;
- investigación de una regresión con `git bisect`;
- decisión final de calidad basada en evidencia.

---

## Principales riesgos investigados

La matriz de riesgos señaló como prioritarios:

| Riesgo | Prioridad |
|---|---:|
| Estado de alergias sin confirmar | 25 |
| Dosis fuera de los límites definidos | 20 |
| Detección incorrecta de duplicados | 20 |
| Mensajes de error y accesibilidad | 12 |
| Comportamiento responsive | 6 |

La matriz completa está disponible en [`docs/risk-matrix.md`](docs/risk-matrix.md).

---

## Algunos defectos encontrados

### Estado de alergias sin confirmar

El formulario permitía añadir un medicamento sin confirmar el estado de alergias.

- Severidad: **HIGH**
- Issue: [#5](https://github.com/nuriaitaliani/safedose-qa-lab/issues/5)
- Corrección validada en PR [#14](https://github.com/nuriaitaliani/safedose-qa-lab/pull/14)

Después de la corrección, el registro solo puede enviarse cuando el estado de alergias ha sido confirmado.

### Límite mínimo de dosis

El HTML definía una dosis mínima de `0.1`, pero la validación JavaScript permitía valores como `0.05`.

- Severidad: **HIGH**
- Issue: [#6](https://github.com/nuriaitaliani/safedose-qa-lab/issues/6)
- Corrección validada en PR [#15](https://github.com/nuriaitaliani/safedose-qa-lab/pull/15)

La validación se alineó con el límite definido y se probaron valores límite.

### Detección de duplicados

Se encontraron dos comportamientos incorrectos:

- la comparación distinguía mayúsculas y minúsculas;
- vía y frecuencia no formaban parte de la comparación.

Issues:

- [#7](https://github.com/nuriaitaliani/safedose-qa-lab/issues/7)
- [#8](https://github.com/nuriaitaliani/safedose-qa-lab/issues/8)

Correcciones:

- PR [#16](https://github.com/nuriaitaliani/safedose-qa-lab/pull/16)
- PR [#17](https://github.com/nuriaitaliani/safedose-qa-lab/pull/17)

Las correcciones fueron comprobadas mediante pruebas de regresión.

---

## Accesibilidad y responsive

El prototipo también fue revisado con WAVE, W3C, Lighthouse y pruebas manuales.

Resultados finales:

| Comprobación | Resultado |
|---|---:|
| WAVE Errors | 0 |
| WAVE Contrast Errors | 0 |
| WAVE AIM Score | 10/10 |
| W3C Errors | 0 |
| W3C Warnings | 0 |
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 96 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| Keyboard | PASS |
| Responsive | PASS |

El comportamiento responsive se comprobó en `320 px`, `768 px`, `1440 px` y zoom al `200%`.

Evidencia: [`phase-4-accessibility-performance.md`](docs/test-execution/phase-4-accessibility-performance.md).

---

## Investigación con git bisect

Para practicar la investigación de regresiones se introdujo de forma intencionada un cambio que sustituía:

```js
const dose = Number(data.get("dose"));
```

por:

```js
const dose = parseInt(data.get("dose"), 10);
```

El caso `0.5 mL` comenzó a fallar porque:

```text
parseInt("0.5", 10) → 0
```

Se definió un criterio GOOD/BAD y se utilizó `git bisect` para localizar el primer commit responsable.

Primer commit BAD encontrado:

`057295d — Ajustar formato de dosis`

La branch `qa/phase-6-bisect` se conserva como evidencia del ejercicio.

Más información: [`phase-6-git-bisect.md`](docs/test-execution/phase-6-git-bisect.md).

---

## Resultado final

Validaciones finales documentadas:

- **25 casos de validación de correcciones: PASS**
- **1 caso de regresión de `git bisect` tras la corrección: PASS**
- **FAIL: 0**
- **BLOCKED: 0**
- **NOT RUN: 0**

Los defectos de mayor riesgo encontrados durante el proyecto fueron corregidos y revalidados.

### Veredicto

**CONDITIONAL GO**

El prototipo cumple los criterios definidos para cerrar el laboratorio, pero se mantienen algunos riesgos residuales:

- no se realizó una prueba con lector de pantalla real;
- la cobertura de navegadores fue limitada;
- se trata de un prototipo educativo y no de un sistema clínico real.

Veredicto completo: [`phase-7-final-verdict.md`](docs/test-execution/phase-7-final-verdict.md).

---

## Evidencias

La evidencia de ejecución puede consultarse en [`docs/test-execution/`](docs/test-execution/).

Incluye:

- smoke tests;
- pruebas funcionales y de límites;
- pruebas de regresión;
- accesibilidad y responsive;
- informe Lighthouse;
- validación de correcciones;
- investigación con `git bisect`;
- veredicto final.

Los Issues y Pull Requests del repositorio también forman parte de la evidencia del proceso QA.

---

## Sistema bajo prueba

El prototipo está construido con:

- HTML5
- CSS3
- JavaScript

Representa un flujo ficticio para añadir registros de medicamentos a una cola de revisión.

---

## Alcance y apoyo recibido

Mi papel en este proyecto está centrado en **QA**, no en el desarrollo del producto.

Realicé el análisis de riesgos, diseñé y ejecuté las pruebas, documenté los defectos, comprobé las correcciones y tomé las decisiones de validación.

El proyecto se realizó en un entorno educativo y utilicé asistencia de IA como apoyo para algunos pasos técnicos y para preparar cambios de código. Las pruebas, observaciones y decisiones de QA fueron revisadas durante la ejecución del proyecto.