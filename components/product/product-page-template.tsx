"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, StarHalf, Shield, Truck, RotateCcw, Check, ChevronRight, ArrowRight } from "lucide-react"
import { useToastContext } from "@/components/providers/toast-provider"
import { motion } from "framer-motion"

interface ProductSpec {
  [key: string]: string
}

interface UseCase {
  title: string
  description: string
  icon: React.ReactNode
}

interface ProductPageTemplateProps {
  product: {
    id: string
    name: string
    price: number
    tagline?: string
    description: string
    longDescription: string
    features: string[]
    specs: ProductSpec
    useCases: UseCase[]
    benefits: string[]
    rating: number
    reviews: number
    images: string[]
    variants?: string[]
    type?: "hardware" | "software"
    period?: string
    relatedProducts?: {
      id: string
      name: string
      image: string
      price: number
    }[]
    badge?: string
  }
}

export function ProductPageTemplate({ product }: ProductPageTemplateProps) {
  const { toast } = useToastContext()
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || "Standard")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [isZoomed, setIsZoomed] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-accent-500 text-accent-500" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-accent-500 text-accent-500" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedVariant}) has been added to your cart.`,
      type: "success",
      duration: 3000,
    })
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? `${product.name} has been removed from your favorites.`
        : `${product.name} has been added to your favorites.`,
      type: "info",
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
    <div className="bg-white">
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

        {/* Breadcrumb */}
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-accent-500">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/products" className="hover:text-accent-500">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-accent-500">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="space-y-4">
                {product.badge && (
                  <Badge variant="new" className="mb-2">
                    {product.badge}
                  </Badge>
                )}
                <h1 className="text-4xl font-bold text-accent-700">{product.name}</h1>
                <p className="text-xl text-accent-500 font-medium">{product.tagline}</p>
                <p className="text-gray-600">{product.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-3xl font-bold text-accent-700">${product.price}</span>
                  <Button
                    className="bg-accent-500 hover:bg-accent-600 text-white group transition-all duration-300 transform hover:scale-105"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div
                className="aspect-square relative overflow-hidden rounded-lg bg-white border border-gray-200 shadow-lg cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className={`object-contain p-8 transition-transform duration-500 ${isZoomed ? "scale-150" : "scale-100"}`}
                />
                {isZoomed && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                    <span className="text-sm">Click to zoom out</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square relative overflow-hidden rounded-lg bg-white border transition-all duration-300 ${
                      selectedImage === image
                        ? "border-accent-500 ring-2 ring-accent-200 shadow-md"
                        : "border-gray-200 hover:border-accent-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b mb-0 rounded-none bg-transparent space-x-8">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-accent-500 data-[state=active]:text-accent-700 rounded-none border-b-2 border-transparent pb-2 pt-0 px-1"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-accent-500 data-[state=active]:text-accent-700 rounded-none border-b-2 border-transparent pb-2 pt-0 px-1"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-accent-500 data-[state=active]:text-accent-700 rounded-none border-b-2 border-transparent pb-2 pt-0 px-1"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="usecases"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-accent-500 data-[state=active]:text-accent-700 rounded-none border-b-2 border-transparent pb-2 pt-0 px-1"
                >
                  Use Cases
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="prose prose-gray max-w-none"
                >
                  <h2 className="text-2xl font-bold text-accent-700 mb-4">About {product.name}</h2>
                  <p className="text-gray-600">{product.longDescription}</p>

                  <h3 className="text-xl font-bold text-accent-700 mt-8 mb-4">Key Benefits</h3>
                  <ul className="space-y-3">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </TabsContent>

              <TabsContent value="features" className="mt-8">
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                  <h2 className="text-2xl font-bold text-accent-700 mb-4">Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        variants={item}
                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-start">
                          <div className="bg-accent-50 rounded-full p-2 mr-4">
                            <Check className="h-5 w-5 text-accent-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">{feature}</h3>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="specs" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-accent-700 mb-4">Technical Specifications</h2>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="border-b border-gray-100 pb-2">
                          <dt className="text-sm font-medium text-gray-500 capitalize">{key}</dt>
                          <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="usecases" className="mt-8">
                <motion.div variants={container} initial="hidden" animate="show">
                  <h2 className="text-2xl font-bold text-accent-700 mb-4">Use Cases</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {product.useCases.map((useCase, index) => (
                      <motion.div
                        key={index}
                        variants={item}
                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start">
                          <div className="bg-accent-50 rounded-full p-3 mr-4">{useCase.icon}</div>
                          <div>
                            <h3 className="font-medium text-lg text-gray-900 mb-1">{useCase.title}</h3>
                            <p className="text-gray-600">{useCase.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Available Variants</h3>
                <div className="space-y-3">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant}
                      variant={selectedVariant === variant ? "default" : "outline"}
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-full justify-start ${selectedVariant === variant ? "bg-accent-500" : ""}`}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose {product.name}</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-accent-500 mr-3" />
                  <span className="text-gray-600">2-Year Warranty</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-accent-500 mr-3" />
                  <span className="text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-5 w-5 text-accent-500 mr-3" />
                  <span className="text-gray-600">30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Products</h3>
                <div className="space-y-4">
                  {product.relatedProducts.map((relatedProduct) => (
                    <Link
                      key={relatedProduct.id}
                      href={`/products/${relatedProduct.id}`}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{relatedProduct.name}</p>
                        <p className="text-sm text-accent-500">${relatedProduct.price}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-accent-600 to-accent-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to experience the {product.name}?
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
            <Button
              className="bg-white text-accent-600 hover:bg-accent-50 transition-all duration-300 transform hover:scale-105"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-accent-500 transition-all duration-300 transform hover:scale-105"
              onClick={handleToggleFavorite}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
