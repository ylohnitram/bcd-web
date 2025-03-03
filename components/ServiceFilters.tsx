"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { Service } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { getRelatedServices } from "@/lib/data"

interface ServiceFiltersProps {
  currentService: Service
  citySlug: string
}

export default function ServiceFilters({ currentService, citySlug }: ServiceFiltersProps) {
  const router = useRouter()
  const [relatedServices, setRelatedServices] = useState<Service[]>([])

  useEffect(() => {
    const fetchRelatedServices = async () => {
      const services = await getRelatedServices(currentService.id)
      setRelatedServices(services)
    }

    fetchRelatedServices()
  }, [currentService.id])

  const handleServiceClick = (serviceSlug: string) => {
    router.push(`/${citySlug}/${serviceSlug}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" className="rounded-full" size="sm">
        {currentService.name}
      </Button>

      {relatedServices.map((service) => (
        <Button
          key={service.id}
          variant="outline"
          className="rounded-full"
          size="sm"
          onClick={() => handleServiceClick(service.slug)}
        >
          {service.name}
        </Button>
      ))}
    </div>
  )
}

