"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function EnhancedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const { theme } = useTheme()

  // Trail positions with timestamps for more accurate animation
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number; timestamp: number }>>([])
  const trailLength = 12 // More trail dots for smoother effect
  const trailLifespan = 200 // How long (ms) trail dots remain visible

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      }

      setMousePosition({ x: newPosition.x, y: newPosition.y })

      // Update trail positions
      setTrailPositions((prev) => {
        // Filter out old positions
        const now = Date.now()
        const filtered = prev.filter((pos) => now - pos.timestamp < trailLifespan)

        // Add new position to the beginning
        return [newPosition, ...filtered].slice(0, trailLength)
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest("button")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Animation frame for smoother trail updates
    let animationFrameId: number

    const updateTrail = () => {
      const now = Date.now()
      setTrailPositions((prev) => prev.filter((pos) => now - pos.timestamp < trailLifespan))
      animationFrameId = requestAnimationFrame(updateTrail)
    }

    animationFrameId = requestAnimationFrame(updateTrail)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Don't render custom cursor on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  if (isTouchDevice) return null

  // Determine cursor color based on theme (opposite of theme)
  const isDark = theme === "dark"
  const cursorColor = isDark ? "#ffffff" : "#000000"
  const cursorHoverColor = isDark ? "#ffffff" : "#000000"

  return (
    <>
      {/* Trail dots */}
      {trailPositions.map((position, index) => {
        // Calculate opacity based on age of the position
        const age = Date.now() - position.timestamp
        const opacity = Math.max(0, 1 - age / trailLifespan)

        return (
          <motion.div
            key={index}
            className="fixed top-0 left-0 z-[99] pointer-events-none"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: `${Math.max(3, 8 - index * 0.5)}px`,
              height: `${Math.max(3, 8 - index * 0.5)}px`,
              borderRadius: "50%",
              backgroundColor: cursorColor,
              opacity: opacity * 0.6,
              transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
              transition: "opacity 0.1s ease",
            }}
          />
        )
      })}

      {/* Main circular cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "transparent",
          border: `2px solid ${cursorColor}`,
          opacity: 0.8,
        }}
      />

      {/* Small dot in the center */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 500,
          mass: 0.2,
        }}
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: cursorHoverColor,
        }}
      />
    </>
  )
}
