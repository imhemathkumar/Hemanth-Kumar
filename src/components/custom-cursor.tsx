"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"
import { useCursor } from "@/context/cursor-context"

export default function CustomCursor() {
  const {
    isHovering,
    isInverted,
    magneticTarget,
    isClicking,
    hoveredElementDimensions,
  } = useCursor()

  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [dotSize, setDotSize] = useState(3)

  const springConfig = {
    damping: 20,
    stiffness: 350,
    mass: 0.25,
  }

  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const scale = useSpring(1, { damping: 12, stiffness: 300 })
  const dotScale = useSpring(1, { damping: 15, stiffness: 400 })
  const width = useSpring(30, { damping: 15, stiffness: 250 })
  const height = useSpring(30, { damping: 15, stiffness: 250 })
  const borderRadius = useSpring("50%", {
    damping: 15,
    stiffness: 250,
  })

  // Enable the custom cursor only on devices with a fine pointer.
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    )

    const updateDevice = () => {
      setIsEnabled(mediaQuery.matches)
    }

    updateDevice()
    mediaQuery.addEventListener("change", updateDevice)

    return () => {
      mediaQuery.removeEventListener("change", updateDevice)
    }
  }, [])

  // Hide the native cursor only when the custom cursor is enabled.
  useEffect(() => {
    if (!isEnabled) return

    document.documentElement.classList.add("custom-cursor-enabled")

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled")
    }
  }, [isEnabled])

  // Set cursor size after mounting (safe for Next.js SSR).
  useEffect(() => {
    const updateSize = () => {
      setDotSize(Math.max(2, Math.min(window.innerWidth / 640, 4)))
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Track mouse movement.
  useEffect(() => {
    if (!isEnabled) return

    const handleMouseMove = (event: MouseEvent) => {
      if (!magneticTarget) {
        x.set(event.clientX)
        y.set(event.clientY)
      }

      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isEnabled, magneticTarget, x, y])

  // Follow the magnetic target.
  useEffect(() => {
    if (!isEnabled || !magneticTarget) return

    x.set(magneticTarget.x)
    y.set(magneticTarget.y)
  }, [isEnabled, magneticTarget, x, y])

  // Expand cursor when hovering over interactive elements.
  useEffect(() => {
    if (isHovering && hoveredElementDimensions) {
      const {
        width: elementWidth,
        height: elementHeight,
        borderRadius: elementBorderRadius,
      } = hoveredElementDimensions

      width.set(elementWidth + 4)
      height.set(elementHeight + 4)
      borderRadius.set(elementBorderRadius || "12px")
      dotScale.set(0.5)
    } else {
      width.set(30)
      height.set(30)
      borderRadius.set("50%")
      dotScale.set(1)
    }
  }, [
    isHovering,
    hoveredElementDimensions,
    width,
    height,
    borderRadius,
    dotScale,
  ])

  // Click animation.
  useEffect(() => {
    if (isClicking) {
      scale.set(0.85)
      const timeout = window.setTimeout(() => {
        scale.set(1)
      }, 120)

      return () => window.clearTimeout(timeout)
    }

    scale.set(1)
  }, [isClicking, scale])

  if (!isEnabled) return null

  const cursorColor = isInverted ? "#ffffff" : "#ffffff"

  return (
    <>
      {/* Main magnetic / inverted cursor */}
      <motion.div
        className="custom-main-cursor"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width,
          height,
          scale,
          borderRadius,
          backgroundColor: cursorColor,
          mixBlendMode: isInverted ? "difference" : "normal",
          pointerEvents: "none",
          zIndex: 2147483647,
          boxShadow: isInverted
            ? "none"
            : "0 0 12px rgba(255,255,255,0.25)",
        }}
      />

      {/* Precision dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          scale: dotScale,
          pointerEvents: "none",
          zIndex: 2147483647,
        }}
      />

      {/* Click ripple */}
      {isClicking && isVisible && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            width: 35,
            height: 35,
            borderRadius: "50%",
            border: "2px solid white",
            pointerEvents: "none",
            zIndex: 2147483646,
          }}
        />
      )}
    </>
  )
}
