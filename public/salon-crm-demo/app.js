const storageKey = "glossdesk-appointments-v3";
const employeeStorageKey = "glossdesk-employees-v1";
const customerStorageKey = "glossdesk-customers-v1";
const paymentStorageKey = "glossdesk-payments-v1";
const timeOffStorageKey = "glossdesk-time-off-v1";
const importedKey = "glossdesk-import-count-v1";
const googleCalendarChoiceKey = "glossdesk-google-calendar-choice-v1";
const migrationLogKey = "glossdesk-migration-log-v1";

const seedEmployees = [
  { id: "emp-1", name: "Jules", role: "Senior stylist", email: "jules@glossdesk.local", phone: "(555) 010-1401", status: "Active", services: "Gloss, color, bridal styling", workStart: "09:00", workEnd: "17:00", workingDays: "Sun, Mon, Tue, Wed, Thu" },
  { id: "emp-2", name: "Amara", role: "Color specialist", email: "amara@glossdesk.local", phone: "(555) 010-2208", status: "Active", services: "Balayage, blonding, consults", workStart: "10:00", workEnd: "18:00", workingDays: "Sun, Mon, Wed, Thu, Fri" },
  { id: "emp-3", name: "Kenji", role: "Cutting specialist", email: "kenji@glossdesk.local", phone: "(555) 010-3377", status: "Active", services: "Cuts, blowouts, texture", workStart: "09:00", workEnd: "17:00", workingDays: "Sun, Tue, Wed, Fri, Sat" },
  { id: "emp-4", name: "Sasha", role: "Stylist", email: "sasha@glossdesk.local", phone: "(555) 010-4489", status: "Active", services: "Color consults, treatments", workStart: "11:00", workEnd: "18:00", workingDays: "Sun, Mon, Tue, Thu, Sat" }
];

const seedTimeOff = [
  { id: "off-1", employee: "Sasha", date: "2026-06-28", start: "15:00", end: "17:00", reason: "Personal appointment" }
];

const seedAppointments = [
  { id: "apt-1", client: "Maya Bennett", email: "maya@example.com", phone: "(555) 013-4421", service: "Gloss and style", stylist: "Jules", date: "2026-06-28", start: "09:00", duration: 60, status: "Checked in", notes: "Prefers low-fragrance products. Reserve leave-in conditioner." },
  { id: "apt-2", client: "Ari Chen", email: "ari@example.com", phone: "(555) 019-7784", service: "Balayage consult", stylist: "Amara", date: "2026-06-28", start: "10:15", duration: 45, status: "Confirmed", notes: "Wants bright but low maintenance color." },
  { id: "apt-3", client: "Nina Patel", email: "nina@example.com", phone: "(555) 016-9082", service: "Cut and blowout", stylist: "Kenji", date: "2026-06-28", start: "12:00", duration: 60, status: "Needs reply", notes: "Asked if appointment can move 20 minutes later." },
  { id: "apt-4", client: "Lena Ortiz", email: "lena@example.com", phone: "(555) 011-3309", service: "Root touch-up", stylist: "Jules", date: "2026-06-28", start: "14:30", duration: 90, status: "Booked", notes: "VIP. Birthday offer eligible next week." }
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

const serviceCatalog = [
  { name: "Gloss and style", price: 125, deposit: 35 },
  { name: "Balayage consult", price: 85, deposit: 25 },
  { name: "Cut and blowout", price: 95, deposit: 25 },
  { name: "Root touch-up", price: 145, deposit: 45 },
  { name: "Color consult", price: 75, deposit: 20 },
  { name: "Treatment", price: 65, deposit: 20 }
];

const paymentMethods = [
  { value: "square-card", label: "Square card" },
  { value: "square-google-pay", label: "Google Pay via Square" },
  { value: "stripe-card", label: "Stripe card" },
  { value: "cash", label: "Cash" },
  { value: "gift-card", label: "Gift card" }
];

const viewTitles = {
  schedule: "Scheduling Studio",
  dashboard: "Front Desk Command Center",
  clients: "Client CRM",
  employees: "Employee Management",
  payments: "Payments & Checkout",
  email: "Email Hub",
  integrations: "Calendar Integrations",
  migration: "Switch CRM",
  reports: "Salon Performance"
};

const fieldMappings = [
  { target: "Client", accepted: "client, client name, customer, customer name, name, full name" },
  { target: "Email", accepted: "email, email address" },
  { target: "Phone", accepted: "phone, mobile, mobile phone, cell, cell phone" },
  { target: "Service", accepted: "service, appointment type, treatment" },
  { target: "Stylist", accepted: "stylist, staff, provider, employee, team member" },
  { target: "Date", accepted: "date, appointment date, start date" },
  { target: "Start", accepted: "start, start time, time, appointment time" },
  { target: "Duration", accepted: "duration, duration minutes, length, length minutes" },
  { target: "Status", accepted: "status, booking status" },
  { target: "Notes", accepted: "notes, client notes, appointment notes, preferences" }
];

const sampleCsv = [
  "client,email,phone,service,stylist,date,start,duration,status,notes",
  "\"Maya Bennett\",maya@example.com,\"(555) 013-4421\",\"Gloss and style\",Jules,2026-06-28,09:00,60,\"Checked in\",\"Prefers low-fragrance products\"",
  "\"Priya Lane\",priya@example.com,\"(555) 018-2200\",\"Color consult\",Sasha,2026-06-28,11:00,45,Booked,\"New client from Square export\"",
  "\"Cam Rose\",cam@example.com,\"(555) 014-8801\",\"Cut and blowout\",Kenji,2026-06-28,15:00,60,Confirmed,\"Imported from old CRM\""
].join("\n");

let appointments = loadAppointments();
let employees = loadEmployees();
let stylists = activeStylistNames();
let customers = loadCustomers();
let payments = loadPayments();
let timeOffBlocks = loadTimeOffBlocks();
let selectedId = appointments[0]?.id || null;
let googleCalendarChoices = [];
let outlookCalendarReady = false;
let outlookCalendarAccount = "";
let pendingSlot = null;
let currentScheduleDate = "2026-06-28";
let calendarMode = "day";
syncCustomersFromAppointments();

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

function loadAppointments() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return (saved || seedAppointments).map(item => ({ phone: "", ...item }));
  } catch {
    return seedAppointments.map(item => ({ ...item }));
  }
}

function saveAppointments() {
  localStorage.setItem(storageKey, JSON.stringify(appointments));
}

function loadEmployees() {
  try {
    const saved = JSON.parse(localStorage.getItem(employeeStorageKey));
    return (saved || seedEmployees).map((item, index) => ({
      workStart: seedEmployees[index]?.workStart || "09:00",
      workEnd: seedEmployees[index]?.workEnd || "17:00",
      workingDays: seedEmployees[index]?.workingDays || "Sun, Mon, Tue, Wed, Thu, Fri",
      ...item
    }));
  } catch {
    return seedEmployees.map(item => ({ ...item }));
  }
}

function saveEmployees() {
  localStorage.setItem(employeeStorageKey, JSON.stringify(employees));
  stylists = activeStylistNames();
}

function activeStylistNames() {
  const active = employees.filter(employee => employee.status !== "Inactive").map(employee => employee.name);
  return active.length ? active : seedEmployees.map(employee => employee.name);
}

function loadTimeOffBlocks() {
  try {
    return JSON.parse(localStorage.getItem(timeOffStorageKey)) || seedTimeOff.map(item => ({ ...item }));
  } catch {
    return seedTimeOff.map(item => ({ ...item }));
  }
}

