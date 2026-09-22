# SafeDose QA Lab

SafeDose QA Lab es un proyecto educativo de portafolio de QA (Aseguramiento de la Calidad) desarrollado en torno a un flujo de trabajo ficticio de revisión de medicamentos. La aplicación es el **sistema bajo prueba**; el propósito de este repositorio es documentar cómo se identifican, prueban, reportan y verifican los riesgos de calidad a lo largo del tiempo.

> **Entorno exclusivamente educativo.** Todos los nombres y registros son ficticios. SafeDose no calcula dosis, no diagnostica afecciones ni ofrece recomendaciones clínicas, y no debe utilizarse para tomar decisiones sanitarias reales.

## Enfoque del proyecto

El repositorio evolucionará mediante el trabajo habitual de QA: inspección, análisis de riesgos, diseño de pruebas, ejecución manual, reporte de defectos, pruebas de regresión, verificaciones de accesibilidad y, posteriormente, pruebas automatizadas seleccionadas.

El historial de Git, los *Issues* (incidencias) y los *Pull Requests* forman parte deliberada de la evidencia. La documentación de QA se añade a medida que se genera.

## Sistema bajo prueba

La aplicación inicial es un prototipo *front-end* estático construido con:

- HTML5
- CSS3
- JavaScript

Representa un flujo de trabajo ficticio para añadir registros de medicamentos a una cola de revisión.

## Estructura del repositorio

```text
safedose-qa-lab/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE/
├── index.html
├── style.css
├── script.js
├── .gitignore
└── README.md
```

Los artefactos de QA, tales como planes de prueba, análisis de riesgos, casos de prueba, evidencias de ejecución y pruebas automatizadas, se introducirán en ramas posteriores a medida que avance el proyecto.