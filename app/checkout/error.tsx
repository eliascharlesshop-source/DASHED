"use client"

import { useEffect } from "react"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="mb-6">
        <Logo size="lg" textColor="text-[#0077b6]" />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We encountered an error while processing your checkout. Please try again or contact support if the problem
          persists.
        </p>

        <div className="space-y-3">
          <Button onClick={reset} className="w-full bg-[#0077b6] hover:bg-[#0069a3] text-white">
            Try Again
          </Button>

          <Button onClick={() => router.push("/")} variant="outline" className="w-full">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
