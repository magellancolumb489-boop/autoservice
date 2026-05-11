import type { PriceCalculation, VehicleClass } from "./types"
import { SERVICES } from "./services-data"

export const FIXED_PRICES: Record<string, number> = {
  diagnoza: 150,
  freon_r134a: 140,
  freon_1234yf: 595,
  uv_solution: 35,
  recycle_r134a: 119,
  recycle_1234yf: 238,
  ac_wash_front: 698,
  ac_wash_full: 1189,
  furtun_1m: 297,
}

export const PRICE_RANGES: Record<string, { min: number; max: number }> = {
  compresor_ac: { min: 238, max: 420 },
}

export const LABOR_RANGES: Record<VehicleClass, { min: number; max: number }> = {
  compact: { min: 150, max: 200 },
  medium: { min: 200, max: 250 },
  suv: { min: 250, max: 250 },
}

export const VEHICLE_CLASS_LABELS: Record<VehicleClass, string> = {
  compact: "Clasa compactă/mică",
  medium: "Clasa medie/premium",
  suv: "SUV/4x4",
}

/** Returns a flat lookup of every sub-service id → its sub-service object. */
export function buildSubServiceIndex() {
  const idx: Record<string, { parent: string; sub: (typeof SERVICES)[number]["subServices"][number] }> = {}
  for (const svc of SERVICES) {
    for (const sub of svc.subServices) {
      idx[sub.id] = { parent: svc.id, sub }
    }
  }
  return idx
}

export function calculateTotal(selectedIds: string[], vehicleClass: VehicleClass): PriceCalculation {
  const idx = buildSubServiceIndex()
  let min = 0
  let max = 0
  let hasOnRequest = false
  let hasClassBased = false

  for (const id of selectedIds) {
    const entry = idx[id]
    if (!entry) continue
    const sub = entry.sub

    if (sub.classBased) {
      hasClassBased = true
      const range = LABOR_RANGES[vehicleClass]
      min += range.min
      max += range.max
      continue
    }
    if (sub.priceRange) {
      min += sub.priceRange.min
      max += sub.priceRange.max
      continue
    }
    if (typeof sub.price === "number") {
      min += sub.price
      max += sub.price
      continue
    }
    // price is null/undefined → on request
    hasOnRequest = true
  }

  return { min, max, hasOnRequest, hasClassBased }
}

export function formatRON(n: number): string {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " RON"
}

export function formatRange(min: number, max: number): string {
  if (min === max) return formatRON(min)
  return `${new Intl.NumberFormat("ro-RO").format(min)}–${new Intl.NumberFormat("ro-RO").format(max)} RON`
}