function saveTimeOffBlocks() {
  localStorage.setItem(timeOffStorageKey, JSON.stringify(timeOffBlocks));
}

function customerKey(name) {
  return String(name || "").trim().toLowerCase();
}

function customerFromAppointment(appointment) {
  return {
    name: appointment.client,
    email: appointment.email || "",
    phone: appointment.phone || "",
    notes: appointment.notes || "",
    lastService: appointment.service || "",
    lastStylist: appointment.stylist || "",
    lastVisit: appointment.date || ""
  };
}

function customersFromAppointments(items) {
  const byName = new Map();
  items.forEach(appointment => {
    if (!appointment.client) return;
    const key = customerKey(appointment.client);
    const existing = byName.get(key) || { name: appointment.client, email: "", phone: "", notes: "", lastService: "", lastStylist: "", lastVisit: "" };
    byName.set(key, {
      ...existing,
      name: appointment.client,
      email: appointment.email || existing.email,
      phone: appointment.phone || existing.phone,
      notes: appointment.notes || existing.notes,
      lastService: appointment.service || existing.lastService,
      lastStylist: appointment.stylist || existing.lastStylist,
      lastVisit: appointment.date || existing.lastVisit
    });
  });
  return [...byName.values()];
}

function loadCustomers() {
  try {
    const saved = JSON.parse(localStorage.getItem(customerStorageKey));
    return saved?.length ? saved : customersFromAppointments(appointments);
  } catch {
    return customersFromAppointments(appointments);
  }
}

function saveCustomers() {
  localStorage.setItem(customerStorageKey, JSON.stringify(customers));
}

function loadPayments() {
  try {
    return JSON.parse(localStorage.getItem(paymentStorageKey)) || [];
  } catch {
    return [];
  }
}

function savePayments() {
  localStorage.setItem(paymentStorageKey, JSON.stringify(payments));
}

function serviceDetails(serviceName) {
  return serviceCatalog.find(service => service.name.toLowerCase() === String(serviceName || "").toLowerCase()) || {
    name: serviceName || "Custom service",
    price: 95,
    deposit: 25
  };
}

function appointmentPayments(appointmentId) {
  return payments.filter(payment => payment.appointmentId === appointmentId);
}

function paidTotal(appointmentId) {
  return appointmentPayments(appointmentId)
    .filter(payment => payment.status !== "Refunded")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
}

function refundTotal(appointmentId) {
  return appointmentPayments(appointmentId)
    .filter(payment => payment.status === "Refunded")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
}

function paymentStatus(appointment) {
  if (!appointment) return "No appointment";
  const service = serviceDetails(appointment.service);
  const paid = paidTotal(appointment.id);
  if (paid >= service.price) return "Paid";
  if (paid > 0) return "Deposit paid";
  return "Unpaid";
}

function formatMoney(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function minutesFromTime(time) {
  const [hour, minute] = String(time || "00:00").split(":").map(Number);
  return (hour * 60) + (minute || 0);
}

function weekdayLabel(dateString) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(`${dateString}T00:00:00`).getDay()];
}

function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function localDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(dateString, days) {
  const date = parseLocalDate(dateString);
  date.setDate(date.getDate() + days);
  return localDateString(date);
}

function startOfWeek(dateString) {
  const date = parseLocalDate(dateString);
  date.setDate(date.getDate() - date.getDay());
  return localDateString(date);
}

