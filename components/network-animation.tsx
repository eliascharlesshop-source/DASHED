"use client"

import { useEffect, useRef } from "react"

export function NetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Node class
    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      connections: Node[]
      pulseDirection: number
      pulseValue: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 1.5 + 1
        this.color = getRandomColor()
        this.connections = []
        this.pulseDirection = 1
        this.pulseValue = Math.random()
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off walls with damping
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -0.8
          this.x = this.x < 0 ? 0 : canvas.width
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -0.8
          this.y = this.y < 0 ? 0 : canvas.height
        }

        // Pulse effect
        this.pulseValue += 0.01 * this.pulseDirection
        if (this.pulseValue > 1 || this.pulseValue < 0.3) {
          this.pulseDirection *= -1
        }
      }

      draw() {
        if (!ctx) return

        // Draw node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * this.pulseValue, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Draw connections
        this.connections.forEach((node) => {
          const distance = Math.hypot(this.x - node.x, this.y - node.y)
          const maxDistance = 150

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance

            // Create gradient for connection
            const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y)
            gradient.addColorStop(
              0,
              `${this.color}${Math.floor(opacity * 255)
                .toString(16)
                .padStart(2, "0")}`,
            )
            gradient.addColorStop(
              1,
              `${node.color}${Math.floor(opacity * 255)
                .toString(16)
                .padStart(2, "0")}`,
            )

            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(node.x, node.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5 * opacity
            ctx.stroke()
          }
        })
      }
    }

    // Helper function to get random color from our accent palette
    function getRandomColor() {
      const colors = [
        "#b6c7e0", // accent-500
        "#b8c8e1", // accent-400
        "#c2d2e4", // accent-300
        "#c9d7e8", // accent-200
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Create nodes array first
    const nodes: Node[] = []

    // Function to draw all nodes
    function drawNodes() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node) => {
        node.update()
        node.draw()
      })
    }

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = 400
      // Only try to redraw if nodes have been populated
      if (nodes.length) {
        drawNodes()
      }
    }

    // Initial resize
    resize()
    window.addEventListener("resize", resize)

    // Now populate the nodes
    for (let i = 0; i < 70; i++) {
      nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    // Connect nodes
    nodes.forEach((node) => {
      const connections = nodes
        .filter((n) => n !== node)
        .sort((a, b) => {
          const distA = Math.hypot(a.x - node.x, a.y - node.y)
          const distB = Math.hypot(b.x - node.x, b.y - node.y)
          return distA - distB
        })
        .slice(0, 5)

      node.connections = connections
    })

    // Animation loop with requestAnimationFrame for better performance
    let animationFrameId: number

    let animate = () => {
      drawNodes()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false
    let mouseTimeout: NodeJS.Timeout

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      isMouseMoving = true

      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false
      }, 100)
    })

    // Update animation loop to include mouse interaction
    animate = () => {
      if (isMouseMoving) {
        // Create ripple effect when mouse moves
        nodes.forEach((node) => {
          const dx = node.x - mouseX
          const dy = node.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const force = (100 - distance) / 500
            node.vx += dx * force
            node.vy += dy * force
          }
        })
      }

      drawNodes()
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener("mousemove", () => {})
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full pointer-events-none opacity-70 z-0" />
}
