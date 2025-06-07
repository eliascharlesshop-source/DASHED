import { ProductPageTemplate } from "@/components/product/product-page-template"
import { Usb, Battery, Cable } from "lucide-react"

const product = {
  id: "dashed-dock",
  name: "DASHED Dock",
  price: 149,
  tagline: "Seamless Connectivity",
  description: "Connect and charge multiple DASHED devices with this elegant docking station.",
  longDescription:
    "The DASHED Dock is the ultimate connectivity solution for your DASHED ecosystem. This elegantly designed docking station provides fast charging for all your DASHED devices while enabling seamless data synchronization. With multiple ports and expandable connectivity options, the DASHED Dock serves as a central hub for your digital workspace. The built-in cable management system keeps your setup clean and organized, while the sleek design complements any environment. Whether at home or in the office, the DASHED Dock enhances your productivity by keeping all your devices charged and connected.",
  features: [
    "Fast charging for multiple DASHED devices simultaneously",
    "Data synchronization across connected devices",
    "Multiple connectivity options including USB-C, USB-A, HDMI, and Ethernet",
    "Integrated cable management system",
    "Expandable port selection with modular design",
    "Compact footprint with vertical orientation option",
    "Compatible with all DASHED hardware products",
    "Elegant design with ambient status lighting",
  ],
  specs: {
    ports: "4× USB-C, 2× USB-A, HDMI, Ethernet",
    power: "100W Power Delivery",
    dataTransfer: "Up to 40Gbps",
    compatibility: "All DASHED devices",
    dimensions: "7.5 × 3.2 × 1.0 inches",
    weight: "9.8 oz",
    powerInput: "120-240V AC",
    materials: "Aluminum and high-grade polymer",
  },
  useCases: [
    {
      title: "Workstation Hub",
      description:
        "Create a centralized charging and connectivity station for all your DASHED devices in your home office.",
      icon: <Usb className="h-6 w-6 text-accent-500" />,
    },
    {
      title: "Charging Station",
      description: "Keep all your DASHED devices charged and ready to use with fast charging capabilities.",
      icon: <Battery className="h-6 w-6 text-accent-500" />,
    },
    {
      title: "Connectivity Center",
      description:
        "Connect external displays, storage, and peripherals to expand your DASHED ecosystem's capabilities.",
      icon: <Cable className="h-6 w-6 text-accent-500" />,
    },
  ],
  benefits: [
    "Simplified charging for all your DASHED devices",
    "Reduced cable clutter with integrated management",
    "Enhanced connectivity options for your digital workspace",
    "Elegant design that complements any environment",
    "Future-proof expandability with modular design",
  ],
  rating: 4.5,
  reviews: 42,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  variants: ["Standard", "Pro", "Mini"],
  type: "hardware",
  relatedProducts: [
    {
      id: "dashed-hub",
      name: "DASHED Hub",
      image: "/placeholder.svg?height=100&width=100",
      price: 299,
    },
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
  ],
  badge: "Essential",
}

export default function DashedDockPage() {
  return <ProductPageTemplate product={product} />
}