function weekDates(dateString = currentScheduleDate) {
  const start = startOfWeek(dateString);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

function formatCalendarDate(dateString, style = "long") {
  const date = parseLocalDate(dateString);
  return date.toLocaleDateString([], style === "short"
    ? { weekday: "short", month: "short", day: "numeric" }
    : { weekday: "long", month: "long", day: "numeric" });
}

function scheduleHours() {
  return ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
}

function upsertCustomer(customer) {
  if (!customer?.name) return;
  const key = customerKey(customer.name);
  const index = customers.findIndex(item => customerKey(item.name) === key);
  const next = index >= 0 ? { ...customers[index], ...customer } : customer;
  if (index >= 0) customers[index] = next;
  else customers.push(next);
  saveCustomers();
}

function syncCustomersFromAppointments() {
  customersFromAppointments(appointments).forEach(upsertCustomer);
}

function findCustomer(name) {
  const key = customerKey(name);
  return customers.find(customer => customerKey(customer.name) === key) || null;
}

function ensureEmployeeForStylist(name) {
  const fallback = stylists[0] || seedEmployees[0].name;
  if (!name) return fallback;
  const existing = employees.find(employee => customerKey(employee.name) === customerKey(name));
  if (existing) return existing.name;
  const employee = {
    id: `emp-${Date.now()}-${employees.length}`,
    name,
    role: "Stylist",
    email: "",
    phone: "",
    services: "Imported from CRM staff export",
    workStart: "09:00",
    workEnd: "17:00",
    workingDays: "Sun, Mon, Tue, Wed, Thu, Fri",
    status: "Active"
  };
  employees.push(employee);
  saveEmployees();
  return employee.name;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function showToast(message) {
  const toast = qs("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function selectedAppointment() {
  if (!selectedId) return null;
  return appointments.find(item => item.id === selectedId) || null;
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
  return `Client: ${appointment.client}\nEmail: ${appointment.email || ""}\nPhone: ${appointment.phone || ""}\nService: ${appointment.service}\nStylist: ${appointment.stylist}\nStatus: ${appointment.status}\nNotes: ${appointment.notes || ""}`;
}

function appointmentsOverlap(first, second) {
  const firstStart = toDate(first).getTime();
  const firstEnd = toDate(first, true).getTime();
  const secondStart = toDate(second).getTime();
  const secondEnd = toDate(second, true).getTime();
  return firstStart < secondEnd && firstEnd > secondStart;
}

function findBookingConflict(appointment) {
  return appointments.find(item => (
    item.id !== appointment.id &&
    item.date === appointment.date &&
    item.stylist === appointment.stylist &&
    appointmentsOverlap(appointment, item)
  ));
}

function conflictMessage(appointment, conflict) {
  return `${appointment.stylist} is already booked ${formatTime(toDate(conflict))}-${formatTime(toDate(conflict, true))} with ${conflict.client}.`;
}

function findAvailabilityConflict(appointment) {
  const employee = employees.find(item => item.name === appointment.stylist);
  if (!employee || employee.status === "Inactive") {
    return { type: "inactive", message: `${appointment.stylist} is not active on the schedule.` };
  }

  const day = weekdayLabel(appointment.date);
  const workingDays = String(employee.workingDays || "").split(",").map(item => item.trim());
  if (!workingDays.includes(day)) {
    return { type: "hours", message: `${employee.name} is not scheduled to work on ${day}.` };
  }

  const start = minutesFromTime(appointment.start);
  const end = start + Number(appointment.duration || 60);
  const workStart = minutesFromTime(employee.workStart || "09:00");
  const workEnd = minutesFromTime(employee.workEnd || "17:00");
  if (start < workStart || end > workEnd) {
    return { type: "hours", message: `${employee.name} works ${formatHourLabel(employee.workStart)}-${formatHourLabel(employee.workEnd)}.` };
  }

  const block = timeOffBlocks.find(item => {
    const blockStart = minutesFromTime(item.start);
    const blockEnd = minutesFromTime(item.end);
    return item.employee === appointment.stylist &&
      item.date === appointment.date &&
      start < blockEnd &&
      end > blockStart;
  });
  if (block) {
    return { type: "time-off", block, message: `${block.employee} is blocked off ${formatHourLabel(block.start)}-${formatHourLabel(block.end)} for ${block.reason || "time off"}.` };
  }

  return null;
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

function normalizeHeader(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(current.trim());
      current = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(current.trim());
      if (row.some(value => value !== "")) rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  row.push(current.trim());
  if (row.some(value => value !== "")) rows.push(row);
  if (rows.length < 2) return [];

  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map(values => headers.reduce((record, header, index) => {
    record[header] = values[index] || "";
    return record;
  }, {}));
}

function firstValue(row, keys) {
  const match = keys.map(normalizeHeader).find(key => row[key]);
  return match ? row[match].trim() : "";
}

function normalizeDateValue(value) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
}

function normalizeTimeValue(value) {
  if (!value) return "";
  const clean = value.trim().toLowerCase();
  const direct = clean.match(/^(\d{1,2}):(\d{2})$/);
  if (direct) return `${String(Number(direct[1])).padStart(2, "0")}:${direct[2]}`;
  const ampm = clean.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (!ampm) return "";
  let hour = Number(ampm[1]);
  const minute = ampm[2] || "00";
  if (ampm[3] === "pm" && hour < 12) hour += 12;
  if (ampm[3] === "am" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

function appointmentFromCsvRow(row, index) {
  const client = firstValue(row, ["client", "client name", "customer", "customer name", "name", "full name"]);
  const service = firstValue(row, ["service", "appointment type", "treatment"]) || "Imported service";
  const stylist = ensureEmployeeForStylist(firstValue(row, ["stylist", "staff", "provider", "employee", "team member"]) || stylists[index % stylists.length]);
  const date = normalizeDateValue(firstValue(row, ["date", "appointment date", "start date"]));
  const start = normalizeTimeValue(firstValue(row, ["start", "start time", "time", "appointment time"]));
  const duration = Number(firstValue(row, ["duration", "duration minutes", "length", "length minutes"])) || 60;

  if (!client || !date || !start) return null;
  return {
    id: `csv-${Date.now()}-${index}`,
    client,
    email: firstValue(row, ["email", "email address"]),
    phone: firstValue(row, ["phone", "mobile", "mobile phone", "cell", "cell phone"]),
    service,
    stylist,
    date,
    start,
    duration: Math.max(15, duration),
    status: firstValue(row, ["status", "booking status"]) || "Imported",
    notes: firstValue(row, ["notes", "client notes", "appointment notes", "preferences"])
  };
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

function setGoogleStatus(message, tone = "ok") {
  const status = qs("#google-calendar-status");
  const mini = qs("#google-live-mini");
  [status, mini].filter(Boolean).forEach(el => {
    el.textContent = message;
    el.classList.toggle("warning", tone === "warning");
    el.classList.toggle("error", tone === "error");
  });
}

function setOutlookStatus(message, tone = "ok") {
  const status = qs("#outlook-calendar-status");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("warning", tone === "warning");
  status.classList.toggle("error", tone === "error");
}

function selectedGoogleCalendarChoice() {
  const picker = qs("#google-calendar-picker");
  if (!picker?.value) return null;
  return googleCalendarChoices.find(choice => choice.value === picker.value) || null;
}

function renderGoogleCalendarPicker() {
  const picker = qs("#google-calendar-picker");
  const wrap = qs("#google-calendar-picker-wrap");
  if (!picker || !wrap) return;

  picker.innerHTML = googleCalendarChoices.map(choice => (
    `<option value="${choice.value}">${choice.label}</option>`
  )).join("");

  const saved = localStorage.getItem(googleCalendarChoiceKey);
  if (saved && googleCalendarChoices.some(choice => choice.value === saved)) {
    picker.value = saved;
  }

  wrap.style.display = googleCalendarChoices.length ? "grid" : "none";
}

async function loadGoogleCalendars() {
  setGoogleStatus("Checking Google Calendar connection...", "warning");

  try {
    const response = await fetch("/api/salon-crm/google-calendars", { credentials: "same-origin" });
    if (response.status === 401) {
      googleCalendarChoices = [];
      renderGoogleCalendarPicker();
      setGoogleStatus("Sign in to the Ephesus portal, then connect Google Calendar.", "warning");
      return;
    }
    if (!response.ok) throw new Error("Calendar lookup failed");

    const data = await response.json();
    googleCalendarChoices = (data.integrations || []).flatMap(integration => (
      (integration.calendars || []).map(calendar => ({
        value: `${integration.id}||${calendar.id}`,
        integrationId: integration.id,
        calendarId: calendar.id,
        label: `${calendar.summary || calendar.id} - ${integration.email}${calendar.primary ? " (primary)" : ""}`,
      }))
    ));

    renderGoogleCalendarPicker();
    if (!googleCalendarChoices.length) {
      setGoogleStatus("No writable Google calendars connected yet.", "warning");
      return;
    }

    const choice = selectedGoogleCalendarChoice();
    setGoogleStatus(`Live Google sync ready: ${choice?.label || googleCalendarChoices[0].label}`);
  } catch (error) {
    console.error(error);
    googleCalendarChoices = [];
    renderGoogleCalendarPicker();
    setGoogleStatus("Could not load Google calendars. Check OAuth setup and try Refresh.", "error");
  }
}

async function loadOutlookStatus() {
  setOutlookStatus("Checking Outlook connection...", "warning");

  try {
    const response = await fetch("/api/salon-crm/outlook-status", { credentials: "same-origin" });
    if (response.status === 401) {
      outlookCalendarReady = false;
      outlookCalendarAccount = "";
      setOutlookStatus("Sign in to the Ephesus portal, then connect Outlook.", "warning");
      return;
    }
    if (!response.ok) throw new Error("Outlook lookup failed");

    const data = await response.json();
    outlookCalendarReady = Boolean(data.connected && data.integration?.calendarReady);
    outlookCalendarAccount = data.integration?.email || "";

    if (outlookCalendarReady) {
      setOutlookStatus(`Live Outlook sync ready: ${outlookCalendarAccount}`);
    } else if (data.connected) {
      setOutlookStatus("Outlook is connected for email. Reconnect Outlook once to grant calendar access.", "warning");
    } else {
      setOutlookStatus("No Outlook account connected yet.", "warning");
    }
  } catch (error) {
    console.error(error);
    outlookCalendarReady = false;
    outlookCalendarAccount = "";
    setOutlookStatus("Could not load Outlook status. Check Microsoft OAuth setup and try Refresh.", "error");
  }
}

function renderSchedule() {
  renderCalendarHeader();
  if (calendarMode === "week") return renderWeekSchedule();
  if (calendarMode === "team") return renderTeamSchedule();
  return renderDaySchedule();
}

function renderCalendarHeader() {
  const dates = weekDates();
  qs("#calendar-date").value = currentScheduleDate;
  qsa("[data-calendar-mode]").forEach(button => button.classList.toggle("selected", button.dataset.calendarMode === calendarMode));
  if (calendarMode === "week") {
    qs("#calendar-eyebrow").textContent = "Week view";
    qs("#calendar-title").textContent = `${formatCalendarDate(dates[0], "short")} - ${formatCalendarDate(dates[6], "short")}`;
    return;
  }
  if (calendarMode === "team") {
    qs("#calendar-eyebrow").textContent = "Team view";
    qs("#calendar-title").textContent = `${formatCalendarDate(dates[0], "short")} - ${formatCalendarDate(dates[6], "short")}`;
    return;
  }
  qs("#calendar-eyebrow").textContent = currentScheduleDate === "2026-06-28" ? "Today" : "Selected day";
  qs("#calendar-title").textContent = formatCalendarDate(currentScheduleDate);
}

function setCalendarGrid(columns, chunks, mode) {
  const grid = qs("#calendar-grid");
  grid.className = `calendar-grid ${mode}-calendar`;
  grid.style.gridTemplateColumns = columns;
  grid.innerHTML = chunks.join("");
}

function renderDaySchedule() {
  const chunks = [`<div class="grid-head">Time</div>`, ...stylists.map(stylist => `<div class="grid-head">${escapeHtml(stylist)}</div>`)];
  scheduleHours().forEach(slotStart => {
    chunks.push(`<div class="time-cell">${formatHourLabel(slotStart)}</div>`);
    stylists.forEach(stylist => chunks.push(renderSlotCell(currentScheduleDate, slotStart, stylist)));
  });
  setCalendarGrid(`76px repeat(${stylists.length}, minmax(150px, 1fr))`, chunks, "day");
}

function renderWeekSchedule() {
  const dates = weekDates();
  const chunks = [`<div class="grid-head">Time</div>`, ...dates.map(date => `<div class="grid-head">${formatCalendarDate(date, "short")}</div>`)];
  scheduleHours().forEach(slotStart => {
    chunks.push(`<div class="time-cell">${formatHourLabel(slotStart)}</div>`);
    dates.forEach(date => {
      const stylist = firstAvailableStylist(date, slotStart) || stylists[0];
      const matches = appointments.filter(item => item.date === date && Number(item.start.split(":")[0]) === Number(slotStart.split(":")[0]));
      const timeOff = timeOffBlocks.filter(block => block.date === date && minutesFromTime(slotStart) < minutesFromTime(block.end) && minutesFromTime(slotStart) + 60 > minutesFromTime(block.start));
      chunks.push(`
        <div class="calendar-cell week-cell ${date === currentScheduleDate ? "current-date-cell" : ""}" data-slot-date="${date}" data-slot-start="${slotStart}" data-slot-stylist="${escapeHtml(stylist)}" tabindex="0" role="button" aria-label="Create booking on ${formatCalendarDate(date, "short")} at ${formatHourLabel(slotStart)}">
          ${matches.map(renderBookingCard).join("")}
          ${timeOff.map(block => renderAvailabilityBlock({ type: "time-off", message: `${block.employee} ${formatHourLabel(block.start)}-${formatHourLabel(block.end)}: ${block.reason || "time off"}` })).join("")}
          <span class="slot-button" aria-hidden="true"><span>+</span> Book ${formatHourLabel(slotStart)}</span>
        </div>
      `);
    });
  });
  setCalendarGrid("76px repeat(7, minmax(170px, 1fr))", chunks, "week");
}

function renderTeamSchedule() {
  const dates = weekDates();
  const chunks = [`<div class="grid-head">Team</div>`, ...dates.map(date => `<div class="grid-head">${formatCalendarDate(date, "short")}</div>`)];
  stylists.forEach(stylist => {
    chunks.push(`<div class="time-cell team-name">${escapeHtml(stylist)}</div>`);
    dates.forEach(date => {
      const start = firstBookableStart(date, stylist) || "09:00";
      const employeeAppointments = appointments.filter(item => item.date === date && item.stylist === stylist);
      const blocks = timeOffBlocks.filter(block => block.date === date && block.employee === stylist);
      const offDayConflict = findAvailabilityConflict({ id: "team-preview", date, start, duration: 60, stylist });
      chunks.push(`
        <div class="calendar-cell team-cell ${offDayConflict ? "blocked-slot" : ""} ${date === currentScheduleDate ? "current-date-cell" : ""}" data-slot-date="${date}" data-slot-start="${start}" data-slot-stylist="${escapeHtml(stylist)}" tabindex="0" role="button" aria-label="Create booking with ${stylist} on ${formatCalendarDate(date, "short")}">
          ${employeeAppointments.length ? employeeAppointments.map(renderBookingCard).join("") : `<p class="subline">No bookings</p>`}
          ${blocks.map(block => renderAvailabilityBlock({ type: "time-off", message: `${formatHourLabel(block.start)}-${formatHourLabel(block.end)}: ${block.reason || "time off"}` })).join("")}
          <span class="slot-button" aria-hidden="true"><span>+</span> Book first open</span>
        </div>
      `);
    });
  });
  setCalendarGrid("120px repeat(7, minmax(170px, 1fr))", chunks, "team");
}

function renderSlotCell(date, slotStart, stylist) {
  const slotAppointment = { id: "slot-preview", date, start: slotStart, duration: 60, stylist };
  const matches = appointments.filter(item => (
    item.date === date &&
    item.stylist === stylist &&
    appointmentsOverlap(slotAppointment, item)
  ));
  const availabilityConflict = findAvailabilityConflict(slotAppointment);
  return `
    <div class="calendar-cell ${availabilityConflict ? "blocked-slot" : ""} ${pendingSlot?.date === date && pendingSlot?.stylist === stylist && pendingSlot?.start === slotStart ? "slot-selected" : ""}" data-slot-date="${date}" data-slot-start="${slotStart}" data-slot-stylist="${escapeHtml(stylist)}" tabindex="0" role="button" aria-label="Create booking with ${stylist} at ${formatHourLabel(slotStart)} on ${formatCalendarDate(date, "short")}">
      ${matches.map(renderBookingCard).join("")}
      ${availabilityConflict ? renderAvailabilityBlock(availabilityConflict) : ""}
      <span class="slot-button" aria-hidden="true">
        <span>+</span> Book ${formatHourLabel(slotStart)}
      </span>
    </div>
  `;
}

function firstAvailableStylist(date, start) {
  return stylists.find(stylist => {
    const draft = { id: "slot-preview", date, start, duration: 60, stylist };
    return !findAvailabilityConflict(draft) && !findBookingConflict(draft);
  });
}

function firstBookableStart(date, stylist) {
  return scheduleHours().find(start => {
    const draft = { id: "slot-preview", date, start, duration: 60, stylist };
    return !findAvailabilityConflict(draft) && !findBookingConflict(draft);
  });
}

function renderAvailabilityBlock(conflict) {
  const label = conflict.type === "time-off" ? "Time off" : "Unavailable";
  return `
    <div class="availability-block">
      <strong>${label}</strong>
      <span>${escapeHtml(conflict.message)}</span>
    </div>
  `;
}

function formatHourLabel(time) {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function renderBookingCard(appointment) {
  const statusClass = appointment.status.toLowerCase().replace(/\s+/g, "-");
  return `
    <button class="booking-card ${statusClass} ${appointment.id === selectedId ? "active" : ""}" data-appointment="${appointment.id}">
      <strong>${formatTime(toDate(appointment))} ${appointment.client}</strong>
      <span>${appointment.service}</span>
      <span>${appointment.phone || appointment.email || "No phone"}</span>
      <span>${appointment.status}</span>
    </button>
  `;
}

function selectAppointment(id) {
  selectedId = id;
  pendingSlot = null;
  const appointment = selectedAppointment();
  if (!appointment) return;
  fillForm(appointment);
  renderSchedule();
  renderSelected();
}

function renderStylistOptions(selected = "") {
  const names = [...new Set([...stylists, selected].filter(Boolean))];
  qs("#stylist-input").innerHTML = names.map(stylist => `<option>${escapeHtml(stylist)}</option>`).join("");
  if (selected) qs("#stylist-input").value = selected;
}

function fillForm(appointment) {
  qs("#form-heading").textContent = "Edit appointment";
  qs("#appointment-id").value = appointment.id;
  qs("#client-input").value = appointment.client;
  qs("#email-input").value = appointment.email || "";
  qs("#phone-input").value = appointment.phone || "";
  qs("#service-input").value = appointment.service;
  renderStylistOptions(appointment.stylist);
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
  qs("#phone-input").value = "";
  qs("#service-input").value = "";
  renderStylistOptions(stylists[0]);
  qs("#date-input").value = currentScheduleDate;
  qs("#start-input").value = "09:00";
  qs("#duration-input").value = "60";
  qs("#status-input").value = "Booked";
  qs("#notes-input").value = "";
}

function selectSlot({ date, start, stylist }) {
  const draft = {
    id: "slot-preview",
    date,
    start,
    stylist,
    duration: Number(qs("#duration-input")?.value || 60)
  };
  const conflict = findBookingConflict(draft);
  if (conflict) {
    selectAppointment(conflict.id);
    showToast(conflictMessage(draft, conflict));
    return;
  }
  const availabilityConflict = findAvailabilityConflict(draft);
  if (availabilityConflict) {
    showToast(availabilityConflict.message);
    return;
  }

  selectedId = null;
  pendingSlot = { date, start, stylist };
  clearForm();
  qs("#form-heading").textContent = `New booking with ${stylist}`;
  qs("#stylist-input").value = stylist;
  qs("#date-input").value = date;
  qs("#start-input").value = start;
  qs("#status-input").value = "Booked";
  renderSchedule();
  renderSelected();
  qs("#client-input").focus();
  qs(".booking-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(`${stylist} selected for ${formatHourLabel(start)}.`);
}

function setScheduleDate(date) {
  currentScheduleDate = date;
  pendingSlot = null;
  renderSchedule();
}

function changeScheduleDate(days) {
  setScheduleDate(addDays(currentScheduleDate, calendarMode === "day" ? days : days * 7));
}

function setCalendarMode(mode) {
  calendarMode = mode;
  pendingSlot = null;
  renderSchedule();
}

function handleCalendarClick(event) {
  const appointmentButton = event.target.closest("[data-appointment]");
  if (appointmentButton) {
    selectAppointment(appointmentButton.dataset.appointment);
    return;
  }

  const cell = event.target.closest(".calendar-cell[data-slot-date]");
  if (!cell) return;
  selectSlot({
    date: cell.dataset.slotDate,
    start: cell.dataset.slotStart,
    stylist: cell.dataset.slotStylist
  });
}

function handleCalendarKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  const cell = event.target.closest(".calendar-cell[data-slot-date]");
  if (!cell) return;
  event.preventDefault();
  selectSlot({
    date: cell.dataset.slotDate,
    start: cell.dataset.slotStart,
    stylist: cell.dataset.slotStylist
  });
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
  const service = serviceDetails(appointment.service);
  const paid = paidTotal(appointment.id);
  qs("#selected-detail").textContent = `${formatDateRange(appointment)} with ${appointment.stylist}. ${paymentStatus(appointment)}: ${formatMoney(paid)} of ${formatMoney(service.price)}. ${appointment.phone ? `Phone ${appointment.phone}. ` : ""}${appointment.notes || ""}`;
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const id = qs("#appointment-id").value || `apt-${Date.now()}`;
  const appointment = {
    id,
    client: qs("#client-input").value.trim(),
    email: qs("#email-input").value.trim(),
    phone: qs("#phone-input").value.trim(),
    service: qs("#service-input").value.trim(),
    stylist: qs("#stylist-input").value,
    date: qs("#date-input").value,
    start: qs("#start-input").value,
    duration: Number(qs("#duration-input").value),
    status: qs("#status-input").value,
    notes: qs("#notes-input").value.trim()
  };

  const conflict = findBookingConflict(appointment);
  if (conflict) {
    showToast(conflictMessage(appointment, conflict));
    qs("#start-input").focus();
    return;
  }
  const availabilityConflict = findAvailabilityConflict(appointment);
  if (availabilityConflict) {
    showToast(availabilityConflict.message);
    qs("#start-input").focus();
    return;
  }

  const existingIndex = appointments.findIndex(item => item.id === id);
  if (existingIndex >= 0) appointments[existingIndex] = appointment;
  else appointments.push(appointment);

  selectedId = id;
  upsertCustomer(customerFromAppointment(appointment));
  saveAppointments();
  renderAll();
  fillForm(appointment);
  showToast("Appointment saved locally.");
}

async function createSelectedGoogleEvent() {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select an appointment first.");
  const choice = selectedGoogleCalendarChoice();
  if (!choice) {
    showToast("Connect Google Calendar and choose a calendar first.");
    switchView("integrations");
    return;
  }

  try {
    setGoogleStatus("Creating event in Google Calendar...", "warning");
    const response = await fetch("/api/salon-crm/google-events", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        integrationId: choice.integrationId,
        calendarId: choice.calendarId,
        appointment,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Failed to create event");

    setGoogleStatus(`Created in Google Calendar: ${choice.label}`);
    if (data.htmlLink) window.open(data.htmlLink, "_blank", "noopener,noreferrer");
    showToast("Google Calendar event created.");
  } catch (error) {
    console.error(error);
    setGoogleStatus(error.message || "Failed to create Google Calendar event.", "error");
    showToast(error.message || "Failed to create Google Calendar event.");
  }
}

async function createSelectedOutlookEvent() {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select an appointment first.");
  if (!outlookCalendarReady) {
    showToast("Connect Outlook with calendar access first.");
    switchView("integrations");
    return;
  }

  try {
    setOutlookStatus("Creating event in Outlook Calendar...", "warning");
    const response = await fetch("/api/salon-crm/outlook-events", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointment }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Failed to create Outlook event");

    setOutlookStatus(`Created in Outlook Calendar: ${outlookCalendarAccount || "connected account"}`);
    if (data.htmlLink) window.open(data.htmlLink, "_blank", "noopener,noreferrer");
    showToast("Outlook Calendar event created.");
  } catch (error) {
    console.error(error);
    setOutlookStatus(error.message || "Failed to create Outlook Calendar event.", "error");
    showToast(error.message || "Failed to create Outlook Calendar event.");
  }
}

function openSelected(provider) {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select an appointment first.");
  if (provider === "google") {
    createSelectedGoogleEvent();
    return;
  }
  if (provider === "outlook") {
    createSelectedOutlookEvent();
    return;
  }
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
      phone: "",
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
    imported.forEach(item => upsertCustomer(customerFromAppointment(item)));
    saveAppointments();
    renderAll();
    fillForm(imported[0]);
    showToast(`Imported ${imported.length} calendar event${imported.length === 1 ? "" : "s"}.`);
  };
  reader.readAsText(file);
}

function saveMigrationLog(log) {
  localStorage.setItem(migrationLogKey, JSON.stringify(log));
}

function latestMigrationLog() {
  try {
    return JSON.parse(localStorage.getItem(migrationLogKey));
  } catch {
    return null;
  }
}

function handleCsvImport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const rows = parseCsv(String(reader.result || ""));
    if (!rows.length) return showToast("No CRM rows found in that CSV.");

    const imported = [];
    const skipped = [];
    const conflicts = [];

    rows.forEach((row, index) => {
      const appointment = appointmentFromCsvRow(row, index);
      if (!appointment) {
        skipped.push(`Row ${index + 2}: missing client, date, or start time.`);
        return;
      }
      const conflict = findBookingConflict(appointment);
      if (conflict) {
        conflicts.push(`Row ${index + 2}: ${conflictMessage(appointment, conflict)}`);
        return;
      }
      const availabilityConflict = findAvailabilityConflict(appointment);
      if (availabilityConflict) {
        conflicts.push(`Row ${index + 2}: ${availabilityConflict.message}`);
        return;
      }
      imported.push(appointment);
      appointments.push(appointment);
      upsertCustomer(customerFromAppointment(appointment));
    });

    if (imported.length) {
      selectedId = imported[0].id;
      localStorage.setItem(importedKey, String(Number(localStorage.getItem(importedKey) || 0) + imported.length));
      saveAppointments();
      fillForm(imported[0]);
    }

    const log = {
      imported: imported.length,
      skipped: skipped.length,
      conflicts: conflicts.length,
      fileName: file.name,
      at: new Date().toLocaleString(),
      details: [...conflicts, ...skipped].slice(0, 6)
    };
    saveMigrationLog(log);
    renderAll();
    showToast(`CRM import finished: ${imported.length} added, ${conflicts.length + skipped.length} skipped.`);
  };
  reader.readAsText(file);
}

function renderMigration() {
  const uniqueClients = new Set(appointments.map(item => item.client)).size;
  const withContact = appointments.filter(item => item.email || item.phone).length;
  const readiness = [
    { label: "Clients ready", value: uniqueClients },
    { label: "Appointments loaded", value: appointments.length },
    { label: "With contact info", value: `${Math.round((withContact / Math.max(appointments.length, 1)) * 100)}%` }
  ];

  qs("#migration-readiness").innerHTML = readiness.map(item => `
    <div>
      <strong>${item.value}</strong>
      <span>${item.label}</span>
    </div>
  `).join("");

  qs("#field-map").innerHTML = fieldMappings.map(item => `
    <div class="field-map-row">
      <strong>${item.target}</strong>
      <span>${item.accepted}</span>
    </div>
  `).join("");

  const log = latestMigrationLog();
  if (!log) {
    qs("#migration-summary").textContent = "Import a CRM CSV to preview the switch-over summary.";
    qs("#migration-log").innerHTML = `<p class="subline">No CRM CSV imported in this browser yet.</p>`;
    return;
  }

  qs("#migration-summary").textContent = `${log.fileName} imported on ${log.at}: ${log.imported} added, ${log.conflicts} conflicts, ${log.skipped} incomplete rows.`;
  qs("#migration-log").innerHTML = `
    <div class="migration-log-grid">
      <div><strong>${log.imported}</strong><span>Added</span></div>
      <div><strong>${log.conflicts}</strong><span>Conflicts</span></div>
      <div><strong>${log.skipped}</strong><span>Incomplete</span></div>
    </div>
    ${(log.details || []).length ? `<ul>${log.details.map(detail => `<li>${detail}</li>`).join("")}</ul>` : `<p class="subline">No skipped rows. This file is ready to review in the calendar.</p>`}
  `;
}

function renderCustomerOptions() {
  const options = customers
    .slice()
    .sort((first, second) => first.name.localeCompare(second.name))
    .map(customer => `<option value="${escapeHtml(customer.name)}">${escapeHtml(customer.phone || customer.email || "")}</option>`)
    .join("");
  qs("#client-options").innerHTML = options;
}

function autofillCustomer() {
  const customer = findCustomer(qs("#client-input").value);
  if (!customer) return;
  if (qs("#appointment-id").value) return;
  if (!qs("#email-input").value) qs("#email-input").value = customer.email || "";
  if (!qs("#phone-input").value) qs("#phone-input").value = customer.phone || "";
  if (!qs("#notes-input").value) qs("#notes-input").value = customer.notes || "";
  showToast(`Autofilled ${customer.name}'s saved customer info.`);
}

function renderClients() {
  const byClient = customers.slice().sort((first, second) => first.name.localeCompare(second.name));
  qs("#client-list").innerHTML = byClient.map((client, index) => `
    <button class="client-row ${index === 0 ? "active" : ""}" data-client="${escapeHtml(client.name)}">
      <strong>${escapeHtml(client.name)}</strong>
      <span class="subline">${escapeHtml(client.phone || "No phone")} - ${escapeHtml(client.email || "No email")} - last ${escapeHtml(client.lastVisit || "No visit yet")}</span>
    </button>
  `).join("");

  qsa("[data-client]").forEach(button => button.addEventListener("click", () => {
    qsa(".client-row").forEach(row => row.classList.toggle("active", row === button));
    const clientAppointments = appointments.filter(item => item.client === button.dataset.client);
    renderClientProfile(button.dataset.client, clientAppointments, findCustomer(button.dataset.client));
  }));
  if (byClient[0]) renderClientProfile(byClient[0].name, appointments.filter(item => item.client === byClient[0].name), byClient[0]);
}

function renderClientProfile(clientName, items, customer = null) {
  const totalMinutes = items.reduce((sum, item) => sum + Number(item.duration), 0);
  const primary = customer || items[0] || {};
  qs("#client-profile").innerHTML = `
    <p class="eyebrow">Client profile</p>
    <h2>${escapeHtml(clientName)}</h2>
    <div class="profile-grid">
      <div><strong>${items.length}</strong><span class="subline">Appointments</span></div>
      <div><strong>${totalMinutes}</strong><span class="subline">Booked minutes</span></div>
      <div><strong>${items[0]?.status || "New"}</strong><span class="subline">Latest status</span></div>
      <div><strong>${escapeHtml(primary.phone || "No phone")}</strong><span class="subline">Phone</span></div>
    </div>
    <p class="subline">${escapeHtml(primary.email || "No email on file")}</p>
    <p>${items.length ? items.map(item => `${escapeHtml(item.date)} ${escapeHtml(item.start)}: ${escapeHtml(item.service)} with ${escapeHtml(item.stylist)}`).join("<br>") : "Saved customer record with no appointment history yet."}</p>
  `;
}

function renderEmployees() {
  const activeCount = employees.filter(employee => employee.status !== "Inactive").length;
  qs("#employee-summary").innerHTML = `
    <div><strong>${employees.length}</strong><span>Total employees</span></div>
    <div><strong>${activeCount}</strong><span>Bookable stylists</span></div>
    <div><strong>${appointments.filter(item => stylists.includes(item.stylist)).length}</strong><span>Assigned bookings</span></div>
  `;

  qs("#employee-list").innerHTML = employees.map(employee => `
    <article class="employee-row ${employee.status === "Inactive" ? "inactive" : ""}">
      <div>
        <strong>${escapeHtml(employee.name)}</strong>
        <span class="subline">${escapeHtml(employee.role || "Stylist")} - ${escapeHtml(employee.status)}</span>
        <span class="subline">Hours: ${formatHourLabel(employee.workStart || "09:00")}-${formatHourLabel(employee.workEnd || "17:00")} - ${escapeHtml(employee.workingDays || "No days set")}</span>
        <span class="subline">${escapeHtml(employee.phone || "No phone")} - ${escapeHtml(employee.email || "No email")}</span>
        <span class="subline">${escapeHtml(employee.services || "No services listed")}</span>
      </div>
      <div class="employee-actions">
        <button class="secondary-button" data-edit-employee="${escapeHtml(employee.id)}">Edit</button>
        <button class="secondary-button" data-toggle-employee="${escapeHtml(employee.id)}">${employee.status === "Inactive" ? "Reactivate" : "Deactivate"}</button>
      </div>
    </article>
  `).join("");
}

function fillEmployeeForm(employee) {
  qs("#employee-id").value = employee.id;
  qs("#employee-name").value = employee.name;
  qs("#employee-role").value = employee.role || "";
  qs("#employee-email").value = employee.email || "";
  qs("#employee-phone").value = employee.phone || "";
  qs("#employee-services").value = employee.services || "";
  qs("#employee-work-start").value = employee.workStart || "09:00";
  qs("#employee-work-end").value = employee.workEnd || "17:00";
  qs("#employee-working-days").value = employee.workingDays || "Sun, Mon, Tue, Wed, Thu";
  qs("#employee-status").value = employee.status || "Active";
  qs("#employee-form-title").textContent = "Edit employee";
}

function clearEmployeeForm() {
  qs("#employee-id").value = "";
  qs("#employee-name").value = "";
  qs("#employee-role").value = "";
  qs("#employee-email").value = "";
  qs("#employee-phone").value = "";
  qs("#employee-services").value = "";
  qs("#employee-work-start").value = "09:00";
  qs("#employee-work-end").value = "17:00";
  qs("#employee-working-days").value = "Sun, Mon, Tue, Wed, Thu";
  qs("#employee-status").value = "Active";
  qs("#employee-form-title").textContent = "Add employee";
}

function handleEmployeeSubmit(event) {
  event.preventDefault();
  const id = qs("#employee-id").value || `emp-${Date.now()}`;
  const employee = {
    id,
    name: qs("#employee-name").value.trim(),
    role: qs("#employee-role").value.trim(),
    email: qs("#employee-email").value.trim(),
    phone: qs("#employee-phone").value.trim(),
    services: qs("#employee-services").value.trim(),
    workStart: qs("#employee-work-start").value || "09:00",
    workEnd: qs("#employee-work-end").value || "17:00",
    workingDays: qs("#employee-working-days").value.trim() || "Sun, Mon, Tue, Wed, Thu",
    status: qs("#employee-status").value
  };
  if (!employee.name) return showToast("Employee name is required.");

  const existingIndex = employees.findIndex(item => item.id === id);
  if (existingIndex >= 0) employees[existingIndex] = employee;
  else employees.push(employee);

  saveEmployees();
  renderStylistOptions(qs("#stylist-input").value);
  renderAll();
  clearEmployeeForm();
  showToast("Employee saved.");
}

function handleEmployeeListClick(event) {
  const editId = event.target.closest("[data-edit-employee]")?.dataset.editEmployee;
  if (editId) {
    const employee = employees.find(item => item.id === editId);
    if (employee) fillEmployeeForm(employee);
    return;
  }

  const toggleId = event.target.closest("[data-toggle-employee]")?.dataset.toggleEmployee;
  if (!toggleId) return;
  const employee = employees.find(item => item.id === toggleId);
  if (!employee) return;
  employee.status = employee.status === "Inactive" ? "Active" : "Inactive";
  saveEmployees();
  renderStylistOptions(qs("#stylist-input").value);
  renderAll();
  showToast(`${employee.name} is now ${employee.status.toLowerCase()}.`);
}

function renderTimeOff() {
  qs("#time-off-employee").innerHTML = employees.map(employee => `<option>${escapeHtml(employee.name)}</option>`).join("");
  qs("#time-off-list").innerHTML = timeOffBlocks.length ? timeOffBlocks.map(block => `
    <article class="time-off-row">
      <div>
        <strong>${escapeHtml(block.employee)} blocked</strong>
        <span class="subline">${escapeHtml(block.date)} ${formatHourLabel(block.start)}-${formatHourLabel(block.end)} - ${escapeHtml(block.reason || "Time off")}</span>
      </div>
      <button class="secondary-button" data-delete-time-off="${escapeHtml(block.id)}">Remove</button>
    </article>
  `).join("") : `<p class="subline">No time-off blocks yet.</p>`;
}

function handleTimeOffSubmit(event) {
  event.preventDefault();
  const block = {
    id: `off-${Date.now()}`,
    employee: qs("#time-off-employee").value,
    date: qs("#time-off-date").value,
    start: qs("#time-off-start").value,
    end: qs("#time-off-end").value,
    reason: qs("#time-off-reason").value.trim() || "Time off"
  };
  if (minutesFromTime(block.end) <= minutesFromTime(block.start)) return showToast("Time off end must be after start.");
  timeOffBlocks.push(block);
  saveTimeOffBlocks();
  renderAll();
  showToast(`${block.employee}'s calendar is blocked.`);
}

function handleTimeOffClick(event) {
  const id = event.target.closest("[data-delete-time-off]")?.dataset.deleteTimeOff;
  if (!id) return;
  timeOffBlocks = timeOffBlocks.filter(block => block.id !== id);
  saveTimeOffBlocks();
  renderAll();
  showToast("Time-off block removed.");
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

function renderPayments() {
  const appointment = selectedAppointment();
  const service = serviceDetails(appointment?.service);
  const paid = appointment ? paidTotal(appointment.id) : 0;
  const balance = Math.max(0, Number(service.price || 0) - paid);
  const appointmentList = appointments.map(item => `
    <button class="payment-appointment ${item.id === selectedId ? "active" : ""}" data-payment-appointment="${escapeHtml(item.id)}">
      <strong>${escapeHtml(item.client)}</strong>
      <span>${escapeHtml(item.service)} - ${paymentStatus(item)}</span>
      <span>${formatDateRange(item)}</span>
    </button>
  `).join("");

  qs("#payment-appointment-list").innerHTML = appointmentList;
  qs("#payment-title").textContent = appointment ? `${appointment.client} checkout` : "Select an appointment";
  qs("#payment-detail").textContent = appointment
    ? `${appointment.service} with ${appointment.stylist}. ${formatMoney(paid)} paid, ${formatMoney(balance)} balance.`
    : "Choose a booking to take a deposit or checkout payment.";

  qs("#payment-service-price").value = Number(service.price || 0).toFixed(2);
  qs("#payment-deposit").value = Number(service.deposit || 0).toFixed(2);
  qs("#payment-amount").value = balance ? Math.min(balance, Number(service.deposit || balance)).toFixed(2) : "0.00";
  qs("#payment-method").innerHTML = paymentMethods.map(method => `<option value="${method.value}">${method.label}</option>`).join("");

  const history = appointment ? appointmentPayments(appointment.id) : payments.slice(-6).reverse();
  qs("#payment-history").innerHTML = history.length ? history.map(payment => `
    <article class="payment-row ${payment.status === "Refunded" ? "refunded" : ""}">
      <div>
        <strong>${formatMoney(payment.amount)} ${escapeHtml(payment.status)}</strong>
        <span class="subline">${escapeHtml(payment.methodLabel)} - ${escapeHtml(payment.client)} - ${escapeHtml(payment.date)}</span>
      </div>
      ${payment.status !== "Refunded" ? `<button class="secondary-button" data-refund-payment="${escapeHtml(payment.id)}">Refund</button>` : ""}
    </article>
  `).join("") : `<p class="subline">No payments recorded for this appointment yet.</p>`;

  const totalCollected = payments.filter(payment => payment.status !== "Refunded").reduce((sum, payment) => sum + Number(payment.amount), 0);
  const outstanding = appointments.reduce((sum, item) => {
    const details = serviceDetails(item.service);
    return sum + Math.max(0, details.price - paidTotal(item.id));
  }, 0);
  qs("#payment-summary").innerHTML = `
    <div><strong>${formatMoney(totalCollected)}</strong><span>Collected</span></div>
    <div><strong>${formatMoney(outstanding)}</strong><span>Open balance</span></div>
    <div><strong>${payments.length}</strong><span>Transactions</span></div>
  `;
}

function recordPayment(type = "Payment") {
  const appointment = selectedAppointment();
  if (!appointment) return showToast("Select an appointment first.");
  const amount = Number(qs("#payment-amount").value);
  if (!amount || amount <= 0) return showToast("Enter a payment amount.");
  const method = paymentMethods.find(item => item.value === qs("#payment-method").value) || paymentMethods[0];
  const payment = {
    id: `pay-${Date.now()}`,
    appointmentId: appointment.id,
    client: appointment.client,
    amount,
    method: method.value,
    methodLabel: method.label,
    status: type,
    date: new Date().toLocaleString()
  };
  payments.push(payment);
  savePayments();
  renderAll();
  showToast(`${type} recorded with ${method.label}.`);
}

function refundPayment(id) {
  const payment = payments.find(item => item.id === id);
  if (!payment || payment.status === "Refunded") return;
  payments.push({
    ...payment,
    id: `refund-${Date.now()}`,
    status: "Refunded",
    date: new Date().toLocaleString()
  });
  savePayments();
  renderAll();
  showToast("Refund recorded.");
}

function handlePaymentClick(event) {
  const appointmentId = event.target.closest("[data-payment-appointment]")?.dataset.paymentAppointment;
  if (appointmentId) {
    selectAppointment(appointmentId);
    switchView("payments");
    return;
  }

  const refundId = event.target.closest("[data-refund-payment]")?.dataset.refundPayment;
  if (refundId) refundPayment(refundId);
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
  renderCustomerOptions();
  renderClients();
  renderEmployees();
  renderTimeOff();
  renderEmail();
  renderPayments();
  renderReports();
  renderMigration();
  renderMetrics();
}

function init() {
  renderStylistOptions(stylists[0]);
  qsa("[data-view]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
  qsa("[data-calendar-mode]").forEach(button => button.addEventListener("click", () => setCalendarMode(button.dataset.calendarMode)));
  qs("#previous-date").addEventListener("click", () => changeScheduleDate(-1));
  qs("#next-date").addEventListener("click", () => changeScheduleDate(1));
  qs("#calendar-date").addEventListener("change", event => setScheduleDate(event.target.value || currentScheduleDate));
  qs("#calendar-grid").addEventListener("click", handleCalendarClick);
  qs("#calendar-grid").addEventListener("keydown", handleCalendarKeydown);
  qs("#booking-form").addEventListener("submit", handleBookingSubmit);
  qs("#client-input").addEventListener("input", autofillCustomer);
  qs("#client-input").addEventListener("change", autofillCustomer);
  qs("#client-input").addEventListener("blur", autofillCustomer);
  qs("#clear-form").addEventListener("click", clearForm);
  qs("#delete-appointment").addEventListener("click", deleteSelectedAppointment);
  qs("#employee-form").addEventListener("submit", handleEmployeeSubmit);
  qs("#clear-employee-form").addEventListener("click", clearEmployeeForm);
  qs("#employee-list").addEventListener("click", handleEmployeeListClick);
  qs("#time-off-form").addEventListener("submit", handleTimeOffSubmit);
  qs("#time-off-list").addEventListener("click", handleTimeOffClick);
  qs("#payment-appointment-list").addEventListener("click", handlePaymentClick);
  qs("#payment-history").addEventListener("click", handlePaymentClick);
  qs("#take-deposit").addEventListener("click", () => recordPayment("Deposit"));
  qs("#take-payment").addEventListener("click", () => recordPayment("Paid"));
  qs("#new-appointment").addEventListener("click", () => {
    switchView("schedule");
    clearForm();
    qs("#client-input").focus();
  });
  qs("#google-link").addEventListener("click", () => openSelected("google"));
  qs("#outlook-link").addEventListener("click", () => openSelected("outlook"));
  qs("#download-ics").addEventListener("click", downloadSelectedIcs);
  qs("#copy-summary").addEventListener("click", copySelectedSummary);
  qs("#refresh-google-calendars").addEventListener("click", loadGoogleCalendars);
  qs("#refresh-outlook-status").addEventListener("click", loadOutlookStatus);
  qs("#open-outlook-draft").addEventListener("click", () => {
    const appointment = selectedAppointment();
    if (!appointment) return showToast("Select an appointment first.");
    window.open(outlookCalendarUrl(appointment), "_blank", "noopener,noreferrer");
    showToast("Opened Outlook calendar draft.");
  });
  qs("#google-calendar-picker").addEventListener("change", event => {
    localStorage.setItem(googleCalendarChoiceKey, event.target.value);
    const choice = selectedGoogleCalendarChoice();
    if (choice) setGoogleStatus(`Live Google sync ready: ${choice.label}`);
  });
  qs("#export-all").addEventListener("click", () => {
    downloadFile("glossdesk-appointments.ics", buildIcs(appointments));
    showToast("Exported all appointments.");
  });
  qs("#reset-demo").addEventListener("click", () => {
    appointments = seedAppointments.map(item => ({ ...item }));
    employees = seedEmployees.map(item => ({ ...item }));
    timeOffBlocks = seedTimeOff.map(item => ({ ...item }));
    payments = [];
    saveEmployees();
    customers = customersFromAppointments(appointments);
    selectedId = appointments[0].id;
    currentScheduleDate = "2026-06-28";
    calendarMode = "day";
    pendingSlot = null;
    localStorage.removeItem(importedKey);
    localStorage.removeItem(migrationLogKey);
    saveAppointments();
    saveCustomers();
    saveTimeOffBlocks();
    savePayments();
    renderAll();
    fillForm(selectedAppointment());
    showToast("Demo data reset.");
  });
  qsa("[data-open-selected]").forEach(button => button.addEventListener("click", () => openSelected(button.dataset.openSelected)));
  qs("#import-trigger").addEventListener("click", () => qs("#ics-import").click());
  qs("#import-trigger-2").addEventListener("click", () => qs("#ics-import").click());
  qs("#ics-import").addEventListener("change", event => handleIcsImport(event.target.files[0]));
  qs("#import-csv-trigger").addEventListener("click", () => qs("#csv-import").click());
  qs("#csv-import").addEventListener("change", event => {
    handleCsvImport(event.target.files[0]);
    event.target.value = "";
  });
  qs("#download-sample-csv").addEventListener("click", () => {
    downloadFile("glossdesk-migration-sample.csv", sampleCsv, "text/csv");
    showToast("Downloaded sample CRM CSV.");
  });
  qs("#global-search").addEventListener("input", event => {
    const term = event.target.value.toLowerCase();
    qsa(".booking-card").forEach(card => {
      const appointment = appointments.find(item => item.id === card.dataset.appointment);
      const searchable = `${card.textContent} ${appointment?.email || ""} ${appointment?.phone || ""}`.toLowerCase();
      card.style.display = searchable.includes(term) ? "grid" : "none";
    });
  });
  renderAll();
  if (selectedAppointment()) fillForm(selectedAppointment());
  checkLiveStatus();
  loadGoogleCalendars();
  loadOutlookStatus();
}

init();
