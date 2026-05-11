import type { ServiceData } from "./types"

export const SERVICES: ServiceData[] = [
  {
    id: "revizii",
    slug: "revizii-mentenanta",
    title: "Revizii și Mentenanță",
    shortDescription:
      "Servicii complete de mentenanță și revizii pentru toate brandurile auto, executate de mecanici cu experiență.",
    fullDescription:
      "Echipa noastră asigură servicii complete de mentenanță și revizii pentru toate brandurile, cu echipamente de ultimă generație și piese cu garanție extinsă.",
    icon: "Wrench",
    badge: "De la 150 RON + TVA",
    subServices: [
      { id: "ulei_filtre", name: "Schimb ulei + filtre", classBased: true },
      { id: "frane", name: "Discuri și plăcuțe frână", classBased: true },
      { id: "suspensie", name: "Suspensie și articulație", classBased: true },
      { id: "distributie", name: "Distribuție", classBased: true },
      { id: "ambreiaj", name: "Ambreiaj", classBased: true },
      { id: "electromotor", name: "Electromotoare / alternatoare", classBased: true },
      { id: "admisie", name: "Curățare admisie (diesel)", classBased: true },
      { id: "turbo", name: "Turbosuflantă", classBased: true },
      { id: "directie", name: "Casetă direcție", classBased: true },
      { id: "geometrie", name: "Geometrie roți", classBased: true },
      { id: "dpf", name: "Curățare DPF / filtru particule", classBased: true },
      { id: "injectoare", name: "Injectoare", classBased: true },
    ],
    prices: [
      { label: "Clasa compactă și mică", value: "150–200 RON + TVA" },
      { label: "Clasa medie și premium", value: "200–250 RON + TVA" },
      { label: "SUV și 4x4", value: "250 RON + TVA" },
    ],
    warranty: "Manoperă 3 luni · Piese 18 luni (PF) / 12 luni (PJ) / 6 luni (firme transport)",
  },
  {
    id: "aer-conditionat",
    slug: "aer-conditionat",
    title: "Aer Condiționat",
    shortDescription:
      "Reparații complexe și teste pentru sistemele A/C. Specialiști în compresoare, freon R134a și 1234YF.",
    fullDescription:
      "Oferim servicii complete pentru sistemele de climatizare: încărcare, recondiționare, retrofit, sudură argon pentru conducte și reparații compresor.",
    icon: "Snowflake",
    badge: "De la 35 RON",
    subServices: [
      { id: "freon_r134a", name: "Încărcare freon R134a", price: 140 },
      { id: "freon_1234yf", name: "Încărcare freon 1234YF", price: 595 },
      { id: "uv_solution", name: "Soluție UV pierderi", price: 35 },
      { id: "recycle_r134a", name: "Înlocuire/Reciclare R134a", price: 119 },
      { id: "recycle_1234yf", name: "Înlocuire/Reciclare 1234YF", price: 238 },
      { id: "ac_wash_front", name: "Spălare chimică A/C (față)", price: 698 },
      { id: "ac_wash_full", name: "Spălare chimică A/C (față+spate)", price: 1189 },
      { id: "furtun_1m", name: "Furtun refrigerant ≤ 1M", price: 297 },
      { id: "compresor_ac", name: "Demontat/Montat compresor", priceRange: { min: 238, max: 420 } },
      { id: "reparatii_compresor", name: "Reparații compresor A/C", price: null },
    ],
    prices: [
      { label: "Încărcare R134a", value: "140 RON" },
      { label: "Încărcare 1234YF", value: "595 RON" },
      { label: "Spălare chimică (față)", value: "698 RON" },
      { label: "Spălare chimică (față+spate)", value: "1.189 RON" },
    ],
    warranty: "Manoperă 3 luni · Piese 18 luni (PF) / 12 luni (PJ) / 6 luni (firme transport)",
  },
  {
    id: "diagnoza",
    slug: "diagnoza-reparatii-motor",
    title: "Diagnoză și Reparații Motor",
    shortDescription:
      "Diagnoză computerizată de cel mai înalt standard pentru toate mărcile auto, cu echipamente specializate per grup producător.",
    fullDescription:
      "Folosim VCDS pentru grupul VW/Audi/Skoda/Seat, scanere specializate pentru BMW/Mini și Fiat/Alfa Romeo/Jeep, plus diagnoză universală OBD.",
    icon: "ScanLine",
    badge: "150 RON",
    subServices: [
      { id: "diag_vcds", name: "Diagnoză VW / Audi / Skoda / Seat (VCDS)", price: 150 },
      { id: "diag_bmw", name: "Diagnoză BMW / Mini", price: 150 },
      { id: "diag_fiat", name: "Diagnoză Fiat / Alfa Romeo / Jeep", price: 150 },
      { id: "diag_obd", name: "Diagnoză universală OBD", price: 150 },
    ],
    prices: [{ label: "Diagnoză (toate brandurile)", value: "150 RON" }],
    warranty: null,
  },
  {
    id: "esapament",
    slug: "reparatii-esapament",
    title: "Reparații Eșapament",
    shortDescription:
      "Reparații tobe, înlocuire țevi, catalizatoare și sudură argon executate de personal calificat.",
    fullDescription:
      "Gamă largă de reparații și recondiționări pentru sisteme de eșapament: racorduri flexibile, tobe, țevi, garnituri, tampoane elastice și catalizatoare.",
    icon: "Cylinder",
    badge: "Preț la cerere",
    subServices: [
      { id: "esp_racord", name: "Înlocuire racorduri flexibile", price: null },
      { id: "esp_toba_rep", name: "Reparații tobe eșapament", price: null },
      { id: "esp_toba_inl", name: "Înlocuire tobe eșapament", price: null },
      { id: "esp_catalizator", name: "Catalizatoare (personalizate / universale)", price: null },
      { id: "esp_sudura", name: "Sudură argon eșapament", price: null },
    ],
    prices: null,
    warranty: "Manoperă 3 luni · Piese 18 luni (PF) / 12 luni (PJ)",
  },
  {
    id: "sudura",
    slug: "sudura-argon-co2",
    title: "Sudură Argon / CO2",
    shortDescription:
      "Suduri fontă, aluminiu, inox și aliaje speciale în mediu protector argon. Execuție de precizie.",
    fullDescription:
      "Personal calificat pentru sudură TIG/MIG în mediu protector argon (corgon, stargon) pentru materiale exotice și componente auto delicate.",
    icon: "Flame",
    badge: "Preț la cerere",
    subServices: [
      { id: "sudura_aluminiu", name: "Sudură aluminiu", price: null },
      { id: "sudura_inox", name: "Sudură inox", price: null },
      { id: "sudura_aliaje", name: "Sudură aliaje speciale (magneziu, titan)", price: null },
    ],
    prices: null,
    warranty: null,
  },
  {
    id: "off-road",
    slug: "consultanta-off-road",
    title: "Consultanță Off-Road",
    shortDescription:
      "Consultanță pentru modificările autoturismelor în overlanding și off-road. Peste 10 ani experiență.",
    fullDescription:
      "Evaluare pre-achiziție, planning build-uri overlanding, lift kit, off-road prep. Atenție: legislația RO nu permite modificări neomologate de producător — răspunderea legală revine 100% proprietarului.",
    icon: "Mountain",
    badge: "Preț la cerere",
    subServices: [
      { id: "off_consultanta_cumparare", name: "Consultanță cumpărare vehicul", price: null },
      { id: "off_consultanta_modificari", name: "Consultanță modificări (lift, overlanding)", price: null },
      { id: "off_implementare", name: "Implementare modificări", price: null },
    ],
    prices: null,
    warranty: null,
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
