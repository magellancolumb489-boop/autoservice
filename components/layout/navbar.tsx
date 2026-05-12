"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, Wrench, X, ChevronRight } from "lucide-react";

import { COMPANY } from "@/lib/company-data";

const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/servicii", label: "Servicii" },
  { href: "/calculator", label: "Calculator" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-zinc-900
        bg-black/90
        backdrop-blur-xl
      "
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* LEFT — BRAND */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Acasă"
        >
          {/* Logo placeholder */}
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-red-950
              bg-zinc-950
              text-red-500
              transition-all
              group-hover:border-red-800
              group-hover:shadow-[0_0_20px_rgba(127,29,29,0.3)]
            "
          >
            {/* Replace this later with your logo */}
            <Wrench className="h-5 w-5" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-white">
              {COMPANY.shortName}
            </span>

            <span className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red-500">
              Certificat RAR · din 1992
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigare principală"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative
                  rounded-lg
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  ${
                    active
                      ? "bg-red-950/40 text-red-500"
                      : "text-white/75 hover:text-white"
                  }
                `}
              >
                {link.label}

                {active && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-[2px]
                      w-6
                      -translate-x-1/2
                      rounded-full
                      bg-red-500
                    "
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Phone */}
          <a
            href={COMPANY.phones.primaryHref}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-white/70
              transition-colors
              hover:text-red-500
            "
          >
            <Phone className="h-4 w-4 text-red-500" />
            {COMPANY.phones.primary}
          </a>

          {/* CTA */}
          <Link
            href="/programare"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              hover:bg-red-700
              hover:shadow-[0_0_30px_rgba(220,38,38,0.25)]
            "
          >
            Programează-te
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-zinc-900
            bg-zinc-950
            text-white
            transition-colors
            hover:border-red-900
            lg:hidden
          "
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            border-t
            border-zinc-900
            bg-black
            lg:hidden
          "
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col px-4 py-4"
            aria-label="Navigare mobil"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-4
                    text-sm
                    font-medium
                    transition-all
                    ${
                      active
                        ? "bg-red-950/30 text-red-500"
                        : "text-white/80 hover:bg-zinc-950"
                    }
                  `}
                >
                  {link.label}

                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              );
            })}

            {/* Bottom Area */}
            <div className="mt-4 border-t border-zinc-900 pt-4">
              <a
                href={COMPANY.phones.primaryHref}
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-white/75
                "
              >
                <Phone className="h-4 w-4 text-red-500" />
                {COMPANY.phones.primary}
              </a>

              <Link
                href="/programare"
                onClick={() => setOpen(false)}
                className="
                  flex
                  justify-center
                  rounded-xl
                  bg-red-600
                  px-4
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:bg-red-700
                "
              >
                Programează-te
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
