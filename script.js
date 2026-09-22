"use strict";

const form = document.querySelector("#medication-form");
const errorSummary = document.querySelector("#error-summary");
const errorList = document.querySelector("#error-list");
const queueBody = document.querySelector("#queue-body");
const queueCount = document.querySelector("#queue-count");
const auditLog = document.querySelector("#audit-log");
const notes = document.querySelector("#notes");
const noteCount = document.querySelector("#note-count");
const toast = document.querySelector("#toast");

notes.addEventListener("input", () => {
  noteCount.textContent = notes.value.length;
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    noteCount.textContent = "0";
    clearErrors();
  }, 0);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const data = new FormData(form);
  const medication = String(data.get("medication") || "").trim();
  const dose = Number(data.get("dose"));
  const unit = String(data.get("unit") || "");
  const route = String(data.get("route") || "");
  const frequency = String(data.get("frequency") || "");
  const allergyChecked = String(data.get("allergyChecked") || "");
  const errors = [];

  if (medication.length < 2) errors.push({ field: "medication", message: "Escribe un medicamento de al menos 2 caracteres." });
  if (!Number.isFinite(dose) || dose <= 0 || dose > 9999) errors.push({ field: "dose", message: "Introduce una dosis mayor que 0 y menor o igual que 9999." });
  if (!unit) errors.push({ field: "unit", message: "Selecciona una unidad." });
  if (!route) errors.push({ field: "route", message: "Selecciona una vía." });
  if (!frequency) errors.push({ field: "frequency", message: "Selecciona una frecuencia." });

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  if (isDuplicate(medication, dose, unit)) {
    showErrors([{ field: "medication", message: "Ya existe un registro idéntico en la cola." }]);
    return;
  }

  addQueueRow({ medication, dose, unit, route, frequency, allergyChecked });
  addAuditEntry(medication, dose, unit);
  form.reset();
  showToast();
});

function isDuplicate(medication, dose, unit) {
  return [...queueBody.rows].some((row) => {
    const existingName = row.cells[0].textContent.trim();
    const existingDose = row.cells[1].textContent.trim();
    return existingName === medication && existingDose === `${dose} ${unit}`;
  });
}

function addQueueRow(record) {
  const row = document.createElement("tr");
  const allergyLabel = record.allergyChecked || "Sin confirmar";
  row.innerHTML = `
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><span class="tag pending">Pendiente</span></td>`;
  row.cells[0].textContent = record.medication;
  row.cells[1].textContent = `${record.dose} ${record.unit}`;
  row.cells[2].textContent = record.route;
  row.cells[3].textContent = record.frequency;
  row.cells[4].textContent = allergyLabel === "Sí" ? "Contrastadas" : allergyLabel;
  queueBody.append(row);
  updateQueueCount();
}

function addAuditEntry(medication, dose, unit) {
  const now = new Date();
  const time = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  const item = document.createElement("li");
  item.textContent = `${time} QA-DEMO añadió ${medication}, ${dose} ${unit}, a revisión.`;
  auditLog.prepend(item);
}

function showErrors(errors) {
  errors.forEach(({ field, message }) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${field}`;
    link.textContent = message;
    item.append(link);
    errorList.append(item);
    document.querySelector(`#${field}`)?.classList.add("invalid");
  });
  errorSummary.hidden = false;
  errorSummary.focus();
}

function clearErrors() {
  errorSummary.hidden = true;
  errorList.replaceChildren();
  document.querySelectorAll(".invalid").forEach((field) => field.classList.remove("invalid"));
}

function updateQueueCount() {
  const total = queueBody.rows.length;
  queueCount.textContent = `${total} ${total === 1 ? "registro" : "registros"}`;
}

function showToast() {
  toast.hidden = false;
  window.setTimeout(() => { toast.hidden = true; }, 2600);
}
