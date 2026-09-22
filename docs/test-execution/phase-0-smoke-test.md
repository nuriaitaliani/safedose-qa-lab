# Fase 0 — Smoke test inicial

**Fecha:** 22/09/2026  
**Commit probado:** `0b0eb67`  
**Navegador:** Google Chrome  
**Versión:** Versión 153.0.8010.53
**Sistema operativo:** Windows  

## E01 — Archivos del repositorio

**Resultado esperado:**  
El repositorio público contiene los archivos iniciales de SafeDose.

**Resultado observado:**  
Los archivos del proyecto están disponibles correctamente en el repositorio.

**Estado:** PASS

---

## E02 — Carga inicial de la aplicación

**Resultado esperado:**  
SafeDose carga correctamente y los estilos CSS se aplican.

**Resultado observado:**  
La aplicación carga correctamente y los estilos CSS se aplican sin errores visibles.

**Estado:** PASS

---

## E03 — Recursos principales

**Resultado esperado:**  
Los recursos principales cargan correctamente sin errores 404.

| Recurso | Status |
|---|---:|
| index.html | 200 |
| style.css | 200 |
| script.js | 200 |

**Resultado observado:**  
No se detectaron errores 404.

**Estado:** PASS

---

## E04 — Browser Console

**Resultado esperado:**  
No aparecen errores JavaScript bloqueantes o no controlados.

**Resultado observado:**  
La Console está limpia y no muestra errores.

**Estado:** PASS

---

## Resumen

- Pruebas ejecutadas: 4
- PASS: 4
- FAIL: 0