"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Něco se pokazilo</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Omlouváme se, ale při načítání stránky došlo k chybě. Zkuste to prosím znovu.
      </p>
      <Button onClick={reset}>Zkusit znovu</Button>
    </div>
  )
}

