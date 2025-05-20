"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const animatedButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#E63946] text-white hover:bg-[#c62b38]",
        outline: "border border-[#E63946] text-[#E63946] hover:bg-[#E63946]/10",
        secondary: "bg-[#2A9D8F] text-white hover:bg-[#238a7e]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-[#E63946] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        wiggle: "animate-wiggle",
        shine: "animate-shine overflow-hidden",
        scale: "hover:scale-105 active:scale-95 transition-transform duration-200",
        ripple: "overflow-hidden",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  },
)

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof animatedButtonVariants> {
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  loading?: boolean
  loadingText?: string
}

export function AnimatedButton({
  className,
  variant,
  size,
  animation,
  children,
  icon,
  iconPosition = "left",
  loading = false,
  loadingText = "Loading...",
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (animation === "ripple") {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const ripple = {
        id: Date.now(),
        x,
        y,
      }

      setRipples((prev) => [...prev, ripple])

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
      }, 1000)
    }

    if (onClick) {
      onClick(event)
    }
  }

  return (
    <Button
      className={cn(
        animatedButtonVariants({ variant, size, animation }),
        animation === "shine" && "relative overflow-hidden",
        className,
      )}
      onClick={handleClick}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
        </>
      )}

      {animation === "shine" && (
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/20 to-transparent shine-effect"></span>
        </span>
      )}

      {animation === "ripple" &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
    </Button>
  )
}
