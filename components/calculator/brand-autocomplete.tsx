"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import { CAR_BRANDS, filterBrands } from "@/lib/car-brands"
import { cn } from "@/lib/utils"

interface BrandAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  error?: string
}

export function BrandAutocomplete({
  value,
  onChange,
  placeholder = "Caută marca (ex: BMW, Dacia)...",
  id,
  error,
}: BrandAutocompleteProps) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  const results = useMemo(() => filterBrands(query), [query])

  useEffect(() => {
    setHighlight(0)
  }, [query])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  function select(brand: string) {
    onChange(brand)
    setQuery(brand)
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setOpen(true)
      setHighlight((h) => Math.min(results.length - 1, h + 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlight((h) => Math.max(0, h - 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (open && results[highlight]) select(results[highlight])
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "flex items-center gap-2 rounded-md border bg-card px-3 py-2 transition-colors",
          "focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary",
          error ? "border-destructive" : "border-border",
        )}
      >
        <Search className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
        <input
          id={id}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
        />
        <ChevronDown
          className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </div>

      {open && results.length > 0 && (
        <ul
          id={`${id}-listbox`}
          ref={listRef}
          role="listbox"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-border bg-popover shadow-lg"
        >
          {results.map((brand, i) => (
            <li
              key={brand}
              role="option"
              aria-selected={i === highlight}
              onMouseDown={(e) => {
                e.preventDefault()
                select(brand)
              }}
              onMouseEnter={() => setHighlight(i)}
              className={cn(
                "cursor-pointer px-3 py-2 text-sm transition-colors",
                i === highlight ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
              )}
            >
              {brand}
            </li>
          ))}
        </ul>
      )}

      {open && results.length === 0 && (
        <div className="absolute z-30 mt-1 w-full rounded-md border border-border bg-popover px-3 py-2 text-sm text-muted-foreground shadow-lg">
          Nicio marcă găsită. Verifică ortografia sau alege din lista completă ({CAR_BRANDS.length} mărci).
        </div>
      )}

      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}
