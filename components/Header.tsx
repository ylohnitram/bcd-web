"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Řemeslníq</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Domů
            </Link>
            <Link href="/praha" className="text-sm font-medium hover:text-primary">
              Praha
            </Link>
            <Link href="/brno" className="text-sm font-medium hover:text-primary">
              Brno
            </Link>
            <Link href="/ostrava" className="text-sm font-medium hover:text-primary">
              Ostrava
            </Link>
            <Button variant="outline" size="sm">
              Pro firmy
            </Button>
            <Button size="sm">Přihlásit se</Button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-4 flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Domů
            </Link>
            <Link href="/praha" className="text-sm font-medium hover:text-primary">
              Praha
            </Link>
            <Link href="/brno" className="text-sm font-medium hover:text-primary">
              Brno
            </Link>
            <Link href="/ostrava" className="text-sm font-medium hover:text-primary">
              Ostrava
            </Link>
            <Button variant="outline" size="sm" className="w-full">
              Pro firmy
            </Button>
            <Button size="sm" className="w-full">
              Přihlásit se
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
