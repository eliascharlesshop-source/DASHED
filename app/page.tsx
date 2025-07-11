"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function RootPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-50 to-white flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Welcome to <span className="text-accent-500">DASHED OS</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-lg mx-auto">
          Your Digital Life, Unified. Experience the future of connected devices.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/(app)">
            <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
              Go to App Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/(marketing)">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
