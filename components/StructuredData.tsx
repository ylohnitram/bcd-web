import type { Company, City, Service } from "@/lib/types"

interface StructuredDataProps {
  companies: Company[]
  city: City
  service: Service
}

export default function StructuredData({ companies, city, service }: StructuredDataProps) {
  // Create LocalBusiness structured data for each company
  const localBusinesses = companies.map((company) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://${process.env.VERCEL_URL}/company/${company.id}`,
    name: company.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressCountry: "CZ",
      streetAddress: company.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.latitude,
      longitude: company.longitude,
    },
    telephone: company.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: company.rating,
      reviewCount: company.reviewCount,
    },
    image: company.image || `https://${process.env.VERCEL_URL}/placeholder.jpg`,
    url: company.website || `https://${process.env.VERCEL_URL}/company/${company.id}`,
    priceRange: "$$",
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
      },
    },
  }))

  // Create BreadcrumbList structured data
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Domů",
        item: `https://${process.env.VERCEL_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: city.name,
        item: `https://${process.env.VERCEL_URL}/${city.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `https://${process.env.VERCEL_URL}/${city.slug}/${service.slug}`,
      },
    ],
  }

  return (
    <>
      {localBusinesses.map((business, index) => (
        <script
          key={`business-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
        />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
    </>
  )
}

