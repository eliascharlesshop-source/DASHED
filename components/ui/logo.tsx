import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  withText?: boolean
  textColor?: string
}

export function Logo({ className = "", size = "md", withText = true, textColor = "text-white" }: LogoProps) {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
  }

  const dimensions = sizeMap[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-shrink-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DASHED-c02auZcBEAeuuDUf3mRBbvXpv1YObq.png"
          alt="DASHED Logo"
          width={dimensions}
          height={dimensions}
          className="object-contain"
        />
      </div>
      {withText && (
        <span
          className={`font-bold ${textColor} ${size === "sm" ? "text-base" : size === "md" ? "text-xl" : "text-2xl"}`}
        >
          DASHED OS
        </span>
      )}
    </div>
  )
}
