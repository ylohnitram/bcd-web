"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { Service } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface ServiceFiltersProps {
  currentService: Service
  citySlug: string
}

export default function ServiceFilters({ currentService, citySlug }: ServiceFiltersProps) {
  const router = useRouter()
  const [relatedServices, setRelatedServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedServices = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/services/related?serviceId=${currentService.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch related services')
        }
        const data = await response.json()
        setRelatedServices(data)
      } catch (error) {
        console.error('Error fetching related services:', error)
        setRelatedServices([])
      } finally {
        setIsLoading(false)
      }
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

      {isLoading ? (
        // Show skeleton buttons while loading
        Array(3).fill(0).map((_, index) => (
          <Button key={index} variant="outline" className="rounded-full opacity-50" size="sm" disabled>
            Načítání...
          </Button>
        ))
      ) : (
        relatedServices.map((service) => (
          <Button
            key={service.id}
            variant="outline"
            className="rounded-full"
            size="sm"
            onClick={() => handleServiceClick(service.slug)}
          >
            {service.name}
          </Button>
        ))
      )}
    </div>
  )
}
