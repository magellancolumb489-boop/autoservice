export type VehicleClass = "compact" | "medium" | "suv"

export type FuelType = "Benzină" | "Diesel" | "Hibrid" | "Electric" | "GPL"

export interface SubService {
  id: string
  name: string
  /** Fixed price in RON, or null for "la cerere" */
  price?: number | null
  /** Optional price range, e.g. compresor A/C 238–420 RON */
  priceRange?: { min: number; max: number } | null
  /** If true, price depends on vehicle class (uses LABOR_RANGES) */
  classBased?: boolean
  description?: string
}

export interface PriceEntry {
  label: string
  value: string
}

export interface ServiceData {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  icon: string
  badge: string | null
  subServices: SubService[]
  prices: PriceEntry[] | null
  warranty: string | null
}

export interface VehicleDetails {
  brand: string
  model: string
  year: string
  engineSize: string
  engineSizeUnknown: boolean
  fuel: FuelType | ""
  tireSize: string
  tireSizeUnknown: boolean
  mileage: string
  mileageUnknown: boolean
  lastServiceYear: string
  lastServiceUnknown: boolean
}

export interface PriceCalculation {
  min: number
  max: number
  hasOnRequest: boolean
  hasClassBased: boolean
}
