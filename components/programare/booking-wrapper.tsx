"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { BookingStep1 } from "./booking-step1"
import { BookingStep2 } from "./booking-step2"
import { BookingStep3 } from "./booking-step3"
import { BookingConfirmation } from "./booking-confirmation"

export interface BookingState {
  // Step 1
  brand: string
  model: string
  year: string
  plate: string
  mileage: string
  // Step 2
  services: string[]
  problemDescription: string
  // Step 3
  fullName: string
  phone: string
  email: string
  preferredDate: string
  timeSlot: string
  notes: string
  gdpr: boolean
}

const initialState: BookingState = {
  brand: "",
  model: "",
  year: "",
  plate: "",
  mileage: "",
  services: [],
  problemDescription: "",
  fullName: "",
  phone: "",
  email: "",
  preferredDate: "",
  timeSlot: "",
  notes: "",
  gdpr: false,
}

const STEP_LABELS = ["Vehicul", "Servicii", "Contact"]

export function BookingWrapper() {
  const params = useSearchParams()
  const [step, setStep] = useState(1)
  const [confirmed, setConfirmed] = useState(false)
  const [state, setState] = useState<BookingState>(() => ({
    ...initialState,
    brand: params.get("marca") ?? "",
    model: params.get("model") ?? "",
    year: params.get("an") ?? "",
    mileage: params.get("km") ?? "",
    services: params.get("servicii")?.split(",").filter(Boolean) ?? [],
  }))

  function update<K extends keyof BookingState>(key: K, value: BookingState[K]) {
    setState((s) => ({ ...s, [key]: value }))
  }

  function submit() {
    console.log("[v0] Booking submitted:", state)
    setConfirmed(true)
  }

  if (confirmed) {
    return <BookingConfirmation state={state} />
  }

  const progress = (step / 3) * 100

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            Pasul {step} din 3 · <span className="text-primary">{STEP_LABELS[step - 1]}</span>
          </span>
          <span className="text-muted-foreground tabular-nums">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="mt-3 flex justify-between text-xs">
          {STEP_LABELS.map((label, i) => (
            <span
              key={label}
              className={
                i + 1 === step
                  ? "font-semibold text-primary"
                  : i + 1 < step
                    ? "text-foreground"
                    : "text-muted-foreground"
              }
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
        {step === 1 && <BookingStep1 state={state} update={update} onNext={() => setStep(2)} />}
        {step === 2 && (
          <BookingStep2 state={state} update={update} onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}
        {step === 3 && (
          <BookingStep3 state={state} update={update} onBack={() => setStep(2)} onSubmit={submit} />
        )}
      </div>
    </div>
  )
}
