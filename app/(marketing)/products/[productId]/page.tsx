import { ProductDetailPage } from "@/components/product/product-detail-page"

interface ProductPageProps {
  params: {
    productId: string
  }
}

// This would normally come from a database or API
const getProductData = (productId: string) => {
  // Hardware products
  if (productId === "dashed-hub") {
    return {
      id: "dashed-hub",
      name: "DASHED Hub",
      price: 299,
      tagline: "Central Command Center",
      description: "The central control unit for your DASHED ecosystem with advanced connectivity options.",
      longDescription:
        "The DASHED Hub is the heart of your connected home or office. It seamlessly connects all your DASHED devices and compatible smart home products into a unified ecosystem. With powerful on-device AI processing, the Hub can handle complex automation tasks without sending your data to the cloud, ensuring both performance and privacy.",
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
      },
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
      relatedProducts: ["dashed-display", "dashed-controller", "dashed-dock"],
      badge: "Best Seller",
    }
  } else if (productId === "dashed-display") {
    return {
      id: "dashed-display",
      name: "DASHED Display",
      price: 499,
      tagline: "Immersive Visualization",
      description: "High-resolution touchscreen display for visualizing and controlling your digital environment.",
      longDescription:
        "The DASHED Display provides a beautiful, responsive interface for controlling your entire DASHED ecosystem. With its crisp 4K resolution and intuitive touch controls, managing your connected devices has never been easier or more enjoyable.",
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
      },
      rating: 4.7,
      reviews: 86,
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      variants: ["Standard", "Pro"],
      type: "hardware",
      relatedProducts: ["dashed-hub", "dashed-controller"],
      badge: "New",
    }
  } else if (productId === "dashed-controller") {
    return {
      id: "dashed-controller",
      name: "DASHED Controller",
      price: 199,
      tagline: "Intuitive Control",
      description: "Ergonomic handheld controller for precise interaction with your DASHED ecosystem.",
      longDescription:
        "The DASHED Controller puts the power of your entire digital ecosystem in the palm of your hand. Designed for comfort during extended use, this precision controller features programmable buttons and advanced motion sensing for intuitive control of all your connected devices.",
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
      },
      rating: 4.6,
      reviews: 64,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      variants: ["Standard", "Pro", "Gaming"],
      type: "hardware",
      relatedProducts: ["dashed-hub", "dashed-display"],
      badge: "Sale",
    }
  } else if (productId === "dashed-os-personal") {
    return {
      id: "dashed-os-personal",
      name: "DASHED OS Personal",
      price: 9.99,
      period: "monthly",
      tagline: "Your Digital Life, Unified",
      description: "The core operating system that powers your personal digital environment.",
      longDescription:
        "DASHED OS Personal brings all your digital experiences together in one seamless interface. Synchronize your devices, automate your routines, and enjoy a consistent experience across all your technology. With powerful AI assistance and bank-level security, DASHED OS Personal is the foundation of your modern digital life.",
      features: [
        "Cross-device synchronization for seamless transitions",
        "AI assistant for personalized recommendations and automation",
        "Customizable interface to match your workflow",
        "Secure cloud backup with end-to-end encryption",
        "App integration with thousands of popular services",
        "Advanced privacy controls and permissions management",
        "Usage insights and digital wellbeing tools",
        "Regular feature updates and security patches",
      ],
      rating: 4.9,
      reviews: 215,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      type: "software",
      relatedProducts: ["dashed-os-family", "dashed-os-pro"],
      badge: "Most Popular",
    }
  }

  // Default product if ID doesn't match
  return {
    id: productId,
    name: "DASHED Product",
    price: 199,
    tagline: "Innovative Technology",
    description: "A revolutionary product in the DASHED ecosystem.",
    longDescription:
      "This DASHED product is designed to enhance your digital experience with cutting-edge technology and seamless integration with the DASHED ecosystem.",
    features: [
      "Seamless integration with DASHED OS",
      "Advanced connectivity options",
      "Energy-efficient design",
      "Regular software updates",
    ],
    specs: {
      dimensions: "5.0 × 5.0 × 2.0 inches",
      weight: "10 oz",
      connectivity: "Wi-Fi, Bluetooth",
    },
    rating: 4.5,
    reviews: 42,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    variants: ["Standard", "Pro"],
    type: "hardware",
    relatedProducts: [],
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductData(params.productId)
  return <ProductDetailPage product={product} />
}
