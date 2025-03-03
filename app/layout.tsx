import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Najděte nejlepší firmy a služby ve vašem městě",
  description:
    "Vyhledávejte a porovnávejte firmy a služby ve vašem městě. Hodnocení, recenze a kontakty na jednom místě.",
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'