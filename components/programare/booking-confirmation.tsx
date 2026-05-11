import Link from "next/link"
import { CheckCircle2, Clock, Home, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { COMPANY } from "@/lib/company-data"
import { buildSubServiceIndex } from "@/lib/pricing-logic"
import type { BookingState } from "./booking-wrapper"

export function BookingConfirmation({ state }: { state: BookingState }) {
  const idx = buildSubServiceIndex()
  const serviceNames = state.services
    .map((id) => idx[id]?.sub.name)
    .filter(Boolean) as string[]

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-10">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Programare înregistrată!
        </h2>
        <p className="mt-2 max-w-lg text-pretty text-muted-foreground">
          Mulțumim, <span className="font-semibold text-foreground">{state.fullName}</span>. Vă vom contacta la{" "}
          <span className="font-semibold text-foreground">{state.phone}</span> în maxim{" "}
          <span className="font-semibold text-primary">2 ore</span> pentru confirmare.
        </p>
      </div>

      <Separator className="my-8" />

      <div className="grid gap-6 md:grid-cols-2">
        <SummaryBlock title="Vehicul">
          <Row label="Marcă & model" value={`${state.brand} ${state.model}`} />
          <Row label="An fabricație" value={state.year} />
          {state.plate && <Row label="Înmatriculare" value={state.plate} />}
          {state.mileage && <Row label="Kilometraj" value={state.mileage} />}
        </SummaryBlock>

        <SummaryBlock title="Programare">
          <Row label="Data" value={formatDate(state.preferredDate)} />
          <Row label="Interval" value={state.timeSlot} />
          <Row label="Email" value={state.email} />
        </SummaryBlock>

        {(serviceNames.length > 0 || state.problemDescription) && (
          <div className="md:col-span-2">
            <SummaryBlock title="Servicii solicitate">
              {serviceNames.length > 0 && (
                <ul className="grid gap-1 text-sm sm:grid-cols-2">
                  {serviceNames.map((n) => (
                    <li key={n} className="flex items-start gap-1.5">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                      {n}
                    </li>
                  ))}
                </ul>
              )}
              {state.problemDescription && (
                <p className="mt-2 rounded-md bg-secondary p-3 text-sm italic text-foreground">
                  &ldquo;{state.problemDescription}&rdquo;
                </p>
              )}
            </SummaryBlock>
          </div>
        )}
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col items-center gap-3 text-sm md:flex-row md:justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4 text-accent" aria-hidden />
          {COMPANY.schedule.weekdays} · {COMPANY.schedule.hours}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href={COMPANY.phones.primaryHref}>
              <Phone className="mr-1.5 h-4 w-4" aria-hidden />
              {COMPANY.phones.primary}
            </a>
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-1.5 h-4 w-4" aria-hidden />
              Acasă
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function SummaryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}

function formatDate(d: string) {
  if (!d) return ""
  return new Date(d + "T12:00:00").toLocaleDateString("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
