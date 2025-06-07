import { ProductPageTemplate } from "@/components/product/product-page-template"
import { Shield, Zap, Smartphone } from "lucide-react"

const product = {
  id: "dashed-hub",
  name: "DASHED Hub",
  price: 299,
  tagline: "Central Command Center",
  description: "The central control unit for your DASHED ecosystem with advanced connectivity options.",
  longDescription:
    "The DASHED Hub is the heart of your connected home or office. It seamlessly connects all your DASHED devices and compatible smart home products into a unified ecosystem. With powerful on-device AI processing, the Hub can handle complex automation tasks without sending your data to the cloud, ensuring both performance and privacy. The sleek, minimalist design fits perfectly in any environment, while the intuitive interface makes managing your digital life effortless.",
  features: [
    "Multi-device connectivity with support for up to 100 devices",
    "Advanced voice control with natural language processing",
    "On-device AI for faster response times and enhanced privacy",
    "Military-grade encryption for all communications",
    "Automatic device discovery and configuration",
    "Energy monitoring and optimization",
    "Customizable automation rules and schedules",
    "Over-the-air updates for continuous improvement",
  ],
  specs: {
    processor: "Quad-core 2.4GHz",
    memory: "8GB RAM",
    storage: "128GB SSD",
    connectivity: "Wi-Fi 6, Bluetooth 5.2, Zigbee, Z-Wave",
    dimensions: "5.2 × 5.2 × 1.8 inches",
    weight: "12.6 oz",
    power: "15W, 100-240V AC adapter included",
    operatingSystem: "DASHED OS 2.0",
  },
  useCases: [
    {
      title: "Smart Home Control",
      description:
        "Centralize control of lights, thermostats, security systems, and entertainment devices for a truly automated home experience.",
      icon: <Shield className="h-6 w-6 text-accent-500" />,
    },
    {
      title: "Productivity Hub",
      description:
        "Connect your work devices to create automated workflows that boost your productivity and streamline your daily tasks.",
      icon: <Zap className="h-6 w-6 text-accent-500" />,
    },
    {
      title: "Entertainment Center",
      description:
        "Control your media devices, streaming services, and gaming systems from a single interface with voice commands.",
      icon: <Smartphone className="h-6 w-6 text-accent-500" />,
    },
  ],
  benefits: [
    "Simplified control of your entire digital ecosystem",
    "Enhanced privacy with local processing of sensitive data",
    "Reduced energy consumption through intelligent device management",
    "Future-proof design with regular software updates",
    "Seamless integration with existing smart home products",
  ],
  rating: 4.8,
  reviews: 128,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  variants: ["Standard", "Pro", "Enterprise"],
  type: "hardware",
  relatedProducts: [
    {
      id: "dashed-display",
      name: "DASHED Display",
      image: "/placeholder.svg?height=100&width=100",
      price: 499,
    },
    {
      id: "dashed-controller",
      name: "DASHED Controller",
      image: "/placeholder.svg?height=100&width=100",
      price: 199,
    },
    {
      id: "dashed-dock",
      name: "DASHED Dock",
      image: "/placeholder.svg?height=100&width=100",
      price: 149,
    },
  ],
  badge: "Best Seller",
}

export default function DashedHubPage() {
  return <ProductPageTemplate product={product} />
}
