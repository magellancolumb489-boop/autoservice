import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Award, Building2, ShieldCheck, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { COMPANY } from "@/lib/company-data"

export const metadata: Metadata = {
  title: "Despre Noi — Lorem Ipsum Service",
  description:
    "Service auto certificat RAR în București, activ din 1992. Mecanici cu experiență, echipamente de ultimă generație și garanție extinsă.",
}

const VALUES = [
  {
    icon: Award,
    title: "Tradiție din 1992",
    text: "Peste trei decenii de experiență cumulată, sute de modele deservite, mii de clienți fideli.",
    tone: "primary" as const,
  },
  {
    icon: Wrench,
    title: "Mecanici cu experiență",
    text: "Echipă specializată pe grupuri de producători: VW/Audi, BMW, Fiat/Jeep, diagnoză universală OBD.",
    tone: "accent" as const,
  },
  {
    icon: ShieldCheck,
    title: "Garanție asumată",
    text: "Manoperă 3 luni, piese 18 luni (PF) sau 12 luni (PJ). Transparență totală în devize.",
    tone: "primary" as const,
  },
  {
    icon: Building2,
    title: "Certificat RAR · ISO 9001",
    text: "Operațiuni conforme cu cerințele Registrului Auto Român și standardele internaționale de calitate.",
    tone: "accent" as const,
  },
]

export default function DespreNoiPage() {
  const years = new Date().getFullYear() - COMPANY.foundedYear

  return (
    <div className="bg-background">
      <header className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Despre noi</div>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl text-balance">
            {years} de ani, o singură pasiune: mașinile tale.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg leading-relaxed">
            Suntem un service auto independent din București, înființat în {COMPANY.foundedYear}. Lucrăm cu toate
            mărcile, oferim diagnoză specializată și ne asumăm fiecare lucrare cu garanție extinsă.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUES.map((v) => (
            <article key={v.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <span
                className={
                  "flex h-11 w-11 items-center justify-center rounded-lg " +
                  (v.tone === "primary"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground")
                }
              >
                <v.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold tracking-tight">{v.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-balance">
            Filozofia noastră
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Credem că un service auto bun se construiește pe trei piloni: <strong className="text-foreground">competență
              tehnică</strong>, <strong className="text-foreground">transparență</strong> și{" "}
              <strong className="text-foreground">respect</strong> pentru timpul clientului.
            </p>
            <p>
              Investim constant în echipamente specializate — scanere VCDS, stații A/C R134a și 1234YF, sudură argon TIG
              — pentru a putea executa în-house lucrări pe care alte service-uri le trimit la sub-furnizori.
            </p>
            <p>
              Înainte de orice intervenție majoră, primești un deviz detaliat. Confirmi, iar noi executăm exact ce s-a
              agreat. Fără surprize, fără adăugiri ulterioare.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card p-8 shadow-sm md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-balance">
              Vino să ne cunoști.
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Programează-te pentru o evaluare gratuită sau folosește calculatorul nostru estimativ.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/programare">
                Programează-te
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
