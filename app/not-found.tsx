import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
      <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
      <h2 className="text-3xl font-bold mb-4">Stránka nenalezena</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default">
          <Link href="/">Zpět na úvodní stránku</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/praha">Prozkoumat služby v Praze</Link>
        </Button>
      </div>
    </div>
  )
}
