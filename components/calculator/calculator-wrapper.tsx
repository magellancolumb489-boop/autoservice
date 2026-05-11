"use client"

import { useMemo, useState } from "react"
import { VehicleForm } from "./vehicle-form"
import { ServicesChecklist } from "./services-checklist"
import { PriceSummary } from "./price-summary"
import { detectVehicleClass } from "@/lib/car-brands"
import type { VehicleDetails } from "@/lib/types"

const INITIAL_VEHICLE: VehicleDetails = {
  brand: "",
  model: "",
  year: "",
  engineSize: "",
  engineSizeUnknown: false,
  fuel: "",
  tireSize: "",
  tireSizeUnknown: false,
  mileage: "",
  mileageUnknown: false,
  lastServiceYear: "",
  lastServiceUnknown: false,
}

interface CalculatorWrapperProps {
  initialServices?: string[]
}

export function CalculatorWrapper({ initialServices = [] }: CalculatorWrapperProps) {
  const [vehicle, setVehicle] = useState<VehicleDetails>(INITIAL_VEHICLE)
  const [selected, setSelected] = useState<string[]>(initialServices)

  const vehicleClass = useMemo(
    () => detectVehicleClass(vehicle.brand, vehicle.model),
    [vehicle.brand, vehicle.model],
  )

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-10">
        <section>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-display text-sm font-bold text-background">
              1
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight">Detalii vehicul</h2>
          </div>
          <VehicleForm vehicle={vehicle} setVehicle={setVehicle} />
        </section>

        <section>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-display text-sm font-bold text-background">
              2
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight">Selectează serviciile</h2>
          </div>
          <ServicesChecklist selected={selected} onToggle={toggle} vehicleClass={vehicleClass} />
        </section>
      </div>

      <PriceSummary vehicle={vehicle} vehicleClass={vehicleClass} selected={selected} />
    </div>
  )
}
