import type React from "react"
import { Loader2, Grid3X3, Kanban, Map, Check, Download, Wallet } from "lucide-react"

type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  spinner: Loader2,
  grid: Grid3X3,
  kanban: Kanban,
  map: Map,
  check: Check,
  download: Download,
  wallet: Wallet,
  google: ({ className, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} width="24" height="24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  apple: ({ className, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} width="24" height="24" {...props}>
      <path
        fill="currentColor"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"
      />
    </svg>
  ),
  phantom: ({ className, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} width="24" height="24" {...props}>
      <path
        fill="currentColor"
        d="M19.42 5.99a7.57 7.57 0 0 0-14.85 0H0v6.27h4.57v-2.76h2.28v2.76h2.28v-2.76h5.7v2.76h2.28v-2.76h2.28v2.76H24V5.99h-4.58z"
      />
      <path
        fill="currentColor"
        d="M4.57 14.97v-1.42H0v6.27h4.57v-2.76h2.28v2.76h2.28v-2.76h5.7v2.76h2.28v-2.76h2.28v2.76H24v-6.27h-4.57v1.42H4.57z"
      />
    </svg>
  ),
  solflare: ({ className, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} width="24" height="24" {...props}>
      <path
        fill="currentColor"
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"
      />
      <path
        fill="currentColor"
        d="M12 4.5c-4.142 0-7.5 3.358-7.5 7.5 0 4.142 3.358 7.5 7.5 7.5 4.142 0 7.5-3.358 7.5-7.5 0-4.142-3.358-7.5-7.5-7.5zm3.75 8.25h-7.5v-1.5h7.5v1.5z"
      />
    </svg>
  ),
  metamask: ({ className, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} width="24" height="24" {...props}>
      <path
        fill="currentColor"
        d="M21.315 3.401l-9.346 6.949L13.64 5.07l7.675-1.669zm-18.522.107L10.437 5.3l-1.664 5.18L0 10.48l2.793-6.972zm13.785 8.466l-3.525 2.677-3.525-2.677.636-3.525h5.778l.636 3.525zM10.437 18.63l-6.314-3.21 4.439-2.114 5.778 2.677-3.903 2.647zm3.126 0l3.903-2.647 5.778-2.677 4.439 2.114-6.314 3.21-7.806 0z"
      />
    </svg>
  ),
}
