import { prisma } from "./prisma"
import type { City, Service, Company } from "./types"

export async function getCityBySlug(slug: string): Promise<City | null> {
  return prisma.city.findUnique({
    where: { slug },
  })
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return prisma.service.findUnique({
    where: { slug },
  })
}

export async function getCompaniesByCityAndService(cityId: string, serviceId: string): Promise<Company[]> {
  const companies = await prisma.company.findMany({
    where: {
      cityId,
      services: {
        some: {
          serviceId,
        },
      },
    },
    include: {
      city: true,
      services: {
        include: {
          service: true,
        },
      },
    },
  })

  return companies
}

export async function getRelatedServices(serviceId: string): Promise<Service[]> {
  // Find companies that offer the current service
  const companies = await prisma.company.findMany({
    where: {
      services: {
        some: {
          serviceId,
        },
      },
    },
    select: {
      id: true,
    },
  })

  const companyIds = companies.map((company) => company.id)

  // Find other services offered by these companies
  const relatedServices = await prisma.service.findMany({
    where: {
      companies: {
        some: {
          companyId: {
            in: companyIds,
          },
          serviceId: {
            not: serviceId,
          },
        },
      },
    },
    take: 5,
  })

  return relatedServices
}

