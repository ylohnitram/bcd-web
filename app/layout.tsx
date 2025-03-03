import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Řemeslníq | Najděte nejlepší řemeslníky a služby",
    template: "%s | Řemeslníq"
  },
  description:
    "Najděte a porovnejte nejlepší řemeslníky a služby ve vašem městě. Hodnocení, recenze a kontakty na jednom místě.",
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  keywords: ["řemeslníci", "služby", "řemeslné práce", "opravy", "instalatéři", "elektrikáři", "malíři"],
  authors: [{ name: "Řemeslníq" }],
  creator: "Řemeslníq",
  publisher: "Řemeslníq",
  generator: "Next.js",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000",
    title: "Řemeslníq | Najděte nejlepší řemeslníky a služby",
    description: "Najděte a porovnejte nejlepší řemeslníky a služby ve vašem městě.",
    siteName: "Řemeslníq",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Řemeslníq"
    }]
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        {/* Add Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
