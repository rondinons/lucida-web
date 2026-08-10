import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Tabla de configuración por país — sección 11.1 del documento de arquitectura.
// Agregar un país nuevo es agregar una fila acá, no tocar código.
const countries = [
  {
    countryCode: "AR",
    nombre: "Argentina",
    fiscalIdLabel: "CUIT",
    fiscalIdRegex: "^\\d{2}-\\d{8}-\\d{1}$",
    defaultCurrency: "ARS",
    timezoneDefault: "America/Argentina/Buenos_Aires",
    phonePrefix: "+54",
    billingAdapter: "afip",
    dataProtectionLaw: "Ley 25.326",
  },
  {
    countryCode: "CL",
    nombre: "Chile",
    fiscalIdLabel: "RUT",
    fiscalIdRegex: "^\\d{1,2}\\.\\d{3}\\.\\d{3}-[\\dkK]$",
    defaultCurrency: "CLP",
    timezoneDefault: "America/Santiago",
    phonePrefix: "+56",
    billingAdapter: "internal_pdf",
    dataProtectionLaw: "Ley 19.628",
  },
  {
    countryCode: "UY",
    nombre: "Uruguay",
    fiscalIdLabel: "RUT",
    fiscalIdRegex: "^\\d{12}$",
    defaultCurrency: "UYU",
    timezoneDefault: "America/Montevideo",
    phonePrefix: "+598",
    billingAdapter: "internal_pdf",
    dataProtectionLaw: "Ley 18.331",
  },
  {
    countryCode: "MX",
    nombre: "México",
    fiscalIdLabel: "RFC",
    fiscalIdRegex: "^[A-ZÑ&]{3,4}\\d{6}[A-Z0-9]{3}$",
    defaultCurrency: "MXN",
    timezoneDefault: "America/Mexico_City",
    phonePrefix: "+52",
    billingAdapter: "internal_pdf",
    dataProtectionLaw: "LFPDPPP",
  },
  {
    countryCode: "CO",
    nombre: "Colombia",
    fiscalIdLabel: "NIT",
    fiscalIdRegex: "^\\d{9}-\\d{1}$",
    defaultCurrency: "COP",
    timezoneDefault: "America/Bogota",
    phonePrefix: "+57",
    billingAdapter: "internal_pdf",
    dataProtectionLaw: "Ley 1581",
  },
  {
    countryCode: "PE",
    nombre: "Perú",
    fiscalIdLabel: "RUC",
    fiscalIdRegex: "^\\d{11}$",
    defaultCurrency: "PEN",
    timezoneDefault: "America/Lima",
    phonePrefix: "+51",
    billingAdapter: "internal_pdf",
    dataProtectionLaw: "Ley 29733",
  },
];

async function main() {
  for (const country of countries) {
    await prisma.countryConfig.upsert({
      where: { countryCode: country.countryCode },
      create: country,
      update: country,
    });
  }
  console.log(`Seed OK: ${countries.length} países cargados en country_config`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
