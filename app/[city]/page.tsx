import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { getCityBySlug } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Breadcrumbs from "@/components/Breadcrumbs"
import { Tool, Wrench, Settings, Palette, Lightbulb, WashingMachine, Hammer, Scissors } from "lucide-react"

// Mapping of service slugs to icons
const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "instalateri": Tool,
  "oprava-pracky": WashingMachine,
  "elektrikari": Lightbulb,
  "maliri": Palette,
  "podlahari": Hammer,
  "zednici": Wrench,
  "kadernici": Scissors,
  "default": Settings
}

// Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const city = await getCityBySlug(params.city)

  if (!city) {
    return {
      title: "Stránka nenalezena",
      description: "Požadovaná stránka nebyla nalezena.",
    }
  }

  const title = `Řemeslníci a služby v ${city.name} | Řemeslníq`
  const description = `Najděte nejlepší řemeslníky a služby v ${city.name}. Porovnejte hodnocení, recenze a kontaktujte profesionály přímo.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${params.city}`,
      locale: "cs_CZ",
      type: "website",
    },
  }
}

// Revalidate every 24 hours
export const revalidate = 86400

export default async function CityPage({
  params,
}: {
  params: { city: string }
}) {
  const city = await getCityBySlug(params.city)

  if (!city) {
    notFound()
  }

  // Get all services available in this city
  const servicesInCity = await prisma.service.findMany({
    where: {
      companies: {
        some: {
          company: {
            cityId: city.id,
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Domů", href: "/" },
          { label: city.name, href: `/${params.city}` },
        ]}
      />

      <div className="text-center my-12">
        <h1 className="text-4xl font-bold mb-4">Řemeslníci a služby v {city.name}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Najděte kvalitní řemeslníky a služby v {city.name}. Porovnejte recenze, hodnocení a kontaktujte ty nejlepší profesionály.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {servicesInCity.map((service) => {
          const IconComponent = serviceIcons[service.slug] || serviceIcons.default
          
          return (
            <Card key={service.id} className="h-full transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <IconComponent className="h-8 w-8 text-primary" />
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Najděte kvalitní profesionály pro {service.name.toLowerCase()} v {city.name}.
                </p>
                <Button asChild className="w-full">
                  <Link href={`/${params.city}/${service.slug}`}>
                    Zobrazit služby
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {servicesInCity.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            Bohužel, v tomto městě zatím nejsou k dispozici žádné služby.
          </p>
          <Button asChild>
            <Link href="/">
              Zpět na úvodní stránku
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
