# Fase 3 — Pruebas funcionales, negativas y de límites

**Fecha:** 29/09/2026  
**Commit probado:** `ec18a82`  
**Navegador:** Google Chrome  
**Versión:** 153.0.8010.53  
**Sistema operativo:** Windows  

---

## Caso 1 — Dosis vacía

**Precondición:**  
SafeDose abierto y formulario disponible.

**Datos de prueba:**
- Medicamento: DosisVacia
- Dosis: vacío
- Unidad: mg
- Vía: Oral
- Frecuencia: Cada 8 h
- Alergias: Sí

**Pasos:**
1. Completar el formulario dejando la dosis vacía.
2. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El registro se rechaza.

**Resultado observado:**  
Se muestra un error de dosis. El registro no se crea, el contador no aumenta y no se añade una nueva entrada en `Última actividad`.

**Estado:** PASS

**Riesgo:**  
Aceptar un registro sin una dosis válida.

---

## Caso 2 — Dosis 0

**Precondición:**  
SafeDose abierto y formulario disponible.

**Datos de prueba:**
- Dosis: 0
- Resto de campos: válidos

**Pasos:**
1. Introducir `0` como dosis.
2. Completar el resto del formulario.
3. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El registro se rechaza.

**Resultado observado:**  
La dosis `0` es rechazada. El registro no se crea, el contador no aumenta y no se añade actividad.

**Estado:** PASS

**Riesgo:**  
Aceptar una dosis igual o inferior a 0.

---

## Caso 3 — Límite válido bajo: 0.1

**Precondición:**  
SafeDose abierto y formulario disponible.

**Datos de prueba:**
- Dosis: 0.1
- Resto de campos: válidos

**Pasos:**
1. Introducir `0.1` como dosis.
2. Completar el resto del formulario.
3. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El registro se acepta y la dosis se conserva como `0.1`.

**Resultado observado:**  
La dosis `0.1` es aceptada y se conserva correctamente. El contador aumenta y se añade una entrada en `Última actividad`.

**Estado:** PASS

**Riesgo:**  
Rechazar incorrectamente el límite mínimo válido.

---

## Caso 4 — Decimal válido: 0.5

**Precondición:**  
SafeDose abierto y formulario disponible.

**Datos de prueba:**
- Dosis: 0.5
- Resto de campos: válidos

**Pasos:**
1. Introducir `0.5` como dosis.
2. Completar el resto del formulario.
3. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El registro se acepta y la dosis se conserva sin truncarse.

**Resultado observado:**  
La dosis `0.5` es aceptada y se conserva correctamente sin truncarse ni redondearse.

**Estado:** PASS

**Riesgo:**  
Pérdida o modificación de valores decimales.

---

## Caso 5 — Límite válido alto: 9999

**Precondición:**  
SafeDose abierto y formulario disponible.

**Datos de prueba:**
- Dosis: 9999
- Resto de campos: válidos

**Pasos:**
1. Introducir `9999` como dosis.
2. Completar el resto del formulario.
3. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El registro se acepta y la dosis se conserva.

**Resultado observado:**  
La dosis `9999` es aceptada y se conserva correctamente.

**Estado:** PASS

**Riesgo:**  
Rechazar incorrectamente el límite máximo válido.

---

## Caso 6 — Dosis 10000

**Precondición:**  
SafeDose abierto y formulario disponible.

**Datos de prueba:**
- Dosis: 10000
- Resto de campos: válidos

**Pasos:**
1. Introducir `10000` como dosis.
2. Completar el resto del formulario.
3. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El registro se rechaza.

**Resultado observado:**  
La dosis `10000` es rechazada. El registro no se crea, el contador no aumenta y no se añade actividad.

**Estado:** PASS

**Riesgo:**  
Aceptar una dosis superior al límite máximo.

---

# Casos propios

## Caso propio 1 — Dosis manual inferior al mínimo: 0.05

**Precondición:**  
SafeDose abierto y formulario disponible.

**Datos de prueba:**
- Medicamento: LimiteManual
- Dosis: 0.05
- Unidad: mg
- Vía: Oral
- Frecuencia: Cada 8 h
- Alergias: Sí

