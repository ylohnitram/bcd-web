import type { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all cities
  const cities = await prisma.city.findMany()

  // Get all services
  const services = await prisma.service.findMany()

  // Create base URLs
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

  // Create homepage entry
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  // Add city pages
  for (const city of cities) {
    sitemapEntries.push({
      url: `${baseUrl}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  }

  // Add city+service pages
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
        sitemapEntries.push({
          url: `${baseUrl}/${city.slug}/${service.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.9,
        })
      }
    }
  }

  return sitemapEntries
}

