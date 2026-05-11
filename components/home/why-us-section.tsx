import { Award, Cpu, ShieldCheck } from "lucide-react"

const ITEMS = [
  {
    icon: Award,
    title: "Experiență din 1992",
    description:
      "Peste 30 de ani în service auto. Echipa noastră este certificată și autorizată RAR, cu experiență pe toate brandurile importante.",
    tone: "primary" as const,
  },
  {
    icon: Cpu,
    title: "Echipamente de ultimă generație",
    description:
      "VCDS pentru grupul VW/Audi, scanere specializate BMW/Fiat, stații A/C R134a și 1234YF, sudură argon și echipamente de geometrie roți.",
    tone: "accent" as const,
  },
  {
    icon: ShieldCheck,
    title: "Garanție extinsă",
    description:
      "3 luni manoperă · 18 luni piese pentru persoane fizice · 12 luni pentru persoane juridice. Lucrăm transparent și asumat.",
    tone: "primary" as const,
  },
]

export function WhyUsSection() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">De ce noi</div>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Trei motive solide să vii la noi
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className="flex flex-col items-start rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <span
                className={
                  "flex h-12 w-12 items-center justify-center rounded-lg " +
                  (item.tone === "primary"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground")
                }
              >
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
