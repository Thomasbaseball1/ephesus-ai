const stylists = ["Ramos", "Keisha", "Dawson", "Priya"];
const storageKey = "dispatchboard-jobs-v1";
const importedKey = "dispatchboard-import-count-v1";
const paymentsKey = "dispatchboard-payments-v1";
const demoBridgeSeenKey = "dispatchboard-demo-bridge-seen-v1";
const legacySeedDate = "2026-06-28";

const services = [
  { category: "HVAC", name: "AC diagnostic", duration: 90, price: 149 },
  { category: "HVAC", name: "No-cool emergency", duration: 120, price: 225 },
  { category: "HVAC", name: "Seasonal tune-up", duration: 75, price: 129 },
  { category: "HVAC", name: "Mini-split service", duration: 120, price: 245 },
  { category: "HVAC", name: "Furnace repair", duration: 120, price: 195 },
  { category: "HVAC", name: "System replacement estimate", duration: 90, price: 0 },
  { category: "Plumbing", name: "Leak inspection", duration: 90, price: 175 },
  { category: "Plumbing", name: "Water heater repair", duration: 120, price: 225 },
  { category: "Plumbing", name: "Drain cleaning", duration: 90, price: 189 },
  { category: "Plumbing", name: "Sewer camera inspection", duration: 120, price: 299 },
  { category: "Plumbing", name: "Fixture install", duration: 150, price: 349 },
  { category: "Plumbing", name: "Emergency shutoff / flood call", duration: 120, price: 275 },
  { category: "Maintenance", name: "Membership visit", duration: 90, price: 0 },
  { category: "Maintenance", name: "Filter and safety check", duration: 60, price: 89 },
  { category: "Sales", name: "Comfort advisor estimate", duration: 120, price: 0 },
  { category: "Custom", name: "Custom work order", duration: 90, price: 0 }
];

const seedAppointments = [
  { id: "apt-1", client: "Bennett Residence", email: "maya@example.com", service: "AC diagnostic", price: 149, stylist: "Ramos", date: "2026-06-28", start: "09:00", duration: 90, status: "Dispatched", paymentStatus: "Paid", notes: "Gate code 1842. Upstairs unit not cooling; customer reports thermostat is blank." },
  { id: "apt-2", client: "Chen Dental Group", email: "facilities@chendental.example", service: "Water heater repair", price: 225, stylist: "Keisha", date: "2026-06-28", start: "10:30", duration: 120, status: "Confirmed", paymentStatus: "Deposit", notes: "Commercial account. Bring expansion tank and gas flex options." },
  { id: "apt-3", client: "Patel Duplex", email: "nina@example.com", service: "Drain cleaning", price: 189, stylist: "Dawson", date: "2026-06-28", start: "12:00", duration: 90, status: "Needs reply", paymentStatus: "Unpaid", notes: "Tenant can meet tech after noon. Kitchen sink backing up." },
  { id: "apt-4", client: "Ortiz Property Mgmt", email: "service@ortizpm.example", service: "Leak inspection", price: 175, stylist: "Ramos", date: "2026-06-28", start: "14:30", duration: 90, status: "Booked", paymentStatus: "Unpaid", notes: "Unit 4B ceiling stain. Call property manager before entering." },
  { id: "apt-5", client: "Northline Market", email: "ops@northline.example", service: "Seasonal tune-up", price: 129, stylist: "Priya", date: "2026-06-28", start: "15:00", duration: 75, status: "Confirmed", paymentStatus: "Unpaid", notes: "Rooftop access key at front counter. Replace filters if needed." }
];

const seedPayments = [
  { id: "pay-1", appointmentId: "apt-1", client: "Bennett Residence", amount: 149, method: "Card", note: "Diagnostic collected on site", date: "2026-06-28", createdAt: "2026-06-28T09:58:00" },
  { id: "pay-2", appointmentId: "apt-2", client: "Chen Dental Group", amount: 75, method: "Deposit", note: "Commercial dispatch deposit", date: "2026-06-28", createdAt: "2026-06-28T10:05:00" }
];

const emails = [
  { from: "Nina Patel", subject: "Tenant available after lunch", time: "8:42 AM", linked: "Matched to customer", body: "The tenant can meet the tech after 12 today. The kitchen sink is still backing up.", action: "Open Patel Duplex job, confirm the arrival window, then send an Outlook or Gmail reply." },
  { from: "Maya Bennett", subject: "Thermostat went blank", time: "Yesterday", linked: "Matched to service address", body: "The upstairs thermostat screen is blank and the AC has been off since last night.", action: "Add thermostat notes to the job and keep AC diagnostic on the board." },
  { from: "Chen Dental Group", subject: "Hot water issue before afternoon patients", time: "Yesterday", linked: "Commercial account", body: "Can your technician arrive before lunch? We need hot water back before the afternoon schedule.", action: "Flag as commercial priority and confirm arrival window." }
];

const reports = [
  { label: "HVAC repairs", value: 78, amount: "$18.4k" },
  { label: "Plumbing calls", value: 61, amount: "$11.2k" },
  { label: "Maintenance", value: 42, amount: "$6.9k" },
  { label: "Estimates", value: 35, amount: "$4.8k" }
];

const estimates = [
  { customer: "Bennett Residence", type: "System replacement", amount: 11800, status: "Sent", financing: "Wisetack-ready" },
  { customer: "Chen Dental Group", type: "Tankless water heater", amount: 7400, status: "Viewed", financing: "Synchrony option" },
  { customer: "Ortiz Property Mgmt", type: "Leak repair options", amount: 1850, status: "Draft", financing: "No financing" },
  { customer: "Northline Market", type: "Maintenance agreement", amount: 2280, status: "Accepted", financing: "GoodLeap-ready" }
];

