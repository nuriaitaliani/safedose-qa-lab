# Fase 2 — Matriz de riesgos

**Commit analizado:** `bd8dae0`

## Escala utilizada

La probabilidad y el impacto se valoran de 1 a 5.

- 1 = muy bajo
- 2 = bajo
- 3 = medio
- 4 = alto
- 5 = muy alto

La puntuación se calcula multiplicando:

`Probabilidad × Impacto`

---

## Matriz de riesgos

| Riesgo | Probabilidad | Impacto | Puntuación | Resultado observado |
|---|---:|---:|---:|---|
| Omisión de alergia | 5 | 5 | 25 | Se puede crear un registro sin seleccionar Sí o No. La fila aparece como `Sin confirmar`. |
| Pérdida de decimales / límites de dosis | 5 | 4 | 20 | Los decimales se conservan, pero se acepta manualmente `0.05` aunque el mínimo declarado en HTML es `0.1`. |
| Duplicados | 5 | 4 | 20 | La comparación distingue mayúsculas/minúsculas y no tiene en cuenta vía ni frecuencia. |
| Mensaje inaccesible | 3 | 4 | 12 | La navegación por teclado funciona, pero no se ha comprobado con lector de pantalla y no existe `aria-live` ni `role="alert"`. |
| Responsive | 2 | 3 | 6 | Las pruebas a 320 px, 768 px, 1440 px y zoom 200 % son usables. En anchos pequeños la tabla utiliza scroll horizontal. |

---

## Prioridades

### 1. Omisión de alergia — 25

Se ha comprobado que SafeDose permite añadir un registro sin confirmar el
contraste de alergias.

El registro se crea correctamente y aparece en la cola como `Sin confirmar`.

Se considera la prioridad principal porque el contraste de alergias forma parte
de la puerta de seguridad representada por el prototipo.

---

### 2. Límites de dosis — 20

Los valores decimales probados se conservan correctamente.

Sin embargo, el campo declara un mínimo de `0.1` y la aplicación permite
introducir manualmente `0.05`.

Esto muestra una diferencia entre el límite definido en HTML y la validación
real de JavaScript.

---

### 3. Duplicados — 20

Los registros exactamente iguales se detectan correctamente.

Sin embargo:

- `DuplicadoTest` y `duplicadotest` se consideran diferentes.
- Dos registros con el mismo medicamento, dosis y unidad se consideran
  duplicados aunque tengan distinta vía o frecuencia.

La regla actual puede permitir duplicados no detectados o rechazar registros
que contienen diferencias relevantes.

---

## Criterios de entrada

- Commit y entorno identificados.
- Servidor local disponible.
- Los recursos principales cargan correctamente.
- El flujo básico de SafeDose puede ejecutarse.
- Solo se utilizan datos ficticios.

**Estado:** Cumplidos.

---

## Criterios de salida

Para considerar finalizada la auditoría:

- No deben quedar defectos críticos o altos sin resolver.
- Las comprobaciones principales de accesibilidad deben estar completadas.
- Debe comprobarse la integridad de los datos.
- La navegación por teclado debe ser usable.
- El comportamiento responsive debe estar comprobado.
- Los resultados deben indicar la versión probada y la evidencia correspondiente.