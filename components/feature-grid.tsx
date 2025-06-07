"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Layers, Zap, RefreshCw, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

export function FeatureGrid() {
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

  const features = [
    {
      title: "Modular Widgets",
      description: "Tailor your digital experience with a wide array of customizable widgets.",
      icon: <Layers className="h-10 w-10 text-accent-500" />,
      delay: 0,
    },
    {
      title: "Fast Performance",
      description: "Optimized for speed and efficiency across all your devices.",
      icon: <Zap className="h-10 w-10 text-accent-500" />,
      delay: 100,
    },
    {
      title: "Seamless Sync",
      description: "Your data and preferences follow you across all devices.",
      icon: <RefreshCw className="h-10 w-10 text-accent-500" />,
      delay: 200,
    },
    {
      title: "Device Control",
      description: "Manage and control all your smart devices from one interface.",
      icon: <Smartphone className="h-10 w-10 text-accent-500" />,
      delay: 300,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 lg:py-32 bg-accent-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #0077B5 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            DASHED OS comes packed with features that make your digital life seamless and efficient.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="mb-4 relative">
                <div className="absolute -inset-1 bg-accent-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Button variant="link" className="p-0 text-accent-500 hover:text-accent-600 group-hover:underline">
                Learn more{" "}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
