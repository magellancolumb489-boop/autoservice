import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SERVICES, getServiceBySlug } from "@/lib/services-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const svc = getServiceBySlug(slug)
  if (!svc) return { title: "Serviciu negăsit" }
  return {
    title: `${svc.title} — Lorem Ipsum Service`,
    description: svc.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const svc = getServiceBySlug(slug)
  if (!svc) notFound()

  const Icon =
    (Icons[svc.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.Wrench

  const calcHref = `/calculator?servicii=${svc.subServices
    .filter((s) => typeof s.price === "number" || s.classBased || s.priceRange)
    .map((s) => s.id)
    .slice(0, 3)
    .join(",")}`

  return (
    <div className="bg-background">
      <header className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
          <Link
            href="/servicii"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Toate serviciile
          </Link>

          <div className="mt-6 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <div>
              {svc.badge && (
                <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {svc.badge}
                </span>
              )}
              <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {svc.title}
              </h1>
              <p className="mt-3 text-pretty text-base text-muted-foreground md:text-lg leading-relaxed">
                {svc.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1fr_280px]">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Sub-servicii incluse</h2>
            <ul className="mt-4 space-y-2.5">
              {svc.subServices.map((sub) => (
                <li
                  key={sub.id}
                  className="flex items-start justify-between gap-3 rounded-md border border-border bg-card p-3"
                >
                  <span className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {sub.name}
                  </span>
                  <span className="shrink-0 text-xs font-semibold tabular-nums">
                    {typeof sub.price === "number" ? (
                      <span className="text-accent">{sub.price} RON</span>
                    ) : sub.priceRange ? (
                      <span className="text-accent">
                        {sub.priceRange.min}–{sub.priceRange.max} RON
                      </span>
                    ) : sub.classBased ? (
                      <span className="text-primary">manoperă</span>
                    ) : (
                      <span className="text-muted-foreground">la cerere</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            {svc.prices && svc.prices.length > 0 && (
              <>
                <Separator className="my-8" />
                <h2 className="font-display text-2xl font-bold tracking-tight">Tarife</h2>
                <div className="mt-4 overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {svc.prices.map((p, i) => (
                        <tr
                          key={p.label}
                          className={i % 2 === 0 ? "bg-card" : "bg-secondary"}
                        >
                          <td className="px-4 py-3 text-foreground">{p.label}</td>
                          <td className="px-4 py-3 text-right font-semibold text-accent">{p.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {svc.warranty && (
              <div className="mt-6 flex items-start gap-3 rounded-md border border-accent/30 bg-accent/5 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <div className="font-semibold text-foreground">Garanție extinsă</div>
                  <p className="text-sm text-muted-foreground">{svc.warranty}</p>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">Pregătit?</div>
              <h3 className="mt-1 font-display text-lg font-bold tracking-tight">
                Programează-te sau calculează costul
              </h3>
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild className="w-full font-semibold">
                  <Link href={`/programare?servicii=${svc.subServices.map((s) => s.id).slice(0, 3).join(",")}`}>
                    Programează-te
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={calcHref}>Calculator estimativ</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
