"use client"

import { useState } from "react"
import Link from "next/link"
import dynamicImport from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  Laptop,
  Smartphone,
  Tablet,
  Globe,
  Shield,
  Zap,
  Layers,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

// Dynamically import heavy components
const NavBar = dynamicImport(() => import("@/components/navbar"), {
  loading: () => (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-[#0077b6] py-4">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-white/20 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-20 h-8 bg-white/20 rounded animate-pulse"></div>
          <div className="w-24 h-8 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>
    </header>
  ),
  // Remove ssr: false to allow proper server-side rendering
})

export const dynamic = 'force-dynamic'

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      quote:
        "DASHED OS has completely transformed how I interact with my devices. The seamless integration and intuitive interface have made my digital life so much more efficient.",
      author: "Sarah Johnson",
      role: "Product Designer",
      company: "Creative Solutions",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The security features are incredible. I feel confident using DASHED OS knowing my data is protected with military-grade encryption.",
      author: "Michael Chen",
      role: "Security Engineer",
      company: "TechSecure Inc",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "Finally, an OS that works across all my devices seamlessly. The performance is outstanding and the interface is beautiful.",
      author: "Emma Rodriguez",
      role: "UX Designer",
      company: "Digital Innovations",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Built on TailsOS-inspired security with end-to-end encryption and privacy-first design."
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "Optimized with edge computing and AI acceleration across all connected devices."
    },
    {
      icon: Layers,
      title: "Universal Compatibility",
      description: "Works seamlessly across laptops, desktops, mobiles, tablets, and IoT devices."
    },
    {
      icon: Globe,
      title: "Cross-Platform Sync",
      description: "Real-time synchronization and backup across all your devices automatically."
    },
    {
      icon: Laptop,
      title: "Device Intelligence",
      description: "AI-powered device management with automatic optimization and health monitoring."
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Beautiful, intuitive interface designed for productivity and ease of use."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Spacer for fixed navbar (removed per request) */}
      <div className="h-0"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-50 via-white to-accent-100">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              🚀 Now in Beta - Join the Revolution
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              The Future of
              <span className="block bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent">
                Universal Computing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              DASHED OS seamlessly integrates across all your devices, providing a unified computing experience powered by advanced AI and edge computing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Watch Demo
              </Button>
            </div>

            {/* Device Preview */}
            <div className="flex justify-center items-center gap-8 mt-16">
              <div className="flex flex-col items-center">
                <div className="w-16 h-24 bg-gray-800 rounded-lg border-2 border-gray-600 flex items-center justify-center mb-2">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm text-gray-600">Mobile</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-12 bg-gray-800 rounded-lg border-2 border-gray-600 flex items-center justify-center mb-2">
                  <Laptop className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm text-gray-600">Laptop</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 rounded-lg border-2 border-gray-600 flex items-center justify-center mb-2">
                  <Tablet className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm text-gray-600">Tablet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DASHED OS?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the next generation of operating systems designed for the modern digital lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-accent-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-accent-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-accent-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-accent-100">Device Types</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-accent-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-accent-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who have transformed their digital experience.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 text-center">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{testimonials[activeTestimonial].author}</div>
                  <div className="text-sm text-gray-600">{testimonials[activeTestimonial].role}</div>
                  <div className="text-sm text-gray-500">{testimonials[activeTestimonial].company}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-accent-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Digital Life?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the DASHED OS revolution today and experience the future of computing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
