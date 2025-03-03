"use client"

import { useEffect, useState } from "react"
import type { Company } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

interface MapProps {
  companies: Company[]
  cityCenter: {
    lat: number
    lng: number
  }
}

export default function Map({ companies, cityCenter }: MapProps) {
  const [ClientMap, setClientMap] = useState<React.ComponentType<MapProps> | null>(null)

  useEffect(() => {
    // Dynamically import the client-side map component
    import('./ClientMap').then((module) => {
      setClientMap(() => module.default)
    })
  }, [])

  // Show a skeleton while the map is loading
  if (!ClientMap) {
    return <Skeleton className="h-[400px] w-full rounded-md" />
  }

  return <ClientMap companies={companies} cityCenter={cityCenter} />
}