const accountingQueue = [
  { item: "Invoice INV-1042", target: "QuickBooks Online", amount: 149, status: "Ready" },
  { item: "Deposit DEP-332", target: "Xero", amount: 75, status: "Needs review" },
  { item: "Parts bill PO-881", target: "QuickBooks Online", amount: 312, status: "Mapped" },
  { item: "Tax summary", target: "Xero", amount: 38, status: "Ready" }
];

const phoneCalls = [
  { caller: "Bennett Residence", line: "Main office", reason: "AC stopped cooling", status: "Booked" },
  { caller: "Unknown mobile", line: "Emergency line", reason: "Burst pipe", status: "Needs dispatch" },
  { caller: "Chen Dental Group", line: "Commercial", reason: "Hot water outage", status: "Linked to job" }
];

const teamMessages = [
  { from: "Dispatch", body: "Ramos is en route to Bennett Residence. ETA 9:08.", tag: "Dispatch" },
  { from: "Keisha", body: "Need approval for expansion tank on Chen Dental quote.", tag: "Parts" },
  { from: "Priya", body: "Northline rooftop unit filters are 20x25x4. Add to inventory note.", tag: "Inventory" }
];

const toolStack = [
  { functionName: "Field Service Management", tools: "ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion", status: "Core app shell" },
  { functionName: "Scheduling & Dispatch", tools: "ServiceTitan, Jobber", status: "Live dispatch board" },
  { functionName: "CRM", tools: "HubSpot, Salesforce, Zoho CRM", status: "Customer profiles + history" },
  { functionName: "Accounting", tools: "QuickBooks Online, Xero", status: "Sync queue demo" },
  { functionName: "Estimates & Proposals", tools: "ServiceTitan, Housecall Pro, QuoteIQ", status: "Good-better-best builder" },
  { functionName: "Payments", tools: "Stripe, Square", status: "Local ledger + payment links" },
  { functionName: "Financing", tools: "GoodLeap, Synchrony, Wisetack", status: "Offer handoff demo" },
  { functionName: "Phones", tools: "RingCentral, OpenPhone", status: "Call-to-job workflow" },
  { functionName: "Team Chat", tools: "Slack, Microsoft Teams", status: "Dispatch channel" }
];

const viewTitles = {
  schedule: "Dispatch Board",
  dashboard: "Operations Command Center",
  clients: "Customer CRM",
  estimates: "Estimates + Proposals",
  email: "Email Hub",
  payments: "Payments",
  accounting: "Accounting Sync",
  phones: "Phone Center",
  team: "Team Chat",
  integrations: "Calendar Integrations",
  reports: "Service Performance"
};

let appointments = loadAppointments();
let payments = loadPayments();
let viewDate = todayIso();
let selectedId = appointments.find(item => item.date === viewDate)?.id || appointments[0]?.id || null;

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

function serviceByName(name) {
  return services.find(service => service.name === name) || services.find(service => service.name === "Custom work order");
}

function formatCurrency(amount) {
  return Number(amount || 0).toLocaleString([], { style: "currency", currency: "USD" });
}

function appointmentPayments(appointmentId) {
  return payments.filter(payment => payment.appointmentId === appointmentId);
}

function paidForAppointment(appointmentId) {
  return appointmentPayments(appointmentId).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
}

function balanceForAppointment(appointment) {
  return Math.max(0, Number(appointment.price || 0) - paidForAppointment(appointment.id));
}

function syncPaymentStatus(appointment) {
  if (appointment.paymentStatus === "Comped") return "Comped";
  const paid = paidForAppointment(appointment.id);
  const price = Number(appointment.price || 0);
  if (price <= 0) return appointment.paymentStatus || "Unpaid";
  if (paid >= price) return "Paid";
  if (paid > 0) return "Deposit";
  return "Unpaid";
}

function loadAppointments() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    return normalizeAppointments(stored || seedAppointments);
  } catch {
    return normalizeAppointments(seedAppointments);
  }
}

function saveAppointments() {
  localStorage.setItem(storageKey, JSON.stringify(appointments));
}

function loadPayments() {
  try {
    const stored = JSON.parse(localStorage.getItem(paymentsKey));
    return normalizePayments(stored || seedPayments);
  } catch {
    return normalizePayments(seedPayments);
  }
}

function savePayments() {
  localStorage.setItem(paymentsKey, JSON.stringify(payments));
}

