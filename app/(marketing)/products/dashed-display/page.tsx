import { ProductPageTemplate } from "@/components/product/product-page-template"
import { Monitor, Eye, Smartphone } from "lucide-react"

const product = {
  id: "dashed-display",
  name: "DASHED Display",
  price: 499,
  tagline: "Immersive Visualization",
  description: "High-resolution touchscreen display for visualizing and controlling your digital environment.",
  longDescription:
    "The DASHED Display provides a beautiful, responsive interface for controlling your entire DASHED ecosystem. With its crisp 4K resolution and intuitive touch controls, managing your connected devices has never been easier or more enjoyable. The adaptive brightness ensures optimal viewing in any lighting condition, while the sleek design complements any space. Mount it on a wall or use the included stand to place it on any surface for convenient access to your digital world.",
  features: [
    "10.1-inch 4K Ultra HD touchscreen display",
    "Adaptive brightness for optimal viewing in any lighting",
    "Intuitive gesture controls for seamless navigation",
    "Voice command support for hands-free operation",
    "Customizable dashboard with widget support",
    "Picture-in-picture monitoring of connected cameras",
    "Ambient mode with personalized information display",
    "Wall-mountable with included hardware",
  ],
  specs: {
    display: "10.1-inch 4K Ultra HD",
    resolution: "3840 × 2160 pixels",
    touchscreen: "10-point multi-touch capacitive",
    processor: "Octa-core 3.0GHz",
    memory: "6GB RAM",
    storage: "64GB flash",
    connectivity: "Wi-Fi 6, Bluetooth 5.2",
    dimensions: "9.5 × 6.8 × 0.3 inches",
    weight: "1.2 lbs",
    power: "12W, USB-C power delivery",
    operatingSystem: "DASHED OS 2.0",
  },
  useCases: [
    {
      title: "Command Center",
      description:
        "Mount in a central location to control all your smart home devices, view security cameras, and monitor energy usage.",
      icon: <Monitor className="h-6 w-6 text-accent-500" />,
    },
    {
      title: "Digital Assistant",
      description:
        "Place on your desk or kitchen counter for quick access to schedules, weather, news, and smart home controls.",
      icon: <Eye className="h-6 w-6 text-accent-500" />,
    },
    {
      title: "Room Controller",
      description:
        "Install in individual rooms to control room-specific devices like lights, temperature, and entertainment systems.",
      icon: <Smartphone className="h-6 w-6 text-accent-500" />,
    },
  ],
  benefits: [
    "Intuitive visual control of your DASHED ecosystem",
    "Elegant design that enhances any space",
    "Responsive touch interface for quick access to controls",
    "Customizable display to show the information that matters most to you",
    "Seamless integration with all DASHED devices",
  ],
  rating: 4.7,
  reviews: 86,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  variants: ["Standard", "Pro"],
  type: "hardware",
  relatedProducts: [
    {
      id: "dashed-hub",
      name: "DASHED Hub",
      image: "/placeholder.svg?height=100&width=100",
      price: 299,
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
  badge: "New",
}

export default function DashedDisplayPage() {
  return <ProductPageTemplate product={product} />
}
