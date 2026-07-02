const stylists = ["Jules", "Amara", "Kenji", "Sasha"];
const storageKey = "glossdesk-appointments-v2";
const importedKey = "glossdesk-import-count-v1";

const seedAppointments = [
  { id: "apt-1", client: "Maya Bennett", email: "maya@example.com", service: "Gloss and style", stylist: "Jules", date: "2026-06-28", start: "09:00", duration: 60, status: "Checked in", notes: "Prefers low-fragrance products. Reserve leave-in conditioner." },
  { id: "apt-2", client: "Ari Chen", email: "ari@example.com", service: "Balayage consult", stylist: "Amara", date: "2026-06-28", start: "10:15", duration: 45, status: "Confirmed", notes: "Wants bright but low maintenance color." },
  { id: "apt-3", client: "Nina Patel", email: "nina@example.com", service: "Cut and blowout", stylist: "Kenji", date: "2026-06-28", start: "12:00", duration: 60, status: "Needs reply", notes: "Asked if appointment can move 20 minutes later." },
  { id: "apt-4", client: "Lena Ortiz", email: "lena@example.com", service: "Root touch-up", stylist: "Jules", date: "2026-06-28", start: "14:30", duration: 90, status: "Booked", notes: "VIP. Birthday offer eligible next week." }
];

const emails = [
  { from: "Nina Patel", subject: "Can we move my appointment?", time: "8:42 AM", linked: "Matched to client", body: "I might be about 20 minutes late today. Can we move my cut and blowout later?", action: "Open Nina's booking, update time, then send Outlook or Gmail reply." },
  { from: "Maya Bennett", subject: "Product from last visit", time: "Yesterday", linked: "Matched to VIP", body: "What was the leave-in conditioner you used after my gloss last time?", action: "Reserve product and add a note to today's appointment." },
  { from: "Ari Chen", subject: "Balayage photos", time: "Yesterday", linked: "Lead attached", body: "I want something bright but still easy to maintain because I travel for work.", action: "Save inspiration note and confirm consult." }
];

const reports = [
  { label: "Color", value: 78, amount: "$18.4k" },
  { label: "Cut and style", value: 61, amount: "$11.2k" },
  { label: "Treatments", value: 42, amount: "$6.9k" },
  { label: "Retail", value: 35, amount: "$4.8k" }
];

const viewTitles = {
  schedule: "Scheduling Studio",
  dashboard: "Front Desk Command Center",
  clients: "Client CRM",
  email: "Email Hub",
  integrations: "Calendar Integrations",
  reports: "Salon Performance"
};

let appointments = loadAppointments();
let selectedId = appointments[0]?.id || null;

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

function loadAppointments() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || seedAppointments;
  } catch {
    return seedAppointments;
  }
}

function saveAppointments() {
  localStorage.setItem(storageKey, JSON.stringify(appointments));
}

