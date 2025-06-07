"use client"

import { useToastContext } from "@/components/providers/toast-provider"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Shield, Zap, Layers, Heart, ShoppingCart, Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { useState } from "react"

const hardwareProducts = [
  {
    id: "dashed-hub",
    name: "DASHED Hub",
    price: 299,
    tagline: "Central Command Center",
    description: "The central control unit for your DASHED ecosystem with advanced connectivity options.",
    features: ["Multi-device connectivity", "Voice control", "AI processing", "Secure encryption"],
    image: "/placeholder.svg?height=400&width=400",
    badge: "Best Seller",
    specs: {
      processor: "Quad-core 2.4GHz",
      memory: "8GB RAM",
      storage: "128GB SSD",
      connectivity: "Wi-Fi 6, Bluetooth 5.2, Zigbee, Z-Wave",
      dimensions: "5.2 × 5.2 × 1.8 inches",
      weight: "12.6 oz",
    },
  },
  {
    id: "dashed-display",
    name: "DASHED Display",
    price: 499,
    tagline: "Immersive Visualization",
    description: "High-resolution touchscreen display for visualizing and controlling your digital environment.",
    features: ['10.1" 4K touchscreen', "Adaptive brightness", "Gesture control", "Voice commands"],
    image: "/placeholder.svg?height=400&width=400",
    badge: "New",
    specs: {
      display: '10.1" 4K Ultra HD',
      resolution: "3840 × 2160",
      touchscreen: "Multi-touch capacitive",
      processor: "Octa-core 3.0GHz",
      memory: "6GB RAM",
      connectivity: "Wi-Fi 6, Bluetooth 5.2",
      dimensions: "9.5 × 6.8 × 0.3 inches",
      weight: "1.2 lbs",
    },
  },
  {
    id: "dashed-controller",
    name: "DASHED Controller",
    price: 199,
    tagline: "Intuitive Control",
    description: "Ergonomic handheld controller for precise interaction with your DASHED ecosystem.",
    features: ["Haptic feedback", "Motion sensing", "Programmable buttons", "Voice input"],
    image: "/placeholder.svg?height=400&width=400",
    specs: {
      buttons: "12 programmable buttons",
      sensors: "6-axis motion sensing",
      battery: "20 hours rechargeable",
      connectivity: "Bluetooth 5.2, RF",
      dimensions: "6.2 × 2.4 × 1.1 inches",
      weight: "7.2 oz",
    },
  },
  {
    id: "dashed-dock",
    name: "DASHED Dock",
    price: 149,
    tagline: "Seamless Connectivity",
    description: "Connect and charge multiple DASHED devices with this elegant docking station.",
    features: ["Fast charging", "Data synchronization", "Expandable ports", "Cable management"],
    image: "/placeholder.svg?height=400&width=400",
    specs: {
      ports: "4× USB-C, 2× USB-A, HDMI, Ethernet",
      power: "100W Power Delivery",
      compatibility: "All DASHED devices",
      dimensions: "7.5 × 3.2 × 1.0 inches",
      weight: "9.8 oz",
    },
  },
]

