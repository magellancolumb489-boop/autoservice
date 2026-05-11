"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ImageIcon, Plus, ShieldCheck, Tag } from "lucide-react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ServiceData, SubService } from "@/lib/types"

interface ServiceCardProps {
  service: ServiceData
}

const CATEGORY_LABELS: Record<string, string> = {
  revizii: "Mentenanță",
  "aer-conditionat": "A/C",
  diagnoza: "Diagnosticare",
  esapament: "Eșapament",
  sudura: "Sudură",
  "off-road": "Off-Road",
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [open, setOpen] = useState(false)
  const Icon =
    (Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) ||
    Icons.Wrench
  const categoryLabel = CATEGORY_LABELS[service.id] ?? service.title

  return (
    <section
      className="relative border-l-4 border-primary bg-card pl-0"
      aria-labelledby={`svc-${service.id}-title`}
    >
      <div className="grid items-stretch gap-6 p-5 md:p-8 lg:grid-cols-[45%_1fr] lg:gap-10 lg:p-10">
        {/* LEFT — Main image placeholder */}
        <ImagePlaceholder
          label={`Imagine Serviciu: ${service.title}`}
          dataSlot={`service-${service.id}`}
          aspectClass="aspect-[16/9] lg:aspect-[16/10]"
          size="lg"
        />

        {/* RIGHT — Info panel */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {categoryLabel}
            </span>
            {service.warranty && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground">
                <ShieldCheck className="h-3 w-3" aria-hidden />
                Garantat
              </span>
            )}
          </div>

          <h2
            id={`svc-${service.id}-title`}
            className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight text-foreground md:text-4xl"
          >
            {service.title}
          </h2>

          <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-muted-foreground">
            {service.shortDescription}
          </p>

          {/* Price + warranty row */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-bold text-primary-foreground">
              <Tag className="h-4 w-4" aria-hidden />
              {service.badge}
            </span>
            {service.warranty && (
              <span className="text-xs text-muted-foreground">{service.warranty}</span>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={`subs-${service.id}`}
              className="font-semibold"
            >
              {open ? "Ascunde sub-servicii" : `Vezi sub-servicii (${service.subServices.length})`}
              <ChevronDown
                className={cn("ml-1 h-4 w-4 transition-transform duration-300", open && "rotate-180")}
                aria-hidden
              />
            </Button>
            <Button asChild size="lg" className="font-semibold">
              <Link href={`/servicii/${service.slug}`}>Detalii complete</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* SUB-SERVICES GRID — animated slide-down */}
      <div
        id={`subs-${service.id}`}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-border bg-secondary/40 p-5 md:p-8 lg:p-10">
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                Sub-servicii
              </h3>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {service.subServices.length} opțiuni
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {service.subServices.map((sub) => (
                <SubServiceCard key={sub.id} sub={sub} serviceSlug={service.slug} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient fade divider after each block */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden />
    </section>
  )
}

function SubServiceCard({ sub, serviceSlug }: { sub: SubService; serviceSlug: string }) {
  const priceLabel =
    typeof sub.price === "number"
      ? `${sub.price} RON`
      : sub.priceRange
        ? `${sub.priceRange.min}–${sub.priceRange.max} RON`
        : sub.classBased
          ? "În funcție de clasă"
          : "La cerere"

  const calcHref = `/calculator?servicii=${encodeURIComponent(sub.id)}`

  return (
    <article
      className="group flex flex-col rounded-lg border border-border bg-card transition-all duration-200 hover:scale-[1.02] hover:border-primary hover:shadow-md focus-within:border-primary"
      tabIndex={-1}
    >
      <ImagePlaceholder
        label={sub.name}
        dataSlot={`subservice-${sub.id}`}
        aspectClass="aspect-[4/3]"
        size="sm"
      />

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex-1">
          <div className="font-semibold leading-snug text-foreground text-sm">{sub.name}</div>
          <div className="mt-1 font-semibold text-primary text-sm tabular-nums">{priceLabel}</div>
        </div>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-8 justify-start px-2 text-xs font-semibold text-foreground hover:bg-primary/10 hover:text-primary"
        >
          <Link href={calcHref} aria-label={`Adaugă ${sub.name} la calculator`}>
            <Plus className="mr-1 h-3.5 w-3.5" aria-hidden />
            Adaugă la calculator
          </Link>
        </Button>
      </div>

      <span className="sr-only">Serviciu inclus în categoria {serviceSlug}</span>
    </article>
  )
}

function ImagePlaceholder({
  label,
  dataSlot,
  aspectClass,
  size,
}: {
  label: string
  dataSlot: string
  aspectClass: string
  size: "lg" | "sm"
}) {
  return (
    <div
      data-image-slot={dataSlot}
      role="img"
      aria-label={`Imagine placeholder pentru ${label}, va fi adăugată ulterior`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary/40 bg-[#1A1A1A] text-center",
        aspectClass,
      )}
    >
      {/* Subtle grid pattern inside placeholder */}
      <div
        className="absolute inset-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,90,31,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,90,31,0.2) 1px, transparent 1px)",
          backgroundSize: size === "lg" ? "32px 32px" : "16px 16px",
        }}
      />

      <div className="relative flex flex-col items-center gap-2 px-3">
        <div
          className={cn(
            "flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary",
            size === "lg" ? "h-14 w-14" : "h-9 w-9",
          )}
        >
          <ImageIcon className={size === "lg" ? "h-6 w-6" : "h-4 w-4"} aria-hidden />
        </div>
        <div
          className={cn(
            "font-mono italic text-gray-400",
            size === "lg" ? "text-sm" : "text-[11px]",
          )}
        >
          {`[ ${size === "lg" ? "Imagine Serviciu: " : ""}${label} ]`}
        </div>
        {size === "lg" && (
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
            placeholder · 16:10
          </div>
        )}
      </div>

      {/* Corner brackets - blueprint frame */}
      <CornerBrackets />
    </div>
  )
}

function CornerBrackets() {
  return (
    <>
      <span
        className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-primary/60"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-primary/60"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-primary/60"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-primary/60"
        aria-hidden
      />
    </>
  )
}
