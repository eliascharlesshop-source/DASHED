"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface FeatureAlternateProps {
  title: string
  description: string
  imagePosition: "left" | "right"
}

export function FeatureAlternate({ title, description, imagePosition }: FeatureAlternateProps) {
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
    <section ref={sectionRef} className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div
          className={`flex flex-col ${imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
        >
          <div
            className={`flex flex-col gap-4 md:w-1/2 transform transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : `${imagePosition === "right" ? "-translate-x-10" : "translate-x-10"} opacity-0`
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">{title}</h2>
            <p className="text-lg text-gray-600">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-accent-300 text-accent-600 hover:bg-accent-50">
                Learn More
              </Button>
            </div>
          </div>
          <div
            className={`md:w-1/2 transform transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : `${imagePosition === "right" ? "translate-x-10" : "-translate-x-10"} opacity-0`
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-white shadow-sm border border-gray-200 aspect-video rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-100 to-accent-50"></div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt={title}
                width={500}
                height={300}
                className="object-cover hover-lift"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
