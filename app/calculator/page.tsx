import type { Metadata } from "next"
import { Calculator } from "lucide-react"
import { CalculatorWrapper } from "@/components/calculator/calculator-wrapper"

export const metadata: Metadata = {
  title: "Calculator Estimativ — Lorem Ipsum Service",
  description:
    "Calculează un cost estimativ pentru manoperă și servicii auto. Selectează vehiculul și serviciile dorite, primește o estimare instant.",
}

interface PageProps {
  searchParams: Promise<{ servicii?: string }>
}

export default async function CalculatorPage({ searchParams }: PageProps) {
  const params = await searchParams
  const initialServices = params.servicii ? params.servicii.split(",").filter(Boolean) : []

  return (
    <div className="bg-background">
      <header className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Calculator className="h-3.5 w-3.5" aria-hidden />
            Calculator estimativ
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Estimează costul lucrării
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg leading-relaxed">
            Completează detaliile vehiculului tău și bifează serviciile dorite. Calculatorul afișează în timp real un
            cost orientativ, iar confirmarea exactă se face la service.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <CalculatorWrapper initialServices={initialServices} />
      </div>
    </div>
  )
}
