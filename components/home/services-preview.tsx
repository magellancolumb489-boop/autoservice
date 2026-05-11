import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import * as Icons from "lucide-react"
import { SERVICES } from "@/lib/services-data"
import { cn } from "@/lib/utils"

export function ServicesPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            // serviciile noastre
          </div>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Soluții complete pentru orice mașină
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            De la revizii periodice la diagnoză computerizată, sudură argon și consultanță off-road — acoperim tot
            ce poate avea nevoie mașina ta.
          </p>
        </div>
        <Link
          href="/servicii"
          className="group inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          Toate cele 6 servicii
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((svc, i) => (
          <ServicePreviewCard key={svc.id} service={svc} accent={i % 2 === 0 ? "primary" : "accent"} />
        ))}
      </div>
    </section>
  )
}

function ServicePreviewCard({
  service,
  accent,
}: {
  service: (typeof SERVICES)[number]
  accent: "primary" | "accent"
}) {
  const Icon =
    (Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) ||
    Icons.Wrench

  const iconBg =
    accent === "primary" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"

  return (
    <Link
      href={`/servicii/${service.slug}`}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg", iconBg)}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        {service.badge && (
          <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-foreground">
            {service.badge}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">
        {service.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {service.shortDescription}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {service.subServices.length} sub-servicii
        </span>
        {service.warranty && (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-accent" aria-hidden />
            Garantat
          </span>
        )}
      </div>

      <span
        className="absolute inset-x-6 bottom-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      >
        Vezi detalii
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </span>
    </Link>
  )
}
