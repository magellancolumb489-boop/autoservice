"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { BrandAutocomplete } from "@/components/calculator/brand-autocomplete"
import type { BookingState } from "./booking-wrapper"

const YEARS = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => 2025 - i)
const MILEAGES = ["< 50.000 km", "50.000–100.000 km", "100.000–150.000 km", "150.000–200.000 km", "> 200.000 km"]

interface Props {
  state: BookingState
  update: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void
  onNext: () => void
}

export function BookingStep1({ state, update, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!state.brand.trim()) e.brand = "Selectează marca"
    if (!state.model.trim()) e.model = "Introdu modelul"
    if (!state.year) e.year = "Selectează anul"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (validate()) onNext()
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Datele vehiculului</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Spune-ne ce mașină ai. Datele sunt pre-populate dacă vii din calculator.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="b-brand">
            Marcă <span className="text-primary">*</span>
          </Label>
          <BrandAutocomplete
            id="b-brand"
            value={state.brand}
            onChange={(v) => update("brand", v)}
            error={errors.brand}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="b-model">
            Model <span className="text-primary">*</span>
          </Label>
          <input
            id="b-model"
            value={state.model}
            onChange={(e) => update("model", e.target.value)}
            placeholder='ex: "Octavia 3", "X3"'
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 data-[invalid=true]:border-destructive"
            data-invalid={!!errors.model}
          />
          {errors.model && <p className="text-xs text-destructive">{errors.model}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="b-year">
            An fabricație <span className="text-primary">*</span>
          </Label>
          <select
            id="b-year"
            value={state.year}
            onChange={(e) => update("year", e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 data-[invalid=true]:border-destructive"
            data-invalid={!!errors.year}
          >
            <option value="">Selectează anul</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {errors.year && <p className="text-xs text-destructive">{errors.year}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="b-plate">Număr înmatriculare (opțional)</Label>
          <input
            id="b-plate"
            value={state.plate}
            onChange={(e) => update("plate", e.target.value.toUpperCase())}
            placeholder="B 123 ABC"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm uppercase outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="b-mileage">Kilometraj actual</Label>
          <select
            id="b-mileage"
            value={state.mileage}
            onChange={(e) => update("mileage", e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Selectează intervalul</option>
            {MILEAGES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={next} className="font-semibold">
          Continuă <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
