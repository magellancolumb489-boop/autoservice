import { Suspense } from "react"
import type { Metadata } from "next"
import { CalendarDays } from "lucide-react"
import { BookingWrapper } from "@/components/programare/booking-wrapper"

export const metadata: Metadata = {
  title: "Programare Online — Lorem Ipsum Service",
  description:
    "Programează-te online la service-ul nostru auto din București. Răspuns rapid în maxim 2 ore pentru confirmarea programării.",
}

export default function ProgramarePage() {
  return (
    <div className="bg-background">
      <header className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            Programare online
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Programează-te în 3 pași simpli
          </h1>
          <p className="mt-3 text-pretty text-base text-muted-foreground md:text-lg leading-relaxed">
            Completează detaliile vehiculului, alege serviciile și intervalul orar dorit. Echipa noastră te contactează
            pentru confirmare.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Suspense
          fallback={<div className="rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">Se încarcă...</div>}
        >
          <BookingWrapper />
        </Suspense>
      </div>
    </div>
  )
}
