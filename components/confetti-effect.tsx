"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

interface ConfettiEffectProps {
  trigger: boolean
  duration?: number
}

export function ConfettiEffect({ trigger, duration = 3000 }: ConfettiEffectProps) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true)

      const end = Date.now() + duration

      const colors = ["#0077B5", "#5D9BC3", "#91B3D1"]

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        } else {
          setIsActive(false)
        }
      }

      frame()
    }
  }, [trigger, isActive, duration])

  return null
}
