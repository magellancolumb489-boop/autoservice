"use client"

import { useState } from "react"
import { ArrowLeft, CalendarCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { BookingState } from "./booking-wrapper"

const TIME_SLOTS = ["09:00–11:00", "11:00–13:00", "13:00–15:30", "15:30–17:30"]

interface Props {
  state: BookingState
  update: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void
  onBack: () => void
  onSubmit: () => void
}

const ROMANIAN_PHONE = /^07\d{2}\s?\d{3}\s?\d{3}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isWeekend(dateStr: string) {
  if (!dateStr) return false
  const d = new Date(dateStr + "T12:00:00")
  const day = d.getDay()
  return day === 0 || day === 6
}

const today = new Date().toISOString().split("T")[0]

export function BookingStep3({ state, update, onBack, onSubmit }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!state.fullName.trim() || state.fullName.trim().length < 3) e.fullName = "Introdu numele complet"
    if (!ROMANIAN_PHONE.test(state.phone.replace(/\s/g, ""))) e.phone = "Format invalid (ex: 0712 345 678)"
    if (!EMAIL.test(state.email)) e.email = "Email invalid"
    if (!state.preferredDate) e.preferredDate = "Selectează o dată"
    else if (state.preferredDate < today) e.preferredDate = "Data trebuie să fie în viitor"
    else if (isWeekend(state.preferredDate)) e.preferredDate = "Programările se fac doar Luni–Vineri"
    if (!state.timeSlot) e.timeSlot = "Alege un interval orar"
    if (!state.gdpr) e.gdpr = "Acceptă prelucrarea datelor pentru a continua"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function submit() {
    if (validate()) onSubmit()
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Date contact și programare</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Te contactăm în maxim 2 ore pentru confirmarea programării.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="b-name">
            Nume complet <span className="text-primary">*</span>
          </Label>
          <input
            id="b-name"
            value={state.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 data-[invalid=true]:border-destructive"
            data-invalid={!!errors.fullName}
          />
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="b-phone">
            Telefon <span className="text-primary">*</span>
          </Label>
          <input
            id="b-phone"
            value={state.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="0712 345 678"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 data-[invalid=true]:border-destructive"
            data-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="b-email">
            Email <span className="text-primary">*</span>
          </Label>
          <input
            id="b-email"
            type="email"
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="nume@exemplu.ro"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 data-[invalid=true]:border-destructive"
            data-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="b-date">
            Data dorită <span className="text-primary">*</span>
          </Label>
          <input
            id="b-date"
            type="date"
            min={today}
            value={state.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 data-[invalid=true]:border-destructive"
            data-invalid={!!errors.preferredDate}
          />
          {errors.preferredDate && <p className="text-xs text-destructive">{errors.preferredDate}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>
            Interval orar <span className="text-primary">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => update("timeSlot", slot)}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm font-medium transition-all",
                  state.timeSlot === slot
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-foreground/30",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.timeSlot && <p className="text-xs text-destructive">{errors.timeSlot}</p>}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="b-notes">Mențiuni suplimentare (opțional)</Label>
          <textarea
            id="b-notes"
            rows={3}
            value={state.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Orice detalii utile..."
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-2 rounded-md bg-secondary p-3 text-sm">
        <Checkbox
          checked={state.gdpr}
          onCheckedChange={(v) => update("gdpr", Boolean(v))}
          className="mt-0.5"
          aria-invalid={!!errors.gdpr}
        />
        <span className="text-foreground">
          Sunt de acord cu prelucrarea datelor personale conform politicii de confidențialitate.
        </span>
      </label>
      {errors.gdpr && <p className="-mt-3 text-xs text-destructive">{errors.gdpr}</p>}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden />
          Înapoi
        </Button>
        <Button size="lg" onClick={submit} className="font-semibold">
          <CalendarCheck className="mr-1.5 h-4 w-4" aria-hidden />
          Confirmă programarea
        </Button>
      </div>
    </div>
  )
}
