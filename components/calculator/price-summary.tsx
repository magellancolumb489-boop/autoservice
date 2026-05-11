"use client"

import Link from "next/link"
import { ArrowRight, Calculator as CalculatorIcon, Check, ShieldCheck, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { buildSubServiceIndex, calculateTotal, formatRange, formatRON } from "@/lib/pricing-logic"
import type { VehicleClass, VehicleDetails } from "@/lib/types"

interface PriceSummaryProps {
  vehicle: VehicleDetails
  vehicleClass: VehicleClass
  selected: string[]
}

export function PriceSummary({ vehicle, vehicleClass, selected }: PriceSummaryProps) {
  const totals = calculateTotal(selected, vehicleClass)
  const idx = buildSubServiceIndex()

  const programareHref = buildProgramareHref(vehicle, selected)

  return (
    <aside className="rounded-xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-24">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <CalculatorIcon className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold leading-none tracking-tight">Estimare preliminară</h2>
          <p className="mt-1 text-xs text-muted-foreground">Live · se actualizează automat</p>
        </div>
      </div>

      {vehicle.brand || vehicle.model || vehicle.year ? (
        <div className="mb-4 rounded-md bg-secondary p-3 text-sm">
          <div className="font-semibold text-foreground">
            {[vehicle.brand, vehicle.model].filter(Boolean).join(" ") || "Vehicul nedeterminat"}
            {vehicle.year && <span className="text-muted-foreground"> · {vehicle.year}</span>}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {[
              !vehicle.engineSizeUnknown && vehicle.engineSize,
              vehicle.fuel,
              !vehicle.mileageUnknown && vehicle.mileage,
            ]
              .filter(Boolean)
              .join(" · ") || "Detalii incomplete"}
          </div>
        </div>
      ) : (
        <div className="mb-4 rounded-md border border-dashed border-border bg-background p-3 text-xs text-muted-foreground">
          Completează detaliile vehiculului pentru o estimare cât mai precisă.
        </div>
      )}

      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Servicii selectate ({selected.length})
      </div>

      {selected.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Niciun serviciu selectat. Bifează din listă pentru a calcula totalul.
        </p>
      ) : (
        <ul className="space-y-2">
          {selected.map((id) => {
            const entry = idx[id]
            if (!entry) return null
            const sub = entry.sub
            const priceLabel = sub.classBased
              ? "manoperă"
              : sub.priceRange
                ? `${sub.priceRange.min}–${sub.priceRange.max} RON`
                : typeof sub.price === "number"
                  ? formatRON(sub.price)
                  : "la cerere"
            return (
              <li key={id} className="flex items-start justify-between gap-2 text-sm">
                <span className="flex items-start gap-1.5 text-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                  <span>{sub.name}</span>
                </span>
                <span className="shrink-0 tabular-nums text-muted-foreground">{priceLabel}</span>
              </li>
            )
          })}
        </ul>
      )}

      <Separator className="my-4" />

      <div className="space-y-1">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Total estimativ</div>
        <div className="font-display text-3xl font-bold tracking-tight text-foreground">
          {totals.min === 0 && !totals.hasOnRequest
            ? "—"
            : totals.min === totals.max
              ? formatRON(totals.min)
              : formatRange(totals.min, totals.max)}
          <span className="ml-1 text-base font-medium text-muted-foreground">+ TVA</span>
        </div>
        {totals.hasOnRequest && (
          <p className="text-xs text-accent">+ servicii cu preț la cerere (confirmare la service)</p>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-md border border-primary/30 bg-primary/5 p-3 text-xs text-foreground">
        <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
        <p>
          Prețul final poate varia în funcție de complexitatea lucrării și piesele necesare. Confirmarea exactă se face
          la service.
        </p>
      </div>

      <Button asChild size="lg" className="mt-4 w-full font-semibold">
        <Link href={programareHref}>
          Continuă spre programare
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
        </Link>
      </Button>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden />
        Garanție manoperă 3 luni · piese 18 luni
      </div>
    </aside>
  )
}

function buildProgramareHref(v: VehicleDetails, selected: string[]) {
  const params = new URLSearchParams()
  if (v.brand) params.set("marca", v.brand)
  if (v.model) params.set("model", v.model)
  if (v.year) params.set("an", v.year)
  if (!v.mileageUnknown && v.mileage) params.set("km", v.mileage)
  if (selected.length) params.set("servicii", selected.join(","))
  const q = params.toString()
  return q ? `/programare?${q}` : "/programare"
}
