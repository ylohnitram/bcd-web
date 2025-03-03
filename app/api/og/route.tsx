import { ImageResponse } from "next/og"
import { getCityBySlug, getServiceBySlug } from "@/lib/data"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const citySlug = searchParams.get("city")
    const serviceSlug = searchParams.get("service")

    if (!citySlug || !serviceSlug) {
      return new Response("Missing city or service parameter", { status: 400 })
    }

    const city = await getCityBySlug(citySlug)
    const service = await getServiceBySlug(serviceSlug)

    if (!city || !service) {
      return new Response("City or service not found", { status: 404 })
    }

    // Font
    const interSemiBold = await fetch(
      new URL("https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap", request.url),
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8fafc",
            borderRadius: "16px",
            padding: "32px",
            width: "90%",
            height: "80%",
            border: "1px solid #e2e8f0",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#0f172a",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            {service.name} v {city.name}
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#64748b",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Najděte nejlepší firmy a služby
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Zobrazit firmy
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interSemiBold,
            style: "normal",
            weight: 600,
          },
        ],
      },
    )
  } catch (e) {
    console.error(e)
    return new Response("Failed to generate image", { status: 500 })
  }
}

