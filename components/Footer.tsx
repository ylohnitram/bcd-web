import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Řemeslníq</h3>
            <p className="text-gray-600 mb-4">
              Najděte nejlepší řemeslníky a služby ve vašem městě rychle a jednoduše.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Města</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/praha" className="text-gray-600 hover:text-primary">
                  Praha
                </Link>
              </li>
              <li>
                <Link href="/brno" className="text-gray-600 hover:text-primary">
                  Brno
                </Link>
              </li>
              <li>
                <Link href="/ostrava" className="text-gray-600 hover:text-primary">
                  Ostrava
                </Link>
              </li>
              <li>
                <Link href="/plzen" className="text-gray-600 hover:text-primary">
                  Plzeň
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Služby</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/praha/oprava-pracky" className="text-gray-600 hover:text-primary">
                  Oprava praček
                </Link>
              </li>
              <li>
                <Link href="/praha/instalateri" className="text-gray-600 hover:text-primary">
                  Instalatérské služby
                </Link>
              </li>
              <li>
                <Link href="/praha/elektrikari" className="text-gray-600 hover:text-primary">
                  Elektrikáři
                </Link>
              </li>
              <li>
                <Link href="/praha/maliri" className="text-gray-600 hover:text-primary">
                  Malíři
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Informace</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="text-gray-600 hover:text-primary">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/ochrana-osobnich-udaju" className="text-gray-600 hover:text-primary">
                  Ochrana osobních údajů
                </Link>
              </li>
              <li>
                <Link href="/obchodni-podminky" className="text-gray-600 hover:text-primary">
                  Obchodní podmínky
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Řemeslníq. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}
