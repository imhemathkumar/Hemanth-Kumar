
"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring } from "framer-motion"
import { useCursor } from "@/context/cursor-context"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const {
    cursorType,
    isHovering,
    isInverted,
    magneticTarget,
    isClicking,
    hoveredElementDimensions,
  } = useCursor()

  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const { theme } = useTheme()
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [dotSize, setDotSize] = useState(3)

  const springConfig = { damping: 15, stiffness: 400, mass: 0.3 }

  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  const scale = useSpring(1, { damping: 10, stiffness: 300 })
  const dotScale = useSpring(1, { damping: 15, stiffness: 400 })
  const width = useSpring(30, { damping: 10, stiffness: 300 })
  const height = useSpring(30, { damping: 10, stiffness: 300 })
  const borderRadius = useSpring("50%", { damping: 10, stiffness: 300 })

  // Detect mouse / touch device
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    )

    const checkTouch = () => {
      setIsTouchDevice(
        mediaQuery.matches ||
        navigator.maxTouchPoints > 0
      )
    }

    checkTouch()
    mediaQuery.addEventListener("change", checkTouch)

    return () => {
      mediaQuery.removeEventListener("change", checkTouch)
    }
  }, [])

  // Dot size (avoid accessing window during server rendering)
  useEffect(() => {
    const updateDotSize = () => {
      setDotSize(Math.max(2, Math.min(window.innerWidth / 640, 4)))
    }

    updateDotSize()
    window.addEventListener("resize", updateDotSize)

    return () => window.removeEventListener("resize", updateDotSize)
  }, [])

  // Mouse tracking
  useEffect(() => {
    if (isTouchDevice) return

    const initCursor = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      x.set(e.clientX)
      y.set(e.clientY)
      setIsVisible(true)
    }

    const updateMousePosition = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      if (!magneticTarget) {
        x.set(e.clientX)
        y.set(e.clientY)
      }
    }

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mousemove", initCursor, { once: true })

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mousemove", initCursor)
    }
  }, [isTouchDevice, magneticTarget, x, y])

  // Hover expansion
  useEffect(() => {
    if (isHovering && hoveredElementDimensions) {
      const {
        width: elementWidth,
        height: elementHeight,
        borderRadius: elementBorderRadius,
      } = hoveredElementDimensions

      width.set(elementWidth + 4)
      height.set(elementHeight + 4)
      borderRadius.set(elementBorderRadius)
      dotScale.set(0.5)
    } else {
      width.set(30)
      height.set(30)
      borderRadius.set("50%")
      dotScale.set(1)
    }

    if (isClicking) {
      scale.set(0.9)

      const timeout = window.setTimeout(() => {
        if (!isHovering) scale.set(1)
      }, 150)

      return () => window.clearTimeout(timeout)
    } else {
      scale.set(1)
    }
  }, [
    isHovering,
    isClicking,
    hoveredElementDimensions,
    width,
    height,
    borderRadius,
    scale,
    dotScale,
  ])

  // Magnetic cursor movement
  useEffect(() => {
    if (magneticTarget) {
      x.set(magneticTarget.x)
      y.set(magneticTarget.y)
    }
  }, [magneticTarget, x, y])

  // Mouse entering / leaving viewport
  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isTouchDevice])

  // Default cursor elements
  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null

      const defaultCursor = target?.closest(
        '[data-custom-cursor="default"]'
      )

      setIsVisible(!defaultCursor)
    }

    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      {/* Main dynamic cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        style={{
          width,
          height,
          backgroundColor: "white",
          boxShadow: isInverted
            ? "none"
            : "0 0 10px rgba(255, 255, 255, 0.3)",
          mixBlendMode: isInverted ? "difference" : "normal",
          borderRadius,
          left: 0,
          top: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          scale,
        }}
      />

      {/* Precision dot */}
      <motion.div
        ref={dotRef}
        className="fixed pointer-events-none z-[99999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          backgroundColor: theme === "dark" ? "white" : "black",
          left: 0,
          top: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          scale: dotScale,
        }}
      />

      {/* Click animation effect */}
      {isClicking && isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[99999]"
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width,
            height,
            borderRadius,
            border: "2px solid white",
            mixBlendMode: "difference",
            left: 0,
            top: 0,
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}
    </>
  )
}
