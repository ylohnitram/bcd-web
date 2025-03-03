import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Cities
  const cities = await prisma.city.createMany({
    data: [
      {
        name: 'Praha',
        slug: 'praha',
        districts: ['Praha 1', 'Praha 2', 'Praha 3', 'Praha 4']
      },
      {
        name: 'Brno',
        slug: 'brno',
        districts: ['Brno-střed', 'Brno-sever', 'Brno-jih']
      }
    ]
  })

  // Services
  const services = await prisma.service.createMany({
    data: [
      { name: 'Oprava praček', slug: 'oprava-pracky' },
      { name: 'Instalatérské služby', slug: 'instalateri' }
    ]
  })

  // Companies
  await prisma.company.createMany({
    data: [
      {
        name: 'PračkaServis Praha',
        address: 'Na Poříčí 25, Praha 1',
        rating: 4.8,
        cityId: 1,
        serviceId: 1
      },
      {
        name: 'Instalatérství Novák',
        address: 'Kounicova 12, Brno-střed',
        rating: 4.5,
        cityId: 2,
        serviceId: 2
      }
    ]
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
