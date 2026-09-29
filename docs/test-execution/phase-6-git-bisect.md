# Fase 6 — Encontrar una regresión con git bisect

## Objetivo

Usar `git bisect` para encontrar el primer commit donde empezó a fallar una dosis decimal.

La regresión se creó de forma intencionada en la branch `qa/phase-6-bisect` para practicar el proceso.

---

## Caso de prueba

**ID:** SD-F-003

Se usó una dosis de:

`0.5 mL`

### GOOD

La aplicación acepta el registro y mantiene exactamente:

`0.5 mL`

### BAD

La dosis:

- cambia;
- se redondea;
- pierde los decimales;
- o se rechaza cuando no debería.

---

## Regresión detectada

En la branch `qa/phase-6-bisect`, al probar `0.5 mL`, la aplicación rechazó el registro y mostró:

`Introduce una dosis entre 0.1 y 9999.`

Resultado:

**BAD**

---

## Uso de git bisect

Se usó como commit GOOD conocido:

`c91c02d`

Comandos:

```bash
git bisect start
git bisect bad HEAD
git bisect good c91c02d
```

Git pidió comprobar este commit:

`a45e5b4 — Aclarar propósito educativo del laboratorio`

Se volvió a probar `0.5 mL`.

El registro funcionó correctamente, por lo que se marcó como:

**GOOD**

```bash
git bisect good
```

Git encontró como primer commit BAD:

`057295d — Ajustar formato de dosis`

**Comprobaciones intermedias realizadas:** 1

---

## Causa

El commit cambió:

```js
const dose = Number(data.get("dose"));
```

por:

```js
const dose = parseInt(data.get("dose"), 10);
```

Con `0.5` ocurre esto:

```text
Number("0.5") → 0.5
parseInt("0.5", 10) → 0
```

`parseInt()` elimina la parte decimal.

Por eso la dosis pasa a ser `0` y la aplicación la rechaza.

---

## Corrección

Se restauró:

```js
const dose = Number(data.get("dose"));
```

Commit de corrección:

`5df40fb — Restaurar conservación de dosis decimales`

---

## Validación final

Se volvió a probar:

`0.5 mL`

Resultado:

- el registro se acepta;
- la dosis se mantiene como `0.5 mL`.

**PASS**

---

## Conclusión

`git bisect` permitió encontrar el primer commit donde apareció la regresión.

Primer commit BAD:

`057295d — Ajustar formato de dosis`

La causa fue el uso de `parseInt()` con una dosis decimal.

Después de volver a usar `Number()`, la prueba pasó correctamente.

La branch `qa/phase-6-bisect` se conserva como evidencia y no se fusiona con `main`.

**Estado de Fase 6: PASS**