const softwareProducts = [
  {
    id: "dashed-os-personal",
    name: "DASHED OS Personal",
    price: 9.99,
    period: "monthly",
    tagline: "Your Digital Life, Unified",
    description: "The core operating system that powers your personal digital environment.",
    features: ["Cross-device synchronization", "AI assistant", "Customizable interface", "Secure cloud backup"],
    image: "/placeholder.svg?height=400&width=400",
    badge: "Most Popular",
  },
  {
    id: "dashed-os-family",
    name: "DASHED OS Family",
    price: 19.99,
    period: "monthly",
    tagline: "Connected Home Management",
    description: "Manage your entire family's digital ecosystem with advanced parental controls and sharing features.",
    features: ["Up to 6 user profiles", "Family calendar", "Content filtering", "Location sharing"],
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "dashed-os-pro",
    name: "DASHED OS Pro",
    price: 24.99,
    period: "monthly",
    tagline: "Professional Productivity",
    description: "Enhanced productivity features for professionals and power users.",
    features: ["Advanced automation", "Developer tools", "Priority support", "Extended cloud storage"],
    image: "/placeholder.svg?height=400&width=400",
    badge: "New",
  },
  {
    id: "dashed-os-enterprise",
    name: "DASHED OS Enterprise",
    price: "Custom",
    period: "",
    tagline: "Enterprise-Grade Solutions",
    description: "Scalable solutions for businesses with advanced security and management features.",
    features: ["User management", "Device fleet control", "Security compliance", "API access"],
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function ProductsPage() {
  const { toast } = useToastContext()
  const [activeTab, setActiveTab] = useState("hardware")
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      type: "success",
      duration: 3000,
    })
  }

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
    <TooltipProvider>
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-accent-50 via-white to-accent-50 py-16 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0077B5" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#0077B5" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,0 L100,0 L100,10 C60,20 40,30 0,20 Z" fill="url(#grad1)" />
              <path d="M0,100 L100,100 L100,80 C70,90 30,80 0,90 Z" fill="url(#grad1)" />
            </svg>
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "radial-gradient(circle, #0077B5 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-accent-700 mb-4">DASHED Products</h1>
              <p className="text-lg text-gray-600 mb-6">
                Discover our ecosystem of hardware and software solutions designed to transform your digital experience.
              </p>
              <Button className="bg-accent-500 hover:bg-accent-600 text-white group transition-all duration-300 transform hover:scale-105">
                Explore Solutions
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Floating product previews */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-0 right-0 w-1/3 h-full hidden lg:block"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute top-1/4 right-1/4 w-40 h-40 bg-white rounded-lg shadow-lg p-4 transform rotate-6"
              >
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="DASHED Hub"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-white rounded-lg shadow-lg p-4 transform -rotate-6"
              >
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="DASHED Display"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="hardware" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <div className="flex justify-between items-center mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TabsList className="grid w-[400px] grid-cols-2 p-1 bg-accent-50 rounded-lg">
                  <TabsTrigger
                    value="hardware"
                    className="text-base relative overflow-hidden transition-all duration-300"
                  >
                    {activeTab === "hardware" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-md shadow-sm"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">Hardware</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="software"
                    className="text-base relative overflow-hidden transition-all duration-300"
                  >
                    {activeTab === "software" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-md shadow-sm"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">Software</span>
                  </TabsTrigger>
                </TabsList>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Link href="#" className="text-accent-500 hover:text-accent-600 font-medium flex items-center group">
                  View all products{" "}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Hardware Products */}
            <TabsContent value="hardware" className="mt-0">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              >
                {hardwareProducts.slice(0, 2).map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <Link
                      href={`/products/${product.id}`}
                      className="group block"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col transform hover:-translate-y-2">
                        <div className="relative">
                          {product.badge && (
                            <div className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                              {product.badge}
                            </div>
                          )}
                          <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-50 to-accent-50">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Quick action buttons */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="flex gap-2">
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="rounded-full bg-white shadow-md hover:bg-accent-50"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    toast({
                                      title: "Added to favorites",
                                      description: `${product.name} has been added to your favorites.`,
                                      type: "info",
                                      duration: 3000,
                                    })
                                  }}
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="rounded-full bg-white shadow-md hover:bg-accent-50"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleAddToCart(product)
                                  }}
                                >
                                  <ShoppingCart className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="rounded-full bg-white shadow-md hover:bg-accent-50"
                                  className="rounded-full bg-white shadow-md hover:bg-accent-50"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-1 group-hover:text-accent-600 transition-colors duration-300">
                              {product.name}
                            </h3>
                            <p className="text-accent-500 font-medium">{product.tagline}</p>
                          </div>
                          <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features</h4>
                            <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                              {product.features.map((feature, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mr-2"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-between items-center mt-auto">
                            <span className="text-xl font-bold text-accent-700">${product.price}</span>
                            <Button className="bg-accent-500 hover:bg-accent-600 text-white transition-all duration-300 transform group-hover:scale-105">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {hardwareProducts.slice(0, 4).map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <Link href={`/products/${product.id}`} className="group block">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2">
                        <div className="relative">
                          {product.badge && (
                            <div className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                              {product.badge}
                            </div>
                          )}
                          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-accent-50">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Product quick actions overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex justify-center gap-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      className="bg-white/90 hover:bg-white"
                                      onClick={(e) => {
                                        e.preventDefault()
                                        handleAddToCart(product)
                                      }}
                                    >
                                      Add to Cart
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Add {product.name} to your cart</p>
                                  </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="secondary"
                                      className="bg-white/90 hover:bg-white"
                                      onClick={(e) => {
                                        e.preventDefault()
                                        toast({
                                          title: "Added to favorites",
                                          description: `${product.name} has been added to your favorites.`,
                                          type: "info",
                                          duration: 3000,
                                        })
                                      }}
                                    >
                                      <Heart className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Add to favorites</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="text-lg font-bold mb-1 group-hover:text-accent-600 transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="text-accent-500 text-sm font-medium mb-2">{product.tagline}</p>
                          <div className="mb-3 flex-grow">
                            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                          </div>
                          <div className="flex justify-between items-center mt-auto">
                            <span className="text-lg font-bold text-accent-700">${product.price}</span>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-accent-500 border-accent-200 hover:bg-accent-50"
                              >
                                Details
                              </Button>
                              <Button
                                size="sm"
                                className="bg-accent-500 hover:bg-accent-600 text-white"
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleAddToCart(product)
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Software Products */}
            <TabsContent value="software" className="mt-0">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              >
                {softwareProducts.slice(0, 2).map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <Link href={`/products/${product.id}`} className="group block">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2">
                        <div className="relative">
                          {product.badge && (
                            <div className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                              {product.badge}
                            </div>
                          )}
                          <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-accent-50 to-accent-100">
                            {/* Animated background elements */}
                            <div className="absolute inset-0">
                              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                            </div>

                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain p-8 transition-transform duration-500 group-hover:scale-110 relative z-10"
                            />
                          </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-1 group-hover:text-accent-600 transition-colors duration-300">
                              {product.name}
                            </h3>
                            <p className="text-accent-500 font-medium">{product.tagline}</p>
                          </div>
                          <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features</h4>
                            <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                              {product.features.map((feature, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mr-2"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-between items-center mt-auto">
                            <div>
                              <span className="text-xl font-bold text-accent-700">
                                {typeof product.price === "number" ? `$${product.price}` : product.price}
                              </span>
                              {product.period && <span className="text-sm text-gray-500">/{product.period}</span>}
                            </div>
                            <Button className="bg-accent-500 hover:bg-accent-600 text-white transition-all duration-300 transform group-hover:scale-105">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {softwareProducts.map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <Link href={`/products/${product.id}`} className="group block">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2">
                        <div className="relative">
                          {product.badge && (
                            <div className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                              {product.badge}
                            </div>
                          )}
                          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-accent-50 to-accent-100">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Product quick actions overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex justify-center gap-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="bg-white/90 hover:bg-white"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleAddToCart(product)
                                  }}
                                >
                                  Add to Cart
                                </Button>

                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="bg-white/90 hover:bg-white"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    toast({
                                      title: "Added to favorites",
                                      description: `${product.name} has been added to your favorites.`,
                                      type: "info",
                                      duration: 3000,
                                    })
                                  }}
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="text-lg font-bold mb-1 group-hover:text-accent-600 transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="text-accent-500 text-sm font-medium mb-2">{product.tagline}</p>
                          <div className="mb-3 flex-grow">
                            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                          </div>
                          <div className="flex justify-between items-center mt-auto">
                            <div>
                              <span className="text-lg font-bold text-accent-700">
                                {typeof product.price === "number" ? `$${product.price}` : product.price}
                              </span>
                              {product.period && <span className="text-sm text-gray-500">/{product.period}</span>}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-accent-500 border-accent-200 hover:bg-accent-50"
                              >
                                Details
                              </Button>
                              <Button
                                size="sm"
                                className="bg-accent-500 hover:bg-accent-600 text-white"
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleAddToCart(product)
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Product Ecosystem Section */}
        <div className="bg-accent-50 py-16 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0077B5" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-accent-700 mb-4">The DASHED Ecosystem</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our hardware and software work seamlessly together to create a unified digital experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 text-accent-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure by Design</h3>
                <p className="text-gray-600">
                  End-to-end encryption and advanced security protocols protect your data across all devices.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 text-accent-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Seamless Integration</h3>
                <p className="text-gray-600">
                  All DASHED products work together instantly with zero configuration required.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 text-accent-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expandable Platform</h3>
                <p className="text-gray-600">
                  Add new capabilities through our marketplace of extensions and third-party integrations.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Compare Products Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-accent-700 mb-4">Compare Products</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Find the perfect DASHED solution for your needs.</p>
          </motion.div>

          <div className="flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="bg-accent-500 hover:bg-accent-600 text-white group transition-all duration-300 transform hover:scale-105">
                  View Comparison Chart
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compare all DASHED products side by side</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-accent-600 to-accent-700 py-16 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  fill="#FFFFFF"
                  d="M47.1,-57.5C59.9,-47.3,68.7,-31.6,72.1,-14.6C75.6,2.4,73.8,20.7,65.2,35.3C56.7,49.9,41.4,60.8,24.4,67.2C7.3,73.6,-11.5,75.5,-29.6,70.5C-47.7,65.4,-65.1,53.3,-73.6,36.9C-82.1,20.4,-81.7,-0.5,-74.2,-17.8C-66.7,-35.1,-52.1,-48.8,-37,-57.2C-21.9,-65.6,-6.4,-68.7,8.6,-68.1C23.6,-67.5,34.3,-67.7,47.1,-57.5Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Ready to transform your digital experience?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of users who have already upgraded to the DASHED ecosystem.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button className="bg-white text-accent-600 hover:bg-accent-50 transition-all duration-300 transform hover:scale-105">
                Shop Hardware
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-accent-500 transition-all duration-300 transform hover:scale-105"
              >
                Explore Software
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </TooltipProvider>
  )
}
