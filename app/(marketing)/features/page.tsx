"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Layers,
  Shield,
  Lock,
  Zap,
  Globe,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  CheckCircle2,
  Terminal,
  Code,
  RefreshCw,
  Eye,
  FileText,
  Settings,
  Cpu,
} from "lucide-react"

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("windows")
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  const compatibilityPlatforms = [
    {
      id: "windows",
      name: "Windows",
      icon: <Monitor className="h-6 w-6" />,
      description:
        "DASHED OS seamlessly integrates with Windows 10 and 11, enhancing your workflow while preserving all native functionality.",
      features: [
        "Unified file system access across devices",
        "Enhanced security layer without compromising Windows features",
        "Seamless transition between Windows and DASHED interfaces",
        "Performance optimization for Windows applications",
      ],
    },
    {
      id: "macos",
      name: "macOS",
      icon: <Laptop className="h-6 w-6" />,
      description:
        "Experience the best of both worlds with DASHED OS layered over macOS, maintaining Apple's design philosophy while adding cross-platform capabilities.",
      features: [
        "Continuity features extended to non-Apple devices",
        "Enhanced privacy controls beyond macOS defaults",
        "Cross-platform AirDrop-like functionality",
        "Seamless integration with macOS shortcuts and workflows",
      ],
    },
    {
      id: "linux",
      name: "Linux",
      icon: <Terminal className="h-6 w-6" />,
      description:
        "DASHED OS respects the open-source philosophy of Linux while adding enterprise-grade security and cross-device synchronization.",
      features: [
        "Maintains full compatibility with Linux package managers",
        "Enhanced security without compromising open-source values",
        "Simplified configuration with GUI for complex Linux settings",
        "Cross-platform synchronization for Linux environments",
      ],
    },
    {
      id: "android",
      name: "Android",
      icon: <Smartphone className="h-6 w-6" />,
      description:
        "Transform your Android experience with DASHED OS, adding seamless integration with your desktop environment and enhanced privacy features.",
      features: [
        "Unified notification system across all devices",
        "Enhanced privacy controls for Android applications",
        "Seamless file transfer between Android and other platforms",
        "Extended battery life through intelligent resource management",
      ],
    },
    {
      id: "ios",
      name: "iOS",
      icon: <Tablet className="h-6 w-6" />,
      description:
        "DASHED OS extends iOS capabilities beyond Apple's ecosystem, while maintaining the security and simplicity iOS users expect.",
      features: [
        "Cross-platform continuity with non-Apple devices",
        "Enhanced privacy controls beyond iOS defaults",
        "Seamless workflow between iOS and other operating systems",
        "Extended functionality without compromising iOS security model",
      ],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-b from-accent-50 to-white"
      >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0077B5" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-accent-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob"></div>
            <div className="absolute top-[60%] -left-[10%] w-[50%] h-[50%] bg-accent-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div style={{ opacity, scale, y }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge variant="outline" className="bg-white text-accent-500 border-accent-200 mb-4">
                    DASHED OS
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
                >
                  One OS, <span className="text-accent-500">Every Device</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-gray-600 max-w-lg"
                >
                  DASHED OS layers seamlessly over existing operating systems, creating a unified experience across all
                  your devices regardless of platform.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-accent-500 hover:bg-accent-600 text-white group transition-all duration-300 transform hover:scale-105"
                  >
                    Download DASHED OS
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-accent-300 text-accent-600 hover:bg-accent-50 transition-all duration-300"
                  >
                    View Documentation
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  {/* OS Layer Visualization */}
                  <div className="relative h-[400px] w-full">
                    {/* Base OS Layer */}
                    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-gray-200 rounded-lg shadow-sm border border-gray-300 flex items-center justify-center">
                      <p className="text-gray-500 font-medium">Native OS</p>
                    </div>

                    {/* Middle Layer */}
                    <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-[65%] bg-accent-100 rounded-lg shadow-md border border-accent-200 flex items-center justify-center z-10">
                      <p className="text-accent-600 font-medium">DASHED OS Layer</p>
                    </div>

                    {/* Top Layer (UI) */}
                    <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-white rounded-lg shadow-lg border border-accent-300 z-20">
                      <div className="h-6 bg-accent-500 rounded-t-lg flex items-center px-3">
                        <div className="flex space-x-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                        <div className="ml-3 text-xs text-white">DASHED OS Interface</div>
                      </div>
                      <div className="p-4">
                        <Image
                          src="/feature-gradient-1.svg"
                          alt="DASHED OS Interface"
                          width={400}
                          height={300}
                          className="w-full h-auto rounded-md"
                        />
                      </div>
                    </div>

                    {/* Connection Lines */}
                    <svg
                      className="absolute inset-0 w-full h-full z-30 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="20%" y1="30%" x2="10%" y2="60%" stroke="#0077B5" strokeWidth="2" strokeDasharray="4" />
                      <line x1="80%" y1="30%" x2="90%" y2="60%" stroke="#0077B5" strokeWidth="2" strokeDasharray="4" />
                    </svg>

                    {/* Device Icons */}
                    <div className="absolute top-[70%] left-[10%] bg-white p-3 rounded-full shadow-md z-30">
                      <Laptop className="h-6 w-6 text-accent-500" />
                    </div>
                    <div className="absolute top-[70%] left-[30%] bg-white p-3 rounded-full shadow-md z-30">
                      <Smartphone className="h-6 w-6 text-accent-500" />
                    </div>
                    <div className="absolute top-[70%] left-[50%] bg-white p-3 rounded-full shadow-md z-30">
                      <Tablet className="h-6 w-6 text-accent-500" />
                    </div>
                    <div className="absolute top-[70%] left-[70%] bg-white p-3 rounded-full shadow-md z-30">
                      <Monitor className="h-6 w-6 text-accent-500" />
                    </div>
                    <div className="absolute top-[70%] left-[90%] bg-white p-3 rounded-full shadow-md z-30">
                      <Terminal className="h-6 w-6 text-accent-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Integration</h2>
              <p className="text-xl text-gray-600">
                DASHED OS creates a unified layer that sits on top of your existing operating systems, enabling
                cross-device functionality without replacing what you already use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Layers className="h-8 w-8 text-accent-500" />,
                  title: "Layered Architecture",
                  description:
                    "DASHED OS doesn't replace your existing OS—it enhances it with a lightweight layer that enables cross-device functionality.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-accent-500" />,
                  title: "Secure Sandboxing",
                  description:
                    "All DASHED OS processes run in a secure sandbox, ensuring your native OS remains protected and unmodified.",
                },
                {
                  icon: <RefreshCw className="h-8 w-8 text-accent-500" />,
                  title: "Seamless Synchronization",
                  description:
                    "Your data, settings, and workflows synchronize instantly across all your devices running DASHED OS.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-accent-50 rounded-full p-4 inline-block mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-accent-50 rounded-xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-accent-700">Inspired by TailsOS and Apple Ecosystem</h3>
                  <p className="text-gray-600">
                    DASHED OS combines the security-first approach of TailsOS with the seamless ecosystem integration of
                    Apple's operating systems, while adding cross-platform compatibility that works on any device.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Privacy-Focused Like TailsOS</h4>
                        <p className="text-sm text-gray-600">
                          End-to-end encryption, zero-knowledge architecture, and amnesia feature that leaves no trace.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Seamless Like Apple Ecosystem</h4>
                        <p className="text-sm text-gray-600">
                          Continuity features, handoff functionality, and unified experience across all devices.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Cross-Platform Unlike Both</h4>
                        <p className="text-sm text-gray-600">
                          Works across Windows, macOS, Linux, Android, and iOS without vendor lock-in.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                      <div className="flex items-center mb-3">
                        <Shield className="h-6 w-6 text-accent-500 mr-2" />
                        <h4 className="font-medium">TailsOS Security</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Privacy-focused architecture with amnesia feature and encrypted communications.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                      <div className="flex items-center mb-3">
                        <Laptop className="h-6 w-6 text-accent-500 mr-2" />
                        <h4 className="font-medium">Apple Continuity</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Seamless transition between devices with synchronized workflows.
                      </p>
                    </div>

                    <div className="col-span-2 bg-accent-500 rounded-lg shadow-md p-4 text-white">
                      <div className="flex items-center mb-3">
                        <Layers className="h-6 w-6 text-white mr-2" />
                        <h4 className="font-medium">DASHED OS Advantage</h4>
                      </div>
                      <p className="text-sm">
                        Combines the best of both worlds with added cross-platform compatibility, working on any device
                        regardless of manufacturer.
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 bg-accent-100 w-12 h-12 rounded-full"></div>
                  <div className="absolute -bottom-6 -left-6 bg-accent-100 w-12 h-12 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-accent-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">
                Key Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Capabilities</h2>
              <p className="text-xl text-gray-600">
                DASHED OS comes with a comprehensive set of features designed to enhance your digital experience across
                all devices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="h-8 w-8 text-accent-500" />,
                  title: "Universal Compatibility",
                  description: "Works seamlessly across Windows, macOS, Linux, Android, and iOS devices.",
                },
                {
                  icon: <Lock className="h-8 w-8 text-accent-500" />,
                  title: "End-to-End Encryption",
                  description: "All your data is encrypted on-device with zero-knowledge architecture.",
                },
                {
                  icon: <RefreshCw className="h-8 w-8 text-accent-500" />,
                  title: "Seamless Synchronization",
                  description: "Your files, settings, and workflows sync instantly across all your devices.",
                },
                {
                  icon: <Zap className="h-8 w-8 text-accent-500" />,
                  title: "Performance Optimization",
                  description: "Intelligent resource management enhances your device's performance.",
                },
                {
                  icon: <Eye className="h-8 w-8 text-accent-500" />,
                  title: "Privacy Controls",
                  description: "Granular privacy settings that go beyond what native OS provides.",
                },
                {
                  icon: <FileText className="h-8 w-8 text-accent-500" />,
                  title: "Universal File System",
                  description: "Access and manage files across all your devices regardless of platform.",
                },
                {
                  icon: <Settings className="h-8 w-8 text-accent-500" />,
                  title: "Customizable Interface",
                  description:
                    "Tailor the DASHED OS interface to your preferences while maintaining native OS functionality.",
                },
                {
                  icon: <Cpu className="h-8 w-8 text-accent-500" />,
                  title: "Hardware Acceleration",
                  description: "Optimized to leverage your device's hardware capabilities for maximum performance.",
                },
                {
                  icon: <Code className="h-8 w-8 text-accent-500" />,
                  title: "Developer API",
                  description: "Extensive API for developers to create cross-platform applications.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-accent-50 rounded-full p-3 inline-block mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-Platform Compatibility */}
        <section className="py-20 bg-accent-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4">
                Compatibility
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Works on Every Platform</h2>
              <p className="text-xl text-gray-600">
                DASHED OS seamlessly integrates with all major operating systems, providing a consistent experience
                across your entire device ecosystem.
              </p>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-accent-100 p-1">
                  {compatibilityPlatforms.map((platform) => (
                    <TabsTrigger
                      key={platform.id}
                      value={platform.id}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-accent-700 data-[state=active]:shadow-sm"
                    >
                      {platform.icon}
                      <span className="ml-2">{platform.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {compatibilityPlatforms.map((platform) => (
                <TabsContent key={platform.id} value={platform.id} className="mt-0">
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="p-8 md:p-12">
                        <h3 className="text-2xl font-bold mb-4">DASHED OS on {platform.name}</h3>
                        <p className="text-gray-600 mb-6">{platform.description}</p>

                        <div className="space-y-4">
                          {platform.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                              <p className="text-gray-600">{feature}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8">
                          <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                            Download for {platform.name}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="bg-accent-50 p-8 flex items-center justify-center">
                        <div className="relative w-full max-w-md">
                          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                            <div className="h-6 bg-accent-500 flex items-center px-3">
                              <div className="flex space-x-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                              </div>
                              <div className="ml-3 text-xs text-white">DASHED OS on {platform.name}</div>
                            </div>
                            <div className="p-4">
                              <Image
                                src="/feature-gradient-2.svg"
                                alt={`DASHED OS on ${platform.name}`}
                                width={400}
                                height={300}
                                className="w-full h-auto rounded-md"
                              />
                            </div>
                          </div>

                          {/* Platform Icon */}
                          <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg border border-accent-200">
                            {platform.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">
                Specifications
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Details</h2>
              <p className="text-xl text-gray-600">
                DASHED OS is designed to be lightweight yet powerful, with minimal system requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-6">System Requirements</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Processor</h4>
                          <p className="text-gray-600">1 GHz dual-core processor or better</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Memory</h4>
                          <p className="text-gray-600">2 GB RAM minimum (4 GB recommended)</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Storage</h4>
                          <p className="text-gray-600">500 MB available space</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Operating System</h4>
                          <p className="text-gray-600">Windows 10/11, macOS 11+, Linux, Android 9+, iOS 14+</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Network</h4>
                          <p className="text-gray-600">Internet connection for synchronization</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Graphics</h4>
                          <p className="text-gray-600">DirectX 9 or equivalent with WDDM 1.0 driver</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-6">Architecture</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Kernel</h4>
                          <p className="text-gray-600">Lightweight microkernel with hypervisor capabilities</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Security Model</h4>
                          <p className="text-gray-600">Zero-knowledge architecture with end-to-end encryption</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Compatibility Layer</h4>
                          <p className="text-gray-600">Adaptive API translation for cross-platform functionality</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-accent-50 rounded-xl shadow-md border border-gray-200 overflow-hidden h-full">
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-6">Performance Impact</h3>

                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900">Memory Usage</span>
                          <span className="text-accent-500">Minimal</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-accent-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Only 150-300MB RAM when running</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900">CPU Overhead</span>
                          <span className="text-accent-500">Low</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-accent-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Less than 5% CPU utilization</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900">Battery Impact</span>
                          <span className="text-accent-500">Optimized</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-accent-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Intelligent power management</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900">Storage Footprint</span>
                          <span className="text-accent-500">Compact</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-accent-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Less than 500MB installation size</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button variant="outline" className="w-full border-accent-300 text-accent-600 hover:bg-accent-50">
                        View Full Specifications
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Ready to unify your digital experience?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-accent-100 mb-8"
              >
                Download DASHED OS today and experience seamless cross-device compatibility.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Button
                  size="lg"
                  className="bg-white text-accent-600 hover:bg-accent-50 transition-all duration-300 transform hover:scale-105"
                >
                  Download DASHED OS
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-accent-500 transition-all duration-300 transform hover:scale-105"
                >
                  View Documentation
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
    </>
  )
}
