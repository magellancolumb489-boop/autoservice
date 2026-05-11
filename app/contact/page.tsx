import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { COMPANY } from "@/lib/company-data"

export const metadata: Metadata = {
  title: "Contact — Lorem Ipsum Service",
  description: `Contactează service-ul auto din ${COMPANY.address.city}. Telefon, email, WhatsApp și hartă cu locația.`,
}

const CARDS = [
  {
    icon: Phone,
    title: "Telefon",
    lines: [
      { text: COMPANY.phones.primary, href: COMPANY.phones.primaryHref },
      { text: COMPANY.phones.secondary, href: COMPANY.phones.secondaryHref },
    ],
    tone: "primary" as const,
  },
  {
    icon: Mail,
    title: "Email",
    lines: [{ text: COMPANY.email, href: `mailto:${COMPANY.email}` }],
    tone: "accent" as const,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: [{ text: "Mesaj rapid", href: COMPANY.whatsapp }],
    tone: "primary" as const,
  },
  {
    icon: Clock,
    title: "Program",
    lines: [
      { text: `${COMPANY.schedule.weekdays}: ${COMPANY.schedule.hours}` },
      { text: COMPANY.schedule.weekend, muted: true },
    ],
    tone: "accent" as const,
  },
]

export default function ContactPage() {
  return (
    <div className="bg-background">
      <header className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</div>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl text-balance">
            Ne găsești simplu — și răspundem rapid.
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg leading-relaxed">
            Scrie-ne, sună-ne sau vino direct la atelier. Pentru o vizită, recomandăm programarea în prealabil.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <article key={c.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <span
                className={
                  "flex h-11 w-11 items-center justify-center rounded-lg " +
                  (c.tone === "primary"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground")
                }
              >
                <c.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</h2>
              <div className="mt-1.5 space-y-0.5">
                {c.lines.map((line) =>
                  line.href ? (
                    <a
                      key={line.text}
                      href={line.href}
                      className="block text-sm font-semibold text-foreground hover:text-primary"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <p
                      key={line.text}
                      className={"text-sm " + (line.muted ? "text-muted-foreground" : "text-foreground")}
                    >
                      {line.text}
                    </p>
                  ),
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Adresă
            </div>
            <p className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">{COMPANY.address.street}</p>
            <p className="text-muted-foreground">
              {COMPANY.address.sector} · {COMPANY.address.city} · {COMPANY.address.country}
            </p>

            <Button asChild size="lg" className="mt-5 w-full font-semibold">
              <Link href="/programare">
                Programează-te online
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="mt-2 w-full bg-transparent">
              <a href={COMPANY.maps} target="_blank" rel="noopener noreferrer">
                Deschide în Google Maps
              </a>
            </Button>
          </div>

          {/* Map placeholder */}
          <div
            className="relative min-h-[320px] overflow-hidden rounded-xl border border-border bg-secondary"
            aria-label="Hartă locație placeholder"
          >
            <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
            <div
              className="absolute -top-16 right-8 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -bottom-20 -left-8 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
              aria-hidden
            />
            <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <MapPin className="h-6 w-6" aria-hidden />
              </span>
              <p className="mt-4 max-w-xs text-pretty text-sm text-muted-foreground">
                Înlocuiește acest placeholder cu un iframe Google Maps real către locația service-ului.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
