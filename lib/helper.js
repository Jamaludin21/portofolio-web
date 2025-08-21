import { IMAGE_FIELD_KEYS } from "./resourceFields";

export const formatPhoneNumber = (phone) => {
  // Remove non-digit characters
  const cleaned = phone.replace(/[^\d]/g, "");
  // Convert starting 0 to 62
  return cleaned.startsWith("0") ? "62" + cleaned.slice(1) : cleaned;
};

/**
 * Converts dash or underscore strings to Camel Text.
 * Example: "dashboard-products" => "Dashboard Products"
 */
export function toCamelText(text) {
  return text
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function parseDateOrNull(v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

export function toDateInput(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function buildDefaultValues(resource, row, FIELD_CONFIG) {
  const fields = FIELD_CONFIG[resource] || [];
  const values = {};
  fields.forEach((f) => {
    const v = row ? row[f.key] : undefined;
    if (f.type === "date") values[f.key] = toDateInput(v);
    else if (f.type === "boolean") values[f.key] = !!v;
    else values[f.key] = v ?? "";
  });
  return values;
}

export function getRules(f) {
  const rules = {};
  if (f.required) rules.required = `${f.label} is required`;
  return rules;
}

export function collectBlobUrls(resource, row) {
  const keys = IMAGE_FIELD_KEYS[resource] || [];
  const urls = [];
  for (const k of keys) {
    if (row?.[k]) urls.push(row[k]);
  }
  return urls;
}
