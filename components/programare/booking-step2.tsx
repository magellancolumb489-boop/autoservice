"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SERVICES } from "@/lib/services-data"
import { cn } from "@/lib/utils"
import type { BookingState } from "./booking-wrapper"

interface Props {
  state: BookingState
  update: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void
  onBack: () => void
  onNext: () => void
}

export function BookingStep2({ state, update, onBack, onNext }: Props) {
  function toggle(id: string) {
    const next = state.services.includes(id) ? state.services.filter((s) => s !== id) : [...state.services, id]
    update("services", next)
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Servicii solicitate</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Bifează lucrările dorite sau descrie problema în câmpul liber.
        </p>
      </header>

      <div className="space-y-6">
        {SERVICES.map((svc) => (
          <div key={svc.id}>
            <h3 className="mb-2 font-display text-lg font-bold tracking-tight">{svc.title}</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {svc.subServices.map((sub) => {
                const checked = state.services.includes(sub.id)
                return (
                  <li key={sub.id}>
                    <label
                      className={cn(
                        "flex cursor-pointer items-start gap-2 rounded-md border bg-card p-2.5 text-sm transition-all",
                        checked ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30",
                      )}
                    >
                      <Checkbox checked={checked} onCheckedChange={() => toggle(sub.id)} className="mt-0.5" />
                      <span className="text-foreground">{sub.name}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="b-problem">Descrieți problema sau serviciul dorit</Label>
        <textarea
          id="b-problem"
          value={state.problemDescription}
          onChange={(e) => update("problemDescription", e.target.value)}
          rows={4}
          placeholder="ex: Mașina face zgomot la frânare, vreau și o diagnoză completă..."
          className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"
        />
        <p className="text-xs text-muted-foreground">
          {state.services.length} serviciu(i) selectat(e)
        </p>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden />
          Înapoi
        </Button>
        <Button size="lg" onClick={onNext} className="font-semibold">
          Continuă <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
