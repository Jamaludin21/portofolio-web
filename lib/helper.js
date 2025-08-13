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
