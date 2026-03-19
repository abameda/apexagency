export function normalizePhone(countryCode: string, number: string): string {
  let cleaned = number.replace(/[\s\-()]/g, "");

  // Egypt: strip leading 0 when using +20
  if (countryCode === "+20" && cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1);
  }

  return `${countryCode}${cleaned}`;
}
