import { ProductPageTemplate } from "@/components/product/product-page-template"
import { Gamepad2, Hand, Mic } from "lucide-react"

const product = {
  id: "dashed-controller",
  name: "DASHED Controller",
  price: 199,
  tagline: "Intuitive Control",
  description: "Ergonomic handheld controller for precise interaction with your DASHED ecosystem.",
  longDescription:
    "The DASHED Controller puts the power of your entire digital ecosystem in the palm of your hand. Designed for comfort during extended use, this precision controller features programmable buttons and advanced motion sensing for intuitive control of all your connected devices. The built-in microphone enables voice commands, while haptic feedback provides a tactile response to your actions. Whether you're managing your smart home, navigating media, or controlling specialized equipment, the DASHED Controller offers unparalleled precision and convenience.",
  features: [
    "Ergonomic design for comfortable extended use",
    "Haptic feedback for immersive interaction",
    "6-axis motion sensing for precise control",
    "12 programmable buttons for customized operation",
    "Voice input for quick commands",
    "20-hour rechargeable battery life",
    "Find My Controller feature with audio alert",
    "Seamless switching between multiple DASHED devices",
  ],
  specs: {
    buttons: "12 programmable buttons",
    sensors: "6-axis motion sensing",
    microphone: "Dual-microphone array with noise cancellation",
    battery: "20 hours rechargeable lithium-ion",
    charging: "USB-C fast charging",
    connectivity: "Bluetooth 5.2, RF 2.4GHz",
    dimensions: "6.2 × 2.4 × 1.1 inches",
    weight: "7.2 oz",
    compatibility: "All DASHED devices",
    range: "Up to 30 feet",
  },
  useCases: [
    {
      title: "Smart Home Navigation",
      description:
        "Control lights, thermostats, blinds, and entertainment systems with precision from anywhere in your home.",
      icon: <Hand className="h-6 w-6 text-accent-500" />,
    },
    {
      title: "Media Control",
      description:
        "Navigate streaming services, control volume, and manage playback with intuitive gestures and buttons.",
      icon: <Gamepad2 className="h-6 w-6 text-accent-500" />,
    },
    {
      title: "Voice Command Hub",
      description:
        "Use the built-in microphone for voice commands to control your DASHED ecosystem when your hands are full.",
      icon: <Mic className="h-6 w-6 text-accent-500" />,
    },
  ],
  benefits: [
    "Precise control of your digital environment from anywhere in your home",
    "Comfortable design that prevents fatigue during extended use",
    "Customizable buttons to match your specific needs",
    "Long battery life for reliable operation",
    "Multiple input methods for maximum flexibility",
  ],
  rating: 4.6,
  reviews: 64,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  variants: ["Standard", "Pro", "Gaming"],
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
      id: "dashed-dock",
      name: "DASHED Dock",
      image: "/placeholder.svg?height=100&width=100",
      price: 149,
    },
  ],
  badge: "Sale",
}

export default function DashedControllerPage() {
  return <ProductPageTemplate product={product} />
}