function todayIso() {
  const date = new Date();
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function normalizeAppointments(items) {
  const copy = items.map(item => ({ ...item }));
  const hasToday = copy.some(item => item.date === todayIso());
  const seedIds = new Set(seedAppointments.map(item => item.id));
  const onlyLegacySeed = copy.length > 0 && copy.every(item => seedIds.has(item.id) && item.date === legacySeedDate);
  const normalized = !hasToday && onlyLegacySeed ? copy.map(item => ({ ...item, date: todayIso() })) : copy;
  return normalized.map(item => {
    const service = serviceByName(item.service);
    return {
      ...item,
      service: item.service || "Custom work order",
      price: Number(item.price ?? service?.price ?? 0),
      duration: Number(item.duration || service?.duration || 60),
      paymentStatus: item.paymentStatus || "Unpaid"
    };
  });
}

function normalizePayments(items) {
  const seedPaymentIds = new Set(seedPayments.map(item => item.id));
  const onlySeedPayments = items.length > 0 && items.every(item => seedPaymentIds.has(item.id) && item.date === legacySeedDate);
  return items.map(item => ({
    ...item,
    amount: Number(item.amount || 0),
    date: onlySeedPayments ? todayIso() : (item.date || todayIso()),
    createdAt: onlySeedPayments ? `${todayIso()}T${(item.createdAt || "09:00:00").slice(11, 19)}` : (item.createdAt || new Date().toISOString())
  }));
}

function formatScheduleDate(dateIso) {
  const date = new Date(`${dateIso}T12:00:00`);
  return date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function shiftDate(dateIso, days) {
  const date = new Date(`${dateIso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function showToast(message) {
  const toast = qs("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function parseDemoBookingNotes(notes) {
  try {
    const parsed = JSON.parse(notes || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return { notes };
  }
}

function demoBookingToAppointment(booking) {
  const meta = parseDemoBookingNotes(booking.notes);
  const serviceName = serviceByName(meta.service || meta.jobType)?.name || "Custom work order";
  const service = serviceByName(serviceName);
  const technician = stylists.includes(meta.technician) ? meta.technician : stylists[0];

  return {
    id: `demo-booking-${booking.id}`,
    client: booking.name || "Phone Demo Customer",
    email: booking.email || "phone-demo@example.com",
    service: serviceName,
    price: Number(meta.price ?? service?.price ?? 0),
    stylist: technician,
    date: booking.date || todayIso(),
    start: String(meta.start || booking.timeSlot || "09:00").slice(0, 5),
    duration: Number(meta.duration || service?.duration || 90),
    status: "Booked",
    paymentStatus: "Unpaid",
    notes: [
      "Booked from the Vapi phone demo.",
      meta.phone ? `Caller phone: ${meta.phone}` : "",
      meta.notes || meta.issue || ""
    ].filter(Boolean).join("\n")
  };
}

async function syncDemoCrmBookings(showToastOnImport = true) {
  try {
    const response = await fetch("/api/demo-crm/bookings", { cache: "no-store" });
    if (!response.ok) return;

    const data = await response.json();
    const rows = Array.isArray(data.bookings) ? data.bookings : [];
    const seen = new Set(JSON.parse(localStorage.getItem(demoBridgeSeenKey) || "[]").map(String));
    const existingIds = new Set(appointments.map(item => item.id));
    const imported = [];

    rows.forEach(row => {
      const appointment = demoBookingToAppointment(row);
      if (!existingIds.has(appointment.id)) {
        appointments.push(appointment);
        imported.push(appointment);
        existingIds.add(appointment.id);
      }
      seen.add(String(row.id));
    });

    localStorage.setItem(demoBridgeSeenKey, JSON.stringify([...seen]));

    if (imported.length) {
      const newest = imported[0];
      selectedId = newest.id;
      viewDate = newest.date;
      saveAppointments();
      renderAll();
      renderClientSuggestions();
      if (showToastOnImport) {
        showToast(`Imported ${imported.length} phone booking${imported.length === 1 ? "" : "s"} into the CRM calendar.`);
      }
    }
  } catch (error) {
    console.warn("[demo-crm] Booking sync failed", error);
  }
}

function selectedAppointment() {
  return appointments.find(item => item.id === selectedId) || appointments.find(item => item.date === viewDate) || appointments[0] || null;
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
  return `Customer/site: ${appointment.client}\nEmail: ${appointment.email || ""}\nJob type: ${appointment.service}\nTechnician: ${appointment.stylist}\nStatus: ${appointment.status}\nNotes: ${appointment.notes || ""}`;
}

function buildIcs(items) {
  const events = items.map(appointment => [
    "BEGIN:VEVENT",
    `UID:${appointment.id}@dispatchboard.local`,
    `DTSTAMP:${calendarDate(new Date())}`,
    `DTSTART:${calendarDate(toDate(appointment))}`,
    `DTEND:${calendarDate(toDate(appointment, true))}`,
    `SUMMARY:${escapeIcs(appointmentSummary(appointment))}`,
    `DESCRIPTION:${escapeIcs(appointmentDescription(appointment))}`,
    "LOCATION:Customer site",
    "END:VEVENT"
  ].join("\r\n")).join("\r\n");

  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//DispatchBoard//HVAC Plumbing CRM//EN", "CALSCALE:GREGORIAN", events, "END:VCALENDAR"].join("\r\n");
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
    location: "Customer site"
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
    location: "Customer site"
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function renderSchedule() {
  const hours = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"];
  const chunks = [`<div class="grid-head">Time</div>`, ...stylists.map(stylist => `<div class="grid-head">${stylist}</div>`)];
  qs("#schedule-date-title").textContent = formatScheduleDate(viewDate);
  qs("#schedule-date-picker").value = viewDate;

  hours.forEach(hour => {
    chunks.push(`<div class="time-cell">${hour}</div>`);
    stylists.forEach(stylist => {
      const displayHour = Number(hour.split(":")[0]);
      const hourNumber = displayHour >= 1 && displayHour <= 5 ? displayHour + 12 : displayHour;
      const matches = appointments.filter(item => item.date === viewDate && item.stylist === stylist && Number(item.start.split(":")[0]) === hourNumber);
      chunks.push(`<div class="calendar-cell">${matches.map(renderBookingCard).join("")}</div>`);
    });
  });

  qs("#calendar-grid").innerHTML = chunks.join("");
  qsa("[data-appointment]").forEach(button => button.addEventListener("click", () => selectAppointment(button.dataset.appointment)));
}

function renderBookingCard(appointment) {
  const statusClass = appointment.status.toLowerCase().replace(/\s+/g, "-");
  const paid = paidForAppointment(appointment.id);
  const balance = balanceForAppointment(appointment);
  return `
    <button class="booking-card ${statusClass} ${appointment.id === selectedId ? "active" : ""}" data-appointment="${appointment.id}">
      <strong>${formatTime(toDate(appointment))} ${appointment.client}</strong>
      <span>${appointment.service}</span>
      <span>${appointment.status} · ${formatCurrency(appointment.price)} · ${balance > 0 ? `${formatCurrency(balance)} due` : `paid ${formatCurrency(paid)}`}</span>
    </button>
  `;
}

function selectAppointment(id) {
  selectedId = id;
  const appointment = selectedAppointment();
  if (!appointment) return;
  renderSchedule();
  renderSelected();
}

function editSelectedAppointment() {
  const appointment = appointments.find(item => item.id === selectedId);
  if (!appointment) return showToast("Select a job to edit.");
  fillForm(appointment);
  showToast("Editing selected job.");
}

function fillForm(appointment) {
  qs("#form-heading").textContent = "Edit job";
  qs("#appointment-id").value = appointment.id;
  qs("#client-input").value = appointment.client;
  qs("#email-input").value = appointment.email || "";
  qs("#service-input").value = appointment.service;
  qs("#stylist-input").value = appointment.stylist;
  qs("#date-input").value = appointment.date;
  qs("#start-input").value = appointment.start;
  qs("#duration-input").value = appointment.duration;
  qs("#price-input").value = Number(appointment.price || 0).toFixed(2);
  qs("#status-input").value = appointment.status;
  qs("#payment-status-input").value = syncPaymentStatus(appointment);
  qs("#allow-overlap-input").checked = false;
  qs("#notes-input").value = appointment.notes || "";
  hideConflict();
}

function clearForm() {
  qs("#form-heading").textContent = "Create job";
  qs("#appointment-id").value = "";
  qs("#client-input").value = "";
  qs("#email-input").value = "";
  qs("#service-input").value = services[0].name;
  qs("#stylist-input").value = stylists[0];
  qs("#date-input").value = viewDate;
  qs("#start-input").value = "09:00";
  qs("#duration-input").value = services[0].duration;
  qs("#price-input").value = Number(services[0].price).toFixed(2);
  qs("#status-input").value = "Booked";
  qs("#payment-status-input").value = "Unpaid";
  qs("#allow-overlap-input").checked = false;
  qs("#notes-input").value = "";
  qs("#client-match").hidden = true;
  qs("#client-match").textContent = "";
  qs("#client-picker").hidden = true;
  qs("#client-picker").innerHTML = "";
  hideConflict();
}

function deleteSelectedAppointment() {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select a job first.");
  appointments = appointments.filter(item => item.id !== appointment.id);
  payments = payments.filter(payment => payment.appointmentId !== appointment.id);
  selectedId = appointments[0]?.id || null;
  saveAppointments();
  savePayments();
  renderAll();
  renderClientSuggestions();
  clearForm();
  showToast("Job deleted.");
}

function renderSelected() {
  const appointment = appointments.find(item => item.id === selectedId);
  if (!appointment) {
    qs("#selected-title").textContent = "No job selected";
    qs("#selected-detail").textContent = "Select a job to send it to Google, Outlook, or export an .ics file.";
    renderPaymentPanel();
    return;
  }
  qs("#selected-title").textContent = appointmentSummary(appointment);
  qs("#selected-detail").textContent = `${formatDateRange(appointment)} with ${appointment.stylist}. ${formatCurrency(appointment.price)} job total, ${formatCurrency(paidForAppointment(appointment.id))} paid, ${formatCurrency(balanceForAppointment(appointment))} due. ${appointment.notes || ""}`;
  renderPaymentPanel();
}

function renderPaymentPanel() {
  const appointment = appointments.find(item => item.id === selectedId);
  if (!appointment) {
    qs("#payment-title").textContent = "Select a job";
    qs("#payment-detail").textContent = "Record card, cash, deposit, invoice, warranty, or comped transactions against the selected job.";
    qs("#payment-amount-input").value = "";
    qs("#selected-transactions").innerHTML = "";
    return;
  }

  const paid = paidForAppointment(appointment.id);
  const balance = balanceForAppointment(appointment);
  qs("#payment-title").textContent = `${appointment.client} balance`;
  qs("#payment-detail").textContent = `${formatCurrency(appointment.price)} job total · ${formatCurrency(paid)} paid · ${formatCurrency(balance)} due`;
  qs("#payment-amount-input").value = balance > 0 ? balance.toFixed(2) : "";
  qs("#selected-transactions").innerHTML = renderTransactionRows(appointmentPayments(appointment.id));
}

function renderTransactionRows(items) {
  if (!items.length) return `<p class="subline">No transactions recorded yet.</p>`;
  return items
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(payment => `
      <article class="transaction-row">
        <strong>${formatCurrency(payment.amount)} · ${payment.method}</strong>
        <span>${payment.client} · ${payment.date}</span>
        <span>${payment.note || "No note"}</span>
      </article>
    `).join("");
}

function recordPayment(event) {
  event.preventDefault();
  const appointment = appointments.find(item => item.id === selectedId);
  if (!appointment) return showToast("Select a job before recording payment.");
  const amount = Number(qs("#payment-amount-input").value || 0);
  if (amount <= 0) return showToast("Enter a payment amount greater than zero.");

  const payment = {
    id: `pay-${Date.now()}`,
    appointmentId: appointment.id,
    client: appointment.client,
    amount,
    method: qs("#payment-method-input").value,
    note: qs("#payment-note-input").value.trim(),
    date: appointment.date,
    createdAt: new Date().toISOString()
  };

  payments.push(payment);
  appointment.paymentStatus = syncPaymentStatus(appointment);
  savePayments();
  saveAppointments();
  qs("#payment-note-input").value = "";
  renderAll();
  showToast(`Recorded ${formatCurrency(amount)} payment.`);
}

function minutesFromTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function findConflicts(appointment) {
  const start = minutesFromTime(appointment.start);
  const end = start + Number(appointment.duration);
  return appointments.filter(item => {
    if (item.id === appointment.id) return false;
    if (item.date !== appointment.date || item.stylist !== appointment.stylist) return false;
    const itemStart = minutesFromTime(item.start);
    const itemEnd = itemStart + Number(item.duration);
    return start < itemEnd && end > itemStart;
  });
}

function showConflict(conflicts) {
  const warning = qs("#conflict-warning");
  warning.hidden = false;
  warning.innerHTML = `<strong>Dispatch conflict:</strong> ${conflicts.map(item => `${item.client} (${formatTime(toDate(item))}-${formatTime(toDate(item, true))})`).join(", ")}. Check "Allow double booking" if you want to save anyway.`;
}

function hideConflict() {
  qs("#conflict-warning").hidden = true;
  qs("#conflict-warning").textContent = "";
}

function getClientDatabase() {
  const clients = new Map();
  appointments.forEach(item => {
    const key = item.client.trim().toLowerCase();
    if (!key) return;
    const existing = clients.get(key) || {
      name: item.client.trim(),
      email: item.email || "",
      appointments: []
    };
    if (item.email && !existing.email) existing.email = item.email;
    existing.appointments.push(item);
    clients.set(key, existing);
  });

  return [...clients.values()].map(client => ({
    ...client,
    appointments: client.appointments.sort((a, b) => `${b.date}T${b.start}`.localeCompare(`${a.date}T${a.start}`))
  })).sort((a, b) => a.name.localeCompare(b.name));
}

function renderClientSuggestions() {
  qs("#client-suggestions").innerHTML = getClientDatabase().map(client => {
    const last = client.appointments[0];
    const label = `${client.email || "No email"} - last: ${last.service}`;
    return `<option value="${client.name}" label="${label}"></option>`;
  }).join("");
}

function renderServiceOptions() {
  const grouped = services.reduce((groups, service) => {
    groups[service.category] = groups[service.category] || [];
    groups[service.category].push(service);
    return groups;
  }, {});

  qs("#service-input").innerHTML = Object.entries(grouped).map(([category, items]) => `
    <optgroup label="${category}">
      ${items.map(service => `<option value="${service.name}">${service.name} - ${formatCurrency(service.price)}</option>`).join("")}
    </optgroup>
  `).join("");
}

function applyServiceDefaults(force = false) {
  const service = serviceByName(qs("#service-input").value);
  if (!service) return;
  if (force || !qs("#price-input").value) qs("#price-input").value = Number(service.price).toFixed(2);
  if (force || !qs("#duration-input").value) qs("#duration-input").value = service.duration;
}

function matchingClient(name) {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return null;
  return getClientDatabase().find(client => client.name.toLowerCase() === normalized) || null;
}

function findClientMatches(term) {
  const normalized = term.trim().toLowerCase();
  return getClientDatabase()
    .filter(client => !normalized || client.name.toLowerCase().includes(normalized) || client.email.toLowerCase().includes(normalized))
    .slice(0, 5);
}

function chooseClient(name) {
  qs("#client-input").value = name;
  qs("#client-picker").hidden = true;
  qs("#client-picker").innerHTML = "";
  applyClientMatch(true, name);
}

function renderClientPicker(term) {
  const picker = qs("#client-picker");
  const matches = findClientMatches(term);
  if (!matches.length) {
    picker.hidden = true;
    picker.innerHTML = "";
    return;
  }

  picker.hidden = false;
  picker.innerHTML = matches.map(client => {
    const last = client.appointments[0];
    return `
      ${client === matches[0] ? `<div class="client-picker-label">${term.trim() ? "Matching customers" : "Existing customers"}</div>` : ""}
      <button class="client-suggestion" type="button" data-client-choice="${client.name}">
        <strong>${client.name}</strong>
        <span>${client.email || "No email"} - ${client.appointments.length} job${client.appointments.length === 1 ? "" : "s"} - last ${last.service}</span>
      </button>
    `;
  }).join("");

  qsa("[data-client-choice]").forEach(button => {
    button.addEventListener("mousedown", event => event.preventDefault());
    button.addEventListener("click", () => chooseClient(button.dataset.clientChoice));
  });
}

function applyClientMatch(force = false, clientName = qs("#client-input").value) {
  const client = matchingClient(clientName);
  const matchBox = qs("#client-match");
  if (!client) {
    matchBox.hidden = true;
    matchBox.textContent = "";
    return;
  }

  const last = client.appointments[0];
  if (client.email && (force || !qs("#email-input").value.trim())) qs("#email-input").value = client.email;
  if (last.service && (force || !qs("#service-input").value.trim())) {
    qs("#service-input").value = serviceByName(last.service)?.name || "Custom work order";
    applyServiceDefaults(true);
  }
  if (last.stylist && (force || qs("#stylist-input").value === stylists[0])) qs("#stylist-input").value = last.stylist;

  const historyNote = `Returning customer. Last job: ${last.date} ${last.start} for ${last.service} with ${last.stylist}.`;
  if (force || !qs("#notes-input").value.trim()) {
    qs("#notes-input").value = last.notes ? `${historyNote}\nPrevious notes: ${last.notes}` : historyNote;
  }

  matchBox.hidden = false;
  matchBox.innerHTML = `
    <strong>Matched existing customer: ${client.name}</strong>
    <span>${client.email || "No email on file"} - ${client.appointments.length} job${client.appointments.length === 1 ? "" : "s"} on record</span>
    <span>Last job: ${last.service} with ${last.stylist} on ${last.date}</span>
  `;
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const id = qs("#appointment-id").value || `apt-${Date.now()}`;
  const appointment = {
    id,
    client: qs("#client-input").value.trim(),
    email: qs("#email-input").value.trim(),
    service: qs("#service-input").value.trim(),
    price: Number(qs("#price-input").value || 0),
    stylist: qs("#stylist-input").value,
    date: qs("#date-input").value,
    start: qs("#start-input").value,
    duration: Number(qs("#duration-input").value),
    status: qs("#status-input").value,
    paymentStatus: qs("#payment-status-input").value,
    notes: qs("#notes-input").value.trim()
  };

  const conflicts = findConflicts(appointment);
  if (conflicts.length && !qs("#allow-overlap-input").checked) {
    showConflict(conflicts);
    showToast("This overlaps an existing job.");
    return;
  }

  const existingIndex = appointments.findIndex(item => item.id === id);
  if (existingIndex >= 0) appointments[existingIndex] = appointment;
  else appointments.push(appointment);

  selectedId = id;
  viewDate = appointment.date;
  saveAppointments();
  renderAll();
  renderClientSuggestions();
  clearForm();
  hideConflict();
  showToast("Job saved locally. Use Edit selected to change it.");
}

function openSelected(provider) {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select a job first.");
  const url = provider === "google" ? googleCalendarUrl(appointment) : outlookCalendarUrl(appointment);
  window.open(url, "_blank", "noopener,noreferrer");
  showToast(`Opened ${provider === "google" ? "Google" : "Outlook"} calendar draft.`);
}

function downloadSelectedIcs() {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select a job first.");
  downloadFile(`${appointment.client.replace(/\s+/g, "-").toLowerCase()}-${appointment.date}.ics`, buildIcs([appointment]));
  showToast("Downloaded .ics file.");
}

function copySelectedSummary() {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select a job first.");
  const text = `${appointmentSummary(appointment)}\n${formatDateRange(appointment)}\n${appointmentDescription(appointment)}`;
  navigator.clipboard?.writeText(text).then(() => showToast("Copied job summary."), () => showToast(text));
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
    const summary = read("SUMMARY") || "Imported job";
    const [client, service] = summary.includes(" - ") ? summary.split(" - ") : [summary, "Imported job"];
    const catalogService = serviceByName(service);
    return {
      id: `import-${Date.now()}-${index}`,
      client,
      email: "",
      service: catalogService?.name || service,
      price: catalogService?.price || 0,
      stylist: stylists[index % stylists.length],
      date: start.date,
      start: start.time,
      duration,
      status: "Imported",
      paymentStatus: "Unpaid",
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
    viewDate = imported[0].date;
    localStorage.setItem(importedKey, String(Number(localStorage.getItem(importedKey) || 0) + imported.length));
    saveAppointments();
    renderAll();
    renderClientSuggestions();
    clearForm();
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
    <p class="eyebrow">Customer profile</p>
    <h2>${clientName}</h2>
    <div class="profile-grid">
      <div><strong>${items.length}</strong><span class="subline">Jobs</span></div>
      <div><strong>${totalMinutes}</strong><span class="subline">Scheduled minutes</span></div>
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

function renderJobPipeline() {
  const columns = [
    { title: "New / booked", statuses: ["Booked", "Needs reply"] },
    { title: "Dispatched", statuses: ["Confirmed", "Dispatched"] },
    { title: "Estimate / close", statuses: ["Estimate sent"] },
    { title: "Complete", statuses: ["Completed"] }
  ];

  qs("#job-pipeline").innerHTML = columns.map(column => {
    const items = appointments.filter(item => column.statuses.includes(item.status));
    return `
      <article class="pipeline-column">
        <strong>${column.title}</strong>
        ${items.length ? items.map(item => `
          <button class="pipeline-card" type="button" data-pipeline-job="${item.id}">
            <span>${item.client}</span>
            <small>${item.service} - ${item.stylist} - ${formatTime(toDate(item))}</small>
          </button>
        `).join("") : `<p class="subline">No jobs</p>`}
      </article>
    `;
  }).join("");

  qsa("[data-pipeline-job]").forEach(button => button.addEventListener("click", () => {
    selectedId = button.dataset.pipelineJob;
    switchView("schedule");
    renderAll();
  }));
}

function renderEstimateCustomers() {
  qs("#estimate-customer").innerHTML = getClientDatabase().map(client => `<option>${client.name}</option>`).join("");
}

function renderEstimates() {
  const total = estimates.reduce((sum, estimate) => sum + estimate.amount, 0);
  qs("#pipeline-metric").textContent = formatCurrency(total);
  qs("#estimate-list").innerHTML = estimates.map(estimate => `
    <article class="transaction-row">
      <strong>${estimate.customer} - ${formatCurrency(estimate.amount)}</strong>
      <span>${estimate.type} - ${estimate.status}</span>
      <span>${estimate.financing}</span>
    </article>
  `).join("");
}

function renderProposalPreview(values = null) {
  const customer = values?.customer || qs("#estimate-customer")?.value || "Select a customer";
  const base = Number(values?.base ?? qs("#estimate-base")?.value ?? 1250);
  const recommended = Number(values?.recommended ?? qs("#estimate-recommended")?.value ?? 2800);
  const premium = Number(values?.premium ?? qs("#estimate-premium")?.value ?? 6400);
  const monthly = Math.max(39, Math.round(recommended / 60));
  qs("#proposal-preview").innerHTML = `
    <div class="proposal-header">
      <strong>${customer}</strong>
      <span>Proposal preview</span>
    </div>
    <div class="option-grid">
      <article><span>Good</span><strong>${formatCurrency(base)}</strong><small>Repair now</small></article>
      <article class="recommended"><span>Better</span><strong>${formatCurrency(recommended)}</strong><small>Recommended</small></article>
      <article><span>Best</span><strong>${formatCurrency(premium)}</strong><small>Premium warranty</small></article>
    </div>
    <p class="subline">Financing handoff: estimated ${formatCurrency(monthly)}/mo. Final terms would come from GoodLeap, Synchrony, or Wisetack.</p>
  `;
}

function handleEstimateSubmit(event) {
  event.preventDefault();
  const values = {
    customer: qs("#estimate-customer").value,
    base: qs("#estimate-base").value,
    recommended: qs("#estimate-recommended").value,
    premium: qs("#estimate-premium").value
  };
  renderProposalPreview(values);
  showToast("Generated demo proposal with financing options.");
}

function renderAccounting() {
  qs("#sync-metric").textContent = accountingQueue.length;
  qs("#accounting-list").innerHTML = accountingQueue.map(item => `
    <article class="transaction-row">
      <strong>${item.item} - ${formatCurrency(item.amount)}</strong>
      <span>${item.target}</span>
      <span>${item.status}</span>
    </article>
  `).join("");
}

function renderPhones() {
  qs("#phone-list").innerHTML = phoneCalls.map(call => `
    <article class="transaction-row">
      <strong>${call.caller}</strong>
      <span>${call.reason}</span>
      <span>${call.line} - ${call.status}</span>
    </article>
  `).join("");
}

function renderTeam() {
  qs("#team-chat").innerHTML = teamMessages.map(message => `
    <article class="chat-message">
      <strong>${message.from}<span>${message.tag}</span></strong>
      <p>${message.body}</p>
    </article>
  `).join("");

  qs("#tech-status-grid").innerHTML = stylists.map(tech => {
    const current = appointments.find(item => item.date === viewDate && item.stylist === tech);
    return `
      <article>
        <strong>${tech}</strong>
        <span>${current ? current.status : "Available"}</span>
        <small>${current ? current.client : "No assigned job at this time"}</small>
      </article>
    `;
  }).join("");
}

function renderToolStack() {
  qs("#tool-stack").innerHTML = toolStack.map(row => `
    <article>
      <strong>${row.functionName}</strong>
      <span>${row.tools}</span>
      <small>${row.status}</small>
    </article>
  `).join("");
}

function renderReports() {
  const revenueByService = appointments.reduce((rows, appointment) => {
    rows[appointment.service] = rows[appointment.service] || { label: appointment.service, amount: 0 };
    rows[appointment.service].amount += paidForAppointment(appointment.id);
    return rows;
  }, {});
  const rows = Object.values(revenueByService).sort((a, b) => b.amount - a.amount).slice(0, 8);
  const max = Math.max(1, ...rows.map(row => row.amount));
  qs("#bar-chart").innerHTML = (rows.length ? rows : reports.map(row => ({ label: row.label, amount: Number(row.amount.replace(/[$k]/g, "")) * 1000 }))).map(row => `
    <div class="bar-row">
      <strong>${row.label}</strong>
      <div class="bar-track"><span style="width:${Math.round((row.amount / max) * 100)}%"></span></div>
      <span>${formatCurrency(row.amount)}</span>
    </div>
  `).join("");
}

function renderMetrics() {
  const todaysAppointments = appointments.filter(item => item.date === viewDate);
  const todaysPayments = payments.filter(item => item.date === viewDate);
  const paidToday = todaysPayments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const outstandingToday = todaysAppointments.reduce((sum, appointment) => sum + balanceForAppointment(appointment), 0);
  qs("#booked-metric").textContent = todaysAppointments.length;
  qs("#paid-metric").textContent = formatCurrency(paidToday);
  qs("#outstanding-metric").textContent = formatCurrency(outstandingToday);
  qs("#transaction-metric").textContent = todaysPayments.length;
  qs("#capacity-metric").textContent = `${Math.round((todaysAppointments.length / Math.max(1, stylists.length * 3)) * 100)}%`;
  qs("#dashboard-transactions").innerHTML = renderTransactionRows(todaysPayments);
  qs("#dashboard-balances").innerHTML = renderBalanceRows(todaysAppointments);
  renderPaymentSummary();
}

function renderBalanceRows(items) {
  const open = items.filter(appointment => balanceForAppointment(appointment) > 0);
  if (!open.length) return `<p class="subline">No open balances for this day.</p>`;
  return open.map(appointment => `
    <article class="transaction-row">
      <strong>${appointment.client} · ${formatCurrency(balanceForAppointment(appointment))} due</strong>
      <span>${appointment.service} · ${appointment.stylist} · ${formatTime(toDate(appointment))}</span>
      <span>${formatCurrency(paidForAppointment(appointment.id))} paid of ${formatCurrency(appointment.price)}</span>
    </article>
  `).join("");
}

function renderPaymentSummary() {
  const totalPaid = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const totalOpen = appointments.reduce((sum, appointment) => sum + balanceForAppointment(appointment), 0);
  qs("#all-paid-metric").textContent = formatCurrency(totalPaid);
  qs("#all-open-metric").textContent = formatCurrency(totalOpen);
  qs("#all-transaction-metric").textContent = payments.length;
  qs("#all-transactions").innerHTML = renderTransactionRows(payments);
}

function checkLiveStatus() {
  const isStandaloneLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname) && window.location.port === "4174";
  if (!isStandaloneLocal) {
    qs("#live-status").textContent = "Public demo mode";
    qs("#live-detail").textContent = "This Vercel deployment serves the clickable static demo. Calendar drafts, .ics export, estimates, payments, and workflow modules run in the browser.";
    return;
  }

  fetch("/api/status")
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
  if (selectedId && !appointments.some(item => item.id === selectedId && item.date === viewDate)) {
    selectedId = appointments.find(item => item.date === viewDate)?.id || null;
  }
  renderSchedule();
  renderSelected();
  renderClients();
  renderEmail();
  renderJobPipeline();
  renderEstimateCustomers();
  renderEstimates();
  renderProposalPreview();
  renderAccounting();
  renderPhones();
  renderTeam();
  renderToolStack();
  renderReports();
  renderMetrics();
}

function init() {
  renderServiceOptions();
  qs("#stylist-input").innerHTML = stylists.map(stylist => `<option>${stylist}</option>`).join("");
  qsa("[data-view]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
  qsa("[data-view-jump]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.viewJump)));
  qsa("[data-demo-action]").forEach(button => button.addEventListener("click", () => showToast(`${button.dataset.demoAction} queued in demo mode.`)));
  qs("#booking-form").addEventListener("submit", handleBookingSubmit);
  qs("#payment-form").addEventListener("submit", recordPayment);
  qs("#estimate-form").addEventListener("submit", handleEstimateSubmit);
  ["#estimate-base", "#estimate-recommended", "#estimate-premium", "#estimate-customer"].forEach(selector => {
    qs(selector).addEventListener("input", () => renderProposalPreview());
    qs(selector).addEventListener("change", () => renderProposalPreview());
  });
  qs("#service-input").addEventListener("change", () => applyServiceDefaults(true));
  qs("#clear-form").addEventListener("click", clearForm);
  qs("#delete-appointment").addEventListener("click", deleteSelectedAppointment);
  qs("#schedule-date-picker").addEventListener("change", event => {
    viewDate = event.target.value || todayIso();
    selectedId = appointments.find(item => item.date === viewDate)?.id || null;
    renderAll();
    clearForm();
  });
  qs("#previous-day").addEventListener("click", () => {
    viewDate = shiftDate(viewDate, -1);
    selectedId = appointments.find(item => item.date === viewDate)?.id || null;
    renderAll();
    clearForm();
  });
  qs("#today-button").addEventListener("click", () => {
    viewDate = todayIso();
    selectedId = appointments.find(item => item.date === viewDate)?.id || null;
    renderAll();
    clearForm();
  });
  qs("#next-day").addEventListener("click", () => {
    viewDate = shiftDate(viewDate, 1);
    selectedId = appointments.find(item => item.date === viewDate)?.id || null;
    renderAll();
    clearForm();
  });
  qs("#new-appointment").addEventListener("click", () => {
    switchView("schedule");
    clearForm();
    qs("#client-input").focus();
  });
  qs("#google-link").addEventListener("click", () => openSelected("google"));
  qs("#outlook-link").addEventListener("click", () => openSelected("outlook"));
  qs("#edit-selected").addEventListener("click", editSelectedAppointment);
  qs("#download-ics").addEventListener("click", downloadSelectedIcs);
  qs("#copy-summary").addEventListener("click", copySelectedSummary);
  qs("#export-all").addEventListener("click", () => {
    downloadFile("dispatchboard-jobs.ics", buildIcs(appointments));
    showToast("Exported all jobs.");
  });
  qs("#reset-demo").addEventListener("click", () => {
    appointments = seedAppointments.map(item => ({ ...item, date: todayIso() }));
    payments = seedPayments.map(item => ({ ...item, date: todayIso(), createdAt: `${todayIso()}T${(item.createdAt || "09:00:00").slice(11, 19)}` }));
    viewDate = todayIso();
    selectedId = appointments[0].id;
    localStorage.removeItem(importedKey);
    saveAppointments();
    savePayments();
    renderAll();
    renderClientSuggestions();
    clearForm();
    showToast("Demo data reset.");
  });
  qsa("[data-open-selected]").forEach(button => button.addEventListener("click", () => openSelected(button.dataset.openSelected)));
  qs("#import-trigger").addEventListener("click", () => qs("#ics-import").click());
  qs("#import-trigger-2").addEventListener("click", () => qs("#ics-import").click());
  qs("#ics-import").addEventListener("change", event => handleIcsImport(event.target.files[0]));
  qs("#client-input").addEventListener("input", event => {
    renderClientPicker(event.target.value);
    applyClientMatch(false);
  });
  qs("#client-input").addEventListener("focus", event => renderClientPicker(event.target.value));
  qs("#client-input").addEventListener("change", () => applyClientMatch(true));
  qs("#client-input").addEventListener("blur", () => {
    window.setTimeout(() => {
      qs("#client-picker").hidden = true;
      applyClientMatch(false);
    }, 120);
  });
  qs("#global-search").addEventListener("input", event => {
    const term = event.target.value.toLowerCase();
    qsa(".booking-card").forEach(card => card.style.display = card.textContent.toLowerCase().includes(term) ? "grid" : "none");
  });
  renderClientSuggestions();
  renderAll();
  clearForm();
  checkLiveStatus();
  syncDemoCrmBookings(false);
  window.setInterval(() => syncDemoCrmBookings(true), 15000);
}

init();
