"use client"

import { Info } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { BrandAutocomplete } from "./brand-autocomplete"
import type { VehicleDetails } from "@/lib/types"
import { cn } from "@/lib/utils"

interface VehicleFormProps {
  vehicle: VehicleDetails
  setVehicle: (v: VehicleDetails) => void
}

const YEARS = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => 2025 - i)
const ENGINE_SIZES = ["1.0L", "1.2L", "1.4L", "1.5L", "1.6L", "1.8L", "2.0L", "2.5L", "3.0L", "3.5L", "4.0L+"]
const FUELS = ["Benzină", "Diesel", "Hibrid", "Electric", "GPL"]
const MILEAGES = ["< 50.000 km", "50.000–100.000 km", "100.000–150.000 km", "150.000–200.000 km", "> 200.000 km"]

export function VehicleForm({ vehicle, setVehicle }: VehicleFormProps) {
  function update<K extends keyof VehicleDetails>(key: K, value: VehicleDetails[K]) {
    setVehicle({ ...vehicle, [key]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Marcă auto" required htmlFor="brand">
          <BrandAutocomplete id="brand" value={vehicle.brand} onChange={(v) => update("brand", v)} />
        </Field>

        <Field label="Model" required htmlFor="model">
          <input
            id="model"
            type="text"
            value={vehicle.model}
            onChange={(e) => update("model", e.target.value)}
            placeholder='ex: "Golf 7", "Duster", "Seria 3"'
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </Field>

        <Field label="An fabricație" required htmlFor="year">
          <select
            id="year"
            value={vehicle.year}
            onChange={(e) => update("year", e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Selectează anul</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Tip combustibil" required htmlFor="fuel">
          <select
            id="fuel"
            value={vehicle.fuel}
            onChange={(e) => update("fuel", e.target.value as VehicleDetails["fuel"])}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Selectează combustibilul</option>
            {FUELS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </Field>

        <FieldWithUnknown
          label="Capacitate motor"
          htmlFor="engine"
          unknown={vehicle.engineSizeUnknown}
          onToggleUnknown={(v) => update("engineSizeUnknown", v)}
          hint="Găsești capacitatea în cartea tehnică sau pe talonul de asigurare."
        >
          <select
            id="engine"
            disabled={vehicle.engineSizeUnknown}
            value={vehicle.engineSize}
            onChange={(e) => update("engineSize", e.target.value)}
            className={cn(
              "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40",
              vehicle.engineSizeUnknown && "opacity-50",
            )}
          >
            <option value="">Selectează capacitatea</option>
            {ENGINE_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FieldWithUnknown>

        <FieldWithUnknown
          label="Dimensiuni roți"
          htmlFor="tires"
          unknown={vehicle.tireSizeUnknown}
          onToggleUnknown={(v) => update("tireSizeUnknown", v)}
          hint="Format: lățime/profil R diametru (ex: 205/55 R16). Le găsești pe flancul anvelopei."
        >
          <input
            id="tires"
            type="text"
            disabled={vehicle.tireSizeUnknown}
            value={vehicle.tireSize}
            onChange={(e) => update("tireSize", e.target.value)}
            placeholder="ex: 205/55 R16"
            className={cn(
              "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40",
              vehicle.tireSizeUnknown && "opacity-50",
            )}
          />
        </FieldWithUnknown>

        <FieldWithUnknown
          label="Kilometraj"
          htmlFor="mileage"
          unknown={vehicle.mileageUnknown}
          onToggleUnknown={(v) => update("mileageUnknown", v)}
          hint="Aproximativ — ne ajută să recomandăm reviziile potrivite."
        >
          <select
            id="mileage"
            disabled={vehicle.mileageUnknown}
            value={vehicle.mileage}
            onChange={(e) => update("mileage", e.target.value)}
            className={cn(
              "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40",
              vehicle.mileageUnknown && "opacity-50",
            )}
          >
            <option value="">Selectează intervalul</option>
            {MILEAGES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </FieldWithUnknown>

        <FieldWithUnknown
          label="An ultima revizie"
          htmlFor="lastService"
          unknown={vehicle.lastServiceUnknown}
          onToggleUnknown={(v) => update("lastServiceUnknown", v)}
          hint="Prima revizie la noi — nicio problemă, ne ocupăm complet."
        >
          <select
            id="lastService"
            disabled={vehicle.lastServiceUnknown}
            value={vehicle.lastServiceYear}
            onChange={(e) => update("lastServiceYear", e.target.value)}
            className={cn(
              "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40",
              vehicle.lastServiceUnknown && "opacity-50",
            )}
          >
            <option value="">Selectează anul</option>
            {YEARS.slice(0, 10).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </FieldWithUnknown>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
  required,
  htmlFor,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
  htmlFor?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </Label>
      {children}
    </div>
  )
}

function FieldWithUnknown({
  label,
  htmlFor,
  unknown,
  onToggleUnknown,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  unknown: boolean
  onToggleUnknown: (v: boolean) => void
  hint: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
          <Checkbox
            checked={unknown}
            onCheckedChange={(v) => onToggleUnknown(Boolean(v))}
            className="h-3.5 w-3.5"
          />
          Nu știu exact
        </label>
      </div>
      {children}
      {unknown && (
        <p className="flex items-start gap-1.5 text-xs italic text-muted-foreground">
          <Info className="mt-0.5 h-3 w-3 shrink-0 text-accent" aria-hidden />
          {hint}
        </p>
      )}
    </div>
  )
}
