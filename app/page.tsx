import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Briefcase } from "lucide-react"

export const revalidate = 86400 // revalidate this page every 24 hours

export default async function HomePage() {
  // Fetch cities and services for the homepage
  const cities = await prisma.city.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const services = await prisma.service.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <section className="py-12 md:py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Najděte spolehlivé řemeslníky a služby ve vašem městě
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Řemeslníq vám pomůže najít a porovnat kvalitní řemeslníky a služby. Přečtěte si recenze, prohlédněte si 
          hodnocení a kontaktujte ty nejlepší profesionály.
        </p>
        
        {/* Search box placeholder - in a real app, this would be a functional search component */}
        <div className="w-full max-w-xl mb-8 bg-white p-4 rounded-lg shadow-md flex items-center border">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Jakou službu hledáte?" 
            className="flex-grow border-0 focus:outline-none focus:ring-0"
          />
          <Button>Hledat</Button>
        </div>
      </section>

      {/* Cities section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Vyberte město</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link href={`/${city.slug}`} key={city.id}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    {city.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Services section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Populární služby</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="h-full transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Najděte kvalitní poskytovatele pro {service.name.toLowerCase()}
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cities.slice(0, 3).map((city) => (
                    <Link key={`${service.id}-${city.id}`} href={`/${city.slug}/${service.slug}`}>
                      <Button variant="outline" size="sm">
                        {city.name}
                      </Button>
                    </Link>
                  ))}
                  {cities.length > 3 && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/#cities`}>Více měst</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-12 bg-primary/5 rounded-xl my-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Jste řemeslník nebo poskytovatel služeb?</h2>
          <p className="text-xl mb-8">
            Získejte více zákazníků díky vaší přítomnosti v našem adresáři. Zaregistrujte se zdarma a ukažte své 
            zkušenosti potenciálním klientům.
          </p>
          <Button size="lg">
            Registrovat firmu
          </Button>
        </div>
      </section>
    </div>
  )
}
