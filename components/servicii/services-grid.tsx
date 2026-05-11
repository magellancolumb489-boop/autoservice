import { SERVICES } from "@/lib/services-data"
import { ServiceCard } from "./service-card"

export function ServicesGrid() {
  return (
    <div className="space-y-10 md:space-y-14">
      {SERVICES.map((svc) => (
        <ServiceCard key={svc.id} service={svc} />
      ))}
    </div>
  )
}
