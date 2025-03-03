import { NextRequest, NextResponse } from 'next/server'
import { getRelatedServices } from '@/lib/data'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const serviceId = searchParams.get('serviceId')

  if (!serviceId) {
    return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
  }

  try {
    const relatedServices = await getRelatedServices(serviceId)
    return NextResponse.json(relatedServices)
  } catch (error) {
    console.error('Error fetching related services:', error)
    return NextResponse.json({ error: 'Failed to fetch related services' }, { status: 500 })
  }
}
