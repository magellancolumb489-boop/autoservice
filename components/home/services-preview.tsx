import Link from "next/link";
import { ArrowRight, ShieldCheck, Wrench } from "lucide-react";
import * as Icons from "lucide-react";
import { SERVICES } from "@/lib/services-data";

export function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-14 text-white sm:px-6 md:py-20">
      {/* Background Effects */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background: `
            radial-gradient(circle at top right, rgba(185,28,28,0.12), transparent 30%),
            radial-gradient(circle at bottom left, rgba(185,28,28,0.06), transparent 35%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-red-500">
              // serviciile noastre
            </div>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Soluții complete pentru orice mașină
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              Revizii, diagnoză, reparații mecanice, electrică, sudură argon și
              servicii specializate — totul într-un singur service.
            </p>
          </div>

          <Link
            href="/servicii"
            className="
              group
              inline-flex
              items-center
              gap-2
              self-start
              text-sm
              font-semibold
              text-white/80
              transition-colors
              hover:text-red-500
            "
          >
            Toate serviciile
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  featured,
}: {
  service: (typeof SERVICES)[number];
  featured?: boolean;
}) {
  const Icon =
    (Icons[service.icon as keyof typeof Icons] as React.ComponentType<{
      className?: string;
    }>) || Wrench;

  return (
    <Link
      href={`/servicii/${service.slug}`}
      className="
        group
        relative
        flex
        min-h-[270px]
        flex-col
        rounded-2xl
        border
        border-zinc-900
        bg-zinc-950
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-red-900
        hover:shadow-[0_0_30px_rgba(127,29,29,0.25)]
        active:scale-[0.99]
      "
    >
      {/* Hover Red Accent */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(circle at top right, rgba(220,38,38,0.08), transparent 40%)",
        }}
      />

      {/* Top */}
      <div className="relative flex items-start justify-between gap-3">
        <div
          className={`
            flex h-12 w-12 shrink-0 items-center justify-center rounded-xl
            ${
              featured
                ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                : "border border-zinc-800 bg-zinc-900 text-red-500"
            }
          `}
        >
          <Icon className="h-5 w-5" />
        </div>

        {service.badge && (
          <div
            className="
              rounded-full
              border
              border-red-950
              bg-red-950/40
              px-2.5
              py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-red-400
            "
          >
            {service.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative mt-5 flex-1">
        <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          {service.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {service.shortDescription}
        </p>
      </div>

      {/* Bottom */}
      <div className="relative mt-5 border-t border-zinc-900 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            {service.subServices.length} servicii
          </span>

          {service.warranty && (
            <span className="inline-flex items-center gap-1 text-[11px] text-white/45">
              <ShieldCheck className="h-3.5 w-3.5 text-red-500" aria-hidden />
              Garantat
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div
        className="
          mt-4
          inline-flex
          items-center
          gap-1
          text-xs
          font-semibold
          text-red-500
          opacity-70
          transition-all
          group-hover:translate-x-1
          group-hover:opacity-100
        "
      >
        Vezi detalii
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
