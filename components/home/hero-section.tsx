import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Calculator,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company-data";
import { EngineSchematic } from "./engine-schematic";

export function HeroSection() {
  const years = new Date().getFullYear() - COMPANY.foundedYear;

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-black text-white">
      {/* LAYER 1 — Blueprint grid */}
      <div className="absolute inset-0 bg-blueprint opacity-20" aria-hidden />

      {/* LAYER 2 — Engine schematic */}
      <div
        className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-70 lg:flex"
        aria-hidden
      >
        <div
          className="relative h-full w-full max-w-[1400px]"
          style={{ perspective: "1200px" }}
        >
          <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[70%]">
            <EngineSchematic />
          </div>
        </div>
      </div>

      {/* LAYER 3 — Red beam accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(120deg, transparent 35%, rgba(220,38,38,0.12) 50%, transparent 65%)",
        }}
      />

      {/* LAYER 4 — Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 bg-scanlines opacity-30"
        aria-hidden
      />

      {/* LAYER 5 — Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* LAYER 6 — Left readability mask */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 lg:block"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* MAIN CONTENT */}
      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-between px-4 pb-8 pt-10 md:py-24 lg:flex-row lg:items-center">
        {/* MOBILE ENGINE */}
        <div
          className="relative mb-4 flex w-full items-center justify-center lg:hidden"
          aria-hidden
          style={{ perspective: "900px" }}
        >
          {/* Frame */}
          <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-red-700/60" />
          <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-red-700/60" />
          <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-red-700/60" />
          <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-red-700/60" />

          <div className="bg-scanlines pointer-events-none absolute inset-0 opacity-40" />

          <span className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[0.2em] text-red-600/70">
            ISO 30° · scale 1:8
          </span>

          <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-[0.2em] text-red-500/70">
            engine.core / v3.26
          </span>

          <div className="h-[260px] w-full max-w-[420px]">
            <EngineSchematic />
          </div>
        </div>

        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* LEFT SIDE */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-800/40 bg-red-950/30 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-red-400 backdrop-blur-md">
              <span
                className="block h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                aria-hidden
              />
              CERTIFICAT RAR · ACTIV DIN {COMPANY.foundedYear}
            </div>

            {/* Headline */}
            <h1
              className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl text-balance"
              style={{
                textShadow:
                  "0 3px 30px rgba(0,0,0,0.85), 0 0 20px rgba(220,38,38,0.12)",
              }}
            >
              Îngrijim mașina ta de peste{" "}
              <span className="text-red-500">{years} de ani</span>.
            </h1>

            {/* Subtext */}
            <p
              className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
              style={{
                textShadow: "0 2px 12px rgba(0,0,0,0.7)",
              }}
            >
              Service auto certificat RAR în București. Mecanici cu experiență,
              echipamente premium, diagnoză avansată și garanție extinsă.
              Estimează costul reparației în mai puțin de 1 minut.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-red-600 text-white font-semibold shadow-[0_0_35px_rgba(220,38,38,0.35)] hover:bg-red-700"
              >
                <Link href="/calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculează estimativ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/[0.03] text-white backdrop-blur-md hover:bg-white/[0.08]"
              >
                <Link href="/programare">
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Programează-te acum
                </Link>
              </Button>
            </div>

            {/* Bottom Info */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-white/75">
                <ShieldCheck className="h-4 w-4 text-red-500" />
                <span className="uppercase tracking-wider">
                  Manoperă 3 luni · Piese 18 luni
                </span>
              </div>

              <a
                href={COMPANY.phones.primaryHref}
                className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-red-500"
              >
                <Phone className="h-4 w-4 text-red-500" />
                {COMPANY.phones.primary}
              </a>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="hidden lg:flex lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6 font-mono text-xs text-white/80 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.02)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-red-400 uppercase tracking-[0.2em]">
                  Spec sheet
                </span>

                <span className="rounded-full bg-red-950 px-2 py-1 text-[10px] text-red-400">
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

              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-red-400">
                  Program
                </div>

                <div className="mt-1 font-display text-2xl font-bold text-white">
                  {COMPANY.schedule.weekdays}
                </div>

                <div className="font-display text-2xl font-bold text-red-500">
                  {COMPANY.schedule.hours}
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                  {COMPANY.schedule.weekend}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marker */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-red-700/60">
        <span>// engine.core / v3.26</span>
        <span>scale 1:8 · iso 30°</span>
      </div>
    </section>
  );
}

function SpecRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-white/40 uppercase tracking-wider text-[10px]">
        {label}
      </dt>

      <dd
        className="flex-1 border-b border-dashed border-white/10"
        aria-hidden
      />

      <dd
        className={`font-semibold tabular-nums ${
          accent ? "text-red-500" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
