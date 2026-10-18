"use server";

import {
  addMinutes,
  fieldTripExperiences,
  formatDate,
  formatTime,
  getFieldTripAvailability,
  startTimes,
} from "@/lib/data/field-trip-availability";
import { site } from "@/lib/data/site";
import { postToFormsWebhook } from "@/lib/forms-webhook";

export type FieldTripState =
  | { status: "idle" }
  | { status: "success"; firstName: string; when: string }
  | { status: "error"; message: string; slotUnavailable?: boolean };

const fallbackMessage =
  `Something went wrong on our end, sorry! Give us a call at ${site.phone} ` +
  "and we'll get your field trip on the calendar.";

export async function requestFieldTrip(
  _prev: FieldTripState,
  formData: FormData,
): Promise<FieldTripState> {
  const get = (name: string) => (formData.get(name) ?? "").toString().trim();

  const contactName = get("contactName");
  const [firstName, ...rest] = contactName.split(/\s+/);
  const experience = fieldTripExperiences.find(
    (e) => e.name === get("experience"),
  );
  const date = get("date");
  const time = get("time");
  const when = experience
    ? `${formatDate(date)}, ${formatTime(time)}–${formatTime(addMinutes(time, experience.hours * 60))}`
    : "";

  // honeypot — bots fill every field; humans never see this one
  if (get("website") !== "") {
    return { status: "success", firstName, when };
  }

  const students = Number(get("students"));
  const email = get("email");
  const school = get("school");
  if (
    !experience ||
    !Number.isInteger(students) ||
    students < 1 ||
    !school ||
    !contactName ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return {
      status: "error",
      message:
        "We need the experience, number of students, school, your name, and a working email. Mind checking those?",
    };
  }

  // re-check the slot server-side — the page's availability can be up to an
  // hour stale, and the calendar may have filled in since
  const day = (await getFieldTripAvailability()).find((d) => d.date === date);
  if (!day || !startTimes(day.windows, experience.hours).includes(time)) {
    return {
      status: "error",
      slotUnavailable: true,
      message:
        "That date and time isn't open anymore. Pick another slot on the calendar and try again.",
    };
  }

  const details = {
    experience: experience.name,
    date,
    startTime: time,
    students,
    chaperones: get("chaperones"),
    grades: get("grades"),
    notes: get("notes"),
  };

  // Shaped like a contact submission so it lands in the existing sheet
  // columns; the structured fields ride along for the notification email.
  const payload = {
    formType: "field-trip",
    firstName,
    lastName: rest.join(" "),
    email,
    organization: school,
    phone: get("phone"),
    topic: "Field trip request",
    source: "",
    message: [
      `${experience.name} — ${when}`,
      `${school}: ${students} students` +
        (details.chaperones ? `, ${details.chaperones} chaperones` : "") +
        (details.grades ? ` (grades: ${details.grades})` : ""),
      details.notes,
    ]
      .filter(Boolean)
      .join("\n"),
    ...details,
    submittedAt: new Date().toISOString(),
  };

  try {
    await postToFormsWebhook(payload);
  } catch (err) {
    console.error("Field trip webhook failed:", err);
    return { status: "error", message: fallbackMessage };
  }

  return { status: "success", firstName, when };
}
