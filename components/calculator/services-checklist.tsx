"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { SERVICES } from "@/lib/services-data"
import { formatRON, LABOR_RANGES, VEHICLE_CLASS_LABELS } from "@/lib/pricing-logic"
import type { VehicleClass } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ServicesChecklistProps {
  selected: string[]
  onToggle: (id: string) => void
  vehicleClass: VehicleClass
}

export function ServicesChecklist({ selected, onToggle, vehicleClass }: ServicesChecklistProps) {
  return (
    <div className="space-y-8">
      {SERVICES.map((svc) => (
        <section key={svc.id}>
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">{svc.title}</h3>
            {svc.id === "revizii" && (
              <span className="text-xs font-medium text-muted-foreground">
                Manoperă pentru {VEHICLE_CLASS_LABELS[vehicleClass]}:{" "}
                <span className="text-foreground">
                  {formatRON(LABOR_RANGES[vehicleClass].min)}
                  {LABOR_RANGES[vehicleClass].min !== LABOR_RANGES[vehicleClass].max &&
                    `–${formatRON(LABOR_RANGES[vehicleClass].max)}`}
                </span>
              </span>
            )}
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {svc.subServices.map((sub) => {
              const checked = selected.includes(sub.id)
              const priceLabel = sub.classBased
                ? null
                : sub.priceRange
                  ? `${sub.priceRange.min}–${sub.priceRange.max} RON`
                  : typeof sub.price === "number"
                    ? `${sub.price} RON`
                    : "la cerere"

              return (
                <li key={sub.id}>
                  <label
                    className={cn(
                      "group flex cursor-pointer items-start gap-3 rounded-md border bg-card p-3 transition-all",
                      checked
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-foreground/30",
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => onToggle(sub.id)}
                      className="mt-0.5"
                      aria-label={sub.name}
                    />
                    <div className="flex flex-1 items-start justify-between gap-2">
                      <span className="text-sm font-medium text-foreground">{sub.name}</span>
                      {priceLabel && (
                        <span
                          className={cn(
                            "shrink-0 rounded px-2 py-0.5 text-xs font-semibold tabular-nums",
                            priceLabel === "la cerere"
                              ? "bg-muted text-muted-foreground"
                              : "bg-accent/10 text-accent",
                          )}
                        >
                          {priceLabel}
                        </span>
                      )}
                      {sub.classBased && (
                        <span className="shrink-0 rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          manoperă
                        </span>
                      )}
                    </div>
                  </label>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