**Pasos:**
1. Escribir manualmente `0.05` en el campo Dosis.
2. Completar el resto del formulario.
3. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El registro se rechaza porque el campo declara un mínimo de `0.1`.

**Resultado observado:**  
El registro se acepta, aparece en `Registros pendientes` y se añade una entrada en `Última actividad`.

**Estado:** FAIL

**Riesgo:**  
Inconsistencia en la validación del límite mínimo de dosis.

---

## Caso propio 2 — Alergias sin seleccionar

**Precondición:**  
SafeDose abierto y formulario disponible.

**Datos de prueba:**
- Medicamento: AlergiaTest
- Dosis: 10
- Unidad: mg
- Vía: Oral
- Frecuencia: Cada 8 h
- Alergias: sin seleccionar

**Pasos:**
1. Completar todos los campos obligatorios.
2. No seleccionar `Sí` ni `No` en alergias.
3. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El registro se rechaza porque el contraste de alergias aparece como obligatorio.

**Resultado observado:**  
El registro se acepta, aparece en `Registros pendientes` y se añade una entrada en `Última actividad`.

**Estado:** FAIL

**Riesgo:**  
Permitir un registro sin confirmar el contraste de alergias.

---

## Caso propio 3 — Duplicado con diferente capitalización

**Precondición:**  
SafeDose abierto y formulario disponible.

**Datos de prueba:**

Primer registro:
- Medicamento: DuplicadoCase
- Dosis: 50 mg
- Vía: Oral
- Frecuencia: Cada 8 h
- Alergias: Sí

Segundo registro:
- Medicamento: duplicadocase
- Dosis: 50 mg
- Vía: Oral
- Frecuencia: Cada 8 h
- Alergias: Sí

**Pasos:**
1. Añadir el primer registro.
2. Repetir los mismos datos cambiando únicamente las mayúsculas y minúsculas del medicamento.
3. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El segundo registro se detecta como duplicado y se rechaza.

**Resultado observado:**  
El segundo registro se acepta, aparece en `Registros pendientes` y se añade una nueva entrada en `Última actividad`.

**Estado:** FAIL

**Riesgo:**  
Duplicados no detectados por una comparación sensible a mayúsculas y minúsculas.

---

## Caso propio 4 — Misma dosis con distinta vía y frecuencia

**Precondición:**  
SafeDose abierto desde un estado limpio.

**Datos de prueba:**

Primer registro:
- Medicamento: RutaTest
- Dosis: 100 mg
- Vía: Oral
- Frecuencia: Cada 8 h
- Alergias: Sí

Segundo registro:
- Medicamento: RutaTest
- Dosis: 100 mg
- Vía: Intravenosa
- Frecuencia: Dosis única
- Alergias: Sí

**Pasos:**
1. Añadir el primer registro.
2. Completar de nuevo el formulario con el mismo medicamento, dosis y unidad.
3. Cambiar la vía a `Intravenosa`.
4. Cambiar la frecuencia a `Dosis única`.
5. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
El segundo registro se acepta porque la vía y la frecuencia son diferentes.

**Resultado observado:**  
El segundo registro se rechaza y aparece el mensaje `Ya existe un registro idéntico en la cola`.

El contador no aumenta y no se añade una nueva entrada en `Última actividad`.

**Estado:** FAIL

**Riesgo:**  
Rechazar como duplicados registros que contienen diferencias relevantes.

---

## Resumen

| Resultado | Total |
|---|---:|
| Pruebas ejecutadas | 10 |
| PASS | 6 |
| FAIL | 4 |

Los cuatro resultados `FAIL` son reproducibles sobre el commit `ec18a82` y requieren seguimiento mediante GitHub Issues.

## Issues relacionados

- #5 — El formulario permite añadir un registro sin confirmar las alergias.
- #6 — El formulario acepta una dosis inferior al mínimo declarado.
- #7 — La detección de duplicados distingue entre mayúsculas y minúsculas.
- #8 — La detección de duplicados ignora la vía y la frecuencia.