function showToast(message) {
  const toast = qs("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function selectedAppointment() {
  return appointments.find(item => item.id === selectedId) || appointments[0] || null;
}

function toDate(appointment, end = false) {
  const [hour, minute] = appointment.start.split(":").map(Number);
  const date = new Date(`${appointment.date}T00:00:00`);
  date.setHours(hour, minute, 0, 0);
  if (end) date.setMinutes(date.getMinutes() + Number(appointment.duration));
  return date;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatDateRange(appointment) {
  const start = toDate(appointment);
  const end = toDate(appointment, true);
  return `${appointment.date} ${formatTime(start)}-${formatTime(end)}`;
}

function calendarDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcs(value) {
  return String(value || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function appointmentSummary(appointment) {
  return `${appointment.client} - ${appointment.service}`;
}

function appointmentDescription(appointment) {
  return `Client: ${appointment.client}\nEmail: ${appointment.email || ""}\nService: ${appointment.service}\nStylist: ${appointment.stylist}\nStatus: ${appointment.status}\nNotes: ${appointment.notes || ""}`;
}

function buildIcs(items) {
  const events = items.map(appointment => [
    "BEGIN:VEVENT",
    `UID:${appointment.id}@glossdesk.local`,
    `DTSTAMP:${calendarDate(new Date())}`,
    `DTSTART:${calendarDate(toDate(appointment))}`,
    `DTEND:${calendarDate(toDate(appointment, true))}`,
    `SUMMARY:${escapeIcs(appointmentSummary(appointment))}`,
    `DESCRIPTION:${escapeIcs(appointmentDescription(appointment))}`,
    "LOCATION:Salon",
    "END:VEVENT"
  ].join("\r\n")).join("\r\n");

  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//GlossDesk//Salon CRM//EN", "CALSCALE:GREGORIAN", events, "END:VCALENDAR"].join("\r\n");
}

function downloadFile(filename, contents, type = "text/calendar") {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function googleCalendarUrl(appointment) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: appointmentSummary(appointment),
    dates: `${calendarDate(toDate(appointment))}/${calendarDate(toDate(appointment, true))}`,
    details: appointmentDescription(appointment),
    location: "Salon"
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function outlookCalendarUrl(appointment) {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: appointmentSummary(appointment),
    startdt: toDate(appointment).toISOString(),
    enddt: toDate(appointment, true).toISOString(),
    body: appointmentDescription(appointment),
    location: "Salon"
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function renderSchedule() {
  const hours = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"];
  const chunks = [`<div class="grid-head">Time</div>`, ...stylists.map(stylist => `<div class="grid-head">${stylist}</div>`)];

  hours.forEach(hour => {
    chunks.push(`<div class="time-cell">${hour}</div>`);
    stylists.forEach(stylist => {
      const displayHour = Number(hour.split(":")[0]);
      const hourNumber = displayHour >= 1 && displayHour <= 5 ? displayHour + 12 : displayHour;
      const matches = appointments.filter(item => item.date === "2026-06-28" && item.stylist === stylist && Number(item.start.split(":")[0]) === hourNumber);
      chunks.push(`<div class="calendar-cell">${matches.map(renderBookingCard).join("")}</div>`);
    });
  });

  qs("#calendar-grid").innerHTML = chunks.join("");
  qsa("[data-appointment]").forEach(button => button.addEventListener("click", () => selectAppointment(button.dataset.appointment)));
}

function renderBookingCard(appointment) {
  const statusClass = appointment.status.toLowerCase().replace(/\s+/g, "-");
  return `
    <button class="booking-card ${statusClass} ${appointment.id === selectedId ? "active" : ""}" data-appointment="${appointment.id}">
      <strong>${formatTime(toDate(appointment))} ${appointment.client}</strong>
      <span>${appointment.service}</span>
      <span>${appointment.status}</span>
    </button>
  `;
}

function selectAppointment(id) {
  selectedId = id;
  const appointment = selectedAppointment();
  if (!appointment) return;
  fillForm(appointment);
  renderSchedule();
  renderSelected();
}

function fillForm(appointment) {
  qs("#form-heading").textContent = "Edit appointment";
  qs("#appointment-id").value = appointment.id;
  qs("#client-input").value = appointment.client;
  qs("#email-input").value = appointment.email || "";
  qs("#service-input").value = appointment.service;
  qs("#stylist-input").value = appointment.stylist;
  qs("#date-input").value = appointment.date;
  qs("#start-input").value = appointment.start;
  qs("#duration-input").value = appointment.duration;
  qs("#status-input").value = appointment.status;
  qs("#notes-input").value = appointment.notes || "";
}

function clearForm() {
  qs("#form-heading").textContent = "Create appointment";
  qs("#appointment-id").value = "";
  qs("#client-input").value = "";
  qs("#email-input").value = "";
  qs("#service-input").value = "";
  qs("#stylist-input").value = stylists[0];
  qs("#date-input").value = "2026-06-28";
  qs("#start-input").value = "09:00";
  qs("#duration-input").value = "60";
  qs("#status-input").value = "Booked";
  qs("#notes-input").value = "";
}

function deleteSelectedAppointment() {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select an appointment first.");
  appointments = appointments.filter(item => item.id !== appointment.id);
  selectedId = appointments[0]?.id || null;
  saveAppointments();
  renderAll();
  if (selectedAppointment()) fillForm(selectedAppointment());
  else clearForm();
  showToast("Appointment deleted.");
}

function renderSelected() {
  const appointment = selectedAppointment();
  if (!appointment) {
    qs("#selected-title").textContent = "No appointment selected";
    qs("#selected-detail").textContent = "Select a booking to send it to Google, Outlook, or export an .ics file.";
    return;
  }
  qs("#selected-title").textContent = appointmentSummary(appointment);
  qs("#selected-detail").textContent = `${formatDateRange(appointment)} with ${appointment.stylist}. ${appointment.notes || ""}`;
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const id = qs("#appointment-id").value || `apt-${Date.now()}`;
  const appointment = {
    id,
    client: qs("#client-input").value.trim(),
    email: qs("#email-input").value.trim(),
    service: qs("#service-input").value.trim(),
    stylist: qs("#stylist-input").value,
    date: qs("#date-input").value,
    start: qs("#start-input").value,
    duration: Number(qs("#duration-input").value),
    status: qs("#status-input").value,
    notes: qs("#notes-input").value.trim()
  };

  const existingIndex = appointments.findIndex(item => item.id === id);
  if (existingIndex >= 0) appointments[existingIndex] = appointment;
  else appointments.push(appointment);

  selectedId = id;
  saveAppointments();
  renderAll();
  fillForm(appointment);
  showToast("Appointment saved locally.");
}

function openSelected(provider) {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select an appointment first.");
  const url = provider === "google" ? googleCalendarUrl(appointment) : outlookCalendarUrl(appointment);
  window.open(url, "_blank", "noopener,noreferrer");
  showToast(`Opened ${provider === "google" ? "Google" : "Outlook"} calendar draft.`);
}

function downloadSelectedIcs() {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select an appointment first.");
  downloadFile(`${appointment.client.replace(/\s+/g, "-").toLowerCase()}-${appointment.date}.ics`, buildIcs([appointment]));
  showToast("Downloaded .ics file.");
}

function copySelectedSummary() {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select an appointment first.");
  const text = `${appointmentSummary(appointment)}\n${formatDateRange(appointment)}\n${appointmentDescription(appointment)}`;
  navigator.clipboard?.writeText(text).then(() => showToast("Copied appointment summary."), () => showToast(text));
}

function parseIcsDate(value) {
  const clean = value.replace("Z", "");
  const year = clean.slice(0, 4);
  const month = clean.slice(4, 6);
  const day = clean.slice(6, 8);
  const hour = clean.slice(9, 11) || "09";
  const minute = clean.slice(11, 13) || "00";
  return { date: `${year}-${month}-${day}`, time: `${hour}:${minute}` };
}

function readIcs(text) {
  const blocks = text.split("BEGIN:VEVENT").slice(1);
  return blocks.map((block, index) => {
    const read = (key) => {
      const line = block.split(/\r?\n/).find(item => item.startsWith(`${key}:`) || item.startsWith(`${key};`));
      return line ? line.slice(line.indexOf(":") + 1).replace(/\\n/g, "\n").replace(/\\,/g, ",").replace(/\\;/g, ";") : "";
    };
    const start = parseIcsDate(read("DTSTART"));
    const end = parseIcsDate(read("DTEND"));
    const startDate = new Date(`${start.date}T${start.time}:00`);
    const endDate = new Date(`${end.date}T${end.time}:00`);
    const duration = Math.max(30, Math.round((endDate - startDate) / 60000) || 60);
    const summary = read("SUMMARY") || "Imported appointment";
    const [client, service] = summary.includes(" - ") ? summary.split(" - ") : [summary, "Imported service"];
    return {
      id: `import-${Date.now()}-${index}`,
      client,
      email: "",
      service,
      stylist: stylists[index % stylists.length],
      date: start.date,
      start: start.time,
      duration,
      status: "Imported",
      notes: read("DESCRIPTION")
    };
  });
}

function handleIcsImport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const imported = readIcs(String(reader.result || ""));
    if (!imported.length) return showToast("No events found in that .ics file.");
    appointments = [...appointments, ...imported];
    selectedId = imported[0].id;
    localStorage.setItem(importedKey, String(Number(localStorage.getItem(importedKey) || 0) + imported.length));
    saveAppointments();
    renderAll();
    fillForm(imported[0]);
    showToast(`Imported ${imported.length} calendar event${imported.length === 1 ? "" : "s"}.`);
  };
  reader.readAsText(file);
}

function renderClients() {
  const byClient = [...new Map(appointments.map(item => [item.client, item])).values()];
  qs("#client-list").innerHTML = byClient.map((client, index) => `
    <button class="client-row ${index === 0 ? "active" : ""}" data-client="${client.client}">
      <strong>${client.client}</strong>
      <span class="subline">${client.email || "No email"} - next ${client.date}</span>
    </button>
  `).join("");

  qsa("[data-client]").forEach(button => button.addEventListener("click", () => {
    qsa(".client-row").forEach(row => row.classList.toggle("active", row === button));
    const clientAppointments = appointments.filter(item => item.client === button.dataset.client);
    renderClientProfile(button.dataset.client, clientAppointments);
  }));
  if (byClient[0]) renderClientProfile(byClient[0].client, appointments.filter(item => item.client === byClient[0].client));
}

function renderClientProfile(clientName, items) {
  const totalMinutes = items.reduce((sum, item) => sum + Number(item.duration), 0);
  qs("#client-profile").innerHTML = `
    <p class="eyebrow">Client profile</p>
    <h2>${clientName}</h2>
    <div class="profile-grid">
      <div><strong>${items.length}</strong><span class="subline">Appointments</span></div>
      <div><strong>${totalMinutes}</strong><span class="subline">Booked minutes</span></div>
      <div><strong>${items[0]?.status || "New"}</strong><span class="subline">Latest status</span></div>
    </div>
    <p>${items.map(item => `${item.date} ${item.start}: ${item.service} with ${item.stylist}`).join("<br>")}</p>
  `;
}

function renderEmail() {
  qs("#inbox-list").innerHTML = emails.map((email, index) => `
    <button class="email-row ${index === 0 ? "active" : ""}" data-email="${index}">
      <strong>${email.from}</strong>
      <span class="subline">${email.subject}</span>
      <span class="subline">${email.linked}</span>
    </button>
  `).join("");
  qsa("[data-email]").forEach(button => button.addEventListener("click", () => selectEmail(Number(button.dataset.email))));
  selectEmail(0);
}

function selectEmail(index = 0) {
  qsa(".email-row").forEach((row, i) => row.classList.toggle("active", i === index));
  const email = emails[index];
  qs("#message-panel").innerHTML = `
    <p class="eyebrow">${email.linked}</p>
    <h2>${email.subject}</h2>
    <p class="subline">From ${email.from} - ${email.time}</p>
    <div class="message-copy">${email.body}</div>
    <p><strong>Suggested action:</strong> ${email.action}</p>
    <div class="button-row">
      <button class="secondary-button" onclick="window.location.href='mailto:${encodeURIComponent(email.from)}?subject=${encodeURIComponent(`Re: ${email.subject}`)}'">Reply by email</button>
      <button class="primary-button" onclick="document.querySelector('[data-view=schedule]').click()">Open schedule</button>
    </div>
  `;
}

function renderReports() {
  qs("#bar-chart").innerHTML = reports.map(row => `
    <div class="bar-row">
      <strong>${row.label}</strong>
      <div class="bar-track"><span style="width:${row.value}%"></span></div>
      <span>${row.amount}</span>
    </div>
  `).join("");
}

function renderMetrics() {
  qs("#booked-metric").textContent = appointments.length;
  qs("#confirmed-metric").textContent = appointments.filter(item => item.status === "Confirmed").length;
  qs("#reply-metric").textContent = appointments.filter(item => item.status === "Needs reply").length;
  qs("#imported-metric").textContent = localStorage.getItem(importedKey) || "0";
}

function checkLiveStatus() {
  fetch("/api/salon-crm/status")
    .then(response => response.json())
    .then(status => {
      qs("#live-status").textContent = `${status.app} is running locally`;
      qs("#live-detail").textContent = `Mode: ${status.mode}. Available handoffs: ${status.calendarHandoffs.join(", ")}.`;
    })
    .catch(() => {
      qs("#live-status").textContent = "Static file mode";
      qs("#live-detail").textContent = "Start the local server to use the localhost version. Calendar links and .ics tools still work from the file version.";
    });
}

function switchView(view) {
  qsa(".view").forEach(section => section.classList.toggle("active", section.id === view));
  qsa(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === view));
  qs("#view-title").textContent = viewTitles[view];
}

function renderAll() {
  renderSchedule();
  renderSelected();
  renderClients();
  renderEmail();
  renderReports();
  renderMetrics();
}

function init() {
  qs("#stylist-input").innerHTML = stylists.map(stylist => `<option>${stylist}</option>`).join("");
  qsa("[data-view]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
  qs("#booking-form").addEventListener("submit", handleBookingSubmit);
  qs("#clear-form").addEventListener("click", clearForm);
  qs("#delete-appointment").addEventListener("click", deleteSelectedAppointment);
  qs("#new-appointment").addEventListener("click", () => {
    switchView("schedule");
    clearForm();
    qs("#client-input").focus();
  });
  qs("#google-link").addEventListener("click", () => openSelected("google"));
  qs("#outlook-link").addEventListener("click", () => openSelected("outlook"));
  qs("#download-ics").addEventListener("click", downloadSelectedIcs);
  qs("#copy-summary").addEventListener("click", copySelectedSummary);
  qs("#export-all").addEventListener("click", () => {
    downloadFile("glossdesk-appointments.ics", buildIcs(appointments));
    showToast("Exported all appointments.");
  });
  qs("#reset-demo").addEventListener("click", () => {
    appointments = seedAppointments.map(item => ({ ...item }));
    selectedId = appointments[0].id;
    localStorage.removeItem(importedKey);
    saveAppointments();
    renderAll();
    fillForm(selectedAppointment());
    showToast("Demo data reset.");
  });
  qsa("[data-open-selected]").forEach(button => button.addEventListener("click", () => openSelected(button.dataset.openSelected)));
  qs("#import-trigger").addEventListener("click", () => qs("#ics-import").click());
  qs("#import-trigger-2").addEventListener("click", () => qs("#ics-import").click());
  qs("#ics-import").addEventListener("change", event => handleIcsImport(event.target.files[0]));
  qs("#global-search").addEventListener("input", event => {
    const term = event.target.value.toLowerCase();
    qsa(".booking-card").forEach(card => card.style.display = card.textContent.toLowerCase().includes(term) ? "grid" : "none");
  });
  renderAll();
  if (selectedAppointment()) fillForm(selectedAppointment());
  checkLiveStatus();
}

init();
