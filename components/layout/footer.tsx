import Link from "next/link"
import { Clock, Mail, MapPin, Phone, Wrench } from "lucide-react"
import { COMPANY } from "@/lib/company-data"
import { SERVICES } from "@/lib/services-data"

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="h-4 w-4" aria-hidden />
              </span>
              <div className="leading-none">
                <div className="font-display text-lg font-bold tracking-tight">{COMPANY.shortName}</div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Certificat RAR · din 1992
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-background/70">
              Service auto premium din București. Mecanici cu experiență, echipamente de ultimă generație, garanție
              extinsă pe manoperă și piese.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-background">Servicii</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/servicii/${s.slug}`}
                    className="text-background/70 transition-colors hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-background">Companie</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/despre-noi" className="text-background/70 hover:text-primary">
                  Despre noi
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-background/70 hover:text-primary">
                  Calculator estimativ
                </Link>
              </li>
              <li>
                <Link href="/programare" className="text-background/70 hover:text-primary">
                  Programare online
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/70 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-background">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="text-background/70">{COMPANY.address.full}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div className="text-background/70">
                  <a href={COMPANY.phones.primaryHref} className="block hover:text-primary">
                    {COMPANY.phones.primary}
                  </a>
                  <a href={COMPANY.phones.secondaryHref} className="block hover:text-primary">
                    {COMPANY.phones.secondary}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a href={`mailto:${COMPANY.email}`} className="text-background/70 hover:text-primary">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div className="text-background/70">
                  <div>
                    {COMPANY.schedule.weekdays}: {COMPANY.schedule.hours}
                  </div>
                  <div className="text-background/50">{COMPANY.schedule.weekend}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 text-xs text-background/50 md:flex-row">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY.name}. Toate drepturile rezervate.
          </div>
          <div className="flex gap-4">
            <span>Termeni și condiții</span>
            <span>Politică de confidențialitate</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
