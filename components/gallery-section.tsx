"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface GallerySectionProps {
  title: string
  description: string
}

export function GallerySection({ title, description }: GallerySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 lg:py-32 bg-accent-50">
      <div className="container px-4 md:px-6 text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold gradient-text mb-4 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mx-auto max-w-2xl text-lg text-gray-600 mb-8 transform transition-all duration-700 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {description}
        </p>
        <div
          className={`flex flex-col sm:flex-row justify-center gap-4 mb-12 transform transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Button className="bg-accent-500 hover:bg-accent-600 text-white">
            Explore Devices <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="border-accent-300 text-accent-600 hover:bg-accent-50">
            View Demo
          </Button>
        </div>
      </div>

      <div
        className={`container px-4 md:px-6 transform transition-all duration-1000 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          <div className="col-span-1 aspect-square bg-white shadow-sm border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden hover-lift">
            <Image
              src="/placeholder.svg?height=150&width=150"
              alt="Gallery 1"
              width={150}
              height={150}
              className="object-cover"
            />
          </div>
          <div
            className="col-span-1 aspect-square bg-white shadow-sm border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden hover-lift"
            style={{ transitionDelay: "400ms" }}
          >
            <Image
              src="/placeholder.svg?height=150&width=150"
              alt="Gallery 2"
              width={150}
              height={150}
              className="object-cover"
            />
          </div>
          <div
            className="col-span-1 md:col-span-3 row-span-2 aspect-square md:aspect-auto glass-effect rounded-lg flex items-center justify-center overflow-hidden hover-lift"
            style={{ transitionDelay: "500ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-500/10 to-accent-200/10"></div>
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Gallery Main"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
          <div
            className="col-span-1 aspect-square bg-white shadow-sm border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden hover-lift"
            style={{ transitionDelay: "600ms" }}
          >
            <Image
              src="/placeholder.svg?height=150&width=150"
              alt="Gallery 3"
              width={150}
              height={150}
              className="object-cover"
            />
          </div>
          <div
            className="col-span-1 aspect-square bg-white shadow-sm border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden hover-lift"
            style={{ transitionDelay: "700ms" }}
          >
            <Image
              src="/placeholder.svg?height=150&width=150"
              alt="Gallery 4"
              width={150}
              height={150}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
