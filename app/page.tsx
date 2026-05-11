import Link from "next/link"
import { ArrowRight, CalendarCheck, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesPreview } from "@/components/home/services-preview"
import { WhyUsSection } from "@/components/home/why-us-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <WhyUsSection />

      <section className="relative overflow-hidden bg-foreground text-background">
        <div
          className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center md:py-20">
          <div className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Pasul următor</div>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl text-balance">
              Gata să dai mâna pe volan fără griji?
            </h2>
            <p className="mt-3 text-pretty text-background/70 md:text-lg leading-relaxed">
              Estimează costul în 1 minut sau programează-te direct. Echipa noastră îți răspunde în maxim 2 ore.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/calculator">
                <Calculator className="mr-1.5 h-4 w-4" aria-hidden />
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
              <Link href="/programare">
                <CalendarCheck className="mr-1.5 h-4 w-4" aria-hidden />
                Programează-te
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
