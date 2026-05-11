import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServicesGrid } from "@/components/servicii/services-grid"

export const metadata: Metadata = {
  title: "Servicii Auto — Revizii, A/C, Diagnoză, Eșapament | Lorem Ipsum Service",
  description:
    "Toate serviciile noastre auto: revizii, aer condiționat, diagnoză computerizată, eșapament, sudură argon, consultanță off-road. Cu garanție.",
}

export default function ServiciiPage() {
  return (
    <div className="bg-background">
      <header className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Wrench className="h-3.5 w-3.5" aria-hidden />
            Servicii complete
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Tot ce poate avea nevoie mașina ta
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg leading-relaxed">
            6 categorii principale de servicii, executate cu echipamente de ultimă generație și acoperite de garanție
            extinsă pe manoperă și piese.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <ServicesGrid />
      </section>

      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Nu ești sigur de ce ai nevoie?
            </h2>
            <p className="mt-1.5 text-background/70">
              Folosește calculatorul nostru estimativ sau programează-te pentru o evaluare gratuită.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/calculator">
                Calculator estimativ
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
            >
              <Link href="/programare">Programează-te</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
