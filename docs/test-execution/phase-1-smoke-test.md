# Fase 1 — Smoke test

**Fecha:** 24/09/2026  
**Commit probado:** `b72c54b`  
**Navegador:** Google Chrome  
**Versión:** 153.0.8010.53  
**Sistema operativo:** Windows  

---

## E01 — Envío vacío

**Datos de prueba:**  
Formulario sin completar.

**Pasos:**
1. Abrir SafeDose.
2. Mantener todos los campos sin completar.
3. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
No se crea una nueva fila en la cola.

**Resultado observado:**  
Se muestran mensajes de validación para los campos obligatorios y la cola permanece con 2 registros. No se crea ninguna fila nueva.

**Estado:** PASS

---

## E02 — Envío válido

**Datos de prueba:**
- Medicamento: Ibuprofeno
- Dosis: 400
- Unidad: mg
- Vía: Oral
- Frecuencia: Cada 8 h
- Alergias: Sí
- Observaciones: vacío

**Pasos:**
1. Completar el formulario con datos válidos.
2. Pulsar `Añadir a revisión`.

**Resultado esperado:**  
Se crea una nueva fila, aumenta el contador y se añade una entrada al historial de actividad.

**Resultado observado:**  
El contador aumenta de 2 a 3 registros.  
Se añade una fila con `Ibuprofeno`, `400 mg`, `Oral`, `Cada 8 h`, `Contrastadas` y estado `Pendiente`.  
Se añade una nueva entrada en `Última actividad` indicando que `Ibuprofeno, 400 mg` fue añadido a revisión.

**Estado:** PASS

---

## E03 — Limpiar formulario

**Datos de prueba:**  
Formulario con varios campos completados y `Frecuencia` sin seleccionar.

**Pasos:**
1. Completar varios campos del formulario.
2. Dejar `Frecuencia` sin seleccionar.
3. Pulsar `Añadir a revisión` para mostrar el error.
4. Pulsar `Limpiar`.

**Resultado esperado:**  
El formulario vuelve a su estado inicial, desaparecen los errores y el contador de observaciones vuelve a `0/280`.

**Resultado observado:**  
Los campos se restablecen correctamente, el mensaje de error desaparece y el contador de observaciones vuelve a `0/280`.

**Estado:** PASS

---

## E04 — Red y Browser Console

**Pasos:**
1. Abrir las Developer Tools.
2. Activar `Disable cache` en Network.
3. Recargar la aplicación.
4. Revisar los recursos principales.
5. Revisar la Browser Console.

**Resultado esperado:**  
Los recursos principales cargan correctamente y no aparecen errores JavaScript no controlados.

**Resultado observado:**

| Recurso | Status |
|---|---:|
| index.html (documento raíz) | 200 |
| style.css | 200 |
| script.js | 200 |

No se detectan errores 404 y la Browser Console permanece limpia.

**Estado:** PASS

---

## Resumen

- Pruebas ejecutadas: 4
- PASS: 4
- FAIL: 0

El smoke test de la Fase 1 se completa correctamente sobre el commit `b72c54b`.