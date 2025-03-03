"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Company } from "@/lib/types"
import { Star } from "lucide-react"

// Fix for Leaflet marker icons in Next.js
const markerIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface MapProps {
  companies: Company[]
  cityCenter: {
    lat: number
    lng: number
  }
}

export default function ClientMap({ companies, cityCenter }: MapProps) {
  // Set default icon for all markers
  L.Marker.prototype.options.icon = markerIcon

  return (
    <div className="h-[400px] w-full rounded-md overflow-hidden border">
      <MapContainer
        center={[cityCenter.lat, cityCenter.lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {companies.map((company) => (
          <Marker key={company.id} position={[company.latitude, company.longitude]}>
            <Popup>
              <div className="p-1 max-w-xs">
                <h3 className="font-bold text-base">{company.name}</h3>
                <p className="text-sm text-gray-600">{company.address}</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 mr-1">
                    {Array(Math.floor(company.rating))
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                  </div>
                  <span className="text-sm">{company.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500 ml-1">({company.reviewCount} recenzí)</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
