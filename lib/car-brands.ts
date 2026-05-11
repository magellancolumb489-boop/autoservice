import type { VehicleClass } from "./types"

export const CAR_BRANDS = [
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "BMW",
  "Bentley",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Dacia",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Maserati",
  "Mazda",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Seat",
  "Skoda",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
] as const

export type CarBrand = (typeof CAR_BRANDS)[number]

export const COMPACT_BRANDS = ["Dacia", "Smart", "Fiat", "Citroën", "Renault", "Opel", "Seat", "Skoda"]
export const SUV_BRANDS = ["Land Rover", "Jeep", "Mitsubishi", "Subaru"]

const SUV_MODEL_KEYWORDS = [
  "x3",
  "x5",
  "x6",
  "x7",
  "q3",
  "q5",
  "q7",
  "q8",
  "rav4",
  "cr-v",
  "crv",
  "hr-v",
  "hrv",
  "tiguan",
  "touareg",
  "duster",
  "tucson",
  "sportage",
  "kadjar",
  "3008",
  "5008",
  "discovery",
  "range rover",
  "wrangler",
  "compass",
  "renegade",
  "outlander",
  "x-trail",
  "qashqai",
  "captur",
  "santa fe",
  "kona",
  "macan",
  "cayenne",
  "gle",
  "glc",
  "gla",
  "glb",
  "gls",
]

export function detectVehicleClass(brand: string, model: string): VehicleClass {
  const m = model.toLowerCase().trim()
  if (m && SUV_MODEL_KEYWORDS.some((kw) => m.includes(kw))) return "suv"
  if (SUV_BRANDS.includes(brand)) return "suv"
  if (COMPACT_BRANDS.includes(brand)) return "compact"
  return "medium"
}

/** Fuzzy filter brand list by user input. Prioritizes prefix matches. */
export function filterBrands(query: string): readonly string[] {
  const q = query.toLowerCase().trim()
  if (!q) return CAR_BRANDS
  const prefix: string[] = []
  const contains: string[] = []
  for (const brand of CAR_BRANDS) {
    const b = brand.toLowerCase()
    if (b.startsWith(q)) prefix.push(brand)
    else if (b.includes(q)) contains.push(brand)
  }
  return [...prefix, ...contains]
}
