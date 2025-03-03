import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Cities
  // Note: Create cities one by one to get their IDs for later use
  const praha = await prisma.city.create({
    data: {
      name: 'Praha',
      slug: 'praha',
      latitude: 50.0755, // Added required latitude
      longitude: 14.4378, // Added required longitude
    }
  })
  
  const brno = await prisma.city.create({
    data: {
      name: 'Brno',
      slug: 'brno',
      latitude: 49.1951, // Added required latitude
      longitude: 16.6068, // Added required longitude
    }
  })

  // Services
  const prackyService = await prisma.service.create({
    data: { 
      name: 'Oprava praček', 
      slug: 'oprava-pracky' 
    }
  })
  
  const instalateriService = await prisma.service.create({
    data: { 
      name: 'Instalatérské služby', 
      slug: 'instalateri' 
    }
  })

  // Companies with their services
  const company1 = await prisma.company.create({
    data: {
      name: 'PračkaServis Praha',
      address: 'Na Poříčí 25, Praha 1',
      phone: '+420123456789', // Added required phone field
      rating: 4.8,
      reviewCount: 42, // Added required reviewCount
      latitude: 50.0890, // Added required latitude
      longitude: 14.4321, // Added required longitude
      cityId: praha.id, // Using the ID from the created city
      services: {
        create: {
          serviceId: prackyService.id // Creating the many-to-many relationship
        }
      }
    }
  })
  
  const company2 = await prisma.company.create({
    data: {
      name: 'Instalatérství Novák',
      address: 'Kounicova 12, Brno-střed',
      phone: '+420987654321', // Added required phone field
      rating: 4.5,
      reviewCount: 36, // Added required reviewCount
      latitude: 49.2074, // Added required latitude
      longitude: 16.6015, // Added required longitude
      cityId: brno.id, // Using the ID from the created city
      services: {
        create: {
          serviceId: instalateriService.id // Creating the many-to-many relationship
        }
      }
    }
  })

  console.log('Seed data created successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
