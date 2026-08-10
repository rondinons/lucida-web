// Debe mantenerse en sync con packages/database/prisma/seed.ts (country_config).
// Fuente de verdad en runtime: la tabla country_config. Esto es solo para
// validar en el cliente antes del round-trip al servidor.
export const COUNTRY_CODES = ["AR", "CL", "UY", "MX", "CO", "PE"] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

export const FISCAL_ID_REGEX: Record<CountryCode, RegExp> = {
  AR: /^\d{2}-\d{8}-\d{1}$/, // CUIT
  CL: /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, // RUT
  UY: /^\d{12}$/, // RUT
  MX: /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/, // RFC
  CO: /^\d{9}-\d{1}$/, // NIT
  PE: /^\d{11}$/, // RUC
};

export function isValidFiscalId(countryCode: CountryCode, value: string): boolean {
  return FISCAL_ID_REGEX[countryCode].test(value);
}
