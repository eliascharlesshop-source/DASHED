"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { GetStartedFlow } from "@/components/onboarding/get-started-flow"
import { motion } from "framer-motion"

interface HeroSectionProps {
  title: string
  description: string
}

export function HeroSection({ title, description }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)

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

  const handleGetStarted = () => {
    setIsGetStartedOpen(true)
  }

  return (
    <>
      <section ref={sectionRef} className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-50 to-white z-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Content */}
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-accent-700 mb-6"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-accent-500 hover:bg-accent-600 text-white group transition-all duration-300 transform hover:scale-105"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent-300 text-accent-600 hover:bg-accent-50 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="container px-4 md:px-6 mt-12 relative z-10"
        >
          <div className="glass-effect mx-auto aspect-video overflow-hidden rounded-lg flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-500/10 to-accent-200/10"></div>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="relative z-10 w-full h-full p-6">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-full max-w-4xl relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="absolute -top-6 -left-6 md:top-0 md:-left-16 w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center p-4 transform rotate-6"
                  >
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Dashboard Widget"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="absolute -bottom-6 -right-6 md:bottom-0 md:-right-16 w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center p-4 transform -rotate-6"
                  >
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Control Panel"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </motion.div>

                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="DASHED OS Interface"
                    width={800}
                    height={400}
                    className="object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Animated dots pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -bottom-8 left-0 right-0 h-40">
              <div className="grid grid-cols-12 gap-4 h-full">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * i }}
                    className="w-2 h-2 rounded-full bg-accent-500"
                  ></motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Get Started Flow */}
      <GetStartedFlow isOpen={isGetStartedOpen} onClose={() => setIsGetStartedOpen(false)} />
    </>
  )
}
