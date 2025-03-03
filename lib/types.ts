export interface City {
  id: string
  name: string
  slug: string
  latitude: number
  longitude: number
}

export interface Service {
  id: string
  name: string
  slug: string
}

export interface Company {
  id: string
  name: string
  address: string
  phone: string
  website?: string
  email?: string
  description?: string
  latitude: number
  longitude: number
  rating: number
  reviewCount: number
  cityId: string
  city?: City
  services?: { service: Service }[]
  image?: string
}

