"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Phone, Wrench, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { COMPANY } from "@/lib/company-data"

const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/servicii", label: "Servicii" },
  { href: "/calculator", label: "Calculator" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Acasă">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
            <Wrench className="h-4 w-4" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              {COMPANY.shortName}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              Certificat RAR · din 1992
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigare principală">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-foreground hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={COMPANY.phones.primaryHref}
            className="hidden items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary lg:flex"
          >
            <Phone className="h-3.5 w-3.5 text-primary" aria-hidden />
            {COMPANY.phones.primary}
          </a>
          <Button asChild size="sm" className="font-semibold">
            <Link href="/programare">Programează-te</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md border border-border bg-card p-2 md:hidden"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Navigare mobil">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <a
                href={COMPANY.phones.primaryHref}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground"
              >
                <Phone className="h-4 w-4 text-primary" aria-hidden />
                {COMPANY.phones.primary}
              </a>
              <Button asChild size="lg" className="w-full font-semibold">
                <Link href="/programare" onClick={() => setOpen(false)}>
                  Programează-te
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
