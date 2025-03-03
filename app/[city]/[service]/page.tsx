import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import CompanyTable from "@/components/CompanyTable"
import dynamic from "next/dynamic"
import Breadcrumbs from "@/components/Breadcrumbs"
import ServiceFilters from "@/components/ServiceFilters"
import StructuredData from "@/components/StructuredData"
import { getCityBySlug, getServiceBySlug, getCompaniesByCityAndService } from "@/lib/data"
import { CompanySkeleton } from "@/components/ui/skeletons"

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import("@/components/Map"), { ssr: false })

// Generate static paths at build time
export async function generateStaticParams() {
  // Get all cities and services from the database
  const cities = await prisma.city.findMany()
  const services = await prisma.service.findMany()

  // Generate all possible combinations
  const paths = []

  for (const city of cities) {
    for (const service of services) {
      // Only include combinations where there are companies
      const companiesCount = await prisma.company.count({
        where: {
          cityId: city.id,
          services: {
            some: {
              serviceId: service.id,
            },
          },
        },
      })

      if (companiesCount > 0) {
        paths.push({
          city: city.slug,
          service: service.slug,
        })
      }
    }
  }

  return paths
}

// Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: { city: string; service: string }
}): Promise<Metadata> {
  const city = await getCityBySlug(params.city)
  const service = await getServiceBySlug(params.service)

  if (!city || !service) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    }
  }

  const title = `${service.name} v ${city.name} | Nejlepší firmy a služby`
  const description = `Hledáte ${service.name.toLowerCase()} v ${city.name}? Najděte nejlepší firmy poskytující ${service.name.toLowerCase()} v ${city.name} s hodnocením a recenzemi.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/api/og?city=${params.city}&service=${params.service}`],
      locale: "cs_CZ",
      type: "website",
    },
    alternates: {
      canonical: `https://${process.env.VERCEL_URL}/${params.city}/${params.service}`,
    },
  }
}

// Revalidate every 24 hours
export const revalidate = 86400

export default async function ServicePage({
  params,
}: {
  params: { city: string; service: string }
}) {
  const city = await getCityBySlug(params.city)
  const service = await getServiceBySlug(params.service)

  // If city or service doesn't exist, show 404
  if (!city || !service) {
    notFound()
  }

  const companies = await getCompaniesByCityAndService(city.id, service.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Domů", href: "/" },
          { label: city.name, href: `/${params.city}` },
          { label: service.name, href: `/${params.city}/${params.service}` },
        ]}
      />

      <h1 className="text-3xl font-bold mt-6 mb-4">
        {service.name} v {city.name}
      </h1>

      <p className="text-gray-600 mb-8">
        Najděte nejlepší firmy poskytující {service.name.toLowerCase()} v {city.name}. Porovnejte hodnocení, recenze a
        kontaktujte vybranou firmu přímo.
      </p>

      <ServiceFilters currentService={service} citySlug={params.city} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Firmy a služby</h2>
          <Suspense fallback={<CompanySkeleton />}>
            <CompanyTable companies={companies} />
          </Suspense>
        </div>

        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Mapa</h2>
          <Map
            companies={companies}
            cityCenter={{ lat: city.latitude, lng: city.longitude }}
          />
        </div>
      </div>

      <StructuredData companies={companies} city={city} service={service} />
    </div>
  )
}
