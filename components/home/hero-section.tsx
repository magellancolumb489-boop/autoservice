import Link from "next/link"
import { ArrowRight, CalendarCheck, Calculator, Phone, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { COMPANY } from "@/lib/company-data"
import { EngineSchematic } from "./engine-schematic"

export function HeroSection() {
  const years = new Date().getFullYear() - COMPANY.foundedYear

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#0a0f1e] text-white">
      {/* LAYER 1 — Blueprint grid (with pulse animation) */}
      <div className="absolute inset-0 bg-blueprint" aria-hidden />

      {/* LAYER 2 — Engine schematic SVG (desktop: positioned behind text; mobile: hidden here, shown inline below) */}
      <div
        className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-90 lg:flex"
        aria-hidden
      >
        <div className="relative h-full w-full max-w-[1400px]" style={{ perspective: "1200px" }}>
          <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[70%]">
            <EngineSchematic />
          </div>
        </div>
      </div>

      {/* LAYER 3 — Diagonal orange accent beam */}
      <div className="accent-beam" aria-hidden />

      {/* LAYER 4 — Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-scanlines opacity-50"
        aria-hidden
      />

      {/* LAYER 5 — Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,15,30,0.7) 100%)",
        }}
      />

      {/* LAYER 6 — Left-side text gradient mask for legibility (desktop only) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 lg:block"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.7) 50%, rgba(10,15,30,0) 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-between px-4 pb-8 pt-10 md:py-24 lg:flex-row lg:items-center">

        {/* Mobile-only engine schematic — rendered as visible section above text */}
        <div
          className="relative mb-4 flex w-full items-center justify-center lg:hidden"
          aria-hidden
          style={{ perspective: "900px" }}
        >
          {/* Corner frame decorations */}
          <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[#4a90d9]/60" />
          <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-[#4a90d9]/60" />
          <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-[#4a90d9]/60" />
          <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-[#4a90d9]/60" />

          {/* Subtle scanlines inside the frame */}
          <div className="bg-scanlines pointer-events-none absolute inset-0 opacity-60" />

          {/* Axis label */}
          <span className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#4a90d9]/70">
            ISO 30° · scale 1:8
          </span>
          <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff5a1f]/70">
            engine.core / v3.26
          </span>

          <div className="h-[260px] w-full max-w-[420px]">
            <EngineSchematic />
          </div>
        </div>

        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* Left: headline + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4a90d9]/40 bg-[#1e3a5f]/40 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7fb3f0] backdrop-blur-sm">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#ff5a1f] shadow-[0_0_8px_#ff5a1f]" aria-hidden />
              CERTIFICAT RAR · ACTIV DIN {COMPANY.foundedYear}
            </div>

            <h1
              className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl text-balance"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6), 0 0 1px rgba(74,144,217,0.3)" }}
            >
              Îngrijim mașina ta de peste <span className="text-[#ff5a1f]">{years} de ani</span>.
            </h1>

            <p
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 md:text-lg"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              Service auto certificat RAR în București. Mecanici cu experiență, echipamente de
              ultimă generație, garanție extinsă pe manoperă și piese. Estimează costul în 1 minut.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-[#ff5a1f] font-semibold text-white shadow-[0_0_24px_rgba(255,90,31,0.4)] hover:bg-[#ff5a1f]/90"
              >
                <Link href="/calculator">
                  <Calculator className="mr-1.5 h-4 w-4" aria-hidden />
                  Calculează estimativ
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#4a90d9]/60 bg-[#1e3a5f]/30 font-semibold text-white backdrop-blur-sm hover:bg-[#1e3a5f]/60 hover:text-white"
              >
                <Link href="/programare">
                  <CalendarCheck className="mr-1.5 h-4 w-4" aria-hidden />
                  Programează-te acum
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-4 w-4 text-[#4a90d9]" aria-hidden />
                <span className="uppercase tracking-wider">
                  Manoperă 3 luni · Piese 18 luni
                </span>
              </div>
              <a
                href={COMPANY.phones.primaryHref}
                className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-[#ff5a1f]"
              >
                <Phone className="h-4 w-4 text-[#ff5a1f]" aria-hidden />
                {COMPANY.phones.primary}
              </a>
            </div>
          </div>

          {/* Right: blueprint readout panel */}
          <div className="hidden lg:flex lg:justify-end">
            <div className="w-full max-w-sm rounded-xl border border-[#4a90d9]/30 bg-[#0a0f1e]/70 p-6 font-mono text-xs text-white/80 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#4a90d9]/20 pb-2">
                <span className="text-[#7fb3f0] uppercase tracking-[0.2em]">Spec sheet</span>
                <span className="rounded-full bg-[#ff5a1f]/20 px-2 py-0.5 text-[10px] text-[#ff5a1f]">
                  REV. 03.26
                </span>
              </div>

              <dl className="mt-4 space-y-3">
                <SpecRow label="Experiență" value={`${years}+ ani`} />
                <SpecRow label="Categorii servicii" value="06" />
                <SpecRow label="Mărci deservite" value="42" accent />
                <SpecRow label="Garanție piese" value="18 luni" />
                <SpecRow label="Diagnoză" value="VCDS · BMW · OBD" />
              </dl>

              <div className="mt-5 border-t border-[#4a90d9]/20 pt-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#7fb3f0]">
                  Program
                </div>
                <div className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
                  {COMPANY.schedule.weekdays}
                </div>
                <div className="font-display text-2xl font-bold tabular-nums text-[#ff5a1f]">
                  {COMPANY.schedule.hours}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">
                  {COMPANY.schedule.weekend}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom corner marker — blueprint frame */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#7fb3f0]/60">
        <span>// engine.core / v3.26</span>
        <span>scale 1:8 · iso 30°</span>
      </div>
    </section>
  )
}

function SpecRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-white/50 uppercase tracking-wider text-[10px]">{label}</dt>
      <dd className="flex-1 border-b border-dashed border-[#4a90d9]/30" aria-hidden />
      <dd className={`font-semibold tabular-nums ${accent ? "text-[#ff5a1f]" : "text-white"}`}>
        {value}
      </dd>
    </div>
  )
}
