import { Star, StarHalf, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Company } from "@/lib/types"

interface CompanyTableProps {
  companies: Company[]
}

export default function CompanyTable({ companies }: CompanyTableProps) {
  if (companies.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md bg-gray-50">
        <p className="text-gray-500">Žádné firmy nebyly nalezeny.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Název firmy</TableHead>
            <TableHead className="w-[30%]">Hodnocení</TableHead>
            <TableHead className="w-[15%]">Recenze</TableHead>
            <TableHead className="w-[15%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {Array(Math.floor(company.rating))
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    {company.rating % 1 >= 0.5 && <StarHalf className="h-4 w-4 fill-current" />}
                  </div>
                  <span className="text-sm text-gray-600">{company.rating.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell>{company.reviewCount}</TableCell>
              <TableCell>
                <Button size="sm" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Kontakt
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

