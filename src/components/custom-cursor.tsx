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
  const [renderPosition, setRenderPosition] = useState({ x: 0, y: 0 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const { theme } = useTheme()
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const [isVisible, setIsVisible] = useState(true)

  const springConfig = { damping: 15, stiffness: 400, mass: 0.3 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  const scale = useSpring(1, { damping: 10, stiffness: 300 })
  const dotScale = useSpring(1, { damping: 15, stiffness: 400 })
  const width = useSpring(30, { damping: 10, stiffness: 300 })
  const height = useSpring(30, { damping: 10, stiffness: 300 })
  const borderRadius = useSpring("50%", { damping: 10, stiffness: 300 })

  useEffect(() => {
    const checkTouch = () => {
      const isTouchCapable =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches
      setIsTouchDevice(isTouchCapable)
    }

    checkTouch()
    window.addEventListener("resize", checkTouch)
    return () => window.removeEventListener("resize", checkTouch)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const initCursor = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
      setRenderPosition({ x: e.clientX, y: e.clientY })
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const updateMousePosition = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
      if (!magneticTarget) {
        x.set(e.clientX)
        y.set(e.clientY)
      }
    }

    const updateRenderPosition = () => {
      if (
        Math.abs(mousePositionRef.current.x - renderPosition.x) > 1 ||
        Math.abs(mousePositionRef.current.y - renderPosition.y) > 1
      ) {
        setRenderPosition(mousePositionRef.current)
      }
      rafRef.current = requestAnimationFrame(updateRenderPosition)
    }

    rafRef.current = requestAnimationFrame(updateRenderPosition)

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mousemove", initCursor, { once: true })

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isTouchDevice, renderPosition.x, renderPosition.y, x, y, magneticTarget])

  useEffect(() => {
    if (isHovering && hoveredElementDimensions) {
      const { width: elementWidth, height: elementHeight, borderRadius: elementBorderRadius } =
        hoveredElementDimensions

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
      setTimeout(() => {
        if (!isHovering) scale.set(1)
      }, 150)
    } else {
      scale.set(1)
    }
  }, [isHovering, isClicking, hoveredElementDimensions, width, height, borderRadius, scale, dotScale])

  useEffect(() => {
    if (magneticTarget) {
      x.set(magneticTarget.x)
      y.set(magneticTarget.y)
    }
  }, [magneticTarget, x, y])

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

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const defaultCursor = target.closest('[data-custom-cursor="default"]')
      if (defaultCursor) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    document.addEventListener("mouseover", handleMouseOver)
    return () => document.removeEventListener("mouseover", handleMouseOver)
  }, [])

  useEffect(() => {
    if (isTouchDevice) {
      const style = document.createElement("style")
      style.textContent = `
        * {
          cursor: none !important;
        }
        a, button, [role="button"] {
          cursor: none !important;
        }
      `
      document.head.appendChild(style)
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [isTouchDevice])

  if (isTouchDevice) return null

  const dotSize = Math.max(2, Math.min(window.innerWidth / 640, 4))

  return (
    <>
      {/* Main dynamic cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        style={{
          width,
          height,
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
          borderRadius,
          left: 0,
          top: 0,
          x,
          y,
          translateX: `-50%`,
          translateY: `-50%`,
          scale,
        }}
      />

      {/* Precision dot */}
      <motion.div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
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
          translateX: `-50%`,
          translateY: `-50%`,
          scale: dotScale,
        }}
      />

      {/* Click animation effect */}
      {isClicking && isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9999] mix-blend-difference"
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width,
            height,
            borderRadius,
            border: "2px solid white",
            left: 0,
            top: 0,
            x,
            y,
            translateX: `-50%`,
            translateY: `-50%`,
          }}
        />
      )}
    </>
  )
}
