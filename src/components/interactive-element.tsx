"use client"

import type React from "react"
import { useCursor } from "@/context/cursor-context"

interface InteractiveElementProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function InteractiveElement({ children, className, onClick }: InteractiveElementProps) {
  const { setCursorType, setIsHovering, setIsInverted } = useCursor()

  const handleMouseEnter = () => {
    setCursorType("interactive")
    setIsHovering(true)
    setIsInverted(true)
  }

  const handleMouseLeave = () => {
    setCursorType("default")
    setIsHovering(false)
    setIsInverted(false)
  }

  return (
    <div className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
      {children}
    </div>
  )
}
